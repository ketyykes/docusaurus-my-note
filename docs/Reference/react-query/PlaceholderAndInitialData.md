---
sidebar_position: 9
title: Placeholder 和 Initial Data 在 React Query 的應用
description: 學習如何在 React Query 中避免 loading spinner，提升使用者體驗。
last_update:
  date: 2025-07-01
  author: Danny
---

# 如何在 React Query 中善用 Placeholder 與 Initial Data

今天這篇文章要討論如何在使用 React Query 時提升使用者體驗。大多數時候，我們（還有使用者）都不喜歡看到惱人的 loading spinner。雖然有時候 spinner 是必要的，但如果能避免，當然最好。

React Query 已經提供了很多工具，讓我們在許多情境下可以不用顯示 loading spinner。例如：
- 從快取拿到 stale data，同時在背景自動更新
- [預先抓資料（prefetch）](https://tanstack.com/query/latest/docs/react/guides/prefetching)，如果你知道之後會用到
- [查詢 key 變動時保留前一筆資料](https://tanstack.com/query/latest/docs/react/guides/paginated-queries#better-paginated-queries-with-placeholderdata)，避免硬 loading 狀態

另一種方式是**同步**預先填好快取，給一份你認為「很可能正確」的資料。React Query 提供兩種做法：[Placeholder Data](https://tanstack.com/query/latest/docs/react/guides/placeholder-query-data) 和 [Initial Data](https://tanstack.com/query/latest/docs/react/guides/initial-query-data)。

先來看看它們的共通點，再說明差異，以及什麼情境該用哪一種。

## 共同點

如前所述，這兩種方式都能讓你用同步取得的資料預先填快取。只要有設定其中一個，查詢就不會進入 `loading` 狀態，而是直接 `success`。而且兩者都可以直接給值，也可以給一個回傳值的函式（如果計算很耗效能）：

```jsx
// success-queries
function Component() {
  // ✅ 即使還沒抓到資料，status 也會是 success
  const { data, status } = useQuery({
    queryKey: ['number'],
    queryFn: fetchNumber,
    placeholderData: 23,
  })

  // ✅ initialData 也一樣
  const { data, status } = useQuery({
    queryKey: ['number'],
    queryFn: fetchNumber,
    initialData: () => 42,
  })
}
```

最後，如果快取裡已經有資料，這兩個選項都不會有作用。

那到底有什麼差別？要理解這點，我們要先簡單認識 React Query 的「層級」運作方式：

### Cache 層級

每個 Query Key 只會有一個 cache entry。這很直觀，因為 React Query 的強大之處就在於能「全域」共用同一份資料。

有些 `useQuery` 的選項會影響 cache entry，例如 `queryFn`、`gcTime`。因為只有一個 cache entry，這些選項就是決定怎麼取得資料、什麼時候可以被回收。

### Observer 層級

Observer（觀察者）大致上就是每個 cache entry 的一個訂閱。Observer 會監看 cache entry 的變化，只要有變就會被通知。

最基本的 observer 就是呼叫 `useQuery`。每呼叫一次就建立一個 observer，元件資料有變就 re-render。當然，也可以有多個 observer 監看同一個 cache entry。

你可以在 React Query Devtools 裡看到每個查詢有幾個 observer（左邊的數字）：


有些選項是 observer 層級，例如 `select` 或 `refetchInterval`。`select` 特別適合資料轉換 (react-query-data-transformations#3-using-the-select-option)，因為可以讓不同元件訂閱同一份快取，但各自取不同資料片段。

## 差異

`initialData` 是 cache 層級，`placeholderData` 是 observer 層級。這會帶來幾個影響：

### 資料持久性

首先，`initialData` 會被寫進 cache。這代表你告訴 React Query：「我這份資料夠好，可以直接當作後端回來的資料。」因為是 cache 層級，所以只會有一份 `initialData`，而且只要第一個 observer 掛載時就會寫進 cache。之後再掛載其他 observer，即使給不同的 `initialData`，也不會有作用。

`placeholderData` 則**不會**寫進 cache。我會把它想成「先假裝有資料」。React Query 會先給你這份資料，等真的抓到資料再換掉。因為是 observer 層級，理論上每個元件都可以有不同的 `placeholderData`。

### 背景 refetch

用 `placeholderData`，每次 observer 第一次掛載時都會背景 refetch。因為這份資料「不是真的」，React Query 會自動去抓真的資料。這時 `useQuery` 會回傳 `isPlaceholderData` flag，你可以用這個 flag 告訴使用者目前看到的是 placeholder。等真的資料回來後，flag 會變成 false。

`initialData` 則因為被視為「有效資料」，會遵守 `staleTime`。如果 `staleTime` 是 0（預設），還是會背景 refetch。

但如果你有設定 `staleTime`（例如 30 秒），React Query 會這樣想：

> 哇，這份資料是同步拿到的，而且很新，30 秒內都不用去後端抓。

如果你不想這樣，可以用 `initialDataUpdatedAt`，告訴 React Query 這份 initialData 是什麼時候產生的，這樣背景 refetch 也會考慮這個時間。這在你用現有快取 entry 的 `dataUpdatedAt` 當 initialData 時特別有用：

```jsx
// initialDataUpdatedAt
const useTodo = (id) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTodo(id),
    staleTime: 30 * 1000,
    initialData: () =>
      queryClient
        .getQueryData(['todo', 'list'])
        ?.find((todo) => todo.id === id),
    initialDataUpdatedAt: () =>
      // ✅ 如果 list query 的資料比 staleTime 舊，會自動背景 refetch
      queryClient.getQueryState(['todo', 'list'])?.dataUpdatedAt,
  })
}
```

### 錯誤狀態切換

假設你有設定 `initialData` 或 `placeholderData`，然後背景 refetch 失敗。這時會發生什麼事？

- **initialData**：因為 initialData 會寫進 cache，refetch 失敗時會被當作一般背景錯誤處理。查詢會進入 `error` 狀態，但 `data` 還在。
- **placeholderData**：因為 placeholderData 是「假資料」，如果 refetch 失敗，這份資料就不見了。查詢會進入 `error` 狀態，`data` 會變成 `undefined`。

## 什麼時候該用哪一個？

還是老話一句，完全看你的需求。我自己習慣如果是從其他查詢預填資料就用 `initialData`，其他情境就用 `placeholderData`。

### 本文原始連結

[Placeholder and initial Data-in React Query](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query)



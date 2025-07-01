---
sidebar_position: 3
title:  React Query Render Optimizations
description: 深入解析 React Query 的 render 最佳化技巧，了解如何減少不必要的 re-render，提升 React 應用效能與使用者體驗。
tags:
  - React Query
last_update:
  date: 2025-07-01
  author: Danny
---

#  React Query Render Optimizations

我在 React Query 資料轉換技巧已經寫過不少 render 最佳化的內容。不過「為什麼 React Query 明明資料沒變還是 re-render 兩次？」這個問題大概是我被問最多次的（除了「v2 文件去哪了」之外 😅）。這裡我會更深入說明。

## 前言：Render 最佳化其實沒你想的那麼重要

Render 最佳化是進階主題。React Query 本身預設就有很好的效能，大多數情況下你根本不用再額外優化。很多人很在意「不必要的 re-render」，所以我才特別寫這篇。但我要再次強調：對大多數應用來說，render 最佳化沒你想像中重要。re-render 其實是好事，能確保畫面永遠是最新的。與其漏掉該 re-render 的畫面，我寧願多 re-render 幾次。想深入了解可以參考：

- [先解決 render 很慢的問題，再來管 re-render](https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render)（Kent C. Dodds）
- [@ryanflorence 關於過早最佳化的文章](https://reacttraining.com/blog/react-inline-functions-and-performance)

## isFetching 狀態切換

在上一篇 react query data transformations #3 using the select option 我說「只有 todos 長度變才會 re-render」其實不完全正確：

```tsx
// count-component
export const useTodosQuery = (select) =>
  useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    select,
  })
export const useTodosCount = () =>
  useTodosQuery((data) => data.length)

function TodosCount() {
  const todosCount = useTodosCount()

  return <div>{todosCount.data}</div>
}
```

每次背景 refetch，這個元件都會 re-render 兩次，分別是：

```js
{ status: 'success', data: 2, isFetching: true }
{ status: 'success', data: 2, isFetching: false }
```

因為 React Query 會提供很多查詢的 meta 資訊，`isFetching` 就是其中之一。只要有請求進行中，這個 flag 就會是 true。這對顯示背景 loading 很有用，但如果你沒用到，其實是多餘的 re-render。

### notifyOnChangeProps

這時可以用 React Query 的 `notifyOnChangeProps` 選項。你可以針對每個 observer 設定，只在指定的屬性變動時才通知 observer。像這樣設成 `['data']`，就能達到最佳化：

```ts
// optimized-with-notifyOnChangeProps
export const useTodosQuery = (select, notifyOnChangeProps) =>
  useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    select,
    notifyOnChangeProps,
  })
export const useTodosCount = () =>
  useTodosQuery((data) => data.length, ['data'])
```

你可以在[官方 optimistic-updates-typescript 範例](https://github.com/tannerlinsley/react-query/blob/9023b0d1f01567161a8c13da5d8d551a324d6c23/examples/optimistic-updates-typescript/pages/index.tsx#L35-L48)看到實際用法。

### 保持同步

雖然這樣寫很有效率，但也很容易「不同步」。如果你之後想根據 `error` 也做反應，或用到 `isLoading`，就要記得把這些欄位加進 `notifyOnChangeProps`。如果忘了加，像下面這樣：

```tsx
// outdated-component
export const useTodosCount = () =>
  useTodosQuery((data) => data.length, ['data'])

function TodosCount() {
  // 🚨 這裡有用到 error，但沒訂閱 error 變動！
  const { error, data } = useTodosCount()

  return (
    <div>
      {error ? error : null}
      {data ? data : null}
    </div>
  )
}
```

這樣就會有問題：error 變了但畫面沒更新。這比偶爾多 re-render 還糟。雖然可以把選項傳進自訂 hook，但還是很麻煩。有沒有自動化的方式？有的：

### Tracked Queries

這功能我很自豪，因為是我第一次對這個函式庫的重大貢獻。如果你把 `notifyOnChangeProps` 設成 `'tracked'`，React Query 會自動追蹤你在 render 時用到哪些欄位，然後自動最佳化 re-render。你也可以全域開啟：

```tsx
// tracked-queries
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
    },
  },
})
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}
```

這樣你就不用再煩惱 re-render 問題了。當然，追蹤欄位本身有一點效能開銷，所以要斟酌使用。這功能也有一些限制：

- 如果你用[物件 rest 解構](https://github.com/tc39/proposal-object-rest-spread/blob/6ee4ce3cdda246746fc46fb149bb8b43c28e704d/Rest.md)，會等於訂閱所有欄位。一般解構沒問題，只要避免這樣：

```ts
// problematic-rest-destructuring
// 🚨 這樣會追蹤所有欄位
const { isLoading, ...queryInfo } = useQuery(...)

// ✅ 這樣就沒問題
const { isLoading, data } = useQuery(...)
```

- Tracked queries 只會追蹤「render 時」用到的欄位。如果只在 effect 裡用到，不會被追蹤。這通常不是問題，因為 effect 的依賴陣列會在 render 時被存取：

```ts
// tracking-effects
const queryInfo = useQuery(...)

// 🚨 這樣不會正確追蹤 data
React.useEffect(() => {
    console.log(queryInfo.data)
})

// ✅ 這樣就沒問題，因為依賴陣列會在 render 時存取
React.useEffect(() => {
    console.log(queryInfo.data)
}, [queryInfo.data])
```

- Tracked queries 不會每次 render 都重設，所以只要追蹤過一次欄位，這個 observer 的生命週期內都會追蹤：

```ts
// no-reset
const queryInfo = useQuery(...)

if (someCondition()) {
    // 🟡 只要某次 render 有追蹤 data，之後都會追蹤
    return <div>{queryInfo.data}</div>
}
```

> v4 起，React Query 預設就開啟 tracked queries，你也可以用 `notifyOnChangeProps: 'all'` 關掉。

---

## Structural sharing（結構共享）

React Query 另一個很重要的 render 最佳化就是 _structural sharing_。這功能會盡量保留 `data` 的參考（reference）不變。舉例：

```json
[
  { "id": 1, "name": "Learn React", "status": "active" },
  { "id": 2, "name": "Learn React Query", "status": "todo" }
]
```

假設我們把第一個 todo 狀態改成 _done_，然後背景 refetch，後端回傳全新的 json：

```diff
[
-  { "id": 1, "name": "Learn React", "status": "active" },
+  { "id": 1, "name": "Learn React", "status": "done" },
  { "id": 2, "name": "Learn React Query", "status": "todo" }
]
```

React Query 會比對新舊狀態，盡量保留沒變的物件參考。上例中，todos 陣列會是新物件，id 1 的物件也會是新物件，但 id 2 的物件會沿用舊的 reference。

這對 selector 部分訂閱很有幫助：

```ts
// optimized-selectors
// ✅ 只有 id:2 的 todo 有變才會 re-render
const { data } = useTodo(2)
```

如前所述，selector 會做兩次 structural sharing：一次是 queryFn 回傳的結果，一次是 selector 的結果。對於超大資料集，這有時會成為瓶頸，而且只適用於 json 可序列化的資料。如果不需要這功能，可以在 query 設定 `structuralSharing: false` 關掉。

想了解底層細節可以看[replaceEqualDeep 測試](https://github.com/tannerlinsley/react-query/blob/80cecef22c3e088d6cd9f8fbc5cd9e2c0aab962f/src/core/tests/utils.test.tsx#L97-L304)。

**最後更新：2023-10-21**

### 本文原始連結

[React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)
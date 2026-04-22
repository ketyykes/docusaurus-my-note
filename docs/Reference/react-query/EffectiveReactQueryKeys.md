---
sidebar_position: 8
title: Effective React Query keys
description: 深入解析 React Query Query Key 的設計原則與實務技巧，包含快取、refetch、手動操作與工廠模式，讓你的查詢管理更有效率、更易維護。
tags:
  - React Query
  - TanStack Query
last_update:
  date: 2025-07-01
  author: Danny
---

# Effective React Query Keys

[Query Keys](https://react-query.tanstack.com/guides/query-keys) 是 React Query 的核心概念之一。它們讓函式庫能正確快取資料、在依賴變動時自動 refetch，還能讓你在需要時手動操作 Query Cache，例如 mutation 後更新資料或手動失效某些查詢。

在介紹我自己如何組織 Query Key 之前，先快速說明這三個重點的意義。

## 資料快取

Query Cache 其實就是一個 JavaScript 物件，key 是序列化後的 Query Key，value 則是查詢資料加上一些 meta 資訊。key 會用[確定性 hash](https://react-query.tanstack.com/guides/query-keys#query-keys-are-hashed-deterministically) 處理，所以你也可以用物件當 key（但最外層還是要是字串或陣列）。

最重要的是 key 必須對每個查詢**唯一**。React Query 只要在 cache 找到 key，就會直接用。注意：不能用同一個 key 同時給 `useQuery` 跟 `useInfiniteQuery`，因為只有一個 Query Cache，兩者會共用資料，這會出問題，因為 infinite query 跟一般 query 結構完全不同。

```ts
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
})

// 🚨 這樣不行
useInfiniteQuery({
  queryKey: ['todos'],
  queryFn: fetchInfiniteTodos,
})

// ✅ 請用不同 key
useInfiniteQuery({
  queryKey: ['infiniteTodos'],
  queryFn: fetchInfiniteTodos,
})
```

## 自動 refetch

**Queries 是宣告式的。**

這個觀念非常重要，值得一再強調，而且一開始很難「開竅」。大多數人會用**命令式**思維看待查詢與 refetch。

我有一個查詢，抓到資料。現在我按按鈕想 refetch，但參數不同。很多人會這樣寫：

```jsx
// imperative-refetch
function Component() {
  const { data, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  // ❓ refetch 怎麼帶參數？
  return <Filters onApply={() => refetch(???)} />
}
```

答案是：**你不用這樣做。**

`refetch` 只會用**同一組參數**重新抓資料。

如果你有會影響查詢的 state，只要把它放進 Query Key，React Query 會自動在 key 變動時 refetch。所以要套用篩選條件，只要改變 client state：

```jsx
// query-key-drives-the-query
function Component() {
  const [filters, setFilters] = React.useState()
  const { data } = useQuery({
    queryKey: ['todos', filters],
    queryFn: () => fetchTodos(filters),
  })

  // ✅ 改 local state 就會自動 refetch
  return <Filters onApply={setFilters} />
}
```

`setFilters` 會觸發 re-render，新的 Query Key 傳給 React Query，就會自動 refetch。更深入例子可參考 practical react query#treat the query key like a dependency array。

## 手動操作

手動操作 Query Cache 時，Query Key 結構就很重要。像 [invalidateQueries](https://react-query.tanstack.com/reference/QueryClient#queryclientinvalidatequeries) 或 [setQueriesData](https://react-query.tanstack.com/reference/QueryClient#queryclientsetqueriesdata) 都支援 [Query Filters](https://react-query.tanstack.com/guides/filters#query-filters)，可以模糊比對 Query Key。

## 有效設計 Query Key 的建議

以下是我個人經驗（其實整篇都是 XD），不用照抄，但這些策略在專案變複雜時很有用，也很容易擴充。Todo App 當然不用這麼搞 😁。

### 就近放置（Colocate）

推薦閱讀 [Kent C. Dodds 的這篇](https://kentcdodds.com/blog/colocation)。我不建議把所有 Query Key 都集中放在 `/src/utils/queryKeys.ts`。我會把 Query Key 跟查詢一起放在 feature 目錄下，像這樣：

```
- src
  - features
    - Profile
      - index.tsx
      - queries.ts
    - Todos
      - index.tsx
      - queries.ts
```

`queries` 檔案會放所有 React Query 相關內容。我通常只 export 自訂 hook，Query Function 跟 Query Key 都留在本地。

### 一律用陣列當 key

Query Key 可以是字串，但為了統一，我都用陣列。反正 React Query 內部也會轉成陣列：

```ts
// always-use-array-keys
// 🚨 會自動轉成 ['todos']
useQuery({ queryKey: 'todos' })
// ✅
useQuery({ queryKey: ['todos'] })
```

**補充：** v4 開始所有 key 都必須是陣列。

### 結構設計

Query Key 結構建議從**最泛用**到**最細**，中間可依需求加層級。舉例，todos 列表可篩選、可看細節：

```
['todos', 'list', { filters: 'all' }]
['todos', 'list', { filters: 'done' }]
['todos', 'detail', 1]
['todos', 'detail', 2]
```

這樣可以用 `['todos']` 失效所有 todo 相關查詢，也能只針對 list 或 detail，甚至精確到某個 list。mutation 後更新資料也很彈性：

```js
// updates-from-mutation-responses
function useUpdateTitle() {
  return useMutation({
    mutationFn: updateTitle,
    onSuccess: (newTodo) => {
      // ✅ 更新單一 todo detail
      queryClient.setQueryData(
        ['todos', 'detail', newTodo.id],
        newTodo
      )

      // ✅ 更新所有包含這個 todo 的列表
      queryClient.setQueriesData(['todos', 'list'], (previous) =>
        previous.map((todo) =>
          todo.id === newTodo.id ? newtodo : todo
        )
      )
    },
  })
}
```

如果 list 跟 detail 結構差很多，也可以直接失效所有 list：

```js
// invalidate-all-lists
function useUpdateTitle() {
  return useMutation({
    mutationFn: updateTitle,
    onSuccess: (newTodo) => {
      queryClient.setQueryData(
        ['todos', 'detail', newTodo.id],
        newTodo
      )

      // ✅ 直接失效所有 list
      queryClient.invalidateQueries({
        queryKey: ['todos', 'list']
      })
    },
  })
}
```

如果你知道目前在哪個 list（例如從 url 取得 filter），也可以同時更新當前 list、失效其他 list：

```js
// combine
function useUpdateTitle() {
  // 假設有個 hook 會回傳目前的 filter
  const { filters } = useFilterParams()

  return useMutation({
    mutationFn: updateTitle,
    onSuccess: (newTodo) => {
      queryClient.setQueryData(
        ['todos', 'detail', newTodo.id],
        newTodo
      )

      // ✅ 更新目前這個 list
      queryClient.setQueryData(
        ['todos', 'list', { filters }],
        (previous) =>
          previous.map((todo) =>
            todo.id === newTodo.id ? newtodo : todo
          )
      )

      // 🥳 失效所有 list，但不 refetch 當前這個
      queryClient.invalidateQueries({
        queryKey: ['todos', 'list'],
        refetchActive: false,
      })
    },
  })
}
```

**補充：** v4 `refetchActive` 改成 `refetchType`，上例要用 `refetchType: 'none'`，代表不 refetch 任何查詢。

### 用 Query Key 工廠

上面例子都是手動寫 key，這很容易出錯，也不利於未來擴充。建議每個 feature 寫一個 Query Key 工廠，就是一個物件，裡面有函式產生 key，然後在自訂 hook 裡用。例如：

```ts
// query-key-factory
const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
}
```

這樣每一層都能組合，也能單獨用：

```ts
// examples
// 🕺 移除 todos 相關所有查詢
queryClient.removeQueries({
  queryKey: todoKeys.all
})

// 🚀 失效所有 list
queryClient.invalidateQueries({
  queryKey: todoKeys.lists()
})

// 🙌 prefetch 單一 todo
queryClient.prefetchQueries({
  queryKey: todoKeys.detail(id),
  queryFn: () => fetchTodo(id),
})
```

**最後更新：2022-04-23**



### 本文原始連結

[Effective react query keys](https://tkdodo.eu/blog/effective-react-query-keys)
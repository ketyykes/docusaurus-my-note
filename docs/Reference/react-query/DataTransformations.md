---
sidebar_position: 2
title: React Query 資料轉換技巧
description: 學習如何在 react-query 中進行常見且重要的資料轉換任務
tags:
  - React Query
last_update:
  date: 2025-07-01
  author: Danny
---


# React Query Data Transformations

歡迎來到「我對 react-query 的一些想法」第二篇。隨著我越來越深入這個函式庫和其社群，我觀察到大家常常會問一些相似的問題。原本我想把所有心得寫成一篇大文章，但後來決定拆成幾個比較好消化的小主題。第一個主題就是很常見也很重要的：資料轉換（Data Transformation）。

## 資料轉換（Data Transformation）

老實說，大多數人其實**沒有**用 GraphQL。如果你有在用，那你很幸福，因為你可以直接要求後端回傳你想要的資料格式。

但如果你是用 REST API，那就只能接受後端給你的格式。那麼在用 react-query 時，該怎麼、在哪裡做資料轉換才好？這裡也適用軟體開發界最常見的答案：

> 看情況。

<p >
  — 每個工程師，永遠都會這樣說
</p>

以下介紹 3+1 種可以做資料轉換的位置，並說明各自的優缺點：

### 0. 在後端處理

這是我最喜歡的做法，如果你有辦法做到的話。如果後端直接回傳你想要的資料結構，前端就什麼都不用做。雖然這在很多情況下（像是用公開 API）不太現實，但在企業內部專案其實滿常見。如果你能控制後端，建議直接讓 API 回傳你要的格式。

🟢  前端完全不用處理<br/>
🔴  並非總是可行

### 1. 在 queryFn 處理

`queryFn` 就是你傳給 `useQuery` 的那個函式。它要回傳一個 Promise，然後資料就會被放進 query cache。但這不代表你一定要直接回傳後端給的格式，你可以在這裡先轉換好：

```ts
// queryFn-transformation
const fetchTodos = async (): Promise<Todos> => {
  const response = await axios.get('todos')
  const data: Todos = response.data

  return data.map((todo) => todo.name.toUpperCase())
}

export const useTodosQuery = () =>
  useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })
```

這樣前端就可以直接用「已經轉換過」的資料，好像後端本來就長這樣一樣。你在程式裡永遠不會碰到沒轉大寫的 todo name。不過你也無法再取得原始資料結構。用 react-query-devtools 看到的是轉換後的資料，網路請求看到的才是原始資料。這點要注意，可能會讓人困惑。

另外，react-query 在這裡沒辦法幫你做任何優化。每次 fetch 都會重新轉換一次。如果轉換很耗效能，建議考慮其他做法。有些公司會有共用的 API 層，這時你可能也沒辦法在這裡做轉換。

🟢  跟後端很接近，方便維護<br/>
🟡  轉換後的資料會進 cache，拿不到原始資料<br/>
🔴  每次 fetch 都會執行轉換<br/>
🔴  如果有共用 API 層，可能無法這樣做

### 2. 在 render function 處理

就像上一篇 practical react query 建議的，如果你有寫自訂 hook，也可以在這裡做資料轉換：

```ts
// render-transformation
const fetchTodos = async (): Promise<Todos> => {
  const response = await axios.get('todos')
  return response.data
}

export const useTodosQuery = () => {
  const queryInfo = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  return {
    ...queryInfo,
    data: queryInfo.data?.map((todo) => todo.name.toUpperCase()),
  }
}
```

這樣不只 fetch 時會轉換，**每次 render** 都會執行轉換（即使沒有抓新資料）。通常這沒什麼問題，但如果有效能疑慮，可以用 `useMemo` 最佳化。記得依賴要設得夠精確，`queryInfo.data` 只要沒變就不會重算，但 `queryInfo` 本身每次 render 都會變。如果你把 `queryInfo` 放進依賴，轉換還是每次都會跑：

```ts
// useMemo-dependencies
export const useTodosQuery = () => {
  const queryInfo = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos
  })

  return {
    ...queryInfo,
    // 🚨 這樣寫 useMemo 沒有效果！
    data: React.useMemo(
      () => queryInfo.data?.map((todo) => todo.name.toUpperCase()),
      [queryInfo]
    ),

    // ✅ 正確做法，依賴 queryInfo.data
    data: React.useMemo(
      () => queryInfo.data?.map((todo) => todo.name.toUpperCase()),
      [queryInfo.data]
    ),
  }
}
```

如果你的自訂 hook 還有其他邏輯要跟資料轉換一起處理，這種做法很適合。要注意的是，資料有可能是 undefined，所以記得用 optional chaining。

🟢  可以用 useMemo 最佳化<br/>
🟡  devtools 看不到實際結構<br/>
🔴  語法稍微複雜<br/>
🔴  資料可能是 undefined<br/>
🔴  有 tracked queries 時不建議這樣做<br/>

### 3. 用 select 選項

v3 開始內建 selector，可以直接用來做資料轉換：

```ts
// select-transformation
export const useTodosQuery = () =>
  useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    select: (data) => data.map((todo) => todo.name.toUpperCase()),
  })
```

selector 只會在 `data` 存在時才執行，所以不用擔心 undefined。像上面這種 inline function，每次 render 都會執行轉換。如果轉換很耗效能，可以用 useCallback 或抽成獨立函式：

```ts
// select-memoizations
const transformTodoNames = (data: Todos) =>
  data.map((todo) => todo.name.toUpperCase())

export const useTodosQuery = () =>
  useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    // ✅ 用穩定的函式參考
    select: transformTodoNames,
  })

export const useTodosQuery = () =>
  useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    // ✅ 用 useCallback 記憶化
    select: React.useCallback(
      (data: Todos) => data.map((todo) => todo.name.toUpperCase()),
      []
    ),
  })
```

另外，select 也可以只訂閱部分資料，這是這種做法最強大的地方。舉例：

```js
// select-partial-subscriptions
export const useTodosQuery = (select) =>
  useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    select,
  })

export const useTodosCount = () =>
  useTodosQuery((data) => data.length)
export const useTodo = (id) =>
  useTodosQuery((data) => data.find((todo) => todo.id === id))
```

這裡我們做出一個類似 [useSelector](https://react-redux.js.org/api/hooks#useselector) 的 API，傳入自訂 selector 給 `useTodosQuery`。如果沒傳 selector，就回傳全部資料。

但如果有傳 selector，元件就只會訂閱 selector 的結果。這很強大，因為即使 todo name 有變，只有訂閱 count 的元件（`useTodosCount`）不會 re-render，因為 count 沒變，react-query 就不會通知 observer 更新 🥳（這裡有簡化，實際 render 最佳化細節會在第三篇說明）。

🟢  最佳效能<br/>
🟢  可以只訂閱部分資料<br/>
🟡  每個 observer 拿到的資料結構可能不同<br/>
🟡  structural sharing 會做兩次（細節會在第三篇 react query render optimizations 說明）


**最後更新：2023-10-21**


### 本文原始連結

[Practical React Query](https://tkdodo.eu/blog/react-query-data-transformations)
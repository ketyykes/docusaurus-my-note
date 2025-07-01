---
sidebar_position: 5
title: Testing React Query
description: 實戰教學如何測試 React Query 的 hook 與元件，包含 mock API、QueryClient 設定、關閉自動重試與常見測試陷阱，讓你寫出穩定可靠的 React Query 測試。
tags:
  - React Query
last_update:
  date: 2025-07-01
  author: Danny
---

# Testing React Query

關於 React Query 的測試問題經常被問到，這裡我會嘗試解答一些常見疑問。我認為其中一個原因是測試「聰明」元件（也叫 [container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)）本來就不容易。隨著 hooks 的普及，這種分法已經不再流行，現在建議直接在需要的地方用 hook，而不是硬把元件拆成 dumb/props-only。

這樣的確讓元件更好維護、程式碼更易讀，但也讓更多元件會用到「非 props」的外部依賴。

可能會用 `useContext`、`useSelector`，或 `useQuery`。

這些元件技術上已經不是純元件，因為在不同環境下呼叫會有不同結果。測試時你必須小心建立正確的環境，才能讓測試順利運作。

## 模擬網路請求

React Query 是個非同步 server state 管理函式庫，你的元件很可能會發送請求到後端。測試時後端通常不可用，就算可用，也不希望測試依賴真實後端。

網路 mock 方式很多，像 jest mock api client、mock fetch 或 axios。我很推薦 Kent C. Dodds 的[這篇文章](https://kentcdodds.com/blog/stop-mocking-fetch)：

> 用 [mock service worker](https://mswjs.io/) by [@ApiMocking](https://twitter.com/ApiMocking)

它可以成為你 mock api 的唯一真相來源：

- node 環境下可用於測試
- 支援 REST 與 GraphQL
- 有 [storybook addon](https://storybook.js.org/addons/msw-storybook-addon)，可寫 `useQuery` 元件 story
- 開發時在瀏覽器也能用，且能在 devtools 看到請求
- 跟 cypress 結合也很方便


網路層搞定後，來談談 React Query 測試要注意的事：

## QueryClientProvider

用 React Query 時一定要有 QueryClientProvider，並給它一個 queryClient（裡面有 `QueryCache`，會存查詢資料）。

我建議每個測試都建立自己的 QueryClientProvider，並用 `new QueryClient`。這樣測試彼此完全隔離。另一種做法是每次測試後清空 cache，但我偏好讓測試間的共享狀態越少越好。不然平行跑測試時很容易出現莫名其妙的錯誤。

### 測 custom hook

如果你在測自訂 hook，應該會用 [react-hooks-testing-library](https://react-hooks-testing-library.com/)。這是測 hook 最簡單的工具。它可以用 [wrapper](https://react-hooks-testing-library.com/reference/api#wrapper) 包住 hook，這個 wrapper 就是 React component。這裡很適合建立 QueryClient，因為每個測試都會執行一次：

```tsx
// wrapper
const createWrapper = () => {
  // ✅ 每個測試都建立新 QueryClient
  const queryClient = new QueryClient()
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

test('my first test', async () => {
  const { result } = renderHook(() => useCustomHook(), {
    wrapper: createWrapper(),
  })
})
```

### 測元件

如果你要測用 `useQuery` 的元件，也要用 QueryClientProvider 包住。可以寫個小 wrapper 包住 [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) 的 render。可以參考 React Query [官方測試的做法](https://github.com/tannerlinsley/react-query/blob/ead2e5dd5237f3d004b66316b5f36af718286d2d/src/react/tests/utils.tsx#L6-L17)。

## 關閉自動重試

這是 React Query 測試最常見的坑：預設會自動重試三次且有指數退避，這會讓你想測錯誤情境時測試超時。最簡單的關掉方式還是在 `QueryClientProvider` 設定。來看個例子：

```tsx
// no-retries
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ 關掉自動重試
        retry: false,
      },
    },
  })

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

test("my first test", async () => {
  const { result } = renderHook(() => useCustomHook(), {
    wrapper: createWrapper()
  })
}
```

這樣所有 query 預設都不會重試。注意：只有 `useQuery` 沒有明確設定 retry 時才會生效。如果有設 retry: 5，還是會以那個為主，預設只會當 fallback。

### setQueryDefaults

最好的建議是：不要直接在 `useQuery` 設定這些選項。盡量用預設值，真的要針對特定查詢調整時，用 [queryClient.setQueryDefaults](https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydefaults)。

所以不要這樣：

```tsx
// not-on-useQuery
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  // 🚨 這樣測試時沒辦法覆蓋 retry！
  const queryInfo = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    retry: 5,
  })
}
```

要這樣設：

```tsx
// setQueryDefaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
})

// ✅ 只有 todos 會 retry 5 次
queryClient.setQueryDefaults(['todos'], { retry: 5 })

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}
```

這樣所有查詢預設 retry 2 次，只有 _todos_ 會 retry 5 次，而且測試時還是可以全域關掉 retry 🙌。

### ReactQueryConfigProvider

這只適用於已知的 query key。有時你想針對某一部分元件樹設 config。v2 有 [ReactQueryConfigProvider](https://react-query-v2.tanstack.com/docs/api#reactqueryconfigprovider)，v3 可以用幾行 code 達成：

```jsx
// ReactQueryConfigProvider
const ReactQueryConfigProvider = ({ children, defaultOptions }) => {
  const client = useQueryClient()
  const [newClient] = React.useState(
    () =>
      new QueryClient({
        queryCache: client.getQueryCache(),
        muationCache: client.getMutationCache(),
        defaultOptions,
      })
  )

  return (
    <QueryClientProvider client={newClient}>
      {children}
    </QueryClientProvider>
  )
}
```

可以參考這個 [codesandbox 範例](https://codesandbox.io/s/react-query-config-provider-v3-lt00f)。

## 測試時一定要 await 查詢

React Query 本質是 async，執行 hook 時不會馬上拿到結果，通常一開始是 loading 沒資料。[react-hooks-testing-library 的 async utilities](https://react-hooks-testing-library.com/reference/api#async-utilities) 提供很多解法。最簡單的就是等到查詢進入 success 狀態：

```tsx
// waitFor
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

test("my first test", async () => {
  const { result, waitFor } = renderHook(() => useCustomHook(), {
    wrapper: createWrapper()
  })

  // ✅ 等到查詢進入 success 狀態
  await waitFor(() => result.current.isSuccess)

  expect(result.current.data).toBeDefined()
}
```

> [@testing-library/react v13.1.0](https://github.com/testing-library/react-testing-library/releases/tag/v13.1.0) 也有新的 [renderHook](https://testing-library.com/docs/react-testing-library/api/#renderhook)。但它不會回傳自己的 `waitFor`，要用 [@testing-library/react 的 waitFor](https://testing-library.com/docs/dom-testing-library/api-async/#waitfor)。API 有點不同，不能回傳 boolean，要回傳 Promise，所以 code 要改成這樣：

```tsx
// new-render-hook
import { waitFor, renderHook } from '@testing-library/react'

test("my first test", async () => {
  const { result } = renderHook(() => useCustomHook(), {
    wrapper: createWrapper()
  })

  // ✅ 用 expect 包 Promise 給 waitFor
  await waitFor(() => expect(result.current.isSuccess).toBe(true))

  expect(result.current.data).toBeDefined()
}
```

## 總結

我有整理一個小 repo，把 mock-service-worker、react-testing-library、wrapper 都串在一起。裡面有四個測試：自訂 hook 跟元件的成功/失敗案例。可以參考這裡：https://github.com/TkDodo/testing-react-query

**最後更新：2023-10-21**


[Testing React Query](https://tkdodo.eu/blog/testing-react-query)


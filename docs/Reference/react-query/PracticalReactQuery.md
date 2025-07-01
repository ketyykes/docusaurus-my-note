---
sidebar_position: 1
title: Practical React Query
description: 跟你分享我最近使用 React Query 的一些經驗。用 React 取資料從沒這麼愉快過...
tags:
  - React Query
last_update:
  date: 2025-07-01
  author: Danny
---

# Practical React Query

當 GraphQL，特別是 [Apollo Client](https://www.apollographql.com/docs/react/) 在 2018 年左右變得流行時，大家都在討論它會不會完全取代 redux，甚至常常有人問 [Redux 死了嗎？](https://dev.to/markerikson/redux---not-dead-yet-1d9k)

我記得當時完全搞不懂大家在吵什麼。
為什麼一個抓資料的函式庫會取代全域狀態管理工具？這兩者到底有什麼關聯？

我原本以為像 Apollo 這種 GraphQL client 只是幫你抓資料，
就像 [axios](https://github.com/axios/axios) 處理 REST API 一樣，
你還是得自己想辦法把資料放到應用程式裡。

結果我大錯特錯。

## Client State vs. Server State

Apollo 不只是讓你描述想要哪些資料並抓下來，
它還內建了 _快取_ 機制。
這代表你可以在多個元件裡用同一個 `useQuery` hook，
只會抓一次資料，之後都直接從快取拿。

這聽起來是不是很像我們（還有很多團隊）用 redux 做的事：
從 server 抓資料，然後讓整個 app 都能用。

所以我們一直把 _server state_ 當成 _client state_ 在處理。
但其實 server state（像是你抓的一串文章、要顯示的使用者細節...）
這些資料的擁有者是 server，不是你的 app。
我們只是「借來」顯示給使用者最新的狀態。

這讓我對資料的思考方式有了轉變。
如果我們能善用快取來顯示不是自己擁有的資料，
那其實真正需要全域 client state 的情境就少很多。
這也讓我理解為什麼很多人覺得 Apollo 可以取代 redux。

## React Query 

我其實沒用過 GraphQL。
我們公司本來就有 REST API，也沒遇到 over-fetching 的問題，
一切都運作得很好。
要換成 GraphQL，後端也要大改，沒那麼簡單。

但我一直很羨慕前端抓資料可以這麼簡單，
還能自動處理 loading 跟 error 狀態。如果 REST API 也有這種工具就好了...

這時候 [React Query](https://tanstack.com/query/latest/) 出現了。

由 [Tanner Linsley](https://github.com/tannerlinsley) 在 2019 年底開發，
React Query 把 Apollo 的優點帶到 REST 世界。
它可以搭配任何回傳 Promise 的函式，並採用 _stale-while-revalidate_ 快取策略。
這個函式庫預設值很聰明，盡量讓資料保持最新，
同時又能讓使用者盡快看到畫面，
有時甚至感覺像是即時顯示，UX 超棒。
而且它也很彈性，預設不夠用時可以自訂各種設定。

這篇文章不是 React Query 的入門教學。

官方文件已經把概念講得很清楚，
還有很多 [教學影片](https://tanstack.com/query/latest/docs/react/videos)，
Tanner 也有出 [React Query Essentials 課程](https://learn.tanstack.com/)，
想學可以直接去看。

我想分享的是一些超越文件、實際用過才會發現的技巧，
這些是我這幾個月在工作上大量用 React Query，
還有在 Discord、GitHub 討論區幫人解答時累積的心得。

### 預設值說明

我覺得 React Query 的 [預設值](https://tanstack.com/query/latest/docs/react/guides/important-defaults) 設計得很棒，但有時會讓新手搞不清楚狀況。

首先：React Query **不會**在每次 re-render 時都呼叫 `queryFn`，即使 `staleTime` 預設是 0。
你的 app 可能因為各種原因一直 re-render，如果每次都抓資料會瘋掉！

> 請永遠為 re-render 而寫程式，而且會 re-render 很多次。我稱這叫 render resiliency。

如果你遇到預期外的 refetch，通常是因為你剛把視窗 focus 回來，
React Query 預設會 `refetchOnWindowFocus`：
當使用者切到別的分頁再回來時，會自動在背景抓一次資料，
如果 server 上有新資料，畫面就會自動更新。
這一切都不會顯示 loading spinner，
如果資料沒變，元件也不會 re-render。

開發時這個行為會更明顯，
因為你常常在瀏覽器 DevTools 跟 app 之間切換 focus，也會觸發抓資料。

自 React Query v5 起，`refetchOnWindowFocus` 不再監聽 `focus` 事件，
而是只用 `visibilitychange`。這樣在開發時就不會一直被打擾，
但在正式環境還是能自動更新畫面。

再來，`gcTime` 跟 `staleTime` 常常被搞混，這邊簡單說明：

- `staleTime`：資料從「新鮮」變成「過期」的時間。
  只要還在新鮮期，資料都只會從快取拿，不會發出網路請求！
  如果過期了（預設是馬上），還是會先從快取拿資料，
  但在某些情況下會在背景自動 refetch。
- `gcTime`：沒有元件在用這筆資料時，多久後從快取移除。預設是 5 分鐘。
  只要沒有任何 observer（元件）在用這個 query，資料就會進入 inactive 狀態。

大部分情況下，如果你要改設定，通常是調 `staleTime`，
`gcTime` 幾乎很少需要動。
官方文件有很好的[範例說明](https://tanstack.com/query/latest/docs/react/guides/caching#basic-example)。

`gcTime` 以前叫 `cacheTime`，v5 之後改名比較貼切。

### 善用 React Query DevTools

這個工具超級有幫助，可以讓你清楚看到每個 query 的狀態，
也能直接看到快取裡有什麼資料，debug 超方便。
另外，建議你在瀏覽器 DevTools 裡把網路速度調慢，
這樣更容易觀察到背景 refetch，因為 dev server 通常太快了。

### 把 query key 當成依賴陣列

這裡指的是 [useEffect](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect) 的依賴陣列，應該大家都很熟。

為什麼這兩個很像？

因為 React Query 只要 query key 變了就會自動 refetch。
所以如果我們把變數參數傳給 `queryFn`，通常也會希望那個值變動時自動抓新資料。
不用自己寫一堆 effect 來手動 refetch，直接把參數放進 query key 就好：

```ts
// feature/todos/queries.ts

type State = 'all' | 'open' | 'done'
type Todo = {
  id: number
  state: State
}
type Todos = ReadonlyArray<Todo>

const fetchTodos = async (state: State): Promise<Todos> => {
  const response = await axios.get(`todos/${state}`)
  return response.data
}

export const useTodosQuery = (state: State) =>
  useQuery({
    queryKey: ['todos', state],
    queryFn: () => fetchTodos(state),
  })
```

假設 UI 有一個 todo 列表跟篩選器，
我們會用 local state 存篩選條件，
只要使用者切換篩選，local state 變了，
React Query 就會自動 refetch，因為 query key 變了。
這樣就能讓篩選條件跟 query function 保持同步，
跟 useEffect 的依賴陣列很像。
我幾乎沒遇過把變數傳給 `queryFn` 但沒放進 `queryKey` 的情境。

#### 新的快取條目

因為 query key 是快取的 key，
所以從 'all' 換到 'done' 會產生新的快取條目，
第一次切換時會有 loading 狀態（可能會看到 loading spinner）。
這不是很理想，所以如果可以的話，
我們可以用 [initialData](https://tanstack.com/query/latest/docs/react/guides/initial-query-data#initial-data-from-cache) 預先填快取。
這個例子就很適合，因為我們可以在 client 端先過濾 todos：

```ts
// pre-filtering

type State = 'all' | 'open' | 'done'
type Todo = {
  id: number
  state: State
}
type Todos = ReadonlyArray<Todo>

const fetchTodos = async (state: State): Promise<Todos> => {
  const response = await axios.get(`todos/${state}`)
  return response.data
}

export const useTodosQuery = (state: State) =>
  useQuery({
    queryKey: ['todos', state],
    queryFn: () => fetchTodos(state),
    initialData: () => {
      const allTodos = queryClient.getQueryData<Todos>([
        'todos',
        'all',
      ])
      const filteredData =
        allTodos?.filter((todo) => todo.state === state) ?? []

      return filteredData.length > 0 ? filteredData : undefined
    },
  })
```

這樣每次切換篩選條件時，如果還沒抓到資料，
就先從 'all todos' 快取裡過濾出來給使用者看，
等背景抓完再更新。

這樣 UX 會好很多，只要幾行程式碼。

### 保持 server state 跟 client state 分離

這跟我上個月寫的[這篇文章](./putting-props-to-use-state)有關：
如果你是用 `useQuery` 拿到資料，盡量不要再把它放進 local state。
主要原因是這樣會自動放棄 React Query 幫你做的背景更新，
因為 local state 的「副本」不會自動跟著更新。

如果你只是要拿資料來初始化表單，
等資料抓到再 render 表單，這樣做沒問題。
這種情境下背景更新通常不會有新資料，
就算有，表單也已經初始化了。
如果你是這種需求，記得把 `staleTime` 設成 Infinity，避免不必要的 refetch：

```jsx
// initial-form-data
const App = () => {
  const { data } = useQuery({
    queryKey: ['key'],
    queryFn,
    staleTime: Infinity,
  })

  return data ? <MyForm initialData={data} /> : null
}

const MyForm = ({ initialData }) => {
  const [data, setData] = React.useState(initialData)
  ...
}
```

如果你要顯示的資料還要讓使用者編輯，這個原則會比較難遵守，
但這樣做有很多好處。

重點就是：永遠不要把 React Query 拿到的值複製到 local state，
這樣才能確保你看到的永遠是最新資料。

### `enabled` 選項超好用

`useQuery` 有很多自訂選項，`enabled` 超級強大，
可以讓你做很多很酷的事（雙關 intended XD）：

- [依賴查詢（Dependent Queries）](https://tanstack.com/query/latest/docs/react/guides/dependent-queries)<br />
  先用一個 query 抓資料，等有結果後再讓第二個 query 執行。
- 動態開關查詢<br />
  有些 query 會定時抓資料（用 `refetchInterval`），但如果彈跳視窗開著，可以暫時停掉，避免畫面在背後更新。
- 等待使用者輸入<br />
  有些查詢條件還沒設定好時，先不要啟用 query，等用戶按下「查詢」再啟用。
- 用戶輸入後停用查詢<br />
  例如有草稿資料要優先顯示，就可以暫時停用 query。

### 不要把 queryCache 當 local state manager

如果你用 `queryClient.setQueryData` 操作 queryCache，
應該只用在 optimistic update 或 mutation 後寫入 server 回傳的資料。
因為每次背景 refetch 都可能覆蓋掉你寫進去的資料，
所以 local state 還是建議用 [useState](https://reactjs.org/docs/hooks-state.html)、[zustand](https://zustand.surge.sh/)、[redux](https://redux.js.org/) 這類工具。

### 建立自訂 hook

就算只是包一層 `useQuery`，寫成自訂 hook 也很值得，因為：

- 可以把資料抓取邏輯從 UI 拆開，但又跟 `useQuery` 放在一起。
- 所有用到同一個 query key（還有型別定義）都集中在一個檔案。
- 以後要調設定或加資料轉換，只要改一個地方。

上面 [todos 查詢](#treat-the-query-key-like-a-dependency-array) 就是個例子。

**最後更新：2023-10-21**

### 本文原始連結

[Practical React Query](https://tkdodo.eu/blog/practical-react-query)
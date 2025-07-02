---
sidebar_position: 12
title: Mastering Mutations in React Query
description: 深入解析 React Query mutation 的設計原則與實務技巧，包含快取、refetch、手動操作、樂觀更新與常見陷阱，讓你的資料更新更有效率、更易維護。
tags:
  - React Query
last_update:
  date: 2025-07-01
  author: Danny
---

# 精通 React Query 的 Mutation 操作

我們已經介紹過 React Query 很多功能與概念，大多都圍繞在「**取得**」資料（用 `useQuery` hook）。但資料處理還有另一個很重要的面向：**更新**。

這時就要用到 React Query 的 `useMutation` hook。

## 什麼是 mutation？

廣義來說，mutation 就是會有副作用的函式。舉例來說，Array 的 `push` 方法會直接**改變**原本的陣列：

```js
// mutable-array-push
const myArray = [1]
myArray.push(2)

console.log(myArray) // [1, 2]
```

相對的，`concat` 是 immutable 的，會回傳新陣列，不會動到原本的：

```js
// immutable-array-concat
const myArray = [1]
const newArray = myArray.concat(2)

console.log(myArray) //  [1]
console.log(newArray) // [1, 2]
```

顧名思義，_useMutation_ 也會有副作用。在 React Query 管理 server state 的情境下，mutation 就是「對 server 做出改變」的函式。像是在資料庫新增 todo、用戶登入（產生 token）等。

某些層面上，`useMutation` 跟 `useQuery` 很像，但也有不少不同。

## 跟 useQuery 的相似處

`useMutation` 會追蹤 mutation 的狀態，就像 `useQuery` 會追蹤查詢一樣。你可以拿到 `loading`、`error`、`status` 等欄位，方便顯示給使用者。

也有跟 `useQuery` 一樣的 callback：`onSuccess`、`onError`、`onSettled`。但相似處大致到這裡就結束了。

## 跟 useQuery 的不同處

> useQuery 是宣告式，useMutation 是命令式。

查詢（query）大多是自動執行的。你定義好依賴，React Query 會自動幫你執行查詢，還會在需要時自動背景更新。這對查詢很棒，因為我們希望畫面永遠跟後端資料同步。

但 mutation 如果也自動執行就很糟了。想像每次切回瀏覽器分頁就自動新增一筆 todo 🤨。所以 mutation 不是自動執行，而是 React Query 給你一個函式，讓你想要時再呼叫：

```jsx
// imperative-mutate
function AddComment({ id }) {
  // 這裡還沒真的做任何事
  const addComment = useMutation({
    mutationFn: (newComment) =>
      axios.post(`/posts/${id}/comments`, newComment),
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        // ✅ 送出表單時才執行 mutation
        addComment.mutate(
          new FormData(event.currentTarget).get('comment')
        )
      }}
    >
      <textarea name="comment" />
      <button type="submit">Comment</button>
    </form>
  )
}
```

另一個不同點是 mutation 不會像 `useQuery` 那樣共用狀態。你可以在多個元件呼叫同一個 `useQuery`，拿到同一份快取資料，但 mutation 不會這樣。

## mutation 與查詢的關聯

mutation 設計上不會直接跟查詢綁在一起。像「按讚」的 mutation 跟「抓 blog post」的查詢沒有直接關聯。要讓 mutation 影響查詢資料，React Query 主要有兩種做法：

### 1. 失效（invalidate）查詢

這是最簡單的做法。記住，server state 其實只是某個時間點的快照。React Query 會盡量幫你保持最新，但如果你主動用 mutation 改變 server state，這時就可以告訴 React Query 某些快取資料「已經過期」。React Query 會自動 refetch 這些資料，畫面就會自動更新。你只要告訴它**要失效哪些查詢**：

```jsx
// invalidation-from-mutation
const useAddComment = (id) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newComment) =>
      axios.post(`/posts/${id}/comments`, newComment),
    onSuccess: () => {
      // ✅ 重新抓這篇文章的留言列表
      queryClient.invalidateQueries({
        queryKey: ['posts', id, 'comments']
      })
    },
  })
}
```

失效查詢很聰明，會用模糊比對（fuzzy match）查詢 key。如果你有多個留言列表查詢，全部都會被標記為 stale，但只有目前畫面上有用到的才會自動 refetch，其他會等下次用到時再抓。

舉例，假設你有留言排序功能，快取裡有兩個查詢：

```
['posts', 5, 'comments', { sortBy: ['date', 'asc'] }]
['posts', 5, 'comments', { sortBy: ['author', 'desc'] }]
```

只要畫面上有顯示其中一個，`invalidateQueries` 只會 refetch 那個，另一個只會被標記為 stale。

### 2. 直接更新快取

有時你不想 refetch，特別是 mutation 已經回傳你需要的所有資料。像是更新 blog post 標題，後端直接回傳完整 post，這時可以用 `setQueryData` 直接更新快取：

```jsx
// update-from-mutation-response
const useUpdateTitle = (id) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newTitle) =>
      axios
        .patch(`/posts/${id}`, { title: newTitle })
        .then((response) => response.data),
    // 💡 mutation 回傳的資料會傳給 onSuccess
    onSuccess: (newPost) => {
      // ✅ 直接更新 detail view
      queryClient.setQueryData(['posts', id], newPost)
    },
  })
}
```

直接用 `setQueryData` 放進快取，所有用到這個查詢的元件都會自動 re-render。

更多直接更新快取與兩種方法結合的例子可參考[#8: 有效設計 React Query Key](effective-react-query-keys#structure)。

---

我個人認為大多數情況下，應該優先用失效查詢。直接更新快取雖然很即時，但前端要寫更多邏輯，還要跟後端邏輯同步。像排序列表這種情境，直接更新很難處理，失效整個列表反而更安全。

## 樂觀更新（Optimistic updates）

樂觀更新是 React Query mutation 很強大的賣點之一。`useQuery` 快取讓你在查詢切換時能即時看到資料，配合 [prefetch](https://react-query.tanstack.com/guides/prefetching) 整個 UI 會很流暢。mutation 也能做到類似效果。

很多時候我們很有把握 mutation 會成功，為什麼要讓使用者等後端回應才看到結果？樂觀更新的想法就是「先假裝成功」，等真的成功再失效查詢，失敗就還原 UI。

這對小型 mutation、需要即時回饋的互動很有用。像 toggle button，如果按下去沒反應，使用者會一直點，感覺很卡。

### 範例

這裡不再額外舉例，官方文件有很完整的說明與 [TypeScript 範例](https://tanstack.com/query/v4/docs/examples/react/optimistic-updates-typescript)。

我認為樂觀更新有時被過度使用。不是每個 mutation 都適合 optimistic update。你要很確定失敗機率很低，因為 rollback UX 不太好。像 Dialog 表單送出就關閉、或更新後自動導頁，這些如果失敗很難還原。

另外，只有真的需要即時回饋時才用 optimistic update（像 toggle button）。要寫的 code 也比較多，因為你要模擬後端行為，簡單的像 flip boolean 或加一筆資料還好，複雜一點就很難：

- 新增 todo 需要 id，哪裡來？
- 列表有排序，新增的資料要插在哪？
- 如果別人同時新增資料，refetch 後 optimistic entry 會不會換位置？

這些 edge case 可能讓 UX 更糟，有時只要把按鈕 disable、顯示 loading 就夠了。選對工具才是王道。

## 常見陷阱

最後來聊聊 mutation 常見的注意事項：

### awaited Promises

mutation callback 回傳的 Promise 會被 React Query await，而 `invalidateQueries` 也會回傳 Promise。如果你希望 mutation 在相關查詢更新完才結束 loading，要記得 return `invalidateQueries`：

```js
// awaited-promises
{
  // 🎉 會等 query invalidation 完成
  onSuccess: () => {
    return queryClient.invalidateQueries({
      queryKey: ['posts', id, 'comments'],
    })
  }
}
{
  // 🚀 fire and forget - 不會等
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['posts', id, 'comments']
    })
  }
}
```

### Mutate 或 MutateAsync

`useMutation` 會給你 `mutate` 跟 `mutateAsync` 兩個函式。差別在哪？什麼時候該用哪個？

`mutate` 不會回傳任何東西，`mutateAsync` 會回傳一個 Promise，裡面有 mutation 結果。你可能會想用 `mutateAsync` 拿到回傳值，但我建議大多數情況還是用 `mutate`。

你還是可以在 callback 拿到 `data` 或 `error`，而且不用自己處理錯誤。`mutateAsync` 會把錯誤丟出來，你要自己 catch，不然會有 [unhandled promise rejection](https://stackoverflow.com/questions/40500490/what-is-an-unhandled-promise-rejection)。

```js
// accessing-mutation-data
const onSubmit = () => {
  // ✅ 用 onSuccess 拿 response
  myMutation.mutate(someData, {
    onSuccess: (data) => history.push(data.url),
  })
}

const onSubmit = async () => {
  // 🚨 這樣雖然能拿到資料，但沒處理錯誤
  const data = await myMutation.mutateAsync(someData)
  history.push(data.url)
}

const onSubmit = async () => {
  // 😕 這樣可以，但寫法很囉唆
  try {
    const data = await myMutation.mutateAsync(someData)
    history.push(data.url)
  } catch (error) {
    // do nothing
  }
}
```

用 `mutate` 不用處理錯誤，React Query 會自動 catch（然後丟掉）。底層實作就是 *mutateAsync().catch(noop)*😎

只有真的需要 Promise（像要同時等多個 mutation、或有依賴順序）才用 `mutateAsync`。

### mutation 只接受一個參數

因為 mutate 的最後一個參數是 options，所以 `useMutation` 目前只接受**一個**變數參數。這雖然有限制，但可以用物件包起來：

```jsx
// multiple-variables
// 🚨 這樣不行
const mutation = useMutation({
  mutationFn: (title, body) => updateTodo(title, body),
})
mutation.mutate('hello', 'world')

// ✅ 用物件包多個參數
const mutation = useMutation({
  mutationFn: ({ title, body }) => updateTodo(title, body),
})
mutation.mutate({ title: 'hello', body: 'world' })
```

為什麼要這樣，可以參考[這個討論](https://github.com/tannerlinsley/react-query/discussions/1226)。

### 有些 callback 可能不會觸發

`useMutation` 跟 `mutate` 都可以設 callback。要注意 `useMutation` 的 callback 會比 `mutate` 的先觸發，而且如果元件在 mutation 結束前就 unmount，`mutate` 的 callback 可能根本不會執行。

建議把「一定要做的事」（像失效查詢）寫在 `useMutation` callback，UI 相關（像導頁、toast）寫在 `mutate` callback。這樣 custom hook 只管查詢邏輯，UI 行為還是放在元件裡，hook 也更好重用：

```js
// separate-concerns
const useUpdateTodo = () =>
  useMutation({
    mutationFn: updateTodo,
    // ✅ 一定要做的事
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos', 'list']
      })
    },
  })

// 在元件裡
const updateTodo = useUpdateTodo()
updateTodo.mutate(
  { title: 'newTitle' },
  // ✅ 只有還在 detail 頁時才導頁
  { onSuccess: () => history.push('/todos') }
)
```


### 本文原始連結

[Mastering  Mutations in React Query](https://tkdodo.eu/blog/mastering-mutations-in-react-query)
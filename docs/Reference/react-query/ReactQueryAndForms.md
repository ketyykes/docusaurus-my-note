---
sidebar_position: 14
title: React Query and Forms
description: 表單常常讓 server state 與 client state 的界線變得模糊，這篇文章帶你了解如何用 React Query 處理表單。
tags:
  - React Query
  - TanStack Query
last_update:
  date: 2025-07-01
  author: Danny
---

# React Query and Forms

表單是許多 web 應用程式中更新資料的主要方式。我們用 React Query 不只拿資料（react query as a state manager），也會用來修改資料，所以一定會遇到要把這個強大的 async 狀態管理工具和表單整合的情境。

好消息是，其實表單本身沒什麼特別的：它就是一堆 html 元素，用來顯示資料。但當我們想要**修改**這些資料時，server state 跟 client state 的界線就會變得模糊，這也是複雜度的來源。

## Server State vs. Client State

簡單回顧一下，**Server State** 是我們「不擁有」的狀態，通常是 async 的，只能看到上次抓到的快照。

**Client State** 則是前端完全掌控的狀態，通常是同步的，隨時都知道最新值。

如果我們顯示一個人員列表，這肯定是 server state。但如果點進去顯示細節、打算編輯，這時 server state 會變成 client state 嗎？還是混合體？

## 最簡單的做法

我之前寫過，不太建議把 state 從一個 state manager 複製到另一個（像是 putting props to useState 或 React Query 複製到 local state）。

但表單是個例外，只要你知道 tradeoff 並有意識地這麼做。大多數情況下，表單只需要把 server state 當作**初始值**。我們抓到 firstName、lastName，放進 form state，然後讓使用者編輯。

來看個例子：

```js
// simple-form
function PersonDetail({ id }) {
  const { data } = useQuery({
    queryKey: ['person', id],
    queryFn: () => fetchPerson(id),
  })
  const { register, handleSubmit } = useForm()
  const { mutate } = useMutation({
    mutationFn: (values) => updatePerson(values),
  })

  if (data) {
    return (
      <form onSubmit={handleSubmit(mutate)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            {...register('firstName')}
            defaultValue={data.firstName}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            {...register('lastName')}
            defaultValue={data.lastName}
          />
        </div>
        <input type="submit" />
      </form>
    )
  }

  return 'loading...'
}
```

這樣其實很好用——但有什麼 tradeoff？

### 資料可能是 undefined

你可能知道 `useForm` 也可以直接用 defaultValues 初始化整個表單，對大表單很方便。但因為不能條件式呼叫 hook，而 `data` 在第一次 render 時是 undefined，所以不能直接這樣寫：

```js
// no-default-values
const { data } = useQuery({
  queryKey: ['person', id],
  queryFn: () => fetchPerson(id),
})
// 🚨 這樣 form 會用 undefined 初始化
const { register, handleSubmit } = useForm({ defaultValues: data })
```

用 useState 複製、或用 uncontrolled form（react-hook-form 其實底層就是這樣）也會遇到一樣的問題。最好的解法是把表單拆成獨立元件：

```js
// separate-form
function PersonDetail({ id }) {
  const { data } = useQuery({
    queryKey: ['person', id],
    queryFn: () => fetchPerson(id),
  })
  const { mutate } = useMutation({
    mutationFn: (values) => updatePerson(values),
  })

  if (data) {
    return <PersonForm person={data} onSubmit={mutate} />
  }

  return 'loading...'
}

function PersonForm({ person, onSubmit }) {
  const { register, handleSubmit } = useForm({ defaultValues: person })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input {...register('firstName')} />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input {...register('lastName')} />
      </div>
      <input type="submit" />
    </form>
  )
}
```

這樣其實不錯，資料抓取跟呈現分開。我個人不太愛這種拆法，但這裡確實很實用。

### 沒有背景更新

React Query 的核心就是讓 UI 跟 server state 保持同步。但只要你把 state 複製到別的地方，React Query 就沒辦法自動更新。如果背景 refetch 拿到新資料，form state 不會自動跟著變。這通常沒差（像個人資料表單），但這種情境下建議把 `staleTime` 設大一點，避免不必要的背景更新：

```js
// no-background-updates
// ✅ 不要背景自動更新
const { data } = useQuery({
  queryKey: ['person', id],
  queryFn: () => fetchPerson(id),
  staleTime: Infinity,
})
```

這種做法在大表單或多人協作時會有問題。表單越大，填寫時間越長。如果多人同時編輯不同欄位，最後一個送出的人會蓋掉別人改的值，因為畫面上看到的資料可能已經過時。

react-hook-form 可以偵測哪些欄位被改過，只送「dirty」欄位到 server（[範例](https://codesandbox.io/s/react-hook-form-submit-only-dirty-fields-ol5d2)），這很酷。但這還是沒辦法讓你看到別人剛剛改過的最新值。也許你會因為沒看到最新資料而做出不同的輸入。

那要怎麼讓表單編輯時還能反映背景更新？

## 保持背景更新

一種做法是嚴格分開 state。Server State 交給 React Query，Client State 只記錄使用者改過的欄位。畫面上顯示的資料就是這兩者的**衍生狀態**(derived state)：有改過就用 client state，沒改過就用 server state：

```js
// separate-states
function PersonDetail({ id }) {
  const { data } = useQuery({
    queryKey: ['person', id],
    queryFn: () => fetchPerson(id),
  })
  const { control, handleSubmit } = useForm()
  const { mutate } = useMutation({
    mutationFn: (values) => updatePerson(values),
  })

  if (data) {
    return (
      <form onSubmit={handleSubmit(mutate)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              // ✅ client state 有值就用，否則用 server state
              <input
                {...field}
                value={field.value ?? data.firstName}
              />
            )}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                value={field.value ?? data.lastName}
              />
            )}
          />
        </div>
        <input type="submit" />
      </form>
    )
  }

  return 'loading...'
}
```

這樣就能保留背景更新，沒改過的欄位還是會反映最新 server state。這種做法的 caveat：

### 你需要 controlled fields

目前沒什麼好方法能用 uncontrolled fields 實作這種 pattern，所以上面才用 controlled fields。如果有更好的做法歡迎告訴我。

### 衍生狀態可能很難寫

這種做法對淺層表單很適合，可以用 nullish coalesce fallback 到 server state，但如果是巢狀物件就比較難 merge。有時候背景自動改值 UX 也不一定好，可能只要標示「有欄位不同步」讓使用者自己決定要不要更新會更好。

---

不管你選哪種做法，都要清楚知道各自的優缺點。

## Tips & Tricks

除了上面兩種主要做法，這裡還有一些 React Query + 表單的小技巧：

### 防止重複送出

可以用 `useMutation` 回傳的 `isLoading`，只要 mutation 還在跑就 disable 送出按鈕：

```js
// disabled-submit
const { mutate, isLoading } = useMutation({
  mutationFn: (values) => updatePerson(values)
})
<input type="submit" disabled={isLoading} />
```

### mutation 後失效查詢並重設表單

如果送出表單後沒有跳轉至不同頁面，建議在失效查詢後再 reset 表單。像這篇 (mastering-mutations-in-react-query#some-callbacks-might-not-fire) 說的，最好在 mutate 的 onSuccess callback 做這件事。如果 state 分開管理，只要 reset 成 undefined 就會自動用 server state：

```js
// reset-form
function PersonDetail({ id }) {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['person', id],
    queryFn: () => fetchPerson(id),
  })
  const { control, handleSubmit, reset } = useForm()
  const { mutate } = useMutation({
    mutationFn: updatePerson,
    // ✅ return Promise from invalidation
    // so that it will be awaited
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['person', id] }),
  })

  if (data) {
    return (
      <form
        onSubmit={handleSubmit((values) =>
          // ✅ reset client state back to undefined
          mutate(values, { onSuccess: () => reset() })
        )}
      >
        <div>
          <label htmlFor="firstName">First Name</label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                value={field.value ?? data.firstName}
              />
            )}
          />
        </div>
        <input type="submit" />
      </form>
    )
  }

  return 'loading...'
}
```

### 本文原始連結

[React Query and Forms](https://tkdodo.eu/blog/react-query-and-forms)
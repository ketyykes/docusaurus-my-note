---
sidebar_position: 4
title: Status Checks in ReactQuery
description: 深入解析 React Query 查詢狀態的判斷與顯示，說明各種狀態 flag 的意義、背景 refetch 失敗時的 UX 處理，以及實務上如何設計更友善的資料顯示邏輯。
tags:
  - React Query
last_update:
  date: 2025-07-01
  author: Danny
---

# Status Checks in ReactQuery 

React Query 的一大優點，就是能很方便地取得查詢的狀態欄位。你可以馬上知道查詢是否在 loading，或是發生錯誤。這些狀態 flag 大多來自內部的狀態機。根據[型別定義](https://github.com/TanStack/query/blob/87358d73582b369f06cc81d0dfa135323df7d43d/packages/query-core/src/types.ts#L441)，查詢狀態有以下幾種：

- `success`：查詢成功，且有 `data`
- `error`：查詢失敗，且有 `error`
- `pending`：查詢還沒有資料

注意：`isFetching` 這個 flag **不是**狀態機的一部分，而是額外的旗標，只要有請求進行中就會是 true。你可以同時是 fetching 且 success，也可以 fetching 且 error，但不會同時 loading 跟 success，狀態機會幫你處理好。

> v5 以前，`pending` 叫做 `loading`；v4 以前還有第四種狀態 `idle`。
> 另外，`isFetching` 來自另一個 `fetchStatus`，就像 `isPaused` 一樣。更多細節可參考[#13: Offline React Query](offline-react-query)。

## 標準範例

大多數範例會長這樣：

```jsx
// standard-example
const todos = useTodos()

if (todos.isPending) {
  return 'Loading...'
}
if (todos.error) {
  return 'An error has occurred: ' + todos.error.message
}

return <div>{todos.data.map(renderTodo)}</div>
```

這裡我們先檢查 pending 跟 error，再顯示資料。這對某些情境來說沒問題，但對其他情境就不一定適合。很多自製的抓資料解法沒有 refetch 機制，或只會在使用者互動時才 refetch。

但 React Query 不是這樣。

它預設會很積極地自動 refetch，使用者不需要手動觸發。像 `refetchOnMount`、`refetchOnWindowFocus`、`refetchOnReconnect` 這些設計，能讓資料保持最新，但如果自動背景 refetch 失敗，UX 可能會很怪。

## 背景錯誤

很多時候，背景 refetch 失敗其實可以不用理會。但上面那段 code 不會這樣做。舉兩個例子：

- 使用者打開頁面，初次查詢成功。過一陣子他切到別的分頁看信箱，回來時 React Query 會自動背景 refetch，這次失敗了。
- 使用者在列表頁點進細節頁，然後回到列表，再進細節頁，這時會看到快取資料。這很好，但如果背景 refetch 失敗呢？

這兩種情境下，查詢狀態會變成：

```json
{
  "status": "error",
  "error": { "message": "Something went wrong" },
  "data": [{ ... }]
}
```

你會發現，這時同時有 error 跟舊資料（stale data）。這就是 React Query 的強大之處——它採用 stale-while-revalidate 快取策略，只要有資料就會給你，即使是舊的。

接下來就看你要怎麼顯示了。要不要顯示錯誤？還是只顯示舊資料？還是兩者都顯示，像加個「背景錯誤」提示？

這沒有標準答案，要看你的需求。不過以上兩個例子，如果直接把資料換成錯誤畫面，UX 會很怪。

這點更重要的是，React Query 預設會用指數退避重試三次失敗的查詢，所以有時要等幾秒才會從舊資料變成錯誤畫面。如果你又沒顯示背景 loading，使用者會更困惑。

所以我通常會先檢查有沒有資料：

```jsx
// data-first
const todos = useTodos()

if (todos.data) {
  return <div>{todos.data.map(renderTodo)}</div>
}
if (todos.error) {
  return 'An error has occurred: ' + todos.error.message
}

return 'Loading...'
```

還是那句話，沒有絕對對錯，完全看你的需求。大家要注意 React Query 很積極 refetch 的特性，寫 code 時要考慮這點，不要只照著簡單的 todo 範例寫 😉。

特別感謝 [Niek Bosch](https://github.com/boschni) 指出這種狀態檢查模式在某些情境下可能有問題。

**最後更新：2023-10-21**


### 本文原始連結

[Status Checks in ReactQuery](https://tkdodo.eu/blog/status-checks-in-react-query)


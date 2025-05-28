---
sidebar_position: 3
title: 條件渲染
description: 學習如何使用 Vue Test Utils 測試條件渲染的元件。從 v-if、v-show 到動態元件，掌握各種條件渲染情境的測試技巧。
tags:
  - test
last_update:
  date: 2025-05-28
  author: Danny
---


# 條件渲染

Vue Test Utils 提供多種功能來渲染元件並對元件狀態進行斷言，目的是驗證元件行為是否正確。這篇文章會介紹如何渲染元件，以及如何驗證元件內容是否正確顯示。

這篇文章也有短影片版本。

## 查找元素

Vue 最基本的功能之一就是可以用 v-if 動態插入或移除元素。來看看如何測試一個使用 v-if 的元件。

```vue
<!-- Nav.vue -->
<script setup>
import { ref } from 'vue'

const admin = ref(false)
</script>

<template>
  <nav>
    <a id="profile" href="/profile">My Profile</a>
    <a v-if="admin" id="admin" href="/admin">Admin</a>
  </nav>
</template>
```

在 `<Nav>` 元件中，會顯示一個連到使用者個人頁的連結。如果 admin 為 true，還會多顯示一個連到管理頁的連結。有三種情境需要驗證：

1. /profile 連結應該要顯示。
2. 當使用者是 admin 時，/admin 連結應該要顯示。
3. 當使用者不是 admin 時，/admin 連結不應該顯示。

---

## 使用 get()

`wrapper` 有一個 `get()` 方法可以搜尋已存在的元素，語法和 querySelector 一樣。

我們可以用 get() 來斷言 profile 連結的內容：

```js
test('renders a profile link', () => {
  const wrapper = mount(Nav)

  // 這裡隱含斷言 #profile 元素一定存在
  const profileLink = wrapper.get('#profile')

  expect(profileLink.text()).toEqual('My Profile')
})
```

如果 get() 找不到符合 selector 的元素，會丟出錯誤，測試就會失敗。get() 如果找到元素，會回傳一個 DOMWrapper。DOMWrapper 是包裹 DOM 元素的薄包裝，實作了 Wrapper API，所以我們可以用 profileLink.text() 取得文字內容。你也可以用 element 屬性取得原生 DOM 元素。

還有另一種 wrapper 叫 VueWrapper，是 getComponent 回傳的，使用方式類似。

---

## 使用 find() 和 exists()

get() 假設元素一定存在，找不到就會丟錯，不建議用來斷言元素是否存在。

要斷言元素是否存在，請用 find() 搭配 exists()。下面這個測試斷言 admin 預設為 false 時，admin 連結不會出現：

```js
test('does not render an admin link', () => {
  const wrapper = mount(Nav)

  // 用 wrapper.get 會丟錯，讓測試失敗
  expect(wrapper.find('#admin').exists()).toBe(false)
})
```

注意我們對 find() 回傳的值呼叫 exists()。find() 跟 mount() 一樣會回傳一個 wrapper。mount() 包的是 Vue 元件，所以有多一些方法，find() 回傳的是一般 DOM 節點，但兩者有很多共用方法。像 classes() 可以取得 DOM 節點的 class，trigger() 可以模擬使用者互動。更多方法請參考官方文件。

---

## 使用 data

最後一個測試是驗證 admin 為 true 時，admin 連結會顯示。預設是 false，但我們可以用 mount() 的第二個參數（mounting options）來覆蓋。

對於 data，可以用 data 這個選項：

```js
test('renders an admin link', () => {
  const wrapper = mount(Nav, {
    data() {
      return {
        admin: true
      }
    }
  })

  // 用 get() 隱含斷言元素一定存在
  expect(wrapper.get('#admin').text()).toEqual('Admin')
})
```

如果 data 裡有其他屬性不用擔心，Vue Test Utils 會自動合併，mounting options 的 data 會覆蓋預設值。

想了解更多 mounting options，請參考 Passing Data 或官方文件。

---

## 檢查元素可見性

有時你只想隱藏/顯示元素但不移除 DOM，這時可以用 v-show。（你可以參考 v-if 和 v-show 的差異）

以下是一個用 v-show 的元件範例：

```vue
<!-- Nav.vue -->
<script setup>
import { ref } from 'vue'

const shouldShowDropdown = ref(false)
</script>

<template>
  <nav>
    <a id="user" href="/profile">My Profile</a>
    <ul v-show="shouldShowDropdown" id="user-dropdown">
      <!-- dropdown content -->
    </ul>
  </nav>
</template>
```

這種情況下，元素雖然不可見但還是在 DOM 裡。get() 或 find() 都會回傳一個 Wrapper，find().exists() 也會回傳 true，因為元素還在 DOM 裡。

---

## 使用 isVisible()

isVisible() 可以檢查元素是否隱藏。它會檢查：

- 元素或其父層有 `display: none`、`visibility: hidden`、`opacity: 0` 樣式
- 元素或其父層在收合的 `<details>` 標籤內
- 元素或其父層有 hidden 屬性

遇到這些情況，isVisible() 會回傳 false。

測試 v-show 的情境可以這樣寫：

```js
test('does not show the user dropdown', () => {
  const wrapper = mount(Nav)

  expect(wrapper.get('#user-dropdown').isVisible()).toBe(false)
})
```

---

## 結論

- 用 find() 搭配 exists() 來驗證元素是否在 DOM 裡。
- 如果預期元素一定存在，用 get()。
- data 選項可以設定元件的預設值。
- 用 get() 搭配 isVisible() 來驗證 DOM 裡元素的可見性。

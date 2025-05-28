---
sidebar_position: 2
title: 快速入門教學
description: 透過實作一個 Todo 應用程式，學習 Vue Test Utils 的核心功能。從元件掛載、事件處理到表單操作，帶你掌握 Vue 元件測試的關鍵技巧。
tags:
  - test
last_update:
  date: 2025-05-28
  author: Danny
---

# 快速入門教學

讓我們直接開始吧！這份教學會帶你邊寫測試邊打造一個簡單的 Todo 應用，學習 Vue Test Utils（VTU）的基本用法。本教學會涵蓋：

- 掛載元件
- 查找元素
- 填寫表單
- 觸發事件

## 開始

我們先從一個只有一個 todo 的簡單 TodoApp 元件開始：

```vue
<template>
  <div></div>
</template>

<script setup>
import { ref } from 'vue'

const todos = ref([
  {
    id: 1,
    text: 'Learn Vue.js 3',
    completed: false
  }
])
</script>
```

## 第一個測試：渲染一個 todo

我們要寫的第一個測試是驗證 todo 是否有被渲染。先看測試內容，再來說明每個部分：

```js
import { mount } from '@vue/test-utils'
import TodoApp from './TodoApp.vue'

test('renders a todo', () => {
  const wrapper = mount(TodoApp)

  const todo = wrapper.get('[data-test="todo"]')

  expect(todo.text()).toBe('Learn Vue.js 3')
})
```

我們先引入 `mount`，這是 VTU 渲染元件的主要方式。用 `test` 函式宣告一個測試，並寫上簡短描述。`test` 和 `expect` 這兩個函式在大多數測試執行器（像 Jest）中都是全域可用的。如果你對 `test` 和 `expect` 不熟，可以參考 Jest 文件的簡單範例。

接著呼叫 `mount` 並傳入元件，這幾乎是每個測試都會做的事。慣例上我們會把結果存到 `wrapper` 變數，因為 `mount` 會回傳一個包裹元件的「wrapper」，提供許多方便的測試方法。

最後，我們用 `expect` 來斷言實際輸出是否符合預期。這裡我們用 `get` 找到 selector 為 `data-test="todo"` 的元素（在 DOM 裡會長這樣 `<div data-test="todo">...</div>`），然後用 `text` 取得內容，預期應該是 'Learn Vue.js 3'。

使用 `data-test` selector 不是強制的，但可以讓測試更穩定。class 和 id 很容易因為需求變動而更改，但 `data-test` 很明確告訴其他開發者這是給測試用的元素，不要隨便動。

## 讓測試通過

如果現在執行這個測試，會失敗並出現錯誤訊息：Unable to get [data-test="todo"]。因為我們還沒渲染任何 todo，所以 `get()` 找不到元素。讓我們把 `<template>` 改成會渲染 todos 陣列：

```vue
<template>
  <div>
    <div v-for="todo in todos" :key="todo.id" data-test="todo">
      {{ todo.text }}
    </div>
  </div>
</template>
```

這樣一改，測試就會通過。恭喜你，完成了第一個元件測試！

## 新增 todo

接下來要讓使用者可以新增 todo。需要一個表單和輸入框，讓使用者輸入內容並送出。當表單送出時，應該會看到新的 todo 被渲染。來看測試內容：

```js
import { mount } from '@vue/test-utils'
import TodoApp from './TodoApp.vue'

test('creates a todo', () => {
  const wrapper = mount(TodoApp)
  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1)

  wrapper.get('[data-test="new-todo"]').setValue('New todo')
  wrapper.get('[data-test="form"]').trigger('submit')

  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
})
```

一樣先用 `mount` 渲染元件，並斷言一開始只有 1 個 todo，這樣最後測試才知道有多新增一個。

用 `setValue` 更新 `<input>` 的值。

更新完 `<input>` 後，用 `trigger` 模擬使用者送出表單。最後斷言 todo 數量從 1 變成 2。

如果現在執行這個測試，當然會失敗。讓我們把 TodoApp.vue 加上 `<form>` 和 `<input>`，並讓測試通過：

```vue
<template>
  <div>
    <div v-for="todo in todos" :key="todo.id" data-test="todo">
      {{ todo.text }}
    </div>

    <form data-test="form" @submit.prevent="createTodo">
      <input data-test="new-todo" v-model="newTodo" />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newTodo = ref('')
const todos = ref([
  {
    id: 1,
    text: 'Learn Vue.js 3',
    completed: false
  }
])

const createTodo = () => {
  todos.value.push({
    id: 2,
    text: newTodo.value,
    completed: false
  })
}
</script>
```

這裡用 `v-model` 綁定 `<input>`，用 `@submit` 監聽表單送出，呼叫 `createTodo` 把新 todo 加進 todos 陣列。

雖然看起來沒問題，但執行測試會出錯：

```
expect(received).toHaveLength(expected)

    Expected length: 2
    Received length: 1
    Received array:  [{"element": <div data-test="todo">Learn Vue.js 3</div>}]
```

todo 數量沒增加。原因是 Jest 預設同步執行測試，最後一行執行完就結束，但 Vue 更新 DOM 是非同步的。我們要把測試標記為 async，並在可能改變 DOM 的方法前加上 await，像 `trigger` 和 `setValue`。改成這樣：

```js
import { mount } from '@vue/test-utils'
import TodoApp from './TodoApp.vue'

test('creates a todo', async () => {
  const wrapper = mount(TodoApp)

  await wrapper.get('[data-test="new-todo"]').setValue('New todo')
  await wrapper.get('[data-test="form"]').trigger('submit')

  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
})
```

這樣測試就會通過了！

## 完成 todo

現在我們可以新增 todo 了，接下來要讓使用者可以用 checkbox 勾選 todo 完成/未完成。還是先從失敗的測試開始：

```js
import { mount } from '@vue/test-utils'
import TodoApp from './TodoApp.vue'

test('completes a todo', async () => {
  const wrapper = mount(TodoApp)

  await wrapper.get('[data-test="todo-checkbox"]').setValue(true)

  expect(wrapper.get('[data-test="todo"]').classes()).toContain('completed')
})
```

這個測試和前面很像，找到元素後用 `setValue` 操作 `<input>`。

最後斷言 todo 元素有 `completed` 這個 class，這樣就能用 CSS 樣式標示完成狀態。

要讓這個測試通過，只要把 `<template>` 改成有 `<input type="checkbox">`，並在 todo 元素加上 class 綁定：

```vue
<template>
  <div>
    <div
      v-for="todo in todos"
      :key="todo.id"
      data-test="todo"
      :class="[todo.completed ? 'completed' : '']"
    >
      {{ todo.text }}
      <input
        type="checkbox"
        v-model="todo.completed"
        data-test="todo-checkbox"
      />
    </div>

    <form data-test="form" @submit.prevent="createTodo">
      <input data-test="new-todo" v-model="newTodo" />
    </form>
  </div>
</template>
```

恭喜你，已經寫出第一組元件測試了！

---

## Arrange, Act, Assert

你可能注意到每個測試裡的程式碼都會用空行分隔。再看一次第二個測試：

```js
import { mount } from '@vue/test-utils'
import TodoApp from './TodoApp.vue'

test('creates a todo', async () => {
  const wrapper = mount(TodoApp)

  await wrapper.get('[data-test="new-todo"]').setValue('New todo')
  await wrapper.get('[data-test="form"]').trigger('submit')

  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
})
```

這個測試分成三個階段，每個階段用空行分隔，分別是 arrange（安排）、act（執行）、assert（斷言）。

- **Arrange**：設定測試情境。複雜一點的例子可能要建立 Vuex store 或填資料庫。
- **Act**：模擬使用者互動。
- **Assert**：檢查元件狀態是否如預期。

幾乎所有測試都會遵循這三個階段。你不一定要用空行分隔，但寫測試時記得這三個步驟會很有幫助。

---

## 結論

- 用 `mount()` 渲染元件。
- 用 `get()` 和 `findAll()` 查詢 DOM。
- `trigger()` 和 `setValue()` 可以模擬使用者輸入。
- 更新 DOM 是非同步操作，記得用 async/await。
- 測試通常分為三個階段：arrange、act、assert。

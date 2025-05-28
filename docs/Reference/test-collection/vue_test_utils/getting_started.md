---
sidebar_position: 1
title: 入門指南
description: 從零開始學習 Vue Test Utils 測試工具，包含元件掛載、事件觸發、DOM 操作等實用教學，幫助你快速掌握 Vue 元件的測試技巧
tags:
  - test
last_update:
  date: 2025-05-28
  author: Danny
---

# 入門指南

歡迎來到 Vue Test Utils，這是 Vue.js 官方的測試工具函式庫！

這份文件是針對 Vue Test Utils v2，主要支援 Vue 3。

簡單來說：

- Vue Test Utils 1 支援 Vue 2。
- Vue Test Utils 2 支援 Vue 3。

## 什麼是 Vue Test Utils？

Vue Test Utils（簡稱 VTU）是一組用來簡化 Vue.js 元件測試的工具函式。它提供一些方法，讓你可以在隔離的環境下掛載並操作 Vue 元件。

來看個範例：

```js
import { mount } from '@vue/test-utils'

// 要測試的元件
const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg']
}

test('displays message', () => {
  const wrapper = mount(MessageComponent, {
    props: {
      msg: 'Hello world'
    }
  })

  // 斷言元件渲染的文字內容
  expect(wrapper.text()).toContain('Hello world')
})
```

Vue Test Utils 通常會搭配測試執行器一起使用。常見的測試執行器有：

- Vitest：終端機型，實驗性支援瀏覽器 UI。
- Cypress：瀏覽器型，支援 Vite、webpack。
- Playwright（實驗性）：瀏覽器型，支援 Vite。
- WebdriverIO：瀏覽器型，支援 Vite、Webpack，跨瀏覽器支援。

Vue Test Utils 是一個精簡且不帶主觀意見的函式庫。如果你想要功能更豐富、操作更方便且有明確設計方向的工具，可以考慮 Cypress Component Testing（有熱重載開發環境），或 Testing Library（強調以無障礙選擇器進行斷言）。這兩個工具底層都用到 Vue Test Utils，並且暴露相同的 API。

## 接下來呢？

想看 Vue Test Utils 的實際應用，可以參考 Crash Course，我們會用測試優先的方式打造一個簡單的 Todo 應用。

文件分為兩大部分：

- Essentials：涵蓋你在測試 Vue 元件時最常遇到的情境。
- Vue Test Utils in Depth：深入探討這個函式庫的進階功能。

你也可以直接查閱完整 API。

如果你偏好看影片學習，這裡也有一系列教學影片可以參考。

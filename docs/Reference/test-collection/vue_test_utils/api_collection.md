---
sidebar_position: 999
title: Vue Test Utils API 簡略說明
description: 這是一份完整的 Vue Test Utils API 的簡短說明
tags:
  - test
last_update:
  date: 2025-05-28
  author: Danny
---

# Vue Test Utils API 說明

### 🧩 掛載元件與選項

* **[mount](https://test-utils.vuejs.org/api/#mount)**:將待測元件「完整掛載」到 DOM，觸發所有生命週期；回傳 `Wrapper` 物件，供後續斷言與操作

  * **[attachTo](https://test-utils.vuejs.org/api/#attachTo)**:`mount` 的選項之一。指定實際 DOM 節點（如 `document.body`）當掛載目標，適合需要瀏覽器量測或 CSS 計算的場景
  * **[attrs](https://test-utils.vuejs.org/api/#attrs)**:`mount / shallowMount` 選項。直接設定根元素的原生屬性（attributes），例：`attrs: { id: 'app' }`
  * **[data](https://test-utils.vuejs.org/api/#data)**:`mount / shallowMount` 選項。傳入初始 **資料**（data）物件，等同於在元件內 `data()` 回傳值
  * **[props](https://test-utils.vuejs.org/api/#props)**:`mount / shallowMount` 選項。一次性注入元件 prop 值；若需動態變更，請使用 `wrapper.setProps`
  * **[slots](https://test-utils.vuejs.org/api/#slots)**:定義具名或預設 slot 內容；可傳字串、函式或 VNode
  * **[global](https://test-utils.vuejs.org/api/#global)**:集中設定全域配置（plugins、provide / inject、mocks…），讓多支測試共用
  * **[shallow](https://test-utils.vuejs.org/api/#shallow)**:`mount` 選項；若設為 `true`，等同於使用 `shallowMount`——僅渲染當前元件，子元件自動 stub 化

---

### 🔧 Wrapper 方法

* **[attributes(name?)](https://test-utils.vuejs.org/api/#attributes)**:取得單一或全部 HTML 屬性；無參數時回傳整個屬性 **物件**
* **[classes(name?)](https://test-utils.vuejs.org/api/#classes)**:同理，用於檢查 class；若傳入字串則回傳布林值
* **[emitted(name?)](https://test-utils.vuejs.org/api/#emitted)**:列出已觸發的自定義事件及其參數；可用來驗證 emit 行為
* **[exists()](https://test-utils.vuejs.org/api/#exists)**:確認 Wrapper 是否存在於 DOM，常搭配 `find()` 使用
* **[find(selector)](https://test-utils.vuejs.org/api/#find)**:傳回首個符合選擇器的 Wrapper；支援 CSS 選擇器、元件、測試 ID 等
* **[findAll(selector)](https://test-utils.vuejs.org/api/#findAll)**:回傳 `WrapperArray`，包含所有符合者
* **[findComponent(definition)](https://test-utils.vuejs.org/api/#findComponent)**:以元件定義尋找（適用單檔元件、異步元件…）
* **[findAllComponents(definition)](https://test-utils.vuejs.org/api/#findAllComponents)**:回傳多個元件 Wrapper
* **[get(selector)](https://test-utils.vuejs.org/api/#get)** / **[getComponent(definition)](https://test-utils.vuejs.org/api/#getComponent)**:同 `find / findComponent`，但若找不到會直接丟錯，適合保證一定存在的情況
* **[html()](https://test-utils.vuejs.org/api/#html)**:取出掛載後的 HTML 字串，便利快照比對
* **[isVisible()](https://test-utils.vuejs.org/api/#isVisible)**:判斷元素在頁面上是否可見（含 CSS 與行內 style）
* **[props(name?)](https://test-utils.vuejs.org/api/#props)**:讀取單一或全部 prop；對比上方「選項 props」，此為 Wrapper 方法
* **[setData(newData)](https://test-utils.vuejs.org/api/#setData)**:以批次方式變更元件內部 **資料**，並等待 Vue 更新
* **[setProps(newProps)](https://test-utils.vuejs.org/api/#setProps)**:更新 prop，適合測試響應式行為
* **[setValue(value)](https://test-utils.vuejs.org/api/#setValue)**:常用於表單元素，會自動觸發 `input` / `change` 事件
* **[text()](https://test-utils.vuejs.org/api/#text)**:取得元素的純文字內容
* **[trigger(event, options?)](https://test-utils.vuejs.org/api/#trigger)**:手動派發 DOM 事件；可附加鍵碼、滑鼠座標等細節
* **[unmount()](https://test-utils.vuejs.org/api/#unmount)**:手動卸載 Wrapper，清理偽造的 DOM

---

### 📦 Wrapper 屬性

* **[vm](https://test-utils.vuejs.org/api/#vm)**:指向被測元件的 Vue 3 執行個體，可直接存取 `this` 內（exposed）成員

---

### 🧪 其他工具與設定

* **[shallowMount](https://test-utils.vuejs.org/api/#shallowMount)**:僅渲染當前元件，將子元件以 `stub` 替代，縮短渲染時間並聚焦單元測試
* **[enableAutoUnmount](https://test-utils.vuejs.org/api/#enableAutoUnmount)**:在 `beforeEach` 自動掛載、`afterEach` 自動卸載；呼叫一次即可於整個 test suite 生效
* **[flushPromises](https://test-utils.vuejs.org/api/#flushPromises)**:等待隊列中所有微任務 Promise 執行完畢，常用於 `nextTick` 及非同步 API 測試
* **[config](https://test-utils.vuejs.org/api/#config)**:Vue Test Utils 的全域靜態設定
  * **[config.global](https://test-utils.vuejs.org/api/#config-global)**:與 `mount` 選項 `global` 相同功能，但影響全部測試；可在測試啟動前一次性設定
* **[components](https://test-utils.vuejs.org/api/#components)**:於 `config.global` 中自訂全域元件或 stub；例：`config.global.components = { RouterLink: RouterLinkStub }`
  * **[RouterLinkStub](https://test-utils.vuejs.org/api/#RouterLinkStub)**:官方提供的 Vue Router `<router-link>` 替代元件，可防止實際導頁並保留 `to` 資訊供斷言使用

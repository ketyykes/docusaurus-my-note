---
sidebar_position: 1
title: 在瀏覽器 DevTools 中查看 Proxy 物件結構解析
description: 深入解析 JavaScript Proxy 物件的內部結構，包含 Handler、Target 等重要元件的說明，以及如何在 DevTools 中查看和除錯 Proxy 物件的實際應用
tags:
  - javascript
last_update:
  date: 2025-02-04
  author: Danny
---

# 在瀏覽器 DevTools 中查看 Proxy 物件結構解析

## 程式碼範例

```javascript
<script>
    // 建立一個簡單的使用者物件
    const user = {
        name: "小明",
        age: 25,
    };

    // 建立 Proxy 處理器
    const handler = {
        // 取得屬性時的攔截器
        get: function (target, prop) {
            console.log(`正在讀取 ${prop} 屬性`);
            return target[prop];
        },

        // 設定屬性時的攔截器
        set: function (target, prop, value) {
            console.log(`正在設定 ${prop} 屬性為 ${value}`);
            target[prop] = value;
            return true;
        },
    };

    // 建立 Proxy 物件
    const userProxy = new Proxy(user, handler);

    // 使用範例
    console.log(userProxy.name); // 會顯示："正在讀取 name 屬性" 然後顯示 "小明"
    console.log(userProxy); // 印出 userProxy 物件
    userProxy.age = 26; // 會顯示："正在設定 age 屬性為 26"
</script>
```

## 實際 console 結果

如下圖

![image](https://hackmd.io/_uploads/SJIOCXkYye.png)

### Proxy 圖片講解

在 DevTools 中看到`Proxy` 物件的結構，這是 JavaScript 中用來攔截和定義基礎操作（如屬性讀取、指派、列舉、函式呼叫等）的強大工具。以下是畫面中 Proxy 各個部分的說明：

1. **Proxy(Object)**  
   這表示這個 `Proxy` 是包裹在一個 `Object` 上，意思是它正在攔截對這個目標物件的操作。

2. **[[Handler]]: Object**  
   `[[Handler]]` 是 `Proxy` 的處理器，裡面定義了攔截方法（如 `get`、`set`、`deleteProperty` 等）。這些方法會在對目標物件進行操作時被呼叫，讓你可以自訂行為。  
   點開這個 `Object`，你會看到具體有哪些攔截方法被實作。

3. **[[Target]]: Object**  
   `[[Target]]` 是被 `Proxy` 包裹的原始目標物件。`Proxy` 的所有攔截操作最終都是針對這個物件進行。  
   點開這個 `Object`，你可以看到原始的資料內容。

4. **[[IsRevoked]]: false**  
   這表示這個 `Proxy` 目前還有效。如果這個 `Proxy` 是透過 `Proxy.revocable()` 建立的話，當它被撤銷後，`[[IsRevoked]]` 會變成 `true`，此時再操作這個 `Proxy` 會拋出錯誤。

## 小結

透過 `Proxy`，我們可以在不改變原始物件的情況下，動態攔截並控制物件的行為，讓開發者能更彈性地進行資料驗證、日誌紀錄或是自訂邏輯。

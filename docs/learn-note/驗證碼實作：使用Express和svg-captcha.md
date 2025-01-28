---
sidebar_position: 1
title: 驗證碼實作：使用 Express 和 svg-captcha
description: 介紹如何使用 Express 和 svg-captcha 套件實作驗證碼功能，包含環境設置、路由配置以及完整的程式碼範例說明
tags:
  - backend
last_update:
  date: 2025-01-27
  author: Danny
---


## 為什麼需要驗證碼（CAPTCHA）？

## 1. 驗證碼的重要性
- **防止自動化攻擊**：阻止機器人大量註冊、登入嘗試或提交表單。
- **避免垃圾訊息**：減少自動發布的垃圾留言或廣告。
- **保護網站安全**：預防暴力破解密碼等惡意行為。
- **確保使用者是人類**：驗證操作是由真實人類進行，而非自動程式。


## 2. 驗證碼的應用場景
- **用戶註冊**：確保註冊過程是由真實用戶完成。
- **登入系統**：防止自動化的暴力破解攻擊。
- **敏感操作**：如密碼重置、重要資料修改等。
- **表單提交**：防止垃圾訊息和自動提交。


## 3. 驗證碼的優勢
- **簡單實作**：使用 `svg-captcha` 套件可快速整合。
- **高度安全**：SVG 格式不易被機器學習識別。
- **用戶體驗**：相比其他驗證方式，驗證碼仍是較為直觀的方案。
- **成本效益**：實作成本低，但能有效防止大多數自動化攻擊。


## 4. 程式碼實作

### 環境設置
使用 `svg-captcha` 套件，提供更安全且易於整合的 SVG 格式驗證碼：
- **SVG 格式優勢**：相較於傳統圖片格式，具有更好的清晰度和可縮放性。

### 驗證碼生成路由
- 每次請求都會生成新的驗證碼。
- 驗證碼文字會輸出到控制台，實際應用中應該存儲在 **session** 或 **快取** 中。
- 回傳 SVG 格式確保驗證碼在各種設備上都能清晰顯示。

### 基本路由與伺服器啟動

```javascript
const express = require("express");
const svgCaptcha = require("svg-captcha");
const app = express();
const port = 3000;

// 生成驗證碼的 API
app.get("/captcha", (req, res) => {
    const captcha = svgCaptcha.create();

    console.log(captcha.text); // 驗證碼的文字
    res.type("svg");           // 設定回應類型為 SVG
    res.status(200).send(captcha.data);
});

// 首頁路由
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

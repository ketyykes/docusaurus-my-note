---
sidebar_position: 1
title: GraphQL 簡介
description: GraphQL 是一種用於 API 的查詢語言，以及一種伺服端執行查詢的執行環境。GraphQL 規格於 2015 年開放原始碼，目前已有多種程式語言的實作版本。GraphQL 不綁定特定資料庫或儲存引擎，而是由您現有的程式碼與資料來支援。
tags:
  - graphql
last_update:
  date: 2025-06-19
  author: Danny
---

# GraphQL 簡介
了解 GraphQL 的運作原理與使用方式

GraphQL 是一種用於 API 的查詢語言，以及一種伺服端執行查詢的執行環境。GraphQL 規格於 2015 年開放原始碼，目前已有多種程式語言的實作版本。GraphQL 不綁定特定資料庫或儲存引擎，而是由您現有的程式碼與資料來支援。

若您已經熟悉 GraphQL 並想要閱讀如何建置 GraphQL 服務的文件，可以使用多種程式語言的函式庫來實作 GraphQL。也有許多函式庫可供客戶端應用程式查詢現有的 GraphQL API。

## 用 系統描述您的 API
GraphQL 服務的建立方式是透過定義型別與其欄位，然後為每個欄位撰寫提供資料的函式。例如，一個顯示登入使用者名稱的 GraphQL 服務可能如下所示：

```graphql
type Query {
  me: User
}

type User {
  name: String
}
```

搭配每個型別欄位的解析器函式：

```javascript
// Query 型別中 `me` 欄位的解析器
function resolveQueryMe(_parent, _args, context, _info) {
  return context.request.auth.user;
}

// User 型別中 `name` 欄位的解析器
function resolveUserName(user, _args, context, _info) {
  return context.db.getUserFullName(user.id);
}
```

在上述範例中，`Query` 型別的 `me` 欄位解析器會使用請求者的驗證使用者資訊，而 `User` 型別的 `name` 欄位則是透過使用者 ID 從資料庫取得全名。

## 查詢您需要的資料
當 GraphQL 服務啟動後（通常位於網頁服務的特定 URL），就能接收並驗證執行 GraphQL 查詢請求。服務會先檢查查詢是否僅包含 API 定義的型別與欄位，然後執行對應函式產生結果。

例如，這個查詢：
```graphql
{
  me {
    name
  }
}
```

可能產生以下 JSON 結果：
```json
{
  "data": {
    "me": {
      "name": "路克·天行者"
    }
  }
}
```

從簡單的查詢就能看出 GraphQL 的強大功能。客戶端可以透過與所需資料結構對應的 API 查詢，並在單一請求中取得預期格式的資料，無需擔心底層資料來源。

## 無需版本控制即可改善 API
隨著客戶端需求變遷，GraphQL 允許您的 API 無需管理不同版本即可演進。例如，若新功能需要更明確的名稱欄位，可以這樣更新 User 型別：

```graphql
type User {
  fullName: String
  nickname: String
  name: String @deprecated(reason: "請改用 `fullName`。")
}
```

開發工具會提示開發者使用新欄位並移除已棄用的 `name` 欄位。當確認不再使用舊欄位後即可移除，而在過渡期間 GraphQL 仍會正常提供資料。

## 立即體驗！
學習 GraphQL 最好的方式就是直接撰寫查詢。本指南使用的查詢編輯器都是互動式的，請嘗試在 hero 物件中新增 id 與 appearsIn 欄位看看結果變化：

```graphql
{
  hero {
    name
    # 在此新增欄位！
  }
}
```

```json
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

本指南範例基於修改版的 SWAPI GraphQL 結構，由於與完整版的結構差異，這些查詢無法在完整版 SWAPI GraphQL API 執行。您可以在此試用完整版 API。

### 本文原始連結

[GraphQL - Introduction](https://graphql.org/learn/)
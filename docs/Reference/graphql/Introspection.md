---
sidebar_position: 9
title: Introspection
description: 本文深入介紹 GraphQL Introspection 系統，說明如何查詢 API schema 結構、型別、欄位與說明，並探討 Introspection 在開發與生產環境的應用與安全考量，協助你善用自省提升開發效率與 API 管理。
tags:
  - graphql
last_update:
  date: 2025-06-19
  author: Danny
---


# Introspection 

學習如何查詢 GraphQL schema 的結構資訊

有時候我們會想知道一個 GraphQL schema 支援哪些功能。GraphQL 允許我們透過[Introspection 系統（introspection system）](https://spec.graphql.org/draft/#sec-Introspection)來查詢這些資訊。

Introspection 查詢是一種特殊的查詢，可以讓你了解 GraphQL API 的 schema 結構，也為許多 GraphQL 開發工具提供基礎。本頁會介紹如何執行不同的查詢，來了解底層 schema 的型別、欄位與描述等資訊。

## 型別名稱 Introspection（Type name introspection）

我們在 Schema 與型別頁面已經看過 Introspection 的例子。當查詢一個回傳 Union 類型的欄位時，我們在選擇集裡直接加上 `__typename` 這個中繼欄位，來取得搜尋查詢回傳的不同型別名稱字串。讓我們再看一次這個例子：

```graphql
# { "graphiql": true }
query {
  search(text: "an") {
    __typename
    ... on Character {
      name
    }
    ... on Starship {
      name
    }
  }
}
```

我們並沒有在 GraphQL API 裡明確加上 `__typename` 欄位——GraphQL 規範規定，實作必須自動提供這個欄位給客戶端。只要欄位的底層輸出型別是 Object、Interface 或 Union，都可以查詢這個欄位。

## Schema 結構 Introspection（Schema introspection）

Introspection 不只可以查詢型別名稱。如果你是這個 GraphQL API 型別系統的設計者，你大概已經知道有哪些型別。但如果不是，你可以查詢 `__schema` 欄位（這個欄位永遠存在於 `query` 根操作類型上）來詢問 GraphQL。

我們現在來查詢 Star Wars schema 裡有哪些型別：

```graphql
# { "graphiql": true }
query {
  __schema {
    types {
      name
    }
  }
}
```

哇，型別好多！這些型別是什麼？我們來分類一下：

- 我們在型別系統裡自訂的型別：`Query`、`Mutation`、`Character`、`Human`、`Episode`、`Droid`、`LengthUnit`、`FriendsConnection`、`FriendsEdge`、`PageInfo`、`Review`、`ReviewInput`、`Starship`、`SearchResult`
- 型別系統內建的 scalar：`Boolean`、`Float`、`ID`、`Int`、`String`
- 以雙底線開頭、屬於 Introspection 系統的型別：`__Schema`、`__Type`、`__TypeKind`、`__Field`、`__InputValue`、`__EnumValue`、`__Directive`、`__DirectiveLocation`

接下來我們來找找看有哪些查詢可以用。設計型別系統時，我們會指定所有查詢的起點型別；我們可以用 Introspection 系統查詢這個資訊：

```graphql
# { "graphiql": true }
query {
  __schema {
    queryType {
      name
    }
  }
}
```

查詢結果和型別系統章節說的一樣——`Query` 型別是我們的起點。這裡的命名只是慣例；你也可以把 `Query` 型別命名成別的名字，只要有指定它是查詢的起點，這裡就會回傳那個名字。不過命名為 `Query` 是個很實用的慣例。

有時候我們會想要檢查某個特定型別。來看看 `Droid` 這個型別：

```graphql
# { "graphiql": true }
query {
  __type(name: "Droid") {
    name
  }
}
```

但如果我們想知道更多關於 Droid 的資訊呢？例如，它是 Interface 還是 Object 型別？

```graphql
# { "graphiql": true }
query {
  __type(name: "Droid") {
    name
    kind
  }
}
```

`kind` 會回傳一個 `__TypeKind` Enum 型別，其中一個值是 `OBJECT`。如果我們查 `Character`，會發現它是 Interface 型別：

```graphql
# { "graphiql": true }
query {
  __type(name: "Character") {
    name
    kind
  }
}
```

對於 Object 型別，知道有哪些欄位很有用，所以我們來查查 `Droid` 有哪些欄位：

```graphql
# { "graphiql": true }
query {
  __type(name: "Droid") {
    name
    fields {
      name
      type {
        name
        kind
      }
    }
  }
}
```

這些就是我們在 `Droid` 上定義的欄位！

`id` 看起來有點奇怪，型別名稱是空的。那是因為它是一個 `NON_NULL` 的包裝型別。如果我們查詢該欄位型別的 `ofType`，就會發現裡面是 `ID`，代表這是一個 non-null 的 ID。

Similarly, both `friends` and `appearsIn` have no name, since they are the `LIST` wrapper type. We can query for `ofType` on those types, which will tell us what types are inside the list:

```graphql
# { "graphiql": true }
query {
  __type(name: "Droid") {
    name
    fields {
      name
      type {
        name
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}
```

Let's end with a feature of the introspection system particularly useful for tooling; let's ask the system for documentation:

```graphql
# { "graphiql": true }
query {
  __type(name: "Droid") {
    name
    description
  }
}
```

As demonstrated above, we can access the documentation about the type system using introspection and create documentation browsers or rich IDE experiences.

這只是 Introspection 系統的冰山一角；我們還可以查詢 Enum 型別的值、某型別實作了哪些 Interface，甚至可以對 Introspection 系統本身做 Introspection。

想看一個完全符合規範的 GraphQL 查詢 Introspection 系統實作範例，可以參考 reference implementation 的 [src/type/introspection.ts](https://github.com/graphql/graphql-js/blob/e9b6b626f6f6aa379bb8f8c48df40d0c02a26082/src/type/introspection.ts)。

## 生產環境下的 Introspection（Introspection in production）

Introspection 是 GraphQL 很實用的功能，對於客戶端開發者和工具來說尤其重要。不過，如果 API 只給自家應用程式用，通常在生產環境下不需要開啟 Introspection——因為應用程式需要的操作都已經在建置階段寫死，不需要在執行時查詢 schema 結構。

為了降低 API 的攻擊面，生產環境常會關閉 Introspection 功能。這通常是 API 安全策略的一部分，還可能包含認證與授權、操作白名單（或其他保護措施，例如限制查詢深度、限制查詢寬度、別名數量限制、循環拒絕、成本分析、執行逾時等）。

## 下一步

回顧一下我們學到的 Introspection 重點：

- 可以在 Object、Interface 或 Union 型別的欄位選擇集裡用 `__typename` 中繼欄位查詢型別名稱
- 可以用 `__schema` 欄位查詢 GraphQL schema 的結構資訊（在 `query` 根操作類型上）
- 生產環境下通常會關閉 Introspection 功能

現在你已經了解 GraphQL 型別系統、如何查詢 API 資料，以及請求的生命週期，接下來可以前往最佳實踐（Best Practices）章節，學習如何在生產環境下運行 GraphQL。
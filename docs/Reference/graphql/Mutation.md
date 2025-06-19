---
sidebar_position: 4
title: Mutations
description: 本文詳細介紹如何在 GraphQL 中使用 Mutation 來新增、更新、刪除資料，並說明 Mutation 的設計原則、執行流程與常見實作範例，協助你設計更符合實務需求的 API。
tags:
  - graphql
last_update:
  date: 2025-06-19
  author: Danny
---

# 變更（Mutations）

學習如何用 GraphQL 伺服器修改資料

大多數關於 GraphQL 的討論都聚焦在資料查詢，但任何完整的資料平台都需要能夠修改伺服器端資料的方式。

在 REST 中，任何請求都有可能對伺服器產生副作用，但依照慣例，建議不要用 `GET` 請求來修改資料。GraphQL 也很類似——技術上來說，任何欄位解析器都可以實作成寫入資料，但[GraphQL 規範](https://spec.graphql.org/draft/#sel-GANRNDAB6DBmMn6D)明確指出：「除了最上層 mutation 欄位以外，其他欄位的解析必須是無副作用且具冪等性的。」因此，對於任何符合規範的 GraphQL schema，只有 mutation 操作的最上層欄位允許產生副作用。

本頁會教你如何用 mutation 操作來寫入資料，並且以支援客戶端需求的方式來設計。


`所有查詢操作適用的 GraphQL 功能，在 mutation 也都適用，所以建議先閱讀查詢（Queries）頁面再繼續。`


## 新增資料（Add new data）

在 REST API 中建立新資料時，通常會送出 `POST` 請求到特定 endpoint，並在請求主體中帶上要建立的實體資訊。GraphQL 則採用不同的方式。

我們來看一個 schema 中定義的 mutation 範例：

```graphql
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}

input ReviewInput {
  stars: Int!
  commentary: String
}

type Mutation {
  createReview(episode: Episode, review: ReviewInput!): Review
}
```

和查詢一樣，mutation 欄位會加在[根操作類型](https://spec.graphql.org/draft/#sec-Root-Operation-Types)之一，作為 API 的進入點。本例中我們在 `Mutation` 類型上定義了 `createReview` 欄位。

mutation 欄位也可以接受參數，你會注意到 `review` 參數的型別是 `ReviewInput`，這就是所謂的 Input Object type，可以讓我們傳遞一個結構化物件，而不只是單一的 scalar 值。

同樣地，如果 mutation 欄位回傳的是物件型別，你也可以在操作中指定欄位選擇集：

```graphql
# { "graphiql": true, "variables": { "ep": "JEDI", "review": { "stars": 5, "commentary": "This is a great movie!" } } }
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

雖然 `createReview` 欄位可以定義成 schema 中任何合法的輸出型別，但慣例上會指定與這次變更有關的型別——這裡是 `Review`。這對於需要在更新後取得物件新狀態的客戶端很有幫助。

請記住，GraphQL 設計是為了能和你現有的程式碼與資料整合，所以實際建立評論的動作要由你在伺服器端實作。當客戶端送出這個操作時，伺服器端可能會有像這樣的函式來寫入資料庫：

```js
const Mutation = {
  createReview(_obj, args, context, _info) {
    return context.db
      .createNewReview(args.episode, args.review)
      .then(reviewData => new Review(reviewData));
  },
};
```

你可以在執行（Execution）頁面了解 GraphQL 如何為欄位提供資料。

## 更新現有資料（Update existing data）

同樣地，我們也可以用 mutation 來更新現有資料。假設我們要修改某個人類的名字，可以定義一個新的 mutation 欄位，並把該欄位的輸出型別設為 `Human`，這樣伺服器在成功寫入資料後就能回傳更新後的人類資訊給客戶端：

```graphql
type Mutation {
  updateHumanName(id: ID!, name: String!): Human
}
```

這個操作會更新路克天行者（Luke Skywalker）的名字：

```graphql
# { "graphiql": true, "variables": { "id": "1000", "name": "Luke Starkiller" } }
mutation UpdateHumanName($id: ID!, $name: String!) { 
  updateHumanName(id: $id, name: $name ) {
    id
    name
  }
}
```

## 針對用途設計的變更（Purpose-built mutations）

前面的例子說明了一個和 REST 很不同的重點。用 REST API 更新人類屬性時，通常會用 `PATCH` 請求把所有要更新的資料送到資源的通用 endpoint。而在 GraphQL 中，你不一定要只寫一個 `updateHuman` mutation，你可以根據實際需求，設計更明確的 mutation 欄位，例如 `updateHumanName`。

針對用途設計的 mutation 欄位可以讓 schema 更具表達力，因為欄位參數的輸入型別可以設為 Non-Null（如果是通用的 `updateHuman`，為了支援多種更新情境，參數通常都要設成可為空）。把這些需求寫在 schema 裡，也能省去執行階段判斷參數是否齊全的邏輯。

GraphQL 也讓我們可以表達資料之間的關聯，這在傳統 CRUD 風格的 API 裡很難做到。例如，使用者可能想要對某部電影留下個人評分。雖然評分屬於使用者，並不會改變電影本身的資料，但我們可以很直覺地把它和 `Film` 物件關聯起來：

```graphql
# { "graphiql": true, "variables": { "episode": "EMPIRE", "rating": "THUMBS_UP" } }
mutation RateFilm($episode: Episode!, $rating: FilmRating!) { 
  rateFilm(episode: $episode, rating: $rating) {
    episode
    viewerRating
  }
}
```

一般來說，GraphQL API 應該設計成能幫助客戶端以最適合的方式取得與修改資料，所以 schema 裡定義的欄位應該根據實際需求來設計。

## 刪除現有資料（Remove existing data）

就像我們可以用 REST API 的 `DELETE` 請求刪除資源一樣，在 GraphQL 也可以用 mutation 來刪除資料，只要在 `Mutation` 類型上定義一個新的欄位：

```graphql
type Mutation {
  deleteStarship(id: ID!): ID!
}
```

這是這個新 mutation 欄位的範例：

```graphql
# { "graphiql": true, "variables": { "id": "3003" } }
mutation DeleteStarship($id: ID!) { 
  deleteStarship(id: $id)
}
```

和新增、更新資料的 mutation 一樣，GraphQL 規範沒有規定刪除資料成功時要回傳什麼型別，但你必須在 schema 裡指定一個輸出型別。最常見的做法是回傳被刪除實體的 ID，或是一個包含該實體資訊的 payload 物件，來表示操作成功。

## mutation 中的多個欄位（Multiple fields in mutations）

mutation 和查詢一樣，可以包含多個欄位。但和查詢不同，有一個很重要的差異：

**查詢的欄位是平行執行，mutation 的欄位則是依序執行。**

來看一個例子：

```graphql
# { "graphiql": true }
mutation { 
  firstShip: deleteStarship(id: "3001")
  secondShip: deleteStarship(id: "3002")
}
```

[序列執行](https://spec.graphql.org/draft/#sec-Normal-and-Serial-Execution)這些最上層欄位，代表如果我們在同一個請求裡送出兩個 `deleteStarship` mutation，第一個一定會執行完才會開始第二個，這樣就能避免自己和自己產生競爭狀態（race condition）。

請注意，最上層 `Mutation` 欄位的序列執行和資料庫交易（transaction）不同。有些 mutation 欄位可能會成功，有些會回傳錯誤，GraphQL 沒有內建機制可以在發生錯誤時回復已經成功的部分。所以在上面的例子裡，如果第一艘太空船成功刪除，但 `secondShip` 欄位發生錯誤，GraphQL 不會自動回復 `firstShip` 的執行結果。

## 下一步

回顧一下我們學到的 mutation 重點：

- 客戶端可以用 GraphQL API 來建立、更新、刪除資料，具體能做什麼取決於 schema 提供的功能
- 根據客戶端需求，mutation 可以設計成支援細緻的寫入情境
- `Mutation` 類型的最上層欄位會依序執行，不像其他類型的欄位通常是平行執行

現在我們已經知道如何用 GraphQL 伺服器讀寫資料，接下來可以學習如何用 訂閱（subscriptions）即時取得資料。
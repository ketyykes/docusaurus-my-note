---
sidebar_position: 3
title: Query
description: 本頁介紹 GraphQL 查詢（Query）的基本概念、語法與常見用法，讓你學會如何從 GraphQL 伺服器取得所需資料，並靈活運用查詢語言的各種功能。
tags:
  - graphql
  - query
last_update:
  date: 2025-06-19
  author: Danny
---

# 查詢（Queries）

學習如何從 GraphQL 伺服器取得資料

GraphQL 支援三種主要的操作類型——查詢（queries）、變更（mutations）以及訂閱（subscriptions）。我們在本指南中已經看過幾個基本查詢的範例，這一頁會詳細介紹如何使用查詢操作來從伺服器讀取資料。

## 欄位（Fields）

在最簡單的情況下，GraphQL 就是針對物件要求特定的[欄位](https://spec.graphql.org/draft/#sec-Language.Fields)。我們先來看看在 schema 中 `Query` 型別所定義的 `hero` 欄位：

```graphql
type Query {
  hero: Character
}
```

我們可以看看查詢這個欄位時會得到什麼結果：

```graphql
# { "graphiql": true }
{
  hero {
    name
  }
}
```

當我們建立一個 GraphQL _文件_ 時，總是從根操作型別（本例中為 `Query` 物件型別）開始，因為它是 API 的進入點。接著我們必須指定我們感興趣的欄位 _選擇集_，一路往下到最底層的值，這些值會是 Scalar 或 Enum 型別。`name` 欄位回傳的是 `String` 型別，在這個例子中是星際大戰主角的名字，"R2-D2"。

GraphQL 規範指出，請求的結果會回傳在回應的頂層 `data` key 下。如果請求發生錯誤，會在頂層的 `errors` key 提供錯誤資訊。你可以發現，結果的結構和查詢的結構相同。這是 GraphQL 的核心，因為你總是能得到你預期的資料，伺服器也能精確知道客戶端要求哪些欄位。

在前面的例子中，我們只要求了 hero 的名字，這會回傳一個 `String`，但欄位也可以回傳物件型別（或其陣列）。這時你可以對該物件型別做 _子選擇_：

```graphql
# { "graphiql": true }
{
  hero {
    name
    friends {
      name
    }
  }
}
```

GraphQL 查詢可以遍歷相關物件及其欄位，讓客戶端能在一次請求中取得大量相關資料，而不需要像傳統 REST 架構那樣多次往返請求。

請注意，在這個例子中，`friends` 欄位回傳的是一個項目陣列。GraphQL 查詢在單一項目或多項目時語法相同；不過我們可以根據 schema 的定義來判斷預期會拿到哪一種。

## 參數（Arguments）

如果我們只能遍歷物件及其欄位，GraphQL 已經是一個非常實用的資料查詢語言了。但當你可以為欄位傳遞[參數](https://spec.graphql.org/draft/#sec-Language.Arguments)時，事情就變得更有趣了：

```graphql
type Query {
  human(id: ID!): Human
}
```

客戶端必須在查詢時提供必要的 `id` 值：

```graphql
# { "graphiql": true }
{
  human(id: "1000") {
    name
    height
  }
}
```

在像 REST 這樣的系統中，你只能傳遞一組參數——也就是請求中的查詢參數和 URL 片段。但在 GraphQL 中，每個欄位和巢狀物件都可以有自己的參數，這讓 GraphQL 完全可以取代多次 API 請求。

你甚至可以為回傳 Scalar 型別的欄位傳遞參數；一個常見用途是讓伺服器端統一處理資料轉換，而不是每個客戶端都要自己處理：

```graphql
# { "graphiql": true }
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```

參數可以是多種不同的型別。在上面的例子中，我們使用了 Enum 型別，代表有限選項之一（這裡是長度單位，可以是 `METER` 或 `FOOT`）。GraphQL 內建一組預設型別，但 GraphQL 伺服器也可以宣告自訂型別，只要能序列化成你的傳輸格式即可。



## 操作型別與名稱（Operation type and name）

在上面的範例中，我們使用了一種簡寫語法，省略了在操作選擇集前面的 `query` 關鍵字。除了可以明確指定 _操作型別_ 之外，我們也可以為操作加上一個獨特的 _操作名稱_，這在正式環境的應用程式中特別有用，因為這樣有助於除錯與追蹤。

以下是一個同時包含 `query` 關鍵字（操作型別）與 `HeroNameAndFriends`（操作名稱）的範例：

```graphql
# { "graphiql": true }
query HeroNameAndFriends {
  hero {
    name
    friends {
      name
    }
  }
}
```

操作型別可以是 `query`、`mutation` 或 `subscription`，用來描述你想執行的操作類別。這個關鍵字在查詢時可以省略（只限查詢），但在變更與訂閱時則是必須的。如果你想為操作命名，也必須明確指定操作型別。

操作名稱是你為操作自訂的名稱，建議取一個有意義的名字。當你在一份文件中傳送多個操作時，操作名稱是必須的；即使只傳送一個操作，也建議加上名稱，因為這對除錯與伺服器端日誌紀錄都很有幫助。當出現錯誤（不論是在網路日誌還是 GraphQL 伺服器的日誌中），你可以更容易地根據名稱在程式碼中找到對應的查詢，而不用去猜查詢內容。

## 別名（Aliases）

如果你很細心，可能已經注意到，因為回傳結果的欄位名稱會和查詢中的欄位名稱相同，但不包含參數，所以你無法直接用不同參數查詢同一個欄位。這時你就需要[別名](https://spec.graphql.org/draft/#sec-Field-Alias)——它可以讓你把欄位的回傳結果重新命名成你想要的名稱。

```graphql
# { "graphiql": true }
query {
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```

在上面的例子中，兩個 `hero` 欄位本來會衝突，但因為我們可以用別名把它們改成不同的名稱，就能在同一次請求中取得兩個結果。

## 變數（Variables）

到目前為止，我們都是直接在查詢字串中寫死所有參數。但在大多數應用程式中，欄位的參數通常是動態的。例如，可能有一個下拉選單讓你選擇想看的星際大戰集數，或是一個搜尋欄位，或是一組篩選條件。

如果把這些動態參數直接寫在查詢字串裡，客戶端程式就必須在執行時動態操作查詢字串，並序列化成 GraphQL 特有的格式。為了解決這個問題，GraphQL 提供了第一級的變數支援，可以把動態值從查詢中抽離，另外用一個物件傳遞。這些值就叫做[變數](https://spec.graphql.org/draft/#sec-Language.Variables)。

當我們開始使用變數時，需要做三件事：

1. 把查詢裡的靜態值換成 `$變數名稱`
2. 在查詢中宣告 `$變數名稱` 為可接受的變數
3. 在另外一個（通常是 JSON）變數物件裡傳入 `變數名稱: 值`

全部加起來會像這樣：

```graphql
# { "graphiql": true, "variables": { "episode": "JEDI" } }
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```


你必須在 GraphQL 文件中指定操作型別與名稱，才能使用變數。


現在，在客戶端程式碼中，我們只需要傳入不同的變數值，而不用每次都組一個新的查詢字串。一般來說，這也是一個很好的習慣，可以明確標示哪些查詢參數是動態的——我們永遠不應該用字串插值的方式，把使用者輸入直接拼進查詢字串裡。

### 變數定義（Variable definitions）

變數定義就是像上面查詢裡 `($episode: Episode)` 這一段。它的用法就像型別語言中函式的參數定義一樣。它會列出所有變數，前面加上 `$`，後面接型別，例如這裡的 `Episode`。

所有宣告的變數必須是 Scalar、Enum 或 Input Object 型別。所以如果你想傳遞複雜物件給欄位，必須知道伺服器上對應的 input type。

變數定義可以是選填或必填。像上面例子，因為 `Episode` 型別後面沒有 `!`，所以是選填。如果你要把變數傳給一個必填參數，那變數本身也必須是必填。

想更了解這些變數定義的語法，可以參考 Schemas and Types 頁面。

### 預設變數值（Default variables）

你也可以在查詢裡為變數加上預設值，只要在型別宣告後面加上預設值即可：

```graphql
query HeroNameAndFriends($episode: Episode = JEDI) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

當所有變數都有預設值時，你可以不帶任何變數就呼叫查詢。如果有傳變數，則會覆蓋預設值。

## 片段（Fragments）

假設我們的應用程式有一個比較複雜的頁面，可以讓我們同時比較兩個英雄以及他們的朋友。你可以想像，這樣的查詢很快就會變得很冗長，因為至少要重複一次欄位——每一邊都要寫一次。

這就是為什麼 GraphQL 有可重複使用的單位，叫做[片段（fragments）](https://spec.graphql.org/draft/#sec-Language.Fragments)。片段讓你可以先定義一組欄位，然後在需要的查詢裡引用。以下是一個用片段解決上述情境的範例：

```graphql
# { "graphiql": true }
query {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

你可以想像，如果不能用片段，這個查詢會有多冗長。片段的概念常被用來把複雜的資料需求拆成小區塊，特別是當你需要把很多 UI 元件的片段組合成一次初始資料請求時。

### 在片段中使用變數（Using variables inside fragments）

片段也可以存取在操作中宣告的變數：

```graphql
# { "graphiql": true }
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

### 行內片段（Inline Fragments）

就像許多型別系統一樣，GraphQL schema 也可以定義 Interface 和 Union 型別。你可以在 Schemas and Types 頁面了解更多。

如果你查詢的欄位回傳的是 Interface 或 Union 型別，你就需要用 _行內片段_ 來存取底層具體型別的資料。用範例最容易理解：

```graphql
# { "graphiql": true, "variables": { "ep": "JEDI" } }
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}
```

在這個查詢中，`hero` 欄位回傳 `Character` 型別，根據 `episode` 參數可能是 `Human` 或 `Droid`。在直接選擇時，你只能查 `Character` 介面上的欄位，例如 `name`。

如果要查詢具體型別的欄位，就要用帶型別條件的行內片段。像第一個片段標記為 `... on Droid`，只有當 `hero` 回傳的是 `Droid` 型別時，`primaryFunction` 欄位才會被執行。`Human` 型別的 `height` 欄位也是同理。

命名片段也可以這樣用，因為命名片段一定會指定型別。

### 中繼欄位（Meta fields）

如同我們在 Union 型別看到的，有時你不知道從 GraphQL 服務會拿到什麼型別的資料，因此需要一種方式讓客戶端判斷該怎麼處理。

GraphQL 允許你在查詢的任何地方要求 `__typename` 這個中繼欄位，來取得該處物件型別的名稱：

```graphql
// ... existing code ...
```

在上面的查詢中，`search` 回傳的是 Union 型別，可能是三種型別之一。如果沒有 `__typename` 欄位，客戶端就無法分辨不同型別。

所有以兩個底線（`__`）開頭的欄位名稱都被 GraphQL 保留。除了 `__typename`，GraphQL 服務還會提供 `__schema` 和 `__type` 這些中繼欄位，讓你可以使用自省（introspection）系統。

## 指令（Directives）

前面提到，變數可以讓我們不用手動拼接查詢字串來產生動態查詢。用變數傳參數解決了很大一部分問題，但有時我們還需要根據變數動態改變查詢的結構。例如，有些 UI 元件有簡略和詳細兩種顯示方式，詳細模式會多查一些欄位。

我們可以為這種元件設計一個查詢：

```graphql
// ... existing code ...
```

你可以試著把上面變數的 `withFriends` 改成 `true`，看看結果有什麼不同。

這裡我們用到 GraphQL 的一個功能，叫做[指令（directive）](https://spec.graphql.org/draft/#sec-Type-System.Directives)。特別是 _可執行指令_，可以加在欄位或片段上，由客戶端決定，伺服器可以根據指令改變查詢的執行方式。GraphQL 規範內建兩個指令，所有符合規範的伺服器都必須支援：

- `@include(if: Boolean)` 只有在參數為 `true` 時才包含這個欄位
- `@skip(if: Boolean)` 只有在參數為 `true` 時才略過這個欄位

指令可以幫助你不用手動拼接查詢字串來增減欄位。伺服器實作也可以自訂新的指令來加入實驗性功能。


想了解如何定義可以用來標註 GraphQL schema 型別、欄位或參數的指令？請參考 Schemas and Types 頁面 了解如何定義與使用型別系統指令。


## 下一步

回顧一下我們學到的查詢重點：

- 讀取資料的 GraphQL 操作會從 `query` 根操作型別開始，依照選擇集一路往下到最底層的 Scalar 或 Enum 型別
- 欄位可以接受參數來改變回傳結果
- 操作可以用 `query`、`mutation` 或 `subscription` 關鍵字來標示型別
- 查詢操作可以省略操作型別關鍵字（只限查詢）
- 操作應該給予獨特名稱，讓請求更具表達力，也方便除錯
- 欄位別名可以讓你重新命名回傳 key、在同一查詢中多次包含同一欄位，並給不同參數
- 變數用 `$` 字元開頭，可以用來動態傳遞欄位參數
- 片段是可重複使用的欄位選擇集，可以在多個查詢中重複使用
- 可執行指令可以加在查詢上，讓伺服器在執行查詢時改變結果
- 所有符合規範的 GraphQL 伺服器都內建 `@include` 與 `@skip` 這兩個指令

現在我們已經了解如何用查詢操作從 GraphQL 伺服器讀取資料，接下來要學習如何用 mutations 來改變資料並觸發副作用。
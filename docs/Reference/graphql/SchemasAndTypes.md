---
sidebar_position: 2
title: Schemas and Types
description: 本頁我們將探索 GraphQL 的六種命名類型定義以及其他類型系統功能，學習如何用它們描述資料與關聯性。由於 GraphQL 可搭配任何後端框架或程式語言使用，我們會避免實作細節，專注於概念說明。
tags:
  - graphql
last_update:
  date: 2025-06-19
  author: Danny
---


# Schemas and Types

認識 GraphQL 型別系統的各種元素

GraphQL 的[型別系統](https://spec.graphql.org/draft/#sec-Type-System)描述了 API 可以查詢哪些資料。這些能力的集合稱為服務的 _schema_（綱要），前端可以利用這個 schema 向 API 發送查詢，並獲得可預期的結果。

本頁會帶你探索 GraphQL 的[六種命名類型定義](https://spec.graphql.org/draft/#sec-Types)以及型別系統的其他功能，學習如何用它們描述資料與資料之間的關聯。由於 GraphQL 可以搭配任何後端框架或程式語言使用，這裡我們會避免討論實作細節，專注於概念說明。

## 型別系統

如果你看過 GraphQL 查詢語言，你會發現它基本上就是在物件上選取欄位。例如，以下這個查詢：

```graphql
# { "graphiql": true }
{
  hero {
    name
    appearsIn
  }
}
```

1. 我們從一個特殊的「根」物件開始
2. 在這個物件上選取 `hero` 欄位
3. 對 `hero` 回傳的物件，再選取 `name` 和 `appearsIn` 欄位

因為 GraphQL 查詢的結構和回傳結果非常接近，所以即使不太了解伺服器，也能預測查詢會得到什麼資料。不過，能夠明確描述可查詢的資料會更有幫助。例如：可以選哪些欄位？這些欄位會回傳什麼型別的物件？子物件又有哪些欄位？

這就是 schema 的用途。每個 GraphQL 服務都會定義一組型別，完整描述這個服務可以查詢的所有資料。當收到查詢請求時，系統會根據這個 schema 進行驗證與執行。

## 型別語言（Type language）

GraphQL 服務可以用任何語言實作，定義 schema 型別時也有多種方式：

- 有些函式庫會讓你用同一種程式語言同時定義 schema 型別、欄位與 resolver（解析函式）。
- 有些函式庫則提供所謂的 schema 定義語言（SDL），讓你用更直覺的方式定義型別與欄位，再分開撰寫 resolver。
- 有些函式庫甚至可以直接從 resolver 推斷出 schema。
- 也有函式庫能根據底層資料來源自動推斷型別與 resolver。

因為這份教學不侷限於特定語言，我們會用 SDL 來說明，因為它和查詢語言很像，也方便用語言無關的方式討論 GraphQL schema。

## 物件型別與欄位

GraphQL schema 最基本的組成是[物件型別（Object types）](https://spec.graphql.org/draft/#sec-Objects)，它代表你可以從服務查詢到的某種物件，以及這個物件有哪些欄位。在 SDL 中可以這樣表示：

```graphql
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```

這段語法很直覺，但我們還是來說明一下：

- `Character` 是一個 GraphQL 物件型別，代表一種有欄位的型別。大多數 schema 裡的型別都是物件型別。
- `name` 和 `appearsIn` 是 `Character` 型別的欄位。也就是說，只有這兩個欄位可以在查詢 `Character` 型別時出現。
- `String` 是內建的純量型別（Scalar types），這種型別只能回傳單一純量值，不能再有子查詢。稍後會再介紹純量型別。
- `String!` 表示這個欄位是非 Null 型別，也就是 GraphQL 服務保證查詢這個欄位時一定會有值。SDL 用驚嘆號表示非 Null。
- `[Episode!]!` 表示這是清單型別（List type），裡面每個元素都是非 Null 的 `Episode` 物件，整個欄位本身也不能是 Null。

現在你已經知道 GraphQL 物件型別的基本結構，以及如何閱讀 SDL 了。

### 參數（Arguments）

每個 GraphQL 物件型別的欄位都可以有零個或多個[參數](https://spec.graphql.org/draft/#sec-Field-Arguments)，例如下方 `length` 欄位：

```graphql
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

所有參數都是具名的。和 JavaScript、Python 這類語言的函式會用順序傳參數不同，GraphQL 的參數都是用名稱對應。在這個例子中，`length` 欄位有一個名為 `unit` 的參數。

參數可以是必填或選填。當參數是選填時，可以定義 _預設值_。如果沒有傳入 `unit` 參數，則會自動設為 `METER`。

### Query、Mutation 與 Subscription 型別

每個 GraphQL schema 都必須支援 `query` 操作。這個[根操作型別](https://spec.graphql.org/draft/#sec-Root-Operation-Types)的進入點，預設是一個名為 `Query` 的物件型別。所以如果你看到這樣的查詢：

```graphql
# { "graphiql": true }
{
  droid(id: "2000") {
    name
  }
}
```

代表 GraphQL 服務必須有一個 `Query` 型別，裡面有 `droid` 欄位：

```graphql
type Query {
  droid(id: ID!): Droid
}
```

Schema 也可以透過額外的 `Mutation` 和 `Subscription` 型別，支援 `mutation` 和 `subscription` 操作，並在這些根型別上定義欄位。

要記得，除了作為 schema 進入點的特殊地位外，`Query`、`Mutation`、`Subscription` 型別和其他 GraphQL 物件型別完全一樣，欄位運作方式也一樣。

你也可以自訂根操作型別的名稱，如果這麼做，必須用 `schema` 關鍵字告訴 GraphQL 新的名稱：

```graphql
schema {
  query: MyQueryType
  mutation: MyMutationType
  subscription: MySubscriptionType
}
```

## 純量型別（Scalar types）

GraphQL 物件型別有名稱和欄位，但最終這些欄位必須對應到具體的資料。這時就需要[純量型別（Scalar types）](https://spec.graphql.org/draft/#sec-Scalars)：它們代表查詢的葉節點值。

在下方查詢中，`name` 和 `appearsIn` 欄位會對應到純量型別：

```graphql
# { "graphiql": true }
{
  hero {
    name
    appearsIn
  }
}
```

我們知道這些欄位是純量型別，因為它們沒有子欄位——它們是查詢的葉節點。

GraphQL 內建一組[預設純量型別](https://spec.graphql.org/draft/#sec-Scalars.Built-in-Scalars)：

- `Int`：有號 32 位元整數。
- `Float`：有號雙精度浮點數。
- `String`：UTF-8 字元序列。
- `Boolean`：`true` 或 `false`。
- `ID`：唯一識別碼，常用於重新查詢物件或作為快取鍵。`ID` 型別序列化方式和 `String` 一樣，但語意上不是給人類閱讀的。

大多數 GraphQL 服務實作也支援自訂純量型別。例如可以定義 `Date` 型別：

```graphql
scalar Date
```

接下來就要由你的實作決定這個型別如何序列化、反序列化與驗證。例如你可以規定 `Date` 型別一定要序列化成整數 timestamp，前端也要知道要用這種格式處理日期欄位。

## 列舉型別（Enum types）

[列舉型別（Enum types）](https://spec.graphql.org/draft/#sec-Enums)是一種特殊的純量型別，只允許特定的一組值。這有兩個好處：

1. 可以驗證參數值是否在允許的範圍內
2. 透過型別系統告訴前端，某個欄位只會是有限集合中的一個值

在 SDL 中，列舉型別的定義如下：

```graphql
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

這代表只要 schema 中用到 `Episode` 型別，就只能是 `NEWHOPE`、`EMPIRE` 或 `JEDI` 其中之一。
  
不同語言的 GraphQL 服務實作會用各自的方式處理 Enum 型別。如果語言本身有 enum 支援，實作上會直接用 enum；像 JavaScript 沒有 enum，可能就會用一組整數對應。不過這些細節對前端來說是透明的，前端只需要用 Enum 型別的字串值即可。

## 型別修飾子（Type modifiers）

GraphQL 預設型別都是可為 null 且單一值。不過在 schema（或查詢變數宣告）中使用型別時，可以加上 _型別修飾子_ 來改變欄位或參數的型別意義。

如前面物件型別的例子，GraphQL 支援兩種型別修飾子——[清單型別（List）](https://spec.graphql.org/draft/#sec-List)和[非 Null 型別（Non-Null）](https://spec.graphql.org/draft/#sec-Non-Null)，可以單獨或組合使用。

### 非 Null

來看一個例子：

```graphql
type Character {
  name: String!
}
```

這裡 `String` 型別後面加上驚嘆號（`!`），表示這個欄位是非 Null 型別。也就是伺服器查詢這個欄位時一定要有值，如果 resolver 回傳 null，GraphQL 執行時會報錯，通知前端有問題。

如前面例子所示，非 Null 修飾子也可以用在欄位參數上，如果傳入 null，GraphQL 伺服器會回傳驗證錯誤：

```graphql
# { "graphiql": true }
{
  droid(id: null) {
    name
  }
}
```

### 清單型別（List）

清單型別的用法也很類似。我們可以用型別修飾子把欄位標記為清單型別，表示這個欄位會回傳一個陣列。SDL 用中括號 `[` 和 `]` 表示清單型別。參數也一樣，驗證時會要求傳入陣列。舉例：

```graphql
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

如上例，非 Null 和清單修飾子可以組合。例如：你可以有一個非 Null 的 `String` 清單：

```graphql
myField: [String!]
```

這代表 _清單本身_ 可以是 null，但裡面不能有 null 元素。例如 JSON：

```js
myField: null // 合法
myField: [] // 合法
myField: ["a", "b"] // 合法
myField: ["a", null, "b"] // 錯誤
```

如果你定義一個非 Null 清單的 `String` 型別：

```graphql
myField: [String]!
```

這代表清單本身不能是 null，但裡面可以有 null 值：

```js
myField: null // 錯誤
myField: [] // 合法
myField: ["a", "b"] // 合法
myField: ["a", null, "b"] // 合法
```

最後，你也可以有一個非 Null 清單、裡面元素也非 Null：

```graphql
myField: [String!]!
```

這代表清單本身不能是 null，裡面也不能有 null 值：

```js
myField: null // 錯誤
myField: [] // 合法
myField: ["a", "b"] // 合法
myField: ["a", null, "b"] // 錯誤
```

你可以根據需求，任意巢狀組合 Non-Null 和 List 修飾子。

GraphQL 沒有辦法強制欄位一定要回傳非空陣列，也就是說，即使是非 Null 清單型別，`[]` 仍然是合法的回應。

## 介面型別（Interface types）

和許多型別系統一樣，GraphQL 支援 _抽象型別_。第一種是[介面型別（Interface type）](https://spec.graphql.org/draft/#sec-Interfaces)，它定義了一組欄位，任何實作這個介面的物件型別或其他介面型別都必須包含這些欄位。

例如，你可以有一個 `Character` 介面型別，代表星際大戰三部曲中的任何角色：

```graphql
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
```

這代表任何 _實作_ `Character` 的型別都必須有這些欄位，參數和回傳型別也要一致。

例如，以下是幾個可能實作 `Character` 的型別：

```graphql
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
```

你可以看到這些型別都有 `Character` 介面型別的所有欄位，也可以有額外的欄位（如 `totalCredits`、`starships`、`primaryFunction`）。

介面型別很適合用在你想回傳一個物件或一組物件，但這些物件可能有不同型別的情境。例如，下面這個查詢會出錯：

```graphql
# { "graphiql": true }
{
  hero(episode: JEDI) {
    name
    primaryFunction
  }
}
```

`hero` 欄位回傳 `Character` 型別，代表它可能是 `Human` 或 `Droid`，取決於 `episode` 參數。在這個查詢中，你只能查詢 `Character` 介面型別有的欄位，`primaryFunction` 不在其中。

如果要查詢特定物件型別的欄位，需要用 inline fragment（內嵌片段）：

```graphql
# { "graphiql": true }
{
  hero(episode: JEDI) {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
```

介面型別也可以實作其他介面型別：

```graphql
interface Node {
  id: ID!
}

interface Character implements Node {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
```

注意：介面型別不能實作自己，也不能互相循環參考。

雖然多個型別在 GraphQL API 中可能有共同欄位，但不一定要用介面型別強制欄位名稱一致。介面型別是一種強大的抽象，能讓實作它的型別共享行為。使用時應該讓前端開發者覺得有語意意義，就像 `Character` 是人類和機器人的共同抽象。

## 聯集型別（Union types）

GraphQL 還有另一種抽象型別叫做[聯集型別（Union type）](https://spec.graphql.org/draft/#sec-Unions)。聯集型別和介面型別類似，但不能定義成員型別間的共同欄位。

聯集型別的定義方式是列出它包含的物件型別：

```graphql
union SearchResult = Human | Droid | Starship
```

只要 schema 中回傳 `SearchResult` 型別，就可能是 `Human`、`Droid` 或 `Starship`。注意聯集型別的成員必須是具體的物件型別，不能用介面型別或其他聯集型別。

如果查詢回傳聯集型別的欄位，需要用 inline fragment 查詢成員型別的欄位：

```graphql
# { "graphiql": true}
{
  search(text: "an") {
    __typename
    ... on Human {
      name
      height
    }
    ... on Droid {
      name
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}
```

`__typename` 欄位是一個特殊的 _meta 欄位_，每個物件型別都會自動有，會回傳該型別的名稱，方便前端辨識資料型別。

如果聯集型別的成員有共同介面型別（如 `Human` 和 `Droid` 都實作 `Character`），可以用同一個片段查詢共同欄位：

```graphql
# { "graphiql": true}
{
  search(text: "an") {
    __typename
    ... on Character {
      name
    }
    ... on Human {
      height
    }
    ... on Droid {
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}
```

注意：`Starship` 不是 `Character`，所以還是要另外查詢 `name` 欄位！

## 輸入物件型別（Input Object types）

前面介紹的例子大多是用物件、純量、列舉、介面、聯集型別作為 schema 欄位的 _輸出型別_。但欄位參數也必須指定 _輸入型別_。

目前為止，我們只介紹過用純量（如 Enum 或 String）作為欄位參數的輸入型別。不過你也可以用[輸入物件型別（Input Object type）](https://spec.graphql.org/draft/#sec-Input-Objects)來傳遞複雜物件，這是 GraphQL 最後一種命名型別。

這在 mutation 時特別有用，例如你想一次傳入一個完整物件來建立。在 SDL 中，Input Object 型別和一般物件型別很像，只是用 `input` 關鍵字：

```graphql
input ReviewInput {
  stars: Int!
  commentary: String
}

type Mutation {
  createReview(episode: Episode, review: ReviewInput!): Review
}
```

以下是 mutation 使用 Input Object 型別的例子：

```graphql
# { "graphiql": true }
mutation {
  createReview(
    episode: JEDI, 
    review: {
      stars: 5
      commentary: "This is a great movie!"
    }
  ) {
    stars
    commentary
  }
}
```

Input Object 型別的欄位可以參考其他 Input Object 型別，但不能混用輸入與輸出型別。Input Object 型別的欄位也不能有參數。

## 指令（Directives）

有時候欄位參數不夠用，或需要在多個地方重複某些行為時，可以用[指令（directives）](https://spec.graphql.org/draft/#sec-Type-System.Directives)來修飾 GraphQL schema 或操作。指令用 `@` 加上名稱。

_型別系統指令_ 可以註解型別、欄位、參數，讓它們在驗證或執行時有不同行為。


指令也可以用在 GraphQL 查詢操作上，稱為 _可執行指令_。詳見 查詢頁的指令說明。


GraphQL 規範定義了幾個[內建指令](https://spec.graphql.org/draft/#sec-Type-System.Directives.Built-in-Directives)。例如支援 SDL 的實作會有 `@deprecated` 指令，可以標註 schema 中已棄用的部分：

```graphql
type User {
  fullName: String
  name: String @deprecated(reason: "請改用 `fullName`。")
}
```

如果你用的 GraphQL 實作支援 SDL，通常不用自己定義 `@deprecated` 指令，但它的底層定義會像這樣：

```graphql
directive @deprecated(
  reason: String = "No longer supported"
) on FIELD_DEFINITION | ENUM_VALUE
```

和欄位一樣，指令也可以有參數，且參數可以有預設值。`@deprecated` 指令有一個可為 null 的 `reason` 參數，型別是 `String`，預設值是 "No longer supported"。指令也要指定可以用在哪些地方，例如 `@deprecated` 可以用在 `FIELD_DEFINITION` 或 `ENUM_VALUE`。

除了內建指令，你也可以自訂 _自定義指令_。和自訂純量型別一樣，如何在查詢執行時處理自訂指令，要看你選用的 GraphQL 實作。

## 文件說明（Documentation）

### 描述（Descriptions）

GraphQL 允許你為 schema 的型別、欄位、參數加上說明。其實官方建議只要名稱不夠自明就應該加說明。說明用 Markdown 語法，可以單行或多行。

SDL 寫法如下：

```graphql
"""
星際大戰宇宙中的角色
"""
type Character {
  "角色名稱。"
  name: String!
}

"""
星際大戰三部曲的集數
"""
enum Episode {
  "1977 年上映的星際大戰四部曲：曙光乍現。" 
  NEWHOPE
  "1980 年上映的星際大戰五部曲：帝國大反擊。"
  EMPIRE
  "1983 年上映的星際大戰六部曲：絕地大反攻。"
  JEDI
}

"""
查詢型別，代表所有物件圖的進入點
"""
type Query {
  """
  取得指定星際大戰電影的主角。
  """
  hero(
    "主角出現的電影名稱。"
    episode: Episode
  ): Character
}
```

這些說明除了讓 schema 更易懂，也會出現在 introspection 查詢和像 [GraphiQL](https://github.com/graphql/graphiql) 這類開發工具中，對前端開發者很有幫助。

### 註解（Comments）

有時你想在 schema 裡加註解，但不想讓前端看到，也不是型別、欄位、參數的說明，這時可以用 `#` 開頭加單行註解：

```graphql
# 這行會被 GraphQL 當成空白忽略
type Character {
  name: String!
}
```

查詢裡也可以加註解：

```graphql
# { "graphiql": true }
{
  hero {
    name
    # 查詢也可以加註解！
    friends {
      name
    }
  }
}
```

## 下一步

回顧本章學到的 schema 與型別重點：

- 根據選用的函式庫，可以用 SDL 或從程式碼產生 schema，達到語言無關的型別定義
- GraphQL 有六種命名型別：物件、純量、列舉、介面、聯集、輸入物件型別
- 物件型別的欄位指定輸出型別，欄位也可以有參數（輸入型別）
- `Int`、`Float`、`String`、`Boolean`、`ID` 是內建純量型別，也可以自訂純量型別
- 列舉型別和純量型別一樣是葉節點，但值是有限集合
- List（`[]`）和 Non-Null（`!`）修飾子可以改變欄位或參數的預設型別行為
- 介面和聯集型別是抽象型別，可以讓同一欄位回傳不同物件型別
- 輸入物件型別讓你可以傳遞比純量、列舉更複雜的參數
- 型別系統指令可以用在 schema 的型別、欄位、參數，影響查詢時的驗證與執行
- GraphQL 支援型別、欄位、參數說明，也支援不會被解析的註解

現在你已經了解型別系統的重點，可以繼續學習如何查詢 GraphQL API 的資料。
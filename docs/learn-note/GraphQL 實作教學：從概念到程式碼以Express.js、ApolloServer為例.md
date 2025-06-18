---
sidebar_position: 1
title: GraphQL 實作教學：從概念到程式碼以 Express.js、Apollo Server 為例
description: 解析 GraphQL 實作，包含 Schema、Resolver、Server 架構說明，以及如何實際操作與擴充 GraphQL API 的應用
  
tags:
  - graphql
last_update:
  date: 2025-06-18
  author: Danny
---

## 目錄
- [目錄](#目錄)
- [1. GraphQL 基本觀念介紹](#1-graphql-基本觀念介紹)
- [2. 使用套件說明](#2-使用套件說明)
- [3. GraphQL Server 基礎實作步驟](#3-graphql-server-基礎實作步驟)
  - [建立 Schema（型別定義）](#建立-schema型別定義)
  - [建立 Resolvers（解析器）](#建立-resolvers解析器)
  - [建立伺服器（Server）](#建立伺服器server)
- [4. 範例解說與操作](#4-範例解說與操作)
- [5. 完整範例如下](#5-完整範例如下)
- [6. 小結與延伸閱讀](#6-小結與延伸閱讀)

## 1. GraphQL 基本觀念介紹


GraphQL 是由 Facebook 提出的 API 查詢語言，用於前後端資料交換。不同於 RESTful API，GraphQL 提供更精確且彈性的資料請求方式，可避免資源過度或不足的問題。

## 2. 使用套件說明

本次使用的套件（package.json）：

* **Express**：架設伺服器。
* **Apollo Server**：實作 GraphQL Server。
* **Express Integration**：整合 Apollo 與 Express。
* **cors**：處理跨來源請求。
* **graphql**：提供 GraphQL 核心功能。
* **nodemon**（開發階段）：即時重啟伺服器。

## 3. GraphQL Server 基礎實作步驟

### 建立 Schema（型別定義）

定義資料的形狀與可操作的 Query 和 Mutation。

```graphql
type Book {
  id: ID!
  title: String!
  author: String!
  publishedYear: Int
}

type Query {
  books: [Book!]!
  book(id: ID!): Book
  hello: String
}

type Mutation {
  addBook(title: String!, author: String!, publishedYear: Int): Book!
}
```

### 建立 Resolvers（解析器）

Resolvers 負責處理資料請求並返回相應結果。

```javascript
const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find(book => book.id === id),
    hello: () => "你好！歡迎使用 GraphQL API！",
  },
  Mutation: {
    addBook: (_, { title, author, publishedYear }) => {
      const newBook = {
        id: String(books.length + 1),
        title,
        author,
        publishedYear,
      };
      books.push(newBook);
      return newBook;
    },
  },
};
```

### 建立伺服器（Server）

使用 Express 和 Apollo Server 架設 GraphQL 伺服器。

```javascript
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  app.get("/", (req, res) => {
    res.json({
      message: "🚀 GraphQL API 伺服器運行中！",
      graphql: "http://localhost:4000/graphql",
      note: "請訪問 /graphql 來使用 GraphQL Playground",
    });
  });

  app.listen(4000, () => {
    console.log("🚀 伺服器運行在 http://localhost:4000");
    console.log("📊 GraphQL 端點：http://localhost:4000/graphql");
  });
}

startServer().catch(console.error);
```

## 4. 範例解說與操作

啟動伺服器後，可透過 `/graphql` 端點使用 GraphQL Playground 進行查詢與修改資料。

範例 Query：

```graphql
query {
  books {
    id
    title
    author
    publishedYear
  }
}
```

範例 Mutation：

```graphql
mutation {
  addBook(title: "新的書籍", author: "作者", publishedYear: 2024) {
    id
    title
    author
  }
}
```
## 5. 完整範例如下

package.json 如下

```json
{
  "name": "express-graphql",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "type": "module",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@apollo/server": "^4.10.0",
    "@as-integrations/express5": "^1.1.0",
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "graphql": "^16.8.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}
```

app.js 程式碼如下

```javascript
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";

// 定義 GraphQL 型別定義（Schema）
const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedYear: Int
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    hello: String
  }

  type Mutation {
    addBook(title: String!, author: String!, publishedYear: Int): Book!
  }
`;

// 模擬資料庫
let books = [
	{ id: "1", title: "圍城", author: "錢鍾書", publishedYear: 1947 },
	{ id: "2", title: "活著", author: "余華", publishedYear: 1993 },
	{ id: "3", title: "茶花女", author: "小仲馬", publishedYear: 1848 },
];

// 定義解析器（Resolvers）
const resolvers = {
	Query: {
		// 取得所有書籍
		books: () => books,
		// 依照 ID 取得單一書籍
		book: (_, { id }) => books.find((book) => book.id === id),
		// 簡單的問候函式
		hello: () => "你好！歡迎使用 GraphQL API！",
	},
	Mutation: {
		// 新增書籍
		addBook: (_, { title, author, publishedYear }) => {
			const newBook = {
				id: String(books.length + 1),
				title,
				author,
				publishedYear,
			};
			books.push(newBook);
			return newBook;
		},
	},
};

async function startServer() {
	// 建立 Apollo Server 實例
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	// 建立 Express 應用程式
	const app = express();

	// 啟動 Apollo Server
	await server.start();

	app.use("/graphql", cors(), express.json(), expressMiddleware(server));

	// 健康檢查端點
	app.get("/", (req, res) => {
		res.json({
			message: "🚀 GraphQL API 伺服器運行中！",
			graphql: "http://localhost:4000/graphql",
			note: "請訪問 /graphql 來使用 GraphQL Playground",
		});
	});

	const PORT = process.env.PORT || 4000;

	app.listen(PORT, () => {
		console.log(`🚀 伺服器運行在 http://localhost:${PORT}`);
		console.log(`📊 GraphQL 端點：http://localhost:${PORT}/graphql`);
		console.log(`🔍 GraphQL Playground: http://localhost:${PORT}/graphql`);
		console.log("💡 同一個端點根據請求類型自動切換功能");
	});
}

// 啟動伺服器
startServer().catch((error) => {
	console.error("啟動伺服器時發生錯誤：", error);
});
```

## 6. 小結與延伸閱讀

以上即是 GraphQL 的基礎實作，可根據此範例延伸並新增更豐富的功能，例如：認證機制、進階查詢與錯誤處理。

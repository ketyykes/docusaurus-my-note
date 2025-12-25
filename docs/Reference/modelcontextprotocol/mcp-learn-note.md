---
sidebar_position: 1
title: Model Context Protocol (MCP) 學習筆記
description: 了解 MCP 協定的四大核心功能：Tools、Resources、Prompts 與 Samplings，讓 AI 能夠與外部系統進行標準化互動
tags:
  - MCP
last_update:
  date: 2025-12-25
  author: Danny
---

# Model Context Protocol (MCP) 學習筆記

## 什麼是 MCP？

Model Context Protocol (MCP) 是一個協定，用於讓 AI 模型能夠與外部系統進行標準化的互動。透過 MCP，AI 可以存取各種外部資源和功能，而不需要為每個系統客製化整合方式。

## MCP Server 的四大核心功能

MCP Server 提供四種主要的功能類型，讓 AI 能夠更有效地與外部系統協作：

### 1. Tools（工具）
工具是 MCP 中最廣泛使用的功能之一。它讓 AI 能夠執行特定的操作或動作。

**範例情境：**
當你呼叫 MCP server 時，server 可以告訴 AI「我有一個工具可以用來建立表格」。這樣 AI 就知道它可以使用這個工具來幫使用者建立表格。

### 2. Resources（資源）
資源是另一個最廣泛使用的功能，它提供 AI 可以存取的實際資料或檔案。

**範例情境：**
資源可能是一個實際的 Excel 檔案。當 AI 需要處理表格資料時，它可以透過 MCP 存取這個 Excel 檔案，讀取其中的內容或進行修改。

### 3. Prompts（提示）
Prompts 功能讓 MCP server 可以根據特定的提示範本來傳送資訊給 AI。這有助於標準化某些常見的互動模式。

### 4. Samplings（採樣）
採樣功能讓 AI 能夠主動向使用者請求更多資訊或範例。

**範例情境：**
當 AI 不確定使用者的需求時，它可以透過採樣功能反問使用者：「可以給我一些範例嗎？」這樣 AI 才能更準確地理解要做什麼，並提供更符合期望的結果。

## MCP 的優勢

透過 MCP，AI 系統可以：
- 標準化與外部系統的整合方式
- 靈活地存取各種資源和工具
- 主動與使用者互動以獲得更清晰的指示
- 擴展自身的功能範圍，不受限於內建能力

## 小結

MCP 就像是 AI 與外部世界溝通的橋樑，透過 Tools、Resources、Prompts 和 Samplings 這四種功能，讓 AI 能夠存取資料、執行操作、理解使用者需求，並提供更完整的服務。其中 Tools 和 Resources 是目前最常被使用的兩種功能。
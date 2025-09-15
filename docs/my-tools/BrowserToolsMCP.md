---
title: Browser Tools MCP 工具 介紹
description: 本文將帶你一步步了解 Browser Tools MCP 工具，從動機、安裝、實作到常見問題，讓 AI 助手能即時存取瀏覽器 Console、Network、DOM 與截圖，並執行 Lighthouse 稽核等工具。
tags:
  - tool
last_update:
  date: 2025-07-14
  author: Danny
---


本篇文章將會涵蓋以下重點：
- 什麼是 Browser Tools MCP？
- 如何安裝與快速啟動？
- 各種 Audit Tools  的實際應用方式
- 架構說明與運作原理
- 常見問題與注意事項

在 AI 助手越來越普及的今天，如何讓 AI 直接存取瀏覽器的 Console、Network、DOM，甚至自動執行 Lighthouse 稽核，已經成為開發者提升效率的關鍵。這邊會帶你一步步了解並實作！


## 什麼是 Browser Tools MCP？

Browser Tools MCP 是一套讓 AI 助手（例如 Cursor、Claude Desktop 等）能夠即時存取瀏覽器資料的工具組。<span class="blue">它結合 Chrome 擴充套件、NodeJS 伺服器與 MCP 標準協議，讓 AI 可以「看見」你的瀏覽器畫面、Console log、Network 請求，甚至自動截圖與執行稽核。</span>

換句話說，這個工具就是讓 AI 助手能夠像人一樣「觀察」與「操作」你的瀏覽器，並且回傳結構化的分析結果。

## 安裝與快速啟動

### 步驟一：安裝 Chrome 擴充套件

請先下載並安裝官方提供的 Chrome 擴充套件：  
[BrowserToolsMCP Chrome Extension v1.2.0](https://github.com/AgentDeskAI/browser-tools-mcp/releases/download/v1.2.0/BrowserTools-1.2.0-extension.zip)

### 步驟二：安裝 MCP 伺服器

在你的 IDE 終端機輸入以下指令：  
<span class="mycode">npx @agentdeskai/browser-tools-mcp@latest</span>

### 步驟三：啟動本地 Node 伺服器

開啟新終端機視窗，執行：  
<span class="mycode">npx @agentdeskai/browser-tools-server@latest</span>

需特別留意：  
<span class="red">這兩個伺服器必須同時啟動，否則功能無法正常運作！</span>

#### 問題排解小技巧
- 完全關閉 Chrome（不只是關閉視窗，而是結束所有進程）
- 重新啟動本地 Node 伺服器
- 確認只開啟一個 DevTools 面板

## 常見問題與排解

如果遇到無法連線，請嘗試上述步驟。如果還是不行，歡迎在 Github 開 issue 或聯絡作者 [@tedx_ai on x](https://x.com/tedx_ai)。

## 如何使用 Audit Tools?

### 問題：如何檢查網頁的無障礙（Accessibility）？

你可以直接在 MCP 客戶端輸入：  
<span class="mycode">"Run an accessibility audit."</span>  
系統會自動執行 WCAG 標準檢查，並回傳結構化 JSON 結果。

### 問題：怎麼檢查效能、SEO、最佳實踐？

同理，分別輸入：  
<span class="mycode">"Run a performance audit."</span>  
<span class="mycode">"Run an SEO audit."</span>  
<span class="mycode">"Run a best practices audit."</span>

> <span class="green">建議操作：</span>  
> 你也可以直接輸入 <span class="mycode">"Run audit mode."</span> 一次執行所有稽核！

### 問題：NextJS 專案有什麼特別稽核？

如果你是 NextJS 使用者，可以輸入：  
<span class="mycode">"Run a NextJS audit."</span>  
系統會針對 NextJS SEO 與最佳實踐進行檢查。

### 問題：什麼是 Debugger Mode？

輸入 <span class="mycode">"Enter debugger mode."</span>，系統會自動執行一連串除錯工具，協助你快速定位問題。

## 架構與運作原理

這套系統主要由三大核心組件組成：

1. **Chrome 擴充套件**：負責擷取瀏覽器畫面、Console log、Network 活動與 DOM 元素。
2. **Node 伺服器**：作為中介，負責溝通 Chrome 擴充套件與 MCP 伺服器。
3. **MCP 伺服器**：提供標準化工具，讓 AI 客戶端（如 Cursor、Claude Desktop 等）能夠互動。

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐     ┌─────────────┐
│  MCP Client │ ──► │  MCP Server  │ ──► │  Node Server  │ ──► │   Chrome    │
│  (e.g.      │ ◄── │  (Protocol   │ ◄── │ (Middleware)  │ ◄── │  Extension  │
│   Cursor)   │     │   Handler)   │     │               │     │             │
└─────────────┘     └──────────────┘     └───────────────┘     └─────────────┘
```

<span class="blue">補充說明：所有日誌都只儲存在本地端，絕不會傳送到第三方服務，請安心使用。</span>

## 支援的功能與相容性

- 監控 Console 輸出
- 擷取 Network 流量
- 截圖
- 分析選取元素
- 清除 MCP 伺服器日誌
- 執行 Accessibility、Performance、SEO、Best Practices 各類稽核
- 支援多種 MCP 客戶端，主要設計給 Cursor IDE，也可用於其他 AI 編輯器

## Claude Code 使用者快速配置

如果你正在使用 Claude Code，可以透過一行指令快速添加此 MCP：

<span class="mycode">claude mcp add browser-tools -s user -- npx -y @agentdeskai/browser-tools-mcp@1.2.1</span>

### 指令說明：
- `claude mcp add`：Claude Code 的 MCP 管理指令
- `browser-tools`：為此 MCP 設定的本地名稱（可自訂）
- `-s user`：將 MCP 安裝到用戶設定範圍（非全域）
- `--`：分隔 Claude Code 參數與 MCP 執行指令
- `npx -y @agentdeskai/browser-tools-mcp@1.2.1`：使用 npx 執行特定版本的 browser-tools-mcp

配置完成後，重啟 Claude Code 即可開始使用所有瀏覽器工具功能！

> <span class="red">注意：</span>你仍需要按照上述步驟安裝 Chrome 擴充套件並啟動 Node 伺服器。

## 參考資料

- [官方文件 BrowserTools MCP Docs](https://browsertools.agentdesk.ai/)
- [Github - BrowserTools MCP](https://github.com/AgentDeskAI/browser-tools-mcp)
- [ClaudeLog - Browser Tools MCP](https://claudelog.com/claude-code-mcps/browser-tools-mcp/)

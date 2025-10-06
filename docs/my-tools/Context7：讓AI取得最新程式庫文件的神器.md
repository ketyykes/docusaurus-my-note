---
title: Context7：讓 AI 取得最新程式庫文件的神器
description: 本文將帶你深入了解 Context7 MCP 工具，從問題動機、核心概念到實際安裝與使用，讓 AI 助手能即時查詢最新的官方程式庫文件，避免過時的程式碼範例和 API 幻覺問題。
tags:
  - tool
last_update:
  date: 2025-10-07
  author: Danny
---

本篇文章將會涵蓋以下重點：

- 前言
- Context7 是什麼？
- Context7 如何運作？
- 在 Claude Code 安裝 Context7
- 如何使用 Context7？
- 注意事項與小技巧
- 總結
- 參考資料


## 前言

在使用 AI 工具協助寫程式的時候，你是不是也遇過這些狀況呢？

- AI 給的程式碼範例已經過時，執行後才發現語法早就改版了
- AI 推薦的 API 方法根本不存在，結果是 AI 的「幻覺」
- 詢問特定版本的套件用法，但 AI 只能給你很舊的通用答案

這些問題的根源在於：<span class="red">AI 的訓練資料往往已經過時，它無法即時取得最新的程式庫文件</span>。換句話說，就算你使用的是最新版本的套件，AI 腦中的知識可能還停留在一年前。

為了解決這個問題，Context7 應運而生！

## Context7 是什麼？

簡單的說法就是，<span class="green">Context7 是一個能讓 AI 即時查詢最新程式庫文件的工具</span>。我們可以把它想像成 **AI 的即時圖書館**：當你詢問 AI 某個套件的用法時，Context7 會立刻去查詢該套件的官方文件，然後把最新、最正確的資訊提供給 AI。

### Context7 解決了什麼問題？

讓我們來看看使用 Context7 前後的差異：

#### ❌ 沒有使用 Context7

AI 只能依靠過時或通用的訓練資料，你會遇到：

- 程式碼範例基於一年前的訓練資料，早已過時
- 推薦的 API 方法根本不存在（AI 的幻覺）
- 只能給出舊版套件的通用答案

#### ✅ 使用 Context7 之後

Context7 會從官方來源取得<span class="red">最新的、特定版本的</span>文件和程式碼範例，直接放進你的提示詞中，讓 AI 能夠：

- 提供符合最新版本的程式碼範例
- 使用真實存在的 API 和方法
- 根據特定版本給出精確的建議

值得一提的是，<span class="blue">Context7 支援上千個熱門專案，包括 React、Next.js、Vue、Supabase、Cloudflare Workers 等等</span>。

## Context7 如何運作？

Context7 使用起來非常簡單，整個流程可以分為三個步驟：

1. **📝 你正常撰寫提示詞**：例如「建立一個 Next.js 中介軟體來檢查 JWT」
2. **🔍 告訴 AI 使用 Context7**：在提示詞最後加上 `use context7`
3. **✨ AI 取得最新文件並回答**：Context7 會自動抓取相關的最新文件，讓 AI 給你正確的答案

換句話說，你只需要在提示詞最後加上「use context7」這四個字，就能讓 AI 取得最新的官方文件！

### 實際範例

```
建立一個 Next.js 中介軟體，檢查 cookies 中的 JWT 是否有效，
如果沒有認證就重新導向到 /login。use context7
```

```
設定一個 Cloudflare Worker 腳本，讓 JSON API 回應快取 5 分鐘。use context7
```

看到了嗎？接下來我們就來學習如何在 Claude Code 中安裝 Context7。

## 在 Claude Code 安裝 Context7

### 前置需求

在開始安裝之前，請確認你的環境符合以下條件：

- <span class="mycode">Node.js >= v18.0.0</span>
- 已安裝 Claude Code（或其他支援 MCP 的 AI 工具，如 Cursor、VSCode、Windsurf）

### 方法一：基礎安裝（不使用 API Key）

如果你只是想試試 Context7，可以使用基礎安裝方式。只需要執行以下指令：

```bash
claude mcp add --transport http context7 https://mcp.context7.com/mcp
```

這樣就安裝完成了！是不是很簡單？

不過需要注意的是，<span class="red">沒有使用 API key 的情況下，速率限制將會比較嚴格</span>，如果你需要更高的速率限制或存取私有儲存庫，建議使用 API Key。

### 方法二：進階設定（使用 API Key）

#### 取得 API Key

1. 前往 [context7.com/dashboard](https://context7.com/dashboard) 建立帳號
2. 在儀表板中找到「API Keys」區塊
3. 點擊「Generate New API Key」按鈕
4. 複製產生的 API Key（<span class="red">請妥善保管，離開頁面後就無法再次查看</span>）

如下圖

![Context7-Generator-Api-Key](https://hackmd.io/_uploads/SJ5F2wWpeg.png)


#### 安裝並設定 API Key

取得 API Key 後，執行以下指令：

```bash
claude mcp add --transport http context7 https://mcp.context7.com/mcp --header "CONTEXT7_API_KEY: 你的API_Key"
```

記得把<span class="mycode">你的 API_Key</span>替換成你剛才複製的實際 API Key。

#### 驗證安裝是否成功

安裝完成後，我們可以透過以下步驟來驗證 Context7 是否正確安裝。

首先，在 Claude Code 中輸入 <span class="mycode">/mcp</span> 指令，你應該會看到類似以下的畫面：

```bash
╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Manage MCP servers                                                                                             │
│                                                                                                                │
│ ❯ 1. context7                     ✔ connected · Enter to view details                                          │
│                                                                                                                │
│ MCP Config locations (by scope):                                                                               │
│  • User config (available in all your projects):                                                               │
│    • /Users/XXX/.claude.json                                                                                   │
│  • Project config (shared via .mcp.json):                                                                      │
│    • /Users/XXX/Desktop/project/neighborhood-helper/.mcp.json                                                  │
│  • Local config (private to you in this project):                                                              │
│    • /Users/XXX/.claude.json [project: /Users/XXX/your_path                                                    │
│                                                                                                                │
│ For help configuring MCP servers, see: https://docs.claude.com/en/docs/claude-code/mcp                         │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
   Esc to exit
```

在這個列表中，你應該可以看到 <span class="green">context7 顯示為 ✔ connected 狀態</span>。這代表 Context7 已經成功連線。

接著，將游標移到 `context7` 並按下 <span class="mycode">Enter</span>，你會看到更詳細的伺服器資訊：

```bash
╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Context7 MCP Server                                                                                            │
│                                                                                                                │
│ Status: ✔ connected                                                                                            │
│ URL: https://mcp.context7.com/mcp                                                                              │
│ Config location: /Users/XXX/.claude.json [project: /Users/XXX/your_path                                        │
│ Capabilities: tools                                                                                            │
│ Tools: 2 tools                                                                                                 │
│                                                                                                                │
│ ❯ 1. View tools                                                                                                │
│   2. Authenticate                                                                                              │
│   3. Reconnect                                                                                                 │
│   4. Disable                                                                                                   │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
   Esc to go back
```

這個畫面顯示了 Context7 伺服器的詳細資訊，包括連線狀態、伺服器網址、配置檔案位置等。<span class="blue">，Context7 提供了 2 個工具供 AI 使用</span>。

選擇 <span class="blue">View tools</span> 選項並按下 Enter，你可以查看這兩個工具的名稱：

```bash
╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Tools for context7 (2 tools)                                                                                   │
│                                                                                                                │
│ ❯ 1. resolve-library-id                                                                                        │
│   2. get-library-docs                                                                                          │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

Context7 主要提供兩個核心工具：

1. **resolve-library-id** - 用於解析和識別程式庫的 Context7 ID
2. **get-library-docs** - 用於取得程式庫的最新文件內容

確認安裝完成後，讓我們來測試看看！在 Claude Code 中輸入以下提示詞：

```
請使用 React 的最新語法建立一個計數器元件。use context7
```

<span class="green">這時候 Claude Code 就會自動調用 Context7 的工具來查詢最新的 React 文件</span>，並根據最新的語法和最佳實踐來幫你撰寫程式碼。如果你看到 AI 正在使用 `resolve-library-id` 和 `get-library-docs` 這兩個工具，就代表 Context7 正常運作了！


## 如何使用 Context7？

### 基本使用方式

最簡單的使用方式就是在提示詞後面加上<span class="mycode">use context7</span>：

```
建立一個使用 Supabase 的基本身份驗證功能。use context7
```

Context7 會自動識別你提到的程式庫（例如 Supabase），然後取得相關的最新文件。

### 進階技巧一：設定自動規則

如果你不想每次都輸入「use context7」，可以在 Claude Code 的設定檔中建立規則。

在專案根目錄的<span class="mycode">CLAUDE.md</span>檔案中加入以下規則：

```markdown
## Context7 使用規則

當我需要程式碼生成、設定步驟、或查詢程式庫/API 文件時，
請自動使用 Context7 MCP 工具來取得程式庫 ID 和文件，
不需要我明確要求。
```

以 widsurfrules 為例<span class="blue">在 Windsurf 中是設定在 `.windsurfrules` 檔案，Cursor 則是在「Cursor Settings > Rules」區塊</span>。

設定完成後，AI 就會自動判斷什麼時候需要使用 Context7，你不用再手動加上「use context7」了！

### 進階技巧二：直接使用 Library ID

如果你已經知道要查詢的程式庫在 Context7 中的 ID，可以直接指定，這樣可以跳過程式庫匹配的步驟，讓查詢更快速：

```
使用 Supabase 實作基本身份驗證。use library /supabase/supabase for API and docs.
```

這個斜線語法<span class="mycode">/supabase/supabase</span>會告訴 Context7 直接載入該程式庫的文件。

### 進階技巧三：Proxy 設定

如果你的網路環境需要使用 HTTP Proxy，Context7 支援標準的環境變數：

```bash
export https_proxy=http://your-proxy-server:port
# 或
export HTTPS_PROXY=http://your-proxy-server:port
```

設定完成後，Context7 就會透過你指定的 Proxy 伺服器來取得文件。

### 常見使用情境

接下來我們看幾個實際的使用範例：

#### 情境一：建立 Next.js 中介軟體

```
建立一個 Next.js 中介軟體來檢查使用者的 JWT token，
如果驗證失敗就重新導向到登入頁面。use context7
```

Context7 會取得 Next.js 最新的中介軟體文件和身份驗證範例。

#### 情境二：設定 Cloudflare Worker

```
設定一個 Cloudflare Worker 腳本，讓 JSON API 的回應快取 5 分鐘。use context7
```

Context7 會提供 Cloudflare Workers 的快取 API 最新用法。

#### 情境三：使用特定版本的 React Query

```
使用 React Query v5 來處理資料快取和同步。use library /tanstack/query for API and docs.
```

透過指定 Library ID，可以確保取得正確版本的文件。

## 注意事項與小技巧

### ⚠️ SSE 協定已棄用

需要特別注意的是，<span class="red">Server-Sent Events (SSE) 傳輸協定已經棄用，未來版本將會移除</span>。

如果你之前使用 SSE 方式安裝，建議改用 HTTP 傳輸協定（也就是我們前面介紹的安裝方式）。

### 🔧 CLI 參數說明

Context7 的 MCP 伺服器支援以下 CLI 參數：

| 參數                        | 說明                | 預設值 |
| --------------------------- | ------------------- | ------ |
| `--transport <stdio\|http>` | 傳輸協定類型        | stdio  |
| `--port <number>`           | HTTP 伺服器監聽埠號 | 3000   |
| `--api-key <key>`           | API Key 認證        | 無     |

值得一提的是，<span class="blue">使用 HTTP 傳輸時會同時提供 HTTP 和 SSE 端點</span>。

### 💡 使用小技巧

1. **善用 Library ID**：如果你經常使用某個程式庫，可以記下它的 Library ID，直接指定會更快
2. **設定自動規則**：在 CLAUDE.md 中設定規則後，就不用每次都輸入「use context7」
3. **注意版本相容性**：Context7 會提供最新文件，如果你的專案使用舊版套件，記得注意版本差異
4. **多利用官方範例**：Context7 取得的文件通常包含官方範例，可以直接參考使用

## 總結

Context7 是一個讓 AI 能夠即時取得最新程式庫文件的強大工具。透過簡單的安裝步驟和「use context7」指令，我們就能大幅提升 AI 的回答品質，避免過時的程式碼範例和幻覺 API。

簡單來說，Context7 的核心優勢包括：

- ✅ <span class="green">取得最新的、特定版本的官方文件</span>
- ✅ <span class="green">避免 AI 提供過時或錯誤的程式碼</span>
- ✅ <span class="green">支援上千個熱門程式庫和框架</span>
- ✅ <span class="green">安裝簡單，使用方便</span>

無論你是使用 Claude Code、Cursor、VSCode 或 Windsurf，都能輕鬆整合 Context7，讓 AI 成為你更強大的程式開發助手！

## 參考資料

想要了解更多關於 Context7 的資訊嗎？可以參考以下資源：

> - [Context7 官方網站](https://context7.com)
> - [Context7 GitHub 儲存庫](https://github.com/context-labs/context7-mcp)
> - [Context7 專案清單](https://context7.com/projects) - 查看所有支援的程式庫
> - [如何新增專案到 Context7](https://context7.com/add-library) - 貢獻你常用的程式庫

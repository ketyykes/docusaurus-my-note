---
sidebar_position: 1
title: 用 Google Stitch + Figma MCP + Claude Code 從設計到建立網頁使用 Prompt
description: 介紹如何結合 Google Stitch、Figma MCP 和 Claude Code，建立一套從設計到切版的自動化工作流程，提升開發效率並保持設計精確度。
tags:
  - AI
last_update:
  date: 2025-07-29
  author: Danny
---

# 用 Google Stitch + Figma MCP + Claude Code 從設計到建立網頁使用 Prompt



大家好！今天我們要來玩一個非常酷的組合技，將多個強大的 AI 工具串連起來，實現從設計稿到網頁程式碼的自動化流程。

本篇文章將會涵蓋以下重點：
- 使用 <span class="green">Google Stitch</span> 快速產生網頁設計概念稿。
- 將 <span class="green">Stitch</span> 設計稿匯入 <span class="green">Figma</span>。
- 設定 <span class="green">Figma MCP</span>，讓 <span class="green">Claude Code</span> 能讀取我們的設計。
- 下達一個指令，讓 <span class="green">Claude Code</span> 自動完成切版與圖片下載。


## 前言

在這個 AI 技術快速發展的時代，我們運用 AI 工具，能夠大幅縮短從網站設計到程式實作的流程。透過 AI 不僅提升了開發效率，更能確保設計理念完整呈現。
值得一提的是雖然市面上已有 <span class="green">firebase studio、blot.new、lovable </span>等工具，可以直接輸入 prompt 就產生網頁，但這些趨向一鍵式、自動生成的流程，往往犧牲了掌控細節的自由度

### 我們要介紹的解決方案

相較之下，接下來我們要介紹一套結合 **Google Stitch**、**Figma-Context-MCP**（由 GLips 維護）以及 **Claude Code** 的工作流程。

簡單的說法就是，透過 <span class="green">stitch.withgoogle.com</span> 我們可以借助自然語言，快速生成介面與前端程式草本。接下來藉由 **GLips/Figma-Context-MCP**，讓 Claude Code 或 Cursor 等 AI agent 模擬抓取 Figma 的設計 metadata，並將其轉換為 AI 易掌握的 layout 與 style 內容。

### 這套流程的優勢是什麼？

這套流程相較於純粹 prompt 生成網頁的方式，具有以下優點：
- **保有設計圖的精確性**：不會因為 AI 理解偏差而失真
- **不丟失元件層級與樣式資訊**：完整保留設計的結構化資料
- **允許細節控制**：在設計前、設計圖階段與實作程式中，能夠擁有更多控制權

為了達成這個目標，本文將逐步拆解整個流程，帶你從 prompt 撰寫到建立網頁。


## 步驟一：使用 Google Stitch 快速生成設計稿

首先，我們來到 Google 的實驗性工具 [Stitch](https://stitch.withgoogle.com/)。

Stitch 是一個可以透過文字描述來生成網頁 UI 設計的工具。簡單的說法就是，你只要出一張嘴，它就能幫你畫出設計圖。

進到頁面後，我們會看到一個輸入框。這裡我們以建立一個賣魚的 Landing Page 為範例，直接輸入我們的想法：

![image](https://hackmd.io/_uploads/HJDuKh7Del.png)

建立完之後，右上角可以快速套用不同的設計主題。例如我們把主題顏色改成綠色，可以看到按鈕等元素就馬上跟著變色了。

值得一提的是<span class="red">按下 "..." 按鈕可以看到官方的提示詞指南（Prompt Guide）</span>，想更近一步了解如何下指令的朋友可以參考[這份文件](https://discuss.ai.google.dev/t/stitch-prompt-guide/83844)。

![截圖 2025-07-27 晚上 10.48.11](https://hackmd.io/_uploads/ByeM6n7vex.png)

## 步驟二：將設計稿匯入 Figma

當我們對 Stitch 產生的設計感到滿意後，神奇的事情發生了。你會在畫面上方看到一個 <span class="green">Figma</span> 的圖示，勇敢地按下去！

![截圖 2025-07-27 晚上 10.57.39](https://hackmd.io/_uploads/SyUYA27Dge.png)

接下來，我們打開 [Figma](https://www.figma.com/design)，點選上方的 "Design file" 按鈕，然後直接 `Cmd+V` 或 `Ctrl+V` 貼上，剛剛在 Stitch 的設計稿就完整地出現在我們的 Figma 畫布上了！

![截圖 2025-07-29 下午 6.46.54 (1)](https://hackmd.io/_uploads/rJCtFmUwee.png)

## 步驟三：設定 Figma MCP (Multi-Tool Code Provider)

接下來就是重頭戲了，我們要設定一個叫做 [Figma Context MCP](https://github.com/GLips/Figma-Context-MCP) 的工具，讓我們的 AI 開發環境 <span class="green">Claude Code</span> 能夠「看懂」Figma 設計稿。

### 如何取得 Figma Token？

首先，為了讓工具能存取我們的 Figma 檔案，需要一組 API 金鑰，也就是 Token。

我們點選 Figma 右上角的大頭貼，進入 "Settings"。

![截圖 2025-07-29 晚上 7.06.17 (1)](https://hackmd.io/_uploads/r1CypmUwex.png)

在 "Personal access tokens" 區塊，點擊 "Generate new token" 來產生一組新的金鑰。請記得<span class="red">務必先把這組金鑰複製下來</span>，因為關掉視窗後就看不到了。

![截圖 2025-07-29 晚上 7.14.57 (1)](https://hackmd.io/_uploads/BJOy07LDxg.png)

### 設定 Claude Code MCP

拿到金鑰後，我們打開終端機，準備把 Figma MCP 加到 Claude Code 環境中。

```bash
claude mcp add-json "FramelinkFigmaMCP" \ 
  '{"command":"npx","args":["-y","figma-developer-mcp","--figma-api-key=你的金鑰","--stdio"]}'
```

<span class="red">這邊需要注意的是</span>，MCP 的名稱有一些限制，只能包含字母和數字，不能有空白、hyphens 或底線。如果你在執行時看到 `Invalid name` 的錯誤，請檢查一下名稱是否符合規範。

設定成功後，我們在 Claude Code 中輸入 `/mcp`，就可以看到 如下<span class="green">FramelinkFigmaMCP</span> 已經成功連線了！

```bash
╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Manage MCP servers                                                                                                 │
│                                                                                                                    │
│ ❯ 1. FramelinkFigmaMCP  ✔ connected · Enter to view details                                                        │
│                                                                                                                    │
│ MCP Config locations (by scope):                                                                                   │
│  • User config (available in all your projects):                                                                   │
│    • /Users/xxx/.claude.json                                                                                   │
│  • Project config (shared via .mcp.json):                                                                          │
│    • /Users/xxx/Desktop/project/ooxx/.mcp.json (file does not exist)                                      │
│  • Local config (private to you in this project):                                                                  │
│    • /Users/ooxx/.claude.json [project: /Users/ooxx/Desktop/project/fish-shop]                               │
│                                                                                                                    │
│ For help configuring MCP servers, see: https://docs.anthropic.com/en/docs/claude-code/mcp                          │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
   Esc to exit
```

## 步驟四：讓 Claude Code 幫我們建立網頁

我們回到 Figma 設計稿，選取我們想要切版的區塊（Section），然後點擊右鍵選擇 "Copy link to section"。

![image](https://hackmd.io/_uploads/r19f5N8veg.png)

最後，回到 Claude Code，我們就可以用最自然的方式下指令了。如果怕 LLM 不會啟動 MCP，可以直接叫他啟動 MCP，如以下 prompt

```
開啟figma mcp 幫我切"https://www.figma.com/design/你的圖片網址"包含下載圖片的部分
```

送出之後，Claude Code 就會開始分析設計稿、產生 HTML/CSS 程式碼，甚至幫我們把圖片都下載到本地，一個神奇的自動化流程就這樣完成了！

## 總結

綜合以上所述，我們透過串連 <span class="mycode">Google Stitch</span>、<span class="mycode">Figma</span>、以及 <span class="mycode">Claude Code MCP</span>，成功建立了一套自動化工作流程。希望這篇文章對大家有幫助！

## 參考資料
- [Google Stitch](https://stitch.withgoogle.com/)
- [Figma Context MCP on GitHub](https://github.com/GLips/Figma-Context-MCP)
- [Stitch Prompt Guide](https://discuss.ai.google.dev/t/stitch-prompt-guide/83844)
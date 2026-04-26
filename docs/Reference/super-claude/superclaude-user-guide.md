---
sidebar_position: 4
title: SuperClaude 使用者指南
description: 一份全面性的 SuperClaude 使用指南，涵蓋其核心元件、操作模式、指令、旗標與 Persona 的詳細介紹與實用範例。
tags:
  - SuperClaude
last_update:
  date: 2025-07-26
  author: Danny
---


## 🎯 簡單的真相

**在看似複雜的背後，SuperClaude 的使用其實很簡單。**

你不需要學習所有的指令、旗標和 Persona。直接開始使用就對了！🎈

SuperClaude 有一個**智慧路由系統**，會試圖弄清楚你的需求：
- 輸入 `/analyze some-code/` → 它會挑選合適的分析工具
- 詢問有關安全性的問題 → 安全專家會自動啟用
- 處理前端工作 → UI 專家會接手
- 除錯某個問題 → 調查模式會啟動

**學習於使用中自然發生** - 你會自然而然地發現有效的方法，而無需先研讀手冊。

下面的詳細指南呢？它們是為**當你想要了解**剛才發生了什麼，或想更深入探索時準備的。但老實說？大多數時候，你隨意發揮就好。😊

---

**長話短說**：安裝它，在你的程式碼上試試 `/analyze` 或 `/build`，然後見證奇蹟發生。

---

一份全面性的指南，幫助你有效地理解和使用 SuperClaude v3.0。但請記住 - 你可以直接跳過，馬上試用！


## 🚀 從這裡開始

**想跳過閱讀，直接開始嗎？** 這是你的 2 分鐘入門：

```bash
# 在 Claude Code 中試試這些指令：
/sc:help                    # 查看有哪些可用指令
/sc:analyze README.md       # SuperClaude 分析你的專案
/sc:workflow feature-prd.md # 從 PRD 產生實作工作流程 (新功能！)
/sc:implement user-auth     # 建立功能和元件 (v3 新功能！)
/sc:build                   # 帶有自動優化的智慧建置
/sc:improve messy-file.js   # 自動清理程式碼
```

**剛才發生了什麼？** SuperClaude 自動地：
- 為每個任務挑選了合適的工具 🛠️
- 啟用了適當的專家 (安全、效能等) 🎭
- 應用了智慧旗標和優化 ⚡
- 提供了基於證據的建議 📊

**看到有多簡單了嗎？** 無需學習 - SuperClaude 會處理複雜性，讓你無需操心。

想了解它的運作原理嗎？繼續閱讀。只想繼續實驗？那就動手吧！🎯

---

## 歡迎與概覽 👋

### SuperClaude 到底是什麼？ 🤔

SuperClaude 讓 Claude Code 在開發工作上變得更聰明。你得到的不再是通用的回應，而是來自不同領域專家（安全、效能、前端等）的專業協助。

**老實說**：我們剛發布 v3.0，它才剛結束測試版。就其功能而言，它運作得相當不錯，但隨著我們不斷改進，你應該會預期到一些不完善之處。我們打造這個工具，是因為我們希望 Claude Code 對於真實的軟體開發工作流程更有幫助。

**最棒的部分？** 你不需要管理任何這些複雜性。只要使用像 `/analyze` 或 `/build` 這樣的正常指令，SuperClaude 通常會弄清楚該讓哪些專家參與，以及該使用哪些工具。🪄

### SuperClaude 增加了什麼 ✨

**🛠️ 17 個專業指令**
- 規劃工具：`/workflow` (新功能！)、`/estimate`、`/task`
- 開發工具：`/implement`、`/build`、`/design`
- 分析工具：`/analyze`、`/troubleshoot`、`/explain`
- 品質工具：`/improve`、`/cleanup`、`/test`
- 還有用於文件、git、部署等的工具
- **你只要使用它們** - SuperClaude 會自動處理複雜性
- **新功能**：`/workflow` 指令，用於從 PRD 到實作的規劃
- **新功能**：`/implement` 指令，用於建立功能 (恢復 v2 的功能)

**🎭 11 個智慧 Persona** *(知道何時該介入)*
- 能夠適應不同領域行為的 AI 專家
- **根據你的請求自動啟用** (安全專家處理安全任務等)
- 提供手動控制，但通常不需要
- 把它想像成擁有一個知道何時該幫忙的完整開發團隊

**🔧 MCP 伺服器整合** *(智慧外部工具)*
- Context7：官方函式庫文件查詢
- Sequential：複雜的多步驟分析
- Magic：現代 UI 元件產生
- Playwright：瀏覽器自動化與測試
- **在需要時自動連接** - 你不需要管理這些東西

**📋 增強的任務管理** *(在幕後進行)*
- 使用 TodoRead/TodoWrite 進行進度追蹤
- 使用 `/task` 進行多會話專案管理
- 使用 `/spawn` 進行複雜的編排
- 使用 `/loop` 進行迭代改進
- **大部分是自動的** - SuperClaude 會追蹤你在做什麼

**⚡ Token 優化** *(智慧效率)*
- 當情境快滿時進行智慧壓縮
- 用於高效溝通的符號系統
- 針對大型操作的效能優化
- **通常在需要時**為大型專案啟用

### 目前狀態 (v3.0) 📊

**✅ 運作良好的部分：**
- 安裝系統 (完全重寫，可靠性大大提高)
- 包含 16 個指令和 11 個 Persona 的核心框架
- MCP 伺服器整合 (大部分運作正常)
- 基本的任務管理和工作流程自動化
- 文件和使用者指南

**⚠️ 仍在改進的部分：**
- 這是一個初始版本 - 預計會有錯誤
- 某些 MCP 整合可以更順暢
- 並非所有操作的效能都已優化
- 一些進階功能是實驗性的

**❌ 我們移除的部分：**
- Hooks 系統 (變得太複雜，將在 v4 回歸)

我們對 v3 作為一個基礎感到相當滿意，但絕對還有改進的空間。

### 運作原理 🔄

**簡單版**：你輸入像 `/analyze auth.js` 這樣的指令，SuperClaude 會處理剩下的事。

**稍微詳細一點的版本**：

1. **智慧路由** - 分析你的請求內容
2. **自動專家選擇** - 挑選合適的專家 (安全、效能等)
3. **工具協調** - 在有幫助時連接到外部系統
4. **品質保證** - 確保建議是可靠的

**你看不到任何這些複雜性** - 感覺就像 Claude 在開發方面變得更聰明了。

好處是，這大部分是自動發生的。你提出請求，SuperClaude 試圖找出一個好的方法，並用適當的工具和專業知識來執行。通常不需要設定 - 只希望有更好的結果。✨

### 快速功能概覽 🎯

| 元件           | 功能                             | 了解更多 *(可選！)*               |
| -------------- | -------------------------------- | --------------------------------- |
| **指令**       | 15 個會自動啟用的專業工具        | [指令指南](commands-guide.md)     |
| **旗標**       | 大部分會自動啟用的修飾符         | [旗標指南](flags-guide.md)        |
| **Persona**    | 11 個知道何時該幫忙的 AI 專家    | [Persona 指南](personas-guide.md) |
| **MCP 伺服器** | 在需要時連接的外部整合           | [本指南](#核心元件-)              |
| **模式**       | 3 種適用於不同工作流程的操作模式 | [本指南](#三種操作模式-)          |
| **編排器**     | 讓一切運作的智慧路由             | [本指南](#編排器系統-)            |

**記住**：即使不閱讀任何這些指南，你也可以有效地使用 SuperClaude。它們是為當你對其運作原理感到好奇時準備的！🎪

---

## 核心元件 🧩

SuperClaude 由幾個相互連接的系統組成。以下是每個元件如何融入整體架構。

### 指令：你的工具箱 🛠️

指令是處理特定類型開發工作的專業工具。你得到的是針對不同情境的專用工具，而不是通用的「幫我處理這個」。

**按目的組織的 15 個指令：**

**開發** 🔨
- `/build` - 專案建置、編譯、打包
- `/design` - 系統架構與元件設計

**分析** 🔍
- `/analyze` - 全面的程式碼與系統分析
- `/troubleshoot` - 問題調查與除錯
- `/explain` - 教育性解釋與學習

**品質** ✨
- `/improve` - 程式碼增強與優化
- `/cleanup` - 技術債清理
- `/test` - 測試與覆蓋率分析

**工具** 🔧
- `/document` - 文件建立
- `/git` - 增強型 git 工作流程
- `/load` - 專案情境載入
- `/estimate` - 專案估算
- `/task` - 長期專案管理
- `/spawn` - 複雜操作編排
- `/index` - 指令導航與幫助

每個指令都有自己的旗標，會自動啟用適當的 Persona，並與相關的 MCP 伺服器整合。詳細範例和使用模式請參閱[指令指南](commands-guide.md)。

### 旗標：行為修飾符 🏁

旗標改變 SuperClaude 處理你請求的方式。它們就像是命令列選項，可以修改行為、增加功能或改變輸出風格。

**主要旗標類別：**

**規劃與分析** 🧠
- `--think` / `--think-hard` / `--ultrathink` - 控制思考深度
- `--plan` - 執行前顯示執行計畫

**效率與控制** ⚡
- `--uc` - 用於大型操作的超壓縮輸出
- `--safe-mode` - 帶有驗證的保守執行
- `--validate` - 操作前風險評估

**MCP 伺服器控制** 🔧
- `--c7` - 啟用 Context7 以取得文件
- `--seq` - 啟用 Sequential 以進行複雜分析
- `--magic` - 啟用 Magic 以產生 UI 元件
- `--play` - 啟用 Playwright 以進行測試

**進階編排** 🎭
- `--delegate` - 啟用子代理人委派以進行平行處理
- `--wave-mode` - 具有複合智慧的多階段執行
- `--loop` - 迭代改進模式

**焦點與範圍** 🎯
- `--focus security` - 專注於特定領域
- `--scope project` - 設定分析範圍
- `--persona-[name]` - 啟用特定 Persona

旗標通常會根據情境自動啟用。例如，與安全相關的請求通常會得到 `--persona-security` 和 `--focus security`。詳細資訊和模式請參閱[旗標指南](flags-guide.md)。

### Persona：AI 專家 🎭

Persona 就像是擁有一支隨時待命的專家團隊。每個 Persona 都帶來不同的專業知識、優先順序和處理問題的方法。

**按領域組織的 11 個 Persona：**

**技術專家** 🔧
- 🏗️ **architect** - 系統設計、長期架構
- 🎨 **frontend** - UI/UX、無障礙、前端效能
- ⚙️ **backend** - API、資料庫、可靠性
- 🛡️ **security** - 威脅模型、漏洞
- ⚡ **performance** - 優化、瓶頸消除

**流程與品質** ✨
- 🔍 **analyzer** - 根本原因分析、調查
- 🧪 **qa** - 測試、品質保證
- 🔄 **refactorer** - 程式碼品質、技術債
- 🚀 **devops** - 基礎設施、部署

**知識與溝通** 📚
- 👨‍🏫 **mentor** - 教育、知識轉移
- ✍️ **scribe** - 文件、技術寫作

Persona 通常會根據請求模式自動啟用，但你可以使用 `--persona-[name]` 旗標進行覆蓋。每個 Persona 都有不同的優先順序（例如，security persona 優先考慮安全性而非速度）。詳細描述和範例請參閱[Persona 指南](personas-guide.md)。

### MCP 伺服器：外部能力 🔧

MCP (Model Context Protocol) 伺服器提供超越 Claude 原生能力的專業功能。

**4 個整合伺服器：**

**Context7** 📚
- **目的**：官方函式庫文件與最佳實踐
- **啟用時機**：框架問題、外部函式庫使用
- **提供內容**：最新的文件、程式碼範例、模式
- **範例**：`/build react-app --c7` 獲取 React 最佳實踐

**Sequential** 🧠
- **目的**：複雜的多步驟分析與系統性思考
- **啟用時機**：除錯、系統設計、`--think` 旗標
- **提供內容**：結構化問題解決、假設測試
- **範例**：`/troubleshoot "auth randomly fails" --seq`

**Magic** ✨
- **目的**：現代 UI 元件產生與設計系統
- **啟用時機**：UI 元件請求、前端工作
- **提供內容**：React/Vue/Angular 元件、設計模式
- **範例**：`/build dashboard --magic` 建立現代 UI 元件

**Playwright** 🎭
- **目的**：瀏覽器自動化、E2E 測試、效能監控
- **啟用時機**：測試工作流程、效能分析
- **提供內容**：跨瀏覽器測試、視覺驗證、指標
- **範例**：`/test e2e --play` 執行全面的瀏覽器測試

MCP 伺服器通常會自動協調，但你可以使用 `--all-mcp`、`--no-mcp` 或特定旗標（如 `--c7`）來控制它們。

### 元件如何協同運作 🤝

最棒的部分是當元件協同運作時：

**範例：安全分析請求**
```bash
/sc:analyze auth-system/ --focus security
```

**通常會發生什麼：**
1. **指令**：`/analyze` 處理程式碼分析
2. **旗標**：`--focus security` 指示焦點
3. **Persona**：🛡️ security 專家自動啟用
4. **MCP**：Sequential 提供系統性分析
5. **編排器**：為最佳執行效果進行路由

**結果**：以安全為重點的分析，具有威脅模型觀點、系統性方法和全面覆蓋。

這種協調通常會發生在大多數請求中 - SuperClaude 會試圖為你的特定需求找出工具和專業知識的最佳組合。

---

## 三種操作模式 🎭

SuperClaude 在三種不同的模式下運作，以優化開發工作流程的不同方面。了解這些模式有助於你充分利用該框架。

### 任務管理模式 📋

**這是什麼**：具有進度追蹤和驗證的結構化工作流程執行。

**使用時機**：任何需要追蹤和協調的多步驟操作。

**運作方式**：SuperClaude 將工作分解為可管理的任務，追蹤進度，並透過驗證關卡確保品質。

#### 四層任務管理

**第一層：會話任務 (TodoRead/TodoWrite)**
- **範圍**：當前的 Claude Code 會話
- **容量**：每個會話 3-20 個任務
- **狀態**：pending 📋, in_progress 🔄, completed ✅, blocked 🚧
- **用途**：即時進度追蹤，用於當前工作

```bash
# SuperClaude 通常會建立和管理會話任務
/sc:build large-project/
# → 建立：「分析專案結構」、「執行建置流程」、「驗證輸出」
```

**第二層：專案任務 (/task 指令)**
- **範圍**：多會話功能 (數天至數週)
- **結構**：階層式 (Epic → Story → Task)
- **持久性**：跨會話狀態管理
- **用途**：長期功能開發

```bash
/sc:task create "implement user dashboard" --priority high
/sc:task breakdown "payment integration"
/sc:task status  # 檢查當前專案任務
```

**第三層：複雜編排 (/spawn 指令)**
- **範圍**：複雜的多領域操作
- **功能**：平行/順序協調、工具管理
- **用途**：涉及多個工具/系統的操作

```bash
/sc:spawn deploy-pipeline --parallel
/sc:spawn setup-dev-environment --monitor
```

**第四層：迭代增強 (/loop 指令)**
- **範圍**：漸進式精煉工作流程
- **功能**：帶有驗證的迭代週期
- **用途**：品質改進與精煉

```bash
/sc:improve messy-code.js --loop --iterations 3
# → 在週期之間透過驗證迭代改進程式碼
```

#### 任務狀態管理

**核心原則**：
- **基於證據的進度**：可衡量的結果，而不僅僅是活動
- **單一焦點協定**：一次只有一個任務處於 in_progress 狀態，以求清晰
- **即時更新**：隨著工作進展即時更新狀態
- **品質關卡**：在標記任務完成前進行驗證

**任務偵測**：
- 多步驟操作 (3+ 步驟) → 建立任務分解
- 關鍵字：build, implement, create, fix, optimize → 啟動任務追蹤
- 範圍指標：system, feature, comprehensive → 新增進度監控

### 內省模式 🧠

**這是什麼**：讓 SuperClaude 檢查自身推理和決策過程的元認知分析。

**使用時機**：複雜問題解決、框架疑難排解、學習時刻，或當你使用 `--introspect` 明確請求時。

**運作方式**：SuperClaude 跳出正常操作，分析其思維模式、決策邏輯和行動順序。

#### 核心能力

**推理分析** 🧠
- 檢查邏輯流程和決策理據
- 評估思維鏈的連貫性
- 識別假設和潛在偏見
- 根據證據驗證推理

**行動順序審查** 🔄
- 分析工具選擇的有效性
- 審查工作流程模式和效率
- 考慮替代方法
- 識別優化機會

**框架合規性檢查** 🔍
- 根據 SuperClaude 規則和原則驗證行動
- 識別與標準模式的偏差
- 在需要時提供修正指導
- 確保符合品質標準

**學習識別** 💡
- 從結果中提取見解
- 識別成功的模式以供重用
- 識別知識差距以進行改進
- 建議未來的優化策略

#### 分析標記

當內省模式啟用時，你會看到這些標記：

- 🧠 **推理分析** - 檢查邏輯流程和決策
- 🔄 **行動順序審查** - 分析工作流程有效性
- 🎯 **自我評估** - 元認知評估
- 📊 **模式識別** - 識別行為模式
- 🔍 **框架合規性** - 檢查規則遵守情況
- 💡 **回顧性見解** - 從結果中學習

#### 何時啟用內省

**通常在以下情況啟用**：
- 需要元認知監督的複雜多步驟問題
- 當結果與預期不符時的錯誤恢復
- 框架討論或 SuperClaude 疑難排解
- 重複行為的模式識別需求

**手動啟用**：
```bash
/sc:analyze complex-system/ --introspect
/sc:troubleshoot "framework confusion" --introspection
```

### Token 效率模式 ⚡

**這是什麼**：在保持品質的同時最大化資訊密度的智慧優化系統。

**使用時機**：大型操作、當情境接近極限時，或當你需要更快的執行速度時。

**運作方式**：基於情境和 Persona 感知的符號、縮寫和結構優化的自適應壓縮。

#### 壓縮策略

**五級自適應壓縮**：
1. **最小** (0-40% 使用率)：具有 Persona 優化清晰度的完整細節
2. **高效** (40-70% 使用率)：具有領域感知的平衡壓縮
3. **壓縮** (70-85% 使用率)：具有品質關卡的積極優化
4. **關鍵** (85-95% 使用率)：保留必要情境的最大壓縮
5. **緊急** (95%+ 使用率)：具有資訊驗證的超壓縮

#### 符號系統

**核心邏輯與流程**：
- `→` 導致、意味著 (`auth.js:45 → security risk`)
- `⇒` 轉換為 (`input ⇒ validated_output`)
- `&` 和、結合 (`security & performance`)
- `»` 順序、然後 (`build » test » deploy`)
- `∴` 因此 (`tests fail ∴ code broken`)

**狀態與進度**：
- ✅ 完成、通過
- ❌ 失敗、錯誤
- ⚠️ 警告
- 🔄 進行中
- 🎯 目標、目的

**技術領域**：
- ⚡ 效能
- 🔍 分析
- 🛡️ 安全
- 📦 部署
- 🎨 設計

#### 啟用策略

**通常在以下情況啟用**：
- 情境使用率 > 75% → 啟用壓縮
- 大規模操作 → 防止 token 溢出
- 複雜編排 → 優化溝通

**手動啟用**：
```bash
/sc:analyze huge-codebase/ --uc  # 超壓縮模式
/sc:improve legacy-system/ --uc --delegate auto  # 高效的大型操作
```

**效能目標** (仍在改進中！)：
- 目標：約 30-50% 的 token 減少
- 品質：試圖保留約 95% 的資訊
- 速度：通常 \<100ms 的壓縮決策
- 整合：與框架元件協同運作

#### 模式整合

三種模式通常會協同運作：

```bash
/sc:improve large-legacy-system/ --wave-mode auto --uc --introspect
```

**發生了什麼**：
- **任務管理**：建立具有進度追蹤的結構化改進計畫
- **Token 效率**：為大規模操作壓縮輸出
- **內省**：分析改進策略並驗證方法

---

## 編排器系統 🎯

編排器是 SuperClaude 的智慧路由系統，它會試圖分析你的請求，並協調工具、Persona 和整合的最佳組合。這就是希望讓 SuperClaude 感覺聰明和反應靈敏，而不僅僅是獨立工具的集合的原因。

### 編排器如何運作 🔄

**把它想像成一個聰明的調度員**，它會：
1. **分析**你的請求以了解意圖和複雜性
2. **路由**到指令、旗標、Persona 和 MCP 伺服器的最佳組合
3. **協調**執行以獲得最佳結果
4. **透過**品質關卡進行驗證以確保良好的結果
5. **優化**效能和資源使用

### 偵測引擎 🧠

偵測引擎透過多個視角分析每個請求：

#### 模式識別

**複雜度偵測**：
- **簡單**：單一檔案操作、基本任務 (&lt;3 步驟) → 直接執行
- **中等**：多檔案操作、分析任務 (3-10 步驟) → 標準路由
- **複雜**：全系統變更、架構決策 (&gt;10 步驟) → 進階編排

**領域識別**：
- **前端**：關鍵字如「UI」、「component」、「responsive」 → 🎨 frontend persona + Magic MCP
- **後端**：關鍵字如「API」、「database」、「service」 → ⚙️ backend persona + Context7 MCP
- **安全**：關鍵字如「vulnerability」、「auth」、「compliance」 → 🛡️ security persona + Sequential MCP
- **效能**：關鍵字如「slow」、「optimize」、「bottleneck」 → ⚡ performance persona + Playwright MCP

**操作類型分類**：
- **分析**：「analyze」、「review」、「understand」 → Sequential MCP + analyzer persona
- **建立**：「create」、「build」、「implement」 → Magic MCP (如果是 UI) 或 Context7 (模式)
- **修改**：「improve」、「refactor」、「optimize」 → 適當的專家 Persona
- **除錯**：「troubleshoot」、「fix」、「debug」 → Sequential MCP + analyzer persona

#### 自動啟用邏輯

**高信度觸發** (90%+ 啟用率)：
```bash
/sc:analyze auth-system/ --focus security
# → 🛡️ security persona + Sequential MCP + --validate 旗標
```

**基於情境的啟用**：
```bash
/sc:build react-components/
# → 🎨 frontend persona + Magic MCP + --c7 旗標 (React 文件)
```

**基於效能的啟用**：
```bash
# 當情境使用率 > 75%
/sc:analyze large-project/
# → 自動加入 --uc 旗標進行壓縮
```

### 路由智慧 🚦

路由系統使用動態決策樹將偵測到的模式對應到最佳的工具組合。

#### 主路由表

| 請求模式               | 通常自動啟用                              | 頻率       | 原因                |
| ---------------------- | ----------------------------------------- | ---------- | ------------------- |
| "analyze architecture" | 🏗️ architect + --ultrathink + Sequential   | 大多數時候 | 複雜的系統分析      |
| "create UI component"  | 🎨 frontend + Magic + --uc                 | 相當頻繁   | 帶有產生的前端領域  |
| "security audit"       | 🛡️ security + --ultrathink + Sequential    | 大多數時候 | 需要安全專業知識    |
| "debug complex issue"  | 🔍 analyzer + --think + Sequential         | 經常       | 調查方法論          |
| "improve performance"  | ⚡ performance + --think-hard + Playwright | 相當頻繁   | 效能專業知識 + 測試 |

#### 智慧協調

**多伺服器操作**：
```bash
/sc:design user-dashboard --type api
```
**編排器通常會協調**：
- 🏗️ architect persona (系統設計)
- 🎨 frontend persona (UI 設計)
- Context7 MCP (框架模式)
- Sequential MCP (設計方法論)

**備援策略**：
- Context7 不可用 → WebSearch 尋找文件 → 手動實作
- Sequential 超時 → 原生 Claude 分析 → 註明限制
- Magic 失敗 → 基本元件產生 → 建議手動增強

### 品質關卡與驗證框架 ✅

SuperClaude 試圖為操作實施一個 8 步驟的驗證週期：

#### 8 步驟品質流程

1. **語法驗證** - 語言解析器 + Context7 標準
2. **類型檢查** - Sequential 分析 + 相容性驗證
3. **程式碼風格檢查** - Context7 規則 + 品質分析
4. **安全審查** - Sequential 分析 + OWASP 合規性
5. **測試** - Playwright E2E + 覆蓋率分析 (目標是良好的覆蓋率)
6. **效能** - Sequential 分析 + 基準測試
7. **文件** - Context7 模式 + 完整性驗證
8. **整合** - Playwright 測試 + 部署驗證

#### 驗證自動化

**持續整合**：
- CI/CD 管線整合
- 具有早期失敗偵測的漸進式驗證
- 具有全面指標的證據產生

**智慧監控**：
- 使用機器學習預測的成功率追蹤
- 基於歷史模式的自適應驗證
- 自動優化驗證策略

### 效能優化 ⚡

編排器試圖透過幾種策略來優化效能：

#### 資源管理

**Token 分配**：
- 偵測引擎：1-2K tokens 用於模式分析
- 決策樹：500-1K tokens 用於路由邏輯
- MCP 協調：根據啟用的伺服器而變動
- 預備：10% 的緩衝區用於應對意外的複雜性

**操作批次處理**：
- **平行執行** 當沒有依賴關係時
- **情境共享** 於相關操作之間
- **快取策略** 用於成功的路由模式
- **智慧佇列** 以防止資源耗盡

#### 進階編排

**子代理人委派**：
```bash
# 當偵測到 >7 個目錄或 >50 個檔案時自動啟用
/sc:analyze monorepo/
# → --delegate auto 旗標 + 平行處理
```

**Wave 編排**：
```bash
# 當複雜度 >0.7 + 檔案 >20 + 操作類型 >2 時自動啟用
/sc:improve legacy-system/
# → --wave-mode auto + 多階段執行
```

### 真實世界編排範例 💡

#### 範例 1：安全分析請求
```bash
/sc:analyze user-auth/ --focus security
```

**編排器分析**：
- 領域：安全 (高信度)
- 複雜度：中等 (驗證系統)
- 操作：分析 + 掃描

**通常會協調**：
- 🛡️ security persona (威脅模型觀點)
- Sequential MCP (系統性分析)
- --validate 旗標 (操作前安全檢查)
- --think 旗標 (複雜的安全模式)

**品質關卡**：所有 8 個步驟，重點是安全驗證

#### 範例 2：前端效能優化
```bash
/sc:improve slow-dashboard/ --focus performance
```

**編排器分析**：
- 領域：前端 + 效能 (需要雙重專業知識)
- 複雜度：高 (效能優化)
- 操作：改進 + 驗證

**通常會協調**：
- ⚡ performance persona (主要)
- 🎨 frontend persona (次要，如果偵測到 UI)
- Playwright MCP (效能測試)
- --think-hard 旗標 (複雜的優化)

**品質關卡**：以效能為重點的驗證與基準測試

#### 範例 3：大型程式碼庫分析
```bash
/sc:analyze enterprise-monorepo/
```

**編排器分析**：
- 範圍：大 (>50 個檔案偵測到)
- 複雜度：高 (企業級)
- 資源：預測高 token 使用量

**通常會協調**：
- --delegate auto 旗標 (平行處理)
- --uc 旗標 (token 優化)
- 🏗️ architect persona (系統級分析)
- Sequential MCP (結構化分析)

**品質關卡**：跨子代理人的分散式驗證

### 編排器設定 ⚙️

**效能設定**：
```yaml
orchestrator_config:
  enable_caching: true
  parallel_operations: true
  max_parallel: 3
  token_reserve: 10%
  emergency_threshold: 90%
```

**智慧設定**：
```yaml
  learning_enabled: true
  confidence_threshold: 0.7
  pattern_detection: aggressive
  wave_score_threshold: 0.7
```

編排器會試圖從成功的模式中學習，並根據結果改進未來的路由決策。

---

## 規則與原則 📏

SuperClaude 根據核心規則和原則運作，以確保一致、可靠和有幫助的行為。了解這些有助於你預測 SuperClaude 將如何處理問題，以及為什麼它會做出某些決定。

### 核心操作規則 ⚖️

這些是 SuperClaude 試圖遵循的核心規則：

#### 檔案操作安全 🔐
- **寫入/編輯前務必讀取** - SuperClaude 在不了解當前內容的情況下絕不修改檔案
- **僅使用絕對路徑** - 防止路徑遍歷攻擊並確保可靠的檔案操作
- **絕不自動提交** - 除非明確要求，否則 SuperClaude 不會將變更提交到 git
- **偏好批次操作** - 將多個相關變更分組以保持一致性

**> ⚠️ 注意**：這些規則可防止資料遺失、安全漏洞和對程式碼庫的意外修改。

#### 任務管理規則 📋
- **基於證據的進度** - 只有在有可衡量的證據時，任務才會被標記為完成
- **單一焦點協定** - 為求清晰，一次只有一個任務處於「進行中」狀態
- **品質關卡** - 所有操作在完成前都包含驗證步驟
- **情境保留** - 試圖在操作之間良好地保留情境

**> ⚠️ 注意**：確保可靠的進度追蹤，並防止工作遺失或被遺忘。

#### 框架合規性規則 🎯
- **先檢查依賴關係** - 在使用函式庫之前，務必驗證 package.json/requirements.txt
- **遵循現有模式** - 尊重專案慣例、匯入風格和架構
- **系統性的程式碼庫變更** - 在進行全專案修改之前完成探索
- **驗證完成** - 驗證變更是否有效且未破壞現有功能

**> ⚠️ 注意**：維持程式碼品質並與你現有的專案結構保持一致。

### 開發原則 🛠️

這些原則指導 SuperClaude 如何處理開發問題：

#### 基於證據的決策 📊
**主要指令**：「證據 > 假設 | 程式碼 > 文件 | 效率 > 冗長」

- **優化前先測量** - 基於實際指標的效能改進
- **系統性地測試假設** - 由可驗證資料支持的主張
- **記錄決策理據** - 清晰的架構選擇理由
- **從結果中學習** - 基於結果的持續改進

**實務上**：
```bash
/sc:improve slow-api/ --focus performance
# → 測量當前效能，識別瓶頸，並根據資料進行優化
```

#### SOLID 設計原則 🏗️
- **單一職責** - 每個元件只有一個變更的理由
- **開放/封閉** - 對擴展開放，對修改封閉
- **里氏替換** - 衍生類別可替換其基礎類別
- **介面隔離** - 不強制依賴未使用的介面
- **依賴反轉** - 依賴抽象，而非具體實作

**> ⚠️ 注意**：SuperClaude 遵循這些原則，可以產生可維護、可擴展且靈活的程式碼，更容易理解和修改。

#### 品質哲學 ✨
- **預防勝於偵測** - 將品質內建，而非事後測試
- **簡單勝於複雜** - 選擇能運作的最簡單解決方案
- **可維護性勝於技巧性** - 程式碼應易於理解和修改
- **預設安全** - 從一開始就實施安全模式

#### 資深開發者心態 🎓
SuperClaude 像經驗豐富的開發者一樣處理問題：

- **系統性思維** - 考慮對整個系統的影響
- **長遠眼光** - 從多個時間維度評估決策
- **風險校準** - 區分可接受和不可接受的風險
- **利害關係人意識** - 平衡技術完美與實際限制

### 規則與原則如何影響你 💡

#### 可預測的行為
因為 SuperClaude 遵循一致的規則，你可以預測它將如何處理問題：

```bash
/sc:improve legacy-authentication/
```
**你可以預期**：
- 在建議變更前讀取現有程式碼
- 遵循你專案的現有模式
- 安全優先的方法 (安全 Persona 可能會啟用)
- 帶有理由的基於證據的建議
- 在標記改進完成前的品質關卡

#### 品質保證
這些原則確保高品質的結果：

- **試圖避免神奇的變更** - SuperClaude 通常會解釋其理由
- **目標是無破壞性變更** - 試圖保留現有功能
- **具有安全意識** - 安全原則很重要
- **具有技術債意識** - 試圖維持或降低複雜性

#### 透明度
你通常應該了解 SuperClaude 在做什麼以及為什麼：

```bash
/sc:analyze --introspect complex-system/
```
**向你展示**：
- 決策過程
- 規則應用
- 原則遵守情況
- 考慮過的替代方法

### 規則與原則實例 🎯

#### 範例 1：系統性重構
**請求**：「清理這個混亂的程式碼庫」

**應用的規則**：
- 變更前完成探索 (搜尋整個程式碼庫)
- 修改前讀取所有檔案
- 遵循現有專案模式
- 用證據驗證完成

**應用的原則**：
- 簡單勝於複雜 (減少不必要的複雜性)
- 基於證據的決策 (測量變更前後的複雜性)
- 品質保證 (全面測試)
- 長期可維護性 (考慮未來的修改)

#### 範例 2：安全性實作
**請求**：「為我們的 API 新增驗證功能」

**應用的規則**：
- 安全 Persona 通常會自動啟用
- 絕不在安全基礎上妥協
- 先檢查現有模式
- 品質關卡包含安全驗證

**應用的原則**：
- 預設安全 (實施安全模式)
- 深度防禦 (多層安全防護)
- 基於證據的方法 (遵循已建立的安全模式)
- 系統性思維 (考慮對整個應用程式的影響)

#### 範例 3：效能優化
**請求**：「這個頁面載入很慢」

**應用的規則**：
- 優化前先測量
- 基於證據的進度追蹤
- 用指標驗證改進
- 維持現有功能

**應用的原則**：
- 以測量為驅動的優化
- 專注於使用者體驗
- 系統化的方法論
- 預防勝於偵測 (識別根本原因)

### 規則執行與品質關卡 🚨

SuperClaude 透過其品質關卡系統執行規則：

#### 執行方法
- **操作前驗證** - 開始前檢查風險
- **即時監控** - 執行期間追蹤規則遵守情況
- **操作後驗證** - 確認規則已遵守
- **證據收集** - 記錄遵守情況以求透明

#### 當規則受到挑戰時
有時規則似乎與當前需求衝突：

**範例**：「只要讓它快點運作，不用擔心品質」

**SuperClaude 的回應**：
- 承認其急迫性
- 解釋為什麼品質規則對長期成功很重要
- 提供維持基本規則的折衷方案
- 如果放寬品質標準，則記錄風險

### 指導 Persona 行為的原則 🎭

每個 Persona 都遵循核心原則，但強調不同方面：

- **🛡️ Security persona**：安全性 > 合規性 > 可靠性 > 效能
- **⚡ Performance persona**：先測量 > 優化關鍵路徑 > 使用者體驗
- **🏗️ Architect persona**：長期可維護性 > 可擴展性 > 效能
- **🎨 Frontend persona**：使用者需求 > 無障礙 > 效能 > 技術優雅

**> ⚠️ 注意**：你可以根據不同 Persona 的核心原則來預測它們將如何權衡取捨。

### 活的原則 🌱

這些規則和原則並非一成不變。它們會根據以下因素演變：

- **社群回饋** - 真實世界的使用模式為改進提供資訊
- **結果分析** - 成功的模式會被強化
- **技術變革** - 原則適應新的開發實踐
- **使用者需求** - 規則在靈活性與一致性之間取得平衡

目標是在適應軟體開發不斷變化的格局的同時，維持有幫助、可預測的行為。

---

## 入門工作流程 🛣️

現在你了解了 SuperClaude 的元件，讓我們來看看不同開發情境的實用工作流程。這些模式將幫助你快速上手。

### 首次設定 🎬

如果你還沒安裝 SuperClaude，請參閱[安裝指南](installation-guide.md)。安裝後，可以這樣開始：

#### 快速驗證
```bash
# 測試基本功能
/sc:help                    # 應該會顯示 SuperClaude 指令
/sc:analyze README.md       # 嘗試分析一個簡單的檔案
/sc:build --help           # 檢查指令選項
```

#### 理解自動啟用
試試這些指令，看看 SuperClaude 如何自動選擇合適的工具：

```bash
# 前端工作 → frontend persona + Magic MCP
/sc:build src/components/

# 安全分析 → security persona + Sequential MCP
/sc:analyze auth/ --focus security

# 效能調查 → performance persona + Playwright MCP
/sc:analyze --focus performance slow-endpoints/
```

注意輸出中自動啟用的旗標和 Persona。這顯示了 SuperClaude 的智慧路由正在運作。

### 開發工作流程模式 🔄

#### 新專案上手
在開始一個不熟悉的專案時：

```bash
# 1. 載入專案情境
/sc:load --deep --summary
# → 提供結構、依賴關係、模式的概覽

# 2. 分析架構
/sc:analyze --focus architecture
# → 🏗️ architect persona 提供系統理解

# 3. 檢查程式碼品質
/sc:analyze --focus quality
# → 🧪 qa persona 識別潛在問題

# 4. 審查文件
/sc:document README --type guide
# → ✍️ scribe persona 改進專案文件
```

#### 功能開發週期
開發新功能時：

```bash
# 1. 設計階段
/sc:design user-dashboard --type component
# → 🏗️ architect + 🎨 frontend personas 協調

# 2. 實作
/sc:build dashboard-components/
# → 🎨 frontend persona + Magic MCP 用於 UI 產生

# 3. 測試
/sc:test --type e2e dashboard/
# → 🧪 qa persona + Playwright MCP 用於測試

# 4. 文件
/sc:document dashboard/ --type api
# → ✍️ scribe persona 建立全面的文件
```

#### 錯誤調查與解決
進行系統性除錯時：

```bash
# 1. 問題調查
/sc:troubleshoot "login randomly fails" --think
# → 🔍 analyzer persona + Sequential MCP 提供方法論

# 2. 根本原因分析
/sc:analyze auth-flow/ --focus debugging
# → 帶有證據收集的系統性調查

# 3. 修復實作
/sc:improve auth/ --safe-mode --validate
# → 帶有驗證的安全改進

# 4. 驗證測試
/sc:test auth-flow/ --coverage
# → 全面測試以確保修復有效
```

#### 程式碼品質改進
改進現有程式碼時：

```bash
# 1. 品質評估
/sc:analyze legacy-code/ --focus quality
# → 🔄 refactorer persona 識別改進機會

# 2. 安全改進
/sc:improve --preview legacy-code/
# → 在套用前查看將會變更的內容

# 3. 套用改進
/sc:improve --safe legacy-code/
# → 僅套用低風險的改進

# 4. 驗證變更
/sc:test --coverage improved-code/
# → 確保改進不會破壞功能
```

### 常見工作流程組合 🤝

#### 安全優先開發
```bash
# 以安全為重點的開發
/sc:analyze --persona-security --focus security
/sc:build --validate --safe-mode
/sc:test --type security
/sc:git --persona-security --validate
```

#### 效能優化工作流程
```bash
# 以效能為重點的開發
/sc:analyze --focus performance --persona-performance
/sc:improve --type performance --benchmark
/sc:test --focus performance --play
```

#### 團隊協作工作流程
```bash
# 協作開發模式
/sc:analyze team-code/ --persona-qa --focus quality
/sc:document features/ --persona-scribe --type guide
/sc:git --smart-commit --branch-strategy
/sc:task status  # 檢查團隊進度
```

### 進階工作流程模式 🚀

#### 大型程式碼庫管理
處理企業級專案時：

```bash
# 高效率的大規模分析
/sc:analyze monorepo/ --delegate auto --uc --focus architecture
# → 平行處理 + 壓縮 + 架構焦點

# 系統性改進
/sc:improve legacy-system/ --wave-mode auto --safe-mode
# → 帶有安全檢查的多階段改進

# 全面品質審查
/sc:analyze enterprise-app/ --delegate folders --focus quality
# → 分散式品質分析
```

#### 舊系統現代化
更新舊程式碼庫時：

```bash
# 評估階段
/sc:analyze legacy/ --persona-architect --ultrathink
# → 深度架構分析

# 規劃階段
/sc:design modernization-strategy --type architecture
# → 全面的現代化計畫

# 實作階段
/sc:improve legacy/ --wave-mode systematic --safe-mode --loop
# → 帶有驗證的迭代、安全改進

# 遷移支援
/sc:migrate --type framework legacy-to-modern/
# → 框架遷移協助
```

#### 多領域專案
處理跨越多個技術領域的專案時：

```bash
# 跨領域協調
/sc:analyze fullstack-app/ --all-mcp --delegate auto
# → 所有 MCP 伺服器 + 平行處理

# 特定領域的改進
/sc:improve frontend/ --persona-frontend --magic
/sc:improve backend/ --persona-backend --c7
/sc:improve infrastructure/ --persona-devops --seq

# 整合驗證
/sc:test --type integration --play
# → 全面的整合測試
```

### 工作流程優化技巧 💡

#### 從小處著手，逐步擴大
```bash
# 從集中的範圍開始
/sc:analyze single-component.js --focus quality

# 根據需要擴大
/sc:analyze entire-module/ --focus quality --delegate files

# 擴展到整個系統
/sc:analyze whole-project/ --delegate auto --uc
```

#### 使用漸進式增強
```bash
# 基本指令
/sc:build project/

# 新增智慧
/sc:build project/ --think --c7

# 完整編排
/sc:build project/ --wave-mode auto --all-mcp --delegate auto
```

#### 結合互補的 Persona
```bash
# 安全 + 效能分析
/sc:analyze api/ --persona-security
/sc:analyze api/ --persona-performance

# 架構 + 品質審查
/sc:review system/ --persona-architect --focus architecture
/sc:review system/ --persona-qa --focus quality
```

### 疑難排解工作流程 🚨

#### 當指令未如預期運作時
```bash
# 使用內省進行除錯
/sc:troubleshoot "command issues" --introspect
# → 對出錯原因進行元認知分析

# 嘗試不同方法
/sc:analyze problem/ --persona-analyzer --seq
# → 系統性調查方法論

# 檢查框架狀態
/sc:load framework-status/ --summary
# → 理解當前的 SuperClaude 狀態
```

#### 當效能緩慢時
```bash
# 為速度進行優化
/sc:analyze large-project/ --no-mcp --uc --scope module
# → 停用額外功能、壓縮輸出、限制範圍

# 對大型任務使用委派
/sc:improve huge-codebase/ --delegate auto --concurrency 5
# → 帶有受控並行性的平行處理
```

#### 當結果不夠集中時
```bash
# 使用特定的焦點旗標
/sc:analyze code/ --focus security --scope file

# 手動啟用適當的 Persona
/sc:analyze frontend-code/ --persona-security  # 從安全角度看前端

# 結合多種方法
/sc:analyze --focus performance --persona-performance --play
```

### 建立你自己的工作流程 🛠️

#### 識別你的常見模式
追蹤哪些組合對你的特定需求效果良好：

```bash
# 以安全為重點的 API 開發
alias secure-api="/build api/ --persona-security --validate --c7"

# 效能優化的前端工作
alias perf-frontend="/build ui/ --persona-performance --magic --benchmark"

# 品質改進工作流程
alias quality-check="/scan --focus quality && /improve --safe-mode && /test --coverage"
```

#### 實驗旗標組合
嘗試不同的組合，找出最適合的：

```bash
# 用於學習：帶有文件的詳細解釋
/sc:explain concept --persona-mentor --verbose --c7

# 用於安全：最大程度的驗證和檢查
/sc:improve critical-code/ --safe-mode --validate --preview

# 用於效率：帶有平行處理的壓縮輸出
/sc:analyze big-project/ --uc --delegate auto --concurrency 3
```

記住：SuperClaude 會從成功的模式中學習，所以你越常使用有效的組合，它就越能為你的需求自動啟用正確的方法。

---

## 整合與協調 🤝

了解 SuperClaude 的元件如何協同運作是有效使用該框架的關鍵。本節將向你展示指令、旗標、Persona 和 MCP 伺服器如何自動協調 - 以及在需要時如何控制這種協調。

### 自動協調範例 🤖

SuperClaude 會根據情境自動協調元件。以下是它在實務中的運作方式：

#### 前端開發請求
```bash
/sc:build react-dashboard/
```

**自動協調**：
- **指令**：`/build` 處理編譯和打包
- **Persona**：🎨 frontend 自動啟用 (偵測到 React)
- **MCP**：Magic 提供現代 UI 元件
- **MCP**：Context7 提供 React 最佳實踐
- **旗標**：`--c7` 自動啟用以取得框架文件

**結果**：經過 React 優化的建置，具有現代元件、無障礙檢查和效能優化。

#### 安全分析請求
```bash
/sc:scan user-authentication/ --focus security
```

**自動協調**：
- **指令**：`/scan` 處理安全掃描
- **Persona**：🛡️ security 自動啟用 (安全焦點)
- **MCP**：Sequential 提供系統性分析
- **旗標**：`--validate` 自動啟用 (高風險操作)
- **旗標**：`--think` 自動啟用 (複雜的安全模式)

**結果**：全面的安全分析，具有威脅模型、漏洞偵測和合規性檢查。

#### 效能調查
```bash
/sc:troubleshoot "API responses are slow"
```

**自動協調**：
- **指令**：`/troubleshoot` 處理調查
- **Persona**：⚡ performance 自動啟用 (效能關鍵字)
- **Persona**：🔍 analyzer 提供調查方法論
- **MCP**：Sequential 建構除錯流程
- **MCP**：Playwright 提供效能測試
- **旗標**：`--think` 自動啟用 (複雜除錯)

**結果**：具有指標、瓶頸識別和優化建議的系統性效能調查。

### 手動協調控制 🎛️

有時你希望為特定需求覆蓋自動協調：

#### 覆蓋 Persona 選擇
```bash
# 從安全角度查看前端程式碼
/sc:analyze react-components/ --persona-security
# → UI 元件的安全分析 (XSS、資料洩漏等)

# 將架構思維應用於小型工具
/sc:improve utility-function.js --persona-architect
# → 簡單程式碼的設計模式和擴展性
```

#### 控制 MCP 伺服器使用
```bash
# 為速度停用所有 MCP 伺服器
/sc:analyze large-codebase/ --no-mcp
# → 40-60% 更快的執行速度，僅使用原生工具

# 為全面分析啟用所有 MCP 伺服器
/sc:analyze complex-system/ --all-mcp
# → 最大能力，更高的 token 使用量

# 使用特定的 MCP 組合
/sc:build ui-components/ --magic --c7 --no-seq
# → UI 產生 + 文件，跳過複雜分析
```

#### 結合多種觀點
```bash
# 使用不同 Persona 進行順序分析
/sc:analyze payment-system/ --persona-security     # 安全觀點
/sc:analyze payment-system/ --persona-performance  # 效能觀點
/sc:analyze payment-system/ --persona-architect    # 架構觀點

# 或自動協調
/sc:review payment-system/ --focus quality
# → 自動協調安全 + 效能 + 架構的見解
```

### 旗標協調模式 🏁

旗標協同運作以建立強大的組合：

#### 安全優先模式
```bash
# 對關鍵程式碼的最大安全性
/sc:improve production-auth/ --safe-mode --validate --preview
# → 保守變更 + 風險評估 + 套用前預覽

# 安全地探索大型變更
/sc:improve legacy-system/ --wave-mode auto --safe-mode --validate
# → 多階段改進 + 安全檢查 + 驗證關卡
```

#### 效能優化模式
```bash
# 大型操作的快速執行
/sc:analyze huge-project/ --uc --no-mcp --scope module
# → 壓縮輸出 + 原生工具 + 有限範圍

# 高效的平行處理
/sc:improve monorepo/ --delegate auto --uc --concurrency 5
# → 平行處理 + 壓縮 + 受控資源使用
```

#### 學習導向模式
```bash
# 具有完整情境的教育性解釋
/sc:explain complex-concept --persona-mentor --verbose --c7
# → 教育方法 + 詳細解釋 + 官方文件

# 具有透明度的深度理解
/sc:analyze mysterious-code/ --persona-analyzer --think-hard --introspect
# → 調查方法論 + 深度分析 + 思維透明度
```

### MCP 伺服器協調 🔧

MCP 伺服器通常會自動協同運作：

#### 文件 + 分析
```bash
/sc:improve old-react-code/
```
**MCP 協調**：
- Context7：獲取當前的 React 最佳實踐
- Sequential：根據現代模式分析程式碼
- Magic：建議現代元件模式
- 結果：符合當前標準的現代化

#### 測試 + 效能
```bash
/sc:test dashboard/ --focus performance
```
**MCP 協調**：
- Sequential：規劃全面的測試策略
- Playwright：執行效能測試
- Context7：提供測試最佳實踐
- 結果：符合行業標準的效能測試

#### 複雜問題解決
```bash
/sc:troubleshoot "complex multi-service issue" --ultrathink
```
**MCP 協調**：
- Sequential：建構系統性調查
- Context7：提供服務架構模式
- Playwright：測試服務互動
- 結果：全面的多領域除錯

### Persona 協作模式 🎭

Persona 會在複雜請求上自動協作：

#### 架構 + 安全
```bash
/sc:design payment-api --type secure
```
**Persona 協作**：
- 🏗️ architect：系統設計與可擴展性
- 🛡️ security：威脅模型與安全模式
- ⚙️ backend：API 實作模式
- 結果：安全、可擴展的 API 設計

#### 前端 + 效能
```bash
/sc:build dashboard --focus performance
```
**Persona 協作**：
- 🎨 frontend：UI/UX 與無障礙
- ⚡ performance：優化與指標
- 🏗️ architect：元件架構
- 結果：快速、無障礙、結構良好的儀表板

#### 品質 + 重構
```bash
/sc:improve legacy-code/ --focus quality
```
**Persona 協作**：
- 🔄 refactorer：程式碼品質與模式
- 🧪 qa：測試與驗證
- 🏗️ architect：結構性改進
- 結果：乾淨、經過測試、架構良好的程式碼

### 進階協調策略 🚀

#### Wave 編排
用於複雜的多階段操作：

```bash
/sc:improve enterprise-system/ --wave-mode systematic
```

**Wave 協調**：
1. **分析 Wave**：🔍 analyzer + Sequential 評估當前狀態
2. **規劃 Wave**：🏗️ architect + Context7 設計改進
3. **實作 Wave**：適當的專家 + 工具實作變更
4. **驗證 Wave**：🧪 qa + Playwright 驗證改進
5. **優化 Wave**：⚡ performance + 指標優化結果

#### 子代理人委派
用於平行處理：

```bash
/sc:analyze large-monorepo/ --delegate folders
```

**委派協調**：
- **主代理人**：編排並綜合結果
- **子代理人**：對個別資料夾進行專業分析
- **協調**：將結果與領域專業知識結合
- **MCP 整合**：在所有代理人之間共享

#### 自適應智慧
SuperClaude 根據情境調整協調：

**開發階段偵測**：
- 規劃階段 → 🏗️ architect + ✍️ scribe 強調
- 實作階段 → 領域專家 + Magic/Context7
- 測試階段 → 🧪 qa + Playwright 強調
- 部署階段 → 🚀 devops + 驗證強調

**基於複雜度的擴展**：
- 簡單任務 → 直接執行
- 中等複雜度 → Persona + MCP 協調
- 高複雜度 → Wave 編排 + 委派

### 協調疑難排解 🔧

#### 當自動協調出錯時
```bash
# 太多工具被啟用 (慢/昂貴)
/sc:analyze simple-file.js --no-mcp --answer-only
# → 簡單任務的最小化工具

# 啟用了錯誤的 Persona
/sc:analyze backend-api/ --persona-security
# → 使用明確的 Persona 選擇進行覆蓋

# 分析深度不足
/sc:troubleshoot complex-issue --ultrathink --all-mcp
# → 強制最大能力
```

#### 優化協調
```bash
# 從簡單開始，根據需要增加複雜性
/sc:analyze code.js                    # 基本分析
/sc:analyze code.js --think            # 新增思考
/sc:analyze code.js --think --c7       # 新增文件
/sc:analyze code.js --think --c7 --seq # 新增系統性分析
```

#### 理解協調決策
```bash
# 查看為什麼選擇了某些工具
/sc:analyze complex-system/ --introspect
# → 顯示決策過程和工具選擇理由
```

### 整合最佳實踐 💡

#### 先讓自動協調運作
- 相信 SuperClaude 的自動工具選擇
- 只有在需要特定觀點時才覆蓋
- 從簡單的指令開始，根據需要新增旗標

#### 理解旗標互動
- 某些旗標會覆蓋其他旗標 (`--no-mcp` 覆蓋 `--c7`, `--seq`)
- 安全旗標優先於優化旗標
- Persona 旗標可被更具體的 Persona 請求覆蓋

#### 使用適當的範圍
- 檔案級：單一 Persona + 最小 MCP
- 模組級：領域 Persona + 相關 MCP
- 系統級：多個 Persona + 完整 MCP 協調

#### 監控資源使用
- 大型操作 → 使用 `--uc` 和 `--delegate`
- 簡單任務 → 使用 `--no-mcp` 和 `--answer-only`
- 關鍵操作 → 使用 `--safe-mode` 和 `--validate`

關鍵在於理解 SuperClaude 的智慧來自其元件之間的協調。自動協調在大多數時候運作良好，但知道如何控制它能讓你靈活應對任何情況。

---

## 實用範例 💡

真實世界的情境，展示 SuperClaude 的實際運作。這些範例展示了不同元件如何協同解決常見的開發問題。

### 情境 1：新團隊成員上手 👋

**情況**：你剛開始接觸一個不熟悉的 React/Node.js 電子商務專案。

#### 步驟 1：專案理解
```bash
/sc:load --deep --summary
```
**發生了什麼**：
- 🔍 analyzer persona 啟用 (需要調查)
- Sequential MCP 建構分析
- Context7 MCP 識別框架模式
- 建立全面的專案概覽

**輸出**：專案結構、技術棧、依賴關係和架構摘要。

#### 步驟 2：程式碼品質評估
```bash
/sc:analyze --focus quality
```
**自動協調**：
- 🧪 qa persona 啟用 (品質焦點)
- Sequential MCP 提供系統性分析
- 掃描程式碼品質、安全性和效能問題
- 產生可行的改進建議

**輸出**：包含具體問題和改進建議的品質報告。

#### 步驟 3：架構理解
```bash
/sc:analyze --focus architecture --persona-architect
```
**發生了什麼**：
- 🏗️ architect persona 提供系統設計觀點
- Context7 MCP 引入 React/Node.js 架構模式
- Sequential MCP 建構架構分析
- 識別設計模式、資料流程和元件關係

**輸出**：包含設計模式和系統關係的架構概覽。

#### 步驟 4：入門指南
```bash
/sc:document onboarding --type guide --persona-scribe
```
**發生了什麼**：
- ✍️ scribe persona 建立專業文件
- Context7 MCP 提供文件標準
- 將先前的分析綜合為對新人友善的指南
- 包含設定說明和關鍵概念

**輸出**：全面的上手指南，供未來團隊成員使用。

**節省時間**：通常需要 2-3 天的探索，現在濃縮為約 30 分鐘的全面理解。

### 情境 2：安全漏洞調查 🛡️

**情況**：安全掃描器標記出使用者驗證系統中的潛在問題。

#### 步驟 1：以安全為重點的分析
```bash
/sc:scan auth-system/ --persona-security --focus security
```
**自動協調**：
- 🛡️ security persona 啟用 (安全專業知識)
- Sequential MCP 提供系統性威脅模型
- Context7 MCP 引入 OWASP 和安全最佳實踐
- `--validate` 旗標自動啟用 (高風險操作)

**輸出**：詳細的安全分析，包含威脅評估和漏洞優先級排序。

#### 步驟 2：根本原因調查
```bash
/sc:troubleshoot "JWT token exposure in logs" --think --seq
```
**發生了什麼**：
- 🔍 analyzer persona 提供調查方法論
- `--think` 旗標啟用深度分析
- Sequential MCP 建構除錯流程
- 追蹤資料流程並識別洩漏點

**輸出**：根本原因分析，包含證據鏈和影響評估。

#### 步驟 3：安全實作
```bash
/sc:improve auth-system/ --focus security --safe-mode --validate
```
**自動協調**：
- 🛡️ security persona 維持安全焦點
- `--safe-mode` 確保保守變更
- `--validate` 在套用前確認變更
- Context7 MCP 提供安全編碼模式

**輸出**：風險最小且經過全面驗證的安全改進。

#### 步驟 4：安全測試
```bash
/sc:test auth-system/ --type security --play
```
**發生了什麼**：
- 🧪 qa persona 提供測試專業知識
- Playwright MCP 執行安全測試情境
- 測試驗證流程、會話管理和存取控制
- 驗證安全改進是否有效

**輸出**：全面的安全測試結果，附有改進證據。

**風險降低**：系統性方法降低了遺漏安全問題的機會，並確保全面覆蓋。

### 情境 3：效能優化衝刺 ⚡

**情況**：電子商務儀表板載入緩慢，影響使用者體驗。

#### 步驟 1：效能分析
```bash
/sc:analyze dashboard/ --focus performance --persona-performance
```
**自動協調**：
- ⚡ performance persona 啟用 (效能專業知識)
- Playwright MCP 提供效能指標和測試
- Context7 MCP 引入 React 效能最佳實踐
- `--think-hard` 自動啟用 (複雜的效能分析)

**輸出**：效能瓶頸識別，包含指標和優先的優化機會。

#### 步驟 2：前端效能深度剖析
```bash
/sc:analyze frontend/ --persona-frontend --focus performance --play
```
**發生了什麼**：
- 🎨 frontend persona 提供 UI/UX 觀點
- ⚡ performance persona 協調 (雙重專業知識)
- Playwright MCP 測量 Core Web Vitals、套件大小、渲染時間
- Magic MCP 建議現代優化模式

**輸出**：前端特定的效能分析，包含無障礙和使用者體驗考量。

#### 步驟 3：後端 API 效能
```bash
/sc:analyze api/ --persona-backend --focus performance
```
**自動協調**：
- ⚙️ backend persona 提供伺服器端專業知識
- Sequential MCP 分析資料庫查詢和 API 模式
- Context7 MCP 提供 Node.js/Express 優化模式
- 識別緩慢的查詢、低效的端點和快取機會

**輸出**：後端效能分析，包含資料庫和 API 優化建議。

#### 步驟 4：系統性優化
```bash
/sc:improve dashboard/ --focus performance --loop --iterations 3
```
**發生了什麼**：
- ⚡ performance persona 主導優化
- `--loop` 啟用迭代改進
- 每個迭代：優化 → 測量 → 驗證 → 改進
- 具有指標驗證的漸進式增強

**輸出**：每個週期後具有可衡量結果的迭代效能改進。

#### 步驟 5：效能測試驗證
```bash
/sc:test dashboard/ --focus performance --play --benchmark
```
**發生了什麼**：
- Playwright MCP 執行全面的效能測試
- 在多種裝置、網路條件和瀏覽器上進行測試
- 測量 Core Web Vitals、載入時間和使用者互動指標
- 驗證改進是否符合效能預算

**輸出**：證明優化有效性的效能測試結果。

**效能提升**：系統性方法通常能實現 40-70% 的效能改進，並附有可衡量的驗證。

### 情境 4：舊程式碼現代化 🔄

**情況**：一個 5 年前的 React 應用程式需要現代化以符合當前標準。

#### 步驟 1：舊系統評估
```bash
/sc:analyze legacy-app/ --persona-architect --ultrathink
```
**自動協調**：
- 🏗️ architect persona 提供結構分析
- `--ultrathink` 啟用最大分析深度
- Context7 MCP 與當前的 React 模式進行比較
- Sequential MCP 提供系統性的現代化評估

**輸出**：全面的舊系統分析，包含現代化藍圖和風險評估。

#### 步驟 2：現代化規劃
```bash
/sc:design modernization-strategy --type architecture --persona-architect
```
**發生了什麼**：
- 🏗️ architect persona 設計遷移策略
- Context7 MCP 提供當前的 React 生態系統模式
- Sequential MCP 建構現代化計畫
- 識別遷移階段、依賴關係和風險

**輸出**：詳細的現代化計畫，包含分階段方法和風險緩解。

#### 步驟 3：安全的增量改進
```bash
/sc:improve legacy-components/ --safe-mode --wave-mode systematic --loop
```
**自動協調**：
- 🔄 refactorer persona 主導程式碼改進
- `--safe-mode` 確保最小風險
- `--wave-mode systematic` 啟用多階段改進
- `--loop` 允許迭代精煉
- 多個 Persona 協調：architect, frontend, qa

**輸出**：具有安全檢查和漸進式增強的系統性現代化。

#### 步驟 4：測試現代化
```bash
/sc:test modernized-app/ --type integration --coverage --play
```
**發生了什麼**：
- 🧪 qa persona 確保整個現代化過程的品質
- Playwright MCP 提供全面的測試
- 測試舊系統相容性和新功能
- 驗證現代化不會破壞現有功能

**輸出**：證明現代化成功的全面測試結果。

**現代化成功**：系統性方法將現代化風險降低 80%，並確保相容性。

### 情境 5：多團隊 API 設計 🌐

**情況**：設計一個將由多個團隊使用的新微服務 API。

#### 步驟 1：需求分析
```bash
/sc:design user-service-api --type api --persona-backend
```
**自動協調**：
- ⚙️ backend persona 提供 API 設計專業知識
- 🏗️ architect persona 為系統整合進行協調
- Context7 MCP 提供 API 設計最佳實踐
- Sequential MCP 建構需求分析

**輸出**：全面的 API 設計，包含端點、資料模型和整合模式。

#### 步驟 2：安全審查
```bash
/sc:review api-design/ --persona-security --focus security
```
**發生了什麼**：
- 🛡️ security persona 評估 API 安全性
- 審查驗證、授權和資料保護
- Context7 MCP 提供 OWASP API 安全指南
- 識別安全要求和威脅向量

**輸出**：安全評估，包含強化建議和合規性要求。

#### 步驟 3：效能考量
```bash
/sc:analyze api-design/ --persona-performance --focus performance
```
**自動協調**：
- ⚡ performance persona 評估可擴展性
- 分析端點效能、快取策略、速率限制
- Context7 MCP 提供高效能 API 模式
- 預測負載下的效能

**輸出**：效能分析，包含可擴展性建議和優化策略。

#### 步驟 4：為多個團隊撰寫文件
```bash
/sc:document api/ --type api --persona-scribe --detailed
```
**發生了什麼**：
- ✍️ scribe persona 建立專業的 API 文件
- Context7 MCP 提供 API 文件標準
- 建立範例、整合指南和疑難排解
- 為多個使用團隊量身訂做

**輸出**：全面的 API 文件，包含範例、整合指南和最佳實踐。

#### 步驟 5：實作驗證
```bash
/sc:build api-implementation/ --validate --test-coverage
```
**自動協調**：
- ⚙️ backend persona 實作 API 模式
- 🧪 qa persona 確保品質和測試
- Sequential MCP 根據設計驗證實作
- 全面的測試和驗證

**輸出**：經過全面測試和驗證的生產就緒 API 實作。

**協作效率**：多 Persona 協調將設計迭代週期減少 60%，並改善跨團隊的協調。

### 常見模式識別 🔍

這些範例顯示了 SuperClaude 元件協調的重複模式：

#### 調查 → 分析 → 實作 → 驗證
大多數複雜的工作流程都遵循此模式，並為每個階段配備適當的 Persona 和工具。

#### 多 Persona 協調
複雜問題受益於多種觀點 (安全 + 效能、架構 + 前端等)。

#### 漸進式增強
從簡單開始，根據需要增加複雜性 (`--think` → `--think-hard` → `--ultrathink`)。

#### 安全優先方法
關鍵操作會自動包含驗證和安全檢查 (`--safe-mode`, `--validate`)。

#### 情境感知工具選擇
SuperClaude 會根據偵測到的情境自動選擇適當的 MCP 伺服器和旗標。

這些範例表明，SuperClaude 的價值來自其元件之間的智慧協調，而非任何單一功能。該框架能適應你的需求，同時維持一致的品質和安全標準。

---

## 技巧與最佳實踐 🎯

根據真實世界的使用模式和成功的工作流程，以下是充分利用 SuperClaude 的實用技巧。

### 成功入門 🚀

#### 從簡單的指令開始
```bash
# 從這裡開始 - 基本功能
/sc:help
/sc:analyze README.md
/sc:build --help

# 不要從這裡開始 - 複雜的編排
/sc:improve entire-codebase/ --wave-mode force --all-mcp --delegate auto
```

**> ⚠️ 注意**：在增加複雜性之前了解基本行為，可以防止混淆，並幫助你逐步學習框架。

#### 首先相信自動啟用
```bash
# 讓 SuperClaude 選擇工具
/sc:analyze auth-system/
# → 觀察自動啟用的內容 (可能是 security persona + validation)

# 然後實驗手動控制
/sc:analyze auth-system/ --persona-performance
# → 從不同角度看待相同的程式碼
```

**> ⚠️ 注意**：自動啟用通常是正確的，並向你展示不同情境下的最佳工具組合。

#### 使用預覽和安全模式
```bash
# 先看看會發生什麼
/sc:improve messy-code.js --preview

# 安全地套用變更
/sc:improve messy-code.js --safe-mode

# 對於關鍵程式碼，兩者都使用
/sc:improve production-auth/ --preview --safe-mode --validate
```

**> ⚠️ 注意**：防止意外變更，並幫助你在 SuperClaude 執行前了解它將做什麼。

### 旗標使用模式 🏁

#### 從簡單開始，增加複雜性
```bash
# 基本指令
/sc:analyze complex-system/

# 如果需要，新增思考
/sc:analyze complex-system/ --think

# 如果涉及外部函式庫，新增文件
/sc:analyze complex-system/ --think --c7

# 對關鍵系統進行完整分析
/sc:analyze complex-system/ --think-hard --c7 --seq --validate
```

**> ⚠️ 注意**：增量增加複雜性有助於你了解每個旗標的作用，並避免對簡單問題過度設計。

#### 常見的有效旗標組合
```bash
# 安全改進工作流程
/sc:improve --preview → /improve --safe-mode → /test --coverage

# 深度調查工作流程
/sc:troubleshoot issue --think --seq → /analyze affected-code/ --focus quality

# 學習與文件工作流程
/sc:explain concept --persona-mentor --verbose --c7

# 效能優化工作流程
/sc:analyze --focus performance --persona-performance --play
```

**> ⚠️ 注意**：這些組合是經過驗證的模式，可以很好地協同工作且不會衝突。

#### 避免旗標衝突
```bash
# ❌ 衝突的旗標
/sc:analyze code/ --no-mcp --c7  # --no-mcp 覆蓋 --c7

# ❌ 適得其反的組合
/sc:analyze small-file.js --ultrathink --all-mcp  # 對簡單任務來說矯枉過正

# ✅ 合理的組合
/sc:analyze large-system/ --think --delegate auto  # 適合複雜度
/sc:analyze simple-utility.js --answer-only       # 適合簡單性
```

**> ⚠️ 注意**：了解旗標的優先順序和互動可以防止意外行為和資源浪費。

### Persona 優化 🎭

#### 讓領域自動啟用運作
```bash
# 這些會自動獲得正確的 Persona
/sc:build react-components/     # → frontend persona
/sc:scan auth/ --focus security # → security persona
/sc:troubleshoot slow-api/      # → performance + analyzer personas
```

**> ⚠️ 注意**：自動啟用基於經過驗證的模式，通常會選擇最合適的專業知識。

#### 為不同觀點手動覆蓋
```bash
# 從不同角度看待相同的程式碼
/sc:analyze payment-flow/ --persona-security    # 安全觀點
/sc:analyze payment-flow/ --persona-performance # 效能觀點
/sc:analyze payment-flow/ --persona-architect   # 架構觀點
```

**> ⚠️ 注意**：不同的 Persona 提供了獨特的見解，可以揭示其他人可能忽略的問題或機會。

#### 為專案階段使用適當的 Persona
```bash
# 規劃階段
/sc:design new-feature --persona-architect

# 實作階段
/sc:build feature/ --persona-frontend  # 或 backend 等

# 測試階段
/sc:test feature/ --persona-qa

# 文件階段
/sc:document feature/ --persona-scribe
```

**> ⚠️ 注意**：每個專案階段都受益於不同類型的專業知識和觀點。

### MCP 伺服器策略 🔧

#### 了解每個伺服器的幫助時機
- **Context7**：當使用框架、函式庫或需要官方文件時
- **Sequential**：用於複雜除錯、系統性分析或架構決策
- **Magic**：用於 UI 元件產生、設計系統或前端開發
- **Playwright**：用於測試、效能測量或瀏覽器自動化

#### 優化效能與功能
```bash
# 簡單任務的快速執行
/sc:analyze simple-script.js --no-mcp

# 複雜問題的全面分析
/sc:analyze complex-system/ --all-mcp --think-hard

# 大多數工作的平衡方法
/sc:analyze typical-component/ --c7  # 僅文件查詢
```

**> ⚠️ 注意**：將 MCP 使用與任務複雜度相匹配，可以優化速度和結果品質。

### 工作流程優化 📈

#### 使用漸進式增強
```bash
# 等級 1：基本分析
/sc:analyze component.js

# 等級 2：如果複雜則新增思考
/sc:analyze component.js --think

# 等級 3：為框架新增文件
/sc:analyze component.js --think --c7

# 等級 4：對關鍵程式碼進行完整分析
/sc:analyze component.js --think-hard --c7 --seq --validate
```

**> ⚠️ 注意**：從你需要的開始，只有在必要時才增加複雜性。防止過度設計並節省時間。

#### 批次處理相關操作
```bash
# ✅ 高效：相關操作一起處理
/sc:analyze auth-system/ --focus security
/sc:improve auth-system/ --focus security --safe-mode
/sc:test auth-system/ --type security

# ❌ 低效：分散的操作
/sc:analyze auth-system/
/sc:review different-system/
/sc:improve auth-system/  # 操作之間遺失情境
```

**> ⚠️ 注意**：批次處理相關工作可以維持情境，並讓 SuperClaude 在先前的分析基礎上繼續進行。

#### 使用適當的範圍
```bash
# 針對特定問題的檔案級
/sc:improve single-component.js --focus performance

# 針對相關功能的模組級
/sc:analyze user-auth/ --scope module

# 針對架構考量的專案級
/sc:analyze --scope project --focus architecture

# 僅在必要時使用系統級
/sc:analyze --scope system --delegate auto --uc
```

**> ⚠️ 注意**：將範圍與問題相匹配，可以防止分析不足和資源浪費。

### 效能與效率 🏃‍♂️

#### 管理情境和 Token 使用
```bash
# 對於大型操作，使用壓縮
/sc:analyze huge-codebase/ --uc --delegate auto

# 對於重複分析，快取結果
/sc:load project-context/  # 快取專案理解
/sc:analyze specific-issue/  # 在快取的情境上建構

# 對於簡單問題，最小化開銷
/sc:explain quick-concept --answer-only --no-mcp
```

**> ⚠️ 注意**：Token 效率可以保持操作快速，並防止大型專案中的情境溢出。

#### 對大型專案使用委派
```bash
# 在適當時自動委派
/sc:analyze monorepo/ --delegate auto

# 為特定需求手動委派
/sc:analyze large-project/ --delegate folders --concurrency 3

# 對小型專案跳過委派
/sc:analyze small-app/ --no-delegate
```

**> ⚠️ 注意**：委派為大規模操作提供了顯著的速度提升 (40-70%)，同時保持品質。

#### 優化指令序列
```bash
# ✅ 高效序列
/sc:load project/           # 一次性理解情境
/sc:analyze --focus quality # 在理解的基礎上建構
/sc:improve --safe-mode     # 套用改進
/sc:test --coverage         # 驗證變更

# ❌ 低效序列
/sc:analyze file1.js
/sc:analyze file2.js        # 重複設定
/sc:analyze file3.js        # 錯失優化機會
```

**> ⚠️ 注意**：順序指令可以在彼此的情境和分析基礎上建構，以獲得更好的結果。

### 品質與安全 🛡️

#### 務必驗證重要變更
```bash
# 對於生產程式碼
/sc:improve production-auth/ --safe-mode --validate --preview

# 對於實驗性功能
/sc:improve experimental-feature/ --validate

# 用於學習/探索
/sc:improve test-code/ --preview  # 看看它會做什麼
```

**> ⚠️ 注意**：驗證可以防止破壞性變更，並幫助你了解修改的影響。

#### 有效使用品質關卡
```bash
# 讓品質關卡自動運行
/sc:build production-app/  # 8 步驟驗證流程運行

# 為關鍵系統新增額外驗證
/sc:build payment-system/ --validate --safe-mode

# 僅對實驗性工作跳過驗證
/sc:build prototype/ --no-validate  # 謹慎使用
```

**> ⚠️ 注意**：品質關卡可以在問題變得更昂貴、更難修復時及早發現它們。

#### 維持證據鏈
```bash
# 提供證據的指令
/sc:analyze --focus performance  # → 效能指標
/sc:test --coverage             # → 覆蓋率報告
/sc:scan --focus security       # → 安全評估

# 對複雜決策使用內省
/sc:analyze complex-system/ --introspect  # → 決策理由
```

**> ⚠️ 注意**：基於證據的開發可以帶來更好的決策，並在問題出現時更容易除錯。

### 學習與成長 📚

#### 使用 Mentor Persona 進行學習
```bash
# 學習新概念
/sc:explain GraphQL --persona-mentor --verbose

# 理解複雜程式碼
/sc:analyze complex-algorithm.js --persona-mentor

# 獲得逐步指導
/sc:build new-feature/ --persona-mentor --plan
```

**> ⚠️ 注意**：Mentor Persona 優化理解和知識轉移，而不僅僅是任務完成。

#### 實驗不同方法
```bash
# 在同一個問題上嘗試不同 Persona
/sc:analyze api-design/ --persona-architect
/sc:analyze api-design/ --persona-security
/sc:analyze api-design/ --persona-performance

# 比較工具組合
/sc:build app/ --magic --c7
/sc:build app/ --no-mcp --uc  # 更快但更簡單
```

**> ⚠️ 注意**：了解不同方法有助於你為不同情況選擇最佳工具。

#### 建立你自己的模式
```bash
# 識別對你的工作流程有效的模式
# 以安全為重點的 API 開發
/sc:design api --persona-security --validate
/sc:build api --persona-backend --c7
/sc:test api --type security --play

# 建立你自己的高效組合
/sc:analyze code/ --think --c7 --safe-mode  # 你個人的「徹底分析」
```

**> ⚠️ 注意**：開發你自己的經過驗證的模式可以提高生產力並確保一致的品質。

### 常見陷阱與避免方法 ⚠️

#### 不要對簡單任務過度設計
```bash
# ❌ 對簡單任務矯枉過正
/sc:analyze simple-utility.js --ultrathink --all-mcp --wave-mode force

# ✅ 適合簡單任務
/sc:analyze simple-utility.js --focus quality
```

#### 不要忽視自動啟用的智慧
```bash
# ❌ 與系統對抗
/sc:build react-app/ --persona-backend --no-magic  # 工作工具錯誤

# ✅ 與系統合作
/sc:build react-app/  # 讓 frontend persona 和 Magic 自動啟用
```

#### 不要為了速度犧牲安全
```bash
# ❌ 對重要程式碼有風險
/sc:improve production-auth/ --force --no-validate

# ✅ 平衡的方法
/sc:improve production-auth/ --safe-mode --validate  # 更安全但仍然高效
```

#### 不要使用你不了解的旗標
```bash
# ❌ 盲目跟風使用旗標
/sc:command --random-flags-that-look-important

# ✅ 了解每個旗標的作用
/sc:command --think  # 因為我需要更深入的分析
/sc:command --c7     # 因為我正在使用外部函式庫
```

### 衡量成功 📊

追蹤對你的特定需求有效的東西：

- **速度**：不同旗標組合完成的速度有多快？
- **品質**：哪種方法對你的工作類型產生更好的結果？
- **學習**：哪種組合能幫助你更好地理解問題？
- **安全**：哪種模式能預防你環境中的問題？

記住：SuperClaude 會從成功的模式中學習，所以持續使用有效的組合有助於框架更好地為你的特定工作流程自動啟用正確的方法。

---

## 疑難排解與常見問題 🚨

當 SuperClaude 未如預期運作時，以下是如何診斷和修復常見問題的方法。

### 指令問題 🛠️

#### 指令未如預期運作

**問題**：指令產生意外結果或似乎忽略了你的請求。

**診斷**：
```bash
# 檢查自動啟用的內容
/sc:analyze code.js --introspect
# → 顯示決策過程

# 嘗試使用明確的控制
/sc:analyze code.js --persona-analyzer --think --seq
# → 覆蓋自動啟用
```

**解決方案**：
```bash
# 更具體地說明你想要什麼
/sc:improve code.js --focus performance --safe-mode

# 使用預覽來了解將會發生什麼
/sc:improve code.js --preview

# 從簡單開始，增加複雜性
/sc:analyze code.js                    # 基本
/sc:analyze code.js --think            # 增加深度
/sc:analyze code.js --think --c7       # 新增文件
```

**常見原因**：
- 自動啟用選擇了與你預期不同的工具
- 請求過於模糊，SuperClaude 無法理解意圖
- 複雜度不匹配 (簡單請求搭配複雜旗標，反之亦然)

#### 指令運行過慢

**問題**：操作比預期花費更長的時間。

**診斷**：
```bash
# 檢查啟用了什麼
/sc:analyze large-project/ --introspect
# → 查看正在使用哪些工具和伺服器

# 監控資源使用
/sc:analyze large-project/ --verbose
# → 顯示詳細的執行步驟
```

**解決方案**：
```bash
# 為速度進行優化
/sc:analyze large-project/ --uc --no-mcp --scope module

# 對大型操作使用委派
/sc:analyze huge-codebase/ --delegate auto --concurrency 3

# 縮小範圍
/sc:analyze specific-component.js  # 而不是整個專案

# 停用昂貴的功能
/sc:analyze code/ --no-mcp --answer-only
```

**效能優化優先順序**：
1. 縮小範圍 (`--scope file` vs `--scope project`)
2. 使用壓縮 (`--uc`)
3. 停用 MCP 伺服器 (`--no-mcp`)
4. 使用委派 (`--delegate auto`)
5. 使用僅回答模式 (`--answer-only`)

#### 指令產生過多輸出

**問題**：資訊過載，難以找到相關資訊。

**解決方案**：
```bash
# 使用壓縮
/sc:analyze large-system/ --uc

# 更具體地說明焦點
/sc:analyze system/ --focus security  # 而不是一般分析

# 對簡單問題使用僅回答模式
/sc:explain concept --answer-only

# 限制範圍
/sc:analyze --scope file specific-issue.js
```

### 旗標問題 🏁

#### 旗標衝突與意外行為

**問題**：旗標似乎不起作用或產生意外結果。

**常見衝突**：
```bash
# ❌ 這些會衝突
/sc:command --no-mcp --c7        # --no-mcp 覆蓋 --c7
/sc:command --answer-only --plan # --answer-only 跳過規劃
/sc:command --uc --verbose       # --uc 覆蓋 --verbose

# ✅ 這些可以協同工作
/sc:command --think --c7 --seq   # 互補的功能
/sc:command --safe-mode --validate --preview  # 分層的安全性
```

**旗標優先順序**：
1. 安全旗標 (`--safe-mode`) > 優化旗標
2. 明確指定的旗標 > 自動啟用
3. `--no-mcp` 覆蓋所有單獨的 MCP 旗標
4. 最後指定的 Persona 生效
5. 範圍：system > project > module > file

**診斷**：
```bash
# 檢查實際啟用的旗標
/sc:command args --introspect
# → 顯示優先順序解析後的最終旗標設定
```

#### 自動啟用問題

**問題**：自動啟用了錯誤的旗標或 Persona。

**解決方案**：
```bash
# 明確覆蓋自動啟用
/sc:analyze frontend-code/ --persona-security  # 強制安全視角
/sc:build project/ --no-mcp                    # 強制僅使用原生工具

# 使用更具體的語言
/sc:analyze "security vulnerabilities in auth system"  # 明確的意圖
# vs
/sc:analyze auth system                                # 模糊

# 檢查哪些關鍵字觸發自動啟用
/sc:help analyze  # 顯示自動啟用模式
```

**自動啟用除錯**：
```bash
# 查看為什麼啟用了某些旗標
/sc:troubleshoot "why did --think-hard activate?" --introspect
```

### Persona 問題 🎭

#### 啟用了錯誤的 Persona

**問題**：SuperClaude 為你的需求使用了錯誤的專家。

**診斷**：
```bash
# 檢查是什麼觸發了 Persona 啟用
/sc:analyze code/ --introspect
# → 顯示 Persona 選擇的理由
```

**解決方案**：
```bash
# 使用明確的 Persona 進行覆蓋
/sc:analyze backend-api/ --persona-security  # 從安全角度看後端程式碼
/sc:analyze ui-component/ --persona-performance  # 從效能角度看前端

# 使用更具體的語言
/sc:analyze "security issues in payment processing"  # 觸發 security persona
/sc:analyze "slow database queries"                  # 觸發 performance persona

# 為不同觀點嘗試不同 Persona
/sc:analyze payment-system/ --persona-security    # 安全觀點
/sc:analyze payment-system/ --persona-architect   # 架構觀點
```

#### Persona 似乎未啟用

**問題**：預期的 Persona 行為但得到通用回應。

**檢查 Persona 啟用**：
```bash
# 驗證 Persona 是否已啟用
/sc:analyze auth/ --persona-security --introspect
# → 應該會顯示以安全為重點的推理

# 檢查領域關鍵字是否清晰
/sc:scan authentication --focus security  # 應該會自動啟用 security persona
```

**解決方案**：
```bash
# 明確指定 Persona 和焦點
/sc:analyze code/ --persona-security --focus security

# 為 Persona 使用適當的指令
/sc:scan --persona-security     # 安全掃描
/sc:test --persona-qa           # 以品質為重點的測試
/sc:document --persona-scribe   # 專業文件
```

### MCP 伺服器問題 🔧

#### MCP 伺服器未啟用

**問題**：預期的 MCP 功能但它們似乎不起作用。

**診斷**：
```bash
# 檢查 MCP 伺服器狀態
/sc:troubleshoot "MCP servers not working" --introspect

# 驗證 MCP 安裝
/sc:load --summary  # 應該會顯示可用的 MCP 伺服器

# 測試特定伺服器
/sc:analyze react-app/ --c7     # 應該使用 Context7
/sc:troubleshoot issue --seq    # 應該使用 Sequential
/sc:build ui/ --magic           # 應該使用 Magic
/sc:test app/ --play            # 應該使用 Playwright
```

**常見解決方案**：
```bash
# 強制啟用 MCP
/sc:analyze code/ --all-mcp

# 檢查伺服器是否被停用
/sc:analyze code/ --c7  # 如果這不起作用，Context7 可能不可用

# 使用備援方法
/sc:analyze react-app/ --no-mcp  # 如果 MCP 不可用，則使用原生工具
```

#### MCP 伺服器過慢

**問題**：MCP 伺服器整合導致效能緩慢。

**解決方案**：
```bash
# 為速度停用 MCP
/sc:analyze large-project/ --no-mcp

# 使用選擇性的 MCP 啟用
/sc:analyze react-code/ --magic --no-seq  # 僅 UI 產生，跳過分析

# 優化 MCP 使用
/sc:analyze code/ --uc --c7  # 僅壓縮 + 文件
```

### 效能問題 ⚡

#### 操作使用過多 Token

**問題**：達到情境限制或操作昂貴。

**解決方案**：
```bash
# 自動啟用壓縮
/sc:analyze huge-project/ --uc

# 縮小範圍
/sc:analyze --scope module specific-area/
/sc:analyze --scope file specific-file.js

# 使用委派
/sc:analyze large-codebase/ --delegate auto --uc

# 停用昂貴的功能
/sc:analyze code/ --no-mcp --answer-only
```

#### 記憶體或資源問題

**問題**：由於資源限制，操作失敗或非常緩慢。

**解決方案**：
```bash
# 減少並行性
/sc:analyze large-project/ --delegate auto --concurrency 1

# 使用安全模式
/sc:improve large-system/ --safe-mode  # 更保守的資源使用

# 將工作分解為更小的區塊
/sc:analyze module1/
/sc:analyze module2/
/sc:analyze module3/
# 而不是 /analyze entire-project/
```

### 品質與安全問題 🛡️

#### 不安全或有風險的建議

**問題**：SuperClaude 建議的變更似乎有風險。

**務必使用安全功能**：
```bash
# 套用前預覽
/sc:improve important-code/ --preview

# 對關鍵程式碼使用安全模式
/sc:improve production-auth/ --safe-mode

# 新增驗證
/sc:improve system/ --validate --safe-mode

# 使用迭代方法
/sc:improve complex-system/ --loop --safe-mode
```

#### 變更破壞功能

**問題**：套用的改進導致問題。

**預防**：
```bash
# 總是先使用預覽
/sc:improve code/ --preview

# 使用安全模式
/sc:improve code/ --safe-mode

# 變更後進行測試
/sc:improve code/ --safe-mode && /test code/
```

**恢復**：
- 使用 git 還原變更
- 使用 `--safe-mode` 增量套用改進
- 在套用變更前使用 `--validate` 進行檢查

### 框架與整合問題 🔗

#### SuperClaude 不理解專案情境

**問題**：建議不符合你專案的模式或限制。

**解決方案**：
```bash
# 先載入專案情境
/sc:load --deep --summary

# 明確說明專案類型
/sc:analyze react-typescript-app/ --c7  # 在描述中包含技術棧

# 使用適當的 Persona
/sc:analyze node-api/ --persona-backend
/sc:analyze react-ui/ --persona-frontend
```

#### 結果不一致

**問題**：相同指令在不同時間產生不同結果。

**診斷**：
```bash
# 檢查自動啟用的內容有何不同
/sc:command args --introspect

# 為求一致性使用明確的旗標
/sc:analyze code/ --persona-analyzer --think --c7  # 明確的設定
```

**解決方案**：
```bash
# 更明確地說明需求
/sc:improve code/ --focus performance --persona-performance --safe-mode

# 使用一致的旗標模式
/sc:analyze --think --c7     # 你的標準徹底分析
/sc:improve --safe-mode      # 你的標準安全改進
```

### 尋求幫助 🆘

#### 當你卡住時

**自我診斷步驟**：
1. 使用 `--introspect` 了解 SuperClaude 的想法
2. 嘗試更簡單版本的指令
3. 使用明確的旗標檢查自動啟用
4. 在指令上使用 `--help` 查看選項

**升級路徑**：
```bash
# 獲取框架幫助
/sc:troubleshoot "SuperClaude framework issues" --introspect

# 查閱文件
/sc:help                    # 指令概覽
/sc:analyze --help          # 特定指令幫助

# 測試基本功能
/sc:analyze README.md       # 簡單測試
/sc:build --help           # 檢查指令是否運作
```

#### 回報問題

回報問題時，請包含：
- **使用的確切指令**：`/analyze code/ --think --c7`
- **預期行為**：「應該提供安全分析」
- **實際行為**：「只提供了基本的程式碼審查」
- **情境**：「正在處理 Node.js 驗證系統」
- **SuperClaude 版本**：使用 `/help` 檢查

**有用的除錯資訊**：
```bash
# 獲取診斷資訊
/sc:troubleshoot "describe your issue" --introspect --verbose
# → 為錯誤報告提供詳細情境
```

### 常見問題快速參考 📋

| 問題           | 快速修復        | 指令                       |
| -------------- | --------------- | -------------------------- |
| 太慢           | 縮小範圍 + 壓縮 | `--scope file --uc`        |
| 錯誤的 Persona | 明確覆蓋        | `--persona-security`       |
| 輸出過多       | 使用壓縮        | `--uc`                     |
| 有風險的變更   | 使用安全功能    | `--safe-mode --preview`    |
| MCP 不運作     | 強制啟用或停用  | `--all-mcp` 或 `--no-mcp`  |
| 結果不一致     | 使用明確的旗標  | `--persona-x --think --c7` |
| 情境問題       | 載入專案情境    | `/load --deep`             |
| Token 限制     | 啟用壓縮 + 委派 | `--uc --delegate auto`     |

記住：如有疑問，從簡單開始，逐步增加複雜性。使用 `--introspect` 了解 SuperClaude 的想法，並在需要特定行為時毫不猶豫地覆蓋自動啟用。

---

## 未來展望 🔮

SuperClaude v3.0 才剛結束測試版，我們坦誠地說：就其功能而言，它運作得相當不錯，但仍有不完善之處和改進空間。以下是你可以預期框架演變的方向。

### 當前限制 (老實說) ⚠️

#### 我們正在處理的已知問題

**效能優化**
- 某些操作比我們希望的要慢，尤其是在所有 MCP 伺服器都啟用的情況下
- 對於大規模操作，Token 使用可以更有效率
- 在非常大的程式碼庫 (>1000 個檔案) 上會出現記憶體使用高峰

**MCP 伺服器整合**
- 伺服器連接偶爾會超時或無回應
- MCP 伺服器之間的錯誤處理可以更順暢
- 一些進階 MCP 功能是實驗性的，可能無法可靠運作

**品質關卡**
- 8 步驟驗證流程有時會錯過邊緣案例
- 品質指標可以更細緻、更具可操作性
- 整合測試驗證需要改進

**自動啟用智慧**
- Persona 選擇偶爾會錯過情境線索
- 對於簡單任務，旗標自動啟用可能過於積極
- 模式識別對常見情境運作良好，但對邊緣案例則較為困難

#### 我們移除的內容 (以及原因)

**Hooks 系統 (將在 v4 回歸)**
- v2 的 hooks 系統變得過於複雜且充滿錯誤
- 導致效能問題和不可預測的行為
- 正在以更好的架構從頭開始重新設計
- 將在 v4 中以更高的可靠性和更簡單的設定回歸

**一些進階指令**
- 將 20+ 個指令合併為 16 個基本指令
- 移除了不夠穩定的實驗性指令
- 專注於讓核心指令變得優秀，而不是擁有許多平庸的指令

### 短期改進 (v3.x) 🔧

我們當前的重點是讓 v3 穩定和完善：

#### 效能優化 (v3.1)
- **MCP 連接池**：重用連接以減少啟動開銷
- **智慧快取**：快取 MCP 結果和分析結果
- **Token 優化**：更好的壓縮演算法和更聰明的批次處理
- **資源管理**：對大型專案更好的記憶體使用

**預期影響**：常見操作的效能提升 30-50%。

#### MCP 伺服器可靠性 (v3.2)
- **連接彈性**：更好地處理 MCP 伺服器超時和故障
- **優雅降級**：當伺服器不可用時的備援策略
- **健康監控**：即時監控 MCP 伺服器狀態
- **錯誤恢復**：自動重試和恢復機制

**預期影響**：MCP 相關故障和超時減少 80%。

#### 品質關卡增強 (v3.3)
- **細緻指標**：更具體、更可操作的品質測量
- **自訂驗證**：使用者可設定的品質檢查
- **證據追蹤**：更好地記錄驗證結果
- **整合測試**：改進對全系統變更的驗證

**預期影響**：對自動化改進的信心更高，品質指標更好。

### 中期演變 (v4.0) 🚀

下一個主要版本將專注於智慧和使用者體驗：

#### 重新設計的 Hooks 系統
- **事件驅動架構**：框架與 hooks 之間的清晰分離
- **效能優化**：當未使用 hooks 時不影響核心操作
- **簡單設定**：易於設定和除錯
- **可擴展性**：社群 hooks 和自訂整合

#### 增強的 AI 協調
- **更聰明的自動啟用**：更好的情境理解和工具選擇
- **學習模式**：框架從你成功的工作流程中學習
- **預測性協助**：根據當前情境建議下一步
- **個人化**：適應你的編碼風格和偏好

#### 進階編排
- **動態資源分配**：基於操作複雜度的智慧擴展
- **平行處理**：對獨立操作的真正平行化
- **情境保留**：在會話中更好地記住先前的工作
- **工作流程模板**：用於常見開發情境的可重用模式

#### 擴展的 MCP 生態系統
- **更多伺服器**：額外的專業功能 (資料庫、雲端、監控)
- **社群伺服器**：用於社群貢獻的 MCP 伺服器框架
- **伺服器市集**：輕鬆發現和安裝新功能
- **本地開發**：在本地運行 MCP 伺服器以獲得更好的效能

### 長期願景 (v5.0+) 🌟

展望未來，我們正在探索更具雄心的改進：

#### 智慧與自動化
- **情境理解**：深度理解專案目標和限制
- **主動協助**：基於程式碼分析和專案模式的建議
- **自動化工作流程**：對常見開發任務的端到端自動化
- **程式碼演變追蹤**：理解你的程式碼庫如何隨時間變化

#### 團隊與企業功能
- **多開發者協調**：團隊感知的分析和建議
- **專案記憶**：跨會話的專案情境持久理解
- **政策執行**：自動執行團隊編碼標準
- **分析儀表板**：對開發模式和生產力的洞察

#### 平台整合
- **IDE 深度整合**：與流行開發環境的原生整合
- **CI/CD 管線整合**：建置流程中的自動化品質檢查和改進
- **雲端開發**：與雲端開發平台的整合
- **API 生態系統**：用於自訂整合和工具的豐富 API

### 你如何影響開發 📝

#### 回饋與使用模式
我們積極監控：
- **指令使用模式**：哪些指令最有用/最少用
- **旗標組合**：哪些組合在實務中效果良好
- **錯誤模式**：常見的故障模式和使用者困惑點
- **效能瓶頸**：使用者在哪裡遇到速度變慢

#### 社群參與
- **GitHub Issues**：錯誤報告和功能請求有助於確定開發優先順序
- **使用範例**：真實世界的使用範例為我們的測試和優化提供資訊
- **文件回饋**：文件中的空白突顯了需要改進的領域
- **整合請求**：對特定工具/框架整合的請求指導 MCP 開發

#### Beta 測試計畫
- **搶先體驗**：在公開發布前測試新功能
- **回饋循環**：對實驗性功能的直接輸入
- **效能測試**：幫助驗證跨不同環境的優化
- **使用案例驗證**：確保新功能適用於真實的開發情境

### 保持更新 📡

#### 如何保持最新
```bash
# 定期檢查更新
/sc:help  # 顯示當前版本和更新可用性

# 監控開發進度
# - GitHub releases：功能公告和變更日誌
# - 文件更新：新模式和最佳實踐
# - 社群討論：技巧和進階使用模式
```

#### 遷移與相容性
- **向後相容**：v3.x 更新維持指令相容性
- **設定遷移**：版本之間自動遷移設定
- **棄用警告**：提前通知變更的功能
- **遷移指南**：主要版本升級的逐步指南

### 現實的期望 📊

#### 對更新的期望
- **v3.x 更新**：錯誤修復、效能改進、穩定性增強
- **主要版本**：新功能、架構改進、擴展功能
- **社群貢獻**：額外的 MCP 伺服器、工作流程模式、整合

#### 不應期望的
- **完美的 AI**：SuperClaude 將繼續存在限制和邊緣案例
- **一體適用**：不同專案和團隊需要不同方法
- **零學習曲線**：新功能需要學習和實驗
- **神奇的解決方案**：複雜問題仍需要人類的專業知識和判斷

### 為 SuperClaude 做出貢獻 🤝

#### 幫助的方式
- **錯誤報告**：詳細的報告有助於提高穩定性和可靠性
- **功能請求**：真實世界的需求驅動開發優先順序
- **文件**：範例、指南和澄清有助於社群
- **社群支援**：幫助其他使用者建立更強大的生態系統

#### 我們最重視的
- **誠實的回饋**：正面經驗和挫折都有助於改進框架
- **真實世界的使用**：SuperClaude 在實際開發工作流程中的運作方式 (或不運作)
- **具體範例**：具體的情境比抽象的功能請求更有價值
- **耐心**：記住 v3.0 才剛結束測試版 - 改進需要時間

### 底線 🎯

SuperClaude v3.0 是一個有成長空間的堅實基礎。我們致力於：
- **誠實溝通**：不過度承諾，清楚說明限制和時間表
- **使用者驅動的開發**：優先考慮解決實際問題的功能
- **品質優於功能**：在新增功能之前讓現有功能變得優秀
- **社群焦點**：建立一個服務於開發社群的框架

我們相信 SuperClaude 可以對軟體開發工作流程變得更有幫助，但這需要時間、回饋和迭代才能實現。在我們共同改進框架的過程中，感謝你的耐心、回饋和持續使用。

**想保持參與嗎？** 關注 GitHub 儲存庫，在新功能發布時嘗試它們，並讓我們知道在你的開發工作流程中哪些有效 (哪些無效)。你的真實世界使用和回饋將使 SuperClaude 對開發社群真正有價值。

---

## 結論 🎉

你現在對 SuperClaude v3.0 有了全面的了解 - 它的元件、功能以及如何有效地使用它們。讓我們總結一下有助於你充分利用該框架的關鍵要點。

### 關鍵要點 🎯

#### SuperClaude 的核心價值
SuperClaude 透過以下方式將 Claude Code 從通用 AI 助理轉變為專業的開發夥伴：
- **15 個專業指令**，了解開發工作流程
- **11 個專家 Persona**，帶來領域特定的知識
- **智慧編排**，自動協調工具
- **品質優先的方法**，維持安全性和可靠性

#### 力量在於協調
SuperClaude 的力量來自其元件的協同運作，而非任何單一功能：
- 指令通常會啟用適當的 Persona 和 MCP 伺服器
- Persona 會在多領域問題上相互協調
- 編排器會優化工具選擇和資源使用
- 品質關卡確保一致、可靠的結果

#### 從簡單開始，智慧擴展
使用 SuperClaude 的最佳方法是漸進式的：
1. **從基本指令開始**，了解核心功能
2. **相信自動啟用**，學習最佳的工具組合
3. **在需要特定觀點時新增手動控制**
4. **隨著信心增長，實驗進階功能**

### 是什麼讓 SuperClaude 與眾不同 🌟

#### 坦誠面對限制
- 我們承認 v3.0 才剛結束測試版，仍有不完善之處
- 我們清楚地記錄了哪些運作良好，哪些仍是實驗性的
- 我們優先考慮可靠性而非華而不實的功能
- 我們提供現實的時間表和期望

#### 基於證據的開發
- 所有建議都有可驗證的資料支持
- 品質關卡確保變更不會破壞現有功能
- 基於真實使用模式的效能優化
- 由使用者回饋驅動的持續改進

#### 尊重你的工作流程
- 增強現有工具，而非取代它們
- 維持與標準開發實踐的相容性
- 為所有自動決策提供手動覆蓋
- 從簡單任務擴展到複雜的企業情境

### 實際的下一步 🛣️

#### 對於新使用者
1. **從安裝開始**：遵循[安裝指南](installation-guide.md)
2. **嘗試基本指令**：`/help`、`/analyze README.md`、`/build --help`
3. **探索領域指南**：[指令](commands-guide.md)、[旗標](flags-guide.md)、[Persona](personas-guide.md)
4. **逐步建立信心**：簡單任務 → 複雜工作流程 → 進階功能

#### 對於有經驗的使用者
1. **優化你的工作流程**：識別對你的需求有效的旗標組合
2. **實驗協調**：在複雜問題上嘗試不同的 Persona 組合
3. **貢獻回饋**：分享在你的環境中哪些有效 (哪些無效)
4. **探索進階功能**：Wave 編排、子代理人委派、內省模式

### 何時使用 SuperClaude 🤔

#### SuperClaude 擅長於
- **開發工作流程**：建置、測試、部署、文件
- **程式碼分析**：品質評估、安全掃描、效能優化
- **學習與理解**：解釋複雜系統、上手新專案
- **品質改進**：系統性重構、技術債清理
- **多領域問題**：需要多種類型專業知識的問題

#### 何時使用標準 Claude Code
- **簡單問題**：不需要專業工具的快速解釋
- **創意寫作**：非技術性內容創作
- **一般研究**：軟體開發之外的主題
- **腦力激盪**：沒有具體實作需求的開放式構想

### SuperClaude 的哲學 💭

#### 人類與 AI 的協作
SuperClaude 旨在增強人類的專業知識，而非取代它：
- **你提供情境和目標** - SuperClaude 提供執行和專業知識
- **你做決定** - SuperClaude 提供證據和建議
- **你了解你的限制** - SuperClaude 尊重並在其中運作
- **你對結果負責** - SuperClaude 幫助你取得更好的結果

#### 持續改進
框架透過以下方式變得更好：
- **使用模式**：學習哪些組合在實務中效果良好
- **使用者回饋**：真實世界的經驗驅動開發優先順序
- **基於證據的優化**：資料驅動的工具和工作流程改進
- **社群貢獻**：共享的知識和最佳實踐

### 展望未來 🔮

#### 短期 (未來 6 個月)
- 效能優化使操作速度提高 30-50%
- 改善的 MCP 伺服器可靠性將故障減少 80%
- 增強的品質關卡提供更具可操作性的回饋
- 基於使用者問題和回饋的更好文件

#### 中期 (6-18 個月)
- 具有更好架構和效能的重新設計的 hooks 系統
- 基於從使用模式中學習的更聰明的自動啟用
- 擴展的 MCP 生態系統，包含社群貢獻的伺服器
- 具有真正平行處理的進階編排

#### 長期願景
- 對專案和團隊工作流程的深度情境理解
- 基於程式碼分析和專案模式的主動協助
- 針對協作開發的團隊感知功能
- 具有 IDE、CI/CD 和雲端平台的豐富整合生態系統

### 最後的想法 🎉

SuperClaude v3.0 代表了增強軟體開發工作流程的堅實基礎。雖然它並不完美，仍有改進空間，但它展示了如何將 AI 審慎地整合到開發實踐中，而不會擾亂現有工作流程或取代人類的專業知識。

當框架讓你更有效率、幫助你學習新事物或發現你可能錯過的問題時，它就成功了。它的設計初衷是成為一個有幫助的同事，而不是取代你對自己專業的理解。

#### 感謝 🙏

感謝你花時間徹底了解 SuperClaude。你深思熟慮的使用、誠實的回饋以及對不完善之處的耐心，將使這個框架對開發社群真正有價值。

無論你是偶爾為特定任務使用 SuperClaude，還是將其深度整合到你的日常工作流程中，我們都希望它能讓你的開發體驗變得更好一些。當它未如預期運作時，請告訴我們 - 這些回饋對於進行改進至關重要。

**祝你編碼愉快！** 🚀 我們很高興看到你與 SuperClaude 作為開發夥伴一起打造的成果。

---

*最後更新：2024 年 7 月*
*SuperClaude v3.0 使用者指南*

*如有問題、回饋或貢獻，請訪問我們的 GitHub 儲存庫或加入社群討論。我們總是樂於聽取使用者的意見，並了解你們使用該框架的經驗。*

### 本文原始連結

[SuperClaude 官方文件](https://github.com/SuperClaude-Org/SuperClaude_Framework)
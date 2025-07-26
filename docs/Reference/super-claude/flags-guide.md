---
sidebar_position: 2
title: SuperClaude 旗標使用指南
description: 一份完整的 SuperClaude 斜線指令旗標實用指南，涵蓋各種旗標的詳細說明與範例。
tags:
  - SuperClaude
  - 指令指南
  - AI工具
last_update:
  date: 2025-07-26
  author: Danny
---

# SuperClaude 旗標使用指南 🏁

## 🤖 大多數旗標會自動啟用 - 別擔心！

**老實說**：你不需要記住這些旗標。SuperClaude 通常會根據你的操作自動加入有用的旗標！

**實際運作情況：**
- 你輸入 `/analyze auth.js`
- SuperClaude 偵測到這是與安全相關的程式碼
- **通常會自動加入** `--persona-security`、`--focus security`、`--validate`
- 你通常無需手動管理任何旗標就能獲得專家的安全分析

**什麼時候需要手動使用旗標？**
- 你想**覆蓋** SuperClaude 的選擇（很少見）
- 你對特定方面感到**好奇**（例如 `--focus performance`）
- 你想**實驗**不同的方法

**總結**：只要使用基本指令，讓自動啟用機制運作即可。這些旗標是備用選項，不是必需品。🎯

---

## 🚀 直接試試這些（無需了解旗標）

```bash
# 這些指令無需任何旗標知識即可良好運作：
/sc:analyze src/                    # 自動選擇合適的分析旗標
/sc:build                          # 根據你的專案自動優化
/sc:improve messy-file.js          # 自動啟用品質與安全旗標
/sc:troubleshoot "weird error"     # 自動啟用除錯與分析旗標
```

**看吧？不需要旗標。** 以下內容是為那些好奇幕後運作原理的人準備的。

---

一份關於 SuperClaude 旗標系統的實用指南。旗標就像是命令列選項，可以改變 SuperClaude 的行為——把它們想像成指令的超能力。

## 什麼是旗標？ 🤔

**旗標是修飾符**，用來改變 SuperClaude 處理你請求的方式。它們跟在指令後面，並以 `--` 開頭。

**基本語法**（但你通常不需要知道這個）：
```bash
/sc:command --flag-name
/sc:command --flag-name value  
/sc:analyze src/ --focus security --depth deep
```

**旗標在實務中的運作方式**：
1. **自動啟用** - SuperClaude 根據情境加入旗標（這是主要方式！🎯）
2. **手動覆蓋** - 如果你想要不同的行為，可以明確地加入旗標

**旗標存在的理由**（主要是自動帶來的好處）：
- 獲得更好、更集中的結果
- 自動啟用合適的思考深度
- 在需要時連接到特殊功能
- 根據你的任務優化速度或細節
- 將注意力引導到你實際在處理的事情上

**關鍵點**：SuperClaude 會智慧地處理旗標選擇，所以你不需要操心！🧠

## 旗標分類 📂

### 規劃與分析旗標 🧠

這些旗標控制 SuperClaude 對你請求的思考深度。

#### `--plan`
**功能**：在執行任何操作前顯示執行計畫
**使用時機**：當你想先看看 SuperClaude 會做什麼時
**範例**：`/build --plan` - 在執行前查看建置步驟

#### `--think`
**功能**：多檔案分析（約 4K tokens）
**使用時機**：涉及多個檔案的複雜問題
**自動啟用**：匯入鏈 > 5 個檔案，跨模組呼叫 > 10 次參考
**範例**：`/analyze complex-system/ --think`

#### `--think-hard` 
**功能**：深度架構分析（約 10K tokens）
**使用時機**：全系統問題、架構決策
**自動啟用**：系統重構、瓶頸 > 3 個模組
**範例**：`/improve legacy-system/ --think-hard`

#### `--ultrathink`
**功能**：最大深度分析（約 32K tokens）
**使用時機**：關鍵系統重新設計、複雜除錯
**自動啟用**：舊系統現代化、嚴重漏洞
**範例**：`/troubleshoot "entire auth system broken" --ultrathink`

> **💡 提示**：從 `--think` 開始，只有在需要時才加深。思考得越多 = 速度越慢但越徹底。

---

### 效率與控制旗標 ⚡

控制輸出風格、安全性與效能。

#### `--uc` / `--ultracompressed`
**功能**：使用符號減少 60-80% 的 token
**使用時機**：大型操作、當情境快滿時
**自動啟用**：情境使用率 > 75%、大規模操作
**範例**：`/analyze huge-codebase/ --uc`

#### `--safe-mode`
**功能**：最大程度的驗證、保守執行
**使用時機**：生產環境、高風險操作
**自動啟用**：資源使用率 > 85%、生產環境
**範例**：`/improve production-code/ --safe-mode`

#### `--validate`
**功能**：操作前驗證與風險評估
**使用時機**：想在變更前進行檢查
**自動啟用**：風險分數 > 0.7
**範例**：`/cleanup legacy/ --validate`

#### `--verbose`
**功能**：最大程度的細節與解釋
**使用時機**：學習、除錯、需要完整情境
**範例**：`/build --verbose` - 查看每個建置步驟

#### `--answer-only`
**功能**：直接回應，不建立任務
**使用時機**：快速提問，不希望有工作流程自動化
**範例**：`/explain React hooks --answer-only`

> **💡 提示**：`--uc` 很適合大型操作。`--safe-mode` 用於任何重要的事情。`--verbose` 用於學習時。

---

### MCP 伺服器旗標 🔧

透過 MCP 伺服器啟用特殊功能。

#### `--c7` / `--context7`
**功能**：啟用 Context7 以取得官方函式庫文件
**使用時機**：使用框架、需要官方文件時
**自動啟用**：外部函式庫匯入、框架相關問題
**範例**：`/build react-app/ --c7` - 獲取 React 最佳實踐

#### `--seq` / `--sequential`
**功能**：啟用 Sequential 以進行複雜的多步驟分析
**使用時機**：複雜除錯、系統設計
**自動啟用**：複雜除錯、`--think` 旗標
**範例**：`/troubleshoot "auth flow broken" --seq`

#### `--magic`
**功能**：啟用 Magic 以產生 UI 元件
**使用時機**：建立 UI 元件、設計系統
**自動啟用**：UI 元件請求、前端角色
**範例**：`/build dashboard --magic` - 獲取現代 UI 元件

#### `--play` / `--playwright`
**功能**：啟用 Playwright 以進行瀏覽器自動化與測試
**使用時機**：E2E 測試、效能監控
**自動啟用**：測試工作流程、QA 角色
**範例**：`/test e2e --play`

#### `--all-mcp`
**功能**：同時啟用所有 MCP 伺服器
**使用時機**：複雜的多領域問題
**自動啟用**：問題複雜度 > 0.8、多領域指標
**範例**：`/analyze entire-app/ --all-mcp`

#### `--no-mcp`
**功能**：停用所有 MCP 伺服器，僅使用原生工具
**使用時機**：需要較快執行速度、不需要特殊功能時
**範例**：`/analyze simple-script.js --no-mcp`

> **💡 提示**：MCP 伺服器會增加功能但消耗更多 token。`--c7` 用於文件，`--seq` 用於思考，`--magic` 用於 UI。

---

### 進階編排旗標 🎭

用於複雜操作與工作流程。

#### `--delegate [files|folders|auto]`
**功能**：啟用子代理人委派以進行平行處理
**使用時機**：大型程式碼庫、複雜分析
**自動啟用**：> 7 個目錄或 > 50 個檔案
**選項**：
- `files` - 委派單一檔案分析
- `folders` - 委派目錄級分析
- `auto` - 智慧委派策略

**範例**：`/analyze monorepo/ --delegate auto`

#### `--wave-mode [auto|force|off]`
**功能**：具有複合智慧的多階段執行
**使用時機**：複雜改進、系統性分析
**自動啟用**：複雜度 > 0.8 且檔案數 > 20 且操作類型 > 2
**範例**：`/improve legacy-system/ --wave-mode force`

#### `--loop`
**功能**：迭代改進模式
**使用時機**：品質改進、精煉操作
**自動啟用**：polish, refine, enhance 等關鍵字
**範例**：`/improve messy-code.js --loop`

#### `--concurrency [n]`
**功能**：控制最大並行子代理人數量 (1-15)
**使用時機**：控制資源使用
**範例**：`/analyze --delegate auto --concurrency 3`

> **💡 提示**：這些功能強大但複雜。從 `--delegate auto` 開始處理大型專案，用 `--loop` 進行改進。

---

### 焦點與範圍旗標 🎯

引導 SuperClaude 的注意力到特定區域。

#### `--scope [level]`
**選項**：file, module, project, system
**功能**：設定分析範圍
**範例**：`/analyze --scope module auth/`

#### `--focus [domain]`
**選項**：performance, security, quality, architecture, accessibility, testing
**功能**：將分析重點放在特定領域
**範例**：`/analyze --focus security --scope project`

#### Persona Flags
**可用角色**：architect, frontend, backend, analyzer, security, mentor, refactorer, performance, qa, devops, scribe
**功能**：啟用專家行為模式
**範例**：`/analyze --persona-security` - 以安全為重點的分析

> **💡 提示**：`--focus` 很適合用於目標性分析。角色會自動啟用，但手動控制也有幫助。

---

## 常見旗標模式 🔄

### 快速分析
```bash
/sc:analyze src/ --focus quality          # 快速品質檢查
/sc:analyze --uc --focus security         # 快速安全掃描
```

### 深度調查
```bash
/sc:troubleshoot "bug" --think --seq      # 系統性除錯
/sc:analyze --think-hard --focus architecture  # 架構分析
```

### 大型專案工作
```bash
/sc:analyze monorepo/ --delegate auto --uc     # 高效率的大型分析
/sc:improve legacy/ --wave-mode auto --safe-mode  # 安全的系統性改進
```

### 學習與文件
```bash
/sc:explain React hooks --c7 --verbose    # 包含文件的詳細解釋
/sc:document api/ --persona-scribe        # 專業文件
```

### 效能導向
```bash
/sc:analyze --focus performance --play     # 帶有測試的效能分析
/sc:build --uc --no-mcp                   # 不含額外功能的快速建置
```

### 安全導向
```bash
/sc:analyze --focus security --think --validate  # 徹底的安全分析
/sc:scan --persona-security --safe-mode         # 保守的安全掃描
```

## 實用範例 💡

### 前後對比：基本分析
**之前**（基本）：
```bash
/sc:analyze auth.js
# → 簡單的檔案分析
```

**之後**（使用旗標）：
```bash
/sc:analyze auth.js --focus security --think --c7
# → 以安全為重點的分析，具有深度思考和官方文件
# → 更徹底，找出安全模式，並與最佳實踐進行比對
```

### 前後對 B-large-project
**之前**（慢）：
```bash
/sc:analyze huge-monorepo/
# → 試圖一次分析所有內容，可能會超時或使用過多 token
```

**之後**（高效）：
```bash
/sc:analyze huge-monorepo/ --delegate auto --uc --focus architecture
# → 將工作委派給子代理人，壓縮輸出，專注於架構
# → 更快、更集中、效果更好
```

### 前後對比：改善工作
**之前**（有風險）：
```bash
/sc:improve legacy-system/
# → 可能會做太多變更，可能會破壞東西
```

**之後**（安全）：
```bash
/sc:improve legacy-system/ --safe-mode --loop --validate --preview
# → 僅進行安全變更，採用迭代方法，先驗證，並顯示預覽
# → 更安全，漸進式改進
```

## 自動啟用範例 🤖

SuperClaude 通常會根據情境加入旗標。以下是它會嘗試的情況：

### 基於複雜度
```bash
/sc:analyze huge-codebase/
# 自動加入: --delegate auto --uc
# 原因: 偵測到 >50 個檔案，需要情境管理

/sc:troubleshoot "complex system issue"  
# 自動加入: --think --seq
# 原因: 偵測到多元件問題
```

### 基於領域
```bash
/sc:build react-app/
# 自動加入: --c7 --persona-frontend
# 原因: 偵測到前端框架

/sc:analyze --focus security
# 自動加入: --persona-security --validate
# 原因: 安全焦點觸發安全專家
```

### 基於效能
```bash
# 當情境使用率 >75%
/sc:analyze large-project/
# 自動加入: --uc
# 原因: 需要 token 優化

# 當風險分數 >0.7
/sc:improve production-code/
# 自動加入: --safe-mode --validate
# 原因: 偵測到高風險操作
```

## 進階用法 🚀

### 複雜旗標組合

**全面程式碼審查**：
```bash
/sc:review codebase/ --persona-qa --think-hard --focus quality --validate --c7
# → QA 專家 + 深度思考 + 品質焦點 + 驗證 + 文件
```

**舊系統現代化**：
```bash
/sc:improve legacy/ --wave-mode force --persona-architect --safe-mode --loop --c7
# → Wave 編排 + 架構師視角 + 安全性 + 迭代 + 文件
```

**安全稽核**：
```bash
/sc:scan --persona-security --ultrathink --focus security --validate --seq
# → 安全專家 + 最大化思考 + 安全焦點 + 驗證 + 系統性分析
```

### 效能優化

**追求速度**：
```bash
/sc:analyze --no-mcp --uc --scope file
# → 停用額外功能，壓縮輸出，限制範圍
```

**追求徹底性**：
```bash
/sc:analyze --all-mcp --think-hard --delegate auto
# → 所有功能，深度思考，平行處理
```

### 自訂工作流程

**錯誤調查工作流程**：
```bash
/sc:troubleshoot "specific error" --seq --think --validate
/sc:analyze affected-files/ --focus quality --persona-analyzer  
/sc:test --play --coverage
```

**功能開發工作流程**：
```bash
/sc:design new-feature --persona-architect --c7
/sc:build --magic --persona-frontend --validate
/sc:test --play --coverage
/sc:document --persona-scribe --c7
```

## 快速參考 📋

### 最常用旗標
| 旗標 | 目的 | 使用時機 |
|------|---------|-------------|
| `--think` | 更深度的分析 | 複雜問題 |
| `--uc` | 壓縮輸出 | 大型操作 |
| `--safe-mode` | 保守執行 | 重要程式碼 |
| `--c7` | 官方文件 | 框架工作 |
| `--seq` | 系統性分析 | 除錯 |
| `--focus security` | 安全焦點 | 安全考量 |
| `--delegate auto` | 平行處理 | 大型程式碼庫 |
| `--validate` | 執行前檢查 | 高風險操作 |

### 效果良好的旗標組合
```bash
# 安全改進
--safe-mode --validate --preview

# 深度分析
--think --seq --c7

# 大型專案
--delegate auto --uc --focus

# 學習
--verbose --c7 --persona-mentor

# 安全工作
--persona-security --focus security --validate

# 效能工作
--persona-performance --focus performance --play
```

### 自動啟用觸發條件
- **--think**: 複雜的匯入、跨模組呼叫
- **--uc**: 情境 > 75%、大型操作
- **--safe-mode**: 資源使用率 > 85%、生產環境
- **--delegate**: > 7 個目錄或 > 50 個檔案
- **--c7**: 框架匯入、文件請求
- **--seq**: 除錯關鍵字、--think 旗標
- **Personas**: 特定領域的關鍵字和模式

## 旗標問題排查 🚨

### 常見問題

**「旗標似乎沒作用」**
- 檢查拼寫（常見錯字：`--ultracompresed`、`--persona-fronted`）
- 有些旗標需要值：`--scope project`、`--focus security`
- 旗標衝突：`--no-mcp` 會覆蓋 `--c7`、`--seq` 等

**「操作太慢」**
- 嘗試使用 `--uc` 進行壓縮
- 使用 `--no-mcp` 停用額外功能
- 限制範圍：使用 `--scope file` 而非 `--scope project`

**「輸出太多」**
- 加入 `--uc` 進行壓縮
- 如果有 `--verbose`，請移除
- 對於簡單問題使用 `--answer-only`

**「不夠徹底」**
- 加入 `--think` 或 `--think-hard`
- 啟用相關的 MCP 伺服器：`--seq`、`--c7`
- 使用合適的角色：`--persona-analyzer`

**「變更風險太大」**
- 對於重要程式碼，務必使用 `--safe-mode`
- 加入 `--validate` 先行檢查
- 使用 `--preview` 在套用前查看變更

### 旗標衝突

**這些會覆蓋其他旗標**：
- `--no-mcp` 會覆蓋所有 MCP 旗標（`--c7`、`--seq` 等）
- `--safe-mode` 會覆蓋優化旗標
- 最後一個角色旗標會生效：`--persona-frontend --persona-backend` → backend

**優先順序**：
1. 安全旗標 (`--safe-mode`) 優於優化
2. 明確指定的旗標優於自動啟用
3. 思考深度：`--ultrathink` > `--think-hard` > `--think`
4. 範圍：system > project > module > file

## 有效使用旗標的技巧 💡

### 入門（老實說）
1. **一開始先忽略旗標** - 自動啟用在大多數情況下都運作得很好
2. **觀察哪些旗標被自動啟用** - 你可以透過觀察 SuperClaude 的選擇來學習
3. **好奇時使用 `--help`** - 許多指令會顯示可用的旗標
4. **相信自動化** - SuperClaude 通常會選擇合理的預設值

### 進階（如果你想的話）
1. **實驗覆蓋** - 在非安全相關的程式碼上試試 `--persona-security`，看看有什麼不同觀點
2. **學習有用的組合** - `--safe-mode --validate` 用於重要的事情
3. **了解效能權衡** - 快速 (`--uc --no-mcp`) vs 徹底 (`--think-hard --all-mcp`)
4. **利用旗標學習** - 當你想了解發生什麼事時，使用 `--verbose`

### 效能技巧（給高階使用者）
- **追求速度**：`--uc --no-mcp --scope file`
- **追求徹底性**：`--think-hard --all-mcp --delegate auto`
- **追求安全性**：`--safe-mode --validate --preview`
- **用於學習**：`--verbose --c7 --persona-mentor`

---

## 最後的提醒 📝

**關於旗標的真相** 💯：
- **自動啟用通常比手動選擇旗標效果更好**
- **你可以忽略本指南的大部分內容**，只使用基本指令
- **旗標在你需要時才出現** - 不是因為你必須使用它們
- **學習是自然發生的**，透過使用，而不是透過研讀指南 😊

**別感到不知所措** 🧘‍♂️：
- SuperClaude 在沒有旗標知識的情況下也能良好運作
- 上述詳細資訊是為了滿足好奇心，而非必需品
- 自動啟用功能會根據使用模式不斷變得更聰明
- 不記住旗標並不會讓你錯過什麼

**什麼時候真正需要旗標**：
- 覆蓋自動啟用（很少見）
- 實驗不同的方法（有趣）
- 針對特定效能需求進行優化（進階）
- 了解發生了什麼（教育目的）

**從簡單開始，保持簡單** 🎯：
- 使用基本指令：`/analyze`、`/build`、`/improve`
- 讓自動啟用處理複雜性
- 只有在想實驗時才手動加入旗標
- 相信 SuperClaude 知道自己在做什麼

---

*記住：在所有這些看似複雜的背後，SuperClaude 的使用其實很簡單。只要開始輸入指令即可！🚀*

---
sidebar_position: 5
title: "OpenSpec 指令參考"
description: "OpenSpec 斜線指令（Slash Commands）的完整參考，包含 /opsx:propose、/opsx:apply、/opsx:archive 等所有指令的用法與範例"
tags: [OpenSpec]
last_update:
  date: 2026-04-13
  author: Danny
---

# 指令

這是 OpenSpec slash commands 的完整參考。這些指令在你的 AI 程式碼助理的聊天介面中呼叫（例如 Claude Code、Cursor、Windsurf）。

關於工作流程模式與各指令的使用時機，請參閱 [Workflows](workflows.md)。關於 CLI 指令，請參閱 [CLI](cli.md)。

## 快速參考

### 預設快速路徑（`core` profile）

| 指令 | 用途 |
|---------|---------|
| `/opsx:propose` | 一步建立變更並產生規劃產物 |
| `/opsx:explore` | 在確認變更前先思考構想 |
| `/opsx:apply` | 實作變更中的任務 |
| `/opsx:archive` | 封存已完成的變更 |

### 擴充工作流程指令（自訂工作流程選擇）

| 指令 | 用途 |
|---------|---------|
| `/opsx:new` | 建立新的變更骨架 |
| `/opsx:continue` | 根據相依關係建立下一個產物 |
| `/opsx:ff` | Fast-forward：一次建立所有規劃產物 |
| `/opsx:verify` | 驗證實作是否符合產物 |
| `/opsx:sync` | 將差異規格合併至主規格 |
| `/opsx:bulk-archive` | 一次封存多個變更 |
| `/opsx:onboard` | 引導式完整工作流程教學 |

預設全域 profile 為 `core`。若要啟用擴充工作流程指令，請執行 `openspec config profile`，選擇 workflows，然後在你的專案中執行 `openspec update`。

---

## 指令參考

### `/opsx:propose`

一步建立新的變更並產生規劃產物。這是 `core` profile 中的預設起始指令。

**語法：**
```text
/opsx:propose [change-name-or-description]
```

**參數：**
| 參數 | 必填 | 說明 |
|----------|----------|-------------|
| `change-name-or-description` | 否 | Kebab-case 命名或自然語言的變更描述 |

**功能說明：**
- 建立 `openspec/changes/<change-name>/`
- 產生實作前所需的產物（`spec-driven` 模式：proposal、specs、design、tasks）
- 在變更準備好可執行 `/opsx:apply` 時停止

**範例：**
```text
You: /opsx:propose add-dark-mode

AI:  Created openspec/changes/add-dark-mode/
     ✓ proposal.md
     ✓ specs/ui/spec.md
     ✓ design.md
     ✓ tasks.md
     Ready for implementation. Run /opsx:apply.
```

**提示：**
- 此指令是最快的端對端路徑
- 若需要逐步控制產物，請啟用擴充工作流程，並改用 `/opsx:new` + `/opsx:continue`

---

### `/opsx:explore`

在確認變更之前，先思考構想、調查問題並釐清需求。

**語法：**
```
/opsx:explore [topic]
```

**參數：**
| 參數 | 必填 | 說明 |
|----------|----------|-------------|
| `topic` | 否 | 你想探索或調查的主題 |

**功能說明：**
- 開啟一個無需固定結構的探索性對話
- 調查程式碼庫以回答問題
- 比較各種選項與方法
- 建立視覺化圖表以釐清思路
- 當洞察結晶化後，可銜接至 `/opsx:propose`（預設）或 `/opsx:new`（擴充工作流程）

**範例：**
```text
You: /opsx:explore

AI:  What would you like to explore?

You: How should we handle authentication for the mobile app?

AI:  Let me investigate your current auth setup...
     [Analyzes codebase]

     I see you're using session-based auth for the web app.
     For mobile, we have three main options:

     1. JWT tokens (stateless, works offline)
     2. OAuth2 (if you need third-party login)
     3. Extend current sessions (simpler, but requires connectivity)

     Your API already has CORS configured. Which direction interests you?

You: Let's go with JWT. Can we start a change for that?

AI:  Ready when you are. Run /opsx:propose add-jwt-auth to begin.
```

**提示：**
- 適用於需求不明確或需要調查的情況
- 探索過程中不會建立任何產物
- 適合在決策前比較多種方法
- 可以讀取檔案並搜尋程式碼庫

---

### `/opsx:new`

建立新的變更骨架。建立變更資料夾後等待你以 `/opsx:continue` 或 `/opsx:ff` 產生產物。

此指令屬於擴充工作流程集（不包含在預設的 `core` profile 中）。

**語法：**
```
/opsx:new [change-name] [--schema <schema-name>]
```

**參數：**
| 參數 | 必填 | 說明 |
|----------|----------|-------------|
| `change-name` | 否 | 變更資料夾名稱（未提供時會提示輸入） |
| `--schema` | 否 | 要使用的工作流程 schema（預設：從設定檔或 `spec-driven`） |

**功能說明：**
- 建立 `openspec/changes/<change-name>/` 目錄
- 在變更資料夾中建立 `.openspec.yaml` 中繼資料檔案
- 顯示第一個可建立的產物範本
- 若未提供，則提示輸入變更名稱與 schema

**建立內容：**
```
openspec/changes/<change-name>/
└── .openspec.yaml    # 變更中繼資料（schema、建立日期）
```

**範例：**
```
You: /opsx:new add-dark-mode

AI:  Created openspec/changes/add-dark-mode/
     Schema: spec-driven

     Ready to create: proposal
     Use /opsx:continue to create it, or /opsx:ff to create all artifacts.
```

**提示：**
- 使用描述性名稱：`add-feature`、`fix-bug`、`refactor-module`
- 避免使用通用名稱，如 `update`、`changes`、`wip`
- Schema 也可在專案設定檔（`openspec/config.yaml`）中設定

---

### `/opsx:continue`

在相依鏈中建立下一個產物。每次建立一個產物，以實現漸進式進展。

**語法：**
```
/opsx:continue [change-name]
```

**參數：**
| 參數 | 必填 | 說明 |
|----------|----------|-------------|
| `change-name` | 否 | 要繼續的變更（未提供時從上下文推斷） |

**功能說明：**
- 查詢產物相依圖
- 顯示哪些產物已就緒，哪些被阻擋
- 建立第一個就緒的產物
- 讀取相依檔案以取得上下文
- 顯示建立完成後可使用的內容

**範例：**
```
You: /opsx:continue

AI:  Change: add-dark-mode

     Artifact status:
     ✓ proposal    (done)
     ◆ specs       (ready)
     ◆ design      (ready)
     ○ tasks       (blocked - needs: specs)

     Creating specs...

     [Reads proposal.md, creates specs based on requirements]

     ✓ Created openspec/changes/add-dark-mode/specs/ui/spec.md

     Now available: tasks
     Run /opsx:continue to create the next artifact.
```

**提示：**
- 適用於希望在繼續前檢視每個產物的情況
- 適合需要掌控的複雜變更
- 多個產物可能同時就緒
- 可以在繼續之前編輯已建立的產物

---

### `/opsx:ff`

快速前進完成產物建立。一次建立所有規劃產物。

**語法：**
```
/opsx:ff [change-name]
```

**參數：**
| 參數 | 必填 | 說明 |
|----------|----------|-------------|
| `change-name` | 否 | 要快速前進的變更（未提供時從上下文推斷） |

**功能說明：**
- 按相依順序建立所有產物
- 透過待辦清單追蹤進度
- 當所有 `apply-required` 產物完成時停止
- 建立下一個產物前先讀取每個相依項目

**範例：**
```
You: /opsx:ff add-dark-mode

AI:  Fast-forwarding add-dark-mode...

     ✓ Creating proposal.md
     ✓ Creating specs/ui/spec.md
     ✓ Creating design.md
     ✓ Creating tasks.md

     All planning artifacts complete!
     Ready for implementation. Run /opsx:apply to begin.
```

**提示：**
- 適用於對建置內容有清晰概念的情況
- 比 `/opsx:continue` 更快速地處理直接明瞭的變更
- 之後仍可編輯產物
- 適合中小型功能

---

### `/opsx:apply`

實作變更中的任務。逐一完成任務清單，撰寫程式碼並勾選已完成項目。

**語法：**
```
/opsx:apply [change-name]
```

**參數：**
| 參數 | 必填 | 說明 |
|----------|----------|-------------|
| `change-name` | 否 | 要實作的變更（未提供時從上下文推斷） |

**功能說明：**
- 讀取 `tasks.md` 並識別未完成的任務
- 逐一處理任務
- 視需要撰寫程式碼、建立檔案、執行測試
- 以核取方塊 `[x]` 標記已完成的任務

**範例：**
```
You: /opsx:apply

AI:  Implementing add-dark-mode...

     Reading tasks.md:
     - [ ] 1.1 Create ThemeContext
     - [ ] 1.2 Add CSS custom properties
     - [ ] 1.3 Implement localStorage persistence

     Working on 1.1: Create ThemeContext...
     [Creates src/context/ThemeContext.tsx]

     ✓ 1.1 Complete

     Working on 1.2: Add CSS custom properties...
     [Updates src/styles/globals.css]

     ✓ 1.2 Complete
     ...
```

**提示：**
- 若中斷可從上次中斷處繼續
- 可透過指定變更名稱來處理平行變更
- 完成狀態記錄在 `tasks.md` 的核取方塊中

---

### `/opsx:verify`

驗證實作是否符合你的變更產物。檢查完整性、正確性與一致性。

**語法：**
```
/opsx:verify [change-name]
```

**參數：**
| 參數 | 必填 | 說明 |
|----------|----------|-------------|
| `change-name` | 否 | 要驗證的變更（未提供時從上下文推斷） |

**功能說明：**
- 從三個維度檢查實作品質
- 搜尋程式碼庫中的實作佐證
- 將問題分類為 CRITICAL、WARNING 或 SUGGESTION 並回報
- 不會阻擋封存，但會將問題浮出

**驗證維度：**

| 維度 | 驗證內容 |
|-----------|-------------------|
| **Completeness（完整性）** | 所有任務完成、所有需求已實作、情境已涵蓋 |
| **Correctness（正確性）** | 實作符合規格意圖、邊界情況已處理 |
| **Coherence（一致性）** | 設計決策反映於程式碼、模式保持一致 |

**範例：**
```
You: /opsx:verify

AI:  Verifying add-dark-mode...

     COMPLETENESS
     ✓ All 8 tasks in tasks.md are checked
     ✓ All requirements in specs have corresponding code
     ⚠ Scenario "System preference detection" has no test coverage

     CORRECTNESS
     ✓ Implementation matches spec intent
     ✓ Edge cases from scenarios are handled
     ✓ Error states match spec definitions

     COHERENCE
     ✓ Design decisions reflected in code structure
     ✓ Naming conventions consistent with design.md
     ⚠ Design mentions "CSS variables" but implementation uses Tailwind classes

     SUMMARY
     ─────────────────────────────
     Critical issues: 0
     Warnings: 2
     Ready to archive: Yes (with warnings)

     Recommendations:
     1. Add test for system preference detection
     2. Update design.md to reflect Tailwind usage, or refactor to use CSS variables
```

**提示：**
- 在封存前執行以提早發現不符之處
- 警告不會阻擋封存，但表示潛在問題
- 適合在提交前審查 AI 的工作成果
- 可揭露產物與實作之間的落差

---

### `/opsx:sync`

**選用指令。** 將變更中的差異規格合併至主規格。封存時若尚未同步則會提示，因此通常不需要手動執行此指令。

**語法：**
```
/opsx:sync [change-name]
```

**參數：**
| 參數 | 必填 | 說明 |
|----------|----------|-------------|
| `change-name` | 否 | 要同步的變更（未提供時從上下文推斷） |

**功能說明：**
- 從變更資料夾讀取差異規格
- 解析 ADDED/MODIFIED/REMOVED/RENAMED 區塊
- 將變更合併至主 `openspec/specs/` 目錄
- 保留差異中未提及的既有內容
- 不會封存變更（保持活動狀態）

**範例：**
```text
You: /opsx:sync

AI:  Syncing add-dark-mode delta specs...

     Reading: openspec/changes/add-dark-mode/specs/ui/spec.md
     Target:  openspec/specs/ui/spec.md

     Changes to apply:
     ✓ ADDED: Theme Selection requirement (2 scenarios)
     ✓ ADDED: Accessibility requirement (1 scenario)

     Merging...
     ✓ openspec/specs/ui/spec.md updated

     Change remains active. Run /opsx:archive when ready to complete.
```

**手動使用時機：**

| 情境 | 使用 sync？ |
|----------|-----------|
| 長期執行的變更，希望在封存前將規格更新至主線 | 是 |
| 多個平行變更需要使用已更新的基礎規格 | 是 |
| 想單獨預覽／審查合併內容 | 是 |
| 快速變更，直接封存 | 否（封存時會自動處理） |

**提示：**
- Sync 是智慧合併，而非單純複製貼上
- 可在不重複的情況下將情境加入既有需求
- Sync 後變更仍保持活動狀態（未封存）
- 大多數使用者不需要直接呼叫此指令——封存時會在需要時提示

---

### `/opsx:archive`

封存已完成的變更。完成變更並將其移至封存資料夾。

**語法：**
```
/opsx:archive [change-name]
```

**參數：**
| 參數 | 必填 | 說明 |
|----------|----------|-------------|
| `change-name` | 否 | 要封存的變更（未提供時從上下文推斷） |

**功能說明：**
- 檢查產物完成狀態
- 檢查任務完成情況（若未完成則警告）
- 若差異規格尚未同步，則提供同步選項
- 將變更資料夾移至 `openspec/changes/archive/YYYY-MM-DD-<name>/`
- 保留所有產物以供稽核

**範例：**
```text
You: /opsx:archive

AI:  Archiving add-dark-mode...

     Artifact status:
     ✓ proposal.md exists
     ✓ specs/ exists
     ✓ design.md exists
     ✓ tasks.md exists (8/8 tasks complete)

     Delta specs: Not yet synced
     → Sync now? (recommended)

You: Yes

AI:  ✓ Synced specs to openspec/specs/ui/spec.md
     ✓ Moved to openspec/changes/archive/2025-01-24-add-dark-mode/

     Change archived successfully.
```

**提示：**
- 封存不會因任務未完成而阻擋，但會發出警告
- 差異規格可在封存時或事先同步
- 已封存的變更會保留作為歷史記錄
- 建議先執行 `/opsx:verify` 以發現問題

---

### `/opsx:bulk-archive`

一次封存多個已完成的變更。處理變更之間的規格衝突。

**語法：**
```
/opsx:bulk-archive [change-names...]
```

**參數：**
| 參數 | 必填 | 說明 |
|----------|----------|-------------|
| `change-names` | 否 | 要封存的特定變更（未提供時提示選擇） |

**功能說明：**
- 列出所有已完成的變更
- 封存前驗證每個變更
- 偵測變更間的規格衝突
- 透過檢查實際已實作的內容來解決衝突
- 按時間順序封存

**範例：**
```
You: /opsx:bulk-archive

AI:  Found 3 completed changes:
     - add-dark-mode (8/8 tasks complete)
     - fix-login-bug (3/3 tasks complete)
     - update-footer (2/2 tasks complete)

     Checking for spec conflicts...
     ⚠ add-dark-mode and update-footer both touch specs/ui/

     Inspecting codebase to resolve...
     Both changes are implemented. Will merge in chronological order:
     1. add-dark-mode (created Jan 20)
     2. update-footer (created Jan 22)

     Archive all 3 changes?

You: Yes

AI:  ✓ Archived add-dark-mode
     ✓ Archived fix-login-bug
     ✓ Archived update-footer
     Specs merged: add-dark-mode → update-footer
```

**提示：**
- 適合平行工作流程
- 衝突解決具有代理能力（會檢查程式碼庫）
- 變更依建立順序封存
- 覆寫規格內容前會提示確認

---

### `/opsx:onboard`

引導式完整 OpenSpec 工作流程教學。使用你實際的程式碼庫進行互動式教學。

**語法：**
```
/opsx:onboard
```

**功能說明：**
- 搭配說明逐步走過完整工作流程循環
- 掃描你的程式碼庫以尋找真實的改進機會
- 以真實產物建立一個實際變更
- 實作實際工作（小型且安全的變更）
- 封存已完成的變更
- 執行每個步驟時加以說明

**階段：**
1. 歡迎與程式碼庫分析
2. 找出改進機會
3. 建立變更（`/opsx:new`）
4. 撰寫 proposal
5. 建立 specs
6. 撰寫 design
7. 建立 tasks
8. 實作任務（`/opsx:apply`）
9. 驗證實作
10. 封存變更
11. 總結與下一步

**範例：**
```
You: /opsx:onboard

AI:  Welcome to OpenSpec!

     I'll walk you through the complete workflow using your actual codebase.
     We'll find something small to improve, create a proper change for it,
     implement it, and archive it.

     Let me scan your codebase for opportunities...

     [Analyzes codebase]

     I found a few things we could work on:
     1. Add input validation to the contact form
     2. Improve error messages in the auth flow
     3. Add loading states to async buttons

     Which interests you? (or suggest something else)
```

**提示：**
- 最適合學習工作流程的新使用者
- 使用真實程式碼，而非玩具範例
- 建立可保留或捨棄的真實變更
- 完成需時 15-30 分鐘

---

## 各 AI 工具的指令語法

不同的 AI 工具使用略有不同的指令語法。請使用符合你所用工具的格式：

| 工具 | 語法範例 |
|------|----------------|
| Claude Code | `/opsx:propose`、`/opsx:apply` |
| Cursor | `/opsx-propose`、`/opsx-apply` |
| Windsurf | `/opsx-propose`、`/opsx-apply` |
| Copilot (IDE) | `/opsx-propose`、`/opsx-apply` |
| Trae | 基於 Skill 的呼叫方式，例如 `/openspec-propose`、`/openspec-apply-change`（不產生 `opsx-*` 指令檔案） |

各工具的意圖相同，但指令呈現方式可能因整合方式而有所不同。

> **注意：** GitHub Copilot 指令（`.github/prompts/*.prompt.md`）僅適用於 IDE 擴充功能（VS Code、JetBrains、Visual Studio）。GitHub Copilot CLI 目前不支援自訂 prompt 檔案——詳情與替代方案請參閱 [Supported Tools](supported-tools.md)。

---

## 舊版指令

這些指令使用較舊的「一次性」工作流程。仍可使用，但建議改用 OPSX 指令。

| 指令 | 功能說明 |
|---------|--------------|
| `/openspec:proposal` | 一次建立所有產物（proposal、specs、design、tasks） |
| `/openspec:apply` | 實作變更 |
| `/openspec:archive` | 封存變更 |

**使用舊版指令的時機：**
- 使用舊版工作流程的既有專案
- 不需要漸進式產物建立的簡單變更
- 偏好全有或全無的方式

**遷移至 OPSX：**
舊版變更可以繼續使用 OPSX 指令操作。產物結構是相容的。

---

## 疑難排解

### "Change not found"

指令無法識別要操作哪個變更。

**解決方案：**
- 明確指定變更名稱：`/opsx:apply add-dark-mode`
- 確認變更資料夾存在：`openspec list`
- 確認你在正確的專案目錄中

### "No artifacts ready"

所有產物不是已完成就是被缺少的相依項目阻擋。

**解決方案：**
- 執行 `openspec status --change <name>` 查看阻擋原因
- 確認所需產物是否存在
- 先建立缺少的相依產物

### "Schema not found"

指定的 schema 不存在。

**解決方案：**
- 列出可用的 schema：`openspec schemas`
- 確認 schema 名稱的拼寫
- 若為自訂 schema，請建立它：`openspec schema init <name>`

### 指令未被識別

AI 工具無法識別 OpenSpec 指令。

**解決方案：**
- 確認 OpenSpec 已初始化：`openspec init`
- 重新產生 skill：`openspec update`
- 確認 `.claude/skills/` 目錄存在（適用於 Claude Code）
- 重新啟動你的 AI 工具以載入新的 skill

### 產物未正確產生

AI 建立了不完整或不正確的產物。

**解決方案：**
- 在 `openspec/config.yaml` 中加入專案上下文
- 針對特定指引加入各產物的規則
- 在變更描述中提供更多細節
- 改用 `/opsx:continue` 而非 `/opsx:ff` 以獲得更多掌控

---

## 下一步

- [Workflows](workflows.md) - 常見模式與各指令的使用時機
- [CLI](cli.md) - 管理與驗證的終端機指令
- [Customization](customization.md) - 建立自訂 schema 與工作流程

### 本文原始連結

[OpenSpec 官方文件](https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md)

---
sidebar_position: 9
title: "OPSX 工作流程說明"
description: "OPSX 是 OpenSpec 的標準工作流程，採用流動式、迭代式方法取代傳統的階段式開發流程，完整說明架構、Schema 與自訂方式"
tags: [OpenSpec, OPSX]
last_update:
  date: 2026-04-13
  author: Danny
---

# OPSX 工作流程

> 歡迎在 [Discord](https://discord.gg/YctCnvvshC) 提供回饋。

## 什麼是 OPSX？

OPSX 現在是 OpenSpec 的標準工作流程。

它是一套針對 OpenSpec 變更的**流動式、迭代式工作流程**。不再有僵化的階段——只有你可以隨時執行的動作。

## 為什麼需要它？

舊版 OpenSpec 工作流程雖然可用，但**限制太多**：

- **指令寫死在程式碼裡** — 埋在 TypeScript 中，你無法修改
- **全有或全無** — 一個大型指令建立所有東西，無法單獨測試各個部分
- **固定結構** — 所有人用同一套工作流程，無法自訂
- **黑盒子** — AI 輸出不好時，你無法調整 prompt

**OPSX 打開了這個限制。** 現在任何人都能：

1. **實驗指令** — 編輯範本，看看 AI 是否表現更好
2. **細粒度測試** — 獨立驗證每個 artifact 的指令
3. **自訂工作流程** — 定義你自己的 artifacts 和依賴關係
4. **快速迭代** — 修改範本，立即測試，無需重新建置

```
Legacy workflow:                      OPSX:
┌────────────────────────┐           ┌────────────────────────┐
│  Hardcoded in package  │           │  schema.yaml           │◄── You edit this
│  (can't change)        │           │  templates/*.md        │◄── Or this
│        ↓               │           │        ↓               │
│  Wait for new release  │           │  Instant effect        │
│        ↓               │           │        ↓               │
│  Hope it's better      │           │  Test it yourself      │
└────────────────────────┘           └────────────────────────┘
```

**這適合所有人：**
- **團隊** — 建立真正符合你工作方式的工作流程
- **進階使用者** — 調整 prompt 以針對你的程式庫獲得更好的 AI 輸出
- **OpenSpec 貢獻者** — 不需要發布新版本即可實驗新方法

我們都還在學習什麼方法最有效。OPSX 讓我們一起學習。

## 使用者體驗

**線性工作流程的問題：**
你處於「規劃階段」，然後進入「實作階段」，然後「完成」。但實際工作不是這樣進行的。你實作某個功能，發現設計有誤，需要更新規格，再繼續實作。線性階段與實際工作方式相悖。

**OPSX 的做法：**
- **動作，而非階段** — 建立、實作、更新、封存——隨時都可以做
- **依賴關係是推進器** — 它們顯示什麼是可能的，而不是規定下一步必須做什麼

```
  proposal ──→ specs ──→ design ──→ tasks ──→ implement
```

## 安裝設定

```bash
# 確保已安裝 openspec — skills 會自動產生
openspec init
```

這會在 `.claude/skills/`（或對應路徑）建立 skills，AI 程式助手會自動偵測。

預設情況下，OpenSpec 使用 `core` workflow profile（`propose`、`explore`、`apply`、`archive`）。如果你想要擴充工作流程指令（`new`、`continue`、`ff`、`verify`、`sync`、`bulk-archive`、`onboard`），請使用 `openspec config profile` 設定，並以 `openspec update` 套用。

安裝過程中，你會被提示建立一個**專案設定檔**（`openspec/config.yaml`）。這是選用的，但建議建立。

## 專案設定

專案設定讓你可以設定預設值，並將專案特定的 context 注入所有 artifacts。

### 建立設定檔

設定檔可在 `openspec init` 時建立，或手動建立：

```yaml
# openspec/config.yaml
schema: spec-driven

context: |
  Tech stack: TypeScript, React, Node.js
  API conventions: RESTful, JSON responses
  Testing: Vitest for unit tests, Playwright for e2e
  Style: ESLint with Prettier, strict TypeScript

rules:
  proposal:
    - Include rollback plan
    - Identify affected teams
  specs:
    - Use Given/When/Then format for scenarios
  design:
    - Include sequence diagrams for complex flows
```

### 設定欄位

| Field | Type | 說明 |
|-------|------|------|
| `schema` | string | 新變更的預設 schema（例如 `spec-driven`） |
| `context` | string | 注入所有 artifact 指令的專案 context |
| `rules` | object | 以 artifact ID 為鍵的各 artifact 規則 |

### 運作方式

**Schema 優先順序**（由高到低）：
1. CLI 旗標（`--schema <name>`）
2. 變更 metadata（變更目錄下的 `.openspec.yaml`）
3. 專案設定（`openspec/config.yaml`）
4. 預設值（`spec-driven`）

**Context 注入：**
- Context 會加在每個 artifact 指令的前面
- 以 `<context>...</context>` 標籤包覆
- 幫助 AI 理解你專案的慣例

**Rules 注入：**
- Rules 只注入到對應的 artifacts
- 以 `<rules>...</rules>` 標籤包覆
- 出現在 context 之後、範本之前

### 各 Schema 的 Artifact ID

**spec-driven**（預設）：
- `proposal` — 變更提案
- `specs` — 規格說明
- `design` — 技術設計
- `tasks` — 實作任務

### 設定驗證

- `rules` 中未知的 artifact ID 會產生警告
- Schema 名稱會與可用的 schemas 進行驗證
- Context 有 50KB 的大小限制
- 無效的 YAML 會附帶行號回報

### 疑難排解

**「Unknown artifact ID in rules: X」**
- 確認 artifact ID 符合你的 schema（見上方清單）
- 執行 `openspec schemas --json` 查看各 schema 的 artifact ID

**設定未套用：**
- 確認檔案位於 `openspec/config.yaml`（不是 `.yml`）
- 用驗證工具檢查 YAML 語法
- 設定變更立即生效（不需要重新啟動）

**Context 過大：**
- Context 限制為 50KB
- 改為摘要或連結到外部文件

## 指令

| 指令 | 說明 |
|------|------|
| `/opsx:propose` | 一步建立變更並產生規劃 artifacts（預設快速路徑） |
| `/opsx:explore` | 思考構想、調查問題、釐清需求 |
| `/opsx:new` | 建立新的變更架構（擴充工作流程） |
| `/opsx:continue` | 建立下一個 artifact（擴充工作流程） |
| `/opsx:ff` | 快進產生規劃 artifacts（擴充工作流程） |
| `/opsx:apply` | 實作任務，視需要更新 artifacts |
| `/opsx:verify` | 驗證實作是否符合 artifacts（擴充工作流程） |
| `/opsx:sync` | 將 delta specs 同步到 main（擴充工作流程，選用） |
| `/opsx:archive` | 完成後封存 |
| `/opsx:bulk-archive` | 一次封存多個已完成的變更（擴充工作流程） |
| `/opsx:onboard` | 端到端變更的引導式教學（擴充工作流程） |

## 使用方式

### 探索一個構想
```
/opsx:explore
```
思考構想、調查問題、比較選項。不需要任何結構——只是一個思考夥伴。當洞察成形後，轉移到 `/opsx:propose`（預設）或 `/opsx:new`/`/opsx:ff`（擴充）。

### 開始一個新變更
```
/opsx:propose
```
建立變更並產生實作前所需的規劃 artifacts。

如果你已啟用擴充工作流程，也可以使用：

```text
/opsx:new        # 僅建立架構
/opsx:continue   # 一次建立一個 artifact
/opsx:ff         # 一次建立所有規劃 artifacts
```

### 建立 Artifacts
```
/opsx:continue
```
根據依賴關係顯示可以建立的項目，然後建立一個 artifact。重複使用以逐步建立你的變更。

```
/opsx:ff add-dark-mode
```
一次建立所有規劃 artifacts。當你對要建立的東西有清晰的認識時使用。

### 實作（流動式部分）
```
/opsx:apply
```
逐步處理任務，完成後打勾。如果你同時有多個變更在進行，可以執行 `/opsx:apply <name>`；否則它應該能從對話中推斷，無法判斷時會提示你選擇。

### 收尾
```
/opsx:archive   # 完成後移至封存（若需要同步 specs 會提示）
```

## 何時更新 vs. 重新開始

你隨時可以在實作前編輯提案或規格。但什麼時候「細化」會變成「這是不同的工作」？

### 提案涵蓋的內容

一個提案定義三件事：
1. **意圖** — 你在解決什麼問題？
2. **範圍** — 什麼在/不在界限之內？
3. **方法** — 你將如何解決它？

問題是：哪些改變了，改變了多少？

### 何時更新現有變更：

**相同意圖，細化執行方式**
- 你發現之前沒考慮到的邊際情況
- 方法需要調整，但目標沒變
- 實作過程中發現設計稍有偏差

**範圍縮小**
- 你意識到完整範圍太大，想先發布 MVP
- 「新增深色模式」→「新增深色模式切換（系統偏好設定在 v2）」

**學習驅動的修正**
- 程式庫結構不如預期
- 某個依賴套件的行為不如預期
- 「使用 CSS variables」→「改用 Tailwind 的 dark: 前綴」

### 何時開始新變更：

**意圖根本改變**
- 問題本身已經不同了
- 「新增深色模式」→「新增包含自訂顏色、字體、間距的完整主題系統」

**範圍爆炸**
- 變更增長太多，實質上已是不同的工作
- 更新後原始提案會面目全非
- 「修復登入 bug」→「重寫驗證系統」

**原始變更可以完成**
- 原始變更可以標記為「完成」
- 新工作可以獨立存在，不是細化
- 完成「新增深色模式 MVP」→ 封存 → 新變更「強化深色模式」

### 判斷原則

```
                        ┌─────────────────────────────────────┐
                        │     Is this the same work?          │
                        └──────────────┬──────────────────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
                    ▼                  ▼                  ▼
             Same intent?      >50% overlap?      Can original
             Same problem?     Same scope?        be "done" without
                    │                  │          these changes?
                    │                  │                  │
          ┌────────┴────────┐  ┌──────┴──────┐   ┌───────┴───────┐
          │                 │  │             │   │               │
         YES               NO YES           NO  NO              YES
          │                 │  │             │   │               │
          ▼                 ▼  ▼             ▼   ▼               ▼
       UPDATE            NEW  UPDATE       NEW  UPDATE          NEW
```

| 測試 | 更新 | 新變更 |
|------|------|--------|
| **身份** | 「相同事物，細化」 | 「不同的工作」 |
| **範圍重疊** | &gt;50% 重疊 | &lt;50% 重疊 |
| **完成度** | 沒有這些變更就無法「完成」 | 可以完成原始工作，新工作獨立存在 |
| **故事性** | 更新鏈可以說出連貫故事 | 補丁反而讓人更混亂 |

### 原則

> **更新保留 context。新變更提供清晰度。**
>
> 當思考的歷程有價值時，選擇更新。
> 當重新開始比打補丁更清晰時，選擇新建。

就像 git 分支：
- 在同一個功能上持續 commit
- 真正是新工作時開新分支
- 有時合併部分功能，再重新開始第二階段

## 有什麼不同？

| | 舊版（`/openspec:proposal`） | OPSX（`/opsx:*`） |
|---|---|---|
| **結構** | 一個大型提案文件 | 具有依賴關係的個別 artifacts |
| **工作流程** | 線性階段：規劃 → 實作 → 封存 | 流動式動作——隨時都可以做任何事 |
| **迭代** | 回頭修改很麻煩 | 隨著學習更新 artifacts |
| **自訂性** | 固定結構 | Schema 驅動（定義你自己的 artifacts） |

**核心洞察：** 工作不是線性的。OPSX 停止假裝它是。

## 架構深度解析

本節說明 OPSX 的底層運作方式，以及它與舊版工作流程的比較。
本節範例使用擴充指令集（`new`、`continue` 等）；預設 `core` 使用者可以將相同流程對應到 `propose → apply → archive`。

### 哲學：階段 vs 動作

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LEGACY WORKFLOW                                      │
│                    (Phase-Locked, All-or-Nothing)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐             │
│   │   PLANNING   │ ───► │ IMPLEMENTING │ ───► │   ARCHIVING  │             │
│   │    PHASE     │      │    PHASE     │      │    PHASE     │             │
│   └──────────────┘      └──────────────┘      └──────────────┘             │
│         │                     │                     │                       │
│         ▼                     ▼                     ▼                       │
│   /openspec:proposal   /openspec:apply      /openspec:archive              │
│                                                                             │
│   • Creates ALL artifacts at once                                          │
│   • Can't go back to update specs during implementation                    │
│   • Phase gates enforce linear progression                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                            OPSX WORKFLOW                                     │
│                      (Fluid Actions, Iterative)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│              ┌────────────────────────────────────────────┐                 │
│              │           ACTIONS (not phases)             │                 │
│              │                                            │                 │
│              │   new ◄──► continue ◄──► apply ◄──► archive │                 │
│              │    │          │           │           │    │                 │
│              │    └──────────┴───────────┴───────────┘    │                 │
│              │              any order                     │                 │
│              └────────────────────────────────────────────┘                 │
│                                                                             │
│   • Create artifacts one at a time OR fast-forward                         │
│   • Update specs/design/tasks during implementation                        │
│   • Dependencies enable progress, phases don't exist                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 元件架構

**舊版工作流程**使用寫死在 TypeScript 中的範本：

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      LEGACY WORKFLOW COMPONENTS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Hardcoded Templates (TypeScript strings)                                  │
│                    │                                                        │
│                    ▼                                                        │
│   Tool-specific configurators/adapters                                      │
│                    │                                                        │
│                    ▼                                                        │
│   Generated Command Files (.claude/commands/openspec/*.md)                  │
│                                                                             │
│   • Fixed structure, no artifact awareness                                  │
│   • Change requires code modification + rebuild                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**OPSX** 使用外部 schemas 和依賴圖引擎：

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         OPSX COMPONENTS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Schema Definitions (YAML)                                                 │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  name: spec-driven                                                  │   │
│   │  artifacts:                                                         │   │
│   │    - id: proposal                                                   │   │
│   │      generates: proposal.md                                         │   │
│   │      requires: []              ◄── Dependencies                     │   │
│   │    - id: specs                                                      │   │
│   │      generates: specs/**/*.md  ◄── Glob patterns                    │   │
│   │      requires: [proposal]      ◄── Enables after proposal           │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                    │                                                        │
│                    ▼                                                        │
│   Artifact Graph Engine                                                     │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  • Topological sort (dependency ordering)                           │   │
│   │  • State detection (filesystem existence)                           │   │
│   │  • Rich instruction generation (templates + context)                │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                    │                                                        │
│                    ▼                                                        │
│   Skill Files (.claude/skills/openspec-*/SKILL.md)                          │
│                                                                             │
│   • Cross-editor compatible (Claude Code, Cursor, Windsurf)                 │
│   • Skills query CLI for structured data                                    │
│   • Fully customizable via schema files                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 依賴圖模型

Artifacts 形成有向無環圖（DAG）。依賴關係是**推進器**，而非關卡：

```
                              proposal
                             (root node)
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
                 specs                       design
              (requires:                  (requires:
               proposal)                   proposal)
                    │                           │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                               tasks
                           (requires:
                           specs, design)
                                  │
                                  ▼
                          ┌──────────────┐
                          │ APPLY PHASE  │
                          │ (requires:   │
                          │  tasks)      │
                          └──────────────┘
```

**狀態轉換：**

```
   BLOCKED ────────────────► READY ────────────────► DONE
      │                        │                       │
   Missing                  All deps               File exists
   dependencies             are DONE               on filesystem
```

### 資訊流

**舊版工作流程** — agent 接收靜態指令：

```
  User: "/openspec:proposal"
           │
           ▼
  ┌─────────────────────────────────────────┐
  │  Static instructions:                   │
  │  • Create proposal.md                   │
  │  • Create tasks.md                      │
  │  • Create design.md                     │
  │  • Create specs/<capability>/spec.md    │
  │                                         │
  │  No awareness of what exists or         │
  │  dependencies between artifacts         │
  └─────────────────────────────────────────┘
           │
           ▼
  Agent creates ALL artifacts in one go
```

**OPSX** — agent 查詢豐富的 context：

```
  User: "/opsx:continue"
           │
           ▼
  ┌──────────────────────────────────────────────────────────────────────────┐
  │  Step 1: Query current state                                             │
  │  ┌────────────────────────────────────────────────────────────────────┐  │
  │  │  $ openspec status --change "add-auth" --json                      │  │
  │  │                                                                    │  │
  │  │  {                                                                 │  │
  │  │    "artifacts": [                                                  │  │
  │  │      {"id": "proposal", "status": "done"},                         │  │
  │  │      {"id": "specs", "status": "ready"},      ◄── First ready      │  │
  │  │      {"id": "design", "status": "ready"},                          │  │
  │  │      {"id": "tasks", "status": "blocked", "missingDeps": ["specs"]}│  │
  │  │    ]                                                               │  │
  │  │  }                                                                 │  │
  │  └────────────────────────────────────────────────────────────────────┘  │
  │                                                                          │
  │  Step 2: Get rich instructions for ready artifact                        │
  │  ┌────────────────────────────────────────────────────────────────────┐  │
  │  │  $ openspec instructions specs --change "add-auth" --json          │  │
  │  │                                                                    │  │
  │  │  {                                                                 │  │
  │  │    "template": "# Specification\n\n## ADDED Requirements...",      │  │
  │  │    "dependencies": [{"id": "proposal", "path": "...", "done": true}│  │
  │  │    "unlocks": ["tasks"]                                            │  │
  │  │  }                                                                 │  │
  │  └────────────────────────────────────────────────────────────────────┘  │
  │                                                                          │
  │  Step 3: Read dependencies → Create ONE artifact → Show what's unlocked  │
  └──────────────────────────────────────────────────────────────────────────┘
```

### 迭代模型

**舊版工作流程** — 迭代很麻煩：

```
  ┌─────────┐     ┌─────────┐     ┌─────────┐
  │/proposal│ ──► │ /apply  │ ──► │/archive │
  └─────────┘     └─────────┘     └─────────┘
       │               │
       │               ├── "Wait, the design is wrong"
       │               │
       │               ├── Options:
       │               │   • Edit files manually (breaks context)
       │               │   • Abandon and start over
       │               │   • Push through and fix later
       │               │
       │               └── No official "go back" mechanism
       │
       └── Creates ALL artifacts at once
```

**OPSX** — 自然的迭代：

```
  /opsx:new ───► /opsx:continue ───► /opsx:apply ───► /opsx:archive
      │                │                  │
      │                │                  ├── "The design is wrong"
      │                │                  │
      │                │                  ▼
      │                │            Just edit design.md
      │                │            and continue!
      │                │                  │
      │                │                  ▼
      │                │         /opsx:apply picks up
      │                │         where you left off
      │                │
      │                └── Creates ONE artifact, shows what's unlocked
      │
      └── Scaffolds change, waits for direction
```

### 自訂 Schemas

使用 schema 管理指令建立自訂工作流程：

```bash
# 從頭建立新 schema（互動式）
openspec schema init my-workflow

# 或以現有 schema 為基礎 fork
openspec schema fork spec-driven my-workflow

# 驗證 schema 結構
openspec schema validate my-workflow

# 查看 schema 的解析來源（對除錯很有用）
openspec schema which my-workflow
```

Schemas 儲存在 `openspec/schemas/`（專案本地，版本控制）或 `~/.local/share/openspec/schemas/`（使用者全域）。

**Schema 結構：**
```
openspec/schemas/research-first/
├── schema.yaml
└── templates/
    ├── research.md
    ├── proposal.md
    └── tasks.md
```

**schema.yaml 範例：**
```yaml
name: research-first
artifacts:
  - id: research        # Added before proposal
    generates: research.md
    requires: []

  - id: proposal
    generates: proposal.md
    requires: [research]  # Now depends on research

  - id: tasks
    generates: tasks.md
    requires: [proposal]
```

**依賴圖：**
```
   research ──► proposal ──► tasks
```

### 總結

| 面向 | 舊版 | OPSX |
|------|------|------|
| **範本** | 寫死在 TypeScript | 外部 YAML + Markdown |
| **依賴關係** | 無（一次全部） | DAG 拓撲排序 |
| **狀態** | 以階段為基礎的心智模型 | 檔案系統存在狀態 |
| **自訂性** | 修改原始碼，重新建置 | 建立 schema.yaml |
| **迭代** | 階段鎖定 | 流動式，可編輯任何內容 |
| **編輯器支援** | 工具特定的設定器/轉接器 | 單一 skills 目錄 |

## Schemas

Schemas 定義存在哪些 artifacts 及其依賴關係。目前可用的 schemas：

- **spec-driven**（預設）：proposal → specs → design → tasks

```bash
# 列出可用的 schemas
openspec schemas

# 查看所有 schemas 及其解析來源
openspec schema which --all

# 互動式建立新 schema
openspec schema init my-workflow

# Fork 現有 schema 進行自訂
openspec schema fork spec-driven my-workflow

# 在使用前驗證 schema 結構
openspec schema validate my-workflow
```

## 技巧

- 在確定變更前，使用 `/opsx:explore` 思考構想
- 知道要做什麼時用 `/opsx:ff`，探索中時用 `/opsx:continue`
- 在 `/opsx:apply` 過程中，如果出了問題——修正 artifact，然後繼續
- 任務透過 `tasks.md` 中的核取方塊追蹤進度
- 隨時查看狀態：`openspec status --change "name"`

## 回饋

這還很粗糙。這是刻意的——我們正在學習什麼方法最有效。

發現 bug？有想法？加入我們的 [Discord](https://discord.gg/YctCnvvshC) 或在 [GitHub](https://github.com/Fission-AI/openspec/issues) 開 issue。

### 本文原始連結

[OpenSpec 官方文件](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md)

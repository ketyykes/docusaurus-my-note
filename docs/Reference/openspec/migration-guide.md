---
sidebar_position: 11
title: "OpenSpec 遷移指南"
description: "從舊版 OpenSpec 工作流程遷移至 OPSX 的完整指南，包含遷移步驟、新舊指令對照、config.yaml 設定與疑難排解"
tags: [OpenSpec, OPSX]
last_update:
  date: 2026-04-13
  author: Danny
---

# 遷移至 OPSX

本指南協助你從舊版 OpenSpec 工作流程轉移至 OPSX。遷移過程設計得相當平滑——你現有的工作都會保留，而新系統提供更多彈性。

## 有什麼改變？

OPSX 以流動式、動作導向的方法取代舊版的階段鎖定工作流程。以下是關鍵轉變：

| 面向 | 舊版 | OPSX |
|------|------|------|
| **指令** | `/openspec:proposal`、`/openspec:apply`、`/openspec:archive` | 預設：`/opsx:propose`、`/opsx:apply`、`/opsx:archive`（擴充工作流程指令為選用） |
| **工作流程** | 一次建立所有 artifacts | 逐步或一次建立——由你決定 |
| **回頭修改** | 麻煩的階段關卡 | 自然——隨時更新任何 artifact |
| **自訂性** | 固定結構 | Schema 驅動，完全可自訂 |
| **設定** | `CLAUDE.md` 含標記 + `project.md` | 乾淨的 `openspec/config.yaml` |

**哲學轉變：** 工作不是線性的。OPSX 停止假裝它是。

---

## 開始前的準備

### 你現有的工作是安全的

遷移過程以保留為設計前提：

- **`openspec/changes/` 中的進行中變更** — 完整保留。你可以繼續使用 OPSX 指令處理它們。
- **已封存的變更** — 不受影響。你的歷史記錄完整保留。
- **`openspec/specs/` 中的主規格** — 不受影響。這些是你的真實來源。
- **你在 CLAUDE.md、AGENTS.md 等檔案中的內容** — 保留。只有 OpenSpec 標記區塊會被移除；你撰寫的所有內容都保留。

### 什麼會被移除

只有正在被替換的 OpenSpec 管理檔案：

| 項目 | 原因 |
|------|------|
| 舊版 slash command 目錄／檔案 | 由新的 skills 系統取代 |
| `openspec/AGENTS.md` | 過時的工作流程觸發器 |
| `CLAUDE.md`、`AGENTS.md` 等檔案中的 OpenSpec 標記 | 不再需要 |

**各工具的舊版 command 位置**（範例——你的工具位置可能不同）：

- Claude Code：`.claude/commands/openspec/`
- Cursor：`.cursor/commands/openspec-*.md`
- Windsurf：`.windsurf/workflows/openspec-*.md`
- Cline：`.clinerules/workflows/openspec-*.md`
- Roo：`.roo/commands/openspec-*.md`
- GitHub Copilot：`.github/prompts/openspec-*.prompt.md`（僅限 IDE 擴充套件；Copilot CLI 不支援）
- 其他（Augment、Continue、Amazon Q 等）

遷移程序會偵測你已設定的工具並清除其舊版檔案。

移除清單看起來很長，但這些都是 OpenSpec 原本建立的檔案。你自己的內容永遠不會被刪除。

### 需要你注意的地方

有一個檔案需要手動遷移：

**`openspec/project.md`** — 這個檔案不會自動刪除，因為它可能包含你撰寫的專案 context。你需要：

1. 查看其內容
2. 將有用的 context 移至 `openspec/config.yaml`（見下方說明）
3. 準備好後刪除此檔案

**為什麼做這個改變：**

舊版 `project.md` 是被動的——agents 可能讀它，也可能不讀，或者讀了之後忘記。我們發現可靠性不穩定。

新的 `config.yaml` context 會**主動注入每個 OpenSpec 規劃請求**。這意味著當 AI 建立 artifacts 時，你的專案慣例、技術棧和規則始終存在。可靠性更高。

**取捨：**

由於 context 會注入每個請求，你需要保持簡潔。專注在真正重要的事情上：
- 技術棧和關鍵慣例
- AI 需要了解的非顯而易見的限制
- 之前經常被忽略的規則

不用擔心要做到完美。我們仍在學習什麼方法最有效，並且會隨著實驗持續改進 context 注入的方式。

---

## 執行遷移

`openspec init` 和 `openspec update` 都能偵測舊版檔案並引導你完成相同的清理流程。使用適合你情況的那個：

- 新安裝預設使用 `core` profile（`propose`、`explore`、`apply`、`archive`）。
- 遷移安裝會透過在需要時寫入 `custom` profile 來保留你之前安裝的工作流程。

### 使用 `openspec init`

如果你想新增工具或重新設定哪些工具，請執行：

```bash
openspec init
```

init 指令會偵測舊版檔案並引導你完成清理：

```
Upgrading to the new OpenSpec

OpenSpec now uses agent skills, the emerging standard across coding
agents. This simplifies your setup while keeping everything working
as before.

Files to remove
No user content to preserve:
  • .claude/commands/openspec/
  • openspec/AGENTS.md

Files to update
OpenSpec markers will be removed, your content preserved:
  • CLAUDE.md
  • AGENTS.md

Needs your attention
  • openspec/project.md
    We won't delete this file. It may contain useful project context.

    The new openspec/config.yaml has a "context:" section for planning
    context. This is included in every OpenSpec request and works more
    reliably than the old project.md approach.

    Review project.md, move any useful content to config.yaml's context
    section, then delete the file when ready.

? Upgrade and clean up legacy files? (Y/n)
```

**當你回答「是」後會發生什麼：**

1. 舊版 slash command 目錄被移除
2. OpenSpec 標記從 `CLAUDE.md`、`AGENTS.md` 等檔案中被清除（你的內容保留）
3. `openspec/AGENTS.md` 被刪除
4. 新的 skills 安裝在 `.claude/skills/`
5. `openspec/config.yaml` 以預設 schema 建立

### 使用 `openspec update`

如果你只想遷移並將現有工具更新至最新版本，請執行：

```bash
openspec update
```

update 指令也會偵測並清理舊版 artifacts，然後重新整理產生的 skills/commands 以符合你目前的 profile 和 delivery 設定。

### 非互動式／CI 環境

適用於腳本化遷移：

```bash
openspec init --force --tools claude
```

`--force` 旗標會跳過提示並自動接受清理。

---

## 將 project.md 遷移至 config.yaml

舊版 `openspec/project.md` 是一個自由格式的 markdown 檔案，用於存放專案 context。新的 `openspec/config.yaml` 是結構化的，且最關鍵的是——**注入每個規劃請求**，讓你的慣例在 AI 工作時始終存在。

### 遷移前（project.md）

```markdown
# Project Context

This is a TypeScript monorepo using React and Node.js.
We use Jest for testing and follow strict ESLint rules.
Our API is RESTful and documented in docs/api.md.

## Conventions

- All public APIs must maintain backwards compatibility
- New features should include tests
- Use Given/When/Then format for specifications
```

### 遷移後（config.yaml）

```yaml
schema: spec-driven

context: |
  Tech stack: TypeScript, React, Node.js
  Testing: Jest with React Testing Library
  API: RESTful, documented in docs/api.md
  We maintain backwards compatibility for all public APIs

rules:
  proposal:
    - Include rollback plan for risky changes
  specs:
    - Use Given/When/Then format for scenarios
    - Reference existing patterns before inventing new ones
  design:
    - Include sequence diagrams for complex flows
```

### 主要差異

| project.md | config.yaml |
|------------|-------------|
| 自由格式 markdown | 結構化 YAML |
| 一整塊文字 | 分離的 context 和各 artifact 規則 |
| 使用時機不明確 | Context 出現在所有 artifacts；rules 只出現在對應的 artifacts |
| 無 schema 選擇 | 明確的 `schema:` 欄位設定預設工作流程 |

### 保留什麼、捨棄什麼

遷移時要有選擇性。問問自己：「AI 在*每個*規劃請求中都需要這個嗎？」

**適合放入 `context:` 的內容**
- 技術棧（語言、框架、資料庫）
- 關鍵架構模式（monorepo、微服務等）
- 非顯而易見的限制（「我們不能用 X 套件，因為……」）
- 經常被忽略的重要慣例

**改放入 `rules:` 的內容**
- Artifact 特定格式（「在 specs 中使用 Given/When/Then」）
- 審查標準（「proposals 必須包含回滾計畫」）
- 這些只出現在對應的 artifact，讓其他請求更輕量

**完全省略的內容**
- AI 已經知道的一般最佳實踐
- 可以精簡的冗長說明
- 不影響當前工作的歷史 context

### 遷移步驟

1. **建立 config.yaml**（若 init 時尚未建立）：
   ```yaml
   schema: spec-driven
   ```

2. **新增你的 context**（保持簡潔——這會進入每個請求）：
   ```yaml
   context: |
     Your project background goes here.
     Focus on what the AI genuinely needs to know.
   ```

3. **新增各 artifact 規則**（選用）：
   ```yaml
   rules:
     proposal:
       - Your proposal-specific guidance
     specs:
       - Your spec-writing rules
   ```

4. **刪除 project.md**，完成後移動所有有用的內容。

**不要想太多。** 從基本要素開始，逐步迭代。如果你發現 AI 遺漏了某個重要事項，就加進去。如果 context 感覺過於龐雜，就刪減。這是一份活的文件。

### 需要協助？使用這個 Prompt

如果你不確定如何精簡你的 project.md，可以詢問你的 AI 助手：

```
I'm migrating from OpenSpec's old project.md to the new config.yaml format.

Here's my current project.md:
[paste your project.md content]

Please help me create a config.yaml with:
1. A concise `context:` section (this gets injected into every planning request, so keep it tight—focus on tech stack, key constraints, and conventions that often get ignored)
2. `rules:` for specific artifacts if any content is artifact-specific (e.g., "use Given/When/Then" belongs in specs rules, not global context)

Leave out anything generic that AI models already know. Be ruthless about brevity.
```

AI 會協助你辨識什麼是必要的，什麼可以刪減。

---

## 新指令

指令的可用性取決於 profile：

**預設（`core` profile）：**

| 指令 | 用途 |
|------|------|
| `/opsx:propose` | 一步建立變更並產生規劃 artifacts |
| `/opsx:explore` | 無結構地思考構想 |
| `/opsx:apply` | 從 tasks.md 實作任務 |
| `/opsx:archive` | 完成並封存變更 |

**擴充工作流程（自訂選擇）：**

| 指令 | 用途 |
|------|------|
| `/opsx:new` | 建立新的變更架構 |
| `/opsx:continue` | 建立下一個 artifact（一次一個） |
| `/opsx:ff` | 快進——一次建立所有規劃 artifacts |
| `/opsx:verify` | 驗證實作符合規格 |
| `/opsx:sync` | 預覽／spec-merge，不封存 |
| `/opsx:bulk-archive` | 一次封存多個變更 |
| `/opsx:onboard` | 引導式端到端上手工作流程 |

使用 `openspec config profile` 啟用擴充指令，然後執行 `openspec update`。

### 舊版指令對應

| 舊版 | OPSX 對應 |
|------|----------|
| `/openspec:proposal` | `/opsx:propose`（預設）或 `/opsx:new` 再 `/opsx:ff`（擴充） |
| `/openspec:apply` | `/opsx:apply` |
| `/openspec:archive` | `/opsx:archive` |

### 新功能

以下功能是擴充工作流程指令集的一部分。

**細粒度 artifact 建立：**
```
/opsx:continue
```
根據依賴關係一次建立一個 artifact。當你想要審查每個步驟時使用。

**探索模式：**
```
/opsx:explore
```
在確定變更之前，與夥伴一起思考構想。

---

## 了解新架構

### 從階段鎖定到流動式

舊版工作流程強制線性推進：

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   PLANNING   │ ───► │ IMPLEMENTING │ ───► │   ARCHIVING  │
│    PHASE     │      │    PHASE     │      │    PHASE     │
└──────────────┘      └──────────────┘      └──────────────┘

If you're in implementation and realize the design is wrong?
Too bad. Phase gates don't let you go back easily.
```

OPSX 使用動作而非階段：

```
         ┌───────────────────────────────────────────────┐
         │           ACTIONS (not phases)                │
         │                                               │
         │     new ◄──► continue ◄──► apply ◄──► archive │
         │      │          │           │             │   │
         │      └──────────┴───────────┴─────────────┘   │
         │                    any order                  │
         └───────────────────────────────────────────────┘
```

### 依賴圖

Artifacts 形成有向圖。依賴關係是推進器而非關卡：

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
```

當你執行 `/opsx:continue` 時，它會檢查什麼已就緒，並提供下一個 artifact。你也可以以任何順序建立多個就緒的 artifacts。

### Skills vs Commands

舊版系統使用工具特定的 command 檔案：

```
.claude/commands/openspec/
├── proposal.md
├── apply.md
└── archive.md
```

OPSX 使用新興的 **skills** 標準：

```
.claude/skills/
├── openspec-explore/SKILL.md
├── openspec-new-change/SKILL.md
├── openspec-continue-change/SKILL.md
├── openspec-apply-change/SKILL.md
└── ...
```

Skills 可在多種 AI 程式工具中被識別，並提供更豐富的 metadata。

---

## 繼續現有變更

你進行中的變更可以與 OPSX 指令無縫銜接。

**有來自舊版工作流程的進行中變更？**

```
/opsx:apply add-my-feature
```

OPSX 讀取現有 artifacts 並從你停下的地方繼續。

**想要為現有變更新增更多 artifacts？**

```
/opsx:continue add-my-feature
```

根據已存在的內容顯示可以建立的項目。

**需要查看狀態？**

```bash
openspec status --change add-my-feature
```

---

## 新設定系統

### config.yaml 結構

```yaml
# 必填：新變更的預設 schema
schema: spec-driven

# 選用：專案 context（最大 50KB）
# 注入所有 artifact 指令
context: |
  Your project background, tech stack,
  conventions, and constraints.

# 選用：各 artifact 規則
# 只注入對應的 artifacts
rules:
  proposal:
    - Include rollback plan
  specs:
    - Use Given/When/Then format
  design:
    - Document fallback strategies
  tasks:
    - Break into 2-hour maximum chunks
```

### Schema 解析

判斷使用哪個 schema 時，OPSX 依序檢查：

1. **CLI 旗標**：`--schema <name>`（最高優先）
2. **變更 metadata**：變更目錄下的 `.openspec.yaml`
3. **專案設定**：`openspec/config.yaml`
4. **預設值**：`spec-driven`

### 可用的 Schemas

| Schema | Artifacts | 最適合 |
|--------|-----------|--------|
| `spec-driven` | proposal → specs → design → tasks | 大多數專案 |

列出所有可用的 schemas：

```bash
openspec schemas
```

### 自訂 Schemas

建立你自己的工作流程：

```bash
openspec schema init my-workflow
```

或 fork 現有的：

```bash
openspec schema fork spec-driven my-workflow
```

詳情請參閱 [Customization](customization.md)。

---

## 疑難排解

### 「Legacy files detected in non-interactive mode」

你在 CI 或非互動式環境中執行。請使用：

```bash
openspec init --force
```

### 遷移後指令未出現

重新啟動你的 IDE。Skills 在啟動時偵測。

### 「Unknown artifact ID in rules」

確認你的 `rules:` 鍵與你的 schema artifact ID 一致：

- **spec-driven**：`proposal`、`specs`、`design`、`tasks`

執行以下指令查看有效的 artifact ID：

```bash
openspec schemas --json
```

### 設定未套用

1. 確認檔案位於 `openspec/config.yaml`（不是 `.yml`）
2. 驗證 YAML 語法
3. 設定變更立即生效——不需要重新啟動

### project.md 尚未遷移

系統刻意保留 `project.md`，因為它可能包含你的自訂內容。請手動檢查，將有用的部分移至 `config.yaml`，然後刪除它。

### 想查看哪些內容會被清理？

執行 init 並拒絕清理提示——你將看到完整的偵測摘要，而不會有任何變更。

---

## 快速參考

### 遷移後的檔案結構

```
project/
├── openspec/
│   ├── specs/                    # 未變更
│   ├── changes/                  # 未變更
│   │   └── archive/              # 未變更
│   └── config.yaml               # 新增：專案設定
├── .claude/
│   └── skills/                   # 新增：OPSX skills
│       ├── openspec-propose/     # 預設 core profile
│       ├── openspec-explore/
│       ├── openspec-apply-change/
│       └── ...                   # 擴充 profile 新增 new/continue/ff 等
├── CLAUDE.md                     # OpenSpec 標記已移除，你的內容保留
└── AGENTS.md                     # OpenSpec 標記已移除，你的內容保留
```

### 已移除的內容

- `.claude/commands/openspec/` — 由 `.claude/skills/` 取代
- `openspec/AGENTS.md` — 已過時
- `openspec/project.md` — 遷移至 `config.yaml` 後刪除
- `CLAUDE.md`、`AGENTS.md` 等檔案中的 OpenSpec 標記區塊

### 指令速查

```text
/opsx:propose      快速開始（預設 core profile）
/opsx:apply        實作任務
/opsx:archive      完成並封存

# 擴充工作流程（若已啟用）：
/opsx:new          建立變更架構
/opsx:continue     建立下一個 artifact
/opsx:ff           建立規劃 artifacts
```

---

## 取得協助

- **Discord**：[discord.gg/YctCnvvshC](https://discord.gg/YctCnvvshC)
- **GitHub Issues**：[github.com/Fission-AI/OpenSpec/issues](https://github.com/Fission-AI/OpenSpec/issues)
- **文件**：[docs/opsx.md](opsx.md) 完整 OPSX 參考

### 本文原始連結

[OpenSpec 官方文件](https://github.com/Fission-AI/OpenSpec/blob/main/docs/migration-guide.md)

---
sidebar_position: 7
title: "OpenSpec 自訂設定"
description: "OpenSpec 的三層自訂機制：專案設定（config.yaml）、自訂 Schema 與全域覆寫，讓 OpenSpec 符合團隊的工作流程"
tags: [OpenSpec]
last_update:
  date: 2026-04-13
  author: Danny
---

# 自訂設定

OpenSpec 提供三個層級的自訂機制：

| 層級 | 功能說明 | 適用對象 |
|------|----------|----------|
| **專案設定** | 設定預設值、注入 context 與規則 | 大多數團隊 |
| **自訂 Schema** | 定義專屬的工作流程產出物 | 有獨特流程的團隊 |
| **全域覆寫** | 跨專案共用 Schema | 進階使用者 |

---

## 專案設定

`openspec/config.yaml` 是為你的團隊自訂 OpenSpec 最簡便的方式，它讓你能夠：

- **設定預設 Schema** - 每次執行指令時不必再加 `--schema`
- **注入專案 context** - 讓 AI 了解你的技術堆疊、開發慣例等
- **新增每個產出物的規則** - 針對特定產出物設定自訂規則

### 快速設定

```bash
openspec init
```

這會以互動式方式引導你建立 config。或者你也可以手動建立：

```yaml
# openspec/config.yaml
schema: spec-driven

context: |
  Tech stack: TypeScript, React, Node.js, PostgreSQL
  API style: RESTful, documented in docs/api.md
  Testing: Jest + React Testing Library
  We value backwards compatibility for all public APIs

rules:
  proposal:
    - Include rollback plan
    - Identify affected teams
  specs:
    - Use Given/When/Then format
    - Reference existing patterns before inventing new ones
```

### 運作方式

**預設 Schema：**

```bash
# 未設定 config
openspec new change my-feature --schema spec-driven

# 設定 config 後 - schema 會自動套用
openspec new change my-feature
```

**注入 context 與規則：**

產生任何產出物時，你的 context 與規則都會被注入到 AI 提示中：

```xml
<context>
Tech stack: TypeScript, React, Node.js, PostgreSQL
...
</context>

<rules>
- Include rollback plan
- Identify affected teams
</rules>

<template>
[Schema's built-in template]
</template>
```

- **Context** 會出現在「所有」產出物中
- **Rules** 只會出現在「對應的」產出物中

### Schema 解析順序

當 OpenSpec 需要取得 Schema 時，會依以下順序檢查：

1. CLI 旗標：`--schema <name>`
2. Change 的 metadata（change 資料夾內的 `.openspec.yaml`）
3. 專案設定（`openspec/config.yaml`）
4. 預設值（`spec-driven`）

---

## 自訂 Schema

當專案設定不夠用時，你可以建立完全自訂工作流程的 Schema。自訂 Schema 存放在專案的 `openspec/schemas/` 目錄中，並與程式碼一同進行版本控制。

```text
your-project/
├── openspec/
│   ├── config.yaml        # 專案設定
│   ├── schemas/           # 自訂 Schema 存放處
│   │   └── my-workflow/
│   │       ├── schema.yaml
│   │       └── templates/
│   └── changes/           # 你的 changes
└── src/
```

### 複製既有 Schema

最快速的自訂方式是複製一個內建 Schema：

```bash
openspec schema fork spec-driven my-workflow
```

這會將整個 `spec-driven` Schema 複製到 `openspec/schemas/my-workflow/`，讓你可以自由編輯。

**你會得到：**

```text
openspec/schemas/my-workflow/
├── schema.yaml           # 工作流程定義
└── templates/
    ├── proposal.md       # proposal 產出物的 template
    ├── spec.md           # specs 的 template
    ├── design.md         # design 的 template
    └── tasks.md          # tasks 的 template
```

接著編輯 `schema.yaml` 來修改工作流程，或編輯 templates 來改變 AI 產生的內容。

### 從零建立 Schema

如果你需要全新的工作流程：

```bash
# 互動式
openspec schema init research-first

# 非互動式
openspec schema init rapid \
  --description "Rapid iteration workflow" \
  --artifacts "proposal,tasks" \
  --default
```

### Schema 結構

Schema 定義了工作流程中的產出物，以及它們之間的依賴關係：

```yaml
# openspec/schemas/my-workflow/schema.yaml
name: my-workflow
version: 1
description: My team's custom workflow

artifacts:
  - id: proposal
    generates: proposal.md
    description: Initial proposal document
    template: proposal.md
    instruction: |
      Create a proposal that explains WHY this change is needed.
      Focus on the problem, not the solution.
    requires: []

  - id: design
    generates: design.md
    description: Technical design
    template: design.md
    instruction: |
      Create a design document explaining HOW to implement.
    requires:
      - proposal

  - id: tasks
    generates: tasks.md
    description: Implementation checklist
    template: tasks.md
    requires:
      - design

apply:
  requires: [tasks]
  tracks: tasks.md
```

**主要欄位說明：**

| 欄位 | 用途 |
|------|------|
| `id` | 唯一識別碼，用於指令與規則中 |
| `generates` | 輸出的檔案名稱（支援萬用字元，例如 `specs/**/*.md`） |
| `template` | `templates/` 目錄中對應的 template 檔案 |
| `instruction` | 建立此產出物的 AI 指示 |
| `requires` | 依賴項目 - 指定哪些產出物必須先存在 |

### 模板

模板是引導 AI 的 Markdown 檔案，會在建立該產出物時注入到提示中。

```markdown
<!-- templates/proposal.md -->
## Why

<!-- Explain the motivation for this change. What problem does this solve? -->

## What Changes

<!-- Describe what will change. Be specific about new capabilities or modifications. -->

## Impact

<!-- Affected code, APIs, dependencies, systems -->
```

模板可以包含：
- 由 AI 填寫的段落標題
- 提供 AI 指引的 HTML 註解
- 展示預期結構的範例格式

### 驗證你的 Schema

使用自訂 Schema 前，請先進行驗證：

```bash
openspec schema validate my-workflow
```

這會檢查：
- `schema.yaml` 語法是否正確
- 所有參照的 templates 是否存在
- 是否有循環依賴
- 產出物 ID 是否有效

### 使用自訂 Schema

建立完成後，透過以下方式使用你的 Schema：

```bash
# 在指令中指定
openspec new change feature --schema my-workflow

# 或在 config.yaml 中設為預設值
schema: my-workflow
```

### 除錯 Schema 解析

不確定目前使用的是哪個 Schema？可以用以下指令確認：

```bash
# 查看特定 Schema 的解析來源
openspec schema which my-workflow

# 列出所有可用的 Schema
openspec schema which --all
```

輸出結果會顯示 Schema 來自你的專案、使用者目錄，還是套件本身：

```text
Schema: my-workflow
Source: project
Path: /path/to/project/openspec/schemas/my-workflow
```

---

> **注意：** OpenSpec 也支援存放在 `~/.local/share/openspec/schemas/` 的使用者層級 Schema，可跨專案共用，但建議優先使用 `openspec/schemas/` 中的專案層級 Schema，因為這樣可以與程式碼一同進行版本控制。

---

## 範例

### 快速迭代工作流程

適合快速迭代的精簡工作流程：

```yaml
# openspec/schemas/rapid/schema.yaml
name: rapid
version: 1
description: Fast iteration with minimal overhead

artifacts:
  - id: proposal
    generates: proposal.md
    description: Quick proposal
    template: proposal.md
    instruction: |
      Create a brief proposal for this change.
      Focus on what and why, skip detailed specs.
    requires: []

  - id: tasks
    generates: tasks.md
    description: Implementation checklist
    template: tasks.md
    requires: [proposal]

apply:
  requires: [tasks]
  tracks: tasks.md
```

### 新增 Review 產出物

複製預設 Schema 並加入審查步驟：

```bash
openspec schema fork spec-driven with-review
```

接著編輯 `schema.yaml`，加入以下內容：

```yaml
  - id: review
    generates: review.md
    description: Pre-implementation review checklist
    template: review.md
    instruction: |
      Create a review checklist based on the design.
      Include security, performance, and testing considerations.
    requires:
      - design

  - id: tasks
    # ... existing tasks config ...
    requires:
      - specs
      - design
      - review    # Now tasks require review too
```

---

## 另請參閱

- [CLI 參考文件：Schema 指令](cli.md#schema-指令) - 完整指令說明文件

### 本文原始連結

[OpenSpec 官方文件](https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md)

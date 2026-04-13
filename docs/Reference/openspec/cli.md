---
sidebar_position: 4
title: "OpenSpec CLI 使用指南"
description: "OpenSpec CLI 終端指令的完整參考，涵蓋專案設定、瀏覽、驗證、生命週期管理、Schema 與設定等指令"
tags: [OpenSpec]
last_update:
  date: 2026-04-13
  author: Danny
---

# CLI 參考

OpenSpec CLI（`openspec`）提供終端指令，用於專案設定、驗證、狀態檢查與管理。這些指令是 [Commands](commands.md) 中所記載的 AI slash 指令（如 `/opsx:propose`）的補充。

## 摘要

| 類別 | 指令 | 用途 |
|----------|----------|---------|
| **設定** | `init`, `update` | 在專案中初始化並更新 OpenSpec |
| **瀏覽** | `list`, `view`, `show` | 探索變更與 spec |
| **驗證** | `validate` | 檢查變更與 spec 是否有問題 |
| **生命週期** | `archive` | 完成已完成的變更 |
| **工作流程** | `status`, `instructions`, `templates`, `schemas` | 以 artifact 為驅動的工作流程支援 |
| **Schema** | `schema init`, `schema fork`, `schema validate`, `schema which` | 建立並管理自訂工作流程 |
| **設定** | `config` | 檢視並修改設定 |
| **工具** | `feedback`, `completion` | 回饋與 shell 整合 |

---

## 人類 vs Agent 指令

大多數 CLI 指令是為**人類**在終端中使用而設計的。部分指令也透過 JSON 輸出來支援 **agent/腳本使用**。

### 僅限人類使用的指令

這些指令為互動式，專為終端使用而設計：

| 指令 | 用途 |
|---------|---------|
| `openspec init` | 初始化專案（互動式提示） |
| `openspec view` | 互動式儀表板 |
| `openspec config edit` | 在編輯器中開啟設定 |
| `openspec feedback` | 透過 GitHub 提交回饋 |
| `openspec completion install` | 安裝 shell 自動補全 |

### Agent 相容指令

這些指令支援 `--json` 輸出，供 AI agent 和腳本以程式方式使用：

| 指令 | 人類使用 | Agent 使用 |
|---------|-----------|-----------|
| `openspec list` | 瀏覽變更／spec | `--json` 取得結構化資料 |
| `openspec show <item>` | 讀取內容 | `--json` 用於解析 |
| `openspec validate` | 檢查問題 | `--all --json` 批次驗證 |
| `openspec status` | 查看 artifact 進度 | `--json` 取得結構化狀態 |
| `openspec instructions` | 取得下一步驟 | `--json` 取得 agent 指示 |
| `openspec templates` | 尋找範本路徑 | `--json` 用於路徑解析 |
| `openspec schemas` | 列出可用 schema | `--json` 用於 schema 探索 |

---

## 全域選項

這些選項適用於所有指令：

| Option | 說明 |
|--------|-------------|
| `--version`, `-V` | 顯示版本號 |
| `--no-color` | 停用顏色輸出 |
| `--help`, `-h` | 顯示指令說明 |

---

## 設定指令

### `openspec init`

在專案中初始化 OpenSpec。建立資料夾結構並設定 AI 工具整合。

預設行為使用全域設定的預設值：profile 為 `core`，delivery 為 `both`，workflows 為 `propose, explore, apply, archive`。

```
openspec init [path] [options]
```

**引數：**

| 引數 | 必填 | 說明 |
|----------|----------|-------------|
| `path` | 否 | 目標目錄（預設：目前目錄） |

**Options：**

| Option | 說明 |
|--------|-------------|
| `--tools <list>` | 非互動式設定 AI 工具。使用 `all`、`none` 或逗號分隔的清單 |
| `--force` | 不提示直接自動清除舊版檔案 |
| `--profile <profile>` | 覆寫此次初始化的全域 profile（`core` 或 `custom`） |

`--profile custom` 會使用全域設定中目前所選的工作流程（`openspec config profile`）。

**支援的工具 ID（`--tools`）：** `amazon-q`, `antigravity`, `auggie`, `claude`, `cline`, `codex`, `codebuddy`, `continue`, `costrict`, `crush`, `cursor`, `factory`, `gemini`, `github-copilot`, `iflow`, `kilocode`, `kiro`, `opencode`, `pi`, `qoder`, `qwen`, `roocode`, `trae`, `windsurf`

**範例：**

```bash
# 互動式初始化
openspec init

# 在特定目錄中初始化
openspec init ./my-project

# 非互動式：設定給 Claude 和 Cursor
openspec init --tools claude,cursor

# 設定給所有支援的工具
openspec init --tools all

# 覆寫此次執行的 profile
openspec init --profile core

# 跳過提示並自動清除舊版檔案
openspec init --force
```

**建立的內容：**

```
openspec/
├── specs/              # 您的規格說明（真實來源）
├── changes/            # 提議的變更
└── config.yaml         # 專案設定

.claude/skills/         # Claude Code skills（若選擇 claude）
.cursor/skills/         # Cursor skills（若選擇 cursor）
.cursor/commands/       # Cursor OPSX 指令（若 delivery 包含 commands）
... (其他工具設定)
```

---

### `openspec update`

升級 CLI 後更新 OpenSpec 指令檔案。使用目前的全域 profile、已選工作流程與 delivery 模式重新產生 AI 工具設定檔。

```
openspec update [path] [options]
```

**引數：**

| 引數 | 必填 | 說明 |
|----------|----------|-------------|
| `path` | 否 | 目標目錄（預設：目前目錄） |

**Options：**

| Option | 說明 |
|--------|-------------|
| `--force` | 即使檔案已是最新版本也強制更新 |

**範例：**

```bash
# npm 升級後更新指令檔案
npm update @fission-ai/openspec
openspec update
```

---

## 瀏覽指令

### `openspec list`

列出專案中的變更或 spec。

```
openspec list [options]
```

**Options：**

| Option | 說明 |
|--------|-------------|
| `--specs` | 列出 spec 而非變更 |
| `--changes` | 列出變更（預設） |
| `--sort <order>` | 依 `recent`（預設）或 `name` 排序 |
| `--json` | 輸出為 JSON |

**範例：**

```bash
# 列出所有有效變更
openspec list

# 列出所有 spec
openspec list --specs

# 輸出 JSON 供腳本使用
openspec list --json
```

**輸出（文字）：**

```
Active changes:
  add-dark-mode     UI theme switching support
  fix-login-bug     Session timeout handling
```

---

### `openspec view`

顯示用於探索 spec 與變更的互動式儀表板。

```
openspec view
```

開啟終端介面以瀏覽專案的規格說明與變更。

---

### `openspec show`

顯示變更或 spec 的詳細資訊。

```
openspec show [item-name] [options]
```

**引數：**

| 引數 | 必填 | 說明 |
|----------|----------|-------------|
| `item-name` | 否 | 變更或 spec 的名稱（省略時會提示選擇） |

**Options：**

| Option | 說明 |
|--------|-------------|
| `--type <type>` | 指定類型：`change` 或 `spec`（若無歧義則自動偵測） |
| `--json` | 輸出為 JSON |
| `--no-interactive` | 停用提示 |

**變更專用 options：**

| Option | 說明 |
|--------|-------------|
| `--deltas-only` | 只顯示 delta spec（JSON 模式） |

**Spec 專用 options：**

| Option | 說明 |
|--------|-------------|
| `--requirements` | 只顯示需求，排除情境（JSON 模式） |
| `--no-scenarios` | 排除情境內容（JSON 模式） |
| `-r, --requirement <id>` | 以 1 為基底的索引顯示特定需求（JSON 模式） |

**範例：**

```bash
# 互動式選擇
openspec show

# 顯示特定變更
openspec show add-dark-mode

# 顯示特定 spec
openspec show auth --type spec

# 輸出 JSON 用於解析
openspec show add-dark-mode --json
```

---

## 驗證指令

### `openspec validate`

驗證變更與 spec 是否有結構問題。

```
openspec validate [item-name] [options]
```

**引數：**

| 引數 | 必填 | 說明 |
|----------|----------|-------------|
| `item-name` | 否 | 要驗證的特定項目（省略時會提示選擇） |

**Options：**

| Option | 說明 |
|--------|-------------|
| `--all` | 驗證所有變更與 spec |
| `--changes` | 驗證所有變更 |
| `--specs` | 驗證所有 spec |
| `--type <type>` | 當名稱有歧義時指定類型：`change` 或 `spec` |
| `--strict` | 啟用嚴格驗證模式 |
| `--json` | 輸出為 JSON |
| `--concurrency <n>` | 最大平行驗證數（預設：6，或 `OPENSPEC_CONCURRENCY` 環境變數） |
| `--no-interactive` | 停用提示 |

**範例：**

```bash
# 互動式驗證
openspec validate

# 驗證特定變更
openspec validate add-dark-mode

# 驗證所有變更
openspec validate --changes

# 驗證所有內容並輸出 JSON（供 CI/腳本使用）
openspec validate --all --json

# 嚴格驗證並增加並行數
openspec validate --all --strict --concurrency 12
```

**輸出（文字）：**

```
Validating add-dark-mode...
  ✓ proposal.md valid
  ✓ specs/ui/spec.md valid
  ⚠ design.md: missing "Technical Approach" section

1 warning found
```

**輸出（JSON）：**

```json
{
  "version": "1.0.0",
  "results": {
    "changes": [
      {
        "name": "add-dark-mode",
        "valid": true,
        "warnings": ["design.md: missing 'Technical Approach' section"]
      }
    ]
  },
  "summary": {
    "total": 1,
    "valid": 1,
    "invalid": 0
  }
}
```

---

## 生命週期指令

### `openspec archive`

封存已完成的變更，並將 delta spec 合併至主要 spec。

```
openspec archive [change-name] [options]
```

**引數：**

| 引數 | 必填 | 說明 |
|----------|----------|-------------|
| `change-name` | 否 | 要封存的變更（省略時會提示選擇） |

**Options：**

| Option | 說明 |
|--------|-------------|
| `-y, --yes` | 跳過確認提示 |
| `--skip-specs` | 跳過 spec 更新（適用於基礎設施／工具／純文件變更） |
| `--no-validate` | 跳過驗證（需要確認） |

**範例：**

```bash
# 互動式封存
openspec archive

# 封存特定變更
openspec archive add-dark-mode

# 不提示直接封存（CI/腳本）
openspec archive add-dark-mode --yes

# 封存不影響 spec 的工具變更
openspec archive update-ci-config --skip-specs
```

**執行內容：**

1. 驗證變更（除非加上 `--no-validate`）
2. 提示確認（除非加上 `--yes`）
3. 將 delta spec 合併至 `openspec/specs/`
4. 將變更資料夾移至 `openspec/changes/archive/YYYY-MM-DD-<name>/`

---

## 工作流程指令

這些指令支援以 artifact 為驅動的 OPSX 工作流程。對於人類檢查進度或 agent 決定下一步都很有用。

### `openspec status`

顯示變更的 artifact 完成狀態。

```
openspec status [options]
```

**Options：**

| Option | 說明 |
|--------|-------------|
| `--change <id>` | 變更名稱（省略時會提示選擇） |
| `--schema <name>` | 覆寫 schema（自動從變更的設定中偵測） |
| `--json` | 輸出為 JSON |

**範例：**

```bash
# 互動式狀態檢查
openspec status

# 特定變更的狀態
openspec status --change add-dark-mode

# 輸出 JSON 供 agent 使用
openspec status --change add-dark-mode --json
```

**輸出（文字）：**

```
Change: add-dark-mode
Schema: spec-driven
Progress: 2/4 artifacts complete

[x] proposal
[ ] design
[x] specs
[-] tasks (blocked by: design)
```

**輸出（JSON）：**

```json
{
  "changeName": "add-dark-mode",
  "schemaName": "spec-driven",
  "isComplete": false,
  "applyRequires": ["tasks"],
  "artifacts": [
    {"id": "proposal", "outputPath": "proposal.md", "status": "done"},
    {"id": "design", "outputPath": "design.md", "status": "ready"},
    {"id": "specs", "outputPath": "specs/**/*.md", "status": "done"},
    {"id": "tasks", "outputPath": "tasks.md", "status": "blocked", "missingDeps": ["design"]}
  ]
}
```

---

### `openspec instructions`

取得建立 artifact 或套用任務的豐富指示。供 AI agent 用來了解下一步應建立什麼。

```
openspec instructions [artifact] [options]
```

**引數：**

| 引數 | 必填 | 說明 |
|----------|----------|-------------|
| `artifact` | 否 | Artifact ID：`proposal`、`specs`、`design`、`tasks` 或 `apply` |

**Options：**

| Option | 說明 |
|--------|-------------|
| `--change <id>` | 變更名稱（非互動模式下為必填） |
| `--schema <name>` | 覆寫 schema |
| `--json` | 輸出為 JSON |

**特殊情況：** 將 `apply` 作為 artifact 以取得任務實作指示。

**範例：**

```bash
# 取得下一個 artifact 的指示
openspec instructions --change add-dark-mode

# 取得特定 artifact 的指示
openspec instructions design --change add-dark-mode

# 取得套用／實作指示
openspec instructions apply --change add-dark-mode

# 輸出 JSON 供 agent 使用
openspec instructions design --change add-dark-mode --json
```

**輸出內容包含：**

- Artifact 的範本內容
- 來自設定的專案情境
- 依賴 artifact 的內容
- 來自設定的每個 artifact 規則

---

### `openspec templates`

顯示 schema 中所有 artifact 的已解析範本路徑。

```
openspec templates [options]
```

**Options：**

| Option | 說明 |
|--------|-------------|
| `--schema <name>` | 要檢視的 schema（預設：`spec-driven`） |
| `--json` | 輸出為 JSON |

**範例：**

```bash
# 顯示預設 schema 的範本路徑
openspec templates

# 顯示自訂 schema 的範本
openspec templates --schema my-workflow

# 輸出 JSON 供程式使用
openspec templates --json
```

**輸出（文字）：**

```
Schema: spec-driven

Templates:
  proposal  → ~/.openspec/schemas/spec-driven/templates/proposal.md
  specs     → ~/.openspec/schemas/spec-driven/templates/specs.md
  design    → ~/.openspec/schemas/spec-driven/templates/design.md
  tasks     → ~/.openspec/schemas/spec-driven/templates/tasks.md
```

---

### `openspec schemas`

列出可用的工作流程 schema 及其說明與 artifact 流程。

```
openspec schemas [options]
```

**Options：**

| Option | 說明 |
|--------|-------------|
| `--json` | 輸出為 JSON |

**範例：**

```bash
openspec schemas
```

**輸出：**

```
Available schemas:

  spec-driven (package)
    The default spec-driven development workflow
    Flow: proposal → specs → design → tasks

  my-custom (project)
    Custom workflow for this project
    Flow: research → proposal → tasks
```

---

## Schema 指令

用於建立與管理自訂工作流程 schema 的指令。

### `openspec schema init`

建立新的專案本地 schema。

```
openspec schema init <name> [options]
```

**引數：**

| 引數 | 必填 | 說明 |
|----------|----------|-------------|
| `name` | 是 | Schema 名稱（kebab-case） |

**Options：**

| Option | 說明 |
|--------|-------------|
| `--description <text>` | Schema 說明 |
| `--artifacts <list>` | 逗號分隔的 artifact ID（預設：`proposal,specs,design,tasks`） |
| `--default` | 設為專案預設 schema |
| `--no-default` | 不提示設為預設 |
| `--force` | 覆寫現有 schema |
| `--json` | 輸出為 JSON |

**範例：**

```bash
# 互動式建立 schema
openspec schema init research-first

# 非互動式並指定特定 artifact
openspec schema init rapid \
  --description "Rapid iteration workflow" \
  --artifacts "proposal,tasks" \
  --default
```

**建立的內容：**

```
openspec/schemas/<name>/
├── schema.yaml           # Schema 定義
└── templates/
    ├── proposal.md       # 每個 artifact 的範本
    ├── specs.md
    ├── design.md
    └── tasks.md
```

---

### `openspec schema fork`

將現有 schema 複製到專案中以進行自訂。

```
openspec schema fork <source> [name] [options]
```

**引數：**

| 引數 | 必填 | 說明 |
|----------|----------|-------------|
| `source` | 是 | 要複製的 schema |
| `name` | 否 | 新的 schema 名稱（預設：`<source>-custom`） |

**Options：**

| Option | 說明 |
|--------|-------------|
| `--force` | 覆寫現有目標 |
| `--json` | 輸出為 JSON |

**範例：**

```bash
# Fork 內建的 spec-driven schema
openspec schema fork spec-driven my-workflow
```

---

### `openspec schema validate`

驗證 schema 的結構與範本。

```
openspec schema validate [name] [options]
```

**引數：**

| 引數 | 必填 | 說明 |
|----------|----------|-------------|
| `name` | 否 | 要驗證的 schema（省略時驗證全部） |

**Options：**

| Option | 說明 |
|--------|-------------|
| `--verbose` | 顯示詳細驗證步驟 |
| `--json` | 輸出為 JSON |

**範例：**

```bash
# 驗證特定 schema
openspec schema validate my-workflow

# 驗證所有 schema
openspec schema validate
```

---

### `openspec schema which`

顯示 schema 的解析來源（有助於除錯優先順序）。

```
openspec schema which [name] [options]
```

**引數：**

| 引數 | 必填 | 說明 |
|----------|----------|-------------|
| `name` | 否 | Schema 名稱 |

**Options：**

| Option | 說明 |
|--------|-------------|
| `--all` | 列出所有 schema 及其來源 |
| `--json` | 輸出為 JSON |

**範例：**

```bash
# 檢查 schema 的來源
openspec schema which spec-driven
```

**輸出：**

```
spec-driven resolves from: package
  Source: /usr/local/lib/node_modules/@fission-ai/openspec/schemas/spec-driven
```

**Schema 優先順序：**

1. 專案：`openspec/schemas/<name>/`
2. 使用者：`~/.local/share/openspec/schemas/<name>/`
3. 套件：內建 schema

---

## 設定指令

### `openspec config`

檢視並修改全域 OpenSpec 設定。

```
openspec config <subcommand> [options]
```

**子指令：**

| 子指令 | 說明 |
|------------|-------------|
| `path` | 顯示設定檔位置 |
| `list` | 顯示所有目前設定 |
| `get <key>` | 取得特定值 |
| `set <key> <value>` | 設定值 |
| `unset <key>` | 移除鍵值 |
| `reset` | 重設為預設值 |
| `edit` | 在 `$EDITOR` 中開啟 |
| `profile [preset]` | 以互動方式或透過預設值設定工作流程 profile |

**範例：**

```bash
# 顯示設定檔路徑
openspec config path

# 列出所有設定
openspec config list

# 取得特定值
openspec config get telemetry.enabled

# 設定值
openspec config set telemetry.enabled false

# 明確設定字串值
openspec config set user.name "My Name" --string

# 移除自訂設定
openspec config unset user.name

# 重設所有設定
openspec config reset --all --yes

# 在編輯器中編輯設定
openspec config edit

# 使用動作精靈設定 profile
openspec config profile

# 快速預設：將工作流程切換至 core（保留 delivery 模式）
openspec config profile core
```

`openspec config profile` 從目前狀態摘要開始，然後讓您選擇：
- 變更 delivery + 工作流程
- 僅變更 delivery
- 僅變更工作流程
- 保留目前設定（離開）

若保留目前設定，不會寫入任何變更，也不會顯示更新提示。
若設定無變更，但目前專案檔案與全域 profile/delivery 不同步，OpenSpec 會顯示警告並建議執行 `openspec update`。
按下 `Ctrl+C` 也可以乾淨地取消流程（不會顯示堆疊追蹤）並以代碼 `130` 結束。
在工作流程清單中，`[x]` 表示該工作流程已在全域設定中選取。若要將這些選擇套用至專案檔案，請執行 `openspec update`（或在專案內提示時選擇「Apply changes to this project now?」）。

**互動式範例：**

```bash
# 僅更新 delivery
openspec config profile
# 選擇：Change delivery only
# 選擇 delivery：Skills only

# 僅更新工作流程
openspec config profile
# 選擇：Change workflows only
# 在清單中切換工作流程，然後確認
```

---

## 工具指令

### `openspec feedback`

提交關於 OpenSpec 的回饋。會建立 GitHub issue。

```
openspec feedback <message> [options]
```

**引數：**

| 引數 | 必填 | 說明 |
|----------|----------|-------------|
| `message` | 是 | 回饋訊息 |

**Options：**

| Option | 說明 |
|--------|-------------|
| `--body <text>` | 詳細說明 |

**需求：** 必須安裝並通過驗證的 GitHub CLI（`gh`）。

**範例：**

```bash
openspec feedback "Add support for custom artifact types" \
  --body "I'd like to define my own artifact types beyond the built-in ones."
```

---

### `openspec completion`

管理 OpenSpec CLI 的 shell 自動補全。

```
openspec completion <subcommand> [shell]
```

**子指令：**

| 子指令 | 說明 |
|------------|-------------|
| `generate [shell]` | 將補全腳本輸出至 stdout |
| `install [shell]` | 為您的 shell 安裝補全 |
| `uninstall [shell]` | 移除已安裝的補全 |

**支援的 shell：** `bash`, `zsh`, `fish`, `powershell`

**範例：**

```bash
# 安裝補全（自動偵測 shell）
openspec completion install

# 為特定 shell 安裝
openspec completion install zsh

# 產生腳本供手動安裝
openspec completion generate bash > ~/.bash_completion.d/openspec

# 解除安裝
openspec completion uninstall
```

---

## 結束代碼

| 代碼 | 意義 |
|------|---------|
| `0` | 成功 |
| `1` | 錯誤（驗證失敗、缺少檔案等） |

---

## 環境變數

| 變數 | 說明 |
|----------|-------------|
| `OPENSPEC_TELEMETRY` | 設為 `0` 以停用遙測 |
| `DO_NOT_TRACK` | 設為 `1` 以停用遙測（標準 DNT 訊號） |
| `OPENSPEC_CONCURRENCY` | 批次驗證的預設並行數（預設：6） |
| `EDITOR` 或 `VISUAL` | 用於 `openspec config edit` 的編輯器 |
| `NO_COLOR` | 設定後停用顏色輸出 |

---

## 相關文件

- [Commands](commands.md) - AI slash 指令（`/opsx:propose`、`/opsx:apply` 等）
- [Workflows](workflows.md) - 常見模式與各指令的使用時機
- [Customization](customization.md) - 建立自訂 schema 與範本
- [Getting Started](getting-started.md) - 首次設定指南

### 本文原始連結

[OpenSpec 官方文件](https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md)

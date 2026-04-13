---
sidebar_position: 10
title: "OpenSpec 支援工具"
description: "OpenSpec 支援的 AI 程式助手清單，包含各工具的 Skills 與 Commands 路徑對照表及非互動式設定方式"
tags: [OpenSpec]
last_update:
  date: 2026-04-13
  author: Danny
---

# 支援工具

OpenSpec 支援多種 AI 程式助手。當你執行 `openspec init` 時，OpenSpec 會依據你目前的 profile／工作流程選擇和 delivery 模式設定所選的工具。

## 運作方式

對於每個選定的工具，OpenSpec 可以安裝：

1. **Skills**（若 delivery 包含 skills）：`.../skills/openspec-*/SKILL.md`
2. **Commands**（若 delivery 包含 commands）：工具特定的 `opsx-*` 指令檔案

預設情況下，OpenSpec 使用 `core` profile，包含：
- `propose`
- `explore`
- `apply`
- `archive`

你可以透過 `openspec config profile` 啟用擴充工作流程（`new`、`continue`、`ff`、`verify`、`sync`、`bulk-archive`、`onboard`），然後執行 `openspec update`。

## 工具目錄參考

| Tool (ID) | Skills 路徑規則 | Command 路徑規則 |
|-----------|-----------------|-----------------|
| Amazon Q Developer (`amazon-q`) | `.amazonq/skills/openspec-*/SKILL.md` | `.amazonq/prompts/opsx-<id>.md` |
| Antigravity (`antigravity`) | `.agent/skills/openspec-*/SKILL.md` | `.agent/workflows/opsx-<id>.md` |
| Auggie (`auggie`) | `.augment/skills/openspec-*/SKILL.md` | `.augment/commands/opsx-<id>.md` |
| IBM Bob Shell (`bob`) | `.bob/skills/openspec-*/SKILL.md` | `.bob/commands/opsx-<id>.md` |
| Claude Code (`claude`) | `.claude/skills/openspec-*/SKILL.md` | `.claude/commands/opsx/<id>.md` |
| Cline (`cline`) | `.cline/skills/openspec-*/SKILL.md` | `.clinerules/workflows/opsx-<id>.md` |
| CodeBuddy (`codebuddy`) | `.codebuddy/skills/openspec-*/SKILL.md` | `.codebuddy/commands/opsx/<id>.md` |
| Codex (`codex`) | `.codex/skills/openspec-*/SKILL.md` | `$CODEX_HOME/prompts/opsx-<id>.md`\* |
| ForgeCode (`forgecode`) | `.forge/skills/openspec-*/SKILL.md` | 不產生（無 command adapter；使用基於 skill 的 `/openspec-*` 呼叫） |
| Continue (`continue`) | `.continue/skills/openspec-*/SKILL.md` | `.continue/prompts/opsx-<id>.prompt` |
| CoStrict (`costrict`) | `.cospec/skills/openspec-*/SKILL.md` | `.cospec/openspec/commands/opsx-<id>.md` |
| Crush (`crush`) | `.crush/skills/openspec-*/SKILL.md` | `.crush/commands/opsx/<id>.md` |
| Cursor (`cursor`) | `.cursor/skills/openspec-*/SKILL.md` | `.cursor/commands/opsx-<id>.md` |
| Factory Droid (`factory`) | `.factory/skills/openspec-*/SKILL.md` | `.factory/commands/opsx-<id>.md` |
| Gemini CLI (`gemini`) | `.gemini/skills/openspec-*/SKILL.md` | `.gemini/commands/opsx/<id>.toml` |
| GitHub Copilot (`github-copilot`) | `.github/skills/openspec-*/SKILL.md` | `.github/prompts/opsx-<id>.prompt.md`\*\* |
| iFlow (`iflow`) | `.iflow/skills/openspec-*/SKILL.md` | `.iflow/commands/opsx-<id>.md` |
| Junie (`junie`) | `.junie/skills/openspec-*/SKILL.md` | `.junie/commands/opsx-<id>.md` |
| Kilo Code (`kilocode`) | `.kilocode/skills/openspec-*/SKILL.md` | `.kilocode/workflows/opsx-<id>.md` |
| Kiro (`kiro`) | `.kiro/skills/openspec-*/SKILL.md` | `.kiro/prompts/opsx-<id>.prompt.md` |
| OpenCode (`opencode`) | `.opencode/skills/openspec-*/SKILL.md` | `.opencode/commands/opsx-<id>.md` |
| Pi (`pi`) | `.pi/skills/openspec-*/SKILL.md` | `.pi/prompts/opsx-<id>.md` |
| Qoder (`qoder`) | `.qoder/skills/openspec-*/SKILL.md` | `.qoder/commands/opsx/<id>.md` |
| Qwen Code (`qwen`) | `.qwen/skills/openspec-*/SKILL.md` | `.qwen/commands/opsx-<id>.toml` |
| RooCode (`roocode`) | `.roo/skills/openspec-*/SKILL.md` | `.roo/commands/opsx-<id>.md` |
| Trae (`trae`) | `.trae/skills/openspec-*/SKILL.md` | 不產生（無 command adapter；使用基於 skill 的 `/openspec-*` 呼叫） |
| Windsurf (`windsurf`) | `.windsurf/skills/openspec-*/SKILL.md` | `.windsurf/workflows/opsx-<id>.md` |

\* Codex commands 安裝在全域 Codex home（若有設定則為 `$CODEX_HOME/prompts/`，否則為 `~/.codex/prompts/`），而非你的專案目錄。

\*\* GitHub Copilot prompt 檔案在 IDE 擴充套件（VS Code、JetBrains、Visual Studio）中被識別為自訂 slash commands。Copilot CLI 目前不直接使用 `.github/prompts/*.prompt.md`。

## 非互動式設定

適用於 CI/CD 或腳本化設定，使用 `--tools`（可選填 `--profile`）：

```bash
# 設定指定工具
openspec init --tools claude,cursor

# 設定所有支援的工具
openspec init --tools all

# 跳過工具設定
openspec init --tools none

# 覆寫此次 init 的 profile
openspec init --profile core
```

**可用工具 ID（`--tools`）：** `amazon-q`, `antigravity`, `auggie`, `bob`, `claude`, `cline`, `codex`, `codebuddy`, `continue`, `costrict`, `crush`, `cursor`, `factory`, `forgecode`, `gemini`, `github-copilot`, `iflow`, `junie`, `kilocode`, `kiro`, `opencode`, `pi`, `qoder`, `qwen`, `roocode`, `trae`, `windsurf`

## 依工作流程的安裝內容

OpenSpec 根據所選工作流程安裝工作流程 artifacts：

- **Core profile（預設）：** `propose`、`explore`、`apply`、`archive`
- **自訂選擇：** 所有工作流程 ID 的任意子集：
  `propose`、`explore`、`new`、`continue`、`apply`、`ff`、`sync`、`archive`、`bulk-archive`、`verify`、`onboard`

換言之，skill/command 的數量取決於 profile 和 delivery 設定，並非固定不變。

## 產生的 Skill 名稱

依據 profile／工作流程設定選取後，OpenSpec 會產生以下 skills：

- `openspec-propose`
- `openspec-explore`
- `openspec-new-change`
- `openspec-continue-change`
- `openspec-apply-change`
- `openspec-ff-change`
- `openspec-sync-specs`
- `openspec-archive-change`
- `openspec-bulk-archive-change`
- `openspec-verify-change`
- `openspec-onboard`

請參閱 [Commands](commands.md) 了解指令行為，以及 [CLI](cli.md) 了解 `init`/`update` 選項。

## 相關資源

- [CLI Reference](cli.md) — 終端機指令
- [Commands](commands.md) — Slash commands 與 skills
- [Getting Started](getting-started.md) — 初次設定

### 本文原始連結

[OpenSpec 官方文件](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md)

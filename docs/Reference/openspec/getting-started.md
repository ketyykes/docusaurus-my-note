---
sidebar_position: 2
title: "OpenSpec 快速入門"
description: "OpenSpec 的運作方式、專案結構、產出物（Artifacts）與 Delta Specs 的完整入門教學"
tags: [OpenSpec]
last_update:
  date: 2026-04-13
  author: Danny
---

# 快速入門

本指南說明在安裝並初始化 OpenSpec 之後的運作方式。若需安裝說明，請參閱 [安裝指南](installation.md)。

## 運作方式

OpenSpec 幫助你和你的 AI 程式碼助理在撰寫任何程式碼之前，就對要建立的內容達成共識。

**預設快速路徑（core profile）：**

```text
/opsx:propose ──► /opsx:apply ──► /opsx:archive
```

**擴充路徑（自訂工作流程選擇）：**

```text
/opsx:new ──► /opsx:ff or /opsx:continue ──► /opsx:apply ──► /opsx:verify ──► /opsx:archive
```

預設全域設定檔為 `core`，包含 `propose`、`explore`、`apply` 和 `archive`。你可以透過 `openspec config profile` 再執行 `openspec update` 來啟用擴充工作流程指令。

## OpenSpec 建立的內容

執行 `openspec init` 後，你的專案會具備以下結構：

```
openspec/
├── specs/              # 事實來源（你的系統行為）
│   └── <domain>/
│       └── spec.md
├── changes/            # 提議的更新（每個變更一個資料夾）
│   └── <change-name>/
│       ├── proposal.md
│       ├── design.md
│       ├── tasks.md
│       └── specs/      # Delta specs（正在變更的內容）
│           └── <domain>/
│               └── spec.md
└── config.yaml         # 專案設定（選用）
```

**兩個關鍵目錄：**

- **`specs/`** - 事實來源。這些規格描述你的系統目前的行為方式，依領域（domain）組織（例如 `specs/auth/`、`specs/payments/`）。

- **`changes/`** - 提議的修改內容。每個變更都有自己的資料夾，包含所有相關產出物。變更完成後，其規格會合併至主要的 `specs/` 目錄。

## 了解產出物

每個變更資料夾包含引導工作進行的產出物（Artifacts）：

| 產出物 | 用途 |
|--------|------|
| `proposal.md` | 「為什麼」和「是什麼」——記錄意圖、範圍與方法 |
| `specs/` | Delta specs，顯示 ADDED／MODIFIED／REMOVED 的需求 |
| `design.md` | 「如何做」——技術方法與架構決策 |
| `tasks.md` | 附核取方塊的實作清單 |

**產出物彼此環環相扣：**

```
proposal ──► specs ──► design ──► tasks ──► implement
   ▲           ▲          ▲                    │
   └───────────┴──────────┴────────────────────┘
            update as you learn
```

在實作過程中學到更多後，你隨時可以回頭精煉先前的產出物。

## Delta Specs 的運作方式

Delta specs 是 OpenSpec 的核心概念，用於呈現相對於現有規格的變更內容。

### 格式

Delta specs 以章節標示變更類型：

```markdown
# Delta for Auth

## ADDED Requirements

### Requirement: Two-Factor Authentication
The system MUST require a second factor during login.

#### Scenario: OTP required
- GIVEN a user with 2FA enabled
- WHEN the user submits valid credentials
- THEN an OTP challenge is presented

## MODIFIED Requirements

### Requirement: Session Timeout
The system SHALL expire sessions after 30 minutes of inactivity.
(Previously: 60 minutes)

#### Scenario: Idle timeout
- GIVEN an authenticated session
- WHEN 30 minutes pass without activity
- THEN the session is invalidated

## REMOVED Requirements

### Requirement: Remember Me
(Deprecated in favor of 2FA)
```

### 封存時發生的事

當你封存一個變更時：

1. **ADDED** 的需求會附加至主規格
2. **MODIFIED** 的需求會取代現有版本
3. **REMOVED** 的需求會從主規格中刪除

變更資料夾會移至 `openspec/changes/archive/` 以保留稽核歷史。

## 範例：你的第一個變更

讓我們逐步演練如何為應用程式新增深色模式。

### 1. 開始變更（預設）

```text
You: /opsx:propose add-dark-mode

AI:  Created openspec/changes/add-dark-mode/
     ✓ proposal.md — why we're doing this, what's changing
     ✓ specs/       — requirements and scenarios
     ✓ design.md    — technical approach
     ✓ tasks.md     — implementation checklist
     Ready for implementation!
```

若你已啟用擴充工作流程設定檔，也可以拆成兩個步驟進行：先執行 `/opsx:new`，再執行 `/opsx:ff`（或逐步執行 `/opsx:continue`）。

### 2. 建立的內容

**proposal.md** - 記錄意圖：

```markdown
# Proposal: Add Dark Mode

## Intent
Users have requested a dark mode option to reduce eye strain
during nighttime usage.

## Scope
- Add theme toggle in settings
- Support system preference detection
- Persist preference in localStorage

## Approach
Use CSS custom properties for theming with a React context
for state management.
```

**specs/ui/spec.md** - 顯示新需求的 Delta：

```markdown
# Delta for UI

## ADDED Requirements

### Requirement: Theme Selection
The system SHALL allow users to choose between light and dark themes.

#### Scenario: Manual toggle
- GIVEN a user on any page
- WHEN the user clicks the theme toggle
- THEN the theme switches immediately
- AND the preference persists across sessions

#### Scenario: System preference
- GIVEN a user with no saved preference
- WHEN the application loads
- THEN the system's preferred color scheme is used
```

**tasks.md** - 實作清單：

```markdown
# Tasks

## 1. Theme Infrastructure
- [ ] 1.1 Create ThemeContext with light/dark state
- [ ] 1.2 Add CSS custom properties for colors
- [ ] 1.3 Implement localStorage persistence

## 2. UI Components
- [ ] 2.1 Create ThemeToggle component
- [ ] 2.2 Add toggle to settings page
- [ ] 2.3 Update Header to include quick toggle

## 3. Styling
- [ ] 3.1 Define dark theme color palette
- [ ] 3.2 Update components to use CSS variables
```

### 3. 實作

```
You: /opsx:apply

AI:  Working through tasks...
     ✓ 1.1 Created ThemeContext with light/dark state
     ✓ 1.2 Added CSS custom properties to globals.css
     ✓ 1.3 Implemented localStorage persistence
     ✓ 2.1 Created ThemeToggle component
     ...
     All tasks complete!
```

實作過程中，如果發現設計需要調整，只需更新對應的產出物後繼續即可。

### 4. 封存

```
You: /opsx:archive

AI:  Archiving add-dark-mode...
     ✓ Merged specs into openspec/specs/ui/spec.md
     ✓ Moved to openspec/changes/archive/2025-01-24-add-dark-mode/
     Done! Ready for the next feature.
```

你的 Delta specs 現在已成為主規格的一部分，完整記錄了系統的運作方式。

## 驗證與檢視

使用 CLI 查看你的變更狀態：

```bash
# 列出進行中的變更
openspec list

# 檢視變更詳情
openspec show add-dark-mode

# 驗證規格格式
openspec validate add-dark-mode

# 互動式儀表板
openspec view
```

## 下一步

- [Workflows](workflows.md) - 常見模式及各指令的使用時機
- [Commands](commands.md) - 所有斜線指令的完整參考
- [Concepts](concepts.md) - 深入了解 specs、changes 與 schemas
- [Customization](customization.md) - 依照你的方式自訂 OpenSpec

### 本文原始連結

[OpenSpec 官方文件](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md)

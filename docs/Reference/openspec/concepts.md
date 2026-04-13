---
sidebar_position: 3
title: "OpenSpec 核心概念"
description: "深入了解 OpenSpec 的核心概念，包含規格（Specs）、變更（Changes）、產出物（Artifacts）、Delta Specs 與 Schema 的完整說明"
tags: [OpenSpec]
last_update:
  date: 2026-04-13
  author: Danny
---

# 核心概念

本指南說明 OpenSpec 的核心概念，以及這些概念如何相互配合。若需實際使用說明，請參閱 [Getting Started](getting-started.md) 與 [Workflows](workflows.md)。

## 設計理念

OpenSpec 建立於四項原則之上：

```
fluid not rigid         — no phase gates, work on what makes sense
iterative not waterfall — learn as you build, refine as you go
easy not complex        — lightweight setup, minimal ceremony
brownfield-first        — works with existing codebases, not just greenfield
```

### 為何這些原則至關重要

**流動而非僵化（Fluid not rigid）。** 傳統規格系統會將你鎖定在特定階段：先規劃、再實作、最後完成。OpenSpec 更具彈性——你可以依照工作需求，以任意順序建立產出物（Artifacts）。

**迭代而非瀑布（Iterative not waterfall）。** 需求會改變，理解會加深。一開始看似合理的方案，在你看到程式碼之後可能不再成立。OpenSpec 擁抱這個現實。

**簡單而非複雜（Easy not complex）。** 有些規格框架需要大量設定、嚴格格式或繁重流程。OpenSpec 不會妨礙你的工作——幾秒鐘即可初始化、立即開始，有需要時再自訂。

**既有專案優先（Brownfield-first）。** 大多數軟體開發工作不是從零開始，而是修改既有系統。OpenSpec 以 delta 為基礎的方式，讓你輕鬆描述對既有行為的變更，而不只是描述全新專案。

## 全局觀

OpenSpec 將你的工作組織為兩個主要區域：

```
┌────────────────────────────────────────────────────────────────────┐
│                        openspec/                                   │
│                                                                    │
│   ┌─────────────────────┐      ┌───────────────────────────────┐   │
│   │       specs/        │      │         changes/              │   │
│   │                     │      │                               │   │
│   │  Source of truth    │◄─────│  Proposed modifications       │   │
│   │  How your system    │ merge│  Each change = one folder     │   │
│   │  currently works    │      │  Contains artifacts + deltas  │   │
│   │                     │      │                               │   │
│   └─────────────────────┘      └───────────────────────────────┘   │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

**Specs** 是唯一真實來源（source of truth）——描述你的系統目前的行為。

**Changes** 是提議的修改——它們存放在獨立資料夾中，直到你準備好合併為止。

這種分離至關重要。你可以同時進行多個 Changes 而不產生衝突。你可以在 Changes 影響主要 Specs 之前進行審查。當你歸檔（Archive）一個 Change 時，其 Delta Specs 會乾淨地合併到唯一真實來源中。

## Specs

Specs 使用結構化的需求（Requirements）與情境（Scenarios）來描述系統的行為。

### 結構

```
openspec/specs/
├── auth/
│   └── spec.md           # Authentication behavior
├── payments/
│   └── spec.md           # Payment processing
├── notifications/
│   └── spec.md           # Notification system
└── ui/
    └── spec.md           # UI behavior and themes
```

依照領域（domain）組織 Specs——對你的系統有意義的邏輯分組。常見模式：

- **依功能區域**：`auth/`、`payments/`、`search/`
- **依元件**：`api/`、`frontend/`、`workers/`
- **依限界上下文**：`ordering/`、`fulfillment/`、`inventory/`

### Spec Format

一個 Spec 包含需求，而每個需求都有情境：

```markdown
# Auth Specification

## Purpose
Authentication and session management for the application.

## Requirements

### Requirement: User Authentication
The system SHALL issue a JWT token upon successful login.

#### Scenario: Valid credentials
- GIVEN a user with valid credentials
- WHEN the user submits login form
- THEN a JWT token is returned
- AND the user is redirected to dashboard

#### Scenario: Invalid credentials
- GIVEN invalid credentials
- WHEN the user submits login form
- THEN an error message is displayed
- AND no token is issued

### Requirement: Session Expiration
The system MUST expire sessions after 30 minutes of inactivity.

#### Scenario: Idle timeout
- GIVEN an authenticated session
- WHEN 30 minutes pass without activity
- THEN the session is invalidated
- AND the user must re-authenticate
```

**關鍵元素：**

| 元素 | 用途 |
|---------|---------|
| `## Purpose` | 此 Spec 領域的高層次描述 |
| `### Requirement:` | 系統必須具備的特定行為 |
| `#### Scenario:` | 需求的具體範例 |
| SHALL/MUST/SHOULD | RFC 2119 關鍵字，表示需求強度 |

### 為何以此方式結構化 Specs

**需求是「做什麼」** — 說明系統應該做什麼，而不指定實作方式。

**情境是「何時」** — 提供可驗證的具體範例。良好的情境：
- 可測試（你可以為它撰寫自動化測試）
- 涵蓋正常路徑與邊緣案例
- 使用 Given/When/Then 或類似的結構化格式

**RFC 2119 關鍵字**（SHALL、MUST、SHOULD、MAY）傳達意圖：
- **MUST/SHALL** — 絕對要求
- **SHOULD** — 建議，但可有例外
- **MAY** — 可選

### Spec 是什麼（以及不是什麼）

Spec 是**行為契約**，而非實作計畫。

良好的 Spec 內容：
- 使用者或下游系統所依賴的可觀察行為
- 輸入、輸出與錯誤條件
- 外部限制（安全性、隱私、可靠性、相容性）
- 可測試或明確驗證的情境

Spec 中應避免：
- 內部類別/函式名稱
- 函式庫或框架選擇
- 逐步實作細節
- 詳細的執行計畫（這些應放在 `design.md` 或 `tasks.md`）

快速測試：
- 如果實作可以在不改變外部可見行為的情況下變更，則它可能不屬於 Spec。

### 保持輕量：漸進式嚴謹度

OpenSpec 的目標是避免官僚主義。使用能讓變更可驗證的最輕量層級即可。

**Lite spec（預設）：**
- 簡短的行為優先需求
- 明確的範疇與非目標
- 幾個具體的驗收檢查項目

**Full spec（適用於較高風險）：**
- 跨團隊或跨 repo 的變更
- API/合約變更、遷移、安全性/隱私考量
- 歧義容易導致昂貴返工的變更

大多數變更應保持在 Lite 模式。

### 人類 + Agent 協作

在許多團隊中，人類負責探索，Agent 負責草擬產出物。預期的循環如下：

1. 人類提供意圖、背景與限制。
2. Agent 將其轉換為行為優先的需求與情境。
3. Agent 將實作細節保存在 `design.md` 和 `tasks.md`，而非 `spec.md`。
4. 驗證在實作前確認結構與清晰度。

這讓 Specs 對人類易讀，對 Agent 一致。

## Changes

Change 是對系統的提議修改，打包為一個資料夾，包含理解並實作它所需的一切。

### Change 結構

```
openspec/changes/add-dark-mode/
├── proposal.md           # Why and what
├── design.md             # How (technical approach)
├── tasks.md              # Implementation checklist
├── .openspec.yaml        # Change metadata (optional)
└── specs/                # Delta specs
    └── ui/
        └── spec.md       # What's changing in ui/spec.md
```

每個 Change 都是自包含的，包含：
- **Artifacts** — 捕捉意圖、設計與任務的文件
- **Delta Specs** — 描述新增、修改或移除內容的規格
- **Metadata** — 此特定 Change 的可選設定

### 為何 Changes 是資料夾

將 Change 打包為資料夾有幾項優點：

1. **所有內容集中。** proposal.md、design.md、tasks.md 和 Specs 都在同一個地方，不需要到處尋找。

2. **平行工作。** 多個 Changes 可以同時存在而不衝突。可以在進行 `fix-auth-bug` 的同時，也進行 `add-dark-mode`。

3. **乾淨的歷史。** 歸檔後，Changes 會移至 `changes/archive/`，並保留完整的背景資訊。你可以回顧並了解不只是發生了什麼變更，還有為什麼。

4. **便於審查。** Change 資料夾易於審查——開啟它、閱讀 proposal.md、檢查 design.md、查看 Delta Specs。

## Artifacts

Artifacts 是 Change 中引導工作的文件。

### Artifact 流程

```
proposal ──────► specs ──────► design ──────► tasks ──────► implement
    │               │             │              │
   why            what           how          steps
 + scope        changes       approach      to take
```

Artifacts 彼此建立於其上，每個 Artifact 為下一個提供背景。

### Artifact 類型

#### Proposal（`proposal.md`）

Proposal 在高層次上捕捉**意圖**、**範疇**與**方案**。

```markdown
# Proposal: Add Dark Mode

## Intent
Users have requested a dark mode option to reduce eye strain
during nighttime usage and match system preferences.

## Scope
In scope:
- Theme toggle in settings
- System preference detection
- Persist preference in localStorage

Out of scope:
- Custom color themes (future work)
- Per-page theme overrides

## Approach
Use CSS custom properties for theming with a React context
for state management. Detect system preference on first load,
allow manual override.
```

**何時更新 proposal.md：**
- 範疇變更（縮小或擴大）
- 意圖釐清（對問題有更好的理解）
- 方案根本轉變

#### Specs（`specs/` 中的 Delta Specs）

Delta Specs 描述相對於目前 Specs 的**變更內容**。請參閱下方的 [Delta Specs](#delta-specs)。

#### Design（`design.md`）

Design 捕捉**技術方案**與**架構決策**。

````markdown
# Design: Add Dark Mode

## Technical Approach
Theme state managed via React Context to avoid prop drilling.
CSS custom properties enable runtime switching without class toggling.

## Architecture Decisions

### Decision: Context over Redux
Using React Context for theme state because:
- Simple binary state (light/dark)
- No complex state transitions
- Avoids adding Redux dependency

### Decision: CSS Custom Properties
Using CSS variables instead of CSS-in-JS because:
- Works with existing stylesheet
- No runtime overhead
- Browser-native solution

## Data Flow
```
ThemeProvider (context)
       │
       ▼
ThemeToggle ◄──► localStorage
       │
       ▼
CSS Variables (applied to :root)
```

## File Changes
- `src/contexts/ThemeContext.tsx` (new)
- `src/components/ThemeToggle.tsx` (new)
- `src/styles/globals.css` (modified)
````

**何時更新 design.md：**
- 實作發現方案無法運作
- 發現更好的解決方案
- 相依性或限制發生變更

#### Tasks（`tasks.md`）

Tasks 是**實作清單**——附有核取方塊的具體步驟。

```markdown
# Tasks

## 1. Theme Infrastructure
- [ ] 1.1 Create ThemeContext with light/dark state
- [ ] 1.2 Add CSS custom properties for colors
- [ ] 1.3 Implement localStorage persistence
- [ ] 1.4 Add system preference detection

## 2. UI Components
- [ ] 2.1 Create ThemeToggle component
- [ ] 2.2 Add toggle to settings page
- [ ] 2.3 Update Header to include quick toggle

## 3. Styling
- [ ] 3.1 Define dark theme color palette
- [ ] 3.2 Update components to use CSS variables
- [ ] 3.3 Test contrast ratios for accessibility
```

**Tasks 最佳實踐：**
- 在標題下將相關任務分組
- 使用層級編號（1.1、1.2 等）
- 讓任務小到可以在一個工作階段內完成
- 完成後勾選任務

## Delta Specs

Delta Specs 是讓 OpenSpec 在既有專案（brownfield）開發中運作的關鍵概念。它們描述**變更的內容**，而非重述整個 Spec。

### 格式

```markdown
# Delta for Auth

## ADDED Requirements

### Requirement: Two-Factor Authentication
The system MUST support TOTP-based two-factor authentication.

#### Scenario: 2FA enrollment
- GIVEN a user without 2FA enabled
- WHEN the user enables 2FA in settings
- THEN a QR code is displayed for authenticator app setup
- AND the user must verify with a code before activation

#### Scenario: 2FA login
- GIVEN a user with 2FA enabled
- WHEN the user submits valid credentials
- THEN an OTP challenge is presented
- AND login completes only after valid OTP

## MODIFIED Requirements

### Requirement: Session Expiration
The system MUST expire sessions after 15 minutes of inactivity.
(Previously: 30 minutes)

#### Scenario: Idle timeout
- GIVEN an authenticated session
- WHEN 15 minutes pass without activity
- THEN the session is invalidated

## REMOVED Requirements

### Requirement: Remember Me
(Deprecated in favor of 2FA. Users should re-authenticate each session.)
```

### Delta 區段

| 區段 | 意義 | 歸檔時發生什麼 |
|---------|---------|------------------------|
| `## ADDED Requirements` | 新行為 | 附加至主要 Spec |
| `## MODIFIED Requirements` | 已變更的行為 | 取代既有需求 |
| `## REMOVED Requirements` | 已棄用的行為 | 從主要 Spec 刪除 |

### 為何使用 Deltas 而非完整 Specs

**清晰度。** Delta 能精確顯示變更的內容。閱讀完整 Spec 時，你必須在腦中與目前版本進行比對。

**避免衝突。** 兩個 Changes 可以修改同一個 Spec 檔案而不衝突，只要它們修改的是不同的需求。

**審查效率。** 審查者看到的是變更，而非未變更的背景。專注在重要的事情上。

**既有專案適配。** 大多數工作是修改既有行為。Deltas 讓修改成為一等公民，而非事後才考慮的事情。

## Schemas

Schemas 定義工作流程中的 Artifact 類型及其依賴關係。

### Schemas 如何運作

```yaml
# openspec/schemas/spec-driven/schema.yaml
name: spec-driven
artifacts:
  - id: proposal
    generates: proposal.md
    requires: []              # No dependencies, can create first

  - id: specs
    generates: specs/**/*.md
    requires: [proposal]      # Needs proposal before creating

  - id: design
    generates: design.md
    requires: [proposal]      # Can create in parallel with specs

  - id: tasks
    generates: tasks.md
    requires: [specs, design] # Needs both specs and design first
```

**Artifacts 形成依賴關係圖（dependency graph）：**

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

**依賴關係是啟用者，而非閘門。** 它們顯示可以建立什麼，而非你必須接下來建立什麼。如果不需要，你可以跳過 design.md。你可以在 design.md 之前或之後建立 Specs——兩者都只依賴 proposal.md。

### 內建 Schemas

**spec-driven**（預設）

規格驅動開發的標準工作流程：

```
proposal → specs → design → tasks → implement
```

最適合：大多數功能開發，當你希望在實作前對 Specs 達成共識時。

### 自訂 Schemas

為你的團隊工作流程建立自訂 Schemas：

```bash
# Create from scratch
openspec schema init research-first

# Or fork an existing one
openspec schema fork spec-driven research-first
```

**自訂 Schema 範例：**

```yaml
# openspec/schemas/research-first/schema.yaml
name: research-first
artifacts:
  - id: research
    generates: research.md
    requires: []           # Do research first

  - id: proposal
    generates: proposal.md
    requires: [research]   # Proposal informed by research

  - id: tasks
    generates: tasks.md
    requires: [proposal]   # Skip specs/design, go straight to tasks
```

請參閱 [Customization](customization.md) 以了解建立和使用自訂 Schemas 的完整詳情。

## 歸檔

歸檔（Archiving）透過將 Delta Specs 合併到主要 Specs 並保留 Change 供歷史查閱，來完成一個 Change。

### 歸檔時發生什麼

```
Before archive:

openspec/
├── specs/
│   └── auth/
│       └── spec.md ◄────────────────┐
└── changes/                         │
    └── add-2fa/                     │
        ├── proposal.md              │
        ├── design.md                │ merge
        ├── tasks.md                 │
        └── specs/                   │
            └── auth/                │
                └── spec.md ─────────┘


After archive:

openspec/
├── specs/
│   └── auth/
│       └── spec.md        # Now includes 2FA requirements
└── changes/
    └── archive/
        └── 2025-01-24-add-2fa/    # Preserved for history
            ├── proposal.md
            ├── design.md
            ├── tasks.md
            └── specs/
                └── auth/
                    └── spec.md
```

### 歸檔流程

1. **合併 Deltas。** 每個 Delta Spec 區段（ADDED/MODIFIED/REMOVED）被應用到對應的主要 Spec。

2. **移至歸檔。** Change 資料夾移至 `changes/archive/`，並加上日期前綴以便按時間順序排列。

3. **保留背景。** 所有 Artifacts 在歸檔中保持完整。你隨時可以回顧，了解為何進行此次變更。

### 為何歸檔很重要

**乾淨的狀態。** 進行中的 Changes（`changes/`）只顯示進行中的工作，已完成的工作會移出視野。

**稽核軌跡。** 歸檔保留每次變更的完整背景——不只是變更了什麼，還有說明為什麼的 proposal.md、說明如何做的 design.md，以及顯示已完成工作的 tasks.md。

**Spec 演進。** Specs 隨著 Changes 的歸檔而有機成長。每次歸檔都合併其 Deltas，隨時間建立起完整的規格。

## 一切如何組合在一起

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              OPENSPEC FLOW                                   │
│                                                                              │
│   ┌────────────────┐                                                         │
│   │  1. START      │  /opsx:propose (core) or /opsx:new (expanded)           │
│   │     CHANGE     │                                                         │
│   └───────┬────────┘                                                         │
│           │                                                                  │
│           ▼                                                                  │
│   ┌────────────────┐                                                         │
│   │  2. CREATE     │  /opsx:ff or /opsx:continue (expanded workflow)         │
│   │     ARTIFACTS  │  Creates proposal → specs → design → tasks              │
│   │                │  (based on schema dependencies)                         │
│   └───────┬────────┘                                                         │
│           │                                                                  │
│           ▼                                                                  │
│   ┌────────────────┐                                                         │
│   │  3. IMPLEMENT  │  /opsx:apply                                            │
│   │     TASKS      │  Work through tasks, checking them off                  │
│   │                │◄──── Update artifacts as you learn                      │
│   └───────┬────────┘                                                         │
│           │                                                                  │
│           ▼                                                                  │
│   ┌────────────────┐                                                         │
│   │  4. VERIFY     │  /opsx:verify (optional)                                │
│   │     WORK       │  Check implementation matches specs                     │
│   └───────┬────────┘                                                         │
│           │                                                                  │
│           ▼                                                                  │
│   ┌────────────────┐     ┌──────────────────────────────────────────────┐    │
│   │  5. ARCHIVE    │────►│  Delta specs merge into main specs           │    │
│   │     CHANGE     │     │  Change folder moves to archive/             │    │
│   └────────────────┘     │  Specs are now the updated source of truth   │    │
│                          └──────────────────────────────────────────────┘    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

**良性循環：**

1. Specs 描述目前的行為
2. Changes 提議修改（以 Deltas 形式）
3. 實作讓變更成真
4. 歸檔將 Deltas 合併到 Specs
5. Specs 現在描述新的行為
6. 下一個 Change 建立在更新後的 Specs 之上

## 術語表

| 術語 | 定義 |
|------|------------|
| **Artifact** | Change 中的文件（proposal.md、design.md、tasks.md 或 Delta Specs） |
| **Archive（歸檔）** | 完成一個 Change 並將其 Deltas 合併到主要 Specs 的流程 |
| **Change** | 對系統的提議修改，打包為含有 Artifacts 的資料夾 |
| **Delta spec** | 描述相對於目前 Specs 的變更（ADDED/MODIFIED/REMOVED）的 Spec |
| **Domain（領域）** | Specs 的邏輯分組（例如 `auth/`、`payments/`） |
| **Requirement（需求）** | 系統必須具備的特定行為 |
| **Scenario（情境）** | 需求的具體範例，通常採用 Given/When/Then 格式 |
| **Schema** | Artifact 類型及其依賴關係的定義 |
| **Spec** | 描述系統行為的規格，包含需求與情境 |
| **Source of truth（唯一真實來源）** | `openspec/specs/` 目錄，包含目前已達成共識的行為 |

## 下一步

- [Getting Started](getting-started.md) - 實用的第一步
- [Workflows](workflows.md) - 常見模式與使用時機
- [Commands](commands.md) - 完整指令參考
- [Customization](customization.md) - 建立自訂 Schemas 並設定你的專案

### 本文原始連結

[OpenSpec 官方文件](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)

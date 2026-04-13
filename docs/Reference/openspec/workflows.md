---
sidebar_position: 6
title: "OpenSpec 工作流程"
description: "OpenSpec 常見的工作流程模式，包含快速功能、探索式、平行變更等模式的使用時機與最佳實踐"
tags: [OpenSpec]
last_update:
  date: 2026-04-13
  author: Danny
---

# 工作流程

本指南涵蓋 OpenSpec 的常見工作流程模式，以及各模式的適用時機。基本設定請參閱 [Getting Started](getting-started.md)，指令參考請參閱 [Commands](commands.md)。

## 理念：行動，而非階段

傳統工作流程會強迫你經歷固定階段：先規劃、再實作、最後完成。但真實的工作並不會如此整齊地套入框架。

OPSX 採用不同的做法：

```text
Traditional (phase-locked):

  PLANNING ────────► IMPLEMENTING ────────► DONE
      │                    │
      │   "Can't go back"  │
      └────────────────────┘

OPSX (fluid actions):

  proposal ──► specs ──► design ──► tasks ──► implement
```

**核心原則：**

- **行動，而非階段** - 指令是你可以執行的操作，而非你被困住的固定階段
- **依賴關係是促進因素** - 它們顯示的是什麼是可行的，而非下一步必須做什麼

> **客製化：** OPSX 的工作流程由定義 artifact 序列的 schema 驅動。詳情請參閱 [Customization](customization.md)，了解如何建立自訂 schema。

## 兩種模式

### 預設快速路徑（`core` profile）

新安裝預設使用 `core`，提供：
- `/opsx:propose`
- `/opsx:explore`
- `/opsx:apply`
- `/opsx:archive`

典型流程：

```text
/opsx:propose ──► /opsx:apply ──► /opsx:archive
```

### 擴展／完整工作流程（自訂選擇）

若要啟用明確的 scaffold 與建置指令（`/opsx:new`、`/opsx:continue`、`/opsx:ff`、`/opsx:verify`、`/opsx:sync`、`/opsx:bulk-archive`、`/opsx:onboard`），請執行以下指令啟用：

```bash
openspec config profile
openspec update
```

## 工作流程模式（擴展模式）

### 快速功能

當你清楚知道要建置什麼，只需要執行時：

```text
/opsx:new ──► /opsx:ff ──► /opsx:apply ──► /opsx:verify ──► /opsx:archive
```

**對話範例：**

```text
You: /opsx:new add-logout-button

AI:  Created openspec/changes/add-logout-button/
     Ready to create: proposal

You: /opsx:ff

AI:  Creating all planning artifacts...
     ✓ proposal.md
     ✓ specs/
     ✓ design.md
     ✓ tasks.md
     Ready for implementation!

You: /opsx:apply

AI:  Working through tasks...
     ✓ Added logout button to header
     ✓ Implemented session clearing
     ✓ Added confirmation dialog
     All tasks complete!

You: /opsx:archive

AI:  ✓ Merged specs
     ✓ Archived change
```

**最適合：** 中小型功能、錯誤修復、直觀明確的變更。

### 探索式

當需求不明確或需要先進行調查時：

```text
/opsx:explore ──► /opsx:new ──► /opsx:continue ──► ... ──► /opsx:apply
```

**對話範例：**

```text
You: /opsx:explore

AI:  What would you like to explore?

You: I want to improve page load performance but I'm not sure
     where the bottlenecks are.

AI:  Let me help investigate...
     [Analyzes bundle sizes, identifies slow queries, reviews
     component render patterns]

     I found three main bottlenecks:
     1. Large unoptimized images
     2. Synchronous data fetching in ProductList
     3. Re-renders from context changes

     Which would you like to address first?

You: Let's tackle the data fetching issue.

You: /opsx:new optimize-product-list-fetching

AI:  Created change. Ready to create: proposal

You: /opsx:continue

AI:  Creating proposal based on our exploration...
     [Writes proposal incorporating investigation insights]

     Ready to create: specs, design
     Which would you like next?

You: /opsx:continue

AI:  Creating specs...
```

**最適合：** 效能優化、除錯、架構決策、需求不明確的情境。

### 平行變更

同時處理多個變更：

```text
Change A: /opsx:new ──► /opsx:ff ──► /opsx:apply (in progress)
                                         │
                                    context switch
                                         │
Change B: /opsx:new ──► /opsx:ff ──────► /opsx:apply
```

**對話範例：**

```text
You: I'm working on add-dark-mode but got pulled into a bug fix

You: /opsx:new fix-login-redirect

AI:  Created openspec/changes/fix-login-redirect/

You: /opsx:ff

AI:  ✓ Created planning artifacts

You: /opsx:apply

AI:  Working on fix-login-redirect...
     [Implements the fix]
     All tasks complete!

You: /opsx:archive

AI:  ✓ Archived fix-login-redirect

You: Let's get back to dark mode

You: /opsx:apply add-dark-mode

AI:  Resuming add-dark-mode...
     Picking up at task 2.3: Update Header...
```

**最適合：** 平行工作流、緊急插單處理、團隊協作。

當有多個已完成的變更時，使用 `/opsx:bulk-archive`：

```text
You: /opsx:bulk-archive

AI:  Found 3 completed changes:
     - add-dark-mode (all tasks done)
     - fix-login-redirect (all tasks done)
     - update-footer (all tasks done)

     Checking for spec conflicts...
     ⚠ add-dark-mode and update-footer both touch specs/ui/

     Inspecting codebase to resolve...
     Both changes are implemented. Will apply in chronological order.

     Archive all 3 changes?

You: Yes

AI:  ✓ Archived add-dark-mode
     ✓ Archived fix-login-redirect
     ✓ Archived update-footer
     Specs merged in order: add-dark-mode → update-footer
```

Bulk archive 會偵測多個變更觸及相同 spec 的情況，並透過檢查實際已實作的內容來解決衝突。

### 完成變更

建議的完成流程：

```text
/opsx:apply ──► /opsx:verify ──► /opsx:archive
                    │                 │
              validates          prompts to sync
              implementation     if needed
```

#### Verify：檢查你的工作

`/opsx:verify` 從三個維度驗證實作是否符合你的 artifact：

```text
You: /opsx:verify

AI:  Verifying add-auth...

     COMPLETENESS
     ✓ All 12 tasks in tasks.md are checked
     ✓ All requirements in specs have corresponding code
     ⚠ Scenario "Session timeout after inactivity" not tested

     CORRECTNESS
     ✓ Implementation matches spec intent
     ✓ Edge cases from scenarios are handled
     ✓ Error states match spec definitions

     COHERENCE
     ✓ Design decisions reflected in code structure
     ✓ Naming conventions consistent with design.md
     ⚠ Design mentions "event-driven" but implementation uses polling

     SUMMARY
     ─────────────────────────────
     Critical issues: 0
     Warnings: 2
     Ready to archive: Yes (with warnings)

     Recommendations:
     1. Add test for session timeout scenario
     2. Consider refactoring to event-driven as designed, or update design.md
```

**Verify 的檢查項目：**

| 維度 | 驗證內容 |
|------|---------|
| Completeness（完整性） | 所有任務已完成、所有需求已實作、scenario 已涵蓋 |
| Correctness（正確性） | 實作符合 spec 意圖、邊界案例已處理 |
| Coherence（一致性） | 設計決策反映於程式碼中、模式保持一致 |

Verify 不會阻擋 archive，但會浮現你可能需要先處理的問題。

#### Archive：完成變更

`/opsx:archive` 完成變更並將其移至封存區：

```text
You: /opsx:archive

AI:  Archiving add-auth...

     Artifact status:
     ✓ proposal.md exists
     ✓ specs/ exists
     ✓ design.md exists
     ✓ tasks.md exists (12/12 tasks complete)

     Delta specs: Not yet synced to main
     → Would you like to sync now?

You: Yes

AI:  ✓ Synced specs to openspec/specs/auth/spec.md
     ✓ Moved to openspec/changes/archive/2025-01-24-add-auth/

     Change archived successfully.
```

若 spec 尚未同步，archive 會提示你。任務未完成不會阻擋 archive，但會出現警告。

## 何時使用哪個指令

### `/opsx:ff` 與 `/opsx:continue`

| 情境 | 使用 |
|------|------|
| 需求明確，準備好建置 | `/opsx:ff` |
| 探索中，想逐步審查每個步驟 | `/opsx:continue` |
| 想在建立 spec 前先迭代 proposal | `/opsx:continue` |
| 時間緊迫，需要快速推進 | `/opsx:ff` |
| 變更複雜，需要掌控節奏 | `/opsx:continue` |

**經驗法則：** 如果你能一開始就描述完整範疇，使用 `/opsx:ff`。如果你是邊做邊釐清，使用 `/opsx:continue`。

### 何時更新現有變更，何時重新開始

常見問題：什麼時候更新現有變更是合適的，什麼時候應該重新開始一個新的？

**更新現有變更的時機：**

- 意圖相同，只是調整執行方式
- 範疇縮小（先做 MVP，其餘之後再處理）
- 基於學習的修正（程式碼庫與預期不同）
- 根據實作發現進行的設計調整

**重新開始新變更的時機：**

- 意圖根本性地改變
- 範疇擴展為完全不同的工作
- 原始變更可以獨立標記為「已完成」
- 修補方式會讓人更困惑而非更清晰

```text
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

**範例：「新增深色模式」**

- 「還需要支援自訂主題」→ 新變更（範疇爆炸）
- 「系統偏好設定偵測比預期困難」→ 更新（意圖相同）
- 「先推出切換開關，稍後再加偏好設定」→ 更新後封存，再建立新變更

## 最佳實踐

### 保持變更聚焦

每個變更只做一個邏輯工作單元。如果你同時在「新增功能 X 並重構 Y」，請考慮拆成兩個獨立的變更。

**為何重要：**
- 更容易審查和理解
- 封存歷史更整潔
- 可以獨立發布
- 需要時回溯更簡單

### 對需求不明確時使用 `/opsx:explore`

在承諾建立變更之前，先探索問題空間：

```text
You: /opsx:explore

AI:  What would you like to explore?

You: How should we handle rate limiting for our API?

AI:  Let me investigate your current setup and options...
     [Researches codebase, considers patterns]

     I see three approaches we could take:
     1. Middleware-based (simple, per-endpoint)
     2. Redis-backed (scalable, shared state)
     3. Token bucket per user (fair, complex)

     Your current stack suggests #1 or #2. What's your scale?
```

探索能在你建立 artifact 之前釐清思路。

### 封存前先 Verify

使用 `/opsx:verify` 確認實作符合 artifact：

```text
You: /opsx:verify

AI:  Verifying add-dark-mode...

     ✓ All tasks in tasks.md are checked
     ✓ Requirements in specs have corresponding code
     ✓ Design decisions are reflected in implementation

     Ready to archive!
```

在結束變更前捕捉不一致之處。

### 為變更取有意義的名稱

好的名稱讓 `openspec list` 更實用：

```text
好的命名：                     避免使用：
add-dark-mode                  feature-1
fix-login-redirect             update
optimize-product-query         changes
implement-2fa                  wip
```

## 指令快速參考

完整的指令詳情與選項，請參閱 [Commands](commands.md)。

| 指令 | 用途 | 使用時機 |
|------|------|---------|
| `/opsx:propose` | 建立變更與規劃 artifact | 快速預設路徑（`core` profile） |
| `/opsx:explore` | 思考構想 | 需求不明確、需要調查時 |
| `/opsx:new` | 啟動變更 scaffold | 擴展模式、需要明確 artifact 控制時 |
| `/opsx:continue` | 建立下一個 artifact | 擴展模式、逐步建立 artifact 時 |
| `/opsx:ff` | 建立所有規劃 artifact | 擴展模式、範疇明確時 |
| `/opsx:apply` | 實作任務 | 準備好撰寫程式碼時 |
| `/opsx:verify` | 驗證實作 | 擴展模式、封存前 |
| `/opsx:sync` | 合併 delta spec | 擴展模式、可選 |
| `/opsx:archive` | 完成變更 | 所有工作完成後 |
| `/opsx:bulk-archive` | 封存多個變更 | 擴展模式、平行工作時 |

## 下一步

- [Commands](commands.md) - 含選項的完整指令參考
- [Concepts](concepts.md) - 深入了解 spec、artifact 與 schema
- [Customization](customization.md) - 建立自訂工作流程

### 本文原始連結

[OpenSpec 官方文件](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md)

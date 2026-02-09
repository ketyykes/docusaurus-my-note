---
sidebar_position: 3
title: "Agent Skills 格式規格"
description: Agent Skills 的完整格式規格文件
tags:
  - Agent Skills
  - Specification
  - SKILL.md
last_update:
  date: 2025-12-25
  author: Danny
---

# Agent Skills 格式規格

## 前言

本文件定義了 Agent Skills 的格式規格，涵蓋目錄結構、SKILL.md 檔案格式、frontmatter 欄位規範、漸進式揭露機制以及驗證方式。

## 目錄結構

一個 Skill 是一個至少包含 `SKILL.md` 檔案的目錄：

```
skill-name/
└── SKILL.md          # 必要
```

:::tip
你可以選擇性地加入[額外的目錄](#選用目錄)，例如 `scripts/`、`references/` 和 `assets/` 來支援你的 Skill。
:::

## SKILL.md 格式

`SKILL.md` 檔案必須包含 YAML frontmatter，後接 Markdown 內容。

### Frontmatter（必要）

```yaml
---
name: skill-name
description: A description of what this skill does and when to use it.
---
```

加上選用欄位的範例：

```yaml
---
name: pdf-processing
description: Extract text and tables from PDF files, fill forms, merge documents.
license: Apache-2.0
metadata:
  author: example-org
  version: "1.0"
---
```

| 欄位 | 必要 | 限制 |
|------|------|------|
| `name` | 是 | 最多 64 個字元。僅限小寫字母、數字和連字號。不得以連字號開頭或結尾。 |
| `description` | 是 | 最多 1024 個字元。不得為空。描述此 Skill 的功能及使用時機。 |
| `license` | 否 | 授權名稱或附帶的授權檔案參考。 |
| `compatibility` | 否 | 最多 500 個字元。說明環境需求（目標產品、系統套件、網路存取等）。 |
| `metadata` | 否 | 任意的鍵值對映射，用於額外的中繼資料。 |
| `allowed-tools` | 否 | 以空格分隔的預先核准工具清單，供 Skill 使用。（實驗性功能） |

#### `name` 欄位

必要的 `name` 欄位：
- 必須為 1-64 個字元
- 僅能包含 Unicode 小寫英數字元和連字號（`a-z` 和 `-`）
- 不得以 `-` 開頭或結尾
- 不得包含連續的連字號（`--`）
- 必須與上層目錄名稱一致

合法範例：
```yaml
name: pdf-processing
```
```yaml
name: data-analysis
```
```yaml
name: code-review
```

不合法範例：
```yaml
name: PDF-Processing  # 不允許大寫
```
```yaml
name: -pdf  # 不能以連字號開頭
```
```yaml
name: pdf--processing  # 不允許連續的連字號
```

#### `description` 欄位

必要的 `description` 欄位：
- 必須為 1-1024 個字元
- 應描述此 Skill 的功能及使用時機
- 應包含能幫助代理辨識相關任務的特定關鍵字

好的範例：
```yaml
description: Extracts text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with PDF documents or when the user mentions PDFs, forms, or document extraction.
```

不好的範例：
```yaml
description: Helps with PDFs.
```

#### `license` 欄位

選用的 `license` 欄位：
- 指定套用於此 Skill 的授權
- 建議保持簡短（授權名稱或附帶的授權檔案名稱）

範例：
```yaml
license: Proprietary. LICENSE.txt has complete terms
```

#### `compatibility` 欄位

選用的 `compatibility` 欄位：
- 若提供，必須為 1-500 個字元
- 僅在你的 Skill 有特定環境需求時才需要加入
- 可說明目標產品、所需的系統套件、網路存取需求等

範例：
```yaml
compatibility: Designed for Claude Code (or similar products)
```
```yaml
compatibility: Requires git, docker, jq, and access to the internet
```

:::note
大多數 Skills 不需要 `compatibility` 欄位。
:::

#### `metadata` 欄位

選用的 `metadata` 欄位：
- 從字串鍵到字串值的映射
- 客戶端可用此儲存 Agent Skills 規格未定義的額外屬性
- 建議使用具有合理唯一性的鍵名，以避免意外衝突

範例：
```yaml
metadata:
  author: example-org
  version: "1.0"
```

#### `allowed-tools` 欄位

選用的 `allowed-tools` 欄位：
- 以空格分隔的預先核准執行工具清單
- 實驗性功能。不同代理實作對此欄位的支援程度可能不同

範例：
```yaml
allowed-tools: Bash(git:*) Bash(jq:*) Read
```

### 主體內容

frontmatter 之後的 Markdown 主體包含 Skill 的指令。格式沒有限制，寫任何有助於代理有效執行任務的內容即可。

建議包含的章節：
- 步驟式操作指引
- 輸入和輸出範例
- 常見的邊界情況

請注意，代理在決定啟用某個 Skill 後會載入整個檔案。考慮將較長的 `SKILL.md` 內容拆分到引用的檔案中。

## 選用目錄

### scripts/

包含代理可執行的程式碼。腳本應：
- 自成一體或清楚記錄相依性
- 包含有用的錯誤訊息
- 妥善處理邊界情況

支援的程式語言取決於代理的實作。常見的選項包括 Python、Bash 和 JavaScript。

### references/

包含代理在需要時可讀取的額外文件：
- `REFERENCE.md` — 詳細的技術參考
- `FORMS.md` — 表單範本或結構化資料格式
- 領域專屬檔案（`finance.md`、`legal.md` 等）

保持個別[參考檔案](#檔案引用)的焦點集中。代理按需載入這些檔案，因此檔案越小，佔用的上下文越少。

### assets/

包含靜態資源：
- 範本（文件範本、設定範本）
- 圖片（圖表、範例）
- 資料檔案（查詢表、結構描述）

## 漸進式揭露

Skills 應以高效使用上下文的方式來組織結構：

1. **中繼資料**（約 100 個 token）：啟動時載入所有 Skills 的 `name` 和 `description` 欄位
2. **指令**（建議少於 5000 個 token）：Skill 被啟用時載入完整的 `SKILL.md` 主體
3. **資源**（按需載入）：檔案（例如 `scripts/`、`references/` 或 `assets/` 中的檔案）僅在需要時載入

將主要的 `SKILL.md` 保持在 500 行以內。將詳細的參考資料移至獨立檔案。

## 檔案引用

在 Skill 中引用其他檔案時，使用相對於 Skill 根目錄的相對路徑：

```markdown
See [the reference guide](references/REFERENCE.md) for details.

Run the extraction script:
scripts/extract.py
```

將檔案引用保持在 `SKILL.md` 的一層深度內。避免深層巢狀的引用鏈。

## 驗證

使用 [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) 參考函式庫來驗證你的 Skills：

```bash
skills-ref validate ./my-skill
```

這會檢查你的 `SKILL.md` frontmatter 是否有效，並遵循所有命名慣例。

## 小結

Agent Skills 格式以 `SKILL.md` 為核心，透過簡潔的 YAML frontmatter 定義中繼資料，搭配 Markdown 指令內容，並可選擇性地附帶腳本、參考資料和素材。漸進式揭露機制確保代理能高效地使用上下文資源。

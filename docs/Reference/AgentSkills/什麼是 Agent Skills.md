---
sidebar_position: 2
title: "什麼是 Agent Skills"
description: Agent Skills 是一種輕量、開放的格式，用於以專業知識和工作流程擴展 AI 代理的能力
tags:
  - Agent Skills
  - SKILL.md
  - Tutorial
last_update:
  date: 2025-12-25
  author: Danny
---

# 什麼是 Agent Skills

## 前言

Agent Skills 的核心概念很簡單：一個包含 `SKILL.md` 檔案的資料夾。這個檔案包含中繼資料（至少需要 `name` 和 `description`）以及告訴代理如何執行特定任務的指令。Skills 也可以附帶腳本、範本和參考資料。

```directory
my-skill/
├── SKILL.md          # 必要：指令 + 中繼資料
├── scripts/          # 選用：可執行的程式碼
├── references/       # 選用：參考文件
└── assets/           # 選用：範本、資源
```

## Skills 如何運作

Skills 使用**漸進式揭露（Progressive Disclosure）**來高效管理上下文：

1. **探索（Discovery）**：啟動時，代理僅載入每個可用 Skill 的名稱和描述，這足以讓它判斷何時可能需要該 Skill。

2. **啟用（Activation）**：當任務符合某個 Skill 的描述時，代理會將完整的 `SKILL.md` 指令讀入上下文。

3. **執行（Execution）**：代理依照指令操作，視需要載入引用的檔案或執行附帶的程式碼。

這種方式讓代理保持高效運作，同時能按需存取更多上下文。

## SKILL.md 檔案

每個 Skill 都以一個 `SKILL.md` 檔案開始，包含 YAML frontmatter 和 Markdown 指令：

```markdown
---
name: pdf-processing
description: Extract text and tables from PDF files, fill forms, merge documents.
---

# PDF Processing

## When to use this skill
Use this skill when the user needs to work with PDF files...

## How to extract text
1. Use pdfplumber for text extraction...

## How to fill forms
...
```

以下 frontmatter 欄位是 `SKILL.md` 頂部必須包含的：

- `name`：簡短的識別名稱
- `description`：何時應使用此 Skill

Markdown 主體包含實際的指令內容，對結構或內容沒有特定限制。

這種簡單的格式有幾個關鍵優勢：

- **自文件化（Self-documenting）**：Skill 作者或使用者可以閱讀 `SKILL.md` 就理解它的用途，讓 Skills 易於審核和改進。

- **可擴展（Extensible）**：Skills 的複雜度範圍很廣，從純文字指令到可執行的程式碼、素材和範本都可以。

- **可攜帶（Portable）**：Skills 本質上就是檔案，因此易於編輯、版控和分享。

## 後續步驟

- [查看格式規格](Agent%20Skills%20格式規格.md) — 了解完整的格式內容。
- [在你的代理中加入 Skills 支援](將%20Skills%20整合到你的代理.md) — 建置相容的客戶端。
- [查看範例 Skills](https://github.com/anthropics/skills) — 在 GitHub 上瀏覽。
- [閱讀撰寫最佳實務](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) — 撰寫有效 Skills 的指南。
- [使用參考函式庫](Skills%20參考函式庫.md) — 驗證 Skills 並產生提示詞 XML。

## 小結

Agent Skills 是一種以 `SKILL.md` 為核心的輕量格式，透過漸進式揭露讓代理高效地使用專業知識。其自文件化、可擴展、可攜帶的特性使其成為擴展 AI 代理能力的理想選擇。

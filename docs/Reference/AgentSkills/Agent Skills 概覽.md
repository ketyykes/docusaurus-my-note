---
sidebar_position: 1
title: "Agent Skills 概覽"
description: 一種簡單、開放的格式，為 AI 代理賦予新的能力與專業知識
tags:
  - Agent Skills
  - AI
  - Overview
last_update:
  date: 2025-12-25
  author: Danny
---

# Agent Skills 概覽

## 前言

Agent Skills 是由資料夾組成的指令、腳本與資源集合，讓代理能夠自動發現並使用這些技能，更精確且高效地完成任務。

## 為什麼需要 Agent Skills？

AI 代理的能力越來越強大，但往往缺乏執行實際工作所需的上下文資訊。Skills 透過提供程序性知識，以及公司、團隊和使用者專屬的上下文資訊來解決這個問題，讓代理能夠按需載入。擁有一組 Skills 的代理可以根據當前任務動態擴展自己的能力。

**對於 Skill 作者**：只需編寫一次，即可部署到多個代理產品中。

**對於相容的代理產品**：支援 Skills 讓終端使用者能直接為代理添加新功能。

**對於團隊與企業**：將組織知識封裝為可攜帶、可版本控制的套件。

## Agent Skills 能實現什麼？

- **領域專業知識**：將專業知識打包為可重用的指令，從法律審查流程到資料分析管線。
- **新增能力**：賦予代理新的能力（例如建立簡報、建置 MCP 伺服器、分析資料集）。
- **可重複的工作流程**：將多步驟任務轉化為一致且可稽核的工作流程。
- **互通性**：在不同的相容代理產品之間重複使用相同的 Skill。

## 採用狀況

Agent Skills 已獲得多個主流 AI 開發工具的支援，包括 Claude Code、Cursor、Windsurf、Cline、Augment、Zed 等產品。

## 開放開發

Agent Skills 格式最初由 [Anthropic](https://www.anthropic.com/) 開發，以開放標準發布，目前已被越來越多的代理產品採用。此標準歡迎更廣泛的生態系統貢獻。

[在 GitHub 上查看](https://github.com/agentskills/agentskills)

## 開始使用

- [什麼是 Skills？](什麼是%20Agent%20Skills.md) — 了解 Skills 的運作方式及其重要性。
- [格式規格](Agent%20Skills%20格式規格.md) — SKILL.md 檔案的完整格式規格。
- [整合 Skills](將%20Skills%20整合到你的代理.md) — 在你的代理或工具中加入 Skills 支援。
- [範例 Skills](https://github.com/anthropics/skills) — 在 GitHub 上瀏覽範例 Skills。
- [參考函式庫](Skills%20參考函式庫.md) — 驗證 Skills 並產生提示詞 XML。

## 小結

Agent Skills 提供了一種簡潔、開放的方式，讓 AI 代理能夠按需學習新技能。無論你是 Skill 作者、代理開發者還是企業用戶，都能從這個開放格式中受益。

---
sidebar_position: 4
title: "將 Skills 整合到你的代理"
description: 如何在你的代理或工具中加入 Agent Skills 支援
tags:
  - Agent Skills
  - Integration
  - Agent
last_update:
  date: 2025-12-25
  author: Danny
---

# 將 Skills 整合到你的代理

## 前言

本指南說明如何在 AI 代理或開發工具中加入 Skills 支援，涵蓋兩種主要整合方式、探索與載入流程、安全考量以及參考實作。

## 整合方式

整合 Skills 有兩種主要方式：

**基於檔案系統的代理**：在電腦環境（bash/unix）中運作，是最具能力的選項。當模型發出像 `cat /path/to/my-skill/SKILL.md` 這樣的 shell 指令時，Skills 就會被啟用。附帶的資源透過 shell 指令存取。

**基於工具的代理**：不需要專屬的電腦環境。它們實作工具來讓模型觸發 Skills 並存取附帶的素材。具體的工具實作由開發者決定。

## 概覽

一個相容 Skills 的代理需要：

1. **探索**設定目錄中的 Skills
2. **載入中繼資料**（名稱和描述）於啟動時
3. **匹配**使用者任務與相關的 Skills
4. **啟用** Skills，載入完整指令
5. **執行**腳本並按需存取資源

## Skill 探索

Skills 是包含 `SKILL.md` 檔案的資料夾。你的代理應掃描設定的目錄以尋找有效的 Skills。

## 載入中繼資料

啟動時，僅解析每個 `SKILL.md` 檔案的 frontmatter。這能保持初始上下文使用量在較低水準。

### 解析 frontmatter

```
function parseMetadata(skillPath):
    content = readFile(skillPath + "/SKILL.md")
    frontmatter = extractYAMLFrontmatter(content)

    return {
        name: frontmatter.name,
        description: frontmatter.description,
        path: skillPath
    }
```

### 注入上下文

將 Skill 中繼資料包含在系統提示詞中，讓模型知道有哪些 Skills 可用。

請遵循你的平台對系統提示詞更新的指引。例如，對於 Claude 模型，建議使用 XML 格式：

```xml
<available_skills>
  <skill>
    <name>pdf-processing</name>
    <description>Extracts text and tables from PDF files, fills forms, merges documents.</description>
    <location>/path/to/skills/pdf-processing/SKILL.md</location>
  </skill>
  <skill>
    <name>data-analysis</name>
    <description>Analyzes datasets, generates charts, and creates summary reports.</description>
    <location>/path/to/skills/data-analysis/SKILL.md</location>
  </skill>
</available_skills>
```

對於基於檔案系統的代理，加入 `location` 欄位並提供 SKILL.md 的絕對路徑。對於基於工具的代理，可以省略 location。

保持中繼資料簡潔。每個 Skill 應增加大約 50-100 個 token 到上下文中。

## 安全考量

腳本執行會帶來安全風險。請考慮：

- **沙箱化（Sandboxing）**：在隔離的環境中執行腳本
- **白名單機制（Allowlisting）**：僅執行來自受信任 Skills 的腳本
- **確認機制（Confirmation）**：在執行潛在危險操作前詢問使用者
- **日誌記錄（Logging）**：記錄所有腳本執行以供稽核

## 參考實作

[skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) 函式庫提供 Python 工具程式和 CLI，用於處理 Skills。

例如：

**驗證 Skill 目錄：**
```
skills-ref validate <path>
```

**產生代理提示詞的 `<available_skills>` XML：**
```
skills-ref to-prompt <path>...
```

使用此函式庫的原始碼作為參考實作。

## 小結

整合 Agent Skills 到你的代理中，主要涉及 Skill 探索、中繼資料載入、任務匹配、啟用和執行五個步驟。無論是基於檔案系統或基於工具的代理，都可以透過 skills-ref 參考函式庫來加速開發。

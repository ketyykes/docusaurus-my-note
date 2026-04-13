---
sidebar_position: 8
title: "OpenSpec 多語言支援"
description: "設定 OpenSpec 以其他語言產生產出物（Artifacts），包含各語言的設定範例與技術名詞處理方式"
tags: [OpenSpec]
last_update:
  date: 2026-04-13
  author: Danny
---

# 多語言指南

設定 OpenSpec 以英文以外的語言產生產出物（Artifacts）。

## 快速設定

在你的 `openspec/config.yaml` 中加入語言指示：

```yaml
schema: spec-driven

context: |
  Language: Portuguese (pt-BR)
  All artifacts must be written in Brazilian Portuguese.

  # Your other project context below...
  Tech stack: TypeScript, React, Node.js
```

就這樣。所有產生的產出物現在都會以葡萄牙文呈現。

## 語言範例

### 葡萄牙文（巴西）

```yaml
context: |
  Language: Portuguese (pt-BR)
  All artifacts must be written in Brazilian Portuguese.
```

### 西班牙文

```yaml
context: |
  Idioma: Español
  Todos los artefactos deben escribirse en español.
```

### 中文（簡體）

```yaml
context: |
  语言：中文（简体）
  所有产出物必须用简体中文撰写。
```

### 日文

```yaml
context: |
  言語：日本語
  すべての成果物は日本語で作成してください。
```

### 法文

```yaml
context: |
  Langue : Français
  Tous les artefacts doivent être rédigés en français.
```

### 德文

```yaml
context: |
  Sprache: Deutsch
  Alle Artefakte müssen auf Deutsch verfasst werden.
```

## 提示

### 處理技術名詞

決定如何處理技術術語：

```yaml
context: |
  Language: Japanese
  Write in Japanese, but:
  - Keep technical terms like "API", "REST", "GraphQL" in English
  - Code examples and file paths remain in English
```

### 搭配其他專案設定

語言設定可與其他專案設定一起使用：

```yaml
schema: spec-driven

context: |
  Language: Portuguese (pt-BR)
  All artifacts must be written in Brazilian Portuguese.

  Tech stack: TypeScript, React 18, Node.js 20
  Database: PostgreSQL with Prisma ORM
```

## 驗證

若要驗證你的語言設定是否正常運作：

```bash
# 檢查指示內容——應顯示你的語言設定
openspec instructions proposal --change my-change

# 輸出結果將包含你的語言設定
```

## 相關文件

- [自訂設定指南](./customization.md) - 專案設定選項
- [工作流程指南](./workflows.md) - 完整工作流程說明

### 本文原始連結

[OpenSpec 官方文件](https://github.com/Fission-AI/OpenSpec/blob/main/docs/multi-language.md)

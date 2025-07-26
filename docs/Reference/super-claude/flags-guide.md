---
sidebar_position: 2
title: SuperClaude 標誌使用者指南
description: 了解 SuperClaude 的標誌系統，包含自動啟動機制、手動控制選項，以及各種標誌類別和用法
tags:
  - SuperClaude
last_update:
  date: 2025-07-26
  author: Danny
---

# SuperClaude 標誌使用者指南 🏁

## 🤖 大部分標誌自動啟動 - 不要為此煩惱！

**誠實的事實**：你不需要記住這些標誌。SuperClaude 通常會根據你正在做的事情嘗試添加有用的標誌！

**實際發生的事情：**
- 你輸入 `/analyze auth.js`
- SuperClaude 檢測到它是安全相關的程式碼
- **通常會添加** `--persona-security`、`--focus security`、`--validate`
- 你通常會得到專家安全分析，而無需管理任何標誌

**什麼時候你可能會手動使用標誌？**
- 你想要**覆寫** SuperClaude 選擇的內容（很少見）
- 你對特定方面感到**好奇**（`--focus performance`）
- 你想要**實驗**不同的方法

**底線**：只需使用基本指令，讓自動啟動運作。這些標誌在這裡是因為你想要它們，而不是因為你需要它們。🎯

---

## 🚀 直接嘗試這些（無需標誌知識）

```bash
# 這些在零標誌知識的情況下運作得很好：
/sc:analyze src/                    # 自動選擇正確的分析標誌
/sc:build                          # 根據你的專案自動最佳化  
/sc:improve messy-code.js          # 自動啟動品質和安全標誌
/sc:troubleshoot "weird error"     # 自動啟動除錯和分析標誌
```

**看到了嗎？不需要標誌。** 下面的一切都是當你對幕後發生的事情感到好奇時使用。

---

SuperClaude 標誌系統的實用指南。標誌就像改變 SuperClaude 行為的命令列選項 - 把它們想像成你指令的超能力。

## 什麼是標誌？🤔

**標誌是修飾符**，改變 SuperClaude 處理你請求的方式。它們跟在指令後面，以 `--` 開頭。

**基本語法**（但你通常不需要知道這個）：
```bash
/sc:command --flag-name
/sc:command --flag-name value  
/sc:analyze src/ --focus security --depth deep
```

**標誌在實踐中實際如何運作**：
1. **自動啟動** - SuperClaude 根據上下文添加它們（這是主要方式！🎯）
2. **手動覆寫** - 如果你想要不同行為，可以明確添加它們

**為什麼標誌存在**（主要是自動好處）：
- 得到更好、更專注的結果
- 自動啟用正確的思考深度
- 在有用時連接到特殊功能
- 根據你的任務最佳化速度或細節
- 將注意力引導到你實際正在處理的事情

**關鍵點**：SuperClaude 智慧地處理標誌選擇，所以你不需要考慮它！🧠

## 標誌類別 📂

### 規劃與分析標誌 🧠

這些控制 SuperClaude 對你請求的思考深度。

#### `--plan`
**它做什麼**：在做任何事情之前顯示執行計劃  
**何時使用**：當你想要先看到 SuperClaude 會做什麼  
**範例**：`/build --plan` - 在執行前查看建置步驟

#### `--think`
**它做什麼**：多檔案分析（~4K 權杖）  
**何時使用**：涉及數個檔案的複雜問題  
**自動啟動**：匯入鏈 >5 檔案，跨模組呼叫 >10 參考  
**範例**：`/analyze complex-system/ --think`

#### `--think-hard` 
**它做什麼**：深度架構分析（~10K 權杖）  
**何時使用**：系統範圍問題、架構決策  
**自動啟動**：系統重構、瓶頸 >3 模組  
**範例**：`/improve legacy-system/ --think-hard`

#### `--ultrathink`
**它做什麼**：最大深度分析（~32K 權杖）  
**何時使用**：關鍵系統重新設計、複雜除錯  
**自動啟動**：遺留系統現代化、關鍵漏洞  
**範例**：`/troubleshoot "entire auth system broken" --ultrathink`

**💡 提示**：從 `--think` 開始，只在需要時深入。更多思考 = 更慢但更徹底。

---

### 效率與控制標誌 ⚡

控制輸出風格、安全性和效能。

#### `--uc` / `--ultracompressed`
**它做什麼**：使用符號進行 60-80% 權杖減少
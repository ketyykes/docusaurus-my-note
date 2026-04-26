---
sidebar_position: 3
title: SuperClaude Persona 使用指南
description: 一份完整的 SuperClaude 斜線指令 Persona 使用指南，涵蓋各種 Persona 的詳細說明與範例。
tags:
  - SuperClaude
last_update:
  date: 2025-07-26
  author: Danny
---

# SuperClaude Persona 使用指南 🎭

## 🎭 Persona 會自動啟用 - 無需選擇！

**簡單來說**：你不需要選擇 Persona 或記住它們的功能。SuperClaude 通常會為每種情況引入有幫助的專家！

**實際運作方式如下：**
- 你輸入 `/analyze auth.js` → 安全專家通常會介入 🛡️
- 你在處理 React 元件 → 前端專家通常會接手 🎨
- 你在除錯效能問題 → 效能優化專家通常會提供幫助 ⚡
- 你在撰寫文件 → 專業寫手通常會協助 ✍️

**這就像擁有一個聰明的團隊**，他們知道何時該介入幫忙，而你無需管理誰做什麼。

**當你需要時，可以手動控制**（例如，特別要求對前端程式碼進行安全審查），但大多數時候你只需...讓它運作即可。🪄

---

## 🚀 直接試試這些（無需了解 Persona）

```bash
# 這些指令會自動啟用合適的專家：
/sc:analyze payment-system/         # → 安全與後端專家自動啟用
/sc:build react-app/               # → 前端專家接手
/sc:improve slow-queries.sql       # → 效能優化專家介入
/sc:troubleshoot "auth failing"    # → 除錯專家與安全專家協同作業
```

**看到規律了嗎？** 你專注於想做的事，SuperClaude 會找出該由誰來幫忙。以下內容是為那些好奇團隊中有誰的人準備的。

---

可以把 SuperClaude Persona 想像成擁有一支隨時待命的專家團隊。每個 Persona 都帶來不同的專業知識、優先順序和觀點，以協助你處理特定類型的工作。

## 什麼是 Persona？ 🤔

**Persona 是 AI 專家**，它們會嘗試調整 SuperClaude 的行為以適應不同類型的工作。你通常會從相關的專家那裡獲得專家級的幫助，而不是通用的回應。

**它們在實務中的運作方式：**
- **自動啟用** - SuperClaude 通常會嘗試挑選有幫助的專家（大多數時候效果很好！）
- **智慧偵測** - 辨識安全工作、前端任務、效能問題等。
- **無縫切換** - 不同的專家會根據需要在同一個對話中介入。
- **團隊協調** - 多位專家通常會在複雜的任務上協同作業。
- **可手動覆蓋** - 當你想要不同的觀點時，可以使用 `--persona-name` 旗標明確選擇。

**這為什麼重要：**
- 通常能獲得專家級的建議，而無需知道該問哪個專家。
- 通常能獲得更符合你實際工作內容的決策。
- 根據任務提供更集中、更相關的回應。
- 在需要時啟用特殊的工作流程。

**最棒的部分**：你只需專注於你的工作，有幫助的專家通常會在需要時出現。🎯

## SuperClaude 團隊 👥

### 技術專家 🔧

#### 🏗️ `architect` - 系統設計專家
**職責**：長期架構規劃、系統設計、可擴展性決策。

**優先順序**：長期可維護性 > 可擴展性 > 效能 > 快速修復。

**自動啟用時機**：
- 關鍵字：「architecture」、「design」、「scalability」、「system structure」。
- 涉及多個模組的複雜系統修改。
- 規劃大型功能或系統變更。

**適用於**：
- 規劃新系統或主要功能。
- 架構審查與改進。
- 技術債評估。
- 設計模式建議。
- 可擴展性規劃。

**範例工作流程**：
```bash
/sc:design microservices-migration --persona-architect
/sc:analyze --focus architecture large-system/
/sc:estimate "redesign auth system" --persona-architect
```

**優先考量**：
- 可維護、易於理解的程式碼。
- 低耦合、高內聚。
- 面向未來的設計決策。
- 明確的關注點分離。

---

#### 🎨 `frontend` - UI/UX 與無障礙專家
**職責**：使用者體驗、無障礙、前端效能、設計系統。

**優先順序**：使用者需求 > 無障礙 > 效能 > 技術優雅。

**自動啟用時機**：
- 關鍵字：「component」、「responsive」、「accessibility」、「UI」、「UX」。
- 前端開發工作。
- 與使用者介面相關的任務。

**適用於**：
- 建置 UI 元件。
- 無障礙合規性（WCAG 2.1 AA）。
- 前端效能優化。
- 設計系統工作。
- 使用者體驗改進。

**執行的效能預算**：
- 載入時間：3G 環境下 \<3 秒，WiFi 環境下 \<1 秒。
- 套件大小：初始 \<500KB，總共 \<2MB。
- 無障礙：WCAG 合規目標。

**範例工作流程**：
```bash
/sc:build dashboard --persona-frontend
/sc:improve --focus accessibility components/
/sc:analyze --persona-frontend --focus performance
```

**優先考量**：
- 直觀、使用者友善的介面。
- 所有使用者的無障礙性。
- 在行動裝置/3G 網路上的真實世界效能。
- 乾淨、可維護的 CSS/JS。

---

#### ⚙️ `backend` - API 與基礎設施專家
**職責**：伺服器端開發、API、資料庫、可靠性工程。

**優先順序**：可靠性 > 安全性 > 效能 > 功能 > 便利性。

**自動啟用時機**：
- 關鍵字：「API」、「database」、「service」、「server」、「reliability」。
- 後端開發工作。
- 基礎設施或資料相關任務。

**適用於**：
- API 設計與實作。
- 資料庫結構與優化。
- 安全性實作。
- 可靠性與錯誤處理。
- 後端效能調校。

**執行的可靠性預算**：
- 正常執行時間：99.9%（每年 8.7 小時停機時間）。
- 錯誤率：關鍵操作 \<0.1%。
- API 回應時間：\<200ms。
- 恢復時間：關鍵服務 \<5 分鐘。

**範例工作流程**：
```bash
/sc:design user-api --persona-backend
/sc:analyze --focus security api/
/sc:improve --persona-backend database-layer/
```

**優先考量**：
- 穩固的可靠性與正常執行時間。
- 預設安全（零信任）。
- 資料完整性與一致性。
- 優雅的錯誤處理。

---

#### 🛡️ `security` - 威脅模型與漏洞專家
**職責**：安全分析、威脅模型、漏洞評估、合規性。

**優先順序**：安全性 > 合規性 > 可靠性 > 效能 > 便利性。

**自動啟用時機**：
- 關鍵字：「security」、「vulnerability」、「auth」、「compliance」。
- 安全掃描或評估工作。
- 驗證/授權任務。

**適用於**：
- 安全稽核與漏洞掃描。
- 威脅模型與風險評估。
- 安全編碼實踐。
- 合規性要求（OWASP 等）。
- 驗證與授權系統。

**威脅評估等級**：
- 嚴重：需要立即採取行動。
- 高：24 小時內修復。
- 中：7 天內修復。
- 低：30 天內修復。

**範例工作流程**：
```bash
/sc:scan --persona-security --focus security
/sc:analyze auth-system/ --persona-security
/sc:improve --focus security --persona-security
```

**優先考量**：
- 預設安全、故障安全機制。
- 零信任架構原則。
- 深度防禦策略。
- 清晰的安全文件。

---

#### ⚡ `performance` - 優化與瓶頸專家
**職責**：效能優化、瓶頸識別、指標分析。

**優先順序**：先測量 > 優化關鍵路徑 > 使用者體驗 > 避免過早優化。

**自動啟用時機**：
- 關鍵字：「performance」、「optimization」、「speed」、「bottleneck」。
- 效能分析或優化工作。
- 提到速度/效率時。

**適用於**：
- 效能瓶頸識別。
- 帶有指標驗證的程式碼優化。
- 資料庫查詢優化。
- 前端效能調校。
- 負載測試與容量規劃。

**追蹤的效能預算**：
- API 回應：\<500ms。
- 資料庫查詢：\<100ms。
- 套件大小：初始 \<500KB。
- 記憶體使用：行動裝置 \<100MB，桌面 \<500MB。

**範例工作流程**：
```bash
/sc:analyze --focus performance --persona-performance
/sc:improve --type performance slow-endpoints/
/sc:test --benchmark --persona-performance
```

**優先考量**：
- 以測量為驅動的優化。
- 真實使用者體驗的改進。
- 關鍵路徑效能。
- 系統化的優化方法。

### 流程與品質專家 ✨

#### 🔍 `analyzer` - 根本原因調查專家
**職責**：系統性除錯、根本原因分析、基於證據的調查。

**優先順序**：證據 > 系統性方法 > 徹底性 > 速度。

**自動啟用時機**：
- 關鍵字：「analyze」、「investigate」、「debug」、「root cause」。
- 除錯或故障排除會話。
- 複雜問題調查。

**適用於**：
- 除錯複雜問題。
- 根本原因分析。
- 系統調查。
- 基於證據的問題解決。
- 理解未知程式碼庫。

**調查方法**：
1. 在下結論前收集證據。
2. 在資料中識別模式。
3. 假設測試與驗證。
4. 透過測試確認根本原因。

**範例工作流程**：
```bash
/sc:troubleshoot "auth randomly fails" --persona-analyzer
/sc:analyze --persona-analyzer mysterious-bug/
/sc:explain --detailed "why is this slow" --persona-analyzer
```

**優先考量**：
- 基於證據的結論。
- 系統性的調查方法。
- 在提出解決方案前進行完整分析。
- 可重現的發現。

---

#### 🧪 `qa` - 品質保證與測試專家
**職責**：測試策略、品質關卡、邊緣案例偵測、風險評估。

**優先順序**：預防 > 偵測 > 修正 > 全面覆蓋。

**自動啟用時機**：
- 關鍵字：「test」、「quality」、「validation」、「coverage」。
- 測試或品質保證工作。
- 提到品質關卡或邊緣案例時。

**適用於**：
- 測試策略與規劃。
- 品質保證流程。
- 邊緣案例識別。
- 基於風險的測試。
- 測試自動化。

**品質風險評估**：
- 使用者旅程的關鍵路徑分析。
- 失敗影響評估。
- 缺陷機率評估。
- 恢復難度估計。

**範例工作流程**：
```bash
/sc:test --persona-qa comprehensive-suite
/sc:analyze --focus quality --persona-qa
/sc:review --persona-qa critical-features/
```

**優先考量**：
- 預防缺陷勝於發現缺陷。
- 全面的測試覆蓋率。
- 基於風險的測試優先順序。
- 將品質融入流程中。

---

#### 🔄 `refactorer` - 程式碼品質與清理專家
**職責**：程式碼品質改進、技術債管理、乾淨程式碼實踐。

**優先順序**：簡單性 > 可維護性 > 可讀性 > 效能 > 技巧性。

**自動啟用時機**：
- 關鍵字：「refactor」、「cleanup」、「quality」、「technical debt」。
- 程式碼改進或清理工作。
- 可維護性考量。

**適用於**：
- 程式碼重構與清理。
- 減少技術債。
- 程式碼品質改進。
- 設計模式應用。
- 舊程式碼現代化。

**追蹤的程式碼品質指標**：
- 圈複雜度。
- 程式碼可讀性分數。
- 技術債比率。
- 測試覆蓋率。

**範例工作流程**：
```bash
/sc:improve --type quality --persona-refactorer
/sc:cleanup legacy-module/ --persona-refactorer
/sc:analyze --focus maintainability --persona-refactorer
```

**優先考量**：
- 簡單、可讀的解決方案。
- 一致的模式與慣例。
- 可維護的程式碼結構。
- 技術債管理。

---

#### 🚀 `devops` - 基礎設施與部署專家
**職責**：基礎設施自動化、部署、監控、可靠性工程。

**優先順序**：自動化 > 可觀察性 > 可靠性 > 可擴展性 > 手動流程。

**自動啟用時機**：
- 關鍵字：「deploy」、「infrastructure」、「CI/CD」、「monitoring」。
- 部署或基礎設施工作。
- DevOps 或自動化任務。

**適用於**：
- 部署自動化與 CI/CD。
- 基礎設施即程式碼。
- 監控與警報設定。
- 效能監控。
- 容器與雲端基礎設施。

**基礎設施自動化優先順序**：
- 零停機部署。
- 自動化回滾能力。
- 基礎設施即程式碼。
- 全面監控。

**範例工作流程**：
```bash
/sc:deploy production --persona-devops
/sc:analyze infrastructure/ --persona-devops
/sc:improve deployment-pipeline --persona-devops
```

**優先考量**：
- 自動化流程優於手動流程。
- 全面的可觀察性。
- 可靠、可重複的部署。
- 基礎設施即程式碼實踐。

### 知識與溝通 📚

#### 👨‍🏫 `mentor` - 教育指導專家
**職責**：教學、知識轉移、教育性解釋、學習促進。

**優先順序**：理解 > 知識轉移 > 教學 > 任務完成。

**自動啟用時機**：
- 關鍵字：「explain」、「learn」、「understand」、「teach」。
- 教育或知識轉移任務。
- 逐步指導請求。

**適用於**：
- 學習新技術。
- 理解複雜概念。
- 程式碼解釋與演練。
- 最佳實踐教育。
- 團隊知識分享。

**學習優化方法**：
- 技能水平評估。
- 漸進式複雜度建立。
- 學習風格適應。
- 知識保留強化。

**範例工作流程**：
```bash
/sc:explain React hooks --persona-mentor
/sc:document --type guide --persona-mentor
/sc:analyze complex-algorithm.js --persona-mentor
```

**優先考量**：
- 清晰、易懂的解釋。
- 完整的概念理解。
- 引人入勝的學習體驗。
- 實用技能發展。

---

#### ✍️ `scribe` - 專業文件專家
**職責**：專業寫作、文件、本地化、文化溝通。

**優先順序**：清晰度 > 受眾需求 > 文化敏感性 > 完整性 > 簡潔性。

**自動啟用時機**：
- 關鍵字：「document」、「write」、「guide」、「README」。
- 文件或寫作任務。
- 專業溝通需求。

**適用於**：
- 技術文件。
- 使用者指南與教學。
- README 檔案與 wiki。
- API 文件。
- 專業溝通。

**支援語言**：英文（預設）、西班牙文、法文、德文、日文、中文、葡萄牙文、義大利文、俄文、韓文。

**內容類型**：技術文件、使用者指南、API 文件、提交訊息、PR 描述。

**範例工作流程**：
```bash
/sc:document api/ --persona-scribe
/sc:git commit --persona-scribe
/sc:explain --persona-scribe=es complex-feature
```

**優先考量**：
- 清晰、專業的溝通。
- 適合受眾的語言。
- 文化敏感性與適應。
- 高寫作標準。

## 各 Persona 的發光時刻 ⭐

### 開發階段對應

**規劃與設計階段**：
- 🏗️ `architect` - 系統設計與架構規劃
- 🎨 `frontend` - UI/UX 設計與使用者體驗
- ✍️ `scribe` - 需求文件與規格書

**實作階段**：
- 🎨 `frontend` - UI 元件開發
- ⚙️ `backend` - API 與服務實作
- 🛡️ `security` - 安全性實作與強化

**測試與品質階段**：
- 🧪 `qa` - 測試策略與品質保證
- ⚡ `performance` - 效能測試與優化
- 🔍 `analyzer` - 錯誤調查與根本原因分析

**維護與改進階段**：
- 🔄 `refactorer` - 程式碼清理與重構
- ⚡ `performance` - 效能優化
- 👨‍🏫 `mentor` - 知識轉移與文件

**部署與營運階段**：
- 🚀 `devops` - 部署自動化與基礎設施
- 🛡️ `security` - 安全監控與合規性
- ✍️ `scribe` - 營運文件與執行手冊

### 問題類型對應

**「我的程式碼很慢」** → ⚡ `performance`
**「有東西壞了，但我不知道為什麼」** → 🔍 `analyzer`
**「需要設計一個新系統」** → 🏗️ `architect`
**「UI 看起來很糟」** → 🎨 `frontend`
**「這樣安全嗎？」** → 🛡️ `security`
**「程式碼很亂」** → 🔄 `refactorer`
**「需要更好的測試」** → 🧪 `qa`
**「部署一直失敗」** → 🚀 `devops`
**「我不懂這個」** → 👨‍🏫 `mentor`
**「需要文件」** → ✍️ `scribe`

## Persona 組合 🤝

Persona 通常會自動協同作業。以下是常見的協作模式：

### 設計與實作
```bash
/sc:design user-dashboard
# 自動啟用：🏗️ architect (系統設計) + 🎨 frontend (UI 設計)
```

### 安全審查
```bash
/sc:analyze --focus security api/
# 自動啟用：🛡️ security (主要) + ⚙️ backend (API 專業知識)
```

### 效能優化
```bash
/sc:improve --focus performance slow-app/
# 自動啟用：⚡ performance (主要) + 🎨 frontend (如果是 UI) 或 ⚙️ backend (如果是 API)
```

### 品質改進
```bash
/sc:improve --focus quality legacy-code/
# 自動啟用：🔄 refactorer (主要) + 🧪 qa (測試) + 🏗️ architect (設計)
```

### 文件與學習
```bash
/sc:document complex-feature --type guide
# 自動啟用：✍️ scribe (寫作) + 👨‍🏫 mentor (教育方法)
```

## 實用範例 💡

### 前後對比：通用 vs 特定 Persona

**之前**（通用）：
```bash
/sc:analyze auth.js
# → 基本分析，通用建議
```

**之後**（安全 Persona）：
```bash
/sc:analyze auth.js --persona-security
# → 以安全為重點的分析
# → 威脅模型觀點
# → OWASP 合規性檢查
# → 漏洞模式偵測
```

### 自動啟用實例

**前端工作偵測**：
```bash
/sc:build react-components/
# 自動啟用：🎨 frontend
# → 以 UI 為重點的建置優化
# → 無障礙檢查
# → 效能預算
# → 套件大小分析
```

**複雜除錯**：
```bash
/sc:troubleshoot "payment processing randomly fails"
# 自動啟用：🔍 analyzer
# → 系統性調查方法
# → 證據收集方法論
# → 模式分析
# → 根本原因識別
```

### 手動覆蓋範例

**強制安全觀點**：
```bash
/sc:analyze react-app/ --persona-security
# 即使是前端程式碼，也從安全角度進行分析
# → XSS 漏洞檢查
# → 驗證流程分析
# → 資料洩漏風險
```

**對小變更獲取架構建議**：
```bash
/sc:improve small-utility.js --persona-architect
# 將架構思維應用於小型程式碼
# → 設計模式機會
# → 未來擴展性
# → 耦合分析
```

## 進階用法 🚀

### 手動 Persona 控制

**何時覆蓋自動啟用**：
- 你想從不同角度看待同一個問題
- 自動啟用選擇的 Persona 不符合你的特定需求
- 你正在學習，想看看不同專家如何處理問題

**如何覆蓋**：
```bash
# 明確選擇 Persona
/sc:analyze frontend-code/ --persona-security  # 從安全角度看前端
/sc:improve backend-api/ --persona-performance # 從效能角度看後端

# 多個 Persona 旗標（最後一個生效）
/sc:analyze --persona-frontend --persona-security # 使用 security persona
```

### 特定 Persona 的旗標與設定

**安全 Persona + 驗證**：
```bash
/sc:analyze --persona-security --focus security --validate
# → 最大程度的安全焦點與驗證
```

**效能 Persona + 基準測試**：
```bash
/sc:test --persona-performance --benchmark --focus performance
# → 以效能為重點的測試與指標
```

**導師 Persona + 詳細解釋**：
```bash
/sc:explain complex-concept --persona-mentor --verbose
# → 帶有完整細節的教育性解釋
```

### 跨領域專業知識

**當你需要多種觀點時**：
```bash
# 使用不同 Persona 進行順序分析
/sc:analyze --persona-security api/auth.js
/sc:analyze --persona-performance api/auth.js  
/sc:analyze --persona-refactorer api/auth.js

# 或讓 SuperClaude 自動協調
/sc:analyze --focus quality api/auth.js
# 自動協調：security + performance + refactorer 的見解
```

## 各 Persona 的常見工作流程 💼

### 🏗️ Architect 工作流程
```bash
# 系統設計
/sc:design microservices-architecture --persona-architect
/sc:estimate "migrate monolith to microservices" --persona-architect

# 架構審查
/sc:analyze --focus architecture --persona-architect large-system/
/sc:review --persona-architect critical-components/
```

### 🎨 Frontend 工作流程
```bash
# 元件開發
/sc:build dashboard-components/ --persona-frontend
/sc:improve --focus accessibility --persona-frontend ui/

# 效能優化
/sc:analyze --focus performance --persona-frontend bundle/
/sc:test --persona-frontend --focus performance
```

### ⚙️ Backend 工作流程
```bash
# API 開發
/sc:design rest-api --persona-backend
/sc:build api-endpoints/ --persona-backend

# 可靠性改進
/sc:improve --focus reliability --persona-backend services/
/sc:analyze --persona-backend --focus security api/
```

### 🛡️ Security 工作流程
```bash
# 安全評估
/sc:scan --persona-security --focus security entire-app/
/sc:analyze --persona-security auth-flow/

# 漏洞修復
/sc:improve --focus security --persona-security vulnerable-code/
/sc:review --persona-security --focus security critical-paths/
```

### 🔍 Analyzer 工作流程
```bash
# 錯誤調查
/sc:troubleshoot "intermittent failures" --persona-analyzer
/sc:analyze --persona-analyzer --focus debugging problem-area/

# 系統理解
/sc:explain --persona-analyzer complex-system/
/sc:load --persona-analyzer unfamiliar-codebase/
```

## 快速參考 📋

### Persona 速查表

| Persona       | 最適用於            | 自動啟用條件                            | 手動旗標                |
| ------------- | ------------------- | --------------------------------------- | ----------------------- |
| 🏗️ architect   | 系統設計、架構      | "architecture", "design", "scalability" | `--persona-architect`   |
| 🎨 frontend    | UI/UX、無障礙       | "component", "responsive", "UI"         | `--persona-frontend`    |
| ⚙️ backend     | API、資料庫、可靠性 | "API", "database", "service"            | `--persona-backend`     |
| 🛡️ security    | 安全性、合規性      | "security", "vulnerability", "auth"     | `--persona-security`    |
| ⚡ performance | 優化、速度          | "performance", "optimization", "slow"   | `--persona-performance` |
| 🔍 analyzer    | 除錯、調查          | "analyze", "debug", "investigate"       | `--persona-analyzer`    |
| 🧪 qa          | 測試、品質          | "test", "quality", "validation"         | `--persona-qa`          |
| 🔄 refactorer  | 程式碼清理、重構    | "refactor", "cleanup", "quality"        | `--persona-refactorer`  |
| 🚀 devops      | 部署、基礎設施      | "deploy", "infrastructure", "CI/CD"     | `--persona-devops`      |
| 👨‍🏫 mentor      | 學習、解釋          | "explain", "learn", "understand"        | `--persona-mentor`      |
| ✍️ scribe      | 文件、寫作          | "document", "write", "guide"            | `--persona-scribe`      |

### 最有用的組合

**以安全為重點的開發**：
```bash
--persona-security --focus security --validate
```

**效能優化**：
```bash
--persona-performance --focus performance --benchmark
```

**學習與理解**：
```bash
--persona-mentor --verbose --explain
```

**品質改進**：
```bash
--persona-refactorer --focus quality --safe-mode
```

**專業文件**：
```bash
--persona-scribe --type guide --detailed
```

### 自動啟用觸發條件

**強觸發**（通常效果很好）：
- "security audit" → 🛡️ security
- "UI component" → 🎨 frontend  
- "API design" → ⚙️ backend
- "system architecture" → 🏗️ architect
- "debug issue" → 🔍 analyzer

**中度觸發**（通常有效）：
- "improve performance" → ⚡ performance
- "write tests" → 🧪 qa
- "clean up code" → 🔄 refactorer
- "deployment issue" → 🚀 devops

**依情境觸發**（情況不一）：
- "document this" → ✍️ scribe 或 👨‍🏫 mentor（取決於受眾）
- "analyze this" → 🔍 analyzer, 🏗️ architect, 或領域專家（取決於內容）

## Persona 問題排查 🚨

### 常見問題

**「啟用了錯誤的 Persona」**
- 使用明確的 Persona 旗標：`--persona-security`
- 檢查你的關鍵字是否觸發了自動啟用
- 在你的請求中嘗試使用更具體的語言

**「Persona 似乎沒作用」**
- 驗證 Persona 名稱拼寫：`--persona-frontend` 而非 `--persona-fronted`
- 某些 Persona 在特定指令下效果更好
- 嘗試與相關旗標結合：`--focus security --persona-security`

**「想要多種觀點」**
- 手動使用不同 Persona 執行相同指令
- 使用更廣泛的焦點旗標：`--focus quality`（啟用多個 Persona）
- 讓 SuperClaude 在複雜請求中自動協調

**「Persona 太專注了」**
- 嘗試一個更通用的 Persona
- 使用 mentor Persona 獲得更廣泛的解釋
- 與 `--verbose` 結合以獲得更多情境

### 何時覆蓋自動啟用

**在以下情況下覆蓋**：
- 自動啟用選擇了錯誤的專家
- 你想從不同角度學習
- 在典型的領域邊界之外工作
- 需要針對邊緣案例的特定專業知識

**如何有效覆蓋**：
```bash
# 強制特定觀點
/sc:analyze frontend-code/ --persona-security  # 從安全角度看前端

# 結合多種觀點
/sc:analyze api/ --persona-security
/sc:analyze api/ --persona-performance  # 分別執行以獲得不同觀點

# 使用通用分析
/sc:analyze --no-persona  # 停用 Persona 自動啟用
```

## 有效使用 Persona 的技巧 💡

### 入門（老實說）
1. **一開始完全忽略 Persona** - 自動啟用會處理一切
2. **正常使用基本指令** - `/analyze`、`/build`、`/improve` 在沒有 Persona 知識的情況下也能很好地運作
3. **注意發生了什麼** - 你會看到不同類型的專業知識自然而然地出現
4. **相信自動化** - SuperClaude 通常比手動選擇更能挑選出合適的專家

### 進階（如果你想的話）
1. **實驗手動覆蓋** - 嘗試在前端程式碼上使用 `--persona-security` 以獲得不同觀點
2. **了解團隊成員** - 當你好奇時，閱讀關於各個 Persona 的介紹
3. **觀察 Persona 組合** - 看看多位專家如何在複雜問題上協同作業
4. **用於學習** - 向不同 Persona 提問相同問題，看看不同的處理方法

### 最佳實踐（保持簡單）
- **先讓自動啟用運作** - 只有在想獲得不同觀點時才覆蓋
- **別想得太複雜** - 合適的專家會在需要時出現
- **用於實驗** - 在同一個問題上嘗試不同 Persona 以進行學習
- **相信智慧** - 自動啟用會從模式中學習並不斷改進

---

## 最後的提醒 📝

**關於 Persona 的真相** 💯：
- **與自己挑選專家相比，自動啟用通常效果更好**
- **你可以完全忽略本指南**，仍然能獲得有幫助的專家協助
- **Persona 的存在是為了幫助你** - 而不是為了製造你需要管理的複雜性
- **學習是自然發生的**，透過使用，而不是透過研究 Persona 的描述 😊

**別被團隊的規模嚇到** 🧘‍♂️：
- 你不需要知道每個 Persona 的功能
- SuperClaude 通常能很好地處理專家選擇
- 上述詳細描述是為了滿足好奇心，而非必需品
- 讓自動啟用運作，你不會錯過任何東西

**什麼時候需要手動選擇 Persona**：
- **好奇心** - 「安全專家會如何看待這段前端程式碼？」
- **學習** - 「不同專家會如何處理這個問題？」
- **實驗** - 「讓我從效能的角度看看這個」
- **覆蓋** - 「我想要對這個小型工具函式提供架構建議」

**保持簡單** 🎯：
- 使用像 `/analyze some-code/` 這樣的正常指令
- 讓合適的專家自動出現
- 手動 Persona 控制在你需要時可用，但不是必需品
- 專注於你的工作，而不是管理誰來幫助你

---

*記住：在所有這些看似複雜的背後，SuperClaude 的使用其實很簡單。只要開始輸入指令即可！🚀*

### 本文原始連結

[SuperClaude - Agents](https://github.com/SuperClaude-Org/SuperClaude_Framework/blob/master/docs/user-guide/agents.md)

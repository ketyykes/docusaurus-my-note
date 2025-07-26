---
sidebar_position: 1
title: SuperClaude 指令指南
description: 完整的 SuperClaude 17 個專業指令指南，包含開發、分析、品質、規劃等各類指令的詳細說明
tags:
  - SuperClaude
last_update:
  date: 2025-07-26
  author: Danny
---

# SuperClaude 指令指南 🛠️

## 💡 不要想太多 - SuperClaude 嘗試幫助

**關於這 17 個指令的事實**：你不需要記住它們。只需從 `/sc:analyze` 或 `/sc:implement` 開始，看看會發生什麼！

**它通常如何運作：**
- 在 Claude Code 中輸入 `/` → 查看可用指令
- 使用基本指令如 `/sc:analyze`、`/sc:build`、`/sc:improve`
- **SuperClaude 嘗試為每種情況選擇有用的工具和專家**
- 隨著你變得熟悉，更多指令變得有用

**自動啟動相當酷** 🪄 - SuperClaude 嘗試檢測你想要做什麼，並啟動相關專家（安全專家、效能最佳化專家等），而無需你管理它。通常運作得很好！😊

---

## 快速「直接嘗試這些」清單 🚀

**從這裡開始**（無需閱讀）：
```bash
/sc:index                    # 查看可用的功能
/sc:analyze src/            # 嘗試智慧地分析你的程式碼 
/sc:workflow feature-100-prd.md  # 從 PRD 建立逐步實作工作流程
/sc:implement user-auth     # 建立功能和元件（取代 v2 /build）
/sc:build                   # 嘗試智慧專案建置
/sc:improve messy-file.js   # 嘗試清理程式碼 
/sc:troubleshoot "error"    # 嘗試幫助解決問題
```

**這真的足夠開始了。** 下面的一切都是當你對其他可用工具感到好奇時使用。🛠️

---

所有 16 個 SuperClaude 斜線指令的實用指南。我們會誠實地說明什麼運作得好，什麼仍然有粗糙的地方。

## 快速參考 📋

*（你真的不需要記住這個 - 只需選擇聽起來有用的）*

| 指令               | 目的              | 自動啟動      | 最適合                        |
| ------------------ | ----------------- | ------------- | ----------------------------- |
| `/sc:analyze`      | 智慧程式碼分析    | 安全/效能專家 | 發現問題、理解程式碼庫        |
| `/sc:build`        | 智慧建置          | 前端/後端專家 | 編譯、打包、部署準備          |
| `/sc:implement`    | 功能實作          | 領域特定專家  | 建立功能、元件、API、服務     |
| `/sc:improve`      | 自動程式碼清理    | 品質專家      | 重構、最佳化、品質修復        |
| `/sc:troubleshoot` | 問題調查          | 除錯專家      | 除錯、問題調查                |
| `/sc:test`         | 智慧測試          | QA 專家       | 執行測試、覆蓋率分析          |
| `/sc:document`     | 自動文件          | 寫作專家      | README 檔案、程式碼註解、指南 |
| `/sc:git`          | 增強 git 工作流程 | DevOps 專家   | 智慧提交、分支管理            |
| `/sc:design`       | 系統設計幫助      | 架構專家      | 架構規劃、API 設計            |
| `/sc:explain`      | 學習助手          | 教學專家      | 學習概念、理解程式碼          |
| `/sc:cleanup`      | 債務減少          | 重構專家      | 移除死程式碼、組織檔案        |
| `/sc:load`         | 上下文理解        | 分析專家      | 專案分析、程式碼庫理解        |
| `/sc:estimate`     | 智慧估算          | 規劃專家      | 時間/努力規劃、複雜性分析     |
| `/sc:spawn`        | 複雜工作流程      | 協調系統      | 多步驟操作、工作流程自動化    |
| `/sc:task`         | 專案管理          | 規劃系統      | 長期功能規劃、任務追蹤        |
| `/sc:workflow`     | 實作規劃          | 工作流程系統  | 從 PRD 建立逐步工作流程       |
| `/sc:index`        | 指令導航          | 幫助系統      | 為你的任務找到正確的指令      |

**專業提示**：只需嘗試聽起來有用的指令。SuperClaude 通常會嘗試為每種情況啟動有用的專家和工具！🎯

## 開發指令 🔨

### `/workflow` - 實作工作流程產生器 🗺️
**它做什麼**：分析 PRD 和功能需求，建立全面的逐步實作工作流程。

**有用的部分**：取得你的 PRD 並將其分解為結構化實作計劃，包含專家指導、依賴關係映射和任務協調！🎯

**何時使用**：
- 從 PRD 或規格開始新功能
- 需要清晰的實作路線圖
- 想要實作策略的專家指導
- 規劃具有多個依賴關係的複雜功能

**魔法**：根據你的功能需求自動啟動適當的專家人設（架構師、安全、前端、後端）和 MCP 伺服器（Context7 用於模式、Sequential 用於複雜分析）。

**範例**：
```bash
/sc:workflow docs/feature-100-prd.md --strategy systematic --c7 --sequential
/sc:workflow "user authentication system" --persona security --output detailed
/sc:workflow payment-api --strategy mvp --risks --dependencies
```

**你得到的**：
- **路線圖格式**：具有時間表的階段性實作計劃
- **任務格式**：組織的史詩、故事和可執行任務  
- **詳細格式**：具有時間估算的逐步指示
- **風險評估**：潛在問題和緩解策略
- **依賴關係映射**：內部和外部依賴關係
- **專家指導**：領域特定最佳實踐和模式

### `/implement` - 功能實作
**它做什麼**：實作功能、元件和功能，具有智慧專家啟動。

**有用的部分**：SuperClaude 根據你正在實作的內容自動啟動正確的專家（前端、後端、安全）和工具！🎯

**何時使用**：
- 建立新功能或元件（取代 v2 的 `/build` 功能）
- 實作 API、服務或模組
- 使用現代框架建立 UI 元件

**基本語法**：
```bash
/sc:implement user authentication system      # 實作完整功能
/sc:implement --type component LoginForm      # 建立特定元件  
/sc:implement --type api user-management      # 建立 API 端點
/sc:implement --framework react dashboard     # 框架特定實作
```

**有用的旗標**：
- `--type component|api|service|feature|module` - 實作類型
- `--framework react|vue|express|django|etc` - 目標框架
- `--safe` - 保守實作方法
- `--iterative` - 逐步開發與驗證
- `--with-tests` - 包含測試實作
- `--documentation` - 程式碼與文件同時生成

**實際範例**：
```bash
/sc:implement user authentication --type feature --with-tests
/sc:implement dashboard component --type component --framework react
/sc:implement REST API for orders --type api --safe
/sc:implement payment processing --type service --iterative
/sc:implement search functionality --framework vue --documentation
```

**自動啟動模式**：
- **前端**：UI 元件、React/Vue/Angular → 前端專家 + Magic MCP
- **後端**：API、服務、資料庫 → 後端專家 + Context7
- **安全**：認證、支付、敏感資料 → 安全專家 + 驗證
- **複雜功能**：多步驟實作 → Sequential MCP + 架構師專家

**注意事項**：
- 指定 `--type` 以獲得更好的結果（元件 vs 服務 vs 功能）
- 使用 `--framework` 當你使用特定技術堆疊時
- 嘗試 `--safe` 用於生產程式碼或 `--iterative` 用於複雜功能
- 記住：這取代了 v2 的 `/build` 實際程式碼實作

---

### `/build` - 專案建置
**它做什麼**：建置、編譯、打包專案，具有智慧錯誤處理。

**簡單方法**：只需輸入 `/sc:build` 並讓 SuperClaude 嘗試找出你的建置系統！🎯

**何時使用**：
- 你需要編譯/打包你的專案（只需嘗試 `/sc:build`）
- 建置過程失敗且你想協助除錯  
- 設定建置最佳化（它會嘗試偵測你需要什麼）
- 準備部署

**基本語法**：
```bash
/sc:build                          # 建置當前專案
/sc:build --type prod              # 生產建置
/sc:build --clean                  # 清除建置（移除舊的工件）
/sc:build --optimize               # 啟用建置最佳化
/sc:build src/                     # 建置特定目錄
```

**有用的旗標**：
- `--type dev|prod|test` - 建置類型
- `--clean` - 建置前清除  
- `--optimize` - 啟用建置最佳化
- `--verbose` - 顯示詳細建置輸出

**實際範例**：
```bash
/sc:build --type prod --optimize   # 生產建置並啟用最佳化
/sc:build --clean --verbose        # 清除建置並顯示詳細輸出
/sc:build src/components           # 僅建置 components 目錄
```

**注意事項**：
- 與常見建置工具（npm、webpack 等）運作最佳
- 可能難以處理非常特殊的建置設定
- 檢查你的建置工具是否在 PATH 中

---

### `/design` - 系統與元件設計
**它做什麼**：建立系統架構、API 設計和元件規格。

**何時使用**：
- 規劃新功能或系統
- 需要 API 或資料庫設計
- 建立元件架構
- 文件系統關係

**基本語法**：
```bash
/sc:design user-auth-system        # 設計使用者認證系統
/sc:design --type api auth         # 僅設計 API 部分
/sc:design --format spec payment   # 建立正式規格
```

**有用的旗標**：
- `--type architecture|api|component|database` - 設計重點
- `--format diagram|spec|code` - 輸出格式
- `--iterative` - 透過迭代改進設計

**實際範例**：
```bash
/sc:design --type api user-management    # 設計使用者管理 API
/sc:design --format spec chat-system     # 建立聊天系統規格
/sc:design --type database ecommerce     # 設計資料庫結構
```

**注意事項**：
- 更多概念性而非程式碼生成
- 輸出品質取決於你描述需求的清晰度
- 規劃階段效果較好，較少於實作細節

## 分析指令 🔍

### `/analyze` - 程式碼分析  
**它做什麼**：全面分析程式碼品質、安全性、效能和架構。

**有用的部分**：SuperClaude 嘗試偵測你需要的分析類型，通常會選擇相關專家！🔍

**何時使用**：
- 理解不熟悉的程式碼庫（只需指向任何資料夾）
- 尋找安全性漏洞（安全專家通常會介入）
- 效能瓶頸追蹤（效能專家通常會協助）
- 程式碼品質評估（品質專家通常會接手）

**基本語法**：
```bash
/sc:analyze src/                   # 分析整個 src 目錄
/sc:analyze --focus security       # 專注於安全性問題
/sc:analyze --depth deep app.js    # 深入分析特定檔案
```

**有用的旗標**：
- `--focus quality|security|performance|architecture` - 分析重點
- `--depth quick|deep` - 分析徹底程度
- `--format text|json|report` - 輸出格式

**實際範例**：
```bash
/sc:analyze --focus security --depth deep     # 深入安全性分析
/sc:analyze --focus performance src/api/      # 效能分析 API
/sc:analyze --format report .                 # 生成分析報告
```

**注意事項**：
- 大型程式碼庫可能需要較長時間
- 安全性分析相當不錯，效能分析則因專案而異
- 與常見語言（JS、Python 等）運作最佳

---

### `/troubleshoot` - 問題調查
**它做什麼**：系統化除錯和問題調查。

**何時使用**：
- 某些東西壞了，你不知道為什麼
- 需要系統化除錯方法
- 錯誤訊息令人困惑
- 效能問題調查

**基本語法**：
```bash
/sc:troubleshoot "login not working"     # 調查登入問題
/sc:troubleshoot --logs error.log        # 分析錯誤日誌
/sc:troubleshoot performance             # 效能除錯
```

**有用的旗標**：
- `--logs <file>` - 包含日誌檔案分析
- `--systematic` - 使用結構化除錯方法
- `--focus network|database|frontend` - 專注領域

**實際範例**：
```bash
/sc:troubleshoot "API returning 500" --logs server.log
/sc:troubleshoot --focus database "slow queries"
/sc:troubleshoot "build failing" --systematic
```

**注意事項**：
- 與特定錯誤描述運作最佳
- 包含相關錯誤訊息和日誌時盡可能
- 可能會先建議明顯的事情（這通常是好的！）

---

### `/explain` - 教育解釋
**它做什麼**：以教育方式解釋程式碼、概念和技術。

**何時使用**：
- 學習新技術或模式
- 理解複雜程式碼
- 需要向團隊成員解釋複雜概念
- 文件棘手概念

**基本語法**：
```bash
/sc:explain async/await               # 解釋 async/await 概念
/sc:explain --code src/utils.js       # 解釋特定程式碼檔案
/sc:explain --beginner React hooks    # 初學者友善解釋
```

**有用的旗標**：
- `--beginner` - 較簡單的解釋
- `--advanced` - 技術深度
- `--code <file>` - 解釋特定程式碼
- `--examples` - 包含實際範例

**實際範例**：
```bash
/sc:explain --beginner "what is REST API"
/sc:explain --code src/auth.js --advanced
/sc:explain --examples "React context patterns"
```

**注意事項**：
- 對於已知概念效果較好，可能難以處理非常專業的主題
- 與具體問題比模糊的 "解釋這個程式碼庫" 運作最佳
- 包含你經驗水平的相關內容

## 品質指令 ✨

### `/improve` - 程式碼增強
**它做什麼**：系統化程式碼品質、效能和維護性改進。

**何時使用**：
- 重構混亂程式碼
- 效能最佳化
- 應用最佳實踐
- 現代化舊程式碼

**基本語法**：
```bash
/sc:improve src/legacy/            # 改善舊程式碼
/sc:improve --type performance     # 專注於效能
/sc:improve --safe src/utils.js    # 安全、低風險改進
```

**有用的旗標**：
- `--type quality|performance|maintainability|style` - 改進重點
- `--safe` - 僅應用低風險變更
- `--preview` - 顯示不會執行的變更

**實際範例**：
```bash
/sc:improve --type performance --safe src/api/
/sc:improve --preview src/components/LegacyComponent.js
/sc:improve --type style . --safe
```

**注意事項**：
- 永遠使用 `--preview` 先看看它想改變什麼
- `--safe` 是你的朋友 - 防止風險重構
- 與較小檔案/模組比較運作最佳，而非整個程式碼庫

---

### `/cleanup` - 技術債務減少
**它做什麼**：移除死程式碼、未使用匯入和組織檔案結構。

**何時使用**：
- 程式碼庫感覺雜亂
- 大量未使用匯入/變數
- 檔案組織混亂
- 在主要重構之前

**基本語法**：
```bash
/sc:cleanup src/                   # 清理 src 目錄
/sc:cleanup --dead-code            # 專注於移除死程式碼
/sc:cleanup --imports package.js   # 清理特定檔案的匯入
```

**有用的旗標**：
- `--dead-code` - 移除未使用程式碼
- `--imports` - 清理匯入陳述式
- `--files` - 重新組織檔案結構
- `--safe` - 保守清理

**實際範例**：
```bash
/sc:cleanup --dead-code --safe src/utils/
/sc:cleanup --imports src/components/
/sc:cleanup --files . --safe
```

**注意事項**：
- 可能會激進 - 永遠仔細審查變更
- 可能無法捕捉所有死程式碼（尤其是動態匯入）
- 較好於較小區塊而非整個專案

---

### `/test` - 測試與品質保證
**它做什麼**：執行測試、生成覆蓋率報告並維護測試品質。

**何時使用**：
- 執行測試套件
- 檢查測試覆蓋率
- 生成測試報告
- 設定持續測試

**基本語法**：
```bash
/sc:test                           # 執行所有測試
/sc:test --type unit               # 僅執行單元測試
/sc:test --coverage                # 生成覆蓋率報告
/sc:test --watch src/              # 開發模式監控
```

**有用的旗標**：
- `--type unit|integration|e2e|all` - 測試類型
- `--coverage` - 生成覆蓋率報告
- `--watch` - 在監控模式下執行測試
- `--fix` - 嘗試自動修復失敗的測試

**實際範例**：
```bash
/sc:test --type unit --coverage
/sc:test --watch src/components/
/sc:test --type e2e --fix
```

**注意事項**：
- 需要你的測試框架正確配置
- 覆蓋率報告取決於你現有的測試設定
- `--fix` 是實驗性質 - 審查它改變的內容

## 文件指令 📝

### `/document` - 專注文件
**它做什麼**：為特定元件、函數或功能建立文件。

**何時使用**：
- 需要 README 檔案
- 撰寫 API 文件
- 添加程式碼註解
- 建立使用者指南

**基本語法**：
```bash
/sc:document src/api/auth.js       # 文件認證模組
/sc:document --type api            # API 文件
/sc:document --style brief README  # 簡潔 README 檔案
```

**有用的旗標**：
- `--type inline|external|api|guide` - 文件類型
- `--style brief|detailed` - 詳細程度
- `--template` - 使用特定文件模板

**實際範例**：
```bash
/sc:document --type api src/controllers/
/sc:document --style detailed --type guide user-onboarding
/sc:document --type inline src/utils/helpers.js
```

**注意事項**：
- 與特定檔案/函數比整個專案效果較好
- 品質取決於你程式碼的組織程度
- 可能需要一些編輯以符合你的專案文件風格

## 專案管理指令 📊

### `/estimate` - 專案估算
**它做什麼**：估算開發任務的時間、努力和複雜性。

**何時使用**：
- 規劃新功能
- 衝刺規劃
- 理解專案複雜性
- 資源分配

**基本語法**：
```bash
/sc:estimate "add user authentication"    # 估算認證功能
/sc:estimate --detailed shopping-cart     # 詳細分解
/sc:estimate --complexity user-dashboard  # 複雜性分析
```

**有用的旗標**：
- `--detailed` - 詳細分解任務
- `--complexity` - 專注於技術複雜性
- `--team-size <n>` - 考慮團隊大小估算

**實際範例**：
```bash
/sc:estimate --detailed "implement payment system"
/sc:estimate --complexity --team-size 3 "migrate to microservices"
/sc:estimate "add real-time chat" --detailed
```

**注意事項**：
- 估算是粗略的 - 用作起點，而非聖經
- 與清晰、具體功能描述運作最佳
- 考慮你團隊對技術堆疊的經驗

---

### `/task` - 長期專案管理
**它做什麼**：管理複雜、多階段開發任務和功能。

**何時使用**：
- 規劃需要數天/數週的功能
- 分解大型專案
- 跨會話追蹤進度
- 協調團隊工作

**基本語法**：
```bash
/sc:task create "implement user dashboard"  # 建立新任務
/sc:task status                            # 檢查任務狀態
/sc:task breakdown "payment integration"    # 分解為子任務
```

**有用的旗標**：
- `create` - 建立新長期任務
- `status` - 檢查當前任務狀態
- `breakdown` - 分解大型任務為較小部分
- `--priority high|medium|low` - 設定任務優先順序

**實際範例**：
```bash
/sc:task create "migrate from REST to GraphQL" --priority high
/sc:task breakdown "e-commerce checkout flow"
/sc:task status
```

**注意事項**：
- 仍處於實驗階段 - 不一定能可靠地跨會話持續
- 較適合規劃而非實際專案管理
- 運作最佳時，你對需求非常明確

---

### `/spawn` - 複雜操作協調
**它做什麼**：協調複雜、多步驟操作和流程。

**何時使用**：
- 涉及多個工具/系統的操作
- 協調平行工作流程
- 複雜部署流程
- 多階段資料處理

**基本語法**：
```bash
/sc:spawn deploy-pipeline          # 協調部署
/sc:spawn --parallel migrate-data  # 平行資料遷移
/sc:spawn setup-dev-environment    # 複雜環境設定
```

**有用的旗標**：
- `--parallel` - 當可能時在平行模式下執行操作
- `--sequential` - 強制順序執行
- `--monitor` - 監控操作進度

**實際範例**：
```bash
/sc:spawn --parallel "test and deploy to staging"
/sc:spawn setup-ci-cd --monitor
/sc:spawn --sequential database-migration
```

**注意事項**：
- 最複雜的指令 - 預期一些粗糙的邊緣
- 較適合定義良好的工作流程，而非隨機操作
- 可能需要多次迭代才能正確

## 版本控制指令 🔄

### `/git` - 增強 git 操作
**它做什麼**：git 操作，具有智慧提交訊息和工作流程最佳化。

**何時使用**：
- 使用更好的訊息進行提交
- 分支管理
- 複雜 git 工作流程
- git 除錯

**基本語法**：
```bash
/sc:git commit                     # 智慧提交，自動生成訊息
/sc:git --smart-commit add .       # 新增並提交，智慧訊息
/sc:git branch feature/new-auth    # 建立並切換到新分支
```

**有用的旗標**：
- `--smart-commit` - 生成智慧提交訊息
- `--branch-strategy` - 應用分支命名慣例
- `--interactive` - 互動式模式進行複雜操作

**實際範例**：
```bash
/sc:git --smart-commit "fixed login bug"
/sc:git branch feature/user-dashboard --branch-strategy
/sc:git merge develop --interactive
```

**注意事項**：
- 智慧提交訊息相當不錯，但請審查它們
- 假設你遵循常見 git 工作流程
- 不會修復壞的 git 習慣 - 只是讓它們更容易

## 工具指令 🔧

### `/index` - 指令導航
**它做什麼**：幫助你找到適合你任務的指令。

**何時使用**：
- 不確定該使用哪個指令
- 探索可用指令
- 了解指令功能

**基本語法**：
```bash
/sc:index                          # 列出所有指令
/sc:index testing                  # 尋找與測試相關的指令
/sc:index --category analysis      # 分析類別的指令
```

**有用的旗標**：
- `--category <cat>` - 依指令類別過濾
- `--search <term>` - 搜尋指令描述

**實際範例**：
```bash
/sc:index --search "performance"
/sc:index --category quality
/sc:index git
```

**注意事項**：
- 簡單但有用於發現
- 比嘗試記住所有 16 個指令更好

---

### `/load` - 專案內容載入
**它做什麼**：載入並分析專案內容以獲得更好的理解。

**何時使用**：
- 開始處理不熟悉的專案
- 需要了解專案結構
- 在進行重大更改之前
- 團隊成員加入時

**基本語法**：
```bash
/sc:load                           # 載入當前專案內容
/sc:load src/                      # 載入特定目錄內容
/sc:load --deep                    # 深入分析專案結構
```

**有用的旗標**：
- `--deep` - 全面專案分析
- `--focus <area>` - 專注特定專案領域
- `--summary` - 生成專案摘要

**實際範例**：
```bash
/sc:load --deep --summary
/sc:load src/components/ --focus architecture
/sc:load . --focus dependencies
```

**注意事項**：
- 大型專案可能需要較長時間
- 在開發期間比較有用，而非專案開始時
- 有助於加入，但不是好文件的替代品

## 指令提示與模式 💡

### 有效旗標組合
```bash
# 安全改進工作流程
/sc:improve --preview src/component.js    # 查看會發生什麼變化
/sc:improve --safe src/component.js       # 僅應用安全變更

# 全面分析
/sc:analyze --focus security --depth deep
/sc:test --coverage
/sc:document --type api

# 智慧 git 工作流程
/sc:git add .
/sc:git --smart-commit --branch-strategy

# 專案理解工作流程
/sc:load --deep --summary
/sc:analyze --focus architecture
/sc:document --type guide
```

### 常見工作流程

**新專案加入**：
```bash
/sc:load --deep --summary
/sc:analyze --focus architecture
/sc:test --coverage
/sc:document README
```

**錯誤調查**：
```bash
/sc:troubleshoot "specific error message" --logs
/sc:analyze --focus security
/sc:test --type unit affected-component
```

**程式碼品質改進**：
```bash
/sc:analyze --focus quality
/sc:improve --preview src/
/sc:cleanup --safe
/sc:test --coverage
```

**預部署檢查清單**：
```bash
/sc:test --type all --coverage
/sc:analyze --focus security
/sc:build --type prod --optimize
/sc:git --smart-commit
```

### 調整指令問題

**指令未如預期運作？**
- 嘗試添加 `--help` 查看所有選項
- 使用 `--preview` 或 `--safe` 旗標（當可用時）
- 從較小範圍開始（單一檔案 vs 整個專案）

**分析耗時過長？**
- 使用 `--focus` 縮小範圍
- 嘗試 `--depth quick` 而非深度分析
- 先分析較小目錄

**建置/測試命令失敗？**
- 確保你的工具在 PATH 中
- 檢查配置檔案是否在預期位置
- 先嘗試直接運行底層命令

**不確定該使用哪個指令？**
- 使用 `/index` 瀏覽可用指令
- 查看上方快速參考表格
- 先嘗試最特定指令，然後較廣泛的指令

---

## 最終筆記 📝

**這些指令的真實事實** 💯：
- **只需嘗試它們** - 你不需要先研究這個指南
- **從基礎開始** - `/analyze`、`/build`、`/improve` 涵蓋大多數需求
- **讓自動啟動發揮作用** - SuperClaude 通常會選擇有用的專家
- **自由實驗** - 使用 `--preview` 如果你想要先看看會發生什麼

**仍然有粗糙的地方**：
- 複雜協調（spawn、task）可能有些不穩定
- 某些分析取決於你的專案設定  
- 某些指令的錯誤處理可以更好

**持續改進**：
- 我們根據使用者回饋積極改進指令
- 較新的指令（analyze、improve）通常運作更好
- 自動啟動變得更聰明

**不要過度緊張這個** 🧘‍♂️
- SuperClaude 設計為可透過使用發現
- 輸入 `/` 查看可用指令
- 指令建議它們可以做什麼，當你使用 `--help` 時
- 智能路由處理大多數複雜性

**需要協助？** 檢查 GitHub 問題或如果你卡住，請創建一個新問題！🚀

---

*Happy coding! 只需記住 - 你可以跳過大部分指南，透過實作學習。🎯*

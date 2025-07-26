---
sidebar_position: 1
title: SuperClaude 指令指南
description: 一份完整的 SuperClaude 斜線指令實用指南，涵蓋開發、分析、品質、專案管理等指令的詳細說明與範例。
tags:
  - SuperClaude
  - 指令指南
  - AI工具
last_update:
  date: 2025-07-26
  author: Danny
---

# SuperClaude 指令指南 🛠️

## 💡 別想得太複雜 - SuperClaude 會試著幫你

**關於這 17 個指令的真相**：你不需要記住它們。只要從 `/sc:analyze` 或 `/sc:implement` 開始，看看會發生什麼事！

**通常的運作方式如下：**
- 在 Claude Code 中輸入 `/` → 查看可用指令
- 使用像 `/sc:analyze`、`/sc:build`、`/sc:improve` 這樣基本的指令
- **SuperClaude 會為每種情況挑選有幫助的工具和專家**
- 當你越來越熟悉時，更多指令就會派上用場

> **⚠️ 注意**：
> **自動啟用功能相當巧妙** 🪄 - SuperClaude 會試圖偵測你想做什麼，並啟用相關的專家（安全專家、效能優化師等），無需你手動管理。通常效果很好！😊

---

## 快速上手清單 🚀

**從這裡開始**（無需閱讀）：
```bash
/sc:index                    # 查看有哪些可用指令
/sc:analyze src/            # 嘗試智慧分析你的程式碼
/sc:workflow feature-100-prd.md  # 從產品需求文件（PRD）建立逐步實作流程
/sc:implement user-auth     # 建立功能和元件（取代 v2 的 /build）
/sc:build                   # 嘗試進行智慧專案建置
/sc:improve messy-file.js   # 嘗試清理程式碼
/sc:troubleshoot "error"    # 嘗試協助解決問題
```

**老實說，這就足以開始了。** 以下所有內容是為當你對其他可用工具有所好奇時準備的。 🛠️

---

一份關於所有 16 個 SuperClaude 斜線指令的實用指南。我們將坦誠說明哪些功能運作良好，哪些仍在改進中。

## 快速參考 📋

*（你真的不需要記住這個 - 挑選聽起來有用的即可）*

| 指令               | 目的                | 自動啟用      | 最適用於                      |
| ------------------ | ------------------- | ------------- | ----------------------------- |
| `/sc:analyze`      | 智慧程式碼分析      | 安全/效能專家 | 尋找問題、理解程式碼庫        |
| `/sc:build`        | 智慧建置            | 前端/後端專家 | 編譯、打包、部署準備          |
| `/sc:implement`    | 功能實作            | 領域特定專家  | 建立功能、元件、API、服務     |
| `/sc:improve`      | 自動程式碼清理      | 品質專家      | 重構、優化、品質修復          |
| `/sc:troubleshoot` | 問題調查            | 除錯專家      | 除錯、問題調查                |
| `/sc:test`         | 智慧測試            | 品保專家      | 執行測試、覆蓋率分析          |
| `/sc:document`     | 自動文件產生        | 寫作專家      | README 檔案、程式碼註解、指南 |
| `/sc:git`          | 增強型 git 工作流程 | DevOps 專家   | 智慧提交、分支管理            |
| `/sc:design`       | 系統設計輔助        | 架構專家      | 架構規劃、API 設計            |
| `/sc:explain`      | 學習助理            | 教學專家      | 學習概念、理解程式碼          |
| `/sc:cleanup`      | 技術債清理          | 重構專家      | 移除無用程式碼、整理檔案      |
| `/sc:load`         | 情境理解            | 分析專家      | 專案分析、程式碼庫理解        |
| `/sc:estimate`     | 智慧估算            | 規劃專家      | 時間/人力規劃、複雜度分析     |
| `/sc:spawn`        | 複雜工作流程        | 編排系統      | 多步驟操作、工作流程自動化    |
| `/sc:task`         | 專案管理            | 規劃系統      | 長期功能規劃、任務追蹤        |
| `/sc:workflow`     | 實作規劃            | 工作流程系統  | 從 PRD 建立逐步工作流程       |
| `/sc:index`        | 指令導航            | 輔助系統      | 找到適合任務的指令            |

> **⚠️ 注意**：
> 只要嘗試那些聽起來有用的指令即可。SuperClaude 通常會為每種情況啟用有幫助的專家和工具！🎯

## 開發指令 🔨

### `/workflow` - 實作流程產生器 🗺️
**功能**：分析產品需求文件（PRD）和功能需求，以建立全面的逐步實作流程。

**實用之處**：它會讀取你的 PRD，並將其分解為一個結構化的實作計畫，包含專家指導、依賴關係對應和任務協調！🎯

**使用時機**：
- 從 PRD 或規格文件開始一個新功能
- 需要一個清晰的實作藍圖
- 希望獲得關於實作策略的專家指導
- 規劃具有多個依賴關係的複雜功能

**神奇之處**：根據你的功能需求，自動啟用合適的專家角色（架構師、安全、前端、後端）和 MCP 伺服器（Context7 用於模式分析，Sequential 用於複雜分析）。

**範例**：
```bash
/sc:workflow docs/feature-100-prd.md --strategy systematic --c7 --sequential
/sc:workflow "user authentication system" --persona security --output detailed
/sc:workflow payment-api --strategy mvp --risks --dependencies
```

**你會得到**：
- **藍圖格式**：分階段的實作計畫與時間軸
- **任務格式**：有組織的史詩（epics）、故事（stories）和可執行的任務
- **詳細格式**：包含時間估算的逐步說明
- **風險評估**：潛在問題與緩解策略
- **依賴關係對應**：內部與外部的依賴關係
- **專家指導**：特定領域的最佳實踐與模式

### `/implement` - 功能實作
**功能**：透過智慧專家啟用，實作功能、元件和各種應用。

**實用之處**：SuperClaude 會根據你正在實作的內容，自動啟用合適的專家（前端、後端、安全）和工具！🎯

**使用時機**：
- 建立新功能或元件（取代 v2 的 `/build` 功能）
- 實作 API、服務或模組
- 使用現代框架建置 UI 元件
- 開發業務邏輯和整合

**基本語法**：
```bash
/sc:implement user authentication system      # 實作完整功能
/sc:implement --type component LoginForm      # 建立特定元件
/sc:implement --type api user-management      # 建置 API 端點
/sc:implement --framework react dashboard     # 針對特定框架的實作
```

**實用旗標**：
- `--type component|api|service|feature|module` - 實作類型
- `--framework react|vue|express|django|etc` - 目標框架
- `--safe` - 保守的實作方法
- `--iterative` - 透過驗證進行逐步開發
- `--with-tests` - 包含測試實作
- `--documentation` - 隨程式碼產生文件

**實際範例**：
```bash
/sc:implement user authentication --type feature --with-tests
/sc:implement dashboard component --type component --framework react
/sc:implement REST API for orders --type api --safe
/sc:implement payment processing --type service --iterative
/sc:implement search functionality --framework vue --documentation
```

**自動啟用模式**：
- **前端**：UI 元件、React/Vue/Angular → 前端專家 + Magic MCP
- **後端**：API、服務、資料庫 → 後端專家 + Context7
- **安全**：驗證、支付、敏感資料 → 安全專家 + 驗證
- **複雜功能**：多步驟實作 → Sequential MCP + 架構師專家

> **⚠️ 注意**：
> - 指定 `--type` 以獲得更好的結果（component vs service vs feature）
> - 當使用特定技術棧時，使用 `--framework`
> - 對於生產程式碼嘗試 `--safe`，對於複雜功能嘗試 `--iterative`
> - 請記住：這取代了 v2 的 `/build` 用於實際的程式碼實作

---

### `/build` - 專案建置
**功能**：透過智慧錯誤處理來建置、編譯和打包專案。

**簡單用法**：只要輸入 `/sc:build`，SuperClaude 就會試圖找出你的建置系統！🎯

**使用時機**：
- 你需要編譯/打包你的專案（試試 `/sc:build`）
- 建置過程失敗，需要協助除錯
- 設定建置優化（它會試圖偵測你需要什麼）
- 準備部署

**基本語法**：
```bash
/sc:build                          # 建置當前專案
/sc:build --type prod              # 生產環境建置
/sc:build --clean                  # 清理建置（移除舊的產物）
/sc:build --optimize               # 啟用優化
/sc:build src/                     # 建置特定目錄
```

**實用旗標**：
- `--type dev|prod|test` - 建置類型
- `--clean` - 建置前清理
- `--optimize` - 啟用建置優化
- `--verbose` - 顯示詳細的建置輸出

**實際範例**：
```bash
/sc:build --type prod --optimize   # 帶有優化的生產環境建置
/sc:build --clean --verbose        # 帶有詳細輸出的清理建置
/sc:build src/components           # 只建置 components 資料夾
```

> **⚠️ 注意**：
> - 對於常見的建置工具（npm, webpack 等）效果最好
> - 對於非常客製化的建置設定可能會遇到困難
> - 檢查你的建置工具是否在 PATH 中

---

### `/design` - 系統與元件設計
**功能**：建立系統架構、API 設計和元件規格。

**使用時機**：
- 規劃新功能或系統
- 需要 API 或資料庫設計
- 建立元件架構
- 文件化系統關係

**基本語法**：
```bash
/sc:design user-auth-system        # 設計一個使用者驗證系統
/sc:design --type api auth         # 只設計 API 部分
/sc:design --format spec payment   # 建立正式規格文件
```

**實用旗標**：
- `--type architecture|api|component|database` - 設計重點
- `--format diagram|spec|code` - 輸出格式
- `--iterative` - 透過迭代完善設計

**實際範例**：
```bash
/sc:design --type api user-management    # 設計使用者管理 API
/sc:design --format spec chat-system     # 建立聊天系統規格文件
/sc:design --type database ecommerce     # 設計資料庫結構
```

> **⚠️ 注意**：
> - 偏向概念性而非程式碼生成
> - 輸出品質取決於你描述需求的清晰度
> - 非常適合規劃階段，較不適合實作細節

## 分析指令 🔍

### `/analyze` - 程式碼分析
**功能**：對程式碼品質、安全性、效能和架構進行全面分析。

**實用之處**：SuperClaude 會試圖偵測你需要哪種分析，並通常會挑選相關的專家！🔍

**使用時機**：
- 理解不熟悉的程式碼庫（只要將它指向任何資料夾）
- 尋找安全漏洞（安全專家通常會介入）
- 尋找效能瓶頸（效能專家通常會提供幫助）
- 程式碼品質評估（品質專家通常會接手）

**基本語法**：
```bash
/sc:analyze src/                   # 分析整個 src 目錄
/sc:analyze --focus security       # 專注於安全問題
/sc:analyze --depth deep app.js    # 對特定檔案進行深度分析
```

**實用旗標**：
- `--focus quality|security|performance|architecture` - 分析重點
- `--depth quick|deep` - 分析的深入程度
- `--format text|json|report` - 輸出格式

**實際範例**：
```bash
/sc:analyze --focus security --depth deep     # 深度安全分析
/sc:analyze --focus performance src/api/      # API 的效能分析
/sc:analyze --format report .                 # 產生分析報告
```

> **⚠️ 注意**：
> - 在大型程式碼庫上可能需要一些時間
> - 安全分析相當不錯，效能分析效果不一
> - 對於常見語言（JS, Python 等）效果最好

---

### `/troubleshoot` - 問題調查
**功能**：系統性地進行除錯和問題調查。

**使用時機**：
- 某些東西壞了，但你不確定原因
- 需要系統性的除錯方法
- 錯誤訊息令人困惑
- 調查效能問題

**基本語法**：
```bash
/sc:troubleshoot "login not working"     # 調查登入問題
/sc:troubleshoot --logs error.log        # 分析錯誤日誌
/sc:troubleshoot performance             # 效能問題排查
```

**實用旗標**：
- `--logs <file>` - 包含日誌檔案分析
- `--systematic` - 使用結構化的除錯方法
- `--focus network|database|frontend` - 重點領域

**實際範例**：
```bash
/sc:troubleshoot "API returning 500" --logs server.log
/sc:troubleshoot --focus database "slow queries"
/sc:troubleshoot "build failing" --systematic
```

> **⚠️ 注意**：
> - 對於具體的錯誤描述效果更好
> - 盡可能包含相關的錯誤訊息和日誌
> - 可能會先建議一些顯而易見的方法（這通常是好的！）

---

### `/explain` - 教育性解釋
**功能**：以教育性的方式解釋程式碼、概念和技術。

**使用時機**：
- 學習新技術或模式
- 理解複雜的程式碼
- 需要為團隊成員提供清晰的解釋
- 文件化棘手的概念

**基本語法**：
```bash
/sc:explain async/await               # 解釋 async/await 概念
/sc:explain --code src/utils.js       # 解釋特定的程式碼檔案
/sc:explain --beginner React hooks    # 初學者友好的解釋
```

**實用旗標**：
- `--beginner` - 較簡單的解釋
- `--advanced` - 技術深度
- `--code <file>` - 解釋特定的程式碼
- `--examples` - 包含實際範例

**實際範例**：
```bash
/sc:explain --beginner "what is REST API"
/sc:explain --code src/auth.js --advanced
/sc:explain --examples "React context patterns"
```

> **⚠️ 注意**：
> - 對於眾所周知的概念效果很好，對於非常小眾的主題可能會遇到困難
> - 對於具體問題比模糊的「解釋這個程式碼庫」效果更好
> - 包含關於你經驗水平的情境

## 品質指令 ✨

### `/improve` - 程式碼增強
**功能**：系統性地改善程式碼品質、效能和可維護性。

**使用時機**：
- 重構混亂的程式碼
- 效能優化
- 應用最佳實踐
- 現代化舊程式碼

**基本語法**：
```bash
/sc:improve src/legacy/            # 改善舊程式碼
/sc:improve --type performance     # 專注於效能
/sc:improve --safe src/utils.js    # 僅進行安全的、低風險的改進
```

**實用旗標**：
- `--type quality|performance|maintainability|style` - 改進重點
- `--safe` - 僅應用低風險的變更
- `--preview` - 顯示將會變更的內容而不執行

**實際範例**：
```bash
/sc:improve --type performance --safe src/api/
/sc:improve --preview src/components/LegacyComponent.js
/sc:improve --type style . --safe
```

> **⚠️ 注意**：
> - 總是先使用 `--preview` 來查看它想要變更什麼
> - `--safe` 是你的好朋友 - 防止有風險的重構
> - 對於較小的檔案/模組比整個程式碼庫效果更好

---

### `/cleanup` - 技術債清理
**功能**：移除無用程式碼、未使用的匯入，並整理檔案結構。

**使用時機**：
- 程式碼庫感覺混亂
- 大量未使用的匯入/變數
- 檔案組織混亂
- 在進行重大重構之前

**基本語法**：
```bash
/sc:cleanup src/                   # 清理 src 目錄
/sc:cleanup --dead-code            # 專注於移除無用程式碼
/sc:cleanup --imports package.js   # 清理特定檔案中的匯入
```

**實用旗標**：
- `--dead-code` - 移除未使用的程式碼
- `--imports` - 清理匯入語句
- `--files` - 重新組織檔案結構
- `--safe` - 僅進行保守的清理

**實際範例**：
```bash
/sc:cleanup --dead-code --safe src/utils/
/sc:cleanup --imports src/components/
/sc:cleanup --files . --safe
```

> **⚠️ 注意**：
> - 可能會很具侵略性 - 總是仔細審查變更
> - 可能無法捕捉到所有無用程式碼（特別是動態匯入）
> - 在較小的部分上執行比整個專案更好

---

### `/test` - 測試與品質保證
**功能**：執行測試、產生覆蓋率報告，並維護測試品質。

**使用時機**：
- 執行測試套件
- 檢查測試覆蓋率
- 產生測試報告
- 設定持續測試

**基本語法**：
```bash
/sc:test                           # 執行所有測試
/sc:test --type unit               # 只執行單元測試
/sc:test --coverage                # 產生覆蓋率報告
/sc:test --watch src/              # 開發時的監看模式
```

**實用旗標**：
- `--type unit|integration|e2e|all` - 測試類型
- `--coverage` - 產生覆蓋率報告
- `--watch` - 在監看模式下執行測試
- `--fix` - 嘗試自動修復失敗的測試

**實際範例**：
```bash
/sc:test --type unit --coverage
/sc:test --watch src/components/
/sc:test --type e2e --fix
```

> **⚠️ 注意**：
> - 需要你的測試框架已正確設定
> - 覆蓋率報告取決於你現有的測試設定
> - `--fix` 是實驗性的 - 審查它所做的變更

## 文件指令 📝

### `/document` - 專注文件
**功能**：為特定的元件、函式或功能建立文件。

**使用時機**：
- 需要 README 檔案
- 編寫 API 文件
- 新增程式碼註解
- 建立使用者指南

**基本語法**：
```bash
/sc:document src/api/auth.js       # 為驗證模組建立文件
/sc:document --type api            # API 文件
/sc:document --style brief README  # 簡要的 README 檔案
```

**實用旗標**：
- `--type inline|external|api|guide` - 文件類型
- `--style brief|detailed` - 詳細程度
- `--template` - 使用特定的文件模板

**實際範例**：
```bash
/sc:document --type api src/controllers/
/sc:document --style detailed --type guide user-onboarding
/sc:document --type inline src/utils/helpers.js
```

> **⚠️ 注意**：
> - 對於特定的檔案/函式比整個專案效果更好
> - 品質取決於你的程式碼結構有多好
> - 可能需要一些編輯以符合你專案的文件風格

## 專案管理指令 📊

### `/estimate` - 專案估算
**功能**：估算開發任務的時間、人力和複雜性。

**使用時機**：
- 規劃新功能
- 衝刺（Sprint）規劃
- 理解專案複雜性
- 資源分配

**基本語法**：
```bash
/sc:estimate "add user authentication"    # 估算驗證功能
/sc:estimate --detailed shopping-cart     # 詳細的分解
/sc:estimate --complexity user-dashboard  # 複雜性分析
```

**實用旗標**：
- `--detailed` - 任務的詳細分解
- `--complexity` - 專注於技術複雜性
- `--team-size <n>` - 在估算中考慮團隊規模

**實際範例**：
```bash
/sc:estimate --detailed "implement payment system"
/sc:estimate --complexity --team-size 3 "migrate to microservices"
/sc:estimate "add real-time chat" --detailed
```

> **⚠️ 注意**：
> - 估算是粗略的 - 作為起點，而非絕對標準
> - 對於清晰、具體的功能描述效果更好
> - 考慮你的團隊對技術棧的經驗

---

### `/task` - 長期專案管理
**功能**：管理複雜的、跨會話的開發任務和功能。

**使用時機**：
- 規劃需要數天/數週的功能
- 分解大型專案
- 跨會話追蹤進度
- 協調團隊工作

**基本語法**：
```bash
/sc:task create "implement user dashboard"  # 建立新任務
/sc:task status                            # 檢查任務狀態
/sc:task breakdown "payment integration"    # 將任務分解為子任務
```

**實用旗標**：
- `create` - 建立新的長期任務
- `status` - 檢查當前任務狀態
- `breakdown` - 將大任務分解為小任務
- `--priority high|medium|low` - 設定任務優先級

**實際範例**：
```bash
/sc:task create "migrate from REST to GraphQL" --priority high
/sc:task breakdown "e-commerce checkout flow"
/sc:task status
```

> **⚠️ 注意**：
> - 仍處於實驗階段 - 有時無法可靠地跨會話保持狀態 😅
> - 更適合規劃而非實際的專案管理
> - 當你對需求描述得越具體，效果越好

---

### `/spawn` - 複雜操作編排
**功能**：協調複雜的、多步驟的操作和工作流程。

**使用時機**：
- 涉及多個工具/系統的操作
- 協調並行工作流程
- 複雜的部署流程
- 多階段的資料處理

**基本語法**：
```bash
/sc:spawn deploy-pipeline          # 編排部署流程
/sc:spawn --parallel migrate-data  # 並行資料遷移
/sc:spawn setup-dev-environment    # 複雜的開發環境設定
```

**實用旗標**：
- `--parallel` - 盡可能並行執行操作
- `--sequential` - 強制順序執行
- `--monitor` - 監控操作進度

**實際範例**：
```bash
/sc:spawn --parallel "test and deploy to staging"
/sc:spawn setup-ci-cd --monitor
/sc:spawn --sequential database-migration
```

> **⚠️ 注意**：
> - 最複雜的指令 - 預期會有一些不完善之處
- 對於定義良好的工作流程比臨時操作效果更好
- 可能需要多次迭代才能正確執行

## 版本控制指令 🔄

### `/git` - 增強型 Git 操作
**功能**：具有智慧提交訊息和工作流程優化的 Git 操作。

**使用時機**：
- 撰寫更好的提交訊息
- 分支管理
- 複雜的 git 工作流程
- Git 問題排查

**基本語法**：
```bash
/sc:git commit                     # 帶有自動生成訊息的智慧提交
/sc:git --smart-commit add .       # 新增並以智慧訊息提交
/sc:git branch feature/new-auth    # 建立並切換到新分支
```

**實用旗標**：
- `--smart-commit` - 產生智慧提交訊息
- `--branch-strategy` - 應用分支命名慣例
- `--interactive` - 用於複雜操作的互動模式

**實際範例**：
```bash
/sc:git --smart-commit "fixed login bug"
/sc:git branch feature/user-dashboard --branch-strategy
/sc:git merge develop --interactive
```

> **⚠️ 注意**：
> - 智慧提交訊息相當不錯，但還是要審查它們
> - 假設你遵循常見的 git 工作流程
> - 不會修復不良的 git 習慣 - 只是讓它們更容易

## 工具指令 🔧

### `/index` - 指令導航
**功能**：幫助你找到適合任務的正確指令。

**使用時機**：
- 不確定該使用哪個指令
- 探索可用的指令
- 了解指令的功能

**基本語法**：
```bash
/sc:index                          # 列出所有指令
/sc:index testing                  # 尋找與測試相關的指令
/sc:index --category analysis      # 分析類別中的指令
```

**實用旗標**：
- `--category <cat>` - 按指令類別篩選
- `--search <term>` - 搜尋指令描述

**實際範例**：
```bash
/sc:index --search "performance"
/sc:index --category quality
/sc:index git
```

> **⚠️ 注意**：
> - 簡單但對於發現功能很有用
> - 比試圖記住所有 16 個指令要好

---

### `/load` - 專案情境載入
**功能**：載入和分析專案情境以更好地理解。

**使用時機**：
- 開始在不熟悉的專案上工作
- 需要理解專案結構
- 在進行重大變更之前
- 新成員上手

**基本語法**：
```bash
/sc:load                           # 載入當前專案情境
/sc:load src/                      # 載入特定目錄情境
/sc:load --deep                    # 深度分析專案結構
```

**實用旗標**：
- `--deep` - 全面的專案分析
- `--focus <area>` - 專注於特定專案領域
- `--summary` - 產生專案摘要

**實際範例**：
```bash
/sc:load --deep --summary
/sc:load src/components/ --focus architecture
/sc:load . --focus dependencies
```

> **⚠️ 注意**：
> - 在大型專案上可能需要時間
> - 在專案開始時比在開發過程中更有用
> - 有助於新成員上手，但不能取代好的文件

## 指令技巧與模式 💡

### 有效的旗標組合
```bash
# 安全的改進工作流程
/sc:improve --preview src/component.js    # 查看將會變更的內容
/sc:improve --safe src/component.js       # 僅應用安全的變更

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

**新專案上手**：
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

**部署前檢查清單**：
```bash
/sc:test --type all --coverage
/sc:analyze --focus security
/sc:build --type prod --optimize
/sc:git --smart-commit
```

### 指令問題排查

**指令未如預期運作？**
- 嘗試新增 `--help` 查看所有選項
- 使用 `--preview` 或 `--safe` 旗標（如果可用）
- 從較小的範圍開始（單一檔案 vs. 整個專案）

**分析時間過長？**
- 使用 `--focus` 縮小範圍
- 嘗試 `--depth quick` 而非深度分析
- 先分析較小的目錄

**建置/測試指令失敗？**
- 確保你的工具在 PATH 中
- 檢查設定檔是否在預期位置
- 嘗試先直接執行底層的指令

**不確定該使用哪個指令？**
- 使用 `/index` 瀏覽可用指令
- 查看上面的快速參考表
- 先嘗試最具體的指令，然後再試較廣泛的指令

---

## 最後的提醒 📝

**關於這些指令的真正真相** 💯：
- **儘管去試** - 你不需要先學習本指南
- **從基礎開始** - `/analyze`, `/build`, `/improve` 涵蓋了大部分需求
- **讓自動啟用發揮作用** - SuperClaude 通常會挑選有幫助的專家
- **自由實驗** - 如果你想先看看會發生什麼，可以使用 `--preview`

**仍在改進中：**
- 複雜的編排（spawn, task）可能有點不穩定
- 某些分析在很大程度上取決於你的專案設定
- 某些指令的錯誤處理可以更好

**一直在進步：**
- 我們根據使用者回饋積極改進指令
- 較新的指令（analyze, improve）往往運作得更好
- 自動啟用功能越來越聰明

**不用費心去記住這些** 🧘‍♂️
- SuperClaude 的設計是透過使用來探索
- 輸入 `/` 查看可用指令
- 使用 `--help` 時，指令會建議它們能做什麼
- 智慧路由處理了大部分的複雜性

**需要幫助嗎？** 如果你卡住了，請查看 GitHub issues 或建立一個新的！🚀

---

*祝你編碼愉快！只要記住 - 你可以跳過本指南的大部分內容，並從實踐中學習。 🎯*

---
sidebar_position: 3
title: "掌握 Gemini CLI：從入門到實戰的完整指南"
description: "本文帶你一步步學習 Gemini CLI 的核心功能，從基礎概念、環境設定到進階應用，透過實際案例讓你輕鬆掌握這款強大的 AI 開發工具，大幅提升日常開發效率。"
tags:
  - tool
  - AI
last_update:
  date: 2025-07-06
  author: Danny
---

## 本文將會涵蓋以下重點

- **第一章：認識 Gemini CLI — 我們的 AI 開發夥伴**
  - 1.1 Gemini CLI 是什麼？
  - 1.2 核心設計理念：AI 代理與上下文感知
- **第二章：開始使用 — 環境設定與第一次體驗**
  - 2.1 系統需求與安裝方法
  - 2.2 驗證方式有哪些？
  - 2.3 你的第一個指令：`gemini > "Hello, World!"`
- **第三章：指令詳解 — 如何與 Gemini 有效對話**
  - 3.1 檔案系統互動：`@` 符號的強大功能
  - 3.2 常用內建工具一覽
  - 3.3 Meta 指令 (Slash Commands)
- **第四章：進階技巧 — 釋放 Gemini 的全部潛力**
  - 4.1 提示工程（Prompt Engineering）基本概念
  - 4.2 使用 `GEMINI.md` 進行專案級別指導
- **第五章：實戰案例 — 真實世界中的應用**
  - 5.1 案例一：快速建立 Node.js Express API
  - 5.2 案例二：程式碼重構與現代化
  - 5.3 案例三：自動化檔案管理與資料整理
- **第六章：常見問題與資源**
  - 6.1 常見問題解答
  - 6.2 參考資源與延伸閱讀

---

## 第一章：認識 Gemini CLI — 我們的 AI 開發夥伴

### 1.1 Gemini CLI 是什麼？

Gemini CLI 是 Google AI 開發的一款革命性命令列介面工具。簡單來說，它把強大的 Gemini 模型直接帶到我們的終端機環境中，讓我們能用自然語言與開發環境進行互動。

換句話說，它不只是一個問答機器人。我們可以把它想像成一位隨時待命的 AI 開發夥伴或「代理」（Agent）。這位夥伴能理解我們專案的上下文、讀寫檔案、執行指令，甚至協助我們編寫、重構與除錯程式碼。無論是想快速理解陌生的程式碼庫、從 PDF 文件產生應用程式，或自動化繁瑣的維運任務，Gemini CLI 都能成為我們的得力助手。

### 1.2 核心設計理念：AI 代理與上下文感知

要充分發揮 Gemini CLI 的威力，我們需要理解它的兩個核心理念：

*   **AI 代理 (AI Agent)**：這意味著 Gemini 不只是被動回答問題，而是一個主動的執行者。當我們下達指令，例如「將所有 `.jpg` 圖片轉換為 `.png`」，Gemini 會理解我們的意圖，並在檔案系統上實際執行這個轉換操作。

*   **上下文感知 (Context-Aware)**：Gemini CLI 會將我們當前的工作目錄視為「工作區」。它會自動分析此目錄下的檔案與資料夾結構，建立對專案的理解。這讓我們可以提出更抽象的問題，像是「這個專案的主要進入點在哪裡？」或「請解釋 `auth.py` 這個檔案的作用」。

---

## 第二章：開始使用 — 環境設定與第一次體驗

### 2.1 系統需求與安裝方法

在開始之前，我們需要確保開發環境滿足以下條件：

*   **Node.js**: 版本 20 或更高
*   **作業系統**: macOS, Linux, 或 Windows

**如何安裝？**

我們有兩種方式可以安裝 Gemini CLI：

1.  **使用 `npx` 直接執行**：這種方式不需要全域安裝，可以確保每次執行的都是最新版本。
    ```bash
    npx https://github.com/google-gemini/gemini-cli
    ```

2.  **使用 `npm` 全域安裝**：如果希望在任何地方都能直接使用 `gemini` 指令，可以選擇全域安裝。
    ```bash
    npm install -g @google/gemini-cli
    ```
    安裝完成後，我們可以直接輸入 `gemini` 來啟動。

### 2.2 驗證方式有哪些？

要使用 Gemini 模型，我們需要進行身份驗證。目前支援兩種方式：

1.  **個人 Google 帳戶 (預設)**：當我們首次執行 `gemini` 時，它會自動在瀏覽器中開啟一個頁面，引導我們使用個人 Google 帳戶登入並授權。值得一提的是，這種方式提供了一個相當慷慨的免費額度，非常適合個人開發者和學習者使用。

2.  **Gemini API 金鑰**：如果我們是進階使用者，或者希望在自動化腳本中使用 Gemini CLI，可以選擇使用 API 金鑰。
    *   首先，前往 [Google AI Studio](https://aistudio.google.com/app/apikey) 產生一組 API 金鑰
    *   接著，將金鑰設定為環境變數
        ```bash
        # 在 macOS / Linux 的 .zshrc 或 .bashrc 中加入
        export GEMINI_API_KEY="YOUR_API_KEY"

        # 在 Windows 中設定環境變數
        setx GEMINI_API_KEY "YOUR_API_KEY"
        ```
    需要注意的是，使用 API 金鑰可以讓我們更精確地控制所使用的模型，並可能獲得更高的請求頻率限制。

### 2.3 你的第一個指令：`gemini > "Hello, World!"`

安裝並驗證完成後，讓我們來進行第一次互動吧！打開終端機，輸入 `gemini` 並按下 Enter，我們會看到一個 `>` 提示符，表示 Gemini 正在等待我們的指令。

```bash
$ gemini
> 
```

現在，試著輸入我們的第一個問題：

```bash
> "Hello, World! 請用繁體中文介紹你自己。"
```

Gemini 會回覆一段自我介紹，這表示我們已經成功地與 AI 代理建立了連線！這是不是很簡單呢？

> **⚠️ 注意**：建議先用 `cd` 指令切換到你的專案目錄底下，再執行 `gemini`，這樣 Gemini CLI 會以當前目錄為基底，讓你能直接使用 `@檔案`、`@目錄` 等功能，方便 AI 讀取與操作專案內的檔案與結構。
>
> 例如：
> cd my-project
> cd ~/Desktop/side-project

## 第三章：指令詳解 — 如何與 Gemini 有效對話

### 3.1 檔案系統互動：`@` 符號的強大功能

`@` 符號是 Gemini CLI 的一個強大功能，它能將檔案或目錄「附加」到我們的問題中，作為上下文。這樣 Gemini 就能理解我們專案的結構和內容。

*   **如何附加單一檔案？**
    ```bash
    > @package.json "這個專案有哪些依賴？"
    ```

*   **如何附加整個目錄？**
    ```bash
    > @src/ "請分析 src 目錄下的程式碼，並提供架構總結。"
    ```

*   **如何結合使用多個檔案或目錄？**
    ```bash
    > @src/api/ @src/db/ "重構資料庫連線邏輯，以符合新的 API 標準。"
    ```

### 3.2 常用內建工具一覽

Gemini CLI 內建了多種工具，讓它能直接與我們的檔案系統互動。我們可以用自然語言來呼叫這些工具，不需要記住複雜的語法。

| 工具                  | 它能做什麼？                       | 實際使用範例                                                |
| --------------------- | ---------------------------------- | ----------------------------------------------------------- |
| `read_file`           | 讀取指定檔案的內容                 | `> "請總結 'main.py' 的主要功能。"`                         |
| `write_file`          | 建立新檔案並寫入內容               | `> "幫我建立一個 'README.md'，標題是 '我的新專案'。"`       |
| `replace`             | 編輯現有檔案，儲存前顯示差異供確認 | `> "在 'config.json' 中，將 'port' 的值改為 8080。"`        |
| `list_directory`      | 列出目錄的內容                     | `> "scripts 目錄下有哪些檔案？"`                            |
| `glob`                | 使用模式匹配尋找檔案               | `> "找出 src 目錄下所有以 '.spec.ts' 結尾的測試檔案。"`     |
| `search_file_content` | 在檔案內容中搜尋特定文字           | `> "在所有 python 檔案中搜尋 'connectDatabase' 這個函式。"` |

### 3.3 Meta 指令 (Slash Commands)

除了透過自然語言與工具互動，Gemini CLI 還提供了一系列以斜線 (`/`) 開頭的「Meta 指令」，用於控制對話、設定和取得說明。這些指令非常實用，可以幫助我們更有效地使用 Gemini。

| 指令                 | 功能         | 範例                                     |
| -------------------- | ------------ | ---------------------------------------- |
| `/help`              | 顯示說明     | `/help`                                  |
| `/chat save <tag>`   | 儲存對話     | `/chat save project-setup`               |
| `/chat resume <tag>` | 恢復對話     | `/chat resume project-setup`             |
| `/memory add <text>` | 新增記憶     | `/memory add "使用 TypeScript 嚴格模式"` |
| `/tools`             | 列出可用工具 | `/tools`                                 |
| `/stats`             | 顯示使用統計 | `/stats`                                 |
| `/compress`          | 壓縮對話歷史 | `/compress`                              |
| `/restore [id]`      | 還原操作     | `/restore`                               |
| `/clear`             | 清除螢幕     | `/clear`                                 |

### 3.4 Shell 指令與檔案指令

**Shell 指令 (`!`)**：
```bash
# 執行單一指令
> !ls -la

# 進入 Shell 模式
> !
# 現在所有輸入都會被視為 shell 指令
```

**檔案指令 (`@`)**：
```bash
# 包含檔案內容
> @README.md "改善這個說明文件"

# 包含目錄結構
> @src/components/ "重構這些 React 元件"
```

---

## 第四章：進階技巧 — 釋放 Gemini 的全部潛力

### 4.1 提示工程（Prompt Engineering）基本概念

要讓 Gemini 發揮最大效用，關鍵在於我們如何提問。好的提問能得到更精準的回答和更有用的結果。

*   **明確角色**：在提問前，先賦予 Gemini 一個角色。
    > "你現在是一位資深的 DevOps 工程師。請幫我撰寫一個 Dockerfile..."

*   **提供背景**：給予足夠的背景資訊，讓 Gemini 理解我們的需求。
    > "我正在開發一個使用 React 和 Express 的 MERN 專案。請幫我..."

*   **步驟分解**：對於複雜任務，引導 Gemini 一步一步完成。
    > "首先，請幫我分析 `package.json`。接著，根據分析結果，告訴我如何優化..."

*   **要求格式**：明確要求我們想要的回應格式。
    > "請以 Markdown 表格的形式，列出所有 API 端點。"

### 4.2 使用 `GEMINI.md` 進行專案級別指導

在我們專案的根目錄下建立一個 `GEMINI.md` 檔案，可以為 Gemini 提供全域的指導方針。這就像是為我們的 AI 夥伴設定的「工作手冊」，讓它能更好地理解我們的專案規範和需求。

**`GEMINI.md` 範例內容：**
```markdown
# Gemini 工作指南

## 專案概觀
這是一個使用 Next.js 和 Tailwind CSS 的部落格專案。

## 編碼規範
- 所有新的 React 元件都必須是函式元件，並使用 TypeScript。
- 禁止使用 `any` 型別。
- API 請求必須使用 `axios` 函式庫。

## 禁止操作
- 絕對不要修改 `legacy/` 目錄下的任何檔案。
```

值得一提的是，有了這個檔案，每當我們在該專案中啟動 Gemini CLI，它都會先閱讀這份指南，確保其行為符合我們的專案規範。這對於團隊協作特別有用，可以確保所有成員使用 Gemini 時都遵循相同的準則。

## 第五章：實戰案例 — 真實世界中的應用

### 5.1 案例一：快速建立 Node.js Express API

假設我們需要快速建立一個 Express 應用程式，可以這樣操作：

1.  **首先，建立專案目錄**
    ```bash
    mkdir my-express-api && cd my-express-api
    ```

2.  **接著，向 Gemini 下達指令**
    ```bash
    gemini > "你是一位專業的後端工程師。請幫我建立一個 Node.js Express 應用程式。它應該包含以下功能：
    1. 使用 `npm init -y` 初始化專案。
    2. 安裝 `express` 和 `nodemon`。
    3. 建立一個 `index.js` 檔案。
    4. 在 `index.js` 中，建立一個 Express 伺服器，監聽 3000 埠號。
    5. 加入一個 GET `/` 的路由，回傳 'Hello, World!'。
    6. 在 `package.json` 中加入一個 `start` 指令來執行 `nodemon index.js`。"
    ```

Gemini 將會一步步執行這些指令，為我們建立好整個專案結構。這比我們手動輸入每個指令要快得多，而且不容易出錯。

### 5.2 案例二：程式碼重構與現代化

假設我們有一個舊的 JavaScript 專案，想將其重構為使用 async/await 的現代語法。

1.  **進入專案目錄**
    ```bash
    cd legacy-project
    ```

2.  **提供上下文並下達指令**
    ```bash
    gemini > @utils/api.js "你是一位 JavaScript 重構專家。請將這個檔案中的 Promise-based 的 .then() 語法，全部重構為使用 async/await。請直接修改這個檔案。"
    ```

Gemini 會分析 `api.js`，進行重構，並在確認後覆寫檔案。這種方式可以讓我們快速現代化舊程式碼，而不需要手動修改每一處 Promise 鏈。

### 5.3 案例三：自動化檔案管理與資料整理

假設我們的 <span class="blue">Downloads</span> 資料夾一團亂，想整理一下。

```bash
cd ~/Downloads
gemini > "請幫我整理這個目錄。
1. 建立 'Images', 'Documents', 'Archives' 三個資料夾。
2. 將所有的 .jpg, .png, .gif 檔案移動到 'Images'。
3. 將所有的 .pdf, .docx, .txt 檔案移動到 'Documents'。
4. 將所有的 .zip, .rar, .gz 檔案移動到 'Archives'。"
```

這個指令會讓 Gemini 自動執行檔案分類和移動，幫我們節省大量手動整理的時間。

## 第六章：常見問題與資源

### 6.1 常見問題解答

**問：Gemini CLI 執行時出現權限錯誤怎麼辦？**  
答：這種情況通常是因為我們當前的使用者對工作目錄沒有讀寫權限。我們可以檢查權限設定，或使用 `sudo` 來執行指令（不過要小心使用 `sudo`）。如果是執行 shell 指令出錯，則需要確保該指令在我們的環境中是可用的。

**問：我可以離線使用 Gemini CLI 嗎？**  
答：目前不行。Gemini CLI 需要網路連線才能與 Google 的 AI 模型進行通訊。這是因為 AI 模型運行在雲端伺服器上，而不是我們的本機。

**問：如何更新 Gemini CLI？**  
答：如果我們是使用 `npm` 安裝的，可以執行 `npm update -g @google/gemini-cli`。如果是使用 `npx`，則無需更新，因為每次執行的都是最新版本。

### 6.2 參考資源

想深入學習 Gemini CLI，以下資源非常有幫助：

*   [**Gemini CLI 官方文件**](https://developers.google.com/gemini/cli) - 最詳盡的官方指南
*   [**Gemini CLI GitHub 儲存庫**](https://github.com/google-gemini/gemini-cli) - 原始碼和問題追蹤
*   [**Google AI Studio (API 金鑰申請)**](https://aistudio.google.com/app/apikey) - 取得 API 金鑰的平台

> **備註：** Gemini CLI 仍在積極開發中，新功能和改進會不斷推出。建議定期查看官方文件和 GitHub 儲存庫，了解最新更新。

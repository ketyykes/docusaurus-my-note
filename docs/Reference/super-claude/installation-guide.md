---
sidebar_position: 5
title: SuperClaude 安裝指南
description: 一份完整的 SuperClaude 安裝指南，涵蓋從快速入門到進階設定的所有內容，幫助你快速開始使用。
tags:
  - SuperClaude
last_update:
  date: 2025-07-26
  author: Danny
---

# SuperClaude 安裝指南 📦

## 🎯 比看起來容易！

**老實說**：這份指南看起來很長，因為我們想涵蓋所有細節，但安裝其實非常簡單。大多數人只要一個指令，2 分鐘內就能完成！

### 步驟 1：安裝套件

**選項 A：從 PyPI (建議)**
```bash
uv add SuperClaude
```

**選項 B：從原始碼**
```bash
git clone https://github.com/NomenAK/SuperClaude.git
cd SuperClaude
uv sync
```
### 🔧 UV / UVX 設定指南

SuperClaude v3 也支援透過 [`uv`](https://github.com/astral-sh/uv) (一個更快、更現代的 Python 套件管理器) 或 `uvx` 進行跨平台安裝。

### 🌀 使用 `uv` 安裝

確保已安裝 `uv`：

```bash
curl -Ls https://astral.sh/uv/install.sh | sh
```

> 或遵循 [https://github.com/astral-sh/uv](https://github.com/astral-sh/uv) 的說明

一旦 `uv` 可用，你可以這樣安裝 SuperClaude：

```bash
uv venv
source .venv/bin/activate
uv pip install SuperClaude
```

### ⚡ 使用 `uvx` 安裝 (跨平台 CLI)

如果你正在使用 `uvx`，只需執行：

```bash
uvx pip install SuperClaude
```
## 🔧 UV / UVX 設定指南

SuperClaude v3 也支援透過 [`uv`](https://github.com/astral-sh/uv) (一個更快、更現代的 Python 套件管理器) 或 `uvx` 進行跨平台安裝。

### 🌀 使用 `uv` 安裝

確保已安裝 `uv`：

```bash
curl -Ls https://astral.sh/uv/install.sh | sh
```

> 或遵循 [https://github.com/astral-sh/uv](https://github.com/astral-sh/uv) 的說明

一旦 `uv` 可用，你可以這樣安裝 SuperClaude：

```bash
uv venv
source .venv/bin/activate
uv pip install SuperClaude
```

### ⚡ 使用 `uvx` 安裝 (跨平台 CLI)

如果你正在使用 `uvx`，只需執行：

```bash
uvx pip install SuperClaude
```

### ✅ 完成安裝

安裝後，繼續執行通常的安裝程式步驟：

```bash
python3 -m SuperClaude install
```

或使用 bash 風格的 CLI：

```bash
SuperClaude install
```

### 🧠 注意：

* `uv` 提供更好的快取和效能。
* 與 Python 3.8+ 相容，並能與 SuperClaude 順暢運作。

---

### ⚠️ 重要提示
**安裝 SuperClaude 後。**
**你可以使用 `SuperClaude commands`
, `python3 -m SuperClaude commands` 或 `python3 SuperClaude commands`**

**剛才發生了什麼？** SuperClaude 試圖設定你所需要的一切。通常沒有複雜的設定、尋找依賴項或設定的麻煩！🎉

---

一份全面的 SuperClaude v3 安裝指南。但請記住 - 大多數人永遠不需要閱讀超過上面的快速入門！😊

## 開始之前 🔍

### 你需要什麼 💻

SuperClaude 可在 **Windows**、**macOS** 和 **Linux** 上運作。以下是你需要的：

**必要：**
- **Python 3.8 或更新版本** - 該框架是用 Python 編寫的
- **Claude CLI** - SuperClaude 增強了 Claude Code，所以你需要先安裝它

**可選 (但建議)：**
- **Node.js 16+** - 僅在需要 MCP 伺服器整合時才需要
- **Git** - 有助於開發工作流程

### 快速檢查 🔍

安裝前，讓我們確保你具備基本條件：

```bash
# 檢查 Python 版本 (應為 3.8+)
python3 --version

# 檢查是否已安裝 Claude CLI
claude --version

# 檢查 Node.js (可選，用於 MCP 伺服器)
node --version
```

如果其中任何一項失敗，請參閱下面的[前置準備設定](#前置準備設定-️)部分。

## 快速入門 🚀

**🏆 「直接讓它運作」的方法 (推薦給 90% 的使用者)**
**選項 A：從 PyPI (建議)**
```bash
pip install SuperClaude

# 使用建議設定進行安裝
SuperClaude install --quick

# 就是這樣！🎉
```
**選項 B：從原始碼**
```bash
# 複製儲存庫
git clone <repository-url>
cd SuperClaude
pip install .

# 使用建議設定進行安裝
SuperClaude install --quick

# 就是這樣！🎉
```
**⚠️ 重要提示**
**安裝 SuperClaude 後。**
**你可以使用 `SuperClaude commands`
, `python3 -m SuperClaude commands` 或 `python3 SuperClaude commands`**

**你剛才得到了什麼：**
- ✅ 所有 16 個會自動啟用專家的智慧指令
- ✅ 11 個知道何時該幫忙的專家 Persona
- ✅ 為你解決複雜性的智慧路由
- ✅ 大約 2 分鐘的時間和約 50MB 的磁碟空間

**真的，你完成了。** 打開 Claude Code，輸入 `/help`，然後看著 SuperClaude 施展魔法。

**擔心它會做什麼嗎？** 先用這個看看：
```bash
SuperClaude install --quick --dry-run
```

## 安裝選項 🎯

我們有三種安裝設定檔可供選擇：

### 🎯 最小安裝
```bash
SuperClaude install --minimal
```
- **內容**：僅核心框架檔案
- **時間**：約 1 分鐘
- **空間**：約 20MB
- **適用於**：測試、基本增強、最小化設定
- **包含**：指導 Claude 的核心行為文件

### 🚀 快速安裝 (建議)
```bash
SuperClaude install --quick
```
- **內容**：核心框架 + 16 個斜線指令
- **時間**：約 2 分鐘
- **空間**：約 50MB
- **適用於**：大多數使用者、一般開發
- **包含**：最小安裝的所有內容 + 像 `/analyze`、`/build`、`/improve` 這樣的專業指令

### 🔧 開發者安裝
```bash
SuperClaude install --profile developer
```
- **內容**：所有內容，包括 MCP 伺服器整合
- **時間**：約 5 分鐘
- **空間**：約 100MB
- **適用於**：進階使用者、貢獻者、進階工作流程
- **包含**：所有內容 + Context7、Sequential、Magic、Playwright 伺服器

### 🎛️ 互動式安裝
```bash
SuperClaude install
```
- 讓你挑選和選擇元件
- 顯示每個元件功能的詳細描述
- 如果你想控制安裝內容，這是不錯的選擇

## 逐步安裝 📋

### 前置準備設定 🛠️

**缺少 Python？**
```bash
# Linux (Ubuntu/Debian)
sudo apt update && sudo apt install python3 python3-pip

# macOS
brew install python3

# Windows
# 從 https://python.org/downloads/ 下載
# 或開啟命令提示字元或 powershell
winget install python
```

**缺少 Claude CLI？**
- 請訪問 https://claude.ai/code 獲取安裝說明
- SuperClaude 增強了 Claude Code，所以你需要先安裝它

**缺少 Node.js？(可選)**
```bash
# Linux (Ubuntu/Debian)
sudo apt update && sudo apt install nodejs npm

# macOS
brew install node

# Windows
# 從 https://nodejs.org/ 下載
# 或開啟命令提示字元或 powershell
winget install nodejs
```

### 獲取 SuperClaude 📥

**選項 1：從 PyPI (建議)**
```bash
pip install SuperClaude
```

**選項 2：下載最新版本**
```bash
# 下載並解壓縮最新版本
# (將 URL 替換為實際的發行版 URL)
curl -L <release-url> -o superclaude-v3.zip
unzip superclaude-v3.zip
cd superclaude-v3
pip install .
```

**選項 3：從 Git 複製**
```bash
git clone <repository-url>
cd SuperClaude
pip install .
```

### 執行安裝程式 🎬

安裝程式非常聰明，會引導你完成整個過程：

```bash
# 查看所有可用選項
SuperClaude install --help

# 快速安裝 (建議)
SuperClaude install --quick

# 想先看看會發生什麼嗎？
SuperClaude install --quick --dry-run

# 安裝所有內容
SuperClaude install --profile developer

# 安靜安裝 (最少輸出)
SuperClaude install --quick --quiet

# 強制安裝 (跳過確認)
python3 SuperClaude.py install --quick --force
```

### 安裝期間 📱

以下是安裝時會發生的事情：

1. **系統檢查** - 驗證你是否擁有必要的依賴項
2. **目錄設定** - 建立 `~/.claude/` 目錄結構
3. **核心檔案** - 複製框架文件
4. **指令** - 安裝斜線指令定義 (如果已選擇)
5. **MCP 伺服器** - 下載並設定 MCP 伺服器 (如果已選擇)
6. **設定** - 使用你的偏好設定 `settings.json`
7. **驗證** - 測試一切是否正常運作

安裝程式會顯示進度，並在出現任何問題時通知你。

## 安裝後 ✅

### 快速測試 🧪

讓我們確保一切都正常運作：

```bash
# 檢查檔案是否已安裝
ls ~/.claude/

# 應該會顯示：CLAUDE.md, COMMANDS.md, settings.json 等
```

**使用 Claude Code 進行測試：**
1. 開啟 Claude Code
2. 嘗試輸入 `/help` - 你應該會看到 SuperClaude 指令
3. 嘗試 `/analyze --help` - 應該會顯示指令選項

### 安裝了什麼 📂

SuperClaude 預設安裝到 `~/.claude/`。你會在這裡找到：

```
~/.claude/
├── CLAUDE.md              # 主要框架進入點
├── COMMANDS.md             # 可用的斜線指令
├── FLAGS.md                # 指令旗標和選項
├── PERSONAS.md             # 智慧 Persona 系統
├── PRINCIPLES.md           # 開發原則
├── RULES.md                # 操作規則
├── MCP.md                  # MCP 伺服器整合
├── MODES.md                # 操作模式
├── ORCHESTRATOR.md         # 智慧路由
├── settings.json           # 設定檔
└── commands/               # 各個指令的定義
    ├── analyze.md
    ├── build.md
    ├── improve.md
    └── ... (還有 13 個)
```

**每個檔案的作用：**
- **CLAUDE.md** - 告知 Claude Code 關於 SuperClaude 的資訊並載入其他檔案
- **settings.json** - 設定 (MCP 伺服器、hooks 等)
- **commands/** - 每個斜線指令的詳細定義

### 第一步 🎯

試試這些指令來開始：

```bash
# 在 Claude Code 中，試試這些：
/sc:help                    # 查看可用指令
/sc:analyze README.md       # 分析一個檔案
/sc:build --help           # 查看建置選項
/sc:improve --help         # 查看改進選項
```

**別擔心看起來很複雜** - SuperClaude 會逐步增強 Claude Code。你可以隨心所欲地使用它的功能。

## 管理你的安裝 🛠️

### 更新 📅

保持 SuperClaude 為最新版本：

```bash
# 檢查更新
SuperClaude update

# 強制更新 (覆蓋本地變更)
SuperClaude update --force

# 僅更新特定元件
SuperClaude update --components core,commands

# 查看將會更新的內容
SuperClaude update --dry-run
```

**何時更新：**
- 當新的 SuperClaude 版本發布時
- 如果你遇到問題 (更新通常包含修復)
- 當新的 MCP 伺服器可用時

### 備份 💾

在進行重大變更前建立備份：

```bash
# 建立備份
SuperClaude backup --create

# 列出現有備份
SuperClaude backup --list

# 從備份還原
SuperClaude backup --restore

# 使用自訂名稱建立備份
SuperClaude backup --create --name "before-update"
```

**何時備份：**
- 更新 SuperClaude 之前
- 實驗設定之前
- 解除安裝之前
- 如果你進行了大量自訂，請定期備份

### 解除安裝 🗑️

如果你需要移除 SuperClaude：

```bash
# 移除 SuperClaude (保留備份)
SuperClaude uninstall

# 完全移除 (移除所有內容)
SuperClaude uninstall --complete

# 查看將會被移除的內容
SuperClaude uninstall --dry-run
```

**會被移除的內容：**
- `~/.claude/` 中的所有檔案
- MCP 伺服器設定
- Claude Code 中的 SuperClaude 設定

**會保留的內容：**
- 你的備份 (除非你使用 `--complete`)
- Claude Code 本身 (SuperClaude 不會動它)
- 你的專案和其他檔案

## 疑難排解 🔧

### 常見問題 🚨

**「找不到 Python」**
```bash
# 試試 python 而不是 python3
python --version

# 或檢查它是否已安裝但不在 PATH 中
which python3
```

**「找不到 Claude CLI」**
- 確保先安裝了 Claude Code
- 嘗試 `claude --version` 進行驗證
- 訪問 https://claude.ai/code 獲取安裝幫助

**「權限被拒絕」**
```bash
# 嘗試使用明確的 Python 路徑
/usr/bin/python3 SuperClaude.py install --quick

# 或檢查你是否需要不同的權限
ls -la ~/.claude/
```

**「MCP 伺服器無法安裝」**
- 檢查是否已安裝 Node.js：`node --version`
- 檢查 npm 是否可用：`npm --version`
- 先嘗試不安裝 MCP：`--minimal` 或 `--quick`

**「安裝中途失敗」**
```bash
# 嘗試使用詳細輸出查看發生了什麼
SuperClaude install --quick --verbose

# 或先嘗試空跑
SuperClaude install --quick --dry-run
```

### 特定平台問題 🖥️

**Windows：**
- 如果出現「找不到指令」，請使用 `python` 而不是 `python3`
- 如果出現權限錯誤，請以管理員身份運行命令提示字元
- 確保 Python 在你的 PATH 中

**macOS：**
- 你可能需要在「安全性與隱私權」設定中批准 SuperClaude
- 如果你沒有 Python 3.8+，請使用 `brew install python3`
- 嘗試明確使用 `python3` 而不是 `python`

**Linux：**
- 確保你已安裝 `python3-pip`
- 對於某些套件安裝，你可能需要 `sudo`
- 檢查 `~/.local/bin` 是否在你的 PATH 中

### 還有問題嗎？ 🤔

**查看我們的疑難排解資源：**
- GitHub Issues：https://github.com/NomenAK/SuperClaude/issues
- 尋找與你類似的現有問題
- 如果找不到解決方案，請建立一個新問題

**回報錯誤時，請包含：**
- 你的作業系統和版本
- Python 版本 (`python3 --version`)
- Claude CLI 版本 (`claude --version`)
- 你運行的確切指令
- 完整的錯誤訊息
- 你預期會發生的情況

**尋求幫助：**
- GitHub Discussions 用於一般問題
- 查看 README.md 以獲取最新更新
- 查看 ROADMAP.md 看看你的問題是否已知

## 進階選項 ⚙️

### 自訂安裝目錄

```bash
# 安裝到自訂位置
SuperClaude install --quick --install-dir /custom/path

# 使用環境變數
export SUPERCLAUDE_DIR=/custom/path
SuperClaude install --quick
```

### 元件選擇

```bash
# 查看可用元件
SuperClaude install --list-components

# 僅安裝特定元件
SuperClaude install --components core,commands

# 跳過某些元件
SuperClaude install --quick --skip mcp
```

### 開發設定

如果你打算貢獻或修改 SuperClaude：

```bash
# 包含所有元件的開發者安裝
SuperClaude install --profile developer

# 在開發模式下安裝 (使用符號連結而非複製)
SuperClaude install --profile developer --dev-mode

# 安裝帶有 git hooks 的開發版本
SuperClaude install --profile developer --dev-hooks
```

## 下一步是什麼？ 🚀

**現在 SuperClaude 已經安裝好了 (很簡單，對吧？)：**

1. **直接開始使用** - 試試 `/analyze some-file.js` 或 `/build`，看看會發生什麼 ✨
2. **別為學習而煩惱** - SuperClaude 通常會弄清楚你的需求
3. **自由實驗** - 像 `/improve` 和 `/troubleshoot` 這樣的指令相當寬容
4. **如果好奇就閱讀指南** - 當你想了解剛才發生了什麼時，請查看 `Docs/`
5. **提供回饋** - 讓我們知道哪些有效，哪些無效

**真正的秘訣**：SuperClaude 的設計旨在增強你現有的工作流程，而無需你學習一堆新東西。就像使用普通的 Claude Code 一樣使用它，但注意它變得多麼聰明！🎯

**還是覺得不確定？** 從 `/help` 和 `/analyze README.md` 開始 - 你會發現它其實一點也不嚇人。

---

## 最後的提醒 📝

- **安裝需要 1-5 分鐘**，取決於你的選擇
- **需要 20-100MB 的磁碟空間** (不多！)
- **與現有工具並行運作** - 不會干擾你的設定
- **如果你改變主意，很容易解除安裝**
- **由社群支援** - 我們真的會閱讀並回應問題
- ### ⚠️ 重要提示
**安裝 SuperClaude 後。**
**你可以使用 `SuperClaude commands`
, `python3 -m SuperClaude commands` 或 `python3 SuperClaude commands`**

感謝你試用 SuperClaude！我們希望它能讓你的開發工作流程更順暢一些。🙂

---

*最後更新：2024 年 7 月 - 如果本指南中有任何錯誤或令人困惑之處，請告訴我們！*
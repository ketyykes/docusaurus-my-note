# 水土曜來了筆記站

這是一個使用 [Docusaurus](https://docusaurus.io/) 建立的現代化靜態網站，主要用於分享筆記和。

## 環境需求

- Node.js v20.17.0 
- pnpm v8.15.1

## 功能特點

- 📝 技術文件撰寫與管理
- 📱 響應式設計
- 🔍 全文搜尋功能
- 🌙 深色模式支援
- ⚡️ 快速的靜態網站生成

## 快速開始

### 前置作業

如果您尚未安裝 pnpm 套件管理器，請先執行以下指令進行安裝：

```bash
npm install -g pnpm
```

### 安裝相關依賴

```bash
pnpm install
```

### 開發指令

```bash
# 啟動開發伺服器（預設埠號：4500）
pnpm run dev

# 建置網站
pnpm run build

# 啟動本地預覽伺服器
pnpm run serve

# 清除快取
pnpm run clear

# 檢查 TypeScript 型別
pnpm run typecheck
```

## 專案結構

```
├── README.md                 # 專案說明文件
├── babel.config.js           # Babel 設定檔
├── blog/                     # 部落格文章目錄
│   ├── [部落格文章檔案]      # 各種 .md 和 .mdx 格式的部落格文章
│   ├── authors.yml          # 作者資訊設定
│   └── tags.yml             # 標籤設定
├── docs/                     # 文件目錄
│   ├── Reference/           # 參考文件
│   ├── learn-note/          # 學習筆記
│   └── my-tools/            # 工具使用教學
├── docusaurus.config.ts      # Docusaurus 主要設定檔
├── sidebars.ts              # 側邊欄設定
├── src/                     # 原始碼目錄
│   ├── components/          # React 元件
│   ├── css/                # 樣式檔案
│   └── pages/              # 靜態頁面
└── static/                  # 靜態資源目錄
    └── img/                # 圖片資源
```

## Technology Stack

- React 18
- TypeScript
- Docusaurus 3.5.2
- MDX


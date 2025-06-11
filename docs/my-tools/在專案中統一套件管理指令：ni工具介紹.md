---
title: 在專案中統一套件管理指令：ni 工具介紹
sidebar_position: 2
description: 介紹 @antfu/ni 工具，如何在各種 Node.js 專案中自動偵測並統一使用套件管理指令。
tags:
  - tool
last_update:
  date: 2025-06-11
  author: Danny
---

## 目錄
- [目錄](#目錄)
- [前言](#前言)
- [安裝](#安裝)
- [主要指令](#主要指令)
  - [全域參數（Global Flags）](#全域參數global-flags)
  - [設定方式](#設定方式)
    - [設定檔 (`~/.nirc`)](#設定檔-nirc)
    - [環境變數](#環境變數)
- [運作原理](#運作原理)

## 前言

您是否曾經在 Yarn 專案中誤用 `npm i`，或者在不同專案間切換時，總是要回想該用哪個套件管理器的指令？`@antfu/ni`（以下簡稱 `ni`）正是為了解決這些困擾而生的工具。它能自動偵測您專案當前使用的套件管理器，讓您可以用一套統一的指令（如 `ni`, `nr`, `nun` 等）完成安裝、執行、移除等操作，大幅提升開發效率與體驗。

## 安裝

要開始使用 `ni` 系列工具，您可以透過 npm 進行全域安裝：

```bash
npm i -g @antfu/ni
```

安裝完成後，您就可以在任何專案中使用 `ni` 相關指令。

## 主要指令

`@antfu/ni` 套件提供了一系列簡潔易用的指令，對應不同套件管理器的常用操作。

表格如下
| 指令              | 功能           | 範例                           | npm 指令                     | yarn 指令                                                                            | pnpm 指令                        | bun 指令                        | 備註                   |
| ----------------- | -------------- | ------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------ | -------------------------------- | ------------------------------- | ---------------------- |
| `ni`              | 安裝依賴套件   | `ni vite`                      | `npm i vite`                 | `yarn add vite`                                                                      | `pnpm add vite`                  | `bun add vite`                  | 自動偵測套件管理器     |
| `ni`              | 安裝開發依賴   | `ni @types/node -D`            | `npm i @types/node -D`       | `yarn add @types/node -D`                                                            | `pnpm add -D @types/node`        | `bun add -d @types/node`        |                        |
| `ni -P`           | 正式環境依賴   | `ni -P`                        | `npm i --omit=dev`           | `yarn install --production`                                                          | `pnpm i --production`            | `bun install --production`      |                        |
| `ni --frozen`     | 鎖定檔安裝     | `ni --frozen`                  | `npm ci`                     | `yarn install --frozen-lockfile` (Yarn 1)<br>`yarn install --immutable` (Yarn Berry) | `pnpm install --frozen-lockfile` | `bun install --frozen-lockfile` |                        |
| `ni -g`           | 全域安裝套件   | `ni -g eslint`                 | `npm i -g eslint`            | `yarn global add eslint` (Yarn 1)                                                    | `pnpm add -g eslint`             | `bun add -g eslint`             | 使用預設套件管理器     |
| `ni -i`           | 互動式安裝套件 | `ni -i`                        | -                            | -                                                                                    | -                                | -                               | 互動式選擇要安裝的套件 |
| `nr`              | 執行腳本       | `nr dev --port=3000`           | `npm run dev -- --port=3000` | `yarn run dev --port=3000`                                                           | `pnpm run dev --port=3000`       | `bun run dev --port=3000`       |                        |
| `nr`              | 互動式執行腳本 | `nr`                           | -                            | 支援 [npm-scripts-info](https://www.npmjs.com/package/npm-scripts-info) 規範         | -                                | -                               | 互動式選擇腳本         |
| `nr -`            | 重跑上一個腳本 | `nr -`                         | -                            | -                                                                                    | -                                | -                               |                        |
| `nr --completion` | 啟用腳本補全   | `nr --completion >> ~/.bashrc` | -                            | 僅支援 bash                                                                          | -                                | -                               |                        |
| `nlx`             | 臨時下載並執行 | `nlx vitest`                   | `npx vitest`                 | `yarn dlx vitest`                                                                    | `pnpm dlx vitest`                | `bunx vitest`                   |                        |
| `nup`             | 升級所有套件   | `nup`                          | `npm upgrade`                | `yarn upgrade` (Yarn 1)<br>`yarn up` (Yarn Berry)                                    | `pnpm update`                    | `bun update`                    |                        |
| `nup -i`          | 互動式升級套件 | `nup -i`                       | -                            | `yarn upgrade-interactive` (Yarn 1)<br>`yarn up -i` (Yarn Berry)                     | `pnpm update -i`                 | -                               | npm、bun 不支援        |
| `nun`             | 解除安裝套件   | `nun webpack`                  | `npm uninstall webpack`      | `yarn remove webpack`                                                                | `pnpm remove webpack`            | `bun remove webpack`            |                        |
| `nun`             | 互動式移除套件 | `nun`                          | -                            | -                                                                                    | -                                | -                               | 單個互動式選擇         |
| `nun -m`          | 互動式多個移除 | `nun -m`                       | -                            | -                                                                                    | -                                | -                               | 多個互動式選擇         |
| `nun -g`          | 全域移除套件   | `nun -g silent`                | `npm uninstall -g silent`    | `yarn global remove silent`                                                          | `pnpm remove -g silent`          | `bun remove -g silent`          |                        |
| `nci`             | 清理並安裝     | `nci`                          | `npm ci`                     | `yarn install --frozen-lockfile`                                                     | `pnpm install --frozen-lockfile` | `bun install --frozen-lockfile` | CI/CD適用              |
| `na`              | 套件管理器別名 | `na run foo`                   | `npm run foo`                | `yarn run foo`                                                                       | `pnpm run foo`                   | `bun run foo`                   |                        |
| `na`              | 顯示套件管理器 | `na`                           | 顯示 `npm`                   | 顯示 `yarn`                                                                          | 顯示 `pnpm`                      | 顯示 `bun`                      |                        |

### 全域參數（Global Flags）

| 參數 | 說明                   | 範例                      |
| ---- | ---------------------- | ------------------------- |
| `?`  | 顯示將要執行的真實指令 | `ni vite ?`               |
| `-C` | 指定目錄後執行指令     | `ni -C packages/foo vite` |
| `-v` | 顯示版本號             | `ni -v`                   |
| `-h` | 顯示說明文件           | `ni -h`                   |

### 設定方式

#### 設定檔 (`~/.nirc`)

```ini
; ~/.nirc
defaultAgent=npm      # 沒有鎖定檔案時預設使用套件管理器
globalAgent=npm       # 全域安裝時使用的套件管理器
```

#### 環境變數

```bash
# ~/.bashrc
export NI_CONFIG_FILE="$HOME/.config/ni/nirc"
export NI_DEFAULT_AGENT="npm"
export NI_GLOBAL_AGENT="npm"
```

## 運作原理

`ni` 的核心機制是偵測專案中的鎖定檔案（`yarn.lock`, `pnpm-lock.yaml`, `package-lock.json`, `bun.lockb`）或 `package.json` 中的 `packageManager` 欄位。它利用 [`package-manager-detector`](https://www.npmjs.com/package/package-manager-detector) 套件來判斷當前專案所使用的套件管理器，然後將您的 `ni` 系列指令轉換為該管理器對應的原生指令來執行。




---
sidebar_position: 2
title: 入門指南
description: 從零開始學習 Vitest 測試框架，包含安裝設定、基本語法、測試案例撰寫等實用教學，幫助你快速上手並掌握測試開發技巧
tags:
  - test
last_update:
  date: 2025-05-28
  author: Danny
---

# 入門指南

## 概述
Vitest（發音為「veetest」）是一個由 Vite 驅動的新世代測試框架。

你可以在「為什麼選擇 Vitest」這一節了解這個專案的設計理念。

## 線上試用 Vitest
你可以在 StackBlitz 上線上試用 Vitest。它可以直接在瀏覽器中執行 Vitest，幾乎和本地端安裝一樣，但不需要在你的電腦上安裝任何東西。

## 將 Vitest 加入你的專案
觀看安裝教學影片

npm

yarn

pnpm

bun

```bash
npm install -D vitest
```

**提示**  
Vitest 需要 Vite 版本 >=v5.0.0 以及 Node 版本 >=v18.0.0

建議你在 `package.json` 中安裝一份 vitest，使用上面列出的其中一種方法。不過，如果你想直接執行 vitest，也可以用 `npx vitest`（npx 工具隨 npm 和 Node.js 一起安裝）。

npx 工具會執行指定的指令。預設情況下，npx 會先檢查本地專案的 binaries 是否有該指令，如果沒有，會再查詢系統的 $PATH。如果兩者都找不到，npx 會在執行前臨時安裝。

## 撰寫測試
舉個例子，我們來寫一個簡單的測試，驗證一個加總兩個數字的函式。

sum.js

```js
export function sum(a, b) {
  return a + b
}
```

sum.test.js

```js
import { expect, test } from 'vitest'
import { sum } from './sum.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

**提示**  
預設情況下，測試檔案名稱必須包含 `.test.` 或 `.spec.`

接下來，為了執行測試，請在 `package.json` 加入以下內容：

package.json

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

最後，根據你使用的套件管理工具，執行 `npm run test`、`yarn test` 或 `pnpm test`，Vitest 會顯示如下訊息：

```
✓ sum.test.js (1)
  ✓ adds 1 + 2 to equal 3

Test Files  1 passed (1)
     Tests  1 passed (1)
  Start at  02:15:44
  Duration  311ms
```

**警告**  
如果你使用 Bun 作為套件管理工具，請務必使用 `bun run test`，不要用 `bun test`，否則 Bun 會執行它自己的測試工具。

想了解更多 Vitest 的用法，請參考 API 章節。

## 設定 Vitest
Vitest 其中一個主要優勢是可以和 Vite 共用設定。如果有的話，Vitest 會讀取你專案根目錄下的 `vite.config.ts`，自動套用 plugins 和其他設定。例如，你在 Vite 設定的 resolve.alias 和 plugins 都能直接在 Vitest 使用。如果你想在測試時用不同的設定，可以：

- 建立 `vitest.config.ts`，此檔案優先權較高
- 在 CLI 傳入 `--config` 參數，例如 `vitest --config ./path/to/vitest.config.ts`
- 在 `vite.config.ts` 裡用 `process.env.VITEST` 或 `defineConfig` 的 `mode` 屬性（預設會設為 test，除非你有覆蓋）來條件式套用不同設定

Vitest 支援和 Vite 一樣的設定檔副檔名：`.js`、`.mjs`、`.cjs`、`.ts`、`.cts`、`.mts`。Vitest 不支援 `.json` 副檔名。

如果你不是用 Vite 當建置工具，也可以在設定檔裡用 `test` 屬性來設定 Vitest：

vitest.config.ts

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ...
  },
})
```

**提示**  
即使你沒用 Vite，Vitest 仍然大量依賴 Vite 的轉譯流程。因此你也可以設定 Vite 文件中描述的任何屬性。

如果你已經在用 Vite，只要在 Vite 設定檔加上 `test` 屬性即可。你還需要在設定檔最上方加上 Vitest 的型別參考：

vite.config.ts

```js
/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // ...
  },
})
```

`<reference types="vitest" />` 在下個大版本會失效，你可以從 Vitest 2.1 開始改用 `vitest/config`：

vite.config.ts

```js
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // ... 在這裡指定選項
  },
})
```

更多設定選項請參考設定檔說明。

**警告**  
如果你決定分開寫 Vite 和 Vitest 的設定檔，請務必在 Vitest 設定檔裡定義一樣的 Vite 選項，因為 Vitest 設定會覆蓋 Vite 設定，不是延伸。你也可以用 vite 或 vitest/config 的 `mergeConfig` 方法來合併設定：

vitest.config.mjs

vite.config.mjs

```js
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // ...
  },
}))
```

不過我們建議你用同一份設定檔，不要分開寫。

## Workspaces 支援
Vitest Workspaces 讓你可以在同一個專案裡執行不同的專案設定。你可以在 `vitest.config` 檔案裡定義 workspace 的檔案或資料夾清單。

vitest.config.ts

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    workspace: [
      // 你可以用 glob pattern 列出 workspace
      // Vitest 會找出設定檔清單
      // 或是有設定檔的資料夾
      'packages/*',
      'tests/*/vitest.config.{e2e,unit}.ts',
      // 你甚至可以在同一個 "vitest" 行程裡
      // 用不同設定執行同一組測試
      {
        test: {
          name: 'happy-dom',
          root: './shared_tests',
          environment: 'happy-dom',
          setupFiles: ['./setup.happy-dom.ts'],
        },
      },
      {
        test: {
          name: 'node',
          root: './shared_tests',
          environment: 'node',
          setupFiles: ['./setup.node.ts'],
        },
      },
    ],
  },
})
```

## 指令列介面
在已安裝 Vitest 的專案裡，你可以在 npm scripts 裡用 vitest 指令，或直接用 `npx vitest` 執行。以下是 Vitest 專案預設的 npm scripts：

package.json

```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

如果你只想執行一次測試、不監聽檔案變動，可以用 `vitest run`。你也可以加上像 `--port` 或 `--https` 這類 CLI 參數。完整參數請在專案裡執行 `npx vitest --help` 查詢。

想了解更多指令列用法，請參考 CLI 章節。

## 自動安裝相依套件
如果有些相依套件還沒安裝，Vitest 會提示你安裝。如果你想關閉這個功能，可以設定環境變數 `VITEST_SKIP_INSTALL_CHECKS=1`。

## IDE 整合
我們也有提供 Visual Studio Code 的官方擴充套件，讓你在 VS Code 裡有更好的 Vitest 測試體驗。

從 VS Code Marketplace 安裝

想了解更多 IDE 整合資訊，請參考相關章節。

## 範例
| 範例名稱       | 原始碼 | 線上試玩      |
| -------------- | ------ | ------------- |
| basic          | GitHub | Play Online   |
| fastify        | GitHub | Play Online   |
| in-source-test | GitHub | Play Online   |
| lit            | GitHub | Play Online   |
| vue            | GitHub | Play Online   |
| marko          | GitHub | Play Online   |
| preact         | GitHub | Play Online   |
| react          | GitHub | Play Online   |
| solid          | GitHub | Play Online   |
| svelte         | GitHub | Play Online   |
| sveltekit      | GitHub | Play Online   |
| profiling      | GitHub | Not Available |
| typecheck      | GitHub | Play Online   |
| workspace      | GitHub | Play Online   |

## 使用 Vitest 的專案
unocss、unplugin-auto-import、unplugin-vue-components、vue、vite、vitesse、vitesse-lite、fluent-vue、vueuse、milkdown、gridjs-svelte、spring-easing、bytemd、faker、million、Vitamin、neodrag、svelte-multiselect、iconify、tdesign-vue-next、cz-git

## 使用未發佈的 Commit
main 分支上的每個 commit 和帶有 cr-tracked 標籤的 PR 都會發佈到 pkg.pr.new。你可以用 `npm i https://pkg.pr.new/vitest@{commit}` 安裝。

如果你想在本地測試自己修改的版本，可以自己 build 並 link（需要 pnpm）：

```bash
git clone https://github.com/vitest-dev/vitest.git
cd vitest
pnpm install
cd packages/vitest
pnpm run build
pnpm link --global # 這步驟你可以用自己習慣的套件管理工具
```

然後到你要用 Vitest 的專案執行 `pnpm link --global vitest`（或你用來 link 的套件管理工具）。

## 社群
如果你有問題或需要協助，歡迎到 Discord 或 GitHub Discussions 社群發問。

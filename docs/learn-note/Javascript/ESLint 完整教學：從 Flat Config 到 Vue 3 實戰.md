---
sidebar_position: 5
title: ESLint 完整教學：從 Flat Config 到 Vue 3 實戰
description: 以三個對照資料夾（無設定 / 最小設定 / Vue 3 設定）實作並說明 ESLint Flat Config、recommended 規則集、eslint-plugin-vue 與 VSCode 存檔自動修復
tags:
  - javascript
  - eslint
  - vue
last_update:
  date: 2025-07-11
  author: Danny
---

本文以我整理的 `eslint-demo` 範例倉庫為基底，搭配 `unuse-eslint/`、`use-eslint/`、`vue-eslint/` 三個資料夾，從「為什麼需要 Lint」一路講到「Vue 專案自訂規則」。讀完並手動跑過一次 `npx eslint .`，就能建立完整的 ESLint 心智模型。

:::info 本文範例倉庫
完整範例程式碼（`unuse-eslint/`、`use-eslint/`、`vue-eslint/` 三個資料夾）請見：[github.com/ketyykes/eslint-demo](https://github.com/ketyykes/eslint-demo)
:::

## 1. 為什麼需要 ESLint

ESLint 是 JavaScript／TypeScript 的**靜態分析工具**，在程式碼尚未執行前就找出：

- 明顯錯誤：`const` 變數被重新賦值、變數未定義、重複宣告
- 潛在風險：`==` 帶來的型別轉換陷阱、`map` 忘了 return
- 風格不一致：縮排、引號、分號（可搭配 Prettier）

核心價值：**把「執行期才會爆」的錯誤，往前推到「撰寫時期」就被擋下**。

> 打開 `unuse-eslint/index.js`。沒有 ESLint 時，`const a = 1; a = 2;` 只會在 Node 實際執行時 TypeError；加上 ESLint 後，編輯器當下就會畫紅線。

## 2. Lint 與 Format 的差異

|      | ESLint（Lint）                       | Prettier（Format）                                      |
| ---- | ------------------------------------ | ------------------------------------------------------- |
| 關心 | 正確性、可維護性、潛在 bug           | 純粹排版（換行、引號、縮排）                            |
| 例子 | `no-unused-vars`、`eqeqeq`           | 每行最長 100 字元                                       |
| 衝突 | 兩者可能對同一件事意見不同（如引號） | 透過 `eslint-config-prettier` 讓 ESLint 讓步給 Prettier |

**本文聚焦在 Lint。** Prettier 整合屬於進階主題，見第 12 節。

## 3. Flat Config 基礎

ESLint 9 起預設採 **Flat Config**（扁平設定檔），以 `eslint.config.js` / `.mjs` 取代舊有 `.eslintrc.*`。

### 核心概念

- 設定檔 `export default` 一個**陣列**
- 陣列中每一個物件就是一份「設定區塊」
- ESLint 會從上往下合併；**後面的設定會覆寫前面的**

### 常用欄位

| 欄位                            | 作用                                                       |
| ------------------------------- | ---------------------------------------------------------- |
| `files`                         | 該設定適用哪些檔案 glob（未列入者略過）                    |
| `ignores`                       | 該設定不作用在哪些路徑                                     |
| `languageOptions.globals`       | 宣告執行環境的全域變數（browser/node/es2021...）           |
| `languageOptions.parserOptions` | 解析器選項，例如 `ecmaVersion`、`sourceType`               |
| `plugins`                       | 載入第三方插件（eslint-plugin-vue、@typescript-eslint...） |
| `rules`                         | 規則開關與嚴重度                                           |

### 規則嚴重度

```js
"rule-name": "off"    // 或 0，關閉
"rule-name": "warn"   // 或 1，警告（不讓 CI 失敗）
"rule-name": "error"  // 或 2，錯誤（CI 會 fail）
```

### 與 Legacy `.eslintrc` 的主要差異

- 不再有 `extends: "eslint:recommended"` 字串魔法；改為直接 `import` 後放入陣列
- `env: { browser: true }` → 改為 `languageOptions.globals: globals.browser`
- `overrides` 不再需要；每個設定區塊本身就可以帶 `files`

## 4. 對照 `unuse-eslint`：沒有規範的世界

```js
// unuse-eslint/index.js
const a = 1;
a = 2;
```

這個檔案沒有任何 ESLint 設定，也沒裝依賴。你只能靠「執行看看」才會發現問題。對大型團隊來說，這代表：

- 錯誤在 PR review 才被發現，週期冗長
- 風格不一致，每個人寫法都不同
- 新人上手成本高

**結論：** 把 Lint 當成專案的安全帶，愈早繫愈好。

## 5. 對照 `use-eslint`：最小可運作設定

### 5.1 安裝

```bash
pnpm add -D eslint @eslint/js globals
```

### 5.2 設定檔（`use-eslint/eslint.config.mjs`）

```js
import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];
```

這兩個區塊做的事：

1. 告訴 ESLint 本專案程式跑在瀏覽器，`window`、`document` 是合法全域變數
2. 套用 `@eslint/js` 官方 recommended 規則集（以下第 6 節會展開）

### 5.3 執行

```bash
cd use-eslint
pnpm install
npx eslint .
```

預期輸出：`no-const-assign` 報錯指向 `index.js:3`。這就是 ESLint 最小配置的完整工作流。

## 6. 核心規則速查（recommended）

以下為 `@eslint/js` recommended 中最常被觸發的規則，依「發生頻率」排序：

| 規則              | 觸發情境                | 範例                           |
| ----------------- | ----------------------- | ------------------------------ |
| `no-unused-vars`  | 宣告變數／import 未使用 | `const x = 1;`（從未使用）     |
| `no-undef`        | 使用未宣告的變數        | `console.log(foo)`，foo 未定義 |
| `no-const-assign` | 對 const 變數重新賦值   | `const a = 1; a = 2;`          |
| `no-dupe-keys`    | 物件重複 key            | `{ a: 1, a: 2 }`               |
| `no-unreachable`  | return 後仍有程式碼     | `return; console.log('')`      |
| `no-empty`        | 空的 `{}` 區塊          | `if (x) {}`                    |
| `no-redeclare`    | 同一變數被重複宣告      | `var a = 1; var a = 2;`        |
| `use-isnan`       | 直接與 NaN 比較         | `x === NaN`（永遠 false）      |
| `valid-typeof`    | typeof 比對字串拼錯     | `typeof x === 'strng'`         |

> 想看完整清單：[https://eslint.org/docs/latest/rules/](https://eslint.org/docs/latest/rules/)（有 ✓ 的就是 recommended 包含的規則）

常與 recommended 搭配但需另外開啟的實用規則：

- `eqeqeq`：強制 `===` / `!==`
- `prefer-const`：能用 const 就別用 let
- `no-var`：禁止使用 var

## 7. 對照 `vue-eslint`：Vue 3 實戰

### 7.1 安裝

```bash
pnpm add -D eslint @eslint/js eslint-plugin-vue
```

### 7.2 三層疊加的設定結構（見 `vue-eslint/eslint.config.js`）

```js
export default [
  { files: ["**/*.{js,mjs,jsx,vue}"] },           // ① 哪些檔案要被 lint
  { ignores: ["**/dist/**", ...] },                // ② 排除路徑
  js.configs.recommended,                          // ③ JS 基礎規則
  ...pluginVue.configs["flat/essential"],          // ④ Vue 底線規則
  ...pluginVue.configs["flat/recommended"],        // ⑤ Vue 最佳實踐
  { rules: { /* 自訂覆寫 */ } },                    // ⑥ 專案客製
];
```

### 7.3 eslint-plugin-vue 的三個 preset

| Preset             | 內容                                       | 何時用                        |
| ------------------ | ------------------------------------------ | ----------------------------- |
| `flat/base`        | 讓 ESLint 看得懂 `.vue` SFC                | 最小需求；想自組規則時        |
| `flat/essential`   | 在 base 之上加「會造成執行錯誤」的必備規則 | **底線，所有 Vue 專案都該開** |
| `flat/recommended` | 在 essential 之上加社群公認最佳實踐        | 推薦大多數專案直接用這個      |

這三者**由下而上包含**：recommended 已含 essential，essential 已含 base。

## 8. 重點 Vue 規則

以下規則都能在 `vue-eslint/src/App.vue` 或 `HelloWorld.vue` 看到「真實範例」：

| 規則                              | 意義                                   | 範例（節錄自 HelloWorld.vue）            |
| --------------------------------- | -------------------------------------- | ---------------------------------------- |
| `vue/no-undef-components`         | template 用了沒 import 的元件          | `<HelloWorld />` 沒 import               |
| `vue/no-undef-properties`         | template 用了 script 沒宣告的資料      | `{{ text }}` 但 script 無 text           |
| `vue/no-unused-properties`        | props／data／computed 宣告了沒用       | `msg` 在 template 未出現                 |
| `vue/no-unused-emit-declarations` | defineEmits 宣告卻沒 emit              | 宣告 `addTodo` 卻 emit `addTodos`        |
| `vue/eqeqeq`                      | template 也強制 `===`                  | `{{ a == 1 ? ... }}`                     |
| `array-callback-return`           | `.map/.filter` 的 callback 必須 return | `arr.map(item => { /* 忘了 return */ })` |

這些規則全部已在 `vue-eslint/eslint.config.js` 自訂區塊中顯式開啟，方便讀者查閱。

## 9. VSCode 整合：存檔自動修復

`vue-eslint/.vscode/settings.json` 已內建：

```json
"editor.codeActionsOnSave": {
  "source.fixAll": "explicit"
}
```

意義：

- **存檔時**會套用所有可自動修復的 Code Action（含 ESLint 的 `--fix`）
- `"explicit"`：**只在使用者主動 Ctrl+S** 才觸發；避免自動儲存時在背景亂改

若只想限定 ESLint 修復（不讓其他 Code Action 介入），可改為：

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": "explicit"
}
```

搭配 [ESLint VSCode 擴充](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 使用。

## 10. CLI 實戰指令

```bash
# 檢查整個專案
npx eslint .

# 只檢查 src，且以 warning 上限 0 讓 CI fail-fast
npx eslint src --max-warnings 0

# 自動修復所有可修復的錯誤
npx eslint . --fix

# 啟用快取，第二次執行只 lint 異動檔（大型專案顯著加速）
npx eslint . --cache

# 檢查單一檔案並輸出 JSON（常用於工具鏈整合）
npx eslint src/App.vue -f json
```

常見 CI 寫法：

```bash
npx eslint . --max-warnings 0
```

`--max-warnings 0` 把 warning 也視為失敗，避免「warning 永遠沒人修」的破窗效應。

## 11. 常見 FAQ

### Q1：`error` 跟 `warn` 差在哪？

- `error`：讓 `eslint .` 以非 0 exit code 結束 → CI 會失敗
- `warn`：輸出警告但不影響 exit code

建議：新專案從 `warn` 起步，團隊習慣後調整為 `error`。

### Q2：某個檔案／目錄想完全不被 lint？

在設定檔的 `ignores` 陣列加上 glob：

```js
{ ignores: ["**/dist/**", "legacy/**"] }
```

Flat Config 已不再支援 `.eslintignore` 檔案。

### Q3：跟 Prettier 的規則打架怎麼辦？

安裝 `eslint-config-prettier` 並放在設定陣列**最後**，它會把所有與排版相關的 ESLint 規則關掉，排版交給 Prettier 處理。

### Q4：怎麼看目前實際生效的規則？

```bash
pnpx @eslint/config-inspector@latest
```

會開啟本機網頁，可視化展示每個 glob 對應的規則、嚴重度、來源。

### Q5：一條規則想關掉一行怎麼辦？

```js
// eslint-disable-next-line no-console
console.log("這行放行");
```

請「盡量精準指定規則名稱」，不要 `// eslint-disable` 整檔關光。

## 12. 進階延伸方向

本文保持精簡，以下主題留給讀者自行擴展：

- **TypeScript 整合**：`typescript-eslint` 提供 `tseslint.configs.recommended`，寫法類似 `js.configs.recommended`
- **Prettier 整合**：`prettier` + `eslint-config-prettier`，避免與 ESLint 排版規則打架
- **Git Hooks**：`husky` + `lint-staged`，commit 前只 lint 本次改動檔案
- **CI 整合**：GitHub Actions 中 `run: pnpm lint --max-warnings 0`
- **自訂規則**：寫自己的 ESLint plugin，把團隊常見錯誤寫成規則

## 附錄：範例倉庫檔案導覽

```
eslint-demo/
├── README.md                           ← 快速導覽
├── TUTORIAL.md                         ← 原始教學稿
├── unuse-eslint/
│   └── index.js                        ← 無設定，對照組
├── use-eslint/
│   ├── eslint.config.mjs               ← Flat Config 基礎範例
│   ├── index.js                        ← 故意違反 no-const-assign
│   └── package.json
└── vue-eslint/
    ├── eslint.config.js                ← Vue Flat Config 實戰
    ├── .vscode/settings.json           ← 存檔自動修復
    ├── src/
    │   ├── App.vue                     ← 違反 vue/no-undef-*、eqeqeq
    │   └── components/
    │       └── HelloWorld.vue          ← 違反 vue/no-unused-*、array-callback-return
    └── package.json
```

祝你 lint 愉快 🧹

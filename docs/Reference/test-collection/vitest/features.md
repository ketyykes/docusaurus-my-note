---
sidebar_position: 3
title: 功能特色
description: 深入探索 Vitest 的核心功能與特色，包含 Vite 原生整合、即時監看模式、多執行緒測試、元件測試支援等強大功能，以及如何在不同專案中靈活運用
tags:
  - test
last_update:
  date: 2025-05-28
  author: Danny
---

# 功能特色

- Vite 的設定、轉譯器、解析器與外掛
  - 測試時可直接沿用你應用程式的設定！
- 聰明又即時的監看模式，像測試版的 HMR！
- 支援 Vue、React、Svelte、Lit、Marko 等元件測試
- 內建 TypeScript / JSX 支援
- 以 ESM 為優先，支援頂層 await
- 透過 Tinypool 多執行緒（Workers）平行測試
- 內建 Tinybench 支援效能基準測試
- 支援測試與測試集的篩選、逾時、平行執行
- 支援 Workspace
- 相容 Jest 的 Snapshot 快照功能
- 內建 Chai 斷言庫，並支援 Jest expect API
- 內建 Tinyspy 支援 mock
- 支援 happy-dom 或 jsdom 進行 DOM 模擬
- 支援瀏覽器模式，可在瀏覽器中執行元件測試
- 支援 v8 或 istanbul 進行程式碼覆蓋率分析
- 類似 Rust 的原始碼內測試（in-source testing）
- 支援型別測試（expect-type）
- 支援分片（Sharding）

---

## 透過影片學習如何撰寫第一個測試

### 測試、開發、建置共用設定
Vite 的設定、轉譯器、解析器與外掛，測試時可直接沿用你應用程式的設定。

更多請參考「設定 Vitest」。

---

## 監看模式（Watch Mode）

```bash
$ vitest
```

當你修改原始碼或測試檔案時，Vitest 會聰明地搜尋模組關聯，只重新執行相關的測試，就像 Vite 的 HMR 一樣！

Vitest 在開發環境預設啟用監看模式，在 CI 環境（有 process.env.CI）則預設為執行一次。你也可以用 `vitest watch` 或 `vitest run` 明確指定模式。

用 `--standalone` 旗標啟動 Vitest，可讓它在背景持續執行，只有檔案變動時才會執行測試。只有當測試檔案有引用的原始碼變動時，才會重新執行測試。

---

## 常見 Web 開發模式原生支援

- 原生支援 ES Module / TypeScript / JSX / PostCSS

---

## 多執行緒（Threads）

Vitest 預設會用 Tinypool（node:child_process）多程序平行執行測試檔案，大幅提升測試速度。若想再加速，可啟用 `--pool=threads`，用 node:worker_threads 執行（但部分套件可能不相容）。

如需單執行緒或單程序執行，請參考 poolOptions。

Vitest 也會隔離每個檔案的執行環境，避免環境變動互相影響。若想提升效能可用 `--no-isolate` 關閉隔離（但可能影響正確性）。

---

## 測試篩選

Vitest 提供多種方式篩選要執行的測試，加快測試速度，讓你專注開發。

更多請參考「測試篩選」。

---

## 平行執行測試

用 `.concurrent` 可讓多個測試同時執行。

```js
import { describe, it } from 'vitest'

// 這兩個 concurrent 測試會同時開始
describe('suite', () => {
  it('serial test', async () => { /* ... */ })
  it.concurrent('concurrent test 1', async ({ expect }) => { /* ... */ })
  it.concurrent('concurrent test 2', async ({ expect }) => { /* ... */ })
})
```

如果在整個 suite 上用 `.concurrent`，裡面所有測試都會平行執行：

```js
import { describe, it } from 'vitest'

// 這個 suite 裡的所有測試都會平行執行
describe.concurrent('suite', () => {
  it('concurrent test 1', async ({ expect }) => { /* ... */ })
  it('concurrent test 2', async ({ expect }) => { /* ... */ })
  it.concurrent('concurrent test 3', async ({ expect }) => { /* ... */ })
})
```

你也可以在 concurrent 測試和 suite 上用 `.skip`、`.only`、`.todo`。詳情請見 API Reference。

**警告**  
平行測試時，Snapshot 和 Assertion 必須用本地 Test Context 的 expect，才能正確對應測試。

---

## 快照（Snapshot）

支援與 Jest 相容的快照功能。

```js
import { expect, it } from 'vitest'

it('renders correctly', () => {
  const result = render()
  expect(result).toMatchSnapshot()
})
```

更多請參考「快照」。

---

## Chai 及 Jest expect 相容性

內建 Chai 斷言庫，並支援 Jest expect API。

如果你有用第三方 matcher 套件，建議將 `test.globals` 設為 true 以提升相容性。

---

## Mock 功能

內建 Tinyspy，並支援 jest 風格的 vi 物件 mock API。

```js
import { expect, vi } from 'vitest'

const fn = vi.fn()

fn('hello', 1)

expect(vi.isMockFunction(fn)).toBe(true)
expect(fn.mock.calls[0]).toEqual(['hello', 1])

fn.mockImplementation((arg: string) => arg)

fn('world', 2)

expect(fn.mock.results[1].value).toBe('world')
```

Vitest 支援 happy-dom 或 jsdom 來模擬 DOM 與瀏覽器 API。這些套件需另外安裝：

```bash
npm i -D happy-dom
```

然後在設定檔指定環境：

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom', // 或 'jsdom', 'node'
  },
})
```

更多請參考「Mocking」。

---

## 覆蓋率（Coverage）

Vitest 支援 v8 原生覆蓋率與 istanbul 工具覆蓋率。

package.json

```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

更多請參考「Coverage」。

---

## 原始碼內測試（In-Source Testing）

Vitest 支援在原始碼內直接寫測試，類似 Rust 的 module 測試。

這讓測試與實作共用同一個閉包，可測試私有狀態而不用 export，開發回饋更即時。

src/index.ts

```js
// 實作
export function add(...args: number[]): number {
  return args.reduce((a, b) => a + b, 0)
}

// 原始碼內測試
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('add', () => {
    expect(add()).toBe(0)
    expect(add(1)).toBe(1)
    expect(add(1, 2, 3)).toBe(6)
  })
}
```

更多請參考「In-source testing」。

---

## 效能基準測試（Benchmarking，實驗性）

可用 bench 函式（Tinybench）進行效能比較。

sort.bench.ts

```js
import { bench, describe } from 'vitest'

describe('sort', () => {
  bench('normal', () => {
    const x = [1, 5, 4, 2, 3]
    x.sort((a, b) => {
      return a - b
    })
  })

  bench('reverse', () => {
    const x = [1, 5, 4, 2, 3]
    x.reverse().sort((a, b) => {
      return a - b
    })
  })
})
```

---

## 型別測試（Type Testing，實驗性）

可寫測試捕捉型別回歸。Vitest 內建 expect-type 套件，API 易懂。

types.test-d.ts

```js
import { assertType, expectTypeOf, test } from 'vitest'
import { mount } from './mount.js'

test('my types work properly', () => {
  expectTypeOf(mount).toBeFunction()
  expectTypeOf(mount).parameter(0).toMatchTypeOf<{ name: string }>()

  // @ts-expect-error name 是 string
  assertType(mount({ name: 42 }))
})
```

---

## 分片（Sharding）

可用 `--shard` 與 `--reporter=blob` 旗標在多台機器上分散執行測試，最後用 `--merge-reports` 合併所有測試與覆蓋率報告：

```bash
vitest --shard=1/2 --reporter=blob --coverage
vitest --shard=2/2 --reporter=blob --coverage
vitest --merge-reports --reporter=junit --coverage
```

更多請參考「效能優化 | 分片」。

---

## 環境變數

Vitest 只會自動載入以 VITE_ 開頭的 .env 變數，這是為了與前端測試相容，遵循 Vite 慣例。若要載入所有 .env 變數，可用 vite 的 loadEnv 方法：

vitest.config.ts

```js
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
  test: {
    // mode 會決定選用哪個 ".env.{mode}" 檔案
    env: loadEnv(mode, process.cwd(), ''),
  },
}))
```


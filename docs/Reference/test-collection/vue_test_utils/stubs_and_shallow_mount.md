---
sidebar_position: 4
title: Stubs 與 ShallowMount
description: 學習如何使用 Vue Test Utils 的 stubs 功能和 ShallowMount 來簡化測試。包含元件替身、指令替身、非同步元件處理等進階測試技巧。
tags:
  - test
last_update:
  date: 2025-
  author: Danny
---

# Stubs 與 ShallowMount

Vue Test Utils 提供一些進階功能來為元件和指令建立替身（stub）。替身是指你用一個什麼都不做的虛擬實作來取代現有的自定義元件或指令實作，這可以簡化原本複雜的測試。讓我們來看個例子。

## 為單一子元件建立替身

常見的例子是當你想測試元件階層中很高層級的某個元件時。

在這個例子中，我們有一個 `<App>` 會渲染訊息，以及一個 `FetchDataFromApi` 元件會呼叫 API 並渲染結果。

```js
const FetchDataFromApi = {
  name: 'FetchDataFromApi',
  template: `
    <div>{{ result }}</div>
  `,
  async mounted() {
    const res = await axios.get('/api/info')
    this.result = res.data
  },
  data() {
    return {
      result: ''
    }
  }
}

const App = {
  components: {
    FetchDataFromApi
  },
  template: `
    <h1>Welcome to Vue.js 3</h1>
    <fetch-data-from-api />
  `
}
```

在這個特定測試中，我們不想真的呼叫 API，只想斷言訊息有被渲染。這時可以使用全域掛載選項中的 `stubs`。

```js
test('stubs component with custom template', () => {
  const wrapper = mount(App, {
    global: {
      stubs: {
        FetchDataFromApi: {
          template: '<span />'
        }
      }
    }
  })

  console.log(wrapper.html())
  // <h1>Welcome to Vue.js 3</h1><span></span>

  expect(wrapper.html()).toContain('Welcome to Vue.js 3')
})
```

注意到 template 在 `<fetch-data-from-api />` 的位置顯示了 `<span></span>` 嗎？我們用替身取代了它，在這個例子中我們提供自己的實作，傳入一個 template。

你也可以使用預設替身，而不用提供自己的：

```js
test('stubs component', () => {
  const wrapper = mount(App, {
    global: {
      stubs: {
        FetchDataFromApi: true
      }
    }
  })

  console.log(wrapper.html())
  /*
    <h1>Welcome to Vue.js 3</h1>
    <fetch-data-from-api-stub></fetch-data-from-api-stub>
  */

  expect(wrapper.html()).toContain('Welcome to Vue.js 3')
})
```

這會在整個渲染樹中為所有 `<FetchDataFromApi />` 元件建立替身，不論它們出現在哪一層。這就是為什麼它在全域掛載選項中。

**提示**  
要建立替身，你可以使用 components 中的 key 或元件的 name。如果兩者都在 global.stubs 中，會優先使用 key。

## 為所有子元件建立替身

有時你可能想為所有自定義元件建立替身。例如你可能有這樣的元件：

```js
const ComplexComponent = {
  components: { ComplexA, ComplexB, ComplexC },
  template: `
    <h1>Welcome to Vue.js 3</h1>
    <ComplexA />
    <ComplexB />
    <ComplexC />
  `
}
```

想像每個 `<Complex>` 都做很複雜的事，而你只想測試 `<h1>` 是否渲染正確的問候語。你可以這樣做：

```js
const wrapper = mount(ComplexComponent, {
  global: {
    stubs: {
      ComplexA: true,
      ComplexB: true,
      ComplexC: true
    }
  }
})
```

但這有很多重複的程式碼。VTU 有 ShallowMount 選項，會自動為所有子元件建立替身：

```js
test('shallow stubs out all child components', () => {
  const wrapper = mount(ComplexComponent, {
    shallow: true
  })

  console.log(wrapper.html())
  /*
    <h1>Welcome to Vue.js 3</h1>
    <complex-a-stub></complex-a-stub>
    <complex-b-stub></complex-b-stub>
    <complex-c-stub></complex-c-stub>
  */
})
```

**提示**  
如果你用過 VTU V1，你可能記得這叫做 `shallowMount`。這個方法還是可以用，等同於寫 `shallow: true`。

## 為所有子元件建立替身但有例外

有時你想為所有自定義元件建立替身，但排除特定的。讓我們看個例子：

```js
const ComplexA = {
  template: '<h2>Hello from real component!</h2>'
}

const ComplexComponent = {
  components: { ComplexA, ComplexB, ComplexC },
  template: `
    <h1>Welcome to Vue.js 3</h1>
    <ComplexA />
    <ComplexB />
    <ComplexC />
  `
}
```

使用 ShallowMount 選項會自動為所有子元件建立替身。如果我們想明確排除特定元件的替身，可以在 stubs 中把它的值設為 false：

```js
test('shallow allows opt-out of stubbing specific component', () => {
  const wrapper = mount(ComplexComponent, {
    shallow: true,
    global: {
      stubs: { ComplexA: false }
    }
  })

  console.log(wrapper.html())
  /*
    <h1>Welcome to Vue.js 3</h1>
    <h2>Hello from real component!</h2>
    <complex-b-stub></complex-b-stub>
    <complex-c-stub></complex-c-stub>
  */
})
```

## 為非同步元件建立替身

如果你想為非同步元件建立替身，有兩種行為。例如，你可能有這樣的元件：

```js
// AsyncComponent.js
export default defineComponent({
  name: 'AsyncComponent',
  template: '<span>AsyncComponent</span>'
})

// App.js
const App = defineComponent({
  components: {
    MyComponent: defineAsyncComponent(() => import('./AsyncComponent'))
  },
  template: '<MyComponent/>'
})
```

第一種行為是使用載入非同步元件時在你元件中定義的 key。在這個例子中我們用 "MyComponent" 這個 key。測試案例不需要使用 async/await，因為元件在解析前就已經被替身取代了。

```js
test('stubs async component without resolving', () => {
  const wrapper = mount(App, {
    global: {
      stubs: {
        MyComponent: true
      }
    }
  })

  expect(wrapper.html()).toBe('<my-component-stub></my-component-stub>')
})
```

第二種行為是使用非同步元件的 name。在這個例子中我們用 "AsyncComponent" 這個名稱。現在需要使用 async/await，因為非同步元件需要被解析，然後才能用非同步元件中定義的名稱建立替身。

記得在你的非同步元件中定義 name！

```js
test('stubs async component with resolving', async () => {
  const wrapper = mount(App, {
    global: {
      stubs: {
        AsyncComponent: true
      }
    }
  })

  await flushPromises()

  expect(wrapper.html()).toBe('<async-component-stub></async-component-stub>')
})
```

## 為指令建立替身

有時指令會做很複雜的事，像是大量的 DOM 操作，可能會導致測試錯誤（因為 JSDOM 無法完全模擬 DOM 行為）。常見例子是各種函式庫的 tooltip 指令，通常大量依賴量測 DOM 節點位置/大小。

在這個例子中，我們有另一個 `<App>` 會渲染帶有 tooltip 的訊息：

```js
// tooltip directive declared somewhere, named `Tooltip`

const App = {
  directives: {
    Tooltip
  },
  template: '<h1 v-tooltip title="Welcome tooltip">Welcome to Vue.js 3</h1>'
}
```

在這個測試中我們不想執行 Tooltip 指令程式碼，只想斷言訊息有被渲染。這時可以在全域掛載選項中使用 stubs，傳入 vTooltip。

```js
test('stubs component with custom template', () => {
  const wrapper = mount(App, {
    global: {
      stubs: {
        vTooltip: true
      }
    }
  })

  console.log(wrapper.html())
  // <h1>Welcome to Vue.js 3</h1>

  expect(wrapper.html()).toContain('Welcome to Vue.js 3')
})
```

**提示**  
使用 `vCustomDirective` 命名方式來區分元件和指令，這個做法參考了 `<script setup>` 的相同方法。

有時我們需要指令的部分功能（通常因為某些程式碼依賴它）。假設我們的指令執行時會新增 `with-tooltip` CSS class，這對我們的程式碼很重要。這時我們可以把 true 換成我們的 mock 指令實作：

```js
test('stubs component with custom template', () => {
  const wrapper = mount(App, {
    global: {
      stubs: {
        vTooltip: {
          beforeMount(el: Element) {
            console.log('directive called')
            el.classList.add('with-tooltip')
          }
        }
      }
    }
  })

  // 'directive called' logged to console

  console.log(wrapper.html())
  // <h1 class="with-tooltip">Welcome to Vue.js 3</h1>

  expect(wrapper.classes('with-tooltip')).toBe(true)
})
```

我們剛剛用自己的實作替換了指令實作！

**警告**  
在函式元件或 `<script setup>` 中，為指令建立替身無法運作，因為 withDirectives 函式內缺少指令名稱。如果需要在函式元件中 mock 指令，請考慮透過測試框架 mock 指令模組。詳見 https://github.com/vuejs/core/issues/6887

## 預設 Slot 與 ShallowMount

由於 ShallowMount 會為元件的所有內容建立替身，使用 shallow 時任何 `<slot>` 都不會被渲染。雖然這在大多數情況下不是問題，但有些情境下並不理想。

```js
const CustomButton = {
  template: `
    <button>
      <slot />
    </button>
  `
}
```

你可能會這樣使用：

```js
const App = {
  props: ['authenticated'],
  components: { CustomButton },
  template: `
    <custom-button>
      <div v-if="authenticated">Log out</div>
      <div v-else>Log in</div>
    </custom-button>
  `
}
```

如果你使用 shallow，slot 不會被渲染，因為 `<custom-button />` 的 render 函式被替身取代了。這表示你無法驗證正確的文字是否被渲染！

對於這種情況，你可以使用 `config.renderStubDefaultSlot`，即使使用 shallow 也會渲染預設 slot 內容：

```js
import { config, mount } from '@vue/test-utils'

beforeAll(() => {
  config.global.renderStubDefaultSlot = true
})

afterAll(() => {
  config.global.renderStubDefaultSlot = false
})

test('shallow with stubs', () => {
  const wrapper = mount(AnotherApp, {
    props: {
      authenticated: true
    },
    shallow: true
  })

  expect(wrapper.html()).toContain('Log out')
})
```

由於這個行為是全域的，不是針對個別掛載，你需要記得在每個測試前後啟用/停用它。

**提示**  
你也可以在測試設定檔中引入 config 並將 renderStubDefaultSlot 設為 true 來全域啟用。不幸的是，由於技術限制，這個行為無法擴展到預設 slot 以外的其他 slot。

## mount、shallow 和 stubs：何時使用哪個？

經驗法則是，你的測試越接近軟體的實際使用方式，就能給你越多信心。

使用 mount 的測試會渲染完整的元件階層，更接近使用者在真實瀏覽器中的體驗。

另一方面，使用 shallow 的測試專注於特定元件。shallow 對於完全隔離測試進階元件很有用。如果你只有一兩個與測試無關的元件，考慮使用 mount 搭配 stubs 而不是 shallow。你用越多 stub，測試就越不像正式環境。

請記住，無論你是完整掛載還是淺層渲染，好的測試專注於輸入（props 和使用者互動，如 trigger）和輸出（渲染的 DOM 元素和事件），而不是實作細節。

所以不論你選擇哪種掛載方法，我們建議你記住這些準則。

## 結論

- 使用 `global.stubs` 用虛擬的來取代元件或指令，簡化你的測試
- 使用 `shallow: true`（或 `shallowMount`）為所有子元件建立替身
- 使用 `global.renderStubDefaultSlot` 為替身元件渲染預設 `<slot>`
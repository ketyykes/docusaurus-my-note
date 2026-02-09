---
sidebar_position: 4
title: Vue 3 Composition API
description: 深入解析 Vue 3 Composition API 的核心概念，包含 ref、reactive 響應式資料處理、Props 定義、computed 計算屬性及最佳實踐，幫助你快速掌握現代 Vue 開發
tags:
  - vue
  - frontend
last_update:
  date: 2024-10-28
  author: Danny
---

Vue 3 的 Composition API 為開發者帶來了全新的程式碼組織方式，相較於 Options API，它提供更好的程式碼重用性和可維護性。本文將深入介紹 Composition API 的核心概念和使用方法，從基礎設定到進階應用，幫助你掌握這個強大的功能。無論你是 Vue 新手或是想轉換到 Composition API 的開發者，都能從本文獲得完整的學習指引。

## 目錄
- [重點整理](#重點整理)
- [Vue3 Composition API 注意事項](#1-vue3-composition-api-注意事項)
- [Option API vs Composition API 計數器範例](#2-option-api-vs-composition-api-計數器範例)
- [Composition API 中應避免的寫法](#3-composition-api-中應避免的寫法)
- [定義參數型別（Props）傳入子組件](#4-定義參數型別props傳入子組件)
- [Ref 與 Reactive 的響應式資料](#5-ref-與-reactive-的響應式資料)
- [Ref 與 Reactive 的差異](#6-ref-與-reactive-的差異)
- [Computed 計算屬性](#7-computed-計算屬性)
- [撰寫 Composition API 的最佳實踐](#8-撰寫-composition-api-的最佳實踐)

## 重點整理

本文重點整理如下

1. Composition API 的基本概念與優勢，包括更好的程式碼組織和重用性
2. Option API 與 Composition API 的差異比較和使用場景
3. ref 與 reactive 響應式資料的特性與使用方法
4. Props 參數型別定義和傳遞方式
5. computed 計算屬性的實作和最佳實踐
6. 完整的程式碼撰寫規範和建議
7. 實用的程式碼範例和使用情境說明


### 1. Vue3 Composition API 注意事項

Composition API 是 Vue 3 中引入的全新設計，它主要用於提升程式碼的可讀性與重用性，特別是當專案規模變大時。與 Option API 相比，Composition API 可以將邏輯更清晰地分割，同時避免了傳統 API 中模組化不易的問題。因此，這裡將探討 Composition API 的基本特性、優勢及其使用時的注意事項。

#### Composition API 的基本特性與優勢

- **模組化重用性**：Composition API 支援將函式獨立封裝，便於不同元件間共享邏輯，減少重複程式碼。
- **響應式資料的靈活使用**：透過 `ref` 與 `reactive`，可以簡單地定義和操作響應式資料，實現更靈活的資料管理。
- **生命周期函式更集中**：使用 `onMounted` 等方法，讓各階段的初始化邏輯集中在 `setup` 函式中，使邏輯更為集中清晰。

#### 使用 Composition API 的最佳時機

- **元件邏輯複雜**：當元件內有多個功能模組時，使用 Composition API 可避免邏輯分散，增強可讀性。
- **邏輯重用需求高**：例如多個元件需要共享某些功能邏輯時，透過 Composition API 來提取函式實現重用會更有效。
- **元件規模較大**：Composition API 更適合大型專案中組織程式碼，改善專案可維護性。

以下是使用 Composition API 的一個基礎範例，展示了如何使用 `ref` 定義響應式資料，並使用 `onMounted` 進行初始化設定。

#### 基礎範例：簡單的計數器

這是一個使用 Composition API 的計數器範例。透過 `ref` 宣告 `count` 變數，使其成為響應式資料，並在 `setup` 函式中完成邏輯設定。

```javascript
<script setup>
import { ref, onMounted } from "vue";

// 定義響應式變數
const count = ref(0);

// 定義增加計數的函式
const increment = () => {
  count.value += 1;
};

// 使用 onMounted 進行初始設定
onMounted(() => {
  console.log(`初始化計數值：${count.value}`);
});
</script>

<template>
  <div>VueCompositionAPI：{{ count }}</div>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

在這個範例中：

- **響應式變數 `count`**：使用 `ref` 定義，使變數能夠隨著數值變動而即時更新畫面。
- **計數函式 `increment`**：直接操作 `count.value`，藉此更新響應式資料。
- **`onMounted` 初始設定**：用於組件掛載後執行的邏輯，這裡透過 `console.log` 輸出初始的 `count` 值。

這個範例展示了 Composition API 的基本使用方式，也凸顯了 Vue 3 對於模組化邏輯的支持。Composition API 的靈活性不僅讓程式碼更具組織性，也提升了開發效率。

### 2. Option API vs Composition API 計數器範例

Vue 3 支援兩種不同的 API（Option API 和 Composition API），讓開發者能根據需求選擇更合適的寫法。這裡將介紹兩種 API 寫法的區別，並透過計數器範例比較它們的用法。

#### Option API 計數器寫法

Option API 是 Vue 2 中常用的方式，程式碼由 `data`、`methods`、`computed` 等選項組成，將邏輯依功能分區，易於理解，但不夠靈活。

以下是使用 Option API 的計數器範例：

```javascript
<script>
export default {
  data() {
    return {
      count: 0,  // 定義計數器變數
    };
  },
  methods: {
    increment() {  // 定義增加計數的函式
      this.count++;
    },
  },
  mounted() {  // 使用 mounted 進行初始化設定
    console.log(`初始計數值：${this.count}`);
  },
};
</script>

<template>
  <div>Vue：{{ count }}</div>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

在這個範例中：

- **`data`**：將 `count` 定義為組件的狀態變數。
- **`methods`**：將 `increment` 方法定義在 `methods` 中。
- **`mounted`**：在組件掛載時顯示初始值。

這種寫法的優點在於結構清晰，適合簡單的元件。但是當邏輯變得複雜且需要重用時，Option API 可能導致程式碼分散。

#### Composition API 計數器寫法

Composition API 是 Vue 3 引入的，允許將資料、方法、生命週期等集中在 `setup` 函式中。這種寫法使得邏輯更容易重用，適合大型應用程式。

以下是相同的計數器範例，使用 Composition API 來實現：

```javascript
<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const count = ref(0);  // 使用 ref 宣告響應式變數

    const increment = () => {  // 定義計數增加的函式
      count.value += 1;
    };

    onMounted(() => {  // 使用 onMounted 取代 mounted 進行初始化
      console.log(`初始計數值：${count.value}`);
    });

    return { count, increment };  // 將變數和函式回傳給 template 使用
  },
};
</script>

<template>
  <div>VueCompositionAPI：{{ count }}</div>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

在這個 Composition API 的範例中：

- **`ref`**：`count` 變數透過 `ref` 進行響應式處理。這樣在畫面上 `count` 的變化會自動更新。
- **`onMounted`**：取代 Option API 中的 `mounted`，直接在 `setup` 函式中初始化計數值。
- **`return`**：將 `count` 與 `increment` 返回給模板進行使用。

Composition API 的優勢在於結構的集中性和邏輯的靈活性。透過 `setup` 函式，資料與方法的集中管理讓重用更簡單，也提升了程式碼的可讀性和模組化。

#### 結論

| API             | 優勢                       | 適合場合             |
| --------------- | -------------------------- | -------------------- |
| Option API      | 結構清晰，易於理解         | 簡單的元件或小型專案 |
| Composition API | 高度模組化、便於重用及測試 | 複雜的邏輯或大型專案 |

在開發中，選擇使用 Option API 還是 Composition API 取決於專案的規模與需求。小型專案或簡單的邏輯可以使用 Option API，而大型專案則推薦使用 Composition API 來管理邏輯。透過兩種方式的結合，Vue 開發者可以靈活應對不同需求，實現更高效、可維護的程式碼。

### 3. Composition API 中應避免的寫法

在使用 Vue 3 Composition API 時，建議避免將 Option API 和 Composition API 的寫法混用，以保持程式碼風格的一致性與可讀性。特別是 `setup` 中的邏輯與生命週期方法（如 `onMounted`、`onUnmounted` 等），更應統一到 Composition API 的語法中，避免混用 `mounted` 等 Option API 方法，這樣能確保程式碼的易於維護性。

#### 錯誤示範：混用 Composition API 與 Option API 的 `mounted`

在 Composition API 中，有些開發者可能會不小心將 `mounted` 直接寫入組件中，這樣的寫法會與 `setup` 內的 `onMounted` 發生衝突，影響程式碼的一致性。

以下是一個錯誤的範例，展示了如何混用 `mounted` 與 `setup`：

```javascript
<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const count = ref(0);

    const increment = () => {
      count.value += 1;
    };

    // 正確的使用方式：使用 onMounted 初始化資料
    onMounted(() => {
      console.log(`使用 onMounted：計數初始值為 ${count.value}`);
    });

    return { count, increment };
  },

  // 錯誤的使用方式：不應該在 Composition API 中混用 mounted
  mounted() {
    console.log(`錯誤的混用：計數初始值為 ${this.count}`);
  },
};
</script>

<template>
  <div>VueCompositionAPI：{{ count }}</div>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

在這個範例中：

- **正確的寫法**：應在 `setup` 中使用 `onMounted` 來完成組件的掛載邏輯。
- **錯誤的寫法**：在 Composition API 中添加 `mounted`，這會導致程式碼混亂且不一致。

#### 正確示範：統一使用 Composition API 的生命週期函式

為了保持 Composition API 的一致性，建議在 `setup` 函式中使用 `onMounted`，並移除 `mounted`。如下所示：

```javascript
<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const count = ref(0);

    const increment = () => {
      count.value += 1;
    };

    // 使用 Composition API 的 onMounted 進行初始化
    onMounted(() => {
      console.log(`初始化計數值：${count.value}`);
    });

    return { count, increment };
  },
};
</script>

<template>
  <div>VueCompositionAPI：{{ count }}</div>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

這樣的寫法在使用上更為一致，讓 `setup` 中的所有邏輯集中在 Composition API 中，減少錯誤發生的可能性。

#### 混用 API 的潛在問題

混用 Option API 與 Composition API 會帶來一些問題：

- **程式碼可讀性降低**：混用兩者會讓程式碼風格不統一，使其他開發者閱讀起來較為混亂。
- **維護困難**：在大型專案中，保持 API 的一致性有助於維護和調試。如果混用，程式碼可能變得難以跟蹤。
- **生命週期函式不一致**：Option API 中的 `mounted` 與 Composition API 中的 `onMounted` 可能會執行重複或衝突的邏輯。

#### 小結

在 Composition API 中，應避免使用 Option API 的方法，尤其是生命周期函式如 `mounted`。推薦統一使用 Composition API 的生命週期函式，例如 `onMounted`、`onUnmounted` 等，以提升程式碼的一致性與易於維護性。這樣的寫法能讓程式碼更具結構化，並減少潛在的錯誤風險。

### 4. 定義參數型別（Props）傳入子組件

在 Vue 中，將父組件的資料傳遞至子組件時，通常會使用 `props`。在 Vue 3 的 Composition API 中，`props` 的定義方式有所不同，特別是在使用 `setup` 語法糖的情況下。這裡將介紹如何在 Composition API 中正確定義 `props` 的型別，以及傳入子組件的資料類型。

#### 定義 Props 的基本方法

在 Composition API 中，我們可以透過 `defineProps` 來設定 `props` 的型別和預設值。這讓組件更具自我描述性，尤其在多人協作和大型專案中，清晰的資料結構能夠提升維護效率。

#### 不使用 Setup 語法糖的 Props 定義

在不使用 `setup` 語法糖的情況下，`props` 可以直接在 `props` 選項中定義其型別和預設值。以下範例展示了如何設定一個 `data` 物件作為 `props` 傳入子組件：

```javascript
<script>
import { onMounted, ref } from "vue";
import HelloWorld from "../components/HelloWorld.vue";

export default {
  components: {
    HelloWorld,
  },
  props: {
    data: {  // 定義 data 的型別為 Object 並設置預設值
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const count = ref(0);

    const increment = () => {
      count.value += 1;
    };

    onMounted(() => {
      console.log(count.value);
    });

    return { count, increment };
  },
};
</script>

<template>
  <div>VueCompositionAPI：{{ count }}</div>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

在這個範例中：

- **`props` 選項**：`data` 被設置為一個 `Object`，並有預設值 `{}`，可以讓子組件在沒有傳入參數時正常運行。
- **`props` 使用**：在 `setup` 函式的參數中直接獲取 `props`，可以進行相應的操作。

#### 使用 Setup 語法糖的 Props 定義

使用 `setup` 語法糖可以讓程式碼更加簡潔，這時我們可以使用 `defineProps` 來設定 `props`。以下範例展示了相同的 `data` 物件，並使用 `defineProps` 來定義：

```javascript
<script setup>
import { onMounted, ref } from "vue";
import HelloWorld from "../components/HelloWorld.vue";

// 使用 defineProps 定義 props 並設置預設值
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const count = ref(0);

const increment = () => {
  count.value += 1;
};

onMounted(() => {
  console.log(count.value);
});
</script>

<template>
  <div>VueCompositionAPI：{{ count }}</div>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

在此範例中：

- **`defineProps` 函式**：將 `props` 直接定義於組件內，讓程式碼更簡潔，並能自動適應 TypeScript 等型別檢查工具。
- **資料綁定**：透過 `props.data` 可以在組件中使用傳入的 `data` 資料，並且預設值為空物件 `{}`。

#### 使用 `props` 的最佳實踐

- **定義型別**：對於 `props` 的資料型別，應根據實際資料使用 `Object`、`Array`、`Number` 等具體型別，提升程式碼的自描述性。
- **設置預設值**：使用 `default` 為 `props` 設置預設值，以避免未傳入時造成的錯誤。
- **組件可讀性**：使用 `defineProps` 定義 `props` 時，更加簡潔的語法能提升組件的可讀性，適合大型專案中保持清晰的組件資料流。

這樣的寫法讓子組件在接收 `props` 時更具靈活性，同時使得 Composition API 的程式碼結構更為清晰簡單。

### 5. Ref 與 Reactive 的響應式資料

在 Vue 3 的 Composition API 中，`ref` 和 `reactive` 是實現響應式資料的兩種主要方式。這兩者的用途和行為有一些重要差異，適用於不同的場景。理解它們的特性能幫助開發者更有效地管理元件狀態。

#### Ref 的使用

`ref` 是 Vue 3 提供的用於創建響應式基本資料類型的函式。它能夠包裝數字、字串等基本資料類型，並且讓這些資料在修改時能自動觸發畫面更新。

**範例：使用 `ref` 定義基本響應式資料**

```javascript
<script setup>
import { ref } from "vue";

// 使用 ref 定義響應式變數
const name = ref("Danny");

// 修改 name 的值時，需要通過 .value
const changeName = () => {
  name.value = "Jacky";
  console.log(name.value);  // "Jacky"
};
</script>

<template>
  <div>{{ name }}</div>
  <button @click="changeName">Change Name</button>
</template>
```

在這個範例中：

- **`ref` 的特性**：宣告響應式變數時必須使用 `ref`，並在模板中自動解包，但在程式碼內部必須使用 `.value` 存取和修改值。
- **變數的更新**：每次對 `name` 的值進行修改時，畫面會自動更新。

#### Reactive 與物件響應式

`reactive` 是用來處理物件或陣列等複雜資料類型的響應式函式。它將一個物件或陣列轉換為深層的響應式物件，因此不需要使用 `.value` 來操作物件屬性。

**範例：使用 `reactive` 定義物件響應式資料**

```javascript
<script setup>
import { reactive } from "vue";

// 使用 reactive 定義響應式物件
const person = reactive({
  name: "Danny",
  age: 18,
  address: "台南",
});

// 修改物件的屬性不需要 .value
const updatePerson = () => {
  person.name = "Hello";
  console.log(person.name);  // "Hello"
};
</script>

<template>
  <div>{{ person.name }}</div>
  <div>{{ person.age }}</div>
  <div>{{ person.address }}</div>
  <button @click="updatePerson">Update Person</button>
</template>
```

在這個範例中：

- **`reactive` 的特性**：可以直接將物件的屬性進行修改，不需要透過 `.value` 來操作。
- **畫面更新**：當 `person` 物件的屬性變動時，畫面會即時更新。

#### Ref 與 Reactive 的差異

1. **使用範疇**：
   - `ref` 適合用於單一的基本資料類型（例如數字、字串、布林值等）。
   - `reactive` 更適合複雜的資料類型（例如物件或陣列）。

2. **響應式操作**：
   - `ref` 包裹的變數必須通過 `.value` 存取或賦值。
   - `reactive` 會將物件深層轉換為響應式，操作屬性時不需 `.value`。

### 6. Ref 與 Reactive 的差異

在 Vue 3 中，`ref` 和 `reactive` 是兩種用於建立響應式資料的工具，它們各有優勢且使用場合不同。理解這兩者的區別，能夠幫助我們在開發中選擇合適的響應式方法。本文將詳細介紹 `ref` 和 `reactive` 的特點、使用範例及其差異，並探討 `watch` 在監控 `ref` 和 `reactive` 資料變化時的限制。

#### ref 的特性

`ref` 用於包裝任意類型的值並使其成為響應式。使用 `ref` 包裹的變數需要透過 `.value` 來存取和修改。在模板中直接使用變數名即可，無需 `.value`。

**範例**：以下範例展示了如何使用 `ref` 進行響應式資料綁定並改變值：

```javascript
<script setup>
import { ref } from "vue";

const count = ref(0);  // 定義一個 ref 響應式變數

const increment = () => {
  count.value += 1;  // 使用 count.value 進行變更
};
</script>

<template>
  <div>Count is: {{ count }}</div>
  <button @click="increment">Increment</button>
</template>
```

在這個範例中，`count` 是透過 `ref` 宣告的響應式變數。每次點擊按鈕後，`count.value` 增加，畫面會自動更新。

#### reactive 的特性

`reactive` 適用於物件形式的資料（如物件或陣列）。它會遞迴地將物件的所有屬性轉為響應式，無需 `.value` 來存取或修改。

**範例**：以下展示 `reactive` 包裹物件的使用方法：

```javascript
<script setup>
import { reactive } from "vue";

const person = reactive({
  name: "Danny",
  age: 18,
  address: "台北"
});

// 修改響應式物件屬性
const updateAddress = () => {
  person.address = "台中";
};
</script>

<template>
  <div>Name: {{ person.name }}</div>
  <div>Age: {{ person.age }}</div>
  <div>Address: {{ person.address }}</div>
  <button @click="updateAddress">Change Address</button>
</template>
```

在這裡，`person` 是一個 `reactive` 物件，任何屬性變更都會觸發畫面更新，且無需 `.value` 存取。

#### ref 與 reactive 的差異

- **適用場景**：`ref` 可包裹任何類型，而 `reactive` 僅適用於物件（如物件或陣列）。
- **存取方式**：`ref` 需要使用 `.value` 存取值；而 `reactive` 直接存取屬性。
- **整體覆蓋**：`ref` 可以重新指派值，但 `reactive` 只支援對屬性的變更，無法直接覆蓋整個物件。

#### watch 監控 ref 與 reactive 資料

在 Vue 中，`watch` 可監控 `ref` 資料的變動，但對於 `reactive` 資料，僅能監控整體物件，無法深入監控內部屬性的改變，除非使用 `{ deep: true }` 選項。

**範例**：以下示範了 `watch` 如何監控 `ref` 與 `reactive` 變數的改變。

```javascript
<script setup>
import { reactive, ref, watch } from "vue";

const person1 = ref({ name: "Tom", age: 24 });  // ref 包裹的物件
const person2 = reactive({ name: "Danny", age: 18 });  // reactive 包裹的物件

setTimeout(() => {
  person1.value.name = "Hello";  // 更新 ref 包裹的物件
  person2.name = "Hello";        // 更新 reactive 包裹的物件
}, 2000);

// 監控 ref 包裹的變數
watch(person1, () => {
  console.log("person1 被改變了");
});

// 深度監控 reactive 包裹的物件
watch(person2, () => {
  console.log("person2 被改變了");
}, { deep: true });  // 深度監控
</script>
```

在這個範例中：

- **`watch(person1)`**：直接監控 `ref` 包裹的物件變化。
- **`watch(person2, { deep: true })`**：對 `reactive` 資料進行深層監控，以捕捉其內部屬性的變動。

### ref 與 reactive 的使用選擇

| 使用場合                   | 建議方式                   |
| -------------------------- | -------------------------- |
| 單一值或簡單型別資料       | `ref`                      |
| 複雜物件或多屬性資料       | `reactive`                 |
| 需要監控內部屬性變動的物件 | `reactive`（`deep: true`） |

透過適當選擇 `ref` 與 `reactive`，可以更加靈活地處理響應式資料，提升程式碼的可讀性與易維護性。

### 7. Computed 計算屬性

在 Vue 3 的 Composition API 中，`computed` 是非常實用的功能，尤其當我們需要基於其他響應式資料進行計算或重新組合資料時。`computed` 是一種可以自動更新的計算屬性，當其依賴的響應式資料發生變化時，`computed` 會自動重新計算並返回最新的結果。

#### Computed 的基本用法

使用 `computed` 定義的計算屬性，能自動追蹤其依賴的資料變化，並在任何依賴的資料改變時自動重新計算結果。以下是 `computed` 的基本寫法示例：

```javascript
<script setup>
import { computed, ref } from "vue";

// 定義響應式變數 idx
const idx = ref(0);

// 定義 computed 計算屬性 data
const data = computed(() => {
  return idx.value > 3 ? "這個大於三" : "這個小於三";
});

// 模擬異步變更 idx 值
setTimeout(() => {
  idx.value = 8;
}, 2000);
</script>

<template>
  <div>{{ data }}</div>
</template>
```

在這段程式碼中：

- **響應式變數 `idx`**：使用 `ref` 定義一個響應式變數。
- **計算屬性 `data`**：透過 `computed` 建立一個計算屬性，根據 `idx` 的值決定顯示的文字內容。
- 當 `idx` 值改變時（例如 2 秒後設置為 `8`），`data` 的值也會自動更新，顯示新的文字。

這個範例展示了 `computed` 的基本應用，實現了資料的自動更新，避免手動監控變數並進行操作。

#### Computed 的 Setter 與 Getter

在某些情況下，`computed` 屬性可能不僅需要讀取值，還需要設定值。這時候可以透過定義 `getter` 和 `setter` 來控制計算屬性。以下範例展示了如何在 `computed` 中使用 `getter` 與 `setter` 來控制計算屬性：

```javascript
<script setup>
import { computed, ref } from "vue";

// 定義響應式變數 count
const count = ref(1);

// 定義計算屬性 plusOne，包含 getter 和 setter
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1;
  },
});

// 設定 plusOne 的值
plusOne.value = 10;

console.log(count.value);  // 輸出 9，因為 setter 將 count 的值設為 10 - 1 = 9
</script>

<template>
  <div>{{ plusOne }}</div>
</template>
```

在這個範例中：

- **getter**：當 `plusOne` 被存取時，會返回 `count.value + 1` 的結果。
- **setter**：當設定 `plusOne` 的值時，計算屬性會將 `count.value` 的值設為指定的數值減一。

透過 `computed` 的 `getter` 和 `setter`，可以輕鬆控制計算屬性的邏輯，達到更高的靈活性。

#### Computed 的特性與注意事項

1. **自動更新**：`computed` 的值會根據其依賴的響應式資料自動更新，無需手動監聽變數。
2. **緩存機制**：`computed` 屬性具有內建的緩存功能，只有當依賴的資料變化時才會重新計算，這對性能非常友好。
3. **不可傳遞參數**：`computed` 是靜態計算，無法動態傳遞參數。當需要傳遞參數時，通常使用函式取代 `computed`。

#### 結論

`computed` 是 Vue 3 中不可或缺的計算屬性工具，透過 `computed` 可以輕鬆管理依賴變數的邏輯和更新。無論是單純的計算屬性，還是需要自定義 `getter` 和 `setter` 的場景，`computed` 提供了靈活的方式來組織和優化程式碼。

### 8. 撰寫 Composition API 的最佳實踐

在使用 Vue 3 的 Composition API 時，良好的程式碼結構不僅有助於程式碼的可讀性，還能提升開發效率。Composition API 的靈活性允許開發者在 `setup` 函式內自由撰寫函式，但為了維持程式碼的清晰與可維護性，推薦按照一定的順序來組織程式碼。

#### Composition API 的最佳撰寫順序

建議遵循以下順序撰寫程式碼，以保持一致性與可讀性：

1. **官方引入的函式**：如 `ref`、`computed`、`onMounted` 等 Vue 官方提供的函式。
2. **自訂變數**：使用 `ref` 和 `reactive` 定義的響應式變數。
3. **Computed 計算屬性**：放置 `computed` 定義的計算屬性，以提升程式碼邏輯的可讀性。
4. **自訂函式**：撰寫自訂的函式，用於處理資料或業務邏輯。
5. **Watch 監聽**：使用 `watch` 監聽響應式變數的變化。
6. **生命週期函式**：按照生命週期順序，如 `onMounted`、`onUnmounted` 等。

#### 簡單範例：最佳實踐順序的範例程式碼

以下範例展示了以 Composition API 建立的計數器元件，並按照推薦的程式碼結構順序進行組織：

```javascript
<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

// 1. 官方引入的函式
const router = useRouter();  // 可選，若使用 Vue Router

// 2. 自訂變數
const name = ref("Danny");
const count = ref(0);

// 3. Computed 計算屬性
const doubleCount = computed(() => count.value * 2);  // 計算雙倍的 count

// 4. 自訂函式
const increment = () => {
  count.value += 1;
};

const changeName = () => {
  name.value = "Jacky";
  console.log(name.value);
};

// 5. Watch 監聽
watch(count, (newVal, oldVal) => {
  console.log(`計數從 ${oldVal} 變為 ${newVal}`);
});

// 6. 依照生命週期的順序：onMounted
onMounted(() => {
  console.log("組件已掛載，初始計數為", count.value);
});

// 7. 依照生命週期的順序：onUnmounted
onUnmounted(() => {
  console.log("組件已卸載");
});
</script>

<template>
  <div>目前名稱：{{ name }}</div>
  <div>計數：{{ count }}</div>
  <div>雙倍計數：{{ doubleCount }}</div>
  <button @click="increment">增加計數</button>
  <button @click="changeName">改變名稱</button>
</template>
```

在這個範例中：

- **官方引入的函式**：首先引入 Vue 的官方函式，這樣開發者可以一眼看到所需的核心功能。
- **自訂變數**：定義元件內的基本響應式變數 `name` 和 `count`。
- **Computed 計算屬性**：使用 `computed` 定義 `doubleCount`，自動計算 `count` 的雙倍。
- **自訂函式**：包含 `increment` 和 `changeName` 兩個函式，分別負責計數增加和名稱變更。
- **Watch 監聽**：使用 `watch` 監聽 `count` 的變化，並在每次變化時記錄新舊值。
- **生命週期函式**：在 `onMounted` 和 `onUnmounted` 中加入初始和清理的邏輯。

這種結構使程式碼邏輯更加有條理，避免了不同功能互相混雜，便於維護和閱讀。尤其是在大型專案中，這樣的組織方式能有效減少溝通成本，提高開發效率。


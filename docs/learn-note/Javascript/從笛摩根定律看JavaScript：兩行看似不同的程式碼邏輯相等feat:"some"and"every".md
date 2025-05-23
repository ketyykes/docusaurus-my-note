---
sidebar_position: 1
title: 從笛摩根定律看 JavaScript：兩行看似不同的程式碼邏輯相等 feat:some 和 every
description: 透過笛摩根定律深入理解 JavaScript 中 some() 和 every() 方法的邏輯等價性，並探討如何運用數學邏輯來優化程式碼的寫法
tags:
  - javascript
last_update:
  date: 2025-05-13
  author: Danny
---

## 程式碼比較

在 JavaScript 中，經常需要判斷一個陣列（`targetArray`）中的元素，是否都存在於另一個陣列（`baseArray`）當中。常見的做法有兩種寫法：

```javascript
// 寫法 A：只要 targetArray 中「有一個」元素不在 baseArray 中就回傳 true
targetArray.some(item => !baseArray.includes(item));

// 寫法 B：「並非」targetArray 的「每個」元素都出現在 baseArray
!targetArray.every(item => baseArray.includes(item));
```

乍看之下，這兩段邏輯可能會讓人猶豫一下，但結論非常明確：

> **這兩段程式碼的邏輯是完全等價的。**

## 為什麼這兩段邏輯等價？

從數學邏輯的角度來說，這兩個敘述分別對應以下形式：

* **寫法 A**：存在某個元素 (`∃x`)，這個元素不滿足某條件 (`¬P(x)`)。
* **寫法 B**：並非每個元素 (`¬∀x`) 都滿足某條件 (`P(x)`)。

透過數學邏輯的觀點，我們可以更清楚地理解為什麼這兩段程式碼會完全一致。

## 數學邏輯推導

要理解這種等價，關鍵在於德摩根定律（De Morgan’s Law）。讓我們從最基本的命題邏輯開始：

| 說明                                         | 公式                 |
| -------------------------------------------- | -------------------- |
| 否定「A **且** B」 =「否定 A **或** 否定 B」 | ¬(A ∧ B) ⇔ (¬A ∨ ¬B) |
| 否定「A **或** B」 =「否定 A **且** 否定 B」 | ¬(A ∨ B) ⇔ (¬A ∧ ¬B) |

將這個概念延伸至無限多個元素的情況：

* `∀x P(x)` 表示每個元素都滿足條件 P，類似於無限個 AND。
* `∃x ¬P(x)` 表示存在某個元素不滿足條件 P，類似於無限個 OR。

因此我們有：

```
¬∀x P(x) ⇔ ∃x ¬P(x)
```

### 直觀理解範例

生活中的例子讓我們更清楚：

> 「不是所有水果都是蘋果」 ⇔ 「有一種水果不是蘋果」

兩個說法在直覺上即完全相同。

## 邊界情況：空陣列

空陣列是特別容易忽略的邊界條件。

* `targetArray.some(...)` 在空陣列時，由於沒有元素滿足條件，直接回傳 `false`。
* `targetArray.every(...)` 在空陣列時，由於「空集合的全稱命題」為真（vacuous truth），會回傳 `true`。但因為外面有個否定符號 (`!`)，因此整體結果仍然為 `false`。

兩種方法在邊界條件的處理上仍然一致。

## 效能特性：短路行為

JavaScript 的陣列方法 `some` 與 `every` 都具有短路（short-circuit）特性：

* `some` 會在找到第一個符合條件的元素後就停止。
* `every` 會在找到第一個不符合條件的元素後就停止。

因此兩者的效能特性幾乎完全相同，不用特別考慮效能上的差異。


## 實際程式碼示範

以下是簡單的實際範例：

```javascript
const baseArray = [1, 2, 3];
const targetArray = [2, 4];

const diffBySome = targetArray.some(item => !baseArray.includes(item)); // true
const diffByEvery = !targetArray.every(item => baseArray.includes(item)); // true

console.log(diffBySome === diffByEvery); // 輸出 true
```

兩個方法都正確地檢查出 `targetArray` 有元素不在 `baseArray` 中，並且回傳一致的結果。

## 總結

透過上述層層推導，我們看到 JavaScript 中的 `some` 和 `every` 方法在邏輯判斷上的微妙關係。無論你選擇哪種寫法，結果和效能都是完全一致的，因此，選擇適合團隊理解的方式才是最佳策略。只要牢記德摩根定律，你便能清楚掌握這兩種寫法背後的數學與邏輯原理，寫出更清晰、更好理解的程式碼。

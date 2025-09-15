---
sidebar_position: 1
title: prefers-color-scheme：讓網站自動適應系統深淺色模式的完整指南
description: 完整解析 prefers-color-scheme CSS 媒體查詢的使用方法，包含基礎語法、瀏覽器支援、實戰範例與常見問題解答，讓您的網站能夠自動適應使用者的系統深淺色模式偏好
tags:
  - css
last_update:
  date: 2025-08-25
  author: Danny
---

在講解 <span class="mycode">prefers-color-scheme</span> 之前，我們先想想這個問題：為什麼現在越來越多網站都開始支援深淺色模式的自動切換？根據使用者體驗設計的發展趨勢，<span class="red">自適應的介面設計已經成為現代 Web 開發的必備技能</span>。

本篇文章將會涵蓋以下重點：

- 什麼是 <span class="mycode">prefers-color-scheme</span> 以及它如何運作
- 基本語法與實作方式
- 瀏覽器支援情況與相容性考量
- 完整的實戰演練，從程式碼到實際測試
- 常見問題與解決方案

## 什麼是 prefers-color-scheme？

<span class="mycode">prefers-color-scheme</span> 是一個 CSS 媒體查詢（Media Query），<span class="red">專門用來偵測使用者作業系統的配色方案偏好</span>。換句話說，它可以讓我們的網站自動判斷使用者是偏好淺色模式還是深色模式，並且相應地調整網站的樣式。

<span class="blue">值得一提的是，這個功能讓網站能夠與使用者的系統設定保持一致，提供更舒適且無縫的使用體驗</span>。

## 基礎語法：如何使用 prefers-color-scheme？

接下來我們來看看 <span class="mycode">prefers-color-scheme</span> 的基本語法。<span class="green">建議先從簡單的範例開始理解，再逐步深入</span>：

```css
/* 深色模式樣式 */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #121212; /* 深色背景 */
    color: #ffffff;            /* 白色文字 */
  }
}

/* 淺色模式樣式 */
@media (prefers-color-scheme: light) {
  body {
    background-color: #ffffff; /* 白色背景 */
    color: #000000;            /* 黑色文字 */
  }
}
```

### prefers-color-scheme 有哪些可用值？

我們可以使用以下三個值來偵測不同的使用者偏好：

- <span class="mycode">light</span>：<span class="blue">當使用者的作業系統設定為淺色模式時觸發</span>
- <span class="mycode">dark</span>：<span class="blue">當使用者的作業系統設定為深色模式時觸發</span>
- <span class="mycode">no-preference</span>：<span class="blue">使用者沒有設定特定偏好，通常會回到預設樣式</span>

### 為什麼要使用 prefers-color-scheme？

根據現代 Web 開發的最佳實務，使用 <span class="mycode">prefers-color-scheme</span> 有以下幾個優點：

1. **自動適應使用者習慣**：<span class="red">網站會根據使用者裝置（如 macOS、Windows、Android 或 iOS）的系統設定自動調整配色</span>
2. **無需額外 JavaScript**：<span class="green">使用純 CSS 即可實現主題切換，減少程式碼複雜度和載入時間</span>
3. **提升使用體驗**：提供與系統一致的視覺體驗

## 瀏覽器支援情況如何？

<span class="red">prefers-color-scheme 在現代瀏覽器中有著良好的支援度</span>：

- ✅ Chrome 76+
- ✅ Firefox 67+
- ✅ Safari 12.1+
- ✅ Edge 79+
- ✅ 大多數現代行動裝置

<span class="blue">這意味著我們可以放心地在生產環境中使用這個功能</span>。對於不支援的舊版瀏覽器，我們的網站會正常顯示預設樣式，不會有任何問題。

## 實戰演練：完整範例與測試

現在讓我們透過實際的程式碼來體驗 <span class="mycode">prefers-color-scheme</span> 的效果。<span class="green">建議跟著下面的步驟一起操作，這樣可以更深刻理解它的運作方式</span>。

### 步驟一：建立基本的 HTML 範例

我們先建立一個簡單但完整的測試頁面：

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>prefers-color-scheme 測試頁面</title>
    <style>
      body {
          /* 預設樣式（淺色模式） */
          background-color: white;
          color: black;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 2rem;
          transition: all 0.3s ease; /* 平滑過渡效果 */
      }
      
      /* 當系統偏好深色模式時啟用 */
      @media (prefers-color-scheme: dark) {
          body {
              background-color: #1a1a1a; /* 深色背景 */
              color: #f0f0f0;             /* 淺色文字 */
          }
      }
      
      h1 {
          border-bottom: 2px solid currentColor;
          padding-bottom: 0.5rem;
      }
    </style>
  </head>
  <body>
      <h1>prefers-color-scheme 測試</h1>
      <p>這個頁面會根據你的系統設定自動切換深淺色模式！</p>
      <p>試著更改你的作業系統外觀設定，看看頁面會有什麼變化。</p>
  </body>
</html>
```

<span class="blue">這邊的程式碼加入了 transition 屬性，讓色彩切換時有平滑的過渡效果，提升使用體驗</span>。

### 步驟二：理解一個重要的觀念 - 什麼是「系統設定」？

在開始測試之前，<span class="red">需要特別注意的是：prefers-color-scheme 偵測的是「作業系統的設定」，不是「瀏覽器的設定」</span>。

換句話說，即使你在 Chrome 或其他瀏覽器中設定了淺色模式，但<span class="blue">如果作業系統是深色模式，網站仍然會顯示深色模式</span>。

讓我們用一個實驗來驗證這個觀念：

#### 實驗 A：當作業系統設為深色模式時

假設你的作業系統是深色模式，就算你在 Chrome 中設定為淺色主題：

![image](https://hackmd.io/_uploads/SJZAoektke.png)

<span class="red">結果仍然沒有作用！</span>這是因為 <span class="mycode">prefers-color-scheme</span> 只讀取作業系統的設定，不是瀏覽器的設定。

所以網頁仍然顯示深色背景：

![image](https://hackmd.io/_uploads/r18yRlJYkg.png)

<span class="blue">這個特性的設計目的是為了讓網站能夠與使用者的整體系統外觀保持一致</span>。

#### 實驗 B：正確的做法 - 更改作業系統設定

現在讓我們做正確的操作：<span class="red">在作業系統的設定中更改外觀設定</span>。

以 macOS 為例，我們需要在「系統偏好設定」中更改外觀設定：

![image](https://hackmd.io/_uploads/Hyg8AxJKyg.png)

<span class="green">對於 Windows 使用者，可以在「設定」→「個人化」→「色彩」中修改預設應用程式模式</span>。

#### 驗證結果

當我們將作業系統設定更改為淺色模式後，再次檢視我們的網頁：

![image](https://hackmd.io/_uploads/B1FFReJtye.png)

<span class="green">太棒了！網頁成功地變成了淺色背景</span>。這證明了 <span class="mycode">prefers-color-scheme</span> 確實正在偵測作業系統的設定。


## 常見問題與解答

### Q1：為什麼我的網站沒有自動切換模式？

<span class="red">最常見的問題就是沒有在作業系統層級更改設定</span>。記住，<span class="mycode">prefers-color-scheme</span> 偵測的是作業系統設定，不是瀏覽器設定。

### Q2：我可以在 JavaScript 中使用這個功能嗎？

當然可以！你可以使用 <span class="mycode">window.matchMedia</span> 來在 JavaScript 中檢測使用者的顏色偏好：

```javascript
// 檢測是否為深色模式
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
console.log('使用者偏好深色模式：', isDarkMode);

// 監聽變化
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    console.log('變更為深色模式：', e.matches);
  });
```

## 總結

透過本文的學習，我們了解了：

1. <span class="mycode">prefers-color-scheme</span> 是一個強大的 CSS 媒體查詢
2. 它<span class="red">偵測的是作業系統設定，不是瀏覽器設定</span>
3. 現代瀏覽器對它有著良好的支援
4. 使用純 CSS 即可實現，無需 JavaScript

> 參考資料
> 
> [MDN - prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
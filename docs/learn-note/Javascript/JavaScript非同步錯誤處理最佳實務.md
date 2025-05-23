---
sidebar_position: 1
title: JavaScript 非同步錯誤處理最佳實務
description: 探討 JavaScript 中非同步 API 呼叫的錯誤處理最佳實踐，以 Axios 為例說明如何正確使用 throw 與 catch 機制，避免常見的錯誤處理陷阱
tags:
  - javascript
last_update:
  date: 2025-05-14
  author: Danny
---

在 JavaScript 中，使用非同步函式處理 API 呼叫時，如何正確處理錯誤是一個重要課題。常見的情境是透過 Axios 套件發送 API 請求，若 API 回傳錯誤（例如 HTTP 狀態碼為 400 或 500），我們必須適當處理以避免造成應用程式意外。

## 錯誤處理的常見問題

以一個新增項目的函式為例，原始函式可能這樣寫：

```javascript
const addItem = async (item) => {
  try {
    const response = await addItemRoute(item)
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error)
      return error
    } else {
      return error 
    }
  }
}
```

這樣的設計雖然能捕捉 API 錯誤，但外部呼叫這個函式時，將無法透過 `catch` 捕捉內部錯誤，因為錯誤是透過 `return` 回傳，而非使用 `throw` 拋出。

## 範例說明：為何外部 catch 無法捕捉

以下是一個使用這個函式的實例，展示為什麼外部 `catch` 無法捕捉到錯誤：

```javascript
const handleAddItem = async () => {
  const newItem = {
    name: '新項目',
    quantity: 5,
  }

  try {
    const result = await addItem(newItem)

    if (result instanceof Error) {
      // 新增失敗的時候會在這裡印出來而不是在 catch 段印出
      console.warn('新增失敗：', result.message)
    } else {
      console.log('新增成功：', result)
    }
  } catch (e) {
    // 此 catch 不會觸發
    console.error('這裡永遠不會被呼叫，因為 addItem 沒有 throw')
  }
}

handleAddItem()
```

## 建議改寫方式：使用 throw 處理錯誤

如上述範例所示，若我們希望外部的錯誤捕捉機制能正常運作，建議改寫原始函式，使用 `throw` 來拋出錯誤：

```javascript
const addItem = async (item) => {
  try {
    const response = await addItemRoute(item)
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error)
      throw new Error(error.response?.data?.message || '新增項目失敗')
    } else {
      throw error
    }
  }
}
```

經過改寫後，外部呼叫函式時就能透過 `catch` 捕捉並處理錯誤，更符合一般的錯誤處理直覺與實務上的需求。這種方式不僅使程式碼更清晰，也提升了錯誤處理的一致性與可靠性，對於維護與除錯更具優勢。

## 改寫後的範例示範

以下是使用改寫後函式的實例，可以看到外部的 `catch` 已經能正確捕捉錯誤了：

```javascript
const handleAddItem = async () => {
  const newItem = {
    name: '新項目',
    quantity: 5,
  }

  try {
    const result = await addItem(newItem)
    console.log('新增成功：', result)
  } catch (e) {
    // 這裡現在能正確捕捉到錯誤
    console.error('新增失敗：', e.message)
  }
}

handleAddItem()
```

這樣的改寫，使整個錯誤處理流程更直觀且清晰。

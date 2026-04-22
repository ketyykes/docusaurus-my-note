---
sidebar_position: 1
title: Vue.js 伺服器狀態管理的革命：從 Pinia 到 TanStack Query
description: 探討傳統 Vue.js + Pinia 方案在處理伺服器狀態時的痛點，並介紹 TanStack Query（Vue Query）如何帶來更優雅的解決方案，內含整合設定、Mutation、Polling、快取策略與最佳實踐範例。
tags:
  - Vue
  - TanStack Query
  - Vue Query
last_update:
  date: 2025-08-18
  author: Danny
---

# Vue.js 伺服器狀態管理的革命：從 Pinia 到 TanStack Query

## 引言

在現代前端開發中，狀態管理一直是核心議題。我們通常會將狀態分為兩大類：**客戶端狀態**（如 UI 狀態、表單狀態）和**伺服器狀態**（如 API 資料、資料庫內容）。雖然 Vue.js 生態系統提供了優秀的狀態管理方案如 Pinia，但在處理伺服器狀態時，開發者們經常面臨許多挑戰。

本文將探討傳統 Vue.js + Pinia 方案在處理伺服器資料時的痛點，並介紹 TanStack Query 如何優雅地解決這些問題，為 Vue.js 開發者帶來更好的伺服器狀態管理體驗。

## 傳統 Vue.js + Pinia 方案的挑戰

### 現有開發模式的問題

以往我們打 API 將 API 資料放到 Pinia，然後在每個元件拿到 Pinia 的資料後渲染。這種傳統模式看似簡單，但實際上存在許多問題：

```javascript
// 傳統 Pinia Store 範例
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('/api/users')
      users.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { users, loading, error, fetchUsers }
})
```

### 主要問題分析

1. **資料同步問題**：當伺服器資料更新時，頁面上的資料可能與伺服器不同步，需要手動重新獲取
2. **錯誤處理複雜**：每個 API 呼叫都需要自行撰寫錯誤處理邏輯
3. **重試機制缺失**：失敗時的重試需要自行實作，容易造成程式碼不一致
4. **快取管理困難**：需要手動管理資料的新鮮度和快取策略
5. **載入狀態管理**：每個請求都需要手動管理 loading 狀態
6. **重複請求問題**：同時發送多個相同請求時缺乏去重機制

## TanStack Query 簡介

### 什麼是 TanStack Query

TanStack Query（最早期發展於 React Query）是一個強大的資料獲取函式庫，它提出了**伺服器狀態**的概念。我們都知道前端的核心概念脫離不了狀態的觀念，TanStack Query 專門針對伺服器狀態管理進行了最佳化，並且完美解決了上述傳統方案的問題。

### 核心概念

TanStack Query 將伺服器狀態視為一種特殊的狀態類型，具有以下特徵：
- **異步性**：資料獲取是異步的
- **可變性**：伺服器端資料可能隨時改變
- **共享性**：多個元件可能需要相同的資料
- **過時性**：本地快取的資料可能過時

## TanStack Query 解決的核心問題

### 智慧資料管理

TanStack Query 解決以下幾個核心問題：

1. **智慧資料獲取**：自動處理請求的生命週期
2. **強大的快取系統**：基於 query key 的智慧快取
3. **自動同步機制**：支援背景重新獲取和視窗焦點重新獲取
4. **內建錯誤處理**：統一的錯誤處理機制
5. **自動重試**：可配置的重試策略
6. **分頁支援**：內建分頁和無限滾動功能

## Vue 與 TanStack Query 整合

### 安裝和設定

首先安裝必要的套件：

```bash
npm install @tanstack/vue-query
# 開發工具（推薦）
npm install @tanstack/vue-query-devtools
```

### 基本設定

```javascript
// main.js
import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'

const app = createApp(App)

app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 3,
        staleTime: 5 * 60 * 1000, // 5 分鐘
      },
    },
  },
})

app.mount('#app')
```

### TanStack Query DevTools

開發時加入 DevTools 可以大幅提升除錯效率：

```vue
<template>
  <div id="app">
    <router-view />
    <!-- 開發環境下顯示 DevTools -->
    <VueQueryDevtools v-if="isDev" />
  </div>
</template>

<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const isDev = process.env.NODE_ENV === 'development'
</script>
```

### 基本使用方式

```vue
<template>
  <div>
    <div v-if="isLoading">載入中...</div>
    <div v-else-if="error">錯誤：{{ error.message }}</div>
    <div v-else>
      <div v-for="user in data" :key="user.id">
        {{ user.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'

const fetchUsers = async () => {
  const response = await fetch('/api/users')
  if (!response.ok) {
    throw new Error('網路錯誤')
  }
  return response.json()
}

const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})
</script>
```

### 與傳統方案的對比

```javascript
// 傳統 Pinia 方式
const store = useUserStore()
await store.fetchUsers() // 需要手動呼叫
if (store.error) {
  // 手動錯誤處理
}

// TanStack Query 方式
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})
// 自動處理載入狀態、錯誤和快取
```

## 實際應用範例

### 資料獲取

```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'

const fetchUser = async (id) => {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

const { data: user, isLoading, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId, // 只有當 userId 存在時才執行
})
</script>
```

### 資料變更（Mutations）

```vue
<script setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()

const updateUser = async (userData) => {
  const response = await fetch(`/api/users/${userData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  return response.json()
}

const { mutate: updateUserMutation, isPending: isUpdating } = useMutation({
  mutationFn: updateUser,
  onSuccess: () => {
    // 更新成功後重新獲取使用者列表
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})

const handleUpdate = (userData) => {
  updateUserMutation(userData)
}
</script>
```

> **v5 版本注意事項**
> - TanStack Query v5 起，`useMutation` 回傳的 `isLoading` 已更名為 `isPending`；若仍使用 v4，請維持 `isLoading`。
> - v5 的 `invalidateQueries` 只接受物件參數 `{ queryKey: [...] }`，不再接受直接傳入陣列的舊寫法。
> - 補充：`useQuery` 在 v5 仍保留 `isLoading`（代表「首次載入中且尚未有資料」），與 mutation 的命名變更無關。

### 錯誤處理

```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'

const { data, error, isError } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  retry: (failureCount, error) => {
    // 自訂重試邏輯
    if (error.status === 404) return false
    return failureCount < 3
  },
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
})
</script>
```

### Polling 輪詢實現

```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

const isPollingEnabled = ref(true)

const { data: realTimeData } = useQuery({
  queryKey: ['realtime-data'],
  queryFn: fetchRealTimeData,
  refetchInterval: isPollingEnabled.value ? 5000 : false, // 每 5 秒輪詢一次
  refetchIntervalInBackground: true, // 背景也繼續輪詢
})

// 動態控制輪詢
const togglePolling = () => {
  isPollingEnabled.value = !isPollingEnabled.value
}
</script>

<template>
  <div>
    <button @click="togglePolling">
      {{ isPollingEnabled ? '停止' : '開始' }}即時更新
    </button>
    <div>{{ realTimeData }}</div>
  </div>
</template>
```

### 載入狀態管理

```vue
<script setup>
import { useIsFetching, useIsMutating } from '@tanstack/vue-query'

// 全域載入狀態
const isFetching = useIsFetching()
const isMutating = useIsMutating()

const isGlobalLoading = computed(() => isFetching.value > 0 || isMutating.value > 0)
</script>

<template>
  <div class="loading-indicator" v-if="isGlobalLoading">
    系統處理中...
  </div>
</template>
```

## 最佳實踐和使用建議

### Query Key 設計原則

```javascript
// ✅ 良好的 Query Key 設計
const userQueries = {
  all: () => ['users'],
  lists: () => [...userQueries.all(), 'list'],
  list: (filters) => [...userQueries.lists(), filters],
  details: () => [...userQueries.all(), 'detail'],
  detail: (id) => [...userQueries.details(), id],
}

// 使用範例
useQuery({
  queryKey: userQueries.detail(userId),
  queryFn: () => fetchUser(userId),
})
```

### 快取策略建議

```javascript
// 針對不同類型資料的快取策略
const queryOptions = {
  // 靜態資料：長時間快取
  staticData: {
    staleTime: 10 * 60 * 1000, // 10 分鐘
    cacheTime: 30 * 60 * 1000, // 30 分鐘
  },
  
  // 即時資料：短時間快取
  realTimeData: {
    staleTime: 0, // 立即過時
    cacheTime: 1 * 60 * 1000, // 1 分鐘
    refetchInterval: 5000, // 5 秒輪詢
  },
  
  // 使用者資料：中等快取
  userData: {
    staleTime: 5 * 60 * 1000, // 5 分鐘
    cacheTime: 15 * 60 * 1000, // 15 分鐘
  },
}
```

### 錯誤處理最佳實踐

```javascript
// 全域錯誤處理
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          // 根據錯誤類型決定是否重試
          if (error.status >= 400 && error.status < 500) {
            return false // 客戶端錯誤不重試
          }
          return failureCount < 3
        },
        onError: (error) => {
          // 全域錯誤通知
          console.error('Query Error:', error)
          // 可以整合 toast 通知系統
        },
      },
      mutations: {
        onError: (error) => {
          console.error('Mutation Error:', error)
        },
      },
    },
  },
})
```

### 效能優化技巧

1. **適當使用 enabled 選項**：避免不必要的請求

```javascript
const { data: userDetails } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUserDetails(userId),
  enabled: !!userId && isAuthenticated.value,
})
```

2. **使用 select 選項優化重新渲染**：

```javascript
const { data: userName } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  select: (user) => user.name, // 只有 name 改變時才重新渲染
})
```

3. **預載入關鍵資料**：

```javascript
// 在路由導航時預載入資料
const queryClient = useQueryClient()

router.beforeEach((to) => {
  if (to.name === 'user-detail') {
    queryClient.prefetchQuery({
      queryKey: ['user', to.params.id],
      queryFn: () => fetchUser(to.params.id),
    })
  }
})
```

### 專案架構建議

```
src/
├── api/
│   ├── users.js          # API 函數
│   └── index.js
├── queries/
│   ├── userQueries.js    # Query 配置
│   └── index.js
├── components/
└── composables/
    └── useUsers.js       # 自訂 hooks
```

```javascript
// composables/useUsers.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { userApi } from '@/api/users'

export function useUsers() {
  const queryClient = useQueryClient()

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
  })

  const createUserMutation = useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return {
    users: usersQuery.data,
    isLoading: usersQuery.isLoading,
    createUser: createUserMutation.mutate,
    isCreating: createUserMutation.isPending,
  }
}
```

## 結論

### TanStack Query 的優勢總結

TanStack Query 為 Vue.js 開發者帶來了革命性的伺服器狀態管理體驗：

1. **開發效率提升**：減少樣板程式碼，專注於業務邏輯
2. **更好的使用者體驗**：智慧快取和背景更新確保資料即時性
3. **強健的錯誤處理**：內建重試機制和錯誤恢復
4. **優秀的效能**：請求去重、智慧快取減少不必要的網路請求
5. **優秀的開發者體驗**：DevTools 提供強大的除錯能力

### 適用場景分析

**適合使用 TanStack Query 的場景：**

- 資料驅動的應用程式
- 需要即時資料同步
- 複雜的資料關聯和依賴

**繼續使用傳統方案的場景：**
- 簡單的靜態網站
- 極少 API 互動的應用

### 遷移建議

對於現有專案，建議採用新功能使用 TanStack Query 的 漸進式遷移策略



TanStack Query 不僅解決了傳統 Vue.js 伺服器狀態管理的痛點，更為開發者提供了現代化、高效率的開發體驗。隨著應用程式複雜度的增加，它將成為 Vue.js 專案中不可或缺的重要工具。



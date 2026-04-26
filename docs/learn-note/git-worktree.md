---
title: Git Worktree 簡易教學：同時操作多個分支的利器
description: 學習使用 git worktree 在同一個儲存庫中同時開啟多個工作目錄，不需要來回切換分支或 clone 多份 repo，提升多工開發效率。
tags:
  - Git
last_update:
  date: 2026-04-26
  author: Danny
---

# Git Worktree 簡易教學

## 什麼是 Git Worktree？

`git worktree` 讓你在同一個 Git 儲存庫中，**同時開啟多個工作目錄**，每個目錄可以切到不同的分支。這樣你就不需要來回 `git checkout` 或 `git stash`，也不用把整個 repo clone 好幾份。

### 使用情境

- 在開發新功能的同時，需要切回 `main` 修 bug
- 想同時比較兩個分支的程式碼
- 跑測試時不想中斷目前的開發工作

## 前置準備

```bash
mkdir myrepo1       # 建立一個名為 myrepo1 的資料夾
cd myrepo1          # 進入 myrepo1 資料夾
git init            # 將目前資料夾初始化為 Git 儲存庫
```

```bash
echo "hello world" > "hello world.txt"   # 建立 hello world.txt 並寫入內容 "hello world"
git add .                                 # 將所有變更加入暫存區（staging area）
git commit -m "hello world"              # 提交暫存區的變更，附上訊息 "hello world"
```

## 建立分支

```bash
git branch feature   # 從目前所在的 commit 建立一個名為 feature 的新分支
```

## 使用 Git Worktree

### 新增 Worktree

```bash
# 語法：git worktree add <路徑> <分支名稱>
git worktree add ../myrepo2 main   # 在上層目錄建立 myrepo2 資料夾，並將其連結到 main 分支
```

執行後，資料夾結構會變成：

```
git-worktree-practice/
├── myrepo1/          ← feature 分支（原本的工作目錄）
│   └── hello world.txt
└── myrepo2/          ← main 分支（透過 worktree 建立）
    └── hello world.txt
```

兩個資料夾共用同一個 `.git` 儲存庫，但各自對應不同的分支。

### 在不同 Worktree 中各自作業

```bash
cd ../myrepo2                              # 切換到 myrepo2 資料夾（main 分支的 worktree）
echo "hello world main" > "hello world.txt" # 將檔案內容修改為 "hello world main"
git add .                                   # 將變更加入暫存區
git commit -m "更新 hello world.txt 檔案內容，將 \"hello world\" 修改為 \"hello world main\""  # 提交變更並附上說明訊息
```

此時 `myrepo1`（feature 分支）的檔案內容不受影響，仍然是 `hello world`。

### 查看所有 Worktree

```bash
git worktree list   # 列出目前所有的 worktree 及其對應的分支
```

輸出範例：

```
/path/to/myrepo1  2bbe9dc [feature]
/path/to/myrepo2  ebe872c [main]
```

### 移除 Worktree

當你不再需要額外的工作目錄時：

```bash
cd ../myrepo1                      # 先切回主要的工作目錄
git worktree remove ../myrepo2     # 移除 myrepo2 這個 worktree（會同時刪除資料夾）
```

或者手動刪除資料夾後執行清理：

```bash
rm -rf ../myrepo2      # 手動刪除 myrepo2 資料夾
git worktree prune     # 清理 Git 中已失效的 worktree 參照記錄
```

## 常用指令整理

| 指令 | 說明 |
|------|------|
| `git worktree add <路徑> <分支>` | 建立新的 worktree |
| `git worktree list` | 列出所有 worktree |
| `git worktree remove <路徑>` | 移除指定的 worktree |
| `git worktree prune` | 清理已刪除的 worktree 記錄 |
| `git worktree move <舊路徑> <新路徑>` | 搬移 worktree 位置 |

## 注意事項

- **同一個分支不能同時被兩個 worktree 使用**。如果 `main` 已經在某個 worktree 開啟，另一個 worktree 就不能再切到 `main`。
- 所有 worktree 共用同一個 `.git` 儲存庫，所以 commit、branch、stash 等資料都是共享的。
- 刪除 worktree 資料夾後，記得執行 `git worktree prune` 來清除殘留的記錄。
- 建議將 worktree 建立在原本 repo 的**外面**或**旁邊**，避免路徑混亂。

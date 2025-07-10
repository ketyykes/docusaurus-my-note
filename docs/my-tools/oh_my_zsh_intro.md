---
title: Oh My Zsh 介紹（內含 git 和 docker 指令縮寫)
sidebar_position: 2
description: 介紹 Oh My Zsh 這個強大的終端機工具框架，讓你的指令操作更高效，並提供 Git 和 Docker 的常用縮寫指令，省時又方便！
tags:
  - tool
last_update:
  date: 2025-07-10
  author: Danny
---

# Oh My Zsh 介紹：讓你的終端機變身超級英雄！

嘿，朋友！有沒有覺得終端機操作起來有點像在開一台老爺車？功能是有了，但總覺得少了點**酷炫**和**效率**？今天我要跟你介紹一個神器——**Oh My Zsh**，它就像是給你的終端機裝上了一套火箭引擎，讓你操作起來又快又爽，還能秀出自己的個性！

## 什麼是 Oh My Zsh？

簡單來說，Oh My Zsh 是一個基於 **Zsh**（Z Shell）的開源框架。Zsh 本身就是一個比 Bash 更強大的殼層，而 Oh My Zsh 則是幫你把 Zsh 的潛力發揮到極致。它提供了超多預設的**外掛**（plugins）、**主題**（themes）和**快捷指令**，讓你的終端機不僅好用，還能變得好看！

想像一下，原本你可能要敲一堆指令才能完成的事，現在只要幾個縮寫就能搞定；而且，終端機的提示符（prompt）還能顯示當前的 Git 分支狀態，甚至變成彩虹色！是不是聽起來就很心動？

## 為什麼要用 Oh My Zsh？

- **超多外掛：** 從 Git、Docker 到各種程式語言的自動補全，應有盡有。
- **主題自訂：** 上百種終端機主題，讓你的提示符美到不行。
- **聰明補全：** 指令、路徑、參數通通幫你補齊，少打好多字。
- **社群支援：** 全球開發者都在用，遇到問題隨手一查就有解。

## 如何安裝 Oh My Zsh？

在 macOS 或 Linux 上安裝 Oh My Zsh 超簡單，只要一行指令就能搞定！打開你的終端機，輸入以下指令：

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

安裝完成後，Oh My Zsh 會自動把 Zsh 設為你的預設殼層，並建立一個設定檔 `~/.zshrc`，你可以透過這個檔案自訂外掛和主題。

## 基本設定：讓 Oh My Zsh 更貼心

安裝好後，記得打開 `~/.zshrc` 檔案，裡面有幾個地方可以調整：

1. **選擇主題：** 找到 `ZSH_THEME` 這行，改成你喜歡的主題名稱，例如 `ZSH_THEME="agnoster"`（這是一個超受歡迎的主題，會顯示 Git 狀態）。
2. **啟用外掛：** 找到 `plugins=(git)` 這行，加入你需要的外掛，例如 `plugins=(git docker zsh-autosuggestions)`。
3. **套用設定：** 修改完後，執行 `source ~/.zshrc` 讓設定生效。

## Oh My Zsh 的 Git 和 Docker 縮寫指令：效率翻倍！

有了 Oh My Zsh，你可以透過預設的外掛和自訂別名（alias），把常用的 Git 和 Docker 指令縮短到幾個字母，省下大把時間。下面是我整理的一些常用縮寫指令，讓你操作起來像飛一樣快！

## docker 相關

### 🛠️ 建構與映像檔相關

| **別名** | **指令**                | **說明**                  |
| -------- | ----------------------- | ------------------------- |
| `dbl`    | `docker build`          | 建構 Docker 映像檔        |
| `dib`    | `docker image build`    | 同上，使用 `image` 子命令 |
| `dii`    | `docker image inspect`  | 查看映像檔詳細資訊        |
| `dils`   | `docker image ls`       | 列出所有映像檔            |
| `dirm`   | `docker image rm`       | 移除映像檔                |
| `dit`    | `docker image tag`      | 標記映像檔                |
| `dipu`   | `docker image push`     | 推送映像檔到 registry     |
| `dipru`  | `docker image prune -a` | 清除未使用的所有映像檔    |

---

### 📦 容器操作相關

| **別名** | **指令**                      | **說明**                   |
| -------- | ----------------------------- | -------------------------- |
| `dr`     | `docker container run`        | 執行容器                   |
| `drit`   | `docker container run -it`    | 互動模式執行容器           |
| `dst`    | `docker container start`      | 啟動容器                   |
| `drs`    | `docker container restart`    | 重新啟動容器               |
| `dstp`   | `docker container stop`       | 停止容器                   |
| `dsta`   | `docker stop $(docker ps -q)` | 停止所有執行中的容器       |
| `drm`    | `docker container rm`         | 移除容器                   |
| `drm!`   | `docker container rm -f`      | 強制移除容器               |
| `dcls`   | `docker container ls`         | 列出執行中的容器           |
| `dclsa`  | `docker container ls -a`      | 列出所有容器（包含已停止） |
| `dcin`   | `docker container inspect`    | 查看容器詳細資訊           |
| `dlo`    | `docker container logs`       | 查看容器日誌               |
| `dpo`    | `docker container port`       | 查看容器 port 對應關係     |
| `dtop`   | `docker top`                  | 查看容器內的執行程序       |
| `dsts`   | `docker stats`                | 即時顯示資源使用狀況       |
| `dps`    | `docker ps`                   | 顯示執行中的容器           |
| `dpsa`   | `docker ps -a`                | 顯示所有容器               |

---

### 🧩 Volume 操作

| **別名**  | **指令**                | **說明**            |
| --------- | ----------------------- | ------------------- |
| `dvls`    | `docker volume ls`      | 列出所有 volume     |
| `dvi`     | `docker volume inspect` | 查看 volume 資訊    |
| `dvprune` | `docker volume prune`   | 清除未使用的 volume |

---

### 🌐 網路操作

| **別名** | **指令**                    | **說明**         |
| -------- | --------------------------- | ---------------- |
| `dnls`   | `docker network ls`         | 列出網路         |
| `dni`    | `docker network inspect`    | 查看網路資訊     |
| `dnc`    | `docker network create`     | 建立新的網路     |
| `dnrm`   | `docker network rm`         | 刪除網路         |
| `dncn`   | `docker network connect`    | 將容器加入網路   |
| `dndcn`  | `docker network disconnect` | 將容器從網路移除 |

---

### 🔧 其他常用指令

| **別名** | **指令**                    | **說明**             |
| -------- | --------------------------- | -------------------- |
| `dpu`    | `docker pull`               | 從 registry 拉映像檔 |
| `dxc`    | `docker container exec`     | 在容器中執行指令     |
| `dxcit`  | `docker container exec -it` | 互動模式執行容器指令 |




## git 相關

---

### 🔍 狀態與日誌相關

| **別名** | **指令**                               | **說明**                     |
| -------- | -------------------------------------- | ---------------------------- |
| `gst`    | `git status`                           | 查看目前 Git 狀態            |
| `gss`    | `git status --short`                   | 精簡版狀態顯示               |
| `gsb`    | `git status --short --branch`          | 顯示簡潔的分支狀態           |
| `gsh`    | `git show`                             | 顯示提交的詳細變更           |
| `glg`    | `git log --stat`                       | 顯示提交記錄及修改統計       |
| `glgp`   | `git log --stat --patch`               | 顯示提交記錄與實際程式碼變更 |
| `glog`   | `git log --oneline --decorate --graph` | 圖形化簡短提交歷史           |
| `glol`   | `git log --graph --pretty="..."`       | 圖形化並美化的 log 輸出      |
| `glgg`   | `git log --graph`                      | 圖形化 log                   |

---

### 🧩 加入變更與提交

| **別名** | **指令**                                 | **說明**                   |
| -------- | ---------------------------------------- | -------------------------- |
| `ga`     | `git add`                                | 加入變更檔案至暫存區       |
| `gaa`    | `git add --all`                          | 加入所有變更               |
| `gcam`   | `git commit --all --message`             | 一次加入變更並提交         |
| `gc`     | `git commit --verbose`                   | 進行詳細提交               |
| `gca`    | `git commit --verbose --all`             | 加入所有變更並進行詳細提交 |
| `gcmsg`  | `git commit --message`                   | 使用訊息提交               |
| `gcn!`   | `git commit --verbose --no-edit --amend` | 不改訊息並修改上次提交     |

---

### 🔁 分支操作

| **別名** | **指令**                          | **說明**         |
| -------- | --------------------------------- | ---------------- |
| `gb`     | `git branch`                      | 查看本地分支     |
| `gba`    | `git branch --all`                | 查看所有分支     |
| `gbr`    | `git branch --remote`             | 查看遠端分支     |
| `gcb`    | `git checkout -b`                 | 建立並切換新分支 |
| `gco`    | `git checkout`                    | 切換分支或檔案   |
| `gcm`    | `git checkout $(git_main_branch)` |
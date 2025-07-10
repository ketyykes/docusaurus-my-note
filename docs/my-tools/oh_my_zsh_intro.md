---
title: Oh My Zsh 超實用指南（含 Git、Docker 指令縮寫大全）
description: 本文用最親切的教學語氣，帶你從零認識 Oh My Zsh，並完整整理 Git、Docker 常用縮寫指令表，讓終端機效率大升級！
sidebar_position: 2
tags:
  - tool
last_update:
  date: 2025-07-10
  author: Danny
---

# 從零開始玩 Oh My Zsh —— 讓終端機效率大爆發！

> 本篇文章將會涵蓋以下重點：
> - Oh My Zsh 是什麼？為什麼大家都在用？
> - 如何安裝與基本設定？
> - <span class="blue">Git、Docker 指令縮寫表</span>，讓你操作快到飛起來！
> - 常見問題與進階參考

## 什麼是 Oh My Zsh？為什麼要用？

在講解安裝之前，我們先來聊聊 Oh My Zsh 到底有多強。

簡單的說法就是：
- **Zsh** 是一個比 Bash 更強大的終端機殼層
- **Oh My Zsh** 則是 Zsh 的「超強外掛包裝器」

換句話說，Oh My Zsh 幫你把終端機變成超級英雄，<span class="green">auto complete、主題美化、指令縮寫、外掛支援</span>通通一把抓！

值得一提的是，Oh My Zsh 有超過 200+ 外掛、140+ 主題，社群超活躍，遇到問題一查就有解。

---

## 如何安裝 Oh My Zsh？

<span class="blue">安裝超簡單，只要一行指令！</span>

```bash {numberLines: true}
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

- 執行完畢後，Zsh 會自動成為預設殼層，並產生 `~/.zshrc` 設定檔。
- 你可以在 `~/.zshrc` 裡調整主題、外掛等設定。


## 安裝後必做的三件事

1. **選主題**：
   - 編輯 `~/.zshrc`，找到 `ZSH_THEME`，改成你喜歡的主題（例如 `agnoster`）。
2. **加外掛**：
   - 找到 `plugins=(git)`，可以加上 `docker`、`zsh-autosuggestions` 等。
3. **套用設定**：
   - 執行 <span class="mycode">source ~/.zshrc</span> 讓設定立即生效。


## Oh My Zsh 指令縮寫大全

<span class="blue">這邊整理了最常用的 Git 與 Docker 指令縮寫，分類清楚，查找超方便！</span>

### Docker 相關指令縮寫

#### 🛠️ 建構與映像檔相關

| **別名** | **指令**              | **說明**                |
| -------- | --------------------- | ----------------------- |
| dbl      | docker build          | 建構 Docker 映像檔      |
| dib      | docker image build    | 同上，使用 image 子命令 |
| dii      | docker image inspect  | 查看映像檔詳細資訊      |
| dils     | docker image ls       | 列出所有映像檔          |
| dirm     | docker image rm       | 移除映像檔              |
| dit      | docker image tag      | 標記映像檔              |
| dipu     | docker image push     | 推送映像檔到 registry   |
| dipru    | docker image prune -a | 清除未使用的所有映像檔  |

#### 📦 容器操作相關

| **別名** | **指令**                    | **說明**                 |
| -------- | --------------------------- | ------------------------ |
| dr       | docker container run        | 執行容器                 |
| drit     | docker container run -it    | 互動模式執行容器         |
| dst      | docker container start      | 啟動容器                 |
| drs      | docker container restart    | 重新啟動容器             |
| dstp     | docker container stop       | 停止容器                 |
| dsta     | docker stop $(docker ps -q) | 停止所有執行中的容器     |
| drm      | docker container rm         | 移除容器                 |
| drm!     | docker container rm -f      | 強制移除容器             |
| dcls     | docker container ls         | 列出執行中的容器         |
| dclsa    | docker container ls -a      | 列出所有容器（含已停止） |
| dcin     | docker container inspect    | 查看容器詳細資訊         |
| dlo      | docker container logs       | 查看容器日誌             |
| dpo      | docker container port       | 查看容器 port 對應關係   |
| dtop     | docker top                  | 查看容器內的執行程序     |
| dsts     | docker stats                | 即時顯示資源使用狀況     |
| dps      | docker ps                   | 顯示執行中的容器         |
| dpsa     | docker ps -a                | 顯示所有容器             |

#### 🧩 Volume 操作

| **別名** | **指令**              | **說明**            |
| -------- | --------------------- | ------------------- |
| dvls     | docker volume ls      | 列出所有 volume     |
| dvi      | docker volume inspect | 查看 volume 資訊    |
| dvprune  | docker volume prune   | 清除未使用的 volume |

#### 🌐 網路操作

| **別名** | **指令**                  | **說明**         |
| -------- | ------------------------- | ---------------- |
| dnls     | docker network ls         | 列出網路         |
| dni      | docker network inspect    | 查看網路資訊     |
| dnc      | docker network create     | 建立新的網路     |
| dnrm     | docker network rm         | 刪除網路         |
| dncn     | docker network connect    | 將容器加入網路   |
| dndcn    | docker network disconnect | 將容器從網路移除 |

#### 🔧 其他常用指令

| **別名** | **指令**                  | **說明**             |
| -------- | ------------------------- | -------------------- |
| dpu      | docker pull               | 從 registry 拉映像檔 |
| dxc      | docker container exec     | 在容器中執行指令     |
| dxcit    | docker container exec -it | 互動模式執行容器指令 |

### Git 相關指令縮寫

#### 🔍 狀態與日誌相關

| **別名** | **指令**                             | **說明**                     |
| -------- | ------------------------------------ | ---------------------------- |
| gst      | git status                           | 查看目前 Git 狀態            |
| gss      | git status --short                   | 精簡版狀態顯示               |
| gsb      | git status --short --branch          | 顯示簡潔的分支狀態           |
| gsh      | git show                             | 顯示提交的詳細變更           |
| glg      | git log --stat                       | 顯示提交記錄及修改統計       |
| glgp     | git log --stat --patch               | 顯示提交記錄與實際程式碼變更 |
| glog     | git log --oneline --decorate --graph | 圖形化簡短提交歷史           |
| glol     | git log --graph --pretty="..."       | 圖形化並美化的 log 輸出      |
| glgg     | git log --graph                      | 圖形化 log                   |

#### 🧩 加入變更與提交

| **別名** | **指令**                               | **說明**                   |
| -------- | -------------------------------------- | -------------------------- |
| ga       | git add                                | 加入變更檔案至暫存區       |
| gaa      | git add --all                          | 加入所有變更               |
| gcam     | git commit --all --message             | 一次加入變更並提交         |
| gc       | git commit --verbose                   | 進行詳細提交               |
| gca      | git commit --verbose --all             | 加入所有變更並進行詳細提交 |
| gcmsg    | git commit --message                   | 使用訊息提交               |
| gcn!     | git commit --verbose --no-edit --amend | 不改訊息並修改上次提交     |

#### 🔁 分支操作

| **別名** | **指令**                           | **說明**           |
| -------- | ---------------------------------- | ------------------ |
| gb       | git branch                         | 查看本地分支       |
| gba      | git branch --all                   | 查看所有分支       |
| gbr      | git branch --remote                | 查看遠端分支       |
| gcb      | git checkout -b                    | 建立並切換新分支   |
| gco      | git checkout                       | 切換分支或檔案     |
| gcm      | git checkout $(git_main_branch)    | 切換到主要分支     |
| gcd      | git checkout $(git_develop_branch) | 切換到開發分支     |
| gbda     | function，自動刪除已合併分支       | 清理本地已合併分支 |
| gbd      | git branch --delete                | 刪除本地分支       |
| gbD      | git branch --delete --force        | 強制刪除本地分支   |

#### 📥 抓取與拉取

| **別名** | **指令**                              | **說明**                         |
| -------- | ------------------------------------- | -------------------------------- |
| gf       | git fetch                             | 從遠端抓取更新                   |
| gfa      | git fetch --all --tags --prune        | 抓取所有遠端更新並清理已刪除分支 |
| gl       | git pull                              | 從遠端拉取更新                   |
| ggpull   | git pull origin $(git_current_branch) | 拉取當前分支遠端更新             |
| gprom    | git pull --rebase origin main         | 拉 main 分支並使用 rebase        |
| gpr      | git pull --rebase                     | 使用 rebase 的方式拉取更新       |

#### 📤 推送與上傳

| **別名** | **指令**                              | **說明**       |
| -------- | ------------------------------------- | -------------- |
| gp       | git push                              | 推送變更至遠端 |
| ggpush   | git push origin $(git_current_branch) | 推送目前分支   |
| gpf      | git push --force-with-lease           | 安全強制推送   |
| gpsup    | git push --set-upstream origin ...    | 設定上游分支   |

#### 📌 標籤（Tag）與版本

| **別名** | **指令**           | **說明**             |
| -------- | ------------------ | -------------------- |
| gta      | git tag --annotate | 建立註解標籤         |
| gts      | git tag --sign     | 建立簽章標籤         |
| gtv      | git tag sort -V    | 顯示排序過的版本標籤 |

#### 💾 暫存（stash）

| **別名** | **指令**               | **說明**     |
| -------- | ---------------------- | ------------ |
| gsta     | git stash push         | 將變更暫存   |
| gstp     | git stash pop          | 還原最新暫存 |
| gstl     | git stash list         | 顯示暫存清單 |
| gsts     | git stash show --patch | 顯示暫存內容 |

#### 🔧 其他實用指令

| **別名** | **指令**                                                  | **說明**              |
| -------- | --------------------------------------------------------- | --------------------- |
| gcl      | git clone --recurse-submodules                            | Clone 並包含子模組    |
| gclean   | git clean --interactive -d                                | 互動清理未追蹤檔案    |
| gignored | git ls-files -v \| grep "^\[\[:lower:]]"                  | 列出被 Git 忽略的檔案 |
| gcount   | git shortlog --summary --numbered                         | 計算作者貢獻統計      |
| gwip     | git add -A && ... --message "--wip--"                     | 快速建立 WIP commit   |
| gunwip   | git reset HEAD~1（如有 WIP commit）                       | 撤銷最後一次 WIP      |
| ggsup    | git branch --set-upstream-to=origin/$(git_current_branch) | 設定上游分支          |


## 常見問題與進階參考

> <span class="blue">遇到設定問題、想找更多主題或外掛？</span>
> - 主題展示：[Themes Gallery](https://github.com/ohmyzsh/ohmyzsh/wiki/themes)
> - 外掛清單：[Plugins List](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins)

---

> 參考資料：
> - [Oh My Zsh 官方文件](https://ohmyz.sh/)
> - [GitHub - ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)
> - [Zsh 官方手冊](https://zsh.sourceforge.io/Doc/)



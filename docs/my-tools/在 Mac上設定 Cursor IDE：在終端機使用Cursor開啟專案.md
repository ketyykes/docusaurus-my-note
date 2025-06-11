---
sidebar_position: 1
title: 在 Mac 上設定 Cursor IDE：在終端機使用 Cursor 開啟專案
description: 在 Mac 上設定 Cursor IDE：在終端機使用 Cursor 開啟專案
tags:
  - mac
last_update:
  date: 2024-10-21
  author: Danny
---

## 目錄
- [目錄](#目錄)
- [如何將「Cursor」應用程式加入 `PATH`，並透過終端機開啟](#如何將cursor應用程式加入-path並透過終端機開啟)
- [設定步驟](#設定步驟)
- [使用方式](#使用方式)
- [注意事項](#注意事項)

本文介紹了如何在 Mac 上設定 Cursor IDE，使其可以通過終端機開啟專案。主要內容包括：

1. 將 Cursor 應用程式加入系統 PATH
2. 設定步驟的詳細說明
3. 如何在終端機中使用 Cursor 開啟專案
4. 相關注意事項

通過這些設定，用戶可以在任何終端機視窗中使用 `cursor` 指令直接開啟 Cursor IDE，大大提高了工作效率。
## 如何將「Cursor」應用程式加入 `PATH`，並透過終端機開啟

在使用終端機時，如果想要直接使用 `Cursor` 應用程式的指令，可以透過將它的路徑加入到系統的 `PATH` 中來達成。這樣的設定讓你可以在任何終端機視窗中直接使用 `cursor` 指令開啟 Cursor。以下將介紹如何設定：

## 設定步驟


假設 `Cursor` 應用程式的路徑為：
```
/Applications/Cursor.app/Contents/Resources/app/bin
```

你可以依照這個路徑來進行設定，將該路徑加入到 `PATH`。


1. 開啟終端機並輸入以下指令：

   ```bash
   cat << EOF >> ~/.zprofile
   # Add Cursor to PATH
   export PATH="\$PATH:/Applications/Cursor.app/Contents/Resources/app/bin"
   EOF
   ```

   這段指令的功能是將 `Cursor` 的路徑加入到 `~/.zprofile` 中。這樣一來，每次啟動終端機時，系統就會自動將這個路徑載入到 `PATH` 中。

2. 為了使剛剛的變更立即生效，執行以下指令：

   ```bash
   source ~/.zprofile
   ```

   這個指令會重新加載 `~/.zprofile`，使得剛剛設定的 PATH 立即生效。

## 使用方式

設定完成後，你可以使用以下步驟在終端機中開啟 Cursor：

1. 使用 `cd` 指令進入你想要開啟的專案資料夾，例如：

   ```bash
   cd /path/to/your/project
   ```

2. 然後輸入以下指令開啟該專案：

   ```bash
   cursor .
   ```

   這樣就會在 Cursor 中開啟該資料夾，方便你直接在專案中進行編輯。

## 注意事項

- 請確保 `Cursor` 的實際路徑與上述假設的路徑一致。如果實際路徑不同，請替換 `/Applications/Cursor.app/Contents/Resources/app/bin` 為你自己環境中的正確路徑。
- 若使用其他 shell（例如 `bash` 或 `fish`），可能需要調整為相應的設定檔案（如 `~/.bash_profile` 或 `~/.config/fish/config.fish`）。

透過這些簡單的設定，就能夠在終端機中使用 Cursor 的功能。

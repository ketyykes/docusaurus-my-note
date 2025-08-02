# 規格說明

<div id="enable-section-numbers" />

[Model Context Protocol](https://modelcontextprotocol.io) (MCP) 是一個開放的協定，它能夠讓 LLM 應用程式與外部資料來源和工具之間進行無縫整合。無論您是要開發 AI 驅動的 IDE、增強聊天介面，或是建立自訂的 AI 工作流程，MCP 都提供了一種標準化的方式來連接 LLM 與它們所需要的情境脈絡。

這份規格說明定義了權威的協定需求，基於
[schema.ts](https://github.com/modelcontextprotocol/specification/blob/main/schema/2025-06-18/schema.ts) 中的 TypeScript 結構描述。

如需實作指南和範例，請造訪
[modelcontextprotocol.io](https://modelcontextprotocol.io)。

本文件中的關鍵字「MUST」、「MUST NOT」、「REQUIRED」、「SHALL」、「SHALL NOT」、「SHOULD」、「SHOULD NOT」、「RECOMMENDED」、「NOT RECOMMENDED」、「MAY」和「OPTIONAL」應按照 [BCP 14](https://datatracker.ietf.org/doc/html/bcp14)
\[[RFC2119](https://datatracker.ietf.org/doc/html/rfc2119)]
\[[RFC8174](https://datatracker.ietf.org/doc/html/rfc8174)] 中的描述來解釋，且僅當它們以全大寫形式出現時才適用，如此處所示。

## 概述

MCP 為應用程式提供了一種標準化的方式來：

* 與語言模型分享情境資訊
* 向 AI 系統公開工具和功能
* 建立可組合的整合方案和工作流程

該協定使用 [JSON-RPC](https://www.jsonrpc.org/) 2.0 訊息來建立以下各方之間的通訊：

* **主機（Hosts）**：發起連線的 LLM 應用程式
* **客戶端（Clients）**：主機應用程式內的連接器
* **伺服器（Servers）**：提供情境脈絡和功能的服務

MCP 從 [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) 中獲得了一些靈感，後者標準化了如何在整個開發工具生態系統中新增程式語言支援。同理，MCP 標準化了如何將額外的情境脈絡和工具整合到 AI 應用程式生態系統中。

## 關鍵細節

### 基礎協定

* [JSON-RPC](https://www.jsonrpc.org/) 訊息格式
* 有狀態連線
* 伺服器與客戶端功能協商

### 功能特性

伺服器向客戶端提供以下任何功能：

* **資源（Resources）**：給使用者或 AI 模型使用的情境脈絡和資料
* **提示（Prompts）**：給使用者使用的樣板訊息和工作流程
* **工具（Tools）**：供 AI 模型執行的函式

客戶端可以向伺服器提供以下功能：

* **取樣（Sampling）**：由伺服器發起的代理行為和遞迴 LLM 互動
* **根節點（Roots）**：由伺服器發起的 URI 或檔案系統邊界查詢，以便在其中運作
* **引導（Elicitation）**：由伺服器發起的向使用者索取額外資訊的請求

### 額外工具

* 配置
* 進度追蹤
* 取消操作
* 錯誤回報
* 日誌記錄

## 安全性與信任安全

Model Context Protocol 透過任意資料存取和程式碼執行路徑來啟用強大的功能。隨著這種強大能力而來的是重要的安全性和信任考量，所有實作者都必須仔細處理這些問題。

### 關鍵原則

1. **使用者同意與控制**

   * 使用者必須明確同意並理解所有資料存取和操作
   * 使用者必須保有對分享什麼資料以及採取什麼行動的控制權
   * 實作者應該提供清楚的使用者介面來檢視和授權活動

2. **資料隱私**

   * 主機必須在向伺服器公開使用者資料之前獲得明確的使用者同意
   * 主機不得在未獲得使用者同意的情況下將資源資料傳輸到其他地方
   * 使用者資料應該受到適當的存取控制保護

3. **工具安全性**

   * 工具代表任意程式碼執行，必須以適當的謹慎態度對待
     * 特別是，工具行為的描述（如註釋）應被視為不可信任的，除非是從可信任的伺服器取得
   * 主機必須在呼叫任何工具之前獲得明確的使用者同意
   * 使用者應該在授權使用之前了解每個工具的功能

4. **LLM 取樣控制**
   * 使用者必須明確批准任何 LLM 取樣請求
   * 使用者應該控制：
     * 是否進行取樣
     * 將要發送的實際提示
     * 伺服器可以看到什麼結果
   * 協定故意限制伺服器對提示的可見性

### 實作指南

雖然 MCP 本身無法在協定層級強制執行這些安全原則，實作者**應該**：

1. 在其應用程式中建立強健的同意和授權流程
2. 提供安全性影響的清楚說明文件
3. 實作適當的存取控制和資料保護
4. 在整合過程中遵循安全性最佳實務
5. 在功能設計中考慮隱私影響

## 了解更多

探索每個協定元件的詳細規格說明：

- [架構](https://modelcontextprotocol.io/specification/2025-06-18/architecture)
- [基礎協定](https://modelcontextprotocol.io//specification/2025-06-18/basic)
- [伺服器功能](https://modelcontextprotocol.io/specification/2025-06-18/server)
- [客戶端功能](https://modelcontextprotocol.io//specification/2025-06-18/client)
- [貢獻](https://modelcontextprotocol.io//development/contributing)

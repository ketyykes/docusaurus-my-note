
## 本篇文章將會涵蓋以下重點

- 什麼是 <span class="mycode">Browser Tools MCP</span>？
- 如何安裝與啟動？
- 架構原理與資料流說明
- 安全性與效能考量
- 常見應用情境
- 參考資料


## 什麼是 Browser Tools MCP？

* Browser Tools MCP 是一組 **Model Context Protocol（MCP）伺服器 + Chrome 擴充 + Node 中介服務**，讓 AI 助手能「看到」並「操作」你的瀏覽器。
* 典型用途：擷取 console / network log、截圖、自動表單填寫、Lighthouse SEO/效能/無障礙稽核、Next.js 專用 SEO 檢查等。
* MCP 是 Anthropic 提出的開放標準，類似 AI 版 USB-C，統一 LLM 與外部工具的溝通格式。Cursor、VS Code、Zed 等 IDE 均內建 MCP Client，可「外掛」多種 MCP Server。

* <span class="mycode">Browser Tools MCP</span> 是一組 <b>Model Context Protocol（MCP）伺服器 + Chrome 擴充 + Node 中介服務</b>，讓 AI 助手能即時存取 Console、Network、DOM、截圖等資訊。
* 典型用途：
  - 擷取 console / network log
  - 截圖
  - 自動表單填寫
  - Lighthouse SEO/效能/無障礙稽核
  - Next.js 專用 SEO 檢查
* <span class="blue">補充說明</span>：MCP 是 Anthropic 提出的開放標準，像 AI 版 USB-C，統一 LLM 與外部工具的溝通格式。

> 以下以 v1.2.0 為例，Windows／macOS 指令類似。

## 安裝方法：三步驟快速上手

> <span class="green">建議操作</span>：建議依照下表順序操作，避免常見連線問題。

| 步驟 | 操作                                                                                                                                                                                           | 說明                                                                                                  |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1    | 安裝 Chrome 擴充<br/>- Web Store 搜尋「Browser MCP – Automate your browser」<br/>- 或從 GitHub 下載 <span class="mycode">chrome-extension</span> 資料夾並以「開發者模式 → 載入未封裝擴充」匯入 | 擴充負責攔截 Log、截圖、與 Node Server 透過 WebSocket 溝通                                            |
| 2    | 在 IDE 新增 MCP Server<br/><span class="mycode">npx @agentdeskai/browser-tools-mcp@1.2.0</span>                                                                                                | MCP Server 以 <span class="blue">stdio</span> 方式執行，向 IDE 宣告可用工具（如 runPerformanceAudit） |
| 3    | 啟動本機 Node Server<br/><span class="mycode">npx @agentdeskai/browser-tools-server@1.2.0</span>                                                                                               | 預設佔用 <span class="mycode">localhost:3025</span>，負責橋接 MCP Server ⇄ Chrome 擴充                |

> <span class="red">重點資訊</span>：若埠號被占用請改用 <span class="mycode">PORT=YYYY npx @agentdeskai/browser-tools-server</span>。如 MCP Server 圓點未變綠，請確認 Chrome DevTools 已開啟、Node Server 正在執行，再重整 IDE MCP 面板。


## 架構原理與資料流

### 整體架構圖

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐     ┌─────────────┐
│  MCP Client │ ──► │  MCP Server  │ ──► │  Node Server  │ ──► │   Chrome    │
│ (Cursor…)   │ ◄── │ (Protocol)    │ ◄── │ (Middleware)  │ ◄── │ Extension   │
└─────────────┘     └──────────────┘     └───────────────┘     └─────────────┘
```

* <span class="mycode">MCP Client</span>：IDE 內的 AI 代理。呼叫 MCP Server 暴露的「工具函式」。
* <span class="mycode">MCP Server</span>：解析 AI 指令，轉換成 REST/WebSocket 呼叫，並做文字截斷、隱私過濾（移除 Cookie / Authorization header）。
* <span class="mycode">Node Server</span>：本機中介，維護 WebSocket 連線，處理截圖、log 聚合與格式化，管理快取與 Token 限額。
* <span class="mycode">Chrome 擴充</span>：注入 content script，監聽 <span class="mycode">console.*</span>、<span class="mycode">fetch/XHR</span>、DOM 選取，並能下指令影像截圖或 Lighthouse 稽核。

### 資料流（由左至右）

1. <span class="mycode">IDE 請求</span>：開發者在 Cursor 輸入「Run performance audit」；MCP Client 將其包裝成標準函式呼叫（如 <span class="mycode">runPerformanceAudit</span>）送給 MCP Server。
2. <span class="mycode">MCP Server 轉發</span>：將函式名稱、參數序列化成 HTTP / WebSocket 訊息，傳給 Node Server。
3. <span class="mycode">Node Server 處理</span>：驗證請求、去除敏感欄位，透過 WebSocket 指令 Chrome 擴充啟動 Lighthouse 或擷取截圖。
4. <span class="mycode">Chrome 擴充執行</span>：在目前分頁執行 Lighthouse CLI、收集 console / network / DOM 等結果，回傳 JSON 給 Node Server。
5. <span class="mycode">回傳 IDE</span>：Node Server 經過資料瘦身後交回 MCP Server，MCP Server 再將 JSON 直接寫入 AI 模型的 context，讓助手可生成人類可讀分析報告或自動修正程式碼。

> 換句話說，MCP 的「工具呼叫 → 外部執行 → 回傳結果」流程，就像 USB-C 插槽一樣，讓 LLM 可以熱插拔不同工具。

## 安全與效能考量

* <span class="red">完全本機</span>：所有瀏覽器活動與截圖都不會經過雲端，降低敏感資料外洩風險。
* <span class="green">Token 管控</span>：Node Server 會自動截斷過長字串，並過濾重複 log，避免塞爆 LLM token quota。
* <span class="blue">多 IDE 相容</span>：支援 Cursor、VS Code、Zed 等，只要 IDE 能啟動 STDIO or SSE MCP Server 即可。


## 常見應用情境

| 情境              | 說明                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------- |
| **Debugger Mode** | 一鍵收集 Console、Network、DOM 與截圖，並生成除錯建議                                         |
| **Audit Mode**    | 依序執行 Lighthouse「無障礙、效能、SEO、最佳實踐」四大稽核，針對 Next.js 亦有專屬 SEO 檢查    |
| **自動表單填寫**  | 透過瀏覽器自動化函式（navigate、typeText、click），讓 ChatGPT/Claude 在登入後批量操作後台介面 |
| **測試腳本生成**  | 讓 AI 觀察使用者手動操作產生 DOM selector 與步驟，再輸出 Playwright / Cypress 測試腳本        |

##### 參考資料

[GitHub - AgentDeskAI/browser-tools-mcp](https://github.com/AgentDeskAI/browser-tools-mcp)
[AgentDesk - BrowserToolsMCP](https://browsertools.agentdesk.ai/)
[Anthropic - Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol?utm_source=chatgpt.com)
[Anthropic API - Model Context Protocol (MCP)](https://docs.anthropic.com/en/docs/mcp?utm_source=chatgpt.com)
[Cursor Docs - Model Context Protocol (MCP)](https://docs.cursor.com/context/mcp?utm_source=chatgpt.com)
[Cursor Docs - Working with Documentation](https://docs.cursor.com/guides/advanced/working-with-documentation?utm_source=chatgpt.com)
[Chrome Web Store - Browser MCP](https://chromewebstore.google.com/detail/browser-mcp-automate-your/bjfgambnhccakkhmkepdoekmckoijdlc)
[Reddit - A Practical Guide to Browser Tools MCP Server](https://www.reddit.com/r/cursor/comments/1j4h786/a_practical_guide_to_browser_tools_mcp_server/)
[Browser MCP 官方網站](https://browsermcp.io/)


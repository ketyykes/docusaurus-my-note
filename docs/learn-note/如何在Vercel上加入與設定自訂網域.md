---
sidebar_position: 1
title: 如何在 Vercel 上加入與設定自訂網域
description: 介紹如何在 Vercel 專案中新增和設定自訂網域，包含根域名、子網域設定步驟以及 DNS 紀錄配置方法 Cursor 開啟專案
tags:
  - backend
last_update:
  date: 2024-10-27
  author: Danny
---

## 前言

對於使用 Vercel 部署應用程式的開發者來說，設置自訂網域能大幅提升專案的專業性與品牌辨識度。本教學將一步步引導您如何在 Vercel 中添加、配置並驗證自訂網域，包括使用根域名、子網域與萬用字元網域的方式，以及通過 Nameserver 進行設定。無論您是要建立全新的自訂網域，或從其他 DNS 提供商移轉，本文將為您提供完整的操作說明。

## 目錄
- [前言](#前言)
- [目錄](#目錄)
- [新增與設定網域](#新增與設定網域)
- [根域名 (Apex Domain)](#根域名-apex-domain)
- [子網域 (Subdomain)](#子網域-subdomain)
- [Vercel Nameservers](#vercel-nameservers)
- [驗證網域存取權限](#驗證網域存取權限)
      - [參考資料](#參考資料)

---

Vercel 提供每次部署一個 `vercel.app` URL，方便團隊分享及協作。不過，若您想讓專案更具個人化，您可以添加自訂網域。如果您尚未擁有網域，可通過 [Vercel 購買](https://vercel.com/domains)。

## 新增與設定網域
要在 Vercel 專案中新增自訂網域，請按以下步驟進行操作：

1. **前往網域設定頁面**  
   在 [Dashboard](https://vercel.com/dashboard) 選擇您要新增網域的專案，點選「設定（Settings）」標籤並選擇「網域（Domains）」項目。  
   ![選擇專案設定中的網域選項](https://assets.vercel.com/image/upload/v1689795055/docs-assets/static/docs/concepts/projects/custom-domains/select-domains-light.png)

2. **添加網域**  
   在「網域」頁面，輸入您要新增的網域名稱。若添加的是根域名（例如 `example.com`），Vercel 會提示您加入 `www` 子域名以及選擇重導向選項。  
   ![在網域頁面輸入專案的網域](https://assets.vercel.com/image/upload/v1689795055/docs-assets/static/docs/concepts/projects/custom-domains/enter-domain.png)

3. **使用萬用字元網域**  
   使用「*」前綴符號添加萬用字元網域（Wildcard Domain），例如 `*.example.com`。注意：使用萬用字元網域時，必須通過名稱伺服器（Nameserver）驗證。  
   ![部署萬用字元網域](https://assets.vercel.com/image/upload/v1689795055/docs-assets/static/docs/concepts/projects/custom-domains/wildcard-domain.png)

4. **設定網域**  
   添加網域後，需在網域註冊商處設置 DNS 紀錄。Vercel 會提供不同的配置方法：
   - **TXT 紀錄**：如果該網域已被另一個 Vercel 帳戶使用，您需使用 TXT 紀錄來驗證。
   - **A 記錄**：若為根域名（Apex Domain），請使用 A 記錄。
   - **CNAME 紀錄**：若為子網域（Subdomain），請使用 CNAME 記錄。
   - **Vercel Nameservers**：也可使用 Vercel 的 Nameserver 設定根域名和子網域。

   ![從專案網域頁面設置根域名](https://assets.vercel.com/image/upload/v1689795055/docs-assets/static/docs/concepts/projects/custom-domains/configure-apex-domain.png)  
   ![從專案網域頁面設置子網域](https://assets.vercel.com/image/upload/v1689795055/docs-assets/static/docs/concepts/projects/custom-domains/configure-subdomain.png)

## 根域名 (Apex Domain)
可以通過 **A 記錄** 或 **Vercel Nameservers** 配置根域名。

## 子網域 (Subdomain)
可以通過 **CNAME 記錄** 或 **Vercel Nameservers** 配置子網域。

## Vercel Nameservers
選擇使用 Vercel Nameservers 進行管理時，請點選「啟用 Vercel DNS」按鈕，並在註冊商處更改 Nameservers 為 Vercel 提供的值。  
![啟用 Vercel Nameservers 的說明](https://assets.vercel.com/image/upload/v1689795055/docs-assets/static/docs/concepts/projects/custom-domains/enable-vercel-dns.png)

## 驗證網域存取權限
若該網域已被其他 Vercel 帳戶使用，您可能會被要求通過設定 DNS 紀錄進行驗證。配置完成並通過驗證後，Vercel 的介面會顯示網域的狀態已準備就緒。  
![通過設定根域名上的 DNS 紀錄來驗證網域](https://assets.vercel.com/image/upload/v1689795055/docs-assets/static/docs/concepts/projects/custom-domains/verify-domain.png)

---

若使用者訪問網域時無論是否加上「www」前綴，Vercel 會嘗試進行重導向。為了更加穩定的運行，建議您顯式地添加該域名並進行重導向。


##### 參考資料

[Vercel - Adding & Configuring a Custom Domain](https://vercel.com/docs/projects/domains/add-a-domain#adding-&-configuring-a-custom-domain)

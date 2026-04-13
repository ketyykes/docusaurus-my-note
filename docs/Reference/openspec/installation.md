---
sidebar_position: 1
title: "OpenSpec 安裝指南"
description: "OpenSpec CLI 工具的安裝方式，包含 npm、pnpm、yarn、bun 及 Nix 等套件管理器的安裝指令"
tags: [OpenSpec]
last_update:
  date: 2026-04-13
  author: Danny
---

# 安裝

## 前置需求

- **Node.js 20.19.0 或更高版本** — 確認目前版本：`node --version`

## 套件管理器

### npm

```bash
npm install -g @fission-ai/openspec@latest
```

### pnpm

```bash
pnpm add -g @fission-ai/openspec@latest
```

### yarn

```bash
yarn global add @fission-ai/openspec@latest
```

### bun

```bash
bun add -g @fission-ai/openspec@latest
```

## Nix

直接執行 OpenSpec 而不需要安裝：

```bash
nix run github:Fission-AI/OpenSpec -- init
```

或安裝至你的 profile：

```bash
nix profile install github:Fission-AI/OpenSpec
```

或在 `flake.nix` 中加入開發環境設定：

```nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    openspec.url = "github:Fission-AI/OpenSpec";
  };

  outputs = { nixpkgs, openspec, ... }: {
    devShells.x86_64-linux.default = nixpkgs.legacyPackages.x86_64-linux.mkShell {
      buildInputs = [ openspec.packages.x86_64-linux.default ];
    };
  };
}
```

## 驗證安裝

```bash
openspec --version
```

## 下一步

安裝完成後，在你的專案中初始化 OpenSpec：

```bash
cd your-project
openspec init
```

完整操作流程請參閱 [Getting Started](getting-started.md)。

### 本文原始連結

[OpenSpec 官方文件](https://github.com/Fission-AI/OpenSpec/blob/main/docs/installation.md)

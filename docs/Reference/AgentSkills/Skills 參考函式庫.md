---
sidebar_position: 6
title: "Skills 參考函式庫"
description: Agent Skills 的參考函式庫，提供 Python API 與 CLI 工具來驗證 Skills 並產生提示詞 XML
tags:
  - Agent Skills
  - Python
  - CLI
  - SDK
last_update:
  date: 2025-12-25
  author: Danny
---

# Skills 參考函式庫

## 前言

skills-ref 是 Agent Skills 的參考函式庫，提供 Python 工具程式與 CLI 來驗證 Skills、讀取屬性以及產生代理提示詞 XML。

:::note
此函式庫僅供示範用途，不適合在正式環境中使用。
:::

## 安裝

### macOS / Linux

使用 pip：

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .
```

或使用 [uv](https://docs.astral.sh/uv/)：

```bash
uv sync
source .venv/bin/activate
```

### Windows

使用 pip（PowerShell）：

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -e .
```

使用 pip（命令提示字元）：

```cmd
python -m venv .venv
.venv\Scripts\activate.bat
pip install -e .
```

或使用 [uv](https://docs.astral.sh/uv/)：

```powershell
uv sync
.venv\Scripts\Activate.ps1
```

安裝完成後，`skills-ref` 執行檔會出現在你的 `PATH` 中（在已啟用的虛擬環境內）。

## 使用方式

### CLI

```bash
# 驗證一個 Skill
skills-ref validate path/to/skill

# 讀取 Skill 屬性（輸出 JSON）
skills-ref read-properties path/to/skill

# 產生代理提示詞的 <available_skills> XML
skills-ref to-prompt path/to/skill-a path/to/skill-b
```

### Python API

```python
from pathlib import Path
from skills_ref import validate, read_properties, to_prompt

# 驗證 Skill 目錄
problems = validate(Path("my-skill"))
if problems:
    print("Validation errors:", problems)

# 讀取 Skill 屬性
props = read_properties(Path("my-skill"))
print(f"Skill: {props.name} - {props.description}")

# 產生可用 Skills 的提示詞
prompt = to_prompt([Path("skill-a"), Path("skill-b")])
print(prompt)
```

## 代理提示詞整合

使用 `to-prompt` 來產生建議的 `<available_skills>` XML 區塊，用於你的代理系統提示詞。此格式是 Anthropic 模型的建議格式，但 Skill 客戶端可根據所使用的模型選擇不同的格式。

```xml
<available_skills>
<skill>
<name>
my-skill
</name>
<description>
What this skill does and when to use it
</description>
<location>
/path/to/my-skill/SKILL.md
</location>
</skill>
</available_skills>
```

`<location>` 元素告訴代理在哪裡可以找到完整的 Skill 指令。

## 授權

Apache 2.0

## 小結

skills-ref 參考函式庫提供了驗證 Skills、讀取屬性和產生提示詞 XML 的完整工具鏈，支援 CLI 和 Python API 兩種使用方式，方便開發者快速整合 Agent Skills 到自己的代理中。

# 第01集｜Codex外挂Gemini！反向代理全自动配置指南

> 本指南配合视频教程使用：通过 CLIProxyAPI + Antigravity 将 Google Gemini 模型接入 Codex，实现本地反向代理与多模型一键平滑切换。

---

## 核心架构原理

Codex 原生主要支持 OpenAI 官方模型，但在实际工程和长文本场景下，Gemini 1.5 Pro / Flash 拥有更庞大的上下文窗口和极高性价比。

通过在本地运行反向代理服务（CLIProxyAPI），将 Codex 发送的 API 请求拦截并转换为 Google Gemini 协议，再经由 Antigravity 客户端完成 Google 账号凭证中继，即可把 Codex 变成一个全能的多模型编程工作台。

---

## 准备工作

1. **已安装 Codex CLI**：确保命令行中可直接执行 `codex`。
2. **Google 账号**：具备访问 Gemini API 或 Antigravity 授权权限的 Google 账号。
3. **本地 Node.js / Python 环境**：用于运行代理工具与切换脚本。

---

## 详细配置步骤

### 1. 安装与启动 CLIProxyAPI 反向代理

在终端执行以下指令安装代理并完成 Google 认证：

```bash
# 全局安装代理工具（或使用本地二进制包）
npm install -g cliproxyapi

# 启动反向代理并进行 Antigravity 登录授权
cliproxyapi login --provider google-antigravity

# 启动本地代理服务，监听 8080 端口
cliproxyapi serve --port 8080
```

终端显示 `[Proxy Ready] Listening on http://localhost:8080` 即表示代理服务已就绪。

### 2. 配置 Codex Provider 与 Profile

在 Codex 的用户配置文件目录（通常为 `~/.codex/config.json`）中添加 Gemini 代理节点：

```json
{
  "profiles": {
    "default": {
      "model": "gpt-4o",
      "provider": "openai"
    },
    "gemini-proxy": {
      "model": "gemini-1.5-pro",
      "provider": "custom",
      "apiBase": "http://127.0.0.1:8080/v1",
      "apiKey": "local-proxy-token",
      "contextWindow": 1000000,
      "maxTokens": 8192
    }
  }
}
```

### 3. 一键切换脚本（Switch Profile）

编写或使用快捷切换脚本，在官方模型与代理模式之间秒级切换：

```bash
#!/usr/bin/env bash
# switch-codex.sh
MODE=$1
if [ "$MODE" = "gemini" ]; then
  codex config set-profile gemini-proxy
  echo "✅ 已切换至 Gemini 1.5 Pro 本地代理模式"
elif [ "$MODE" = "official" ]; then
  codex config set-profile default
  echo "✅ 已恢复为 Codex 官方 OpenAI 模式"
else
  echo "用法: ./switch-codex.sh [gemini|official]"
fi
```

---

## 常见问题与避坑清单

1. **出现 503 Service Unavailable**：
   - 检查本地代理服务是否存活：`curl http://127.0.0.1:8080/v1/models`；
   - **切忌沿用旧历史对话**：切换模型后必须在 Codex 中执行 `/new` 或新建对话，由于不同模型的上下文 System Prompt 和 Tokenizer 格式不一致，沿用旧对话极易导致 503 或解析异常。
2. **Provider 不匹配错误**：
   - 确保 `apiBase` 末尾包含 `/v1`，且环境变量中未被全局 `OPENAI_BASE_URL` 强行覆盖。
3. **恢复官方环境**：
   - 执行 `codex config set-profile default` 或直接删除 custom profile 即可恢复官方默认状态。

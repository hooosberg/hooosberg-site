# 第10集｜免费模型杀疯了？神秘Ox Alpha登场：1M上下文、能看视频实测指南

> 本指南配合视频使用：实测具备 1M 超长上下文与视频直传理解能力的神秘模型 Ox Alpha，在 Cola 客户端中的配置与调用指南。

---

## 核心特性实测

- **超大上下文窗口**：支持高达 1,000,000 Token（约合 150 万中文字符）单次长会话；
- **视频与多模态原生输入**：可直接上传 MP4 视频片段或整套高分辨率图纸，实现秒级帧定位与情节分析；
- **免配环境**：通过 OpenRouter 或 Cola 聚合工作台直接体验。

---

## 在 Cola 中调用配置指南

```json
{
  "provider": "openrouter",
  "model": "ox/ox-alpha",
  "temperature": 0.3,
  "max_tokens": 4096,
  "parameters": {
    "context_window": 1000000
  }
}
```

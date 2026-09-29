# Hooosberg AI 网站智能体开发规范 (AGENTS.md)

## 模型性能排行榜 (AI Model Leaderboard) 维护法则

当用户提出 **“更新排行榜”**、**“添加新模型到天梯图”** 或类似指令时，必须严格执行以下工作流：

### 1. 数据源与交叉评测
- 底座数据源以 **LMSYS Chatbot Arena (`arena.ai`)** 为核心。
- 刚发布的新模型（样本不足一周）必须交叉核实 **Terminal-Bench 4.0**、**SWE-bench Pro** 和 **Artificial Analysis** 实测指数，理性判定档位，严禁虚标。

### 2. 卡片与视觉规范（极简高质感）
- **名称精简**：模型展示名称严禁附带 `(Max)`、`(High)`、`(preview)`、`-high` 等破坏布局的后缀，统一通过 `simplifyName()` 保持纯净。
- **公司彩色胶囊**：所有机构必须对应 `ORG_COLOR` 体系的轻量撞色圆角徽标（如 Anthropic 杏色、OpenAI 翠绿、Google 科技蓝等）。
- **去冗余**：比分与预测文本保持纯净，不得出现“预测 预测”重复。
- **高亮生命周期**：仅当期（最新 7 天内）重点新模型享有暖金边框 (`model-pill--new-this-week`) 与「本周新」角标 (`pill-new-badge`)。

### 3. 一键更新自动化工具
- 运行 `node scripts/update-leaderboard.mjs --check` 即可自动执行所有 12 个分类的重排与连续校验。
- 详尽 SOP 请查阅 [docs/AI_MODEL_LEADERBOARD_SOP.md](./docs/AI_MODEL_LEADERBOARD_SOP.md)。
- 每次更新完毕后，务必检查本地开发服务器并向用户输出更新明细表与访问链接。

---
name: update-leaderboard
description: 一键更新 Hooosberg AI 网站的大模型性能排行榜 (arena-leaderboard.json) 与前端天梯组件。当用户要求更新模型排行榜、添加新模型、同步 arena.ai 最新数据或核对性能分数时自动激活。
---

# 一键更新模型性能排行榜工作流 (Skill: update-leaderboard)

当接收到用户的更新指令（如：“更新排行榜”、“这周发布了xxx模型加进去”、“同步最新模型数据并启动服务”）时，按以下步骤一站式完成：

## 第一步：信息调研与交叉验证
1. 确认待更新模型的发布信息（研发机构、发布日期、官方定位）。
2. 若属于刚发布 1~7 天的新模型，参考以下权威基准核实其客观实力：
   - **Terminal-Bench 4.0 & SWE-bench Pro**（长链工具调用、代码及 Agent 场景）
   - **Artificial Analysis**（综合智力、任务成本与速度）
   - **Chatbot Arena / OpenLM**（首周 Elo 胜率走向）
3. 确定模型应进入的榜单（如 Agent 总榜、文本、Coding 网页代码、视觉识图等）及天梯档位（夯/顶级/人上人/NPC/拉完了）。

## 第二步：执行数据注入与排序
1. 根据最新数据更新 `src/data/arena-leaderboard.json`。
2. 保持卡片极简与高质感规范：
   - 严禁在模型名字中附带 `(Max)`、`(High)`、`-high` 等破坏版面的后缀。
   - 机构配置正确（如 `Anthropic`、`OpenAI`、`Google`、`SpaceXAI` 等），前端自动渲染专属彩色胶囊。
   - 对当期重点新模型打上 `isNewThisWeek: true`。
3. 运行校验与格式化命令：
   ```bash
   node scripts/update-leaderboard.mjs --check
   ```
   该脚本会自动根据比分对全榜单重新降序排列，校准排名并同步各 Tier。

## 第三步：服务自检与交付
1. 检查本地 Astro 服务是否正常运行（默认 `http://localhost:4321/ai-model-sanguo-ranking`）。
2. 执行 HTTP 状态检查（确保返回 200）：
   ```bash
   curl -s -o /dev/null -w "%{http_code}" "http://localhost:4321/ai-model-sanguo-ranking"
   ```
3. 向用户汇报更新汇总表（模型名称、研发机构、入选档位、核心比分与评测依据）及访问链接。

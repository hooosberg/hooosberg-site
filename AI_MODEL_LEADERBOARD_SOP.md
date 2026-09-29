# AI 模型性能排行榜更新标准作业程序 (SOP)

> 本文档沉淀了模型排行榜多轮迭代的核心设计规范、数据来源核验原则与自动化流程，确保以后通过一句话指令即可完成高水准更新。

---

## 1. 核心底座与数据核验原则

### 1.1 主数据源：LMSYS Chatbot Arena (`arena.ai`)
* **数据性质**：全球公认的大模型盲测人类偏好胜率（Human Preference Elo）与智能体综合实测（Agent Confirmed Success Rate）。
* **榜单结构对齐**：
  1. `agent`：Agent 智能体总榜（置顶核心卡片）
  2. `text`：文本能力榜
  3. `coding`：网页开发与代码榜 (WebDev)
  4. `vision`：视觉看图识图榜
  5. `document`：长文档分析提炼榜
  6. `text-to-image`：文生图绘画榜
  7. `image-edit`：图像精修编辑榜
  8. `image-to-code`：看图转网页代码榜
  9. `search`：智能搜索找资料榜
  10. `text-to-video`：文生视频榜
  11. `image-to-video`：图生视频榜
  12. `video-to-video`：视频编辑与二创风格榜

### 1.2 本周新发布的交叉验证机制
当厂商（Anthropic, OpenAI, xAI, Google, DeepSeek 等）刚刚发布新模型（上线 1~7 天内），Arena 盲测样本尚处于爬坡期，必须交叉参考以下权威基准进行理性排位：
1. **Terminal-Bench 4.0 & SWE-bench Pro**：考核终端工具调用、智能体编码与复杂工程 Bug 修复。例如 Claude Sonnet 5.5 在 Terminal-Bench 4.0 拿下 70.6%，据此可判定其属于顶级乃至冲刺“夯”档。
2. **Artificial Analysis (`artificialanalysis.ai`)**：综合智力指数、每任务成本（Cost-per-task）与产出速度。例如 GPT-6 Sol 经实测证明属于高性价比中端模型，定位不可虚高于旗舰 Claude Fable / Opus 系列。
3. **OpenLM / Chatbot Arena+**：跟踪首周高频盲测 Elo 走向。

---

## 2. 天梯五档划分与分值准则 (Agent 总榜为例)

| 档位标识 | 档位名称 | 胜率/分值参考 (Agent Arena) | 定位说明 | 代表模型示例 |
| :--- | :--- | :--- | :--- | :--- |
| **hang** | **夯** | **> 10.0%** 或 各分项断层 #1 | 神级独一档 · 绝对巅峰 | Claude Fable 5.1, Claude Opus 5.5, GPT-6 Astra, Claude Sonnet 5.5 |
| **dingji** | **顶级** | **8.0% ~ 10.0%** | 第一梯队主力 · 性能彪悍 | Claude Opus 5, Claude Fable 5, Claude Opus 4.8 |
| **renshangren**| **人上人** | **5.0% ~ 8.0%** | 主流高阶水准 · 表现亮眼 | GPT 5.6 Sol, Kimi K3, GPT-6 Sol, Claude Sonnet 5, Hy4 |
| **npc** | **NPC** | **2.5% ~ 5.0%** | 中规中矩 · 随处可见的路人水平 | DeepSeek V4.1 Flash, Gemini 3.8 Flash, GLM 5.2, Grok 4.7, Qwen3.8 Max |
| **lawanle** | **拉完了** | **< 2.5%** | 时代眼泪 · 跟不上前沿的垫底梯队 | Grok 4.6, GPT-6 Luna, Terra, GPT 5.4, 负胜率模型 |

---

## 3. 卡片视觉与设计规范 (极简高质感)

1. **名称精简过滤 (严禁冗余后缀)**：
   * 严禁出现 `(Max)`, `(High)`, `(xHigh)`, `(preview)`, `-high`, `-max` 等破坏排版的后缀。
   * 使用 `simplifyName()` 保持名称干净利落。
2. **机构彩色胶囊系统 (`ORG_COLOR`)**：
   * 不同公司采用专属微撞色配色，例如：
     * Anthropic: 浅杏色底 + 焦橙字 (`#fde8d8` / `#c2410c`)
     * OpenAI: 浅薄荷绿底 + 墨绿字 (`#d1fae5` / `#065f46`)
     * Google: 浅蓝底 + 宝蓝字 (`#dbeafe` / `#1e40af`)
     * Meta: 浅浅紫底 + 葡萄紫字 (`#ede9fe` / `#5b21b6`)
     * DeepSeek: 冰海蓝底 + 湛蓝字 (`#e0f2fe` / `#0369a1`)
     * Alibaba / 阿里: 浅粉红底 + 绯红字 (`#fee2e2` / `#991b1b`)
     * xAI: 冷石墨灰底 + 炭黑字 (`#f1f5f9` / `#334155`)
     * Moonshot / Kimi: 浅暖黄底 + 焦糖字 (`#fef3c7` / `#92400e`)
     * 字节跳动 / 腾讯 / 百度 / 快手 / 微软 等均已预设专属色。
3. **分数展示**：
   * 格式干净统一，预测模型仅显示数值或带单次“预测”角标，严禁出现“预测 预测 10%”等重复字样。

---

## 4. 「本周新」标签与高亮生命周期

1. **上新标记**：
   * 本周新模型在 JSON 中配置 `isNewThisWeek: true`。
   * 卡片展示专属浅暖金边框 (`model-pill--new-this-week`) 与右上角「本周新」角标 (`pill-new-badge`)。
2. **旧高亮自动清理 (生命周期 7 天)**：
   * 下一轮更新发布时，上一轮模型的 `isNewThisWeek` 字段自动清除，恢复中性白色卡片，确保全站高亮模型始终代表“当期最新动态”。
3. **旧预测模型转正**：
   * 随着模型盲测数据落地，将原本的 `forecastKey` 移除或转为真实实测胜率，旧的预测彩色大背景一律取消。

---

## 5. 一句话更新标准操作流 (SOP)

当用户发出类似以下指令时：
> *“更新排行榜：这周新发布了 xxx 模型，结合最新评测更新上去”*
> *“根据最新 arena 数据把本周新模型更新一下，启动服务我检查”*

**Agent 执行步骤**：
1. **信息调研**：检索该模型发布日期、官方定位、Terminal-Bench / SWE-bench / Artificial Analysis 评测分数。
2. **确定入榜分类与分级**：判定归属榜单（总榜、代码榜、视觉榜等）以及档位（夯/顶级/人上人等）。
3. **运行维护脚本**：执行 `node scripts/update-leaderboard.mjs` 自动更新 `arena-leaderboard.json`，并清理往期高亮。
4. **编译与响应核验**：确保 `AiModelTierRanking.astro` 页面无错误，HTTP 状态码为 200。
5. **本地启动服务**：通过 `npm run dev` 运行，向用户输出更新汇总表及访问地址。

# 第42集｜终极白嫖！数十款顶级模型免费接入 WorkBuddy：OpenCode＋Zen-Gate 反代二合一神器

> **面向小白的极简实操指南**：告别充值与额度焦虑！教你用自然语言命令让 WorkBuddy 自动完成 OpenCode 终端与 Zen-Gate 开源反代网关的本地配置，一网打尽全网数十款顶尖免费 AI 模型并无缝接回 WorkBuddy 日常办公。

---

## 一、为什么需要这套方案？（痛点分析）

1. **官方活动退潮**：WorkBuddy 之前的免费额度赠送与每日加油签到活动陆续收尾，很多重度办公用户面临付费充值或算力卡不足的困境。
2. **常规免费模型太鸡肋**：国内许多平台虽然标榜“免费”，但通常只提供 1 款轻量或参数较低的基础模型，智商与代码能力较弱，而且有严格的每日提问频次或天数限制。
3. **短期羊毛不可靠**：市面上的 API 中转站虽然偶尔有免费活动，但往往上线几天就失效或关门，缺乏长期稳定使用的保障。
4. **终极二合一解法**：
   - **OpenCode**：官方在终端（CLI）环境下极其慷慨地开放了十余款顶级免费模型池（包括 DeepSeek V4.1、GLM 5.3、Nemotron 3.5、LongCat 等）；
   - **Zen-Gate**：本地开源网关，专门把包括 OpenCode 在内的全网免费资源汇聚，并在本地生成反向代理接口，原生支持一键注入 WorkBuddy！

---

## 二、核心资源网址导航（先收藏备用）

| 工具 / 资源 | 网址链接 | 核心作用与使用说明 |
| :--- | :--- | :--- |
| **OpenCode 官方网站** | [https://opencode.ai/](https://opencode.ai/) | 汇聚顶级开源免费模型池的终端神器（CLI 端送免费模型）。 |
| **Zen-Gate 开源仓库** | [https://github.com/LAGcomcom/zen-gate](https://github.com/LAGcomcom/zen-gate) | 将全网免费模型聚合反代到 WorkBuddy 的本地开源网关项目。 |
| **Zen-Gate 本地控制台** | [http://127.0.0.1:8787/](http://127.0.0.1:8787/) | 本地服务启动后的管理后台，可查看所有模型状态并一键开关对接。 |
| **个人博客教程专栏** | [https://hooosberg.com/blog/](https://hooosberg.com/blog/) | 本套教程完整图文、提示词模版与更多自动化办公笔记持续更新处。 |

---

## 三、神器一：OpenCode 终端免费模型池极简配置

### 1. 核心思路
OpenCode 桌面客户端目前不赠送免费模型，但**终端命令行版本**赠送了非常丰富的顶级模型。
为了不让小白面对黑底白字的终端产生畏难情绪，我们**全程不手动敲命令**，直接让 WorkBuddy 代劳！

### 2. 发给 WorkBuddy 的自然语言指令（直接复制）

```text
帮我在当前电脑的终端环境中配置并安装 OpenCode（官方网址：https://opencode.ai/ ）。
要求：
1. 自动检测系统环境（macOS / Windows / Linux）并执行正规一键安装脚本；
2. 安装完成后，测试运行 `opencode --version` 确保命令可执行；
3. 告诉我如何在终端输入 `/model` 查看自带的免费模型列表。
```

### 3. 验证与模型列表查看
安装完成后，若想在终端里快速体验：
1. 在终端输入 `opencode` 回车启动交互；
2. 输入命令 `/model`（或退出后执行 `opencode models`）；
3. 屏幕上会列出十余款带 `free` 标识的高智商模型：
   - `opencode/deepseek-v4.1-flash-free`
   - `opencode/glm-5.3-flash-free`
   - `opencode/nemotron-3.5-lightning-free`
   - `opencode/nemotron-3-ultra-free`
   - `opencode/big-pickle`
   - `opencode/longcat-2.5-preview-free`
   - `opencode/mimo-v2.6-flash-free`
   - `opencode/space-bunny-free`
   - `opencode/beam-free`
4. 用键盘方向键即可自由选择并无限制免费使用！

---

## 四、神器二：Zen-Gate 开源网关，把免费资源全部反代进 WorkBuddy

### 1. 核心思路
终端虽然强大，但我们在日常办公中最依赖的还是 WorkBuddy 的图形界面（读写 Excel 表格、生成 Word 公文、排版幻灯片和多智能体工作流）。
通过 **Zen-Gate** 开源网关，可以在本地架设反向代理，把 OpenCode 与全网免费模型直接“搬”进 WorkBuddy 的模型下拉列表里！

### 2. 发给 WorkBuddy 的自然语言指令（直接复制）

```text
请帮我在电脑本地配置并启动这个开源反向代理网关项目：
GitHub 仓库：https://github.com/LAGcomcom/zen-gate
要求：
1. 检查本地环境，完成依赖安装与二进制配置；
2. 启动本地后台服务，确保服务稳定监听在 http://127.0.0.1:8787/ ；
3. 保持后台常驻运行，配置完成后将本地管理面板访问地址告诉我。
```

---

## 五、最后一步：打开本地后台开关，WorkBuddy 畅享顶级模型

当 WorkBuddy 在后台自动完成 Zen-Gate 的安装与启动后，你只需做一次极简的网页确认：

1. **打开控制台**：在浏览器访问本地后台地址：`http://127.0.0.1:8787/`；
2. **查看聚合模型**：在仪表盘首页，你会看到所有自动嗅探和纳管的免费大模型列表及其健康状态；
3. **开启 WorkBuddy 支持**：
   - 在控制台中找到 **WorkBuddy** 开关，轻轻点击切换为 **ON（开启）**；
   - *（注：或者在 WorkBuddy 的「设置 → 自定义模型 / API 接口」中，将 API Base URL 填入 `http://127.0.0.1:8787/v1`）*；
4. **尽情使用**：回到 WorkBuddy 对话界面，在模型选择栏中，所有反代进来的数十款顶级模型即可随心调用！

---

## 六、小白避坑清单与日常实操建议

- [ ] **本地服务常驻**：Zen-Gate 是轻量级本地代理程序，电脑开机后保持后台运行即可。若某天 WorkBuddy 提示模型请求失败，先在浏览器打开 `http://127.0.0.1:8787/` 检查本地服务是否正常在线。
- [ ] **自然语言是万能钥匙**：遇到任何 GitHub 开源工具，切忌自己硬啃繁琐的开发文档。直接将仓库 URL 和目标扔给 WorkBuddy，让它为你充当专属 AI 运维管家。
- [ ] **多智能体分工更省算力**：结合第 41 集讲到的子智能体编排思路，你可以用顶级的免费长推理模型做 Master 规划拆解，用极速轻量免费模型做 Worker 批量执行数据清洗与格式导出，真正实现全流程零成本闭环！

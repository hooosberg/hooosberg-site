export type LearningSeriesId = "paid" | "workbuddy" | "cola";

export type LearningLesson = {
  number: number;
  title: string;
  outcome: string;
  articleSlug?: string;
  hasDownload?: boolean;
  videoUrl?: string;
  isPinned?: boolean;
  badge?: string;
};

export type LearningSeries = {
  id: LearningSeriesId;
  title: string;
  shortTitle: string;
  badge?: string;
  toolLine: string;
  description: string;
  playlistUrl: string;
  buyUrl?: string;
  price?: string;
  originalPrice?: string;
  lessons: LearningLesson[];
};

export const paidCourseUrl = "https://www.bilibili.com/cheese/play/ss402180572?csource=private_space_class_null&spm_id_from=333.1387.0.0";
const workbuddyPlaylistUrl = "https://space.bilibili.com/3546822886820332/lists/8625038?type=season";
const colaPlaylistUrl = "https://space.bilibili.com/3546822886820332/lists/8881026?type=season";

export const learningSeries: LearningSeries[] = [
  {
    id: "paid",
    title: "AI办公新手入门_智能体与自动化实战",
    shortTitle: "WorkBuddy收费实战课自动化办公",
    badge: "B 站官方付费课程",
    toolLine: "腾讯 WorkBuddy 主讲 · 23 课四篇阶梯实战 · 送 23 套随课实操素材",
    description: "面向办公新手的 AI 智能体通识 + 真实业务实战 + 自动化方法课。掌握工作区安全、Word保真填报、OCR复核、Excel清洗与业务算薪、群聊台账与专属 Skill 封装。",
    playlistUrl: paidCourseUrl,
    buyUrl: paidCourseUrl,
    price: "¥199",
    originalPrice: "¥299",
    lessons: [
      { number: 1, title: "第 01 课：第一次使用办公智能体：安装、登录、界面认识与你的第一个桌面文件", outcome: "官方安全安装登录；口述三款工具差异；认识主界面；跑通桌面写唐诗 Hello World 验证。", articleSlug: "video-paid-lesson1-install-first-file", hasDownload: true },
      { number: 2, title: "第 02 课：把电脑交给AI放心吗？规范工作区与最小权限设置", outcome: "搭建四目录隔离工作区；配置最小权限原则；活动资料只读自检。", articleSlug: "video-paid-lesson2-workspace-boundaries", hasDownload: true },
      { number: 3, title: "第 03 课：聊天AI已经会用了，为什么工作还是得自己做？", outcome: "跨材料（邮件+订单）精准提取事实，回填跟进表第一行并标注待确认。", articleSlug: "video-paid-lesson3-cross-file-extraction", hasDownload: true },
      { number: 4, title: "第 04 课：开完会最怕的不是没纪要，而是没人知道下一步谁来做", outcome: "长文本噪音过滤；多要素行动项抽取；生成标准行动清单与高管摘要。", articleSlug: "video-paid-lesson4-meeting-action-items", hasDownload: true },
      { number: 5, title: "第 05 课：为什么同一个AI，有时很好用，有时完全跑偏？", outcome: "把模糊要求拆成：目标、材料、规则、边界、输出、验收六要素提示词。", articleSlug: "video-paid-lesson5-six-element-prompts", hasDownload: true },
      { number: 6, title: "第 06 课：下载文件夹乱成垃圾场，AI能不能整理又不把文件搞丢？", outcome: "穿透识别文件属性；分类重命名；先预演再执行；保留改动记录。", articleSlug: "video-paid-lesson6-download-folder-cleanup", hasDownload: true },
      { number: 7, title: "第 07 课：Word最折磨人的不是写字，而是“必须按这个模板一格不动地填”", outcome: "模板约束、跨文件取值、字段来源、在副本中保持原样排版回填。", articleSlug: "video-paid-lesson7-word-template-fill", hasDownload: true },
      { number: 8, title: "第 08 课：一堆拍照单据，真正难的是金额一个都不能错", outcome: "多模态图片/PDF单据提取；金额置信度校验；低置信度人工复核。", articleSlug: "video-paid-lesson8-ocr-receipt-verification", hasDownload: true },
      { number: 9, title: "第 09 课：表格公式没错，为什么分析结果还是不可信？先把脏数据处理掉", outcome: "数据质量诊断、清洗规则、去重去空格、原表保留与变更日志。", articleSlug: "video-paid-lesson9-excel-data-cleaning", hasDownload: true },
      { number: 10, title: "第 10 课：几十张月报格式还不一样，难点不是复制粘贴，是口径能不能对上", outcome: "建立异构字段映射字典；批量堆叠合并；来源追踪与总额校验。", articleSlug: "video-paid-lesson10-heterogeneous-sheets-merge", hasDownload: true },
      { number: 11, title: "第 11 课：Excel最难的不是公式，是公司那套“只有老员工才讲得清”的规则", outcome: "自然语言业务规则→多岗位计算逻辑→中间变量→人工抽检算薪。", articleSlug: "video-paid-lesson11-rules-to-salary-calculation", hasDownload: true },
      { number: 12, title: "第 12 课：老板不想看一百行数据，他只想知道：哪里卖得好、哪里压货、下周怎么办", outcome: "进销存交叉分析、售罄率/存销比、缺货滞销识别、建议强绑定行号证据。", articleSlug: "video-paid-lesson12-inventory-cross-analysis", hasDownload: true },
      { number: 13, title: "第 13 课：分析做完了，为什么还要花半天复制图表做PPT？", outcome: "从分析结果提炼决策大纲、生成可编辑PPT与图表、逐页核数。", articleSlug: "video-paid-lesson13-data-analysis-to-ppt", hasDownload: true },
      { number: 14, title: "第 14 课：员工天天问“报销上限多少、请假找谁”，资料明明有却总找不到", outcome: "制度文档结构化入库；穿透条款出处；识别新旧冲突与知识缺口。", articleSlug: "video-paid-lesson14-corporate-knowledge-base", hasDownload: true },
      { number: 15, title: "第 15 课：每天开十几个网站找项目，真正浪费的是重复搜索和筛选", outcome: "跨网页抓取公告、华东/预算/截止期硬条件初筛去重、商机建议表。", articleSlug: "video-paid-lesson15-web-bidding-screening", hasDownload: true },
      { number: 16, title: "第 16 课：销售不是缺名单，而是缺“这家公司为什么值得联系”的证据", outcome: "公开资料深度穿透→提炼痛点画像→生成客户背调卡与破冰词。", articleSlug: "video-paid-lesson16-customer-due-diligence", hasDownload: true },
      { number: 17, title: "第 17 课：群里一天几百条消息，第二天最怕一句“这个谁跟了？”", outcome: "长聊天记录中剥离加单/改单事件；结构化记入台账；生成主管晨报。", articleSlug: "video-paid-lesson17-chat-log-to-ledger", hasDownload: true },
      { number: 18, title: "第 18 课：客户研究做完了，怎么用 QQ 邮箱连接器把定制邮件安全发出去？", outcome: "复用研究成果；微信话术转邮件；QQ 邮箱连接器；草稿预览与人工确认。", articleSlug: "video-paid-lesson18-email-connector-draft", hasDownload: true },
      { number: 19, title: "第 19 课：同样的工作每周都做，为什么每次还要贴一大段Prompt？", outcome: "先做成一次→从成功对话保存 Skill→换新输入一键复用。", articleSlug: "video-paid-lesson19-experience-to-skill", hasDownload: true },
      { number: 20, title: "第 20 课：让做好的 Skill 自己按时运行：每周招投标初筛变成定时任务", outcome: "复用招投标初筛；保存 Skill；配置周定时运行与失败停止留痕。", articleSlug: "video-paid-lesson20-skill-scheduler-patrol", hasDownload: true },
      { number: 21, title: "第 21 课：AI的安全问题：敏感信息安全拦截门", outcome: "发信前审核敏感财务/密码/承诺；触敏即阻断拦截并输出安全版。", articleSlug: "video-paid-lesson21-sensitive-data-guardrail", hasDownload: true },
      { number: 22, title: "第 22 课：十步做出可视化运营工作台：知识库、聊天、订单、库存和生产进度在一张网页里", outcome: "复用企业知识库、聊天变台账、数据分析；跑通三模块生成单页 HTML。", articleSlug: "video-paid-lesson22-single-page-dashboard", hasDownload: true },
      { number: 23, title: "第 23 课：毕业实战：把成熟 Skill 编排成多条教师工作流", outcome: "组合考试复盘、家校周报、教研研读和期末计划四条流程；保留人工确认节点。", articleSlug: "video-paid-lesson23-modular-project-workflow", hasDownload: true },
    ],
  },
  {
    id: "workbuddy",
    title: "WorkBuddy AI办公教程",
    shortTitle: "WorkBuddy AI办公教程",
    toolLine: "适用于 WorkBuddy、豆包办公、千问办公等工具 · 34 集免费课",
    description: "从第一次给 AI 下任务开始，学习资料整理、表格、文档、工作流、浏览器和本地文件的基础用法。",
    playlistUrl: workbuddyPlaylistUrl,
    lessons: [
      { number: 1, title: "第 01 课：用 Excel 案例学会 AI 自动化办公", outcome: "从真实表格任务理解 AI 办公的基本流程。", articleSlug: "video-workbuddy-lesson1-excel-automation" },
      { number: 2, title: "第 02 课：用 AI 自动生成唐代壁画 PPT", outcome: "把资料、逐页大纲和设计要求交给 AI。", articleSlug: "video-workbuddy-lesson2-ppt-murals" },
      { number: 3, title: "第 03 课：Word 公文排版自动化", outcome: "按格式要求生成可交付 Word 文档。", articleSlug: "video-workbuddy-lesson3-word-formatting" },
      { number: 4, title: "第 04 课：用 WorkBuddy 修改图片", outcome: "用版本化流程处理图片修改。", articleSlug: "video-workbuddy-lesson4-image-editing" },
      { number: 5, title: "第 05 课：AI 一键制作企业宣传海报", outcome: "把文案、图片、排版和检查拆成可复用流程。", articleSlug: "video-workbuddy-lesson5-ai-poster" },
      { number: 6, title: "第 06 课：清理 Windows 电脑软件", outcome: "完成软件残留检查、清理与正规安装。", articleSlug: "video-workbuddy-lesson6-windows-cleanup" },
      { number: 7, title: "第 07 课：招投标资料整理与报价分析", outcome: "建立可复用的报价工作区。", articleSlug: "video-workbuddy-lesson7-bidding-workspace" },
      { number: 8, title: "第 08 课：高考志愿与留学选校规划", outcome: "将个人资料整理成可核对的升学规划。", articleSlug: "video-workbuddy-lesson8-study-planning" },
      { number: 9, title: "第 09 课：创建自己的找工作专家", outcome: "把简历和岗位要求组织成求职工作流。", articleSlug: "video-workbuddy-lesson9-job-expert" },
      { number: 10, title: "第 10 课：让 AI 每天自动领美团优惠券", outcome: "理解重复网页任务的自动化边界。", articleSlug: "video-workbuddy-lesson10-meituan-coupons" },
      { number: 11, title: "第 11 课：自动化采购", outcome: "整理采购资料并完成采购分析。", articleSlug: "video-workbuddy-lesson11-procurement-analysis" },
      { number: 12, title: "第 12 课：96 张工资表整理与薪酬分析", outcome: "处理多表数据并核对薪酬结果。", articleSlug: "video-workbuddy-lesson12-salary-workspace" },
      { number: 14, title: "第 14 课：Excel 极简入门", outcome: "用小白视角建立表格任务的操作路径。", articleSlug: "video-workbuddy-lesson14-excel-basics" },
      { number: 15, title: "第 15 课：文件夹和网页工作台管理任务", outcome: "搭出可持续使用的任务工作台。", articleSlug: "video-workbuddy-lesson15-workflow-dashboard" },
      { number: 16, title: "第 16 课：每周自动更新的销售库存看板", outcome: "从原始数据生成复用看板。", articleSlug: "video-workbuddy-lesson16-inventory-dashboard" },
      { number: 17, title: "第 17 课：Xcode 打通 Codex 与 Claude Code", outcome: "理解 AI 编程工具的协作方式。", articleSlug: "video-workbuddy-lesson17-xcode-agents" },
      { number: 18, title: "第 18 课：Hy3 模型与 AI 办公学习", outcome: "认识模型额度与工具选择。", articleSlug: "video-workbuddy-lesson18-hy3-model" },
      { number: 19, title: "第 19 课：让 AI 自动发论坛帖子", outcome: "从浏览器自动化理解人工确认边界。", articleSlug: "video-workbuddy-lesson19-agentlimb-forum-posting" },
      { number: 20, title: "第 20 课：报销表核对 Skill", outcome: "把表格复核沉淀为可重复的 Skill。", articleSlug: "video-workbuddy-lesson20-expense-reimbursement-skill" },
      { number: 21, title: "第 21 课：解决 AI 配图丑的 Skill", outcome: "建立视觉抽象与配图检查流程。", articleSlug: "video-workbuddy-lesson21-visual-illustration-skill" },
      { number: 22, title: "第 22 课：公司群消息与客户信息管理", outcome: "将微信资料管理为可查询流程。", articleSlug: "video-workbuddy-lesson22-wechat-manager", hasDownload: true },
      { number: 23, title: "第 23 课：网页数据导出与钉钉推送", outcome: "完成网页数据、表格和群消息的连接。", articleSlug: "video-workbuddy-lesson23-web-export-dingtalk", hasDownload: true },
      { number: 24, title: "第 24 课：工资数据安全的本地工作区", outcome: "用数据与表格分离保护敏感内容。", articleSlug: "video-workbuddy-lesson24-salary-data-boundaries" },
      { number: 25, title: "第 25 课：微信客户订单管理工作台", outcome: "建立订单信息与进度的工作台。", articleSlug: "video-workbuddy-lesson25-wechat-order-workbench", hasDownload: true },
      { number: 26, title: "第 26 课：B 站自动投稿流程做成 Skill", outcome: "将已跑通的浏览器流程沉淀为可复用 Skill。", articleSlug: "video-workbuddy-lesson26-bilibili-skill", hasDownload: true },
      { number: 27, title: "第 27 课：手机远程控制电脑", outcome: "用手机查看任务、调取文件和安排电脑工作。", articleSlug: "video-workbuddy-lesson27-mobile-remote" },
      { number: 28, title: "第 28 课：DeepSeek 接入自定义模型", outcome: "理解 Token、API Key、接口地址和模型 ID。", articleSlug: "video-workbuddy-lesson28-custom-model" },
      { number: 29, title: "第 29 课：新手任务与成长积分", outcome: "从零开始熟悉 AI 办公助手。", articleSlug: "video-workbuddy-lesson29-beginner" },
      { number: 30, title: "第 30 课：公众号文章一键转 Word", outcome: "将公众号内容与图片整理为本地 Word。", articleSlug: "video-workbuddy-lesson30-wechat-to-word", hasDownload: true },
      { number: 31, title: "第 31 课：商业授权合同审查与谈判", outcome: "四轮审查谈判、条款利益重拟与交付自动化。", articleSlug: "video-workbuddy-lesson31-contract-review", hasDownload: true },
      { number: 32, title: "第 32 课：餐饮成本核算与保本线分析", outcome: "把经营截图转化为带公式双表并封装为 Skill。", articleSlug: "video-workbuddy-lesson32-catering-cost-excel", hasDownload: true },
      { number: 33, title: "第 33 课：豆包办公＋开源公文 Skill", outcome: "把开源公文 Skill 装进 AI 生成规范公文 Word。", articleSlug: "video-workbuddy-lesson33-doubao-gongwen-skill", hasDownload: true },
      { number: 34, title: "第 34 课：AI Agent 时代的知识库", outcome: "理解底层文件、中层 Agent 与上层工具的极简架构。", articleSlug: "video-workbuddy-lesson34-folder-as-knowledge-base", hasDownload: true },
    ],
  },
  {
    id: "cola",
    title: "Codex 编程教程",
    shortTitle: "Codex编程教程",
    toolLine: "Codex / Claude Code / ChatGPT / 实战项目开发",
    description: "汇聚真实工业工具实战、ChatGPT 视觉设计工作流与前沿大模型深度评测，均附演示视频与实操课件要点。",
    playlistUrl: colaPlaylistUrl,
    lessons: [
      // 置顶教学：账号星球与海外AI账号充值全流程指南
      {
        number: 25,
        title: "【置顶指南】Codex、Gemini与ChatGPT海外账号如何获取？AI会员自助充值与避坑全流程教学",
        outcome: "海外AI账号注册、会员充值、防止封号与纯净环境全套实战教学，附专属快速通道。",
        articleSlug: "video-codex-account-registration-recharge-guide",
        isPinned: true,
        hasDownload: false,
      },
      // 最新发布倒序排列（编号倒序：最新一课编号最大，与 WorkBuddy 对齐）
      { number: 24, title: "Codex外挂Gemini！白嫖Antigravity模型，反向代理全自动配置", outcome: "通过CLIProxyAPI把Gemini接进Codex走本地反向代理，实现一键切换多模型。", articleSlug: "video-codex-gemini-proxy", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 23, title: "我和13.9万个果蝇神经元玩了一下午游戏", outcome: "将全脑连接组搬进电脑，实测果蝇生物神经元在游戏对抗与智能决策中的表现。", articleSlug: "video-codex-fruitfly-brain", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 22, title: "失业了、迷茫了？看看你的性格到底适合做什么", outcome: "用性格特质与AI时代生产力工具匹配个人发展道路与创作定位。", articleSlug: "video-codex-career-personality", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 21, title: "ChatGPT Images 2.5 + Codex Astra：AI海报直接变可编辑PSD，设计行业要变天", outcome: "ChatGPT生图联动Codex Astra操作PS，自动重建图层、文字与分组为可编辑PSD。", articleSlug: "video-codex-chatgpt-psd", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 20, title: "AI漫剧别再死磕提示词了！ChatGPT Image 2.5用草图精准控制人物姿势", outcome: "用极简草图替代千字Prompt，精准锁定人物动态与画面构图。", articleSlug: "video-codex-chatgpt-sketch-pose", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 19, title: "ChatGPT Image 2.5炸了｜一键生成AI漫剧MV分镜，9个镜头直接出片", outcome: "9个电影感分镜一气呵成，掌握保持角色一致性与分镜运镜控制技巧。", articleSlug: "video-codex-chatgpt-mv-storyboard", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 18, title: "最新GPT-6 Astra 实测｜一张四视图，直接生成可拆可编辑 Blender 高达！", outcome: "挑战极高难度：一张四视图输入直接逆向生成分层可拆解的3D高达模型。", articleSlug: "video-codex-gundam-3d", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 17, title: "最新GPT-6 Astra 实测｜一张三视图，直接生成可编辑 Blender 豹2坦克！", outcome: "实测GPT-6 Astra多视图还原3D结构件，生成工业软件可二次修改的Blender模型。", articleSlug: "video-codex-leopard-tank", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 16, title: "WorkBuddy 海外版 VS 国内版｜海外版更香？", outcome: "横向对比WorkBuddy海内外版本功能特权、模型支持与网络环境差异。", articleSlug: "video-codex-workbuddy-global-vs-cn", videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 15, title: "Hy4 Preview 实测｜一题硬刚 ChatGPT、Gemini！谁的网页动画能力最强？", outcome: "高难度前端动效Prompt盲测，实测最新Hy4与顶尖闭源模型编码输出能力。", articleSlug: "video-codex-hy4-preview-animation", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 14, title: "第 05 课：AionUi＋B.AI：免费大模型API接入，零成本手搓专属WorkBuddy", outcome: "在开源 Agent 客户端中接入免费大模型 API，完成 Coding 与多模态工作流配置。", articleSlug: "video-codex-lesson5-aionui-bai-free-api", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 13, title: "如果AI模型都是三国人物：谁是诸葛亮，谁是吕布？", outcome: "以生动三国人物类比各家大模型真实性格与长短板，直观选型不踩坑。", articleSlug: "video-codex-ai-sanguo-ranking", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 12, title: "我们一直误解了自动化办公？从Excel到AI智能体，AI自动化办公正在彻底换代", outcome: "深度梳理Office自动化演进史，解析从VBA/RPA到LLM原生Agent的范式跃迁。", articleSlug: "video-codex-office-automation-evolution", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 11, title: "豆包工作正式发布！AI办公“三足鼎立”：WorkBuddy×千问办公×豆包工作三家横评", outcome: "三款主流国内AI办公产品深度横向评测，对比本地操作、工作流与表格处理上限。", articleSlug: "video-codex-office-trio-review", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 10, title: "免费模型杀疯了？神秘Ox Alpha登场：1M上下文、能看视频", outcome: "实测神秘Ox Alpha长文本与多模态视频分析能力，免配环境上手体验。", articleSlug: "video-codex-ox-alpha-review", hasDownload: true, videoUrl: "https://www.bilibili.com/video/BV1Cj8t6cEsz/" },
      { number: 9, title: "AI炒股预测宇树科技有差距？Fable 5 VS 豆包对比实测", outcome: "使用Claude Code对比不同大模型在量化金融预测中的表现。", articleSlug: "video-codex-ai-stock-fable-vs-doubao", videoUrl: "https://www.bilibili.com/video/BV1TY8M6mEox/" },
      { number: 8, title: "WorkBuddy VS 千问办公：腾讯阿里AI办公正面对决，谁更好用？", outcome: "腾讯与阿里AI办公助手在真实文档与复杂表格业务场景下的实战PK。", articleSlug: "video-codex-workbuddy-vs-qwen", videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 7, title: "不用折腾Codex、Claude和Gemini了！三合一高价值工作流", outcome: "一个工作流搞定AI生图、股票分析与自动化编程，一键串联海外顶尖模型环境。", articleSlug: "video-codex-trio-workflow", hasDownload: true, videoUrl: "https://www.bilibili.com/video/BV1MrbQ6ME6n/" },
      { number: 6, title: "第一个Vibe Coding项目，我推翻重做了｜WitNote 2.0重构记录", outcome: "真实独立产品WitNote从Demo到生产级架构推翻重做，总结AI协作开发避坑指南。", articleSlug: "video-codex-witnote-vibe-coding", videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 5, title: "第 04 课：固定 Word 模板自动填充", outcome: "在副本上受控回填，保持版式不变。", articleSlug: "video-codex-lesson4-word-template-fill", videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 4, title: "第 03 课：十几张散表理清奖金规则", outcome: "固化规则、保留中间列，再抽样反算。", articleSlug: "video-codex-lesson3-bonus-rules", videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
      { number: 3, title: "第 02 课：30 份简历批量初筛", outcome: "把岗位门槛变成可回查的初筛矩阵。", articleSlug: "video-codex-lesson2-resume-screening", videoUrl: "https://www.bilibili.com/video/BV1w6hG6pEbg/" },
      { number: 2, title: "第 01 课：多部门乱表合并＋自动找异常", outcome: "先统一字段口径，再保留来源做受控合并。", articleSlug: "video-codex-lesson1-expense-sheet-merge", videoUrl: "https://www.bilibili.com/video/BV1CFbo66Ebm/" },
      { number: 1, title: "01-我做了一款笔记 App，才发现 Markdown 可能是 AI 时代最重要的文字格式", outcome: "从自研笔记软件开发实战，拆解Markdown在AI上下文与Agent交付中的核心价值。", articleSlug: "video-codex-markdown-ai-format", hasDownload: true, videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season" },
    ],
  },
];

export const getLearningSeries = (id: LearningSeriesId) => learningSeries.find((series) => series.id === id);



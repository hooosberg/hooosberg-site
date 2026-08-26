export type LearningSeriesId = "workbuddy" | "cola";

export type LearningLesson = {
  number: number;
  title: string;
  outcome: string;
  articleSlug?: string;
  hasDownload?: boolean;
};

export type LearningSeries = {
  id: LearningSeriesId;
  title: string;
  shortTitle: string;
  toolLine: string;
  description: string;
  playlistUrl: string;
  lessons: LearningLesson[];
};

const workbuddyPlaylistUrl = "https://space.bilibili.com/3546822886820332/lists/8625038?type=season";
const colaPlaylistUrl = "https://space.bilibili.com/3546822886820332/lists/8881026?type=season";

export const learningSeries: LearningSeries[] = [
  {
    id: "workbuddy",
    title: "AI 自动化办公入门绿皮书",
    shortTitle: "入门绿皮书",
    toolLine: "适用于 WorkBuddy、豆包办公、千问办公等工具 · 30 集免费课",
    description: "从第一次给 AI 下任务开始，学习资料整理、表格、文档、工作流、浏览器和本地文件的基础用法。",
    playlistUrl: workbuddyPlaylistUrl,
    lessons: [
      { number: 1, title: "用 Excel 案例学会 AI 自动化办公", outcome: "从真实表格任务理解 AI 办公的基本流程。", articleSlug: "video-workbuddy-lesson1-excel-automation" },
      { number: 2, title: "用 AI 自动生成唐代壁画 PPT", outcome: "把资料、逐页大纲和设计要求交给 AI。", articleSlug: "video-workbuddy-lesson2-ppt-murals" },
      { number: 3, title: "Word 公文排版自动化", outcome: "按格式要求生成可交付 Word 文档。", articleSlug: "video-workbuddy-lesson3-word-formatting" },
      { number: 4, title: "用 WorkBuddy 修改图片", outcome: "用版本化流程处理图片修改。", articleSlug: "video-workbuddy-lesson4-image-editing" },
      { number: 5, title: "AI 一键制作企业宣传海报", outcome: "把文案、图片、排版和检查拆成可复用流程。", articleSlug: "video-workbuddy-lesson5-ai-poster" },
      { number: 6, title: "清理 Windows 电脑软件", outcome: "完成软件残留检查、清理与正规安装。", articleSlug: "video-workbuddy-lesson6-windows-cleanup" },
      { number: 7, title: "招投标资料整理与报价分析", outcome: "建立可复用的报价工作区。", articleSlug: "video-workbuddy-lesson7-bidding-workspace" },
      { number: 8, title: "高考志愿与留学选校规划", outcome: "将个人资料整理成可核对的升学规划。", articleSlug: "video-workbuddy-lesson8-study-planning" },
      { number: 9, title: "创建自己的找工作专家", outcome: "把简历和岗位要求组织成求职工作流。", articleSlug: "video-workbuddy-lesson9-job-expert" },
      { number: 10, title: "让 AI 每天自动领美团优惠券", outcome: "理解重复网页任务的自动化边界。", articleSlug: "video-workbuddy-lesson10-meituan-coupons" },
      { number: 11, title: "自动化采购", outcome: "整理采购资料并完成采购分析。", articleSlug: "video-workbuddy-lesson11-procurement-analysis" },
      { number: 12, title: "96 张工资表整理与薪酬分析", outcome: "处理多表数据并核对薪酬结果。", articleSlug: "video-workbuddy-lesson12-salary-workspace" },
      { number: 14, title: "Excel 极简入门", outcome: "用小白视角建立表格任务的操作路径。", articleSlug: "video-workbuddy-lesson14-excel-basics" },
      { number: 15, title: "文件夹和网页工作台管理任务", outcome: "搭出可持续使用的任务工作台。", articleSlug: "video-workbuddy-lesson15-workflow-dashboard" },
      { number: 16, title: "每周自动更新的销售库存看板", outcome: "从原始数据生成复用看板。", articleSlug: "video-workbuddy-lesson16-inventory-dashboard" },
      { number: 17, title: "Xcode 打通 Codex 与 Claude Code", outcome: "理解 AI 编程工具的协作方式。", articleSlug: "video-workbuddy-lesson17-xcode-agents" },
      { number: 18, title: "Hy3 模型与 AI 办公学习", outcome: "认识模型额度与工具选择。", articleSlug: "video-workbuddy-lesson18-hy3-model" },
      { number: 19, title: "让 AI 自动发论坛帖子", outcome: "从浏览器自动化理解人工确认边界。", articleSlug: "video-workbuddy-lesson19-agentlimb-forum-posting" },
      { number: 20, title: "报销表核对 Skill", outcome: "把表格复核沉淀为可重复的 Skill。", articleSlug: "video-workbuddy-lesson20-expense-reimbursement-skill" },
      { number: 21, title: "解决 AI 配图丑的 Skill", outcome: "建立视觉抽象与配图检查流程。", articleSlug: "video-workbuddy-lesson21-visual-illustration-skill" },
      { number: 22, title: "公司群消息与客户信息管理", outcome: "将微信资料管理为可查询流程。", articleSlug: "video-workbuddy-lesson22-wechat-manager", hasDownload: true },
      { number: 23, title: "网页数据导出与钉钉推送", outcome: "完成网页数据、表格和群消息的连接。", articleSlug: "video-workbuddy-lesson23-web-export-dingtalk", hasDownload: true },
      { number: 24, title: "工资数据安全的本地工作区", outcome: "用数据与表格分离保护敏感内容。", articleSlug: "video-workbuddy-lesson24-salary-data-boundaries" },
      { number: 25, title: "微信客户订单管理工作台", outcome: "建立订单信息与进度的工作台。", articleSlug: "video-workbuddy-lesson25-wechat-order-workbench", hasDownload: true },
      { number: 26, title: "B 站自动投稿流程做成 Skill", outcome: "将已跑通的浏览器流程沉淀为可复用 Skill。", articleSlug: "video-workbuddy-lesson26-bilibili-skill", hasDownload: true },
      { number: 27, title: "手机远程控制电脑", outcome: "用手机查看任务、调取文件和安排电脑工作。", articleSlug: "video-workbuddy-lesson27-mobile-remote" },
      { number: 28, title: "DeepSeek 接入自定义模型", outcome: "理解 Token、API Key、接口地址和模型 ID。", articleSlug: "video-workbuddy-lesson28-custom-model" },
      { number: 29, title: "新手任务与成长积分", outcome: "从零开始熟悉 AI 办公助手。", articleSlug: "video-workbuddy-lesson29-beginner" },
      { number: 30, title: "公众号文章一键转 Word", outcome: "将公众号内容与图片整理为本地 Word。", articleSlug: "video-workbuddy-lesson30-wechat-to-word", hasDownload: true },
    ],
  },
  {
    id: "cola",
    title: "AI 自动化办公实战绿皮书",
    shortTitle: "实战绿皮书",
    toolLine: "Cola / Codex / Claude Code · 问题驱动实战课",
    description: "用真实办公问题练习把资料、规则、提示词、检查和最终交付组织成完整工作流。",
    playlistUrl: colaPlaylistUrl,
    lessons: [
      { number: 1, title: "多部门乱表合并＋自动找异常", outcome: "先统一字段口径，再保留来源做受控合并。", articleSlug: "video-cola-lesson1-expense-sheet-merge" },
      { number: 2, title: "30 份简历批量初筛", outcome: "把岗位门槛变成可回查的初筛矩阵。", articleSlug: "video-cola-lesson2-resume-screening" },
      { number: 3, title: "十几张散表理清奖金规则", outcome: "固化规则、保留中间列，再抽样反算。", articleSlug: "video-cola-lesson3-bonus-rules" },
      { number: 4, title: "固定 Word 模板自动填充", outcome: "在副本上受控回填，保持版式不变。", articleSlug: "video-cola-lesson4-word-template-fill" },
    ],
  },
];

export const getLearningSeries = (id: LearningSeriesId) => learningSeries.find((series) => series.id === id);

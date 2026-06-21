export type Product = {
  slug: string;
  name: string;
  displayName: string;
  category: string;
  tagline: string;
  summary: string;
  platforms: string[];
  status: string[];
  audience: string;
  primaryAction: ProductAction;
  secondaryAction?: ProductAction;
  repo: string;
  website?: string;
  icon?: string;
  accent: string;
  priority: "P0" | "P1" | "P2";
  learnSlug: string;
  privacy: {
    collectsData: boolean;
    localFirst: boolean;
    analytics: boolean;
    note: string;
  };
  features: string[];
  buildNotes: string[];
  courseHooks: string[];
  detail?: {
    overview?: string[];
    proofPoints?: { label: string; value: string; note: string }[];
    valueProps?: { title: string; body: string }[];
    featureDetails?: { title: string; body: string }[];
    principles?: { title: string; body: string }[];
    diaryIntro?: string;
  };
  caseStudy?: {
    kind: "failure";
    label: string;
  };
};

export type ProductAction = {
  label: string;
  url?: string;
  disabled?: boolean;
  icon?: string;
};

export type ProductProgressItem = {
  productSlug: string;
  label?: string;
  phase: string;
  status: string;
  next: string;
  source: string;
  progress: number;
  tone: "live" | "review" | "build" | "observe";
  segments: ProductProgressSegment[];
};

export type ProductProgressSegment = {
  kind: "research" | "build" | "review" | "promo" | "hold";
  start: string;
  end: string;
  label?: string;
};

const privacyLocal = (note: string) => ({
  collectsData: false,
  localFirst: true,
  analytics: false,
  note,
});

export const products: Product[] = [
  {
    slug: "witnote",
    name: "WitNote",
    displayName: "WitNote 智简笔记",
    category: "本地优先 AI 写作工具",
    tagline: "本地优先的 AI 写作和笔记工具。",
    summary: "面向 macOS 和 Windows 的本地优先 AI 写作与笔记工具，围绕私密笔记、Markdown、本地模型、Ollama 和云端 API 构建。",
    platforms: ["macOS", "Windows", "本地 AI"],
    status: ["App Store", "开源", "本地优先"],
    audience: "写作者、独立开发者、需要私密 AI 写作环境的用户。",
    primaryAction: { label: "Mac App Store", url: "https://apps.apple.com/us/app/witnote-local-ai-writer/id6756833873" },
    secondaryAction: { label: "GitHub Releases", url: "https://github.com/hooosberg/WitNote/releases" },
    repo: "https://github.com/hooosberg/WitNote",
    website: "https://hooosberg.github.io/WitNote/",
    icon: "/product-icons/witnote.png",
    accent: "#1f2937",
    priority: "P0",
    learnSlug: "witnote-local-ai-writing",
    privacy: privacyLocal("笔记文件默认保存在用户选择的本地目录；使用本地模型时内容不离开设备。"),
    features: ["WebLLM、Ollama、OpenAI-compatible API", "Markdown / TXT 编辑和预览", "本地文件夹即知识库", "写作角色库、补全和聚焦模式"],
    buildNotes: ["本地优先 AI App 的完整开发日记素材。", "可拆成需求定义、模型接入、隐私边界和上架。"],
    courseHooks: ["AI 写作工具设计", "本地优先架构", "多模型接入", "App Store 上架"],
  },
  {
    slug: "agentlimb",
    name: "AgentLimb",
    displayName: "AgentLimb",
    category: "AI 浏览器控制工具",
    tagline: "让 Claude Code、Cursor、Codex 控制真实 Chrome。",
    summary: "让 Claude Code、Cursor、Codex 等 AI 编程工具通过本地桥接操作真实 Chrome，并复用网页路线记忆。",
    platforms: ["Chrome", "MCP", "本地桥接"],
    status: ["开源", "本地优先", "AI 编程"],
    audience: "需要让 AI 操作真实网页、账号会话和多账号流程的开发者。",
    primaryAction: { label: "官网", url: "https://agentlimb.com/" },
    secondaryAction: { label: "GitHub", url: "https://github.com/hooosberg/AgentLimb" },
    repo: "https://github.com/hooosberg/AgentLimb",
    website: "https://agentlimb.com/",
    icon: "/product-icons/agentlimb.svg",
    accent: "#f5a623",
    priority: "P0",
    learnSlug: "agentlimb-browser-memory",
    privacy: privacyLocal("Bridge 运行在本地 127.0.0.1，浏览器会话和 muscle 文件保留在用户自己的机器上。"),
    features: ["一段提示词完成接入", "复用 DOM 探索结果", "真实 Chrome 会话", "多账号并行控制"],
    buildNotes: ["AI 自动化课程的技术锚点。", "可解释 MCP、本地 bridge、浏览器 session 和任务记忆。"],
    courseHooks: ["浏览器自动化", "MCP 工具链", "多账号运营", "AI 操作真实网页"],
  },
  {
    slug: "domprompter",
    name: "DOMPrompter",
    displayName: "DOMPrompter",
    category: "失败经验：AI 前端辅助",
    tagline: "一个被 AI 前端自动化快速压缩空间的提示词工具。",
    summary: "曾想帮 AI 精准定位前端元素；但 Codex 和浏览器代理越来越能自己读页面、改样式，这类辅助层必须重新定位。",
    platforms: ["macOS", "Electron", "AI 编程"],
    status: ["失败复盘", "本地优先", "开源"],
    audience: "用 Codex、Cursor、Claude Code 微调前端页面的人。",
    primaryAction: { label: "产品页", url: "https://hooosberg.github.io/DOMPrompter/" },
    secondaryAction: { label: "GitHub", url: "https://github.com/hooosberg/DOMPrompter" },
    repo: "https://github.com/hooosberg/DOMPrompter",
    website: "https://hooosberg.github.io/DOMPrompter/",
    icon: "/product-icons/domprompter.png",
    accent: "#5b4ce2",
    priority: "P0",
    learnSlug: "domprompter-frontend-detail",
    privacy: privacyLocal("选择元素、样式差异和提示词生成流程在本地完成。"),
    features: ["点击元素获取 selector 和上下文", "可视化记录样式差异", "生成 Codex / Cursor 提示词", "适合设计还原和前端细节修改"],
    buildNotes: ["AI 前端微调工作流案例。", "产品本身也能服务本站后续迭代。"],
    courseHooks: ["前端视觉微调", "AI 提示词结构化", "DOM 选择器", "设计实现复盘"],
    caseStudy: { kind: "failure", label: "失败复盘" },
    detail: {
      overview: [
        "DOMPrompter 的原始判断是：AI 改前端时最缺的是准确上下文，所以工具负责点选 DOM、截取样式、生成提示词。",
        "失败点在于 AI 编程工具进步太快。Codex、Claude Code 和浏览器代理正在自己读页面、定位元素、截图对比和修改样式，单独做一个“提示词搬运层”的价值被快速压缩。",
        "这个案例值得留下，因为它提醒我们：面向 AI 的辅助产品不能只解决今天模型不会做的事，而要判断这个不会做的能力会不会在几个月内变成默认能力。"
      ],
      proofPoints: [
        { label: "失败点", value: "提示词中间层变薄", note: "当 AI 能直接看页面和代码，手工点选再生成提示词的必要性下降。" },
        { label: "替代者", value: "Codex + 浏览器代理", note: "更强的自动化会把 DOM 读取、截图和样式修改纳入同一个工作流。" },
        { label: "保留价值", value: "前端 QA 方法", note: "跨视口检查、视觉验收和修改边界仍然可以沉淀为课程方法。" },
        { label: "教训", value: "别只做模型缺口", note: "要判断缺口是长期工作流，还是下一轮模型更新会补上的临时缝隙。" }
      ],
      valueProps: [
        { title: "失败不是功能没做完", body: "这个项目的问题不是点选、截图或提示词不成立，而是它站在 AI 能力曲线太近的位置，容易被下一次自动化吞掉。" },
        { title: "真正要卖的是判断", body: "用户不需要再买一个复制上下文的工具，但可以学习如何把视觉问题变成可验证任务、如何要求 AI 检查首屏和移动端。" },
        { title: "下一步机会更靠验收", body: "如果继续做，方向应从“生成提示词”转向“自动前端 QA、截图差异、跨视口验收和回归检查”。" }
      ],
      featureDetails: [
        { title: "原始功能", body: "点击网页元素，收集 selector、尺寸、样式和局部上下文，再整理成给 AI 改代码的提示词。" },
        { title: "被替代原因", body: "AI 工具越来越能直接连接浏览器、读取 DOM、观察截图、修改源码并重新验证，辅助层越厚越容易变成多余步骤。" },
        { title: "保留下来的经验", body: "前端修改要有边界：改哪里、不改哪里、在哪些视口验收、怎样判断没有引入新问题。" }
      ],
      principles: [
        { title: "不要把临时能力缺口当护城河", body: "如果产品价值只来自模型暂时看不到页面，那它很可能会被模型或代理能力自然吃掉。" },
        { title: "从工具转成方法", body: "失败后仍能沉淀的是提示词结构、验收清单和视觉 QA 流程，这些比单个桌面工具更耐用。" },
        { title: "重新定位到结果检查", body: "AI 能自己改代码以后，人的价值更靠提出审美判断、业务边界和最终验收标准。" }
      ],
      diaryIntro:
        "DOMPrompter 的开发日记会作为 AI 前端辅助工具的失败复盘：为什么当时觉得成立，AI 自动化怎样压缩它，以及怎样把失败转成前端 QA 方法。"
    },
  },
  {
    slug: "glotshot",
    name: "GlotShot",
    displayName: "GlotShot",
    category: "失败经验：商店海报自动化",
    tagline: "普通 App Store 海报生成正在被 Codex 自动化压缩。",
    summary: "批量生成 App Store 预览图的工具；基础海报可被 Codex 自动化，除非升级到 3D 设备模型、产品视频和更完整发布素材。",
    platforms: ["macOS", "App Store", "本地化"],
    status: ["失败复盘", "App Store", "转型观察"],
    audience: "需要快速制作应用商店截图、图标和多语言素材的开发者。",
    primaryAction: { label: "Mac App Store", url: "https://apps.apple.com/us/app/glotshot-screenshot-maker/id6757913340?mt=12" },
    secondaryAction: { label: "GitHub Releases", url: "https://github.com/hooosberg/GlotShot/releases/latest" },
    repo: "https://github.com/hooosberg/GlotShot",
    website: "https://hooosberg.github.io/GlotShot/",
    icon: "/product-icons/glotshot.png",
    accent: "#2563eb",
    priority: "P0",
    learnSlug: "glotshot-store-assets",
    privacy: privacyLocal("素材生成和本地翻译流程优先在用户设备上完成。"),
    features: ["Poster / Icon 双模式", "多设备框和批量导出", "多语言营销文案本地化", "适配应用商店素材规格"],
    buildNotes: ["App Store 上架素材生产线。", "工具服务另一个 App 发布的案例。"],
    courseHooks: ["App Store 素材", "本地化", "批量图片生成", "独立开发发布流程"],
    caseStudy: { kind: "failure", label: "失败复盘" },
    detail: {
      overview: [
        "GlotShot 不是完全没有价值，但普通 App Store 海报生成的空间正在变小。Codex 可以读尺寸要求、套模板、批量改文案，基础自动化很快会变成开发流程的一部分。",
        "失败点在于产品如果只停留在“把截图放进设备框、加标题、导出尺寸”，就会被 AI 编程和图像工具持续压低价值。",
        "这个案例的下一步机会不在普通海报，而在更难自动化的素材：真实 3D 手机模型、产品视频、动态演示、多语言发行包和能直接服务转化率的上架系统。"
      ],
      proofPoints: [
        { label: "失败点", value: "基础海报被自动化", note: "尺寸、标题、设备框和批量导出都很容易被 Codex 工作流接管。" },
        { label: "不是全错", value: "发布素材仍有需求", note: "独立开发者仍然需要上架素材，只是普通截图生成不再足够稀缺。" },
        { label: "机会", value: "3D 模型 / 视频", note: "更强的视觉资产、产品演示视频和转化率模板仍可能形成差异。" },
        { label: "教训", value: "功能要越过自动化底线", note: "如果 AI 能在一个下午搭出八成，产品就要提供最后两成的专业结果。" }
      ],
      valueProps: [
        { title: "失败来自门槛下降", body: "截图套框、翻译标题、导出多尺寸这些动作正在变成 AI 编程的默认自动化任务，独立 App 很难只靠这些卖价值。" },
        { title: "保留的是发布经验", body: "GlotShot 仍然适合讲 App Store 素材规格、多语言发行、截图文案和发布流程，而不是继续包装成确定成功的工具。" },
        { title: "继续做要拉高结果", body: "下一版如果要成立，需要提供 3D 手机模型、产品视频、动态演示或更强的发行资产组合。" }
      ],
      featureDetails: [
        { title: "原始功能", body: "把产品截图、设备框、标题和本地化文案组合成 App Store 预览图，并批量导出多语言素材。" },
        { title: "被替代原因", body: "Codex 可以根据素材目录和导出规范生成脚本、页面或模板，把普通海报制作压缩成一次自动化任务。" },
        { title: "可能的转型", body: "从静态截图工具升级为产品视频、3D 设备场景、发布素材包和转化率实验工具。" }
      ],
      principles: [
        { title: "不要停在模板层", body: "模板越标准，越容易被自动化；产品需要往审美、视频、3D、数据反馈这些更高门槛方向走。" },
        { title: "区分工具和流程", body: "用户真正需要的是完成一次上架，而不是打开另一个编辑器。工具必须融入发布闭环。" },
        { title: "失败也能服务课程", body: "它能讲清楚 AI 时代小工具的风险：今天觉得麻烦的动作，下个月可能就被模型自动做掉。" }
      ],
      diaryIntro:
        "GlotShot 的开发日记会转成 App Store 素材工具的失败复盘：哪些需求真实存在，哪些功能被 Codex 自动化压缩，以及下一步机会为什么必须走向 3D 和视频。"
    },
  },
  {
    slug: "codex-quota-calendar",
    name: "Codex Quota Calendar",
    displayName: "Codex Quota Calendar",
    category: "Codex 配额工具",
    tagline: "用菜单栏日历理解 Codex quota 节奏。",
    summary: "仅本地运行的 macOS 菜单栏工具，用来查看 Codex 配额消耗、每日节奏、周剩余额度和耗尽预估。",
    platforms: ["macOS", "SwiftUI", "Codex"],
    status: ["DMG", "开源", "仅本地"],
    audience: "重度使用 Codex、需要管理 quota 节奏的用户。",
    primaryAction: { label: "下载 DMG", url: "https://github.com/hooosberg/CodexQuotaCalendar/releases/latest" },
    secondaryAction: { label: "GitHub", url: "https://github.com/hooosberg/CodexQuotaCalendar" },
    repo: "https://github.com/hooosberg/CodexQuotaCalendar",
    website: "https://hooosberg.github.io/CodexQuotaCalendar/",
    icon: "/product-icons/codex-quota-calendar.png",
    accent: "#0f766e",
    priority: "P0",
    learnSlug: "codex-office-automation",
    privacy: privacyLocal("读取和保存本地 Codex auth / quota 历史，不上传到任何自有服务器。"),
    features: ["菜单栏进度环", "周 quota 和 5 小时窗口", "本地历史和预计耗尽", "Developer ID 签名和 notarized DMG"],
    buildNotes: ["Codex 办公与工具化课程案例。", "适合讲从需求到发布的闭环。"],
    courseHooks: ["Codex 工作流", "macOS 菜单栏工具", "SwiftUI", "本地数据"],
  },
  {
    slug: "drowsebook",
    name: "DrowseBook",
    displayName: "DrowseBook 入梦书",
    category: "睡前听书阅读器",
    tagline: "把自己的书读给你听，然后入睡。",
    summary: "iPhone 上的睡前听书和本地阅读工具，支持 EPUB、PDF、TXT、MOBI、AZW3、Apple TTS、环境音和睡眠计时。",
    platforms: ["iPhone", "iOS", "端侧"],
    status: ["App Store", "v1.1 已通过", "无追踪"],
    audience: "睡前听书、离线阅读、希望不被推荐流打扰的用户。",
    primaryAction: { label: "App Store", url: "https://apps.apple.com/us/app/drowsebook-read-aloud-ebooks/id6768475647" },
    secondaryAction: { label: "GitHub", url: "https://github.com/hooosberg/DrowseBook" },
    repo: "https://github.com/hooosberg/DrowseBook",
    website: "https://hooosberg.github.io/DrowseBook/",
    icon: "/product-icons/drowsebook.png",
    accent: "#a16207",
    priority: "P0",
    learnSlug: "drowsebook-quiet-ios",
    privacy: privacyLocal("书籍文件、阅读位置和设置保存在 App sandbox，不使用账号和第三方追踪。"),
    features: ["支持 EPUB、PDF、TXT、MOBI、AZW3", "Apple 系统语音朗读", "环境声和睡眠计时", "无账号、无广告、无追踪"],
    buildNotes: ["本地文件导入、TTS 和睡眠场景。", "v1.1 已于 2026-06-21 用户确认审核通过。", "生活工具类 App 的产品页案例。"],
    courseHooks: ["iOS 本地阅读", "TTS", "安静产品设计", "App Store 隐私标签"],
  },
  {
    slug: "sumi-mahjong",
    name: "Sumi Mahjong",
    displayName: "Sumi Mahjong 禅艺麻将",
    category: "安静解谜游戏",
    tagline: "无广告、无账号、无追踪的水墨麻将连连看。",
    summary: "安静的 iPhone 麻将连连看，使用手调水墨牌面，支持离线配对，可选一次买断解锁主题。",
    platforms: ["iPhone", "iOS", "游戏"],
    status: ["App Store", "无广告", "无追踪"],
    audience: "喜欢轻量解谜游戏，但不想被广告、体力和排行榜打扰的用户。",
    primaryAction: { label: "App Store", url: "https://apps.apple.com/us/app/sumi-mahjong-solitaire/id6770823912" },
    secondaryAction: { label: "GitHub", url: "https://github.com/hooosberg/Sumi-Mahjong" },
    repo: "https://github.com/hooosberg/Sumi-Mahjong",
    website: "https://hooosberg.github.io/Sumi-Mahjong/",
    icon: "/product-icons/sumi-mahjong.png",
    accent: "#78716c",
    priority: "P0",
    learnSlug: "sumi-mahjong-ios-game",
    privacy: privacyLocal("正常游玩不需要网络；付费解锁通过 Apple StoreKit 完成。"),
    features: ["144 张手调水墨麻将牌", "经典两折线连接规则", "撤销、提示、洗牌", "无广告 SDK、无账号、无第三方追踪"],
    buildNotes: ["轻量游戏的上架、IAP 和隐私边界。", "产品页如何表达安静体验。"],
    courseHooks: ["iOS 小游戏", "StoreKit 2", "无广告产品", "多语言上架"],
    detail: {
      overview: [
        "Sumi Mahjong 是一款 iPhone 离线牌面配对游戏。用户选择两张相同牌面，只要它们可以用不超过两次转弯的路径连接，就能消除；目标不是制造关卡压力，而是给用户一局干净、可暂停、没有干扰的小游戏。",
        "产品定位来自一组明确的反向边界：不接广告 SDK，不做账号系统，不做每日体力、排行榜和看广告续命，也不把撤销、提示、洗牌拆成付费压力。水墨主题完整免费，进阶视觉主题通过一次买断解锁。",
        "这个页面同时服务普通玩家、App Store 审核和后续课程案例。玩家能快速理解玩法和隐私承诺；审核员能看到付费和数据边界；学习者能从开发日记里看到从立项、痛点翻译、UI 取舍到上架材料的完整链路。"
      ],
      proofPoints: [
        { label: "玩法", value: "两折线配对", note: "经典 tile matching / Mahjong Solitaire 规则，不误导成四人麻将。" },
        { label: "隐私", value: "Data Not Collected", note: "正常游玩无账号、无广告 SDK、无第三方分析和追踪。" },
        { label: "商业化", value: "免费 + 一次买断", note: "完整水墨主题免费，付费只解锁进阶视觉主题，不锁核心玩法。" },
        { label: "语言", value: "12 UI languages", note: "覆盖英语、简繁中文、日语、韩语、德语、法语等上架语言。" }
      ],
      valueProps: [
        { title: "给玩家的是一局安静游戏", body: "没有开屏广告、登录流程、每日任务或排行压力。打开 App 后，重点只剩棋盘、牌面、撤销、提示和洗牌这些局内需要的东西。" },
        { title: "给审核的是清楚边界", body: "App Store 描述、隐私政策和产品页都强调同一件事：正常游玩不需要网络，StoreKit 只负责可选主题购买，数据留在设备本地。" },
        { title: "给课程的是完整样本", body: "这个项目把立项调研、竞品差评、功能 spec、SwiftUI 实现、StoreKit 2、截图文案和上架复盘串成一个可以反复讲解的小游戏案例。" }
      ],
      featureDetails: [
        { title: "手调水墨牌面", body: "144 张牌面围绕水墨纸感统一调色和笔触，不用杂乱素材包拼接，让图标、截图和游戏内视觉保持同一气质。" },
        { title: "经典两折线规则", body: "两张相同牌只在路径不超过两次转弯时消除。规则简单、可测试，也能让玩家一眼理解这不是四人麻将。" },
        { title: "轻量辅助工具", body: "撤销、提示、洗牌服务于局内体验，不绑定广告、不绑定体力、不做奖励视频入口，让帮助功能仍然保持安静。" },
        { title: "本地游玩和 StoreKit", body: "进度、设置、最佳时间和主题状态保存在设备里；可选主题解锁交给 Apple StoreKit 处理，不引入自有服务器。" }
      ],
      principles: [
        { title: "先写不做清单", body: "无广告、无账号、无订阅、无每日体力、无排行榜，这些不是宣传口号，而是决定依赖、路由、文案和审核说明的产品边界。" },
        { title: "痛点先变成约束", body: "竞品差评里的广告、误导、更新劣化和客服缺失，被翻译成无广告 SDK、真实截图、冻结核心规则和可达支持入口。" },
        { title: "商业化不打断游戏", body: "付费点收束到视觉主题。玩家能完整免费游玩，喜欢审美和手感时再主动解锁，不在局中制造购买压力。" },
        { title: "规则稳定比功能堆叠重要", body: "首发后优先修复体验断点、补齐主题和布局，而不是为了增长加入社交、活动或复杂成长体系。" }
      ],
      diaryIntro:
        "Sumi Mahjong 的开发日记已经形成一组连续案例：从为什么选麻将消除、怎样写不做清单，到 UI、SwiftUI 技术选型、玩法判定、资产烘焙、StoreKit 商业化和 App Store 上架审核。"
    },
  },
  {
    slug: "trekreel",
    name: "TrekReel",
    displayName: "TrekReel",
    category: "3D 轨迹故事工具",
    tagline: "把 GPX / KML 轨迹变成电影感 3D 地图故事。",
    summary: "把 GPX/KML 轨迹转换成电影感 3D 路线故事，适合户外、骑行、跑步和旅行视频。",
    platforms: ["macOS", "3D", "地图"],
    status: ["App Store", "创作者工具", "本地优先"],
    audience: "户外、骑行、跑步、旅行和地图视频创作者。",
    primaryAction: { label: "Mac App Store", url: "https://apps.apple.com/us/app/trekreel-3d-map-video-maker/id6758914035?mt=12" },
    secondaryAction: { label: "GitHub Releases", url: "https://github.com/hooosberg/TrekReel/releases" },
    repo: "https://github.com/hooosberg/TrekReel",
    website: "https://hooosberg.github.io/TrekReel/",
    icon: "/product-icons/trekreel.png",
    accent: "#ea580c",
    priority: "P1",
    learnSlug: "trekreel-map-story",
    privacy: privacyLocal("轨迹文件处理优先在本地完成。"),
    features: ["导入 GPX / KML 轨迹", "生成 3D 地图路线故事", "面向社交视频和旅行复盘", "支持多语言产品页面和发布素材"],
    buildNotes: ["视觉工具、地图数据和视频导出课程案例。"],
    courseHooks: ["地图可视化", "GPX / KML", "视频素材生成"],
  },
  {
    slug: "mood-button",
    name: "Mood Button",
    displayName: "Mood Button",
    category: "本地 AI 情绪日记",
    tagline: "Apple MLX + Qwen3 本地 AI 语音情绪日记。",
    summary: "基于 Apple MLX 和 Qwen3 的 iPhone 本地 AI 语音情绪日记。",
    platforms: ["iPhone", "MLX", "Qwen3"],
    status: ["App Review", "被拒后重提", "本地 AI"],
    audience: "希望用本地 AI 做语音日记、情绪记录和轻量自我复盘的用户。",
    primaryAction: { label: "App Store 即将上架", disabled: true, icon: "/icons/platform/app-store.svg" },
    secondaryAction: { label: "GitHub", url: "https://github.com/hooosberg/mood-button" },
    repo: "https://github.com/hooosberg/mood-button",
    website: "https://hooosberg.github.io/mood-button/",
    icon: "/product-icons/mood-button.png",
    accent: "#db2777",
    priority: "P1",
    learnSlug: "mood-button-local-voice",
    privacy: privacyLocal("设计方向以本地语音和本地模型为核心，正式上架前需要逐项核对隐私标签。"),
    features: ["语音情绪记录", "Apple MLX 本地推理", "Qwen3 轻量交互", "低干扰日记体验"],
    buildNotes: ["本地语音 AI 和情绪产品边界。", "2026-06-17 被 App Review 拒回，上架助手已记录后续修复、审核回复和重提材料。"],
    courseHooks: ["本地 AI", "语音日记", "情绪产品设计"],
    detail: {
      overview: [
        "Mood Button 是 iPhone 上的本地 AI 语音情绪日记。它的真实发布状态不是已上架：2026-06-17 App Review 拒回了 build 1.0 (2)，原因集中在 iPad UI、AI 数据流隐私说明，以及 IAP 入口可见性。",
        "上架助手台账记录了后续修复：App Review Notes 和隐私政策补充了“无第三方托管 AI 服务接收用户内容”的说明，iPad 截图和 IAP 路径也完成了验证和读回检查。",
        "所以这里不把旧 GitHub Pages 硬写成主下载入口。主按钮只显示 App Store 即将上架，等审核通过后再切换到真实 App Store 链接。"
      ],
      proofPoints: [
        { label: "审核状态", value: "被拒后处理中", note: "2026-06-17 被拒；后续修复、回复和重提材料已进入上架助手记录。" },
        { label: "拒审问题", value: "4.0 / 5.1 / 2.1(b)", note: "iPad UI、AI 隐私披露、IAP Unlock Home Skins 可见性。" },
        { label: "事实源", value: "上架助手台账", note: "LocalMoodVoice 上架记录 + 老板秘书项目流转表。" },
        { label: "公开材料", value: "GitHub Pages", note: "旧产品页保留为审核材料、隐私政策和支持页面，不冒充已上架下载入口。" }
      ],
      valueProps: [
        { title: "真实进度比漂亮按钮更重要", body: "产品还在 App Review 流程里，页面应该告诉用户它即将上架，而不是用 GitHub 或旧产品页填充一个假的主入口。" },
        { title: "审核经验会沉淀成课程", body: "这次拒审能讲清楚 AI 产品怎样向 Apple 解释数据流、怎样给审核员展示 IAP 路径，以及为什么 iPad 兼容不能靠侥幸。" },
        { title: "本地 AI 是产品承诺", body: "核心日记生成跑在设备侧的 Apple MLX + Qwen3 流程上；公开隐私文案和审核说明必须和真实实现一致。" }
      ],
      featureDetails: [
        { title: "语音记录到日记", body: "用户用短语音记录当天状态，App 把录音整理成可回看的情绪日记草稿。" },
        { title: "设备侧 AI 处理", body: "Qwen3 MLX 模型随 App 打包，在支持的实体 iPhone 上运行，避免把私密情绪内容默认交给第三方托管 AI。" },
        { title: "可选皮肤内购", body: "核心记录、回看、搜索和导出保持可用，付费点收敛到一次买断的 Home Skins 解锁。" },
        { title: "审核后补强", body: "拒审后补齐 iPad 兼容、隐私披露和 Review Notes 中的 IAP 操作路径，减少审核员找不到入口的风险。" }
      ],
      principles: [
        { title: "不上架就不伪装成上架", body: "用户看到的第一个按钮必须反映真实渠道状态。未通过审核时显示即将上架，审核通过后再换成 App Store。" },
        { title: "AI 产品先讲数据流", body: "涉及语音和情绪时，要主动解释用户内容是否离开设备、是否给第三方 AI、是否用于训练。" },
        { title: "审核可见性也是功能", body: "IAP、隐私页、支持页、iPad 布局和截图都要能被审核员按说明复现，不能只在开发者机器上成立。" }
      ],
      diaryIntro:
        "Mood Button 的开发日记会继续记录从本地 AI 原型、语音入口、隐私边界到 App Review 拒审修复的真实过程。"
    },
  },
  {
    slug: "rushi",
    name: "Rushi",
    displayName: "Rushi 如是",
    category: "佛经阅读器",
    tagline: "开源佛经文本和 iOS 静心 App 落地页。",
    summary: "开源佛经文本和 iOS 静心 App 落地页，整理金刚经、心经和 13 种语言内容。",
    platforms: ["iOS", "网页", "公共领域"],
    status: ["落地页", "开放内容", "CC0"],
    audience: "需要干净佛经阅读、多语言文本和安静阅读体验的用户。",
    primaryAction: { label: "产品页", url: "https://hooosberg.github.io/Rushi/" },
    secondaryAction: { label: "GitHub", url: "https://github.com/hooosberg/Rushi" },
    repo: "https://github.com/hooosberg/Rushi",
    website: "https://hooosberg.github.io/Rushi/",
    icon: "/product-icons/rushi.png",
    accent: "#b45309",
    priority: "P2",
    learnSlug: "rushi-public-domain-content",
    privacy: privacyLocal("公开文本内容为主，正式 App 隐私政策以后以实际功能为准。"),
    features: ["金刚经与心经", "13 种语言", "CC0 公共领域文本", "安静阅读落地页"],
    buildNotes: ["公共领域内容产品和多语言页面。"],
    courseHooks: ["内容产品", "多语言", "静心 App"],
  },
  {
    slug: "dailyzikr",
    name: "DailyZikr",
    displayName: "DailyZikr",
    category: "支持与政策页面",
    tagline: "Daily Zikr 支持站和 App Store 政策页面。",
    summary: "Daily Zikr 的支持站、隐私政策和 App Store 审核页面。",
    platforms: ["iOS", "支持", "政策"],
    status: ["支持页", "隐私政策", "App Store"],
    audience: "Daily Zikr 用户和 App Store 审核。",
    primaryAction: { label: "支持页", url: "https://hooosberg.github.io/DailyZikr/" },
    secondaryAction: { label: "GitHub", url: "https://github.com/hooosberg/DailyZikr" },
    repo: "https://github.com/hooosberg/DailyZikr",
    website: "https://hooosberg.github.io/DailyZikr/",
    icon: "/product-icons/dailyzikr.png",
    accent: "#059669",
    priority: "P2",
    learnSlug: "app-store-policy-pages",
    privacy: privacyLocal("当前作为支持与政策页面沉淀，具体隐私信息以后按 App 功能核对。"),
    features: ["支持页面", "隐私政策", "App Store URL", "轻量维护"],
    buildNotes: ["统一个人主域名比多个 GitHub Pages 更省事。"],
    courseHooks: ["App Store 支持页", "隐私政策", "维护成本"],
  },
  {
    slug: "packpour",
    name: "Packpour",
    displayName: "Packpour",
    category: "失败经验：App Store 自动填写",
    tagline: "一个被 Codex 后台自动化挤压价值的 Chrome 侧边栏。",
    summary: "曾想用 Chrome 侧边栏把本地化文案填进 App Store Connect；但 Codex 能直接操作后台后，独立自动填写工具的空间变小。",
    platforms: ["Chrome", "App Store Connect", "本地化"],
    status: ["失败复盘", "开源", "AI 替代"],
    audience: "需要批量维护 App Store 本地化字段的独立开发者。",
    primaryAction: { label: "产品页", url: "https://hooosberg.github.io/Packpour/" },
    secondaryAction: { label: "GitHub", url: "https://github.com/hooosberg/Packpour" },
    repo: "https://github.com/hooosberg/Packpour",
    website: "https://hooosberg.github.io/Packpour/",
    icon: "/product-icons/packpour.png",
    accent: "#7c3aed",
    priority: "P1",
    learnSlug: "packpour-app-store-connect",
    privacy: privacyLocal("本地处理 App Store Connect 字段辅助操作，不上传开发者内容到自有服务器。"),
    features: ["Chrome side panel", "Locale pack", "10 UI languages", "App Store Connect 字段辅助"],
    buildNotes: ["浏览器扩展如何服务 App 发布流程。"],
    courseHooks: ["Chrome 插件", "App Store 本地化", "运营自动化"],
    caseStudy: { kind: "failure", label: "失败复盘" },
    detail: {
      overview: [
        "Packpour 的原始目标是减少 App Store Connect 本地化字段的复制粘贴，让开发者把一份 locale pack 倒进后台。",
        "失败点在于 Codex 和浏览器自动化发展太快。AI 已经可以读本地文件、识别后台字段、逐项填写并让用户确认保存，单独做一个侧边栏扩展的必要性被压缩。",
        "这个案例保留下来的价值是发布流程经验：哪些后台动作适合自动化，哪些提交动作必须人工确认，以及如何把本地化材料整理成可复用输入。"
      ],
      proofPoints: [
        { label: "失败点", value: "自动填写被接管", note: "当 AI 能直接操作 App Store Connect，独立扩展只剩很窄的中间层。" },
        { label: "替代者", value: "Codex 后台代理", note: "读文件、找字段、填内容、截图检查可以被一次任务串起来。" },
        { label: "保留价值", value: "locale pack", note: "结构化本地化文案仍然有用，只是不一定需要包装成单独产品。" },
        { label: "边界", value: "提交必须确认", note: "保存、提交审核和发布仍应该留给人做最后确认。" }
      ],
      valueProps: [
        { title: "失败不是需求不存在", body: "App Store 本地化维护确实麻烦，但 AI 自动化能直接进入后台执行，导致专门扩展的用户迁移成本不划算。" },
        { title: "有价值的是输入格式", body: "locale pack、字段映射、语言清单和发布检查表可以留下来，变成课程里的运营自动化方法。" },
        { title: "下一步不做提交机器", body: "如果继续做，只能做成安全审查、字段差异检查和人工确认助手，而不是全自动发布按钮。" }
      ],
      featureDetails: [
        { title: "原始功能", body: "Chrome 侧边栏读取本地化文案包，并辅助填入 App Store Connect 的名称、副标题、关键词和发布说明。" },
        { title: "被替代原因", body: "Codex 可以结合浏览器控制、文件读取和页面状态检查完成同样流程，用户不一定愿意安装额外扩展。" },
        { title: "保留下来的经验", body: "把发布材料结构化比做一个点击工具更重要；结构化输入可以被人、AI 或脚本复用。" }
      ],
      principles: [
        { title: "不要只自动化一个页面动作", body: "如果产品只替用户点几下后台，下一个浏览器代理就可能把它吃掉。" },
        { title: "把风险留给人工确认", body: "保存、提交审核、发布这类动作会产生外部后果，应设计成 AI 准备、人来确认。" },
        { title: "失败要沉淀成流程资产", body: "扩展可能不成立，但本地化字段清单、语言包格式和审核检查表仍然能服务后续产品。" }
      ],
      diaryIntro:
        "Packpour 的开发日记会作为 App Store 后台自动化的失败复盘：从为什么想做侧边栏，到为什么 Codex 直接操作后台后，产品空间变窄。"
    },
  },
  {
    slug: "beraw",
    name: "BeRaw",
    displayName: "BeRaw",
    category: "Behance 图片工具",
    tagline: "从 Behance 项目中提取原始大图。",
    summary: "从 Behance 项目中提取原始大图，支持单张下载或批量打包 ZIP。",
    platforms: ["Chrome", "Behance", "ZIP"],
    status: ["开源", "本地优先", "侧边栏"],
    audience: "设计调研、素材归档和网页图片提取场景。",
    primaryAction: { label: "产品页", url: "https://hooosberg.github.io/BeRaw/" },
    secondaryAction: { label: "GitHub", url: "https://github.com/hooosberg/BeRaw" },
    repo: "https://github.com/hooosberg/BeRaw",
    website: "https://hooosberg.github.io/BeRaw/",
    icon: "/product-icons/beraw.png",
    accent: "#0ea5e9",
    priority: "P2",
    learnSlug: "beraw-browser-utility",
    privacy: privacyLocal("作为本地浏览器工具运行，正式发布前按扩展权限清单补充政策。"),
    features: ["Behance 图片提取", "批量 ZIP", "Chrome side panel", "12 UI languages"],
    buildNotes: ["小工具如何从具体痛点变成浏览器扩展。"],
    courseHooks: ["Chrome 插件", "图片提取", "本地工具"],
  },
  {
    slug: "uixskills",
    name: "UIXskills",
    displayName: "UIXskills",
    category: "失败经验：AI 设计协议",
    tagline: "复杂 AI 设计中间层很容易被下一代模型能力绕过。",
    summary: "把 AI 输出、JSON、白板、Skill 和 UI 串成设计实验；但模型越来越能直接生成结构和页面，复杂中间层容易变成过渡方案。",
    platforms: ["网页", "设计", "AI"],
    status: ["失败复盘", "原型", "独立域名"],
    audience: "探索 AI 设计工作流、白板结构和 UI 生成协议的用户。",
    primaryAction: { label: "官网", url: "https://uixskills.com" },
    secondaryAction: { label: "GitHub", url: "https://github.com/hooosberg/UIXskills" },
    repo: "https://github.com/hooosberg/UIXskills",
    website: "https://uixskills.com",
    icon: "/product-icons/uixskills.png",
    accent: "#111827",
    priority: "P2",
    learnSlug: "uixskills-design-protocol",
    privacy: privacyLocal("独立实验项目，具体隐私政策以后按站点实际功能核对。"),
    features: ["AI 到结构化 JSON", "Whiteboard 工作流", "SKILL 设计协议", "UI 实现实验"],
    buildNotes: ["AI 设计流程和技能体系沉淀。"],
    courseHooks: ["AI 设计协议", "结构化输出", "前端实现"],
    caseStudy: { kind: "failure", label: "失败复盘" },
    detail: {
      overview: [
        "UIXskills 的原始设想是把 AI 设计流程拆成 JSON、白板、Skill 和 UI 实现，让过程更可控、更可复用。",
        "失败点在于它把中间层设计得太重。AI 模型越来越能直接生成结构、组件、页面和迭代方案，复杂协议如果不能带来明显结果差异，就会变成额外负担。",
        "这个案例仍然有价值，因为它提醒我们：AI 时代的设计方法要足够轻，最好表现为少量规则、验收标准和可复用样例，而不是要求用户进入一套新系统。"
      ],
      proofPoints: [
        { label: "失败点", value: "中间层过重", note: "JSON、白板、Skill、UI 全套流程解释成本高，用户不一定愿意迁移。" },
        { label: "替代者", value: "模型直接生成", note: "更强模型可以直接从需求到页面，再通过对话迭代。" },
        { label: "保留价值", value: "轻量设计规则", note: "真正有用的是设计判断、验收标准和可复用样例。" },
        { label: "教训", value: "协议要服务结果", note: "如果协议本身比产出更重，它就会成为阻力。" }
      ],
      valueProps: [
        { title: "失败来自过度系统化", body: "AI 设计需要结构，但不一定需要一个完整平台。越复杂的流程，越容易被更直接的模型工作流绕过。" },
        { title: "保留的是方法论", body: "设计原则、组件拆分、响应式验收和提示词样例可以沉淀下来，变成课程和项目规范。" },
        { title: "下一步要轻量化", body: "如果继续做，应收缩成少量 SKILL、检查清单和真实案例，而不是一个大而全的设计系统工具。" }
      ],
      featureDetails: [
        { title: "原始功能", body: "把 AI 生成内容转成结构化 JSON，再通过白板流程、Skill 文件和 UI 实现串成一条设计管线。" },
        { title: "被替代原因", body: "当模型能直接理解布局、组件和样式约束时，过长的中间流程会降低速度，而不是增加确定性。" },
        { title: "保留下来的经验", body: "把成功页面背后的判断写成技能、规范和验收清单，这些比平台本身更容易复用。" }
      ],
      principles: [
        { title: "方法不能比任务更重", body: "用户想要的是更好的页面，不是先学习一套复杂协议。" },
        { title: "让 AI 先产出，再用规则验收", body: "与其把流程拆得很长，不如让 AI 快速给出版本，再用设计规则和截图验收收敛。" },
        { title: "失败后收缩成技能库", body: "把产品收缩为可复制的 SKILL、案例和检查表，反而更符合 AI 时代的真实使用方式。" }
      ],
      diaryIntro:
        "UIXskills 的开发日记会作为 AI 设计协议的失败复盘：为什么复杂中间层看起来合理，为什么会被模型能力绕过，以及怎样收缩成更轻的方法。"
    },
  },
];

export const featuredProducts = products.filter((product) => product.priority === "P0");

const latestProductSlugs = [
  "sumi-mahjong",
  "drowsebook",
  "glotshot",
  "trekreel",
  "witnote",
  "mood-button",
  "packpour",
  "beraw",
  "domprompter",
  "agentlimb",
  "codex-quota-calendar",
  "uixskills",
  "dailyzikr",
  "rushi",
] as const;

const productTimelineNotes: Record<string, string> = {
  "sumi-mahjong": "最近上架",
  drowsebook: "v1.1 已通过",
  glotshot: "失败复盘",
  trekreel: "近期发布",
  witnote: "核心产品",
  "mood-button": "被拒后重提",
  packpour: "失败复盘",
  beraw: "浏览器工具",
  domprompter: "失败复盘",
  agentlimb: "AI 浏览器底座",
  "codex-quota-calendar": "Codex 工具",
  uixskills: "失败复盘",
  dailyzikr: "支持页迁移",
  rushi: "内容产品",
};

export const productProgressSyncedAt = "2026-06-21";

export const productProgressItems: ProductProgressItem[] = [
  {
    productSlug: "mood-button",
    phase: "App Review",
    status: "6/17 被拒，复审中",
    next: "等 Apple 复审；通过后切 App Store 链接",
    source: "上架助手 LocalMoodVoice 台账 + 老板秘书项目流转表",
    progress: 94,
    tone: "review",
    segments: [
      { kind: "research", start: "2026-06-04", end: "2026-06-06" },
      { kind: "build", start: "2026-06-06", end: "2026-06-17" },
      { kind: "review", start: "2026-06-17", end: "2026-06-21" },
    ],
  },
  {
    productSlug: "dailyzikr",
    phase: "App Store",
    status: "已上架",
    next: "补产品档案、ASO 和首轮素材",
    source: "老板秘书项目进度快照 2026-06-14",
    progress: 100,
    tone: "live",
    segments: [
      { kind: "research", start: "2026-06-04", end: "2026-06-06" },
      { kind: "build", start: "2026-06-06", end: "2026-06-12" },
      { kind: "review", start: "2026-06-12", end: "2026-06-14" },
      { kind: "promo", start: "2026-06-14", end: "2026-06-21" },
    ],
  },
  {
    productSlug: "sumi-mahjong",
    phase: "已上线",
    status: "已上线 + 已推",
    next: "观察反馈；下版补 Mahjong 搜索",
    source: "老板秘书项目流转表 2026-05-23",
    progress: 100,
    tone: "live",
    segments: [
      { kind: "research", start: "2026-05-18", end: "2026-05-23" },
      { kind: "build", start: "2026-05-23", end: "2026-06-06" },
      { kind: "review", start: "2026-06-06", end: "2026-06-10" },
      { kind: "promo", start: "2026-06-10", end: "2026-06-21" },
    ],
  },
  {
    productSlug: "drowsebook",
    phase: "App Store",
    status: "v1.1 已通过",
    next: "进入下一轮发版推广和经营观察",
    source: "用户 2026-06-21 确认 + 老板秘书项目流转表",
    progress: 100,
    tone: "live",
    segments: [
      { kind: "research", start: "2026-05-20", end: "2026-05-23" },
      { kind: "build", start: "2026-05-23", end: "2026-06-06" },
      { kind: "review", start: "2026-06-06", end: "2026-06-20" },
      { kind: "promo", start: "2026-06-20", end: "2026-06-21" },
    ],
  },
  {
    productSlug: "witnote",
    phase: "已开发",
    status: "Ready + 已推",
    next: "存量观察，Native v2 文档另线推进",
    source: "老板秘书项目流转表 2026-05-23",
    progress: 100,
    tone: "live",
    segments: [
      { kind: "build", start: "2026-03-10", end: "2026-04-28" },
      { kind: "promo", start: "2026-05-01", end: "2026-06-01" },
    ],
  },
  {
    productSlug: "trekreel",
    phase: "已开发",
    status: "Ready + 观察",
    next: "做路线样片、ASO 和体验验证",
    source: "老板秘书项目流转表 2026-05-23",
    progress: 100,
    tone: "live",
    segments: [
      { kind: "build", start: "2026-03-28", end: "2026-05-03" },
      { kind: "promo", start: "2026-05-06", end: "2026-05-26" },
    ],
  },
  {
    productSlug: "domprompter",
    phase: "已开发",
    status: "Ready + 已推",
    next: "失败复盘，保留方法论",
    source: "老板秘书项目流转表 2026-05-23",
    progress: 100,
    tone: "live",
    segments: [
      { kind: "build", start: "2026-04-05", end: "2026-05-10" },
      { kind: "promo", start: "2026-05-13", end: "2026-06-05" },
    ],
  },
  {
    productSlug: "rushi",
    phase: "已开发",
    status: "Ready",
    next: "继续限免、送码和二次推广",
    source: "老板秘书项目流转表 2026-05-23",
    progress: 100,
    tone: "live",
    segments: [
      { kind: "research", start: "2026-05-10", end: "2026-05-22" },
      { kind: "build", start: "2026-05-24", end: "2026-06-10" },
      { kind: "promo", start: "2026-06-12", end: "2026-06-20" },
    ],
  },
  {
    productSlug: "glotshot",
    phase: "已开发",
    status: "Ready",
    next: "失败复盘，低维护观察",
    source: "老板秘书项目流转表 2026-05-23",
    progress: 100,
    tone: "live",
    segments: [
      { kind: "build", start: "2026-04-12", end: "2026-05-24" },
      { kind: "promo", start: "2026-05-26", end: "2026-06-12" },
    ],
  },
  {
    productSlug: "localcarepet",
    label: "LocalCarePet",
    phase: "候选",
    status: "暂缓",
    next: "等 Mood Button 复审结果再排期",
    source: "老板秘书项目流转表 2026-05-24",
    progress: 12,
    tone: "observe",
    segments: [
      { kind: "research", start: "2026-06-17", end: "2026-06-20" },
      { kind: "hold", start: "2026-06-20", end: "2026-06-21" },
    ],
  },
];

export const productsByLatest = [...products].sort((a, b) => {
  const aIndex = latestProductSlugs.indexOf(a.slug as (typeof latestProductSlugs)[number]);
  const bIndex = latestProductSlugs.indexOf(b.slug as (typeof latestProductSlugs)[number]);
  return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
});

export function getProductTimelineNote(slug: string) {
  return productTimelineNotes[slug] ?? "持续迭代";
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const socialLinks = [
  { label: "GitHub", url: "https://github.com/hooosberg", note: "hooosberg", icon: "/icons/social/github.svg" },
  { label: "X", url: "https://x.com/hooosberg", note: "@hooosberg", icon: "/icons/social/x.svg" },
  { label: "YouTube", url: "https://www.youtube.com/@hooosberg", note: "@hooosberg", icon: "/icons/social/youtube.svg" },
  { label: "TikTok", url: "https://www.tiktok.com/@hooosberg?_r=1&_t=ZS-97K7KCbBGiq", note: "@hooosberg", icon: "/icons/social/tiktok.svg" },
  { label: "Telegram", url: "https://t.me/hooosberg", note: "@hooosberg", icon: "/icons/social/telegram.svg" },
  { label: "抖音", url: "https://v.douyin.com/LSot90h9bfM/", note: "湖森堡AI_hooosberg", icon: "/icons/social/douyin.svg" },
  { label: "快手", url: "https://v.kuaishou.com/724Q5ERy", note: "湖森堡AI_hooosberg", icon: "/icons/social/kuaishou.svg" },
  { label: "小红书", url: "https://xhslink.com/m/51GcoI1h4Gs", note: "湖森堡AI_hooosberg", icon: "/icons/social/xiaohongshu.svg" },
  { label: "B站", url: "https://b23.tv/MRYVcxO", note: "湖森堡AI_hooosberg", icon: "/icons/social/bilibili.svg" },
  { label: "Email", url: "mailto:zikedece@proton.me", note: "zikedece@proton.me", icon: "/icons/social/email.svg" },
];

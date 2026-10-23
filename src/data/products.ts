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
  /** 主按钮之后紧挨着显示的其他下载入口（比如同一个产品的另一个版本）。 */
  extraActions?: ProductAction[];
  repo: string;
  website?: string;
  hideSourceLinks?: boolean;
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
    slug: "leantake",
    name: "LeanTake",
    displayName: "恰录 LeanTake",
    category: "Mac 录屏工具",
    tagline: "录完即完成的 Mac 录屏：不用剪辑，停下就是能直接播放的视频。",
    summary: "为讲课、教程和演示设计的 Mac 录屏软件。屏幕、窗口、区域任选，麦克风与系统声音同录，可暂停，可用画笔和放大镜圈点重点；停止后直接得到视频文件，不需要导出，不需要账号，全部在本机处理。",
    platforms: ["macOS", "录屏", "讲课"],
    status: ["Mac App Store 筹备中", "免费 + 一次买断 Pro", "无账号", "不联网"],
    audience: "要录课程、教程、软件演示的老师、培训师和内容创作者——想要一个打开就能录、录完就能发的工具，而不是一个视频编辑器。",
    primaryAction: { label: "即将登陆 Mac App Store", disabled: true },
    repo: "",
    website: undefined,
    hideSourceLinks: true,
    icon: "/product-icons/leantake.png",
    accent: "#f97316",
    priority: "P1",
    learnSlug: "leantake-mac-recorder",
    privacy: privacyLocal("录制内容、设置和日志都只保存在你的 Mac 上；软件不联网、不收集数据、不接广告和第三方统计；付费解锁通过 Apple StoreKit 完成。"),
    features: ["屏幕 / 窗口 / 区域三种录制范围", "麦克风 + 系统声音，实时电平", "暂停 / 继续，自适应暂停", "画笔与放大镜，录制当下圈点重点", "摄像头可画进录屏，只出一个文件", "全局快捷键、配置方案、提词器（Pro）"],
    buildNotes: ["“录完即完成”：不做时间线和剪辑，停止就是成片。", "免费版即可完整录制：720p / 1080p 高画质，画笔、放大镜免费；更高分辨率与帧率、全部光标、摄像头单独文件、提词器、配置方案为 Pro。", "全部在本机处理，不联网。"],
    courseHooks: ["ScreenCaptureKit", "macOS 沙盒", "StoreKit 2", "Mac App Store 上架"],
    detail: {
      overview: [
        "恰录 LeanTake 是一款为讲课和教程设计的 Mac 录屏软件。打开就能录，选好屏幕、窗口或一块区域，按下录制；停止后你得到的就是一个能直接播放、直接发给学生的视频文件，不需要再导出一次。",
        "它刻意不做视频编辑器：没有时间线、没有剪辑、没有自动字幕和云端账号。讲课时需要的事——暂停一下喝口水、在屏幕上圈一下重点、把鼠标附近放大给学生看——都在录制当下完成。",
        "所有录制内容都在你的 Mac 上处理。恰录不联网、不收集数据，也没有广告。免费版就能完整录制；更高的分辨率和帧率、更多光标样式等增值功能通过一次性买断（Pro）解锁，没有订阅。",
      ],
      proofPoints: [
        { label: "范围", value: "屏幕 / 窗口 / 区域", note: "三种录制范围；Display 可选屏。" },
        { label: "声音", value: "麦克风 + 系统声音", note: "两条声音可分别调节，实时电平，临时静音。" },
        { label: "隐私", value: "全部本机处理", note: "不联网、无账号、无广告、无第三方统计。" },
        { label: "价格", value: "免费 + 一次买断", note: "免费版可完整录制；Pro 为一次性买断，不订阅。" },
      ],
      valueProps: [
        { title: "录完就是成片", body: "停止录制就得到可直接播放的视频文件。不需要导出、不需要剪辑，也不会因为忘了导出而丢内容。" },
        { title: "讲课要用的都在录制当下", body: "暂停 / 继续、画笔圈点、鼠标周围放大、摄像头小窗画进画面——这些都是边讲边用，成片里直接带着。" },
        { title: "你的内容留在你的 Mac 上", body: "不联网、无账号。录制文件、设置和日志都在本机；软件只在你主动点击时才会打开外部链接。" },
      ],
      featureDetails: [
        { title: "可靠的暂停", body: "暂停时画面与声音的时间线保持连贯，长时间暂停也不会让成片错位。" },
        { title: "画笔与放大镜", body: "录制中随手圈点；放大镜有两种模式：跟随光标，或拖出一个框放大到框里；暂停时也能先选好位置。Esc 一键退出，工具条上方还有快捷键提示。画笔和放大镜免费使用。" },
        { title: "摄像头", body: "可以把摄像头小窗直接画进录屏（只出一个文件），形状和大小可调；Pro 还可以把摄像头单独存成一个文件。" },
        { title: "光标", body: "成片里的光标可以是系统光标，也可以是手套 / 爪子造型，点击时会转动。免费版使用棉线手套，更多款式为 Pro。" },
      ],
      principles: [
        { title: "核心体验永远免费", body: "录制、声音、暂停、画笔、放大镜都免费，不限时长、不加水印。付费只解锁更高分辨率、帧率和增值功能。" },
        { title: "录制中绝不打断", body: "收费提示只会出现在录制之前或设置里，录制过程中不会弹出任何付费窗口。" },
        { title: "不做后期", body: "不做时间线、剪辑、字幕和云端账号，保持“录完即完成”。" },
      ],
      diaryIntro: "恰录的开发日记会陆续整理：从为什么不做视频编辑器，到暂停时间线、录屏管线、沙盒适配和上架合规。",
    },
  },
  {
    slug: "witnote",
    name: "WitNote",
    displayName: "WitNote 智简笔记",
    category: "本地 Markdown 与 AI 写作工作区",
    tagline: "本地优先的 Markdown 工作台：文稿保存在你自己选择的文件与文件夹里，内置 AI 直接在你的设备上运行。",
    summary: "适用于 Mac、iPhone 和 iPad 的 Markdown 写作与阅读工作区（Mac 版已上架，iPhone 与 iPad 版随 2.0.6 推出）：文稿保存在你选择的位置，可选的内置 AI 在设备上运行，无需账号、没有广告、不做追踪。",
    platforms: ["macOS / iPhone / iPad"],
    status: ["Mac 版已上架 App Store", "iPhone 与 iPad 版随 2.0.6 推出", "本地优先", "无需账号"],
    audience: "写作者、研究者，以及希望把文稿留在自己的文件里、同时按需使用设备端 AI 的用户。",
    primaryAction: { label: "App Store", url: "https://apps.apple.com/us/app/witnote-ai-writer-reader-hub/id6756833873?mt=12" },
    secondaryAction: { label: "GitHub 源码", url: "https://github.com/hooosberg/WitNote" },
    repo: "https://github.com/hooosberg/WitNote",
    website: "https://hooosberg.com/apps/witnote/",
    icon: "/product-icons/witnote.png",
    accent: "#1f2937",
    priority: "P0",
    learnSlug: "witnote-local-ai-writing",
    privacy: {
      collectsData: true,
      localFirst: true,
      analytics: false,
      note: "无需账号。你选择的文件夹、Markdown 文稿和导出结果保留在你选择的位置，内置的设备端模型不会上传文稿。如果你选择使用可选的联网 AI 功能，只有在你主动发送请求时，提交的文字才会发送到你自己配置的服务；在 Mac 上，发送已附加的文稿内容还需要你为该接口单独授权。",
    },
    features: ["Mac、iPhone、iPad 三端 Markdown 工作台", "文稿保存在你选择的文件与文件夹里", "内置设备端 AI：润色、总结、语法检查、标题与大纲", "打开 Word、PDF、EPUB 等文件，导出 PDF、Word、HTML、纯文本和长图"],
    buildNotes: ["同一个 App 面向 Mac、iPhone 和 iPad：Mac 版已上架，iPhone 与 iPad 版随 2.0.6 推出；WitNote 可免费下载，WitNote Pro 一次购买，在三端共享。", "无需账号、没有广告、不做追踪，也不在服务器上保存你的写作档案。", "本地文件、模型选择、格式转换、StoreKit 和 App Store 隐私披露按同一条发布链验收。"],
    courseHooks: ["Swift 原生 macOS", "设备端 AI", "Markdown 知识工作区", "App Store 合规上架"],
    detail: {
      overview: [
        "Mac、iPhone 与 iPad：同一个 WitNote，三种设备共用。Mac 版已在 App Store 上架，iPhone 与 iPad 版随 2.0.6 推出。",
        "WitNote 可免费下载；WitNote Pro 为一次性购买，在 Mac、iPad 和 iPhone 之间共享（iPhone 与 iPad 版推出后适用）。",
        "无需账号，没有广告，不做追踪；你的笔记保存在你选择的文件与文件夹里。",
        "WitNote 的核心仍是你的 Markdown 文件：选定的文件夹就是写作、阅读、转换与复盘的知识空间，AI 只是文档旁边的助手，不取代文档本身。",
        "内置 Qwen3 0.6B 4-bit 小模型，新用户无需额外下载即可使用；可选的更大模型需要另外下载，并遵循其来源的许可与声明文件。",
      ],
    },
  },
  {
    slug: "agentlimb",
    name: "AgentLimb",
    displayName: "AgentLimb",
    category: "AI 浏览器控制扩展",
    tagline: "给任意支持 MCP 的智能体装上操作浏览器的手：安装即授权，自带外挂式网站记忆，侧栏是它和你说话的地方。",
    summary: "AgentLimb 是一个 Chrome 扩展加本地 MCP 宿主的通用浏览器控制方案：任意支持 MCP 的 AI（Claude Code、Codex、Cursor、腾讯 WorkBuddy 等）复制一条提示词即可接入并默认自动授权，自带本地 Markdown 网站记忆（操作过一次的网站下次直接照手册走，不用重新摸索），后台标签操控、不抢焦点，全程 100% 本地。",
    platforms: ["Chrome / Edge / Brave / Vivaldi 等 Chromium 浏览器", "标准 MCP", "Windows + macOS + Linux", "本地回环"],
    status: ["开源", "0.6.4", "本地优先", "活跃维护"],
    audience: "需要让 AI 操作真实网页、已登录会话和多账号流程的开发者和 AI 重度用户。",
    primaryAction: { label: "GitHub 获取与 Star", url: "https://github.com/hooosberg/AgentLimb" },
    repo: "https://github.com/hooosberg/AgentLimb",
    website: "https://agentlimb.com/",
    icon: "/product-icons/agentlimb.svg",
    accent: "#f5a623",
    priority: "P0",
    learnSlug: "agentlimb-browser-memory",
    privacy: privacyLocal("扩展与本地宿主全部运行在本机：MCP 宿主只监听 127.0.0.1 回环端口，配对信任与聊天记录只存在扩展私有存储，网站记忆为本机纯 Markdown 手册且自动脱敏凭据，页面数据不上传，无云端、无追踪。"),
    features: ["复制一条提示词即接入（默认安装即授权）", "外挂式网站记忆（操作一次，跨 AI 复用）", "任意 MCP 智能体通用", "侧栏是 AI 的回复窗", "后台标签操控不抢焦点", "17 个标准工具"],
    buildNotes: ["AI 自动化课程的技术锚点。", "可解释 MCP、本地桥接、网站记忆（Site memory）与多客户端信任管理。"],
    courseHooks: ["浏览器自动化", "MCP 工具链", "网站记忆沉淀", "AI 操作真实网页"],
    detail: {
      overview: [
        "AgentLimb 的定位是「全平台全软件的网页控制通用插件」。它不绑定某一家 AI 工具：任何支持标准 MCP 的智能体——Claude Code、Codex、Cursor、Trae、Windsurf、腾讯 WorkBuddy，或任何能跑本地命令的模型——都能通过它驱动你的真实浏览器，定位元素、填表、点击、截图、抓取数据，全程复用已登录的会话，不需要无头浏览器，也不需要重新登录。",
        "0.6.4 带来了两大升级：「外挂式网站记忆（Site memory）」与「安装即授权」。网站记忆把 AI 操作过的每个网站写成一本本地纯 Markdown 手册（~/.agentlimb/memory，8 节固定结构，≤120 行，只记入口 URL、元素锚点、坑与成功判定，不记操作流水账）。当 AI 打开某个网站或用 say 收尾时，宿主会在工具返回结果里自动夹带该站手册或沉淀提醒——不依赖客户端是否支持 Skill，第一次跑通写下来，第二次操作快 5–8 倍，换另一个 AI 工具也能直接接着用。",
        "配对与状态指示也进一步减法：装好本地 MCP 宿主连上即自动授权（也可在高级设置切回 30 分钟复制窗口严格模式），同身份跨重启自动重连。侧栏在未连接时教你复制提示词，已连接后就是 AI 的纯回复窗（显示圆点与「正在操作」）；AI 操作期间只在橙色标签组芯片上显示「⏳ AgentLimb」，插件图标与页面标题保持干净，新标签一律后台打开，不抢你正在看的页面。",
        "工程上它是一个零依赖的纯 Node 本地宿主加一枚 MV3 扩展：本地 SSE 推送替代轮询、按标签持久 CDP attach、document_start 常驻无障碍树、自适应 JPEG 截图、网站记忆读取 O(1) 单文件命中（约 10ms，日志不进检索热路径）、写入前代码级凭据脱敏与连续失败自动标 stale，107 项自动化单测加三套混沌测试守卫。"
      ],
      proofPoints: [
        { label: "配对与授权", value: "< 1 秒 · 安装即授权", note: "宿主连上即自动受信（可在高级设置切回严格窗口）；已有 AI 在线时第二个 AI 也能秒级接入。" },
        { label: "网站记忆", value: "快 5–8 倍 · ~10ms 读取", note: "本地纯 Markdown 手册，打开网页与收尾时自动注入工具结果；跨 AI 工具通用，连续失败自动提醒重验。" },
        { label: "智能体与系统", value: "任意 MCP / Win + Mac + Linux", note: "Claude Code、Codex、Cursor、Trae、Windsurf、WorkBuddy 等；Chrome、Edge、Brave、Vivaldi 通用。" },
        { label: "隐私", value: "100% 本地 + 自动脱敏", note: "宿主只监听 127.0.0.1；网站记忆只记操作路径且代码级拦截密码/Token/Cookie，无云端、无追踪。" }
      ],
      valueProps: [
        { title: "外挂式网站记忆，越用越省事", body: "第一次探索某个网站最贵。网站记忆把直达 URL、选择器、二次确认坑和成功判定沉淀到本机 Markdown 文件夹，并在 navigate / tab_new 与 say 的工具结果里自动提示 AI 读写。不綁定插件、不要求装 Skill，下次或换别的 AI 工具直接复用。" },
        { title: "安装即授权，复制一条提示词搞定", body: "提示词自带扩展 ID 指纹，AI 自己定位源码、安装 ~/.agentlimb 宿主并配置 MCP；连上浏览器即默认自动授权，没有确认页、没有配对码。需要严格隔离时可在高级设置切回 30 分钟复制窗口模式。" },
        { title: "侧栏是回复窗，状态指示极简克制", body: "侧栏只做你和 AI 说话的窗口，AI 回复通过 say 回到这里，顶栏只显示圆点与「正在操作」；浏览器里仅在橙色分组标签芯片显示「⏳ AgentLimb」加上页面边缘辉光与幽灵光标，不闪烁图标、不改网页标题、不打扰阅读。" },
        { title: "多 AI 并存，单控制器串行", body: "最多同时连接六个 MCP 宿主，每个 AI 的信任、聊天与草稿互相隔离；同一时刻只有一个 AI 执行浏览器任务，忙时拒绝强切，排队过期的调用拒绝执行——迟到的浏览器操作比失败更危险。" }
      ],
      featureDetails: [
        { title: "网站记忆（Site memory）", body: "纯宿主侧实现（host/memory.mjs + site_memory 工具），默认保存在 ~/.agentlimb/memory，可在侧栏设置随时开关或改路径。单站一本 PLAYBOOK.md（≤120 行），工具返回结果自动附带手册与写回提醒；内置路径白名单、密码/Token/Bearer 自动脱敏、同内容去重、目录锁与连续失败 2 次自动标 stale。" },
        { title: "一段提示词接入 + 默认自动授权", body: "复制提示词交给 AI，AI 根据扩展 ID 指纹反查安装目录，自动完成宿主安装与 MCP 配置。默认开启自动授权，连上即受信；已授权 AI 随时可在「已连接」列表中移除。" },
        { title: "任意 MCP 智能体", body: "只走标准 MCP over stdio：Claude Code、Codex、Cursor、Trae、Windsurf、腾讯 WorkBuddy，或任何能跑本地命令的模型。安装器只部署 ~/.agentlimb 并打印 mcpServers 配置，各软件自己的 MCP 启用与信任仍由该软件决定。" },
        { title: "侧栏 = AI 的回复窗", body: "已配对后侧栏展示当前 AI 的回复与连接状态：每条回复通过 say 工具回到这里，操作过程折叠成简洁的「正在操作」；你在侧栏发消息还会自动附带当前标签页的文本快照与压缩截图。" },
        { title: "真实浏览器，后台操作 + 极简沙漏", body: "AI 操作你正在使用的 Chrome：登录态、Cookie、多 Profile 全部保留。新标签一律在橙色「AgentLimb」分组后台打开，运作时分组芯片变为「⏳ AgentLimb」，通过焦点模拟操控后台标签，不抢焦点。" },
        { title: "17 个标准工具与工程守卫", body: "tabs_context、read_page、find、computer、form_input、navigate、javascript_eval、browser_batch（单次最多 20 步）、read_console_messages、read_network_requests、wait、say、site_memory、ping 等；107 项单测 + 配对/面板/记忆三套混沌测试。" }
      ],
      principles: [
        { title: "只记知识，不记流水账", body: "「我点了这里又点了那里」的录像没人会读第二遍，还会拖慢检索。网站记忆只存 8 节操作知识，精确命中单文件（~10ms），运行日志只供人复盘、永不进检索热路径。" },
        { title: "把纪律写成代码不变量", body: "提示词会忘、会被懒加载吞掉。所以手册注入直接走 navigate/say 的工具返回结果，而防路径逃逸、凭据脱敏、行数上限与并发锁全部由宿主代码强制兜底。" },
        { title: "怎么简单怎么来", body: "安装即授权省去来回点确认；操作指示只改分组标签「⏳ AgentLimb」，去掉多余的横幅、标题前缀和图标闪烁；侧栏只做回复窗，绝不堆砌控制台按钮。" },
        { title: "本地优先与串行控制", body: "宿主只监听 127.0.0.1，信任、聊天记录、网站记忆与页面数据都不出本机；多 AI 并存时单控制器串行，忙时拒绝强切。" }
      ],
      diaryIntro: "开发日记记录了 AgentLimb 的完整演化：从 0.2 时代的 Runtime 自举，到 0.5 时代「复制即配对 + 回复窗侧栏」，再到 0.6 时代「外挂式网站记忆 + 安装即授权 + 极简分组沙漏」的完整过程，也沉淀为 AI 自动化课程的案例。"
    },
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
    primaryAction: { label: "官网", url: "https://hooosberg.github.io/DOMPrompter/" },
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
    summary: "批量生成 App Store 预览图的工具，探索从海报制作向 3D 场景与产品视频的升级迭代。",
    platforms: ["macOS", "App Store", "本地化"],
    status: ["失败复盘", "App Store", "转型观察"],
    audience: "需要快速制作应用商店截图、图标和多语言素材的开发者。",
    primaryAction: { label: "App Store", url: "https://apps.apple.com/us/app/glotshot-screenshot-maker/id6757913340?mt=12" },
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
    summary: "本地运行的 macOS 菜单栏工具，用于实时追踪 Codex 配额消耗、每日节奏与耗尽预估。",
    platforms: ["macOS", "SwiftUI", "Codex"],
    status: ["DMG", "开源", "仅本地"],
    audience: "重度使用 Codex、需要管理 quota 节奏的用户。",
    primaryAction: { label: "下载", url: "https://github.com/hooosberg/CodexQuotaCalendar/releases/latest" },
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
    slug: "docktouchbar",
    name: "DockTouchBar",
    displayName: "DockTouchBar",
    category: "Touch Bar 工具 · AI 编程案例",
    tagline: "把 Dock 放到 Touch Bar 上：简洁、优雅、高效。",
    summary: "只做一件事的 macOS 原生小工具：在带 Touch Bar 的 MacBook Pro 上显示 Dock 里的 App，单击切换、双击隐藏、长按退出。没有小组件，不联网，空闲时 CPU 占用 0.0%。同时可以在 AI 编程智能体所在 App 的图标上显示工作中和做完的实时状态（设置里可关闭）。一个 App，一个下载。",
    platforms: ["macOS", "Touch Bar", "Swift / AppKit"],
    status: ["已公证 DMG", "源码可见", "本地优先"],
    audience: "在用带 Touch Bar 的 MacBook Pro，又嫌 Touch Bar 上的 Dock 工具功能太杂、用久了不稳定的人。",
    primaryAction: { label: "下载 DockTouchBar", url: "https://github.com/hooosberg/DockTouchBar/releases/latest" },
    secondaryAction: { label: "GitHub", url: "https://github.com/hooosberg/DockTouchBar" },
    repo: "https://github.com/hooosberg/DockTouchBar",
    website: undefined,
    icon: "/product-icons/docktouchbar.png",
    accent: "#3b82f6",
    priority: "P0",
    learnSlug: "docktouchbar-why-another",
    privacy: privacyLocal("不联网，没有统计，没有账号。只把开关、语言、长按时长、提示风格和居中窗口大小这几项偏好设置保存在你的 Mac 上。"),
    features: [
      "Touch Bar 上常驻显示 Dock：访达、固定的 App、其他正在运行的 App，顺序和系统 Dock 一致",
      "单击切换（窗口在别的桌面时自动切过去），双击隐藏，长按退出；长按时 Touch Bar 右边缘会显示“正在关闭…”和倒计时，手指不会挡住，背景是像素画的春夏秋冬四季小场景，一个小角色沿着进度条往前跑，跑到头就关闭并扫过一阵花瓣或雪；长按会先看窗口：在最前面且有多个窗口只关当前窗口，访达这种退不了的会隐藏，App 在等你回答（要保存吗之类的确认框）或没关掉时会自动切过去并提示，每次长按都有反馈",
      "睡眠唤醒、锁屏解锁、控制条进程重启之后自动恢复",
      "图标位置可选靠左、居中、靠右（图标放不下时仍从左边滑动）；按 Fn、截图录屏时 Dock 自动让位，万一没收到“让位结束”的信号，会每隔几秒自动核对并恢复（1.25 起，可在设置里调整或关闭）",
      "右侧有两个白色 8 位像素风的小按钮：咖啡杯（杯口有蒸汽）点一下暂时隐藏 Dock、把 Touch Bar 还给系统（亮度、音量），10–60 秒后自动恢复，屏幕被调到全黑也不会把你锁在外面；最右边是窗口居中 / 最大化按钮：先居中，再点一下最大化，再点回到居中，你自己拖过或换了 App 就先居中，图标跟着窗口现在的样子变",
      "连续快速点击以最后一下为准；切桌面被系统丢掉或焦点被抢走，会自动纠正回你最后点的那个",
      "12 种界面语言，菜单栏设置、使用说明和带致谢名单的“关于”窗口",
      "AI 智能体状态（设置里可关闭）：在 Claude Code、Codex、Qoder、WorkBuddy、Antigravity、千问办公、豆包等 AI 编程智能体所在 App 的图标上显示实时状态，工作时是像素风屏幕加字符雨，做完显示 OK；复制一段提示词粘贴给智能体，它自己完成配对，任何能在你的 Mac 上执行命令的智能体都可以，不限于这几个",
    ],
    buildNotes: [
      "和 Claude Code 协作完成：先做私有接口的可行性验证，再写正式代码。",
      "Developer ID 签名并通过 Apple 公证，DMG 在 GitHub Releases 分发；发布前专门检查过二进制里有没有带出本机路径。",
      "空闲占用是实测数字：CPU 0.0%、空闲唤醒 0 次、内存约 32 MB。菜单里有“权限”一项，列出唯一需要的辅助功能权限、状态和用途。",
    ],
    courseHooks: ["Swift 原生 macOS", "AppKit 与 NSTouchBar", "私有 API 的风险控制", "签名、公证与 DMG 发布"],
    detail: {
      overview: [
        "DockTouchBar 是一个只做一件事的 macOS 小工具：让带 Touch Bar 的 MacBook Pro 在 Touch Bar 上一直显示 Dock 里的 App。单击切换，双击隐藏，长按退出；App 的窗口在别的桌面时，会像点系统 Dock 一样自动切到那个桌面。",
        "它来自一个很具体的不满：Pock 一类的工具都能把 Dock 放到 Touch Bar 上，但小组件、插件越多，日常用起来 Touch Bar 越容易消失或者点了没反应。DockTouchBar 反过来，把范围收得很窄，把稳定放在第一位。",
        "整个 App 约 4200 行 Swift、15 个文件（不少是像素画的数据），没有第三方依赖，体积 1.7 MB。让后台 App 在 Touch Bar 上常驻只能用 Apple 的私有接口，所以它不上 Mac App Store，而是用 Developer ID 签名、经 Apple 公证的 DMG 在 GitHub 分发。",
        "它同时是一个 AI 编程案例：从可行性验证、技术选型、跨桌面切换，到踩坑、签名公证和公开发布，整个过程都完整写在开发日记里。",
        "曾经单独发布的 “DockTouchBar Vibe” 已并入 DockTouchBar（1.24 起），现在只有一个 App、一份源码、一条发布线。",
      ],
      proofPoints: [
        { label: "实测占用", value: "CPU 0.0% · 32 MB", note: "M1 MacBook Pro 上开着 Dock 空闲时，连续 5 次采样 CPU 都是 0.0%；读内核的进程计数器隔 20 秒做差，1.10 上测了三次，空闲唤醒和中断唤醒每次新增都是 0 次；物理内存约 32 MB。咖啡杯上的蒸汽由系统的渲染进程绘制，不是 App 本身在动。" },
        { label: "分发方式", value: "已公证 DMG", note: "Developer ID 签名并通过 Apple 公证；从 DMG 里拖出来的 App 也能通过系统检查。" },
        { label: "实测环境", value: "M1 · macOS 27.0", note: "只在 MacBook Pro 13 英寸（M1）、macOS 27.0 上实测；安装包是通用二进制，Intel 没有在真机上测过。" },
        { label: "许可", value: "个人使用免费", note: "PolyForm Noncommercial 1.0.0：个人和非商业使用免费，商业使用需要另行授权。它是源码可见，不是标准意义上的开源。" },
      ],
      valueProps: [
        { title: "只做一件事", body: "没有小组件，没有插件，菜单里只有几个开关。范围收得窄，才有可能把稳定性做扎实。" },
        { title: "能自己恢复", body: "睡眠唤醒、屏幕解锁、控制条进程重启之后，系统会收回自定义的 Touch Bar。DockTouchBar 监听这些事件并自动重新挂上，不需要手动重开。" },
        { title: "系统更新时安全失败", body: "私有接口都在运行时解析。系统删掉了哪个，对应功能就自动关闭，而不是一启动就崩溃。" },
        { title: "点得快也不乱", body: "连续快速点击以最后一下为准；切桌面被系统丢掉、或者焦点被别的 App 抢走，会在约两秒内自动纠正回你最后点的那个。你一动键盘、鼠标或触控板，它立刻停手，绝不和你争。" },
      ],
      featureDetails: [
        { title: "一个 App，一个下载", body: "DockTouchBar 在 GitHub Releases 的最新发布里下载。以前的 Vibe 版已并入，不再单独发布；用过 Vibe 的话，下载新版后退出并删除 Vibe 即可，已配对的智能体继续有效，设置不会带过来。" },
        { title: "配对智能体", body: "设置 → 配对智能体 → 复制提示词 → 粘贴给你的智能体。它先自检，再用自己的 hook 或一条长期指令规则接进来，改配置前先备份；验证是否通过由 DockTouchBar 自己判定。验证通过后，它所在 App 的图标在它工作时变成像素风屏幕加字符雨，做完显示 OK。App 本身不会修改任何其他工具的配置，也不会把数据发出你的 Mac。这部分功能可以在设置里关闭。" },
        { title: "隐藏程序坞图标与强制退出", body: "设置里可以隐藏 DockTouchBar 自己在程序坞的图标，只留菜单栏图标常驻后台；按住 ⌥ 长按图标是强制退出，用来结束卡死的 App。两项都来自社区贡献者 thierry-laval。" },
        { title: "单击：切换", body: "没打开的 App 会启动；窗口都在别的桌面时，用辅助功能把窗口提到前面，系统随之切到那个桌面（辅助功能权限可选，没给时照常切换，只是不切桌面）。" },
        { title: "双击：隐藏", body: "等同 ⌘H，再点一下就回来。第一下照常切换、不等待，所以单击没有延迟。" },
        { title: "长按：退出", body: "等同 ⌘Q。图标变暗，下方出现红色进度条，走满才退出，中途松手算单击；访达不会被退出，时长可以在菜单里选 1、2、3、5 秒。" },
        { title: "图标位置与自动恢复（1.25）", body: "设置 → 显示 → 图标位置可以选靠左、居中或靠右，打字时不容易误碰最左边的图标。设置 → 系统 Touch Bar 避让里新增“避让后自动核对并恢复”（关闭 / 3 / 5 / 10 / 30 秒，默认 5 秒）：按 Fn 或截图录屏时 Dock 会让位，如果松开 Fn、结束截图的信号没被收到，Dock 会在这个时间内自己回来；Fn 还按着时不会提前恢复。两项都来自用户 fatHROSE 的建议。" },
        { title: "语言与关于", body: "跟随系统语言，也可以在菜单里单独选简体中文或 English；“关于”窗口里有使用说明和作者链接。" },
      ],
      principles: [
        { title: "简洁：先判断要不要加", body: "去掉小组件，连 Touch Bar 最右边的收起按钮也去掉了，只保留 Dock 这一个职责。" },
        { title: "优雅：向系统 Dock 看齐", body: "图标顺序、运行小圆点和滚动手感都用系统自带的控件，不自己造轮子；单击不为了等双击而延迟。" },
        { title: "高效：事件驱动，不轮询", body: "只在 App 启动、退出、前台变化时刷新，只更新变化的部分，图标只栅格化一次。切桌面不靠固定的等待时间，而是等系统“切完了”的信号并核对结果，动画慢、关掉动画、机器很忙时都不会出错。" },
      ],
      diaryIntro:
        "DockTouchBar 的开发日记记录了这个小工具从立项、可行性验证、技术选型、跨桌面切换、踩坑与测试，到签名公证和公开发布的完整过程，也包括没做成的事（比如开着台前调度时无法最小化窗口）、连点为什么会失效以及怎样改成“看结果”，还有发布前差点把本机路径一起发出去的教训，以及 1.8 里把长按提示做成像素画四季的设计迭代。",
    },
  },
  {
    slug: "drowsebook",
    name: "DrowseBook",
    displayName: "DrowseBook 入梦书",
    category: "睡前听书阅读器",
    tagline: "把自己的书读给你听，然后入睡。",
    summary: "iPhone 睡前听书与本地离线阅读器，支持主流电子书格式、系统 TTS 朗读与睡眠定时。",
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
    summary: "无广告无追踪的 iPhone / iPad 水墨麻将连连看，手调古雅牌面，专注纯粹离线解谜。",
    platforms: ["iPhone", "iPad", "iOS", "游戏"],
    status: ["App Store", "v1.1 iPad 更新", "无广告", "无追踪"],
    audience: "喜欢轻量解谜游戏，但不想被广告、体力和排行榜打扰的用户。",
    primaryAction: { label: "App Store", url: "https://apps.apple.com/us/app/sumi-mahjong-solitaire/id6770823912" },
    repo: "https://github.com/hooosberg/Sumi-Mahjong",
    website: undefined,
    hideSourceLinks: true,
    icon: "/product-icons/sumi-mahjong.png",
    accent: "#78716c",
    priority: "P0",
    learnSlug: "sumi-mahjong-ios-game",
    privacy: privacyLocal("正常游玩不需要网络；付费解锁通过 Apple StoreKit 完成。"),
    features: ["144 张手调水墨麻将牌", "经典两折线连接规则", "撤销、提示、洗牌", "无广告 SDK、无账号、无第三方追踪"],
    buildNotes: ["轻量游戏的上架、IAP 和隐私边界。", "产品页如何表达安静体验。", "1.1 更新加入 iPad 原生适配，上架链接统一到 Hooosberg 产品页。"],
    courseHooks: ["iOS 小游戏", "StoreKit 2", "无广告产品", "多语言上架"],
    detail: {
      overview: [
        "Sumi Mahjong 是一款 iPhone 与 iPad 离线牌面配对游戏。用户选择两张相同牌面，只要它们可以用不超过两次转弯的路径连接，就能消除；目标不是制造关卡压力，而是给用户一局干净、可暂停、没有干扰的小游戏。",
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
    slug: "sumi-block-puzzle",
    name: "Sumi Block Puzzle",
    displayName: "Sumi Block Puzzle 木块拼放",
    category: "安静益智消除",
    tagline: "摆下三块，留一点安静。9×9 木块拼放，免费无广告，手绘主题随心选。",
    summary: "Sumi Block Puzzle 是适用于 iPhone 与 iPad 的离线木块拼放游戏。摆放三块，拼满行、列或3×3宫格即可消除。核心玩法与竹林主题免费、无广告，另有四款手绘主题可选购。",
    platforms: ["iPhone", "iPad", "iOS", "游戏"],
    status: ["App Store 筹备中", "免费 + 一次买断主题", "无广告", "无追踪"],
    audience: "喜欢木块拼放、几何益智消除，希望安静离线游玩、无广告打扰的玩家。",
    primaryAction: { label: "即将登陆 App Store", disabled: true },
    repo: "",
    hideSourceLinks: true,
    icon: "/product-icons/sumi-block-puzzle.png?v=dad9d1022e8d",
    accent: "#5a3d28",
    priority: "P1",
    learnSlug: "sumi-block-puzzle-ios-game",
    privacy: privacyLocal("棋局、最高分与设置保存在设备本地。正常游玩无需网络；主题购买与恢复由 Apple StoreKit 处理。无广告、无账号、无第三方统计或追踪。"),
    features: [
      "经典 9×9 棋盘与三块一批拼放消除",
      "行列与 3×3 九宫格同时消除，多消连击加分",
      "每局一次免费撤销与死局即时判定",
      "随走随存，随时退出随时继续，无网络也可完整游玩",
      "默认免费竹林立体主题，另有布丁、水晶、漆器、敦煌四套艺术主题",
      "落叶与扫叶动效、清脆撞击声与触感反馈（可独立开启/关闭）",
      "十二种界面语言，可在设置中随时切换",
      "无广告、无账号、无第三方追踪"
    ],
    buildNotes: [
      "目前尚未在 App Store 正式发布。",
      "付费仅一次性解锁布丁、水晶、漆器、敦煌四套艺术主题，不影响任何核心玩法、撤销或存档。",
      "购买与恢复购买通过 Apple StoreKit 处理，需要连接 Apple 服务；游戏本身可离线游玩。"
    ],
    courseHooks: ["Block Puzzle 算法", "SwiftUI + Swift 核心", "StoreKit 2", "多语言"],
    detail: {
      overview: [
        "Sumi Block Puzzle 保持木块拼放的纯粹质感：在 9×9 棋盘上摆放各种形态的几何积木，拼满整行、整列或 3×3 宫格即可清爽消除。每回合从托盘中拼放三块，随走随存，随时随地开启一局心流体验。",
        "核心玩法、竹林主题、每局一次撤销和自动存档均免费，没有广告。布丁、水晶、漆器与敦煌四款手绘主题通过一个可选买断包解锁；购买只改变视觉外观，没有订阅。"
      ],
      proofPoints: [
        { label: "玩法", value: "9×9 拼放消除", note: "行列与 3×3 宫格同时消除，连击加分。" },
        { label: "离线", value: "随走随存", note: "无需网络，断点续玩，无广告打扰。" },
        { label: "语言", value: "12 种", note: "跟随系统或在应用设置中实时切换。" }
      ],
      valueProps: [
        { title: "随时沉浸，随时暂停", body: "棋局与托盘状态完全本地实时保存，无论是通勤间隙还是睡前片刻，打开即玩，关闭即存。" },
        { title: "没有广告骚扰", body: "没有激励视频，没有横幅遮挡，没有弹窗倒计时，把专注还给思考与触感。" },
        { title: "公平的视觉买断", body: "所有规则、计分和撤销功能对免费玩家与付费玩家完全相同，付费只为审美体验买单。" }
      ],
      featureDetails: [
        { title: "四套付费艺术材质", body: "奶油布丁、冰蓝水晶、黑金漆器与矿物色敦煌，每套均有独立的棋子材质和手绘插画背景。" },
        { title: "细腻视听与触感", body: "支持轻度落叶与一键扫叶动效，配备真实的木石碰撞敲击音效与分段触觉反馈，均可在设置中自主调节。" }
      ],
      principles: [
        { title: "核心玩法永久完整免费", body: "棋局、行列/九宫格消除、计分、本地最佳成绩、每局一次撤销与自动存档均免费。" },
        { title: "零数据收集与纯本地化", body: "不采集任何个人信息或设备标识，仅通过 Apple StoreKit 2 处理主题凭证。" }
      ],
      diaryIntro: "Sumi Block Puzzle 开发记录系统整理了从 9×9 几何命中、棋子材质、手绘背景和无广告产品设计，到一次买断主题的开发取舍。"
    }
  },
  {
    slug: "sumi-freecell",
    name: "Sumi FreeCell Solitaire",
    displayName: "Sumi FreeCell Solitaire 空当接龙",
    category: "安静纸牌游戏",
    tagline: "四格空当接龙，完整玩法免费、无广告，四套艺术主题自愿买断。",
    summary: "适用于 iPhone 与 iPad 的离线空当接龙。八列明牌、四个暂存格，支持点按与拖动、无限撤销、提示和自动存档；长辈模式可放大牌面，设置中可随时切换十二种语言。",
    platforms: ["iPhone", "iPad", "iOS", "游戏"],
    status: ["App Store 筹备中", "免费 + 一次买断主题", "无广告", "无追踪"],
    audience: "喜欢空当接龙、希望安静离线游玩，或需要更大牌面的玩家。",
    primaryAction: { label: "即将登陆 App Store", disabled: true },
    repo: "",
    hideSourceLinks: true,
    icon: "/product-icons/sumi-freecell.png",
    accent: "#254e3d",
    priority: "P1",
    learnSlug: "sumi-freecell-ios-game",
    privacy: privacyLocal("牌局、统计与设置保存在设备本地。正常游玩无需网络；主题购买与恢复由 Apple StoreKit 处理。无广告、无账号、无第三方统计或追踪。"),
    features: ["标准四格 FreeCell 与八列明牌", "点按或拖动，撤销、提示、重开和自动存档免费", "长辈模式：每行显示 5 至 8 张牌，可拖动桌面查看", "免费经典绿毡，另有墨玉金杏、夜樱、绛红金卷、青金四套主题", "十二种界面语言，可在设置中切换", "可关闭的声音、音乐、环境音与触感"],
    buildNotes: ["目前尚未在 App Store 发布。", "付费仅解锁桌面与牌背主题，不影响任何核心玩法。", "牌局编号为本游戏自己的编号；随机牌局不承诺全部有解。"],
    courseHooks: ["FreeCell 规则", "SwiftUI", "StoreKit 2", "多语言"],
    detail: {
      overview: ["Sumi FreeCell Solitaire 保留标准空当接龙的策略：利用四个暂存格和空列，把所有牌按花色从 A 到 K 收入基础区。牌从一开始全部朝上，点按或拖动即可操作。", "撤销、提示、重开和存档免费。经典绿毡免费可用，更多桌面和牌背主题通过一次买断解锁，没有订阅。"],
      proofPoints: [{ label: "玩法", value: "四格空当接龙", note: "八列明牌，标准四个暂存格。" }, { label: "大牌面", value: "长辈模式", note: "每行 5 至 8 张牌，可拖动桌面查看。" }, { label: "语言", value: "12 种", note: "跟随系统或在应用设置中选择。" }],
      valueProps: [{ title: "随时能继续", body: "牌局自动保存，短暂停下后可以继续；没有账号或联网等待。" }, { title: "需要帮助时就用", body: "撤销与提示不绑定广告或购买。" }],
      featureDetails: [{ title: "四套艺术主题", body: "墨玉金杏、夜樱、绛红金卷与青金，每套包含桌面和配套牌背。" }, { title: "看得更清楚", body: "长辈模式放大牌面，支持横竖屏；可以选择每行牌数并拖动查看。" }],
      principles: [{ title: "付费只改变外观", body: "免费玩家和付费玩家使用相同的规则、撤销、提示与存档功能。" }],
      diaryIntro: "开发记录将整理规则验证、可读性和多语言实现。"
    },
  },
  {
    slug: "sumi-klondike-solitaire",
    name: "Sumi Klondike Solitaire",
    displayName: "Sumi Klondike Solitaire 水墨接龙",
    category: "安静纸牌游戏",
    tagline: "无广告、无账号、无追踪的 Klondike 纸牌接龙，经典绿毡免费，更多材质牌桌可选。",
    summary: "离线 iPhone / iPad Klondike 纸牌接龙，免费默认皮肤 Classic Green（经典绿毡），撤销、提示、存档、抽一或抽三全部免费，专注纯粹离线纸牌。",
    platforms: ["iPhone", "iPad", "iOS", "游戏"],
    status: ["App Store 筹备中", "免费 + 一次买断皮肤", "无广告", "无追踪"],
    audience: "喜欢经典纸牌接龙，但不想被广告、账号和联网推荐打扰的用户。",
    primaryAction: { label: "即将登陆 App Store", disabled: true },
    repo: "",
    website: undefined,
    hideSourceLinks: true,
    icon: "/product-icons/sumi-klondike-solitaire.png",
    accent: "#78716c",
    priority: "P1",
    learnSlug: "sumi-klondike-solitaire-ios-game",
    privacy: privacyLocal("正常游玩不需要网络；付费解锁通过 Apple StoreKit 完成。"),
    features: ["经典 Klondike 接龙，支持抽一或抽三", "撤销、提示、存档全部免费", "免费默认皮肤 Classic Green（经典绿毡），另有 9 套付费材质皮肤（漆金夜、酒红丝绒、皇家蓝毡、胡桃木、干邑皮革、大理石、夜石板、靛蓝扎染、极光夜）", "落叶 / 扫叶特效、触感反馈、背景音乐与环境音（可关）", "“已验证有解”的发牌模式", "12 种界面语言", "无广告、无账号、无第三方追踪"],
    buildNotes: ["“安静纸牌”：离线、无账号、无广告，把接龙做成随时能停下的小游戏。", "皮肤一次买断解锁全部，非消耗型、支持家庭共享，不订阅；已购用户未来新增的皮肤不再收费。", "产品页目前为未上架状态，不标注上架日期。"],
    courseHooks: ["iOS 纸牌游戏", "StoreKit 2", "无广告产品", "多语言上架"],
    detail: {
      overview: [
        "Sumi Klondike Solitaire 是一款 iPhone 与 iPad 离线 Klondike 纸牌接龙。它保留经典接龙的玩法，把牌桌换成可选的材质皮肤：免费默认的 Classic Green 绿毡皮肤完整可用，玩家可以在不联网、没有账号的情况下安静地玩完整局。",
        "产品刻意不做的事和 Sumi Mahjong 一样清楚：不接广告 SDK，不做账号系统，不做第三方统计和追踪。撤销、提示、存档、抽一或抽三这些局内玩法永远免费，付费只用于解锁更多牌桌皮肤。",
        "这个页面同时服务普通玩家、App Store 审核和后续课程案例。玩家能快速理解玩法和付费边界；审核员能看到数据与 StoreKit 的范围；学习者可以和同系列的 Sumi Mahjong 对照，看同样的无广告边界怎样落在不同的玩法与商业化结构上。"
      ],
      proofPoints: [
        { label: "玩法", value: "Klondike 接龙", note: "经典纸牌接龙，支持抽一或抽三；撤销、提示、存档都在局内免费提供。" },
        { label: "隐私", value: "Data Not Collected", note: "正常游玩无账号、无广告、不联网、无第三方统计和追踪。" },
        { label: "商业化", value: "免费 + 一次买断", note: "免费默认皮肤 Classic Green 完整可用；9 套付费皮肤一次买断全部解锁，不订阅。" },
        { label: "语言", value: "12 UI languages", note: "覆盖英语、简繁中文、日语、韩语、西班牙语、法语、德语、葡萄牙语（巴西）、意大利语、俄语和阿拉伯语。" }
      ],
      valueProps: [
        { title: "给玩家的是一局安静的接龙", body: "没有开屏广告、登录流程、每日任务或体力限制。打开就是牌桌，撤销、提示和存档都在身边，局内帮助不需要通过看广告来换取。" },
        { title: "给审核的是清楚边界", body: "App Store 描述、隐私政策和服务条款都强调同一件事：正常游玩不需要网络，StoreKit 只负责皮肤的一次买断，数据留在设备本地。" },
        { title: "安静是整体气质", body: "落叶、扫叶等特效与触感反馈服务于牌桌本身，背景音乐与环境音可以关闭，安静始终优先。" }
      ],
      featureDetails: [
        { title: "Classic Green 与 9 套材质皮肤", body: "免费默认皮肤是 Classic Green（经典绿毡）。另有 9 套付费材质皮肤，包括漆金夜、酒红丝绒、皇家蓝毡、胡桃木、干邑皮革、大理石、夜石板、靛蓝扎染和极光夜；一次买断即可解锁全部皮肤。" },
        { title: "落叶与扫叶", body: "牌局中的特色包括落叶与扫叶效果，让牌桌的变化更有画面感，而不是把注意力引向数字和提示。" },
        { title: "触感与声音", body: "支持触感反馈；背景音乐与环境音可以开启或关闭，不需要时保持安静。" },
        { title: "已验证有解的发牌", body: "提供“已验证有解”的发牌模式：求解器为这副牌找到过解，但不保证这一局容易。" },
        { title: "撤销、提示与存档", body: "撤销、提示、存档、抽一或抽三全部免费，局内帮助不绑定广告、体力或付费墙。" },
        { title: "本地游玩与 StoreKit", body: "牌局存档、统计和偏好保存在设备里；皮肤买断交给 Apple StoreKit 处理，不引入自有服务器。买断为非消耗型、支持家庭共享、不订阅，已购用户未来新增的皮肤不再收费。" }
      ],
      principles: [
        { title: "先写不做清单", body: "无广告、无账号、无订阅、无联网、无第三方追踪，这些边界决定了依赖、隐私政策、文案和审核说明。" },
        { title: "商业化不打断牌局", body: "付费只收束到牌桌皮肤。免费默认皮肤和所有玩法完整可用，玩家喜欢视觉时再主动解锁，不在局中制造购买压力。" },
        { title: "有解不等于容易", body: "“已验证有解”的发牌模式只承诺求解器找到过解，不承诺牌局简单，不把难度包装成体验承诺。" }
      ],
      diaryIntro:
        "Sumi Klondike Solitaire 目前处于 App Store 筹备中，开发日记尚未发布。可以先对照 Sumi Mahjong 的开发日记，看同一组安静游戏从立项、隐私边界到商业化上架的路径。"
    },
  },
  {
    slug: "trekreel",
    name: "TrekReel",
    displayName: "TrekReel",
    category: "3D 轨迹故事工具",
    tagline: "把 GPX / KML 轨迹变成电影感 3D 地图故事。",
    summary: "将 GPX / KML / KMZ 轨迹转为电影感 3D 路线故事视频：框选区域下载卫星影像、地形和道路，用幻灯片式关键帧制作运镜，专为户外徒步、骑行、跑步与旅行记录打造。",
    platforms: ["macOS", "3D", "地图"],
    status: ["App Store", "创作者工具", "本地优先", "免费 + Pro 一次买断"],
    audience: "户外、骑行、跑步、旅行和地图视频创作者。",
    primaryAction: { label: "App Store", url: "https://apps.apple.com/us/app/trekreel-3d-map-video-maker/id6758914035?mt=12" },
    repo: "https://hooosberg.com/apps/trekreel",
    website: undefined,
    hideSourceLinks: true,
    icon: "/product-icons/trekreel.png",
    accent: "#ea580c",
    priority: "P1",
    learnSlug: "trekreel-map-story",
    privacy: privacyLocal("轨迹文件和项目在本机处理，不上传。框选区域时，所选范围的地图瓦片会从公开地图服务下载。"),
    features: ["导入 GPX / KML / KMZ 轨迹", "框选区域下载卫星影像、地形和道路，可离线使用", "幻灯片式关键帧制作 3D 运镜", "导出 720p–4K 视频、高清图片和 3D 打印模型"],
    buildNotes: ["视觉工具、地图数据和视频导出课程案例。"],
    courseHooks: ["地图可视化", "GPX / KML", "视频素材生成"],
    detail: {
      overview: [
        "TrekReel 是一款 macOS 上的 3D 轨迹故事工具：导入 GPX、KML 或 KMZ 轨迹，在真实的卫星影像和地形上生成路线，再用类似做 PPT 的关键帧方式设计镜头，最后导出成视频。",
        "它面向户外徒步、骑行、跑步和旅行记录的创作者。你不需要学剪辑软件：在路线上设几个关键帧，TrekReel 会在它们之间生成平滑的电影感运镜。",
        "地图数据来自公开的开放数据源（Sentinel-2 卫星影像、AWS 地形、OpenStreetMap 道路），你框选一个区域后下载到本机，之后可以离线使用。轨迹文件、项目和导出的视频都留在你的电脑上。"
      ],
      proofPoints: [
        { label: "输入", value: "GPX / KML / KMZ", note: "导入后按当前选区形状（矩形或圆形）自动关联区域并加载地图数据。" },
        { label: "地图", value: "卫星 + 地形 + 道路", note: "框选区域下载，缩放级别 8–13，下载后可离线查看；数据源有多个备用服务器。" },
        { label: "导出", value: "视频 / 图片 / 3D 打印", note: "免费版最高 720p 视频和单色 STL；Pro 解锁 1080p、4K、高清图片和全彩 OBJ。" },
        { label: "商业化", value: "免费 + 一次买断", note: "没有订阅，没有广告，没有账号。" }
      ],
      valueProps: [
        { title: "会做 PPT 就能做路线视频", body: "沿路线设置关键帧，就像排幻灯片；镜头角度、缩放和倾斜由你控制，中间的运镜由 TrekReel 自动生成。" },
        { title: "数据来源清楚", body: "影像、地形和道路都来自公开开放数据，并在应用内和网站上署名与说明许可；每类数据都有备用服务器，下载失败会自动切换。" },
        { title: "文件留在你的电脑", body: "TrekReel 没有账号系统、广告和第三方统计。轨迹和项目文件在本机处理；只有下载地图时才会访问公开地图服务。" }
      ],
      featureDetails: [
        { title: "导入与区域下载", body: "支持 GPX、KML、KMZ。也可以在地图上框选矩形或圆形区域，下载卫星影像、地形、道路和兴趣点，之后离线使用。" },
        { title: "关键帧运镜", body: "沿路线设置关键帧，控制相机角度、缩放和倾斜，预览动画后再导出。" },
        { title: "标注与图层", body: "用线条、多边形和标点标注故事，在图层管理里开关影像、道路、兴趣点、GPS 数据和素材库。" },
        { title: "导出", body: "导出 720p 至 4K 视频、高清图片、路线平面图，或用于 3D 打印的 STL / OBJ 模型；也可保存项目文件以便继续编辑。" }
      ],
      principles: [
        { title: "只用可署名的开放数据", body: "默认数据源都是免费开放且允许商用的；不内置授权不明的商业影像，自定义源由用户自行确认授权。" },
        { title: "失败时有备用", body: "公共服务器可能繁忙或限流。TrekReel 会重试并切换备用服务器，并在区域卡片上提示缺失的数据，可以稍后重试。" },
        { title: "发布是工程的一部分", body: "隐私说明、支持页、数据源验证和商店元数据一起随版本检查，避免页面与应用行为不一致。" }
      ],
      diaryIntro: "TrekReel 的开发日记记录了从立项、轨迹数据、地图与相机、创作者工具到 App Store 审核的过程，包括 IAP 审核图不能误传付费墙截图这类真实复盘。"
    },
  },
  {
    slug: "mood-button",
    name: "Mood Button",
    displayName: "Mood Button",
    category: "本地 AI 情绪日记",
    tagline: "Apple MLX + Qwen3 本地 AI 语音情绪日记。",
    summary: "基于 Apple MLX 与 Qwen3 的设备端本地 AI 语音情绪日记，隐私内容绝不离端。",
    platforms: ["iPhone", "iPad", "MLX", "Qwen3"],
    status: ["App Store", "v1.0 已上架", "本地 AI"],
    audience: "希望用本地 AI 做语音日记、情绪记录和轻量自我复盘的用户。",
    primaryAction: { label: "App Store", url: "https://apps.apple.com/us/app/mood-button/id6780051060" },
    secondaryAction: { label: "GitHub", url: "https://github.com/hooosberg/mood-button" },
    repo: "https://github.com/hooosberg/mood-button",
    website: undefined,
    icon: "/product-icons/mood-button.png",
    accent: "#db2777",
    priority: "P1",
    learnSlug: "mood-button-local-voice",
    privacy: privacyLocal("录音、转写、日记、心情标签、搜索词和皮肤偏好保存在设备端；Qwen3 MLX 模型随 App 内置，不向 OpenAI、Anthropic、Gemini、ChatGPT 或其他托管第三方 AI 服务发送用户内容。Apple Speech 可能按系统能力处理语音识别；可选天气只在位置授权后向 Open-Meteo 请求四舍五入后的坐标。"),
    features: ["语音情绪记录", "Apple MLX 本地推理", "Qwen3 轻量交互", "低干扰日记体验"],
    buildNotes: ["本地语音 AI 和情绪产品边界。", "2026-06-17 被 App Review 拒回后补 iPad / Universal 支持、隐私披露和 IAP 路径说明；2026-06-23 再次提交审核，2026-06-26 已上架。"],
    courseHooks: ["本地 AI", "语音日记", "情绪产品设计"],
    detail: {
      overview: [
        "Mood Button 是 iPhone 和 iPad 上的本地 AI 语音情绪日记，v1.0 已于 2026-06-26 在 App Store 上架，主入口现在直接跳转到真实商店页面。",
        "这次发布保留了完整审核过程：2026-06-17 App Review 拒回了 build 1.0 (2)，问题集中在 iPad UI、AI 数据流隐私说明，以及 IAP 入口可见性。",
        "后续版本补齐了 App Review Notes、“无第三方托管 AI 服务接收用户内容”的隐私披露、iPad / Universal 支持、iPad 截图和 IAP 操作路径，2026-06-23 再次提交审核，2026-06-26 上架。",
        "所以这里不再把旧 GitHub Pages 或审核中状态放成主入口。产品页负责解释隐私边界和产品价值，主按钮负责把用户带到 App Store。"
      ],
      proofPoints: [
        { label: "商店状态", value: "已上架", note: "2026-06-26 可在 App Store 下载 v1.0，App Store ID 为 6780051060。" },
        { label: "拒审问题", value: "4.0 / 5.1 / 2.1(b)", note: "iPad UI、AI 隐私披露、IAP Unlock Home Skins 可见性。" },
        { label: "事实源", value: "App Store + 发布记录", note: "来自 Apple 公开商店条目、审核节点和发布准备记录。" },
        { label: "公开材料", value: "Hooosberg.com", note: "新官网承载产品页、隐私政策、支持入口和审核可读的数据流说明；旧 GitHub Pages 仅保留为归档。" }
      ],
      valueProps: [
        { title: "上架入口要直达商店", body: "产品已经通过审核后，页面应该把用户带到真实 App Store，而不是继续保留“即将上架”或旧产品页作为主入口。" },
        { title: "审核经验会沉淀成课程", body: "这次从拒审、修复、再次提审到上架，能讲清楚 AI 产品怎样向 Apple 解释数据流、怎样给审核员展示 IAP 路径，以及为什么 iPad 兼容不能靠侥幸。" },
        { title: "本地 AI 是产品承诺", body: "核心日记生成跑在设备侧的 Apple MLX + Qwen3 流程上；公开隐私文案、App 内说明和 App Review Notes 必须和真实实现一致。" }
      ],
      featureDetails: [
        { title: "语音记录到日记", body: "用户用短语音记录当天状态，App 把录音整理成可回看的情绪日记草稿。" },
        { title: "设备侧 AI 处理", body: "Qwen3 MLX 模型随 App 打包，在支持的实体 iPhone 上运行，避免把私密情绪内容默认交给第三方托管 AI。" },
        { title: "可选皮肤内购", body: "核心记录、回看、搜索和导出保持可用，付费点收敛到一次买断的 Home Skins 解锁。" },
        { title: "审核后补强", body: "拒审后补齐 iPad 兼容、隐私披露和 Review Notes 中的 IAP 操作路径，减少审核员找不到入口的风险。" }
      ],
      principles: [
        { title: "渠道状态要实时更新", body: "用户看到的第一个按钮必须反映真实渠道状态。未通过审核时显示即将上架，审核通过后就切成 App Store。" },
        { title: "AI 产品先讲数据流", body: "涉及语音和情绪时，要主动解释用户内容是否离开设备、是否给第三方 AI、是否用于训练。" },
        { title: "审核可见性也是功能", body: "IAP、隐私页、支持页、iPad 布局和截图都要能被审核员按说明复现，不能只在开发者机器上成立。" }
      ],
      diaryIntro:
        "Mood Button 的开发日记会继续记录从本地 AI 原型、语音入口、隐私边界、iPad 适配、App Review 修复到正式上架的真实过程。"
    },
  },
  {
    slug: "rushi",
    name: "Rushi",
    displayName: "Rushi 如是",
    category: "佛经阅读与抄经工具",
    tagline: "金刚经、心经、佛珠计数和抄经练习的 iOS 静心工具。",
    summary: "金刚经与心经阅读、佛珠计数及源图字帖抄经的静心工具。基础功能免费，书法抄经支持一次买断。",
    platforms: ["iPhone", "iPad", "iOS", "公共领域素材"],
    status: ["App Store", "v1.1 准备中", "一次买断 IAP"],
    audience: "需要干净佛经阅读、佛珠计数、多语言文本和安静抄经体验的用户。",
    primaryAction: { label: "App Store", url: "https://apps.apple.com/us/app/rushi-sutra-mala-meditation/id6766074713" },
    repo: "https://github.com/hooosberg/Rushi",
    website: "https://hooosberg.com/apps/rushi/",
    hideSourceLinks: true,
    icon: "/product-icons/rushi.png",
    accent: "#b45309",
    priority: "P2",
    learnSlug: "rushi-public-domain-content",
    privacy: privacyLocal("经文阅读、佛珠计数、抄经作品、设置和字帖练习状态保存在设备本地；无账号、无广告、无第三方追踪。可选抄经书法一次买断通过 Apple StoreKit 完成，Hooosberg 不接收 Apple ID、付款方式或账单信息。"),
    features: ["金刚经与心经", "佛珠计数", "源图字帖抄经", "iPad 支持"],
    buildNotes: ["公共领域内容产品和多语言页面。", "v1.1 增加 iPad 支持、源图字帖和 Copy Practice Unlock 一次买断。"],
    courseHooks: ["内容产品", "多语言", "StoreKit 2", "静心 App"],
    detail: {
      overview: [
        "Rushi 如是现在围绕三件事组织体验：安静阅读金刚经与心经、用佛珠计数进入日常练习、在抄经里使用源图字帖临摹。",
        "v1.1 同步补上 iPad 支持和抄经字帖功能。基础阅读、佛珠计数和静心声音继续免费；抄经书法练习通过 Apple StoreKit 的 Copy Practice Unlock 一次买断解锁，不做订阅。",
        "字帖来源会在 App 内关于与资源来源里说明为公开版权、公共领域或可开放使用的素材。用户在抄经界面可以查看字帖原始图片，金刚经支持多页预览、左右切换和缩放查看。",
      ],
      proofPoints: [
        { label: "平台", value: "iPhone / iPad", note: "v1.1 按 Universal iOS 体验整理页面、截图和功能描述。" },
        { label: "付费", value: "一次买断", note: "阅读与佛珠免费，Copy Practice Unlock 只解锁抄经书法练习，不提供自动续订订阅。" },
        { label: "字帖", value: "柳公权金刚经 / 欧阳询心经", note: "以公开版权或可开放使用的源图为基础，保留原始图片查看和来源说明。" },
        { label: "隐私", value: "本地保存", note: "经文状态、佛珠计数、抄经作品、设置和字帖练习状态保存在设备本地；无账号、无广告、无第三方追踪。" },
      ],
      valueProps: [
        { title: "先是安静阅读工具", body: "产品不承诺宗教效果，也不做社区、打卡榜或复杂解释；它提供干净经文、计数和低干扰练习入口。" },
        { title: "字帖不只是装饰", body: "抄经里的字帖来自真实书法源图，金刚经按多页材料处理，用户可以把它当作临摹对象，而不是普通背景贴纸。" },
        { title: "商业化边界清楚", body: "基础功能免费，书法抄经作为可选买断功能；购买、恢复和退款由 Apple StoreKit 与 App Store 规则处理。" },
      ],
      featureDetails: [
        { title: "金刚经与心经", body: "经文阅读保留多语言文本和简洁排版，方便用户把 Rushi 当作日常阅读入口。" },
        { title: "佛珠计数", body: "佛珠功能服务短时练习，不需要账号、排行榜或社交同步，状态保存在本地。" },
        { title: "源图字帖抄经", body: "抄经练习使用柳公权金刚经碑帖和欧阳询心经字帖等公开版权或开放来源材料；中文用户可以配合系统文字，其他语言用户也可以把字帖作为纯图像临摹。" },
        { title: "原图预览", body: "字帖原始图片可以在抄经界面直接查看，支持全屏、多页切换、左右拖拽和缩放，便于核对真实来源。" },
        { title: "iPad 支持", body: "iPad 版本让阅读、抄经和预览有更大的空间，也让 App Store 上架材料与真实设备体验保持一致。" },
      ],
      principles: [
        { title: "来源先说清", body: "宗教文本和书法材料要优先讲清版本、版权与来源，避免把公开素材包装成不明权利内容。" },
        { title: "付费不打扰基础阅读", body: "未解锁时不显示会误导用户的新建抄经入口；解锁后再出现书法练习入口，付费墙只解释可选高级功能。" },
        { title: "跨语言要尊重理解差异", body: "中文用户可以看到经文文字和字帖对应；其他语言用户不强行展示不懂的中文系统文字，而是把字帖作为临摹图像开放。" },
      ],
      diaryIntro:
        "Rushi 的开发日记会继续记录公共领域经文、书法字帖来源、iPad 适配、StoreKit 一次买断和上架合规如何合在一个安静内容 App 里。",
    },
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
    summary: "曾想用 Chrome 侧边栏自动填写应用商店字段，Codex 代理成熟后沉淀为流程经验复盘。",
    platforms: ["Chrome", "App Store Connect", "本地化"],
    status: ["失败复盘", "开源", "AI 替代"],
    audience: "需要批量维护 App Store 本地化字段的独立开发者。",
    primaryAction: { label: "官网", url: "https://hooosberg.github.io/Packpour/" },
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
    primaryAction: { label: "官网", url: "https://hooosberg.github.io/BeRaw/" },
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
    summary: "探索 AI 设计工作流与 UI 生成协议的实验项目，复盘中间层被模型直接替代的经验。",
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

// 展示顺序：**新上线 / 新加的 App 一律放在最前面**（首页“最新产品”取前 6 个，产品列表页按这个顺序排）。
const latestProductSlugs = [
  "sumi-block-puzzle",
  "sumi-freecell",
  "sumi-klondike-solitaire",
  "leantake",
  "docktouchbar",
  "mood-button",
  "sumi-mahjong",
  "drowsebook",
  "glotshot",
  "trekreel",
  "witnote",
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
  "sumi-block-puzzle": "筹备中",
  docktouchbar: "刚发布",
  "sumi-mahjong": "最近上架",
  "sumi-freecell": "筹备中",
  "sumi-klondike-solitaire": "筹备中",
  drowsebook: "v1.1 已通过",
  glotshot: "失败复盘",
  trekreel: "近期发布",
  witnote: "核心产品",
  "mood-button": "刚上架",
  packpour: "失败复盘",
  beraw: "浏览器工具",
  domprompter: "失败复盘",
  agentlimb: "活跃维护 · 0.6.4",
  "codex-quota-calendar": "Codex 工具",
  uixskills: "失败复盘",
  dailyzikr: "支持页迁移",
  rushi: "内容产品",
};

export const productProgressSyncedAt = "2026-06-26";

export const productProgressItems: ProductProgressItem[] = [
  {
    productSlug: "mood-button",
    phase: "App Store",
    status: "已上架",
    next: "开始首轮推广、观察用户反馈",
    source: "Apple 公开商店条目 2026-06-26",
    progress: 100,
    tone: "live",
    segments: [
      { kind: "research", start: "2026-06-04", end: "2026-06-06" },
      { kind: "build", start: "2026-06-06", end: "2026-06-17" },
      { kind: "review", start: "2026-06-17", end: "2026-06-26" },
    ],
  },
  {
    productSlug: "dailyzikr",
    phase: "App Store",
    status: "已上架",
    next: "补产品档案、ASO 和首轮素材",
    source: "公开发布进度 2026-06-14",
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
    source: "公开发布进度 2026-05-23",
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
    source: "公开发布进度 2026-06-21",
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
    source: "公开发布进度 2026-05-23",
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
    source: "公开发布进度 2026-05-23",
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
    source: "公开发布进度 2026-05-23",
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
    source: "公开发布进度 2026-05-23",
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
    source: "公开发布进度 2026-05-23",
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
    next: "等 Mood Button 首轮反馈再排期",
    source: "公开发布进度 2026-05-24",
    progress: 12,
    tone: "observe",
    segments: [
      { kind: "research", start: "2026-06-17", end: "2026-06-20" },
      { kind: "hold", start: "2026-06-20", end: "2026-06-26" },
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

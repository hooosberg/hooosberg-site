import type { ArticleSeed } from "./articles";

type DiaryDraft = Omit<ArticleSeed, "date" | "productSlugs" | "seriesOrder"> & {
  order: number;
  date?: string;
};

const productSeries = (productSlug: string, items: DiaryDraft[]): ArticleSeed[] =>
  items.map(({ order, date, ...item }) => ({
    ...item,
    date: date ?? "2026-06-19",
    productSlugs: [productSlug],
    seriesOrder: order,
  }));

export const expandedProductDiaries: ArticleSeed[] = [
  ...productSeries("witnote", [
    {
      slug: "witnote-local-ai-writing",
      title: "01 · 立项：为什么做本地优先 AI 写作工具",
      category: "产品复盘",
      excerpt: "WitNote 的起点不是再做一个笔记本，而是给写作者一个本地可控的 AI 工作台。",
      tags: ["WitNote", "本地 AI", "立项"],
      order: 1,
      body: [
        "WitNote 的第一个判断是：AI 写作工具不能只围绕聊天框设计。真正写长文、整理资料和沉淀知识的人，关心的是文件在哪里、模型怎么接、写作过程会不会被平台打断。",
        "所以它从一开始就把“本地文件夹、Markdown、模型可切换、隐私可解释”放在产品底层。AI 是写作助手，不是把用户的知识库接管到另一个黑箱里。",
      ],
      sections: [
        {
          heading: "用户痛点：写作资料不应该被工具绑架",
          paragraphs: [
            "很多 AI 写作产品把内容放进自己的数据库，短期方便，长期会让用户担心迁移、隐私和可控性。WitNote 选择让本地文件夹成为知识库，用户可以随时用 Finder、编辑器或其他工具接管。",
          ],
        },
        {
          heading: "产品边界：先做安静桌面，再做智能能力",
          paragraphs: [
            "首版不追求把 AI 功能堆满，而是先让笔记、预览、文件管理和模型调用顺畅。只有普通写作体验足够稳，AI 补全、改写、角色库和知识库问答才不会变成漂浮的功能。",
          ],
        },
        {
          heading: "课程价值：办公落地不是炫技",
          paragraphs: [
            "WitNote 很适合做 AI 办公教程案例，因为它能讲清楚从真实需求、文件组织、模型接入、隐私政策到 App Store 表达的全流程，而不是只演示一次提示词效果。",
          ],
        },
      ],
    },
    {
      slug: "witnote-writer-instinct",
      title: "02 · 开发哲学：从认真写作者的本能出发",
      category: "产品复盘",
      excerpt: "写作者需要的是可回到原稿、可掌控上下文、可长期维护的工作流。",
      tags: ["写作", "产品哲学", "工作流"],
      order: 2,
      body: [
        "WitNote 的开发哲学可以概括成一句话：认真写作者需要的是控制感。AI 可以帮忙，但不能把结构、资料、草稿和最终文本变成不可理解的中间状态。",
        "因此设计上要尽量减少“魔法感”，保留文件、标题、片段、历史和导出的清晰边界。工具越像一个安静的工作台，用户越愿意把长期内容放进去。",
      ],
      sections: [
        {
          heading: "不是更会聊天，而是更会陪写",
          paragraphs: [
            "聊天式 AI 的强项是快速发散，但写作需要反复回看、修订和组织。WitNote 把 AI 放在侧边能力里，让用户始终围绕自己的文稿工作，而不是围绕模型的回复工作。",
          ],
        },
        {
          heading: "文件结构就是认知结构",
          paragraphs: [
            "本地文件夹、Markdown 标题和文档列表不仅是存储方案，也是用户理解自己项目的方式。产品不能把这些结构藏起来，否则 AI 越强，用户越容易失去方向。",
          ],
        },
        {
          heading: "可变的 AI，不变的文稿",
          paragraphs: [
            "模型会变、API 会变、价格会变，但用户自己的文字应该稳定存在。WitNote 把文稿和模型解耦，未来换成本地模型、Ollama 或云 API 时，写作资产仍然在用户手里。",
          ],
        },
      ],
    },
    {
      slug: "witnote-local-files-knowledgebase",
      title: "03 · 文件边界：本地文件夹就是知识库",
      category: "架构实现",
      excerpt: "把文件夹当知识库，意味着导入、索引、预览、权限和同步都要重新设计。",
      tags: ["本地文件", "知识库", "Markdown"],
      order: 3,
      body: [
        "本地优先不是一句宣传语，它会直接影响工程结构。WitNote 需要面对文件读写、目录扫描、Markdown 解析、跨平台路径、删除恢复和用户误操作这些非常具体的问题。",
        "这条路线的好处是清楚：用户的内容可以被备份、迁移、搜索和复用。坏处也清楚：产品必须把文件状态、异常提示和安全边界做得更稳。",
      ],
      sections: [
        {
          heading: "导入不是复制一份就结束",
          paragraphs: [
            "文件进入工作台后，要考虑原始文件和应用内部状态的关系。哪些内容只是引用，哪些内容需要写回，哪些内容应该生成预览缓存，都要有明确策略。",
          ],
        },
        {
          heading: "Markdown 是最低可维护协议",
          paragraphs: [
            "Markdown 的价值不是格式漂亮，而是几十年后仍然能打开。对写作者来说，能脱离 App 阅读和编辑，是本地优先产品最重要的信任基础。",
          ],
        },
        {
          heading: "安全感来自可解释的限制",
          paragraphs: [
            "应用不应该偷偷扫描全盘，也不应该默认上传文稿。用户选择哪个文件夹，产品就围绕那个边界工作；需要调用云模型时，也必须让用户理解内容会被发送到哪里。",
          ],
        },
      ],
    },
    {
      slug: "witnote-multi-model-architecture",
      title: "04 · 模型接入：Ollama、本地模型和云 API 的边界",
      category: "架构实现",
      excerpt: "多模型不是把配置项堆起来，而是给不同隐私、速度和质量需求留出口。",
      tags: ["Ollama", "模型接入", "OpenAI-compatible"],
      order: 4,
      body: [
        "WitNote 的模型接入需要同时服务几类用户：有人只想用本地模型，有人愿意接云 API，有人只需要偶尔改写一段文字。把这些需求放进同一个界面，难点不在调用接口，而在解释边界。",
        "产品上应该把模型能力变成可替换的服务层，而不是和编辑器、文件系统、角色库紧紧绑死。这样后续模型生态变化时，整个应用不用重写。",
      ],
      sections: [
        {
          heading: "本地模型负责隐私和稳定入口",
          paragraphs: [
            "本地模型的优势是内容不离开设备，适合私密笔记、草稿和长期资料库。它的限制是速度、模型大小和效果波动，所以界面不能过度承诺。",
          ],
        },
        {
          heading: "云 API 负责质量和高阶任务",
          paragraphs: [
            "云模型适合复杂改写、结构化总结和长上下文任务，但调用前需要清楚告知用户。把云 API 做成可选能力，比默认上传更符合本地优先的产品承诺。",
          ],
        },
        {
          heading: "抽象层要服务真实写作场景",
          paragraphs: [
            "多模型架构不是为了展示兼容列表，而是为了让“润色一段”“整理大纲”“改成口播稿”“提取待办”这些动作在不同模型下尽量保持一致体验。",
          ],
        },
      ],
    },
    {
      slug: "witnote-native-calm-ui",
      title: "05 · UI 收口：把工作台从功能堆叠变回安静桌面",
      category: "设计系统",
      excerpt: "AI 写作产品最容易变得吵，WitNote 的 UI 目标是让文字重新成为中心。",
      tags: ["UI", "桌面应用", "安静设计"],
      order: 5,
      body: [
        "AI 工具常见问题是功能入口越来越多：模型、角色、知识库、历史、预览、导出、设置全部想抢注意力。WitNote 的 UI 收口目标是让用户一眼知道自己正在写什么。",
        "设计不是把按钮做小，而是决定哪些能力应该常驻，哪些能力应该折叠，哪些能力只在上下文需要时出现。真正高级的桌面工具通常不是显得复杂，而是让复杂性有位置。",
      ],
      sections: [
        {
          heading: "信息密度要跟任务节奏一致",
          paragraphs: [
            "文件列表、编辑区和 AI 辅助区的权重需要稳定。写作时文本最大，整理时文件结构更重要，调用模型时上下文和结果才临时浮上来。",
          ],
        },
        {
          heading: "不要用营销式 UI 包装生产工具",
          paragraphs: [
            "WitNote 面向的是反复使用的写作桌面，不是一次性展示页。界面应该安静、可扫描、可长时间停留，避免大面积炫光、夸张卡片和过度动画。",
          ],
        },
        {
          heading: "空状态也要能教用户开始",
          paragraphs: [
            "本地优先产品的第一步常常是选择文件夹或创建笔记。空状态要告诉用户可以做什么，但不应该写成教程墙，让用户在一分钟内进入第一篇文稿。",
          ],
        },
      ],
    },
    {
      slug: "witnote-book-mode-export",
      title: "06 · 长文工作流：Markdown、HTML 和 EPUB 导出",
      category: "AI 工作流",
      excerpt: "当笔记变成长文，导出能力就不再是附属功能，而是写作闭环的一部分。",
      tags: ["长文", "导出", "EPUB"],
      order: 6,
      body: [
        "WitNote 不只服务零散笔记，也要服务长文、教程和小书。长文工作流的核心是：用户可以从片段开始，逐步组织成章节，最后导出成可交付格式。",
        "这和我们做个人站的思路一致：开发过程、产品复盘和课程内容都可以先在本地写，之后再变成博客、教程、README、商店文案和视频脚本。",
      ],
      sections: [
        {
          heading: "导出是内容资产的出口",
          paragraphs: [
            "如果一个写作工具只允许在应用内部阅读，用户会担心沉没成本。HTML、Markdown 和 EPUB 这些开放格式，是产品向用户证明“内容属于你”的方式。",
          ],
        },
        {
          heading: "AI 可以参与组织，而不是替代判断",
          paragraphs: [
            "AI 适合帮用户整理章节、补摘要、改标题和生成发布版本，但最终结构仍然应该由用户确认。长文工作流要保留编辑权，而不是一键生成后不可追溯。",
          ],
        },
        {
          heading: "从产品功能变成课程样本",
          paragraphs: [
            "WitNote 的导出链路本身就可以成为教程：如何设计本地文件、如何把 Markdown 转成多种格式、如何让 AI 辅助长文组织，以及如何保护用户内容所有权。",
          ],
        },
      ],
    },
    {
      slug: "witnote-macos-review-window-menu",
      title: "07 · 审核复盘：关闭窗口后如何重新打开",
      category: "App Store",
      excerpt: "WitNote 1.2.4 曾因 macOS 主窗口关闭后没有重新打开入口被 Guideline 4 拒绝，1.2.8 通过标准窗口管理修复。",
      tags: ["App Review", "macOS", "窗口管理"],
      order: 7,
      body: [
        "WitNote 的一次早期拒审很典型：产品功能并不是坏的，问题出在 macOS 平台习惯。2025-12-30，Apple 审核 1.2.4 时指出，用户关闭主应用窗口后，没有菜单项可以重新打开它。",
        "Apple 原文要点是：when the user closes the main application window there is no menu item to re-open it。中文翻译就是：用户关闭主窗口后，找不到重新打开主窗口的菜单项。",
        "这次修复进入 1.2.8：增加标准 Window 菜单、Show Main Window、Dock 图标激活、Cmd+1 快捷键和 Dock 右键菜单。它提醒我，macOS App 的完成度不只是首屏能打开，还包括关闭窗口之后能不能按平台习惯回到工作台。"
      ],
      sections: [
        {
          heading: "Apple 原文要点",
          paragraphs: [
            "Guideline 4 - Design：Apple 认为 App 的用户界面造成低于 App Store 用户预期的体验。具体问题是主窗口关闭后没有可重新打开的菜单项。",
            "审核环境是 MacBook Pro (14-inch, Nov 2024)，Submission ID 为 966c35e0-da24-4350-a6e7-e8dcb3bd8c2d，Version reviewed 是 1.2.4。完整原信和回复已经归档在上架助手。"
          ],
        },
        {
          heading: "中文翻译",
          paragraphs: [
            "Apple 的意思不是要求界面更漂亮，而是要求符合 macOS 的基本窗口管理预期。用户关闭窗口后，如果 App 还在运行，就应该能从 Window 菜单、Dock 或其他菜单项回到主界面。",
            "如果产品选择单窗口关闭即退出，也要保存数据并退出 App。WitNote 当时既没有退出，也没有提供明显恢复入口，所以被按 Design 问题打回。"
          ],
        },
        {
          heading: "我们怎么解决",
          paragraphs: [
            "1.2.8 增加了标准 Window 菜单，里面有 Show Main Window；Dock 图标点击会重新打开已经关闭的窗口；Cmd+1 可以把主窗口带到前台；Dock context menu 也提供 Show Main Window。",
            "回复 Apple 时没有争辩，而是按 macOS Human Interface Guidelines 的语言说明：现在用户随时可以回到主界面，关闭窗口后不会被困在一个仍在运行但无窗口可打开的状态。"
          ],
        },
        {
          heading: "复用教训",
          paragraphs: [
            "macOS 工具提审前要专门测试窗口生命周期：首次启动、Cmd+W、Window 菜单、Dock 图标、Dock 菜单、快捷键、重新激活和退出。很多个人开发者早期只测首屏，所以这类问题很容易漏。",
            "这件事也适合写进课程：平台不是装饰层，窗口、菜单、快捷键和 Dock 行为都是产品的一部分。越是本地优先桌面工具，越要尊重桌面系统的老规矩。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("agentlimb", [
    {
      slug: "agentlimb-browser-memory",
      title: "01 · 立项：为什么 AI 需要控制真实 Chrome",
      category: "AI 工作流",
      excerpt: "AgentLimb 的核心判断是：AI 自动化最终要进入用户真实浏览器，而不是停在模拟环境。",
      tags: ["AgentLimb", "Chrome", "立项"],
      order: 1,
      body: [
        "AI 编程工具已经能读文件、改代码、跑命令，但很多真实任务发生在浏览器里：登录后台、填写表单、检查页面、打开多个账号、复用某个平台的会话。",
        "AgentLimb 的立项不是做另一个浏览器插件，而是给 AI 工具一条可控的浏览器肢体。它让 Codex、Claude Code、Cursor 这类工具有机会在真实 Chrome 中完成操作。"
      ],
      sections: [
        {
          heading: "真实会话比截图更重要",
          paragraphs: [
            "许多网页操作依赖登录态、扩展、缓存、语言设置和账号环境。只靠截图或无头浏览器，经常无法复现用户真正遇到的状态。真实 Chrome 能让 AI 站在用户实际工作流里。"
          ],
        },
        {
          heading: "浏览器是办公自动化的公共入口",
          paragraphs: [
            "App Store Connect、社交平台、CMS、数据后台、支付后台都在浏览器里。AgentLimb 把浏览器看成一个通用操作层，而不是某个单点脚本。"
          ],
        },
        {
          heading: "产品边界要先讲清楚",
          paragraphs: [
            "AI 能控制浏览器不代表应该自动点击一切。AgentLimb 的边界是辅助用户完成可观察、可确认的任务，关键提交、付款、发布这类动作仍然需要人工确认。"
          ],
        },
      ],
    },
    {
      slug: "agentlimb-local-bridge",
      title: "02 · 架构：本地 bridge 如何连接 AI 工具和浏览器",
      category: "架构实现",
      excerpt: "本地 bridge 是 AgentLimb 的中枢：AI 不直接碰账号，浏览器也不把会话上传到云端。",
      tags: ["MCP", "Local bridge", "架构"],
      order: 2,
      body: [
        "AgentLimb 的架构重点不是“让插件能点网页”，而是让 AI 工具、本地服务、Chrome 扩展和用户会话之间有清楚的边界。",
        "本地 bridge 负责接收工具调用、转发浏览器动作、返回可理解的页面状态。这样会话留在本机，AI 工具只拿到完成任务所需的结构化信息。"
      ],
      sections: [
        {
          heading: "为什么用本地服务做中间层",
          paragraphs: [
            "浏览器扩展天然在浏览器权限体系里，AI 编程工具天然在终端和项目里。中间层能把两边的协议解耦，让前端控制、任务状态和错误处理更容易维护。"
          ],
        },
        {
          heading: "MCP 让工具能力可注册",
          paragraphs: [
            "通过 MCP 暴露浏览器能力，可以让不同 AI 工具用同一种方式调用页面导航、元素读取、点击、输入和截图。它把一次性脚本变成可复用工具。"
          ],
        },
        {
          heading: "安全来自少暴露和可关闭",
          paragraphs: [
            "本地 bridge 应该默认只在本机工作，明确端口、明确授权、明确关闭方式。用户需要知道什么时候浏览器正在被 AI 使用，也能随时中断。"
          ],
        },
      ],
    },
    {
      slug: "agentlimb-onboard-prompt",
      title: "03 · 接入体验：一段提示词完成设置",
      category: "AI 工作流",
      excerpt: "工具越底层，接入越要简单；AgentLimb 把配置步骤收敛成可复制的提示词。",
      tags: ["接入", "提示词", "开发体验"],
      order: 3,
      body: [
        "一个浏览器控制工具如果需要用户读十页文档，实际使用率会很低。AgentLimb 的接入策略是把安装、连接、能力说明和使用示例压缩成一段可以交给 AI 工具执行的提示词。",
        "这对课程很有价值：它展示了工具产品不只要做能力，还要设计“第一次成功”的路径。"
      ],
      sections: [
        {
          heading: "第一次成功比功能列表重要",
          paragraphs: [
            "用户第一次看到浏览器被 AI 正确打开、读取、点击，才会相信这套系统值得继续配置。接入文案要围绕这个时刻设计，而不是围绕完整 API 列表。"
          ],
        },
        {
          heading: "提示词也是产品界面",
          paragraphs: [
            "面向 AI 编程工具的产品，提示词本身就是 UI。它需要告诉模型做什么、不要做什么、如何检查状态、失败时如何回退。"
          ],
        },
        {
          heading: "文档要服务真实任务",
          paragraphs: [
            "AgentLimb 的教程不应该只写安装步骤，还要写 App Store 后台检查、网页 QA、资料采集、账号切换这些真实场景，让用户理解它能进入哪类工作流。"
          ],
        },
      ],
    },
    {
      slug: "agentlimb-muscle-memory",
      title: "04 · 记忆机制：为什么第二次任务更便宜",
      category: "架构实现",
      excerpt: "网页探索最贵的是第一次，AgentLimb 的 muscle memory 用来复用路径和页面知识。",
      tags: ["记忆", "自动化", "浏览器"],
      order: 4,
      body: [
        "AI 操作网页时，成本最高的常常不是点击，而是理解页面结构：按钮在哪里、字段叫什么、跳转后出现什么状态、失败时怎么恢复。",
        "AgentLimb 的 muscle memory 思路是把这些探索结果沉淀下来，让同类任务第二次、第三次执行时不必从零开始。"
      ],
      sections: [
        {
          heading: "自动化不是一次性脚本",
          paragraphs: [
            "一次性脚本能完成单个任务，但页面稍微变化就会失效。记忆机制记录的是任务路线和关键节点，让 AI 能根据现状重新确认，而不是机械复读坐标。"
          ],
        },
        {
          heading: "记忆要能被人读懂",
          paragraphs: [
            "如果记忆文件只有机器能理解，用户无法判断它是否安全。AgentLimb 更适合把页面路线、选择器、注意事项和人工确认点写成可读内容。"
          ],
        },
        {
          heading: "课程里可以讲复用的经济性",
          paragraphs: [
            "很多办公自动化的价值不是省下一次五分钟，而是把同一类重复任务变成可复用流程。记忆机制正好可以解释 AI 工具如何从“聪明”走向“省事”。"
          ],
        },
      ],
    },
    {
      slug: "agentlimb-multi-profile",
      title: "05 · 多账号：让浏览器窗口成为可调度资源",
      category: "AI 工作流",
      excerpt: "多账号、多平台和多窗口是运营自动化的真实需求，也最容易踩权限边界。",
      tags: ["多账号", "运营", "Chrome"],
      order: 5,
      body: [
        "真实运营往往不是一个账号、一个网页、一个动作。它可能涉及 X、YouTube、B 站、小红书、App Store Connect、Cloudflare 等不同后台。",
        "AgentLimb 的多窗口和多 profile 价值在于让不同浏览器上下文成为可调度资源，但同时要避免账号混用和误操作。"
      ],
      sections: [
        {
          heading: "账号隔离是产品能力，不只是浏览器设置",
          paragraphs: [
            "当 AI 能操作浏览器时，账号边界必须更清晰。每个 profile 对应哪个平台、哪个用途、是否允许发布，都应该成为任务上下文的一部分。"
          ],
        },
        {
          heading: "高风险动作需要人工门槛",
          paragraphs: [
            "多账号自动化最需要克制：可以帮用户打开页面、填草稿、检查字段，但正式发布、付款和提交审核应该留下确认动作。"
          ],
        },
        {
          heading: "矩阵运营需要统一入口",
          paragraphs: [
            "个人站、产品页、视频平台和课程入口都会进入浏览器工作流。AgentLimb 可以成为这些矩阵链接检查、素材发布和后台维护的基础工具。"
          ],
        },
      ],
    },
    {
      slug: "agentlimb-qa-growth-workflows",
      title: "06 · 场景复盘：测试、调研和内容运营",
      category: "AI 工作流",
      excerpt: "AgentLimb 的长期价值不在单个动作，而在把 QA、调研和运营流程变得可重复。",
      tags: ["QA", "增长", "流程化"],
      order: 6,
      body: [
        "AgentLimb 最适合讲的不是一个酷炫 demo，而是三类稳定场景：前端页面 QA、竞品/平台资料调研、内容矩阵维护。",
        "这些场景共同特点是：浏览器状态复杂、步骤重复、人工检查仍然重要。AI 可以减轻机械操作，但不能替代最终判断。"
      ],
      sections: [
        {
          heading: "QA 场景：从看页面到证据链",
          paragraphs: [
            "网页上线前需要检查布局、响应式、链接、控制台错误和实际交互。AgentLimb 可以让 AI 在真实浏览器里完成一轮可复述的检查。"
          ],
        },
        {
          heading: "调研场景：把网页资料转成结构化记录",
          paragraphs: [
            "平台规则、课程页面、竞品落地页和产品文档都在网页里。浏览器控制可以帮助 AI 按同一框架采集信息，减少人工复制粘贴。"
          ],
        },
        {
          heading: "运营场景：先生成草稿，再人工发布",
          paragraphs: [
            "社交平台运营不是让 AI 自动乱发，而是把标题、描述、链接、标签、截图检查这些环节标准化。AgentLimb 可以做流程辅助，保留人工发布权。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("domprompter", [
    {
      slug: "domprompter-app-review-settings-web-access",
      title: "07 · 审核复盘：Settings 无响应和网页访问分级",
      category: "App Store",
      excerpt: "DOMPrompter 0.1.0 被 Apple 指出 Settings 菜单无响应，并且需要把 Unrestricted Web Access 年龄分级改为 Yes。",
      tags: ["App Review", "Electron", "Age Rating"],
      order: 7,
      body: [
        "DOMPrompter 的拒审很适合给 Electron / 浏览器类工具做反面清单。2026-04-15，Apple 审核 0.1.0 时发现两个问题：Settings... 点击后没有响应；App 允许不受限制访问互联网，但 Age Rating 没有选择 Unrestricted Web Access。",
        "Apple 原文要点是：When we tapped the Settings... button, your app did not respond。中文翻译就是：审核员点击 Settings... 后，App 没有响应，也没有继续动作。",
        "最终修复进入 0.1.0 (26)：IPC cleanup 不再清掉所有 listeners，只清理 CDP 相关 listener；Settings 和 About 菜单恢复正常；About 正确进入 About tab；App Store Connect 年龄分级改为 Unrestricted Web Access = Yes。"
      ],
      sections: [
        {
          heading: "Apple 原文要点",
          paragraphs: [
            "Guideline 2.1(a)：Settings... 按钮点击后无响应，属于 App Completeness bug。Guideline 2.3.6：App 可访问不受限制的互联网内容，因此 Age Rating 必须选择 Yes for Unrestricted Web Access。",
            "审核设备是 MacBook Pro (14-inch, Nov 2024)，Submission ID 为 77e5d3ce-ba06-4518-8432-e06a91722c5f。完整原信、第一次回复和第二次回复都已归档到上架助手。"
          ],
        },
        {
          heading: "中文翻译",
          paragraphs: [
            "第一条不是抽象的体验建议，而是一个明确 bug：审核员走 macOS 菜单栏路径时，Settings 打不开。对桌面工具来说，菜单栏入口和界面内按钮一样都是正式功能入口。",
            "第二条是元数据准确性问题。DOMPrompter 作为前端/网页辅助工具，会接触网页内容，所以年龄分级要按用户能访问的最高内容风险填写，而不是按开发者主观认为的用途填写。"
          ],
        },
        {
          heading: "我们怎么解决",
          paragraphs: [
            "根因是 cleanup 函数错误移除了所有 IPC listeners，连 Settings / About 菜单所需 listener 一起删掉了。修复后只清理 CDP 相关 listeners，让 Settings、About、快捷键在整个生命周期都保持可用。",
            "第二次回复还补充了 About DOMPrompter 的修复：它不再复用 Settings 的错误 handler，而是打开 Settings panel 并定位到 About tab。ASC 侧则把 Unrestricted Web Access 改为 Yes。"
          ],
        },
        {
          heading: "复用教训",
          paragraphs: [
            "Electron App 提审前不能只点页面按钮，要走完整 macOS 菜单栏：App 名菜单、Settings、About、快捷键、toolbar、窗口重新激活。尤其不要在 cleanup 中粗暴 removeAllListeners。",
            "只要产品能打开任意网页、检查 DOM 或访问用户输入的网址，就要认真处理年龄分级。准确填写不一定降低转化，但能避免被 2.3.6 打回。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("domprompter", [
    {
      slug: "domprompter-frontend-detail",
      title: "01 · 立项：为什么前端微调需要可视化提示词",
      category: "设计系统",
      excerpt: "DOMPrompter 解决的是 AI 改前端时最常见的问题：描述不准、上下文不够、返工太多。",
      tags: ["DOMPrompter", "前端", "立项"],
      order: 1,
      body: [
        "用 AI 做前端，经常不是大功能难，而是细节难：间距差一点、对齐不舒服、某个按钮溢出、移动端某段文字被遮挡。",
        "DOMPrompter 的立项来自这个痛点：让用户直接点选页面元素，把 DOM、样式、截图和修改意图整理成更准确的提示词。"
      ],
      sections: [
        {
          heading: "截图描述容易丢失结构",
          paragraphs: [
            "只给 AI 一张截图，它看得到大概问题，却不知道元素层级、类名、尺寸、状态和约束。DOMPrompter 试图把视觉问题和代码上下文连起来。"
          ],
        },
        {
          heading: "前端微调需要精确对象",
          paragraphs: [
            "用户说“这里不好看”太模糊，AI 也只能猜。点选元素后，提示词可以明确是哪个组件、哪段文字、哪个容器以及预期变化。"
          ],
        },
        {
          heading: "它服务的是 AI 协作效率",
          paragraphs: [
            "DOMPrompter 不替 AI 写所有代码，而是减少沟通损耗。它把人眼发现的问题转成机器能执行的上下文。"
          ],
        },
      ],
    },
    {
      slug: "domprompter-dom-selection",
      title: "02 · 核心体验：从点选元素到结构化上下文",
      category: "架构实现",
      excerpt: "点选只是入口，真正的能力是把元素、样式、层级和页面状态整理成稳定输入。",
      tags: ["DOM", "选择器", "上下文"],
      order: 2,
      body: [
        "DOMPrompter 的核心体验可以分成三步：用户看到问题，点选对应元素，工具生成可交给 Codex 或 Cursor 的上下文。",
        "这要求工具不只是拿一个 CSS selector，还要知道元素周围的布局、父容器、可见文本、样式来源和可能影响范围。"
      ],
      sections: [
        {
          heading: "选择器要稳定而不是漂亮",
          paragraphs: [
            "AI 修改代码时需要能定位组件。一个稳定的 selector、附近文本和组件线索，比单纯的 DOM 路径更有价值。"
          ],
        },
        {
          heading: "上下文不能无限堆",
          paragraphs: [
            "把整页 DOM 都发给 AI 会制造噪音。DOMPrompter 更适合截取目标元素、父级布局和关键样式，让提示词保持可读。"
          ],
        },
        {
          heading: "用户意图要被显式记录",
          paragraphs: [
            "同一个元素可能需要变大、变窄、换颜色、移动位置或修复溢出。工具需要把用户的修改目标和客观 DOM 信息放在一起。"
          ],
        },
      ],
    },
    {
      slug: "domprompter-prompt-contract",
      title: "03 · 提示词合约：把截图描述变成可执行修改",
      category: "AI 工作流",
      excerpt: "好的前端提示词像合约：目标、约束、文件范围、验收标准都要清楚。",
      tags: ["提示词", "验收标准", "Codex"],
      order: 3,
      body: [
        "前端微调最怕提示词只有情绪，没有验收标准。比如“高级一点”“清爽一点”很难直接执行，除非拆成间距、字号、容器宽度、颜色和响应式规则。",
        "DOMPrompter 的提示词合约就是把视觉判断翻译成工程任务：改哪里、不要改哪里、怎么看算通过。"
      ],
      sections: [
        {
          heading: "目标要具体到状态",
          paragraphs: [
            "例如“移动端按钮文字不能换行后挤压图标”“列表卡片高度要统一”“顶部导航在滚动时保持玻璃悬浮”。这些目标比泛泛描述更容易被 AI 执行。"
          ],
        },
        {
          heading: "约束能减少副作用",
          paragraphs: [
            "前端改动常常牵一发而动全身。提示词要写明不要重构数据层、不要改变文案、不要引入新框架，只处理目标区域和相关 CSS。"
          ],
        },
        {
          heading: "验收标准要可检查",
          paragraphs: [
            "能被浏览器检查的标准最好：无横向滚动、控制台无错误、按钮可点击、移动端不溢出、截图与参考风格一致。"
          ],
        },
      ],
    },
    {
      slug: "domprompter-electron-distribution",
      title: "04 · 技术选择：桌面壳、本地截图和跨平台发布",
      category: "架构实现",
      excerpt: "DOMPrompter 更像开发者桌面工具，Electron 能降低浏览器、截图和分发的整合成本。",
      tags: ["Electron", "桌面工具", "发布"],
      order: 4,
      body: [
        "DOMPrompter 的技术选择要围绕“开发者正在调页面”这个场景。它需要读页面、截图、生成提示词、保存上下文，还要尽量不打断用户当前工作流。",
        "桌面壳的优势在于整合能力强：可以承接本地文件、窗口操作、剪贴板、截图和跨平台分发。代价是包体和更新机制需要控制。"
      ],
      sections: [
        {
          heading: "为什么不是纯网页工具",
          paragraphs: [
            "纯网页工具很难自然访问本地开发页面、截图和剪贴板，也不容易和用户的编辑器工作流结合。桌面工具更适合成为前端微调的工作台。"
          ],
        },
        {
          heading: "跨平台不是第一天就全部完美",
          paragraphs: [
            "macOS、Windows、Linux 的窗口、权限和打包体验不同。早期应该先跑通核心体验，再把签名、自动更新和平台适配逐步补齐。"
          ],
        },
        {
          heading: "发布材料也是产品的一部分",
          paragraphs: [
            "开发者工具需要清楚展示它解决什么问题，截图最好显示真实前端微调前后，而不是只放抽象图标。"
          ],
        },
      ],
    },
    {
      slug: "domprompter-design-qa",
      title: "05 · QA 方法：用它反过来打磨个人站",
      category: "设计系统",
      excerpt: "DOMPrompter 可以成为本站自己的设计 QA 工具，把真实问题转成开发任务。",
      tags: ["QA", "个人站", "设计还原"],
      order: 5,
      body: [
        "个人站开发过程中出现过典型问题：顶部空白、蓝线、卡片重复、文章横线、导航对齐、移动端文字溢出。这些都是 DOMPrompter 的适用场景。",
        "产品反过来服务自己的官网，是最好的验证方式。只有自己的项目天天用，才能发现提示词结构、截图范围和验收标准哪里还不够。"
      ],
      sections: [
        {
          heading: "从截图意见变成可复现问题",
          paragraphs: [
            "用户指出“不高级”“不对齐”时，工具需要帮开发者定位具体 DOM：哪个容器宽度不统一，哪个 section 背景范围太大，哪个卡片信息层级混乱。"
          ],
        },
        {
          heading: "设计 QA 要跨桌面和移动端",
          paragraphs: [
            "很多问题只在一个视口出现。DOMPrompter 的提示词应鼓励同时检查桌面、手机宽度、首屏和滚动后的状态。"
          ],
        },
        {
          heading: "把修复记录变成教程素材",
          paragraphs: [
            "每一次前端修复都可以沉淀成教学案例：如何描述问题、如何限制 AI 修改范围、如何用浏览器验证。"
          ],
        },
      ],
    },
    {
      slug: "domprompter-product-boundary",
      title: "06 · 产品边界：工具不替 AI 写代码，只补齐上下文",
      category: "产品复盘",
      excerpt: "DOMPrompter 的定位越清楚，越容易成为 AI 前端工作流里的常用小工具。",
      tags: ["产品边界", "AI 编程", "小工具"],
      order: 6,
      body: [
        "DOMPrompter 的长期风险是做得太大：想做设计系统、页面编辑器、AI IDE、截图标注和代码生成平台。越大越难解释，也越难成为高频工具。",
        "更合理的边界是：它专注把页面问题转成高质量提示词，然后交给用户已经习惯的 AI 编程工具执行。"
      ],
      sections: [
        {
          heading: "小工具要守住一个锋利场景",
          paragraphs: [
            "当用户遇到前端细节问题时，打开 DOMPrompter，点选，生成提示词，粘给 Codex。这条路径越短，产品越有价值。"
          ],
        },
        {
          heading: "不要替代现有 IDE",
          paragraphs: [
            "开发者已经有编辑器、终端和代码审查流程。DOMPrompter 应该融入这些流程，而不是要求用户迁移到一个全新的开发环境。"
          ],
        },
        {
          heading: "推广时讲场景，不讲概念",
          paragraphs: [
            "相比“AI 前端提示词平台”，更容易传播的是“点一下页面元素，让 Codex 精准改这块”。具体场景比抽象定位更有记忆点。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("glotshot", [
    {
      slug: "glotshot-app-review-two-rounds",
      title: "07 · 审核复盘：从元数据到导出路径的两轮拒审",
      category: "App Store",
      excerpt: "GlotShot 早期两轮拒审覆盖 Apple 商标、Google Play 元数据、Support URL、启动白屏和沙盒导出路径。",
      tags: ["App Review", "MAS", "元数据"],
      order: 7,
      body: [
        "GlotShot 的早期审核经历很像独立开发者第一次做 Mac App Store 产品时的集中补课。2026-01-20，0.0.2 被四项问题打回：Apple 商标/术语、Google Play 元数据、启动白屏、Support URL 不合格。",
        "第一轮修完后，0.0.4 又在 2026-01-23 被 Guideline 2.1 打回：App does not export the screenshots，File path is broken in the export message。中文翻译就是：App 无法导出截图，导出消息里的文件路径损坏。",
        "最终 0.0.7 修复后通过。这个案例的价值不是证明 GlotShot 多坎坷，而是把 MAS 上架最容易漏的几类问题放在同一页：元数据、支持页、启动、沙盒导出、localhost 权限。"
      ],
      sections: [
        {
          heading: "第一轮原文要点",
          paragraphs: [
            "Guideline 5.2.5：metadata 里不当使用 App Store 相关术语，可能造成 Apple 产品或服务混淆。Guideline 2.3.10：描述包含 Google Play 等第三方平台引用，对 App Store 用户不相关。",
            "Guideline 2.1：App 启动后显示空白页。Guideline 1.5：Support URL 指向 GitHub Issues，不是用户可用的支持信息网页。完整原文已归档到上架助手。"
          ],
        },
        {
          heading: "第二轮原文要点与翻译",
          paragraphs: [
            "Apple 原文要点：App does not export the screenshots；File path is broken in the export message。中文翻译：App 不能导出截图，导出提示里的文件路径是坏的。",
            "这个问题比元数据更接近真实功能。素材工具的核心就是导出，如果审核员在沙盒环境下导不出来，产品再会做海报也不算完整。"
          ],
        },
        {
          heading: "我们怎么解决",
          paragraphs: [
            "第一轮修复包括：副标题移除不合适的 App Store / Apple 术语，描述和 Promotional Text 删除 Google Play / Android 等第三方平台引用，Support URL 改为专门支持页，修复初始化白屏。",
            "第二轮修复进入 0.0.7：对用户生成的 scene name 做文件名清理，避免斜杠等特殊字符生成非法路径；验证 user-selected read-write entitlement；补 network client entitlement，允许 App 在沙盒中访问本地 Ollama / localhost。"
          ],
        },
        {
          heading: "复用教训",
          paragraphs: [
            "App Store 元数据不是 README，不能把跨平台表达原样搬过去。Mac App Store 用户看的是这个 App 在 Apple 平台上的体验，所以第三方平台语境要克制。",
            "沙盒导出一定要做脏数据测试：非法字符、中文/日文文件名、空文件名、超长路径、用户选择目录、取消导出、权限不足。素材工具最怕的不是功能少，而是关键出口在审核设备上断掉。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("glotshot", [
    {
      slug: "glotshot-store-assets",
      title: "01 · 立项：为什么 App Store 截图值得产品化",
      category: "App Store",
      excerpt: "GlotShot 的起点是一个独立开发者反复遇到的问题：每个 App 都要重新做商店素材。",
      tags: ["GlotShot", "App Store", "立项"],
      order: 1,
      body: [
        "App 做完以后，真正拖慢发布节奏的常常不是代码，而是截图、文案、尺寸、多语言和不同商店的素材要求。",
        "GlotShot 把这个重复工作产品化：让开发者把应用截图、设备框、标题文案和导出规格放进一个可复用流程里。"
      ],
      sections: [
        {
          heading: "素材是发布流程的一部分",
          paragraphs: [
            "独立开发者很容易低估商店素材的重要性。用户在 App Store 里先看到截图，再决定要不要点进详情页。截图不是装修，而是转化入口。"
          ],
        },
        {
          heading: "矩阵产品需要统一生产线",
          paragraphs: [
            "当产品从一个变成十几个，每个产品都单独做截图就会变成运营债务。GlotShot 的价值是把尺寸、风格和导出动作标准化。"
          ],
        },
        {
          heading: "课程价值来自反复使用",
          paragraphs: [
            "它可以作为 App Store 上架课程里的核心工具：从截图构图、设备框选择、多语言文案，到最终导出和上传，形成完整素材课。"
          ],
        },
      ],
    },
    {
      slug: "glotshot-poster-icon-modes",
      title: "02 · 核心模式：Poster 和 Icon 双生产线",
      category: "设计系统",
      excerpt: "截图和图标是两类素材，应该用不同画布逻辑和验收标准处理。",
      tags: ["Poster", "Icon", "设计系统"],
      order: 2,
      body: [
        "商店截图更像海报，需要叙事、设备框、卖点标题和视觉层级；图标更像品牌识别，需要在小尺寸下仍然可辨认。",
        "GlotShot 把 Poster 和 Icon 分开，是为了避免用同一种编辑逻辑解决两类不同问题。"
      ],
      sections: [
        {
          heading: "Poster 模式服务转化",
          paragraphs: [
            "Poster 要回答用户为什么下载：解决什么痛点、适合什么场景、核心功能是什么。视觉上要保证标题清楚、截图可信、画面不乱。"
          ],
        },
        {
          heading: "Icon 模式服务识别",
          paragraphs: [
            "图标需要在桌面、小图、搜索结果和深浅色背景中都能识别。它的重点不是信息量，而是形状、对比度和记忆点。"
          ],
        },
        {
          heading: "分模式能降低复杂度",
          paragraphs: [
            "把两条生产线分开后，用户不必在一个巨大界面里找所有功能。每个模式只保留对应素材必须的控制项。"
          ],
        },
      ],
    },
    {
      slug: "glotshot-device-frames",
      title: "03 · 设计系统：设备框、画布比例和批量导出",
      category: "设计系统",
      excerpt: "商店素材的难点在于规格多、比例多、设备多，必须用规则约束设计自由度。",
      tags: ["设备框", "批量导出", "规格"],
      order: 3,
      body: [
        "一个截图设计在 6.7 英寸、6.5 英寸、iPad、Mac 预览图里可能完全不同。GlotShot 需要把比例、留白、标题位置和设备框抽象成可复用规则。",
        "设计系统的目的不是限制创意，而是让批量导出时仍然保持专业感。"
      ],
      sections: [
        {
          heading: "设备框要增强真实感",
          paragraphs: [
            "用户需要看到产品真实界面，而不是抽象装饰。设备框应该帮助用户理解这是 iPhone、Mac 还是浏览器工具，而不是喧宾夺主。"
          ],
        },
        {
          heading: "画布规则防止临时拼图",
          paragraphs: [
            "当素材需要多语言、多尺寸导出时，临时拖拽很快失控。固定的边距、字号层级和安全区域能显著减少返工。"
          ],
        },
        {
          heading: "批量导出要保留人工检查",
          paragraphs: [
            "自动生成之后仍然需要预览检查，尤其是长语言、阿拉伯语等方向差异和小屏裁切。工具负责效率，人负责最终质量。"
          ],
        },
      ],
    },
    {
      slug: "glotshot-localization-copy",
      title: "04 · 本地化：截图文案比界面翻译更早影响转化",
      category: "App Store",
      excerpt: "用户看到的第一句本地化文案往往不在 App 里，而在商店截图上。",
      tags: ["本地化", "文案", "转化"],
      order: 4,
      body: [
        "做多语言 App 时，很多人先翻译界面，最后才处理截图。实际上新用户可能还没下载 App，就已经通过截图标题判断这个产品是否理解自己。",
        "GlotShot 的本地化能力应该把商店文案当成第一层产品体验，而不是最后一步美化。"
      ],
      sections: [
        {
          heading: "截图标题要讲当地用户听得懂的话",
          paragraphs: [
            "直译经常会让截图显得生硬。更好的方式是保留卖点含义，按目标市场的表达习惯重写。"
          ],
        },
        {
          heading: "不同语言会改变排版",
          paragraphs: [
            "德语、法语、西语可能更长，中文更短，阿拉伯语和希伯来语还涉及方向。设计系统必须预留弹性，不然本地化会破坏布局。"
          ],
        },
        {
          heading: "本地化素材可以反向服务课程",
          paragraphs: [
            "每个 App 的多语言截图过程都能拆成教程：如何定卖点、如何生成文案、如何检查长度、如何上传商店。"
          ],
        },
      ],
    },
    {
      slug: "glotshot-release-pipeline",
      title: "05 · 发布流水线：一个工具服务整个 App 矩阵",
      category: "AI 工作流",
      excerpt: "GlotShot 的真正价值会在第二个、第三个、第五个 App 发布时显现。",
      tags: ["发布流程", "矩阵", "效率"],
      order: 5,
      body: [
        "如果只做一个 App，手工做截图也能忍。但当产品矩阵扩大，素材制作、命名、导出和归档就会变成稳定瓶颈。",
        "GlotShot 把这部分变成生产线，可以和 Packpour、个人站、App Store Connect 上架流程连在一起。"
      ],
      sections: [
        {
          heading: "素材命名也要标准化",
          paragraphs: [
            "多语言、多尺寸、多平台素材如果没有命名规则，很快会混乱。工具应该帮助用户按产品、语言、设备和版本管理导出结果。"
          ],
        },
        {
          heading: "截图生产和页面生产要互相复用",
          paragraphs: [
            "App Store 截图里的卖点，也可以进入官网产品页、社交图文、视频封面和开发日记。一次整理，多处复用。"
          ],
        },
        {
          heading: "矩阵工具会变成护城河",
          paragraphs: [
            "独立开发者的优势不只是写代码快，而是每发布一个产品，都会把下一次发布的工具链补强。GlotShot 就是这种基础设施。"
          ],
        },
      ],
    },
    {
      slug: "glotshot-app-store-lessons",
      title: "06 · 上架复盘：素材、截图和审核页如何闭环",
      category: "App Store",
      excerpt: "截图不是孤立文件，它要和产品页、隐私政策、支持页和审核说明互相一致。",
      tags: ["上架", "审核", "闭环"],
      order: 6,
      body: [
        "App Store 审核和用户转化都要求一致性。截图说有本地优先，隐私页就要解释本地数据；截图说有某个功能，产品页和 App 内也要能找到。",
        "GlotShot 的上架复盘价值在于把素材制作放进完整发布闭环，而不是只停在图片生成。"
      ],
      sections: [
        {
          heading: "素材承诺必须可验证",
          paragraphs: [
            "截图上的每个卖点都应该能在 App 里找到对应功能。夸张的营销词会增加审核和差评风险。"
          ],
        },
        {
          heading: "隐私和支持页一起维护",
          paragraphs: [
            "当截图强调无账号、无追踪、本地处理时，个人站上的隐私政策和支持页也应该使用一致表达。"
          ],
        },
        {
          heading: "复盘能变成教程资产",
          paragraphs: [
            "每次上架后记录素材怎么做、哪里被驳回、哪些文案有效，就能沉淀成面向独立开发者的课程章节。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("trekreel", [
    {
      slug: "trekreel-iap-promotional-image-review",
      title: "07 · 审核复盘：IAP 促销图不能误传付费墙截图",
      category: "App Store",
      excerpt: "TrekReel 1.0.4 曾因把 App 内付费墙截图上传到 IAP Promotional Image，被 Guideline 2.3.2 打回。",
      tags: ["App Review", "IAP", "元数据"],
      order: 7,
      body: [
        "TrekReel 的一次拒审不是代码问题，而是 App Store Connect 字段理解问题。2026-04-01，Apple 按 Guideline 2.3.2 打回 1.0.4，原因是 IAP Promotional Image 使用了 App 内截图。",
        "Apple 原文要点是：Your promotional image is a screenshot taken from the app。中文翻译就是：你的促销图是一张从 App 内截取的截图。",
        "根因很朴素：我们把内部付费墙截图误上传到可选 Promotional Image，而不是只放在 Review Information 里。最后选择不公开推广这个 IAP，从 ASC 清除 Promotional Image，回复说明后继续审核。"
      ],
      sections: [
        {
          heading: "Apple 原文要点",
          paragraphs: [
            "Guideline 2.3.2 - Accurate Metadata：Apple 认为要展示在 App Store 上的 promotional image 没有充分代表对应的 promoted In-App Purchase 或 win-back offer。",
            "具体问题是促销图来自 App 内截图。审核设备是 MacBook Air (15-inch, M3, 2024)，Submission ID 为 7d6cfa98-ca9f-4d92-9bda-aa078e2a70ed。"
          ],
        },
        {
          heading: "中文翻译",
          paragraphs: [
            "Apple 不是说 IAP 不能有截图，也不是说付费墙不能给审核员看。它指出的是 Promotional Image 这个公开促销槽位不应该随便用 App 内截图充当。",
            "Review Screenshot 是给审核员验证购买流程；Promotional Image 是给 App Store 产品页公开展示 IAP。两个字段看起来都和图片有关，但用途完全不同。"
          ],
        },
        {
          heading: "我们怎么解决",
          paragraphs: [
            "回复里直接承认是我们理解错字段：把内部 paywall screenshot 放进了 optional Promotional Image，而它本来只应该留在 Review Information。",
            "因为当时不计划在 App Store 产品页直接推广该 IAP，所以最稳的修复不是重新设计促销图，而是完全移除 Promotional Image 元数据，请 Apple 继续审核 App 更新。"
          ],
        },
        {
          heading: "复用教训",
          paragraphs: [
            "IAP 上架资料要分三个层级：App 内真实购买路径、给审核员的 Review Screenshot、给用户看的 Promotional Image。不要因为都叫截图就混在一起。",
            "如果产品还没准备好公开推广某个 IAP，宁可不填 Promotional Image。少填一个可选促销位，比上传错误素材后被 Accurate Metadata 打回更稳。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("codex-quota-calendar", [
    {
      slug: "codex-office-automation",
      title: "01 · 立项：为什么 quota 管理是 Codex 办公第一课",
      category: "Codex 办公",
      excerpt: "Codex Quota Calendar 把一个高频个人痛点做成菜单栏工具，也成为办公自动化课程入口。",
      tags: ["Codex", "Quota", "立项"],
      order: 1,
      body: [
        "重度使用 Codex 时，quota 不是抽象概念，而是每天工作的节奏表。什么时候会重置、还能用多少、今天是否应该节制，都会影响任务安排。",
        "Codex Quota Calendar 从这个很小的痛点出发：把隐藏在命令行和账号状态里的额度，变成菜单栏里一眼能看懂的日历。"
      ],
      sections: [
        {
          heading: "办公自动化从个人痛点开始",
          paragraphs: [
            "真正值得做的小工具往往来自反复出现的个人摩擦。quota 管理不是大平台功能，但对重度用户来说足够高频。"
          ],
        },
        {
          heading: "菜单栏适合低打扰状态",
          paragraphs: [
            "额度信息需要随时看，但不应该占用一个大窗口。菜单栏进度、日历和摘要能满足快速判断。"
          ],
        },
        {
          heading: "课程可以从这里切入 Codex 工作流",
          paragraphs: [
            "这个项目能自然讲到本地文件读取、时间窗口计算、macOS 菜单栏、签名公证和 DMG 发布，是办公落地的好开篇。"
          ],
        },
      ],
    },
    {
      slug: "codex-quota-model",
      title: "02 · 数据模型：把 5 小时窗口和周额度变成日历",
      category: "架构实现",
      excerpt: "看似简单的 quota，其实包含滚动窗口、周额度、历史记录和预测耗尽。",
      tags: ["数据模型", "日历", "预测"],
      order: 2,
      body: [
        "Quota Calendar 的难点不在 UI，而在把额度规则转成用户能理解的状态：当前窗口、周剩余、历史消耗和预计用完时间。",
        "这些信息如果只用数字展示，用户仍然难以决策；转成日历和进度环后，才更接近日常安排。"
      ],
      sections: [
        {
          heading: "时间窗口要清楚表达",
          paragraphs: [
            "滚动窗口和自然日不同，容易让用户误解。工具需要把当前窗口剩余时间、下一次可用时间和周节奏分开显示。"
          ],
        },
        {
          heading: "历史记录服务预测",
          paragraphs: [
            "只显示当前额度不够。记录每日使用节奏后，用户可以判断自己是提前消耗太快，还是还有余量做大任务。"
          ],
        },
        {
          heading: "模型要能容忍规则变化",
          paragraphs: [
            "外部服务规则可能变化。数据模型应该尽量把规则参数化，避免每次调整都重写 UI。"
          ],
        },
      ],
    },
    {
      slug: "codex-quota-menu-bar",
      title: "03 · macOS 体验：菜单栏工具为什么要轻",
      category: "设计系统",
      excerpt: "菜单栏工具的美感来自克制：打开快、状态清、退出顺，不打断工作。",
      tags: ["macOS", "菜单栏", "SwiftUI"],
      order: 3,
      body: [
        "菜单栏应用不是缩小版桌面软件，它应该像一个仪表盘：平时安静，打开时立刻给答案。",
        "Codex Quota Calendar 的界面要避免复杂设置页和过度动画，重点是把额度、周期和风险提示做清楚。"
      ],
      sections: [
        {
          heading: "第一眼要回答还能不能用",
          paragraphs: [
            "用户点开菜单栏时，最想知道的是当前是否安全、今天还能做多少、是否需要等重置。其它细节都应该排在后面。"
          ],
        },
        {
          heading: "桌面工具要尊重系统习惯",
          paragraphs: [
            "菜单栏图标、弹窗宽度、深浅色、退出方式和设置入口都要符合 macOS 用户预期。越像系统工具，越容易长期留在菜单栏。"
          ],
        },
        {
          heading: "轻工具也需要完整发布",
          paragraphs: [
            "哪怕只是菜单栏小工具，也要处理签名、公证、更新说明、隐私描述和下载页面。小产品不等于草率发布。"
          ],
        },
      ],
    },
    {
      slug: "codex-quota-local-privacy",
      title: "04 · 隐私边界：本地读取、本地保存、不上传",
      category: "App Store",
      excerpt: "Quota 工具处理的是开发者账号相关状态，因此隐私边界必须非常清楚。",
      tags: ["隐私", "本地优先", "安全"],
      order: 4,
      body: [
        "Codex Quota Calendar 的可信度来自本地优先。它不应该把用户的认证信息、历史记录或工作节奏上传到自有服务器。",
        "公开表达时也要避免说得含糊：读取什么、保存什么、不保存什么、不上传什么，都应该直接写清楚。"
      ],
      sections: [
        {
          heading: "本地读取需要最小化",
          paragraphs: [
            "工具只应该读取实现 quota 展示所需的信息，不扩展到无关文件和目录。权限越小，用户越容易信任。"
          ],
        },
        {
          heading: "历史数据属于用户",
          paragraphs: [
            "使用历史可以帮助预测，但它也反映用户工作习惯。默认保存在本地，并提供清理方式，是更合适的设计。"
          ],
        },
        {
          heading: "隐私页和产品页要一致",
          paragraphs: [
            "如果产品页强调 local-only，隐私政策就要用同样的边界说明。营销承诺和法律页面不能分裂。"
          ],
        },
      ],
    },
    {
      slug: "codex-quota-dmg-release",
      title: "05 · 发布：签名、公证和 DMG 分发",
      category: "App Store",
      excerpt: "不进 App Store 的 macOS 工具，也需要认真处理签名、公证和下载信任。",
      tags: ["DMG", "签名", "公证"],
      order: 5,
      body: [
        "很多独立 macOS 工具会选择 DMG 分发，但这不代表可以跳过安全链路。用户下载后能否顺利打开，取决于签名、公证和 Gatekeeper 体验。",
        "Codex Quota Calendar 的发布过程能成为一个完整教程：如何从本地构建走到可下载、可验证、可安装。"
      ],
      sections: [
        {
          heading: "Developer ID 是信任入口",
          paragraphs: [
            "签名不是形式，它告诉系统这个应用来自明确开发者。对工具类产品来说，这一步直接影响用户是否敢安装。"
          ],
        },
        {
          heading: "DMG 也需要体验设计",
          paragraphs: [
            "下载页、文件名、版本号、安装说明和校验信息都会影响专业感。小工具也应该有清楚的 release note。"
          ],
        },
        {
          heading: "发布流程可以被复用",
          paragraphs: [
            "一旦跑通签名和公证，后续 macOS 工具都可以复用这条流程，形成产品矩阵的基础设施。"
          ],
        },
      ],
    },
    {
      slug: "codex-quota-course-hook",
      title: "06 · 教程价值：从个人痛点到办公自动化案例",
      category: "Codex 办公",
      excerpt: "这个项目说明：AI 编程课程不必从宏大系统开始，小工具也能讲完整闭环。",
      tags: ["教程", "办公自动化", "复盘"],
      order: 6,
      body: [
        "Codex Quota Calendar 最适合作为课程开篇，因为它小、清楚、真实，而且能完整覆盖需求、实现、发布和复盘。",
        "它证明 AI 编程不是只做网页 demo，也可以解决每天工作里的小摩擦。只要问题足够具体，就能变成可讲、可卖、可复用的案例。"
      ],
      sections: [
        {
          heading: "课程从真实问题开始更有说服力",
          paragraphs: [
            "学生最容易理解的是“我也遇到过”。quota 管理就是这种真实场景：使用 AI 工具越多，越能感受到它的重要性。"
          ],
        },
        {
          heading: "小项目也能讲工程纪律",
          paragraphs: [
            "本地数据、菜单栏 UI、错误状态、隐私说明、DMG 发布、版本更新，这些都是专业软件开发的一部分。"
          ],
        },
        {
          heading: "它连接到更大的办公自动化路线",
          paragraphs: [
            "从 quota 日历出发，可以继续扩展到文件批处理、报告生成、App Store 自动化、浏览器控制和个人知识库，逐步形成课程矩阵。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("trekreel", [
    {
      slug: "trekreel-map-story",
      title: "01 · 立项：为什么把 GPX / KML 做成 3D 地图故事",
      category: "产品复盘",
      excerpt: "TrekReel 把户外轨迹从数据文件变成可分享的路线故事。",
      tags: ["TrekReel", "GPX", "立项"],
      order: 1,
      body: [
        "跑步、骑行、徒步和旅行都会留下轨迹文件，但 GPX / KML 对普通观众来说太冷。真正能传播的是路线故事：从哪里出发、经过哪里、爬升多少、画面怎么运动。",
        "TrekReel 的立项就是把轨迹文件转成电影感 3D 地图，让创作者不用从零学习复杂视频软件。"
      ],
      sections: [
        {
          heading: "数据文件不是最终内容",
          paragraphs: [
            "GPX 和 KML 适合记录，但不适合传播。产品要把经纬度、高度和时间线翻译成观众能看懂的视觉叙事。"
          ],
        },
        {
          heading: "创作者需要的是快速成片",
          paragraphs: [
            "户外用户可能不想调一堆 3D 参数，他们更希望导入轨迹、选择风格、预览路线、导出视频。产品应该把复杂度藏到合理默认值里。"
          ],
        },
        {
          heading: "它和个人矩阵天然结合",
          paragraphs: [
            "TrekReel 可以服务短视频、旅行博客、社交平台和课程案例。一个技术产品同时也是内容生产工具。"
          ],
        },
      ],
    },
    {
      slug: "trekreel-route-parser",
      title: "02 · 数据入口：轨迹文件、海拔和时间线",
      category: "架构实现",
      excerpt: "地图故事的质量首先取决于轨迹数据是否被正确解析和清洗。",
      tags: ["轨迹解析", "KML", "海拔"],
      order: 2,
      body: [
        "TrekReel 的第一层工程问题是数据入口。GPX、KML、不同设备导出的字段可能并不统一，缺失高度、异常点和时间间隔都很常见。",
        "如果解析层不稳，后面的 3D 画面再漂亮也会出现路线跳跃、速度异常和镜头抖动。"
      ],
      sections: [
        {
          heading: "轨迹清洗是视觉体验的基础",
          paragraphs: [
            "GPS 漂移、重复点、长时间停留和异常海拔都需要处理。清洗不是为了修改事实，而是让路线动画更接近人的观感。"
          ],
        },
        {
          heading: "时间线决定叙事节奏",
          paragraphs: [
            "同一条路线可以是慢速回顾，也可以是快节奏短视频。解析层要保留足够信息，给后面的镜头和导出提供选择。"
          ],
        },
        {
          heading: "错误提示要面向创作者",
          paragraphs: [
            "当文件无法解析时，提示不能只写 technical error。用户需要知道是格式不支持、文件损坏，还是缺少关键轨迹点。"
          ],
        },
      ],
    },
    {
      slug: "trekreel-3d-rendering",
      title: "03 · 视觉核心：地图、相机和路线动画",
      category: "设计系统",
      excerpt: "3D 地图工具的难点不是画出路线，而是让相机、节奏和信息层级舒服。",
      tags: ["3D", "相机", "动画"],
      order: 3,
      body: [
        "地图路线动画很容易做成技术演示：一条线在地图上跑完。但真正的视频感来自相机运动、路线高亮、地形关系和文字信息的节奏。",
        "TrekReel 要把地图可视化和视频叙事结合，既要准确，也要好看。"
      ],
      sections: [
        {
          heading: "相机决定故事视角",
          paragraphs: [
            "俯视、跟随、倾斜和拉远会传达不同感觉。默认镜头应该适合大多数路线，同时允许用户微调。"
          ],
        },
        {
          heading: "信息不要遮住路线",
          paragraphs: [
            "速度、距离、海拔、地点名都可能有用，但过多叠加会让画面变脏。好的默认模板应该只显示最必要的信息。"
          ],
        },
        {
          heading: "性能和画质要平衡",
          paragraphs: [
            "地图、线条、标注和动画同时存在时，性能会影响预览体验。工具要保证预览流畅，再考虑最终导出质量。"
          ],
        },
      ],
    },
    {
      slug: "trekreel-video-export",
      title: "04 · 创作者工具：从路线预览到视频素材",
      category: "AI 工作流",
      excerpt: "TrekReel 的终点不是地图预览，而是可发布、可剪辑、可复用的视频素材。",
      tags: ["视频导出", "创作者", "素材"],
      order: 4,
      body: [
        "创作者工具必须考虑导出结果。用户不是为了看一个编辑器窗口，而是为了把路线放进短视频、旅行复盘、赛事回顾或社交内容里。",
        "因此 TrekReel 的导出流程要让尺寸、比例、时长和画质可控，同时保持足够简单。"
      ],
      sections: [
        {
          heading: "预览和导出要一致",
          paragraphs: [
            "如果预览效果和导出结果差异太大，用户会失去信任。路线位置、文字、动画节奏和裁切范围都需要尽量一致。"
          ],
        },
        {
          heading: "社交平台决定输出规格",
          paragraphs: [
            "横屏、竖屏、方形、短视频封面都会影响构图。产品最好提前提供常用比例，而不是让用户自己记尺寸。"
          ],
        },
        {
          heading: "导出失败要能恢复",
          paragraphs: [
            "视频导出耗时更长，更容易遇到中断。工具需要保存项目状态，让用户可以重新导出，而不是重新配置路线。"
          ],
        },
      ],
    },
    {
      slug: "trekreel-cross-platform-release",
      title: "05 · 发布工程：DMG、EXE 和商店版本",
      category: "App Store",
      excerpt: "桌面创作者工具要面对不同平台的安装信任、包体和更新问题。",
      tags: ["发布", "桌面应用", "跨平台"],
      order: 5,
      body: [
        "TrekReel 这类桌面工具天然会遇到平台选择：Mac 用户可以走 App Store 或 DMG，Windows 用户需要 EXE 或安装包，官网还要承接下载和说明。",
        "发布工程不是最后打包一下，而是从产品定位阶段就会影响架构、素材和支持文档。"
      ],
      sections: [
        {
          heading: "不同渠道有不同信任成本",
          paragraphs: [
            "App Store 提供分发信任，但审核和沙盒限制更多；独立下载更灵活，但用户需要相信开发者。产品页和签名就更重要。"
          ],
        },
        {
          heading: "包体和依赖要控制",
          paragraphs: [
            "地图、3D、视频导出相关依赖可能让包体快速变大。创作者工具需要在能力和下载体验之间取舍。"
          ],
        },
        {
          heading: "支持页要覆盖文件问题",
          paragraphs: [
            "用户最常见问题会围绕导入失败、导出失败、地图显示异常和格式不支持。产品页应该提前准备这些支持入口。"
          ],
        },
      ],
    },
    {
      slug: "trekreel-positioning",
      title: "06 · 推广复盘：户外、跑步和旅行故事的表达",
      category: "产品复盘",
      excerpt: "TrekReel 的传播重点不是技术，而是让用户看到自己的路线也能被讲成故事。",
      tags: ["推广", "户外", "创作者"],
      order: 6,
      body: [
        "TrekReel 的技术卖点很多，但推广时最应该展示的是结果：一条普通路线如何变成有镜头感的故事。",
        "它适合用短视频传播，因为产品输出本身就是视频素材。每条示例路线都能同时成为产品 demo 和内容。"
      ],
      sections: [
        {
          heading: "用真实路线展示价值",
          paragraphs: [
            "相比功能列表，真实徒步、骑行、跑步路线更能让用户想象自己的使用场景。推广素材应该多展示成片而不是编辑器。"
          ],
        },
        {
          heading: "垂直人群比泛地图更清晰",
          paragraphs: [
            "跑步、骑行、徒步、旅行 vlog 的语言不同。早期可以选一个人群做深，而不是把产品说成所有地图数据都能用。"
          ],
        },
        {
          heading: "开发日志能连接技术和故事",
          paragraphs: [
            "路线解析、相机设计、导出优化这些技术内容，可以被写成创作者看得懂的开发日记，帮助产品建立专业感。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("mood-button", [
    {
      slug: "mood-button-local-voice",
      title: "01 · 立项：为什么用语音做情绪日记入口",
      category: "产品复盘",
      excerpt: "Mood Button 的核心是把记录情绪这件事压缩到一个足够低门槛的动作。",
      tags: ["Mood Button", "语音", "立项"],
      order: 1,
      body: [
        "情绪日记最大的问题不是用户不知道它有用，而是难以开始。打开应用、选模板、写长段文字，对低能量状态的人来说已经太重。",
        "Mood Button 的立项把入口压到最小：按一下，说一句，让本地 AI 帮用户整理成可回看的日记。"
      ],
      sections: [
        {
          heading: "低门槛比功能完整更重要",
          paragraphs: [
            "情绪记录场景里，用户经常没有耐心填写复杂表单。一个按钮、一次录音、一个简短反馈，比完整但沉重的心理工具更容易坚持。"
          ],
        },
        {
          heading: "语音更接近真实状态",
          paragraphs: [
            "人在情绪波动时，用文字整理很难。语音允许用户先把状态说出来，之后再由工具转成结构化记录。"
          ],
        },
        {
          heading: "产品不是治疗工具",
          paragraphs: [
            "Mood Button 要清楚表达自己是记录和自我复盘工具，不替代专业医疗或心理服务。这个边界对产品安全、审核和用户信任都很重要。"
          ],
        },
      ],
    },
    {
      slug: "mood-button-privacy-boundary",
      title: "02 · 产品边界：情绪数据必须先保护",
      category: "App Store",
      excerpt: "情绪、语音和日记都属于高敏感内容，产品表达必须先讲隐私。",
      tags: ["隐私", "情绪数据", "安全"],
      order: 2,
      body: [
        "Mood Button 处理的是用户非常私密的状态：语音、情绪、日记、可能还有地点和时间语境。这个产品如果不能先讲清隐私，就不应该谈智能。",
        "本地优先和最小化采集不是宣传点，而是情绪产品的底线。"
      ],
      sections: [
        {
          heading: "默认本地是信任基础",
          paragraphs: [
            "能在设备上完成的录音处理、转写和总结，就不应该默认上传。用户要能理解哪些内容留在本机，哪些功能需要外部服务。"
          ],
        },
        {
          heading: "敏感内容要避免过度承诺",
          paragraphs: [
            "产品不能承诺诊断、治疗或危机干预。更稳妥的表达是帮助用户记录、命名和回看自己的状态。"
          ],
        },
        {
          heading: "隐私标签要跟功能同步",
          paragraphs: [
            "如果后续加入云同步、账号或订阅，隐私政策和 App Store 隐私标签也必须同步更新。情绪产品不能靠模糊表达过审。"
          ],
        },
      ],
    },
    {
      slug: "mood-button-mlx-qwen",
      title: "03 · 本地 AI：MLX 与 Qwen3 的可用性验证",
      category: "架构实现",
      excerpt: "本地模型的价值不只是省钱，更是让私密场景有了可接受的智能入口。",
      tags: ["MLX", "Qwen3", "本地 AI"],
      order: 3,
      body: [
        "Mood Button 选择探索 Apple MLX 和轻量模型，是因为情绪日记天然适合本地推理。用户说出的内容不一定长，但非常敏感。",
        "技术验证的重点不是跑分，而是能否在设备上以可接受速度完成转写后整理、情绪摘要和多语言表达。"
      ],
      sections: [
        {
          heading: "本地模型要服务体验",
          paragraphs: [
            "如果本地推理太慢、太耗电或效果不稳定，用户会放弃。产品需要根据设备能力调整模型和任务范围。"
          ],
        },
        {
          heading: "小模型适合做结构化辅助",
          paragraphs: [
            "情绪日记不一定需要复杂推理。把一句话整理成标题、情绪标签和简短复盘，是小模型更适合承担的任务。"
          ],
        },
        {
          heading: "AI 输出要保持温和",
          paragraphs: [
            "情绪场景里，模型回复不能像评价或诊断。语气应该克制、支持性强，并提醒用户在严重情况寻求专业帮助。"
          ],
        },
      ],
    },
    {
      slug: "mood-button-voice-to-diary",
      title: "04 · 核心流程：从录音到多语日记",
      category: "AI 工作流",
      excerpt: "语音日记的闭环包含录音、转写、摘要、标签、保存和回看。",
      tags: ["语音转写", "日记", "多语言"],
      order: 4,
      body: [
        "Mood Button 的核心流程不是单纯录音，也不是单纯聊天。它要把一次口头表达变成之后能回看的日记条目。",
        "这个流程需要在足够短的时间内完成：用户说完后，马上得到一个温和、可编辑、可保存的记录。"
      ],
      sections: [
        {
          heading: "录音入口要稳定",
          paragraphs: [
            "录音状态、权限、失败重试和中断恢复都要清楚。用户在情绪场景里不应该被复杂错误信息打断。"
          ],
        },
        {
          heading: "日记要允许编辑",
          paragraphs: [
            "AI 整理出来的内容只是草稿。用户必须能修改标题、正文和标签，确保最终记录符合自己的真实感受。"
          ],
        },
        {
          heading: "多语言服务真实生活",
          paragraphs: [
            "有些用户会混用中文、英文或其他语言表达情绪。产品不应该强迫一种语言，而要尽量保留原意和语气。"
          ],
        },
      ],
    },
    {
      slug: "mood-button-ui-simplification",
      title: "05 · UI 收口：把复杂心理产品压成一个按钮",
      category: "设计系统",
      excerpt: "情绪产品越敏感，界面越应该克制、温和、少打扰。",
      tags: ["UI", "情绪产品", "克制设计"],
      order: 5,
      body: [
        "Mood Button 的 UI 最大挑战是不要把产品做成焦虑仪表盘。情绪记录不需要一堆复杂图表和评分压力，至少首版不需要。",
        "一个明确按钮、温和颜色、清楚记录列表和可回看的日记，比过度设计更符合场景。"
      ],
      sections: [
        {
          heading: "按钮是心理门槛的设计",
          paragraphs: [
            "“按一下开始”比“创建一篇新日记”更轻。按钮文案、状态变化和反馈声音都会影响用户是否愿意再次使用。"
          ],
        },
        {
          heading: "统计不要过早出现",
          paragraphs: [
            "情绪趋势图可能有价值，但也可能制造压力。早期更适合先做好记录和回看，再考虑长期统计。"
          ],
        },
        {
          heading: "空状态要给安全感",
          paragraphs: [
            "第一次打开时，用户需要知道内容在自己设备上、可以随时删除、不会被公开。安全感比功能介绍更重要。"
          ],
        },
      ],
    },
    {
      slug: "mood-button-app-review-lessons",
      title: "06 · 审核复盘：真实拒审、回应和重新提交",
      category: "App Store",
      excerpt: "Mood Button 被 Apple 拒回后，问题集中在 iPad UI、AI 隐私说明和 IAP 入口可见性。",
      tags: ["审核", "拒审复盘", "AI 隐私"],
      order: 6,
      body: [
        "Mood Button 的第一次审核不是顺利通过。2026-06-17，Apple 在 App Store Connect 里拒回了 iOS 1.0，审核设备是 iPad Air 11-inch (M3)，问题集中在三个方向：Guideline 4.0、Guidelines 5.1.1(i) / 5.1.2(i)、Guideline 2.1(b)。",
        "这封拒审信很适合变成课程案例，因为它不是“苹果刁难”，而是把 AI 产品最容易含糊的地方全部点出来了：界面在 iPad 上是否真的可用，用户数据有没有给第三方 AI，内购入口审核员能不能按步骤找到。"
      ],
      sections: [
        {
          heading: "4.0：iPad 上菜单栏不可见",
          paragraphs: [
            "Apple 指出 iPad Air 11-inch (M3) 上有界面显示问题，尤其是菜单栏不可见。这个问题说明，哪怕产品主场景是 iPhone，只要包体允许下载到 iPad，就必须按 iPad 真实尺寸、方向和安全区域检查。",
            "修复思路不是在回复里解释“我们主要面向 iPhone”，而是补 iPad 可见性证据：让首页菜单、底部 Tab、设置入口在 iPad 兼容窗口里保持可见，并保存验证截图。"
          ],
        },
        {
          heading: "5.1：把本地 AI 数据流说清楚",
          paragraphs: [
            "Apple 的判断是：App 看起来可能把用户个人数据发送给第三方 AI，但没有清楚说明发送什么、发给谁、是否先取得许可。对情绪日记来说，这个问题很敏感，因为录音、转写、日记文本、情绪标签都属于高度私密内容。",
            "实际回应必须落到数据流：Qwen3 MLX 模型随 App 打包，在支持的实体 iPhone 上本地运行；App 不调用 OpenAI、Anthropic、Gemini、ChatGPT 或其他托管第三方 AI API。Apple Speech 和可选天气也要分别解释清楚，不能一句“本地 AI”带过。"
          ],
        },
        {
          heading: "2.1(b)：内购路径必须让审核员找到",
          paragraphs: [
            "Apple 说无法定位 `Unlock Home Skins` 内购。这个问题不一定是 StoreKit 坏了，也可能只是审核员在当前 UI 状态下找不到入口。",
            "回应要给可复现步骤：打开 App，点右上角设置，进入 Skin Type，选择 Puppy Star、Kitten Cloud 或 Bear Bunny 这类锁定皮肤，出现 Unlock All Skins 购买页，并能看到价格、Not Now 和 Restore Purchases。"
          ],
        },
        {
          heading: "拒审记录要进入上架助手",
          paragraphs: [
            "这次复盘最重要的不是把一封信处理完，而是把 Apple 的原始问题、修复映射、验证截图、回复草稿、重提状态都放进上架助手。下一个 AI、语音、情绪或 IAP 产品遇到类似问题时，可以直接复用这套检查表。",
            "官网上不应该把这种状态藏起来。未上架就显示“App Store 即将上架”，开发日记则公开写清楚被拒原因和处理经验。真实进度本身就是产品信任的一部分。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("rushi", [
    {
      slug: "rushi-public-domain-content",
      title: "01 · 立项：公共领域佛经如何变成安静 App",
      category: "产品复盘",
      excerpt: "Rushi 的关键不是收集更多文本，而是把公共领域内容做成可被安静阅读的产品。",
      tags: ["Rushi", "公共领域", "立项"],
      order: 1,
      body: [
        "Rushi 的立项来自另一个方向：不是工具效率，而是内容体验。金刚经、心经这类公共领域文本已经存在，问题是如何让用户在现代设备上安静阅读。",
        "内容产品的难点不在功能多，而在来源、署名、语言、排版和尊重语境。"
      ],
      sections: [
        {
          heading: "公共领域不等于随便使用",
          paragraphs: [
            "即使文本属于公共领域，也要尽量说明来源、版本和整理方式。宗教与传统文本尤其需要谨慎表达，避免误导用户。"
          ],
        },
        {
          heading: "安静是核心体验",
          paragraphs: [
            "Rushi 不适合做成信息流、打卡榜和强提醒产品。更合适的是简洁阅读、稳定排版和低干扰的日常入口。"
          ],
        },
        {
          heading: "内容产品也需要技术纪律",
          paragraphs: [
            "多语言文本、字符方向、字体选择、段落结构和搜索都需要工程处理。越安静的产品，越需要底层稳定。"
          ],
        },
      ],
    },
    {
      slug: "rushi-content-sourcing",
      title: "02 · 内容边界：金刚经、心经和多语言来源",
      category: "产品复盘",
      excerpt: "佛经类产品首先要把内容来源、版本差异和语言边界讲清楚。",
      tags: ["内容来源", "多语言", "佛经"],
      order: 2,
      body: [
        "Rushi 的内容工作不只是把文本放进 App。不同语言、不同译本和不同整理方式会影响用户理解，也会影响产品责任。",
        "开发日记需要记录的是方法：如何确认可用来源、如何标注版本、如何处理多语言差异。"
      ],
      sections: [
        {
          heading: "来源要可回溯",
          paragraphs: [
            "用户不一定会检查来源，但产品应该能说明文本从哪里来、是否属于公共领域、是否经过整理。"
          ],
        },
        {
          heading: "多语言不是越多越好",
          paragraphs: [
            "语言数量增加会带来校对和排版成本。每新增一种语言，都要检查字符显示、段落断句和本地化名称。"
          ],
        },
        {
          heading: "不要把内容权威化",
          paragraphs: [
            "产品应该避免宣称某个版本绝对权威，更适合表达为方便阅读的整理版本，并保留来源说明。"
          ],
        },
      ],
    },
    {
      slug: "rushi-reading-ritual",
      title: "03 · 产品体验：阅读、念珠和静心声音",
      category: "设计系统",
      excerpt: "静心类产品的功能要服务仪式感，但不能用仪式感制造负担。",
      tags: ["阅读体验", "仪式感", "静心"],
      order: 3,
      body: [
        "Rushi 可以围绕阅读、念珠、声音和每日片段设计体验，但每个功能都要非常克制。用户来这里不是完成任务，而是进入一段安静时间。",
        "这种产品的高级感不是视觉昂贵，而是少打扰、好阅读、能持续。"
      ],
      sections: [
        {
          heading: "阅读要先于装饰",
          paragraphs: [
            "字体、行距、段落、深浅色和屏幕亮度，比复杂背景更重要。文本类 App 的第一原则是可读。"
          ],
        },
        {
          heading: "念珠可以是轻交互",
          paragraphs: [
            "念珠功能不必做成游戏化系统。简单、稳定、可回到文本的轻交互，更符合静心场景。"
          ],
        },
        {
          heading: "声音要作为背景而不是主角",
          paragraphs: [
            "环境声可以帮助沉浸，但不应该掩盖文本。音量、循环和关闭入口都要容易控制。"
          ],
        },
      ],
    },
    {
      slug: "rushi-localization",
      title: "04 · 多语言：不是堆语言，而是降低误读",
      category: "产品复盘",
      excerpt: "多语言宗教文本最重要的是尊重语境，让用户清楚这是阅读辅助而不是解释权威。",
      tags: ["本地化", "内容产品", "语境"],
      order: 4,
      body: [
        "Rushi 做多语言时，目标不是在页面上展示“支持 13 种语言”这么简单，而是让不同语言用户都能安静读到合适版本。",
        "语言越多，越需要谨慎处理标题、说明、免责声明和来源。"
      ],
      sections: [
        {
          heading: "语言名称和文本方向要检查",
          paragraphs: [
            "多语言页面里最容易出错的是语言名、字体回退和方向。内容产品不能让这些细节破坏可信度。"
          ],
        },
        {
          heading: "翻译不是解释",
          paragraphs: [
            "产品可以提供译文阅读，但不应把自己包装成宗教解释平台。说明文字越克制，风险越低。"
          ],
        },
        {
          heading: "本地化素材也要安静",
          paragraphs: [
            "商店截图、官网文案和社交素材都应该保持温和，不适合用夸张承诺或强营销语气。"
          ],
        },
      ],
    },
    {
      slug: "rushi-app-store-category",
      title: "05 · 审核策略：内容产品如何降低类目风险",
      category: "App Store",
      excerpt: "Rushi 不是拒审案例，而是把类别、来源、隐私和用途提前说清楚后通过审核的对照案例。",
      tags: ["App Store", "审核", "内容"],
      order: 5,
      body: [
        "本轮资料里没有找到 Rushi 被拒审的原信；相反，上架助手把它作为 DrowseBook 的对照案例：Rushi 选 Lifestyle，通过工具定位和来源说明降低了 China mainland 内容风险。",
        "Rushi 这类产品在 App Store 上架时，需要让审核员快速理解：它提供什么内容、来源是什么、是否收集数据、是否有付费和社区功能。",
        "类目风险通常来自表达不清。越像一个安静阅读工具，越要在说明里避免夸张效果承诺；越可能被误解成宗教服务，越要把它写成离线、买断、无广告、无账号的个人工具。"
      ],
      sections: [
        {
          heading: "先把它写成工具，而不是服务",
          paragraphs: [
            "Rushi 的 Review Notes 明确说明它是 Buddhist practice utility，不是 religious service。它不售卖功德、祝福、救赎或任何精神结果，也不募捐。",
            "这句话很关键：审核员不只看 App 里有什么，还看你如何解释它。Rushi 把阅读、佛珠计数和抄经写成离线个人工具，而不是承诺效果的服务。"
          ],
        },
        {
          heading: "来源和版权要落到 Guideline 5.2",
          paragraphs: [
            "审核备注把经文来源放到 Guideline 5.2 下解释：金刚经、心经和多语言版本来自公有领域或可核验来源，声音素材来自 CC0 或自录，并在 App 内 About 页列出。",
            "这不是为了写得漂亮，而是为了让审核员能快速判断：产品没有在分发不明版权内容，也没有靠模糊来源规避内容审核。"
          ],
        },
        {
          heading: "隐私简单也要写得具体",
          paragraphs: [
            "Rushi 的审核备注写清楚：无网络请求、无分析 SDK、无崩溃上报、无追踪；书签、计数和抄写内容只保存在本地。iOS 隐私清单也只声明必要的 UserDefaults 原因。",
            "这类内容产品最怕一句笼统的“不收集数据”。越简单，越要把简单具体化，让隐私政策、App Privacy 问卷和代码行为互相对得上。"
          ],
        },
        {
          heading: "不要把通过当成判例",
          paragraphs: [
            "Rushi 的通过经验可以复用的是方法：Lifestyle 类目、工具定位、来源透明、无 IAP / 订阅 / 广告、无账号、iPhone-only 和审核备注解释。不能复用的是侥幸感。",
            "同样是内容型产品，DrowseBook 因 Books 类、内置样书和 China mainland 可售性被 Guideline 2.1 卡住。两个案例放在一起，才是之后立项和上架时真正有用的判断框架。"
          ],
        },
      ],
    },
    {
      slug: "rushi-matrix-value",
      title: "06 · 矩阵价值：为 DailyZikr 和内容型 App 打样",
      category: "AI 工作流",
      excerpt: "Rushi 的开发经验可以复用到 DailyZikr、静心类工具和多语言支持页面。",
      tags: ["产品矩阵", "复用", "内容工程"],
      order: 6,
      body: [
        "Rushi 的价值不只是一个产品页，而是为内容型 App 建立模板：公共领域文本、多语言页面、隐私政策、支持入口和安静视觉。",
        "这套经验可以复用到 DailyZikr，也可以变成课程里关于内容产品、上架页和多语言工程的章节。"
      ],
      sections: [
        {
          heading: "内容结构可以复用",
          paragraphs: [
            "经文、祷文、每日片段、翻译、来源说明都属于结构化内容。把结构做好，后续产品就能复用数据模型。"
          ],
        },
        {
          heading: "视觉系统可以复用但不能换皮",
          paragraphs: [
            "安静排版、低干扰颜色和清楚来源说明可以复用，但不同宗教或文化内容必须有不同语境，不能简单换标题。"
          ],
        },
        {
          heading: "开发日志能沉淀内容产品方法",
          paragraphs: [
            "从文本来源到多语言校对，再到审核说明，这些都是可以公开分享的经验，适合做成系列教程。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("dailyzikr", [
    {
      slug: "app-store-policy-pages",
      title: "01 · 立项：从支持页到 Daily Zikr 产品闭环",
      category: "App Store",
      excerpt: "DailyZikr 先从支持和政策页面开始，最终要服务一个完整的日常祈念产品。",
      tags: ["DailyZikr", "支持页", "立项"],
      order: 1,
      body: [
        "DailyZikr 最初以支持站和 App Store 政策页面形式沉淀，这是很多独立 App 的真实起点：先把审核需要的稳定 URL、隐私说明和支持入口准备好。",
        "但它不应该停留在政策页。后续产品闭环要围绕每日祈念、念珠、朝向、内容来源和多语言用户体验展开。"
      ],
      sections: [
        {
          heading: "一个主域名降低维护成本",
          paragraphs: [
            "多个 App 分散在多个 GitHub Pages 页面上，维护会越来越重。把产品页、隐私政策和支持入口集中到个人站，更适合长期矩阵。"
          ],
        },
        {
          heading: "支持页也是产品信任的一部分",
          paragraphs: [
            "用户和审核员看到稳定、清楚、可联系的支持页面，会更容易理解这是一个长期维护的产品。"
          ],
        },
        {
          heading: "政策页面要能承接未来功能",
          paragraphs: [
            "即使当前功能简单，也要用可扩展结构：隐私、支持、内容来源、联系方式和版本说明都可以逐步补充。"
          ],
        },
      ],
    },
    {
      slug: "dailyzikr-product-philosophy",
      title: "02 · 项目哲学：工具定位、尊重语境和本地优先",
      category: "产品复盘",
      excerpt: "DailyZikr 的开发哲学是做日常辅助工具，而不是用技术替代宗教语境。",
      tags: ["产品哲学", "本地优先", "语境"],
      order: 2,
      body: [
        "DailyZikr 这类产品需要特别谨慎：它服务的是用户的日常习惯和信仰语境，不适合用夸张的效率语言包装。",
        "产品哲学应该是辅助、提醒、记录和尊重来源，而不是解释权威或强行游戏化。"
      ],
      sections: [
        {
          heading: "工具身份要明确",
          paragraphs: [
            "它可以帮助用户查看 Adhkar、使用念珠、设置提醒和找到方向，但不应该把自己包装成宗教判断平台。"
          ],
        },
        {
          heading: "本地优先减少敏感数据风险",
          paragraphs: [
            "日常记录、偏好和提醒可以尽量保存在设备上。需要联网的能力要明确说明原因和范围。"
          ],
        },
        {
          heading: "尊重语境比功能数量重要",
          paragraphs: [
            "宗教内容产品最怕为了显得丰富而乱加功能。每个功能都要问：它是否真的帮助用户更安静、更准确地完成日常习惯？"
          ],
        },
      ],
    },
    {
      slug: "dailyzikr-content-audit",
      title: "03 · 内容工程：Adhkar 来源、署名和审核包",
      category: "App Store",
      excerpt: "内容型宗教 App 的审核准备，核心在来源、署名、范围和可解释性。",
      tags: ["内容审核", "来源", "App Store"],
      order: 3,
      body: [
        "DailyZikr 的内容工程比界面更重要。Adhkar 文本从哪里来、如何校对、是否有翻译、如何署名，都会影响用户信任和平台审核。",
        "公开开发日记不需要暴露内部文档来源，但要讲清方法：建立来源表、校对流程、风险说明和审核材料包。"
      ],
      sections: [
        {
          heading: "内容来源要可解释",
          paragraphs: [
            "每一类文本都应该能说明来源和整理方式。对于多语言内容，翻译来源和校对状态也应保持记录。"
          ],
        },
        {
          heading: "审核包要提前准备",
          paragraphs: [
            "如果审核员询问内容来源、地区可用性或宗教敏感性，产品团队应该能快速提供说明，而不是临时补材料。"
          ],
        },
        {
          heading: "公开文章讲方法，不泄露内部细节",
          paragraphs: [
            "个人站开发日记适合讲内容审计框架，不适合贴内部路径、原始审查记录或敏感提交信息。"
          ],
        },
      ],
    },
    {
      slug: "dailyzikr-tasbih-qibla",
      title: "04 · 功能落地：念珠、朝向和每日列表",
      category: "架构实现",
      excerpt: "DailyZikr 的功能应该围绕日常使用闭环，而不是为了显得完整而堆砌。",
      tags: ["Tasbih", "Qibla", "功能设计"],
      order: 4,
      body: [
        "DailyZikr 的核心功能可以从每日列表、念珠计数、朝向辅助和提醒开始。这些功能看似常规，但每个都有细节。",
        "念珠要稳定、朝向要解释精度、提醒要低打扰，每日内容要能快速进入。"
      ],
      sections: [
        {
          heading: "念珠是高频交互",
          paragraphs: [
            "计数、重置、震动反馈和误触处理都要认真设计。高频功能越简单，越能长期使用。"
          ],
        },
        {
          heading: "朝向功能要说明限制",
          paragraphs: [
            "传感器、定位和环境都会影响准确性。产品需要用清楚文案告诉用户它是辅助工具，而不是绝对测量。"
          ],
        },
        {
          heading: "每日列表要减少选择压力",
          paragraphs: [
            "用户打开后应该知道今天可以读什么，而不是面对大量分类犹豫。默认内容和收藏机制很重要。"
          ],
        },
      ],
    },
    {
      slug: "dailyzikr-localization-12langs",
      title: "05 · 多语言：目标市场文字与视觉检查",
      category: "设计系统",
      excerpt: "DailyZikr 的多语言不仅是翻译，还包括方向、字体、长度和文化语气。",
      tags: ["多语言", "RTL", "本地化"],
      order: 5,
      body: [
        "DailyZikr 面向的用户天然跨语言。多语言不是简单把字符串丢给翻译工具，而是要检查文字方向、字体、断行、截图和商店文案。",
        "尤其是 RTL 语言和长文本，会直接影响 UI 结构。"
      ],
      sections: [
        {
          heading: "RTL 要作为一等场景",
          paragraphs: [
            "阿拉伯语等 RTL 语言不能只在最后测试。导航、列表、图标方向和文本对齐都可能需要单独检查。"
          ],
        },
        {
          heading: "商店截图也要本地化",
          paragraphs: [
            "如果应用支持多语言，但商店截图只有一种语言，转化会受影响。GlotShot 这类工具可以服务这条流程。"
          ],
        },
        {
          heading: "文化语气要保守",
          paragraphs: [
            "宗教内容不适合过度营销或玩梗。本地化文案应该准确、温和、尊重语境。"
          ],
        },
      ],
    },
    {
      slug: "dailyzikr-app-store-risk",
      title: "06 · 上架复盘：中国大陆内容风险和降噪表达",
      category: "App Store",
      excerpt: "区域、内容、宗教语境和商店政策都需要提前评估，表达越清楚越少返工。",
      tags: ["审核风险", "区域", "政策"],
      order: 6,
      body: [
        "DailyZikr 的上架复盘要把区域风险纳入产品决策。不同地区对宗教内容、文本来源和服务可用性的要求不完全相同。",
        "公开表达时要避免情绪化或政策化，只讲产品如何做内容来源、隐私、支持和区域可用性的降噪处理。"
      ],
      sections: [
        {
          heading: "地区策略是产品策略",
          paragraphs: [
            "如果某些市场存在额外内容风险，产品可以选择谨慎上线、延后上线或调整可见性。这个决策应在上架前完成。"
          ],
        },
        {
          heading: "审核说明要事实化",
          paragraphs: [
            "审核沟通里最有用的是事实：功能是什么、内容来源是什么、是否收集数据、是否有社区或用户生成内容。"
          ],
        },
        {
          heading: "开发日记适合写原则",
          paragraphs: [
            "公开文章可以总结“内容型 App 如何准备审核”，但不需要公开具体提交编号、内部争议和敏感原始材料。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("packpour", [
    {
      slug: "packpour-app-store-connect",
      title: "01 · 立项：为什么 App Store Connect 需要字段自动化",
      category: "AI 工作流",
      excerpt: "Packpour 把 App Store Connect 的重复填写，变成独立开发者可控的浏览器辅助流程。",
      tags: ["Packpour", "App Store Connect", "立项"],
      order: 1,
      body: [
        "一个 App 做多语言上架时，App Store Connect 里的字段会迅速变成重复劳动：标题、副标题、描述、关键词、更新说明、推广文本，每种语言都要维护。",
        "Packpour 的立项就是把这些本地化字段整理成 locale pack，再通过 Chrome 侧边栏辅助填入页面。"
      ],
      sections: [
        {
          heading: "重复填写容易出错",
          paragraphs: [
            "手工复制粘贴很容易漏字段、填错语言、覆盖旧内容。工具的价值不是替代审核判断，而是减少机械错误。"
          ],
        },
        {
          heading: "运营自动化也要本地优先",
          paragraphs: [
            "商店文案、关键词和发布说明都属于商业资产。Packpour 选择从本地文件读取，避免把这些内容上传到额外服务。"
          ],
        },
        {
          heading: "它服务产品矩阵",
          paragraphs: [
            "当 App 数量增加，本地化维护会成为固定成本。Packpour 能和 GlotShot、个人站、开发日记一起组成发布工具链。"
          ],
        },
      ],
    },
    {
      slug: "packpour-locale-pack",
      title: "02 · 数据格式：locale pack 如何承接多语言元信息",
      category: "架构实现",
      excerpt: "locale pack 的核心不是文件格式，而是把商店字段变成可审查、可版本化的内容资产。",
      tags: ["locale pack", "本地化", "数据格式"],
      order: 2,
      body: [
        "Packpour 需要一个人和机器都能理解的输入格式。它既要方便开发者编辑，又要能稳定映射到 App Store Connect 的各个字段。",
        "locale pack 的价值在于把零散网页字段变成可版本化文件：可以检查、对比、翻译、复用。"
      ],
      sections: [
        {
          heading: "字段名要贴近平台",
          paragraphs: [
            "如果格式里的字段和平台字段差异太大，用户会在维护时反复查文档。更好的方式是尽量沿用平台概念，同时补充必要注释。"
          ],
        },
        {
          heading: "内容要能被人工审查",
          paragraphs: [
            "自动倒入之前，用户应该能快速查看每种语言的标题、关键词和描述。发布文案不适合完全黑箱处理。"
          ],
        },
        {
          heading: "格式稳定后才能规模化",
          paragraphs: [
            "一旦 locale pack 结构稳定，后续每个 App 都可以按同一模板准备本地化材料，运营效率会明显提高。"
          ],
        },
      ],
    },
    {
      slug: "packpour-side-panel",
      title: "03 · Chrome 侧边栏：辅助填写而不替用户提交",
      category: "架构实现",
      excerpt: "Packpour 选择侧边栏，是为了让用户一边看平台页面，一边控制自动填写。",
      tags: ["Chrome", "Side Panel", "自动填写"],
      order: 3,
      body: [
        "App Store Connect 是一个真实后台，工具必须尊重平台页面和用户操作。Packpour 的侧边栏形态让用户始终看得到当前页面、当前语言和即将填入的内容。",
        "这比后台脚本直接提交更安全，也更符合独立开发者对关键发布动作的控制需求。"
      ],
      sections: [
        {
          heading: "可见性降低误操作",
          paragraphs: [
            "用户可以在页面旁边看到 locale pack 内容、目标字段和填入进度。出现异常时，也能立即停止。"
          ],
        },
        {
          heading: "辅助和自动发布要分开",
          paragraphs: [
            "Packpour 适合自动填字段，但不应该替用户点击最终提交。发布、审核和保存这类动作应该保留人工确认。"
          ],
        },
        {
          heading: "扩展权限要尽量收敛",
          paragraphs: [
            "浏览器扩展越靠近后台页面，权限说明越重要。产品应该只申请完成字段辅助所需的权限。"
          ],
        },
      ],
    },
    {
      slug: "packpour-platform-rules",
      title: "04 · 安全边界：Save 和 Submit 必须保持人工",
      category: "App Store",
      excerpt: "运营自动化最重要的边界，是不要让工具越过平台和用户的最终确认。",
      tags: ["平台规则", "安全", "审核"],
      order: 4,
      body: [
        "Packpour 的产品边界非常关键：它可以减少复制粘贴，但不应该替用户决定保存、提交审核或发布。",
        "这条边界既是安全考虑，也是平台规则考虑。自动化越接近关键动作，越需要保守。"
      ],
      sections: [
        {
          heading: "人工确认是责任边界",
          paragraphs: [
            "字段可以由工具辅助填入，但最终内容是否正确、是否符合商店政策、是否提交审核，仍然是开发者自己的责任。"
          ],
        },
        {
          heading: "错误恢复比一键完成更重要",
          paragraphs: [
            "如果填错字段，用户需要能看到、撤回或重新填写。全自动黑箱流程一旦出错，代价更高。"
          ],
        },
        {
          heading: "公开表达要避免违规暗示",
          paragraphs: [
            "产品页和教程应该强调辅助填写、本地处理和人工提交，而不是宣传绕过平台流程。"
          ],
        },
      ],
    },
    {
      slug: "packpour-release-zip",
      title: "05 · 发布：从 manifest 版本到扩展 ZIP",
      category: "App Store",
      excerpt: "Chrome 扩展发布看似简单，但版本、权限、图标、说明和 ZIP 都要形成稳定流程。",
      tags: ["Chrome 扩展", "发布", "Manifest"],
      order: 5,
      body: [
        "Packpour 作为浏览器扩展，需要维护 manifest、权限、图标、版本号、产品页和安装说明。小扩展也需要发布纪律。",
        "尤其是面向开发者的工具，用户会关注源码、权限和更新记录。"
      ],
      sections: [
        {
          heading: "Manifest 是产品契约",
          paragraphs: [
            "它说明扩展叫什么、需要什么权限、在哪些页面工作。每次改权限都应该能解释为什么。"
          ],
        },
        {
          heading: "ZIP 发布要可复现",
          paragraphs: [
            "扩展包最好能从源码按固定命令生成，避免临时手工打包导致漏文件或版本不一致。"
          ],
        },
        {
          heading: "安装说明要适合非工程用户",
          paragraphs: [
            "即使目标用户是开发者，也应该写清如何加载扩展、如何准备 locale pack、如何在 ASC 页面使用。"
          ],
        },
      ],
    },
    {
      slug: "packpour-matrix-ops",
      title: "06 · 矩阵价值：一个扩展服务所有 App 本地化",
      category: "AI 工作流",
      excerpt: "Packpour 的长期价值在于让每个新 App 的上架材料复用同一套运营流程。",
      tags: ["产品矩阵", "运营自动化", "复用"],
      order: 6,
      body: [
        "Packpour 是典型的矩阵基础设施：它本身可能不是最大产品，但它能让每个 App 的上架、本地化和版本更新更快。",
        "独立开发者做到后期，真正的效率来自这种内部工具外部化：自己用，用户也能用，课程还能讲。"
      ],
      sections: [
        {
          heading: "一次工具化，多次省时间",
          paragraphs: [
            "每个新 App 都需要商店字段。把流程工具化后，节省的是未来每一次发布和更新的时间。"
          ],
        },
        {
          heading: "和 GlotShot 形成发布组合",
          paragraphs: [
            "GlotShot 负责截图素材，Packpour 负责文本字段。两者合起来就是 App Store 发布运营链路。"
          ],
        },
        {
          heading: "课程里可以讲运营工程化",
          paragraphs: [
            "AI 编程课程不应该只讲写应用，也要讲如何把发布、维护和本地化变成可复制流程。Packpour 正好承担这一课。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("beraw", [
    {
      slug: "beraw-browser-utility",
      title: "01 · 立项：从 Behance 原图痛点做小工具",
      category: "产品复盘",
      excerpt: "BeRaw 的立项说明：一个非常具体的网页痛点，也可以变成有价值的浏览器扩展。",
      tags: ["BeRaw", "Behance", "立项"],
      order: 1,
      body: [
        "设计调研时，用户常常需要保存 Behance 项目里的大图，但页面展示的未必是原始尺寸，手工一个个找也很麻烦。",
        "BeRaw 就从这个小痛点出发：识别项目页里的大图，帮助用户单张或批量下载。"
      ],
      sections: [
        {
          heading: "小痛点也能成为产品",
          paragraphs: [
            "不需要所有工具都做成大平台。只要问题具体、频率足够、解决路径清楚，一个浏览器小工具就有存在价值。"
          ],
        },
        {
          heading: "目标用户很明确",
          paragraphs: [
            "BeRaw 面向设计调研、素材归档和灵感整理场景。用户要的是快速拿到原图，而不是复杂素材管理系统。"
          ],
        },
        {
          heading: "边界越窄越好推广",
          paragraphs: [
            "“从 Behance 下载原始大图”比“网页素材管理平台”更容易理解，也更容易让用户记住。"
          ],
        },
      ],
    },
    {
      slug: "beraw-image-detection",
      title: "02 · 核心能力：识别大图、蓝框和选择列表",
      category: "架构实现",
      excerpt: "BeRaw 的核心不是下载按钮，而是可靠识别网页中哪些图片值得下载。",
      tags: ["图片识别", "DOM", "选择列表"],
      order: 2,
      body: [
        "网页图片提取看似简单，实际很容易抓到缩略图、头像、图标和无关资源。BeRaw 的核心能力是从项目页里识别真正的大图。",
        "蓝框高亮和选择列表让用户知道工具识别了什么，也能手动排除不需要的图片。"
      ],
      sections: [
        {
          heading: "识别逻辑要减少噪音",
          paragraphs: [
            "图片尺寸、资源路径、DOM 位置和可见区域都能作为判断依据。目标是尽量把无关小图过滤掉。"
          ],
        },
        {
          heading: "可视化反馈建立信任",
          paragraphs: [
            "用户看到蓝框后，知道工具准备下载哪些图片。自动化工具如果完全不可见，用户会担心误抓或漏抓。"
          ],
        },
        {
          heading: "列表选择保留人工控制",
          paragraphs: [
            "设计项目里的图片不一定都需要保存。让用户勾选，是小工具保持精准和安全的关键。"
          ],
        },
      ],
    },
    {
      slug: "beraw-raw-cdn",
      title: "03 · 图片策略：拿原始大图而不是预览图",
      category: "架构实现",
      excerpt: "下载工具的质量取决于是否能避开预览图，尽可能找到更高质量资源。",
      tags: ["原图", "CDN", "素材"],
      order: 3,
      body: [
        "用户安装 BeRaw 的原因是想要大图，而不是网页上已经压缩过的预览图。工具需要理解不同图片 URL、尺寸参数和资源层级。",
        "这类能力要谨慎做：只处理用户当前打开并可访问的内容，不绕过权限或付费限制。"
      ],
      sections: [
        {
          heading: "质量判断要可解释",
          paragraphs: [
            "如果工具同时发现多个尺寸，应该优先选择更高清的版本，并在必要时让用户看到文件大小或尺寸。"
          ],
        },
        {
          heading: "不要越过访问边界",
          paragraphs: [
            "浏览器工具应只基于用户当前页面能访问的资源工作。公开文案也要避免暗示破解或绕过权限。"
          ],
        },
        {
          heading: "失败时要给替代方案",
          paragraphs: [
            "如果某个项目使用特殊加载方式，工具可能无法拿到原图。提示用户刷新、滚动加载或手动选择，比静默失败更好。"
          ],
        },
      ],
    },
    {
      slug: "beraw-zip-batch",
      title: "04 · 批处理：单张下载和 ZIP 打包",
      category: "AI 工作流",
      excerpt: "批量 ZIP 是 BeRaw 从单次工具变成工作流工具的关键一步。",
      tags: ["ZIP", "批量下载", "工作流"],
      order: 4,
      body: [
        "单张下载解决偶发需求，批量 ZIP 才能服务设计调研和素材归档。用户打开一个项目后，希望一次性保存选中的所有大图。",
        "批处理功能要处理命名、重复文件、下载失败和进度反馈。"
      ],
      sections: [
        {
          heading: "命名影响后续整理",
          paragraphs: [
            "如果文件名全是随机字符，用户下载后还要重新整理。工具可以用项目名、序号和尺寸生成更可读的名称。"
          ],
        },
        {
          heading: "进度反馈不能省",
          paragraphs: [
            "大图下载和打包可能耗时。用户需要看到当前数量、失败项和最终 ZIP 状态。"
          ],
        },
        {
          heading: "批量能力要保留选择",
          paragraphs: [
            "默认全选可能方便，但必须允许取消。设计项目里不是每张图片都值得保存。"
          ],
        },
      ],
    },
    {
      slug: "beraw-permission-privacy",
      title: "05 · 扩展边界：只在用户打开的项目页工作",
      category: "App Store",
      excerpt: "浏览器扩展越贴近网页内容，越要克制权限和清楚解释隐私边界。",
      tags: ["浏览器权限", "隐私", "安全"],
      order: 5,
      body: [
        "BeRaw 的可信度来自权限克制。它应该只在用户主动打开的目标网页里工作，只提取当前页面可见或可访问的图片信息。",
        "隐私政策要写清：不需要账号、不上传素材、不把用户浏览内容发到自有服务器。"
      ],
      sections: [
        {
          heading: "权限越少越容易安装",
          paragraphs: [
            "用户看到扩展权限时会判断风险。只申请必要页面和下载能力，比宽泛访问所有网站更容易获得信任。"
          ],
        },
        {
          heading: "本地处理要落到实现",
          paragraphs: [
            "图片列表、选择状态和 ZIP 生成应尽量在本地完成。公开文案不能只写“安全”，要解释为什么安全。"
          ],
        },
        {
          heading: "素材使用责任属于用户",
          paragraphs: [
            "工具帮助保存当前可访问图片，但不改变版权和授权关系。产品页需要提醒用户尊重原作者权益。"
          ],
        },
      ],
    },
    {
      slug: "beraw-small-tool-lessons",
      title: "06 · 产品复盘：小工具如何避免做成大平台",
      category: "产品复盘",
      excerpt: "BeRaw 的经验是：小工具保持锋利，比过早平台化更重要。",
      tags: ["小工具", "产品边界", "复盘"],
      order: 6,
      body: [
        "BeRaw 很容易继续膨胀：素材库、云同步、收藏夹、AI 分类、设计社区。每个方向都有诱惑，但都会让原本清楚的问题变得模糊。",
        "早期更好的策略是守住一个场景，把识别、选择、下载、打包做稳。"
      ],
      sections: [
        {
          heading: "一眼能懂就是优势",
          paragraphs: [
            "用户看到产品名和一句描述，就知道它能从 Behance 拿原图。这种清楚比复杂功能更有传播力。"
          ],
        },
        {
          heading: "扩展适合轻量交付",
          paragraphs: [
            "浏览器扩展天然适合解决网页里的局部痛点。不要用它承载过重的账户系统和平台逻辑。"
          ],
        },
        {
          heading: "开发日志可以教小工具方法",
          paragraphs: [
            "BeRaw 很适合写成教程：如何发现网页痛点、如何做权限边界、如何做批量下载、如何发布扩展。"
          ],
        },
      ],
    },
  ]),
  ...productSeries("uixskills", [
    {
      slug: "uixskills-design-protocol",
      title: "01 · 立项：为什么要做 AI 设计协议",
      category: "设计系统",
      excerpt: "UIXskills 的核心不是做一个页面生成器，而是探索 AI 设计过程如何被结构化。",
      tags: ["UIXskills", "AI 设计", "立项"],
      order: 1,
      body: [
        "AI 可以生成界面，但很多时候生成结果不可控：结构不稳、风格漂移、组件边界混乱、难以复用。",
        "UIXskills 的立项是把设计过程协议化：从 AI 输出到 JSON，再到白板、技能和真实 UI，让每一步都能被检查和改写。"
      ],
      sections: [
        {
          heading: "生成不是设计流程的终点",
          paragraphs: [
            "一次生成的页面可能看起来不错，但如果不能复用组件、解释层级和继续迭代，就很难进入真实开发。"
          ],
        },
        {
          heading: "协议让 AI 输出可检查",
          paragraphs: [
            "把界面意图变成结构化数据后，人和工具都能检查字段、组件关系、状态和约束，而不是只看一张图。"
          ],
        },
        {
          heading: "它是方法论产品",
          paragraphs: [
            "UIXskills 更像一套设计和开发协作方法，而不是单一工具。它适合和课程、技能文件、前端实现一起沉淀。"
          ],
        },
      ],
    },
    {
      slug: "uixskills-json-schema",
      title: "02 · 结构化：AI 输出为什么先进入 JSON",
      category: "架构实现",
      excerpt: "JSON 不是为了技术好看，而是为了让设计意图可验证、可转换、可复用。",
      tags: ["JSON", "Schema", "结构化"],
      order: 2,
      body: [
        "AI 直接输出 HTML 或截图很快，但难以维护。UIXskills 把中间层放在 JSON，是为了让设计从自然语言变成结构化协议。",
        "这个协议可以描述页面、区块、组件、状态、内容和设计约束，之后再进入白板或前端实现。"
      ],
      sections: [
        {
          heading: "Schema 是设计边界",
          paragraphs: [
            "没有 schema，AI 每次都会自由发挥。schema 告诉模型哪些字段必须有、哪些值可选、组件之间如何组合。"
          ],
        },
        {
          heading: "结构化方便差异比较",
          paragraphs: [
            "当设计迭代时，JSON 可以比较变化：哪个区块改了、哪个组件新增、哪个状态被删除。这比比较两张截图更可控。"
          ],
        },
        {
          heading: "中间层能连接多种输出",
          paragraphs: [
            "同一份结构化设计可以渲染成白板、网页、文档或技能说明。它把一次思考变成多处可用资产。"
          ],
        },
      ],
    },
    {
      slug: "uixskills-whiteboard-flow",
      title: "03 · 白板：让设计过程可看、可改、可复用",
      category: "设计系统",
      excerpt: "白板不是展示结果，而是让 AI、人和代码之间有一个共同讨论空间。",
      tags: ["Whiteboard", "设计流程", "协作"],
      order: 3,
      body: [
        "AI 生成 UI 的问题之一是过程不可见。用户只看到结果，不知道结构为什么这么分、组件为什么这么排。",
        "UIXskills 引入白板，是为了让设计过程从黑箱里出来：先看结构，再改关系，最后落到实现。"
      ],
      sections: [
        {
          heading: "白板适合讨论信息架构",
          paragraphs: [
            "页面有几个区块、哪个是主流程、哪些是辅助信息，这些问题在白板里比在代码里更容易讨论。"
          ],
        },
        {
          heading: "可视化不等于装饰",
          paragraphs: [
            "白板应该展示结构和关系，而不是做成花哨画布。它服务的是判断和协作。"
          ],
        },
        {
          heading: "设计过程也能成为课程内容",
          paragraphs: [
            "从需求到白板再到代码的每一步，都可以变成教学章节，帮助用户理解 AI 设计不是盲生成。"
          ],
        },
      ],
    },
    {
      slug: "uixskills-skill-system",
      title: "04 · SKILL：把经验沉淀成可执行流程",
      category: "AI 工作流",
      excerpt: "UIXskills 的长期价值在于把一次设计经验变成下一次 AI 可以遵循的流程。",
      tags: ["SKILL", "流程", "沉淀"],
      order: 4,
      body: [
        "AI 工具最容易浪费的是经验：这次调通了，下次又从零开始。UIXskills 想把设计经验写成可执行技能，让 AI 在类似任务中复用。",
        "技能文件不是普通文档，它要告诉 AI 什么时候使用、如何检查、输出什么、如何避免常见错误。"
      ],
      sections: [
        {
          heading: "经验要能触发",
          paragraphs: [
            "如果技能只是放在文档里，AI 不知道什么时候用。好的技能需要明确适用场景和触发条件。"
          ],
        },
        {
          heading: "流程要能验收",
          paragraphs: [
            "设计技能不能只说“做得高级”。它要有可检查标准：对齐、间距、响应式、文本不溢出、组件状态完整。"
          ],
        },
        {
          heading: "个人站本身就是实验场",
          paragraphs: [
            "本站的设计改版、产品页和开发日记页面，都可以反过来沉淀为 UIXskills 的技能样本。"
          ],
        },
      ],
    },
    {
      slug: "uixskills-frontend-bridge",
      title: "05 · UI 落地：从协议到真实前端",
      category: "架构实现",
      excerpt: "设计协议只有落到真实页面、真实组件和真实 QA，才算完成闭环。",
      tags: ["前端实现", "组件", "QA"],
      order: 5,
      body: [
        "UIXskills 不能停留在概念层。结构化设计最终要生成或指导真实前端：组件拆分、状态管理、样式系统和响应式布局。",
        "落地过程中最重要的是保持协议和代码之间的映射关系，否则中间层很快会失效。"
      ],
      sections: [
        {
          heading: "组件边界要从协议里长出来",
          paragraphs: [
            "如果 JSON 里已经有清楚的区块和组件，前端实现就更容易拆分。反过来，代码里的组件也可以反馈协议结构。"
          ],
        },
        {
          heading: "QA 是协议的一部分",
          paragraphs: [
            "响应式、无溢出、无控制台错误、交互状态完整，这些应该进入设计协议的验收层，而不是开发最后才想起。"
          ],
        },
        {
          heading: "工具链可以逐步闭环",
          paragraphs: [
            "从 AI 到 JSON，到白板，到技能，到前端，再到浏览器 QA，每一环都可以先做小，再逐步自动化。"
          ],
        },
      ],
    },
    {
      slug: "uixskills-experiment-positioning",
      title: "06 · 实验复盘：为什么它更像方法论产品",
      category: "产品复盘",
      excerpt: "UIXskills 不一定要立刻变成大 SaaS，它更适合作为 AI 设计课程和工具链实验基地。",
      tags: ["复盘", "方法论", "课程"],
      order: 6,
      body: [
        "UIXskills 的商业定位不应该急着变成通用设计平台。更现实的路线是作为个人方法论、课程样本和工具链实验基地。",
        "当方法论足够稳定，再把其中可复用的部分产品化，会比一开始就做大平台更稳。"
      ],
      sections: [
        {
          heading: "先服务自己的真实项目",
          paragraphs: [
            "个人站、产品落地页、App 截图和开发日记页面，都可以作为 UIXskills 的真实训练场。"
          ],
        },
        {
          heading: "方法论比功能更难复制",
          paragraphs: [
            "别人可以很快做一个生成页面工具，但很难复制一整套从需求、协议、白板、技能到 QA 的实践体系。"
          ],
        },
        {
          heading: "课程可以先于 SaaS",
          paragraphs: [
            "把流程讲清楚、写成案例、让用户先学会使用 AI 做设计，再决定哪些环节值得做成工具，是更自然的增长路线。"
          ],
        },
      ],
    },
  ]),
];

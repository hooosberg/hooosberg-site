import type { ArticleSeed } from "./articles";

type DiaryDraft = Omit<ArticleSeed, "date" | "productSlugs" | "seriesOrder"> & {
  order: number;
  date?: string;
};

const defaultDiaryStartUtc = Date.UTC(2026, 5, 20);
let defaultDiaryOffset = 0;

const nextDefaultDiaryDate = () => {
  const date = new Date(defaultDiaryStartUtc - defaultDiaryOffset * 24 * 60 * 60 * 1000);
  defaultDiaryOffset += 1;
  return date.toISOString().slice(0, 10);
};

const productSeries = (productSlug: string, items: DiaryDraft[]): ArticleSeed[] =>
  items.map(({ order, date, ...item }) => ({
    ...item,
    date: date ?? nextDefaultDiaryDate(),
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
      tags: ["Ollama", "模型接入"],
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
            "审核环境是 MacBook Pro (14-inch, Nov 2024)，Version reviewed 是 1.2.4。具体提交编号、完整原信和回复留在内部归档。"
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
    {
      slug: "witnote-swift-native-2-0-1-refactor",
      title: "08 · 2.0.1 重构：Swift 原生工作台与本地 MLX 架构",
      category: "架构实现",
      excerpt: "这次不是重新做一个 App，而是在原有 App Store 产品上完成一次 Swift 原生、端侧 AI 和工作台结构的系统重构。",
      tags: ["WitNote", "Swift 原生", "MLX", "重构", "App Store"],
      order: 8,
      date: "2026-08-05",
      body: [
        "WitNote 2.0.1 仍然沿用原有的 App Store 产品记录，但内部已经完成一次较大规模的 Swift 原生重构。重构的目标不是把功能做得更热闹，而是让 Markdown 写作、本地文件、格式转换、双语阅读和端侧 AI 重新回到同一条可解释的工作流里。",
        "这次发布也把工程验收和商店信息放在同一个发布门槛中：模型能否在干净 Mac 上工作、文件夹授权能否在重启后恢复、下载是否能取消并重新初始化、Lifetime 购买能否恢复、第三方模型许可是否随包说明，都会影响用户能否相信产品页上的承诺。"
      ],
      sections: [
        {
          heading: "Swift 原生工作台",
          paragraphs: [
            "应用界面使用 Swift 原生 macOS 结构重做，文件夹绑定、编辑器、预览、聊天、模型管理、格式转换和设置各自承担清晰职责。根目录授权不能只在首次选择时成功，还要考虑安全作用域书签、重启后的重新授权提示和用户可以主动重新绑定的恢复路径。",
            "这让 WitNote 更像一个可以长时间停留的桌面工作台，而不是把网页能力包进窗口。窗口生命周期、菜单、文件权限、取消操作和异常反馈都属于产品本身。"
          ]
        },
        {
          heading: "Markdown 与内容工作流",
          paragraphs: [
            "Markdown 文件仍然是内容的中心。文件夹和文稿列表负责组织，编辑区负责修改，预览和双栏目模式负责阅读，格式转换负责把内容交付到 PDF、Word、EPUB 或其他工作流。EPUB 和双语阅读是能力入口，但产品定位仍然是本地 Markdown 写作与知识工作区。",
            "内容处理尽量保持可追溯：用户选择文件和目录，应用在明确的权限边界内读取；导入、转换和导出不应该让用户失去原始文件的控制权。"
          ]
        },
        {
          heading: "本地 MLX 与模型管理",
          paragraphs: [
            "AI 路线采用本地 MLX 推理。安装包内置轻量 Qwen3 0.6B 4-bit 模型，让新用户可以先完成一次本地 AI 操作；其他模型按硬件建议和实际文件大小单独下载。模型选择会在聊天、双语翻译和其他 AI 入口之间同步刷新，下载成功或删除后不需要重启应用。",
            "模型下载器需要把真实的已接收字节数、速度、剩余时间、网络等待、取消、失败清理和重新初始化区分开。下载中断后重新下载必须清理不完整目录，避免把半成品误当作已安装模型。模型管理器也允许用户通过模型文件夹同步识别可用的本地模型，但不把外部模型的许可责任隐藏起来。"
          ]
        },
        {
          heading: "隐私、购买与第三方边界",
          paragraphs: [
            "本地文件和本地推理是默认边界；模型下载、Apple StoreKit、支持与法律页面，以及用户主动打开的外部链接才会按实际操作访问网络。Lifetime 购买由 Apple 处理，应用只根据 StoreKit 结果解锁并提供恢复购买，不接触 Apple ID 或付款信息。",
            "MLX、Qwen 和随后下载的模型不是 WitNote 自有资产。安装包提供第三方声明和内置模型的 LICENSE、NOTICE 文件；网站、应用内关于页面和商店材料都需要避免把模型来源、模型能力或云端服务说得比实际更强。"
          ]
        },
        {
          heading: "上架前的发布门槛",
          paragraphs: [
            "2.0.1 的最终门槛包括 1300/1300 自动测试、正式 Distribution 签名和固定 SHA-256、无开发工具与无缓存环境的首启和 AI 操作、Lifetime IAP 购买与恢复、12 种语言的关键页面、隐私与第三方许可、任务取消、内存表现和长文本表现。",
            "这些检查不是为了制造漂亮的发布数字，而是为了让官网、App Store 元数据和实际安装包说同一件事。不能在干净环境复现的本地 AI 能力，就不能作为已经交付的商店卖点；无法确认的性能，也不写成绝对承诺。"
          ]
        }
      ]
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
            "审核设备是 MacBook Pro (14-inch, Nov 2024)。具体提交编号、完整原信、第一次回复和第二次回复留在内部归档。"
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
            "Guideline 2.1：App 启动后显示空白页。Guideline 1.5：Support URL 指向 GitHub Issues，不是用户可用的支持信息网页。完整原文留在内部归档。"
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
        "根因很朴素：我们把 App 内付费墙截图误上传到可选 Promotional Image，而不是只放在 Review Information 里。最后选择不公开推广这个 IAP，从 ASC 清除 Promotional Image，回复说明后继续审核。"
      ],
      sections: [
        {
          heading: "Apple 原文要点",
          paragraphs: [
            "Guideline 2.3.2 - Accurate Metadata：Apple 认为要展示在 App Store 上的 promotional image 没有充分代表对应的 promoted In-App Purchase 或 win-back offer。",
            "具体问题是促销图来自 App 内截图。审核设备是 MacBook Air (15-inch, M3, 2024)，具体提交编号留在内部归档。"
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
          heading: "拒审记录要进入发布复盘",
          paragraphs: [
            "这次复盘最重要的不是把一封信处理完，而是把 Apple 的原始问题、修复映射、验证截图、回复草稿、重提状态都整理成发布复盘。下一个 AI、语音、情绪或 IAP 产品遇到类似问题时，可以直接复用这套检查表。",
            "官网上不应该把这种状态藏起来。未上架时显示“App Store 即将上架”，2026-06-26 上架后就把主入口切到真实 App Store；开发日记继续公开写清楚被拒原因、修复路径和处理经验。真实进度本身就是产品信任的一部分。"
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
        "本轮资料里没有找到 Rushi 被拒审的原信；相反，发布复盘把它作为 DrowseBook 的对照案例：Rushi 选 Lifestyle，通过工具定位和来源说明降低了 China mainland 内容风险。",
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
            "Rushi 的审核备注写清楚：除 Apple StoreKit 等系统购买与恢复流程外，没有自有账号、广告、分析 SDK、第三方追踪或开发者云端抄经服务；书签、计数、设置和抄写内容只保存在本地。",
            "这类内容产品最怕一句笼统的“不收集数据”。越简单，越要把简单具体化，让隐私政策、App Privacy 问卷和代码行为互相对得上。"
          ],
        },
        {
          heading: "不要把通过当成判例",
          paragraphs: [
            "Rushi 的通过经验可以复用的是方法：Lifestyle 类目、工具定位、来源透明、基础功能免费、抄经书法练习一次买断、无订阅 / 广告 / 账号 / 第三方追踪、iPhone 与 iPad 真实适配，以及审核备注解释。不能复用的是侥幸感。",
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
  ...productSeries("docktouchbar", [
    {
      slug: "docktouchbar-why-another",
      title: "01 · 立项：为什么要再做一个 Touch Bar 上的 Dock",
      category: "产品复盘",
      excerpt: "现成的 Touch Bar Dock 工具都能用，但都不够稳。DockTouchBar 反过来：只做一件事，把稳定放在第一位。",
      tags: ["立项", "Touch Bar", "简洁"],
      order: 1,
      date: "2026-09-25",
      body: [
        "我的 MacBook Pro 13 英寸带一条 Touch Bar。用得最多的其实只有一件事：让它一直显示 Dock 里的 App，点一下就切过去。听起来很简单，但我试过的几个现成工具，包括 Pock 和它的第二版，都能做到，却都不够稳：用着用着 Touch Bar 上的内容消失了，或者点了没反应，系统更新之后还可能整个失效。",
        "问题不在于它们做得不好，而在于它们做的事情太多：天气、音乐、电量、各种小组件和插件，而我只需要其中的一件。所以这个项目的起点不是“做一个更强的 Pock”，而是反过来：只做这一件事，并且把稳定放在第一位。"
      ],
      sections: [
        {
          heading: "目标：只做一件事，并且做稳",
          paragraphs: [
            "写下来的目标只有五条。只做一件事：显示 Dock 里的 App，点击切换，不做小组件。稳定：睡眠唤醒、锁屏解锁、系统的 Touch Bar 进程重启之后能自己恢复，系统接口变了也不能崩。高效：空闲时不占 CPU，不轮询。原生：Swift 加 AppKit，没有第三方依赖。能分发：必要时可以打包给别人用，但不要求上 App Store。",
            "这五条里，“稳定”和“高效”是我对现有工具最直接的不满，也是后面每一个技术决定的判断标准。"
          ],
        },
        {
          heading: "简洁、优雅、高效：判断要不要加功能的三个词",
          paragraphs: [
            "做了一段时间之后，我把这个软件的特点归纳成三个词：简洁、优雅、高效。它们不是宣传语，而是每次遇到“要不要加这个功能”时用来判断的标准。",
            "简洁：只做 Touch Bar 上的 Dock，不做小组件和插件，设置只有菜单里的几个开关。后来我把 Touch Bar 最右边一个“收起十秒”的按钮也去掉了，因为菜单里已经有开关，不必再占一块地方。优雅：外观和行为向系统 Dock 看齐，图标顺序、运行中的小圆点都和 Dock 一致，用系统自带的控件，不自己造。高效：事件驱动，没有任何定时轮询，空闲时什么都不做。"
          ],
        },
        {
          heading: "明确不做什么",
          paragraphs: [
            "同样重要的是不做什么。天气、音乐、电量这类小组件不做；不上架 Mac App Store，因为要用私有接口；不做窗口缩略图和按窗口切换，那是 AltTab 这类工具的事；也不自己实现亮度和音量控制，系统控制条和控制中心已经有了。",
            "把“不做”的清单写下来很有用：后面每次想往里加东西，先回来对照一遍，多数时候答案就是不加。"
          ],
        },
        {
          heading: "使用环境：这台机器上的设置，决定了后面很多发现",
          paragraphs: [
            "开发和实测都在同一台机器上：MacBook Pro 13 英寸（M1，型号 MacBookPro17,1），macOS 27.0，单显示器，3 个桌面。有几项设置会直接影响行为：Touch Bar 设成“展开的控制条”，开着台前调度，系统里“切换到有该 App 窗口的空间”保持默认。",
            "这些设置后面每一个都出现过：Touch Bar 的显示模式决定了只能用占满整条的方式显示，台前调度让最小化窗口的方案失效，桌面切换的那项设置则让我发现系统只对用户亲手的点击生效。把环境写下来，才知道哪些结论是普遍的，哪些只在这台机器上成立。"
          ],
        },
        {
          heading: "和 AI 编程助手一起做：先验证，再动手",
          paragraphs: [
            "整个项目是和 Claude Code 协作完成的。这里有一个我觉得值得记下来的做法：没有让 AI 一上来就写一个完整的 App，而是先让它做调研和可行性验证，确认“后台 App 能不能让 Touch Bar 常驻显示”这个最大的不确定性，再开始写正式的代码。这一步的过程放在下一篇。"
          ],
        },
        {
          heading: "需求是怎么一步步加出来的",
          paragraphs: [
            "需求不是一次定下来的，而是在使用中逐步补充。先是常驻显示 Dock 里的 App，点击切换，做成一个能在菜单里开关的菜单栏 App；接着是窗口在别的桌面时，点击应该切到那个桌面；然后是长按退出、双击隐藏；再然后去掉 Touch Bar 最右边的按钮；最后是打包成 DMG，整理说明和文档。",
            "每一步都对应开发日记里的一篇，也都是先有一个具体的使用场景，再决定做不做、怎么做。"
          ],
        }
      ],
    },
    {
      slug: "docktouchbar-feasibility",
      title: "02 · 可行性验证：私有接口在这台机器上还在不在",
      category: "架构实现",
      excerpt: "让后台 App 常驻 Touch Bar 只能用私有接口。动手写产品之前，先在本机验证它们还在，并且踩到第一个“状态说谎”的坑。",
      tags: ["可行性", "私有 API", "Touch Bar"],
      order: 2,
      date: "2026-09-25",
      body: [
        "决定要做之后，第一件事不是写代码，而是回答两个问题：现成的项目到底怎么样，以及我需要的能力在这台机器上还能不能用。",
        "第二个问题尤其关键。让一个后台 App 在 Touch Bar 上常驻显示，公开的 API 做不到，只能用 Apple 的私有接口。私有接口随时可能被系统更新拿掉，所以必须先在自己的机器上验证，而不是想当然。"
      ],
      sections: [
        {
          heading: "现有项目：没有一个能放心推荐",
          paragraphs: [
            "只做“Touch Bar 上显示 Dock、点击切换”的项目有几个。TouchSwitcher 最接近，但它闭源，而且要先点一下入口才显示，并不常驻；MTMR 开源，配置里有 dock 类型，但很久没有更新；EnergyBar 是 Objective-C 写的，同样多年没有更新；还有几个是 Pock 的 fork。Pock 和 PockV2 功能最全，是插件化架构，也正是我用下来不稳定的那个。",
            "结论是：没有能放心推荐的现成方案，值得自己做一个。"
          ],
        },
        {
          heading: "它们为什么不稳定",
          paragraphs: [
            "搞清楚这一点，就知道自己做的时候要避开什么。第一，公开 API 做不到：NSTouchBar 只在自己的 App 位于前台时才显示，后台常驻只能调私有接口。第二，系统会把自定义的 Touch Bar 收回去：睡眠唤醒、锁屏解锁、系统的 Touch Bar 进程重启之后都会发生，没处理全，表现就是“用着用着消失了”。",
            "第三，切换 App 会被系统拦：macOS 14 起激活规则改成协作式，后台进程发起的激活可能被忽略，表现就是“点了没反应”。第四，架构负担：插件化、小组件多，每次系统更新都容易出兼容问题。"
          ],
        },
        {
          heading: "在本机验证私有接口",
          paragraphs: [
            "我先写了一个探针，在本机逐个检查需要的接口：显示一条 Touch Bar、撤下、在控制条里放一个入口按钮、让入口常驻、隐藏左侧的关闭按钮。这几项都在。同时也发现，旧的方法名 presentSystemModalFunctionBar 已经被系统移除了，只调用这个名字的项目会直接失效，这正是这类工具会突然“坏掉”的一个真实例子。",
            "然后我用一个最小的程序真的往 Touch Bar 上放了一个按钮，并用 screencapture -b 这条能截取 Touch Bar 的命令确认。结果是：把 placement 设为 1（占满整条）能正常显示；设为 0 时，在“展开的控制条”这个显示模式下完全不显示，而 isVisible 却仍然返回 true。这个“状态说谎”的发现，直接决定了后面不能靠 isVisible 去判断 Touch Bar 有没有真的显示出来。"
          ],
        },
        {
          heading: "分发：App Store 不行，DMG 可以",
          paragraphs: [
            "私有接口过不了 App Store 审核，而且沙盒里读不到 Dock 的配置，所以 Mac App Store 这条路是断的。App Store 之外可以正常分发：用 Developer ID 证书签名并公证之后，别人下载双击就能打开，Pock 和 MTMR 也都是这样发的。这个结论一开始就定下来，后面就不会在“要不要上架”上反复。"
          ],
        },
        {
          heading: "探针留了下来",
          paragraphs: [
            "这个探针后来没有丢掉，整理成了项目里的诊断工具：每次 macOS 大版本更新之后先跑一次，它会列出用到的每一个私有接口还在不在，还会顺带打印 Touch Bar 显示模式、台前调度这些会影响行为的设置。哪一项变成了缺失，对应的功能就会在 App 里自动关闭，而不是崩溃。",
            "还有一个细节：收起 Touch Bar 之后，它会回到系统控制条，这时 isVisible 变成 false；而在“展开的控制条”模式下，控制条里看不到我们放的入口按钮。这也是早期版本里做过一个“收起十秒后自动恢复”按钮的原因，后来它被去掉了，改成从菜单开关。"
          ],
        },
        {
          heading: "小结：可行，并且有一个必须记住的坑",
          paragraphs: [
            "可行性验证的结论是三句话：技术上可行；有一个必须记住的坑，isVisible 不可信；分发走 DMG。这一步很短，但避免了最糟的情况：写了一大堆代码，最后才发现关键接口在这个系统上根本不存在。"
          ],
        }
      ],
    },
    {
      slug: "docktouchbar-tech-choices",
      title: "03 · 技术选型：让系统更新后的最坏结果只是“功能不可用”",
      category: "架构实现",
      excerpt: "Swift 加 AppKit，私有接口运行时解析，事件驱动刷新。每个选择都回答同一个问题：怎样让最坏的结果不是 App 打不开。",
      tags: ["选型", "AppKit", "架构"],
      order: 3,
      date: "2026-09-25",
      body: [
        "这个项目的技术选型没有一条是想当然，每一条都要回答：有哪些选项、选了什么、为什么。下面按重要程度讲最关键的几条。",
        "共同的原则只有一个：让系统更新之后的最坏结果是“某个功能不可用”，而不是“App 打不开”。"
      ],
      sections: [
        {
          heading: "语言和界面：Swift 加 AppKit",
          paragraphs: [
            "SwiftUI 的 touchBar 修饰符只作用于自己窗口里获得焦点的视图，做不了后台常驻，底层还是要回到 AppKit。Electron 之类的跨平台方案对 Touch Bar 的支持也只限于自己的窗口，体积和内存都不符合“高效”。Objective-C 调私有接口更顺手，但项目其余部分用 Swift 更安全，Swift 调私有接口的写法也并不复杂。"
          ],
        },
        {
          heading: "私有接口：运行时解析，而不是链接",
          paragraphs: [
            "C 函数用 dlopen 加 dlsym，类方法用 class_getClassMethod 和 responds(to:)。缺了哪个，对应功能就关闭，App 照常运行。反过来，如果直接链接私有框架，系统删掉任何一个符号，App 启动时动态链接器就会报错退出。",
            "前者最坏的结果是菜单里显示“当前系统不支持”，后者是 App 打不开。这是“稳定”这个目标里最重要的一条。"
          ],
        },
        {
          heading: "显示方式和列表控件",
          paragraphs: [
            "显示方式固定用 placement 为 1（占满整条），原因就是上一篇发现的：0 在“展开的控制条”模式下不显示，而且没法自动检测。列表用 NSScrubber，它是 Touch Bar 原生的可滚动列表，自带惯性滚动，能区分点按和滑动，还能复用视图。用 NSScrollView 加按钮也能做，但点按和滑动的区分、惯性都要自己处理，手感就不像系统的 Dock 了。",
            "NSScrubber 有个小坑：点已经选中的项不会再次回调，所以每次选中后要立刻把选中态清掉，点击时的高亮由图标视图自己来画。"
          ],
        },
        {
          heading: "刷新：事件驱动，不轮询",
          paragraphs: [
            "Dock 里固定的 App 读 com.apple.dock 的 persistent-apps；正在运行的 App 用 NSWorkspace 的运行列表，对它做 KVO 监听启动和退出，再加上前台 App 变化的通知。多次变化合并到下一轮 run loop，只刷新一次。",
            "如果只是运行状态变了，就原地更新小圆点，不重建列表，也就不会打断当前的滚动位置；图标位置变了才重新载入。图标按 Touch Bar 需要的尺寸栅格化一次后缓存。整个过程没有任何定时器，所以空闲时不占 CPU。"
          ],
        },
        {
          heading: "恢复：只在已知事件之后，不定时抢回",
          paragraphs: [
            "睡眠唤醒、屏幕唤醒、会话切回、屏幕解锁、控制条进程重启，这几个事件之后系统会收回自定义的 Touch Bar。我在事件发生一秒后重新挂上，多个事件合并成一次。控制条进程重启的检测很朴素：它在运行中的 App 列表里，进程号变了就说明重启过。",
            "我没有做“看不见就抢回来”的定时检查。一是 isVisible 本身不可信；二是这样会和截屏工具、Siri 这类同样要用 Touch Bar 的系统功能打架，这正是这类工具不稳定的常见原因。"
          ],
        },
        {
          heading: "工程形式和语言",
          paragraphs: [
            "工程用 Swift Package 加 shell 脚本打包：全是纯文本，好对比，Xcode 也能直接打开。代价是 SwiftPM 不会生成 .app，要由脚本拼装二进制、Info.plist、图标再签名。界面文字只有中文和英文两种，直接写成 L10n.tr(中文, English) 的一对，不走 lproj 那一套，这样可以在菜单里单独选语言，改完不用重启。"
          ],
        },
        {
          heading: "登录启动和打包",
          paragraphs: [
            "登录时自动启动用 macOS 13 起提供的 SMAppService，一行代码注册，出现在系统设置的登录项里。比自己写 LaunchAgent 简单，也不会留下残留文件。最低系统版本因此定为 macOS 13。",
            "打包用系统自带的 hdiutil：DMG 里放 App 和一个指向应用程序文件夹的快捷方式，拖一下就装好。第三方的美化工具能做背景图和图标布局，但要额外的依赖，对一个自用起步的小工具不值得。"
          ],
        }
      ],
    },
    {
      slug: "docktouchbar-gestures",
      title: "04 · 手势：单击、双击、长按，怎样做到不卡、不误触",
      category: "设计系统",
      excerpt: "单击不等双击，长按用可以反悔的红色进度条。手势看起来简单，边界情况其实最多。",
      tags: ["手势", "优雅", "交互"],
      order: 4,
      date: "2026-09-25",
      body: [
        "Touch Bar 上一个图标要承担三种操作：切换、隐藏、退出。看起来只是三个手势，但手势的边界情况最多，也最容易做出“手感不对”的软件。",
        "这一篇讲三个手势各自怎么设计，以及其中一个原计划没做成的功能。"
      ],
      sections: [
        {
          heading: "单击和双击：第一下不等第二下",
          paragraphs: [
            "常见的做法是等一小会儿，看有没有第二下再决定是单击还是双击，代价是每次单击都会延迟零点几秒。DockTouchBar 反过来：第一下照常切换，不等待；如果同一个图标在很短的时间内再点一次，第二下就隐藏它。双击的净效果是“切过去再藏起来”，而单击没有任何延迟。",
            "双击的第二下会稍等一点点再执行隐藏。原因是第一下刚发出激活请求，如果目标 App 在隐藏之后才处理这个请求，它会又被显示出来。"
          ],
        },
        {
          heading: "长按：可以反悔的进度条",
          paragraphs: [
            "长按用来退出 App，这是最危险的操作，所以设计成“可以反悔”。按住约零点三五秒之后，图标变暗，下方出现一条红色进度条，走满才真正退出；中途松手，就当作一次普通单击；手指滑开，就当作是在滚动列表，取消。时长可以在菜单里选 1、2、3、5 秒，也可以关掉。",
            "技术上，长按是挂在 NSScrubber 上的 NSPressGestureRecognizer，只接受直接触摸，并且和 scrubber 自己的滑动、点按同时识别，不去抢它的触摸。访达不能被退出，所以长按访达不会出现进度条。"
          ],
        },
        {
          heading: "边界情况：写文档时对照代码才发现的",
          paragraphs: [
            "第一个边界：长按中途松手时，NSScrubber 不一定会回调选中，因为手势已经被识别了。如果不处理，就会出现“按得稍久一点就点不动”。解法是松手后等一小会儿，没收到回调就自己补一次点击。",
            "第二个边界是写文档、对照代码时才发现的：长按退出一个没有固定在 Dock 里的 App，它的图标会消失，后面的图标往前挪，正在进行的按压记录随之作废。松手时手指下面已经是相邻的另一个图标，有可能被误当成点击。修复是加了一个“手指抬起之前忽略点击”的标记。"
          ],
        },
        {
          heading: "手感参数：都很小，都为了同一件事",
          paragraphs: [
            "手感靠几个很小的数字决定：按住 0.35 秒之后才开始出现长按进度条，比这更短的按压都当作点击；双击的两下之间最多隔 0.35 秒；手指移动超过 10 个点，就认为是在滑动，取消长按；松手之后等 50 毫秒，没收到选中回调再补一次点击；长按完成之后，直到手指抬起再过 0.3 秒，都忽略选中回调。",
            "这些数字每一个都是为了同一件事：让误触更少，让反悔更容易。它们不是一次定准的，而是在使用中一点点调出来的。"
          ],
        },
        {
          heading: "手势之外：反馈和防误触",
          paragraphs: [
            "点击时图标会短暂高亮一下，这个反馈由图标视图自己来画，而不依赖 scrubber 的选中态，因为选中态每次都要立刻清掉，连续点同一个图标才能再次触发。只有正在运行的 App 才会出现长按进度条，没在运行的图标，松手后照常当作点击。",
            "当 App 启动或退出导致图标位置变了，正在进行的长按会被作废，避免退出错的 App。另外整个软件只允许运行一个实例，两个实例会互相抢 Touch Bar，后启动的那个会自己退出。",
            "把三个手势都做成可开关、可调时长，是为了让每个人可以把它收得更简洁：不喜欢双击隐藏的人关掉它，双击就等于两次单击；不想要长按退出的人把时长设成“不启用”，长按就只算单击。"
          ],
        },
        {
          heading: "没做成的：双击最小化",
          paragraphs: [
            "双击原本的需求是“缩小”，也就是最小化窗口。实测发现：开着台前调度（Stage Manager）时，用辅助功能把窗口的 AXMinimized 设为 true，接口返回成功，窗口却纹丝不动；改成按窗口上的最小化按钮，同样返回成功、同样无效；换成系统自带的计算器，结果一样。",
            "最后改成隐藏，也就是等同 ⌘H。它在任何设置下都有效，也不需要任何权限，效果和“缩小”很接近。这里还有一个小细节：隐藏接口的返回值不可靠，窗口明明已经隐藏了，它仍然可能返回失败，所以代码不看返回值。如果以后要支持最小化，只能针对关闭了台前调度的系统做成可选项。"
          ],
        }
      ],
    },
    {
      slug: "docktouchbar-cross-desktop",
      title: "05 · 跨桌面切换：为什么后台 App 切不了桌面",
      category: "架构实现",
      excerpt: "系统只在你亲手点 Dock 时才会切到 App 所在的桌面。后台工具要自己找到那个窗口，把它提到最前面。",
      tags: ["跨桌面", "辅助功能", "私有 API"],
      order: 5,
      date: "2026-09-26",
      body: [
        "用了一段时间之后，遇到一个很具体的问题：浏览器的窗口在桌面 3，我人在桌面 2，点 Touch Bar 上的浏览器图标，应该像点系统 Dock 一样切到桌面 3，而不是只把浏览器变成前台，自己还停在原地。",
        "这件事看起来应该是系统自带的能力，实测却不是。这一篇记录怎么一步步查清楚，以及最后的解法。"
      ],
      sections: [
        {
          heading: "先弄清楚系统到底做了什么",
          paragraphs: [
            "系统设置里有一项“切换到某个应用时，切换到包含该应用打开窗口的空间”，默认是开着的。但实测它只在用户亲手点 Dock 或者按 ⌘Tab 时生效。后台 App 用 openApplication 或者 activate 发起的激活，只会让目标 App 变成前台，桌面不动。",
            "在我的机器上有 3 个桌面，浏览器的窗口在最后一个，当前在中间那个。我逐个方法试，结果如下：openApplication 和 activate，浏览器变成前台但桌面不动；只用私有接口把窗口设为前台并发送关键窗口事件，同样桌面不动；再加上辅助功能的 Raise，才真正切到了窗口所在的桌面，反过来也能切回来。"
          ],
        },
        {
          heading: "解法：设为前台加辅助功能 Raise",
          paragraphs: [
            "最终的做法和 AltTab 相同：当目标 App 在当前桌面没有窗口、但在别的桌面有窗口时，找到最靠前的那个窗口，先用 SkyLight 里的私有接口把它设为前台窗口，再用辅助功能的 AXRaise，系统随之切到那个桌面。找窗口时，最小化的窗口不属于任何桌面，会被跳过，交给普通的启动流程去还原。",
            "整个流程放在后台队列里，辅助功能调用设置一秒超时，目标 App 卡死时不会拖住 Touch Bar。没有辅助功能权限，或者任何一步失败，都退回普通的切换，只是不切桌面。所以这个权限是可选的。"
          ],
        },
        {
          heading: "最难的一个坑：别的桌面上的窗口，标准接口看不到",
          paragraphs: [
            "辅助功能的标准接口只返回当前桌面上的窗口。我去查那个在桌面 3 的浏览器窗口，得到的是 0 个。解决办法还是参考 AltTab：用一个私有的构造函数，按元素编号 0 到 999 逐个构造辅助功能元素，再用另一个私有函数把元素对上窗口编号。实测大约 60 到 80 毫秒，点击时感觉不到延迟。",
            "这也解释了为什么这类功能很少有人做：它同时依赖两个私有接口，加上一个很不直观的枚举技巧。"
          ],
        },
        {
          heading: "决策流程：什么时候走这条路",
          paragraphs: [
            "点击一个图标时，程序按这样的顺序判断：如果 App 没在运行，或者已经被隐藏，就走普通的启动或显示；否则按窗口所属的桌面编号，把它的候选窗口排好序，当前（或正在去的）桌面上的在前，别的桌面上的在后，最小化的窗口不属于任何桌面所以不算，选出第一个真实窗口，设为前台再 Raise；没有辅助功能权限，或者任何一步失败，就退回普通启动。这个判断最早是“先看当前桌面上有没有窗口，有就普通激活”，后来因为连点会失效，改成了现在这样，原因见第 08 篇。"
          ],
        },
        {
          heading: "测试方法：只在你没动键鼠的时候测",
          paragraphs: [
            "切换类测试有一个特殊的难处：它会真的改变你屏幕上的桌面和前台 App，而你的操作反过来又会干扰测试结果。有一次测出“切到了桌面 4、前台是另一个无关的 App”，和别的结果矛盾，原因是测试时我正在用电脑。",
            "之后我给所有切换类测试加了一道门槛：用户停手 8 秒才开始，测试中一有键盘鼠标输入，这一轮就作废；每一步都切回原来的 App 和桌面。测试用的临时 App，也是专门编译的，不去碰正在使用的窗口。后来还发现，只看系统的“键鼠空闲时间”并不可靠，程序自己的动作也会把它清零，这个坑记在第 08 篇里。"
          ],
        },
        {
          heading: "这一篇的经验：先做实验，再动手实现",
          paragraphs: [
            "遇到“系统应该会做”的事，先做一个最小的实验，确认系统到底做不做，再决定要不要自己实现。如果一开始就假设 openApplication 会切桌面，我会在一个错误的前提上写很多代码；实际上几个小实验就把这条路排除了，剩下的才是真正需要写的部分。"
          ],
        },
        {
          heading: "用到的私有接口，以及缺了怎么办",
          paragraphs: [
            "这条路用到七个私有接口：SkyLight 里的获取连接、查询窗口所在桌面、把窗口设为前台进程和投递事件记录，以及获取进程序列号、按窗口编号取辅助功能元素、按编号构造元素。它们都在运行时解析，缺了任何一个，整条路就关闭，退回普通切换。"
          ],
        }
      ],
    },
    {
      slug: "docktouchbar-black-screen-and-testing",
      title: "06 · 踩坑与验证：Touch Bar 是黑的，是 bug 还是熄屏",
      category: "AI 工作流",
      excerpt: "自己摸不到 Touch Bar，也没法自动点按。一次“黑屏”误判，让我学会先看键鼠空闲时间，再怀疑代码。",
      tags: ["测试", "踩坑", "验证"],
      order: 6,
      date: "2026-09-26",
      body: [
        "这个项目最特别的测试难点是：我没法自动在 Touch Bar 上点按、长按、滑动，它还会在空闲一段时间后熄灭，熄灭时用截图命令截到的是全黑。",
        "这一篇先讲一次很有代表性的误判，再讲最后形成的三层验证方法。"
      ],
      sections: [
        {
          heading: "一次黑屏误判",
          paragraphs: [
            "第一版做好之后，运行，截图，Touch Bar 是全黑的，连右边的按钮都没有。我先加日志，发现菜单项创建了、isVisible 是 true、列表里有 22 个图标，一切正常；怀疑布局约束冲突，把宽度改小、只留一个按钮，还是黑的。",
            "直到我重新运行第一阶段那个确定能显示的探针，它也是黑的。那一刻才意识到问题不在代码。什么都不运行直接截图，同样全黑；读取键鼠空闲时间，已经三百多秒没有输入，Touch Bar 熄灭了。后来又发现屏幕其实已经锁了。",
            "我还试过让它亮起来：用 caffeinate 保持唤醒，用合成的鼠标移动和 Shift 键事件，都没用。合成事件不会重置系统的键鼠空闲时间，Touch Bar 只认真实的输入。"
          ],
        },
        {
          heading: "这次误判留下的好处",
          paragraphs: [
            "这次误判浪费了不少时间，但也留下一个好处：因为第一阶段的探针是保留下来的，我才能立刻拿它做对照。这就是“先做最小探针”的价值，它不只是用来验证可行性，之后每一次“是不是代码的问题”，都可以先用它来排除。"
          ],
        },
        {
          heading: "三层验证：能自动测的自动测，能离屏看的离屏看，其余人工",
          paragraphs: [
            "第一层是自动测：私有接口探针检查接口是否都在，读取台前调度、Touch Bar 显示模式等相关设置；切换、隐藏、退出这些行为，用测试 App 和系统计算器实测，不碰用户正在用的窗口。",
            "第二层是离屏看：写了一个渲染工具，用 App 自己的界面代码，把 Dock 画进一个 1004 乘 30 点的离屏窗口，再存成图片，完全不依赖 Touch Bar 是否亮着。README 里的示意图，也是用它渲染的，示例用的是系统自带的 App，不含任何个人信息。",
            "第三层才是人工：单击、双击、长按的手感，睡眠唤醒和解锁之后自动恢复，这些只能真的去按、去合盖，写成一份发版前的检查清单，每次发版过一遍。"
          ],
        },
        {
          heading: "用辅助功能读自己的菜单",
          paragraphs: [
            "想知道菜单栏里到底显示了什么，不必截图。用辅助功能接口读 App 自己的菜单：找到状态栏图标，按下，逐项读出标题、勾选状态和子菜单，还可以用同样的方式点“English”“关于”。中英文两套菜单标题，就是这样一项项核对的，测完再切回“跟随系统”。"
          ],
        },
        {
          heading: "教训：先看空闲时间，再怀疑代码",
          paragraphs: [
            "以后遇到 Touch Bar 上什么都看不到，我的第一步是读键鼠空闲时间，其次确认屏幕有没有锁，最后才去查代码。一个已知能显示的最小探针是最好的对照：它也是黑的，就说明不是新代码的问题。",
            "还有一处截图看不到的地方：左边的 Esc 键。截图命令截不到 Esc 那一块，所以“Esc 是否照常工作”只能靠实机使用来确认，我把它放进了发版前的人工检查清单。",
            "自动化测试也有边界：能在没有 Touch Bar 亮着的情况下验证的，是接口是否存在、逻辑是否正确、界面版式是否正确；验证不了的，是真实的手感。诚实地把这两类分开，比假装全部自动化了更可靠。"
          ],
        },
        {
          heading: "其他值得记下来的坑",
          paragraphs: [
            "开着台前调度时，用截图命令去截一个新开的窗口，可能截到的是侧边栏里被缩小、倾斜的缩略图，要先确认窗口在前台再截。SwiftUI 的离屏渲染器画不出链接控件，会显示成黄色的禁止标志，而且因为没有 App 包，版本号显示成 dev，这两处都是渲染器的限制，不是 App 的问题。",
            "报内存要用 footprint，而不是 RSS：ps 里看到的常驻内存是 103 MB，但里面包含了 AppKit 等系统库的共享页面，App 独占的物理内存只有 35 MB。还有一个：符号链接的 App，比如 Safari，直接取图标会带一个替身小箭头，取图标前要先解析成真实路径。"
          ],
        }
      ],
    },
    {
      slug: "docktouchbar-release-notarization",
      title: "07 · 发布：签名、公证，以及二进制里差点带出去的本机路径",
      category: "App Store",
      excerpt: "辅助功能权限绑定在签名上，公证要保存凭据，发布前还要检查二进制里有没有带出你的用户名。",
      tags: ["签名", "公证", "发布"],
      order: 7,
      date: "2026-09-26",
      body: [
        "写代码只是发布前的一半。要让别人放心地下载、双击就能用，还需要签名、公证，以及一轮很容易被忽略的隐私检查。",
        "这一篇把发布链路上踩到的三个坑放在一起：权限跟着签名走、公证凭据、二进制里的本机路径。"
      ],
      sections: [
        {
          heading: "权限跟着签名走：开关开着却不生效",
          paragraphs: [
            "辅助功能权限是绑定在 App 的签名上的。用临时签名（ad-hoc）重新编译，每次都会被系统当成一个新 App，权限失效；换一张签名证书，也一样。所以我把打包脚本固定成按顺序选证书：Developer ID、开发证书、最后才是临时签名，让本机安装和发布用的是同一个签名。",
            "还遇到过一次很迷惑的现象：系统设置里 DockTouchBar 的开关是开着的，菜单里却仍然提示“需要授权”。排查发现，运行的和安装的是同一个版本、同一个签名，把 App 彻底退出再打开也一样，说明不是“授权后要重启”，而是系统对这个签名的回答就是“没授权”。原因是旧记录是用另一张证书授权的，列表里那一行看起来开着，其实对不上新签名。用 tccutil 把旧记录清掉，重新授权，问题就解决了。",
            "这件事还带来一个界面上的教训：原来授权之后，这一项菜单会直接隐藏，用户看不到“有没有生效”，还以为选项没了。后来改成始终显示，有权限时打勾。状态类的设置，应该显示状态，而不是在满足条件时消失。"
          ],
        },
        {
          heading: "公证：先 App，后 DMG，凭据只能自己输入",
          paragraphs: [
            "公证分两步：先把 App 压成 zip 提交，通过后装订到 App 上；再做成 DMG，签名后再提交、装订。这样 App 从 DMG 里拖出来之后，离线也能通过系统检查。脚本会先确认凭据可用，不可用就立刻报错，不会等编译完了才发现。",
            "保存凭据的过程有两个坑。第一，notarytool 的第一个问题是“API 私钥的路径”，用 Apple ID 的方式要直接回车留空，我一开始把 Apple ID 填在了这一行。第二，连续两次报 401：一是团队对应的是一个个人开发者账号，用的邮箱不是注册它的那个；二是 App 专用密码必须由同一个 Apple ID 生成。换成对的账号重新生成，才保存成功。",
            "还有一条原则：App 专用密码属于凭据，只能直接输入到终端里，不要贴到聊天或文件里。一旦出现在别的地方，就当作泄露，立刻作废重建。AI 助手能做的，是准备好脚本和验证流程；输入密码这一步，必须由本人来。",
            "验证结果：App 和 DMG 各提交一次，都是通过，都装订并验证成功。我把 App 从 DMG 里复制出来，再加上“来自网络”的隔离标记，系统检查仍然显示“已公证的开发者 ID”。"
          ],
        },
        {
          heading: "差点公开出去的：二进制里的本机路径",
          paragraphs: [
            "公开仓库之前，我对暂存区做了一轮安全检查：证书名、团队 ID、邮箱、本机路径、密码和密钥关键字，都是空的。但检查刚打好的 DMG 里的二进制时，发现了一个 strings 命令搜不到的问题：用 nm 看符号表，里面有调试映射条目，写着编译这台机器上的完整源码路径，包括用户名和项目文件夹的名字。",
            "如果不处理，这些路径会随着 DMG 一起公开。修复很简单，在签名之前对二进制执行一次去除调试符号，这也让文件更小。因为二进制变了，需要重新编译、重新公证。复查时，从 DMG 里取出的 App，原始字节里的用户名、项目目录名、邮箱全部是零命中，符号表里也是零，整个 App 包扫描也是空的。",
            "公开仓库的提交身份也要留意：用 GitHub 提供的 noreply 邮箱，而不是真实邮箱；最后再对全新克隆的仓库做一次扫描，包括整个 git 历史。教训是：发布二进制之前，要检查二进制本身，而不只是源码。"
          ],
        },
        {
          heading: "DMG：系统自带的工具就够",
          paragraphs: [
            "DMG 里放 App 和一个指向应用程序文件夹的快捷方式，用系统自带的 hdiutil 生成，DMG 本身也要签名。macOS 27 上 hdiutil 会提示“已弃用，请改用 diskutil image”，但仍然可用；为了兼容更早版本上的构建，暂时没有更换。"
          ],
        }
      ],
    },
    {
      slug: "docktouchbar-rapid-click-race",
      title: "08 · 连点为什么会失效：从“等 0.62 秒”到“看结果”",
      category: "架构实现",
      excerpt: "慢点点没问题，来回连点就不起作用。这是一个和动画有关的竞态：先复现，再分层找根因，最后从固定等待改成“看结果”。",
      tags: ["跨桌面", "竞态", "验证"],
      order: 8,
      date: "2026-09-26",
      body: [
        "实机用了一段时间之后，出现了一个很有代表性的反馈：慢一点点，切桌面都正常；点得快一点、来回连点，就容易“不起作用”。这种“和速度有关”的问题，八成是竞态，而不是性能。",
        "这一篇把整个排查和重写的过程放在一起：怎样先复现，根因分了哪两层，为什么“固定等 0.62 秒”虽然有效却不是好办法，最后怎样改成“看结果”，以及测试本身踩了哪些坑。"
      ],
      sections: [
        {
          heading: "先复现：连点压力测试",
          paragraphs: [
            "我先写了一个压力测试：在窗口分别在两个桌面的两个 App 之间，用真实的切换入口来回快速点击，依次点 B、A、B、A、B，最后应该停在 B 的桌面上。测试时把正在运行的 DockTouchBar 暂停，免得我自己在 Touch Bar 上的点击搅乱结果。",
            "复现出来了：点击间隔 400 毫秒时 2/4 次正确，250 毫秒时 0/4，150 毫秒时 0/1。再把每次点击时程序看到的状态和做的决定记进日志：第一下点 B，约 110 毫秒时已经请求系统切桌面；第二下点 A（约 300 毫秒）时，程序读到的“当前桌面”还是旧的，A 的窗口也“看得见”，于是判断“已经在这个桌面了”，退回普通激活，桌面纹丝不动。"
          ],
        },
        {
          heading: "根因分两层",
          paragraphs: [
            "第一层：动画期间读到的状态是过期的。系统切桌面的动画在这台机器上是 450 到 530 毫秒，“当前桌面”和“屏幕上看得见的窗口”要到动画结束才更新。我的第一版修复只修了这一层：记住“刚刚请求去的桌面”，动画结束前以它为准。结果每一步决定都对了，最终桌面还是错。",
            "第二层：动画进行中发出的第二次切桌面请求，系统会直接丢掉，接口却照样返回成功。所以光判断对不够，还得避开这段时间，或者确认请求真的被接受了。"
          ],
        },
        {
          heading: "第一版：固定等 0.62 秒，有效，但不是好办法",
          paragraphs: [
            "最直接的办法是：两次切桌面之间至少隔 0.62 秒（比最长的 530 毫秒动画再多一点），等的时候如果有更新的点击取代了它就跳过。在受控条件下，这个办法 16/16 全部正确，后来更大的样本里是 29/29。",
            "但它是“拍脑袋”的：动画时长是这台机器上量出来的，机器很卡、动画变长时 0.62 秒不够；关掉动画或者机器很快时，又白白多等。用户很快指出了这一点，并问：官方有没有信号，可以按结果判断切换成没成功？这个批评是对的，于是改成“看结果”。"
          ],
        },
        {
          heading: "看结果：官方信号，加上确认请求被接受",
          paragraphs: [
            "官方确实有信号：`NSWorkspace.activeSpaceDidChangeNotification`，切换桌面时发出。但它是在动画开始还是结束时发，决定了能不能用，所以先量。实测它在动画结束时发出，比窗口画面到位只晚 5 到 10 毫秒；而“App 变成前台”的通知要早得多（40 到 80 毫秒），不能拿来当完成信号。",
            "只等这个通知还不够。我把逻辑改成“收到信号就立刻发下一次”，16 轮里只有 13 轮正确。抓了一个失败现场：最后一下点击的请求，是在信号之后仅仅 8 毫秒发出的，被系统丢了，等了 1.6 秒也没有任何切换；成功的请求都是在信号后 20 到 60 毫秒发出的。也就是说，“切完了”的通知比系统真正能接受新请求的时刻早了一点点。",
            "所以还要确认请求被接受了：发出请求后，目标 App 应该很快变成前台（实测 40 到 80 毫秒），如果 0.4 秒内没变，就当作被丢了，间隔 50 毫秒重发，最多 3 次。判断依据是官方的前台 App 状态，不是时间。中途我还试过 SkyLight 里查“屏幕是否正在做切换动画”的接口，它存在，但整个切换过程中它从来没有变过，就放弃了。"
          ],
        },
        {
          heading: "一个失败现场教会的三件事",
          paragraphs: [
            "加上“确认被接受”之后成功率反而变差了，原因是测试出了问题（见下）。等测试条件受控之后，又抓到一个真实的失败现场：最后一下点击的“提前窗口”调用卡了 1.5 秒后失败，而代码把这次失败当成致命错误，直接放弃，没有重试。",
            "这说明三件事。第一，失败要分“彻底失败”和“系统正忙”，后者应该稍后重发。第二，辅助功能调用在系统正忙时会卡一秒多才失败，要给它设短的超时（0.35 秒），快速失败、快速重试。第三，每次点击都重新按元素编号枚举窗口，在动画期间要 240 毫秒，应该把找到的窗口元素缓存起来。这三点，都是“适应机器当时的状态”，而不是固定等待。"
          ],
        },
        {
          heading: "再往前一步：盯着结果并纠正",
          paragraphs: [
            "用户接着提出一个更进一步的想法：就算一个切换没完成，突然被切回去，或者被别的地方抢走焦点，能不能强制更新回目标？让人有很强的响应感。我评估下来认为方向对，但必须守住一条边界：绝不能和用户争焦点。",
            "做法是：点击处理完之后，在约 2.4 秒内每 0.12 秒核对一次“前台是不是目标 App、当前桌面上有没有它的窗口”，不一致就重新提前窗口，最多纠正 3 次。你一动键盘、鼠标、滚轮，或者点了别的图标，它立刻放弃；系统还在切桌面时也不重发。",
            "验证用的是一个“捣乱模式”：最后一下点击之后随机时刻，故意抢走焦点或者把桌面切回去，看能不能被拉回目标。没有纠正机制时是 4/15，做了纠正是 12/13。第一版盯梢是“稳定 0.3 秒就结束”，只有 6/9，因为真实的异常往往发生在动作完成之后一会儿；改成一直盯到窗口结束才有 12/13。"
          ],
        },
        {
          heading: "测试本身踩的坑",
          paragraphs: [
            "这一阶段，花在测试上的时间比修问题还多。第一，我用系统的“键鼠空闲时间”判断有没有人在操作，结果程序自己激活 App、提前窗口也会把它清零，测试一开始就把自己的动作误判成人在操作而中止；改成只看真实的键盘、鼠标、滚轮事件。第二，Touch Bar 上的触摸在这些事件里看不见，而它会被正在运行的 DockTouchBar 处理；所以受控测试时把它暂停，测完自动恢复。",
            "第三，有一轮数据里两种方案同时变差，旧方案从 29/29 掉到 22/27，这是明显的“测试环境变了”信号。查下来是桌面上多了台前调度的 WindowManager 窗口，排在真实窗口前面，“屏幕上最靠前的窗口是谁”这个判据把成功误判成失败，改成前台 App 加当前桌面。第四，失败是成批出现的：一整段时间里所有请求都不生效，之后自己恢复，新旧方案都有，这种数据不能下结论。",
            "还有一件要老实说的事：最后一轮“正常连点，新旧并排对照”因为要交给我手动测试而提前中止了，没有数据。最终的确认来自手动测试：连点、故意打断，都稳定。"
          ],
        },
        {
          heading: "手感：哪些半秒是程序的，哪些不是",
          paragraphs: [
            "用户还提到“有些不跟手”，所以我也量了点击本身：被点的 App 变成前台，中位数只要 40 多毫秒（新旧逻辑一样）；但窗口画面真正出现在最前面要约 530 毫秒。多出来的约 480 毫秒是开着台前调度时系统的窗口切换动画，不是程序造成的，程序也改不了。",
            "能改的部分改了：连点不再失效，被丢掉或被抢走的结果会被纠正；不能改的部分，在 README 里写明，并建议想要更快画面的人关掉台前调度或开启“减弱动态效果”。这个建议我没有替用户去测，因为那是系统设置。"
          ],
        }
      ],
    },
    {
      slug: "docktouchbar-double-tap-hide",
      title: "09 · 双击隐藏被自己的“纠正”打回：新机制的副作用",
      category: "架构实现",
      excerpt: "发布 1.4 之后，双击隐藏突然不正常了。原因是上一篇加的“盯着结果并纠正”：它把用户主动隐藏当成了异常，又把 App 拉回来。",
      tags: ["手势", "竞态", "副作用"],
      order: 9,
      date: "2026-09-26",
      body: [
        "1.4 发布之后，我自己用了一阵，发现一个之前没有的毛病：双击图标想隐藏 App，它有时不隐藏，有时闪一下又回来。双击隐藏在 1.1 就有，一直没问题，所以这次几乎可以肯定是新加的东西造成的。",
        "这一篇记录它的原因、修法，以及一条以后加“自动纠正”类机制时要记住的规则：任何会自己动手的机制，都要想清楚用户的每一种主动操作对它意味着什么。"
      ],
      sections: [
        {
          heading: "现象和推断",
          paragraphs: [
            "双击在 Touch Bar 上是两次点击：第一下和普通单击完全一样，立刻切换到这个 App；第二下（0.35 秒内、同一个图标）触发隐藏。单击不为了等双击而延迟，这是从第一版就定下的原则，所以第一下的切换一定会先发生。",
            "1.4 新加的“盯着结果并纠正”，在每次切换之后的约 2.4 秒里，每 0.12 秒核对一次：前台是不是目标 App、当前桌面上有没有它的窗口。不一致就重新把它提到前面。双击的第二下把 App 隐藏了，恰好满足“前台不是目标”，盯梢就认为焦点被抢走了，尽职地把它又提了回来。我把这个推断当作假设，改之前先对照代码确认：隐藏的实现只是延迟 0.2 秒调用系统的隐藏，完全没有告诉盯梢“这次是用户主动要隐藏”。"
          ],
        },
        {
          heading: "为什么之前没测出来",
          paragraphs: [
            "上一阶段的压力测试和“捣乱模式”都是围绕“切换”的：连点、故意抢焦点、把桌面切回去。没有一条用例是“切换之后马上隐藏”。盯梢机制的所有停止条件也都是围绕“别的切换”设计的：有更新的点击、或者键盘鼠标有动作才放弃。而 Touch Bar 上的触摸既不是键盘也不是鼠标，隐藏也不是“点击”，所以没有任何一个条件能让它停下来。",
            "这类问题的共同点是：新机制的测试只覆盖了它想解决的场景，没有盘点“用户还能做哪些操作”。手势有单击、双击、长按三种，我只把其中一种放进了它的世界里。"
          ],
        },
        {
          heading: "修法：隐藏也是一次新点击",
          paragraphs: [
            "评估之后，我没有考虑去掉双击。双击隐藏的第二下几乎总是落在同一个 App 上，没有理由为它拖慢单击；只要让第二下正确地取消第一下的收尾就行。用户也给了同样的取舍：单击的响应速度优先，双击可以妥协。",
            "具体做了三件事。第一，隐藏被记为一次新点击：每次点击都有一个递增的序号，切换和盯梢都靠“有没有更新的序号”判断自己是否已经过时，隐藏也递增序号，并且标成“不属于任何 App”，这样两种过时判断都会命中，在途的切换和盯梢立刻退出。第二，隐藏不再抢在前面，而是排到同一个串行队列的后面，等在途的提升退出之后再执行，避免第一下的最后一个动作在隐藏之后才落地。第三，隐藏之后核对结果：0.25 秒后看 App 是不是真的被隐藏了，没有就再隐藏一次，最多重试两次。系统的隐藏接口返回值本来就不可靠，所以只能看结果。"
          ],
        },
        {
          heading: "验证：这一次我没有拿到自动化数据",
          paragraphs: [
            "我写了一个复现脚本：让第一下切换、隔 150 或 300 毫秒之后发第二下隐藏，3 秒后看 App 是不是处于隐藏状态，覆盖“目标不在前台”和“目标本来就在前台”两种起点。脚本第一次运行时，我自己的键盘鼠标有动作，被输入检测当成干扰中止了，没有产出任何结果。",
            "所以这次的修复，在动手之前没有拿到失败的数字，也没有拿到修复后的数字。我把它如实交给用户手动测试：在别的桌面和别的 App 上双击，以及在已经在前台的 App 上双击。用户测试之后的反馈是“基本流畅了”。这是一次手动确认，不是压力测试，我不会把它写成“已经验证稳定”。"
          ],
        },
        {
          heading: "留下的规则",
          paragraphs: [
            "给任何“自动纠正”“自动重试”类的机制加上停止条件时，先把用户能做的所有主动操作列出来，逐条问：这一步会不会被它误认为异常？在这个项目里，就是单击、双击、长按退出、键鼠操作和菜单里的开关。任何一个会让 App 离开前台的主动操作，都必须能让盯梢停下来。",
            "另外，发布前的测试清单要有一条“新机制和已有手势的组合”，而不只是新机制本身。这次的问题，本来在发布前跑一遍“切换后立刻隐藏”就能发现。"
          ],
        }
      ],
    },
    {
      slug: "docktouchbar-brightness-gear",
      title: "10 · 屏幕被调到全黑怎么办：一个齿轮做兜底",
      category: "架构实现",
      excerpt: "Dock 占满整条 Touch Bar，亮度条就看不到了；亮度调到 0 就是死循环。最后的方案是最右端一个齿轮，以及一个被否掉的“更聪明”的方案。",
      tags: ["兜底", "亮度", "取舍"],
      order: 10,
      date: "2026-09-26",
      body: [
        "使用中发现一个逻辑上的死循环：Dock 占满整条 Touch Bar，系统的亮度条被盖住了。如果屏幕亮度被调到最低，画面全黑，用户想把它调回来，却找不到亮度条；去菜单栏关掉插件，又要在一片漆黑里操作。",
        "这一篇记录怎么给它做兜底，以及一个我认为更好、最后却没有做的方案，为什么被否掉。"
      ],
      sections: [
        {
          heading: "问题：占满整条的代价",
          paragraphs: [
            "占满整条是一开始就做出的选择：系统设置成“展开的控制条”时，只占一小块的方式在 macOS 27 上根本不显示，所以固定用占满整条。代价一直写在 README 的局限里：开着的时候亮度和音量看不到，要用时到菜单里关掉 Dock。",
            "平时这只是不方便，但亮度调到 0 时，它变成了一个死循环：要恢复亮度就得先关掉插件，而屏幕是黑的，关插件的入口看不见。这种“把用户锁在外面”的问题，比任何功能缺陷都严重，必须有一个不依赖屏幕的兜底。"
          ],
        },
        {
          heading: "方案：最右端固定一个齿轮",
          paragraphs: [
            "方案是用户提出来的，也是最简单的：在 Touch Bar 最右端固定一个齿轮按钮，点一下，插件暂时让位，系统原生的控制条（亮度、音量）就回来了；用户调好之后，插件自动恢复。相当于菜单里那个总开关的“临时版”。",
            "按钮固定在最右端，不随图标滚动；Dock 图标区让出这 44pt，长按退出时的提示条也挪到它的左边。图标用系统自带的齿轮符号，不自己画。点击后调用的就是关闭插件时同一个接口，把我们的 Touch Bar 撤下来，系统的控制条自然显示。"
          ],
        },
        {
          heading: "怎么自动恢复：不能让用户又被锁住",
          paragraphs: [
            "“自动恢复”看起来简单，其实要考虑几种情况，否则很容易制造新的死循环。点的时候屏幕已经是黑的：一直等到亮度回到一个可见的值再恢复。点的时候屏幕是亮的（只是想调音量）：过 20 秒恢复。最关键的一种：暂停期间用户又把亮度调到了最低：这时即使 20 秒到了也不能恢复，否则又盖住了亮度条，要一直等到亮度回来。",
            "亮度是用系统私有的 DisplayServices 接口读的，和其他私有接口一样，读不到就退化：按 20 秒处理，功能不会失效。另外要保证暂停期间睡眠唤醒、解锁这些“自动把 Dock 挂回去”的流程不会把它顶回来，所以挂回去之前统一检查是否处于暂停状态。想提前恢复，也可以点系统控制条里我们留的那个入口图标。"
          ],
        },
        {
          heading: "被否掉的方案：调到 0 时自动让位",
          paragraphs: [
            "用户随后提出一个体验更好的想法：亮度一调到 0，插件自己关掉，不用点任何按钮。这个方案我认为确实更好，所以先实现了一版。但它要求程序每隔几秒读一次屏幕亮度。系统没有“亮度变化”的通知，只能轮询。",
            "轮询意味着空闲时也要周期性醒来。这个项目对外写的一个数字是“空闲唤醒 0 次、CPU 0.0%”，这条会因此失效。哪怕把间隔放宽到 2 秒并允许系统合并唤醒，也不再是 0。用户的取舍很干脆：如果有开销就算了，用齿轮的被动方式，不要把开发复杂化。我把这一版完全移除，没有留在代码里，也没有给它加开关。",
            "我觉得这个判断是对的：兜底功能的目标是“不会把用户锁死”，被动的齿轮已经做到了；主动检测只是把“点一下”省掉，却要用一条常驻的定时器去换。少一个机制，就少一个出问题的地方。"
          ],
        },
        {
          heading: "后来：齿轮改成小眼睛，菜单也跟着整理",
          paragraphs: [
            "用了一段时间之后，用户觉得齿轮太像“设置”，而点下去的实际效果是“暂时隐藏 Dock”，所以在 1.7 里改成了小眼睛，含义直接。同时把“暂时隐藏多久”做成了菜单里的选项（10、20、30、60 秒，默认 20 秒）；屏幕已经被调黑时仍然不看时间，只等亮度回来。",
            "这次还顺手整理了菜单：“显示 Dock 里固定的 App”改成了意思更直白的“只显示正在运行的 App”，默认不勾选；界面上的勾选状态和原来相反，但存储的设置没有变，所以已有用户不会被改掉设置。功能相近的选项放在一起，分成显示、切换与手势、通用、关于和退出四组。功能没有变，只是说法和位置变了，目的是减少误解。"
          ],
        },
        {
          heading: "验证：这次我能验证什么，不能验证什么",
          paragraphs: [
            "能验证的：按钮出现在最右端，Dock 布局没有变化（Touch Bar 截图确认）；亮度读取接口在这台机器上能读到内置屏的亮度。不能验证的：点击暂停和自动恢复的整个流程。Touch Bar 上的触摸没法用脚本模拟，这部分逻辑只能靠人在真机上点。所以这一篇里，我不会说“测试通过”，只说逻辑按上面几种情况写了，并交给用户手动确认。",
            "我原本还想用脚本把亮度真的调到 0 再恢复，来测试自动让位的那一版，这个测试在执行前被用户叫停了，因为整个方案随后被取消。这也算一个提醒：会改动用户屏幕亮度的测试，就算写了恢复逻辑，也应该先问一句。"
          ],
        }
      ],
    },
    {
      slug: "docktouchbar-retrospective",
      title: "11 · 复盘：简洁、优雅、高效，落到了哪些数字和取舍上",
      category: "产品复盘",
      excerpt: "空闲 CPU 0.0%、内存 29 MB，这是量出来的。也记录这个项目的局限、许可证的取舍，以及和 AI 一起做的体会。",
      tags: ["复盘", "性能", "许可证"],
      order: 11,
      date: "2026-09-26",
      body: [
        "项目发布之后，回头看最开始定下的三个词：简洁、优雅、高效。如果只是形容词，等于什么都没说，所以这一篇把它们落到具体的数字和取舍上，也把没做到的部分老实写出来。"
      ],
      sections: [
        {
          heading: "高效：量出来的数字",
          paragraphs: [
            "在 M1 的 MacBook Pro 上，用 Release 版本，Touch Bar 上显示着 Dock，键鼠空闲，连续 5 次采样，每次间隔 2 秒：CPU 占用全部是 0.0%，空闲唤醒 0 次，线程 3 到 4 个，物理内存约 29 MB（1.7 及以前量到的是 34 MB，1.8 之后重新量过）。空闲唤醒我用内核记录的进程计数器隔 20 秒读两次做差，一共量了四次：新增每次都是 0 次；中断唤醒是 0 到 7 次不等，来自系统事件；CPU 时间几乎为 0。App 体积 1.5 MB，其中包含 arm64 和 x86_64 两份。代码约 3400 行 Swift，13 个文件（约十分之一是像素画的数据），没有第三方依赖。",
            "点击的响应也量过：被点的 App 变成前台，中位数 40 多毫秒；但窗口画面到位要约 530 毫秒，多出来的约 480 毫秒是台前调度的窗口动画，不是程序造成的（详见上一篇）。同样重要的是没测的：有大量图标、长时间运行后的内存变化；关掉台前调度后画面能快多少；以及和 Pock 等其他软件的对比。没测的东西，我就不在页面上写对比数字。"
          ],
        },
        {
          heading: "简洁和优雅：落到取舍上",
          paragraphs: [
            "简洁体现在删掉的东西上：没有小组件和插件，菜单里只有几个开关，连 Touch Bar 最右边的收起按钮也去掉了。优雅体现在向系统看齐：图标顺序和运行小圆点和 Dock 一致，用系统自带的滚动控件，单击不为了等双击而延迟，长按的进度条安静而且可以反悔。"
          ],
        },
        {
          heading: "局限：写在前面",
          paragraphs: [
            "只对带 Touch Bar 的 MacBook Pro 有意义。用了私有接口，不能上架 Mac App Store，以后的 macOS 更新也可能让它失效，届时菜单里会显示“当前系统不支持”，App 不会崩。Dock 会占满整条 Touch Bar，开着的时候系统控制条看不到，要用亮度和音量时，从菜单里关掉 Dock。",
            "实测环境只有一台：M1 的 MacBook Pro 13 英寸、macOS 27.0。安装包是通用二进制，Intel 部分我只在 Rosetta 下确认能启动，从没有在真正的 Intel 机器上跑过，所以页面和 README 里都标为“未实测”。这也是选择公开源码的一个原因：让有别的机器的人能帮忙验证。"
          ],
        },
        {
          heading: "许可证：个人使用免费，保留商业化的权利",
          paragraphs: [
            "我选了 PolyForm Noncommercial 1.0.0：个人和其他非商业用途可以免费使用、修改、分享，商业使用需要另行授权。它是现成的标准文本，比自己写一份“仅限个人使用”不容易出漏洞。要注意的是，它是“源码可见”，不是 OSI 定义的开源，所以我在页面和 README 里都没有用“开源”这个词。"
          ],
        },
        {
          heading: "和 AI 一起做的体会",
          paragraphs: [
            "有四点。第一，先验证，再写代码：让 AI 先去做探针和可行性验证，最大的不确定性消除之后，后面的路才短。第二，让 AI 检查它自己的产出：发布前的隐私扫描、二进制检查、文档里的数字和代码是否一致，都是让它去核对的，写文档时对照代码还发现了一个真实的边界 bug。第三，有些事必须由人来做：凭据的输入、许可证的取舍、“这个功能到底要不要加”的判断。第四，要让 AI 老实汇报数据。这个项目里有好几次，一个方案“看起来变好了”，其实是测试环境变了、判据失效或者样本太小；它该说的是“这一轮数据不能下结论”，而不是“应该稳定了”。AI 可以把选项和证据摆清楚，决定还是要人来下。",
            "下一步不急：让有 Intel 机器的人反馈；如果能确认台前调度关闭的系统上最小化可用，就做成可选项；再往后，才考虑未读角标这类功能，前提是它也符合“简洁”这个标准。"
          ],
        },
        {
          heading: "这个案例适合讲什么",
          paragraphs: [
            "如果把它当成教程案例，它适合讲四件事：从一个具体的不满走到清楚的目标和“不做”清单；怎样为依赖私有接口的功能做风险控制；怎样验证“摸不到”的界面；以及从签名、公证到公开发布的完整链路，包括发布前该检查什么。这四件事在别的小工具上都能复用，和 Touch Bar 本身关系不大。",
            "它也是一个适合读源码的小案例：代码量小，通读一遍不需要太久，每个决定的原因都能在开发日记里找到。"
          ],
        }
      ],
    },
    {
      slug: "docktouchbar-pixel-seasons",
      title: "12 · 1.8：把长按提示做成像素画的四季，右侧按钮换成咖啡杯",
      category: "架构实现",
      excerpt: "一条红色进度条，怎么被“太简单”一步步推成会跑的小角色、向后滚动的远景和四个季节；以及为什么很多效果只有把窗口真的跑起来才看得见。",
      tags: ["像素画", "动画", "设计迭代"],
      order: 12,
      date: "2026-09-26",
      body: [
        "1.7 的长按提示是一条红色进度条，加一个“正在关闭…”和倒计时，背景是一片渐变的暗红。功能没有问题，但用户看了一眼说：背景太简单了，能不能更有游戏的感觉，要炫酷一点，但不要太土。",
        "这一篇记录 1.8 里这件事是怎么改的：改了好几轮，中间有整套方案被推翻，最后落在“像素画的四季”上。也记录哪些东西是我实际看到了的，哪些只能靠用户在真机上确认。"
      ],
      sections: [
        {
          heading: "推翻重来：四种风格都不对",
          paragraphs: [
            "第一轮做的是游戏 HUD 的路子：斜切的面板、发光的边线、慢慢流动的斜纹，倒计时越走面板越“烧热”，进度条前端迸出火星。用户觉得动画效果非常不错，接着提出可以做几套不同主题，在设置里切换，比如樱花、我的世界、日式赛博朋克。",
            "于是做了四套：默认的烈焰，加上樱花、像素方块、东京霓虹。看完之后用户的判断很干脆：这几个风格都不对，默认的也不对。新的方向是他给的：直接拿我的世界的质感当作春天，再做夏、秋、冬，一共四个季节，用像素画的方式简单地表达，四个主题四种颜色；冬天就是下面结冰，长一点也没关系；还有一条逻辑：靠近边缘的地方完整，越靠近中间越淡。",
            "这一步我觉得值得记下来：前面那套方案在技术上都是能用的，动画也流畅，但方向不对。用户不是在挑细节，而是在告诉我“我要的是什么感觉”。把整套推掉，比在错的方向上继续调参数要快得多。"
          ],
        },
        {
          heading: "设计规则：像素画的四季",
          paragraphs: [
            "最后的版本是一幅贴着 Touch Bar 边缘的横版像素小场景。春天是草地、小屋和炊烟；夏天是海面、棕榈岛和方块太阳；秋天是落叶铺的地面、稻草人和南瓜；冬天是结冰的地面、落满雪的木屋和远处的雪山。每个季节一个主色，进度条也换成对应的颜色和纹理：春天的草绿、夏天带浪沫的蓝、秋天橙红金的叶子、冬天带反光的冰蓝。",
            "第二轮反馈把地面砍到了最少：最下面直接就是地面，只有几格厚；进度条坐在地面上，是像素游戏里常见的分段条，上亮下暗，每隔几格一道缝；一个小角色沿着它往前跑：春天是小狗，夏天是帆船，秋天是狐狸，冬天是雪橇，走满就是倒计时结束。远景是向后滚动的山丘、树和房子的剪影，方向和角色跑的方向相反，人是在往前走的；烟囱在冒烟，天上有蝴蝶或小鸟飞过，花瓣、落叶、雪在背景里飘。",
            "“边缘完整、往中间渐渐淡”我没有用平滑的渐变去做，而是用有序抖动：越往里，画出来的方块越稀疏，一块一块地消失。像素画里没有平滑的渐变，抖动才是它自己的语言，也和整个画面更统一。"
          ],
        },
        {
          heading: "技术上怎么做：全部是代码里的字符画",
          paragraphs: [
            "整个场景没有任何图片资源。每个小东西都是一组字符串，比如小狗是七行、十二列的字符，每个字符对应一种颜色，启动时画进一块每格 1pt 的画布。Retina 屏上一格正好是一个像素点，放大也不会糊。App 体积因此只从 1.1 MB 涨到 1.5 MB，其中一部分是这些字符画。",
            "远景是三个周期宽的一张图，滚动一个周期正好首尾相接，所以可以一直滚。要让它也在中间淡出，不能把淡出画进图里（图会跟着滚），所以用一张固定不动的抖动遮罩，只露出靠边缘的一段。角色的跑步、蝴蝶的扑翅是逐帧切换的图片，烟、花瓣、落叶、雪是粒子发射器，全部由 Core Animation 播放。",
            "文字也顺手改了：放大到 14pt、粗体、加一层淡淡的投影。“看不清”的真正原因不只是字小，还有我之前为了做流光，把文字大部分时间压在了 42% 的亮度上，这才是发灰的根源。现在基础亮度是 80%，流光扫过时才是 100%。"
          ],
        },
        {
          heading: "有些东西，只有把窗口真的跑起来才看得见",
          paragraphs: [
            "这个项目原来有一个离屏渲染的工具，把 Touch Bar 画成一张 PNG，用来检查布局。但离屏渲染画不出粒子发射器，也画不出任何正在进行的动画。所以这一轮我加了一种模式：把窗口真的显示在屏幕上跑起来，再用系统的截图命令按窗口截下来。README 里的四张季节图就是这样来的，图里的小角色、粒子都是真的在动的那一帧。",
            "这个办法直接抓出了两个问题。一是从顶上落下来的花瓣和雪根本看不见：我把发射点放在了面板外面，粒子没进画面就已经在淡出了，用户在真机上看到的反馈也是“飘的东西太靠屏幕上方外面”，最后改成在面板里面、地面上方生成，先小后大再淡出。二是一个我读代码时发现的隐患：某个季节的颜色字典里同一个键写了两次，编译器不报错，但运行时会直接崩溃，在安装之前就改掉了。"
          ],
        },
        {
          heading: "右侧按钮：咖啡杯和窗口居中",
          paragraphs: [
            "同一轮里，右侧的两个按钮也换了。小眼睛换成了咖啡杯：点一下是“歇一会儿”，暂时把 Touch Bar 还给系统，含义比眼睛更直接。窗口居中按钮是这个版本新增的：把最前面 App 的窗口居中到屏幕正中，大小在菜单里选，用的是公开的辅助功能接口。两个按钮的顺序对调，居中按钮在最右边；图标都是白色的 8 位像素风，和长按提示里的像素画是一个味道，咖啡杯的杯口有三帧蒸汽轮流上飘。",
            "我担心过这个常驻的蒸汽动画会破坏“空闲唤醒 0 次”，所以装上之后重新量了：读内核的进程计数器隔 20 秒做差，量了四次，空闲唤醒每次都是 0，CPU 0.0%，内存约 29 MB。但有一点要老实写：中断唤醒不再总是 0，四次里是 0、1、0、7，我没法确认这些是不是蒸汽造成的，更可能来自系统事件。蒸汽是系统的渲染进程在画，不是 App 自己在动，这一点是成立的，但系统那边的绘制开销我测不了。"
          ],
        },
        {
          heading: "验证：这次我能验证什么，不能验证什么",
          paragraphs: [
            "能验证的：四个季节在真实窗口里跑起来的样子（截图里能看到小角色沿进度条移动、炊烟、飘落物、滚动的远景）；提示贴在左边时的镜像；很长的 App 名字会被截断而不会挤到倒计时上；构建、签名、公证和 DMG 里的 App 都通过了检查，二进制里没有带出本机路径。",
            "不能验证的：Touch Bar 上真实的触摸手感；这些只有 7 到 8 个点高的小角色，在真机上是否足够清楚，这要靠用户自己看；夏天的海浪流动和太阳光芒的一闪一闪，我没有抓到清晰的静帧，代码和其他季节用的是同一套机制，但不能说“我看到了”。这些我不会写成“测试通过”，只写成已经按上面的思路做好，等用户在真机上确认。",
            "还有一点关于命名：用户最初说的是“我的世界风格”，但这个软件是公开分发的，所以菜单和文档里都没有出现这个游戏的名字，也没有用任何官方素材，画面里只有通用的像素方块和绿色的小光点。"
          ],
        }
      ],
    },
  ]),
];

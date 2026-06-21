export type ProductDiarySourceNote = {
  sourceAreas: string[];
  records: string[];
  hardProblem: string;
  reusableLesson: string;
};

const sharedFailureSource: ProductDiarySourceNote = {
  sourceAreas: ["产品页复盘", "发布材料", "AI 能力变化观察", "矩阵运营记录"],
  records: [
    "这个项目的价值不是简单判定成功或失败，而是记录 AI 能力变化怎样压缩原本看起来成立的工具层。",
    "开发记录里最值得公开的是需求为何成立、替代者为何出现、哪些资产仍然能沉淀为流程方法。",
    "失败复盘不能只写遗憾，要把原始假设、实际阻力、替代路径和下一步收缩方向都讲清楚。",
    "这类产品适合放进产品矩阵，因为它们能提醒后来项目少走弯路，尤其不要把临时能力缺口误判成长期护城河。",
  ],
  hardProblem: "真正难点不是把功能做出来，而是判断这个功能会不会被下一轮 AI 工具直接吸收。",
  reusableLesson: "保留结构化输入、验收清单、发布材料和复盘方法，比继续包装一个空间变窄的单点工具更有价值。",
};

export const productDiarySourceNotes: Record<string, ProductDiarySourceNote> = {
  witnote: {
    sourceAreas: ["WitNote docs/superpowers 计划", "MAS 与 DMG 开发记录", "本地文件和写作工作台迁移记录", "多语言与上架文档"],
    records: [
      "WitNote 的开发记录反复围绕本地文件夹、Markdown、预览、角色库和模型接入展开，说明它不是聊天壳，而是写作者长期工作台。",
      "原生版本多次 spike 选择、格式化、HTML 导出、文件 IO、可折叠面板和当前文件搜索，说明核心难点在编辑体验和本地文件状态一致。",
      "MAS 与 DMG 记录把收费墙、构建 SOP、多语言 README、隐私政策和发布包串在一起，证明它不是单页 Demo，而是完整桌面产品。",
      "2025-12-30 WitNote 1.2.4 曾因 macOS 主窗口关闭后没有重新打开菜单被 Guideline 4 拒绝；1.2.8 用 Window 菜单、Dock 激活和快捷键修复后通过。",
      "设计规格强调安静、克制、可回到原稿，让 AI 能力服务写作，而不是把作者的资料和草稿交给不可控黑箱。",
    ],
    hardProblem: "最难的是在 AI 能力、文件系统、编辑器体验和上架表达之间保持同一个本地优先承诺。",
    reusableLesson: "本地优先 AI 工具要先保护用户资产和写作节奏，再谈模型能力、补全效果和商业化。",
  },
  agentlimb: {
    sourceAreas: ["浏览器控制底座记录", "本地 bridge 设计", "MCP 接入说明", "多账号运营流程复盘"],
    records: [
      "AgentLimb 的开发记录围绕真实 Chrome、用户已有账号会话、本地桥接和 muscle memory 展开，目标是让 AI 进入真实网页工作流。",
      "它的关键不是点击按钮，而是把浏览器状态、DOM 探索、任务路径和二次复用做成可解释、可调度的本地能力。",
      "多 profile、多窗口、多账号这些记录说明产品面向真实运营场景，而不是只在无登录沙盒里演示自动化。",
      "安全边界始终围绕本地 127.0.0.1、用户确认和会话不上传展开，这决定了它不能做成粗暴云端代理。",
    ],
    hardProblem: "最难的是让 AI 足够会操作网页，同时又不越过账号、权限和敏感动作的边界。",
    reusableLesson: "浏览器自动化产品要沉淀路径记忆和验收机制，而不是只追求单次任务跑通。",
  },
  domprompter: {
    sourceAreas: ["visual-inspector 架构文档", "产品哲学记录", "i18n 工作流", "MAS 可行性和重构进度"],
    records: [
      "相关 docs 记录过产品哲学、架构、国际化工作流和 MAS 重构，说明它原本试图把前端视觉检查变成可操作工具。",
      "DOM 选择、样式差异、截图上下文和提示词合约都成立，但 AI 浏览器代理进步后，中间层厚度变成主要风险。",
      "开发记录里可复用的是视觉 QA 思路：明确目标元素、修改范围、视口、截图证据和回归检查。",
      "2026-04-15 DOMPrompter 0.1.0 曾因 Settings 菜单无响应和 Unrestricted Web Access 年龄分级不准被拒；0.1.0 (26) 修复 IPC listener cleanup 与 Age Rating 后通过。",
      "失败复盘要把工具价值从生成提示词，收缩到前端验收、截图差异和设计判断。",
    ],
    hardProblem: "最难的是避免产品只停留在 AI 暂时不会读页面的能力缺口上。",
    reusableLesson: "前端 AI 工具最终要卖验收和判断，而不是卖复制上下文的步骤。",
  },
  glotshot: {
    sourceAreas: ["商店素材工具 docs", "UX 优化计划", "隐私与 IAP 文档", "App Store 检查清单"],
    records: [
      "GlotShot 对应的素材工具文档覆盖 UX、隐私、付费墙、MAS 构建和 App Store 检查，说明它服务的是完整上架流程。",
      "Poster、Icon、设备框、多语言标题和批量导出是真实需求，但普通静态海报越来越容易被 Codex 自动生成。",
      "开发记录的价值在于把截图规格、文案本地化、隐私页面和审核材料放在同一个发布闭环里。",
      "2026-01-20 / 2026-01-23 GlotShot 经历两轮拒审，覆盖 Apple 商标元数据、Google Play 引用、Support URL、启动白屏、导出失败和沙盒路径问题，最终 0.0.7 修复通过。",
      "后续方向必须越过模板层，走向 3D 设备场景、产品视频、动态演示和转化率素材组合。",
    ],
    hardProblem: "最难的是在 AI 已经能批量生成基础海报后，继续提供更专业、更难替代的视觉结果。",
    reusableLesson: "商店素材产品要服务一次完整发布，而不是只做一个图片编辑器。",
  },
  "codex-quota-calendar": {
    sourceAreas: ["QuotaCalendar release 文档", "macOS 菜单栏实现记录", "本地数据和发布说明", "Codex 办公自动化方案"],
    records: [
      "QuotaCalendar 的 release 记录把菜单栏工具、DMG 分发、本地数据和 quota 节奏管理放在一起。",
      "它的产品起点是个人高频痛点：Codex 额度、5 小时窗口、周额度、历史消耗和预计耗尽需要一个低干扰视图。",
      "开发记录说明小工具也可以讲完整闭环：数据模型、隐私边界、SwiftUI 菜单栏、签名公证和下载信任。",
      "它适合作为 Codex 办公自动化课程入口，因为需求足够窄，但能覆盖真实效率工具的关键环节。",
    ],
    hardProblem: "最难的是把滚动窗口、周额度和历史预测解释成用户一眼能理解的状态。",
    reusableLesson: "办公自动化可以从一个高频小痛点开始，只要把数据、隐私、发布和教学价值都闭合。",
  },
  drowsebook: {
    sourceAreas: ["DrowseBook 产品策略", "格式解析和加载架构记录", "v1.1 迭代总记录", "外部提审与本地完成度审计"],
    records: [
      "DrowseBook 的 docs 很完整：开发哲学、22 条痛点功能清单、UI 结构、格式语言覆盖、定价买断、外部提审和完成审计都有记录。",
      "开发计划连续记录了 EPUB、PDF、TXT、MOBI、AZW3 的格式对齐，惰性加载、章节热区、图片管线和阅读听书进度统一。",
      "v1.1 记录把导入文件夹、音景、继续阅读、收费墙口径和多语言上架放在同一轮迭代里，说明它已经进入真实产品修补阶段。",
      "公开文章要把这些工程事实翻译成用户能理解的选择：为什么本地、为什么系统 TTS、为什么一次买断、为什么少打扰。",
    ],
    hardProblem: "最难的是让多格式阅读、TTS、进度、性能和睡眠场景互相配合，而不是变成功能堆叠。",
    reusableLesson: "本地阅读工具要先建立可信边界，再用格式支持、性能和安静体验证明价值。",
  },
  "sumi-mahjong": {
    sourceAreas: ["ZenMahjong 产品策略", "玩法算法与判定", "牌面资产和动效记录", "完成审计与本地化上架文档"],
    records: [
      "ZenMahjong docs 覆盖开发哲学、痛点功能清单、命名品牌、UI 结构、主题美术、定价 IAP 和本地化上架。",
      "开发计划记录了玩法算法、两折线判定、周 1 开发日志、动效粒子、开源布局参考、随机布局策略和牌面生成流程。",
      "完成审计把玩法、隐私、无广告、StoreKit、素材和上架说明合在一起，让游戏不是只停留在可玩 Demo。",
      "公开文章要说明为什么小游戏也需要不做清单：无广告、无账号、无体力、无排行榜，都是架构和商业化选择。",
    ],
    hardProblem: "最难的是让麻将消除既安静又耐玩，同时避免广告化和过度游戏化破坏产品气质。",
    reusableLesson: "轻量游戏也可以成为完整产品案例：规则、手感、美术、IAP、审核和推广都能拆开复用。",
  },
  trekreel: {
    sourceAreas: ["三维地图故事版架构", "MAS / Windows 打包记录", "删除数据源说明", "多语言 GitHub Pages 文档"],
    records: [
      "TrekReel 的 docs 覆盖架构、MAS 构建、Windows 打包、数据源删减和多语言 README，说明它从一开始就面向跨平台发布。",
      "轨迹故事的难点不是读取 GPX/KML 文件，而是把轨迹、海拔、时间线、相机路径和导出素材组织成可分享叙事。",
      "发布记录说明桌面创作者工具要同时处理安装信任、包体、平台差异、网站说明和素材表达。",
      "2026-04-01 TrekReel 1.0.4 曾因把 App 内付费墙截图误传到 IAP Promotional Image 被 Guideline 2.3.2 打回，清除促销图元数据后通过。",
      "公开文章应该把 3D、地图和视频能力转成创作者语言：路线为什么值得看，哪些信息应该出现，节奏怎样不打断故事。",
    ],
    hardProblem: "最难的是把原始轨迹数据变成有镜头语言的路线故事，而不只是画一条线。",
    reusableLesson: "视觉工具要从数据入口讲到导出结果，用户购买的是可发布素材，不是中间预览。",
  },
  "mood-button": {
    sourceAreas: ["Mood Button 开发计划", "模型验证记录", "上架收尾盘点", "App Review 修复记录"],
    records: [
      "Mood Button 的 docs 覆盖语音到多语日记、AI 线索生成、本地 AI 显性验证、MLX 真实模型测试和 iPad 原生适配。",
      "上架记录包含上传前状态复核、TestFlight 收费墙、产品名称和 GitHub 重命名、App Review 拒回后的修复路径。",
      "模型验证文档说明本地 AI 不是口号，需要验证模型边界、调度方式、设备能力和用户可见说明。",
      "公开文章要谨慎处理情绪、语音和隐私，不渲染心理疗效，而是讲清低门槛记录、本地处理和审核沟通。",
    ],
    hardProblem: "最难的是在私密情绪场景里同时满足本地 AI 可用性、隐私说明和 App Review 可验证性。",
    reusableLesson: "敏感 AI 产品先讲数据流、边界和审核证据，再讲智能体验。",
  },
  rushi: {
    sourceAreas: ["金刚经产品策略", "公共文本资源记录", "音频与资源策略", "多语言和上架文案"],
    records: [
      "Rushi 相关 docs 覆盖开发哲学、痛点功能清单、UI 结构、语言覆盖、定价下载、音频资源和开发里程碑。",
      "文本资源记录把金刚经、心经、多语言版本和公共领域来源分开处理，重点不是收集越多越好，而是降低误读。",
      "佛珠系统、音频资源和静心 UI 的记录说明产品体验要服务阅读仪式，不应制造复杂负担。",
      "公开文章需要避免把内容产品写成权威解释，而是讲来源、版本、语言边界和用户阅读辅助。",
    ],
    hardProblem: "最难的是尊重宗教文本语境，同时把阅读、音频和仪式感做成轻量 App。",
    reusableLesson: "公共领域内容产品要先讲清来源和边界，再谈 UI、语言和商业化。",
  },
  dailyzikr: {
    sourceAreas: ["DailyZikr 项目讨论", "Adhkar 内容审计", "多语内容与 UI 修正", "ASC 提交包和版本记录"],
    records: [
      "DailyZikr 的 docs 非常密集，覆盖项目启动、方向修正、内容审计、Non-Quran reviewer packet、多语经文接入和系统语言联动。",
      "多轮记录处理了 Tasbih、Qibla、每日列表、12 语视觉检查、三语截图、四语 metadata 和 ASC 问卷。",
      "内容型产品的难点在审核和表达：要清楚说明来源、署名、授权状态、区域风险和非 Quran 内容边界。",
      "公开文章要从支持页开始讲到产品闭环，让读者看到政策页、截图、metadata 和审核材料也是产品的一部分。",
    ],
    hardProblem: "最难的是把宗教内容、目标市场语言、审核材料和功能体验同时校准。",
    reusableLesson: "内容型 App 的工程不只在代码里，内容审计、语言审核和商店材料同样是核心开发工作。",
  },
  packpour: {
    sourceAreas: ["Chrome Web Store listing", "launch roadmap", "release checklist", "App Store Connect 本地化流程"],
    records: [
      "Packpour 的 docs 覆盖 Chrome Web Store listing、launch roadmap 和 release checklist，说明它原本是认真准备发布的浏览器扩展。",
      "locale pack、侧边栏、字段辅助和多语言元信息是现实痛点，但 Codex 直接操作后台后，扩展的中间层价值被压缩。",
      "发布清单保留下来的价值是安全边界：辅助填写可以自动化，Save、Submit 和发布仍应交给人确认。",
      "公开文章要把失败讲成流程资产：字段结构、语言包、审核检查和人工确认机制都能服务后续产品。",
    ],
    hardProblem: "最难的是在后台自动化和平台规则之间找到边界，不能把高风险提交动作交给工具乱点。",
    reusableLesson: "运营自动化最好输出结构化材料和检查清单，而不是只做一个页面点击器。",
  },
  beraw: {
    sourceAreas: ["Behance 图片工具 README", "Chrome 侧边栏实现记录", "多语言发布页", "扩展权限和隐私说明"],
    records: [
      "BeRaw 的记录聚焦 Behance 项目页图片识别、原始大图地址、蓝框选择、单张下载和 ZIP 打包。",
      "它是一个典型小工具：需求很窄，但必须把权限、页面适配、文件命名、批处理和用户可见反馈做好。",
      "多语言和产品页记录说明即使是小扩展，也需要解释适用页面、使用边界和隐私权限。",
      "公开文章应强调小工具不要做成大平台，保持轻、准、可退出，服务一个明确痛点。",
    ],
    hardProblem: "最难的是在复杂网页结构里稳定识别原始图片，同时不申请过宽权限。",
    reusableLesson: "浏览器小工具的护城河来自具体场景、权限克制和批处理细节。",
  },
  uixskills: {
    sourceAreas: ["UIXskills README.zh-CN", "SCHEMA 文档", "Supabase keepalive", "设计协议和 SKILL 实验记录"],
    records: [
      "UIXskills 的 docs 覆盖 README、Schema、白板/协议思路和 Supabase keepalive，说明它尝试把 AI 设计流程产品化。",
      "JSON schema、Whiteboard、SKILL 和 UI 实现都能解释，但组合在一起会让方法变重，用户需要额外学习。",
      "失败复盘的重点不是否认结构化设计，而是把重平台收缩成轻量规则、技能文件、验收清单和真实案例。",
      "公开文章应把它写成方法产品实验：为什么当时合理，为什么模型能力变化后要收缩，哪些规则仍值得保留。",
    ],
    hardProblem: "最难的是让设计协议帮助 AI 收敛，而不是让用户先背一套复杂流程。",
    reusableLesson: "AI 设计方法应该尽量轻，把规则放进验收和样例里，而不是强迫用户进入新平台。",
  },
};

export const defaultProductDiarySourceNote: ProductDiarySourceNote = {
  sourceAreas: ["产品策略文档", "开发计划", "发布记录", "复盘材料"],
  records: [
    "对应项目的 docs 里通常已经记录了立项、功能、技术、上架和复盘线索，公开文章要把这些原始记录整理成可读开发日记。",
    "公共页面不直接暴露内部路径和敏感操作，而是保留可学习的判断：为什么这样做、怎么落地、遇到什么难点。",
    "每篇文章都要把一个产品决策讲完整，让读者既能理解产品，也能复用方法。",
  ],
  hardProblem: "最难的是把内部工作记录翻译成安全、清楚、有教学价值的公开内容。",
  reusableLesson: "开发日记不是流水账，而是把真实项目变成可复用案例。",
};

import type { Article, ArticleSection, DiaryKind } from "../data/articles";
import { products, socialLinks, type Product, type ProductAction } from "../data/products";

export type Locale = "zh-CN" | "en";

export const siteName = "湖森堡AI_hooosberg";
export const siteOrigin = "https://hooosberg.com";
export const brandNameByLocale: Record<Locale, string> = {
  "zh-CN": "湖森堡AI_hooosberg",
  en: "@Hooosberg",
};

export const localeMeta: Record<Locale, { htmlLang: string; hreflang: string; label: string; shortLabel: string }> = {
  "zh-CN": { htmlLang: "zh-CN", hreflang: "zh-CN", label: "中文", shortLabel: "中文" },
  en: { htmlLang: "en", hreflang: "en", label: "English", shortLabel: "EN" },
};

export const uiText = {
  "zh-CN": {
    brandAria: "湖森堡AI_hooosberg home",
    nav: [
      ["首页", "/"],
      ["产品", "/apps"],
      ["日记", "/blog"],
      ["课程", "/courses"],
      ["AI导航", "/ai-navigation"],
      ["企业服务", "/services"],
      ["联系", "/links"],
    ],
    themeToggle: "切换黑白主题",
    languageSwitch: "Switch to English",
    footerCopy: "真实项目教程、独立 App、AI 工具和长期产品记录。",
    productDiary: "开发日记",
    viewProduct: "查看产品详情",
  },
  en: {
    brandAria: "Hooosberg home",
    nav: [
      ["Home", "/"],
      ["Products", "/apps"],
      ["Journal", "/blog"],
      ["Courses", "/courses"],
      ["AI Guide", "/ai-navigation"],
      ["Enterprise Services", "/services"],
      ["Contact", "/links"],
    ],
    themeToggle: "Toggle light and dark theme",
    languageSwitch: "切换到中文",
    footerCopy: "Real product diaries, independent apps, AI tools, and long-term build notes.",
    productDiary: "Build diary",
    viewProduct: "View product details",
  },
} satisfies Record<Locale, Record<string, unknown>>;

export function normalizePath(pathname: string) {
  const clean = pathname.split("#")[0].split("?")[0] || "/";
  if (clean === "/index.html") return "/";
  return clean.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
}

export function toEnglishPath(pathname: string) {
  const path = normalizePath(pathname);
  if (path === "/en" || path.startsWith("/en/")) return path;
  if (path === "/") return "/en";

  const legacyLegal = path.match(/^\/([^/]+)\/(privacy|terms)$/);
  if (legacyLegal) return `/en/${legacyLegal[2]}/${legacyLegal[1]}`;

  return `/en${path}`;
}

export function toChinesePath(pathname: string) {
  const path = normalizePath(pathname);
  if (path === "/en") return "/";
  if (path.startsWith("/en/")) return normalizePath(path.slice(3));
  return path;
}

export function toLocalizedPath(pathname: string, locale: Locale) {
  return locale === "en" ? toEnglishPath(pathname) : toChinesePath(pathname);
}

export function getAlternatePaths(pathname: string) {
  const zh = toChinesePath(pathname);
  const en = toEnglishPath(zh);

  return { "zh-CN": zh, en };
}

export function absoluteUrl(pathname: string) {
  return `${siteOrigin}${normalizePath(pathname) === "/" ? "/" : normalizePath(pathname)}`;
}

const socialLabelEn: Record<string, string> = {
  "抖音": "Douyin",
  "快手": "Kuaishou",
  "小红书": "Xiaohongshu",
  "B站": "Bilibili",
};

const socialNoteEn: Record<string, string> = {
  GitHub: "hooosberg",
  X: "@hooosberg",
  YouTube: "@hooosberg",
  TikTok: "@hooosberg",
  Telegram: "@hooosberg",
  "抖音": "@Hooosberg",
  "快手": "@Hooosberg",
  "小红书": "@Hooosberg",
  "B站": "@Hooosberg",
  Email: "zikedece@proton.me",
};

const socialHandleEn: Record<string, string> = {
  GitHub: "github.com/hooosberg",
  X: "x.com/hooosberg",
  YouTube: "youtube.com/@hooosberg",
  TikTok: "tiktok.com/@hooosberg",
  Telegram: "t.me/hooosberg",
  "抖音": "Hooosberg AI",
  "快手": "Hooosberg AI",
  "小红书": "Hooosberg AI",
  "B站": "Hooosberg AI",
  Email: "Direct email",
};

export function getLocalizedSocialLinks(locale: Locale) {
  if (locale === "zh-CN") {
    return socialLinks.map((link) => ({
      ...link,
      originalLabel: link.label,
      handle: link.note,
    }));
  }

  return socialLinks.map((link) => ({
    ...link,
    originalLabel: link.label,
    label: socialLabelEn[link.label] ?? link.label,
    note: socialNoteEn[link.label] ?? link.note,
    handle: socialHandleEn[link.label] ?? link.note,
  }));
}

const productActionLabelMap: Record<string, string> = {
  "官网": "Website",
  "产品页": "Product page",
  "旧产品页": "Legacy page",
  "开发日记": "Build diary",
  "下载 DMG": "Download DMG",
  "即将上架": "Coming soon",
  "App Store 即将上架": "App Store coming soon",
  "Mac App Store": "Mac App Store",
  "App Store": "App Store",
  "GitHub": "GitHub",
  "GitHub Releases": "GitHub Releases",
};

type EnglishProductOverride = {
  displayName?: string;
  category: string;
  tagline: string;
  summary: string;
  audience: string;
  platforms?: string[];
  status?: string[];
  privacyNote: string;
  features: string[];
  courseHooks: string[];
  failure?: boolean;
};

const productEnglish: Record<string, EnglishProductOverride> = {
  witnote: {
    displayName: "WitNote",
    category: "Local-first AI writing app",
    tagline: "Local-first AI writing and note-taking.",
    summary: "A local-first writing workspace for macOS and Windows, built around private notes, Markdown, Ollama, local models, and OpenAI-compatible APIs.",
    audience: "Writers, indie builders, and users who want a private AI writing environment.",
    platforms: ["macOS", "Windows", "Local AI"],
    status: ["App Store", "Open source", "Local-first"],
    privacyNote: "Notes stay in the local folder selected by the user. When local models are used, writing content does not leave the device.",
    features: ["WebLLM, Ollama, and OpenAI-compatible APIs", "Markdown and TXT editing", "Local folders as knowledge bases", "Writing roles, completion, and focus mode"],
    courseHooks: ["AI writing tools", "Local-first architecture", "Multi-model integration", "App Store launch"],
  },
  agentlimb: {
    category: "AI browser-control tool",
    tagline: "Let Claude Code, Cursor, and Codex control a real Chrome session.",
    summary: "A local bridge that lets AI coding tools operate real Chrome sessions and reuse browser-route memory.",
    audience: "Developers who need AI agents to work with real websites, logged-in sessions, and multi-account workflows.",
    platforms: ["Chrome", "MCP", "Local bridge"],
    status: ["Open source", "Local-first", "AI coding"],
    privacyNote: "The bridge runs on 127.0.0.1. Browser sessions and route-memory files remain on the user's machine.",
    features: ["One-prompt onboarding", "Reusable DOM exploration", "Real Chrome sessions", "Multi-profile browser automation"],
    courseHooks: ["Browser automation", "MCP toolchains", "Multi-account operations", "AI operating real websites"],
  },
  domprompter: {
    category: "Postmortem: AI frontend helper",
    tagline: "A prompt-helper idea compressed by fast-moving AI frontend agents.",
    summary: "A tool that once tried to help AI agents locate frontend elements precisely. Newer Codex and browser agents are reducing the need for this middle layer.",
    audience: "Developers using Codex, Cursor, or Claude Code to tune frontend details.",
    platforms: ["macOS", "Electron", "AI coding"],
    status: ["Postmortem", "Local-first", "Open source"],
    privacyNote: "Element selection, style comparison, and prompt generation happen locally.",
    features: ["Click-to-capture selectors", "Visual style-difference notes", "Prompts for Codex and Cursor", "Frontend design QA lessons"],
    courseHooks: ["Frontend visual tuning", "Structured AI prompts", "DOM selectors", "Design implementation review"],
    failure: true,
  },
  glotshot: {
    category: "Postmortem: App Store asset automation",
    tagline: "Basic App Store poster generation is being compressed by Codex automation.",
    summary: "A batch App Store preview generator whose basic screenshot workflows are increasingly easy to automate with AI coding tools.",
    audience: "Developers preparing store screenshots, icons, and localized launch assets.",
    platforms: ["macOS", "App Store", "Localization"],
    status: ["Postmortem", "App Store", "Repositioning"],
    privacyNote: "Asset generation and local translation workflows are designed to happen on the user's device first.",
    features: ["Poster and icon modes", "Device frames and batch export", "Localized marketing copy", "Store asset specification workflows"],
    courseHooks: ["App Store assets", "Localization", "Batch image generation", "Indie launch workflow"],
    failure: true,
  },
  "codex-quota-calendar": {
    category: "Codex quota utility",
    tagline: "Understand Codex quota rhythm through a menu-bar calendar.",
    summary: "A local macOS menu-bar utility for reading Codex quota usage, daily rhythm, weekly remaining quota, and depletion estimates.",
    audience: "Heavy Codex users who need a clearer quota rhythm.",
    platforms: ["macOS", "SwiftUI", "Codex"],
    status: ["DMG", "Open source", "Local only"],
    privacyNote: "Codex auth and quota history are read and stored locally; they are not uploaded to Hooosberg servers.",
    features: ["Menu-bar progress ring", "Weekly quota and five-hour windows", "Local history and depletion estimates", "Signed and notarized DMG"],
    courseHooks: ["Codex workflow", "macOS menu-bar tools", "SwiftUI", "Local data"],
  },
  drowsebook: {
    displayName: "DrowseBook",
    category: "Bedtime read-aloud reader",
    tagline: "Let your own books read you to sleep.",
    summary: "An iPhone bedtime reading and listening app for EPUB, PDF, TXT, MOBI, AZW3, Apple TTS, ambient sound, and sleep timers.",
    audience: "Readers who want offline books, read-aloud sessions, and a quiet sleep-friendly interface.",
    platforms: ["iPhone", "iOS", "On-device"],
    status: ["App Store", "v1.1 approved", "No tracking"],
    privacyNote: "Book files, reading position, and settings stay in the app sandbox. There are no accounts or third-party tracking SDKs.",
    features: ["EPUB, PDF, TXT, MOBI, and AZW3 support", "Apple system voices", "Ambient sound and sleep timer", "No account, no ads, no tracking"],
    courseHooks: ["iOS local reading", "Text to speech", "Quiet product design", "App Store privacy labels"],
  },
  "sumi-mahjong": {
    displayName: "Sumi Mahjong",
    category: "Quiet puzzle game",
    tagline: "A no-ads, no-account, no-tracking ink-style Mahjong matching game.",
    summary: "A quiet iPhone tile-matching game with hand-tuned ink tiles, offline play, and optional one-time theme unlocks.",
    audience: "Players who like lightweight puzzle games without ads, stamina systems, or leaderboard pressure.",
    platforms: ["iPhone", "iOS", "Game"],
    status: ["App Store", "No ads", "No tracking"],
    privacyNote: "Normal play does not require network access. Optional purchases are handled by Apple StoreKit.",
    features: ["144 hand-tuned ink Mahjong tiles", "Classic two-turn matching rule", "Undo, hint, and shuffle", "No ad SDKs, accounts, or third-party tracking"],
    courseHooks: ["iOS small game", "StoreKit 2", "No-ads product design", "Multilingual launch"],
  },
  trekreel: {
    category: "3D trail-story tool",
    tagline: "Turn GPX and KML tracks into cinematic 3D map stories.",
    summary: "A creator tool for converting GPX/KML routes into cinematic 3D trail stories for hiking, cycling, running, and travel videos.",
    audience: "Outdoor creators, cyclists, runners, travelers, and route-story video makers.",
    platforms: ["macOS", "3D", "Maps"],
    status: ["App Store", "Creator tool", "Local-first"],
    privacyNote: "Route files are designed to be processed locally first.",
    features: ["Import GPX and KML tracks", "Create 3D route stories", "Designed for social video and travel recaps", "Multilingual launch assets"],
    courseHooks: ["Map visualization", "GPX and KML", "Video asset generation"],
  },
  "mood-button": {
    category: "Local AI mood journal",
    tagline: "Apple MLX and Qwen3 local AI voice mood journaling.",
    summary: "An iPhone local-AI voice mood journal built with Apple MLX and Qwen3.",
    audience: "Users who want private voice journaling, mood notes, and lightweight self-review.",
    platforms: ["iPhone", "MLX", "Qwen3"],
    status: ["App Review", "Resubmitted after rejection", "Local AI"],
    privacyNote: "The product direction centers on local voice and local model processing; privacy labels must match the release build.",
    features: ["Voice mood capture", "Apple MLX local inference", "Qwen3 lightweight interaction", "Low-friction journaling"],
    courseHooks: ["Local AI", "Voice journaling", "Mood-product boundaries"],
  },
  rushi: {
    displayName: "Rushi",
    category: "Scripture reading app",
    tagline: "Open Buddhist texts and a quiet iOS reading experience.",
    summary: "A calm scripture reading project for the Diamond Sutra, Heart Sutra, and multilingual public-domain text collections.",
    audience: "Readers who want clean scripture text, multilingual material, and a quiet reading ritual.",
    platforms: ["iOS", "Web", "Public-domain content"],
    status: ["Landing page", "Open content", "CC0"],
    privacyNote: "The content and reading flow are designed around simple local reading unless a future feature explicitly states otherwise.",
    features: ["Public-domain scripture content", "Quiet reading ritual", "Multilingual text organization", "Reusable content-product structure"],
    courseHooks: ["Content products", "Localization", "Calm app design"],
  },
  dailyzikr: {
    category: "Dhikr and prayer utility",
    tagline: "A quiet daily dhikr, tasbih, and qibla companion.",
    summary: "A lightweight iOS product for daily dhikr, tasbih counting, qibla direction, and localized Islamic practice support.",
    audience: "Users who want a respectful, low-noise spiritual utility.",
    platforms: ["iOS", "App Store", "Localization"],
    status: ["App Store", "Support page migration", "Localized"],
    privacyNote: "The product should disclose any location, compass, or notification use clearly in the store page and privacy policy.",
    features: ["Daily dhikr flow", "Tasbih counter", "Qibla-oriented utilities", "Localized religious content"],
    courseHooks: ["Localization", "Regional review risk", "Support-page migration"],
  },
  packpour: {
    category: "Postmortem: App Store Connect automation",
    tagline: "A browser helper idea compressed by platform rules and AI workflows.",
    summary: "A project about App Store Connect field automation, locale packs, and side-panel workflows, now kept as a postmortem and operations lesson.",
    audience: "Indie app developers preparing App Store metadata at scale.",
    platforms: ["Chrome", "App Store Connect", "Operations"],
    status: ["Postmortem", "Extension concept", "Matrix operations"],
    privacyNote: "The extension direction requires careful platform-rule and account-permission review before any public release.",
    features: ["Locale-pack structure", "ASC side-panel UX", "Platform-rule lessons", "Metadata operations workflow"],
    courseHooks: ["App Store operations", "Browser extensions", "Locale packs", "Platform rules"],
    failure: true,
  },
  beraw: {
    category: "Behance raw-image utility",
    tagline: "A small browser utility for finding and batching original images.",
    summary: "A focused browser tool for raw-image detection, source-image strategy, ZIP batching, and small-tool privacy lessons.",
    audience: "Designers and researchers who need clean image-collection workflows.",
    platforms: ["Browser", "Images", "Utility"],
    status: ["Browser tool", "Small product", "Privacy-first"],
    privacyNote: "Image detection and batching should stay transparent and avoid unnecessary account or tracking behavior.",
    features: ["Raw-image detection", "Source-image strategy", "ZIP batching", "Small-tool privacy lessons"],
    courseHooks: ["Browser utility design", "Image workflows", "Small-tool lessons"],
  },
  uixskills: {
    category: "Postmortem: AI design protocol",
    tagline: "A complex AI design middle layer can be bypassed by stronger models.",
    summary: "An experiment connecting AI output, JSON, whiteboards, skills, and UI implementation, now kept as a method-product postmortem.",
    audience: "People exploring AI design workflows, structured whiteboards, and UI-generation protocols.",
    platforms: ["Web", "Design", "AI"],
    status: ["Postmortem", "Prototype", "Independent domain"],
    privacyNote: "The independent experiment needs privacy details to be reviewed against its actual feature set before public expansion.",
    features: ["AI to structured JSON", "Whiteboard workflows", "SKILL design protocol", "UI implementation experiments"],
    courseHooks: ["AI design protocol", "Structured output", "Frontend implementation"],
    failure: true,
  },
};

function localizeAction(action: ProductAction | undefined, locale: Locale) {
  if (!action || locale === "zh-CN") return action;

  return {
    ...action,
    label: productActionLabelMap[action.label] ?? action.label,
  };
}

function buildEnglishDetail(product: Product, override: EnglishProductOverride) {
  const statusText = (override.status ?? product.status).join(" / ");
  const platformText = (override.platforms ?? product.platforms).join(" / ");
  const hooks = override.courseHooks;

  return {
    overview: [
      `${override.displayName ?? product.name} is positioned as ${override.tagline}`,
      `It currently lives across ${platformText}, with public status marked as ${statusText}. This page keeps the download path, repository, privacy boundary, support contact, and build diary under one domain.`,
      override.privacyNote,
    ],
    proofPoints: [
      { label: "Platform", value: platformText, note: `Current status: ${statusText}` },
      { label: "Audience", value: override.audience, note: "The page explains the product in user-facing language, not just developer notes." },
      { label: "Privacy", value: product.privacy.collectsData ? "Disclosed by feature" : "No personal data collected by the product itself", note: override.privacyNote },
      { label: override.failure ? "Postmortem" : "Build record", value: override.failure ? "Failure case kept public" : "Connected to product diaries", note: "The product is also used as a reusable teaching case." },
    ],
    valueProps: [
      { title: override.failure ? "Honest postmortem" : "Clear positioning", body: override.summary },
      { title: "Trust boundary", body: override.privacyNote },
      { title: "Reusable learning asset", body: `Related course hooks include ${hooks.join(", ")}.` },
    ],
    featureDetails: override.features.map((feature) => ({
      title: feature,
      body: `This is one of the public-facing capabilities or lessons used to explain ${override.displayName ?? product.name} clearly to users, reviewers, and future readers.`,
    })),
    principles: [
      { title: "Keep the public promise narrow", body: "The page should only promise what the current product, review state, and distribution channel can actually support." },
      { title: "Make privacy inspectable", body: override.privacyNote },
      { title: "Turn the build into teaching material", body: "The product page and diary series should help other builders understand the decisions, tradeoffs, launch work, and mistakes behind the result." },
    ],
    diaryIntro: override.failure
      ? "The diary is kept as a postmortem: why the idea looked reasonable, what changed, and which methods can still be reused."
      : "The diary records the product from idea, design, implementation, review, launch, operations, and post-release learning.",
  };
}

export function getLocalizedProduct(product: Product, locale: Locale): Product {
  if (locale === "zh-CN") return product;

  const override = productEnglish[product.slug];
  if (!override) return product;

  return {
    ...product,
    displayName: override.displayName ?? product.displayName,
    category: override.category,
    tagline: override.tagline,
    summary: override.summary,
    audience: override.audience,
    platforms: override.platforms ?? product.platforms,
    status: override.status ?? product.status,
    primaryAction: localizeAction(product.primaryAction, locale) ?? product.primaryAction,
    secondaryAction: localizeAction(product.secondaryAction, locale),
    privacy: {
      ...product.privacy,
      note: override.privacyNote,
    },
    features: override.features,
    buildNotes: [
      "Public build notes are translated into a reusable product diary.",
      "The English version focuses on context, decisions, implementation, launch, and lessons.",
    ],
    courseHooks: override.courseHooks,
    detail: buildEnglishDetail(product, override),
    caseStudy: product.caseStudy ? { kind: "failure", label: "Postmortem" } : undefined,
  };
}

export function getLocalizedProducts(locale: Locale) {
  return products.map((product) => getLocalizedProduct(product, locale));
}

const categoryEn: Record<string, string> = {
  "Codex 办公": "Codex office automation",
  "产品复盘": "Product postmortem",
  "App Store": "App Store",
  "AI 工作流": "AI workflow",
  "设计系统": "Design system",
  "架构实现": "Architecture",
  "读书日记": "Reading note",
  "随想日记": "Essay",
  "资源分享": "Resource note",
};

const articleTagEn: Record<string, string> = {
  "AI": "AI",
  "AI办公": "AI office automation",
  "AI助手": "AI assistant",
  "AI图像": "AI image",
  "AI学习": "AI learning",
  "AI工具": "AI tools",
  "AI开发": "AI development",
  "AI教程": "AI tutorials",
  "AI编程": "AI coding",
  "ASO": "ASO",
  "AVSpeech": "AVSpeech",
  "Agent": "Agent",
  "AppReview": "App Review",
  "AppStore": "App Store",
  "Books": "Books",
  "DrowseBook": "DrowseBook",
  "EPUB": "EPUB",
  "IAP": "IAP",
  "Linux": "Linux",
  "Local-first": "Local-first",
  "MOBI": "MOBI",
  "Ollama": "Ollama",
  "PDF": "PDF",
  "PNG": "PNG",
  "Rust": "Rust",
  "StoreKit": "StoreKit",
  "SumiMahjong": "Sumi Mahjong",
  "SwiftUI": "SwiftUI",
  "TTS": "TTS",
  "Tauri": "Tauri",
  "TypeScript": "TypeScript",
  "UI": "UI",
  "iOS": "iOS",
  "iPhone": "iPhone",
  "个人创业": "solo entrepreneurship",
  "中国大陆": "mainland China",
  "中年失业": "mid-career unemployment",
  "主题设计": "theme design",
  "买断": "one-time purchase",
  "交互": "interaction",
  "产品哲学": "product philosophy",
  "产品复盘": "product postmortem",
  "产品气质": "product tone",
  "产品矩阵": "product matrix",
  "产品规格": "product specification",
  "信息论": "information theory",
  "公司转型": "company transformation",
  "创造者": "creator",
  "前端": "frontend",
  "功能推敲": "feature reasoning",
  "功能规格": "feature spec",
  "动效": "motion design",
  "协作": "collaboration",
  "历史": "history",
  "发布流程": "release workflow",
  "听书": "audiobook",
  "命名": "naming",
  "品牌": "brand",
  "哲学": "philosophy",
  "商业模式": "business model",
  "复用": "reuse",
  "学习": "learning",
  "学习方法": "learning method",
  "安静体验": "quiet experience",
  "完成审计": "completion audit",
  "实战": "practice",
  "审核": "review",
  "工作流": "workflow",
  "市场调研": "market research",
  "平台选择": "platform choice",
  "开发周期": "development cycle",
  "开源": "open source",
  "开源项目": "open-source project",
  "思想入门": "intro to ideas",
  "性能": "performance",
  "性能优化": "performance optimization",
  "惰性加载": "lazy loading",
  "手感": "feel",
  "技术": "technology",
  "技术人文": "technology and humanities",
  "推广": "promotion",
  "提示词": "prompts",
  "效率工具": "productivity tool",
  "文明": "civilization",
  "方法": "method",
  "无广告": "no ads",
  "本地AI": "local AI",
  "本地优先": "local-first",
  "本地化": "localization",
  "架构": "architecture",
  "桌面应用": "desktop app",
  "流程": "process",
  "测试": "testing",
  "海外收入": "international revenue",
  "游戏矩阵": "game portfolio",
  "游戏设计": "game design",
  "版本迭代": "version iteration",
  "独立开发": "indie development",
  "玩法算法": "gameplay algorithm",
  "生成器": "generator",
  "用户痛点": "user pain points",
  "白板": "whiteboard",
  "睡前模式": "bedtime mode",
  "社会理论": "social theory",
  "科学人物": "scientific figures",
  "移动场景": "mobile context",
  "立项": "project validation",
  "系统工程": "systems engineering",
  "组织": "organization",
  "缓存": "cache",
  "美学": "aesthetics",
  "耐玩性": "replayability",
  "自动化": "automation",
  "自我训练": "self-training",
  "艺术": "art",
  "节点系统": "node system",
  "视觉方向": "visual direction",
  "认知": "cognition",
  "设计": "design",
  "设计系统": "design system",
  "资产管线": "asset pipeline",
  "资料库": "knowledge base",
  "跨平台": "cross-platform",
  "长期结构": "long-term structure",
  "阅读体验": "reading experience",
  "随机布局": "random layout",
  "隐私": "privacy",
  "3D": "3D",
  "AI 设计": "AI design",
  "AI 隐私": "AI privacy",
  "Age Rating": "Age Rating",
  "AgentLimb": "AgentLimb",
  "App Review": "App Review",
  "App Store Connect": "App Store Connect",
  "BeRaw": "BeRaw",
  "Behance": "Behance",
  "CDN": "CDN",
  "Chrome": "Chrome",
  "Chrome 扩展": "Chrome extension",
  "Codex": "Codex",
  "DMG": "DMG",
  "DOM": "DOM",
  "DOMPrompter": "DOMPrompter",
  "DailyZikr": "Daily Zikr",
  "Electron": "Electron",
  "GPX": "GPX",
  "GlotShot": "GlotShot",
  "Icon": "Icon",
  "JSON": "JSON",
  "KML": "KML",
  "Local bridge": "Local bridge",
  "MAS": "Mac App Store",
  "MCP": "MCP",
  "MLX": "MLX",
  "Manifest": "Manifest",
  "Markdown": "Markdown",
  "Mood Button": "Mood Button",
  "OpenAI-compatible": "OpenAI-compatible",
  "Packpour": "Packpour",
  "Poster": "Poster",
  "QA": "QA",
  "Qibla": "Qibla",
  "Quota": "Quota",
  "Qwen3": "Qwen3",
  "RTL": "RTL",
  "Rushi": "Rushi",
  "SKILL": "SKILL",
  "Schema": "Schema",
  "Side Panel": "Side Panel",
  "Tasbih": "Tasbih",
  "TrekReel": "TrekReel",
  "UIXskills": "UIXskills",
  "Whiteboard": "Whiteboard",
  "WitNote": "WitNote",
  "ZIP": "ZIP",
  "locale pack": "locale pack",
  "macOS": "macOS",
  "上下文": "context",
  "上架": "launch",
  "个人站": "personal site",
  "产品边界": "product boundary",
  "仪式感": "ritual",
  "佛经": "Buddhist texts",
  "元数据": "metadata",
  "克制设计": "restrained design",
  "公共领域": "public domain",
  "公证": "notarization",
  "内容": "content",
  "内容产品": "content product",
  "内容审核": "content review",
  "内容工程": "content engineering",
  "内容来源": "content sourcing",
  "写作": "writing",
  "前端实现": "frontend implementation",
  "办公自动化": "office automation",
  "功能设计": "feature design",
  "动画": "animation",
  "区域": "region",
  "原图": "original images",
  "发布": "release",
  "图片识别": "image detection",
  "增长": "growth",
  "复盘": "postmortem",
  "多语言": "multilingual",
  "多账号": "multi-account",
  "安全": "security",
  "安静设计": "quiet design",
  "审核风险": "review risk",
  "导出": "export",
  "小工具": "small tool",
  "平台规则": "platform rules",
  "开发体验": "developer experience",
  "情绪产品": "mood product",
  "情绪数据": "mood data",
  "户外": "outdoor",
  "批量下载": "batch download",
  "批量导出": "batch export",
  "拒审复盘": "review rejection postmortem",
  "接入": "integration",
  "支持页": "support page",
  "政策": "policy",
  "效率": "efficiency",
  "教程": "tutorial",
  "数据格式": "data format",
  "数据模型": "data model",
  "文案": "copywriting",
  "方法论": "methodology",
  "日历": "calendar",
  "日记": "diary",
  "本地文件": "local files",
  "来源": "sources",
  "桌面工具": "desktop tool",
  "模型接入": "model integration",
  "沉淀": "knowledge capture",
  "浏览器权限": "browser permissions",
  "海拔": "elevation",
  "相机": "camera",
  "矩阵": "matrix",
  "窗口管理": "window management",
  "签名": "signing",
  "素材": "assets",
  "组件": "components",
  "结构化": "structured data",
  "菜单栏": "menu bar",
  "规格": "spec",
  "视频导出": "video export",
  "记忆": "memory",
  "设备框": "device frames",
  "设计流程": "design workflow",
  "设计还原": "design QA",
  "语境": "context",
  "语音": "voice",
  "语音转写": "speech transcription",
  "课程": "course",
  "轨迹解析": "track parsing",
  "转化": "conversion",
  "运营": "operations",
  "运营自动化": "operations automation",
  "选择列表": "selection list",
  "选择器": "selector",
  "长文": "long-form writing",
  "闭环": "closed loop",
  "静心": "quiet focus",
  "预测": "forecasting",
  "验收标准": "acceptance criteria",
};

export function getLocalizedArticleTags(tags: string[], locale: Locale) {
  if (locale === "zh-CN") return tags;
  return tags.map((tag) => articleTagEn[tag] ?? (/[\u3400-\u9fff]/.test(tag) ? "build note" : tag));
}

export const diarySectionsLocalized: Record<Locale, Array<{ kind: DiaryKind; label: string; summary: string }>> = {
  "zh-CN": [
    { kind: "product", label: "产品日记", summary: "真实产品开发过程的聚合：立项、功能、架构、上架、复盘和每一次和 AI 共同推进的记录。" },
    { kind: "reading", label: "读书日记", summary: "AI 时代他们在训练模型，图书就是我们的大脑的磨刀石，最高级的资产就是我们的大脑。" },
    { kind: "thought", label: "随想日记", summary: "关于 AI、办公、失业、技术人文和个人开发道路的松散记录，先把真实想法留下来。" },
    { kind: "resource", label: "资源分享日记", summary: "平时发现好的开源项目、工具、资料和工作流，就写成中文推荐，给需要的人一条更短的路。" },
  ],
  en: [
    { kind: "product", label: "Product diaries", summary: "Real build records covering ideas, features, architecture, review, launch, operations, postmortems, and AI-assisted decisions." },
    { kind: "reading", label: "Reading notes", summary: "Books as sharpening stones for the mind in an AI age." },
    { kind: "thought", label: "Essays", summary: "Loose but useful notes on AI, work, unemployment, technology, humanities, and the indie builder path." },
    { kind: "resource", label: "Resource notes", summary: "Curated tools, open-source projects, references, and workflows discovered while building." },
  ],
};

export type LocalizedArticle = Omit<Article, "category"> & {
  category: string;
};

const titleCaseWord = (word: string) => {
  const upper = new Set(["ai", "api", "ios", "ui", "ux", "json", "dmg", "vfx", "iap", "qa", "mcp", "gpx", "kml", "mlx", "asc"]);
  if (upper.has(word.toLowerCase())) return word.toUpperCase();
  if (word.toLowerCase() === "qwen") return "Qwen";
  if (word.toLowerCase() === "codex") return "Codex";
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
};

export function titleFromSlug(slug: string) {
  return slug
    .replace(/^\d+-/, "")
    .split("-")
    .filter(Boolean)
    .map(titleCaseWord)
    .join(" ");
}

function makeEnglishArticleTitle(article: Article, localizedProducts: Product[]) {
  const productPrefix = localizedProducts.map((product) => product.displayName).join(" / ");
  const productSlugPrefix = localizedProducts.find((product) => article.slug.startsWith(`${product.slug}-`))?.slug;
  const shortSlug = productSlugPrefix ? article.slug.replace(`${productSlugPrefix}-`, "") : article.slug;
  const readable = titleFromSlug(shortSlug);

  return productPrefix ? `${productPrefix} · ${readable}` : readable;
}

function makeEnglishArticleBody(article: Article, title: string, localizedProducts: Product[]) {
  const productNames = localizedProducts.map((product) => product.displayName).join(", ");
  const productSummary = localizedProducts.map((product) => product.summary).join(" ");
  const hooks = [...new Set(localizedProducts.flatMap((product) => product.courseHooks))].slice(0, 6).join(", ");
  const tags = getLocalizedArticleTags(article.tags, "en").join(", ");

  if (article.diaryKind === "resource") {
    return [
      `${title} is an English resource note from Hooosberg. It keeps the useful link discoverable for international readers while adding enough context to explain why the resource matters.`,
      `The original note is tagged with ${tags || "tools and product learning"}. Instead of treating resources as a link dump, this site records what the resource can teach a builder, where it fits in an AI workflow, and how it might be reused in a real product.`,
      article.resourceUrl ? `Resource URL: ${article.resourceUrl}` : "The resource link is kept on the public article page when available.",
      "Use this note as a starting point: inspect the project, read its documentation, compare it with your own workflow, and decide whether it belongs in your toolchain. The goal is not to collect everything, but to reduce the distance between discovery and practice.",
    ];
  }

  if (article.diaryKind === "reading") {
    return [
      `${title} is an English reading note from Hooosberg. The reading journal is not a traditional book review; it records how a book changes product judgment, technical taste, and the way a builder asks questions.`,
      `The original Chinese note is tagged with ${tags || "reading and thinking"}. The English version keeps the reusable idea visible for international readers: books sharpen the mind in a period when everyone is training models, and the mind remains the highest-leverage asset.`,
      "The note is meant to sit next to product diaries. Technical products are not only code and interfaces; they also carry views about people, work, taste, institutions, and time.",
      "A good reading note should leave one practical question behind: what does this book help me notice that a model or tool would otherwise flatten into a generic answer?",
    ];
  }

  if (article.diaryKind === "thought") {
    return [
      `${title} is an English essay from Hooosberg's public notebook. It records a working thought rather than a finished doctrine.`,
      `The original note is tagged with ${tags || "AI, work, and independent building"}. These essays connect AI tools with real working conditions: process design, company adoption, unemployment risk, product taste, and the small paths available to individual builders.`,
      "The point is not to make AI sound magical. The useful question is how people keep agency when tools become faster, companies become cautious, and workflows need to be redesigned instead of merely decorated with prompts.",
      "This English version keeps the idea searchable for global readers and links it back into the product diary system, where thoughts are tested against actual builds.",
    ];
  }

  return [
    `${title} is part of Hooosberg's public product diary${productNames ? ` for ${productNames}` : ""}. It turns a real build step into a searchable case study for international readers.`,
    productSummary || "The article belongs to a long-running product matrix where apps, tools, launch assets, and postmortems are kept under one personal domain.",
    `The original Chinese article was published on ${article.date} under ${categoryEn[article.category] ?? article.category}. It focuses on ${article.excerpt}`,
    `The reusable learning angle is ${hooks || "idea selection, AI-assisted implementation, launch preparation, and post-release review"}. The diary format is deliberately practical: context, decision, implementation boundary, review impact, and what another builder can reuse.`,
    "This English page is generated from the same public product facts as the Chinese site. It is meant to be indexable and useful now, while still leaving room for later hand-polished translation of the full Chinese narrative.",
  ];
}

function makeEnglishArticleSections(article: Article, localizedProducts: Product[]): ArticleSection[] {
  const privacyNotes = localizedProducts.map((product) => product.privacy.note).filter(Boolean).join(" ");
  const features = localizedProducts.flatMap((product) => product.features).slice(0, 6).join(", ");
  const productNames = localizedProducts.map((product) => product.displayName).join(", ");

  if (article.diaryKind !== "product") {
    return [
      {
        heading: "Why it belongs here",
        paragraphs: [
          "The site treats notes, resources, and essays as part of the same long-term knowledge system as products. They help explain the judgment behind the builds.",
          "For search, this creates more than a personal diary: it creates a public map of tools, questions, books, workflows, and decisions that compound over time.",
        ],
      },
      {
        heading: "Reusable takeaway",
        paragraphs: [
          "The useful output is not a perfect conclusion, but a sharper question that can be applied to a product, workflow, course, or future experiment.",
        ],
      },
    ];
  }

  return [
    {
      heading: "Context",
      paragraphs: [
        productNames
          ? `This entry belongs to the ${productNames} build series. It should be read as one stage in a larger product journey, not as an isolated announcement.`
          : "This entry belongs to the public build diary system and records one stage in a real product journey.",
        "The site keeps success cases and failure cases together because both create reusable judgment.",
      ],
    },
    {
      heading: "Implementation boundary",
      paragraphs: [
        features
          ? `Relevant product capabilities include ${features}. The diary explains how these capabilities are selected, constrained, reviewed, or turned into launch material.`
          : "The implementation details are kept practical: what changed, what was deferred, how the decision was verified, and what evidence should remain for future reuse.",
      ],
    },
    {
      heading: "Privacy and trust",
      paragraphs: [
        privacyNotes || "The public page should keep privacy, platform rules, and support expectations aligned with the actual product state.",
        "For an indie product matrix, trust is built through many small facts: local data boundaries, review status, support links, honest postmortems, and stable canonical pages.",
      ],
    },
    {
      heading: "What another builder can reuse",
      paragraphs: [
        "Another builder can reuse the pattern: start with a narrow product promise, make the privacy boundary inspectable, connect every public page to a real download or repository, and turn the launch process into a searchable article.",
        "That is why the diary sits next to the product page. The product builds trust, and the diary teaches the path that made the product possible.",
      ],
    },
  ];
}

export function getLocalizedArticle(article: Article, locale: Locale): LocalizedArticle {
  if (locale === "zh-CN") return article;

  const localizedProducts = article.productSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product))
    .map((product) => getLocalizedProduct(product, locale));
  const title = makeEnglishArticleTitle(article, localizedProducts);
  const category = categoryEn[article.category] ?? article.category;
  const tags = getLocalizedArticleTags(article.tags, locale);

  return {
    ...article,
    title,
    category,
    tags,
    excerpt: `${category} about ${titleFromSlug(article.slug).toLowerCase()}, published as part of Hooosberg's bilingual product and AI-build notebook.`,
    productLabel: localizedProducts.map((product) => product.displayName).join(", ") || undefined,
    body: makeEnglishArticleBody(article, title, localizedProducts),
    sections: makeEnglishArticleSections(article, localizedProducts),
  };
}

export function getLocalizedArticles(articles: Article[], locale: Locale) {
  return articles.map((article) => getLocalizedArticle(article, locale));
}

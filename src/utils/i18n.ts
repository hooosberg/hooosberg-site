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
      ["笔记", "/blog"],
      ["产品", "/apps"],
      ["AI导航", "/ai-navigation"],
      ["联系", "/links"],
      ["定制服务", "/services"],
    ],
    moreNavLabel: "其他",
    moreNav: [
      ["课程", "/courses"],
    ],
    themeToggle: "切换黑白主题",
    languageSwitch: "Switch to English",
    footerCopy: "真实项目教程、独立 App、AI 工具和长期产品记录。",
    productDiary: "开发笔记",
    viewProduct: "查看产品详情",
  },
  en: {
    brandAria: "Hooosberg home",
    nav: [
      ["Notes", "/blog"],
      ["Products", "/apps"],
      ["AI Guide", "/ai-navigation"],
      ["Contact", "/links"],
      ["Custom Services", "/services"],
    ],
    moreNavLabel: "More",
    moreNav: [
      ["Courses", "/courses"],
    ],
    themeToggle: "Toggle light and dark theme",
    languageSwitch: "切换到中文",
    footerCopy: "Real product notes, independent apps, AI tools, and long-term build notes.",
    productDiary: "Build notes",
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
  "微信": "WeChat",
};

const socialNoteEn: Record<string, string> = {
  GitHub: "hooosberg",
  X: "@hooosberg",
  YouTube: "@hooosberg",
  TikTok: "@hooosberg",
  Telegram: "@hooosberg",
  "微信": "hooosberg",
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
  "微信": "WeChat ID: hooosberg",
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
    category: "Local Markdown and AI writing workspace",
    tagline: "Write in a local Markdown workspace with on-device AI assistance.",
    summary: "WitNote 2.0.1 is a native macOS Markdown writing and knowledge workspace rebuilt in Swift, with local folders, format conversion, bilingual reading, and MLX local AI.",
    audience: "Writers, researchers, and people who want their Markdown files to stay under their own control.",
    platforms: ["macOS", "Native Swift", "Local MLX AI"],
    status: ["Mac App Store", "2.0.1", "Local-first"],
    privacyNote: "User-selected folders, Markdown documents, and exports stay local by default. Local inference does not send writing to a hosted AI service by default; model downloads, StoreKit, and user-opened external links are explicit network actions.",
    features: ["Native Swift macOS workspace", "Markdown folders as a local knowledge base", "MLX local AI with a bundled Qwen3 starter model", "PDF / Word / EPUB conversion, bilingual reading, and writing assistance"],
    courseHooks: ["Native Swift macOS", "Local AI and MLX", "Markdown knowledge workspaces", "App Store refactor launch"],
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
    summary: "A quiet iPhone and iPad tile-matching game with hand-tuned ink tiles, offline play, and optional one-time theme unlocks.",
    audience: "Players who like lightweight puzzle games without ads, stamina systems, or leaderboard pressure.",
    platforms: ["iPhone", "iPad", "iOS", "Game"],
    status: ["App Store", "v1.1 iPad update", "No ads", "No tracking"],
    privacyNote: "Normal play does not require network access. Optional purchases are handled by Apple StoreKit.",
    features: ["144 hand-tuned ink Mahjong tiles", "Classic two-turn matching rule", "Undo, hint, and shuffle", "No ad SDKs, accounts, or third-party tracking"],
    courseHooks: ["iOS and iPadOS small game", "StoreKit 2", "No-ads product design", "Multilingual launch"],
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
    platforms: ["iPhone", "iPad", "MLX", "Qwen3"],
    status: ["App Store", "v1.0 live", "Local AI"],
    privacyNote: "Recordings, transcripts, diary text, mood labels, search terms, and skin preferences stay on device. The bundled Qwen3 MLX model runs locally and user content is not sent to OpenAI, Anthropic, Gemini, ChatGPT, or other hosted third-party AI services. Apple Speech may process speech recognition under iOS system behavior, and optional weather uses Open-Meteo with rounded coordinates after Location permission.",
    features: ["Voice mood capture", "Apple MLX local inference", "Qwen3 lightweight interaction", "Low-friction journaling"],
    courseHooks: ["Local AI", "Voice journaling", "Mood-product boundaries"],
  },
  rushi: {
    displayName: "Rushi",
    category: "Scripture reading and copy-practice app",
    tagline: "A quiet iOS app for sutra reading, mala counting, and copy-practice.",
    summary: "Rushi brings together the Diamond Sutra, Heart Sutra, multilingual scripture text, mala counting, quiet sound, and source-backed copybook practice based on open or public-domain source images. Reading and mala features are free; Copy Practice Unlock is an optional one-time in-app purchase handled by Apple StoreKit.",
    audience: "Readers who want clean scripture text, mala counting, multilingual material, and quiet calligraphy copy-practice on iPhone and iPad.",
    platforms: ["iPhone", "iPad", "iOS", "Public-domain sources"],
    status: ["App Store", "v1.1 in preparation", "One-time IAP"],
    privacyNote: "Scripture reading, mala counts, copy-practice works, settings, and copybook practice state stay on device. Rushi has no account system, no ads, and no third-party tracking. The optional one-time Copy Practice Unlock is handled by Apple StoreKit, and Hooosberg does not receive Apple IDs, payment methods, or billing details.",
    features: ["Diamond Sutra and Heart Sutra", "Mala counter", "Liu Gongquan and Ouyang Xun copybook sources", "Original copybook image preview", "iPad support"],
    courseHooks: ["Content products", "Localization", "StoreKit 2", "Public-domain source materials", "Calm app design"],
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
  const publicLinksText = product.hideSourceLinks
    ? "This page keeps the download path, privacy boundary, support contact, and build diary under one domain."
    : "This page keeps the download path, repository, privacy boundary, support contact, and build diary under one domain.";

  if (product.slug === "witnote") {
    return {
      overview: [
        "WitNote 2.0.1 is a major rewrite of an existing Mac App Store app. The product remains one App Store record, but the implementation now uses a native Swift macOS workspace and a local MLX inference route.",
        "The center of the product is still the user's Markdown files: a selected folder becomes a working knowledge space for writing, reading, conversion, and review. AI stays beside the document instead of replacing the document as the source of truth.",
        "The bundled Qwen3 0.6B 4-bit model gives a new user a ready local starting point. Additional model downloads are optional network actions and remain subject to the source model's own license and notice files.",
      ],
      proofPoints: [
        { label: "Version", value: "2.0.1", note: "A major Swift-native rewrite of the existing Mac App Store product." },
        { label: "Core", value: "Markdown workspace", note: "User-selected folders, editable documents, previews, and exports remain the center of the workflow." },
        { label: "AI", value: "MLX + Qwen3", note: "A bundled lightweight model supports a quick local start; other downloaded models are disclosed separately." },
        { label: "Privacy", value: "Local-first", note: override.privacyNote },
      ],
      valueProps: [
        { title: "The document stays in charge", body: "WitNote treats Markdown files and folders as durable user-owned work, while AI actions remain contextual tools for drafting, rewriting, translation, and organization." },
        { title: "Native Mac structure", body: "The rewrite moves the main workbench, file access, model management, settings, purchase restore, and window behavior into a Swift-native macOS architecture." },
        { title: "Privacy with explicit boundaries", body: "Local files and local inference are separated from model downloads, StoreKit, and any external page the user chooses to open." },
      ],
      featureDetails: [
        { title: "Markdown workspace", body: "Choose a local folder, edit Markdown documents, preview the rendered result, and keep the source files available to Finder and other tools." },
        { title: "Local knowledge workflow", body: "Folder organization, search, notes, versions, and document context make the local directory useful as a lightweight knowledge base." },
        { title: "MLX local AI", body: "The native app includes a Swift MLX runner and a bundled Qwen3 0.6B 4-bit starter model for local writing assistance on supported Macs." },
        { title: "Reading and conversion", body: "PDF, Word, and EPUB workflows are positioned as supporting capabilities for bringing material into Markdown, bilingual reading, notes, and export." },
        { title: "Release discipline", body: "The 2.0.1 release treats package signing, model notices, clean-start behavior, IAP restore, metadata, and App Review evidence as one connected acceptance chain." },
      ],
      principles: [
        { title: "Keep the public promise reproducible", body: "The product page only describes the native Mac build, bundled model, and verified workflows that the submitted package can actually reproduce." },
        { title: "Separate product code from model rights", body: "MLX, Qwen3, and any user-downloaded model remain credited through package notices and source terms instead of being presented as one proprietary asset." },
        { title: "Make publishing part of engineering", body: "Privacy wording, support links, purchase recovery, model downloads, package integrity, and App Store metadata are tested against the same release candidate." },
      ],
      diaryIntro: "The new WitNote diary entry explains the 2.0.1 Swift-native rewrite, local Markdown architecture, MLX model path, model-management lessons, legal boundaries, and the release checks that connect engineering to App Store publishing.",
    };
  }

  if (product.slug === "rushi") {
    return {
      overview: [
        "Rushi is organized around quiet sutra reading, mala counting, and copy-practice with source-backed calligraphy images.",
        "Version 1.1 adds iPad support and calligraphy copybooks. Scripture reading, mala counting, and quiet sound remain free; Copy Practice Unlock is an optional one-time Apple StoreKit purchase, not a subscription.",
        "The copybook materials are disclosed as public-domain, open-license, or otherwise openly usable sources. In copy practice, users can view original copybook images, switch Diamond Sutra pages, drag between pages, and zoom for closer inspection.",
      ],
      proofPoints: [
        { label: "Platform", value: "iPhone / iPad", note: "The page, screenshots, and copy now describe the Universal iOS experience." },
        { label: "Purchase", value: "One-time unlock", note: "Reading and mala features are free. Copy Practice Unlock only unlocks calligraphy copy-practice and does not offer auto-renewable subscriptions." },
        { label: "Copybooks", value: "Liu Gongquan Diamond Sutra / Ouyang Xun Heart Sutra", note: "The app uses open or public-domain source materials and keeps original copybook images available for viewing." },
        { label: "Privacy", value: "Local storage", note: override.privacyNote },
      ],
      valueProps: [
        { title: "A quiet reading utility first", body: "Rushi does not promise religious outcomes, run a social feed, or add leaderboard pressure. It keeps scripture reading, mala counting, and practice lightweight." },
        { title: "Copybooks are real source images", body: "The calligraphy practice feature is based on source-backed copybooks rather than decorative stickers, including Liu Gongquan and Ouyang Xun materials where available." },
        { title: "The paid boundary is simple", body: "The core app stays free, while calligraphy copy-practice is a one-time optional unlock handled by Apple StoreKit." },
      ],
      featureDetails: [
        { title: "Diamond Sutra and Heart Sutra", body: "Clean scripture text and multilingual material provide the everyday reading base of the app." },
        { title: "Mala counter", body: "Mala counting stays local and quiet, without accounts, leaderboards, advertising, or social sync." },
        { title: "Source-backed calligraphy copybooks", body: "Copy practice uses source images such as Liu Gongquan Diamond Sutra stone-rubbing copybook material and Ouyang Xun Heart Sutra copybook material, subject to their public-domain or open-use source notices." },
        { title: "Original copybook image preview", body: "Original copybook images can be opened from copy practice with full-screen viewing, page switching, horizontal dragging, and zoom." },
        { title: "iPad support", body: "The iPad version gives reading, copy-practice, and image preview more room while keeping the App Store presentation aligned with real devices." },
      ],
      principles: [
        { title: "Explain source rights clearly", body: "Scripture and calligraphy materials should identify versions, source status, and use boundaries before they become product claims." },
        { title: "Do not interrupt free reading", body: "The optional unlock should explain premium copy-practice without confusing users who only want reading and mala features." },
        { title: "Respect cross-language use", body: "Chinese users may use system text alongside calligraphy; other-language users can still treat the copybook as a visual practice image." },
      ],
      diaryIntro:
        "The Rushi diary tracks public-domain scriptures, calligraphy source materials, iPad support, StoreKit one-time unlocks, and App Store compliance for a quiet content app.",
    };
  }

  return {
    overview: [
      `${override.displayName ?? product.name} is positioned as ${override.tagline}`,
      `It currently lives across ${platformText}, with public status marked as ${statusText}. ${publicLinksText}`,
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
  "视频教程笔记": "Video tutorial note",
  "读书笔记": "Reading note",
  "随想笔记": "Essay",
  "资源分享笔记": "Resource note",
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
  "课件": "slides",
  "视频教程": "video tutorial",
  "WorkBuddy": "WorkBuddy",
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
    { kind: "video", label: "视频教程笔记", summary: "承接 B 站视频课程，把单集链接、课件、提示词和操作流程整理成更清晰的公开笔记。" },
    { kind: "product", label: "产品笔记", summary: "真实产品开发过程的聚合：立项、功能、架构、上架、复盘和每一次和 AI 共同推进的记录。" },
    { kind: "reading", label: "读书笔记", summary: "AI 时代他们在训练模型，图书就是我们的大脑的磨刀石，最高级的资产就是我们的大脑。" },
    { kind: "thought", label: "随想笔记", summary: "关于 AI、办公、失业、技术人文和个人开发道路的松散记录，先把真实想法留下来。" },
    { kind: "resource", label: "资源分享笔记", summary: "平时发现好的开源项目、工具、资料和工作流，就写成中文推荐，给需要的人一条更短的路。" },
  ],
  en: [
    { kind: "video", label: "Video tutorial notes", summary: "Bilibili lessons organized into clearer notes with video links, slides, prompts, and repeatable workflow steps." },
    { kind: "product", label: "Product notes", summary: "Real build records covering ideas, features, architecture, review, launch, operations, postmortems, and AI-assisted decisions." },
    { kind: "reading", label: "Reading notes", summary: "Books as sharpening stones for the mind in an AI age." },
    { kind: "thought", label: "Essays", summary: "Loose but useful notes on AI, work, unemployment, technology, humanities, and the indie builder path." },
    { kind: "resource", label: "Resource notes", summary: "Curated tools, open-source projects, references, and workflows discovered while building." },
  ],
};

export type LocalizedArticle = Omit<Article, "category"> & {
  category: string;
};

type EnglishVideoOverride = Pick<LocalizedArticle, "title" | "excerpt" | "body" | "sections">;

const englishVideoArticleOverrides: Record<string, EnglishVideoOverride> = {
  "video-workbuddy-lesson1-excel-automation": {
    title: "Lesson 1 | Learn AI Office Automation with an Excel Scheduling Case",
    excerpt: "Use a scheduling workbook to learn the safe order for AI-assisted spreadsheet work: inspect, plan, process, and verify.",
    body: ["This introductory lesson uses a company scheduling workbook to show that reliable automation begins with understanding the file—not with asking AI to change it immediately.", "The practical sequence is simple: inspect every sheet and its fields, explain the existing rules, agree on a processing plan, create a new output, and spot-check the result against the source workbook."],
    sections: [{ heading: "What to learn", paragraphs: ["Ask WorkBuddy to identify worksheets, people, dates, shifts, status fields, and missing or inconsistent values before it performs any edit.", "When the output is ready, compare a sample of source rows with the result and check date ranges, headcount, shift totals, and exception flags."], codeBlocks: ["Read this Excel workbook without modifying it. Explain the purpose of each worksheet, the important fields, their relationships, and any data issues that could affect later processing. Then propose a verification-friendly processing plan."] }],
  },
  "video-workbuddy-lesson2-ppt-murals": {
    title: "Lesson 2 | Build a Tang-Dynasty Mural Presentation with AI",
    excerpt: "Turn a presentation brief into an editable deck by separating narrative, slide copy, imagery, and visual direction.",
    body: ["The case is a presentation on Tang-dynasty mural research and conservation. The lesson separates the public-education story from the museum team's fieldwork and future plan.", "Instead of asking for slides in one step, define the audience, outline, slide-level copy, image brief, and layout guidance first."],
    sections: [{ heading: "Workflow", paragraphs: ["Start with an outline. Then specify every slide in three layers: concise on-slide text, an image brief for search or generation, and design direction for layout, color, hierarchy, and image placement.", "Before export, check text density, image overlap, title consistency, and visual rhythm between section-divider and content slides."], codeBlocks: ["Create an editable presentation about Tang-dynasty mural research and conservation. First provide an outline only. Then describe each slide with: (1) concise visible copy, (2) an image brief, and (3) design guidance for layout, type, color, and image placement."] }],
  },
  "video-workbuddy-lesson3-word-formatting": {
    title: "Lesson 3 | Automate Formal Word Document Formatting",
    excerpt: "Use an official-notice case to turn Word formatting requirements into an inspectable, repeatable delivery process.",
    body: ["This lesson uses a performance-review notice, a formatting specification, and a stamp asset. The goal is to preserve the business meaning while making the document conform to a formal layout standard.", "AI should inspect before editing, create a new version rather than overwrite the source, and report every formatting change."],
    sections: [{ heading: "Workflow", paragraphs: ["Identify the title, body, numbered sections, signature block, date, margins, and seal position. Compare them with the supplied specification before making changes.", "Review font and size consistency, paragraph spacing, indents, numbering continuity, signature placement, and whether the seal is transparent and clear of important text."], codeBlocks: ["Read the Word document and the formatting specification. List every mismatch before editing. Then create a new formatted version that preserves the original meaning, and report the changes to titles, body text, numbering, signature block, date, margins, and seal placement."] }],
  },
  "video-workbuddy-lesson4-image-editing": {
    title: "Lesson 4 | Edit Images with WorkBuddy",
    excerpt: "Make AI image editing reviewable by defining the target, local changes, versioned exports, and visual checks.",
    body: ["The lesson treats image editing as a versioned production task rather than a vague request to make an image look better.", "Keep the original image, describe the exact areas that may change, export intermediate versions, and inspect the result before final delivery."],
    sections: [{ heading: "Workflow", paragraphs: ["First ask the tool to observe the subject, background, text, edges, crop, and constraints. Confirm the target before it alters anything.", "For every important revision, save a separate version and check proportions, edges, text clarity, lower-edge cropping, and the overall composition."], codeBlocks: ["Inspect this image before making changes. Describe the subject, background, visible text, and details that may affect editing. Propose the steps, create a separate intermediate version, and then check proportions, edges, text clarity, and cropping before final export."] }],
  },
  "video-workbuddy-lesson5-ai-poster": {
    title: "Lesson 5 | Create a Company Poster with AI",
    excerpt: "A repeatable poster workflow: copy first, images second, composition third, then focused visual review.",
    body: ["This lesson builds an A4 promotional poster for an industrial manufacturing company. Its core method is: 1) copy, 2) images, 3) composition, and 4) a deliberate review loop.", "The first version may take time. Once the process is saved as a skill, later posters can reuse the same content, asset, layout, and QA sequence."],
    sections: [{ heading: "Design workflow", paragraphs: ["Start by confirming the headline, company introduction, services, qualifications, partners, and contact details. Only then decide which website assets to reuse, which images to source, and which ones to generate.", "In each review pass, name concrete defects: cropped logos, misaligned title groups, unreadable text, weak contrast, uneven service cards, incorrect partner-logo backgrounds, or poor print margins. Change only the stated issues and export a new numbered version."], codeBlocks: ["Create an A4 technology-style company poster. First turn the approved company information into headline, introduction, services, qualifications, partner, and contact copy. Next select or generate suitable images, then compose the poster. Save each revision as a separate JPEG at 300 dpi. In the review pass, check logo cropping, alignment, contrast, glass-panel readability, card consistency, partner logos, print margins, and bottom spacing."] }],
  },
  "video-workbuddy-lesson6-windows-cleanup": {
    title: "Lesson 6 | Clean Up Unwanted Windows Software and Install Trusted Apps",
    excerpt: "Use WorkBuddy to inspect software remnants carefully, verify what can safely be removed, and follow a clean installation path.",
    body: ["The lesson connects two practices: removing unwanted software remnants and installing software from legitimate sources. Clean installation reduces the chance of stray folders, startup entries, and registry debris later.", "System-level cleanup is high-risk. AI should list targets and explain risk before removal; registry, startup, and service changes require human confirmation."],
    sections: [{ heading: "Safe cleanup sequence", paragraphs: ["Inspect residual folders, registry references, startup items, suspicious entries, and scripts that could restore unwanted software. Do not stop at deleting a visible folder.", "After cleanup, run a second inspection for persistence mechanisms. For installations, confirm the source, version, target application, and overwrite decision."], codeBlocks: ["Inspect the listed residual software folders and related registry entries. Before removing anything, show the proposed targets and risks. Check for startup items, scheduled tasks, services, and scripts that could restore the software. After my confirmation, clean only the verified remnants and produce a report."] }],
  },
  "video-workbuddy-lesson7-bidding-workspace": {
    title: "Lesson 7 | Build a Reusable Tender Pricing Workspace",
    excerpt: "Organize historical projects, evaluation rules, a current tender, and a README into a repeatable pricing-analysis workflow.",
    body: ["This lesson is not about producing one spreadsheet. It is about building a workspace where historical records, applicable rules, current tender files, and human working instructions remain traceable.", "The reusable formula is: historical materials + rules + current task + a README work guide. New work begins only after the files and decision boundaries are organized."],
    sections: [{ heading: "Workflow", paragraphs: ["Keep source files unchanged. Use the README to define folder purpose, required fields, processing order, output locations, and how to label missing rules, mismatched units, or uncertain data.", "For a current project, prefer its official tender rules. Explain why any historical project was selected as a comparison, and place scoring, comparison, and risk reports in the output folder. Archive only after the final result is confirmed."], codeBlocks: ["Inspect the historical-project, evaluation-rule, and current-project folders. Create a README that defines file purposes, protected source files, key fields, processing order, exception labels, outputs, and archiving rules. Do not calculate or modify source files yet."] }],
  },
  "video-workbuddy-lesson8-study-planning": {
    title: "Lesson 8 | Build an AI-Assisted University Planning Workspace",
    excerpt: "Compare domestic, Hong Kong/Macau or joint-program, and overseas routes with evidence—never with a promise of admission.",
    body: ["The lesson helps families organize school data, planning rules, and a student profile. AI supports comparison and evidence gathering; it does not replace the official application system or the family's decision.", "Every recommendation must name its source, date, uncertainty, and official verification route. Classroom score examples are illustrative only."],
    sections: [{ heading: "Three planning routes", paragraphs: ["For domestic programmes, verify provincial plans, university regulations, subject requirements, rank history, and admission rules. For Hong Kong/Macau and joint programmes, verify recruitment route, tuition, scholarships, English requirements, and qualification pathway. For overseas routes, verify official application systems, total cost, language and document requirements, visas, and progression options.", "A useful student profile records province, year, subjects, score and rank range, language level, budget, interests, location preferences, non-negotiables, and desired outcome. Missing official evidence must be labelled ‘to be verified’."], codeBlocks: ["Read the school data, pathway notes, and student profile. List source dates and missing information. Compare domestic, Hong Kong/Macau or joint-program, and overseas options. For each option, state fit, budget and language conditions, risks, official verification links, and what the family must confirm next. Never use ‘guaranteed admission’ language."] }],
  },
  "video-workbuddy-lesson9-job-expert": {
    title: "Lesson 9 | Create Your Own AI Job-Search Expert",
    excerpt: "Structure résumé intake, public job research, company due diligence, and human-approved applications into one workflow.",
    body: ["The lesson separates an expert, reusable skills, and connectors. The expert makes the overall judgment; skills handle résumé matching and research; connectors access permitted public information or email tools.", "A recommendation is not an employment promise. Applications are a separate stage and must be approved by the person before any email is sent."],
    sections: [{ heading: "Workflow", paragraphs: ["Start from a reviewable résumé draft. Search only public job information and investigate company background, compensation claims, and public risk signals.", "Before applying, present the role, company, fit rationale, risks, and delivery method for approval. Do not send an unapproved résumé or treat public online information as conclusive evidence."], codeBlocks: ["Create a job-search expert that uses public information to find suitable roles. Build a reviewable résumé profile first; then research role fit, company background, stated compensation and benefits, and public risk signals. Present a shortlist for my approval. Do not apply or email anyone until I explicitly confirm each target."] }],
  },
  "video-workbuddy-lesson10-meituan-coupons": {
    title: "Lesson 10 | Automate a Daily Coupon Check Safely",
    excerpt: "Use a small recurring-task example to learn triggers, success checks, failure handling, and human fallback.",
    body: ["The coupon example is deliberately simple. The lesson is about how a recurring task needs a clear entry point, schedule, expected result, and failure notification.", "Account state, CAPTCHA challenges, changing campaign rules, confirmations, and payments remain human-controlled."],
    sections: [{ heading: "Workflow", paragraphs: ["Describe where the task starts, when it runs, what it is allowed to claim, and how success is detected.", "If login expires, verification is requested, terms are unclear, or an action could cause payment or commitment, stop and notify the user rather than bypassing the control."], codeBlocks: ["Define a daily coupon-check task: specify the entry point, schedule, eligibility conditions, success signal, and failure handling. Never bypass CAPTCHA or platform restrictions. Pause and notify me whenever login, confirmation, payment, or unclear rules require human action."] }],
  },
  "video-workbuddy-lesson11-procurement-analysis": {
    title: "Lesson 11 | Organize Purchasing and Procurement Analysis with AI",
    excerpt: "Use a procurement assistant to turn a request into a reviewable purchasing list and spreadsheet—not an automatic purchase.",
    body: ["This short lesson revisits the expert–skill–connector model: the procurement assistant owns the task, skills organize purchase data, and connectors work with approved files, spreadsheets, and communication channels.", "Unverified prices, stock, and supplier claims must never be treated as facts. Ordering, contracts, and payment require human review."],
    sections: [{ heading: "Workflow", paragraphs: ["Begin with a small request, then collect product name, specification, quantity, budget, delivery date, supplier constraints, and acceptance standard before preparing options.", "Convert only confirmed items into a spreadsheet. Keep unknown details blank and mark them for confirmation."], codeBlocks: ["Procurement assistant: help me prepare a purchase request for LED lights. Ask for specifications, quantity, budget, delivery deadline, supplier constraints, and acceptance criteria. Produce a reviewable list and spreadsheet; leave unknown values blank and do not place an order."] }],
  },
  "video-workbuddy-lesson12-salary-workspace": {
    title: "Lesson 12 | Build an Auditable Payroll Analysis Workspace",
    excerpt: "Turn many inconsistent payroll files into a governed workspace with mappings, a standardized database, reports, and audit checks.",
    body: ["The lesson does not ask AI to calculate payroll immediately. It first creates a long-lived project structure: source payroll files remain untouched; mappings, cleaning logs, exceptions, and the standardized database live in an intermediate layer; management reports live in a separate output folder.", "The six steps are workspace setup, source inspection, field mapping, cleaning and normalization, analysis, and audit. Uncertain fields, blank amounts, duplicates, and mismatched totals must be recorded rather than guessed."],
    sections: [{ heading: "Six-step workflow", paragraphs: ["Create README and rule files, a payroll field guide, a job-title dictionary, intermediate processing, and output folders. Inspect departments, file counts, fields, naming differences, and possible issues before producing final statistics.", "Map inconsistent field names to a standard model, build a new standardized database without editing originals, then analyze roles, pay components, and department labour cost. Finally reconcile all totals, spot-check ten employees, and confirm that department totals equal the sum of role totals."], codeBlocks: ["Create a maintainable payroll-analysis workspace while keeping the original payroll folder read-only. Create a README, analysis rules, payroll-field guide, job-title dictionary, intermediate-processing folder, and output-report folder. Stop after setup. Next, inspect files and field differences; create a mapping; normalize data into a new database; log every missing, duplicate, or inconsistent value; produce analysis reports; and audit total reconciliation, ten sampled employees, and department-versus-role totals."] }],
  },
  "video-workbuddy-lesson14-excel-basics": {
    title: "Lesson 14 | A Minimal Excel Workflow with WorkBuddy",
    excerpt: "Learn Excel through business intent and result checking instead of memorizing every operation.",
    body: ["The point is not to abandon Excel knowledge. It is to move the learning focus from clicking through features to understanding the data, stating the goal, and judging the result.", "Start with low-risk work such as summaries, filters, field explanations, and anomaly checks. Money, payroll, and submitted reports always need human review."],
    sections: [{ heading: "Workflow", paragraphs: ["Ask WorkBuddy to read the workbook, explain sheets and fields, and identify possible data issues. Then state the business outcome in plain language and agree on the plan and output format.", "After processing, check the source and calculation logic for a sample of rows. Do not treat a polished spreadsheet as proof that the underlying rules were correct."], codeBlocks: ["Read this Excel file without modifying it. Explain each worksheet, key fields, and possible data issues. Then propose the automation steps that could support my business goal. Wait for my approval before creating output, and show the source and calculation logic for every result."] }],
  },
  "video-workbuddy-lesson15-workflow-dashboard": {
    title: "Lesson 15 | Manage Work with Folders and a Web Dashboard",
    excerpt: "Make recurring administrative work visible with stage folders, a written process, task records, and a dashboard.",
    body: ["This lesson does not try to automate every action on a computer. It first makes the workflow visible: where materials are, what stage each item is in, what happens next, and what is close to its deadline.", "WorkBuddy can organize, check, summarize, and draft. Formal submission, case acceptance, completion, and any sensitive information still require human review."],
    sections: [{ heading: "Workflow", paragraphs: ["A folder represents a business stage; moving a record changes its status; a process document captures the role rules; and a web dashboard shows the whole workload. The sample includes intake, certificate preparation, case handling, public-disclosure reporting, archiving, completed records, templates, and weekly outputs.", "The real job examples include data entry and document creation, periodic reporting, merging colleagues’ tables, retention and filing, exception follow-up, paper archives, platform deadlines, and weekly reporting. A weekly draft should show new, completed, pending, reported, archived, delayed, and next-week items."], codeBlocks: ["Read the workspace folders, the root process guide, and task records. Count items at every stage; identify the most urgent deadlines; flag missing required fields; list stage, record ID, organization, deadline, and next action; and draft a weekly report covering new, completed, pending, reporting, archiving, exceptions or delays, and next-week work. Do not modify source files or invent, expose, or send sensitive information."] }],
  },
  "video-workbuddy-lesson16-inventory-dashboard": {
    title: "Lesson 16 | Build a Weekly Sales and Inventory Dashboard with Excel",
    excerpt: "Start from raw store data and build a filterable, formula-driven dashboard that preserves historical weeks and can be updated repeatedly.",
    body: ["This lesson starts with raw fictional fashion-store data instead of a finished dashboard. WorkBuddy helps inspect the data, define metric rules, build formulas, add filters, create charts, and design a safe weekly append process.", "The dashboard tracks target completion, sell-through, sell-through activity, gross margin, discount, unit price, average order value, and product and inventory distribution."],
    sections: [{ heading: "The dashboard workflow", paragraphs: ["Keep raw data, parameter lists, metric summaries, visualization, store comparison, and usage instructions in separate sheets. Append new weeks; never overwrite history.", "Check every denominator, use formulas instead of fixed values, and finish with formula-error scanning plus a manual sample against the source data."], codeBlocks: ["Read the raw weekly sales and inventory workbook without building the final dashboard. Inspect sheets, fields, record counts, naming differences, nulls, duplicate store/SKU/week rows, inventory logic, and target uniqueness. Produce an exception report and wait for confirmation before changing source data."] }],
  },
  "video-workbuddy-lesson17-xcode-agents": {
    title: "Lesson 17 | Xcode 26.6 Connects Codex and Claude Code for AI iOS Development",
    excerpt: "A hands-on look at Xcode 26.6, third-party agents, project context, build tools, tests, permissions, and MCP.",
    body: ["This is a product update and real-world experiment rather than a Word-based WorkBuddy lesson. It examines how Xcode 26.6 opens more direct collaboration with third-party AI agents.", "The demo covers permissions, project context, compilation, automated tests, and the difference between Xcode MCP integration and ordinary command-line work."],
    sections: [{ heading: "What changed", paragraphs: ["The important shift is from an agent working beside Xcode to Xcode exposing collaboration points for agents. That can reduce context switching, but it does not remove the need to review permissions, diffs, build output, and test results."], codeBlocks: ["In your Xcode project, confirm third-party agent permissions first. Ask the agent to inspect the project, propose a change plan, run a build and tests, and report each result without making unapproved changes."] }],
  },
  "video-workbuddy-lesson18-hy3-model": {
    title: "Lesson 18 | WorkBuddy’s Hy3 Model Promotion and Choosing AI Models",
    excerpt: "Understand the temporary Hy3 free-access window, model selection, quota usage, and how to practice AI office workflows at low cost.",
    body: ["This is a WorkBuddy model-information episode, not a case-based Word lesson. It explains the temporary Hy3 promotion through August 31 and how model choice affects task quality and quota use.", "Use the window to practice documents, Excel, presentations, code, and workflows, while checking the current product page because promotions and quotas can change."],
    sections: [{ heading: "A practical selection rule", paragraphs: ["Choose based on task complexity, context length, tool use, reasoning needs, and the risk of a wrong result. Lightweight tasks do not always need the strongest model; high-impact reasoning and code tasks may.", "Treat pricing and promotional terms as time-sensitive product information, not as a permanent guarantee."], codeBlocks: ["Describe the task goal, input materials, risk level, and acceptance checks first. Then choose an appropriate WorkBuddy model, run the task, and verify both the result and the current quota rules."] }],
  },
  "video-workbuddy-lesson19-agentlimb-forum-posting": {
    title: "Lesson 19 | Use WorkBuddy and AgentLimb to Automate a Forum Post",
    excerpt: "Operate a browser through AgentLimb and save a successful, reviewable browser action as reusable muscle memory.",
    body: ["This lesson introduces MCP browser control and AgentLimb muscle memory. A browser task is described, completed, verified, and then saved so a similar task can be replayed more quickly.", "Forum posting is only a demonstration. Public publishing still needs content review, account authorization, and a human check before submission."],
    sections: [{ heading: "Two source prompts", paragraphs: ["The first prompt describes the browser task and asks to save the successful flow. The second calls the saved muscle memory. The Chinese source prompts remain available on the Chinese page for exact course reproduction."], codeBlocks: ["Use AgentLimb to open a suitable forum, draft an appropriate post, show me the target and content for approval, publish only after confirmation, and save the verified browser flow as reusable muscle memory. Do not bypass platform rules or publish unapproved content."] }],
  },
  "video-workbuddy-lesson20-expense-reimbursement-skill": {
    title: "Lesson 20 | Check Expense Claims in Word and Turn the Process into a Skill",
    excerpt: "Read screenshots and tables in a Word expense claim, reconcile totals, explain discrepancies, and reuse the checking process as a Skill.",
    body: ["The lesson uses WorkBuddy to inspect images and tables inside a Word file, compare screenshot amounts with the table total, and then package the checking method as a reusable Skill.", "A single claim is checked first, the Skill is created second, and the Skill is applied to every August claim in a folder. AI flags evidence; it does not replace finance approval."],
    sections: [{ heading: "Reimbursement-check workflow", paragraphs: ["Compare the sum of amounts visible in screenshots with the total in the table. If they differ, return the reason and evidence; if they agree, mark the claim as passed. Keep the source files unchanged and retain an exception list."], codeBlocks: ["Read the Word expense claim. It contains screenshots and a table. Reconcile the screenshot amounts with the table total, report every mismatch with its evidence and likely reason, and mark the claim passed only when the totals agree. Then turn this verified procedure into a reusable Skill and apply it to the August claims folder."] }],
  },
  "video-workbuddy-lesson21-visual-illustration-skill": {
    title: "Lesson 21 | Build a Visual Skill for Better AI Illustrations in PPT",
    excerpt: "Translate taste into measurable visual rules—density, composition, sampled color, line, texture, negative prompts, and correction rules.",
    body: ["This lesson addresses the common problem of AI images that are technically acceptable but visually weak. Instead of asking for a painter imitation, it turns visual judgment into parameters and tests three iterations.", "The final Skill preserves the recognizable structure and colors of a source photo while radically simplifying the scene, adding generous negative space, and keeping a loose hand-drawn line."],
    sections: [{ heading: "Make taste executable", paragraphs: ["Control information density, composition, sampled color, line quality, texture, and forbidden elements. Keep only two to four key shapes, remove most detail, use three to five muted colors, leave 65–80% negative space, and change only one to three variables per iteration.", "The full Chinese source prompts remain on the source-language page; this English note captures the operational rule so the visual Skill can be reviewed and reused."], codeBlocks: ["Transform the uploaded photo into a restrained contemporary editorial sketch for a presentation. Preserve its most recognizable silhouette and sampled color accents, but keep only 2–4 core shapes, remove over 90% of details, use 3–5 muted colors, leave 65–80% negative space, and use loose imperfect hand-drawn lines. Avoid photorealism, 3D, heavy ink wash, glossy vector style, clutter, and subjects touching the edges."] }],
  },
  "video-workbuddy-lesson22-wechat-manager": {
    title: "Lesson 22 | Connect WorkBuddy and WeChat for Read-Only Message and Customer Management",
    excerpt: "Turn local WeChat conversations into a searchable, summarizable, exportable work information system with strict read-only safeguards.",
    body: ["This lesson configures a local `wechat-manager` Skill so WorkBuddy can read, search, summarize, analyze, and export WeChat conversations through natural language.", "The first version is deliberately read-only: no sending, editing, deleting, or uploading of the WeChat database or keys. Incremental checks, local temporary files, and chunked processing keep large group chats safer to handle."],
    sections: [{ heading: "The operating boundary", paragraphs: ["The complete source prompt covers installation and discovery of wechat-cli, initialization checks, sessions, unread and incremental messages, search, history, group summaries, contacts, members, statistics, Markdown export, large-chat chunking, important-message ranking, privacy, and failure handling.", "Use the full source prompt on the Chinese lesson page when configuring the Skill. Never expose `all_keys.json`, `config.json`, or raw database keys to an AI service."], codeBlocks: ["Configure a read-only local WeChat manager Skill named wechat-manager. It may read, search, summarize, analyze, and export local chat data, but must never send, edit, delete, or upload WeChat content. Use incremental checks, local processing, explicit time ranges, chunking for chats over 200 messages, and human review for any reply draft or external action."] }],
  },
};

const englishProductArticleOverrides: Record<string, EnglishVideoOverride> = {
  "witnote-swift-native-2-0-1-refactor": {
    title: "WitNote · 2.0.1 Refactor: Native Swift Workspace and Local MLX",
    excerpt: "How WitNote rebuilt its existing Mac App Store product around a native Swift workspace, local Markdown files, and an MLX model path.",
    body: [
      "WitNote 2.0.1 remains the existing App Store product record, but its implementation has gone through a substantial native Swift rewrite. The goal was not to add noise; it was to bring Markdown writing, local files, format conversion, bilingual reading, and on-device AI back into one inspectable workflow.",
      "The release gate therefore covers both engineering and store truth: a clean Mac must be able to start local AI, folder authorization must recover after a restart, model downloads must cancel and reset cleanly, Lifetime purchases must restore, and third-party model notices must ship with the package."
    ],
    sections: [
      {
        heading: "A native macOS workbench",
        paragraphs: [
          "The workbench, folder access, editor, preview, chat, model management, format conversion, and settings now have clearer Swift-native boundaries. Folder authorization must account for security-scoped bookmarks, restart recovery, and an explicit re-authorize path when the saved permission is no longer usable.",
          "This makes WitNote a desktop workbench rather than a web surface in a window. Window lifecycle, menus, file permissions, cancellation, and error feedback are part of the product experience."
        ]
      },
      {
        heading: "Local Markdown remains the source of truth",
        paragraphs: [
          "Markdown files stay at the center. The folder and document list organize work, the editor changes it, preview and split view support reading, and conversion can deliver PDF, Word, EPUB, or another workflow. EPUB and bilingual reading are supporting capabilities; the product is positioned as a local Markdown writing and knowledge workspace.",
          "The content path stays traceable: the user chooses the files and directory, the app works inside that permission boundary, and import, conversion, and export should not take control away from the original files."
        ]
      },
      {
        heading: "Local MLX and model management",
        paragraphs: [
          "The AI route uses local MLX inference. A lightweight Qwen3 0.6B 4-bit starter model is bundled so a new user can complete a local AI action before downloading anything else. Additional models are optional downloads, shown with hardware guidance and real file status.",
          "The downloader separates received bytes, speed, remaining time, network waiting, cancellation, failure cleanup, and a fresh retry. An interrupted directory must not be mistaken for an installed model. Model selection refreshes across chat, bilingual translation, and other AI entry points without requiring a restart."
        ]
      },
      {
        heading: "Privacy, purchases, and third-party boundaries",
        paragraphs: [
          "Local files and local inference are the default boundary. Model downloads, Apple StoreKit, legal and support pages, and external links opened by the user are distinct network actions. Apple handles the Lifetime purchase and restore flow; WitNote only uses the StoreKit result and does not receive Apple ID or payment details.",
          "MLX, Qwen, and subsequently downloaded models are not WitNote-owned assets. The package provides third-party notices and bundled model license files, while the website and About surface identify model sources without overstating their ownership or capabilities."
        ]
      },
      {
        heading: "The release gate",
        paragraphs: [
          "The 2.0.1 gate includes 1,300/1,300 automated tests, Distribution signing and a fixed SHA-256, a no-tools and no-cache first launch, Lifetime IAP purchase and restore, twelve-language checks, privacy and license notices, cancellation, memory, and long-text behavior.",
          "These checks keep the website, App Store metadata, and submitted package aligned. A local AI feature that cannot be reproduced in a clean environment is not presented as delivered, and unverified performance is not turned into an absolute promise."
        ]
      }
    ]
  }
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

  if (article.diaryKind === "video") {
    return [
      `${title} is an English video tutorial note from Hooosberg. It keeps the Bilibili lesson link, cleaned-up course structure, prompts, and workflow notes together.`,
      `Video URL: ${article.videoUrl ?? article.resourceUrl ?? "The video link is listed on the Chinese source page."}`,
      `The original Chinese note is tagged with ${tags || "video tutorials and AI workflows"}. The goal is not a transcript, but a clearer companion note for people who want slides, prompts, and repeatable steps.`,
      "Future course updates can add the episode URL at the top, then summarize the goal, materials, prompts, checks, and reusable workflow.",
    ];
  }

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

  if (article.diaryKind === "video") {
    const sourcePrompts = (article.sections ?? []).flatMap((section) => section.codeBlocks ?? []);
    const sourceHeadings = (article.sections ?? []).map((section) => section.heading).join(", ") || "the lesson walkthrough";
    return [
      {
        heading: "Lesson approach",
        paragraphs: [
          "This companion note follows the same order as the video: understand the work problem first, prepare the files and rules, run the prompts in sequence, then verify the output before treating it as usable.",
          `The Chinese source lesson covers ${sourceHeadings}. It is designed as a practical workflow note, not a detached summary: the reader should be able to pause the video, complete one step, and return to the next step with evidence of what changed.`,
        ],
      },
      {
        heading: "How to study with the video",
        paragraphs: [
          "On the first pass, watch for the inputs, constraints, and expected outputs. On the second pass, reproduce the workflow in a separate test folder. Keep source files unchanged and save generated reports, cleaned data, drafts, or exports in the designated output location.",
          "Do not treat an AI response as a final decision. Check whether the task was fully specified, whether uncertain values were labelled, whether the result can be traced back to source material, and whether a human approval is needed before any submission, purchase, application, or external action.",
        ],
      },
      {
        heading: "Copy-ready source prompts",
        paragraphs: sourcePrompts.length
          ? ["The original prompts are kept below in Chinese so that the operational meaning used in the video is not weakened by translation. Replace every sample file name, person, company, amount, rule, and destination with verified information from your own task."]
          : ["This lesson is primarily a workflow demonstration. Convert your own task into six fields—goal, available materials, rules, output, prohibited actions, and verification—before asking WorkBuddy to help."],
        codeBlocks: sourcePrompts.length ? sourcePrompts : undefined,
      },
      {
        heading: "Knowledge points and checks",
        paragraphs: [
          "The transferable skill is not a single prompt. It is the ability to turn scattered materials into a repeatable system: inputs have fixed locations, rules are written down, intermediate work is separated from final deliverables, and exceptions are visible instead of silently invented.",
          "Before closing the task, verify four things: the input set is complete; unknown information is marked rather than guessed; the output is saved where the workflow expects it; and a small sample can be checked against the original files. High-impact decisions always remain subject to human review.",
        ],
      },
      {
        heading: "Wrap-up",
        paragraphs: [
          "Reuse the structure rather than copying the example blindly: define the objective and boundary, organize files and rules, run the steps in order, verify the result, and keep the workflow for the next similar task.",
          "That is the central lesson behind this WorkBuddy series: AI becomes more reliable when work is expressed as a clear, inspectable process instead of a vague request for a finished answer.",
        ],
      },
    ];
  }

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
        "Another builder can reuse the pattern: start with a narrow product promise, make the privacy boundary inspectable, connect every public page to a real download, support path, or source repository when appropriate, and turn the launch process into a searchable article.",
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
  const videoOverride = article.diaryKind === "video" ? englishVideoArticleOverrides[article.slug] : undefined;
  const productOverride = article.diaryKind === "product" ? englishProductArticleOverrides[article.slug] : undefined;

  if (videoOverride) {
    return {
      ...article,
      ...videoOverride,
      category,
      tags,
      videoMeta: article.videoUrl ? "Bilibili · WorkBuddy video lesson" : article.videoMeta,
      productLabel: localizedProducts.map((product) => product.displayName).join(", ") || undefined,
    };
  }

  if (productOverride) {
    return {
      ...article,
      ...productOverride,
      category,
      tags,
      productLabel: localizedProducts.map((product) => product.displayName).join(", ") || undefined,
    };
  }

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

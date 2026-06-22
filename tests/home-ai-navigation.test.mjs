import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homepage = new URL("../dist/index.html", import.meta.url);
const navigationPage = new URL("../dist/ai-navigation/index.html", import.meta.url);
const globalStyles = new URL("../src/styles/global.css", import.meta.url);

function groupSection(html, id) {
  const match = html.match(new RegExp(`<section class="directory-group" id="${id}"[\\s\\S]*?(?=<section class="directory-group"|<p class="directory-empty")`));

  return match?.[0] ?? "";
}

function cardNames(sectionHtml) {
  return [...sectionHtml.matchAll(/<span class="directory-card__title-row">[\s\S]*?<strong>([^<]+)<\/strong>/g)].map((match) => match[1]);
}

function directoryGroupIds(html) {
  return [...html.matchAll(/<section class="directory-group" id="([^"]+)"/g)].map((match) => match[1]);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("homepage links to AI navigation without rendering it as a homepage section", async () => {
  const html = await readFile(homepage, "utf8");

  assert.match(html, /href="\/ai-navigation"/, "homepage header should link to the AI navigation page");
  assert.doesNotMatch(html, /aria-label="AI 导航"/, "AI navigation should not render as a homepage section");
  assert.match(html, /<strong>hooosberg<\/strong>/, "homepage social cards should show handles instead of full URLs");
  assert.match(html, /<strong>湖森堡AI_hooosberg<\/strong>/, "domestic social cards should show the account id directly");
  assert.doesNotMatch(html, /<strong>github\.com\/hooosberg<\/strong>/, "GitHub card should not show the full URL as visible card text");
  assert.doesNotMatch(html, /<strong>搜索：湖森堡AI_hooosberg<\/strong>/, "domestic social cards should not show search helper text as the main value");
});

test("AI navigation renders as a standalone directory page", async () => {
  const html = await readFile(navigationPage, "utf8");

  assert.match(html, /AI 导航/, "standalone page should render the AI navigation title");
  assert.match(html, /<main class="main--ai-directory">/, "AI navigation main should allow sticky sidebar anchoring");
  assert.match(html, /placeholder="搜索工具、场景或关键词"/, "page should include a directory-style search box");
  assert.match(html, /夯级产品榜/, "page should lead with a compact tier-one product ranking");
  assert.doesNotMatch(html, /顶级产品榜/, "top-three product ranking should use the local '夯级产品' naming");
  assert.match(html, /TOP 01/, "cards should expose leaderboard rank labels");
  assert.match(html, /人工编辑热度榜/, "page should explain that ranking is editorial");
  assert.match(html, /入库标准/, "page should explain the curation standard before users trust the list");

  for (const label of ["夯级产品榜", "AI 对话 / 搜索", "AI 编程 / Agent", "AI 图像 / 设计", "国产 AI 工具"]) {
    assert.match(html, new RegExp(label), `${label} should be present`);
  }

  for (const label of [
    "产品构想 / 调研",
    "产品原型 / 设计",
    "开发 / 托管",
    "模型接口 / 聚合",
    "分发推广 / 社区",
    "收款 / 出海财务",
    "GitHub 免费资源",
  ]) {
    assert.match(html, new RegExp(label), `${label} should be present for the indie product workflow`);
  }

  assert.equal(directoryGroupIds(html)[0], "github-free-resources", "GitHub free resources should be the first ranking category in the sidebar/content order");
  assert.doesNotMatch(html, /id="free-learning"/, "free courses should be merged into GitHub resources instead of rendering as a separate category");
  assert.doesNotMatch(html, /data-directory-filter="free-learning"/, "free courses should not appear as a separate sidebar filter");
  assert.doesNotMatch(html, /<h2>免费教程 \/ 学习<\/h2>/, "free courses should not render as a separate group heading");

  const githubResourcesSection = groupSection(html, "github-free-resources");
  assert.ok(githubResourcesSection, "GitHub free resources should render as one compact directory group");
  assert.doesNotMatch(html, /GitHub 免费 · 设计资源/, "GitHub resources should not be split into multiple sidebar categories");
  assert.doesNotMatch(html, /GitHub 免费 · AI 编程资源/, "GitHub resources should not be split into multiple sidebar categories");
  assert.doesNotMatch(html, /GitHub 免费 · 本地 LLM \/ macOS/, "GitHub resources should not be split into multiple sidebar categories");
  assert.doesNotMatch(html, /GitHub 免费 · 产品营销/, "GitHub resources should not be split into multiple sidebar categories");

  for (const label of ["设计资源", "免费教程", "AI 编程资源", "本地 LLM / macOS", "产品营销", "免费音频资源"]) {
    assert.match(githubResourcesSection, new RegExp(label), `GitHub free resources should include ${label} as an internal subsection`);
  }

  for (const label of ["Neural Networks: Zero to Hero", "LLM Course", "fast.ai", "Hugging Face Course", "OpenAI Cookbook", "The Missing Semester"]) {
    assert.match(githubResourcesSection, new RegExp(label), `${label} should live inside GitHub free resources after the merge`);
  }

  for (const label of [
    "ChatGPT",
    "Claude",
    "Gemini",
    "OpenAI Codex",
    "Claude Code",
    "Kimi",
    "豆包",
    "OpenAI / ChatGPT 生态",
    "Anthropic / Claude 生态",
    "Google / Gemini 生态",
    "OpenAI API Platform",
    "Agent Builder",
    "Apps SDK",
    "Claude Cowork",
    "Claude Design",
    "Google Antigravity",
    "NotebookLM",
    "Google AI Studio",
    "Jules",
    "AI Mode / Search Agents",
    "Google Stitch",
    "Google Flow",
    "Antigravity CLI",
    "Google Trends",
    "GummySearch",
    "Similarweb",
    "Figma",
    "Rotato",
    "Vercel",
    "Supabase",
    "Cloudflare",
    "Replit",
    "OpenRouter",
    "AIBerm",
    "New API",
    "Product Hunt",
    "V2EX",
    "小众软件",
    "少数派",
    "Hacker News",
    "Gumroad",
    "Stripe",
    "Creem",
    "Payoneer",
    "Neural Networks: Zero to Hero",
    "LLM Course",
    "fast.ai",
    "Hugging Face Course",
    "OpenAI Cookbook",
    "awesome-design-md",
    "Design Resources for Developers",
    "awesome-design-systems",
    "Game-Assets-And-Resources",
    "game-icons/icons",
    "GDQuest game-sprites",
    "Game Icon Pack",
    "awesome-cc0",
    "Hooosberg Starred",
    "awesome-mcp-servers",
    "Awesome-Code-LLM",
    "awesome-swift-macos-apps",
    "awesome-local-ai",
    "Marketing for Founders",
    "Marketing for Engineers",
    "awesome-oss-alternatives",
    "CC0-1.0 Music",
    "Homebrew VGM",
    "Kenney UI Audio",
    "Chip Sounds",
    "Free original music for games and film",
  ]) {
    assert.match(html, new RegExp(label), `${label} should be present`);
  }

  for (const href of [
    "https://chatgpt.com/",
    "https://claude.ai/",
    "https://gemini.google.com/app",
    "https://www.kimi.com/",
    "https://www.doubao.com/",
    "https://github.com/karpathy/nn-zero-to-hero",
    "https://openrouter.ai/",
    "https://vercel.com/",
    "https://stripe.com/",
    "https://www.producthunt.com/",
    "https://github.com/VoltAgent/awesome-design-md",
    "https://github.com/HotpotDesign/Game-Assets-And-Resources",
    "https://github.com/game-icons/icons",
    "https://github.com/GDQuest/game-sprites",
    "https://github.com/Nieobie/Game-Icon-Pack",
    "https://github.com/jaywcjlove/awesome-swift-macos-apps#local-llm",
    "https://github.com/hooosberg?tab=stars",
    "https://github.com/EdoStra/Marketing-for-Founders",
    "https://github.com/SoundSafari/CC0-1.0-Music",
    "https://github.com/Beatscribe/homebrew_vgm",
    "https://github.com/Calinou/kenney-ui-audio",
    "https://github.com/subsoap/chip-sounds",
    "https://github.com/tannerhelland/free-music",
  ]) {
    assert.match(html, new RegExp(`href="${escapeRegExp(href)}"`), `${href} should be linked directly`);
  }

  assert.match(html, /分类排行/, "page should expose a ranking mode");
  assert.match(html, /国内平替/, "page should expose a domestic alternatives mode");
  assert.match(html, /data-directory-mode="ranking"/, "ranking mode should be selectable");
  assert.match(html, /data-directory-mode="alternatives"/, "alternatives mode should be selectable");

  const topNames = cardNames(groupSection(html, "top")).slice(0, 3);
  assert.deepEqual(topNames, ["ChatGPT", "Claude", "Gemini"], "top product ranking should use ChatGPT, Claude, then Gemini as the global defaults");
  assert.doesNotMatch(groupSection(html, "top"), /<strong>Microsoft Copilot<\/strong>/, "Microsoft Copilot should not displace Gemini in the top product ranking");

  assert.deepEqual(cardNames(groupSection(html, "openai-suite")).slice(0, 3), ["ChatGPT", "OpenAI Codex", "OpenAI API Platform"], "OpenAI ecosystem should start with ChatGPT, Codex, then the developer platform");
  assert.deepEqual(cardNames(groupSection(html, "anthropic-suite")).slice(0, 3), ["Claude", "Claude Code", "Claude Cowork"], "Anthropic ecosystem should start with Claude, Claude Code, then Claude Cowork");
  assert.deepEqual(cardNames(groupSection(html, "google-suite")).slice(0, 4), ["Gemini", "NotebookLM", "Google AI Studio", "Google Stitch"], "Google ecosystem should start with the Gemini app, NotebookLM, developer platform, then the hot UI prototyping product");
  assert.doesNotMatch(groupSection(html, "openai-suite"), /class="directory-more-link"[\s\S]*查看更多 OpenAI 生态/, "OpenAI ecosystem should not render a redundant more-products button");
  assert.doesNotMatch(groupSection(html, "anthropic-suite"), /class="directory-more-link"[\s\S]*查看更多 Anthropic 生态/, "Anthropic ecosystem should not render a redundant more-products button");
  assert.doesNotMatch(groupSection(html, "google-suite"), /class="directory-more-link"[\s\S]*查看更多 Google AI 生态/, "Google ecosystem should not render a redundant more-products button");

  assert.match(html, /🇺🇸 美国/, "cards should show United States country flag labels");
  assert.match(html, /🇨🇳 中国/, "cards should show China country flag labels");
  assert.match(html, /国内可能受限/, "cards should call out likely access limits for US products");
  assert.match(html, /国内可直接尝试/, "cards should call out easier domestic access");
  assert.match(html, /Codex[\s\S]*Kimi Code/, "alternatives should map Codex to a domestic coding-agent option");
  assert.match(html, /Claude Code[\s\S]*TRAE/, "alternatives should map Claude Code to domestic coding-agent options");
  assert.match(html, /Google \/ Gemini 生态[\s\S]*Google AI Studio[\s\S]*Google Antigravity/, "Google ecosystem should prioritize widely useful app, builder, and coding products");
  assert.match(groupSection(html, "google-suite"), /href="https:\/\/stitch\.withgoogle\.com\/"[\s\S]*<strong>Google Stitch<\/strong>/, "Google ecosystem should include Stitch because it has a direct product entry and current product heat");
  assert.doesNotMatch(html, /<strong>Projects<\/strong>/, "ChatGPT Projects should not be treated as a standalone OpenAI product line");
  assert.doesNotMatch(html, /<strong>Deep Research<\/strong>/, "Deep Research should stay as a ChatGPT capability, not a standalone product card");
  assert.doesNotMatch(html, /<strong>Canvas<\/strong>/, "Canvas should stay as a ChatGPT capability, not a standalone product card");

  const googleSection = groupSection(html, "google-suite");
  assert.ok(googleSection, "Google suite section should be present");
  assert.doesNotMatch(googleSection, /<strong>Gemini Models<\/strong>/, "Gemini model documentation should not be treated as a standalone customer product card");
  assert.doesNotMatch(googleSection, /<strong>Gemini App Agents<\/strong>/, "Gemini app agent features should stay inside the Gemini app, not link to an announcement");
  assert.doesNotMatch(googleSection, /<strong>Universal Cart<\/strong>/, "Shopping features without a direct product surface should not be standalone cards");
  assert.doesNotMatch(googleSection, /<strong>Co-Scientist<\/strong>/, "Research announcements without a customer product surface should not be standalone cards");
  assert.doesNotMatch(googleSection, /<strong>Ask YouTube<\/strong>/, "YouTube feature announcements should not be standalone tool cards");
  assert.doesNotMatch(googleSection, /<strong>Android Halo<\/strong>/, "Android feature announcements should not be standalone tool cards");
  assert.doesNotMatch(googleSection, /<strong>Gemini CLI<\/strong>/, "Gemini CLI should be updated to the official Antigravity CLI transition");
  assert.doesNotMatch(googleSection, /<strong>Gemini Omni<\/strong>/, "Gemini Omni should be described as part of Gemini App Agents, not duplicated as its own card");
  assert.doesNotMatch(googleSection, /<strong>Gemini Spark<\/strong>/, "Gemini Spark should be described as part of Gemini App Agents, not duplicated as its own card");
  assert.doesNotMatch(googleSection, /<strong>Information Agents<\/strong>/, "Information agents should be grouped with AI Mode / Search Agents");

  const googleHrefs = [...googleSection.matchAll(/href="([^"]+)"/g)].map((match) => match[1]).filter((href) => href.startsWith("http"));
  const duplicateGoogleHrefs = googleHrefs.filter((href, index) => googleHrefs.indexOf(href) !== index);
  assert.deepEqual(duplicateGoogleHrefs, [], "Google suite cards should not repeat the same official URL");

  const officialGoogleHosts = new Set([
    "gemini.google.com",
    "ai.google",
    "ai.google.dev",
    "notebooklm.google",
    "antigravity.google",
    "aistudio.google.com",
    "jules.google.com",
    "cloud.google.com",
    "stitch.withgoogle.com",
    "labs.google.com",
    "labs.google",
    "search.google",
    "flow.google",
    "www.flowmusic.app",
    "workspace.google.com",
    "deepmind.google",
  ]);
  const nonOfficialGoogleHrefs = googleHrefs.filter((href) => !officialGoogleHosts.has(new URL(href).hostname));
  assert.deepEqual(nonOfficialGoogleHrefs, [], "Google suite cards should point to official Google, DeepMind, YouTube, Workspace, or documented app URLs");

  const productCardHrefs = [...html.matchAll(/<a\s+class="directory-card"[^>]*href="([^"]+)"/g)].map((match) => match[1]);
  const articleLikeProductLinks = productCardHrefs.filter((href) => {
    const url = new URL(href);

    return (
      /^(blog|help|support)\./.test(url.hostname) ||
      /(^|\.)developers\.googleblog\.com$/.test(url.hostname) ||
      url.pathname.includes("/blog/") ||
      /^\/index\/introducing-/.test(url.pathname)
    );
  });
  assert.deepEqual(articleLikeProductLinks, [], "product cards should link to direct product sites, apps, or consoles instead of articles, announcements, or help pages");

  assert.doesNotMatch(html, /class="directory-card" href="\/blog\//, "tool cards should not link to internal blog posts");
  assert.doesNotMatch(html, /class="directory-card" href="\/apps\//, "tool cards should not link to internal product pages");
  assert.match(html, /search\.value = ""/, "category switches should reset the previous search query");
});

test("AI navigation sidebar tracks the current ranking section", async () => {
  const html = await readFile(navigationPage, "utf8");

  assert.match(html, /data-directory-current="github-free-resources"/, "ranking sidebar should expose the first visible category for scroll sync");
  assert.match(html, /aria-current="true"[^>]*data-directory-filter="github-free-resources"|data-directory-filter="github-free-resources"[^>]*aria-current="true"/, "the first visible ranking category should have an initial current state");
  assert.match(html, /IntersectionObserver/, "ranking page should observe visible sections while browsing all rankings");
  assert.match(html, /setCurrentCategory\([^)]*entry\.target\.dataset\.directoryGroup/, "scrolling into a ranking group should promote that group in the sidebar");
  assert.match(html, /shell\.dataset\.directoryFiltered/, "filtered category mode should be exposed for sticky sidebar layout");
  assert.match(html, /activeCategory !== "all"/, "category filtering should distinguish the compact single-category view from all rankings");
  assert.doesNotMatch(html, /activeFilter\?\.scrollIntoView/, "sidebar sync should not scroll the whole page back to the sidebar on small screens");
});

test("AI navigation sidebar active state stays compact", async () => {
  const css = await readFile(globalStyles, "utf8");

  assert.doesNotMatch(css, /transform:\s*scale/, "active sidebar state should not enlarge the whole menu row");
  assert.match(css, /\.directory-sidebar button\.is-active::before/, "active sidebar state should use a compact leading indicator");
  assert.match(css, /linear-gradient\(90deg,[\s\S]*transparent/, "active sidebar state should fade out instead of using a hard full-row block");
  assert.match(css, /\.ai-directory-shell\[data-directory-filtered="true"\][\s\S]*min-height:\s*calc\(100vh \+ 320px\)/, "filtered category views should keep enough shell height for the sticky sidebar to pin like the all-products view");
});

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homepage = new URL("../dist/index.html", import.meta.url);
const appsPage = new URL("../dist/apps/index.html", import.meta.url);
const moodButtonPage = new URL("../dist/apps/mood-button/index.html", import.meta.url);
const moodButtonPrivacyPage = new URL("../dist/privacy/mood-button/index.html", import.meta.url);
const moodButtonReviewArticle = new URL("../dist/blog/mood-button-app-review-lessons/index.html", import.meta.url);
const rushiPage = new URL("../dist/apps/rushi/index.html", import.meta.url);
const rushiPrivacyPage = new URL("../dist/privacy/rushi/index.html", import.meta.url);
const rushiTermsPage = new URL("../dist/terms/rushi/index.html", import.meta.url);
const rushiEnglishPage = new URL("../dist/en/apps/rushi/index.html", import.meta.url);
const rushiEnglishPrivacyPage = new URL("../dist/en/privacy/rushi/index.html", import.meta.url);
const rushiEnglishTermsPage = new URL("../dist/en/terms/rushi/index.html", import.meta.url);
const failureProductPages = [
  new URL("../dist/apps/packpour/index.html", import.meta.url),
  new URL("../dist/apps/domprompter/index.html", import.meta.url),
  new URL("../dist/apps/glotshot/index.html", import.meta.url),
  new URL("../dist/apps/uixskills/index.html", import.meta.url),
];

test("homepage and product catalog use Chinese product card copy", async () => {
  const [homeHtml, appsHtml] = await Promise.all([
    readFile(homepage, "utf8"),
    readFile(appsPage, "utf8"),
  ]);
  const combined = `${homeHtml}\n${appsHtml}`;

  for (const phrase of [
    "quiet puzzle game",
    "bedtime reader",
    "App Store asset maker",
    "3D trail story",
    "local AI mood diary",
    "AI writing companion",
    "AI browser control",
    "AI frontend prompt tool",
    "Codex utility",
    "scripture reader",
    "support site",
    "App Store localization",
    "Behance utility",
    "AI design protocol",
    "Local-first AI writing companion",
    "Create App Store preview images",
    "Bedtime listening and local reading",
    "Quiet iPhone Mahjong Solitaire",
    "Turn GPX/KML tracks into cinematic",
    "Apple MLX + Qwen3 local AI voice mood diary",
  ]) {
    assert.doesNotMatch(combined, new RegExp(phrase), `product cards should not expose old English copy: ${phrase}`);
  }

  for (const phrase of [
    "安静解谜游戏",
    "睡前听书阅读器",
    "失败经验：商店海报自动化",
    "3D 轨迹故事工具",
    "本地 AI 情绪日记",
    "本地优先 AI 写作工具",
  ]) {
    assert.match(combined, new RegExp(phrase), `product cards should show Chinese copy: ${phrase}`);
  }
});

test("Mood Button page reflects live App Store state without duplicate GitHub actions", async () => {
  const html = await readFile(moodButtonPage, "utf8");
  const githubActionLinks = [...html.matchAll(/class="button button--secondary" href="https:\/\/github\.com\/hooosberg\/mood-button"/g)];

  assert.match(html, /href="https:\/\/apps\.apple\.com\/us\/app\/mood-button\/id6780051060"/, "Mood Button should link to the live App Store listing");
  assert.match(html, /v1\.0 已上架|已上架/, "Mood Button should expose the live App Store state");
  assert.doesNotMatch(html, /App Store 即将上架/, "Mood Button should no longer show the old review-pending CTA");
  assert.doesNotMatch(html, />旧产品页</, "Mood Button should not route users back to the old GitHub Pages landing page");
  assert.equal(githubActionLinks.length, 1, "Mood Button detail actions should show GitHub only once");
});

test("Mood Button privacy policy discloses AI and platform data flow", async () => {
  const html = await readFile(moodButtonPrivacyPage, "utf8");

  for (const phrase of [
    "Mood Button Data Flow",
    "Local AI and Third-Party AI",
    "does not call OpenAI, Anthropic, Gemini, ChatGPT, or any other hosted third-party AI API",
    "Apple Speech",
    "Open-Meteo",
    "Unlock Home Skins",
    "Export and Deletion",
  ]) {
    assert.ok(html.includes(phrase), `privacy policy should mention ${phrase}`);
  }
});

test("Rushi public pages use main-site URLs and StoreKit copy-practice terms", async () => {
  const htmlPages = await Promise.all([
    readFile(rushiPage, "utf8"),
    readFile(rushiPrivacyPage, "utf8"),
    readFile(rushiTermsPage, "utf8"),
    readFile(rushiEnglishPage, "utf8"),
    readFile(rushiEnglishPrivacyPage, "utf8"),
    readFile(rushiEnglishTermsPage, "utf8"),
  ]);
  const combined = htmlPages.join("\n");

  for (const phrase of [
    "https://apps.apple.com/us/app/rushi-sutra-mala-meditation/id6766074713",
    "Copy Practice Unlock",
    "Apple StoreKit",
    "source-backed calligraphy copybooks",
    "original copybook images",
    "Liu Gongquan",
    "Ouyang Xun",
    "does not offer auto-renewable subscriptions",
    "no Hooosberg account system",
    "iPad",
  ]) {
    assert.ok(combined.includes(phrase), `Rushi public pages should mention ${phrase}`);
  }

  for (const stalePhrase of [
    "https://hooosberg.github.io/Rushi/",
    "正式 App 隐私政策以后以实际功能为准",
    "unless a future feature explicitly states otherwise",
    "Landing page",
    "旧产品页",
  ]) {
    assert.doesNotMatch(combined, new RegExp(stalePhrase), `Rushi public pages should not expose stale copy: ${stalePhrase}`);
  }
});

test("product progress timeline stays on catalog while homepage stays compact", async () => {
  const [homeHtml, appsHtml] = await Promise.all([
    readFile(homepage, "utf8"),
    readFile(appsPage, "utf8"),
  ]);

  assert.doesNotMatch(homeHtml, /苹果商店上架流程甘特图/, "homepage should not render the heavy progress timeline");
  assert.match(appsHtml, /苹果商店上架流程甘特图/, "product catalog should keep the progress timeline heading");
  assert.match(appsHtml, /产品进度同步/, "product catalog timeline should identify the public progress source");
  assert.match(appsHtml, /已上架/, "product catalog timeline should include the latest Mood Button App Store milestone");
});

test("Mood Button App Review diary uses the real rejection categories", async () => {
  const html = await readFile(moodButtonReviewArticle, "utf8");

  for (const phrase of [
    "真实拒审",
    "Guideline 4.0",
    "5.1.1",
    "5.1.2",
    "2.1(b)",
    "第三方 AI",
    "Unlock Home Skins",
  ]) {
    assert.ok(html.includes(phrase), `review diary should mention ${phrase}`);
  }
});

test("failure case products render as honest postmortems", async () => {
  const [appsHtml, ...detailHtml] = await Promise.all([
    readFile(appsPage, "utf8"),
    ...failureProductPages.map((page) => readFile(page, "utf8")),
  ]);

  for (const phrase of [
    "失败经验：App Store 自动填写",
    "失败经验：AI 前端辅助",
    "失败经验：商店海报自动化",
    "失败经验：AI 设计协议",
    "失败复盘",
  ]) {
    assert.match(appsHtml, new RegExp(phrase), `product catalog should surface failure case label: ${phrase}`);
  }

  const combinedDetails = detailHtml.join("\n");

  for (const phrase of [
    "失败经验说明",
    "失败在哪里",
    "失败原因",
    "经验教训",
    "复盘日记",
    "Codex",
    "AI 能力变化",
  ]) {
    assert.match(combinedDetails, new RegExp(phrase), `failure detail pages should explain the postmortem: ${phrase}`);
  }
});

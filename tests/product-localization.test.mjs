import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homepage = new URL("../dist/index.html", import.meta.url);
const appsPage = new URL("../dist/apps/index.html", import.meta.url);
const moodButtonPage = new URL("../dist/apps/mood-button/index.html", import.meta.url);
const moodButtonReviewArticle = new URL("../dist/blog/mood-button-app-review-lessons/index.html", import.meta.url);
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

test("Mood Button page reflects current App Review state without duplicate GitHub actions", async () => {
  const html = await readFile(moodButtonPage, "utf8");
  const githubActionLinks = [...html.matchAll(/class="button button--secondary" href="https:\/\/github\.com\/hooosberg\/mood-button"/g)];

  assert.match(html, /App Store 即将上架/, "Mood Button should not pretend the App Store listing is live");
  assert.match(html, /被拒后处理中/, "Mood Button should expose the rejected App Review state");
  assert.equal(githubActionLinks.length, 1, "Mood Button detail actions should show GitHub only once");
});

test("product progress timeline is rendered on homepage and catalog", async () => {
  const [homeHtml, appsHtml] = await Promise.all([
    readFile(homepage, "utf8"),
    readFile(appsPage, "utf8"),
  ]);

  for (const html of [homeHtml, appsHtml]) {
    assert.match(html, /苹果商店上架流程甘特图/, "progress timeline heading should render");
    assert.match(html, /秘书总后台同步/, "progress timeline should identify the secretary dashboard source");
    assert.match(html, /6\/17 被拒/, "progress timeline should include the Mood Button rejection milestone");
  }
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

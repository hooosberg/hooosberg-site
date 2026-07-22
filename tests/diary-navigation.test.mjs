import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const distBlogRoot = new URL("../dist/blog/", import.meta.url);
const homePage = new URL("../dist/index.html", import.meta.url);
const blogIndexPage = new URL("../dist/blog/index.html", import.meta.url);
const drowsebookArticlePage = new URL("../dist/blog/drowsebook-market-research/index.html", import.meta.url);
const readingArticlePage = new URL("../dist/blog/reading-shannon-biography/index.html", import.meta.url);
const videoArticlePage = new URL("../dist/blog/video-workbuddy-lesson7-bidding-workspace/index.html", import.meta.url);
const linksPage = new URL("../dist/links/index.html", import.meta.url);

function textFromHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

test("brand links home and primary navigation starts with notes", async () => {
  const html = await readFile(homePage, "utf8");
  const navHtml = html.match(/<nav class="nav-links"[\s\S]*?<\/nav>/)?.[0] ?? "";
  const firstLink = navHtml.match(/<a href="([^"]+)">([^<]+)<\/a>/);

  assert.match(html, /<a class="brand" href="\/"/, "brand should remain the home link");
  assert.deepEqual(firstLink?.slice(1), ["/blog", "笔记"], "notes should be the first primary navigation item");
  assert.doesNotMatch(navHtml.match(/^[\s\S]*?<details class="nav-more">/)?.[0] ?? "", /href="\/"/, "home should not be duplicated as a primary nav item");
});

test("note article links preserve the selected section for return navigation", async () => {
  const [indexHtml, articleHtml] = await Promise.all([
    readFile(blogIndexPage, "utf8"),
    readFile(readingArticlePage, "utf8"),
  ]);

  assert.match(
    indexHtml,
    /href="\/blog\/reading-shannon-biography\?kind=reading"/,
    "reading note article links should carry their note kind",
  );
  assert.match(
    articleHtml,
    /data-diary-kind="reading"/,
    "article detail pages should expose their note kind for history state restoration",
  );
});

test("blog index leads with video tutorial notes and opens the Bilibili course link", async () => {
  const [indexHtml, articleHtml] = await Promise.all([
    readFile(blogIndexPage, "utf8"),
    readFile(videoArticlePage, "utf8"),
  ]);
  const firstTab = indexHtml.match(/<button[\s\S]*?class="diary-tab"[\s\S]*?<\/button>/)?.[0] ?? "";

  assert.match(firstTab, /视频教程笔记[\s\S]*7 篇/, "video tutorial notes should be the first note section with one note per lesson");
  assert.match(indexHtml, /href="\/blog\/video-workbuddy-lesson7-bidding-workspace\?kind=video"/, "video notes should preserve their section in links");
  assert.match(articleHtml, /data-diary-kind="video"/, "video note detail should expose the video note kind");
  assert.match(articleHtml, /返回笔记/, "article detail should use the notes return label");
  assert.match(articleHtml, /打开视频/, "video note detail should render a video action");
  assert.match(
    articleHtml,
    /https:\/\/space\.bilibili\.com\/3546822886820332\/lists\/8625038\?type=season/,
    "video note detail should link to the Bilibili season",
  );
  assert.match(articleHtml, /Word 课件转写/, "video notes should include courseware-derived note content");
  assert.match(articleHtml, /class="article-code-block"/, "video note prompts should render as copyable code blocks");
});

test("contact page exposes WeChat alongside email and Telegram", async () => {
  const html = await readFile(linksPage, "utf8");

  assert.match(html, /邮箱、电报和微信/, "direct contact section should mention WeChat");
  assert.match(html, /id="wechat"/, "WeChat card should expose a stable anchor");
  assert.match(html, />微信号：hooosberg<\/strong>/, "WeChat card should show the searchable account id with a clear WeChat prefix");
});

test("product diary index shows product names as the row label", async () => {
  const html = await readFile(blogIndexPage, "utf8");
  const drowsebookRow = html.match(/<a class="article-row" href="\/blog\/drowsebook-market-research\?kind=product"[\s\S]*?<\/a>/)?.[0] ?? "";

  assert.match(drowsebookRow, /<span class="article-row__category">DrowseBook 入梦书<\/span>/, "product diary rows should show the related product name on the left");
});

test("product diary titles include the product name for search context", async () => {
  const [indexHtml, articleHtml] = await Promise.all([
    readFile(blogIndexPage, "utf8"),
    readFile(drowsebookArticlePage, "utf8"),
  ]);

  assert.match(
    indexHtml,
    /<span class="article-row__title">DrowseBook 入梦书 · 01 · 立项调研：为什么做一个睡前听书阅读器<\/span>/,
    "product diary index titles should include the product name",
  );
  assert.match(
    articleHtml,
    /<title>DrowseBook 入梦书 · 01 · 立项调研：为什么做一个睡前听书阅读器 \| 湖森堡AI_hooosberg<\/title>/,
    "article meta title should include the product name",
  );
  assert.match(
    articleHtml,
    /<h1>DrowseBook 入梦书 · 01 · 立项调研：为什么做一个睡前听书阅读器<\/h1>/,
    "article heading should include the product name",
  );
});

test("blog index paginates product diary rows after 15 items", async () => {
  const html = await readFile(blogIndexPage, "utf8");
  const productRows = html.match(/<a class="article-row" href="\/blog\/[^"]+\?kind=product"[\s\S]*?<\/a>/g) ?? [];
  const firstProductPageRows = productRows.filter((row) => /data-diary-page="1"/.test(row));

  assert.ok(productRows.length > 15, "fixture should include enough product diaries to exercise pagination");
  assert.equal(firstProductPageRows.length, 15, "product diary index should assign 15 product rows to the first product page");
  assert.match(
    productRows[15],
    /data-diary-page="2"[\s\S]*?\shidden(?:\s|>|=)/,
    "the 16th product diary should be assigned to hidden page 2",
  );
  assert.match(
    html,
    /<nav class="diary-pagination"[^>]*data-diary-pagination="product"[\s\S]*data-diary-page-button[\s\S]*data-diary-page="2"/,
    "product diary pagination should expose a second page button",
  );
});

test("product diary rows use a varied public publishing schedule", async () => {
  const html = await readFile(blogIndexPage, "utf8");
  const productRows = html.match(/<a class="article-row" href="\/blog\/[^"]+\?kind=product"[\s\S]*?<\/a>/g) ?? [];
  const dates = productRows
    .map((row) => row.match(/<span class="article-row__date">([^<]+)<\/span>/)?.[1])
    .filter(Boolean);
  const dateCounts = dates.reduce((counts, date) => {
    counts.set(date, (counts.get(date) ?? 0) + 1);
    return counts;
  }, new Map());

  assert.ok(dateCounts.size >= 20, "product diary dates should be distributed across many visible publishing dates");
  assert.ok(Math.max(...dateCounts.values()) <= 8, "no single date should dominate the product diary archive");
});

test("product diary article bodies provide at least 1500 characters of development detail", async () => {
  const entries = await readdir(distBlogRoot, { withFileTypes: true });
  const shortArticles = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const articleUrl = new URL(`${entry.name}/index.html`, distBlogRoot);
    const html = await readFile(articleUrl, "utf8");
    if (!html.includes('data-diary-kind="product"')) continue;

    const title = textFromHtml(html.match(/<h1>[\s\S]*?<\/h1>/)?.[0] ?? entry.name);
    const bodyText = textFromHtml(html.match(/<div class="article-body">[\s\S]*?<\/div>/)?.[0] ?? "");
    if (bodyText.length < 1500) {
      shortArticles.push({ slug: path.basename(entry.name), title, length: bodyText.length });
    }
  }

  assert.deepEqual(shortArticles, [], `product diaries below 1500 chars: ${JSON.stringify(shortArticles.slice(0, 10))}`);
});

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePage = new URL("../dist/index.html", import.meta.url);
const enHomePage = new URL("../dist/en/index.html", import.meta.url);
const enCoursesPage = new URL("../dist/en/courses/index.html", import.meta.url);
const enServicesPage = new URL("../dist/en/services/index.html", import.meta.url);
const enAiNavigationPage = new URL("../dist/en/ai-navigation/index.html", import.meta.url);
const productPage = new URL("../dist/apps/witnote/index.html", import.meta.url);
const enProductPage = new URL("../dist/en/apps/witnote/index.html", import.meta.url);
const articlePage = new URL("../dist/blog/drowsebook-market-research/index.html", import.meta.url);
const enArticlePage = new URL("../dist/en/blog/drowsebook-market-research/index.html", import.meta.url);
const enGlotShotArticlePage = new URL("../dist/en/blog/glotshot-app-store-lessons/index.html", import.meta.url);
const robotsPage = new URL("../dist/robots.txt", import.meta.url);
const sitemapIndex = new URL("../dist/sitemap-index.xml", import.meta.url);

test("core pages expose canonical, hreflang, social metadata, and JSON-LD", async () => {
  const [productHtml, enProductHtml, articleHtml, enArticleHtml] = await Promise.all([
    readFile(productPage, "utf8"),
    readFile(enProductPage, "utf8"),
    readFile(articlePage, "utf8"),
    readFile(enArticlePage, "utf8"),
  ]);

  assert.match(productHtml, /<link rel="canonical" href="https:\/\/hooosberg\.com\/apps\/witnote">/, "Chinese product should canonicalize to its root-language product URL");
  assert.match(productHtml, /hreflang="en" href="https:\/\/hooosberg\.com\/en\/apps\/witnote"/, "Chinese product should link to English alternate");
  assert.match(productHtml, /property="og:title"/, "Open Graph title should render");
  assert.match(productHtml, /name="twitter:card" content="summary_large_image"/, "Twitter card should render");
  assert.match(productHtml, /"@type":"SoftwareApplication"/, "product pages should include SoftwareApplication JSON-LD");

  assert.match(enProductHtml, /<html[^>]*lang="en"/, "English product should use an English html lang");
  assert.match(enProductHtml, /<link rel="canonical" href="https:\/\/hooosberg\.com\/en\/apps\/witnote">/, "English product should canonicalize to the /en product URL");
  assert.match(enProductHtml, /hreflang="zh-CN" href="https:\/\/hooosberg\.com\/apps\/witnote"/, "English product should link back to Chinese alternate");
  assert.match(enProductHtml, /Local-first AI writing app/, "English product content should be translated");

  assert.match(articleHtml, /"@type":"BlogPosting"/, "Chinese article should include BlogPosting JSON-LD");
  assert.match(enArticleHtml, /<link rel="canonical" href="https:\/\/hooosberg\.com\/en\/blog\/drowsebook-market-research">/, "English article should canonicalize to /en/blog");
  assert.match(enArticleHtml, /This English page is generated from the same public product facts/, "English article should render an indexable English body");
});

test("language switch and automatic locale routing are present", async () => {
  const [homeHtml, enHomeHtml] = await Promise.all([
    readFile(homePage, "utf8"),
    readFile(enHomePage, "utf8"),
  ]);

  assert.match(homeHtml, /data-language-switch[^>]*data-target-locale="en"/, "Chinese pages should offer an English switch");
  assert.match(homeHtml, /navigator\.languages/, "Chinese pages should contain browser-language detection");
  assert.match(enHomeHtml, /data-language-switch[^>]*data-target-locale="zh-CN"/, "English pages should offer a Chinese switch");
  assert.match(enHomeHtml, /href="\/"/, "English nav should link back to the Chinese home route through the switch/header alternates");
});

test("English brand and pricing use localized presentation", async () => {
  const [enHomeHtml, enCoursesHtml, enServicesHtml] = await Promise.all([
    readFile(enHomePage, "utf8"),
    readFile(enCoursesPage, "utf8"),
    readFile(enServicesPage, "utf8"),
  ]);

  const combinedEnglish = `${enHomeHtml}\n${enCoursesHtml}\n${enServicesHtml}`;

  assert.match(enHomeHtml, /<strong>@Hooosberg<\/strong>/, "English header should show the compact @Hooosberg brand");
  assert.doesNotMatch(enHomeHtml, /<small>@hooosberg<\/small>/, "English header should not show a second brand line");
  assert.match(enHomeHtml, /<footer[\s\S]*<strong>@Hooosberg<\/strong>/, "English footer should follow the same compact brand rule");
  assert.match(enHomeHtml, />Douyin</, "English footer/social links should translate Chinese platform names");
  assert.doesNotMatch(enHomeHtml, />湖森堡AI_hooosberg</, "English visible brand surfaces should not show the Chinese brand name");
  assert.match(combinedEnglish, /\$220/, "English course price should be displayed in USD");
  assert.match(enServicesHtml, /\$14,800 - \$44,300\+/, "English service price range should be displayed in USD");
  assert.doesNotMatch(combinedEnglish, /RMB|100k|1499 RMB/, "English pages should not expose RMB pricing");
});

test("English articles localize visible tags and metadata keywords", async () => {
  const html = await readFile(enGlotShotArticlePage, "utf8");

  assert.match(html, /<span>launch<\/span>/, "English article tags should render translated tag labels");
  assert.match(html, /<span>review<\/span>/, "English article tags should translate review labels");
  assert.match(html, /<span>closed loop<\/span>/, "English article tags should translate product-process labels");
  assert.doesNotMatch(html, /<span>上架<\/span>|<span>审核<\/span>|<span>闭环<\/span>/, "English article tag pills should not show Chinese labels");
  assert.doesNotMatch(html, /keywords":"[^"]*(上架|审核|闭环)/, "English article JSON-LD keywords should not use Chinese tag labels");
});

test("English AI guide has search, full workflow categories, and regional alternatives", async () => {
  const html = await readFile(enAiNavigationPage, "utf8");

  assert.match(html, /placeholder="Search tools, workflows, tags, or use cases"/, "English AI guide should expose a real search input");
  assert.match(html, /data-directory-search/, "English AI guide should wire the search input to client filtering");
  assert.match(html, /search\?\.addEventListener\("input", update\)/, "English AI guide search should update visible cards");
  assert.match(html, /data-directory-filter="all"/, "English AI guide should expose category filtering");
  assert.match(html, /data-directory-mode="alternatives"/, "English AI guide should include the alternatives mode");

  for (const label of [
    "OpenAI / ChatGPT Ecosystem",
    "Anthropic / Claude Ecosystem",
    "Google / Gemini Ecosystem",
    "Product Ideas / Research",
    "Product Prototype / Design",
    "Development / Hosting",
    "Model APIs / Gateways",
    "Launch / Distribution",
    "Payments / Global Finance",
    "Free Courses / Learning",
    "AI Chat / Search",
    "AI Coding / Agents",
    "AI Image / Design",
    "AI Video / Avatars",
    "AI Office / Documents",
    "AI Developer Platforms / Models",
    "China AI Tools",
  ]) {
    assert.match(html, new RegExp(label), `${label} should be present in the English AI guide`);
  }

  assert.match(html, /Curation standard/, "English AI guide should explain the directory standard");
  assert.match(html, /Regional alternatives/, "English AI guide should translate the alternatives section");
  assert.doesNotMatch(html, /国内平替|分类排行|入库标准|搜索工具/, "English AI guide chrome should not expose Chinese UI labels");
});

test("robots and sitemap exist and avoid legacy legal URLs", async () => {
  const [robots, sitemap] = await Promise.all([
    readFile(robotsPage, "utf8"),
    readFile(sitemapIndex, "utf8"),
  ]);

  assert.match(robots, /Sitemap: https:\/\/hooosberg\.com\/sitemap-index\.xml/, "robots.txt should point to sitemap-index.xml");
  assert.match(sitemap, /sitemap-0\.xml/, "sitemap index should reference the generated sitemap");

  const sitemapZero = await readFile(new URL("../dist/sitemap-0.xml", import.meta.url), "utf8");
  assert.match(sitemapZero, /https:\/\/hooosberg\.com\/privacy\/witnote/, "canonical privacy route should be in sitemap");
  assert.match(sitemapZero, /https:\/\/hooosberg\.com\/en\/privacy\/witnote/, "English privacy route should be in sitemap");
  assert.doesNotMatch(sitemapZero, /https:\/\/hooosberg\.com\/witnote\/privacy/, "legacy privacy route should be filtered from sitemap");
  assert.doesNotMatch(sitemapZero, /https:\/\/hooosberg\.com\/witnote\/terms/, "legacy terms route should be filtered from sitemap");
});

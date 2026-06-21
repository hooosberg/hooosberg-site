import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const distRoot = new URL("../dist/", import.meta.url);
const aiNavigationPage = new URL("../dist/ai-navigation/index.html", import.meta.url);
const servicesPage = new URL("../dist/services/index.html", import.meta.url);

async function listHtmlFiles(dirUrl) {
  const entries = await readdir(dirUrl, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryUrl = new URL(entry.name, dirUrl);

    if (entry.isDirectory()) {
      files.push(...await listHtmlFiles(new URL(`${entry.name}/`, dirUrl)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(entryUrl);
    }
  }

  return files;
}

function routeFromHtmlFile(fileUrl) {
  const relative = path.relative(distRoot.pathname, fileUrl.pathname).replaceAll(path.sep, "/");
  const route = `/${relative}`.replace(/\/index\.html$/, "").replace(/\.html$/, "");

  return route || "/";
}

function normalizeInternalRoute(href) {
  return (href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/");
}

function isPageHref(href) {
  return (
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !href.startsWith("/_astro/") &&
    !/\.(avif|css|gif|ico|jpeg|jpg|js|json|png|svg|webp|xml)$/i.test(href.split("?")[0])
  );
}

function normalizeProductHref(href) {
  const url = new URL(href);
  const pathname = url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");

  return `${url.origin}${pathname}`;
}

test("all generated internal page links resolve to generated pages", async () => {
  const htmlFiles = await listHtmlFiles(distRoot);
  const generatedRoutes = new Set(htmlFiles.map(routeFromHtmlFile));
  generatedRoutes.add("/");

  const missingLinks = [];

  for (const fileUrl of htmlFiles) {
    const html = await readFile(fileUrl, "utf8");

    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      const href = match[1];
      if (!isPageHref(href)) continue;

      const route = normalizeInternalRoute(href);
      if (!generatedRoutes.has(route)) {
        missingLinks.push({ from: routeFromHtmlFile(fileUrl), href });
      }
    }
  }

  assert.deepEqual(missingLinks, [], "internal navigation links should point to generated pages");
});

test("AI navigation filters map exactly to rendered directory groups", async () => {
  const html = await readFile(aiNavigationPage, "utf8");
  const filters = [...html.matchAll(/data-directory-filter="([^"]+)"/g)].map((match) => match[1]);
  const groups = new Set([...html.matchAll(/data-directory-group="([^"]+)"/g)].map((match) => match[1]));
  const localJumpTargets = [...html.matchAll(/data-directory-jump="([^"]+)"/g)].map((match) => match[1]);
  const duplicateFilters = filters.filter((filter, index) => filters.indexOf(filter) !== index);
  const missingGroups = filters.filter((filter) => filter !== "all" && !groups.has(filter));
  const unfilterableGroups = [...groups].filter((group) => !filters.includes(group));
  const missingJumpTargets = localJumpTargets.filter((target) => !groups.has(target));

  assert.deepEqual(duplicateFilters, [], "AI navigation filters should not be duplicated");
  assert.deepEqual(missingGroups, [], "every AI navigation filter should have a matching group");
  assert.deepEqual(unfilterableGroups, [], "every AI navigation group should be reachable from the sidebar");
  assert.deepEqual(missingJumpTargets, [], "ecosystem more links should jump to local sidebar-backed groups");
});

test("AI navigation tool cards use direct product-style URLs", async () => {
  const html = await readFile(aiNavigationPage, "utf8");
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

  assert.ok(productCardHrefs.length > 55, "AI navigation should stay curated while rendering the expected product directory scale");
  assert.deepEqual(articleLikeProductLinks, [], "tool cards should link to direct product sites, apps, or consoles instead of articles, announcements, or help pages");
});

test("AI navigation ranking cards do not duplicate the same customer product", async () => {
  const html = await readFile(aiNavigationPage, "utf8");
  const rankingHtml = html.match(/<div data-directory-view="ranking">([\s\S]*?)<p class="directory-empty"/)?.[1] ?? "";
  const rankingCards = [...rankingHtml.matchAll(/<a\s+class="directory-card"[^>]*href="([^"]+)"[^>]*data-category="([^"]+)"[\s\S]*?<strong>([^<]+)<\/strong>/g)]
    .map((match) => ({ href: match[1], normalizedHref: normalizeProductHref(match[1]), category: match[2], name: match[3] }));
  const productNames = rankingCards.map((card) => card.name);
  const intentionallyRepeatedProducts = new Set([
    "ChatGPT",
    "Claude",
    "Gemini",
    "OpenAI Codex",
    "Claude Code",
    "OpenAI API Platform",
    "Google AI Studio",
    "Google Antigravity",
    "Jules",
    "Google Stitch",
    "腾讯元宝",
  ]);
  const duplicateNames = productNames
    .filter((name, index) => productNames.indexOf(name) !== index)
    .filter((name) => !intentionallyRepeatedProducts.has(name));
  const productHrefs = rankingCards.map((card) => card.normalizedHref);
  const duplicateHrefs = productHrefs
    .filter((href, index) => productHrefs.indexOf(href) !== index)
    .filter((href) => !rankingCards.some((card) => card.normalizedHref === href && intentionallyRepeatedProducts.has(card.name)));

  assert.deepEqual([...new Set(duplicateNames)], [], "ranking mode should only repeat deliberate flagship products across company ecosystems");
  assert.deepEqual([...new Set(duplicateHrefs)], [], "ranking mode should only repeat deliberate flagship product URLs");

  const directAppEntries = new Map([
    ["OpenAI Codex", "https://chatgpt.com/codex/"],
    ["Claude Code", "https://claude.ai/code"],
  ]);

  for (const [name, expectedHref] of directAppEntries) {
    const cards = rankingCards.filter((card) => card.name === name).map((card) => card.href);
    assert.ok(cards.length >= 1, `${name} should appear as a customer product entry`);
    assert.deepEqual([...new Set(cards)], [expectedHref], `${name} should use the direct product app entry instead of a marketing product page`);
  }
});

test("services page keeps consultation CTAs on the contact route", async () => {
  const html = await readFile(servicesPage, "utf8");
  const serviceCtas = [...html.matchAll(/<a\s+class="commerce-action"[^>]*href="([^"]+)"[\s\S]*?咨询服务[\s\S]*?<\/a>/g)].map((match) => match[1]);

  assert.equal(serviceCtas.length, 6, "services page should render one consultation CTA per service card");
  assert.deepEqual([...new Set(serviceCtas)], ["/links"], "service consultation CTAs should route to the central contact page");

  const linksPage = new URL("../dist/links/index.html", import.meta.url);
  await stat(linksPage);
});

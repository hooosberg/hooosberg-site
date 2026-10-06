import type { APIRoute } from "astro";
import { articles } from "../../data/articles";
import { absoluteUrl, getLocalizedArticle } from "../../utils/i18n";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export const GET: APIRoute = async () => {
  const sortedArticles = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
  const buildDate = new Date().toUTCString();

  const itemsXml = sortedArticles
    .slice(0, 50)
    .map((sourceArticle) => {
      const article = getLocalizedArticle(sourceArticle, "en");
      const link = absoluteUrl(`/en/blog/${article.slug}`);
      const pubDate = new Date(article.date).toUTCString();
      const description = escapeXml(article.excerpt);
      const title = escapeXml(article.title);
      const category = escapeXml(article.category);

      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${category}</category>
      <description>${description}</description>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hooosberg AI</title>
    <link>https://hooosberg.com/en</link>
    <description>Local-first apps, AI tools, and real-world project tutorials.</description>
    <language>en</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="https://hooosberg.com/en/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};

import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const productSlugs = new Set([
  "witnote",
  "agentlimb",
  "domprompter",
  "glotshot",
  "codex-quota-calendar",
  "drowsebook",
  "sumi-mahjong",
  "trekreel",
  "mood-button",
  "rushi",
  "dailyzikr",
  "packpour",
  "beraw",
  "uixskills",
]);

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: "https://hooosberg.com",
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      serialize(item) {
        const url = new URL(item.url);

        // Canonical URLs throughout the site omit a trailing slash (except the
        // homepage). Keep the sitemap aligned so crawlers see one URL form.
        if (url.pathname !== "/") {
          url.pathname = url.pathname.replace(/\/+$/, "");
        }

        return { ...item, url: url.toString() };
      },
      filter: (page) => {
        const { pathname } = new URL(page);
        const [, first, second] = pathname.split("/");

        return !(productSlugs.has(first) && ["privacy", "terms"].includes(second));
      },
      i18n: {
        defaultLocale: "zh-CN",
        locales: {
          "zh-CN": "zh-CN",
          en: "en",
        },
      },
    }),
  ],
});

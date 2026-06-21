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

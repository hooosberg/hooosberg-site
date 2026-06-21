# hooosberg-site

`hooosberg.com` 个人站本地原型。

源码仓库现在位于：

```text
/Users/maohuhu/Desktop/编程项目/ai教程项目/hooosberg-site/github
```

本地不上传资料放在：

```text
../local
```

网站相关开发文档统一放在上级项目根目录：

```text
../../docs/website
```

重点文档：

- `../../docs/website/seo-i18n-architecture.md`
- `../../docs/website/development-diary-workflow.md`

当前目标：

- 首页首屏直接展示产品矩阵和下载入口。
- `/apps` 展示所有产品。
- `/apps/<slug>` 提供每个产品的独立落地页、下载链接、隐私政策和支持入口。
- `/privacy/<slug>` 与 `/support/<slug>` 先建立 App Store 可用路径。
- `/blog`、`/courses`、`/links` 先作为后续内容入口。
- `/en/...` 提供英文镜像路径；中文保留根路径，英文统一放在 `/en` 下。
- 所有核心页面输出 canonical、hreflang、Open Graph、Twitter Card 和结构化数据；构建时生成 `robots.txt`、`sitemap-index.xml`。

## 本地开发

```bash
cd /Users/maohuhu/Desktop/编程项目/ai教程项目/hooosberg-site/github
npm install
npm run dev -- --port 4321
```

打开：

```text
http://localhost:4321/
```

如果 4321 被占用，Astro 会自动尝试下一个端口，例如 `http://localhost:4323/`。

## 构建

```bash
cd /Users/maohuhu/Desktop/编程项目/ai教程项目/hooosberg-site/github
npm run build
```

## GitHub 与 Cloudflare Pages

GitHub 仓库根目录使用当前 `github/` 文件夹。

Cloudflare Pages 推荐设置：

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

不要上传 `../local` 中的文件。敏感配置放在 Cloudflare Pages 的 Environment variables 或 Secrets 中，不写入源码仓库。

## 产品数据

产品集中维护在：

```text
src/data/products.ts
```

新增产品时，先补这里，再检查：

- `/apps`
- `/apps/<slug>`
- `/privacy/<slug>`
- `/terms/<slug>`
- `/en/apps/<slug>`
- `/en/privacy/<slug>`
- `/en/terms/<slug>`

## 多语言与 SEO

当前规则：

- 中文 canonical：`/<route>`，例如 `/apps/witnote`、`/blog/drowsebook-market-research`。
- 英文 canonical：`/en/<route>`，例如 `/en/apps/witnote`、`/en/blog/drowsebook-market-research`。
- 旧兼容法律路径：`/<slug>/privacy`、`/<slug>/terms` 会 canonical 到 `/privacy/<slug>`、`/terms/<slug>`，并从 sitemap 过滤。
- 非中文浏览器首次访问中文根路径时，会自动跳到英文镜像路径；用户手动切换语言后会记住选择。
- 主题默认按本地时间自动选择，用户点击主题按钮后会记住手动选择。

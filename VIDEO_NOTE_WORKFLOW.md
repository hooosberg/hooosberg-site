# 视频教程笔记更新流程

这份流程用于把 B 站单集视频、录制课程课件和可复制提示词同步到 hooosberg.com 的「视频教程笔记」。

## 资料位置

- 课程素材：`/Users/maohuhu/Desktop/录制课程/课程/`
- B 站采集器：`/Users/maohuhu/Desktop/录制课程/工具/B站_WorkBuddy互动采集器/`
- 网站文章数据：`src/data/articles.ts`
- 文章详情页：`src/pages/blog/[slug].astro`
- 测试：`tests/diary-navigation.test.mjs`

## 1. 获取每集视频链接

优先用本地 B 站采集器列出当前合集视频：

```bash
cd /Users/maohuhu/Desktop/录制课程/工具/B站_WorkBuddy互动采集器
.venv/bin/python main.py list-videos
```

输出里会包含每集的 `BV` 号。网站使用标准单集链接：

```text
https://www.bilibili.com/video/BVxxxx
```

如果某一集还没上传，就不要猜链接。在 `src/data/articles.ts` 里保留 `videoMeta` 占位，例如：

```ts
videoMeta: "第 7 集视频待上传",
body: ["视频入口：第 7 集待上传，发布后会替换为单集链接。"],
```

上传后再补：

```ts
videoUrl: workBuddyVideoUrls.lesson7,
videoMeta: "B 站：WorkBuddy 第 7 课",
body: [`视频入口：${workBuddyVideoUrls.lesson7}`, "..."],
```

## 2. 更新网站文章

在 `src/data/articles.ts` 里维护 `workBuddyVideoUrls`：

```ts
const workBuddyVideoUrls = {
  lesson1: "https://www.bilibili.com/video/BV...",
} as const;
```

每一课对应一个 `video-workbuddy-lesson...` 文章条目。更新时检查：

- `videoUrl` 是否指向单集 BV 链接。
- `videoMeta` 是否写成 `B 站：WorkBuddy 第 N 课`。
- `body` 第一段是否以 `视频入口：` 开头，方便详情页隐藏重复文本。
- `sections` 是否包含课件整理、Word 课件转写、可复制提示词。
- 提示词放进 `codeBlocks`，不要只放在普通段落里。

## 3. 从课件整理笔记

每节课优先读取对应课程目录里的 Word、PPT、Markdown、发布资料和字幕：

```text
/Users/maohuhu/Desktop/录制课程/课程/NN_WorkBuddy_课程名/
```

整理成公开笔记时保持这个顺序：

1. 开头放视频入口。
2. 用 1-2 段说明本课解决什么问题。
3. `课件整理` 写材料、流程、检查点。
4. `Word 课件转写` 尽量保留课件里的关键表达，但改成网页上更清晰的段落。
5. `可复制提示词` 用 `codeBlocks` 拆成可复制的多段提示词。

涉及招投标、合同、财务、系统清理等高风险场景时，要写清教学案例、人工复核、原始文件不覆盖、正式规则优先。

## 4. 验证

每次改完至少跑：

```bash
npm test
```

如果改了详情页渲染或样式，再开本地站点检查：

```bash
npm run dev -- --host 127.0.0.1
```

重点看：

- `/blog/?kind=video` 是否仍显示 7 篇视频教程笔记。
- 已上传课程的「打开视频」是否跳到单集 BV 链接。
- 未上传课程是否显示「待上传」占位。
- 提示词代码块在桌面和手机宽度下不横向撑破页面。

## 5. 提交发布

确认测试通过后提交并推送：

```bash
git status --short
git add src/data/articles.ts src/pages/blog/[slug].astro src/pages/en/blog/[slug].astro tests/diary-navigation.test.mjs VIDEO_NOTE_WORKFLOW.md
git commit -m "Update video note links"
git push origin main
```

Cloudflare Pages 会从 `main` 分支自动部署。

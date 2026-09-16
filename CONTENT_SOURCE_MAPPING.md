# 网站教程内容与本地录制课程目录映射指南

> **维护说明**：本指南用于永久记录 hooosberg.com 网站各教程专栏与本地录制视频/课件文件夹的物理对应关系，便于后续更新、维护或自动化脚本同步，无需重复核对文件夹位置。

---

## 一、栏目与本地文件夹物理映射表

| 网站栏目名称 | 网站 Tab 标识 | 对应本地录制视频绝对根路径 | 说明与主要内容 |
| :--- | :--- | :--- | :--- |
| **WorkBuddy AI办公教程** | `workbuddy` | `/Users/maohuhu/进行中的项目/录制课程/课程/免费视频/workbuddy` | 包含 34 节 WorkBuddy 基础到进阶办公自动化视频、配套 Word 提示词、企业实战案例、开源公文 Skill、知识库架构等。 |
| **Codex编程教程** | `cola` (标识符) | `/Users/maohuhu/进行中的项目/录制课程/课程/免费视频/` 下的：<br>1. `ai资讯/`<br>2. `chatgpt/`<br>3. `cola/` | 包含：<br>- **ChatGPT 视觉与设计流**（海报转 PSD、MV 分镜、草图控姿态）<br>- **前沿 AI 实测**（GPT-6 Astra 3D 建模、果蝇连接组、Hy4 动效）<br>- **AI 编程与工具实操**（Codex 外挂 Gemini、Claude Code、AionUi 免费 API、WitNote 重构、Markdown 科普） |
| **收费实战课程（备用）** | `paid` | `/Users/maohuhu/进行中的项目/录制课程/课程/付费视频/` | 收费进阶课程，目前已从前台公开学习笔记中移除，数据模型在后台保留备用。 |

---

## 二、新录制课程同步到网站的标准工作流程

当录制完一期新视频并准备同步到网站时，按照以下 4 步即可完成上线：

### 第一步：检查并提取本地课件 / 素材
1. 前往对应的本地文件夹（例如 `ai资讯/...` 或 `chatgpt/...`）；
2. 提取该课程的：
   - 视频标题、简介、标签（通常在 `.md` 或 `视频标题.md` 中）；
   - 视频字幕（`.srt`）与口播稿；
   - 配套课件或可供下载的说明文档（如 `.md`、`.blend`、`.psd` 使用说明、Prompt 模板等）。

### 第二步：放置可下载资源（若有）
若该课程包含适合学员下载的 Markdown 课件或指南：
- 复制或编写 Markdown 文件至 `public/downloads/codex/`（Codex 系列）或 `public/downloads/workbuddy/`（WorkBuddy 系列）；
- 命名规范：`第XX集-课程核心主题说明.md`。

### 第三步：在 `src/data/articles.ts` 中注册文章详情
在 `articles.ts` 的 `videoTutorialNoteSeeds` 数组中添加对应的 Article 对象：
```ts
{
  slug: "video-codex-your-slug",
  title: "视频完整标题",
  category: "视频教程笔记",
  diaryKind: "video",
  date: "YYYY-MM-DD",
  seriesOrder: 2xx,
  handoutFirst: true, // 启用专属课件排版
  excerpt: "一句话简介",
  tags: ["视频教程", "Codex", "AI编程", ...],
  productSlugs: [],
  videoUrl: "https://www.bilibili.com/video/BVxxxx" // 或合集链接,
  videoMeta: "B 站：Codex 编程实战与前沿评测",
  downloadableResources: [{ // 若有下载文件则配置
    title: "文件名.md",
    description: "文档描述",
    fileName: "文件名.md",
    url: "/downloads/codex/文件名.md",
  }],
  body: [
    "实战背景与核心问题说明..."
  ],
  sections: [
    {
      heading: "步骤一 / 提示词",
      paragraphs: ["操作思路与要求..."],
      codeBlocks: ["可直接复制的 Prompt 或配置代码..."],
    },
  ],
}
```

### 第四步：在 `src/data/learningSeries.ts` 中挂载到列表
1. 打开 `src/data/learningSeries.ts`；
2. 在对应系列（如 `id: "cola"`）的 `lessons` 数组中添加新课程：
   - 最新的课程排在数组最顶部；
   - 调整 `number` 序号，保持倒序排列（最新课程编号最大）；
   - 填入 `articleSlug` 指向刚创建的 slug；
   - 若有可下载文件，设置 `hasDownload: true`；
   - 填入 B 站单集 `videoUrl` 或合集链接。

### 第五步：验证与构建
在终端执行：
```bash
npm test
```
确认 27 项自动化测试与全站 550+ 页面构建无误后即可发布。

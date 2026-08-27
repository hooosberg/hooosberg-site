import { products, type Product } from "./products";
import { expandedProductDiaries } from "./expandedProductDiaries";
import { defaultProductDiarySourceNote, productDiarySourceNotes } from "./productDiarySourceNotes";
import { workbuddyLesson16Prompts } from "./workbuddyLesson16Prompts";
import { workbuddyLesson21Prompts } from "./workbuddyLesson21Prompts";
import { workbuddyLesson21Skill } from "./workbuddyLesson21Skill";
import { workbuddyLesson22UnifiedPrompt } from "./workbuddyLesson22UnifiedPrompt";
import { workbuddyLesson23Prompts } from "./workbuddyLesson23Prompts";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  codeBlocks?: string[];
};

export type DownloadableResource = {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  fileName: string;
  content?: string;
  url?: string;
};

export type DiaryKind = "video" | "product" | "reading" | "thought" | "resource";

export type Article = {
  slug: string;
  title: string;
  category:
    | "Codex 办公"
    | "产品复盘"
    | "App Store"
    | "AI 工作流"
    | "设计系统"
    | "架构实现"
    | "视频教程笔记"
    | "读书笔记"
    | "随想笔记"
    | "资源分享笔记";
  diaryKind: DiaryKind;
  date: string;
  excerpt: string;
  tags: string[];
  productSlugs: string[];
  productLabel?: string;
  resourceUrl?: string;
  resourceMeta?: string;
  videoUrl?: string;
  videoMeta?: string;
  downloadableResources?: DownloadableResource[];
  relatedArticleSlugs?: string[];
  seriesOrder?: number;
  handoutFirst?: boolean;
  body: string[];
  sections?: ArticleSection[];
  contentHtml?: string;
};

export type ArticleSeed = Omit<Article, "body" | "diaryKind"> & {
  diaryKind?: DiaryKind;
  body?: string[];
};

export const diarySections: Array<{
  kind: DiaryKind;
  label: string;
  summary: string;
}> = [
  {
    kind: "video",
    label: "视频教程笔记",
    summary: "承接 B 站视频课程，把单集链接、课件、提示词和操作流程整理成更清晰的公开笔记。",
  },
  {
    kind: "product",
    label: "产品笔记",
    summary: "真实产品开发过程的聚合：立项、功能、架构、上架、复盘和每一次和 AI 共同推进的记录。",
  },
  {
    kind: "reading",
    label: "读书笔记",
    summary: "AI 时代他们在训练模型，图书就是我们的大脑的磨刀石，最高级的资产就是我们的大脑。",
  },
  {
    kind: "thought",
    label: "随想笔记",
    summary: "关于 AI、办公、失业、技术人文和个人开发道路的松散记录，先把真实想法留下来。",
  },
  {
    kind: "resource",
    label: "资源分享笔记",
    summary: "平时发现好的开源项目、工具、资料和工作流，就写成中文推荐，给需要的人一条更短的路。",
  },
];

const workBuddyVideoUrls = {
  lesson1: "https://www.bilibili.com/video/BV1qaMN6NEYa",
  lesson2: "https://www.bilibili.com/video/BV14tMs6zEHm",
  lesson3: "https://www.bilibili.com/video/BV1bYMb6QE8t",
  lesson4: "https://www.bilibili.com/video/BV1isMY6CE8G",
  lesson5: "https://www.bilibili.com/video/BV1AZM56uE1V",
  lesson6: "https://www.bilibili.com/video/BV12bKH6sETZ",
} as const;

const videoTutorialNoteSeeds: ArticleSeed[] = [
  {
    slug: "video-workbuddy-lesson7-bidding-workspace",
    title: "第7集｜WorkBuddy＋AI工作流＋Word：AI自动整理招投标资料，完成报价分析 ｜AI自动化办公",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-07-22",
    excerpt: "把历史资料、评估规则、当前项目和 README 固定成一个可反复运行的 AI 报价工作区。",
    tags: ["视频教程", "WorkBuddy", "课件", "提示词", "AI 办公", "Excel"],
    productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV1CCgr6nEyD/",
    videoMeta: "B 站：第 7 集｜WorkBuddy＋AI工作流＋Word",
    body: [
      "视频入口：第 7 集已发布，页面顶部提供对应的 B 站单集链接。",
      "这一课不是让 AI 临时做一张表，而是把招投标报价工作整理成一个长期可复用的工作区。核心结构是：历史资料 + 规则资料 + 当前任务 + README 工作说明。",
      "文件夹负责放资料：历史项目、评估办法和当前新项目各归各位。README 负责写清楚处理顺序、异常标记、输出位置和归档规则。以后只需要把新项目丢进 03_新项目，再用一句话启动 WorkBuddy。"
    ],
    sections: [
      {
        heading: "课件整理",
        paragraphs: [
          "先展示空工作区，不展示结果：01_历史项目 放已完成项目的原始 Excel，02_评估办法 放过去使用过的报价规则，03_新项目 放招标文件、基本资料和报价汇总，04_输出结果 与 05_已完成项目 先保持空白。",
          "新项目应输出三类结果：新项目报价评分表，包含有效性、评标基准价、偏差率、报价得分、排名和备注；历史项目对比表，只展示筛选出的相似项目和选择原因；报价分析报告，说明规则来源、异常缺失、历史区间与风险提示。",
          "项目结束后再归档。真实中标结果确认前，不要把未确认项目当成历史经验。所有教学公司、金额和资料都应视为虚构案例，真实项目必须以正式招标文件和人工复核为准。"
        ],
      },
      {
        heading: "Word 课件转写",
        paragraphs: [
          "WORKBUDDY 系列第 7 课的课件标题是“别再反复改 Excel：给 WorkBuddy 建一个可复用的招投标报价工作区”。课程不从复杂公式开始，而是把资料、规则和人的工作步骤固定下来。",
          "核心公式是：历史资料 + 规则资料 + 当前任务 + README 工作说明 = 可反复运行的 AI 工作区。文件夹负责放资料，README 负责写清流程。",
          "课堂第一步是先看问题发生前的原始资料：历史文件格式不一致，表头、金额单位、公司名称可能都不同；新项目只有招标文件、基本资料和原始报价表，还没有得分、排名或建议报价。",
          "课堂第二步是用 README 把人工经验写给 AI。README 不是技术文档，而是写给 WorkBuddy 的工作说明书；第三步才用一句话启动 WorkBuddy；第四步是在项目结束后，让数据成为下一次参考。",
          "这一课可以迁移到采购比价、合同审核、客户分析、报销、周报和资料归档。真正要学走的不是招投标本身，而是“资料 + 规则 + 当前任务 + 工作说明”的工作区方法。"
        ],
      },
      {
        heading: "可复制提示词",
        paragraphs: [
          "下面三段分别对应创建 README、处理新项目、确认结果后归档。建议按顺序使用，不要跳过 README。"
        ],
        codeBlocks: [
          "请进入“招投标报价自动化”文件夹，先查看 01_历史项目、02_评估办法 和 03_新项目 中的原始资料。\n\n请创建 README.md，说明：\n1. 每个文件夹中资料的用途，以及哪些原始文件不得修改；\n2. 需要从历史项目、评估办法和新项目中识别的关键字段；\n3. 处理新项目的顺序：检查资料、整理历史项目、筛选参考项目、选择评估办法、计算、输出、归档；\n4. 资料缺失、规则不明确或金额单位不一致时该怎样标记；\n5. 输出文件应保存的位置，以及项目结束后如何进入历史资料。\n\n不要计算本次项目，不要生成 Excel 结果，不要修改任何原始文件。先只完成 README.md。",
          "请进入“招投标报价自动化”文件夹，阅读 README.md，并严格按照其中的流程处理 03_新项目。\n\n读取招标文件、项目基本信息和原始报价表；优先使用本项目招标文件中明确的报价评分规则。\n从 01_历史项目中筛选与当前项目类型、评估办法、控制价规模和时间更接近的项目作为参考，并说明筛选依据。\n\n在 04_输出结果 中生成报价评分表、历史项目对比表和报价分析报告。\n不要修改任何原始文件；遇到缺失、异常或无法确定的数据，请在报告中明确标记，不要自行编造。",
          "本项目已结束。我会补充最终中标公司和中标报价。请读取 03_新项目 及我补充的最终结果，按照 README.md 的归档规则处理：\n\n1. 将项目资料复制到 05_已完成项目；\n2. 补充最终中标公司和中标价格；\n3. 统一整理为可识别的历史项目资料；\n4. 在归档报告中说明本项目何时可被纳入后续历史分析。\n\n不要覆盖原始文件，也不要删除已有历史项目。"
        ],
      },
    ],
  },
  {
    slug: "video-workbuddy-lesson6-windows-cleanup",
    title: "第6集｜WorkBuddy＋AI工作流：一键清理流氓软件，自动安装常用正规软件 ｜AI自动化办公",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-07-21",
    excerpt: "用 WorkBuddy 检查残留目录、注册表和异常条目，同时演示正规软件安装流程。",
    tags: ["视频教程", "WorkBuddy", "课件", "提示词", "Windows", "AI 办公"],
    productSlugs: [],
    videoUrl: workBuddyVideoUrls.lesson6,
    videoMeta: "B 站：WorkBuddy 第 6 课",
    body: [
      `视频入口：${workBuddyVideoUrls.lesson6}`,
      "这一课的核心是让观众理解：干净安装和清理残留是一体两面。如果软件来源不规范，后面就容易出现残留目录、异常启动项、注册表垃圾和反复复活的问题。",
      "课程先演示问题来源，再让 WorkBuddy 逐步清理残留、检查是否会死灰复燃，最后用正规安装 WPS 的流程对比什么叫干净的软件安装。"
    ],
    sections: [
      {
        heading: "课件整理",
        paragraphs: [
          "清理对象包括 C:/Gstarsoft、C:/KDubaSoftDownloads、C:/Ksoftware、C:/MobileEmuMaster、C:/Program Files (x86)/JszTyping 等残留目录。",
          "不要只删除文件夹，还要检查注册表、启动项、异常条目和残留脚本。清理前最好让 WorkBuddy 说明风险，清理后再让它复查。",
          "安装软件部分要强调正规渠道和版本确认。课程中使用 WPS 安装作为演示，重点不是某个软件，而是下载、版本、安装覆盖和进度确认的流程。"
        ],
      },
      {
        heading: "Word 课件转写",
        paragraphs: [
          "课件标题是“WorkBuddy 从0到1小白入门第6课：使用 WorkBuddy 清理 Windows 电脑流氓软件和安装软件”。课程核心提示是：AI 代理的超能力典型代表功能，就是能帮用户做系统级检查和连续操作。",
          "干净安装和清理流氓软件是一体两面。如果所有软件安装过程都是正规渠道，就不会出现大量残留目录、异常启动项和注册表垃圾。课件里用一句话概括：吃得干净才不会拉肚子。",
          "课程先演示病因：这些软件如何跑到电脑里。然后让 WorkBuddy 按目录、注册表、异常条目和复燃风险逐层清理。最后再用安装 WPS 的流程演示正规软件安装。",
          "注意清理类任务要强调风险边界：先列出将要删除的项目，再确认是否备份，再执行清理。遇到注册表、系统启动项、服务项时，不要让 AI 静默删除。"
        ],
      },
      {
        heading: "可复制提示词",
        paragraphs: [
          "下面几段来自 Word 课件，适合按清理顺序逐条输入。"
        ],
        codeBlocks: [
          "C:/Gstarsoft\nC:/KDubaSoftDownloads\nC:/Ksoftware\nC:/MobileEmuMaster\nC:/Program Files (x86)/JszTyping\n\n帮我清理这些之前下载删除后还残留的流氓软件，并且检查注册表并且删除这些残留。",
          "帮我看看还有没有会死灰复燃的流氓软件检查下。",
          "帮我清理所有异常条目。",
          "registry_backup\\完成清理.cmd 在哪",
          "帮我在电脑上安装金山 WPS。\n2019 版本可以么？\n帮我直接安装覆盖 2019 版本？\n下载多少了？"
        ],
      },
    ],
  },
  {
    slug: "video-workbuddy-lesson5-ai-poster",
    title: "视频教程笔记 · 第 5 课：AI 一键制作企业宣传海报",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-07-20",
    excerpt: "用 1 文案、2 图片、3 组合排版、4 修改找茬的方式，把海报制作变成可复用流程。",
    tags: ["视频教程", "WorkBuddy", "课件", "提示词", "AI 图像", "设计流程"],
    productSlugs: [],
    videoUrl: workBuddyVideoUrls.lesson5,
    videoMeta: "B 站：WorkBuddy 第 5 课",
    body: [
      `视频入口：${workBuddyVideoUrls.lesson5}`,
      "这一课把企业宣传海报拆成四步：先整理文案，再准备图片，再组合排版，最后进入修改找茬。第一次比较慢，但流程保存下来后，第二次做类似海报就会变成一套技能。",
      "案例使用“西安未来智造数字科技有限公司”的 A4 宣传海报。课件里先提炼公司简介、核心业务、应用场景、资质和联系方式，再围绕科技感、磨砂玻璃、苹果网站气质和严谨边距不断迭代。"
    ],
    sections: [
      {
        heading: "课件整理",
        paragraphs: [
          "海报文案包括主标题“西安未来智造数字科技有限公司”，副标题“匠心铸精品 · 科技创价值”，公司简介、核心业务、应用场景、公司资质和联系方式。",
          "核心业务可以分成 3D 打印、CNC 加工、三维扫描、建模设计、表面喷涂、开模注塑。应用场景可以浓缩为产品原型开发、手板结构验证、抄数逆向、工业设备与沙盘模型、文创礼品、教学实训模型。",
          "迭代时不要只说“美化一下”。要逐项指出 logo 是否裁切、标题是否居中、磨砂背景是否压住文字、业务卡片是否对齐、合作伙伴图标是否完整、底部联系方式是否占位合理。"
        ],
      },
      {
        heading: "可复制提示词",
        paragraphs: [
          "海报课适合把提示词分成“初稿生成”和“多轮找茬”。每一轮只改明确问题，不要一句话要求整体变好。"
        ],
        codeBlocks: [
          "第1个提示词｜课件原始案例\n\n西安未来智造数字科技有限公司是国家高新技术企业、科技型中小企业，2015 年起步，2018 年正式扎根西安，深耕工业智造领域。作为集 3D 打印、三维扫描、三维建模、CNC 精密加工、表面处理于一体的源头工厂，公司秉持“匠心铸精品、科技创价值”理念，为上万客户提供高精度工业模型制作、一站式个性化非标定制解决方案。业务覆盖产品原型开发打样、手板结构验证、抄数逆向、工业机械设备与沙盘模型、文创礼品定制、教学实训模型制作等多个场景。可按需定制精密机械模型、建筑微缩模型、生产线工业沙盘、结构剖面解剖模型、纪念礼品模型等各类高精度模型，满足工业展示、研发测试、教学科普、商务礼品等多元需求。\n\n电话：15129188049\n邮箱：peter.wang@3d-future.cn\n地址：西安市西咸新区西部云谷 1 期秀雅路 998 号\n网站：http://www.future-3d.cn/Default.aspx\n\n我们根据这些信息生成一张 A4 宣传海报，其中顶部是公司名称，中间是公司介绍、配图和公司业务介绍，底部是电话。实用生图模型直接生成一个海报，风格要具有科技感。我们先不着急生图，先沟通海报主题内容文字部分，也就是标题、介绍、业务介绍和下面联系方式等的文案部分；再确定图片，最后组装起来进行平面设计。项目重要时，可以根据首页信息图文转换：把首页文案当作海报文案，复用首页图片；CNC 加工等对应图片可下载到根目录的素材库，素材库只放图片素材。如果图片不合适，可以网上寻找或用生图模块重新生成。整体框架文字和构图可以用代码绘图，底部素材、背景、边框等可用生图模块，由你决定；最终整体有科技感即可。海报最好包含首页的公司资质、合作伙伴，以及网站其他部分可用信息。先抓取网站整体信息，再从文案开始、确定图片、最后组装。",
          "把文案放到根目录，然后进行下一步。根据文案在网站找图或者生成图都行，你需要根据设计需要来评估。",
          "把这一版海报保存到根目录，名称叫做“未来制造第一版海报”，格式是 jpeg，分辨率 300。后面进入大家来找茬的模式。",
          "问题修改：这一版海报我不是很满意，其中有几个问题：\n1. 图标尤其是公司 logo 尺寸被裁切了；\n2. 合作伙伴 logo 白色背景没去掉，也裁切没有显示全；\n3. 公司顶部名称、副标题和 logo 之间的排版作为整体应该居中；\n4. 核心业务这里的背景框最好是磨砂透明；\n5. 现在整个画面看起来太暗，可以把科技感背景做成从下向上的渐变粒子效果；\n6. 整体更像苹果网站，多一些磨砂玻璃效果；\n7. 作为印刷排版，边距和内部对齐都需要严谨。\n\n重新修改后保存为“未来制造第2版海报”，格式 jpeg，分辨率 300，放到根目录。",
          "问题修改：这次设计好一些了，但还有几个问题：\n1. 顶部区域公司 logo、公司名字和副标题，因为背景顶部浅色、下面深色，所以这三个元素可以统一为深蓝色，并加一点文字材质特效；\n2. 公司介绍部分文字小一点，占用高度少一些，文字改成深色并左对齐；\n3. 介绍背景框压住了上面标题部分的副标题，要让出距离；\n4. 应用场景板块文字太暗，进入深色区域后需要变亮；\n5. 背景粒子遮挡文字，可以增加从上到下的模糊效果；\n6. 最下面备案号码去掉；\n7. 背景右下角有 AI 生成字样，放大背景尺寸把文字裁切掉。\n\n修改好后导出“未来制造第3版海报”，格式 jpeg，分辨率 300，放到根目录。",
          "问题修改：现在核心业务的矩形列表没有对齐，大小不一样。图片展示区域被压缩得太窄，想办法让内部图片尺寸比例正常一些。如果放不下，就整体缩小每个模块，核心业务每个矩形块的图文都缩小。底部地址和邮箱可以替换到它们下面的版权所有文字位置，字体颜色风格保持和版权所有一样，这样能放得下。",
          "问题修改：核心业务里的模块自身间距要得当。整体标题和正文的字体大小不要太多层级，统一成类似“标题”和“正文”两个尺寸层级。最下面合作伙伴 icon 还是有些裁切，可以统一给它们一个正方形磨砂玻璃圆角矩形浅色透明背景，把 icon 不裁切地放到矩形上。完成后导出第四版，最好做完后自己截图检查。",
          "第8个提示词｜课件原始提示词\n\n应用场景、合作伙伴和下面的电话板块，这三个板块现在整体上下间距太近，底部留下大量空白；它们应该让文字、图标、素材居中对齐。资质 logo 里第一个 logo 是长方形，要让背景矩形配合 logo 的比例变化；其他位置不要再变了，已经挺好。背景图片增加模糊效果，现在又变清晰了。"
        ],
      },
    ],
  },
  {
    slug: "video-workbuddy-lesson4-image-editing",
    title: "视频教程笔记 · 第 4 课：用 WorkBuddy 修改图片",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-07-19",
    excerpt: "把图片修改任务拆成目标、素材、局部问题、版本导出和截图复查，让 AI 视觉编辑有检查点。",
    tags: ["视频教程", "WorkBuddy", "课件", "提示词", "图片编辑", "AI 图像"],
    productSlugs: [],
    videoUrl: workBuddyVideoUrls.lesson4,
    videoMeta: "B 站：WorkBuddy 第 4 课",
    body: [
      `视频入口：${workBuddyVideoUrls.lesson4}`,
      "这一课的重点不是“让 AI 随便修图”，而是把图片修改任务拆成可检查的步骤：先说明最终目标，再指出局部问题，再让 WorkBuddy 生成或修改素材，最后导出版本并截图复查。",
      "案例目录里保留了原图、修改过程图、裁切图和最终结果图，说明图片编辑最好用版本管理的方式推进。不要覆盖原始图，每次重要修改都输出一个新版本。"
    ],
    sections: [
      {
        heading: "课件整理",
        paragraphs: [
          "准备材料：原始图片、需要保留的区域、需要删除或替换的区域、目标尺寸和最终输出格式。图片任务里最容易失败的是边缘、比例、裁切和局部文字。",
          "处理顺序：先让 WorkBuddy 观察图片内容，再列出可修改区域；确认目标后再做局部修改；修改后生成中间版本；最后统一裁切、导出和命名。",
          "检查重点：主体有没有变形，边缘是否干净，底部或角落是否裁切过度，文字是否清晰，输出图片是否符合使用场景。"
        ],
      },
      {
        heading: "可复制提示词",
        paragraphs: [
          "图片编辑课的提示词要先观察、再修改、最后复查，不要一开始就覆盖原图。"
        ],
        codeBlocks: [
          "请先观察这张图片，不要马上修改。请说明图片里有哪些主体、背景、文字和可能影响编辑的细节，再列出你建议的修改步骤。",
          "请按照我的目标修改图片，但不要覆盖原图。先输出一个中间版本，并说明你修改了哪些区域、哪些区域保持不变。",
          "请检查刚才的结果：主体比例、边缘、文字清晰度、底部裁切和整体构图是否有问题。如果有问题，请继续生成下一版，并把文件名按版本保存。"
        ],
      },
    ],
  },
  {
    slug: "video-workbuddy-lesson3-word-formatting",
    title: "视频教程笔记 · 第 3 课：Word 公文排版自动化",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-07-18",
    excerpt: "用绩效评估通知案例整理 Word 公文排版流程，让 AI 按格式要求生成可交付文档。",
    tags: ["视频教程", "WorkBuddy", "课件", "提示词", "Word", "AI 办公"],
    productSlugs: [],
    videoUrl: workBuddyVideoUrls.lesson3,
    videoMeta: "B 站：WorkBuddy 第 3 课",
    body: [
      `视频入口：${workBuddyVideoUrls.lesson3}`,
      "这一课围绕 Word 公文排版展开，案例文件是“关于开展2026年度工作绩效评估与排名工作的通知.docx”，同时有格式要求 PDF 和印章素材。",
      "公文自动化不是只让 AI 写一段文字，而是把正文结构、标题层级、字体字号、落款、日期、印章和最终检查流程固定下来。"
    ],
    sections: [
      {
        heading: "课件整理",
        paragraphs: [
          "准备材料：原始 Word 通知、格式要求 PDF、印章图片和输出目录。先让 WorkBuddy 读取格式要求，再判断原文档有哪些不符合项。",
          "处理顺序：识别标题、正文、分条、附件、落款和日期；按要求调整字号、字体、段落间距、缩进和页面边距；最后放置印章并导出结果。",
          "检查重点：标题是否符合要求，正文是否统一，分条编号是否连续，落款和日期是否位置正确，印章是否透明且没有遮挡关键文字。"
        ],
      },
      {
        heading: "可复制提示词",
        paragraphs: [
          "Word 公文排版先检查，再修改，再处理印章和导出，方便逐步核对。"
        ],
        codeBlocks: [
          "请读取这个 Word 文档和格式要求 PDF，先列出当前文档与格式要求不一致的地方。不要马上修改，先给我一份检查清单。",
          "请按格式要求修正文档，包括标题、正文、段落、编号、落款、日期和页边距。请保留原始内容含义，不要自行改写业务信息。",
          "请把印章图片放到合适位置，确保透明背景正常、大小合适、不遮挡正文。完成后导出一个新文件，并说明你改了哪些格式。"
        ],
      },
    ],
  },
  {
    slug: "video-workbuddy-lesson2-ppt-murals",
    title: "视频教程笔记 · 第 2 课：用 AI 自动生成唐代壁画 PPT",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-07-17",
    excerpt: "从汇报目标、图片材料、逐页大纲到设计指导，整理一套可编辑 PPT 生成流程。",
    tags: ["视频教程", "WorkBuddy", "课件", "提示词", "PPT", "AI 办公"],
    productSlugs: [],
    videoUrl: workBuddyVideoUrls.lesson2,
    videoMeta: "B 站：WorkBuddy 第 2 课",
    body: [
      `视频入口：${workBuddyVideoUrls.lesson2}`,
      "这一课的案例是“唐代壁画研究与保护工作汇报”。课件已经把每页 PPT 拆成显示文字、配图说明和设计指导三部分，适合转换成可检索的文字笔记。",
      "做 PPT 的关键不是立刻生成幻灯片，而是先把汇报目标、受众、图片材料、章节结构和每页版式说清楚。WorkBuddy 的价值在于把这些要求落到逐页内容。"
    ],
    sections: [
      {
        heading: "课件整理",
        paragraphs: [
          "封面页：主标题“唐代壁画研究与保护工作汇报”，副标题“博物馆壁画组 · 2026年度”，日期“2026年7月”。视觉方向是盛唐气象，金色、朱红、深绿，带唐代云纹、卷草纹和壁画剥落质感。",
          "目录页分成两大板块：科普篇包含发掘历程、工艺技法、经典案例；工作篇包含现场勘察、修复记录、团队成果和未来计划。",
          "科普篇可以讲发掘历程、时代背景与地域分布、材料与基底工艺、绘制流程、章怀太子墓乐舞图、懿德太子墓仪仗图、永泰公主墓侍女图。工作篇可以讲现场勘察、壁画修复与科学记录、团队专业能力、未来计划。",
          "每页都要给出配图说明和设计指导。比如过渡页用深色背景和金色纹样，案例页用全幅图加暗色遮罩，流程页用横向五步流程，团队能力页用 2×2 四象限。"
        ],
      },
      {
        heading: "可复制提示词",
        paragraphs: [
          "PPT 课的提示词分成大纲、逐页拆解和生成后检查三步。"
        ],
        codeBlocks: [
          "我明天要开会介绍唐代壁画研究与保护工作，请帮我生成一套可编辑 PPT。主题要有盛唐气象，内容分成科普篇和工作篇。请先给我大纲，不要直接生成最终文件。",
          "请把每一页拆成三部分：实际显示在幻灯片上的文字、配图说明、设计指导。显示文字要精简，配图说明用于搜索或生成图片，设计指导要写清楚布局、字号、颜色和图片位置。",
          "根据我提供的图片和资料生成 PPT。生成后请检查每页文字是否过多、图片是否遮挡文字、标题层级是否统一、过渡页和内容页是否有视觉节奏。"
        ],
      },
    ],
  },
  {
    slug: "video-workbuddy-lesson1-excel-automation",
    title: "视频教程笔记 · 第 1 课：用 Excel 案例学会 AI 自动化办公",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-07-16",
    excerpt: "用公司排班 Excel 案例入门 WorkBuddy，让 AI 先理解表格，再输出可核对的办公结果。",
    tags: ["视频教程", "WorkBuddy", "课件", "提示词", "Excel", "AI 办公"],
    productSlugs: [],
    videoUrl: workBuddyVideoUrls.lesson1,
    videoMeta: "B 站：WorkBuddy 第 1 课",
    body: [
      `视频入口：${workBuddyVideoUrls.lesson1}`,
      "这一课适合作为 WorkBuddy 入门：不要一上来追求复杂自动化，而是用一个公司排班 Excel 案例，让 AI 先读懂文件、识别表结构、说明规则，再逐步生成结果。",
      "课件 PPT 本身主要是图片页，公开笔记按视频和案例文件整理：案例文件为“公司排班管理系统.xlsx”，目标是训练观众把 Excel 任务说清楚，让 WorkBuddy 在可检查的步骤里完成办公自动化。"
    ],
    sections: [
      {
        heading: "课件整理",
        paragraphs: [
          "第一步不要直接要求 AI 改表。先让 WorkBuddy 查看 Excel 文件中有哪些工作表、每张表大概记录什么、关键字段是什么。",
          "第二步让它解释当前排班或统计逻辑：哪些列是人员、日期、班次、状态、备注；哪些数据可能缺失或格式不统一。",
          "第三步才进入自动化处理：生成排班汇总、发现异常、整理统计结果，或者按你指定的格式输出新表。",
          "最后一定要核对结果：抽查几行原始数据与输出是否一致，检查日期范围、人员数量、班次合计和异常标记。"
        ],
      },
      {
        heading: "可复制提示词",
        paragraphs: [
          "Excel 入门课的提示词先读表、再规划、最后生成可核对结果。"
        ],
        codeBlocks: [
          "请先查看这个 Excel 文件里有哪些工作表，每个工作表的用途是什么。不要修改文件，先用中文说明你看到了哪些字段、哪些数据关系、哪些地方可能影响后续处理。",
          "请根据当前表格结构，说明这个排班表可以自动化完成哪些办公任务，例如人员班次统计、异常检查、缺勤记录、按日期汇总、按人员汇总。先不要生成结果，先列出处理计划。",
          "请按照处理计划生成一个可核对的汇总结果，并说明每一列来自哪里、计算逻辑是什么。如果发现缺失、重复或格式不一致，请单独列出异常清单，不要自行猜测。"
        ],
      },
    ],
  },
  {
    slug: "video-workbuddy-lesson8-study-planning",
    title: "第8集｜WorkBuddy＋AI工作流：分析高考志愿与留学选校，生成个人升学规划 ｜AI自动化办公",
    category: "视频教程笔记", diaryKind: "video", date: "2026-07-24",
    excerpt: "用数据、升学规则和学生档案搭建可核验的升学规划工作区，而不是向 AI 索要“保证录取”。",
    tags: ["视频教程", "WorkBuddy", "AI 工作流", "升学规划"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV1LVgt6eEJw/",
    videoMeta: "B 站：第 8 集｜WorkBuddy＋AI工作流",
    body: ["本课的目标是让 AI 帮助整理和比较信息，而不是替学生、家长或官方报考系统作决定。工作区至少要有三类资料：学校与专业数据、择校方法规则、学生基本情况。"],
    sections: [{ heading: "核心思路与步骤", paragraphs: ["先建立自己的资料库和文件夹：数据、规则、学生档案分别保存。这样可以减少 AI 幻觉，也让每个建议都能追溯。课件把这一点概括为：以前用别人的软件是在“打工”，现在要为自己建立资料和规则，成为能调用 AI 的“甲方”。", "资料库可从国内院校与专业数据、世界大学资料等公开数据开始；数据不足时可以补充，但必须写明来源和更新时间。课件提到可用 GitHub 的 Hipo/university-domains-list 等公开数据作为世界大学资料的起点，不能把它替代各校当年官方招生信息。", "再明确三条路径：国内本科、港澳/中外合作、海外本科/预科；每条路径都按适配原因、主要风险、官方核验入口输出。国内路径核验省级考试院计划、学校招生章程、选科要求、历年位次和规则；港澳/中外合作核验招生路径、学费奖学金、英语要求和学历衔接；海外路径核验学校申请系统、总成本、语言/材料、签证与升学路径。", "课件中的课堂虚构档案包含省份、年份、选科、分数与位次区间、英语水平、预算、兴趣专业、地域偏好、不可接受条件和期望输出。真正使用时要先补全这些字段；没有官网、招生章程、当年计划或语言要求的结论，一律标记为“待核验”，不得使用“保证录取”“稳上”等表述。", "课程边界很明确：模拟分数仅作课堂演示，AI 只协助整理和比较；最终志愿填报、申请与付费咨询应以官方系统、学校书面要求和家庭人工决定为准。"], codeBlocks: ["课堂操作提示词｜根据 Word 课件的资料结构整理\n\n请读取当前工作区中的学校与专业数据、升学路径说明和学生需求档案。先列出资料来源、更新时间与缺失项。\n\n分别给出国内本科、港澳/中外合作、海外本科/预科的候选方向；每项写清：适配原因、预算与语言条件、主要风险、需要核验的官方入口，以及下一步应由学生或家长补充的信息。\n\n国内路径请核验省级考试院计划、学校招生章程、选科要求、历年位次和录取规则；港澳/中外合作请核验招生路径、学费奖学金、英语要求与学历衔接；海外路径请核验学校官方申请系统、总成本、语言/材料、签证与升学路径。\n\n不要使用“保证录取”“稳上”等表述；缺少当年官方资料时标记为“待核验”。不要替代官方报考系统或家庭的最终决定。"] }],
  },
  {
    slug: "video-workbuddy-lesson9-job-expert",
    title: "第9集｜WorkBuddy＋Word：用 AI 创建自己的求职专家 ｜AI自动化办公",
    category: "视频教程笔记", diaryKind: "video", date: "2026-07-25",
    excerpt: "把个人经历、公开职位信息、企业背景核验和人工确认投递组织成一个求职专家工作流。",
    tags: ["视频教程", "WorkBuddy", "求职", "AI 工作流"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV15cgh6gEeV/",
    videoMeta: "B 站：第 9 集｜WorkBuddy＋Word",
    body: ["这一课把“找工作”拆成专家、技能和连接器：专家负责综合判断，技能负责简历与岗位匹配、企业调研等可复用步骤，连接器负责访问公开信息或邮件工具。"],
    sections: [{ heading: "核心思路与提示词", paragraphs: ["先从虚拟简历草稿开始，生成可核对的个人档案；再只依据互联网公开信息搜索职位、调查企业背景和公开舆情。", "投递是单独阶段：先列出拟投递岗位、公司、理由和收件方式，取得人工确认后才可发送。不要把 AI 推荐当作就业承诺，也不要自动投递未经本人确认的简历。"], codeBlocks: ["expert-manager 帮我创建一个工作寻找专家，擅长帮我根据互联网公开信息寻找适合我的工作。我的经验是：[我们可以在互联网公开寻找适合对方的工作机会，然后调查企业背景情况工资福利情况，甚至可以去社交媒体寻找招聘机会和寻找这家公司的公开舆情，如果有拖欠工资等违法问题的公司就不要考虑]。我们的一般性流程就是根据用户的基本情况捏一个简历，然后根据上述调查，最后通过邮箱投递简历，也可以推荐用户通过对应的方式投递。", "切换到我们定制的找工作专家。\n帮我找一份适合我的工作。\n虚拟简历草稿_案例.docx", "我们确定帮我们找的工作没问题，就可以批量发送邮件。\n帮我投递简历到他们的公司。"] }],
  },
  {
    slug: "video-workbuddy-lesson10-meituan-coupons",
    title: "第10集｜WorkBuddy：AI自动领取美团优惠券，每天不用自己点",
    category: "视频教程笔记", diaryKind: "video", date: "2026-07-26",
    excerpt: "用一个极简案例理解可重复任务的触发、检查和人工兜底。",
    tags: ["视频教程", "WorkBuddy", "自动化", "日常任务"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV1F3ga6HErQ/",
    videoMeta: "B 站：第 10 集｜WorkBuddy",
    body: ["本课以每日领券为例，重点是理解重复任务要有明确入口、执行时间、完成检查和失败提醒。任何涉及账号、优惠、支付或领取结果的操作，都应保留人工复查。"],
    sections: [{ heading: "核心步骤", paragraphs: ["把任务描述写清：在哪个 App 或网页、什么时候执行、要领取什么、成功后如何判断。", "自动化只负责减少重复点击；登录态失效、验证码、活动规则变化或优惠内容异常时，应该停止并提示人工处理。"], codeBlocks: ["请帮我建立一个每日优惠券领取任务：先说明执行入口、领取条件、成功判断方式和失败时的处理方式。不要绕过验证码或平台限制；遇到需要登录、确认、支付或规则不明确时暂停并提醒我。"] }],
  },
  {
    slug: "video-workbuddy-lesson11-procurement-analysis",
    title: "第11集｜WorkBuddy＋Excel：让 AI 自动完成采购整理与采购分析｜AI自动化办公",
    category: "视频教程笔记", diaryKind: "video", date: "2026-07-27",
    excerpt: "从采购清单开始，让采购助手把需求、比价和 Excel 输出拆成可复核步骤。",
    tags: ["视频教程", "WorkBuddy", "采购", "Excel"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV15Dgv6HExk/",
    videoMeta: "B 站：第 11 集｜WorkBuddy＋Excel",
    body: ["本课复习“专家＋技能＋连接器”：采购助手是拟人化的任务角色，采购整理与比价是技能，文件、表格或沟通渠道是连接器。"],
    sections: [{ heading: "核心步骤与提示词", paragraphs: ["课件先用极简指令建立采购助手，再把采购清单转成 Excel；专家负责综合任务，技能负责采购整理和表格转换，连接器负责文件、表格或沟通渠道。", "实际采购时再补齐品名、规格、数量、预算、到货时间、供应商限制和验收标准。价格、库存和供应商信息未经核验不能当成事实；最终下单、合同和付款仍需人工复核。"], codeBlocks: ["提示词 1｜课件原始提示词\n\n采购助手 帮我采购一批led灯", "提示词 2｜课件原始提示词\n\n帮我把采购清单变成excel"] }],
  },
  {
    slug: "video-workbuddy-lesson12-salary-workspace",
    title: "第12集｜WorkBuddy＋Excel：AI自动整理96张混乱工资表，生成企业薪酬分析报告 ｜AI自动化办公",
    category: "视频教程笔记", diaryKind: "video", date: "2026-07-28",
    excerpt: "从原始工资表文件夹出发，搭建规则、清洗中间层、分析输出与验证闭环。",
    tags: ["视频教程", "WorkBuddy", "Excel", "薪酬分析", "数据清洗"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV1En3J6DEt2/",
    videoMeta: "B 站：第 12 集｜WorkBuddy＋Excel",
    body: ["本课不是让 AI 直接算工资，而是先建立企业薪酬分析项目。原始工资表不修改；字段映射、标准工资数据库、异常报告等过程文件放在“数据处理中间层”；老板要看的结果放在“输出报告”。"],
    sections: [{ heading: "六步工作流", paragraphs: ["第一步搭工作区：创建 README、分析规则、工资字段说明、岗位字典、中间层和输出报告目录。根目录的“原始工资表”只读保留；数据处理中间层存放项目数据检查报告、工资字段映射表、标准工资数据库、清洗异常报告和 AI 处理日志；输出报告存放年度薪酬分析报告、岗位人数统计、部门人工成本分析、分析说明和最终验证报告。", "第二步扫描原始资料；第三步建立字段映射；第四步清洗并建立标准工资数据库；第五步生成岗位、工资组成和部门人工成本分析；第六步用总额、随机抽样和交叉验证审计结果。", "遇到字段不确定、金额为空、重复员工或总额不一致，必须记录异常，不能自行猜测。课件的知识复习点是“专家、技能、连接器”：专家定义分析角色与边界，技能承载可复用的数据处理步骤，连接器连接文件、表格或允许访问的系统。"], codeBlocks: ["提示词 1｜自动搭建企业薪酬分析工作区\n\n我给你一个企业资料文件夹。\n\n当前根目录只保留“原始工资表”文件夹，里面是各事业部的月度工资表。\n\n请不要立即分析工资，也不要生成统计结果。\n\n第一步，请根据这些资料，帮我建立一个适合长期维护的企业薪酬分析工作区。\n\n要求：\n1. 不修改原始工资表；\n2. 自动创建 README.md；\n3. 自动创建 分析规则.md；\n4. 自动创建 工资字段说明.md；\n5. 自动创建 岗位字典.xlsx；\n6. 自动创建 数据处理中间层 文件夹；\n7. 自动创建 输出报告 文件夹；\n8. 在 README 中说明每个文件夹的作用；\n9. 在 分析规则.md 中写清楚后续分析流程。\n\n完成以后停止，等待我的下一步指令。", "提示词 2｜扫描项目并生成数据检查报告\n\n你现在是一名企业数据分析师。\n\n请扫描当前项目中的“原始工资表”文件夹。\n\n你的任务不是立即计算结果。\n\n请输出以下内容：\n1. 当前发现了哪些部门文件夹；\n2. 每个部门有多少份工资表；\n3. 总共有多少份工资表；\n4. 每份工资表包含哪些字段；\n5. 哪些字段名称存在差异；\n6. 当前数据可能存在什么问题。\n\n请生成：\n数据处理中间层/项目数据检查报告.md\n\n不要进行最终统计。", "提示词 3｜建立工资字段映射表\n\n请根据所有工资表内容，建立统一的数据字段模型。\n\n目标：将不同事业部不同名称的工资字段转换成统一标准。\n\n例如：\n基本工资：基本工资、固定薪资、底薪、基本薪资\n统一为：基本工资\n\n绩效工资：绩效工资、绩效、绩效奖金\n统一为：绩效工资\n\n请完成：\n1. 分析所有字段；\n2. 创建 数据处理中间层/工资字段映射表.xlsx；\n3. 标记无法确认的字段；\n4. 对存在疑问的数据不要自行猜测。\n\n完成以后停止，等待下一步指令。", "提示词 4｜建立标准工资数据库\n\n现在开始进行数据清洗。\n\n请读取“原始工资表”文件夹中的全部 Excel。\n\n要求：\n1. 不修改任何原始 Excel；\n2. 根据工资字段映射表统一字段；\n3. 创建新的标准化工资数据库；\n4. 每条记录包含：部门、月份、员工姓名、岗位、基本工资、绩效工资、奖金、补贴、工资总额。\n\n如果发现缺少字段、格式异常、金额为空、重复员工、工资总额与组成项不一致，请记录到异常报告。\n\n输出：\n1. 数据处理中间层/标准工资数据库.xlsx\n2. 数据处理中间层/数据清洗异常报告.md\n3. 数据处理中间层/AI处理日志.md\n\n不要生成最终分析报告。", "提示词 5｜生成年度薪酬分析报告\n\n现在基于 数据处理中间层/标准工资数据库.xlsx 进行年度薪酬分析。\n\n请完成：\n\n一、岗位分析：每个岗位人数、年度工资总额、年平均工资。\n\n二、工资组成分析：基本工资总额、绩效工资总额、奖金总额、补贴总额。\n\n三、部门人工成本分析：每个事业部年度人工成本、人员数量、平均工资。\n\n四、输出报告文件：\n1. 输出报告/年度薪酬分析报告.xlsx\n2. 输出报告/岗位人数统计.xlsx\n3. 输出报告/部门人工成本分析.xlsx\n4. 输出报告/分析说明.md", "提示词 6｜让AI作为数据审计人员检查结果\n\n现在不要继续分析。\n\n请作为数据审计人员，对刚才生成的结果进行验证。\n\n验证方法：\n\n第一：工资总额验证。检查所有原始工资表金额总和，是否等于标准工资数据库工资总额，是否等于年度薪酬分析报告工资总额。\n\n第二：随机抽查10名员工。对比原始工资表、标准工资数据库、分析结果三者是否一致。\n\n第三：交叉验证。检查部门工资总额是否等于岗位工资总额汇总。\n\n输出：\n输出报告/年度薪酬分析验证报告.md\n\n如果发现错误，请指出具体文件、具体员工或具体字段，并说明可能原因。"] }],
  },
  {
    slug: "video-workbuddy-lesson14-excel-basics",
    title: "第14集｜WorkBuddy＋Excel：8分钟极简入门，小白少走弯路｜AI自动化办公",
    category: "视频教程笔记", diaryKind: "video", date: "2026-07-30",
    excerpt: "不再死记硬背 Excel 函数；理解表格结构、业务目标与核对方法，让 WorkBuddy 协助完成工作。",
    tags: ["视频教程", "WorkBuddy", "Excel", "入门"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV1XA3x6xEEs/",
    videoMeta: "B 站：第 14 集｜WorkBuddy＋Excel",
    body: ["这是一节给纯小白的 Excel＋WorkBuddy 入门课。课件的重点不是让人背公式字典，而是把时间从重复操作里拿回来：理解数据、明确任务、让 AI 辅助执行，并保留必要的核对能力。"],
    sections: [{ heading: "核心思路与操作顺序", paragraphs: ["Excel 函数不必靠死记硬背，但仍要知道数据来自哪里、结果该如何理解。身体忙着点表格，不代表思想真的提升；AI 把学习重点从“记操作”转向“理解目标和判断结果”。", "先让 WorkBuddy 读取表格、说明工作表和字段含义；再用业务语言说明想解决的问题；最后让它给出处理方案和结果，并用抽样数据复查。", "适合从汇总、筛选、异常检查、字段解释等低风险任务开始。涉及金额、工资、报表报送时，结果必须由人复核。"], codeBlocks: ["请先读取这个 Excel 文件，不要修改。用中文说明每个工作表、关键字段和可能的数据问题；再告诉我可以用 WorkBuddy 自动完成哪些步骤。", "我的目标是【在这里写业务目标】。请先给出处理计划、需要确认的规则和最终输出格式；得到我确认后再生成结果，并标明每个结果的来源和计算逻辑。"] }],
  },
  {
    slug: "video-workbuddy-lesson15-workflow-dashboard",
    title: "第15集｜WorkBuddy＋工作流：用文件夹和网页工作台管理任务｜AI自动化办公",
    category: "视频教程笔记", diaryKind: "video", date: "2026-07-31",
    excerpt: "用编号文件夹、流程说明和网页工作台，让重复行政工作可视、可跟踪、可复用。",
    tags: ["视频教程", "WorkBuddy", "工作流", "行政办公"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV1VY3h63Ecx/",
    videoMeta: "B 站：第 15 集｜WorkBuddy＋工作流",
    body: ["这节课不追求把所有电脑操作自动化，而是先建立工作流程可视化：材料在哪里、事项到哪一步、下一步做什么、哪些任务快到期，都能一眼看清。WorkBuddy 负责整理、检查、汇总和生成草稿。"],
    sections: [{ heading: "核心思路与步骤", paragraphs: ["文件夹就是业务阶段，移动文件就是更新进度，流程说明文件就是岗位规则，网页工作台就是可视化看板。先把岗位工作装进统一工作区，再考虑沉淀为固定的岗位专家和技能。", "案例工作区包含流程说明、网页工作台、01_新收材料、02_待制证、03_待受理办结、04_双公示待报送、05_待整理归档、06_已完成归档、07_模板与规则、08_周报与输出。", "课件的原始岗位案例包括线上制证、每周“双公示”信息报送、纸质档案归档、平台受理办结和工作周报；其去敏后的补充版本还明确了多人表格合并、报送资料留档、阶段性字段提取、异常/延期标记以及周报应列出新增、完成、待处理、数据报送、归档、异常和下周安排。", "课堂按六步演示：看原始问题、打开编号文件夹、查看业务记录、模拟流转、打开网页工作台、让 WorkBuddy 统计临期任务并生成周报草稿。正式系统中的受理、办结和提交仍需人工复核，真实姓名、证件号、联系方式和平台账号不能由 AI 擅自补全或外传。"], codeBlocks: ["请读取当前工作区的文件夹结构、根目录《流程说明.md》以及各业务事项记录：\n1. 统计每个阶段的业务数量；\n2. 按截止日期找出最需要优先处理的事项；\n3. 检查业务是否缺少关键字段；\n4. 列出当前阶段、业务编号、单位名称、截止日期和下一步动作；\n5. 根据现有数据生成一份本周工作周报草稿，包含新增、完成、待处理、报送、归档、异常/延期与下周安排；\n6. 不修改原始文件，不补全、展示或外传任何真实敏感信息。"] }],
  },
  {
    slug: "video-workbuddy-lesson16-inventory-dashboard",
    title: "第16集｜WorkBuddy＋Excel：做一个每周自动更新的销售库存看板｜AI自动化办公",
    category: "视频教程笔记", diaryKind: "video", date: "2026-08-02",
    excerpt: "从一份虚构的女装门店原始数据开始，搭建可筛选、可追加历史周次、可复核的销售库存周报看板。",
    tags: ["视频教程", "WorkBuddy", "Excel", "销售分析", "库存分析", "数据可视化"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV1ht3m6UEMV/",
    videoMeta: "B 站：第 16 集｜WorkBuddy＋Excel",
    body: ["第 16 集不直接交付一个做好的看板，而是只从《门店本周销售库存原始数据.xlsx》开始，让 WorkBuddy 逐步完成检查、建模、公式、可视化和每周更新机制。", "案例对应线下女装商品运营专员：每周看总盘、大区和门店的目标完成率、售罄率、动销率、毛利率、折扣、件单价、客单价，以及品类、色系、尺码和库存结构。历史周次只能追加，不能覆盖。"],
    sections: [{ heading: "从原始数据到长期看板", paragraphs: ["工作簿分为 01_原始数据、02_参数与字典、03_指标汇总、04_可视化看板、05_门店对比和 06_使用说明。所有指标由公式驱动，周次、大区和门店通过下拉框筛选。", "核心口径必须先写清：目标完成率=销售额÷销售目标；售罄率=销售件数÷（期初库存＋到货）；动销率=有销量 SKU 数÷可售 SKU 数；毛利率=（销售额－销售成本）÷销售额；折扣=销售额÷吊牌价销售额；件单价=销售额÷销售件数；客单价=销售额÷成交单数。除法必须处理分母，不能出现 #DIV/0!。", "课件安排七步：检查原始字段与逻辑异常；创建工作簿和字典；搭建可筛选汇总页；制作 KPI 与图表；加入门店对比和异常识别；设计每周追加和历史保留；最后扫描公式错误并抽样复核。以下保留 Word 课件中的七个完整提示词。"], codeBlocks: [...workbuddyLesson16Prompts] }],
  },
  {
    slug: "video-workbuddy-lesson17-xcode-agents",
    title: "第17集｜Xcode 26.6打通Codex与Claude Code：AI开发iOS更方便了",
    category: "视频教程笔记", diaryKind: "video", date: "2026-08-03",
    excerpt: "实测 Xcode 26.6 如何让 Codex、Claude Code 等第三方 AI Agent 获取项目上下文并协作完成编译与测试。",
    tags: ["视频", "Xcode", "Codex", "Claude Code", "MCP", "iOS 开发"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV1Dk3d63E1r/",
    videoMeta: "B 站：第 17 集｜Xcode 26.6",
    body: ["这一集是 AI 开发资讯与真实体验，不是 WorkBuddy Word 课件课，因此没有可按 Word 核对的提示词。内容聚焦 Xcode 26.6 对第三方 AI Agent 的连接能力。", "视频演示智能体与权限设置、连接 ChatGPT/Codex/Claude Code、读取当前项目上下文、调用 Xcode 编译与自动化测试，以及 Xcode MCP 与传统命令行工作方式的差异。"],
    sections: [{ heading: "值得关注的变化", paragraphs: ["过去更多是 Codex 单方面读取项目并调用命令；更新后 Xcode 开始提供面向第三方 Agent 的协作入口，开发者可以减少在 IDE、终端和 AI 工具之间切换的成本。", "实际使用时仍应检查授权范围、编译结果和测试结果。AI 能够调用工具，不等于它自动理解了项目边界。"], codeBlocks: ["本集没有 Word 课件提示词；请在自己的 Xcode 项目中先确认第三方 Agent 权限，再让 AI 读取项目、提出变更计划，并在每次编译和测试后报告结果。"] }],
  },
  {
    slug: "video-workbuddy-lesson18-hy3-model",
    title: "第18集｜WorkBuddy重大消息：Hy3模型限时免费到8月底，AI办公学习最佳时机",
    category: "视频教程笔记", diaryKind: "video", date: "2026-08-04",
    excerpt: "了解 WorkBuddy 的模型选择、额度规则与 Hy3 限时免费活动，把低成本窗口用于真实办公练习。",
    tags: ["视频", "WorkBuddy", "Hy3", "AI 模型", "AI 办公"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV1ypuP65Ev5/",
    videoMeta: "B 站：第 18 集｜WorkBuddy 模型资讯",
    body: ["这一集是 WorkBuddy 模型资讯，不是具体案例课，也没有独立 Word 课件。视频介绍 Hy3 模型在 8 月 31 日前的限时免费体验，以及不同模型的选择和额度消耗逻辑。", "学习重点不是追逐一个模型名称，而是理解什么任务需要强推理、什么任务可以用更轻量的模型，以及如何把免费窗口用于文档、Excel、PPT、代码和工作流练习。"],
    sections: [{ heading: "模型选择方法", paragraphs: ["先看任务复杂度、上下文长度、是否需要工具调用和结果风险，再决定模型。简单整理、草稿和分类不必一开始就使用最强模型；涉及复杂推理、代码或关键业务结果时，再提高模型能力。", "活动与额度规则会变化，使用前要以 WorkBuddy 当前页面为准；不要把历史免费政策当作长期承诺。"], codeBlocks: ["本集没有 Word 课件提示词；请先描述任务目标、输入资料、风险和验收标准，再选择合适的 WorkBuddy 模型，并在执行后检查额度与结果。"] }],
  },
  {
    slug: "video-workbuddy-lesson19-agentlimb-forum-posting",
    title: "第19集｜WorkBuddy＋AgentLimb：让AI自动发论坛帖子 ｜AI自动化办公",
    category: "视频教程笔记", diaryKind: "video", date: "2026-08-06",
    excerpt: "用 AgentLimb 操作浏览器并把成功的网页操作保存为可复用的肌肉记忆，理解浏览器自动化的边界。",
    tags: ["视频教程", "WorkBuddy", "AgentLimb", "浏览器自动化", "肌肉记忆"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV1zyuJ6jE4Q/",
    videoMeta: "B 站：第 19 集｜WorkBuddy＋AgentLimb",
    body: ["第 19 集讲 MCP 浏览器操作和 AgentLimb 的肌肉记忆：让 AI 在浏览器中完成一次明确任务，成功后保存稳定的操作经验，下一次可以直接复用。", "论坛发帖只是演示场景。同样的方法可以延伸到公众号发文、视频后台填写、网页信息采集等，但涉及公开发布时必须保留内容审核、账号权限和人工确认。"],
    sections: [{ heading: "两个课件提示词", paragraphs: ["第一个提示词描述完整任务：打开百度贴吧、选择一个合适的贴吧、发布合适内容，成功后保存为肌肉。第二个提示词直接调用已经保存的肌肉记忆。", "以下按 Word 课件原文保留，不代表可以绕过平台规则或自动发布未经审核的内容。"], codeBlocks: ["提示词 1\n你使用AgentLimb操作我们的浏览器，打开百度贴吧随机在一个贴吧发一个合适的随机内容，内容发送完成后，如果成功，保存成肌肉，方便我们下次快速发帖", "提示词 2\n使用agentlimb 的肌肉记忆 在百度贴吧发帖子"] }],
  },
  {
    slug: "video-workbuddy-lesson20-expense-reimbursement-skill",
    title: "第20集｜WorkBuddy＋word：ai自动核对报销表生成固定skills",
    category: "视频教程笔记", diaryKind: "video", date: "2026-08-07",
    excerpt: "让 WorkBuddy 读取 Word 中的截图和表格，核对报销金额，并把流程沉淀为可复用 Skill。",
    tags: ["视频教程", "WorkBuddy", "Word", "报销核对", "Skill"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV1QnuH66Efc/",
    videoMeta: "B 站：第 20 集｜WorkBuddy＋Word",
    body: ["这一课的能力边界很清楚：AI 可以读取 Word 文档里的图片、截图和表格，按规则做金额核对，并把稳定流程生成 Skill；它不是替财务人员做最终审批。", "先核对单张报销表，再把过程固化为 Skill，最后批量核查文件夹内 8 月所有人的报销单。异常要返回原因，一致才标记为通过。"],
    sections: [{ heading: "完整课件提示词", paragraphs: ["提示词 1 是单张报销表核对；提示词 2 把本次过程生成 Skill；提示词 3 调用 Skill 批量核查。以下不压缩原始提示词。"], codeBlocks: ["提示词 1\n报销表.docx 这是一张报销表，你是核对人员，报销表一般由截图和表格组成，你主要核对截图金额加起来的总金额和表格的总金额是否一致，如果出现错误和不一致请返回错误原因如果一致就是通过", "提示词 2\n我们吧这次过程生成核对报销skill方便以后复用", "提示词 3\n我们使用核对报销skill，核查文件夹内8月的所有人的报销单"] }],
  },
  {
    slug: "video-workbuddy-lesson21-visual-illustration-skill",
    title: "第21集｜WorkBuddy＋PPT：我做了一个专门解决AI配图丑的 Skill ｜AI自动化办公",
    category: "视频教程笔记", diaryKind: "video", date: "2026-08-08",
    excerpt: "把“配图不好看”拆成信息密度、构图、取色、线条、纹理和禁止项，再固化成可批量复用的视觉 Skill。",
    tags: ["视频教程", "WorkBuddy", "PPT", "视觉设计", "Skill", "AI 配图"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV1kguN6VExa/",
    videoMeta: "B 站：第 21 集｜WorkBuddy＋PPT",
    downloadableResources: [{
      title: "第21集｜视觉抽象插画 Skill",
      titleEn: "Lesson 21 · Visual illustration Skill",
      description: "完整原始 SKILL.md，可保存到 WorkBuddy 的 skills 目录或作为学习参考。",
      descriptionEn: "The complete original SKILL.md. Save it to a WorkBuddy skills folder or use it as a reference.",
      fileName: "workbuddy-lesson21-photo-to-modern-oriental-abstraction.md",
      content: workbuddyLesson21Skill,
    }],
    body: ["第 21 集解决的是 PPT 和 WorkBuddy 配图“能看但不好看”的问题。关键不是继续堆风格词，而是先从艺术参考中拆出可执行的视觉变量。", "课程经历三轮调试：水墨味过重、海报感太强，最后稳定为当代编辑插画、手绘速写、东方留白和现代主义减法的组合。最终 Skill 保留主体关系和原图取色，但删除 90% 以上无关细节。"],
    sections: [{ heading: "把审美写成规则", paragraphs: ["六个旋钮是信息密度、构图、颜色、线条、纹理和禁止项。最终配方要求保留 2–4 个核心形状、3–5 个低饱和色、65%–80% 留白，主体约占 35%–50%，并明确禁止写实、3D、厚重水墨、复杂背景和碰边。", "每一轮只改 1–3 个变量，才能知道哪条规则真正有效。以下保留 Word 课件中的三组原始提示词/Skill。"], codeBlocks: [...workbuddyLesson21Prompts] }],
  },
  {
    slug: "video-workbuddy-lesson22-wechat-manager",
    title: "第22集｜WorkBuddy＋微信=王炸组合：公司群消息自动汇总＋客户信息自动管理｜AI自动化办公",
    category: "视频教程笔记", diaryKind: "video", date: "2026-08-08",
    excerpt: "把本机微信聊天变成 WorkBuddy 可搜索、可总结、可导出的工作信息库，并用只读边界管理客户和群消息。",
    tags: ["视频教程", "WorkBuddy", "微信", "客户管理", "聊天汇总", "AI 工作流"], productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV1xcu563E3H/",
    videoMeta: "B 站：第 22 集｜WorkBuddy＋微信",
    downloadableResources: [{
      title: "第22集｜Windows + macOS 自动识别合并版 wechat-manager 提示词",
      titleEn: "Lesson 22 · Windows + macOS auto-detect wechat-manager prompt",
      description: "一份提示词自动识别 Windows / macOS，并选择对应的本地只读微信读取路线；Windows 已跑通，macOS 按历史配置与微信版本分情况处理。",
      descriptionEn: "One prompt detects Windows or macOS and selects the matching local read-only route. Windows is validated; macOS follows version- and existing-configuration-specific paths.",
      fileName: "第22集-微信管理-Windows_macOS自动识别合并版提示词.md",
      content: workbuddyLesson22UnifiedPrompt,
    }],
    body: ["第 22 集把 WorkBuddy 和本机微信聊天记录连接起来：从最近会话、未读消息和增量消息开始，进一步搜索关键词、读取历史、总结群聊、整理客户进度，并导出本地资料。", "现在页面只保留一份“Windows + macOS 自动识别合并版”提示词。交给 WorkBuddy 后，它会先判断当前电脑系统与现有可用配置，再选择对应的本地只读路线；不要手动把 Windows 和 macOS 的底层步骤混用。"],
    sections: [
      {
        heading: "开始前｜第三方开源方案与风险提示",
        paragraphs: ["本课件使用第三方开源方案，不是腾讯或微信官方提供的功能。对本机微信数据或运行中的微信进程进行读取、分析或导出，可能触发账号异常、限制使用，甚至微信账号被禁用等风险；平台规则、客户端实现和工具状态也可能随时变化。", "本材料仅供学习和教学使用。请只在自己的电脑、自己的测试账号和最小范围数据中验证，并自行决定是否继续使用。因使用本课件或提示词造成的账号、数据、业务、隐私或其他损失，课程与网站不承担责任。不要上传、分享或粘贴微信数据库、密钥、masterkey、快照、账号密码或完整聊天记录。"],
      },
      {
        heading: "如何使用这份课件",
        paragraphs: ["页面底部提供一份 Windows + macOS 自动识别合并版 Markdown 提示词。下载后交给 WorkBuddy 或其他 AI 工具执行；它会先识别系统、微信版本、登录状态、实际 Skills 根目录，以及是否已有可用的本地读取工具，再按平台选择路线。开始前请完整阅读其中的只读、隐私、批量消息和失败停止规则。", "建议按“检查环境 → 复用已有可用配置或完成首次安装验证 → 生成或读取本地快照 → 验证真实会话或指定群 → 再启用搜索、总结和导出”的顺序进行。任何一步失败，都不要跳过检查反复初始化、泄露密钥，或改用未验证的工具绕过。"],
      },
      {
        heading: "Windows 用户特别说明",
        paragraphs: ["Windows 路线已经在 Windows 10、微信 4.1.10.27 上实际验收：通过只读的 Config.Cipher 扫描、HMAC 验证与本地解密快照读取指定群消息，无需降级微信、debugger、DLL 注入或 Hook。合并版会在识别到 Windows 后优先使用这条课程实测路线。", "该实测结果只覆盖文档注明的测试环境，不代表所有 Windows 或未来微信版本都可用。请保持微信已登录，在自己的测试环境严格按照文件中的 `doctor → groups → history → search` 验收；只有真实会话或群能读到消息和搜索结果，才算部署成功。"],
      },
      {
        heading: "苹果电脑要按微信版本分情况处理",
        paragraphs: ["macOS 不是把 Windows 的底层取钥脚本直接复制过去。合并版会先检查是否已有可用的 `wechat-cli` 历史配置：有配置且真实查询能返回会话，就直接复用，不重新 init；没有历史配置或已失效时，才尝试一次原 `wechat-cli` 初始化。出现 `0 keys` 后必须停止旧路线，不能反复 init 或把它误判为 Skill 创建成功。", "新版 macOS 微信在用户明确同意高级兼容操作后，才会进入 `wcdb-key-tool` 的 macOS 分支；该分支可能涉及 Xcode Command Line Tools、重新登录、`sudo`、LLDB 或 WeChat.app 重签名，因此不会自动执行。网络、证书、DNS 或权限问题仍按一次性 npm 镜像/官方源回退和 macOS 完全磁盘访问排查；不要关闭 TLS 校验、长期用 `sudo npm install -g` 绕过权限，或从不明镜像、网盘和二进制包下载同名工具。"],
      },
    ],
  },
  {
    slug: "video-workbuddy-lesson23-web-export-dingtalk",
    title: "第23集｜WorkBuddy＋Excel＋钉钉：总公司网页数据自动导出＋定时推送工作群｜AI自动化办公",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-08-11",
    seriesOrder: 23,
    excerpt: "把网页导出、Excel 文件归档、钉钉群上传和定时执行拆成可验收的工作流，再沉淀为可复用 Skill。",
    tags: ["视频教程", "WorkBuddy", "Excel", "钉钉", "网页自动化", "定时任务", "Skill"],
    productSlugs: [],
    videoMeta: "本地课程视频已制作，B 站入口待补",
    downloadableResources: [{
      title: "第23集｜网页导出与钉钉推送提示词",
      titleEn: "Lesson 23 · Web export and DingTalk delivery prompts",
      description: "根据本地 Word 课件逐字整理的五段提示词：浏览器导出、固定脚本、钉钉上传、定时执行和 Skill 固化。",
      descriptionEn: "Five prompts transcribed from the local Word courseware: browser export, reusable script, DingTalk upload, scheduling, and Skill packaging.",
      fileName: "workbuddy-lesson23-web-export-dingtalk-prompts.md",
      content: workbuddyLesson23Prompts,
    }],
    body: [
      "第 23 集把一个总部岗位的重复工作拆开：每两小时从网页系统导出各工作站 Excel，再将最新文件推送到指定钉钉工作群。重点不是一次性把所有动作交给 AI，而是让下载位置、最新文件判断、推送目标、定时频率和失败停止点都有明确规则。",
      "本地课程目录中已有视频、字幕、Word 课件与五段原始提示词；但没有记录可核对的 B 站 BV 链接，页面因此只展示课程笔记与本地来源，不伪造公开视频入口。",
    ],
    sections: [
      {
        heading: "先把工作流拆成五个可验收环节",
        paragraphs: [
          "课件给出的顺序是：建立工作区域 → 浏览器控制导出网页数据 → 用 WorkBuddy 连接钉钉 → 上传最新 Excel → 设定每两小时的定时任务 → 将整个流程固定成可复用 Skill。每一步先在测试目录和测试群验证，再进入下一步。",
          "网页系统、账号登录状态、钉钉群权限与字段口径都属于实际环境条件。自动化前需先得到网站和群的授权；不要把生产账号、员工信息、客户数据或任何凭证放进提示词，也不要把“下载成功”误当成“已正确发送”。",
        ],
      },
      {
        heading: "Word 课件原始提示词",
        paragraphs: [
          "下面五段按本地 Word 课件原文与顺序保留。第 1 段使用百度页面作为浏览器控制演示；迁移到真实系统前，必须将网址、按钮、保存路径、群和定时频率改为已获授权且已核对的实际信息。",
        ],
        codeBlocks: [
          "AgentLimb 帮我在我的chrome浏览器上操作 www.baidu.com这个页面，然后点击其中的导出按钮，下载excel文件，最后放到我们的根目录的下载excel",
          "AgentLimb 我们这次不这个插件来操作浏览器导出，我们只使用workbuddy 去操作浏览器，最好生成一个网页操作脚本，每次都可以自动化使用这个脚本来下载excel，我们开始研究网页，生成固定脚本，脚本保存到我们的根目录",
          "帮我把根目录下的下载excel文件夹里面的，最新的下载的表格，上传到钉钉，工作站群",
          "帮我每个两个小时，定时从网页上导出表格，保存到指定文件夹，再从文件夹选择最新的表格，上传钉钉的指定的群",
          "帮我们把今天的整个流程变成一个叫做推送表格的skill，然后在根目录写一个readme，方便以后确定这个文件将是对应的那一个项目或者技能",
        ],
      },
      {
        heading: "定时和对外发送前的检查",
        paragraphs: [
          "第一次不要直接开启两小时循环。先手动运行一次：确认导出的文件确实来自目标页面、文件名和时间正确、最新文件选择规则没有误选旧文件、钉钉群也确实是目标群。任何一项无法验证时，停止自动化并保留错误记录。",
          "推送涉及外部系统和团队沟通，应设置人工确认、测试群或明确的失败提醒；不要让 AI 代替人处理敏感数据、删除旧文件、修改业务网页记录或对外承诺。Skill 只有在第二次独立运行也能通过验收后，才适合保存复用。",
        ],
      },
    ],
  },
  {
    slug: "video-workbuddy-lesson24-salary-data-boundaries",
    title: "第24集｜WorkBuddy＋Excel：工资数据怎么保证数据安全？数据与表格分离，输入即出结果｜AI自动化办公",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-08-12",
    seriesOrder: 24,
    excerpt: "用真实数据禁区、AI 可读脱敏模板和本地公式工作簿分层处理工资资料：AI 只参与表格设计，真实明细始终留在受控本机。",
    tags: ["视频教程", "WorkBuddy", "Excel", "工资数据", "数据安全", "脱敏", "本地工作流"],
    productSlugs: [],
    videoMeta: "本地课程视频已制作，B 站入口待补",
    body: [
      "第 24 集围绕“工资数据怎么保证安全”建立一条明确边界：真实工资原始表留在本地受控区域，AI 只接触字段结构、脱敏模板和需要什么汇总表的描述，结果由本地 Excel 公式工作簿计算并由人验收。",
      "本地目录同时保留了课程初始化说明、Word 课件、录制提纲、视频、脱敏样表和公式工作簿。B 站链接仍未记录，且课包中的提示词 2、3 为空，因此本站只公开 Word 课件已经写入的第 1 段提示词，不补写其余内容，也不生成猜测版下载文件。",
    ],
    sections: [
      {
        heading: "三层文件边界",
        paragraphs: [
          "第一层是 `01_加密数据_禁止上传_仅本地/`：真实工资原始表、员工信息和真实金额只由有权限的人在本机处理，禁止上传或交给 WorkBuddy/其他 AI 读取。第二层是 `02_AI可读数据_脱敏模板/`：只保留字段、列顺序、格式和虚构样例，用于讨论表格、公式和展示。第三层是 `03_公式工作簿_输入即出结果/`：第一张表输入，其他表在本地自动汇总与检查。",
          "“本地分层”并不等于绝对安全或企业合规。真实场景仍需要文件加密、系统权限、备份、访问审批，以及财务/人事人员对工资口径、个税、社保和异常行的人工确认。",
        ],
      },
      {
        heading: "Word 课件已写入的提示词 1",
        paragraphs: [
          "以下为本地 Word 课件的第 1 段原文。运行时只把脱敏模板交给 AI；真实工资文件不要出现在 AI 工作区、上传窗口或录屏画面中。",
        ],
        codeBlocks: [
          "02_AI可读数据_脱敏模板 根据脱敏模版我们开始设计一个工资数据展示展示，因为这个原始数据是脱敏的，所以我们设计的时候公式模版需要可以根据输入信息灵活统计。脱敏模版在后期我们替换真实信息后，其他的统计公司表格可以同步更新。",
        ],
      },
      {
        heading: "本地公式工作簿的验收",
        paragraphs: [
          "在 `01_输入数据` 中只录入允许在本机处理的数据，不修改黑色公式列；再查看公司汇总、部门汇总和数据检查。至少抽查人数、应发工资、实发工资、部门合计和异常行，确认部门总额能回到公司总额。",
          "公式工作簿通过基础检查，只能说明输入、公式与汇总关系没有明显冲突；它不是工资发放、税务或安全合规系统。涉及真实员工数据的任何导入、确认或对外使用，必须由负责人员完成。",
        ],
      },
    ],
  },
  {
    slug: "video-workbuddy-lesson25-wechat-order-workbench",
    title: "第25集｜WorkBuddy＋微信+工作台=绝了：3D打印公司微信客户订单管理进度工作台｜AI自动化",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-08-13",
    seriesOrder: 25,
    excerpt: "把经授权的微信客户沟通整理为订单、生产、回款和售后工作台；再把当天群消息沉淀为可复用的 AI 群日报流程。",
    tags: ["视频教程", "WorkBuddy", "微信", "客户管理", "订单管理", "工作台", "AI 工作流"],
    productSlugs: [],
    videoUrl: "https://www.bilibili.com/video/BV16TgE62ELQ/",
    videoMeta: "B 站：第 25 集｜WorkBuddy＋微信＋工作台",
    relatedArticleSlugs: ["video-workbuddy-lesson22-wechat-manager"],
    downloadableResources: [{
      title: "第22集关联资源｜Windows + macOS 自动识别合并版 wechat-manager 提示词",
      titleEn: "Related Lesson 22 · Windows + macOS auto-detect wechat-manager prompt",
      description: "第 25 集启动微信客户订单工作台前，先下载并完成第 22 集的本地只读微信读取验收；此处复用同一份原始 Markdown，不另造版本。",
      descriptionEn: "Before starting the Lesson 25 order workbench, download and validate the Lesson 22 local read-only WeChat workflow. This is the same source Markdown, not a rewritten variant.",
      fileName: "第22集-微信管理-Windows_macOS自动识别合并版提示词.md",
      content: workbuddyLesson22UnifiedPrompt,
    }],
    body: [
      "第 25 集把上一集的“聊天信息整理”继续推进到真实业务工作台：以 3D 打印公司为例，将已获授权的客户沟通整理为客户需求、合同与订单金额、生产进度、回款、历史交易、客户分级和售后等可核对信息。",
      "最终交付不是一份聊天摘要，而是能看见生产进度甘特图、本月成交金额、客户订单状态和售后情况的工作台。视频后半段还演示了把当天群消息整理为适合手机阅读的 AI 群日报长图，并将稳定流程保存为 Skill 以便复用。",
      "本地 Word 课件已写入两条可直接复制的原始提示词。微信读取与本地配置不在第 25 集重新发明：页面下载项直接复用第 22 集的 Windows + macOS 自动识别合并版提示词，底部也保留第 22 集课程链接。",
    ],
    sections: [
      {
        heading: "这节课解决的真实问题",
        paragraphs: [
          "客户需求、订单状态和售后进展散落在多段聊天中时，最大的风险不是“没有 AI”，而是信息无法回溯：订单金额、当前生产阶段、回款状态和负责人容易被遗漏。课程示例把这些业务事实整理到同一工作台，而不是让 AI 直接替业务做承诺或修改订单。",
          "工作台的价值在于把沟通转换成可查看、可追问、可人工复核的状态。3D 打印只是演示行业；设计工作室、律师客户管理等高度依赖沟通记录的场景，也应先定义自己的字段、状态和人工审核人，再考虑复用同一结构。",
        ],
      },
      {
        heading: "从聊天到工作台的学习顺序",
        paragraphs: [
          "先用脱敏测试资料确认哪些信息允许读取和整理，再明确每个字段的业务含义：客户需求、订单金额、生产阶段、回款、历史交易、客户分级、售后。字段不清楚时必须标记待确认，不能让 AI 从聊天语气或上下文自行补全。",
          "再把已确认信息呈现在进度、成交金额、订单状态和售后等视图中。每个数字与状态都应能回到原始授权资料核对；没有来源、金额不一致、订单主体不明确或生产节点冲突时，应进入异常清单而不是展示为确定结论。",
          "群日报是另一条独立流程：从当天群消息中提取重要提问、回答、典型表达和群公告，生成便于手机查看的摘要。它适合帮助回顾，不替代正式通知、客户确认或人工客服回复。",
        ],
      },
      {
        heading: "Word 课件原始提示词",
        paragraphs: [
          "提示词 1 的前提是：先在第 22 集完成自己电脑、自己账号、最小范围数据的本地只读验收。不要把它用于未授权聊天、正式生产环境或自动对外操作；字段没有来源时必须标记待确认。",
        ],
        codeBlocks: [
          "我们使用微信信息读取技能，开始根据标签中的最近沟通的3d打印客户，生成工作台，我需要订单管理，通过聊天记录来进行，确定需求，签订合同，订单金额，生产进度，客户回款，客户交易记录，客户基本信息，客户分级。工作台还可以有，生产进度甘特图，本月成交金额汇总，售后管理。这个工作台需要设计高科技感觉，适合生产制造企业的一目了然的界面设计表达。",
          "帮我总结今天湖森堡hooosberg Ai学习群里面内容总结，然后生成简报网页，生成长海报设计感强烈，导出到根目录图片格式jpg，适合手机观看的的比例，里面有今天群的内容总结，经典语录，等关键信息，比如提问 解答等群主的公告什么的也就会自动摘取关键信息呈现，然后我们把整个流程保存成技能，我们方便以后一句话总结湖森堡日报",
        ],
      },
      {
        heading: "第22集是本课的前置资源",
        paragraphs: [
          "第 25 集只负责把已授权、可读取的聊天信息组织成订单工作台和群日报；本地微信读取、系统识别、只读边界与真实会话验证沿用第 22 集。页面底部的关联课程可回到第 22 集查看完整风险说明与操作顺序。",
          "下载项也使用第 22 集同一份 Windows + macOS 自动识别合并版 Markdown。不要把 Windows 与 macOS 的底层步骤混用；若真实会话、群历史或搜索不能返回结果，就停止，不要把“安装完成”误当成功。",
        ],
      },
      {
        heading: "数据安全与人工验收",
        paragraphs: [
          "仅处理自己拥有或已取得明确授权的数据，并从最小范围、脱敏测试资料开始。不要把完整聊天记录、客户隐私、账号凭证或未授权群消息上传、分享或交给不受控的第三方服务。",
          "验收至少包括：字段是否来自允许使用的资料；订单金额、生产进度和回款是否能回到原始记录核对；异常是否被清楚标注；群日报是否误删关键限制条件。对外报价、订单确认、催款、售后承诺和任何正式业务动作，必须由有权限的人最终确认。",
        ],
      },
      {
        heading: "如何使用这篇教程笔记",
        paragraphs: [
          "先打开页面顶部的视频入口，第一次观看只确认业务问题、资料来源、字段与验收人；第二次再在自己的脱敏测试工作区复现。不要把演示行业、客户名称、金额或业务规则直接套进真实公司。",
          "学习顺序是“第 22 集完成本地只读验收 → 第 25 集提示词 1 组织订单工作台 → 提示词 2 生成群日报 → 用第二组资料复测并人工验收”。学习重点仍是“授权资料 → 结构化字段 → 可追溯工作台 → 异常标记 → 人工确认”的闭环。",
        ],
      },
    ],
  },
  {
    slug: "video-workbuddy-lesson26-bilibili-skill",
    title: "第26集｜WorkBuddy＋AgentLimb：B站视频怎么自动发布？流程做成Skill，第二次5分钟完成｜AI自动化办公",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-08-18",
    seriesOrder: 26,
    excerpt: "把一次成功的网页投稿操作沉淀为 Skill 和操作记忆；第二次执行前仍需逐项人工确认。",
    tags: ["视频教程", "WorkBuddy", "AgentLimb", "Skill", "浏览器自动化", "B站"],
    productSlugs: [],
    videoUrl: "https://space.bilibili.com/3546822886820332/lists/8625038?type=season",
    videoMeta: "B 站：WorkBuddy 入门绿皮书合集",
    downloadableResources: [{
      title: "第26集｜哔哩哔哩 B 站上传流程",
      description: "课程原始 Markdown：投稿页、上传、标题、标签、合集、封面、声明、定时和最终提交的核对流程。",
      fileName: "第26集-哔哩哔哩B站上传流程.md",
      url: "/downloads/workbuddy/第26集-哔哩哔哩B站上传流程.md",
    }],
    body: [
      "这一课的重点不是让 AI 自动点击，而是把第一次已经跑通的网页操作沉淀成 Skill 和操作记忆。以后面对同类型投稿，不需要每次从零探索页面、字段和检查点。",
      "案例演示从已准备好的视频、标题、简介、标签和封面开始，依次完成上传、加入合集、创作声明、封面设置、定时发布和最终投稿。网页会变化，账号状态也会变化，所以流程可以复用，提交决定不能外包。",
    ],
    sections: [{
      heading: "先跑通，再复用",
      paragraphs: [
        "第一次执行的价值在于发现实际页面里的字段、限制和验证方式；第二次才把已经确认的路径变成 Skill。任何登录状态、作品归属、标题、简介、标签、合集、封面、创作声明和发布时间都应在提交前由账号所有者读回确认。",
        "本课下载项保留原始流程 Markdown。它记录的是当时页面的验证经验，不是永久不变的 B 站规则；遇到界面、限制或账号状态不一致时，应停在当前步骤重新检查。",
      ],
    }],
  },
  {
    slug: "video-workbuddy-lesson27-mobile-remote",
    title: "第27集｜WorkBuddy＋手机：出门也能远程控制电脑，监控任务＋调取文件｜AI自动化办公",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-08-19",
    seriesOrder: 27,
    excerpt: "理解手机端与正在运行的电脑端如何协作：手机负责查看、确认和下达任务，电脑负责在本地完成工作。",
    tags: ["视频教程", "WorkBuddy", "远程办公", "手机控制电脑", "AI Agent"],
    productSlugs: [],
    videoUrl: "https://space.bilibili.com/3546822886820332/lists/8625038?type=season",
    videoMeta: "B 站：WorkBuddy 入门绿皮书合集",
    body: [
      "这节课区分了 WorkBuddy 手机端和电脑端的角色：手机不只是聊天窗口，而是查看任务、继续确认和安排电脑工作的遥控入口；真正读取本地文件和执行长任务的仍是保持在线的电脑。",
      "演示覆盖手机连接电脑端、查看长任务进度、让电脑新建文件、从手机下达文件处理任务，以及比较云端模式与“连接电脑”模式。",
    ],
    sections: [{ heading: "使用边界", paragraphs: ["远程能力不等于可以跳过确认。涉及发送邮件、分享文件、微信发送或访问敏感资料时，应先缩小资料范围、明确接收方并在实际动作前人工确认。", "出门前先在自己的测试文件和测试账号上验证电脑在线、任务可见、文件权限和结果回传；不要把“手机能看到任务”当成“所有本地资料都允许远程处理”。"] }],
  },
  {
    slug: "video-workbuddy-lesson28-custom-model",
    title: "第28集｜WorkBuddy＋DeepSeek：免费领100万Token，腾讯云API接入自定义模型｜AI自动化办公",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-08-20",
    seriesOrder: 28,
    excerpt: "从 Token、API Key、接口地址和模型 ID 开始，完成一次自定义模型联通测试。",
    tags: ["视频教程", "WorkBuddy", "DeepSeek", "腾讯云", "API", "自定义模型"],
    productSlugs: [],
    videoUrl: "https://space.bilibili.com/3546822886820332/lists/8625038?type=season",
    videoMeta: "B 站：WorkBuddy 入门绿皮书合集",
    body: ["这一课从一个实际问题出发：当内置积分不够用时，如何理解第三方模型、Token 和 API 接入。", "课程演示领取体验额度、创建 API Key、找到正确的接口地址和模型 ID，再进入 WorkBuddy 配置自定义模型并进行一次联通测试。"],
    sections: [{ heading: "先理解四个概念", paragraphs: ["接口地址是请求发送到哪里；API Key 是访问凭证；模型名称和模型 ID 是服务端识别的模型标识；兼容接口决定工具能否按约定通信。不要在截图、录屏、笔记或公开文件中展示真实 Key。", "免费体验额度、可用模型和有效期会变化。任何价格、赠送额度、可用模型与具体配置字段都应以配置当天的官方页面为准。"] }],
  },
  {
    slug: "video-workbuddy-lesson29-beginner",
    title: "第29集｜WorkBuddy新手入门：边做任务边赚积分，从0到1掌握AI办公助手｜AI自动化办公",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-08-22",
    seriesOrder: 29,
    excerpt: "把新手任务当作熟悉 AI 办公工作流的练习，而不只是一份积分攻略。",
    tags: ["视频教程", "WorkBuddy", "AI办公", "新手教程", "免费积分"],
    productSlugs: [],
    videoUrl: "https://space.bilibili.com/3546822886820332/lists/8625038?type=season",
    videoMeta: "B 站：WorkBuddy 入门绿皮书合集",
    body: ["这节课面向第一次接触 AI 办公的学习者，从各类平台的免费体验开始，再以 WorkBuddy 成长计划为例认识新手任务和积分。", "重点不是为了完成任务而完成任务，而是借每个任务熟悉 AI 办公工具、任务流程、结果检查与后续复用的方法。"],
    sections: [{ heading: "入门顺序", paragraphs: ["先在小而无敏感信息的任务中理解工具能做什么，再逐步增加文件、规则和输出要求。每完成一次任务，都回看输入资料、AI 输出和人工检查点，而不是只看是否获得积分。", "积分规则、活动资格和平台功能会变化，课程中的页面与活动只作当时操作参考；领取或购买前以产品内和官方规则为准。"] }],
  },
  {
    slug: "video-workbuddy-lesson30-wechat-to-word",
    title: "第30集｜WorkBuddy＋微信：告别复制粘贴！公众号文章一键转Word，图片排版全保留｜AI自动化办公",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-08-26",
    seriesOrder: 30,
    excerpt: "从自己微信中的公开公众号文章出发，读取链接、抓取正文与配图，再生成带原文信息的本地 Word。",
    tags: ["视频教程", "WorkBuddy", "微信公众号", "Word", "浏览器自动化", "AgentLimb"],
    productSlugs: [],
    videoUrl: "https://space.bilibili.com/3546822886820332/lists/8625038?type=season",
    videoMeta: "B 站：WorkBuddy 入门绿皮书合集",
    downloadableResources: [{
      title: "第30集｜微信公众号文章转 Word 自动化流程",
      description: "课程原始 Markdown：从本机微信的公开文章链接，到正文、配图和带图 Word 的本地工作流。",
      fileName: "第30集-微信公众号文章转Word流程.md",
      url: "/downloads/workbuddy/第30集-微信公众号文章转Word流程.md",
    }],
    body: ["这一课把微信读取与浏览器自动化串起来：从自己微信中的公开公众号文章取得链接，再由浏览器读取文章、保留标题和配图，最终生成本地 Word 文件。", "先演示一篇文章，流程跑通后可以用于更多文章；但文章来源、访问权限和版权使用范围必须由使用者判断与确认。"],
    sections: [{ heading: "课前条件与结果核对", paragraphs: ["前置条件是已完成第 22 集的本地微信读取和第 19 集的浏览器自动化基础配置。本课资料只适用于自己有权访问和整理的公开公众号文章，不能绕过访问限制，也不能处理未获授权的聊天或账号资料。", "生成后检查标题、公众号、日期、原文链接、正文结构、图片和图注是否与原文一致；出现缺图、链接错误、正文截断或重复图注时先停下核对，不要把不完整文件当作最终归档。"] }],
  },
  {
    slug: "video-cola-lesson1-expense-sheet-merge",
    title: "第01集｜AI自动化办公入门＋Excel：多部门乱表合并＋自动找异常",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-08-27",
    seriesOrder: 101,
    handoutFirst: true,
    excerpt: "用字段映射、受控堆叠与勾稽校验，把 6 个部门的异构费用表合并为可追溯的总表。",
    tags: ["视频教程", "Cola", "Codex", "Claude Code", "Excel", "AI 自动化办公"],
    productSlugs: [],
    videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season",
    videoMeta: "B 站：AI 自动化办公实战绿皮书合集",
    body: [
      "学员课件：你可以边看边操作，也可以直接把下面的提示词复制到 Cola 中使用。",
      "真实问题是：6 个部门的费用表字段名称、日期格式和金额类型都不一致；直接复制粘贴不仅会错位，也容易混淆口径。"
    ],
    sections: [
      { heading: "这节课的目标（最终交付物）", paragraphs: ["统一表头映射表＋清洗合并总表＋保留原表名与行号来源列＋行数金额勾稽校验。"] },
      { heading: "案例环境与教学锚点", paragraphs: ["这是一个虚构的企业总部财务中心多部门费用月报汇总场景。销售一部、销售二部、市场部、研发部、运营部、行政部分别提交《多部门月报.xlsx》中的不同 Sheet；标准输出字段为部门、报销人、费用类型、金额、发生日期、备注。", "销售部的“员工”、市场部的“姓名”、行政部的“报销人”必须映射为标准字段“报销人”；缺失日期如实标记为“待确认”；文本型金额和负数退款需要保留异常提示；合并后的每行都必须新增“来源 Sheet”和“原行号”，以便回查。"] },
      { heading: "第1步：异构表头映射与受控堆叠合并", paragraphs: ["思路：建立 6 个 Sheet 的字段映射规则，统一清洗并堆叠合并为规范总表，保留来源行号，标记缺失与异常。做完后检查所有 Sheet 是否正确进入总表、表头是否统一、每行是否有来源信息，以及异常清单是否找出缺失日期与脏数据。"], codeBlocks: ["只读《多部门月报.xlsx》所有Sheet和《字段口径说明.md》，生成合并总表《多部门费用汇总_清洗合并.xlsx》：对照口径说明，将6个Sheet不同的表头（如“员工/姓名/报销人”统一为“报销人”）映射到标准列；转换日期为YYYY-MM-DD标准格式（缺失日期填“待确认”）；统一金额为数值类型；在最前面新增“来源Sheet”和“原行号”两列；同时输出《字段映射表》和《数据异常清单》（列出缺失日期、负数金额和空值记录）。"] },
      { heading: "第2步：行数与金额勾稽校验", paragraphs: ["思路：反向核验总行数与分表行数之和、各部门金额加总。核对分表行数加总是否等于总表行数，分表金额加总是否等于总金额，再确认没有漏行或公式错误。"], codeBlocks: ["对《多部门费用汇总_清洗合并.xlsx》进行勾稽对账：分别统计6个原始Sheet的数据有效行数与金额总和，比对合并总表的总行数与总金额；核对是否存在重复合并或漏行，输出《合并勾稽核对表》。"] },
      { heading: "最后检查", paragraphs: ["合并总表包含全部 6 个部门；每一行都能回溯原表；缺失日期没有被凭空补全；分表行数与金额加总和总表一致。所有公司、人名、金额均为虚构教学素材；换成自己的文件后，请重新确认业务规则、权限范围和最终审批责任。"] },
    ],
  },
  {
    slug: "video-cola-lesson2-resume-screening",
    title: "第02集｜AI自动化办公入门＋招聘：30份简历批量初筛，自动匹配文员/设计师",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-08-27",
    seriesOrder: 102,
    handoutFirst: true,
    excerpt: "批量读取 30 份 Word 简历，按两类岗位的硬性门槛输出有依据的初筛矩阵与面试追问。",
    tags: ["视频教程", "Cola", "Codex", "Claude Code", "招聘", "Word"],
    productSlugs: [],
    videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season",
    videoMeta: "B 站：AI 自动化办公实战绿皮书合集",
    body: ["学员课件：你可以边看边操作，也可以直接把下面的提示词复制到 Cola 中使用。", "真实问题是：30 份 Word 简历格式不一，软件能力、工作年限与期望薪资各不相同；不能只让 AI 给出前三名，必须给出逐人的事实依据与面试追问。"],
    sections: [
      { heading: "这节课的目标（最终交付物）", paragraphs: ["30份简历结构化提取表＋行政/设计两岗位初筛打分矩阵＋面试推荐清单与追问要点。"] },
      { heading: "案例环境与教学锚点", paragraphs: ["这是一个虚构的中小企业招聘初筛场景：行政文员要求大专以上、1年以上经验、熟练 Office、期望薪资不高于 6k；平面设计师要求熟练 PS/AI、有作品集、期望薪资不高于 9k。", "30 份简历的格式存在差异；超薪资或缺技能的候选人应客观扣分并标记原因；A/B/C 等级必须附简历原文依据；对 A/B 级候选人生成 2–3 个针对其简历的面试追问。"] },
      { heading: "第1步：批量结构化提取与硬性门槛打分", paragraphs: ["思路：批量读取 30 份简历，按岗位标准提取字段、计算匹配得分与等级，并写明判定依据。完成后检查是否每位候选人均已录入、字段是否完整、是否有明确的评级和理由。"], codeBlocks: ["读取《候选人简历/》中所有Word简历和《公司与岗位招聘标准.docx》，输出《30位候选人结构化初筛总表.xlsx》：提取姓名、学历、毕业院校、工作年限、核心技能、期望薪资、应聘意向；分别对照行政文员与平面设计师硬性门槛，计算匹配得分并评定等级（A强推/B可面试/C不匹配），每一行必须写明“评级核心依据与扣分点”；不符合硬性条件的直接标C并注明原因。"] },
      { heading: "第2步：输出面试推荐矩阵与针对性追问要点", paragraphs: ["思路：从初筛总表筛选 A/B 级推荐名单，再针对每位候选人的薄弱项或关键经历生成面试提纲。检查推荐人选是否按岗位分类，追问是否落在简历细节而不是通用套话。"], codeBlocks: ["基于刚才的初筛总表，生成《初选面试推荐与追问清单.md》：按岗位分类列出A级与B级候选人名单及优先级；针对每位推荐候选人，结合其简历具体项目或疑点（如跳槽频繁、某项技能未体现、薪资偏高）生成2–3个定制化面试追问问题；C级候选人归入归档淘汰区。"] },
      { heading: "最后检查", paragraphs: ["30 份简历均被解析；评级有据可依，超薪资或缺必备技能被如实标记；推荐清单分类清晰，追问与简历项目相关。素材中的候选人信息均为虚构教学资料；真实招聘仍需遵守权限、隐私与人工决策边界。"] },
    ],
  },
  {
    slug: "video-cola-lesson3-bonus-rules",
    title: "第03集｜AI自动化办公入门＋Excel：十几张散表理清奖金规则＋月底算薪不扯皮",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-08-27",
    seriesOrder: 103,
    handoutFirst: true,
    excerpt: "把口头奖金规则和事后调整固化成规则字典，保留中间计算列并通过抽样反算复核。",
    tags: ["视频教程", "Cola", "Codex", "Claude Code", "Excel", "奖金核算"],
    productSlugs: [],
    videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season",
    videoMeta: "B 站：AI 自动化办公实战绿皮书合集",
    body: ["学员课件：你可以边看边操作，也可以直接把下面的提示词复制到 Cola 中使用。", "真实问题是：不同车间有不同的阶梯单价、出勤系数、质量扣款与临时调整，口头规则与散表一旦套错公式就容易引发争议。"],
    sections: [
      { heading: "这节课的目标（最终交付物）", paragraphs: ["奖金规则字典＋全员奖金计算明细表＋中间计算列＋事后调整记录＋抽样反算复核。"] },
      { heading: "案例环境与教学锚点", paragraphs: ["这是一个虚构的制造企业月度绩效奖金核算场景，涉及注塑、组装、包装、质检 4 个工段。素材包括《员工产量_2026-07.xlsx》《岗位奖金口径.md》《事后调整记录.md》。", "多工段阶梯规则须精确匹配；事后调整必须关联到具体工号；缺失工号或异常产量要标记“待确认”；结果必须展示基础奖金、阶梯奖金、扣罚金额、调整金额、应发总额等中间列。"] },
      { heading: "第1步：生产奖金规则标准化与明细计算", paragraphs: ["思路：固化奖金规则，计算阶梯奖金与事后调整，保留中间列，并标记异常与缺工号项。完成后检查公式和结果是否清晰、调整是否正确计入、缺失工号是否标为待确认。"], codeBlocks: ["读取《员工产量_2026-07.xlsx》《岗位奖金口径.md》和《事后调整记录.md》，生成《2026年7月生产奖金核算明细表.xlsx》：根据各工段规则计算员工奖金，必须包含“基础产量、超额产量、阶梯单价、出勤系数、质量扣款、事后调整、实发奖金”等完整计算列；准确关联事后调整记录；对缺失工号或异常产量的员工标记“待确认”；同时输出《奖金规则计算字典》和《异常调整清单》。"] },
      { heading: "第2步：抽样公式反算与部门总额复核", paragraphs: ["思路：抽取不同工段代表性员工反算公式并统计车间总额，确认算薪透明无误。检查抽查员工的反算步骤、各工段加总和异常问题是否完整。"], codeBlocks: ["对《2026年7月生产奖金核算明细表.xlsx》进行反向抽查：分别抽取注塑组、组装组、质检组各1名员工，列出其详细手工反算步骤与公式比对；汇总各工段奖金总额及事后调整净额；确认无重复计算或负数溢出。输出《奖金反算复核报告》。"] },
      { heading: "最后检查", paragraphs: ["所有计算规则均有对应字段；调整项准确回填；缺失工号和异常产量如实标注；抽样反算与总额加总正确。所有人员、产量、金额均为虚构教学素材，真实发薪必须由有权限的人员复核与审批。"] },
    ],
  },
  {
    slug: "video-cola-lesson4-word-template-fill",
    title: "第04集｜AI自动化办公入门＋Word：固定模板自动填充＋版式一格不乱",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-08-27",
    seriesOrder: 104,
    handoutFirst: true,
    excerpt: "在固定 Word 模板副本上建立字段映射、回填多源事实并用段落与表格计数检查版式。",
    tags: ["视频教程", "Cola", "Codex", "Claude Code", "Word", "模板填充"],
    productSlugs: [],
    videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season",
    videoMeta: "B 站：AI 自动化办公实战绿皮书合集",
    body: ["学员课件：你可以边看边操作，也可以直接把下面的提示词复制到 Cola 中使用。", "真实问题是：几十页的标准 Word 模板中，页眉、受控编号、表格结构和条款序号都不能改动；资料散落在项目事实、设备台账和 CSV 中，直接交给 AI 容易破坏版式。"],
    sections: [
      { heading: "这节课的目标（最终交付物）", paragraphs: ["字段映射表＋填充后的 Word 方案草稿（模板版式零改动）＋段落表格计数自查报告。"] },
      { heading: "案例环境与教学锚点", paragraphs: ["场景是虚构的精细化工混合罐验证方案编制；素材为《验证方案模板.docx》《项目事实资料.md》《设备采样记录.xlsx》。", "原模板绝对不可改动，操作必须在副本上进行；取样点 3 的实测值 11.2 超过限度 10，必须标记异常；缺项使用【待确认】占位，不能编造。"] },
      { heading: "第1步：多源事实核对与模板受控回填", paragraphs: ["思路：建立字段映射，在模板副本上回填数据，拦截 11.2 超限异常，标记缺失项。完成后打开 Word 草稿检查排版是否完好，以及超限是否被醒目标识。"], codeBlocks: ["读取《验证方案模板.docx》《项目事实资料.md》和《设备采样记录.xlsx》，生成《验证方案_VAL-2026-017_混合罐M-03_草稿.docx》：按字段回填；对实测值11.2超限10标红预警；缺项用【待确认】占位；严格保持原模板页眉表格格式；输出《字段映射表.xlsx》。"] },
      { heading: "第2步：快速抽查版式完整性与防篡改核对", paragraphs: ["思路：对比段落与表格总数，确认格式零变形。完成后确认段落数和表格数吻合、版式完好。"], codeBlocks: ["对比原模板与生成草稿的段落总数与表格数，核对抽样点数据无误，输出《自查报告.md》。"] },
      { heading: "最后检查", paragraphs: ["模板版式一格不乱，11.2 超限被准确拦截。方法可迁移到固定公文与体系文件批量回填；真实文件应先确认资料授权、业务规则与最终审批责任。"] },
    ],
  },
  {
    slug: "video-cola-lesson5-aionui-bai-free-api",
    title: "第05集｜AionUi＋B.AI：白嫖大模型API终极教程，零成本手搓专属WorkBuddy Agent",
    category: "视频教程笔记",
    diaryKind: "video",
    date: "2026-08-27",
    seriesOrder: 105,
    handoutFirst: true,
    excerpt: "汇总开源 24/7 Agent 客户端 AionUi 接入 B.AI 免费大模型 API 的完整配置参数、免费模型清单与 Coding/Agent 模型能力深度对比选型指南。",
    tags: ["视频教程", "Cola", "AionUi", "B.AI", "Coding Agent", "免费API", "AI 自动化办公"],
    productSlugs: [],
    videoUrl: "https://space.bilibili.com/3546822886820332/lists/8881026?type=season",
    videoMeta: "B 站：AI 自动化办公实战绿皮书合集",
    downloadableResources: [{
      title: "第05集-AionUi接入BAI配置与模型对比指南.md",
      description: "包含 AionUi 表单配置、B.AI 免费模型清单与 Coding Agent 选型对比完整文档。",
      fileName: "第05集-AionUi接入BAI配置与模型对比指南.md",
      url: "/downloads/cola/第05集-AionUi接入BAI配置与模型对比指南.md",
    }],
    body: [
      "学员课件：本文档汇总了在开源 AI 客户端 AionUi 中接入 B.AI 大模型服务的完整配置参数、免费模型 ID 清单，以及主流 Coding + Agent 模型的能力对比与选型指南。",
      "你可以直接按照下方的配置步骤快速接入，也可以下载下方的 Markdown 资料到本地查看。"
    ],
    contentHtml: `<p class="article-lead">本文档汇总了在开源 AI 客户端 <strong>AionUi</strong> 中接入 <strong>B.AI</strong> 大模型服务的完整配置参数、免费模型 ID 清单，以及主流 <strong>Coding + Agent 模型的能力对比与选型指南</strong>。</p>

<h2>🔗 一、相关资源与链接</h2>
<div class="article-table-wrap">
  <table>
    <thead>
      <tr>
        <th>资源名称</th>
        <th>链接地址</th>
        <th>说明</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>B.AI 注册与邀请</strong></td>
        <td><a href="https://chat.b.ai/chat?invite_code=UCPRMG" target="_blank" rel="noreferrer">点击注册 B.AI (邀请码: UCPRMG)</a></td>
        <td>注册即可体验多款免费大模型</td>
      </tr>
      <tr>
        <td><strong>API Key 获取页面</strong></td>
        <td><a href="https://chat.b.ai/key" target="_blank" rel="noreferrer">https://chat.b.ai/key</a></td>
        <td>创建并管理您的 API 密钥</td>
      </tr>
      <tr>
        <td><strong>AionUi 客户端下载</strong></td>
        <td><a href="https://www.aionui.com/zh-CN/" target="_blank" rel="noreferrer">https://www.aionui.com/zh-CN/</a></td>
        <td>开源 24/7 AI Agent 桌面客户端</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>⚙️ 二、AionUi 表单配置对照表</h2>
<p>在 AionUi 中点击 <strong>设置 (Settings)</strong> → <strong>模型设置 (Models)</strong> → <strong>添加模型</strong>，按下方表格对应填写：</p>
<div class="article-table-wrap">
  <table>
    <thead>
      <tr>
        <th>配置项</th>
        <th>填写内容 / 设置值</th>
        <th>详细说明</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>模型平台</strong></td>
        <td><strong>自定义</strong></td>
        <td>保持默认的「自定义」即可</td>
      </tr>
      <tr>
        <td><strong>API 请求地址</strong></td>
        <td><code>https://api.b.ai/v1</code></td>
        <td>B.AI 标准 API 基础端点</td>
      </tr>
      <tr>
        <td><strong>完整 URL 开关</strong></td>
        <td><strong>关闭（默认）</strong></td>
        <td>保持灰色关闭状态，客户端会自动拼接请求路径</td>
      </tr>
      <tr>
        <td><strong>API Key</strong></td>
        <td><code>sk-...</code></td>
        <td>粘贴在 chat.b.ai/key 生成的密钥</td>
      </tr>
      <tr>
        <td><strong>模型名称</strong></td>
        <td><em>填入具体模型 ID</em></td>
        <td>填写想使用的模型 ID（详见下方免费与常用清单）</td>
      </tr>
      <tr>
        <td><strong>视觉输入</strong></td>
        <td><strong>自动识别</strong></td>
        <td>保持默认即可，模型支持看图时会自动启用</td>
      </tr>
      <tr>
        <td><strong>OpenAI 请求接口</strong></td>
        <td><strong>自动识别（推荐）</strong></td>
        <td>保持默认即可，系统会自动走兼容接口协议</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>🎁 三、B.AI 当前免费模型 ID 清单（0 积分 / 0 费用）</h2>
<blockquote><p>💡 <strong>提示</strong>：直接复制下表第一列的 <strong>模型 ID</strong>，填入 AionUi 的「模型名称」输入框即可。</p></blockquote>
<div class="article-table-wrap">
  <table>
    <thead>
      <tr>
        <th>模型 ID（直接复制填写）</th>
        <th>模型全称</th>
        <th>核心特性 / 推荐场景</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>deepseek-v4-flash</code></td>
        <td>DeepSeek-V4-Flash</td>
        <td><strong>🌟 强烈推荐</strong>：综合与代码能力顶尖，完全免 Token 费与请求费</td>
      </tr>
      <tr>
        <td><code>deepseek-v4-flash-vision-exp</code></td>
        <td>DeepSeek-V4-Flash 视觉版</td>
        <td><strong>🖼️ 支持看图</strong>：具备多模态能力，可上传分析图片</td>
      </tr>
      <tr>
        <td><code>hy3</code></td>
        <td>腾讯混元 Hy3</td>
        <td>中文语义理解深刻，日常问答与逻辑分析表现优异，Chat / API 均免费</td>
      </tr>
      <tr>
        <td><code>qwen3.8-flash</code></td>
        <td>阿里通义千问 3.8 Flash</td>
        <td>响应极快，非常适合快速问答与轻量任务</td>
      </tr>
      <tr>
        <td><code>glm-5.3-flash</code></td>
        <td>智谱 GLM-5.3 Flash</td>
        <td>智谱高性价比轻量旗舰模型，API 完全免费</td>
      </tr>
      <tr>
        <td><code>mimo-v2.5</code></td>
        <td>小米 MiMo-V2.5</td>
        <td>快速文本生成与日常辅助对话</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>🌟 四、高阶付费模型 ID 参考（需账户额度）</h2>
<p>如果需要调用更高精度的旗舰模型，只需保持相同的配置，将「模型名称」修改为：</p>
<div class="article-table-wrap">
  <table>
    <thead>
      <tr>
        <th>模型分类</th>
        <th>模型 ID</th>
        <th>适用场景</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>OpenAI 系列</strong></td>
        <td><code>gpt-5.6</code> / <code>gpt-5.5</code> / <code>gpt-5.6-terra</code></td>
        <td>复杂专业推理、架构设计与重度工程代码</td>
      </tr>
      <tr>
        <td><strong>Claude 系列</strong></td>
        <td><code>claude-sonnet-4.6</code> / <code>claude-opus-4.6</code></td>
        <td>长文本阅读、复杂逻辑与高质量写作</td>
      </tr>
      <tr>
        <td><strong>Gemini 系列</strong></td>
        <td><code>gemini-3.7-flash</code> / <code>gemini-3.5-flash</code> / <code>gemini-3.1-pro</code></td>
        <td>大上下文处理与快速多模态交互</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>📊 五、Coding 与 Agent 模型能力对比与选型指南</h2>
<blockquote><p>💡 <strong>对比说明</strong>：以两款主流商业收费模型（<strong>GPT-5.6 Terra</strong> 与 <strong>Gemini 3.7 Flash High</strong>）作为参考基准。通过量化参考分可以直观看到：<strong>B.AI 提供的几款免费模型，在实际 Coding / Agent 场景下的能力已经非常接近常见收费模型，完全可以零成本作为日常主力！</strong></p></blockquote>

<h3>1. 免费模型 vs 商业收费模型能力对照表</h3>
<div class="article-table-wrap">
  <table>
    <thead>
      <tr>
        <th>模型名称</th>
        <th>费用性质</th>
        <th>综合参考分</th>
        <th>定位与能力类比</th>
        <th>最适合场景</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>GPT-5.6 Terra</strong></td>
        <td>收费参考</td>
        <td><strong>100（基准）</strong></td>
        <td>高推理深度商业模型，适合复杂大工程</td>
        <td>超大型复杂项目、跨文件深度重构</td>
      </tr>
      <tr>
        <td><strong>Gemini 3.7 Flash High</strong></td>
        <td>收费参考</td>
        <td><strong>98</strong></td>
        <td>高响应速度与多模态商业模型</td>
        <td>复杂编码、UI/网页设计、自动化 Agent</td>
      </tr>
      <tr>
        <td><strong>GLM-5.3-Flash</strong></td>
        <td><strong>完全免费</strong></td>
        <td><strong>96–97</strong></td>
        <td>能力接近主流收费模型，工具调用极稳</td>
        <td>开源 Coding Agent、自动化工作流、企业助手</td>
      </tr>
      <tr>
        <td><strong>DeepSeek-V4-Flash</strong></td>
        <td><strong>完全免费</strong></td>
        <td><strong>92–94</strong></td>
        <td>免费主力模型，代码生成与排错能力扎实</td>
        <td>日常编程排错、终端 Agent、工具调用</td>
      </tr>
      <tr>
        <td><strong>Hy3 (腾讯混元)</strong></td>
        <td><strong>完全免费</strong></td>
        <td><strong>84–87</strong></td>
        <td>中文语义深厚，日常问答与文本处理稳定</td>
        <td>通用办公自动化、中文知识库、MCP 工具</td>
      </tr>
      <tr>
        <td><strong>MiMo-V2.5</strong></td>
        <td><strong>完全免费</strong></td>
        <td><strong>82–85</strong></td>
        <td>快速文本生成与多模态轻量任务</td>
        <td>日常脚本编写、看图分析、轻量辅助</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>2. 极简选型与推荐优先级</h3>
<ul>
  <li><strong>零成本日常主力（首选推荐）</strong>：日常写代码、跑 Agent 自动化，推荐优先选用 <strong>GLM-5.3-Flash</strong> 和 <strong>DeepSeek-V4-Flash</strong>，免费且能力接近商业收费模型。</li>
  <li><strong>中文办公与高频调用</strong>：推荐选用 <strong>Hy3</strong>，中文理解好、响应顺畅且完全免费。</li>
  <li><strong>按需切换收费模型</strong>：平时用免费模型跑通流程，遇到超长周期或特殊工程需求时，可按需切换到 <strong>GPT-5.6 Terra</strong> 或 <strong>Gemini 3.7 Flash High</strong>。</li>
</ul>

<h4>🎯 Coding Agent 选型链：</h4>
<blockquote>
  <p><strong>免费主力优先</strong>：<code>GLM-5.3-Flash (96-97分)</code> / <code>DeepSeek-V4-Flash (92-94分)</code> &gt; <code>Hy3 (84-87分)</code> ≈ <code>MiMo-V2.5 (82-85分)</code><br><small style="color: var(--muted);">(复杂需求可按需对照商业收费模型 <code>GPT-5.6 Terra (100分)</code> / <code>Gemini 3.7 Flash High (98分)</code>)</small></p>
</blockquote>

<h2>📝 六、极速上手操作三步走</h2>
<ol>
  <li>
    <strong>第一步：获取 Key</strong>
    <ul>
      <li>访问 <a href="https://chat.b.ai/chat?invite_code=UCPRMG" target="_blank" rel="noreferrer">B.AI 注册页面</a> 注册并登录。</li>
      <li>前往 <a href="https://chat.b.ai/key" target="_blank" rel="noreferrer">API Key 页面</a> 点击 <strong>Create API Key</strong>，复制生成的 <code>sk-...</code> 密钥。</li>
    </ul>
  </li>
  <li>
    <strong>第二步：配置 AionUi</strong>
    <ul>
      <li>打开 AionUi 客户端，进入 <strong>设置</strong> → <strong>模型设置</strong> → <strong>添加模型</strong>。</li>
      <li>请求地址填入 <code>https://api.b.ai/v1</code>，粘贴您的 API Key，模型名称填入 <code>deepseek-v4-flash</code> 或 <code>glm-5.3-flash</code>。</li>
      <li>点击 <strong>确定</strong> 保存。</li>
    </ul>
  </li>
  <li>
    <strong>第三步：开始对话</strong>
    <ul>
      <li>在对话窗口顶部切换为你刚添加的模型，发送一条消息即可开启免费、高速的 AI 对话与编码体验！</li>
    </ul>
  </li>
</ol>`,
  },
];

const readingDiarySeeds: ArticleSeed[] = [
  {
    slug: "reading-shannon-biography",
    title: "读书笔记 · 香农传：信息时代不是从应用开始的",
    category: "读书笔记",
    diaryKind: "reading",
    date: "2026-06-19",
    excerpt: "从香农看见一件事：真正改变世界的技术，往往先是一种更准确的抽象。",
    tags: ["技术", "信息论", "科学人物"],
    productSlugs: [],
    body: [
      "《香农传》适合放在这个网站的第一批读书笔记里，因为它提醒我：AI、互联网、通信、压缩、密码和计算机并不是突然出现的热闹应用，它们背后有一套更安静的抽象。",
      "香农厉害的地方不只是聪明，而是能把混乱的通信问题变成可以计算、可以证明、可以工程化的结构。今天我们做 AI 产品，也需要这种能力：不要只盯着界面和功能，而要找到信息在系统里怎么流动、怎么损失、怎么被重新组织。",
      "读这类传记的意义，不是崇拜天才，而是训练自己的尺度感。很多时候，我们以为自己在追新技术，其实是在追一层层被别人抽象好的工具。真正值得学习的是那些抽象怎么被创造出来。"
    ],
  },
  {
    slug: "reading-hackers-and-painters",
    title: "读书笔记 · 黑客与画家：技术也是一种审美训练",
    category: "读书笔记",
    diaryKind: "reading",
    date: "2026-06-18",
    excerpt: "这本书把编程从职业技能拉回到创造活动：像画家一样反复试、反复改。",
    tags: ["技术", "艺术", "创造者"],
    productSlugs: [],
    body: [
      "《黑客与画家》对我很亲近，因为我本来就站在艺术、建筑和编程之间。它讲的不是把程序员包装得更酷，而是把编程重新放回创造行为里：判断、品味、快速试错和作品感。",
      "AI 时代写代码会越来越快，但作品感不会自动出现。一个产品好不好，不只是模型能不能生成代码，也不是组件库是否高级，而是你有没有对使用者、节奏、边界和细节的判断。",
      "这本书给我的提醒是：技术人不应该只训练语法和框架，也要训练眼睛。真正的独立开发者，很像一个小型工作室，既要懂结构，也要懂气质。"
    ],
  },
  {
    slug: "reading-back-stairs-to-philosophy",
    title: "读书笔记 · 通向哲学的后楼梯：从人的困惑进入思想",
    category: "读书笔记",
    diaryKind: "reading",
    date: "2026-06-17",
    excerpt: "哲学不是高台演讲，而是从普通人的问题后门进去，看见更大的房间。",
    tags: ["哲学", "思想入门", "自我训练"],
    productSlugs: [],
    body: [
      "《通向哲学的后楼梯》这类书有一个好处：它不把哲学讲成名词考试，而是把思想家还原成面对问题的人。哲学不是为了显得深，而是为了让我们不被第一个答案困住。",
      "我做 AI 产品时越来越觉得，问题本身比答案重要。很多卖课、工具推荐和教程都急着给答案，但一个人真正成长，是能提出更准确的问题：我为什么要做这个产品？用户真正害怕什么？技术变化后人还剩下什么？",
      "读哲学书像磨刀，不是立刻多一个功能，而是让大脑在面对混乱时更稳一点。AI 可以给很多答案，但问题的方向仍然要由人来承担。"
    ],
  },
  {
    slug: "reading-discipline-and-punish",
    title: "读书笔记 · 规训与惩罚：工具也会塑造人",
    category: "读书笔记",
    diaryKind: "reading",
    date: "2026-06-16",
    excerpt: "福柯提醒我们：系统不只是提高效率，它也在制造行为、秩序和顺从。",
    tags: ["哲学", "社会理论", "技术人文"],
    productSlugs: [],
    body: [
      "《规训与惩罚》放在 AI 时代读，会多一层现实感。工具从来不是中性的，它会规定什么被看见、什么被记录、什么被优化，最后也会影响人怎样工作和怎样理解自己。",
      "很多公司想普及 AI，但又害怕数据、流程、权责和员工抵触。表面上是工具导入问题，深层其实是组织秩序问题：谁的工作被看见，谁的经验被重写，谁的权力因为自动化发生变化。",
      "这本书给产品开发的提醒是：不要只问功能是否强大，也要问它如何改变人的行为。尤其是 AI 办公工具，如果只追求监控、提效和可量化，很容易让人更不愿意使用。"
    ],
  },
  {
    slug: "reading-guns-germs-steel",
    title: "读书笔记 · 枪炮、病菌与钢铁：历史不是个人努力能解释完的",
    category: "读书笔记",
    diaryKind: "reading",
    date: "2026-06-15",
    excerpt: "它让人把视角拉远：命运常常来自地理、制度、技术和长期结构。",
    tags: ["历史", "文明", "长期结构"],
    productSlugs: [],
    body: [
      "《枪炮、病菌与钢铁》让我喜欢的是它的尺度。它把很多看似个人、民族或短期事件的问题，放回地理、农业、疾病、技术扩散和制度形成的长链条里看。",
      "对个人开发者来说，这种视角也有用。一个产品成不成，不只是你努力不努力，还和平台、分发、支付、语言、政策、技术周期和用户习惯有关。承认结构，不是放弃行动，而是少一点自责，多一点策略。",
      "AI 时代的个体创业也一样。道路并不对称，但不是没有路。关键是找到自己能切入的小结构：小产品、小渠道、小现金流、小复利。"
    ],
  },
  {
    slug: "reading-okakura-aesthetics",
    title: "读书笔记 · 冈仓天心东方美学三书：美不是装饰，是世界观",
    category: "读书笔记",
    diaryKind: "reading",
    date: "2026-06-14",
    excerpt: "东方美学提醒我，产品的克制、留白和气息，也是一种功能。",
    tags: ["艺术", "美学", "产品气质"],
    productSlugs: [],
    body: [
      "《冈仓天心东方美学三书》适合放在艺术板块里，因为它让我重新确认：美不是最后加上去的装饰，而是一种观看世界的方式。",
      "我做 DrowseBook、Sumi Mahjong 这些安静产品时，其实一直在想类似问题：界面要不要克制，按钮能不能少一点，广告和增长弹窗会不会破坏气息。技术产品也有气质，气质会决定用户愿不愿意长期停留。",
      "AI 生成让图像和界面变得更容易，但也更容易变得廉价。美学训练的价值，就是在无限生成里知道什么应该停下。"
    ],
  },
  {
    slug: "reading-dark-time",
    title: "读书笔记 · 暗时间：最高级的资产是大脑的后台",
    category: "读书笔记",
    diaryKind: "reading",
    date: "2026-06-13",
    excerpt: "真正的学习不是收藏资料，而是让问题在脑子里持续运转。",
    tags: ["学习", "认知", "方法"],
    productSlugs: [],
    body: [
      "《暗时间》适合和 AI 学习放在一起看。今天工具越来越快，资料越来越多，但如果大脑没有后台处理，收藏再多教程也只是堆积。",
      "我越来越相信，最高级的资产不是账号、模型额度或某个课程，而是自己的大脑如何持续消化问题。读书、写日记、做产品，其实都是在给大脑建立更好的缓存和索引。",
      "所以读书笔记不会追求完整书评，而是记录一本书对我当前问题的触发点。它像磨刀石，不替我战斗，但让刀更锋利。"
    ],
  },
];

const thoughtDiarySeeds: ArticleSeed[] = [
  {
    slug: "thought-static-ai-tutorials-expire-fast",
    title: "随想笔记 · AI 软件变化太快，静态教程为什么会失效",
    category: "随想笔记",
    diaryKind: "thought",
    date: "2026-06-19",
    excerpt: "如果教程脱离真实项目，它很快就会被新模型、新界面和新工作流淘汰。",
    tags: ["AI 教程", "实战", "学习方法"],
    productSlugs: [],
    body: [
      "AI 软件变化太快了。今天讲一个按钮、一个菜单、一个提示词模板，过两个月可能界面就变了，模型行为也变了。很多静态教程看起来很系统，但如果它没有绑定真实项目，很快就只剩截图价值。",
      "我更相信实战型内容：拿一个真实产品，从需求、失败、修改、发布到复盘，把变化本身也记录下来。这样即使工具换了，读者学到的不是按钮位置，而是如何判断、如何拆解、如何和 AI 协作。",
      "这也是我想把开发日记放出来的原因。AI 时代真正有用的教程，应该像现场记录，而不是被包装好的标准答案。"
    ],
  },
  {
    slug: "thought-company-ai-adoption-gap",
    title: "随想笔记 · 公司普及 AI 的尴尬：员工不想用，公司不敢用",
    category: "随想笔记",
    diaryKind: "thought",
    date: "2026-06-18",
    excerpt: "AI 普及不是买账号的问题，而是信任、流程、责任和收益分配的问题。",
    tags: ["AI 办公", "组织", "公司转型"],
    productSlugs: [],
    body: [
      "很多公司想普及 AI，但真正落地会卡在很现实的地方：员工不想用，因为怕暴露自己不会、怕工作被重新评估、怕多一层汇报；公司不敢用，因为怕数据泄露、怕结果不可控、怕责任边界说不清。",
      "所以 AI 普及不是简单买几个账号，也不是办一次培训。它需要重新设计流程：哪些资料可以进入模型，哪些结果必须人工确认，哪些岗位可以先试，产生的效率收益怎么分配。",
      "如果这些问题不说清楚，AI 工具会变成新的 KPI 表演。真正的 AI 办公，应该让人少做重复劳动，而不是让人更焦虑。"
    ],
  },
  {
    slug: "thought-ai-office-is-process-redesign",
    title: "随想笔记 · AI 办公不是提示词，而是重写流程",
    category: "随想笔记",
    diaryKind: "thought",
    date: "2026-06-17",
    excerpt: "提示词只是入口，真正的变化发生在文件、责任、检查点和交付物上。",
    tags: ["AI 办公", "流程", "自动化"],
    productSlugs: [],
    body: [
      "我现在越来越不愿意把 AI 办公讲成提示词大全。提示词当然有用，但它只是入口。真正让工作变快的是流程被重写：输入在哪里，输出是什么，谁检查，如何复用，失败怎么回滚。",
      "比如批量整理文件、生成报告、做网页自动化、准备上架资料，这些都不是一句提示词能解决的。它们需要文件结构、命名规则、审阅节点和可重复执行的脚本或工具。",
      "AI 办公的核心不是让每个人都变成半个程序员，而是让组织里的重复路径被看见，然后变成可以委托给 AI 的流程。"
    ],
  },
  {
    slug: "thought-midlife-unemployment-and-small-products",
    title: "随想笔记 · 中年失业之后，个人还能不能有一条小路",
    category: "随想笔记",
    diaryKind: "thought",
    date: "2026-06-16",
    excerpt: "道路并不宽，也不公平，但个人产品、海外收入和长期复利仍然值得尝试。",
    tags: ["中年失业", "个人创业", "独立开发"],
    productSlugs: [],
    body: [
      "中年失业这个话题很重，因为它不是一句“学习 AI 就好了”能解决的。技术变化、公司裁员、年龄偏见和家庭压力叠在一起，很多人会突然发现原来的职业路径不再可靠。",
      "我不想把个人开发包装成轻松答案。它很难，收入慢，分发难，产品可能没人用。但它至少提供了一条小路：把自己的经验变成产品、内容、工具和海外市场的长期资产。",
      "这条路并不对所有人都适合，也不是浪漫化自由职业。它更像一场长期自救：一点点建立作品、现金流、用户理解和可迁移能力。"
    ],
  },
  {
    slug: "thought-technology-and-humanities",
    title: "随想笔记 · 技术和人文不是两条路",
    category: "随想笔记",
    diaryKind: "thought",
    date: "2026-06-15",
    excerpt: "AI 时代越技术化，越需要重新理解人、语言、制度、审美和恐惧。",
    tags: ["技术人文", "AI", "哲学"],
    productSlugs: [],
    body: [
      "我一直觉得技术和人文不是两条路。技术决定我们能做什么，人文决定我们为什么做、为谁做、做到哪里该停。",
      "AI 越强，这个问题越明显。一个模型可以写代码、生成图像、自动操作网页，但它不知道一个产品进入人的生活之后会带来什么压力、依赖、误解或尊严问题。",
      "所以我希望这个网站不只放教程，也放哲学、艺术、历史和读书笔记。不是为了显得综合，而是因为真正的产品判断必须从人开始。"
    ],
  },
  {
    slug: "thought-indie-developer-road",
    title: "随想笔记 · 个人开发者的路不正确，但不是没有",
    category: "随想笔记",
    diaryKind: "thought",
    date: "2026-06-14",
    excerpt: "没有标准答案，也没有稳定地图，只能用真实产品把路一点点踩出来。",
    tags: ["独立开发", "产品矩阵", "海外收入"],
    productSlugs: [],
    body: [
      "个人开发者这条路很难说是正确的。它不像上班那样有清楚的岗位和晋升，也不像融资创业那样有明确叙事。很多时候，它只是一个人用有限时间、有限钱、有限精力，试着把作品放到世界上。",
      "但不是没有路。小产品、工具、App Store、浏览器插件、个人站、开发日记、读书笔记和社交平台，慢慢可以形成一个微小的系统。每个产品不一定成功，但每个产品都会留下技术、内容、页面、经验和复用资产。",
      "我现在做的就是把这条路公开记录下来。不是证明我已经找到了答案，而是希望真实过程本身能给后来的人一点灵感。"
    ],
  },
];

const resourceDiarySeeds: ArticleSeed[] = [
  {
    slug: "resource-openclaw-ai-assistant",
    title: "资源分享笔记 · OpenClaw：个人 AI 助手的开源想象",
    category: "资源分享笔记",
    diaryKind: "resource",
    date: "2026-06-19",
    excerpt: "一个面向多平台个人 AI 助手的开源项目，适合观察 agent 产品如何从工具走向系统。",
    tags: ["AI 助手", "开源项目", "TypeScript"],
    productSlugs: [],
    resourceUrl: "https://github.com/openclaw/openclaw",
    resourceMeta: "GitHub starred high-star resource · TypeScript",
    body: [
      "OpenClaw 吸引我的地方，是它把个人 AI 助手想成一个跨系统、跨平台的长期入口，而不是一个单独聊天框。对独立开发者来说，这类项目很适合观察 agent 产品的边界：它到底是应用、操作系统插件，还是下一代工作台。",
      "推荐它不是因为我们要照抄，而是可以研究它如何组织界面、任务、工具调用和本地体验。AI 助手最后拼的不只是模型能力，还包括用户能不能放心把日常操作交给它。",
      "资源链接：https://github.com/openclaw/openclaw"
    ],
  },
  {
    slug: "resource-linux-kernel",
    title: "资源分享笔记 · Linux：现代开源协作的底层样本",
    category: "资源分享笔记",
    diaryKind: "resource",
    date: "2026-06-18",
    excerpt: "Linux 内核不是普通学习项目，但它是理解工程规模、协作纪律和长期维护的经典样本。",
    tags: ["Linux", "开源", "系统工程"],
    productSlugs: [],
    resourceUrl: "https://github.com/torvalds/linux",
    resourceMeta: "GitHub starred high-star resource · C",
    body: [
      "Linux 仓库对多数人来说不是拿来直接学习语法的，它更像一个工程文明遗迹：几十年、无数贡献者、极高复杂度，却还能持续演进。",
      "做个人产品时，我们当然不需要这种规模，但可以学习它背后的纪律：清晰边界、长期维护、版本历史、社区协作和对破坏性变更的谨慎。AI 时代生成代码很快，越快越需要这种工程敬畏。",
      "资源链接：https://github.com/torvalds/linux"
    ],
  },
  {
    slug: "resource-claw-code-agent-museum",
    title: "资源分享笔记 · claw-code：观察 agent 自我维护项目",
    category: "资源分享笔记",
    diaryKind: "resource",
    date: "2026-06-17",
    excerpt: "一个强调 agent 管理和自动维护的 Rust 项目，适合思考 AI 开发流程的未来形态。",
    tags: ["Agent", "Rust", "AI 开发"],
    productSlugs: [],
    resourceUrl: "https://github.com/ultraworkers/claw-code",
    resourceMeta: "GitHub starred high-star resource · Rust",
    body: [
      "claw-code 的有趣之处在于它不是单纯展示一个工具，而是在展示一种开发叙事：让 agent 参与项目维护、演示和迭代。即使不把它当成直接生产工具，它也值得作为 AI 开发文化的样本观察。",
      "我会关注这类项目怎样处理自动化边界：哪些事情交给 AI，哪些事情仍然需要人定义目标，如何验证结果，如何避免自动生成变成不可控堆积。",
      "资源链接：https://github.com/ultraworkers/claw-code"
    ],
  },
  {
    slug: "resource-prompts-chat",
    title: "资源分享笔记 · prompts.chat：提示词资料库的长期价值",
    category: "资源分享笔记",
    diaryKind: "resource",
    date: "2026-06-16",
    excerpt: "一个开源提示词集合，适合从社区案例里学习任务拆法，而不是迷信模板。",
    tags: ["提示词", "AI 学习", "资料库"],
    productSlugs: [],
    resourceUrl: "https://github.com/f/prompts.chat",
    resourceMeta: "GitHub starred high-star resource · HTML",
    body: [
      "prompts.chat 这类资源容易被误用成模板大全，但我觉得它真正的价值是观察别人如何描述任务。好的提示词不是魔法口令，而是需求、背景、限制、输出格式和判断标准的组织方式。",
      "如果要学 AI 办公或 AI 编程，可以把它当作素材库：看同一类任务有哪些表达方法，再回到自己的真实流程里改写。提示词必须服务项目，而不是项目服务提示词。",
      "资源链接：https://github.com/f/prompts.chat"
    ],
  },
  {
    slug: "resource-open-webui",
    title: "资源分享笔记 · Open WebUI：本地模型入口的成熟形态",
    category: "资源分享笔记",
    diaryKind: "resource",
    date: "2026-06-15",
    excerpt: "一个友好的 AI Web 界面，适合搭配 Ollama、OpenAI API 和本地模型工作流。",
    tags: ["本地 AI", "Ollama", "AI 工具"],
    productSlugs: [],
    resourceUrl: "https://github.com/open-webui/open-webui",
    resourceMeta: "GitHub starred high-star resource · Python",
    body: [
      "Open WebUI 是很多人进入本地 AI 的好入口。它的意义不只是界面漂亮，而是把 Ollama、OpenAI-compatible API、聊天记录、模型管理这些能力组合成了普通用户更容易理解的工作台。",
      "对我来说，它也能给产品设计启发：本地优先 AI 产品不能只把模型跑起来，还要解决配置、历史、权限、文件和多模型切换这些很现实的问题。",
      "资源链接：https://github.com/open-webui/open-webui"
    ],
  },
  {
    slug: "resource-clash-verge-rev",
    title: "资源分享笔记 · Clash Verge Rev：跨平台桌面工具的 Tauri 样本",
    category: "资源分享笔记",
    diaryKind: "resource",
    date: "2026-06-14",
    excerpt: "一个现代跨平台桌面 GUI 项目，适合观察 Tauri、配置管理和系统托盘类体验。",
    tags: ["桌面应用", "Tauri", "跨平台"],
    productSlugs: [],
    resourceUrl: "https://github.com/clash-verge-rev/clash-verge-rev",
    resourceMeta: "GitHub starred high-star resource · TypeScript",
    body: [
      "Clash Verge Rev 对我有参考价值的地方，是它展示了一个跨平台桌面工具如何处理复杂配置、系统托盘、窗口体验和长期维护。即使具体用途不一定适合所有读者，它的工程形态仍然值得看。",
      "很多独立开发者会在 Electron、Tauri、SwiftUI、原生 App 之间犹豫。看这类成熟项目，可以帮助我们理解跨平台桌面软件真正麻烦的不是页面，而是系统边界。",
      "资源链接：https://github.com/clash-verge-rev/clash-verge-rev"
    ],
  },
  {
    slug: "resource-excalidraw",
    title: "资源分享笔记 · Excalidraw：白板工具为什么能长期有生命力",
    category: "资源分享笔记",
    diaryKind: "resource",
    date: "2026-06-13",
    excerpt: "一个手绘风虚拟白板，适合产品、架构、课程和 AI 交流前的想法整理。",
    tags: ["白板", "设计", "协作"],
    productSlugs: [],
    resourceUrl: "https://github.com/excalidraw/excalidraw",
    resourceMeta: "GitHub starred high-star resource · TypeScript",
    body: [
      "Excalidraw 是我很喜欢的一类工具：它没有把白板做得很重，而是保留手绘感、速度和低心理压力。很多时候我们不是缺少复杂设计软件，而是缺少一个能快速把想法画出来的地方。",
      "在 AI 开发里，白板尤其重要。你可以先把流程、页面、数据关系和用户路径画出来，再交给 AI 实现。视觉草图比一大段模糊文字更能约束结果。",
      "资源链接：https://github.com/excalidraw/excalidraw"
    ],
  },
  {
    slug: "resource-comfyui",
    title: "资源分享笔记 · ComfyUI：节点式 AI 图像工作流",
    category: "资源分享笔记",
    diaryKind: "resource",
    date: "2026-06-12",
    excerpt: "一个强大的扩散模型节点界面，适合理解 AI 生成不是按钮，而是一条可调试流程。",
    tags: ["AI 图像", "工作流", "节点系统"],
    productSlugs: [],
    resourceUrl: "https://github.com/Comfy-Org/ComfyUI",
    resourceMeta: "GitHub starred high-star resource · Python",
    body: [
      "ComfyUI 的价值在于它把 AI 图像生成拆成节点和流程，让你能看见每一步怎么影响结果。它不像简单按钮式工具那样容易上手，但更适合理解生成背后的结构。",
      "对产品开发来说，这种节点式思维也很有启发：复杂任务不要藏在一个黑盒按钮里，而要拆成可观察、可替换、可复用的步骤。AI 时代的工作流产品，很多都会越来越像这种可视化管线。",
      "资源链接：https://github.com/Comfy-Org/ComfyUI"
    ],
  },
  {
    slug: "resource-cc-switch",
    title: "资源分享笔记 · cc-switch：多 AI 编程工具的账号与环境切换",
    category: "资源分享笔记",
    diaryKind: "resource",
    date: "2026-06-11",
    excerpt: "一个面向 Claude Code、Codex、OpenCode、Gemini CLI 等工具的跨平台助手。",
    tags: ["AI 编程", "效率工具", "Rust"],
    productSlugs: [],
    resourceUrl: "https://github.com/farion1231/cc-switch",
    resourceMeta: "GitHub starred high-star resource · Rust",
    body: [
      "cc-switch 这类工具的出现说明一件事：AI 编程已经从“用一个产品”进入“管理一组工具”的阶段。不同模型、不同 CLI、不同账号、不同项目环境，会变成新的工作台问题。",
      "我会把它当作 AI 编程基础设施的观察样本。未来真正高频的需求，可能不是单个模型更聪明，而是不同工具之间的切换、记忆、配置和成本管理更顺手。",
      "资源链接：https://github.com/farion1231/cc-switch"
    ],
  },
  {
    slug: "resource-awesome-design-md",
    title: "资源分享笔记 · awesome-design-md：给编码 agent 的设计系统说明书",
    category: "资源分享笔记",
    diaryKind: "resource",
    date: "2026-06-10",
    excerpt: "一个收集 DESIGN.md 的资源库，适合让 AI 更稳定地理解产品视觉和组件规则。",
    tags: ["设计系统", "AI 编程", "前端"],
    productSlugs: [],
    resourceUrl: "https://github.com/VoltAgent/awesome-design-md",
    resourceMeta: "GitHub starred high-star resource",
    body: [
      "awesome-design-md 很适合现在这个阶段：我们越来越多地让 coding agent 写前端，但很多项目没有给 AI 一个清楚的设计说明。结果就是页面能跑，却气质漂移、组件不统一、间距和层级乱掉。",
      "DESIGN.md 的价值是把视觉规则变成文字协议：颜色、间距、组件、禁忌、语气、布局习惯都写清楚。它不是替代设计师，而是让 AI 在实现时少猜一点。",
      "资源链接：https://github.com/VoltAgent/awesome-design-md"
    ],
  },
];

const articleSeed: ArticleSeed[] = [
  ...videoTutorialNoteSeeds,
  ...expandedProductDiaries,
  ...readingDiarySeeds,
  ...thoughtDiarySeeds,
  ...resourceDiarySeeds,
  {
    slug: "drowsebook-market-research",
    title: "01 · 立项调研：为什么做一个睡前听书阅读器",
    category: "产品复盘",
    date: "2026-06-20",
    excerpt: "从头部听书产品的差评、移动场景和买断机会，判断 DrowseBook 为什么值得做。",
    tags: ["立项", "听书", "本地优先"],
    productSlugs: ["drowsebook"],
    seriesOrder: 1,
    body: [
      "DrowseBook 的起点不是“再做一个电子书阅读器”，而是一个更窄的判断：很多用户已经习惯用手机听内容，但他们真正痛苦的是订阅、云端、账号、跳字、格式不透明和被打断。",
      "这种项目适合独立开发者切入，因为它不是和大型内容平台抢版权书库，而是服务用户已经拥有的文件：EPUB、PDF、TXT、MOBI、AZW3。用户要的不是另一个内容商店，而是一个安静、离线、能把自己的书读出来的工具。",
      "所以 DrowseBook 从立项开始就把“睡前、通勤、本地文件、系统 TTS、一次买断”放在一起看。它不是一个炫技型 AI 项目，而是一个把阅读和听书流程变得可信的小工具。"
    ],
    sections: [
      {
        heading: "需求不是读书，而是把自己的文件听起来",
        paragraphs: [
          "头部听书产品已经验证了“把文本读出来”的需求，但很多产品把需求导向了自己的书库、订阅计划和云端服务。DrowseBook 反过来问：如果用户已经有书，能不能直接导入、继续读、继续听，而且不需要账号？",
          "这个定位天然适合 iPhone。通勤、做家务、睡前关灯、戴 AirPods，这些都不是桌面阅读场景，而是手机和系统音频能力最强的地方。"
        ],
      },
      {
        heading: "竞品差评给出的切入口",
        paragraphs: [
          "差评里反复出现的不是“功能太少”，而是体验不可信：TTS 跳段、重复、卡住；免费试用突然变订阅；用户自己的书被平台逻辑干扰；PDF 会把页码、脚注和页眉读出来。",
          "这些痛点可以直接翻译成产品差异：不用云 TTS，使用 Apple 系统语音；不建自有书库，只读用户文件；不做订阅，做一次买断；不做扫描和虚假广告，明确支持 DRM-free 文件。"
        ],
      },
      {
        heading: "为什么不是 DeepRead 式大愿景",
        paragraphs: [
          "早期很容易想把阅读器做成 AI 摘要、知识图谱、双语对照、云同步和智能书架的集合。但这些能力会快速拉高复杂度，也会把最核心的“打开就能听”稀释掉。",
          "DrowseBook 的立项选择是收缩：首版先把本地导入、格式解析、阅读位置、系统 TTS、后台播放和买断边界做稳。以后可以加智能能力，但不能牺牲离线、安静和可信。"
        ],
      },
      {
        heading: "商业考虑：买断产品也要先验证场景",
        paragraphs: [
          "阅读听书是一个有付费心智的品类，但独立开发者不能靠堆功能赢头部。DrowseBook 选择的是更清楚的价值交换：免费下载试用，想长期把自己的书架和听书流程放进去，再一次解锁。",
          "这类产品的课程价值也很高。它能讲清楚一个独立 App 怎么从竞品差评、场景定义、技术边界、隐私政策、商店页和审核策略一步步落地。"
        ],
      },
    ],
  },
  {
    slug: "drowsebook-quiet-ios",
    title: "02 · 开发哲学：安静工具类 iOS App 如何表达价值",
    category: "产品复盘",
    date: "2026-06-19",
    excerpt: "睡前听书、文件导入、TTS 和隐私边界，如何构成一个清晰的生活工具产品。",
    tags: ["DrowseBook", "产品哲学", "iOS"],
    productSlugs: ["drowsebook"],
    seriesOrder: 2,
    body: [
      "DrowseBook 的开发哲学可以压成一句话：用户的书永远在用户自己的设备上，用户只为工具付一次钱，阅读和听书过程不被账号、云端、订阅和弹窗打断。",
      "这句话不是文案，而是工程约束。它决定了不做账号、不做服务器、不做云 TTS、不接分析 SDK、不在播放中弹升级提示，也不把系统语音包装成单独收费的商品。",
      "安静工具的价值不是“显得高级”，而是每次打开都稳定、可预期、不越界。对睡前和通勤这种长时段场景来说，不打扰本身就是功能。"
    ],
    sections: [
      {
        heading: "先写不做清单",
        paragraphs: [
          "DrowseBook 一开始就排除月订阅、年订阅、账号系统、云同步、第三方 TTS、营销推送、启动权限弹窗和阅读中的评分请求。这些东西短期都可能带来增长指标，但会破坏用户最在意的安静感。",
          "不做清单越早写清楚，后面的取舍越简单。比如用户听书时能不能弹解锁卡？答案是不行，因为它直接打断播放和位置记忆。"
        ],
      },
      {
        heading: "用户的书就是用户的",
        paragraphs: [
          "阅读器和普通工具不一样，用户导入的是私人书籍、教材、文档和长期阅读进度。这类数据天然敏感，所以默认不需要账号，也不应该上传、分析或索引到远端。",
          "这会影响很多实现细节：文件复制到 App sandbox，阅读位置和书签存在本机，隐私政策说清楚不收集数据。产品越小，这种边界越要干净。"
        ],
      },
      {
        heading: "不要把听书变成付费陷阱",
        paragraphs: [
          "DrowseBook 不按分钟限制听书，也不把系统语音拆成高级语音包。用户在免费书架额度内导入的书，可以正常阅读和听书；只有当用户想扩展长期书架时，才遇到解锁卡。",
          "这种设计的好处是解释成本很低：不是试用三天后扣订阅，也不是听到一半突然没额度，而是清楚的书架边界和一次买断。"
        ],
      },
      {
        heading: "产品哲学会变成审核材料",
        paragraphs: [
          "当一个 App 没有账号、没有广告、没有服务器、没有第三方追踪时，隐私标签和审核说明会变得更简单。审核员也更容易理解它是一个本地文件工具，而不是内容平台。",
          "所以开发哲学不是写给自己看的口号，它最后会进入 App Store 描述、截图、隐私政策、支持页面和用户回复里。"
        ],
      },
    ],
  },
  {
    slug: "drowsebook-painpoints-to-spec",
    title: "03 · 痛点翻译：把听书产品差评变成功能清单",
    category: "产品复盘",
    date: "2026-06-18",
    excerpt: "从 TTS 跳段、PDF 误读、订阅争议和书架混乱，反推出 DrowseBook 的 23 条开发规格。",
    tags: ["用户痛点", "功能规格", "产品复盘"],
    productSlugs: ["drowsebook"],
    seriesOrder: 3,
    body: [
      "DrowseBook 的功能清单不是拍脑袋列出来的。它来自对同类听书和电子书 App 差评的拆解：每一条用户抱怨，都要翻译成一个可以落地、可以测试、可以写进商店页的产品约束。",
      "这里最重要的方法是不要停在“竞品不好用”的评价层，而是继续追问：这个差评背后的根因是什么？我们能不能用技术选择、交互边界或商业模式直接消掉它？",
      "当痛点被翻译成 spec，产品就不只是“功能多”，而是每个功能都在回应一个真实的不满。"
    ],
    sections: [
      {
        heading: "TTS 痛点变成系统语音策略",
        paragraphs: [
          "用户最怕听书时跳段、卡住、重复词、音量忽大忽小。DrowseBook 没有选择自研云端 TTS，而是先用 Apple 的 AVSpeechSynthesizer，原因很现实：系统语音在 iPhone 上稳定、离线、可后台播放，也不需要把文本发给第三方。",
          "这不是说系统语音音色永远最好，而是首版最重要的是可信。对阅读器来说，稳定读完比炫耀某个神经网络音色更重要。"
        ],
      },
      {
        heading: "PDF 痛点变成过滤层",
        paragraphs: [
          "PDF 听书最大的问题是版式噪音：页码、页眉、页脚、脚注、Figure、Table 都可能被读出来。用户听到这些会立刻觉得工具不懂书。",
          "因此 DrowseBook 给 PDF 加了一层启发式过滤：短数字行、重复页眉页脚、脚注、图表标题和极短独立行都优先跳过。它不是完美语义理解，但足够解决大部分听书场景的烦躁点。"
        ],
      },
      {
        heading: "书架痛点变成文件边界",
        paragraphs: [
          "有些产品会把用户引向自建书库，甚至让用户感觉自己已有的书又要再买一次。DrowseBook 的书架只服务用户导入的文件，不做推荐书店，不卖电子书。",
          "这条边界也降低了版权和审核复杂度：App 是工具，不是内容平台。支持格式必须讲清楚，DRM-free 必须讲清楚，不假装能读取用户无法合法访问的加密文件。"
        ],
      },
      {
        heading: "商业痛点变成买断模型",
        paragraphs: [
          "订阅取消困难、试用扣费、价格混乱，是同类产品里很典型的差评来源。DrowseBook 选择 Free 下载 + 一次买断 + 自愿支持档，而不是月费、年费和多个功能等级。",
          "这个选择会减少短期复杂变现空间，但它让用户理解成本非常低：想长期用就买断，不想买也不会在阅读过程中被逼。"
        ],
      },
    ],
  },
  {
    slug: "drowsebook-iphone-first",
    title: "04 · 平台选择：为什么从 iPhone-first 开始",
    category: "架构实现",
    date: "2026-06-17",
    excerpt: "从 Mac 阅读器转向 iPhone-first，不只是设备选择，而是听书场景、系统音频和购买路径的重排。",
    tags: ["iPhone", "平台选择", "移动场景"],
    productSlugs: ["drowsebook"],
    seriesOrder: 4,
    body: [
      "DrowseBook 曾经很容易被想象成桌面阅读器，但真正的场景把它推回了 iPhone：用户在路上、睡前、做家务、运动时听书，设备往往不在手里，耳机和锁屏控制反而成了核心体验。",
      "所以 iPhone-first 不是缩小产品，而是更贴近听书本质。首版先把手机上的导入、阅读、后台播放、锁屏控制、AirPods 跳转和睡眠计时做好，再谈 iPad 和 Mac。",
      "对独立开发来说，这也是一个重要判断：先选择最能验证核心场景的平台，而不是最容易写代码的平台。"
    ],
    sections: [
      {
        heading: "手机是听书设备，不只是阅读设备",
        paragraphs: [
          "传统阅读器容易从大屏幕出发思考，但听书是移动场景。用户可能关掉屏幕，只通过锁屏、控制中心和耳机完成暂停、继续、前后跳转。",
          "这意味着工程重点会变：后台音频、Now Playing、MPRemoteCommandCenter、睡眠定时和播放起点，比桌面三栏布局更早进入优先级。"
        ],
      },
      {
        heading: "iPhone-first 仍然要 universal-ready",
        paragraphs: [
          "首发聚焦 iPhone，不代表把后路堵死。项目架构仍然要为 iPad 和未来 Mac 预留：Bundle、购买类型、数据模型和页面结构都不能写成只能活在单端。",
          "这就是平台选择里容易被忽略的部分。真正的 iPhone-first 不是“只管 iPhone”，而是先用 iPhone 验证场景，同时让一次买断以后能自然扩展到更多 Apple 设备。"
        ],
      },
      {
        heading: "移动场景带来的交互约束",
        paragraphs: [
          "手机上阅读时，底部浮动控制条、Tab、工具按钮和系统安全区都很容易互相打架。DrowseBook 的阅读页必须保证工具按钮不会透传成翻页，TTS 控制条不能遮住正文，手动滚动时不能强行吸回当前句。",
          "这些问题看起来是 UI 细节，本质上是移动场景对产品的约束。睡前工具尤其不能让用户在半睡状态下和复杂界面搏斗。"
        ],
      },
      {
        heading: "课程启发：平台选择要反推用户动作",
        paragraphs: [
          "很多项目会先问“我会什么技术”，再决定做什么平台。DrowseBook 的做法相反：先列出用户真实动作，再看哪个平台最自然。",
          "如果用户动作是导入文件、锁屏听书、AirPods 前后跳、睡前自动停止，那么 iPhone 就不是一个版本选项，而是首发场景本身。"
        ],
      },
    ],
  },
  {
    slug: "drowsebook-tts-engine",
    title: "05 · 技术选择：为什么首版只用 Apple 系统 TTS",
    category: "架构实现",
    date: "2026-06-16",
    excerpt: "AVSpeechSynthesizer 不一定最炫，但它最符合离线、隐私、后台播放和稳定听书的首版目标。",
    tags: ["TTS", "AVSpeech", "隐私"],
    productSlugs: ["drowsebook"],
    seriesOrder: 5,
    body: [
      "听书产品最容易被“更像真人的声音”诱惑，然后把架构推向云端 TTS、API key、网络队列、费用计量和隐私解释。DrowseBook 首版刻意没有走这条路。",
      "AVSpeechSynthesizer 的优势不在营销，而在系统整合：离线可用、无需上传文本、支持后台音频、能接锁屏和控制中心，也能使用用户已经安装的系统语音。",
      "这个选择体现了一个独立产品的取舍：先把稳定的闭环做出来，再评估是否增加更高品质的可选语音，而不是一开始就把核心体验绑到外部服务。"
    ],
    sections: [
      {
        heading: "为什么不用云 TTS",
        paragraphs: [
          "云 TTS 的音色可能更吸引人，但会引入几个根本问题：用户书籍文本需要离开设备，播放依赖网络，API 成本会变成计费压力，隐私政策也必须说明第三方处理链路。",
          "对 DrowseBook 来说，这些代价和产品哲学冲突。它不是语音模型展示 App，而是一个把用户文件稳定读出来的本地工具。"
        ],
      },
      {
        heading: "句级队列比整段喂入更可控",
        paragraphs: [
          "听书不能只是把整章文本扔给系统语音。更好的做法是把文本切成句子队列，每句播放完推进下一句，并同步当前句高亮、进度和跳转。",
          "这样可以处理暂停、继续、上一句、下一句、章节切换和睡眠定时。播放起点也能和当前可见页面一致，避免用户点播放后突然从旧位置开始读。"
        ],
      },
      {
        heading: "后台播放是产品级能力",
        paragraphs: [
          "用户听书时经常会锁屏。DrowseBook 需要正确设置音频会话、Now Playing 信息和远程命令，让锁屏、控制中心、耳机和车载音响都能控制播放。",
          "这比在界面上做一个漂亮播放按钮更重要。真正的听书体验发生在屏幕熄灭之后。"
        ],
      },
      {
        heading: "保留未来语音升级，但不让它支配 v1",
        paragraphs: [
          "未来可以评估本地高品质 TTS 或用户自带语音模型，但它必须是可选增强，不能破坏离线、隐私和买断承诺。",
          "这也是技术选择的纪律：不要把一个还没验证的亮点技术放到产品主路径上。首版先让用户安心听完一本书。"
        ],
      },
    ],
  },
  {
    slug: "drowsebook-format-parsing",
    title: "06 · 格式支持：EPUB、PDF、TXT、MOBI、AZW3 如何进同一套阅读器",
    category: "架构实现",
    date: "2026-06-15",
    excerpt: "多格式支持不是堆解析器，而是把不同文件统一成章节、段落、句子和可朗读队列。",
    tags: ["EPUB", "PDF", "MOBI", "架构"],
    productSlugs: ["drowsebook"],
    seriesOrder: 6,
    body: [
      "DrowseBook 支持多种格式，但产品里真正需要的不是“五个解析器”，而是一套统一的阅读模型：书籍、章节、段落、句子、书签、当前位置和听书队列。",
      "不同格式的差异很大。EPUB 有 spine 和 XHTML，PDF 是版式文档，TXT 有编码问题，MOBI 和 AZW3 有历史包袱。用户不关心这些，他们只关心导入后能不能读、能不能听、位置会不会丢。",
      "所以开发重点是把格式差异收敛到同一个 BookContent 结构里，再让阅读、分页、TTS 和书签共用这套结构。"
    ],
    sections: [
      {
        heading: "EPUB 是最适合阅读器的格式",
        paragraphs: [
          "EPUB 天然有 manifest、spine、章节文件和目录结构，适合做章节级惰性加载。阅读器可以先打开 manifest，再按当前章节加载正文，而不是一开始把整本书塞进内存。",
          "这类结构很适合移动设备。用户看到第一页时，不需要整本书都解析完；目录也可以先出现，再逐步补齐分页和远处章节。"
        ],
      },
      {
        heading: "PDF 要承认自己不是流式文本",
        paragraphs: [
          "PDF 的难点是它本来面向版式，而不是流式阅读。把 PDF 直接当纯文本读，会带来页码、页眉、脚注和图表标题噪音。",
          "DrowseBook 对 PDF 的策略是务实：用系统 PDFKit 抽取文本，再加启发式过滤和按页/outline 切章。它不假装能完美理解所有复杂排版，但要把听书中最刺耳的问题先处理掉。"
        ],
      },
      {
        heading: "TXT 的重点是编码和切章",
        paragraphs: [
          "TXT 看起来最简单，实际上会遇到 UTF-8、UTF-16、GB18030、Big5、Shift-JIS 等编码。解析错误时，用户看到的不是技术问题，而是一整本乱码。",
          "因此 TXT 需要先做编码检测，再按段落边界切成可管理的章节。大文件不能一次性全部读成一个巨大的字符串，否则会和移动端内存模型冲突。"
        ],
      },
      {
        heading: "MOBI / AZW3 的难点是历史格式",
        paragraphs: [
          "MOBI 和 AZW3 的支持价值在于用户确实会有这些 DRM-free 文件，但它们不像 EPUB 那么自然适合现代阅读器。早期实现很容易走向全本一次解析，导致大书打开慢、内存高。",
          "后续优化的方向是把它们也切进章节级模型：先生成可复用的文本资源，再按范围惰性加载。这样才能和 EPUB、TXT、PDF 共用同一套分页、缓存和听书逻辑。"
        ],
      },
    ],
  },
  {
    slug: "drowsebook-large-book-performance",
    title: "07 · 大书性能：章节即原子和三章节热区",
    category: "架构实现",
    date: "2026-06-14",
    excerpt: "大 EPUB、长 PDF 和多格式书库想要秒开，关键是章节级惰性加载、分页缓存和内存热区。",
    tags: ["性能优化", "惰性加载", "缓存"],
    productSlugs: ["drowsebook"],
    seriesOrder: 7,
    body: [
      "阅读器最容易在小样本里显得完成：导入一本短书，翻几页，一切顺滑。但用户真正会导入几十 MB 甚至上百 MB 的合集、教材和长 PDF，这时一次性解析整本书会直接暴露问题。",
      "DrowseBook 的性能主线是“章节即原子”。每个章节独立解析、独立分页、独立缓存；运行时只保证当前章、前一章、后一章这个三章节热区。",
      "这套思路不只是阅读器工程，也是一种通用产品方法：大任务要拆成能被缓存、能被取消、能被恢复的小单位。"
    ],
    sections: [
      {
        heading: "为什么不能全书一次性排版",
        paragraphs: [
          "在 iOS 上，内存不是无限的，也没有桌面系统那样宽裕的交换空间。把整本书全部解析成段落、图片、链接和分页结果，会让大文件打开时间和内存占用一起失控。",
          "用户真正需要的是当前页立刻出现。总页数、远处章节和完整索引可以后台慢慢计算，首屏不能等它们。"
        ],
      },
      {
        heading: "章节即原子",
        paragraphs: [
          "Apple Books 这类成熟阅读器给出的启发很明确：章节是排版的基本单位。章节之间可以有硬边界，章节内保证连续；总页数是各章节分页结果的累加。",
          "这个选择会带来一点代价，比如章节末尾可能留白，但它换来了可控的内存、可缓存的分页和可以逐步展开的目录跳转。"
        ],
      },
      {
        heading: "三章节热区",
        paragraphs: [
          "运行时不需要保留整本书。更合理的策略是当前章 + 前一章 + 后一章，用户接近边界时预热下一轮相邻章节。这样向前向后翻页都不会突然卡住。",
          "如果系统发出内存压力，缓存可以降级到只保留当前章，同时把分页索引落盘，避免关闭重开又从零开始。"
        ],
      },
      {
        heading: "分页索引要能关闭重开复用",
        paragraphs: [
          "大书最烦人的体验是每次打开都重新计算页码。DrowseBook 的目标是同一本书、同一布局、同一字号和视口下，章节分页和全书页数索引都能复用。",
          "这要求缓存键把文件、章节、布局、字号、字体和音频句子队列这些变量说清楚。只要变量没变，计算结果就应该像常量一样复用。"
        ],
      },
    ],
  },
  {
    slug: "drowsebook-reader-ux",
    title: "08 · 阅读体验：不要让工具打断一本书",
    category: "设计系统",
    date: "2026-06-13",
    excerpt: "书架、阅读页、章节、书签、TTS 控制条和睡眠定时，都服务于一个目标：少打扰。",
    tags: ["阅读体验", "UI", "睡前模式"],
    productSlugs: ["drowsebook"],
    seriesOrder: 8,
    body: [
      "DrowseBook 的 UI 目标不是把功能都摆出来，而是让用户尽快进入自己的书。阅读器的高级感来自稳定和克制：按钮该有，但不抢正文；控制条该强，但不遮挡内容；付费入口该清楚，但不打断阅读。",
      "睡前工具尤其需要这种设计。用户可能已经很累，屏幕亮度很低，手上只有一只手，甚至很快会锁屏。界面越吵，越违背产品场景。",
      "这篇日志讲的是工具型 App 的 UI 边界：不是所有可用功能都应该出现在主路径上。"
    ],
    sections: [
      {
        heading: "启动后直接到书架或上次位置",
        paragraphs: [
          "DrowseBook 不需要开屏动画、CEO 介绍、强制 onboarding 或启动权限弹窗。第一次打开就显示空书架和导入入口；之后打开就回到用户上次阅读或听书的位置。",
          "这不是省设计，而是尊重场景。阅读器不是社交产品，不需要每次启动都重新教育用户。"
        ],
      },
      {
        heading: "阅读页只放必要 chrome",
        paragraphs: [
          "顶部工具栏负责字号、字体、章节、书签和听书入口。TTS 控制条只在听书时出现，并且浮在安全区上方；用户收起后播放仍可继续。",
          "这里的难点是命中区域。工具按钮必须吃掉自己的触摸事件，不能让一次点按钮误触成翻页。细节虽小，但直接决定产品是否像原生 App。"
        ],
      },
      {
        heading: "听书时的高亮要温柔",
        paragraphs: [
          "当前句高亮是听书的重要反馈，但不能像卡拉 OK 一样抢眼。DrowseBook 选择句级高亮和柔和滚动，让用户知道读到哪里，同时不把阅读页变成动效表演。",
          "用户手动滚动到别处时，也不应该强行吸回当前句。更好的做法是继续播放，并提供“回到当前句”的轻入口，让用户掌握控制权。"
        ],
      },
      {
        heading: "睡眠定时是场景功能，不是小插件",
        paragraphs: [
          "睡前听书最重要的功能之一是自动停止。5、15、30、60 分钟或章末停止，配合淡出和后台播放，才构成完整睡前体验。",
          "这种功能看似简单，但它让产品从“能播放文字”变成“适合睡前使用”。课程里可以把它作为场景化功能设计的例子。"
        ],
      },
    ],
  },
  {
    slug: "drowsebook-buy-once-iap",
    title: "09 · 商业化：一次买断为什么比订阅更适合它",
    category: "App Store",
    date: "2026-06-12",
    excerpt: "DrowseBook 的付费设计不按分钟、不卖语音、不做订阅，而是清楚的一次解锁和自愿支持档。",
    tags: ["IAP", "买断", "商业模式"],
    productSlugs: ["drowsebook"],
    seriesOrder: 9,
    body: [
      "DrowseBook 的商业化不是最后加一个付费墙，而是从立项开始就和产品哲学绑定：用户自己的书、系统语音、本地听书，不应该被设计成复杂的订阅陷阱。",
      "所以付费模型选择 Free 下载 + 一次买断 + 自愿支持档。用户可以先用有限书架体验导入、阅读和听书；如果长期使用，再一次解锁更多书架空间和后续升级。",
      "这个模型的核心不是价格，而是信任：不订阅、不按分钟、不卖系统语音、不把功能拆成很多等级。"
    ],
    sections: [
      {
        heading: "免费试用不是三天倒计时",
        paragraphs: [
          "DrowseBook 的试用边界放在书架数量上，而不是倒计时或播放时长上。用户在免费额度内可以正常阅读和听书，不会因为听到一半突然弹出订阅卡。",
          "这和睡前场景一致。任何在播放中出现的商业提示，都会让用户失去位置感和信任感。"
        ],
      },
      {
        heading: "主档和支持档同功能",
        paragraphs: [
          "自愿支持档不是更高级功能包，而是给愿意支持独立开发的人一个更高价格选择。两档功能一致，避免把产品变成 Pro、Plus、Ultra 的层层锁定。",
          "这种设计很适合个人开发者：把商业请求说清楚，而不是用复杂限制逼用户升级。"
        ],
      },
      {
        heading: "StoreKit 类型会影响未来承诺",
        paragraphs: [
          "一次买断必须用合适的非消耗型购买类型，并开启家庭共享。这样未来扩展到 iPad 或 Mac 时，已购用户不需要二次购买。",
          "这就是为什么 IAP 类型、商品结构和 Bundle 策略要在 Day 1 想清楚。上架后再改，往往会让老用户体验和口碑都受损。"
        ],
      },
      {
        heading: "商业化也要写进开发日记",
        paragraphs: [
          "很多教程只讲功能实现，不讲收费模型。实际做产品时，收费模型会反过来影响代码结构、UI 触发点、审核备注、隐私政策和用户支持。",
          "DrowseBook 很适合讲这一课：商业化不是贴一个 paywall，而是把价值交换设计成用户愿意相信的样子。"
        ],
      },
    ],
  },
  {
    slug: "drowsebook-app-store-review",
    title: "10 · 上架审核：Books 类和中国大陆可售性的坑",
    category: "App Store",
    date: "2026-06-11",
    excerpt: "DrowseBook 在 2026-05-13 被 Guideline 2.1 卡住：Books 类、内置样书和 China mainland 可售性必须在提交前单独决策。",
    tags: ["App Review", "中国大陆", "Books"],
    productSlugs: ["drowsebook"],
    seriesOrder: 10,
    body: [
      "DrowseBook 的审核经验很有教学价值：即使你把产品理解成工具，只要 App Store 类别、内置内容和可售地区组合在一起，审核就可能按内容分发规则处理。",
      "2026-05-13，DrowseBook v1.0 build 1 被 App Review 按 Guideline 2.1 - Information Needed 拒回。具体提交编号留在内部归档，审核设备是 iPad Air 11-inch (M3)。",
      "拒因核心是：App 包含或访问 book / magazine content，并准备在 China mainland 上架，但没有提供网络出版服务许可证。最后的处理不是改代码，而是在 App Store Connect 的 Pricing and Availability 里移除 China mainland，让其他地区继续推进。",
      "这件事给后续所有 App 一个明确教训：上架不是只检查 binary，类别、内容、地区和审核备注都要一起设计。"
    ],
    sections: [
      {
        heading: "为什么“只是工具”不一定够",
        paragraphs: [
          "从开发者视角看，DrowseBook 是一个本地阅读和听书工具；但从审核视角看，它的 Books 主类、商店页和内置样书都让它进入 book / magazine content 的审查路径。",
          "这不是审核员故意为难，而是 App Store Connect 的分类和地区规则会触发不同合规要求。产品实质、公开表达和后台配置必须一致。"
        ],
      },
      {
        heading: "中国大陆可售性要在立项阶段决定",
        paragraphs: [
          "China mainland 不是最后随手勾选的市场。Books、News、Games、宗教内容、音视频内容等类别，都可能触发特定许可要求。",
          "如果没有对应资质，最稳的策略是首发时明确关闭相关地区，而不是被拒后再临时补救。DrowseBook 这次能继续推进，是因为改的是可售地区，不需要重做 App，也没有重新上传 build。"
        ],
      },
      {
        heading: "内置样书也算信号",
        paragraphs: [
          "即使样书是公共领域内容，它仍然会让产品看起来包含或访问 book content。对一个阅读器来说，内置样书能帮助用户理解功能，但也会增加内容型审核信号。",
          "这不是说不能内置样本，而是要在类别、地区、审核备注和商店文案里提前处理。样书、截图、描述和可售区域不能彼此打架。"
        ],
      },
      {
        heading: "把拒审变成流程资产",
        paragraphs: [
          "这次经验后来沉淀进审核复盘和中国大陆可售性策略：提交前必须明确类别风险、可售地区、内置内容、审核备注和回退策略。尤其是中国大陆，不要默认全选。",
          "开发日记里记录这类内容很有价值。它让课程不只是“如何写 App”，还包括“如何让 App 顺利成为商品”。"
        ],
      },
    ],
  },
  {
    slug: "drowsebook-localization-aso",
    title: "11 · 本地化与 ASO：阅读器不能只翻译按钮",
    category: "App Store",
    date: "2026-06-10",
    excerpt: "DrowseBook 的本地化从 UI、商店关键词、截图、格式词和睡前场景一起做，而不是只替换字符串。",
    tags: ["本地化", "ASO", "App Store"],
    productSlugs: ["drowsebook"],
    seriesOrder: 11,
    body: [
      "DrowseBook 面向阅读和听书用户，本地化不能只把按钮翻译成不同语言。格式词、场景词、商店关键词、截图文案、隐私说明和支持页面都要一起对齐。",
      "比如 EPUB、PDF、TTS、sleep timer、bedtime、offline、DRM-free 这些词，不只是技术词，也是用户搜索词。商店页里怎么写，决定用户能不能在正确需求下找到产品。",
      "这篇日志适合讲 App Store 产品化：代码里的多语言、商店里的 ASO、官网里的落地页，是同一条转化链路。"
    ],
    sections: [
      {
        heading: "UI 语言和商店语言不是一回事",
        paragraphs: [
          "App 内可以支持更多界面语言，但 App Store 元信息不一定一开始就铺满所有语言。更实际的做法是先把重点市场的标题、副标题、关键词、截图和描述做深。",
          "如果只是机器翻译几十种语言，反而容易制造低质量信号。阅读工具尤其需要让母语用户相信它真的理解自己的使用习惯。"
        ],
      },
      {
        heading: "关键词来自真实功能",
        paragraphs: [
          "DrowseBook 的关键词不应该是泛泛的 AI、book、reader，而要围绕高意图组合：EPUB、PDF、TTS、read aloud、sleep timer、offline、bedtime、MOBI、AZW3。",
          "这些词必须和产品真实能力一致。ASO 不是堆词，而是把产品最能解决的需求放到用户搜索的语言里。"
        ],
      },
      {
        heading: "截图要证明不是换皮 App",
        paragraphs: [
          "阅读器的截图应展示真实书架、真实阅读页、TTS 控制条、格式支持、离线和无账号边界。不要用夸张合成图承诺“扫描封面就能读完整本书”。",
          "截图是审核材料，也是用户信任材料。越是独立开发者，越需要用真实界面降低怀疑。"
        ],
      },
      {
        heading: "官网承接多平台信息",
        paragraphs: [
          "App Store 页面负责下载转化，个人站和产品页负责承接更完整的说明：隐私政策、支持入口、开发日记、格式边界、审核经验和后续更新。",
          "这也是湖森堡个人站的意义：每个 App 不只是一个下载链接，而是一个可以持续复盘、教学和导流的产品节点。"
        ],
      },
    ],
  },
  {
    slug: "drowsebook-v11-iteration",
    title: "12 · 版本迭代：从 v1 到 v1.1 要补什么",
    category: "产品复盘",
    date: "2026-06-09",
    excerpt: "DrowseBook v1.1 的重点不是堆新功能，而是修补大书、进度、正在播放、收费口径和多语言上架。",
    tags: ["版本迭代", "产品复盘", "发布流程"],
    productSlugs: ["drowsebook"],
    seriesOrder: 12,
    body: [
      "一个 App 上架后，第一轮更新最容易犯的错是急着加新功能。DrowseBook v1.1 更值得记录的地方，是它把 v1 的基础体验继续补稳：大书打开、阅读/听书进度统一、正在播放卡片、收费墙口径和上架元信息。",
      "这类更新看起来不如新功能热闹，但对工具产品很重要。用户不会因为你有十个新入口留下来，用户会因为上次位置不丢、播放不乱跳、大文件不卡住而留下来。",
      "所以 v1.1 的开发日记可以作为一个“首发后修补周期”的样板。"
    ],
    sections: [
      {
        heading: "先修体验断点",
        paragraphs: [
          "DrowseBook 的核心断点集中在阅读和听书之间：用户翻页后点播放，应该从当前可见页面开始；听完一章后的状态要清楚；关闭重开以后页码和进度不能像重新计算一样乱跳。",
          "这些问题不一定出现在短书里，但一到大 EPUB、长 PDF 或跨章听书，立刻会影响信任。v1.1 的重点就是把这些边界收口。"
        ],
      },
      {
        heading: "收费口径要更简单",
        paragraphs: [
          "早期的付费逻辑如果和听书分钟数绑定，会让用户不安：我是在读自己的书，为什么听到一半突然遇到限制？",
          "v1.1 的方向是把口径简化到书架边界：免费额度内的书可以正常听；想长期管理更多书，买断解锁。越简单，越少误解。"
        ],
      },
      {
        heading: "版本更新也有上架流程",
        paragraphs: [
          "已经上线的 App 和首发 App 不一样。名称、副标题、关键词、截图和版本说明在 App Store Connect 里有不同锁定状态，不能等到提交时才临时补。",
          "DrowseBook v1.1 的经验是：程序包上传、版本号、构建号、元信息、隐私 URL、支持 URL、本地化语言和审核备注，都要独立台账化。"
        ],
      },
      {
        heading: "把迭代过程写成课程资产",
        paragraphs: [
          "首发讲的是从 0 到 1，v1.1 讲的是从可用到可信。两者都值得写进开发日记，因为真实产品成长往往发生在第二轮、第三轮修补里。",
          "这类文章以后可以直接变成课程案例：一个 App 上架后，怎么根据真实体验断点安排下一版，而不是为了更新而更新。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-market-research",
    title: "01 · 立项调研：为什么从麻将消除开始做游戏矩阵",
    category: "产品复盘",
    date: "2026-06-20",
    excerpt: "从关键词、头部产品、差评密度、能力匹配和商业模型判断一个小游戏是否值得做。",
    tags: ["立项", "市场调研", "游戏矩阵"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 1,
    body: [
      "Sumi Mahjong 的起点不是灵感，而是一份立项判断：这个赛道已经被头部验证过需求，但头部产品的主要差评集中在广告、订阅、误导和体验劣化上。",
      "这种项目适合独立开发者切入，因为核心玩法可以本地完成，商业化可以做得更克制，用户痛点也非常清楚：他们不是想要更复杂的系统，而是想要干净、安静、没有广告的一局游戏。",
      "所以立项时真正要回答的不是“我能不能写一个麻将游戏”，而是“这个项目能不能成为产品矩阵的第一块游戏样板”。"
    ],
    sections: [
      {
        heading: "需求面：头部验证过，但用户怨气集中",
        paragraphs: [
          "调研里最重要的信号是：麻将消除/麻将 solitaire 不是冷门需求，头部产品有大量评分和长期搜索流量。需求已经被别人花钱验证过，我们不需要从零教育用户。",
          "但低分评论显示，用户最不满的并不是麻将玩法本身，而是广告太多、付费后仍有广告、更新改坏体验、关卡和排行制造焦虑。这种痛点对独立开发者反而是机会，因为我们可以选择不走那套商业化路径。"
        ],
      },
      {
        heading: "供给面：差异化不是功能更多，而是更干净",
        paragraphs: [
          "这个项目的差异化不是做更多模式、更多活动、更多社交，而是做更少干扰。免费完整游玩、无广告、无账号、无服务器、一次买断主题，刚好对应头部产品被骂得最狠的地方。",
          "这也是为什么立项文档里会把“无广告”和“一次买断”放到核心位置。它不是营销话术，而是决定代码依赖、隐私政策、审核说明和截图文案的产品底座。"
        ],
      },
      {
        heading: "能力匹配：适合独立开发的本地游戏",
        paragraphs: [
          "麻将消除的优势是核心逻辑可以完全本地实现，不需要服务器、账号、实时联网或复杂后端。SwiftUI、SwiftData、StoreKit 2 足够支撑首发版本。",
          "难点也很明确：不是联网服务，而是玩法判定、布局生成、手感、美术资产和上架表达。对我们来说，这些难点都可以沉淀成教程和复用流程。"
        ],
      },
      {
        heading: "商业考虑：从单品到矩阵",
        paragraphs: [
          "Sumi Mahjong 不是孤立小游戏，而是验证“沉静、离线、无广告、买断”的游戏产品线。跑通以后，后续纸牌、蜘蛛纸牌、空当等产品可以复用部分架构和上架流程，但玩法必须独立。",
          "这也是教程价值所在：一个立项不是只写收入预估，而是要说明它在产品矩阵里的位置、可复用资产、审核风险和失败后的退路。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-ios-game",
    title: "02 · 开发哲学：为什么从一条不做清单开始",
    category: "产品复盘",
    date: "2026-06-19",
    excerpt: "先确定无广告、无账号、无服务器和不打断玩家，再决定游戏功能和商业模式。",
    tags: ["Sumi Mahjong", "产品哲学", "无广告"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 2,
    body: [
      "Sumi Mahjong 的起点不是“做一个麻将小游戏”，而是先写清楚什么绝对不做：不做广告、不做订阅压迫、不做账号系统、不做云端同步，也不在玩家放松的时候弹出各种运营打扰。",
      "这个产品的核心场景很窄：用户打开手机，玩几局安静的麻将消除。它不追求社交排行榜，也不追求每天把人拉回来打卡，而是把一次离线、干净、可暂停的体验做好。",
      "这种不做清单会反过来约束功能。比如进度必须本地保存，主题购买不能中途打断游戏，提示、撤销、洗牌都要服务于局内体验，而不是变成广告或付费压力的入口。",
      "从课程角度看，这一课最重要的是：产品边界不是最后写隐私政策时补出来的，而是在架构、交互和商业模式之前就要定下来。边界越早清楚，后面的技术选择越不容易走偏。",
      "所以 Sumi Mahjong 更像一个小而完整的产品样本：用最少的外部依赖，把玩法、审美、隐私和收入方式放在同一张桌子上一起设计。"
    ],
    sections: [
      {
        heading: "立项时先写反向边界",
        paragraphs: [
          "这类产品最容易滑向“看起来功能很多，实际体验很吵”：每日任务、排行榜、开屏引导、看广告续命、通关后弹评分、主题付费弹窗。Sumi Mahjong 的第一步不是列功能，而是把这些常见但会破坏安静体验的东西先排除。",
          "这个动作很像给产品画防火线。以后任何新想法进来，先问它有没有打断游戏、有没有让数据离开设备、有没有把一次买断变成持续压力。如果答案是有，就不进入 v1。"
        ],
      },
      {
        heading: "从用户痛点倒推功能",
        paragraphs: [
          "目标用户不是想要一个大型游戏系统，而是想要打开就能玩的单机麻将消除。于是功能优先级会自然变化：恢复上局比账号系统重要，真实截图比夸张广告文案重要，稳定的提示和洗牌比花哨动效重要。",
          "这也是为什么产品文案里要强调无广告、离线、一次解锁，而不是强调“AI”“社交”“成长体系”。用户的痛点不是玩法不够复杂，而是本来用来放松的小游戏越来越像运营工具。"
        ],
      },
      {
        heading: "商业化必须服从体验",
        paragraphs: [
          "这里的商业化不锁玩法。撤销、提示、洗牌、存档这些都属于游戏体验本体，如果把它们拆成收费点，短期可能多一点转化，长期会损坏产品的可信度。",
          "因此付费点被收束到视觉主题。玩家可以完整免费游玩，如果喜欢审美和手感，再一次性解锁更多主题。付费入口也只在用户主动点击锁定主题时出现，不进入局中流程。"
        ],
      },
      {
        heading: "开发日志的可复用价值",
        paragraphs: [
          "这篇日志能抽象成一节独立开发课：先写“不做清单”，再从痛点写功能，再把体验边界翻译成技术边界。不是每个产品都需要大而全，但每个产品都需要知道自己不是什么。",
          "后续复盘其它 App 时，也会沿用这条线：产品哲学不是口号，而是会影响路由、数据存储、付费入口、审核说明、截图文案和用户支持入口的一组工程约束。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-painpoint-to-spec",
    title: "03 · 痛点翻译：把差评变成功能清单",
    category: "产品复盘",
    date: "2026-06-18",
    excerpt: "真正有价值的差评不是拿来吐槽竞品，而是逐条翻译成开发 spec、测试项和上架文案。",
    tags: ["用户痛点", "功能推敲", "产品规格"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 3,
    body: [
      "Sumi Mahjong 的功能清单不是凭空列出来的，而是从头部产品的低分评论里反向推导出来的。用户反复抱怨广告、误导、更新劣化、卡死、存档丢失和客服失踪，这些都可以转成明确的开发任务。",
      "这一步很适合做成教程，因为它把“市场调研”变成了“工程约束”：每一条痛点都要对应一个产品承诺、一个代码边界、一个测试办法和一句商店表达。",
      "当差评被翻译成 spec，开发就不再只是做功能，而是在修复一类用户已经反复表达过的不满。"
    ],
    sections: [
      {
        heading: "广告痛点变成依赖约束",
        paragraphs: [
          "用户最强烈的抱怨是广告太多、太长，甚至付费去广告后仍然有广告。对应到开发层，不是做一个“关闭广告”的开关，而是从项目依赖层面就不集成广告 SDK。",
          "这会影响很多地方：没有广告域名请求，没有 SKAdNetwork 配置，没有奖励视频入口，也没有用看广告换提示或复活的设计。产品承诺必须能被代码结构证明。"
        ],
      },
      {
        heading: "误导痛点变成截图和命名约束",
        paragraphs: [
          "很多差评来自“广告里是另一个游戏”。这类问题不能只靠文案道歉解决，而要从上架素材阶段避免：截图必须来自真实 App，预览视频必须是真实玩法，名字和副标题必须讲清楚这是 tile match / solitaire。",
          "所以命名不只是 SEO，它也是合规和信任问题。用户进入商店页的三秒内，就应该知道这不是四人麻将，也不是广告里骗下载的另一套玩法。"
        ],
      },
      {
        heading: "玩法劣化痛点变成冻结规则",
        paragraphs: [
          "有一类差评很关键：用户原本喜欢这个游戏，后来更新加入竞争、段位、活动或关卡压力，放松感消失了。对应到 Sumi Mahjong，核心规则发版后要尽量冻结，后续主要加主题和布局，而不是改变游戏人格。",
          "这也是开发哲学的意义：不是所有增长手段都适合一个产品。对于安静类游戏来说，不破坏原来的安静感，比追逐新机制更重要。"
        ],
      },
      {
        heading: "客服痛点变成支持承诺",
        paragraphs: [
          "用户还会抱怨没有人工回复、AI 模板乱回。这个痛点对应到产品页和 App 内 About：要有真实联系方式，支持入口要可达，开发者回复承诺要具体。",
          "独立开发者的优势不是客服规模，而是真人感和责任感。开发日记本身也能成为一种支持：用户和学习者都能看到产品为什么这样设计。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-brand-identity",
    title: "04 · 命名品牌：从禅艺麻将到 Sumi Mahjong",
    category: "设计系统",
    date: "2026-06-18",
    excerpt: "中文名强调手艺感，英文名避开拥挤关键词，把水墨、安静和麻将识别放到同一个品牌里。",
    tags: ["命名", "品牌", "视觉方向"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 4,
    body: [
      "这个产品的中文名选择“禅艺麻将”，重点不在玄学化的“禅意”，而在“艺”：手工感、克制感、可长期打磨的牌面与主题。",
      "英文名没有直接使用拥挤的 Zen Mahjong，而是用了 Sumi Mahjong。Sumi 指向水墨和东方纸墨质感，既能保留安静气质，也更容易和 App Store 里大量同名产品区分开。",
      "名字确定后，视觉策略也跟着收束：免费主题先用水墨，牌面要保留麻将的基本识别，付费主题可以做敦煌、星空等方向，但不能变成完全换皮的独立 App。",
      "这里的关键不是做一个好看的图标，而是让名字、截图、商店文案、IAP 说明和游戏内主题都说同一件事：这是一个安静、离线、无广告、带东方牌面美感的消除游戏。",
      "对独立开发者来说，命名其实是早期产品设计的一部分。它能帮你删掉很多不合适的功能，也能让后续的介绍页、开发日记和课程案例都围绕一个稳定气质展开。"
    ],
    sections: [
      {
        heading: "名字不是装饰，是搜索和信任入口",
        paragraphs: [
          "如果只叫 Zen Mahjong，很容易陷入同类关键词混战，也容易让用户误以为这是普通的冥想包装小游戏。Sumi Mahjong 把焦点落在水墨、纸感、牌面工艺上，差异化更具体。",
          "中文名里的“艺”也很关键。它把产品从泛泛的“禅意”拉回到手艺和设计：牌面、桌布、字体、主题色、声音反馈都要服务这个词，而不是只在标题里出现一个东方味标签。"
        ],
      },
      {
        heading: "主题设计要保留麻将识别锚点",
        paragraphs: [
          "主题不是简单换肤。麻将牌有数量、相对排布、花色和特殊牌身份，如果把这些全部替换成抽象图标，用户会失去“这是麻将消除”的直觉。",
          "所以美术策略是语义替换：点元素可以换成花朵、星星或莲花，线元素可以换成枝叶、飘带或光束，但万字牌要保留汉字结构和数量识别。这样既能做主题化，也不牺牲玩法可读性。"
        ],
      },
      {
        heading: "避免变成低成本换皮",
        paragraphs: [
          "这类游戏很容易被看成“换主题不换玩法”。为了避免这个问题，主题必须是完整系统：牌面、牌背、桌布、色彩、字体、音效和截图预览都要成套，而不是只改几张图。",
          "更重要的是，不把每个主题拆成独立 App。所有主题留在同一个产品里渐进更新，既降低审核上的换皮风险，也让用户理解自己买的是一个持续维护的视觉包。"
        ],
      },
      {
        heading: "品牌会反向约束开发",
        paragraphs: [
          "当品牌定成“安静、离线、水墨、买断”，很多实现选择会自动变得清晰：不做夸张粒子，不做开屏广告，不做外部素材加载，不做需要账号才能同步的主题系统。",
          "这就是开发日记里值得记录的地方：设计不是最后包装代码，而是从命名开始就参与工程边界。一个名字选得准，后面很多功能会被自然删掉。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-ui-boundaries",
    title: "05 · UI 结构：安静游戏为什么要少做界面",
    category: "设计系统",
    date: "2026-06-17",
    excerpt: "从启动、主菜单、游戏视图、通关和主题选择，逐层删掉会打断玩家的界面噪音。",
    tags: ["UI", "交互", "安静体验"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 5,
    body: [
      "Sumi Mahjong 的 UI 设计不是为了显得功能丰富，而是为了让玩家尽快进入一局安静游戏。界面越多，越容易把休闲体验变成运营入口。",
      "所以 UI 结构从一开始就围绕一个原则：启动不打扰，游戏中不弹窗，通关不索评，主题付费只在用户主动触发时出现。",
      "这篇日志适合讲给想做工具或小游戏的人：很多时候高级感不是组件更多，而是知道哪些入口不应该出现。"
    ],
    sections: [
      {
        heading: "启动即进入状态",
        paragraphs: [
          "如果有未完成牌局，App 应该直接恢复；如果没有，就进入主菜单。没有开屏广告，没有强制 onboarding，没有欢迎动画，也不在启动时请求权限。",
          "这种设计来自使用场景：用户可能只是通勤、午休或睡前打开玩几分钟。多一步解释、多一个弹窗、多一次权限请求，都会损坏这类产品的心智。"
        ],
      },
      {
        heading: "游戏视图只保留必要控制",
        paragraphs: [
          "游戏中只需要牌堆、暂停、撤销、提示这类必要入口。计时器、段位、排行榜、剩余牌数、活动入口都会增加焦虑，不适合这个产品的定位。",
          "这里不是说所有游戏都不能有这些元素，而是 Sumi Mahjong 的差异化正是“不制造压力”。UI 必须服务产品哲学，而不是照搬游戏模板。"
        ],
      },
      {
        heading: "通关页面不做增长弹窗",
        paragraphs: [
          "通关后最容易塞进评分、分享、升级、关注账号、推荐其它产品。但对这类安静游戏来说，通关是一个放松闭环，不应该马上被商业动作打断。",
          "因此通关页只保留再来一局、切换主题、返回主菜单。用户如果主动去主题页，再展示付费主题；如果只是想继续玩，就不要横插一脚。"
        ],
      },
      {
        heading: "UI 也是审核材料的一部分",
        paragraphs: [
          "App Review 会看到实际界面。如果页面里有大量敬请期待、找不到 IAP 入口、截图和实际页面不一致，都会增加审核风险。",
          "所以 UI 结构不仅是体验设计，也影响审核说明和截图策略。我们要让审核员和用户在同一套界面里看到同一个产品。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-architecture-boundaries",
    title: "06 · 技术选择：为什么用 SwiftUI 而不是游戏框架",
    category: "架构实现",
    date: "2026-06-17",
    excerpt: "用 SwiftUI、SwiftData 和 StoreKit 2 做一个没有服务器依赖的 iOS 游戏骨架。",
    tags: ["SwiftUI", "StoreKit", "Local-first"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 6,
    body: [
      "Sumi Mahjong 的技术选型围绕一个原则展开：能在本地完成的事情就不要交给服务器。游戏进度、主题解锁状态、设置和统计都属于本地数据，网络不是默认能力。",
      "界面层使用 SwiftUI，数据持久化走系统能力，购买边界收束到 StoreKit 2。这样做的好处是工程结构更清楚：玩法引擎只关心牌、规则和局面，购买模块只关心主题解锁，页面只负责表达状态。",
      "这种架构也降低了隐私政策和审核解释成本。没有账号、没有广告 SDK、没有第三方分析，也就不会为了一个小游戏引入复杂的数据收集说明。",
      "真正需要重点保护的是玩法核心：匹配规则、局面生成、提示和洗牌逻辑要尽量独立，方便测试，也避免 UI 改动影响游戏判定。一个轻量产品越小，越需要把核心模块边界分清楚。",
      "这篇开发日记可以拆成一节实战课：如何在立项阶段把“不联网”的产品承诺翻译成模块边界、测试范围和商店审核材料。"
    ],
    sections: [
      {
        heading: "为什么选择系统框架",
        paragraphs: [
          "Sumi Mahjong 的技术栈故意很朴素：SwiftUI 负责界面，SwiftData 负责本地状态，StoreKit 2 负责一次性购买。这里没有第三方分析、付费 SDK、广告 SDK，也不把小产品过早复杂化。",
          "这不是保守，而是和产品承诺一致。一个强调离线、无账号、无广告的小游戏，如果一开始就塞进一堆外部 SDK，后面隐私说明、审核解释、崩溃排查和用户信任都会变重。"
        ],
      },
      {
        heading: "为什么不先上游戏框架",
        paragraphs: [
          "Sumi Mahjong 的主要难点不是实时物理、碰撞、角色动画或联网对战，而是牌堆布局、可选牌判定、提示可信度、主题资产和上架表达。用 SwiftUI 足够完成首发，并且能更快接入系统设置、StoreKit 和本地化。",
          "SpriteKit 或其它游戏框架不是被否定，而是放在边界清楚的位置：如果后续消除粒子、棋盘渲染或大量动画真的成为性能瓶颈，再把 VFX 层局部替换；不要为了“像游戏开发”而提前把整个项目复杂化。"
        ],
      },
      {
        heading: "模块边界怎么拆",
        paragraphs: [
          "核心拆法是把游戏引擎和界面分开。引擎只处理牌、位置、匹配、提示、洗牌和局面生成；视图层只处理点击、选中状态、动画和页面流转；购买模块只暴露主题是否解锁。",
          "这种拆法让后续维护简单很多。比如要改主题选择页，不应该影响匹配规则；要改购买卡片，不应该让游戏引擎知道商品信息；要改动画，也不应该改变一对牌能不能消除。"
        ],
      },
      {
        heading: "最难的不是写页面，而是防止边界被打穿",
        paragraphs: [
          "小项目常见问题是越写越随手：某个 View 直接读购买状态，某个按钮直接改游戏数组，某个提示功能又复制一份匹配逻辑。短期能跑，长期就会出现规则不一致。",
          "所以这里需要一条工程纪律：提示必须复用真实匹配函数，洗牌必须保留剩余牌分布，主题解锁必须只通过购买模块判断，局中不能弹出销售卡片。规则只有一份，入口可以有多个。"
        ],
      },
      {
        heading: "审核和隐私也受架构影响",
        paragraphs: [
          "当架构确定为本地优先，隐私政策就可以非常清楚：不收集数据、不追踪、不需要账号、不提供服务器功能。审核说明也能直接解释产品为什么没有登录、为什么没有网络能力。",
          "这也是个人站产品页要承接的内容：不是只放下载按钮，还要把产品边界、支持入口、隐私政策和开发思路讲清楚。技术架构最后会变成用户能看懂的信任表达。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-rules-generator",
    title: "07 · 玩法设计：不要太难，也不要太简单",
    category: "架构实现",
    date: "2026-06-16",
    excerpt: "从可选牌、同牌匹配、提示、洗牌和可解局面开始，搭出稳定的麻将消除核心。",
    tags: ["玩法算法", "生成器", "测试"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 7,
    body: [
      "麻将消除游戏看起来简单，但最容易出问题的地方正是“哪些牌现在能点”。如果规则含混，提示、洗牌、撤销和局面生成都会跟着变得不可信。",
      "Sumi Mahjong 没有走连连看式的路径连接规则，而是围绕堆叠麻将的直觉来做：上层覆盖会阻止选择，同层需要有开放边，只有真正自由的牌才进入匹配候选。",
      "提示不能只找一张看起来自由的牌，而必须复用真实匹配规则。否则用户点了提示却不能消除，会直接破坏信任。洗牌也是同一个道理：它不是随机打乱，而是在保留进度的前提下重新找出可继续的局面。",
      "局面生成最重要的是可解性。开发时可以从“先有一条可完成序列”倒推布局，再用评分和模板把局面变得更自然，而不是把随机结果交给玩家承担。",
      "这部分是很适合做成课程案例的：同样是小工具，凡是涉及规则、推荐、提示或自动化，都应该先建立一个可测试的核心判定函数，再让 UI 和动画围绕它展开。"
    ],
    sections: [
      {
        heading: "先废弃不适合的旧规则",
        paragraphs: [
          "早期容易想到连连看的“两次拐弯路径”规则，但它和堆叠麻将的视觉不完全匹配。玩家看到的是上下层压住、边缘可取走的牌，而不是平面连线。",
          "因此主规则改成更接近 Mahjong Solitaire 的直觉：被上层覆盖的牌不能点，同层需要有通向外部空间的开口，特殊情况下同层相邻的同身份牌可以作为局部对子消除。"
        ],
      },
      {
        heading: "难点一：自由牌不是简单看四周有没有空",
        paragraphs: [
          "如果只判断某一边有没有空格，会把封闭内腔里的牌误判成可以和外部牌消除。真实体验里，这种牌看起来有空隙，但它并不真的能从外部取走。",
          "所以需要把每一层的空白区域分成外部空间和封闭内腔。只有开口连到外部空间，才算基础自由牌；如果两张同身份牌连到同一个封闭内腔，它们可以在局部空间内消除，但不能跨空间乱配。"
        ],
      },
      {
        heading: "难点二：提示必须等于真实可消除",
        paragraphs: [
          "提示功能看起来只是遍历一下牌，但它最容易做错。如果提示只看单张牌是否自由，而不调用完整匹配规则，就可能提示出一对实际不能消除的牌。",
          "正确做法是所有入口都复用同一个 canMatch 判定：玩家点击、提示、死局检测、自动重排都走同一套规则。这样 UI 不会和引擎产生两个版本的真相。"
        ],
      },
      {
        heading: "难点三：生成器要先保证可解",
        paragraphs: [
          "随机摆牌会制造一种假自由：画面看起来有局，但很快死局。一个稳定的游戏不能把这种风险交给玩家承受，所以生成器要先构造一条可清空序列，再把牌反向放入布局。",
          "然后再用评分机制挑选更自然的局面：开局可选对子不能太少，也不能所有对子都挤在一起；上层要有支撑，底层要足够展开，手机上还要保证触摸尺寸和层次可读性。"
        ],
      },
      {
        heading: "从算法到课程案例",
        paragraphs: [
          "这篇日志能讲的不只是游戏算法。很多 AI 办公工具也会遇到同样的问题：推荐、提示、自动修复、批处理都必须依赖一个可信的核心判定，而不是在界面上各写一套近似逻辑。",
          "所以课程里可以把这个模块抽象成“规则函数优先”的方法：先定义真相，再做 UI，再做辅助能力。这样产品越迭代，越不容易因为入口变多而失控。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-replayability-layout",
    title: "08 · 耐玩性：随机布局不是随便乱放",
    category: "架构实现",
    date: "2026-06-15",
    excerpt: "无关卡、无排行、无签到的游戏，如何靠可控随机、能力感和反馈维持复玩。",
    tags: ["随机布局", "耐玩性", "游戏设计"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 8,
    body: [
      "Sumi Mahjong 不靠每日任务、体力、段位和排行榜维持留存，所以耐玩性必须来自每一局本身：局面有变化、规则可信、难度适中、反馈舒服。",
      "真正的难点不是让牌随机，而是让随机在约束里发生。随机得太弱，每局都像同一局；随机得太强，又会变成难以读懂或很快死局的混乱牌堆。",
      "这篇日志讲的是一个小游戏很核心的平衡：不要太难，也不要太简单。"
    ],
    sections: [
      {
        heading: "为什么默认不是 144 张",
        paragraphs: [
          "传统麻将牌有 144 张，但手机竖屏空间有限。把所有牌硬塞进去会导致牌体过小、层级难读、点击不舒服，最后看起来像网页小游戏。",
          "因此默认手机局更适合做成较少牌数的舒适局，例如 72 张。它保留堆叠层次，又让每张牌有足够触摸面积。后续可以提供 56 / 72 / 96 这类档位，而不是一开始追求最大数量。"
        ],
      },
      {
        heading: "可控随机的核心",
        paragraphs: [
          "布局生成不是把牌面随机撒到棋盘上，而是先定义合法物理结构：同层不重叠，上层有支撑，底层最多，越往上越少，中部稳定，边缘轮廓随 seed 变化。",
          "然后在合法结构里构造可解序列，再把牌面反向放回。这样既有变化，也能保证不是开局死局。"
        ],
      },
      {
        heading: "难度靠开局选择空间调节",
        paragraphs: [
          "如果开局可消对子太少，玩家会觉得卡；如果太多，玩家会觉得没有思考。比较好的策略是生成多个候选局面，然后按开局可选对子数量、相同对子相邻程度、层级密度等指标评分。",
          "这类评分不需要一开始极端复杂，但必须存在。没有评分的随机，最后会把难度控制交给运气。"
        ],
      },
      {
        heading: "耐玩性不能靠焦虑机制",
        paragraphs: [
          "这个项目明确不做签到、体力、广告续命、段位降级和强制每日任务。复玩来自自主感和能力感，而不是错过恐惧。",
          "这对课程也很重要：很多产品不是没有留存能力，而是把留存误解成打扰。独立开发者可以选择更长期、更干净的复玩机制。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-vfx-feedback",
    title: "09 · 手感动效：反馈要爽，但不能遮挡下一步",
    category: "设计系统",
    date: "2026-06-14",
    excerpt: "消除动效属于 VFX 层，不应该侵入玩法引擎，也不能为了炫技拖慢操作节奏。",
    tags: ["动效", "手感", "性能"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 9,
    body: [
      "游戏手感不是锦上添花。对于麻将消除这种简单玩法，点击、选中、配对成功、配对失败、通关的反馈，会直接影响用户是否觉得这个产品“像个完整游戏”。",
      "但动效也不能反客为主。它要让玩家知道自己做对了，而不是遮住棋盘、拖慢下一步、或者为了粒子效果去修改玩法逻辑。",
      "所以 Sumi Mahjong 把动效放在独立 VFX 层：玩法引擎只给出结果，动画层负责表达结果。"
    ],
    sections: [
      {
        heading: "成功消除应该有明确奖励感",
        paragraphs: [
          "两张牌成功消除时，可以先轻微浮起，再向中心点靠拢，碰撞后爆出纸屑、雪片或水墨碎片。这个反馈能让用户获得“我做对了”的即时确认。",
          "反馈不一定要真实物理，休闲游戏的动效本来就可以略夸张。但持续时间要可控，不能让用户等动画结束才能继续理解棋盘。"
        ],
      },
      {
        heading: "失败反馈要轻，不要惩罚",
        paragraphs: [
          "点击不可消的第二张牌时，不应该弹错误框，也不应该播放刺耳声音。轻微抖动、取消高亮、触觉提示就够了。",
          "这种克制和产品哲学一致：玩家是在放松，不是在接受系统训斥。失败反馈越轻，用户越愿意继续尝试。"
        ],
      },
      {
        heading: "动效不能进入 Engine",
        paragraphs: [
          "动效层只读取消除事件、起点、终点和主题配置，不应该改 MatchRule、Solver 或 LayoutGenerator。否则以后调粒子参数，可能无意影响玩法判定。",
          "这条边界能复用到很多产品：视觉反馈可以很丰富，但业务真相必须只有一份。UI 层表达结果，不负责制造结果。"
        ],
      },
      {
        heading: "性能验证不能凭感觉",
        paragraphs: [
          "粒子数量、透明 PNG、模糊、阴影、动画时长都会影响帧率。开发时可以先用 SwiftUI 快速做，但需要预留配置和录屏验证，必要时再局部评估 SpriteKit 或更轻的渲染方式。",
          "这也是为什么动效文档要独立存在：它不是随手调参数，而是一个可以被录屏、截图、帧率和遮挡时间验证的模块。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-asset-performance",
    title: "10 · 性能优化：从实时绘制到 PNG 烘焙",
    category: "架构实现",
    date: "2026-06-13",
    excerpt: "几百张牌如果都靠运行时组合绘制，最终要转成合适的 PNG 资产管线来保证流畅度。",
    tags: ["性能优化", "资产管线", "PNG"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 10,
    body: [
      "麻将游戏的性能问题很容易被低估：一局里可能有几十到上百张牌，每张牌都有牌体、牌面、阴影、层级、选中状态和动画。如果全部运行时动态组合，手机上很快会出现掉帧或发热。",
      "Sumi Mahjong 的资产流程采用两阶段：开发阶段用代码实时绘制牌体并叠加透明牌面，方便调试；视觉确认后，把完整牌面烘焙成 PNG，运行时直接使用静态资源。",
      "这篇日志讲的不是美术，而是产品落地里的性能工程：什么时候用代码生成，什么时候转成资产，什么时候让机器校验替代人眼感觉。"
    ],
    sections: [
      {
        heading: "先用代码快跑，再用资产稳定",
        paragraphs: [
          "开发早期用代码绘制牌体很有价值，因为可以快速调整边框、阴影、比例、圆角和牌面位置。但这不代表最终上线也必须实时绘制每个细节。",
          "一旦视觉方向稳定，就应该把牌体和牌面烘焙成完整 PNG。这样运行时只需要绘制图片，减少布局和组合成本，也更容易保证不同设备上的一致性。"
        ],
      },
      {
        heading: "AI 美术输出不能直接信任",
        paragraphs: [
          "AI 生成的图集经常会出现尺寸不准、格子偏移、元素数量错误、符号太细、万字不可读等问题。看起来风格对了，不代表能进入游戏。",
          "因此需要语义骨架、裁切预览、数量检查、透明背景、边距校验和游戏内 sample 预览。美术资产也要有测试，而不是只靠审美判断。"
        ],
      },
      {
        heading: "主题不是滤镜，是语义系统",
        paragraphs: [
          "筒、条、万、字牌、花季牌各自有不同语义。主题可以把筒换成莲花或星核，把条换成飘带或光束，但数量和相对位置必须稳定。",
          "尤其是万字牌，它是整套牌的麻将识别锚点。完全改成抽象图标会让玩家失去识别感，所以更适合保留汉字结构，只调整笔触、材质和装饰。"
        ],
      },
      {
        heading: "性能优化也是课程资产",
        paragraphs: [
          "这个案例能讲清楚一个很常见的独立开发取舍：不要一开始就把流程做重，但也不要把原型期方案直接当最终方案上线。",
          "先用快速方案验证玩法和视觉，再用脚本、校验和烘焙把资产稳定下来。这个流程以后做 App Store 截图、图标生成、主题包、课程素材都能复用。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-art-iap",
    title: "11 · 商业化：主题买断不能打断安静体验",
    category: "App Store",
    date: "2026-06-15",
    excerpt: "免费完整玩法加一次买断主题，把美术工作流和 IAP 设计放进同一个体验边界里。",
    tags: ["主题设计", "IAP", "App Store"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 11,
    body: [
      "Sumi Mahjong 的商业化没有放在关卡、体力或广告上，而是放在主题。用户免费下载后可以完整游玩，喜欢这个产品的人再通过一次买断解锁更多视觉主题。",
      "这样做要求主题不是随手换色。每一套主题都要保留麻将语义：数字、花色、特殊牌的关系不能乱，牌面必须在小屏幕上可读，整体风格要和桌布、主题色、声音反馈一起成立。",
      "美术流程也因此变成一个工程问题：先定义牌面语义骨架，再生成或绘制完整图集，随后裁切、透明化、检查尺寸和数量，最后在真实游戏界面里确认可读性。",
      "买断入口也要克制。锁定主题可以在主题选择页出现，但不应该在玩家局中突然弹出。商业化是产品的一部分，不是对用户注意力的突袭。",
      "这一课的价值在于把 App Store 审核、4.3 换皮风险、视觉系统和 IAP 体验放在一起看。一个小产品想长期稳定，不能只会写功能，还要会设计它如何被理解、购买和维护。"
    ],
    sections: [
      {
        heading: "为什么付费点放在主题",
        paragraphs: [
          "如果小游戏靠广告变现，就会和“安静放松”的核心价值冲突；如果靠订阅变现，又很难解释用户每个月持续获得了什么服务。主题买断是更自然的中间解法。",
          "免费用户可以完整玩水墨主题，付费用户一次性解锁更多视觉主题。这样玩法不被切碎，付费也更像审美选择，而不是功能勒索。"
        ],
      },
      {
        heading: "主题资产不是生成图片就结束",
        paragraphs: [
          "一个主题至少要经过语义骨架、元素库、牌面图集、裁切、透明化、烘焙、游戏内预览这些步骤。任何一步只要偷懒，最终就会在小屏幕上变成不可读或廉价的素材堆。",
          "尤其是麻将这种有强识别结构的题材，不能只追求风格化。数字数量、相对排布、花色差异、特殊牌轮廓都要保住，否则用户会在玩的时候不断停下来辨认。"
        ],
      },
      {
        heading: "IAP 入口怎么设计才不打断",
        paragraphs: [
          "购买入口只应该出现在用户主动触发锁定主题时。它可以展示主题预览、一次买断按钮、稍后再说和恢复购买，但不应该在游戏中途、通关后或启动时突然出现。",
          "这背后是一条体验原则：商业化不是打断用户注意力的机会，而是当用户表达兴趣时给出明确选择。对安静类产品来说，克制本身就是转化资产。"
        ],
      },
      {
        heading: "审核风险要提前设计",
        paragraphs: [
          "主题型小游戏容易遇到两个风险：一个是被认为低成本换皮，另一个是订阅或付费描述不清。解决方式不是等被拒后补说明，而是在产品结构里提前避免。",
          "同一个 App 内持续追加完整主题，不拆多个换皮 App；只做一次买断，不做订阅和限时倒计时；截图和说明清楚展示免费玩法和付费主题。审核材料就会和真实体验一致。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-review-localization",
    title: "12 · 上架审核：把离线、无广告和买断说清楚",
    category: "App Store",
    date: "2026-06-14",
    excerpt: "Sumi Mahjong 的上架复盘：离线、无广告、买断要写清楚，设备族和截图槽位也要在提审前对齐。",
    tags: ["App Store", "本地化", "审核"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 12,
    body: [
      "Sumi Mahjong 的上架准备不是最后写几句描述，而是把前面的产品哲学、技术架构和商业模式翻译成商店页、隐私政策、IAP 说明和截图标题。",
      "如果产品承诺是离线、无广告、一次买断，那么审核材料也必须保持一致：不要在截图里夸张玩法，不要把主题解锁写成会员，不要让用户误以为这是四人麻将，也不要把隐私说明写得含糊。",
      "本轮资料里没有找到 Sumi 的正式 App Review 拒审信；真实发生的是提审前 ASC 阻塞：build 1 声明支持 iPad，版本页就要求 13-inch iPad 截图。处理方式是改成 iPhone-only build 2，重新上传并替换版本页构建。",
      "这篇日志关注的是落地阶段：如何让 App Store Connect 里的字段、截图、IAP 展示、本地化文案、Review Notes 和构建设备族都围绕同一个真实体验。"
    ],
    sections: [
      {
        heading: "第一步：把产品边界写成审核语言",
        paragraphs: [
          "审核员真正关心的是用户会不会被误导、数据会不会被收集、付费项是否清楚、App 是否有足够价值。Sumi Mahjong 的回答必须非常直接：完整玩法免费，付费只解锁视觉主题，没有广告，没有账号，没有服务器服务。",
          "这类说明最好从产品结构里长出来，而不是临时编。因为 App 如果真的没有广告 SDK、没有账号系统、没有外部服务，那么隐私页、审核备注和用户支持都会很容易统一。"
        ],
      },
      {
        heading: "第二步：避免名字和截图误导",
        paragraphs: [
          "麻将这个词容易让人误以为是四人麻将，所以副标题和描述要讲清楚这是 tile match / solitaire 类型的消除游戏。截图也要真实展示局面，不用夸张广告图暗示不存在的玩法。",
          "本地化时也要保持这个边界。繁中、简中、英文、日文、韩文可以用不同语感表达，但核心信息不能漂移：无广告、离线、一次买断、安静游玩、主题美术。"
        ],
      },
      {
        heading: "第三步：IAP 文案要降低误解",
        paragraphs: [
          "一次买断主题解锁不能写得像订阅会员，也不能让用户以为基础玩法被锁住。购买卡片和商店说明都要明确：免费主题可完整游玩，付费解锁当前和后续的高级主题。",
          "恢复购买、稍后再说、价格展示也要在同一界面里清楚出现。越是小产品，越不能靠模糊文案做转化，因为一旦用户误解，差评和审核风险都会回来。"
        ],
      },
      {
        heading: "第四步：提审前先对齐设备族和截图槽位",
        paragraphs: [
          "2026-05-19，Sumi Mahjong 的 build 1 已经上传并关联到 1.0 版本页，ASC 读回状态为 VALID，但 Add for Review 前提示必须补 13-inch iPad 截图。根因不是截图少，而是 build 1 的 UIDeviceFamily 声明为 iPhone + iPad。",
          "这次修复没有硬凑 iPad 图。因为首发真实产品并不支持 iPad，所以工程改为 iPhone-only，构建号递增到 build 2，重新归档上传，ASC 读回 VALID 后替换到 1.0 版本页。这个动作比临时生成不真实的 iPad 截图更诚实。"
        ],
      },
      {
        heading: "第五步：把审核资料变成课程材料",
        paragraphs: [
          "这类上架过程很适合转成课程：从产品定位开始，到隐私政策、支持页、截图标题、IAP 说明、Review Notes，每一步都能展示一个独立开发者如何把 App 从代码带到商店。",
          "对个人站来说，这些内容还能反向沉淀成产品页和开发日记。用户看到的是产品可信度，学习者看到的是完整落地流程，开发者自己也能复用下一款 App 的审核框架：Content Rights、China mainland / Vietnam、截图尺寸、IAP 和 Review Notes 都要读回。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-milestone-audit",
    title: "13 · 开发周期：四周计划和完成审计怎么做",
    category: "架构实现",
    date: "2026-06-12",
    excerpt: "把周 0 准备、玩法核心、UI、美术、上架和最终审计拆成能执行、能验证的节奏。",
    tags: ["开发周期", "测试", "完成审计"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 13,
    body: [
      "一个独立 App 如果只靠感觉推进，很容易在 80% 的地方停住。Sumi Mahjong 的开发周期被拆成周 0 准备期、周 1 玩法核心、周 2 UI 与存档、周 3 美术资产、周 4 变现与上架。",
      "这个拆法的价值不只是排期，而是每个阶段都有明确的完成标志：哪些 spec 被解决、哪些测试通过、哪些截图和 URL 可用、哪些审核材料已经读回。",
      "开发日志里记录周期和审计，是为了让教程不只讲“我做了什么”，还讲“我如何判断它真的可以进入下一步”。"
    ],
    sections: [
      {
        heading: "周 0 是很多人忽略的准备期",
        paragraphs: [
          "周 0 不写核心功能，而是做上架和项目基础准备：占位 App、隐私和支持 URL、IAP 类型、字体和素材许可、测试设备、母语者校对、空白工程能否编译。",
          "这一步看起来不刺激，但它决定后面会不会被 App Store、素材版权、URL 404 或设备适配卡住。独立开发最怕的是代码写完，交付材料没准备。"
        ],
      },
      {
        heading: "周 1 先冻结玩法核心",
        paragraphs: [
          "游戏项目第一周要优先完成 Engine：牌模型、位置、匹配规则、布局生成、提示、撤销、死局检测。UI 可以很丑，但核心规则必须可测试。",
          "这和普通工具 App 不同。游戏的核心玩法一旦不稳，后面所有美术、动效和推广都会建立在沙地上。"
        ],
      },
      {
        heading: "周 2 到周 3 是体验和资产",
        paragraphs: [
          "第二周把主菜单、游戏视图、通关、暂停、设置、关于和 SwiftData 存档补齐。第三周集中做牌面、桌布、图标、截图和视频脚本。",
          "这里的顺序很重要：先让临时牌堆能玩，再换正式美术。否则很容易沉迷画面，结果规则和存档还没跑通。"
        ],
      },
      {
        heading: "完成审计是最后一道门",
        paragraphs: [
          "完成审计不只是写一句“已完成”。它应该列出测试、预检、隐私、网络、IAP、截图、元信息、构建上传、设备适配和审核备注的证据。",
          "Sumi Mahjong 后来遇到 iPad 截图要求，就是典型审计课题：构建声明了 iPad 支持，App Store Connect 就会要求 iPad 截图。解决方案不是随便补图，而是回到产品决策，确认首发是否真的支持 iPad。"
        ],
      },
    ],
  },
  {
    slug: "sumi-mahjong-matrix-promotion",
    title: "14 · 推广复盘：从单个 App 到产品矩阵资产",
    category: "AI 工作流",
    date: "2026-06-11",
    excerpt: "开发日记、上架资料、截图、官网、社交平台和矩阵复用，最终都要沉淀成下一款产品的资产。",
    tags: ["推广", "产品矩阵", "复用"],
    productSlugs: ["sumi-mahjong"],
    seriesOrder: 14,
    body: [
      "Sumi Mahjong 的最后一层价值，不只是一个上架的小游戏，而是它把一整套流程跑通了：立项、痛点、开发哲学、功能推敲、架构、资产、IAP、审核、落地页和推广素材。",
      "这套流程可以变成网站上的开发日记，也可以变成视频脚本、课程章节、B 站/小红书/YouTube 的内容选题，甚至变成后续产品的开发 checklist。",
      "所以开发日记不是附属内容，而是核心资产。每写完一个项目，就多了一套可复用的产品方法论。"
    ],
    sections: [
      {
        heading: "个人站承接所有入口",
        paragraphs: [
          "单独的 GitHub Pages 落地页可以服务某个 App，但个人站更适合做长期流量沉淀：产品页、隐私政策、开发日记、课程入口、社交账号和下载入口都在同一个域名下。",
          "用户可以从 App Store、GitHub、视频平台或社交媒体进来，最终都能回到同一个个人空间。这是比单个平台链接更稳的结构。"
        ],
      },
      {
        heading: "开发日记可以拆成多平台内容",
        paragraphs: [
          "一篇开发日记可以变成不同形态：长文放个人站，短视频讲一个具体坑，B 站做完整教程，小红书做图文拆解，YouTube 做英文或长视频版本。",
          "比如“为什么不用游戏框架”“为什么把主题买断而不是订阅”“iPad 截图要求怎么来的”“AI 美术为什么要语义校验”，每个都可以单独成为传播点。"
        ],
      },
      {
        heading: "矩阵复用不是换皮",
        paragraphs: [
          "麻将跑通后，可以复用 SwiftUI、SwiftData、StoreKit、隐私政策、截图生成、上架流程和个人站页面结构。但下一款不能只是换主题，必须换玩法和产品身份。",
          "这也是 Apple 4.3 风险要求我们提前保持纪律：代码架构可以复用，产品体验必须不同。"
        ],
      },
      {
        heading: "公开素材怎么协同",
        paragraphs: [
          "公开内容要从真实证据出发：代码、技术文档、性能、截图、构建、商店材料、平台反馈和运营观察都需要相互校准。",
          "个人站上的开发日记不是内部资料搬运，而是把可分享、可学习、可复用的过程整理成读者能理解的公开记录。"
        ],
      },
    ],
  },
];

const productFallbackBody = (article: ArticleSeed, productNames: string) => [
  article.excerpt,
  `关联产品：${productNames || "待补充"}。这篇开发日记目前先作为栏目骨架，后续会补充完整开发过程、关键截图、提示词、技术选择和发布复盘。`,
  "本站的开发日记不是单纯写工具介绍，而是把真实产品从需求、设计、实现、上架、运营和复盘拆开，形成可以学习和复用的案例。",
];

const articleBodyLength = (body: string[], sections?: ArticleSection[]) =>
  [
    ...body,
    ...(sections ?? []).flatMap((section) => [section.heading, ...section.paragraphs]),
  ].join("").length;

const cleanClause = (value: string) => value.trim().replace(/[。；;,.，]+$/u, "");

const ensureProductDiaryDetail = (
  article: ArticleSeed,
  body: string[],
  productNames: string,
  diaryKind: DiaryKind,
) => {
  if (diaryKind !== "product" || articleBodyLength(body, article.sections) >= 1500) {
    return body;
  }

  const relatedProducts = article.productSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));
  const primaryProduct = relatedProducts[0];
  const sourceNote = primaryProduct
    ? productDiarySourceNotes[primaryProduct.slug] ?? defaultProductDiarySourceNote
    : defaultProductDiarySourceNote;
  const label = productNames || "这个产品";
  const platforms = [...new Set(relatedProducts.flatMap((product) => product?.platforms ?? []))].join(" / ") || "待补平台";
  const statuses = [...new Set(relatedProducts.flatMap((product) => product?.status ?? []))].join(" / ") || "持续迭代";
  const featureText = relatedProducts.flatMap((product) => product?.features ?? []).slice(0, 6).join("、") || "核心功能、边界、体验和发布材料";
  const buildText = relatedProducts.flatMap((product) => product?.buildNotes ?? []).slice(0, 4).map(cleanClause).join("；") || "需求、实现、审核和推广都要留下可复盘记录";
  const courseText = relatedProducts.flatMap((product) => product?.courseHooks ?? []).slice(0, 5).join("、") || "需求拆解、AI 协作、上架和复盘";
  const privacyText = relatedProducts.map((product) => product?.privacy.note).filter(Boolean).map(cleanClause).join("；") || "隐私、权限和数据流需要和实际实现保持一致";
  const sourceAreas = sourceNote.sourceAreas.join("、");
  const sourceRecords = sourceNote.records.join(" ");

  return [
    ...body,
    `开发细节补充：这篇记录放在 ${label} 的产品日记里，不是为了把一个功能包装成故事，而是把“${article.title}”放回真实项目推进中看。它要同时回答三件事：用户为什么需要这个点，开发时哪些边界必须先定住，以及这个选择会怎样影响上架、推广和后续课程复盘。平台口径是 ${platforms}，当前公开状态是 ${statuses}，所以文案不能脱离真实发布进度。`,
    `对应的 docs 线索主要来自 ${sourceAreas}。公开页面不会照搬内部工作记录，而是把可公开、可学习、不会泄露私密路径和账号信息的事实整理出来。${sourceRecords}`,
    `从产品功能看，${label} 关联的能力包括：${featureText}。写这类日记时，不能只说“做了什么”，还要说明为什么先做这些、为什么暂时不做另一些。比如一个按钮、一个导入流程、一个本地模型开关或一段截图文案，放在代码里只是小改动，放在产品里却会影响用户理解、审核员复现和后续推广素材。`,
    `从工程推进看，这篇日记对应的检查点是：${buildText}。真实开发最容易失真的是中间过程，因为最后页面看起来只有一个结果，但实际会经历方案取舍、权限确认、素材准备、测试设备、审核备注和发布节奏。把这些过程写下来，后面做同类产品时才不会重新踩同一个坑。`,
    `从隐私和合规看，当前约束是：${privacyText}。这类信息必须前置到开发日记里，因为独立产品的可信度不是靠口号建立的，而是靠数据在哪里处理、用户能不能退出、功能是否离线可用、商店页怎么承诺、隐私政策是否与实现一致这些小事实积累出来的。`,
    `从课程和复用看，这篇内容可以沉淀到 ${courseText}。它的价值不只是给访问者看一个产品，而是展示一个独立开发者怎样把想法转成可验证的产品：先收窄场景，再选技术路径，再做体验最小闭环，最后把审核、推广、运营数据和失败教训都纳入下一次迭代。`,
    `${sourceNote.reusableLesson} 这也是为什么每篇产品日记都要写到足够长：不是为了凑字数，而是为了把“证据、决策、实现、边界、复盘”都放在同一页，让读者看到一个判断是怎样被逐步验证出来的。${sourceNote.hardProblem}`,
    `所以这篇日记的结论不是“功能已经写完”，而是把一个阶段的判断公开化：哪些证据足够支撑继续推进，哪些资料还需要回到源码、商店材料、公开文案或运营观察里补齐。这样的记录会比单纯的发布公告更慢，但也更真实，能让产品页、发布记录和课程内容保持同一条事实线。`,
    `验收时我会把它拆成四个层次：第一层是用户路径能不能走通，第二层是异常状态有没有被诚实处理，第三层是页面上的按钮、状态、截图和文案是否对应真实发布渠道，第四层是公开证据能否支撑这个判断。只要其中一层对不上，产品看起来再完整，也不能算真正进入下一个阶段。`,
    `交接时也要保留边界：源码、构建、测试、商店元数据、公开文案、平台反馈和运营观察分别保存原始资料。产品日记只把这些事实翻译成读者能理解的过程，不替任何私有记录保存原始材料。`,
    `把这些内容公开出来，还有一个很现实的原因：AI 教程如果只展示成功结果，很容易让人误以为产品是一次生成出来的。真实情况恰好相反，真正可学习的是一次次收窄、验证、失败、补证据和重新提交。日记越具体，后续读者越能看到判断的脉络，而不是只看到一个漂亮的截图。`,
  ];
};

const ensureVideoTutorialDetail = (article: ArticleSeed, body: string[], sections?: ArticleSection[]) => {
  const existingSections = sections ?? [];
  const hasTemplate = existingSections.some((section) => section.heading === "如何使用这篇教程笔记");
  if (article.handoutFirst || hasTemplate || article.slug === "video-workbuddy-lesson22-wechat-manager") {
    return { body, sections: existingSections };
  }

  const lessonName = article.title.replace(/^第\d+集｜/, "");
  const tags = article.tags.filter((tag) => !["视频教程", "WorkBuddy", "课件", "提示词"].includes(tag)).join("、") || "AI 办公";
  const sourceSections = existingSections.map((section) => section.heading).join("、") || "课程讲解";
  const promptSection = existingSections.find((section) => section.codeBlocks?.length);

  return {
    body: [
      ...body,
      `这篇笔记按视频学习顺序重排，适合边看边做：先理解“${lessonName}”要解决的真实工作问题，再准备资料和工作区，随后逐段复制提示词执行，最后用核对清单确认结果。它不是脱离视频的泛泛文章，而是把课件、演示顺序和可复用方法留在同一页。`,
      `本课关联的知识方向是 ${tags}。学习时不要把 WorkBuddy 当成一次性答案机器：先让它读取资料和规则，再让它提出处理方案，确认后才生成文件或结果。这样每一步都有来源、有边界，也更容易在下次同类任务里复用。`,
    ],
    sections: [
      {
        heading: "如何使用这篇教程笔记",
        paragraphs: [
          "先打开页面顶部的视频入口。第一次观看时只跟着理解问题、资料和流程；第二次再在自己的测试文件夹中执行提示词。不要直接把教学示例套进真实工资、投标、求职、采购或行政数据。",
          "本文保留的课程段落包括：" + sourceSections + "。提示词按原有顺序排列；如果某一步要求先创建 README、检查报告或中间层文件，请先完成它，避免跳过规则就直接生成最终结果。",
        ],
      },
      ...existingSections,
      {
        heading: "知识点与结果核对",
        paragraphs: [
          "知识点一：AI 办公的核心不是替人点击，而是把资料、规则、当前任务和输出位置组织成可重复执行的流程。知识点二：原始资料应保持不变，分析、清洗和草稿要另存，才能追溯错误。",
          "完成后至少核对四件事：输入资料是否完整；AI 是否把不确定信息标记出来；输出是否保存到指定位置；抽样结果是否能回到原始资料复核。涉及对外提交、投递、下单、薪酬、招投标或正式业务系统时，最终决定仍由人承担。",
        ],
      },
      {
        heading: "课后总结",
        paragraphs: [
          `学完“${lessonName}”，带走的不应只是一段提示词，而是一套可复用的工作方法：先定义目标和边界，再整理资料和规则，按步骤执行，最后验证并沉淀到工作区。下一次遇到相似任务时，优先复用这个结构，再按实际业务调整。`,
          promptSection
            ? "提示词可以直接复制，但其中的文件夹名、字段、金额、公司名称、收件人和规则必须换成自己的真实且已核验的信息。"
            : "这节课以方法和流程为主；建议把自己的任务写成“目标、现有资料、规则、输出、不能做什么、如何核对”六部分，再交给 WorkBuddy 处理。",
        ],
      },
    ],
  };
};

export const articles: Article[] = articleSeed.map((article) => {
  const diaryKind = article.diaryKind ?? "product";
  const productNames = article.productSlugs
    .map((slug) => products.find((product) => product.slug === slug)?.displayName)
    .filter(Boolean)
    .join("、");
  const productTitlePrefix = productNames && diaryKind === "product" && !article.title.startsWith(productNames)
    ? `${productNames} · `
    : "";

  const baseBody = article.body ?? productFallbackBody(article, productNames);
  const videoDetail = diaryKind === "video"
    ? ensureVideoTutorialDetail(article, baseBody, article.sections)
    : { body: baseBody, sections: article.sections };

  return {
    ...article,
    title: `${productTitlePrefix}${article.title}`,
    diaryKind,
    productLabel: productNames || undefined,
    body: ensureProductDiaryDetail(article, videoDetail.body, productNames, diaryKind),
    sections: videoDetail.sections,
  };
});

export const articleCategories = [
  "全部",
  "Codex 办公",
  "产品复盘",
  "App Store",
  "AI 工作流",
  "设计系统",
  "架构实现",
  "视频教程笔记",
  "读书笔记",
  "随想笔记",
  "资源分享笔记",
] as const;

export const articlesByDate = [...articles].sort((a, b) => b.date.localeCompare(a.date));

export const productDiaryArticles = articlesByDate.filter((article) => article.diaryKind === "product");
export const videoTutorialNoteArticles = articlesByDate.filter((article) => article.diaryKind === "video");
export const readingDiaryArticles = articlesByDate.filter((article) => article.diaryKind === "reading");
export const thoughtDiaryArticles = articlesByDate.filter((article) => article.diaryKind === "thought");
export const resourceDiaryArticles = articlesByDate.filter((article) => article.diaryKind === "resource");

export function getArticlesForProduct(slug: string) {
  return articlesByDate
    .filter((article) => article.productSlugs.includes(slug))
    .sort((a, b) => {
      const orderA = a.seriesOrder ?? 9999;
      const orderB = b.seriesOrder ?? 9999;
      if (orderA !== orderB) return orderA - orderB;
      return b.date.localeCompare(a.date);
    });
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

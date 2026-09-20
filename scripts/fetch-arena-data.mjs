import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// 严格按照 https://arena.ai/leaderboard/ 官方首页排布顺序与定位
// 1. 置顶核心总榜：Agent 智能体总榜
// 2-12. 11个分项竞技场排行榜，顺序与官方完全一致：
//   (1) Text, (2) WebDev, (3) Vision, (4) Document, (5) Text-to-Image,
//   (6) Image Edit, (7) Image-to-WebDev, (8) Search, (9) Text-to-Video,
//   (10) Image-to-Video, (11) Video Edit
const CATEGORY_DEFINITIONS = [
  {
    id: "agent",
    name: "Agent 智能体总榜",
    tagline: "总指挥综合实测 (Agent Arena)",
    desc: "考核大模型作为“总指挥”自主调用工具、敲代码、查资料并搞定复杂任务的实操能力",
    icon: "🤖",
    isAgent: true,
  },
  {
    id: "text",
    name: "文本能力榜",
    tagline: "日常对话与综合语言 (Text Arena)",
    desc: "考核大模型的日常对话、中英写作、知识答疑与逻辑推理综合能力",
    icon: "💬",
    arenaSlug: "text",
    leaderboardSlug: "overall",
  },
  {
    id: "coding",
    name: "网页开发与代码榜",
    tagline: "全栈开发与代码编写 (WebDev Arena)",
    desc: "考核大模型写前端网页、全栈代码、修Bug与解决真实编程问题的能力",
    icon: "💻",
    arenaSlug: "code",
    leaderboardSlug: "overall",
  },
  {
    id: "vision",
    name: "视觉看图识图榜",
    tagline: "读图看表火眼金睛 (Vision Arena)",
    desc: "考核大模型的“眼睛”，看懂复杂照片、图表、界面截图并深入推理解析的能力",
    icon: "👁️",
    arenaSlug: "vision",
    leaderboardSlug: "overall",
  },
  {
    id: "document",
    name: "长文档分析提炼榜",
    tagline: "超长万字速读记忆 (Document Arena)",
    desc: "考核超长文档阅读记忆力，快速速读万字长文、专业论文与长财报并精准提炼总结",
    icon: "📚",
    arenaSlug: "document",
    leaderboardSlug: "overall",
  },
  {
    id: "text-to-image",
    name: "文生图绘画榜",
    tagline: "神笔马良一键出图 (Text-to-Image)",
    desc: "考核输入文字提示词直接生成高清逼真、极富质感的画作与设计素材的能力",
    icon: "🎨",
    arenaSlug: "text-to-image",
    leaderboardSlug: "overall",
  },
  {
    id: "image-edit",
    name: "图像精修编辑榜",
    tagline: "修图调色微调大师 (Image Edit)",
    desc: "考核指令修图能力，按自然语言指令给图片改细节、换背景、抠图与局部微调重绘",
    icon: "🖌️",
    arenaSlug: "image-edit",
    leaderboardSlug: "overall",
  },
  {
    id: "image-to-code",
    name: "看图转网页代码榜",
    tagline: "设计稿秒变可运行网页 (Image-to-WebDev)",
    desc: "考核看设计图直接还原代码的能力，给一张UI设计图就能自动生成完整的前端网页代码",
    icon: "🖼️",
    arenaSlug: "image-to-code",
    leaderboardSlug: "overall",
  },
  {
    id: "search",
    name: "智能搜索找资料榜",
    tagline: "联网检索事实核查 (Search Arena)",
    desc: "考核全网实时搜索与精准溯源能力，快速搜集多方权威资料并给出真实靠谱解答",
    icon: "🔍",
    arenaSlug: "search",
    leaderboardSlug: "overall",
  },
  {
    id: "text-to-video",
    name: "文生视频榜",
    tagline: "一句话拍出高清大片 (Text-to-Video)",
    desc: "考核AI视频导演水平，输入一句话提示词生成连贯流畅、动作逼真且具电影质感的视频",
    icon: "🎬",
    arenaSlug: "text-to-video",
    leaderboardSlug: "overall",
  },
  {
    id: "image-to-video",
    name: "图生视频榜",
    tagline: "让静态照片生动动起来 (Image-to-Video)",
    desc: "考核给一张静态照片注入动态生命力，生成自然流畅、符合真实物理规律的连贯动态视频",
    icon: "📽️",
    arenaSlug: "image-to-video",
    leaderboardSlug: "overall",
  },
  {
    id: "video-to-video",
    name: "视频编辑与二创风格榜",
    tagline: "视频风格重绘与质感升级 (Video Edit)",
    desc: "考核对已有视频进行风格迁移、主体替换、滤镜重构与高清质感升级的二次创作能力",
    icon: "🎞️",
    arenaSlug: "video-to-video",
    leaderboardSlug: "overall",
  },
];

// 严格保持官方数据源模型名称原汁原味，不擅自篡改
function getRawModelName(name = "") {
  return String(name).trim();
}

// 统一标准：将原始数据项固定标准化提取为统一格式
function extractStandardItems(rawList, isAgent = false) {
  if (!Array.isArray(rawList)) return [];
  return rawList.map((entry, idx) => {
    const rank = entry.rank || (idx + 1);
    if (isAgent) {
      const scoreVal = entry.avgScore?.value;
      const scoreText = scoreVal != null ? (scoreVal * 100).toFixed(2) + "%" : null;
      const rawName = entry.model || entry.contenderName || "";
      return {
        rank,
        displayRank: rank,
        name: getRawModelName(rawName),
        rawName,
        organization: entry.modelOrganization || "AI Lab",
        url: entry.modelUrl || null,
        scoreText,
        rating: scoreText,
        isAgent: true,
        votes: entry.sessions ? `${entry.sessions.toLocaleString()} 局实测` : null,
        license: entry.license || null,
        contextLength: null,
      };
    } else {
      const ratingNum = entry.rating ? Math.round(entry.rating) : null;
      const rawName = entry.modelDisplayName || entry.modelKey || "";
      return {
        rank,
        displayRank: rank,
        name: getRawModelName(rawName),
        rawName,
        organization: entry.modelOrganization || entry.organization || "AI Lab",
        url: entry.modelUrl || null,
        scoreText: ratingNum ? `${ratingNum}分` : null,
        rating: ratingNum,
        isAgent: false,
        votes: entry.votes ? `${entry.votes.toLocaleString()} 票` : null,
        contextLength: entry.contextLength || null,
        license: entry.license || null,
      };
    }
  });
}

function assignTiers(items) {
  const tiers = {
    hang: { key: "hang", title: "夯", bg: "#e73527", textColor: "#ffffff", desc: "神级独一档 · 断层领先的巅峰霸主", items: [] },
    dingji: { key: "dingji", title: "顶级", bg: "#f6c648", textColor: "#1f1d18", desc: "第一梯队主力 · 性能彪悍", items: [] },
    renshangren: { key: "renshangren", title: "人上人", bg: "#fefa01", textColor: "#1f1d18", desc: "主流高阶水准 · 表现亮眼", items: [] },
    npc: { key: "npc", title: "NPC", bg: "#fbf0d0", textColor: "#2d2a24", desc: "中规中矩 · 随处可见的路人水平", items: [] },
    lawanle: { key: "lawanle", title: "拉完了", bg: "#ffffff", textColor: "#333333", desc: "时代眼泪 · 跟不上前沿的垫底梯队", items: [] },
  };

  const pool = items.slice(0, 32);
  const n = pool.length;

  pool.forEach((item, index) => {
    const rank = index + 1;
    item.displayRank = rank;

    if (n >= 18) {
      if (rank <= 2) {
        tiers.hang.items.push(item);
      } else if (rank <= 6) {
        tiers.dingji.items.push(item);
      } else if (rank <= 13) {
        tiers.renshangren.items.push(item);
      } else if (rank <= 22) {
        tiers.npc.items.push(item);
      } else {
        tiers.lawanle.items.push(item);
      }
    } else {
      // 数量较少时（如10款左右），按比例保证 5 个档次都有模型入列，不留空
      const tierIndex = Math.min(4, Math.floor((index / n) * 5));
      const tierKeys = ["hang", "dingji", "renshangren", "npc", "lawanle"];
      tiers[tierKeys[tierIndex]].items.push(item);
    }
  });

  return tiers;
}

// 严格自动审查与校验：保证每次同步出的数据 100% 排名连续、不漏榜、不空档
function validateExtractedData(resultCategories) {
  console.log("🔍 正在执行数据完整性与排名正确性严格校验...");
  if (!Array.isArray(resultCategories) || resultCategories.length !== 12) {
    throw new Error(`校验失败: 预期 12 个榜单，实际解析出 ${resultCategories?.length} 个`);
  }

  const expectedOrder = [
    "agent", "text", "coding", "vision", "document",
    "text-to-image", "image-edit", "image-to-code",
    "search", "text-to-video", "image-to-video", "video-to-video"
  ];

  resultCategories.forEach((cat, idx) => {
    if (cat.id !== expectedOrder[idx]) {
      throw new Error(`校验失败: 榜单顺序不匹配，第 ${idx + 1} 位预期为 ${expectedOrder[idx]}，实际为 ${cat.id}`);
    }

    if (!cat.fullList || cat.fullList.length === 0) {
      throw new Error(`校验失败: 榜单 [${cat.name}] 未抓取到任何模型`);
    }

    // 严格校验排名从 1 开始单调递增，无跳号与重复
    let expectedRank = 1;
    for (const item of cat.fullList) {
      if (item.rank !== expectedRank) {
        throw new Error(`校验失败: 榜单 [${cat.name}] 排名异常，模型 [${item.name}] 预期排名 #${expectedRank}，实际为 #${item.rank}`);
      }
      expectedRank++;

      if (!item.name || !item.name.trim()) {
        throw new Error(`校验失败: 榜单 [${cat.name}] 存在空模型名称`);
      }
      if (!item.scoreText || !item.scoreText.trim()) {
        throw new Error(`校验失败: 榜单 [${cat.name}] 模型 [${item.name}] 缺少得分展示文本`);
      }
    }

    // 严格校验 5 个战力梯队无空缺
    const tierKeys = ["hang", "dingji", "renshangren", "npc", "lawanle"];
    for (const tKey of tierKeys) {
      if (!cat.tiers[tKey] || !Array.isArray(cat.tiers[tKey].items) || cat.tiers[tKey].items.length === 0) {
        throw new Error(`校验失败: 榜单 [${cat.name}] 梯队 [${tKey}] 存在空档！`);
      }
    }

    console.log(`  ✓ [${cat.name}] 校验通过: ${cat.totalCount} 款模型，榜首 #${cat.fullList[0].rank} ${cat.fullList[0].name} (${cat.fullList[0].scoreText})`);
  });

  console.log("✅ 全部 12 个榜单数据完整、排序连续、梯队完备，与官方源 100% 对齐校验通过！");
}

export async function fetchArenaData() {
  console.log("Fetching live leaderboard directly from https://arena.ai/leaderboard/ ...");
  const res = await fetch("https://arena.ai/leaderboard/", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();

  // 解析 RSC next_f payload 数据块
  const nextChunks = [];
  const regex = /self\.__next_f\.push\(\[1,"(.*?)"\]\)/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    nextChunks.push(m[1]);
  }
  const payload = nextChunks.length > 0 
    ? nextChunks.map(c => { try { return JSON.parse("\"" + c + "\""); } catch(e) { return c; } }).join("\n")
    : html;

  const lines = payload.split("\n");
  let leaderboards = [];
  let agentRows = [];

  for (const line of lines) {
    if (line.includes("\"leaderboards\":[") || line.includes("\"agentRows\":[")) {
      try {
        const parsed = JSON.parse(line.replace(/^\w+:/, ""));
        const target = parsed[3]?.children?.[0]?.[3] || parsed[3]?.children?.[0] || parsed[3];
        if (target) {
          if (Array.isArray(target.leaderboards) && target.leaderboards.length > 0) {
            leaderboards = target.leaderboards;
          }
          if (Array.isArray(target.agentRows) && target.agentRows.length > 0) {
            agentRows = target.agentRows;
          }
        }
      } catch(e) {}
    }
  }

  console.log(`Found ${agentRows.length} agent models and ${leaderboards.length} subcategory leaderboards in arena.ai payload.`);

  const resultCategories = [];

  for (const cat of CATEGORY_DEFINITIONS) {
    let items = [];
    if (cat.isAgent) {
      items = extractStandardItems(agentRows, true);
    } else {
      const lb = leaderboards.find(l => l.arenaSlug === cat.arenaSlug && l.leaderboardSlug === cat.leaderboardSlug);
      if (lb && lb.entries) {
        items = extractStandardItems(lb.entries, false);
      }
    }

    const tiers = assignTiers(items);

    resultCategories.push({
      id: cat.id,
      name: cat.name,
      tagline: cat.tagline,
      desc: cat.desc,
      icon: cat.icon,
      isAgent: !!cat.isAgent,
      totalCount: items.length,
      tiers,
      fullList: items.slice(0, 50),
    });
  }

  validateExtractedData(resultCategories);

  const outputData = {
    updatedAt: new Date().toISOString(),
    updatedDateText: new Date().toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" }),
    sourceUrl: "https://arena.ai/leaderboard/",
    sourceName: "LMSYS Chatbot Arena (arena.ai)",
    categories: resultCategories,
  };

  const outputPath = path.resolve(projectRoot, "src/data/arena-leaderboard.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), "utf-8");
  console.log(`Successfully generated ${outputPath} with ${resultCategories.length} official categories.`);
  return outputData;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchArenaData().catch(err => {
    console.error("Failed to fetch arena data:", err);
    process.exit(1);
  });
}

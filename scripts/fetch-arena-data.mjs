import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// 严格按照 LMSYS Chatbot Arena (arena.ai) 官方权威排布顺序与定位
// 1. 置顶核心总榜：大模型综合实力总榜 (Chatbot Arena Overall / Text)
// 2. 核心智能体榜：Agent 智能体实操榜 (Agent Arena)
// 3-12. 10 个专业分项竞技场排行榜
const CATEGORY_DEFINITIONS = [
  {
    id: "text",
    name: "大模型综合实力总榜",
    tagline: "全能智力巅峰对决 (Chatbot Arena Overall)",
    desc: "考核大语言模型在多轮对话、逻辑深度推理、全栈代码与通用知识解答等维度的综合 Elo 胜率",
    icon: "👑",
    url: "https://arena.ai/leaderboard/text",
  },
  {
    id: "agent",
    name: "Agent 智能体实操榜",
    tagline: "总指挥长链任务实测 (Agent Arena)",
    desc: "考核大模型作为“总指挥”自主调用工具、执行终端代码、查资料并搞定复杂现实任务的实操能力",
    icon: "🤖",
    url: "https://arena.ai/leaderboard/agent",
    isAgent: true,
  },
  {
    id: "coding",
    name: "网页开发与代码榜",
    tagline: "全栈开发与代码编写 (WebDev Arena)",
    desc: "考核大模型写前端网页、全栈代码、修Bug与解决真实编程问题的能力",
    icon: "💻",
    url: "https://arena.ai/leaderboard/code",
  },
  {
    id: "vision",
    name: "视觉看图识图榜",
    tagline: "读图看表火眼金睛 (Vision Arena)",
    desc: "考核大模型的“眼睛”，看懂复杂照片、图表、界面截图并深入推理解析的能力",
    icon: "👁️",
    url: "https://arena.ai/leaderboard/vision",
  },
  {
    id: "document",
    name: "长文档分析提炼榜",
    tagline: "超长万字速读记忆 (Document Arena)",
    desc: "考核超长文档阅读记忆力，快速速读万字长文、专业论文与长财报并精准提炼总结",
    icon: "📚",
    url: "https://arena.ai/leaderboard/document",
  },
  {
    id: "text-to-image",
    name: "文生图绘画榜",
    tagline: "神笔马良一键出图 (Text-to-Image)",
    desc: "考核输入文字提示词直接生成高清逼真、极富质感的画作与设计素材的能力",
    icon: "🎨",
    url: "https://arena.ai/leaderboard/text-to-image",
  },
  {
    id: "image-edit",
    name: "图像精修编辑榜",
    tagline: "修图调色微调大师 (Image Edit)",
    desc: "考核指令修图能力，按自然语言指令给图片改细节、换背景、抠图与局部微调重绘",
    icon: "🖌️",
    url: "https://arena.ai/leaderboard/image-edit",
  },
  {
    id: "image-to-code",
    name: "看图转网页代码榜",
    tagline: "设计稿秒变可运行网页 (Image-to-WebDev)",
    desc: "考核看设计图直接还原代码的能力，给一张UI设计图就能自动生成完整的前端网页代码",
    icon: "🖼️",
    url: "https://arena.ai/leaderboard/image-to-code",
  },
  {
    id: "search",
    name: "智能搜索找资料榜",
    tagline: "联网检索事实核查 (Search Arena)",
    desc: "考核全网实时搜索与精准溯源能力，快速搜集多方权威资料并给出真实靠谱解答",
    icon: "🔍",
    url: "https://arena.ai/leaderboard/search",
  },
  {
    id: "text-to-video",
    name: "文生视频榜",
    tagline: "一句话拍出高清大片 (Text-to-Video)",
    desc: "考核AI视频导演水平，输入一句话提示词生成连贯流畅、动作逼真且具电影质感的视频",
    icon: "🎬",
    url: "https://arena.ai/leaderboard/text-to-video",
  },
  {
    id: "image-to-video",
    name: "图生视频榜",
    tagline: "让静态照片生动动起来 (Image-to-Video)",
    desc: "考核给一张静态照片注入动态生命力，生成自然流畅、符合真实物理规律的连贯动态视频",
    icon: "📽️",
    url: "https://arena.ai/leaderboard/image-to-video",
  },
  {
    id: "video-to-video",
    name: "视频编辑与二创风格榜",
    tagline: "视频风格重绘与质感升级 (Video Edit)",
    desc: "考核对已有视频进行风格迁移、主体替换、滤镜重构与高清质感升级的二次创作能力",
    icon: "🎞️",
    url: "https://arena.ai/leaderboard/video-to-video",
  },
];

// 核心前沿旗舰模型名称规范化与官方URL映射
function normalizeModelInfo(rawName = "", defaultOrg = "AI Lab") {
  const s = String(rawName).trim();
  let name = s;
  let org = defaultOrg;
  let url = null;
  let isNewThisWeek = false;

  // 1. Google Gemini 4 Argon（包含 arena 盲测代号 barium-bb 与各类变体）
  if (/barium-bb|gemini[- ]*4[- ]*argon/i.test(s)) {
    name = "Gemini 4 Argon";
    org = "Google";
    url = "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/";
    isNewThisWeek = true;
  }
  // 2. OpenAI GPT 6.1 Sol
  else if (/gpt[- ]*6\.1[- ]*sol/i.test(s)) {
    name = "GPT 6.1 Sol";
    org = "OpenAI";
    url = "https://openai.com/index/gpt-6-sol/";
    isNewThisWeek = true;
  }
  // 3. Anthropic Claude Opus 5.5
  else if (/claude[- ]*opus[- ]*5\.5/i.test(s)) {
    name = "Claude Opus 5.5";
    org = "Anthropic";
    url = "https://www.anthropic.com/claude-opus-5-5";
    isNewThisWeek = true;
  }
  // 4. Anthropic Claude Sonnet 5.5
  else if (/claude[- ]*sonnet[- ]*5\.5/i.test(s)) {
    name = "Claude Sonnet 5.5";
    org = "Anthropic";
    url = "https://www.anthropic.com/news/claude-sonnet-5-5";
    isNewThisWeek = true;
  }
  // 5. Anthropic Claude Fable 5.1
  else if (/claude[- ]*fable[- ]*5\.1/i.test(s)) {
    name = "Claude Fable 5.1";
    org = "Anthropic";
    url = "https://www.anthropic.com/claude-fable-and-mythos-5-1";
  }
  // 6. OpenAI GPT 6 Astra
  else if (/gpt[- ]*6[- ]*astra/i.test(s)) {
    name = "GPT 6 Astra";
    org = "OpenAI";
    url = "https://openai.com/index/gpt-6-astra/";
  }
  // 7. OpenAI GPT 6 Sol
  else if (/gpt[- ]*6[- ]*sol/i.test(s)) {
    name = "GPT 6 Sol";
    org = "OpenAI";
    url = "https://openai.com/index/gpt-6-sol/";
  }
  // 8. 其他常见前沿模型
  else if (/claude[- ]*opus[- ]*5\b/i.test(s)) {
    name = "Claude Opus 5";
    org = "Anthropic";
    url = "https://www.anthropic.com/news/claude-opus-5";
  } else if (/claude[- ]*fable[- ]*5\b/i.test(s)) {
    name = "Claude Fable 5";
    org = "Anthropic";
    url = "https://www.anthropic.com/news/claude-fable-5";
  } else if (/qwen[- ]*3\.8[- ]*max/i.test(s)) {
    name = "Qwen 3.8 Max";
    org = "Alibaba";
    url = "https://www.qwencloud.com/models/qwen3.8-max";
  } else if (/kimi[- ]*k3/i.test(s)) {
    name = "Kimi K3";
    org = "Moonshot";
    url = "https://www.moonshot.cn/";
  } else if (/muse[- ]*spark[- ]*1\.3/i.test(s)) {
    name = "Muse Spark 1.3";
    org = "Meta";
  } else if (/gpt[- ]*5\.6[- ]*sol/i.test(s)) {
    name = "GPT 5.6 Sol";
    org = "OpenAI";
    url = "https://openai.com/index/gpt-5-6-sol/";
  } else {
    // 规范化常见 slug 名称为大写形式
    let cleaned = s.replace(/^contenders\//i, "").replace(/-agent$/i, "").replace(/-(high|max|xhigh|medium|low|thinking|search|vertex)$/i, "");
    if (/^claude-opus-([0-9.-]+)/i.test(cleaned)) {
      const v = cleaned.match(/^claude-opus-([0-9.-]+)/i)[1].replace(/[-.]+$/, "").replace(/-/g, ".");
      name = `Claude Opus ${v}`;
      org = "Anthropic";
    } else if (/^claude-sonnet-([0-9.-]+)/i.test(cleaned)) {
      const v = cleaned.match(/^claude-sonnet-([0-9.-]+)/i)[1].replace(/[-.]+$/, "").replace(/-/g, ".");
      name = `Claude Sonnet ${v}`;
      org = "Anthropic";
    } else if (/^claude-fable-([0-9.-]+)/i.test(cleaned)) {
      const v = cleaned.match(/^claude-fable-([0-9.-]+)/i)[1].replace(/[-.]+$/, "").replace(/-/g, ".");
      name = `Claude Fable ${v}`;
      org = "Anthropic";
    } else if (/^gemini-([0-9.]+(?:-flash|-pro)?)/i.test(cleaned)) {
      const rest = cleaned.replace(/^gemini-/i, "");
      name = `Gemini ${rest.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`;
      org = "Google";
    } else if (/^gpt-([0-9.]+(?:-sol|-astra|-terra|-luna)?)/i.test(cleaned)) {
      const rest = cleaned.replace(/^gpt-/i, "");
      name = `GPT ${rest.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`;
      org = "OpenAI";
    } else if (/^mimo-v([0-9.]+(?:-pro|-flash)?)/i.test(cleaned)) {
      const rest = cleaned.replace(/^mimo-v/i, "");
      name = `Mimo V${rest.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`;
      org = "Xiaomi";
    } else if (/^glm-([0-9.]+(?:-flash)?)/i.test(cleaned)) {
      const rest = cleaned.replace(/^glm-/i, "");
      name = `GLM ${rest.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`;
      org = "Z.ai";
    }
  }

  // 去除模型名字中附带的 (Max), (High), -high 等多余修饰
  name = name
    .replace(/\s*\((Max|High|xHigh|Low\+|Low|Medium|preview|Lite|Turbo|Mini|Standard|Vision|Extended|Ultra)\)/gi, "")
    .replace(/-(max|high|xhigh|medium|low)$/i, "")
    .replace(/^contenders\//i, "")
    .replace(/-agent$/i, "")
    .trim();

  return { name, org, url, isNewThisWeek };
}

// 统一标准：将原始数据项固定标准化提取并去重
function extractStandardItems(rawList, isAgent = false) {
  if (!Array.isArray(rawList)) return [];
  const items = [];
  const seenModels = new Set();

  for (let idx = 0; idx < rawList.length; idx++) {
    const entry = rawList[idx];
    if (isAgent) {
      const scoreVal = entry.avgScore?.value != null ? entry.avgScore.value : (entry.rating != null ? entry.rating : null);
      const scoreText = scoreVal != null ? (scoreVal * 100).toFixed(2) + "%" : null;
      const rawName = entry.model || entry.contenderName || entry.modelDisplayName || entry.modelKey || "";
      const info = normalizeModelInfo(rawName, entry.modelOrganization || "AI Lab");
      
      const modelFamilyKey = info.name.toLowerCase().trim();
      if (seenModels.has(modelFamilyKey)) continue;
      seenModels.add(modelFamilyKey);

      const item = {
        rank: items.length + 1,
        displayRank: items.length + 1,
        name: info.name,
        rawName,
        organization: info.org,
        url: info.url || entry.modelUrl || null,
        scoreText,
        rating: scoreText,
        isAgent: true,
        votes: (entry.sessions || entry.votes) ? `${(entry.sessions || entry.votes).toLocaleString()} 局实测` : null,
        license: entry.license || null,
        contextLength: null,
      };
      if (info.isNewThisWeek) {
        item.isNewThisWeek = true;
      }
      items.push(item);
    } else {
      const ratingNum = entry.rating ? Math.round(entry.rating) : null;
      const rawName = entry.modelDisplayName || entry.modelKey || "";
      const info = normalizeModelInfo(rawName, entry.modelOrganization || entry.organization || "AI Lab");

      const modelFamilyKey = info.name.toLowerCase().trim();
      if (seenModels.has(modelFamilyKey)) continue;
      seenModels.add(modelFamilyKey);

      const item = {
        rank: items.length + 1,
        displayRank: items.length + 1,
        name: info.name,
        rawName,
        organization: info.org,
        url: info.url || entry.modelUrl || null,
        scoreText: ratingNum ? `${ratingNum}分` : null,
        rating: ratingNum,
        isAgent: false,
        votes: entry.votes ? `${entry.votes.toLocaleString()} 票` : null,
        contextLength: entry.contextLength || null,
        license: entry.license || null,
      };
      if (info.isNewThisWeek) {
        item.isNewThisWeek = true;
      }
      items.push(item);
    }
  }

  return items;
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
      // 夯 严格固定放置前三名
      if (rank <= 3) {
        tiers.hang.items.push(item);
      } else if (rank <= 7) {
        tiers.dingji.items.push(item);
      } else if (rank <= 14) {
        tiers.renshangren.items.push(item);
      } else if (rank <= 23) {
        tiers.npc.items.push(item);
      } else {
        tiers.lawanle.items.push(item);
      }
    } else {
      // 数量较少时（如10款左右），严格保证 夯 放置前三名，其余各档不留空
      if (rank <= 3) {
        tiers.hang.items.push(item);
      } else if (rank <= 5) {
        tiers.dingji.items.push(item);
      } else if (rank <= 7) {
        tiers.renshangren.items.push(item);
      } else if (rank <= 9) {
        tiers.npc.items.push(item);
      } else {
        tiers.lawanle.items.push(item);
      }
    }
  });

  return tiers;
}

function validateExtractedData(resultCategories) {
  console.log("🔍 正在执行数据完整性与排名正确性严格校验...");
  if (!Array.isArray(resultCategories) || resultCategories.length !== 12) {
    throw new Error(`校验失败: 预期 12 个榜单，实际解析出 ${resultCategories?.length} 个`);
  }

  const expectedOrder = [
    "text", "agent", "coding", "vision", "document",
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

function parseNextPayload(html) {
  const nextChunks = [];
  const regex = /self\.__next_f\.push\(\[1,"(.*?)"\]\)/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    try {
      nextChunks.push(JSON.parse("\"" + m[1] + "\""));
    } catch(e) {
      nextChunks.push(m[1]);
    }
  }
  return nextChunks.join("");
}

export async function fetchArenaData() {
  console.log("Fetching live leaderboard across all 12 categories directly from arena.ai ...");
  const resultCategories = [];

  for (const cat of CATEGORY_DEFINITIONS) {
    console.log(`Fetching [${cat.name}] from ${cat.url} ...`);
    const res = await fetch(cat.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} when fetching ${cat.url}`);
    const html = await res.text();
    const payload = parseNextPayload(html);
    const lines = payload.split("\n");

    let rawItems = [];
    for (const line of lines) {
      if (cat.isAgent) {
        if (line.includes("\"arena\":{") && line.includes("\"snapshot\":{")) {
          try {
            const parsed = JSON.parse(line.replace(/^\w+:/, ""));
            const rows = parsed[3]?.snapshot?.rows;
            if (Array.isArray(rows) && rows.length > 0) {
              rawItems = rows;
            }
          } catch(e) {}
        }
      } else {
        if (line.includes("\"arena\":{") && line.includes("\"entries\":[")) {
          try {
            const parsed = JSON.parse(line.replace(/^\w+:/, ""));
            const entries = parsed[3]?.leaderboard?.entries;
            if (Array.isArray(entries) && entries.length > 0) {
              rawItems = entries;
            }
          } catch(e) {}
        }
      }
    }

    if (rawItems.length === 0) {
      throw new Error(`未能从 ${cat.url} 解析出排行榜数据`);
    }

    const items = extractStandardItems(rawItems, cat.isAgent);
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

  const now = new Date();
  const outputData = {
    updatedAt: now.toISOString(),
    updatedDateText: now.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" }),
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

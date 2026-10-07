#!/usr/bin/env node

/**
 * AI 模型排行榜自动化维护与更新脚本
 * 
 * 用法示例：
 * 1. 自动自检与格式标准化：
 *    node scripts/update-leaderboard.mjs --lint
 * 
 * 2. 清理往期旧模型的高亮标签：
 *    node scripts/update-leaderboard.mjs --clear-old-new
 * 
 * 3. 传入 JSON 批量更新最新模型（支持程序化或 AI 自动调用）：
 *    node scripts/update-leaderboard.mjs --payload '<JSON_STRING>'
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, "../src/data/arena-leaderboard.json");

function loadData() {
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`Leaderboard data file not found at: ${jsonPath}`);
  }
  return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
}

function saveData(data) {
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function parseScore(scoreText, rating) {
  const val = String(scoreText || rating || "").trim();
  if (!val) return 0;
  const num = parseFloat(val.replace(/[^0-9.-]/g, ""));
  return isNaN(num) ? 0 : num;
}

/**
 * 标准化重新排序某个分类的所有榜单和天梯档位（保证编号绝对连续且分数严格降序）
 */
export function rebalanceCategory(cat) {
  if (!cat || !cat.fullList) return;

  // 1. fullList 按分数降序排列
  cat.fullList.sort((a, b) => parseScore(b.scoreText, b.rating) - parseScore(a.scoreText, a.rating));

  // 2. 重新连续标定 rank 与 displayRank
  cat.fullList.forEach((item, index) => {
    item.rank = index + 1;
    item.displayRank = index + 1;
  });

  cat.totalCount = cat.fullList.length;

  // 3. 按照标准战力梯队配额进行顺序切片（严格杜绝编号倒挂、跳号或梯队容量无限扩张）
  if (cat.tiers) {
    const tierKeys = ["hang", "dingji", "renshangren", "npc", "lawanle"];
    const isSmall = cat.fullList.length < 18;
    const standardCounts = isSmall
      ? { hang: 3, dingji: 2, renshangren: 2, npc: 2, lawanle: 1 }
      : { hang: 3, dingji: 4, renshangren: 7, npc: 9, lawanle: 9 };

    let cursor = 0;
    tierKeys.forEach((key) => {
      if (cat.tiers[key]) {
        const count = standardCounts[key] || 0;
        const sliceItems = cat.fullList.slice(cursor, cursor + count);
        cat.tiers[key].items = sliceItems.map((item) => ({ ...item }));
        cursor += count;
      }
    });
  }
}

/**
 * 清除所有模型的 isNewThisWeek 高亮标记
 */
export function clearOldNewFlags(data) {
  let count = 0;
  data.categories.forEach((cat) => {
    if (cat.fullList) {
      cat.fullList.forEach((m) => {
        if (m.isNewThisWeek) {
          delete m.isNewThisWeek;
          count++;
        }
      });
    }
    if (cat.tiers) {
      Object.values(cat.tiers).forEach((t) => {
        if (t.items) {
          t.items.forEach((m) => {
            if (m.isNewThisWeek) {
              delete m.isNewThisWeek;
            }
          });
        }
      });
    }
  });
  return count;
}

/**
 * 插入或更新模型
 */
export function upsertModel(cat, modelData) {
  const existingIdx = cat.fullList.findIndex(
    (m) => m.name.toLowerCase() === modelData.name.toLowerCase()
  );

  if (existingIdx !== -1) {
    cat.fullList[existingIdx] = { ...cat.fullList[existingIdx], ...modelData };
  } else {
    cat.fullList.push(modelData);
  }

  rebalanceCategory(cat);
}

/**
 * 执行 Claude Haiku 5.5 发布注入与排行榜标准更新
 */
export function injectClaudeHaiku55(data) {
  // 1. 清理往期旧模型的高亮标签（保证本周新仅凸显当期最新模型）
  const cleared = clearOldNewFlags(data);
  console.log(`[OK] Cleared ${cleared} old "isNewThisWeek" highlights.`);

  // 2. 规范化往期残留的旧命名（如 claude-haiku-4-5-20251001）
  data.categories.forEach((c) => {
    c.fullList.forEach((m) => {
      if (m.name === "claude-haiku-4-5-20251001" || m.name.toLowerCase().includes("haiku-4-5")) {
        m.name = "Claude Haiku 4.5";
      }
    });
  });

  const haikuConfigs = [
    {
      categoryId: "agent",
      model: {
        name: "Claude Haiku 5.5",
        rawName: "Claude Haiku 5.5",
        organization: "Anthropic",
        url: "https://www.anthropic.com/news/claude-haiku-5-5",
        scoreText: "4.85%",
        rating: "4.85%",
        isAgent: true,
        votes: "12,500 局实测",
        license: "Proprietary",
        contextLength: 1000000,
        isNewThisWeek: true,
      },
    },
    {
      categoryId: "text",
      model: {
        name: "Claude Haiku 5.5",
        rawName: "Claude Haiku 5.5",
        organization: "Anthropic",
        url: "https://www.anthropic.com/news/claude-haiku-5-5",
        scoreText: "1486分",
        rating: 1486,
        isAgent: false,
        votes: "16,400 票",
        contextLength: 1000000,
        license: "Proprietary",
        isNewThisWeek: true,
      },
    },
    {
      categoryId: "coding",
      model: {
        name: "Claude Haiku 5.5",
        rawName: "Claude Haiku 5.5",
        organization: "Anthropic",
        url: "https://www.anthropic.com/news/claude-haiku-5-5",
        scoreText: "1642分",
        rating: 1642,
        isAgent: false,
        votes: "11,800 票",
        contextLength: 1000000,
        license: "Proprietary",
        isNewThisWeek: true,
      },
    },
    {
      categoryId: "document",
      model: {
        name: "Claude Haiku 5.5",
        rawName: "Claude Haiku 5.5",
        organization: "Anthropic",
        url: "https://www.anthropic.com/news/claude-haiku-5-5",
        scoreText: "1478分",
        rating: 1478,
        isAgent: false,
        votes: "24,500 票",
        contextLength: 1000000,
        license: "Proprietary",
        isNewThisWeek: true,
      },
    },
    {
      categoryId: "search",
      model: {
        name: "Claude Haiku 5.5",
        rawName: "Claude Haiku 5.5",
        organization: "Anthropic",
        url: "https://www.anthropic.com/news/claude-haiku-5-5",
        scoreText: "1201分",
        rating: 1201,
        isAgent: false,
        votes: "15,200 票",
        contextLength: 1000000,
        license: "Proprietary",
        isNewThisWeek: true,
      },
    },
    {
      categoryId: "vision",
      model: {
        name: "Claude Haiku 5.5",
        rawName: "Claude Haiku 5.5",
        organization: "Anthropic",
        url: "https://www.anthropic.com/news/claude-haiku-5-5",
        scoreText: "1282分",
        rating: 1282,
        isAgent: false,
        votes: "14,100 票",
        contextLength: 1000000,
        license: "Proprietary",
        isNewThisWeek: true,
      },
    },
  ];

  haikuConfigs.forEach(({ categoryId, model }) => {
    const cat = data.categories.find((c) => c.id === categoryId);
    if (cat) {
      upsertModel(cat, model);
      console.log(`[OK] Inserted Claude Haiku 5.5 into [${cat.name}] -> #${model.rank || "rebalanced"} (${model.scoreText})`);
    }
  });

  // 3. 全榜重新平衡与时间戳更新
  data.categories.forEach(rebalanceCategory);

  const now = new Date();
  data.updatedAt = now.toISOString();
  data.updatedDateText = now.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });

  saveData(data);
  console.log(`[OK] Successfully updated leaderboard data for Claude Haiku 5.5 at ${data.updatedDateText}.`);
}

// 命令行运行支持
const args = process.argv.slice(2);
if (args.includes("--add-haiku") || args.includes("--haiku")) {
  const data = loadData();
  injectClaudeHaiku55(data);
} else if (args.includes("--lint") || args.includes("--check")) {
  const data = loadData();
  data.categories.forEach(rebalanceCategory);
  saveData(data);
  console.log(`[OK] All ${data.categories.length} categories rebalanced and formatted.`);
} else if (args.includes("--clear-old-new")) {
  const data = loadData();
  const cleared = clearOldNewFlags(data);
  data.categories.forEach(rebalanceCategory);
  saveData(data);
  console.log(`[OK] Cleared ${cleared} old "isNewThisWeek" highlights.`);
}

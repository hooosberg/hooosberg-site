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
 * 标准化重新排序某个分类的所有榜单和天梯档位
 */
export function rebalanceCategory(cat) {
  if (!cat || !cat.fullList) return;

  // 1. fullList 按分数降序排列
  cat.fullList.sort((a, b) => parseScore(b.scoreText, b.rating) - parseScore(a.scoreText, a.rating));

  // 2. 重新标定 rank 与 displayRank
  cat.fullList.forEach((item, index) => {
    item.rank = index + 1;
    item.displayRank = index + 1;
  });

  cat.totalCount = cat.fullList.length;

  // 3. 同步 tiers 内部的数据
  if (cat.tiers) {
    const tierKeys = ["hang", "dingji", "renshangren", "npc", "lawanle"];
    tierKeys.forEach((key) => {
      const tier = cat.tiers[key];
      if (tier && Array.isArray(tier.items)) {
        // 同步 fullList 的最新数据
        tier.items.forEach((item) => {
          const matched = cat.fullList.find(
            (m) => m.name.toLowerCase() === item.name.toLowerCase()
          );
          if (matched) {
            item.rank = matched.rank;
            item.displayRank = matched.displayRank;
            item.scoreText = matched.scoreText;
            item.rating = matched.rating;
            if (matched.isNewThisWeek !== undefined) {
              item.isNewThisWeek = matched.isNewThisWeek;
            }
            if (matched.forecastKey !== undefined) {
              item.forecastKey = matched.forecastKey;
            }
          }
        });
        // 档位内排序
        tier.items.sort((a, b) => a.rank - b.rank);
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
export function upsertModel(cat, modelData, targetTierKey = "dingji") {
  const existingIdx = cat.fullList.findIndex(
    (m) => m.name.toLowerCase() === modelData.name.toLowerCase()
  );

  if (existingIdx !== -1) {
    cat.fullList[existingIdx] = { ...cat.fullList[existingIdx], ...modelData };
  } else {
    cat.fullList.push(modelData);
    if (cat.tiers && cat.tiers[targetTierKey]) {
      const tier = cat.tiers[targetTierKey];
      const tierExistingIdx = tier.items.findIndex(
        (m) => m.name.toLowerCase() === modelData.name.toLowerCase()
      );
      if (tierExistingIdx === -1) {
        tier.items.push(modelData);
      }
    }
  }

  rebalanceCategory(cat);
}

// 命令行运行支持
const args = process.argv.slice(2);
if (args.includes("--lint") || args.includes("--check")) {
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

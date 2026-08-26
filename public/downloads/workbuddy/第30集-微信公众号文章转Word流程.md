# 微信公众号文章 → Word 自动化流程

> 完整、可复用的本地工作流。从本机微信收藏/公众号文章，经解密取链接、浏览器抓取正文与配图，生成带图的 Word。
> 全程本地、不碰网络。首次验证于 2026-08-23（macOS + WeChat + AgentLimb）。

---

## 0. 适用场景

- 把微信里收藏 / 关注的公众号文章，整理成**带原文配图**、可保存、可发同事的 Word。
- 前提：文章是**公开公众号文章**（链接在 `mp.weixin.qq.com`），且已在本机微信中（收藏或聊天记录）。

## 1. 前置依赖

| 依赖 | 说明 |
|---|---|
| macOS + 已登录微信 | WeChat 进程需在运行，`wechat-cli` 已 `init` 提取密钥 |
| `@canghe_ai/wechat-cli` (v0.2.4) | 读本地微信数据。**注意：它不暴露文章 URL** |
| `brew install sqlcipher` | 解密加密的 `favorite.db` |
| Python venv | `python-docx` + `Pillow`（生成 Word / 处理图片） |
| 本机 Chrome + AgentLimb | bridge `http://127.0.0.1:7791`，用于真实浏览器抓正文 |

## 2. 步骤

### A. 本地解密取链接（关键一步）

`wechat-cli` 的 `favorites`/`history`/`search` **只返回标题，不返回 URL**（link 消息只显示 `[链接/文件]`）。URL 实际躺在**加密的 SQLCipher** `favorite.db` 里。

1. 确认收藏库与钥匙：
   - 库：`~/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/<wxid>/db_storage/favorite/favorite.db`
   - 钥匙：`~/.wechat-cli/all_keys.json` → `favorite/favorite.db` 下的 `enc_key`（64 hex = 32 字节 AES-256 原始密钥）
2. 用 sqlcipher 解密（**参数必须在 `PRAGMA key` 之前设置**）：
   ```sql
   PRAGMA cipher_page_size=4096;
   PRAGMA cipher_kdf_iter=64000;
   PRAGMA cipher_hmac_algorithm=HMAC_SHA512;
   PRAGMA cipher_default_use_hmac=1;
   PRAGMA key = "x'<enc_key>'";
   SELECT content FROM fav_db_item WHERE local_id=<今日收藏的id>;
   ```
3. `content` 是 appmsg XML，URL 在 `<link>` 里（HTML 实体 `&amp;` 需还原为 `&`）。抠出 `https://mp.weixin.qq.com/s?...` 即为原文链接。

### B. AgentLimb 抓正文

- **直接 `call` 即可，不要 `agentlimb start`**（`start` 会阻塞等外部任务）。
- extension 约**每 20 秒轮询一次**，每次 `call` 要耐心等约 20s 才被认领。
- `navigate` 务必 `waitForLoad:false`，否则整页加载会超 Bridge 调用超时。
- `javascript_eval` 返回路径：`completed.call.result.result.value`（字符串，需再 `json.loads`）。
- 抽取脚本里**不能声明 `title`/`author`/`date`/`url` 等变量**（包装作用域已占用）→ 用 `__` 前缀避开。
- 公众号正文在 `#js_content`，标题 `#activity-name`，公众号 `#js_name`，日期 `#publish_time`。抽取后保存 `bodyHtml` 与 `bodyText`。

### C. 下载配图

- 公众号配图在 `mmbiz.qpic.cn`，带 `Referer: https://mp.weixin.qq.com/` + 普通浏览器 UA 即可稳定下载，无需额外 token。
- 从 `bodyHtml` 提取 `<img src>`（注意：`<img>` 的 `alt` 即图注文字），逐张 curl 下载。
- 用 magic byte 检测格式（png/jpeg/webp）；若为 webp 用 Pillow 转 PNG。生成映射 `{idx: {src, local, alt, ok}}`。

### D. 生成 Word

- 用 `html.parser` 解析 `bodyHtml` → 结构化块（标题 `h` / 段落 `p` / 图片 `img`）。
- 图片块：嵌入真实图片（`add_picture(width=Inches(5.8))`，等比缩放），用 `alt` 作图注（居中斜体 9pt）。
- **图注重复处理**：HTML 中 img 后常重复一次 strong 图注文字（parser 会当成 `h` 块），用 alt 作图注后跳过 img 后紧邻的 strong-only 块，避免重复。
- `doc.save(tmp); os.replace(tmp, OUT)` 原子覆盖，避免与预览实例写冲突。
- 第一页放文章信息（标题/公众号/日期/原文链接）+ 200~300 字摘要，正文按原文结构整理，末尾附原文链接与说明。

## 3. 踩坑清单（务必先看）

1. `wechat-cli` 不暴露 URL → 必须解密 `favorite.db`，URL 不在输出层，在加密库里。
2. sqlcipher 参数顺序：4 个 `PRAGMA` 必须在 `PRAGMA key` 之前，否则库打不开。
3. AgentLimb：`start` 会阻塞；`navigate` 必须 `waitForLoad:false`；结果在 `result.value`。
4. `javascript_eval` 脚本变量命名冲突 → 用 `__` 前缀。
5. 图片图注定要 `alt` 去重，否则会显示两遍。

## 4. 产物

- Word：`Claude_Code_创业公司指南.docx`（含 6 张原图，约 1MB）
- 脚本：`build_word.py`（HTML→Word）、`download_imgs.py`（下载配图）
- 中间数据：`/tmp/wx_raw.txt`、`/tmp/wx_body.html`、`/tmp/wx_body.txt`、`/tmp/img_map.json`

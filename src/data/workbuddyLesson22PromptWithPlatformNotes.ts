import { workbuddyLesson22Prompt } from "./workbuddyLesson22Prompt";

const platformNotes = `# 使用前必读：系统兼容性、风险与 Windows 说明

> 本课件使用第三方开源方案，不是腾讯或微信官方功能。读取或分析本机微信数据，可能引发账号异常、限制使用或封禁等风险。请仅用于学习和教学，并自行承担使用决定及后果；课程与网站不对账号、数据、业务或其他损失负责。

## 1. 通用安全边界

- 仅在自己的本机、自己的测试账号和最小范围数据中验证。
- 不要把微信数据库、密钥文件、账号密码、masterkey 或完整聊天记录上传、分享或粘贴给 AI。
- 不要自动发送、修改或删除微信内容；本 Skill 只用于读取、搜索、分析、总结和导出。
- 任一步失败时，先保留报错并检查环境；不要反复初始化，更不要为了排错泄露密钥。

## 2. macOS 与 Windows 的差异

- 本课程已在 macOS 环境完成基础测试与配置。Windows 的文件路径、权限、微信客户端结构和工具安装方式不同，不能直接照搬 Mac 步骤。
- 我们核对的旧版开源文档写明：**npm install -g @canghe_ai/wechat-cli** 只提供 macOS arm64 二进制；Windows 请使用 pip 或从源码安装。pip 路线要求 Python >= 3.10：

  ~~~powershell
  pip install wechat-cli
  ~~~

- 保持微信登录，并至少打开过一个会话；然后在有足够权限的 Windows 终端中执行：

  ~~~powershell
  wechat-cli init
  wechat-cli sessions
  ~~~

  **init** 负责检测数据目录、提取密钥并写入本机状态；**sessions** 用于验证最近会话是否可读。不要因为失败而反复 init，也不要输出或分享密钥。
- 原项目文档没有给出 Windows 微信客户端的明确版本要求。因此，“只能 3.x”或“4.x 一定不行”都不是可写入本课件的通用结论；必须在自己的隔离测试环境中验证。原 npm 包目前已标记为 deprecated，项目状态可能变化。

## 3. Windows 社区排障线索（非官方、未验证）

有网友反馈：Windows 端按 pip 路线部署失败后，改用 chatlogkeeper 方案取得 masterkey；但 chatlogkeeper 与 CLI 的密钥格式不同，还需根据实际报错完成格式适配和解库验证。该路线不属于本项目的已核对安装流程。

这只是社区经验，不构成可复现承诺或技术支持。若无法在隔离测试环境中完成验证，请停止继续配置。

---

`;

export const workbuddyLesson22PromptWithPlatformNotes = `${platformNotes}${workbuddyLesson22Prompt}`;

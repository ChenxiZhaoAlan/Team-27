# Team 27 P0 工程基线修复

任务日期：2026-10-30。最终报告整理：2026-11-02（Pacific/Auckland）。
按用户指定保留本日志文件名。执行环境曾暂停，检查耗时不代表项目正常运行性能。

## 修改摘要
- 修复 Windows 路径测试：使用已有 path.resolve 构造预期路径，保留全部目录越界、远程 URL 拒绝断言。
- 对四个指定前端文件运行项目已有 Prettier 3.9.6。逐字比较确认仅 CRLF 转 LF，没有修改代码、CSS 属性值、页面文案或动画行为。
- 将外层四份交接文档原样复制到实际 Git 根目录；复制前目标均不存在，复制后 SHA256 与外层一致，外层文件保留。
- 没有改变 package.json、pnpm-lock.yaml、pnpm-workspace.yaml、构建脚本、Git 配置或依赖版本。

## 涉及文件
- tests/offline.test.mjs：跨平台断言及其必要格式调整。
- src/pages/home.js：仅换行格式。
- src/styles/home.css：仅换行格式。
- src/styles/opening.css：仅换行格式。
- src/ui/intro-template.js：仅换行格式。
- AGENTS.md：新增原样副本。
- docs/PROJECT_CONTEXT.md：新增原样副本。
- docs/ROADMAP.md：新增原样副本。
- logfolder/README.md：新增原样副本。
- logfolder/2026-10-30-p0-engineering-baseline.md：本记录。

## 环境排查
Git status 在授予实际仓库访问权限后恢复正常，修改前工作区干净。未更改 Git 配置。
系统 pnpm 为 12.16.1，其启动器尝试切换项目指定 11.19.0 时因缓存锁文件写权限失败而回退；没有升级或降级系统 pnpm。
在独立临时工具目录安装并确认 pnpm 11.19.0，通过 node 调用其官方 bin/pnpm.cjs。没有将其添加到项目依赖。

## Codex 环境历史验证结果
| 检查 | 状态 | 证据与边界 |
| --- | --- | --- |
| pnpm 11.19.0 版本查询 | 通过 | 输出 11.19.0 |
| pnpm install --frozen-lockfile | 阻塞，未验证通过 | 在验证副本中执行，并用 --store-dir 指向临时缓存；退出码 1，创建 store/v11/projects 符号链接时报 EPERM |
| pnpm test | 未验证 | 在验证副本中实际启动；长时间无最终输出，环境恢复后终止，终止退出码 1，不视为测试断言失败 |
| pnpm check | 未验证 | 同上 |
| pnpm build | 未验证 | 同上；本轮未得到成功构建证据 |
| node --test tests/*.test.mjs | 通过 | 原仓库现有依赖，9 项通过、0 失败，退出码 0 |
| node node_modules/prettier/bin/prettier.cjs --check src scripts tests README.md | 通过 | 完整现有格式检查范围，输出 All matched files use Prettier code style，退出码 0 |
| git diff --check | 通过 | 未输出空白错误；Git 提示未来可能 LF 转 CRLF，属于换行策略提示 |
| git diff --stat 与 git diff | 已人工核对 | 受跟踪内容差异仅测试断言，1 文件、4 行新增/1 行删除；四个前端文件只有工作区换行变化 |
| 原有文件 SHA256 核对 | 通过 | 81 个原文件中仅授权的 5 个文件改变；其他文件包括旧 dist/releases、锁文件和工程配置保持不变 |
| 四份交接文档 SHA256 核对 | 通过 | 内外副本逐一一致 |

pnpm 命令均使用临时固定版本入口 node ../tools/node_modules/pnpm/bin/pnpm.cjs，未使用系统回退的 12.16.1。
直接 Node/Prettier 检查是补充证据，不等价于 pnpm 冻结安装与构建全流程通过。
验证副本位于仓库外的独立临时工作目录，没有 .git，不是正式开发仓库，未推送。Codex 修复阶段没有复制或覆盖原仓库构建产物。

## 普通 Windows PowerShell 本地验收补充（2026-11-02）
证据来源：用户提供的实际运行结果；以下命令未由 Codex 在本轮重新执行。

| 项目 | 用户报告的结果 |
| --- | --- |
| Node.js | v24.17.0 |
| pnpm | 11.19.0 |
| pnpm install --frozen-lockfile | 成功，Already up to date |
| pnpm test | 9/9 通过 |
| pnpm check | 通过 |
| pnpm build | 成功，生成 releases/TEAM27-v3-Offline.html，6,610,394 bytes |

本次冻结安装复用了已有依赖，并非全新空目录、无 node_modules 或空缓存安装验证，不能据此认定新环境链接创建问题已解决。用户确认 P0 本地验收通过；此前 Codex 沙箱 EPERM 与未完成命令保留为历史环境记录，不代表当前本地验收失败。
本轮 Codex 只读核对确认离线产物存在，长度为 6,610,394 bytes；文件长度一致不等于独立重跑构建或逐字节验证产物。

## 提交前收尾检查（2026-11-02）
- 分支 main；暂存区为空。已跟踪差异为跨平台测试断言；四个前端文件仅工作区换行变化，Git 归一化后没有内容差异。
- 新增文件仅 AGENTS.md、docs/PROJECT_CONTEXT.md、docs/ROADMAP.md、logfolder/README.md 与本日志。
- dist/、releases/、node_modules/ 均被 .gitignore 忽略，且没有已跟踪文件；没有发现待提交的临时文件。
- 本日志原有个人绝对路径已改为通用描述；交接文档中的项目 GitHub 链接属于项目上下文，测试中的 secret.txt 是安全断言样例，不是凭据。
- .gitattributes 尚不存在，未擅自新增。当前受跟踪文本的索引与工作区均为 LF；core.autocrlf=true 的重检出风险仍保留。
- 未执行 git add、commit、push、reset 或 clean；未修改网站 UI 或业务代码。

## Git 信息
- 分支：main
- 修改前 HEAD：55a2d31（Initial commit）
- 未创建 commit、未暂存、未 push；没有 PR/push 链接。
- 新增文档和本日志尚未跟踪，普通 git diff 不展示其内容，已另行核对。

## 剩余问题与建议
1. 用户已确认普通 Windows PowerShell 的 P0 本地验收通过，结果见上。全新环境冻结安装仍未验证，可作为后续可复现性检查，不应把 Already up to date 当作冷安装证据。
2. 系统 Git core.autocrlf=true，四个前端文件在重新检出后可能恢复 CRLF 并再次触发 Prettier。永久固定换行策略建议另行授权新增 .gitattributes；本次未增加该文件、未修改 Git 或 Prettier 配置。
3. 原构建脚本会删除并重建 dist。此前 Codex 仅在副本尝试构建；本轮收尾未执行构建，也未写入原仓库 dist/releases。用户已自行完成本地构建。
4. 未执行浏览器视觉验收；四个前端文件仅换行变化，无 UI/业务修改。

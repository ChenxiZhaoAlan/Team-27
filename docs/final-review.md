# TEAM27 v3 独立架构复审

审查日期：2026-09-17。范围：`the27society-site` 当前源代码、构建脚本与测试定义。审核智能体未修改 Site、未操作浏览器、未部署、未重新运行安装/构建/测试。

## 最终结论

**静态审查通过；未发现阻塞交付的 P0/P1/P2 缺陷。** 前轮提出的开场响应式规则回归、CSS 无效定位覆盖、离线构建门槛问题已经修正。保留一个 P3 生命周期清理建议，见下文。此结论不替代主任务的浏览器视觉与交互验收。

## 需求与修复核对

- 应用分为 core、data、pages、features、motion、styles、ui，43 个源文件；本次量测最长源代码行 328 字符，没有原先约 30 KB 的应用巨型行。dialog 模板已抽入 `src/ui/dialog-template.js`。
- 图片与字体在 assets 中独立保存，供应商库固定于 vendor；源代码未嵌入图片/字体 data URL。dist 与 releases 是构建产物，单 HTML 的资源内嵌是合理分发设计。
- `src/styles/responsive.css` 不再含开场 145/125 px 底部 padding 与 12%/7% 文案偏移；`opening.css` 保留明确 grid 布局及单一 overflow 策略，原 left/top/inset、padding 的失效覆盖已删除。
- `src/styles/home.css:68` 的 `.hero-digit` 统一提供 2 与 7 的红色阴影；`.hero-line` 使用可见溢出，标题行高已调整。代码措施成立，实际无裁切与红边观感需以浏览器截图确认。
- `scripts/offline.mjs:54` 对构建标记做恰好一次与无剩余标记检查；`:64` 检查静态 HTML 资源及 CSS import/url；`src/core/assets.js:7` 对离线 manifest 缺项抛错。检查覆盖当前资源模式；不能据此声称覆盖任意未来动态网络代码。
- pnpm 11 配置已采用 `pnpm-workspace.yaml` 的 `allowBuilds`，并固定 pnpm 与依赖版本。主任务报告 install/build/9 tests 成功；这属于主任务运行证据，本审核未独立重跑。

## 状态与动画生命周期

页面销毁会清理功能事件与 GSAP context；指针 quickTo 纳入 context/matchMedia；练习反馈动画进入页面 context。筛选仅替换结果，换手恢复按钮焦点，成员翻牌保存在 state。暂停动效不再全量重绘。

开场订阅动效偏好，能够停止 idle 或结束正在播放的退场，恢复 inert 与滚动状态；弹窗清理自己的动画。路由转场具备取消、Promise 收尾与序列检查。静态检查未发现遗留的阻塞状态或明显的未归属页面动画。

## 非阻塞建议

**P3：BFCache 返回后的应用级清理监听可能被提前消耗。** `src/main.js:73–90` 的 pagehide 使用 `once:true`，但 `event.persisted` 时提前返回。首次进入 BFCache 也会移除这次监听，恢复后下一次离开不再执行显式 dispose。页面级路由清理仍存在，最终文档销毁由浏览器回收，因此不作为交付阻塞。最小修复：删除 `once:true`，依靠非 persisted 分支末尾的 `appEvents.dispose()` 移除监听。此项由静态事件语义判定，未做 BFCache 浏览器复现。

## 运行验证边界

本报告不声称已验证移动开场、横屏低高度、字体实际绘制、快速连续导航、动效偏好切换、离线断网打开或内存稳定性。主任务应将其浏览器回归结果单独保存。源码修复关闭与实际观感验收是两类证据。

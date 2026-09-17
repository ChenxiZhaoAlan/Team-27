# The 27 Society 源码包

源码入口与离线演示文件分开交付。修改源码后通过构建命令生成预览和离线 HTML。

## 先看哪一份

朋友要 review 或修改页面时，请打开源码目录中的可读文件：

- `src/main.js`：应用入口、初始化与页面挂载。
- `src/pages/home.js`：首页内容结构和首屏模块。
- `src/styles/home.css`：首页视觉样式。
- `src/data/assets.js`：图片路径映射。
- `src/data/`：活动、成员、练习手牌和对话文案。
- `src/motion/`：intro、页面动效、转场和动效偏好。

请用 IDE 打开这些源码文件。`dist/offline-preview.html` 是给浏览器离线演示的生成文件，资源已内嵌，体积很大，不能作为源码阅读入口。

## 当前结构

```text
the27society-site/
├── src/
│   ├── core/       # 资源、DOM、路由、状态等基础能力
│   ├── data/       # assets、events、hands、members、dialogs
│   ├── features/   # dialogs、events、members、navigation、practice、share
│   ├── motion/     # intro、page、preferences、runtime、transition
│   ├── pages/      # home、club、members、events、event-detail、partners、online
│   ├── styles/     # base、layout、home、pages、components、opening、responsive
│   ├── ui/         # intro 和页面模板
│   ├── index.html
│   └── main.js
├── assets/
│   ├── images/     # poker-detail、poker-table、Auckland image
│   └── fonts/      # 本地字体文件
├── vendor/         # GSAP 与 ScrollTrigger 本地副本
├── scripts/        # build、offline、serve
├── tests/          # offline、routes and practice
├── dist/           # 构建后的预览文件，不直接手改
└── releases/       # 离线演示发布目录
```

## 常用命令

项目声明使用 Node `>=22`、pnpm `11.19.0`。在 `the27society-site/` 内运行：

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm check
pnpm serve
```

`pnpm serve` 用于本地 localhost 预览，端口按当前脚本配置为 `8765`。设置 PORT 环境变量可以更换端口。

## 修改入口映射

| 想修改的内容                          | 首选入口                                              |
| ------------------------------------- | ----------------------------------------------------- |
| 首页标题、首屏模块、首页 section 顺序 | `src/pages/home.js`                                   |
| 首页字体大小、间距、hero 和响应式     | `src/styles/home.css`、`src/styles/responsive.css`    |
| 全局颜色、字体、按钮、布局            | `src/styles/base.css`、`layout.css`、`components.css` |
| 活动名称、格式、概念状态              | `src/data/events.js`                                  |
| 成员 archetype 和概念文案             | `src/data/members.js`                                 |
| 练习手牌与答案反馈                    | `src/data/hands.js`、`src/features/practice.js`       |
| 图片路径与替换素材                    | `src/data/assets.js` 和 `assets/images/`              |
| intro 牌组与揭幕动效                  | `src/ui/intro-template.js`、`src/motion/intro.js`     |
| 页面滚动 reveal、视差、动效清理       | `src/motion/page.js`、`src/motion/runtime.js`         |
| 路由和页面切换                        | `src/core/router.js`、`src/motion/transition.js`      |
| 构建后的文件                          | 修改 `src/` 后运行 `pnpm build`，不要直接改 `dist/`   |

## Source 与 Offline Demo

Source 是可读和可维护的来源：模块、数据、样式、动效和素材分别存放，便于朋友 review、定位修改和重新构建。

Offline Demo 是便携演示：构建脚本把必要的脚本、样式、字体和图片内嵌到单 HTML，方便在没有项目依赖的情况下用浏览器演示。图片仍会占据较大体积；资源被分行存入独立的 JSON 数据块，不混在业务 JavaScript 中。运行时仍会解析全部图片资源，未宣称按需加载。

源码包排除 `node_modules/`、大型离线 HTML 和旧补丁文件；附带 `dist/` 预览（不含大型 offline-preview.html），可用浏览器打开 dist/index.html；不要在生成文件中手工修改。

## 依赖与素材说明

- 构建使用 [esbuild 官方 Getting Started](https://esbuild.github.io/getting-started/) 所述的构建方式；GSAP 当前许可参考 [GSAP Standard License](https://gsap.com/licensing/)。
- `poker-detail.png`、`poker-table.png` 用作概念视觉素材，不能当作真实成员、真实活动或真实社团记录。
- `auckland.jpg` 的页面替代文字标注为 Alan Levine、CC0；来源：[Wikimedia Commons](https://commons.wikimedia.org/wiki/File:The_Auckland_skyline_in_an_extended_night_exposure_%282478316%29.jpg)。
- 当前项目没有后端、真实注册、预约、会员系统或 API；页面中的成员、活动、伙伴与联系方式内容仍是概念/待确认内容。

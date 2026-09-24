# KPC LIVE · Platinum Arena

铂银品牌官网设计原型。Vite + 原生 HTML / CSS / JavaScript，无后端。

## 运行

```sh
npm install
npm run dev -- --port 4186
npm run build
```

- 本地：http://127.0.0.1:4186/
- 页面：`#/`、`#/players/all`、`#/videos`、`#/news`、`#/news/1`、`#/login`
- 顶部导航全部定位首页锚点：`#/home/players`、`#/home/events`、`#/home/videos`、`#/home/news`、`#/home/about`、`#/home/contact`。旧锚点 `#/players`、`#/events`、`#/about`、`#/contact` 继续兼容。
- 模块内「查看全部」进入独立列表页 `#/videos`、`#/news`、`#/players/all`。

## 内容维护

- `src/data.js`：选手、新闻摘要、视频编排样本。
- `src/style.css`：完整响应式设计 token 和样式。
- `src/main.js`：首页、列表、阅读页、原生弹窗、日历与筛选。
- `design/direction.md`：内容框架映射、设计方向与生图素材记录。
- `design/hero-concept.png`：生图首屏概念，未宣称已获需求方批准。

可用交互：导航与返回、移动菜单、人物详情、赛事日历翻月及空状态、导出暂定赛事 ICS、视频分类及赛季交叉筛选、资讯列表及摘要阅读、登录表单格式验证。

## 发布前需要接入

真实账号、报名、视频播放源、商城、App 下载链接、多语言翻译、完整选手库、合作伙伴标识、邮箱、社群链接与法律文本。

登录表单仅做本地格式验证，不发送、存储或注册账号。页面明确提示勿输入真实密码。
视频卡片是内容编排示意，不伪造播放量、时长或播放进度。赛事日历日期来自提供的 MD，导出事件标为 TENTATIVE。

## 图像与字型

主视觉通过内置 Image Gen 生成并保存至 `public/assets/platinum-chip.png`。其余使用真实 KPC 赛事报道照片作视觉提案，正式上线前需用授权原图替换。

- Tony Lin / 赛场照片：https://somuchpoker.com/news/king-poker-cup-main-event-ren-lin-wins
- Matas Cimbolas：https://somuchpoker.com/news/king-poker-cup-main-event-day-1a-recap
- 余磊：https://somuchpoker.com/news/lei-yu-wins-in-the-final-coronation
- Cormorant Garamond：https://fonts.google.com/specimen/Cormorant+Garamond

导航、按钮和正文均为 HTML 实时排版，不是整页截图。字体已本地化。

## 全局视觉配置
右下角「视觉配置 → 英文字体」可实时切换 Cormorant Garamond、Bodoni Moda、Cinzel、Italiana、Manrope，并恢复原版。影响首页、赛事、品牌宣言、人物名与登录视觉的英文大标题，中文、导航和 Logo 不变。选择保存在当前浏览器的 localStorage，不跨设备同步。字体文件本地托管在 `public/assets/fonts`。

「首屏背景」提供银冠悬境、荣耀之形、银光切面、冠军加冕、全场沸腾（默认）五种方案，均为 AI 摄影或 3D 渲染方向概念，不代表真实人物或赛事。新版素材为 `public/assets/hero-*-v2.webp`、`hero-*-v3.webp` 和 `hero-*-v4.webp`，生成方式和提示词见 `design/hero-v2.md`、`design/hero-v3.md`。

背景配置在 `src/hero-backgrounds.js` 维护。默认视觉组合为「全场沸腾 / Italiana / 聚光舞台 / 沉浸赛事」；浏览器内的旧视觉组合会一次性更新，之后各项选择仍独立保存在 localStorage，切换背景保持标题排版不变。

第四轮新增 3D 配图：`public/assets/hero-orbit-v4.webp`、`public/assets/hero-monolith-v4.webp`。完整提示词见 `design/hero-v4.md`。

## 选手轮播方案
右下角「视觉配置 → 选手轮播」提供精致画廊（原版）、聚光舞台（中央透视）、电影长廊（横幅视差）、银卡序列（扇形叠层）。仅影响首页选手模块，保留九位选手和详情入口。配置保存至 `kpc-live:player-carousel`，与背景和字体独立。移动端可滑动，方向键/Home/End 可导航，减少动态效果时关闭透视与视差。

四套选手轮播均支持首尾循环。自动播放默认关闭，可在视觉配置中开启，独立保存至 `kpc-live:player-autoplay`。开启后每 6 秒前进一位，悬停、模块内键盘聚焦、详情弹窗打开、页面不可见或模块离开视口时暂停；减少动态效果时不自动播放。

# 🎿 Ski Tracker PWA

一个用于分析滑雪轨迹数据的 Progressive Web App，支持导入 Slopes 导出的 KML 文件。

## ✨ 功能特性

- ✅ 导入 KML 文件（从 Slopes 应用导出）
- ✅ 地图轨迹可视化（使用 Leaflet + OpenStreetMap）
- ✅ 详细统计数据展示
  - 距离（米/公里）
  - 持续时间
  - 平均速度（km/h）
  - 最大速度（km/h）
  - 数据点数量
- ✅ 三个主要标签页：Tracks（轨迹列表）、Map（地图）、Stats（统计）
- ✅ 响应式设计，支持移动端和桌面端
- ✅ PWA 支持，可安装到主屏幕
- ✅ 离线缓存支持

## 🚀 快速开始

### 本地开发

```bash
cd ski-tracker-pwa
npm install
npm run dev
```

访问 http://localhost:5173/

### 构建生产版本

```bash
npm run build
```

构建后的文件在 `dist` 目录。

## 📱 部署到 GitHub Pages（推荐，免费）

### 方法 1: 使用 GitHub Actions（自动部署）

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ski-tracker-pwa.git
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"
   - 创建工作流文件：`.github/workflows/deploy.yml`

   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '20'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. **等待部署完成**
   - 访问 `https://YOUR_USERNAME.github.io/ski-tracker-pwa/`

### 方法 2: 手动部署

```bash
npm run build
npx gh-pages -d dist
```

需要先安装 gh-pages：
```bash
npm install -D gh-pages
```

## 🌐 其他部署平台

### Vercel（推荐）
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Cloudflare Pages
```bash
npm run build
npx wrangler pages publish dist
```

## 📲 如何使用 PWA

### 在 iOS 上安装

1. 在 Safari 中打开应用
2. 点击分享按钮（方框带箭头）
3. 选择"添加到主屏幕"
4. 点击"添加"

### 在 Android 上安装

1. 在 Chrome 中打开应用
2. 点击菜单（三点）
3. 选择"安装应用"或"添加到主屏幕"

## 📊 使用说明

1. 点击"Upload KML File"按钮导入文件
2. 或者点击"Load Sample Data"查看示例
3. 在 Tracks 标签页选择一个滑雪道
4. 切换到 Map 标签页查看轨迹
5. 切换到 Stats 标签页查看统计数据

## 🔧 技术栈

- **React 19** - UI 框架
- **Vite** - 构建工具
- **Leaflet** - 地图渲染
- **vite-plugin-pwa** - PWA 支持
- **OpenStreetMap** - 地图数据源

## 📦 文件结构

```
ski-tracker-pwa/
├── public/
│   └── sample.kml              # 示例 KML 文件
├── src/
│   ├── components/
│   │   ├── FileUpload.jsx      # 文件上传组件
│   │   ├── TrackList.jsx       # 轨迹列表
│   │   ├── TrackMap.jsx        # 地图组件
│   │   └── TrackStats.jsx      # 统计组件
│   ├── utils/
│   │   └── kmlParser.js        # KML 解析器
│   ├── App.jsx                 # 主应用
│   ├── App.css                 # 样式
│   ├── main.jsx                # 入口文件
│   └── index.css               # 全局样式
├── index.html
├── vite.config.js              # Vite 配置（含 PWA）
└── package.json
```

## 🎨 自定义

### 修改主题颜色

在 `App.css` 中修改 CSS 变量：

```css
body {
  background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}
```

### 修改地图样式

在 `TrackMap.jsx` 中修改 Leaflet 图层：

```javascript
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);
```

## 📝 分享给朋友

### 方式 1: 链接分享
直接分享部署后的 URL，朋友打开即可使用。

### 方式 2: 生成 QR 码
```bash
npm install -g qrcode-cli
qrcode "https://YOUR_URL.com" > qr-code.png
```

### 方式 3: 提供 KML 文件
朋友需要：
1. 打开应用链接
2. 上传他们的 KML 文件

## 🔒 隐私

- 所有数据处理在浏览器本地完成
- 不上传任何数据到服务器
- KML 文件仅在解析时使用，不会存储

## 📄 License

MIT License - 仅供个人学习和使用

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## ❓ 常见问题

**Q: 为什么地图不显示？**
A: 检查网络连接，地图需要从 OpenStreetMap 加载数据。

**Q: PWA 安装后无法打开？**
A: 确保 URL 使用 HTTPS，PWA 要求 HTTPS。

**Q: 如何添加自己的 KML 文件？**
A: 从 Slopes 应用导出 KML 文件，然后点击"Upload KML File"按钮。

**Q: 可以分析其他格式的轨迹文件吗？**
A: 目前仅支持 Slopes 导出的 KML 格式，未来可能支持 GPX。

## 📞 支持

如有问题，请在 GitHub Issues 中提交。

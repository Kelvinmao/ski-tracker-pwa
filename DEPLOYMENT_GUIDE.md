# 🚀 Ski Tracker PWA 部署指南

## 方案一：Vercel（推荐，最简单）⭐

### 准备工作

1. 确保你有 GitHub 账号
2. 确保代码已提交到 GitHub 仓库

### 步骤 1：创建 GitHub 仓库

```bash
cd ski-tracker-pwa

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - Ski Tracker PWA"

# 在 GitHub 上创建新仓库（空的）
# 然后运行以下命令（替换 YOUR_USERNAME）
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ski-tracker-pwa.git
git push -u origin main
```

**或者使用 GitHub CLI（更快）：**
```bash
gh repo create ski-tracker-pwa --public --source=. --remote=origin
gh repo set-default
git push -u origin main
```

### 步骤 2：部署到 Vercel

#### 方法 A：通过网页（最简单）

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Sign Up"，用 GitHub 账号登录
3. 点击 "Add New..." → "Project"
4. 选择你的 `ski-tracker-pwa` 仓库
5. 点击 "Deploy"

**就这么简单！** ⏱️ 约 1-2 分钟

部署完成后，你会得到：
- 你的应用 URL（如：`https://ski-tracker-pwa.vercel.app`）
- 自动 HTTPS 证书
- 全球 CDN 加速

#### 方法 B：通过命令行

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

### 步骤 3：测试 PWA

1. 在浏览器中打开你的 URL
2. 打开开发者工具（F12）
3. 切换到 "Application" 标签
4. 左侧应该看到 "Service Workers" 和 "Manifest"
5. 在手机上打开 → 分享 → 添加到主屏幕

### 步骤 4：分享给朋友

直接分享 URL：
```
https://your-app-name.vercel.app
```

或者生成 QR 码：
```bash
npm install -g qrcode-terminal
qrcode-terminal "https://your-app-name.vercel.app"
```

---

## 方案二：GitHub Pages（完全免费）

### 步骤 1：创建 GitHub 仓库

同上（方案一的步骤 1）

### 步骤 2：启用 GitHub Pages

1. 打开你的 GitHub 仓库
2. 点击 Settings
3. 左侧菜单点击 "Pages"
4. Source 选择 "GitHub Actions"
5. 创建新的 Workflow 文件

### 步骤 3：创建 GitHub Actions 配置

在仓库中创建文件 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 步骤 4：推送配置

```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push
```

### 步骤 5：等待部署

1. 点击仓库的 "Actions" 标签
2. 等待 workflow 完成运行（约 1-2 分钟）
3. 访问 `https://YOUR_USERNAME.github.io/ski-tracker-pwa/`

---

## 方案三：Netlify（拖拽部署）

### 步骤 1：构建项目

```bash
cd ski-tracker-pwa
npm run build
```

### 步骤 2：部署

1. 访问 [netlify.com](https://netlify.com)
2. 注册/登录
3. 进入你的 Dashboard
4. 将 `dist` 文件夹拖拽到页面上的部署区域
5. 完成！

---

## 📋 部署检查清单

部署完成后，确认以下内容：

- [ ] URL 可以访问
- [ ] 地图正常显示
- [ ] 可以上传 KML 文件
- [ ] 统计数据正确显示
- [ ] 在手机上可以添加到主屏幕
- [ ] 离线时缓存内容可访问

---

## 🔍 排查问题

### 问题 1：地图不显示

**原因**：Leaflet CSS 未加载

**解决**：检查 `index.html` 是否包含：
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

### 问题 2：PWA 无法安装

**原因**：必须使用 HTTPS

**解决**：Vercel/GitHub Pages 自动提供 HTTPS，无需额外配置

### 问题 3：构建失败

**原因**：依赖问题

**解决**：
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 问题 4：样式错乱

**原因**：相对路径问题

**解决**：确保 `index.html` 中的路径正确

---

## 📱 给朋友的使用指南

发给朋友的说明：

```
🎿 Ski Tracker - 滑雪数据分析工具

1. 打开链接：https://your-app-name.vercel.app

2. 安装到手机（推荐）：
   iOS: Safari 打开 → 分享 → 添加到主屏幕
   Android: Chrome 打开 → 菜单 → 安装应用

3. 使用方式：
   - 点击"Upload KML File"上传你的 KML 文件
   - 或点击"Load Sample Data"查看示例
   - 选择滑雪道查看地图和统计数据

4. 从 Slopes 导出 KML 文件：
   - 打开 Slopes 应用
   - 选择你的滑雪记录
   - 点击分享/导出
   - 选择 KML 格式

💡 所有数据在本地处理，不会上传服务器
```

---

## 🔄 更新应用

更新代码后：

### Vercel
```bash
git add .
git commit -m "Update app"
git push
# Vercel 自动部署
```

### GitHub Pages
```bash
git add .
git commit -m "Update app"
git push
# GitHub Actions 自动部署
```

---

## 📊 监控和统计

### Vercel Analytics（免费）

1. 在 Vercel Dashboard 打开项目
2. 点击 "Analytics" 标签
3. 安装 Vercel Analytics 包：
   ```bash
   npm install @vercel/analytics
   ```
4. 在 `App.jsx` 中添加：
   ```jsx
   import { Analytics } from '@vercel/analytics/react'
   
   // 在 App 组件末尾添加
   <Analytics />
   ```

---

## 🎉 完成！

现在你的朋友可以通过以下方式使用：

1. **直接访问 URL**
2. **扫码 QR 码**
3. **安装 PWA 到手机**

享受零成本、零维护的滑雪数据分析工具！🎿⛷️
# Melodix Player
> 旋律演奏者 — 开源跨平台音乐播放器

[![CI](https://github.com/jianbaobao/melodix-player/actions/workflows/ci.yml/badge.svg)](https://github.com/jianbaobao/melodix-player/actions/workflows/ci.yml)
[![Release](https://github.com/jianbaobao/melodix-player/actions/workflows/release.yml/badge.svg)](https://github.com/jianbaobao/melodix-player/actions/workflows/release.yml)
[![Electron](https://img.shields.io/badge/Electron-32-blueviolet)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://react.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 简介

Melodix Player 是一款基于 Electron + React + TypeScript 构建的开源跨平台桌面音乐播放器。支持多种音频格式和加密格式解码，接入网易云音乐等平台的 API，拥有精美的深色主题界面。

## 特性

### 播放能力
- 多格式支持: MP3 / FLAC / WAV / AAC / OGG
- 加密格式解码: NCM（网易云）/ QMC（QQ音乐）/ KGM（酷狗）/ KWM（酷我）
- 基于 Howler.js 的高性能音频引擎

### 平台接入
- 网易云音乐 API（搜索、热门歌曲、排行榜）
- 可扩展架构，轻松接入更多平台

### 用户体验
- 深色主题毛玻璃界面
- LRC 歌词同步滚动
- 键盘快捷键控制
- 系统托盘后台运行
- 均衡器预设（流行/摇滚/重低音等）

### 工程特性
- Electron 桌面框架，跨平台运行
- GitHub Actions CI/CD 自动构建
- electron-updater OTA 自动更新
- 一键打包 Win/Mac/Linux 安装包

## 快速开始

```bash
# 克隆
git clone https://github.com/jianbaobao/melodix-player.git
cd melodix-player

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 预览
npm run preview
```

## 构建安装包

```bash
# Windows .exe
npm run build:win

# macOS .dmg
npm run build:mac

# Linux .AppImage
npm run build:linux

# 全部
npm run build:all
```

## 发布流程

打标签推送即可触发 GitHub Actions 自动编译三平台安装包并上传到 Releases：

```bash
git tag v1.0.0
git push origin v1.0.0
```

## 项目结构

```
melodix-player/
├── src/
│   ├── main/         # Electron 主进程
│   ├── renderer/     # React 前端界面
│   ├── apis/         # 音乐平台 API 适配器
│   ├── player/       # 音频引擎与解密模块
│   ├── types/        # TypeScript 类型定义
│   └── utils/        # 工具函数
├── .github/workflows/ # CI/CD 流水线
├── package.json
└── README.md
```

## 技术栈

框架: Electron 32 + React 18 + TypeScript
构建: Vite 5 + electron-builder
样式: Tailwind CSS + Lucide Icons
状态: Zustand
音频: Howler.js + Web Audio API
更新: electron-updater (GitHub Releases)

## 许可证

MIT License
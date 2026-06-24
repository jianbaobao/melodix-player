# Melodix Player 旋律演奏者

[![CI](https://github.com/jianbaobao/melodix-player/actions/workflows/ci.yml/badge.svg)](https://github.com/jianbaobao/melodix-player/actions/workflows/ci.yml)

基于 Electron + React + TypeScript 的开源跨平台音乐播放器。支持多格式、加密解码、多平台 API、深色 UI、歌词同步、排行榜。

## 快速开始

```bash
git clone https://github.com/jianbaobao/melodix-player.git
cd melodix-player
npm install
npm run dev    # 开发模式
npm run build  # 构建
```

## 发布版本

```bash
git tag v1.0.0
git push origin v1.0.0
```

自动编译 Windows(.exe) / macOS(.dmg) / Linux(.AppImage) 安装包。
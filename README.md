# 🐣 Mochi Island

Học tiếng Anh qua game — nuôi Mochi lớn lên bằng cách học từ vựng và phát âm.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Phaser.js 4** (game engine cho Mochi character)
- **react-router-dom** (routing)
- **Howler.js** (audio)
- **Web Speech API** (nhận diện giọng nói)
- **Firebase** (lưu tiến độ — cho sau)

## Quick Start

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

## Project Structure

```
src/
├── assets/          — images, audio, sprites
├── components/
│   ├── ui/          — Button, Modal, ProgressBar...
│   └── game/        — PhaserGame overlay
├── pages/           — Route-level pages
├── game/            — Phaser scenes
├── data/            — vocabulary.json, islands.ts
├── hooks/           — Custom hooks
├── store/           — GameContext (Mochi state)
├── utils/           — Helpers (levenshtein, ...)
├── services/        — Speech API wrappers
└── types/           — TypeScript interfaces
```

## Routes

| Path | Page |
|------|------|
| `/` | Home — Mochi + HUD |
| `/map` | Island Map |
| `/game/feed-the-word/:islandId/:levelId` | Mini-game 1 |
| `/game/say-it/:islandId/:levelId` | Mini-game 2 |
| `/feed` | Feed Mochi |

## Planning

Xem [OVERVIEW.md](./OVERVIEW.md) cho concept tổng thể và [VOCABULARY.md](./VOCABULARY.md) cho nội dung từ vựng.

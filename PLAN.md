# 📋 Mochi Island — Development Plan

## Legend
- ✅ **Done**
- 🔄 In Progress
- ⏳ Pending

---

## Phase 0 — Setup Project & Tooling ✅

| Step | Status |
|------|--------|
| 0.1 Khởi tạo React app (Vite + TypeScript) | ✅ |
| 0.2 Cài dependencies (phaser, howler, firebase, react-router-dom) | ✅ |
| 0.3 Cấu trúc thư mục src/ | ✅ |
| 0.4 Routing: Home → Island → Level → MiniGame | ✅ |
| 0.5 Phaser.js integration (MochiScene component) | ✅ |
| 0.6 Chuyển VOCABULARY.md → src/data/vocabulary.json (48 từ, 6 level) | ✅ |
| 0.7 GameContext (Mochi state: hunger, happiness, starFruits, evolution) | ✅ |
| 0.8 Web Speech API wrapper (speak + startListening) | ✅ |
| 0.9 String similarity utility (Levenshtein) | ✅ |
| 0.10 PLan docs | ✅ |

---

## Phase 1 — Màn hình Mochi cốt lõi ✅

| Step | Status |
|------|--------|
| 1.1 Mochi animations hoàn chỉnh (idle, happy, sad, eat, dance) — Phaser scene | ✅ |
| 1.2 Mochi state machine (hunger decay, happiness decay over time) | ✅ |
| 1.3 HUD — ProgressBar cho hunger/happiness, Star Fruit counter | ✅ |
| 1.4 Main screen layout — Mochi + buttons + HUD | ✅ |

---

## Phase 2 — Mini-game 1: "Feed the Word" ⏳

| Step | Status |
|------|--------|
| 2.1 Image asset system — Load hình cho từng từ (hiện đang placeholder text) | ⏳ |
| 2.2 Card component — 3 thẻ từ, hiệu ứng chọn/sai | ✅ Basic |
| 2.3 Logic game — Random từ đúng + nhiễu, session 5-6 từ | ✅ |
| 2.4 Reward animation — Star Fruit rơi, Mochi ăn + happy | ⏳ |
| 2.5 Session system — Track progress, kết quả cuối session | ✅ |

---

## Phase 3 — Mini-game 2: "Say it!" ⏳

| Step | Status |
|------|--------|
| 3.1 Web Speech API — SpeechSynthesis + SpeechRecognition | ✅ Wrapper |
| 3.2 Mic button — UI listening/processing/done states | ✅ Basic |
| 3.3 Pronunciation matching — So sánh transcript với từ đích | ✅ Similarity |
| 3.4 Feedback animation — Mochi nhảy múa / lắc đầu | ⏳ |
| 3.5 Audio fallback — Howler.js cho audio files | ⏳ |

---

## Phase 4 — Star Fruit & Mochi Evolution ⏳

| Step | Status |
|------|--------|
| 4.1 Star Fruit economy | ✅ Basic (ADD_STAR_FRUITS, FEED_MOCHI) |
| 4.2 Feed Mochi UI — chọn số lượng, animation ăn | ✅ Stub |
| 4.3 Evolution system — Baby → Child → Teen → Adult | ⏳ |
| 4.4 Island unlock — Mochi level → mở khóa đảo mới | ⏳ |

---

## Phase 5 — Nội dung 2 đảo đầu (Green Island + Food Island) ⏳

| Step | Status |
|------|--------|
| 5.1 Data layer — JSON vocabulary | ✅ vocabulary.json |
| 5.2 Green Island — 24 từ, 3 level | ✅ |
| 5.3 Food Island — 24 từ, 3 level | ✅ |
| 5.4 Image assets — Thu thập/tạo hình cho 48 từ | ⏳ |

---

## Phase 6 — Island Map & Navigation ⏳

| Step | Status |
|------|--------|
| 6.1 Island Map screen — 5 đảo, lock/unlock state | ✅ Stub (2 đảo) |
| 6.2 Island detail — level list, số sao đạt được | ⏳ |
| 6.3 Progress tracking — lưu từ đã học, số sao | ⏳ |

---

## Phase 7 — Save System & Persistence ⏳

| Step | Status |
|------|--------|
| 7.1 Capacitor Preferences save/load | ✅ |
| 7.2 Firebase Firestore — cloud sync (premium) | ⏳ |
| 7.3 Auth — anonymous Firebase Auth hoặc mã PIN | ⏳ |

---

## Phase 8 — Polish & Beta Launch ⏳

| Step | Status |
|------|--------|
| 8.1 Sound & Music — Howler.js BGM + SFX | ⏳ |
| 8.2 UI polish — animations, particles, responsive mobile | ⏳ |
| 8.3 Parental gate — cho in-app purchase | ⏳ |
| 8.4 Testing — với trẻ em 5-7 tuổi | ⏳ |
| 8.5 Vercel deploy | ⏳ |

---

## Phase 9 — Monetization ⏳

| Step | Status |
|------|--------|
| 9.1 Paywall screen — mở khóa đảo + skin | ⏳ |
| 9.2 Stripe/PayPal — subscription 49k/tháng | ⏳ |
| 9.3 Cloud sync — bật cho user trả phí | ⏳ |

---

## 🏗️ Component Tree

```
App
├── HomePage (Mochi + HUD)
│   ├── PhaserGame → MochiCharacter (idle/happy/sad/eat/dance)
│   ├── StatusBar (hunger, happiness, StarFruit)
│   └── ActionButtons (Học ngay, Cho ăn, Đảo)
├── IslandMap
│   ├── IslandCard (x5, locked/unlocked)
│   └── LevelList
├── GameScreen
│   ├── FeedTheWord (Mini-game 1)
│   │   ├── ImageDisplay
│   │   └── WordCards (x3)
│   ├── SayIt (Mini-game 2)
│   │   ├── AudioPlayer
│   │   └── MicButton
│   └── ResultScreen
├── FeedScreen (cho Mochi ăn)
└── PaywallScreen
```

## Routes

| Path | Page | Status |
|------|------|--------|
| `/` | Home | ✅ |
| `/map` | Island Map | ✅ |
| `/game/feed-the-word/:islandId/:levelId` | Mini-game 1 | ✅ |
| `/game/say-it/:islandId/:levelId` | Mini-game 2 | ✅ |
| `/feed` | Feed Mochi | ✅ |

## Run

```bash
npm run dev     # development
npm run build   # production build
```

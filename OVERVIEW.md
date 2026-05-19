---

# 🐣 "MOCHI ISLAND" — Concept Game

## Ý tưởng cốt lõi
> Bé **nuôi một sinh vật dễ thương tên Mochi** bằng cách học tiếng Anh. Mochi đói → bé học từ vựng + phát âm đúng → Mochi được ăn, lớn lên,섬 island phát triển.

**Hook đơn giản:** *"Con học tiếng Anh để nuôi Mochi lớn!"*

---

## 🎮 Gameplay Loop (vòng lặp chính)

```
Mochi đói/buồn
     ↓
Bé chơi mini-game học từ → đúng → nhận "Star Fruit"
     ↓
Dùng Star Fruit cho Mochi ăn → Mochi vui, lớn lên
     ↓
Mochi lớn → mở khóa đảo mới / bạn thú mới
     ↓
Bé muốn chơi tiếp → học tiếp
```

---

## 🕹️ 2 Mini-game cốt lõi (phù hợp 5–7 tuổi)

### Mini-game 1 — "Feed the Word" (Từ vựng + Hình ảnh)
- Màn hình hiện **1 hình ảnh** (con mèo, quả táo, màu đỏ...)
- Có **3 thẻ từ** để chọn
- Chọn đúng → Star Fruit rơi xuống → Mochi ăn và nhảy lên vui
- Chọn sai → Mochi lắc đầu buồn, thử lại

### Mini-game 2 — "Say it!" (Phát âm)
- Mochi "nói" một từ (audio tự động phát)
- Bé nhấn nút mic → **nói lại từ đó**
- Dùng Web Speech API để nhận diện
- Phát âm gần đúng → Mochi bắt chước và nhảy múa

---

## 🗺️ Cấu trúc nội dung (Content Map)

| Đảo | Chủ đề | Từ vựng |
|---|---|---|
| 🌿 Green Island | Động vật | cat, dog, bird, fish... |
| 🍎 Food Island | Thức ăn | apple, rice, cake, milk... |
| 🎨 Color Island | Màu sắc | red, blue, yellow, green... |
| 👨‍👩‍👧 Family Island | Gia đình | mom, dad, baby, sister... |
| 🏠 Home Island | Đồ vật | table, chair, bed, door... |

**Mỗi đảo: ~20 từ, 3–4 level**

---

## 💰 Monetization (đơn giản, phù hợp bootstrap)

| Miễn phí | Trả phí (49k/tháng) |
|---|---|
| Green Island + Food Island | Toàn bộ 10+ đảo |
| 1 loại Mochi | 5+ skin Mochi |
| Không lưu tiến độ cloud | Đồng bộ đa thiết bị |

---

## 🛠️ Tech Stack gợi ý (solo dev, chi phí 0đ)

- **React + Phaser.js** — game engine nhẹ, free
- **Web Speech API** — nhận diện giọng nói, built-in browser, free
- **Howler.js** — âm thanh, free
- **Firebase Firestore** — lưu tiến độ, free tier đủ dùng
- **Freepik / Itch.io** — asset nhân vật miễn phí (hoặc dùng AI gen)
- **Vercel** — deploy free

---

## 📅 Timeline thực tế cho solo dev

| Tuần | Việc cần làm |
|---|---|
| 1–2 | Setup project, làm màn hình Mochi cơ bản |
| 3–4 | Mini-game 1 (từ vựng + hình) hoàn chỉnh |
| 5–6 | Mini-game 2 (phát âm) + tích hợp Speech API |
| 7–8 | Hệ thống Star Fruit, Mochi lớn lên |
| 9–10 | 2 đảo đầu tiên đủ nội dung → **cho test** |
| 11–12 | Fix bug, polish UI → **launch beta** |

---

## 🏆 Điểm khác biệt với đối thủ

- **Lingokids / Duolingo Kids** — không có nhân vật nuôi được, ít cảm xúc
- **Mochi Island** — bé có **mối quan hệ cảm xúc** với Mochi → gắn kết lâu dài
- Tập trung **phát âm thật** qua mic — rất ít app Việt làm được điều này

---

**Bước tiếp theo bạn muốn làm gì?**

- 🎨 Mình giúp thiết kế **UI/UX màn hình đầu tiên**
- 💻 Mình giúp **setup code base** React + Phaser
- 📋 Mình tạo **danh sách từ vựng** đầy đủ cho 2 đảo đầu
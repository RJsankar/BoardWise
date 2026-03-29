# BoardWise

> Learn any board game in minutes, not rulebook-hours.

BoardWise is a guided board game teaching app. Instead of handing new players a 20-page rulebook, it walks them through each game with an 8-stage progressive tutorial — real photography, animated explainers, quick-check prompts, and a quick-reference card at the end.

---

## Features

- **8-stage universal lesson structure** — Intro → Goal → Setup → Turn Loop → Core Actions → Example Round → Endgame → Quick Reference
- **Per-scene photography** — real board photography matched to each teaching moment
- **8 motion primitives** — `highlight`, `move_token`, `flip_reveal`, `fade_in_text`, `count_up`, `zoom_region`, `pulse_legal`, `compare_correct_wrong` (Framer Motion)
- **Reduced-motion toggle** — respects `prefers-reduced-motion`; manual ✦/◎ toggle in the player header
- **Stage progress tracker** — 8-dot progress bar showing visited/active/pending stages
- **Quick Reference accordion** — expandable Q&A cards at the end of every tutorial
- **Completion screen** — scene count, turn-loop reminder, replay and back-to-games buttons
- **JSON-driven content** — all game data is structured data; adding a new game is just a new JS object

---

## Games

### Available Now

| Game | Family | Players | Time | Complexity |
|------|--------|---------|------|------------|
| Catan | Resource-conversion | 3–4 | 60–120 min | Medium |
| Ticket to Ride | Route-tableau | 2–5 | 45–75 min | Light |
| Sequence | Abstract-strategy | 2–12 | 30–60 min | Light |
| Monopoly Deal | Property-collection | 2–5 | 15–30 min | Light |
| UNO | Hand-management | 2–10 | 30–60 min | Light |

### Coming Soon

- **Azul** — tile-placement, 2–4 players
- **Exploding Kittens** — push-your-luck, 2–5 players
- **Taco Cat Goat Cheese Pizza** — reaction, 2–8 players

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI framework | React 18 |
| Build tool | Vite 5 |
| Animations | Framer Motion |
| Styling | CSS custom properties + component CSS |
| Content | Structured JS data objects (no backend) |
| Hosting | Static (Vite build) |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/RJsankar/BoardWise.git
cd BoardWise

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── TutorialPlayer.jsx   # Main orchestrator — wraps MotionConfig, renders player
│   ├── SceneCard.jsx        # Renders a single scene (image/animation + narration)
│   ├── MotionPrimitive.jsx  # 8 animated teaching primitives
│   ├── StageProgress.jsx    # 8-dot stage tracker with connector lines
│   ├── SceneNav.jsx         # Back / Replay / Skip / Next navigation bar
│   ├── QuickReferenceCards.jsx  # Accordion Q&A for quick-reference stage
│   └── CompletionScreen.jsx # End-of-tutorial summary screen
├── context/
│   └── MotionContext.jsx    # Reduced-motion state + OS preference detection
├── hooks/
│   └── useScene.js          # Scene navigation hook (next/back/replay/skip/goTo)
├── data/
│   ├── index.js             # Game registry
│   ├── schema.js            # Controlled vocabularies for stages, families, primitives
│   └── games/
│       ├── catan.js
│       ├── ticket-to-ride.js
│       ├── sequence.js
│       ├── monopoly-deal.js
│       └── uno.js
public/
└── assets/                  # Game photography (45 images across 3 games)
```

---

## Adding a New Game

1. Create `src/data/games/your-game.js` following the schema in `src/data/schema.js`
2. Add scenes covering all 8 stages
3. Register it in `src/data/index.js`
4. Drop images in `public/assets/` and reference them via `image:` on each scene

That's it — no component changes needed.

---

## Scene Data Schema

Each scene object supports:

```js
{
  scene_id: 'catan_s01',          // unique ID
  lesson_stage: 'intro',          // one of 8 stages
  title: 'Welcome to Catan',
  narration_text: '...',
  board_focus: 'full-board',      // hint for what to show
  image: '/assets/catan-midgame.png',  // optional — overrides animation
  components_involved: ['hex_tile', 'settlement'],
  highlight_targets: ['settlement'],
  motion_primitive: 'fade_in_text',   // used when no image
  user_takeaway: 'One-sentence lesson summary.',
  optional_quick_check: false,
}
```

---

## License

MIT

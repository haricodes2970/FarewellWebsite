# MASTER PROMPT — "From One Story to Another" Event Website

Copy everything below this line and paste it into Claude Code for VS Code.

---

## PROJECT CONTEXT

You are building a cinematic event website called **"From One Story to Another"** for the AI Nexus Club at Jyothy Institute of Technology, Department of AI & ML, Bangalore.

**What this event is:** A combined farewell (for graduating Batch 2026) and welcome (for incoming Batch 2028 & 2030) — styled as a **Hollywood Movie Premiere Night**. The 6th semester students (Batch 2027) are organizing it. It's not just farewell or freshers — it's both happening simultaneously, and the website reflects that duality.

**Theme:** "From One Story to Another" — one batch's story ending, another's beginning, with the organizers as the bridge between them.

**Date:** April 11, 2026 | Doors Open: 6:00 PM | Showtime: 7:00 PM
**Venue:** Jyothy Institute of Technology, Bangalore
**Organized by:** AI Nexus Club, Dept. of AI & ML

---

## TECH STACK

- **React + Vite** (already initialized, or initialize with `npm create vite@latest . -- --template react`)
- **GSAP + ScrollTrigger** — for ALL scroll animations, entrance reveals, horizontal carousels, and counter animations. Install: `npm install gsap`
- **Tailwind CSS** — for styling. Install and configure with Vite.
- **No other animation libraries.** GSAP handles everything.
- **No backend.** Fully static site. Will deploy on Vercel.

---

## FOLDER STRUCTURE

```
from-one-story/
├── public/
│   ├── club_logo.jpg              ← AI Nexus club logo (provided)
│   ├── snr_inv.jpg                ← Senior invitation poster (placeholder — will be added later)
│   ├── jnr_inv.jpg                ← Junior invitation poster (placeholder — will be added later)
│   ├── grain.png                  ← Film grain texture (generate or use a subtle noise PNG)
│   ├── seniors/                   ← Random senior photos from GitHub repo
│   │   ├── img1.jpg
│   │   ├── img2.jpg
│   │   ├── img3.jpg
│   │   ├── img4.jpg
│   │   ├── img5.jpg
│   │   └── img6.jpg
│   └── juniors/                   ← Random junior photos from GitHub repo
│       ├── img1.jpg
│       ├── img2.jpg
│       ├── img3.jpg
│       ├── img4.jpg
│       ├── img5.jpg
│       └── img6.jpg
├── src/
│   ├── components/
│   │   ├── FilmGrain.jsx
│   │   ├── RedCarpetEdges.jsx
│   │   ├── CurtainReveal.jsx
│   │   ├── Hero.jsx
│   │   ├── FloatingPhotos.jsx
│   │   ├── Invitations.jsx
│   │   ├── QuoteSpine.jsx
│   │   ├── AtAGlance.jsx
│   │   ├── Counters.jsx
│   │   ├── Intermission.jsx
│   │   ├── EventRundown.jsx
│   │   ├── MessageWall.jsx
│   │   ├── PassTheTorch.jsx
│   │   ├── Countdown.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## DESIGN SYSTEM

### Color Palette (use CSS variables in index.css AND Tailwind config)
```
--bg:            #060810        (deep dark navy — main background)
--bg-card:       rgba(12,16,28,0.85)   (card backgrounds with transparency)
--text-primary:  #e8e2d4        (warm off-white)
--text-dim:      rgba(232,226,212,0.5)
--text-muted:    rgba(232,226,212,0.25)
--gold:          #d4a853        (primary accent — gold)
--gold-bright:   #f0c86e        (hover/emphasis gold)
--gold-dim:      #a07930        (subtle gold)
--warm:          #c2724a        (senior side — sunset/amber)
--warm-glow:     rgba(194,114,74,0.15)
--cool:          #5b8fd4        (junior side — dawn/blue)
--cool-glow:     rgba(91,143,212,0.15)
--red-carpet:    #3d0c0c        (edge texture)
--border:        rgba(232,226,212,0.08)
```

### Typography (load from Google Fonts)
- **Display / Headings:** `Cinzel` (weight 400-700) — cinematic, serif, elegant
- **Body / Subtext:** `Cormorant Garamond` (weight 300-500, italic for quotes) — literary, refined
- **UI / Labels / Small text:** `Outfit` (weight 300-600) — clean, modern sans-serif
- **Handwritten accents:** `Caveat` (weight 400-500) — for polaroid captions

### Animation Principles
- ALL scroll-based animations use GSAP ScrollTrigger
- Entrance animations: fade up (y: 40 → 0, opacity: 0 → 1), duration 0.8-1s, ease: "power2.out"
- Stagger children: stagger 0.1-0.15s
- Horizontal carousels: GSAP Draggable or manual scroll with GSAP tweens
- Counter animations: GSAP `to()` with snap rounding
- No Framer Motion. No CSS-only scroll animations. GSAP everywhere for consistency.

---

## SECTIONS — BUILD IN THIS ORDER

### SECTION 0: Global Layers (FilmGrain.jsx + RedCarpetEdges.jsx)

**FilmGrain.jsx:**
- Fixed, full-screen div covering the entire viewport
- Uses a subtle noise/grain PNG texture (or CSS noise) as background
- Opacity: 0.03-0.05 (barely visible but adds cinematic texture)
- `pointer-events: none`, z-index above content but below interactive elements
- Animate the background-position slightly (CSS animation, slow drift) so grain "lives"

**RedCarpetEdges.jsx:**
- Two fixed vertical strips on left and right edges of viewport
- Width: 6-8px each
- Background: linear-gradient from `--red-carpet` to transparent (fading inward)
- Opacity: 0.4-0.6
- `pointer-events: none`, always visible while scrolling
- Adds a subtle premiere theater "frame" feel

---

### SECTION 1: CurtainReveal.jsx

**Purpose:** First thing users see. A theatrical curtain opening that reveals the AI Nexus logo, then the site.

**Implementation:**
- Full-screen fixed overlay, z-index 9999
- Two curtain panels (left and right) covering the screen
- Left curtain: gradient from `#1a0a0a` → `#2d0a0a` → `#0a0a1a` (warm maroon tones)
- Right curtain: gradient from `#0a0a1a` → `#0a102a` → `#1a0a0a` (cool navy tones)
- Add subtle vertical lines on each curtain to simulate fabric folds (thin lines, very low opacity)
- Gold trim line on the inner edge of each curtain

**GSAP Timeline:**
```
t = 0.0s     — Curtains fully closed, everything hidden
t = 0.6s     — Begin curtain open animation
t = 0.6-1.8s — Left curtain translateX(-105%), right curtain translateX(105%)
               Ease: "power3.inOut", duration: 1.2s
t = 1.0s     — AI Nexus logo begins fading in (center of screen)
               Load from /public/club_logo.jpg
               Scale from 0.7 → 1, opacity 0 → 1
               Radial gold glow behind it (box-shadow or pseudo-element)
t = 2.6s     — Logo begins fading out, scaling to 0.85
t = 3.0s     — Entire overlay opacity → 0
t = 3.4s     — Remove overlay from DOM (display: none or unmount)
               Callback: set state to show main content
```

- Body should have `overflow: hidden` during curtain animation, removed after
- The logo image should have a `max-width: 200px` and be centered

---

### SECTION 2: Hero.jsx + FloatingPhotos.jsx

**Hero.jsx — Full viewport section**

Layout: `min-height: 100vh`, flexbox centered content, relative positioning

**Background elements (absolute positioned):**
- Left half: radial gradient glow using `--warm` color, very subtle (opacity 0.1), positioned top-left
- Right half: radial gradient glow using `--cool` color, very subtle (opacity 0.08), positioned top-right
- Center vertical line: 2px wide, gold, opacity 0.12, runs full height of section

**FloatingPhotos.jsx (rendered inside Hero):**
- Accept two arrays: `seniorPhotos` and `juniorPhotos`
- On mount, shuffle each array and pick 5-6 random photos
- Senior photos positioned in left 45% of viewport, junior photos in right 45%
- Each photo is a "polaroid card":
  - White/cream border (6px sides, 22px bottom for caption area)
  - Caption in `Caveat` font: "Class of '26" or "Class of '28"
  - Slight random rotation (-8 to +8 degrees)
  - Box shadow for depth
- Each photo has unique random: top position (10-80%), left/right position within its half, rotation, animation delay, animation duration
- GSAP animation: continuous Y-axis float (yoyo, repeat -1), each with different amplitude (10-20px) and duration (10-20s)
- On hover: GSAP tween to rotation 0, scale 1.15, enhanced shadow. On leave: tween back.
- z-index: behind the center content but above background glows

**Side Labels:**
- Far left: "Seniors — Class of 2026" — rotated 90deg, `--warm` color, opacity 0.3, `Outfit` font, 10px, letter-spacing 0.4em
- Far right: "Juniors — Class of 2028" — rotated -90deg, `--cool` color, same styling

**Center Content (highest z-index in section):**
- Badge: `✦ AI Nexus Club — Jyothy Institute of Technology ✦` — `Cormorant Garamond`, 12px, letter-spacing 0.5em, `--gold`, uppercase, opacity 0.7
- Title: "From One Story" (line 1, `--text-primary`) + "To Another" (line 2, `--gold`) — `Cinzel` font, weight 700, size clamp(2rem, 6vw, 4.5rem), text-shadow with gold glow
- Subtitle: "As one batch writes their final lines, another picks up the pen. This is where both stories meet." — `Cormorant Garamond`, italic, `--text-dim`, max-width 480px
- Two pill badges side by side: "Farewell '26" (warm border + warm-glow bg) and "Welcome '28" (cool border + cool-glow bg) — `Outfit` 11px, uppercase, letter-spacing 0.15em, border-radius 20px, padding 8px 20px

**GSAP entrance (triggered after curtain completes):**
- Badge: fadeUp, delay 0.2s
- Title line 1: fadeUp, delay 0.4s
- Title line 2: fadeUp, delay 0.6s
- Subtitle: fadeUp, delay 0.8s
- Pills: fadeUp stagger, delay 1.0s

---

### SECTION 3: Invitations.jsx

**Section header:** `Cormorant Garamond` label "The Invitations" with a small 💌 emoji icon, styled like the screenshot (large serif title)

**Layout:** Two cards side by side (CSS grid, 2 columns, gap 2rem). Stacks to 1 column on mobile.

**Each card:**
- Dark card background with subtle border
- Image area at top: loads `snr_inv.jpg` or `jnr_inv.jpg` from `/public/`
- If image fails to load (onerror), show a styled fallback with event details text
- Below image: label "SENIOR PREMIERE NIGHT" / "JUNIOR PREMIERE NIGHT" in small caps, gold, centered

**Below the cards — Info cards (from screenshot):**
Two smaller info cards side by side:
- Left (Senior): ⭐ icon, "SENIOR PREMIERE NIGHT", Audience: Seniors of Batch 2026 & 2028, Doors Open: 6:00 PM | Showtime: 7:00 PM, Theme: "From One Story to Another", Story Tell Night: A Night of Stories
- Right (Junior): 🎭 icon, "JUNIOR PREMIERE NIGHT", Audience: Juniors of Batch 2028 & 2030, Doors Open: 6:00 PM | Showtime: 7:00 PM, Theme: "The Junior Chapter", Story Tell Night: A Night of New Stories

**Below the info cards — Invitation Letter:**
Styled as an elegant letter/quote block. Thin gold border on left side. Italic `Cormorant Garamond`.

Text:
```
"To the batch that taught us what it means to belong — your four years here weren't just yours. They shaped the hallways we walk, the culture we inherited, and the standards we now carry. As you step into the world, know that your story doesn't end here. It lives on in every lab session we take, every event we organize, and every tradition you started that we refuse to let die.

And to the newest faces among us — welcome. You've walked into something special. What the seniors built, we now pass to you. Take it, reshape it, make it yours.

This night is where both worlds meet. One last curtain call for some. A grand opening for others.

From one story… to another."

— AI Nexus Club
On behalf of 4th, 6th & 8th Semester students
Dept. of AI & ML, Jyothy Institute of Technology
```

**GSAP ScrollTrigger:**
- Left invitation card slides in from left (x: -60 → 0)
- Right invitation card slides in from right (x: 60 → 0)
- Info cards: stagger fadeUp
- Letter: fadeUp with slight delay

---

### SECTION 4: QuoteSpine.jsx

**Purpose:** Center-aligned vertical quote flow — the emotional spine of the site

**Layout:** Centered column, max-width 450px, padding 80px vertical

**Center line:** Absolute positioned, 2px wide, gold, linear-gradient (transparent → gold → transparent), opacity 0.15, full section height

**5 quotes:**
```
1. "Some are here to say goodbye…\nsome are here to say hello."
2. "As one story comes to an end,\nanother quietly begins."
3. "We're not just witnessing this moment…\nwe're part of it."
4. "What they leave behind\nbecomes what we build on."
5. "From one story…\nto another."
```

Each quote block:
- Gold glowing dot above (8px circle, `--gold`, with animated box-shadow pulse)
- Quote text: `Cormorant Garamond`, italic, clamp(1.1rem, 2.5vw, 1.5rem), `--text-primary`, white-space pre-line for line breaks
- Wrapped in quotation marks
- Spacing: 80px between quotes

**GSAP ScrollTrigger:**
- Each quote: opacity 0 → 1, y 40 → 0, triggered when quote enters viewport (threshold ~20% from bottom)
- Stagger delay based on position (not time-based — each triggers independently on scroll)

---

### SECTION 5: AtAGlance.jsx

**Section header:** ⭐ "At a Glance" — large serif heading matching screenshot style

**Layout:** 4 cards in a row (CSS grid, 4 columns). On mobile: 2x2 grid.

Each card:
- Dark background (`--bg-card`)
- Gold left border (3px solid `--gold`)
- Emoji icon at top left
- Title in gold, small caps, `Outfit` font, weight 600
- Details in `--text-dim`, `Outfit` 13px

**Cards:**
1. 📅 **DATE** — April 11th / Doors Open: 6:00 PM / Showtime: 7:00 PM
2. 🎬 **THEME** — Movie Launch / Hollywood Premiere / "From One Story to Another"
3. 👥 **AUDIENCE** — Seniors: Batch 2026 & 2028 / Juniors: Batch 2028 & 2030
4. ✨ **JUNIOR EVENTS TBD** — Junior-specific events are yet to be planned. Games, activities and surprises to be decided by the team.

**GSAP:** Stagger fadeUp (y: 30, opacity: 0, stagger: 0.12s) on ScrollTrigger

---

### SECTION 6: Counters.jsx

**Section header:** "The Story in Numbers" — small gold label above

**Layout:** 4 counter units in a centered row, generous gap

**Counters:**
```
4    → "Years of Memories"
2    → "Batches Celebrating"
11   → "Events in One Night"
1    → "Night to Remember"
```

Each counter:
- Number: `Cinzel` font, weight 700, clamp(2.5rem, 6vw, 4rem), `--gold-bright`, text-shadow gold glow
- Label: `Outfit` 10px, uppercase, letter-spacing 0.2em, `--text-muted`

**GSAP ScrollTrigger:**
- When section enters viewport, each number animates from 0 to target value
- Use `gsap.to()` targeting a ref/object, with `snap: 1` to round to integers
- Duration: 2s, ease: "power2.out"
- Stagger: 0.2s between each counter

---

### INTERMISSION: Intermission.jsx

**Purpose:** Visual breather between info sections and event rundown. Classic cinema intermission card.

**Layout:** Full width, centered, padding 60px vertical

**Design:**
- Ornate double-line gold border (inner and outer) creating a frame effect — use `outline` + `border` or nested divs
- Inside the frame: "— INTERMISSION —" text in `Cinzel` font, gold color, letter-spacing 0.3em
- Optional: small subtitle below "The show continues after a brief pause" in `Cormorant Garamond`, italic, `--text-muted`
- Subtle flicker animation on the text — opacity oscillating between 0.7 and 1.0, like an old projector lamp (CSS animation, 3s duration, ease-in-out, infinite)
- Background: very subtle radial gradient from center (slightly lighter than `--bg`)

**GSAP:** Simple fadeIn on ScrollTrigger, no fancy entrance needed — the simplicity IS the effect

---

### SECTION 7: EventRundown.jsx

**Section header:** "🎬 Event Rundown" with "Now Showing" as a smaller subtitle

**Layout:** Horizontal scrolling carousel. The cards overflow the viewport to the right. User can scroll/drag horizontally.

**Implementation:**
- Outer container: `overflow-x: auto`, `overflow-y: hidden`, `-webkit-overflow-scrolling: touch`
- Inner container: `display: flex`, `gap: 1.25rem`, `padding: 0 2rem`
- Custom scrollbar styling (thin, gold thumb)
- Optional: left/right arrow buttons on desktop for navigation

**11 Event Cards (each card is a mini movie poster):**

Each card:
- Width: 280px (fixed), flex-shrink: 0
- Background: `--bg-card`, border-radius 14px
- Gold top border (3px)
- Padding: 24px 20px
- Card number in top-right corner: "01", "02" etc. — `Outfit` 10px, `--text-muted`

Card content:
- Emoji icon (large, 28px)
- Title: `Cinzel` font, 14px, weight 600, `--gold`, small caps, margin-top 12px
- Time: `Outfit` 11px, `--text-muted`, uppercase, letter-spacing 0.1em
- Description: `Cormorant Garamond` 14px, `--text-dim`, italic, line-height 1.6

**The 11 events:**
```
01  🎟️  TICKET COUNTER         ~6:00 PM    "1 Ticket = 2 Polaroid Photos taken at the Polaroid Booth. The classic movie premiere experience starts here."
02  📸  ARRIVAL — PHOTO BOOTH  ~6:00 PM    "Welcome to the #Memories Photo Booth — a rustic wooden pallet wall strung with fairy lights and Polaroid-clipped photos."
03  🎬  MOVIE TRAILER SCREENING ~7:00 PM   "A specially crafted movie trailer for 'From One Story to Another'. Recorded clips of seniors sharing tips and juniors sharing heartfelt messages. Cinematic, emotional, unforgettable."
04  🎞️  SENIOR MEMORY VIDEO     ~7:15 PM   "A full compilation of all seniors' memory videos — a montage celebrating the batch's journey, milestones, and memorable moments."
05  👔  BEST DRESSED — JUNIORS  ~7:35 PM   "Juniors are judged for their outfit of the day. The best dressed junior wins a special award. Bring your best look to the premiere."
06  🎮  MOVIE-THEMED GAME       ~7:50 PM   "An interactive movie-themed game for junior students — movie trivia, dialogue guessing, or scene reenactment challenge."
07  💃  DANCE PERFORMANCES      ~8:10 PM   "Batch 2027 performs a high-energy dance to remix songs. Batch 2028 also has a prepared dance performance. Main stage entertainment."
08  🎤  SINGING PERFORMANCES    ~8:30 PM   "Singing acts lined up — soulful numbers and possibly a farewell original. Artists and songs to be confirmed."
09  🏆  SENIOR AWARDS CEREMONY  ~8:50 PM   "Special awards for seniors including Best Achievers, standout personalities, and recognition categories. A celebration of accomplishments."
10  🎓  HOD & FACULTY ADDRESS   ~9:10 PM   "HOD addresses the farewell batch with a special message. Ms. Archana Ma'am welcomes them officially to the ceremony."
11  🍽️  FOOD & FELLOWSHIP       ~9:30 PM   "Food arrangements are in place. Guests enjoy food and freely mingle — a final evening of togetherness, laughter, and goodbyes."
```

**GSAP Animations:**
- On scroll into viewport, the entire carousel slides in from the right (x: 100 → 0, opacity)
- Individual cards have a stagger entrance (subtle, fast)
- Hover on card: slight translateY(-6px), border-color brightens to `--gold-bright`, enhanced shadow

---

### SECTION 8: MessageWall.jsx

**Section header:** "Words Left Behind" label + "The Message Wall" title

**Layout:** CSS grid, `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))`, gap 16px, max-width 900px centered

**10 message cards:**

Each card:
- Background: `--bg-card`
- Border: 1px solid — warm tint for seniors (`rgba(194,114,74,0.15)`), cool tint for juniors (`rgba(91,143,212,0.15)`)
- Border-radius: 12px, padding: 24px 20px
- Tag in top-right: "Outgoing" (seniors, warm color) or "Incoming" (juniors, cool color) — 9px, uppercase
- Large quote mark: `"` in `Cinzel` 24px, warm/cool color, opacity 0.15
- Quote text: `Cormorant Garamond` 15px, italic, `--text-primary` opacity 0.8
- Attribution: `— Department` in `Outfit` 11px, warm/cool color, opacity 0.5

**Messages:**
```
SENIOR: "Four years felt like four months. I'm not ready, but I'm grateful." — Final Year, CSE
SENIOR: "I walked in not knowing anyone. I'm walking out not wanting to leave anyone." — Final Year, AIML
SENIOR: "To the juniors — protect the canteen corner table. That's sacred ground." — Final Year, ECE
JUNIOR: "We just got here and it already feels like home. That's on the seniors who built this culture." — 2nd Year, AIML
JUNIOR: "I hope we can be half as legendary as the batch leaving." — 2nd Year, CSE
SENIOR: "They told us college flies by. Now I believe them." — Final Year, Mech
SENIOR: "The lab at 2 AM hits different when you know it's the last time." — Final Year, AIML
JUNIOR: "We're inheriting something special. We won't let it fade." — 2nd Year, ISE
SENIOR: "This isn't goodbye. It's just 'see you on LinkedIn.'" — Final Year, CSE
JUNIOR: "First week here and I already have stories. This place is alive." — 2nd Year, ECE
```

**Hover:** translateY(-4px), border-color intensifies

**GSAP ScrollTrigger:** Stagger fadeUp (y: 30, opacity: 0, stagger: 0.08s)

---

### SECTION 9: PassTheTorch.jsx

**Purpose:** Interactive easter egg — drag a flame from seniors to juniors

**Layout:** Centered, padding 40px

**Header:** "Interactive" label + "Pass the Torch" title + "Drag the flame from the seniors to the juniors" subtitle

**Interaction area:**
- Horizontal track bar (max-width 500px, height 80px, centered)
- Left end labeled "2026" in `--warm` color
- Right end labeled "2028" in `--cool` color
- Center track line (2px, gradient from warm to transparent)
- 🔥 emoji (32px) starts at left side
- Draggable horizontally using GSAP Draggable (or mouse/touch events)
- When dragged past 75% of track width → trigger completion:
  - Fire emoji snaps to right end with GSAP tween (bounce ease)
  - Track line fills with full gradient (warm → gold → cool)
  - Confetti burst (40 small colored particles, GSAP-animated falling with rotation)
  - Text appears: "The Legacy Continues ✦" + "What one batch built, another will carry forward."
  - GSAP entrance animation on the result text
- If released before 75% → snaps back to start

**Important:** Use `touch-action: none` on the drag area for mobile support. Handle both mouse and touch events.

---

### SECTION 10: Countdown.jsx

**Purpose:** Live countdown to event date

**Target:** April 11, 2026 at 7:00 PM IST (Indian Standard Time, UTC+5:30)

**Layout:** Centered, padding 80px

**Header:** "Mark Your Calendar" label + "The Day Approaches" title + "April 11, 2026 — Jyothy Institute of Technology" subtitle

**Countdown display:**
- 4 units in a row: Days / Hours / Minutes / Seconds
- Numbers: `Cinzel` weight 700, clamp(2rem, 5vw, 3.5rem), `--gold-bright`, text-shadow gold glow
- Labels: `Outfit` 10px, letter-spacing 0.2em, uppercase, `--text-muted`
- Update every second using `setInterval` in `useEffect`

**Below countdown:**
- Card with gold border: "See You There" title + "No registration needed — just show up and be part of the story." subtitle
- Dark card background, centered, inline-block

**GSAP:** FadeUp on ScrollTrigger

---

### SECTION 11: Footer.jsx

Simple, clean footer:
- AI Nexus logo (small) or text logo: "✦ AI NEXUS"
- "Connecting Intelligent Minds" — `Cormorant Garamond`, italic, `--text-muted`
- "From One Story to Another — Jyothy Institute of Technology, 2026"
- Nav links row: Home, Invitations, Rundown, Voices, Countdown — small, uppercase, `--text-muted`, gold on hover
- Top border: 1px solid `--border`
- Padding: 40px

---

## App.jsx STRUCTURE

```jsx
import { useState } from 'react'
import FilmGrain from './components/FilmGrain'
import RedCarpetEdges from './components/RedCarpetEdges'
import CurtainReveal from './components/CurtainReveal'
import Hero from './components/Hero'
import Invitations from './components/Invitations'
import QuoteSpine from './components/QuoteSpine'
import AtAGlance from './components/AtAGlance'
import Counters from './components/Counters'
import Intermission from './components/Intermission'
import EventRundown from './components/EventRundown'
import MessageWall from './components/MessageWall'
import PassTheTorch from './components/PassTheTorch'
import Countdown from './components/Countdown'
import Footer from './components/Footer'

function App() {
  const [curtainDone, setCurtainDone] = useState(false)

  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)] overflow-x-hidden">
      <FilmGrain />
      <RedCarpetEdges />
      <CurtainReveal onComplete={() => setCurtainDone(true)} />

      {curtainDone && (
        <>
          {/* Nav bar */}
          <Hero />
          <Invitations />
          <QuoteSpine />
          <AtAGlance />
          <Counters />
          <Intermission />
          <EventRundown />
          <MessageWall />
          <PassTheTorch />
          <Countdown />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
```

---

## IMPORTANT GUIDELINES

1. **Build section by section.** After each component, pause and let me review before moving to the next.
2. **GSAP only for animations.** No Framer Motion, no AOS, no CSS-only scroll animations. GSAP + ScrollTrigger everywhere.
3. **Register ScrollTrigger plugin** at the top of any component that uses it: `gsap.registerPlugin(ScrollTrigger)`
4. **Tailwind for styling** but use CSS variables for colors (defined in index.css). Reference them in Tailwind with `text-[var(--gold)]` syntax or extend the Tailwind config.
5. **Responsive:** Mobile-first. All grids collapse appropriately. Touch support for carousel and torch drag.
6. **Performance:** Use `will-change: transform` on animated elements. Clean up GSAP animations and ScrollTriggers in `useEffect` return functions.
7. **Images with fallbacks:** All images (`club_logo.jpg`, `snr_inv.jpg`, `jnr_inv.jpg`, senior/junior photos) should have `onError` handlers showing styled placeholders.
8. **No backend, no API calls, no auth, no registration.** Fully static.
9. **Code quality:** Clean, commented, well-structured React components. Each component is self-contained.
10. **Google Fonts:** Load Cinzel, Cormorant Garamond, Outfit, and Caveat in `index.html` or via `@import` in `index.css`.

---

## START

Begin with: Initialize the Vite + React project, install dependencies (gsap, tailwindcss), configure Tailwind, set up index.css with CSS variables and Google Fonts, and create the basic App.jsx shell. Then build Section 0 (FilmGrain + RedCarpetEdges). Pause for review.

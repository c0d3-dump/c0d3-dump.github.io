# Design Spec: c0d3-dump Portfolio

> **For the frontend engineer**: This spec plus `mockup.html` are your single source of truth.
> Every token name, color hex, spacing value, and component decision is here.
> If something is missing, flag it — don't guess.

---

## 1. Color Palette

### Tokens (CSS custom properties)

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#09090b` | Page background — near-black, void |
| `--color-surface` | `#131316` | Cards, elevated surfaces |
| `--color-surface-hover` | `#1a1a1e` | Card hover, subtle elevation lift |
| `--color-border` | `#27272a` | Borders, dividers — visible but quiet |
| `--color-border-hover` | `#3f3f46` | Border on hover/focus |
| `--color-text-primary` | `#fafafa` | Headings, hero text, primary body |
| `--color-text-secondary` | `#a1a1aa` | Descriptions, muted labels, dates |
| `--color-text-tertiary` | `#71717a` | Metadata, footer, less-important labels |
| `--color-accent` | `#10b981` | Emerald — primary accent: links, CTAs, active states |
| `--color-accent-glow` | `#34d399` | Lighter emerald for hover glow, terminal cursor |
| `--color-accent-subtle` | `rgba(16,185,129,0.12)` | Accent backgrounds (skill tags, badges) |
| `--color-code` | `#67e8f9` | Inline code, terminal output — cyan |
| `--color-code-bg` | `rgba(16,185,129,0.06)` | Code block / terminal backgrounds |
| `--color-star` | `#facc15` | Star counts, highlights — yellow |
| `--color-danger` | `#ef4444` | Error states (rarely used on this site) |

### Rationale

- **Emerald over purple/blue**: Purple reads "SaaS", blue reads "corporate". Emerald reads "terminal + fresh code" — it's the accent of VoltAgent, Supabase, and countless CLI tools. It pairs naturally with dark backgrounds and monospace typography.
- **Near-black, not pure black**: `#09090b` has a hint of warmth. Pure `#000` feels harsh and unconsidered.
- **Surface layering**: Three levels — bg → surface → surface-hover — give depth without adding noise. No drop shadows needed; the contrast between layers does the work.
- **Text hierarchy is strict**: Primary (`#fafafa`) / Secondary (`#a1a1aa`) / Tertiary (`#71717a`). Never use secondary for headings or primary for metadata. Consistency here is everything.

---

## 2. Typography

### Font Stack

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
```

### CDN Imports

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

### Scale

| Role | Family | Weight | Size | Line-height | Letter-spacing | Token |
|---|---|---|---|---|---|---|
| Hero name | Inter | 800 | `clamp(3rem, 8vw, 5rem)` | 1.05 | `-0.03em` | — |
| Hero tagline | Inter | 400 | `1.125rem` / `1.25rem` | 1.6 | 0 | — |
| Section heading | Inter | 700 | `1.5rem` | 1.3 | `-0.01em` | — |
| Card heading | Inter | 600 | `1rem` | 1.4 | 0 | — |
| Body | Inter | 400 | `0.9375rem` | 1.6 | 0 | — |
| Body small | Inter | 400 | `0.8125rem` | 1.5 | 0 | — |
| Terminal label | JetBrains Mono | 500 | `0.75rem` | 1.5 | 0 | — |
| Code inline | JetBrains Mono | 400 | `0.875em` | inherit | 0 | — |
| Stats number | Inter | 700 | `1.75rem` | 1.2 | `-0.02em` | — |
| Stats label | Inter | 400 | `0.75rem` | 1.4 | `0.02em` | — |

### Typography Rules

1. **Inter for everything content.** JetBrains Mono only for: terminal-style labels (section prefixes like `$ whoami`), inline code, and the GitHub handle.
2. **No serif.** This is a developer portfolio, not a blog. Serif would clash with the terminal aesthetic.
3. **Section headings always have a terminal prefix.** Format: `$ section_name` in JetBrains Mono, `--color-accent` colored, followed by the actual heading in Inter. Example: `$ whoami` → **About Me**. This is the signature detail that makes the site feel like a developer's space, not a generic template.
4. **Weight 800 is used exactly once** — the hero name. Everything else stays 400–700.

---

## 3. Spacing System

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 96px;
--space-section: 120px;   /* vertical gap between major sections */
```

- Section vertical padding: `--space-section` (120px) top and bottom.
- Card padding: `--space-lg` (24px).
- Content max-width: `960px`, centered with `margin: 0 auto` and horizontal padding of `--space-lg`.
- Skills grid gap: `--space-md` (16px).
- Project cards gap: `--space-lg` (24px).

---

## 4. Borders & Radii

```css
--radius-sm: 6px;    /* skill tags, small badges */
--radius-md: 10px;   /* cards, project cards */
--radius-lg: 14px;   /* large cards, stat cards */
--radius-full: 9999px;
```

- **Border style**: Always `1px solid var(--color-border)`. No thicker borders.
- **Cards get `--radius-md`**. They sit on `--color-surface` with a `1px` border that subtly separates them from the background.
- **Rounded, never fully square.** Even terminal-inspired elements get `--radius-sm` at minimum. Brutalist sharp corners would fight the clean typography.

---

## 5. Layout Wireframes

### Desktop (≥768px)

```
┌─────────────────────────────────────────────────────────┐
│  NAV (sticky top)                                       │
│  [c0d3-dump]                    [GitHub] [Contact]      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  HERO (min-height: ~60vh, vertically centered)          │
│                                                         │
│  $ hello                                               │
│  Bhavin Sojitra                                         │
│  Software Engineer · Game Developer · Open Source       │
│  👾 c0d3-dump · India                                   │
│  [View GitHub]  [Get in Touch]                          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  $ whoami                                              │
│  About Me                                               │
│  [Bio text — max 65ch width, centered or left-aligned]  │
│  📧 c0d3.dump@gmail.com  🔗 profile.brokli.dev          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  $ skills                                              │
│  Skills & Tools                                         │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Rust     │ │ Go       │ │ Node.js  │ │ Python   │  │
│  │ axum     │ │ fiber    │ │ express  │ │ flask    │  │
│  │ tauri    │ │ gorm     │ │ astro    │ │ langchain│  │
│  │ ...      │ │          │ │ ...      │ │ ...      │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ DBs      │ │ Tools    │ │ Cloud    │ │ Other    │  │
│  │ sqlite   │ │ Docker   │ │ aws      │ │ kafka    │  │
│  │ ...      │ │ ...      │ │ ...      │ │ ...      │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  $ projects                                            │
│  Featured Projects                                      │
│                                                         │
│  ┌─────────────────────┐  ┌─────────────────────┐      │
│  │ mini-base        8⭐ │  │ teester          3⭐ │      │
│  │ Minimal BaaS in Rust │  │ API testing utility │      │
│  │ [Rust] [TUI]         │  │ [Rust] [GUI]        │      │
│  └─────────────────────┘  └─────────────────────┘      │
│  ┌─────────────────────┐  ┌─────────────────────┐      │
│  │ plang            1⭐ │  │ supa_rs             │      │
│  │ Interpreted lang     │  │ Supabase Rust client│      │
│  │ [Rust]               │  │ [Rust]              │      │
│  └─────────────────────┘  └─────────────────────┘      │
│  ┌─────────────────────┐  ┌─────────────────────┐      │
│  │ sqlite-tui-go        │  │ hface            1⭐ │      │
│  │ TUI tool for SQLite  │  │ Python project      │      │
│  │ [Go] [TUI]           │  │ [Python]            │      │
│  └─────────────────────┘  └─────────────────────┘      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  $ stats                                               │
│  GitHub Stats                                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │    96    │ │    51    │ │     6    │               │
│  │  Stars   │ │  Repos   │ │Followers │               │
│  └──────────┘ └──────────┘ └──────────┘               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [2-COLUMN]                                             │
│  $ building                    $ learning               │
│  Currently Building            Currently Learning       │
│  • Godot no-code addon         • Rust                   │
│  • p2p text data sharing       • Godot                  │
│                                • Go                     │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  $ contact                                             │
│  Get in Touch                                           │
│  [GitHub]  [Email]                                      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  FOOTER — "Built with ☕ by Bhavin Sojitra"             │
└─────────────────────────────────────────────────────────┘
```

### Mobile (<768px)

```
┌───────────────────────────┐
│ NAV (sticky)              │
│ [c0d3-dump]    [GitHub]   │
├───────────────────────────┤
│                           │
│ HERO                      │
│ $ hello                  │
│ Bhavin Sojitra            │
│ Software Engineer         │
│ · Game Developer          │
│ · Open Source Enthusiast  │
│ 👾 c0d3-dump             │
│ 📍 India                  │
│ [View GitHub]             │
│ [Get in Touch]            │
│                           │
├───────────────────────────┤
│ $ whoami                 │
│ About Me                  │
│ [Bio — full width]        │
│                           │
├───────────────────────────┤
│ $ skills                 │
│ Skills & Tools            │
│ (2-col grid of cards)     │
│ ┌────────┐ ┌────────┐    │
│ │ Rust   │ │ Go      │    │
│ └────────┘ └────────┘    │
│ ┌────────┐ ┌────────┐    │
│ │Node.js │ │ Python  │    │
│ └────────┘ └────────┘    │
│ ...                       │
│                           │
├───────────────────────────┤
│ $ projects               │
│ Featured Projects         │
│ (single column cards)     │
│ ┌─────────────────────┐   │
│ │ mini-base        8⭐ │   │
│ └─────────────────────┘   │
│ ┌─────────────────────┐   │
│ │ teester          3⭐ │   │
│ └─────────────────────┘   │
│ ...                       │
│                           │
├───────────────────────────┤
│ $ stats                  │
│ GitHub Stats              │
│ (3-col, compact)          │
│  96      51       6      │
│ Stars   Repos   Followers │
│                           │
├───────────────────────────┤
│ $ building  (full width)  │
│ Currently Building        │
│ • Godot no-code addon     │
│ • p2p text sharing        │
│                           │
│ $ learning  (full width)  │
│ Currently Learning        │
│ • Rust · Godot · Go       │
│                           │
├───────────────────────────┤
│ $ contact                │
│ Get in Touch              │
│ [GitHub]  [Email]         │
├───────────────────────────┤
│ FOOTER                    │
└───────────────────────────┘
```

### Key layout rules
- **Single-column content area** at all widths, max 960px, centered.
- **Skills grid**: 4 columns desktop, 3 columns tablet, 2 columns mobile.
- **Projects grid**: 2 columns desktop, 1 column mobile.
- **"Currently" section**: 2 columns desktop, stacked mobile.
- **Stats**: always 3 columns, numbers stay horizontal even on mobile (just smaller).
- **Nav**: sticky, backdrop-blur, minimal — just name left, two links right.

---

## 6. Component Hierarchy & Specs

### 6.1 Navbar (`<nav>`)

```
┌──────────────────────────────────────────────────────────┐
│ c0d3-dump                              GitHub   Contact  │
└──────────────────────────────────────────────────────────┘
```

- **Position**: `sticky; top: 0; z-index: 50`
- **Background**: `rgba(9,9,11,0.85)` with `backdrop-filter: blur(12px)`
- **Border-bottom**: `1px solid var(--color-border)` — only when scrolled (use IntersectionObserver)
- **Height**: 56px
- **Padding**: 0 `--space-lg`
- **Left**: Monospace `c0d3-dump` in `--color-accent`, weight 700, size `0.875rem`
- **Right links**: Inter, weight 500, size `0.8125rem`, `--color-text-secondary`
- **Link hover**: color transitions to `--color-accent`
- **Mobile**: Drop the "Contact" link if needed, keep GitHub icon+text

### 6.2 Hero Section

```
$ hello                                          (terminal label)

Bhavin Sojitra                                    (h1)
Software Engineer · Game Developer · Open Source Enthusiast   (tagline)

👾 c0d3-dump  ·  📍 India                        (meta row)

[View GitHub →]  [Get in Touch]                   (CTA buttons)
```

- **Min-height**: `60vh`, centered with flexbox
- **Terminal label**: `$ hello` in JetBrains Mono, `--color-accent`, `0.875rem`. Has a subtle blink animation on the dollar sign or a static cursor `▌` at the end.
- **Name**: Inter 800, `clamp(3rem, 8vw, 5rem)`, letter-spacing `-0.03em`, `--color-text-primary`
- **Tagline**: Inter 400, `1.125rem`, `--color-text-secondary`. The `·` separators use `--color-border`.
- **Meta row**: `--color-text-tertiary`, `0.875rem`. GitHub handle in JetBrains Mono, colored `--color-accent`. Location in Inter.
- **CTA buttons**: 
  - Primary: `background: var(--color-accent)`, `color: #09090b`, weight 600, `--radius-md`, padding `10px 24px`
  - Secondary: `border: 1px solid var(--color-border)`, `color: var(--color-text-primary)`, same sizing
  - Hover primary: `background: var(--color-accent-glow)`, subtle scale `1.02`
  - Hover secondary: `border-color: var(--color-text-secondary)`, `background: var(--color-surface-hover)`
  - Gap between buttons: `--space-md`
- **No hero image/avatar.** This is a code-first portfolio. The terminal label + bold name carry enough personality.

### 6.3 About Section

```
$ whoami
About Me

[Bio paragraph — max-width 65ch]
[Email link]  [Profile link]
```

- **Section heading**: Terminal label (JetBrains Mono, `--color-accent`, `0.75rem`) on its own line, then section title (Inter 700, `1.5rem`) below it. Gap: `--space-xs` between label and title.
- **Bio**: Inter 400, `0.9375rem`, `--color-text-secondary`, `max-width: 65ch`
- **Links**: Inline with the bio or on their own line. Styled with `--color-accent`, underline on hover.

### 6.4 Skills Section

```
$ skills
Skills & Tools

┌──────────────────┐
│ Rust             │  ← Category heading (Inter 600, 0.875rem, --color-text-primary)
│ axum  tauri      │  ← Skill tags (inline pills)
│ bevy  Iroh       │
│ leptos           │
└──────────────────┘
```

**Skill card spec:**
- Background: `--color-surface`
- Border: `1px solid var(--color-border)`
- Radius: `--radius-md`
- Padding: `--space-lg`
- Category heading: Inter 600, `0.875rem`, `--color-text-primary`, with a small emerald dot or `▸` prefix in `--color-accent`
- Skill tags: `<span>` pills with `background: var(--color-accent-subtle)`, `color: var(--color-accent)`, `border: 1px solid rgba(16,185,129,0.2)`, `--radius-sm`, padding `2px 10px`, Inter 400, `0.75rem`
- Grid: `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`, gap `--space-md`

### 6.5 Project Cards

```
┌─────────────────────────────────┐
│ mini-base                   8⭐  │  ← Name (Inter 600) + stars (--color-star)
│ Minimal BaaS in Rust with TUI   │  ← Description (Inter 400, --text-secondary)
│ [Rust] [TUI] [BaaS]             │  ← Tech tags (same pill style as skills)
│ [View on GitHub →]              │  ← Link (JetBrains Mono, --color-accent)
└─────────────────────────────────┘
```

- Background: `--color-surface`, border: `1px solid var(--color-border)`, radius: `--radius-md`, padding: `--space-lg`
- Hover: `background: var(--color-surface-hover)`, `border-color: var(--color-border-hover)`, subtle `translateY(-2px)` transition (150ms ease)
- Star count: `--color-star` (#facc15), preceded by `★` in same color, Inter 500, `0.8125rem`
- Description: max 2 lines, `text-wrap: pretty`
- Grid: 2 columns desktop (`minmax(0, 1fr)`), 1 column mobile, gap `--space-lg`

### 6.6 Stats Section

```
┌──────────┬──────────┬──────────┐
│    96    │    51    │     6    │
│   Stars  │  Repos   │Followers │
└──────────┴──────────┴──────────┘
```

- Three equal columns
- Number: Inter 700, `1.75rem`, `--color-accent`
- Label: Inter 400, `0.75rem`, `--color-text-tertiary`, uppercase tracking `0.05em`
- Each stat in its own subtle card: `--color-surface`, `--radius-md`, padding `--space-lg`
- Subtle separator between columns (or just gaps)

### 6.7 "Currently" Section (2-column)

```
$ building                    $ learning
Currently Building            Currently Learning

• Godot no-code addon         • Rust
  with multiplayer            • Godot
• p2p text data sharing       • Go
  sharer
```

- Two equal columns on desktop, stacked on mobile
- Each item: a small card or list item with a `▸` emerald bullet
- Item text: Inter 400, `0.9375rem`, `--color-text-primary`
- Sub-detail: Inter 400, `0.8125rem`, `--color-text-secondary`

### 6.8 Contact Section

```
$ contact
Get in Touch

[🐙 GitHub]  [📧 Email]
```

- Simple, centered.
- Links styled like secondary CTA buttons from hero (bordered pills).
- Icons are optional — text labels are fine. If using icons, use simple SVG inline or Unicode.

### 6.9 Footer

```
Built with ☕ by Bhavin Sojitra
```

- Centered, `--color-text-tertiary`, Inter 400, `0.75rem`
- Padding: `--space-xl` top and bottom
- Border-top: `1px solid var(--color-border)`

---

## 7. Interaction Notes

### Scroll Behavior
- **Smooth scroll**: `scroll-behavior: smooth` on `html` for anchor links.
- **Nav border reveal**: When the page is scrolled past 0px, the nav gains its bottom border. Use a small JS IntersectionObserver on a sentinel `<div>` at the top of the page, toggling a `.nav--scrolled` class. Do NOT use scroll event listeners.
- **Section reveal**: Subtle fade-up on first view. Use `IntersectionObserver` with `threshold: 0.15`. Each section gets `opacity: 0; transform: translateY(20px)` by default, and a `.visible` class triggers `opacity: 1; transform: translateY(0); transition: 0.5s ease`. Keep it subtle — this is not a flashy marketing page.

### Hover States
- **Cards**: `background` shift + `border-color` lighten + `translateY(-2px)`. Transition 150ms ease.
- **Links (inline)**: `color` shift to `--color-accent-glow`, underline appears. Transition 150ms.
- **Buttons (primary)**: Background lightens to `--color-accent-glow`, subtle scale `1.02`. Transition 150ms.
- **Buttons (secondary)**: Border lightens, background becomes `--color-surface-hover`. Transition 150ms.
- **Skill tags**: No hover effect — they're decorative, not interactive.
- **Project tech tags**: Same — decorative, no hover.

### Focus States
- All interactive elements (links, buttons) get `:focus-visible` outline: `2px solid var(--color-accent)`, `outline-offset: 2px`.
- Never remove focus outlines without replacing them.

### Motion
- Respect `prefers-reduced-motion: reduce` — disable all transitions and animations.
- The terminal cursor blink on `$ hello` uses `animation: blink 1s step-end infinite` and should be disabled under reduced motion.
- Card hover lift and section reveals should also disable under reduced motion.

### Typing / Terminal Effect (Optional Enhancement)
- If the frontend engineer wants to go further: a typing effect on the `$ hello` line (types out character by character). This is optional polish — the site works perfectly without it. If implemented, it must complete within ~1.5s and not block scrolling.

---

## 8. states Checklist

Every component the frontend engineer builds must handle these states:

| Component | Default | Hover | Focus | Empty | Notes |
|---|---|---|---|---|---|
| Navbar | Sticky, transparent bg | Links change color | Focus-visible ring | N/A | Border appears on scroll |
| Hero CTA (primary) | Solid emerald bg | Lighter green, scale 1.02 | Focus ring | N/A | — |
| Hero CTA (secondary) | Bordered transparent | Border lightens, bg darkens | Focus ring | N/A | — |
| Skill card | Surface bg + border | No hover (static) | N/A | N/A | Cards are decorative |
| Project card | Surface bg + border | Lift + border lighten | Focus ring (on link) | N/A | Link inside card is focusable |
| Stat card | Surface bg + border | No hover | N/A | N/A | Static display |
| Section reveal | Hidden (opacity 0) | N/A | N/A | N/A | IntersectionObserver triggers `.visible` |
| All links | Text-secondary | Accent glow + underline | Focus ring | N/A | — |

---

## 9. Technical Notes for Implementation

### CSS Architecture
1. Use CSS custom properties for ALL design tokens. Put them in `:root`.
2. No CSS framework needed. The system is simple enough that raw CSS with custom properties is cleaner and lighter.
3. Use CSS Grid for card layouts, Flexbox for single-axis layouts.
4. Use `clamp()` for fluid type — the hero name and section headings should scale smoothly.

### HTML Structure (suggested)
```html
<body>
  <nav id="nav">...</nav>
  <main>
    <section id="hero">...</section>
    <section id="about">...</section>
    <section id="skills">...</section>
    <section id="projects">...</section>
    <section id="stats">...</section>
    <section id="currently">
      <div class="two-col">
        <div>building...</div>
        <div>learning...</div>
      </div>
    </section>
    <section id="contact">...</section>
  </main>
  <footer>...</footer>
</body>
```

### Performance
- **No heavy JS libraries.** Vanilla JS only for: IntersectionObserver (nav border + section reveal), smooth scroll, and optionally the terminal typing effect.
- **Font loading**: Use `&display=swap` on Google Fonts. Add a fallback font stack.
- **Total CSS should be under 15KB uncompressed.**

### Accessibility
- All sections have proper heading hierarchy (h1 for hero name, h2 for section titles).
- Links have discernible text (no icon-only links).
- Color contrast ratios: primary text on bg = 15.3:1, accent on bg = 7.1:1, secondary text on bg = 5.1:1. All pass WCAG AA.
- `prefers-reduced-motion` respected.
- Focus visible on all interactive elements.

---

## 10. Design System Summary (Quick Reference)

```css
:root {
  /* Colors */
  --color-bg: #09090b;
  --color-surface: #131316;
  --color-surface-hover: #1a1a1e;
  --color-border: #27272a;
  --color-border-hover: #3f3f46;
  --color-text-primary: #fafafa;
  --color-text-secondary: #a1a1aa;
  --color-text-tertiary: #71717a;
  --color-accent: #10b981;
  --color-accent-glow: #34d399;
  --color-accent-subtle: rgba(16,185,129,0.12);
  --color-code: #67e8f9;
  --color-code-bg: rgba(16,185,129,0.06);
  --color-star: #facc15;

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;
  --space-section: 120px;

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-full: 9999px;

  /* Content */
  --content-max: 960px;
}
```

---

*End of design spec. See `mockup.html` for the visual reference implementation.*

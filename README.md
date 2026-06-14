# c0d3-dump Portfolio

Personal portfolio website for **Bhavin Sojitra** (c0d3-dump).

## Tech Stack

- **React 19** + **TypeScript 6**
- **Vite 8** (build tool)
- **Plain CSS** with design tokens (CSS custom properties)
- Zero backend — fully static

## Design

Dark terminal-inspired developer portfolio with emerald accent. See `DESIGN-SPEC.md` for the full design system.

### Key design features
- Void-black background (`#09090b`) with surface layering
- Emerald accent (`#10b981`) — terminal/code aesthetic
- Inter (body/headings) + JetBrains Mono (code/terminal labels)
- Sticky nav with scroll-triggered border (IntersectionObserver)
- Section fade-up reveal on scroll
- Card hover lift + border transitions
- Blinking terminal cursor on hero
- `prefers-reduced-motion` respected throughout
- Responsive: 4→3→2 column skill grid, 2→1 column projects

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build    # produces dist/
npm run preview  # preview the production build
```

The `dist/` folder is a fully self-contained static site — deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Project Structure

```
src/
  main.tsx              # Entry point
  App.tsx               # Root component
  index.css             # CSS entry (imports global.css)
  styles/
    tokens.css          # Design tokens (CSS custom properties)
    global.css          # All component styles + responsive
  data/
    constants.ts        # All site content (typed)
  components/
    Navbar.tsx          # Sticky nav with IntersectionObserver
    Hero.tsx            # Hero with terminal label + CTAs
    About.tsx           # Bio + contact links
    Skills.tsx          # Skill category grid cards
    Projects.tsx        # Project cards with hover lift
    Stats.tsx           # GitHub stats (3-column)
    Currently.tsx       # Building/Learning (2-column)
    Contact.tsx         # Get in touch links
    Footer.tsx          # Site footer
    SectionHeading.tsx  # Shared terminal-label + heading
    ScrollReveal.tsx    # IntersectionObserver reveal wrapper
```

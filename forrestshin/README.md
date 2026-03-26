# forrestshin.com

Personal portfolio — React + Vite + Framer Motion.

## Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| Framer Motion | Physics animations |
| @use-gesture/react | Drag / gesture input |
| React Router v6 | Client-side routing |
| CSS Modules | Scoped component styles |
| GitHub Pages | Hosting |
| Google Fonts | Cormorant Garamond, Karla, JetBrains Mono |

---

## Quick start

```bash
# Clone and install
git clone https://github.com/yourusername/forrestshin.git
cd forrestshin
npm install

# Dev server
npm run dev

# Production build
npm run build

# Preview build locally
npm run preview
```

---

## Project structure

```
src/
├── styles/
│   ├── globals.css        # Design tokens (CSS vars), reset, typography utils
│   └── physics.js         # Framer Motion spring presets + animation variants
│
├── hooks/
│   └── usePhysics.js      # Custom hooks: magnetic hover, ripple, tilt, parallax, scroll
│
├── components/
│   ├── layout/
│   │   ├── NavBar.jsx      # Sticky frosted-glass nav, mobile hamburger
│   │   ├── Footer.jsx      # Dark gradient footer
│   │   ├── PageLayout.jsx  # Nav + main + Footer wrapper, page transition
│   │   └── SectionWrapper.jsx  # Structural gradient section container
│   │
│   ├── physics/
│   │   ├── MagneticButton.jsx  # Spring magnetic pull + ripple on click
│   │   ├── TiltCard.jsx        # 3D tilt on mouse move (Material Expressive)
│   │   ├── ScrollReveal.jsx    # Viewport-triggered spring reveal
│   │   └── Ripple.jsx          # Material-style press ripple
│   │
│   ├── sections/
│   │   └── Hero.jsx        # Full-screen hero: parallax, cursor glow, orbs
│   │
│   └── ui/
│       ├── ProjectCard.jsx    # Tilt + ripple + selection state
│       └── SectionHeader.jsx  # Label + title + subtitle pattern
│
└── pages/
    ├── About.jsx      # Home — Hero, bio, skills, featured work
    ├── Technical.jsx  # Technical projects grid
    ├── Creative.jsx   # Creative work grid
    ├── Outside.jsx    # Interests / personal
    ├── Resume.jsx     # Experience, education, PDF download
    └── Contact.jsx    # Form with spring focus states + success animation
```

---

## Physics system

All animations use spring physics — no linear easing. Presets are in `src/styles/physics.js`:

```js
springs.gentle   // Page reveals, section entrances (stiffness: 120)
springs.snappy   // Nav links, small UI (stiffness: 280)
springs.bouncy   // Card hover, selection states (stiffness: 350)
springs.heavy    // Hero elements (stiffness: 80)
springs.elastic  // Icon pops, expressive moments (stiffness: 400)
springs.fluid    // Draggable / magnetic elements (stiffness: 200)
```

Custom hooks in `src/hooks/usePhysics.js`:

```js
useMagneticHover(strength)   // Pulls element toward cursor
useRipple()                  // Material click ripple
useCardTilt(maxDeg)          // 3D tilt on mouse move
useParallax(speed)           // Scroll-based parallax
useScrollProgress()          // 0–1 page scroll progress
useCursorGlow()              // Soft radial glow follows cursor
useInView(options)           // Fires once on viewport entry
```

---

## Design tokens

All colors, gradients, spacing, and fonts are CSS variables in `globals.css`:

```css
/* Key gradients */
--grad-hero        /* Dark navy hero background */
--grad-transition  /* Hero → body bridge */
--grad-section     /* Paper → lavender → azure float */
--grad-footer      /* Deep navy footer */
--grad-card        /* White → paper card surface */
--grad-selection   /* Azure → frost — selected state */
--grad-cta         /* Navy → accent → steel — buttons */
```

---

## Customization

### Colors
Edit the `:root` block in `src/styles/globals.css`.

### Fonts
Change the Google Fonts import in `index.html` and update `--font-serif`, `--font-sans`, `--font-mono`.

### Content
- **About bio:** `src/pages/About.jsx` → `bio` paragraphs
- **Projects:** Edit the arrays at top of each page file
- **Nav links:** `src/components/layout/NavBar.jsx` → `NAV_LINKS`
- **Social links:** `src/components/layout/Footer.jsx` and `src/pages/Contact.jsx`
- **Resume PDF:** Replace the `alert()` in `Resume.jsx` with a link to your PDF

### Contact form
The form is set up for easy integration. In `Contact.jsx`, replace the `setTimeout` mock with:

```js
// Formspree
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
if (res.ok) setSubmitted(true)

// Or EmailJS
import emailjs from '@emailjs/browser'
await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
setSubmitted(true)
```

---

## GitHub Pages deploy

1. Push to `main` — GitHub Actions builds and deploys automatically (`.github/workflows/deploy.yml`)
2. In GitHub repo settings → Pages → Source: **GitHub Actions**
3. For custom domain: add `CNAME` file to `/public/` containing `forrestshin.com`

```
# public/CNAME
forrestshin.com
```

Then add DNS records with your domain registrar:
```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  yourusername.github.io
```

---

## Performance notes

- All physics animations use `will-change: transform` only where needed
- `useInView` uses `IntersectionObserver` and disconnects after first trigger
- Images should be added as WebP with explicit width/height for CLS
- Framer Motion tree-shakes well — only imported variants ship

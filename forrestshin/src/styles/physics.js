/* ─────────────────────────────────────────────
   PHYSICS SYSTEM
   Mirrors Google Material Expressive spring curves.
   All animations use spring physics — no linear easing.
   ───────────────────────────────────────────── */

// Spring presets — tune stiffness/damping/mass to feel
export const springs = {
  // Gentle: page reveals, section entrances
  gentle: {
    type: 'spring',
    stiffness: 120,
    damping: 20,
    mass: 1,
  },
  // Snappy: nav links, button presses, small UI
  snappy: {
    type: 'spring',
    stiffness: 280,
    damping: 22,
    mass: 0.8,
  },
  // Bouncy: card hover lift, selection states
  bouncy: {
    type: 'spring',
    stiffness: 350,
    damping: 18,
    mass: 0.9,
  },
  // Heavy: hero elements, large containers
  heavy: {
    type: 'spring',
    stiffness: 80,
    damping: 25,
    mass: 1.5,
  },
  // Elastic: expressive moments, icon pops
  elastic: {
    type: 'spring',
    stiffness: 400,
    damping: 15,
    mass: 0.7,
  },
  // Fluid: draggable elements, magnetic hover
  fluid: {
    type: 'spring',
    stiffness: 200,
    damping: 28,
    mass: 1.2,
  },
}

// Stagger helpers — for lists and grids
export const stagger = {
  fast: 0.04,
  mid:  0.07,
  slow: 0.12,
}

// Viewport-triggered reveal variants
export const revealVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...springs.gentle,
      delay: i * stagger.mid,
    },
  }),
}

// Fade-only (no translate) — for backgrounds, overlays
export const fadeVariants = {
  hidden:  { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * stagger.fast, ease: [0.2, 0, 0, 1] },
  }),
}

// Scale-up reveal — cards, project tiles
export const scaleRevealVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...springs.bouncy, delay: i * stagger.mid },
  }),
}

// Slide-in from left — section labels, sidebar items
export const slideInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { ...springs.snappy, delay: i * stagger.fast },
  }),
}

// Container that triggers stagger on children
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.mid,
      delayChildren: 0.1,
    },
  },
}

// Magnetic hover — used with useMousePosition hook
export const magneticProps = (strength = 0.3) => ({
  whileHover: { scale: 1.04 },
  transition: springs.bouncy,
})

// Press / tap feedback
export const pressProps = {
  whileTap: { scale: 0.96 },
  transition: springs.snappy,
}

// Hero text character-by-character stagger
export const charReveal = (delay = 0) => ({
  hidden: { opacity: 0, y: 20, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { ...springs.gentle, delay },
  },
})

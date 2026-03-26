import { useRef, useState, useCallback, useEffect } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

// ── useMagneticHover ──────────────────────────────────────────────────────────
// Material Expressive "magnetic" pull toward cursor
// Returns motion values to bind to x/y on a motion element
export function useMagneticHover(strength = 0.35) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 200, damping: 28, mass: 1.2 })
  const springY = useSpring(y, { stiffness: 200, damping: 28, mass: 1.2 })

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }, [x, y, strength])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return { ref, springX, springY, handleMouseMove, handleMouseLeave }
}

// ── useRipple ─────────────────────────────────────────────────────────────────
// Material-style ripple on click — returns ripples array + triggerRipple handler
export function useRipple() {
  const [ripples, setRipples] = useState([])

  const triggerRipple = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples(prev => [...prev, { id, x, y }])
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 700)
  }, [])

  return { ripples, triggerRipple }
}

// ── useScrollProgress ─────────────────────────────────────────────────────────
// Returns 0–1 scroll progress of the whole page
export function useScrollProgress() {
  const progress = useMotionValue(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      progress.set(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [progress])

  return progress
}

// ── useParallax ───────────────────────────────────────────────────────────────
// Parallax offset on scroll — pass a ref and a speed multiplier
export function useParallax(speed = 0.3) {
  const ref = useRef(null)
  const y = useMotionValue(0)
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 1.5 })

  useEffect(() => {
    const update = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      y.set(center * speed)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [y, speed])

  return { ref, springY }
}

// ── useCardTilt ───────────────────────────────────────────────────────────────
// 3D card tilt on mouse move — Material Expressive card depth
export function useCardTilt(maxTilt = 6) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30, mass: 0.8 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30, mass: 0.8 })

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const nx = (e.clientX - cx) / (rect.width / 2)
    const ny = (e.clientY - cy) / (rect.height / 2)
    rotateX.set(-ny * maxTilt)
    rotateY.set(nx * maxTilt)
  }, [rotateX, rotateY, maxTilt])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return { ref, springRotateX, springRotateY, handleMouseMove, handleMouseLeave }
}

// ── useInView ─────────────────────────────────────────────────────────────────
// Fires once when element enters viewport — for scroll-triggered animations
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

// ── useCursorGlow ─────────────────────────────────────────────────────────────
// Tracks cursor for a soft glow that follows the mouse on hero sections
export function useCursorGlow() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 80, damping: 20 })
  const springY = useSpring(y, { stiffness: 80, damping: 20 })

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }, [x, y])

  return { springX, springY, handleMouseMove }
}

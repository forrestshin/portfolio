import { motion, useTransform } from 'framer-motion'
import { useCursorGlow, useScrollProgress } from '../../hooks/usePhysics'
import { springs, staggerContainer, revealVariants } from '../../styles/physics'
import MagneticButton from '../physics/MagneticButton'
import styles from './Hero.module.css'

export default function Hero() {
  const { springX, springY, handleMouseMove } = useCursorGlow()
  const scrollProgress = useScrollProgress()
  const heroOpacity = useTransform(scrollProgress, [0, 0.25], [1, 0])
  const heroY = useTransform(scrollProgress, [0, 0.3], [0, 80])

  return (
    <motion.section
      className={styles.hero}
      onMouseMove={handleMouseMove}
      style={{ opacity: heroOpacity }}
    >
      {/* Gradient background */}
      <div className={styles.gradBg} />

      {/* Cursor glow */}
      <motion.div
        className={styles.cursorGlow}
        style={{ x: springX, y: springY }}
      />

      {/* Floating orbs — physics-driven ambient motion */}
      <motion.div
        className={`${styles.orb} ${styles.orb1}`}
        animate={{ y: [0, -28, 0], x: [0, 14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${styles.orb} ${styles.orb2}`}
        animate={{ y: [0, 22, 0], x: [0, -18, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className={`${styles.orb} ${styles.orb3}`}
        animate={{ y: [0, -16, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Content */}
      <motion.div
        className={styles.content}
        style={{ y: heroY }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className={styles.inner}
        >
          {/* Label */}
          <motion.p
            className={styles.label}
            variants={revealVariants}
            custom={0}
          >
            forrestshin.com
          </motion.p>

          {/* Name */}
          <motion.h1
            className={styles.name}
            variants={revealVariants}
            custom={1}
          >
            Forrest <em>Shin</em>
          </motion.h1>

          {/* Descriptor */}
          <motion.p
            className={styles.descriptor}
            variants={revealVariants}
            custom={2}
          >
            Designer &amp; Developer —<br className={styles.break} />
            equal parts technical and creative.
          </motion.p>

          {/* Divider line */}
          <motion.div
            className={styles.divider}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ ...springs.gentle, delay: 0.55 }}
          />

          {/* CTA buttons */}
          <motion.div
            className={styles.ctas}
            variants={revealVariants}
            custom={4}
          >
            <MagneticButton variant="ghost" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
              View my work ↓
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => window.location.href = '/contact'}>
              Get in touch
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.div
            className={styles.scrollDot}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className={styles.scrollLabel}>Scroll</span>
        </motion.div>
      </motion.div>

      {/* Transition gradient at bottom */}
      <div className={styles.transitionGrad} />
    </motion.section>
  )
}

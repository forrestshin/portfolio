import { motion } from 'framer-motion'
import TiltCard from '../physics/TiltCard'
import { useRipple } from '../../hooks/usePhysics'
import Ripple from '../physics/Ripple'
import styles from './ProjectCard.module.css'

export default function ProjectCard({
  index,
  number,
  title,
  description,
  tags = [],
  type = 'technical',
  selected = false,
  onClick,
}) {
  const { ripples, triggerRipple } = useRipple()

  const handleClick = (e) => {
    triggerRipple(e)
    onClick?.()
  }

  return (
    <TiltCard selected={selected} onClick={handleClick} className={styles.card}>
      {/* Top accent bar */}
      <div className={`${styles.accent} ${styles[type]}`} />

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.num}>{number}</span>
          {selected && (
            <motion.span
              className={styles.selectedBadge}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <span className={styles.selectedDot} />
              Selected
            </motion.span>
          )}
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>

        <div className={styles.tags}>
          {tags.map(tag => (
            <span key={tag} className={`${styles.tag} ${styles[type]}`}>{tag}</span>
          ))}
        </div>

        <motion.div
          className={styles.arrow}
          animate={selected ? { x: 4 } : { x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          →
        </motion.div>
      </div>

      <Ripple ripples={ripples} />
    </TiltCard>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
import styles from './Ripple.module.css'

export default function Ripple({ ripples, color = 'rgba(30, 42, 74, 0.12)' }) {
  return (
    <AnimatePresence>
      {ripples.map(({ id, x, y }) => (
        <motion.span
          key={id}
          className={styles.ripple}
          style={{ left: x, top: y, background: color }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 8, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.2, 0, 0, 1] }}
        />
      ))}
    </AnimatePresence>
  )
}

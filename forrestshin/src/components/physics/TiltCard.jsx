import { motion } from 'framer-motion'
import { useCardTilt } from '../../hooks/usePhysics'
import { springs } from '../../styles/physics'
import styles from './TiltCard.module.css'

export default function TiltCard({ children, className = '', selected = false, onClick }) {
  const { ref, springRotateX, springRotateY, handleMouseMove, handleMouseLeave } = useCardTilt(5)

  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${selected ? styles.selected : ''} ${className}`}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={springs.bouncy}
    >
      {children}
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { useMagneticHover, useRipple } from '../../hooks/usePhysics'
import { springs, pressProps } from '../../styles/physics'
import Ripple from './Ripple'
import styles from './MagneticButton.module.css'

export default function MagneticButton({
  children,
  variant = 'primary',
  onClick,
  className = '',
  strength = 0.3,
  ...props
}) {
  const { ref, springX, springY, handleMouseMove, handleMouseLeave } = useMagneticHover(strength)
  const { ripples, triggerRipple } = useRipple()

  const handleClick = (e) => {
    triggerRipple(e)
    onClick?.(e)
  }

  return (
    <motion.button
      ref={ref}
      className={`${styles.btn} ${styles[variant]} ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={springs.bouncy}
      {...props}
    >
      <span className={styles.inner}>{children}</span>
      <Ripple ripples={ripples} color={variant === 'primary' ? 'rgba(176,186,207,0.3)' : 'rgba(30,42,74,0.1)'} />
    </motion.button>
  )
}

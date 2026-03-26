import { motion } from 'framer-motion'
import { useInView } from '../../hooks/usePhysics'
import { revealVariants, scaleRevealVariants, slideInVariants, fadeVariants } from '../../styles/physics'

const variantMap = {
  reveal: revealVariants,
  scale:  scaleRevealVariants,
  slide:  slideInVariants,
  fade:   fadeVariants,
}

export default function ScrollReveal({
  children,
  variant = 'reveal',
  index = 0,
  className = '',
  as = 'div',
  ...props
}) {
  const { ref, inView } = useInView()
  const variants = variantMap[variant] || revealVariants

  const Component = motion[as] || motion.div

  return (
    <Component
      ref={ref}
      className={className}
      variants={variants}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      {...props}
    >
      {children}
    </Component>
  )
}

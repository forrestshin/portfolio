import styles from './SectionWrapper.module.css'

const variants = {
  default:    styles.varDefault,
  light:      styles.varLight,
  dark:       styles.varDark,
  creative:   styles.varCreative,
  transition: styles.varTransition,
  azure:      styles.varAzure,
}

export default function SectionWrapper({
  children,
  variant = 'default',
  id,
  className = '',
  noPadding = false,
}) {
  return (
    <section
      id={id}
      className={[
        styles.section,
        variants[variant] || variants.default,
        noPadding ? styles.noPad : '',
        className,
      ].join(' ')}
    >
      {/* Left-edge gradient border */}
      <div className={styles.leftBorder} />
      <div className={styles.inner}>
        {children}
      </div>
    </section>
  )
}

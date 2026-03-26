import ScrollReveal from '../physics/ScrollReveal'
import styles from './SectionHeader.module.css'

export default function SectionHeader({ label, title, subtitle, light = false }) {
  return (
    <div className={`${styles.header} ${light ? styles.light : ''}`}>
      {label && (
        <ScrollReveal variant="slide" index={0}>
          <p className={styles.label}>{label}</p>
        </ScrollReveal>
      )}
      <ScrollReveal variant="reveal" index={1}>
        <h2 className={styles.title}>{title}</h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal variant="reveal" index={2}>
          <p className={styles.subtitle}>{subtitle}</p>
        </ScrollReveal>
      )}
    </div>
  )
}

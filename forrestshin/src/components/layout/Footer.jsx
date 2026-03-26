import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../physics/ScrollReveal'
import styles from './Footer.module.css'

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/forrestshin' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/forrestshin' },
  { label: 'Email',    href: 'mailto:hello@forrestshin.com' },
]

const NAV_LINKS = [
  { label: 'About',     path: '/' },
  { label: 'Technical', path: '/technical' },
  { label: 'Creative',  path: '/creative' },
  { label: 'Contact',   path: '/contact' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <ScrollReveal variant="reveal">
          <div className={styles.top}>
            <div className={styles.brand}>
              <div className={styles.logo}>Forrest <em>Shin</em></div>
              <p className={styles.tagline}>Designer &amp; Developer</p>
            </div>

            <div className={styles.cols}>
              <div className={styles.col}>
                <span className={styles.colLabel}>Navigation</span>
                {NAV_LINKS.map(link => (
                  <Link key={link.path} to={link.path} className={styles.footerLink}>
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className={styles.col}>
                <span className={styles.colLabel}>Connect</span>
                {SOCIAL_LINKS.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLink}
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className={styles.bottom}>
          <span className={styles.copy}>© 2025 Forrest Shin</span>
          <span className={styles.built}>Built with React + Framer Motion</span>
        </div>
      </div>
    </footer>
  )
}

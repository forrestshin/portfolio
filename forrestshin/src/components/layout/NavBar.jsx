import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useMagneticHover } from '../../hooks/usePhysics'
import { springs } from '../../styles/physics'
import styles from './NavBar.module.css'

const NAV_LINKS = [
  { label: 'About',        path: '/' },
  { label: 'Technical',    path: '/technical' },
  { label: 'Creative',     path: '/creative' },
  { label: 'Outside Work', path: '/outside' },
  { label: 'Résumé',       path: '/resume' },
  { label: 'Contact',      path: '/contact' },
]

function NavLink({ label, path, active }) {
  const { ref, springX, springY, handleMouseMove, handleMouseLeave } = useMagneticHover(0.15)

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={path} className={`${styles.link} ${active ? styles.active : ''}`}>
        {label}
        {active && (
          <motion.span
            className={styles.activeLine}
            layoutId="navUnderline"
            transition={springs.snappy}
          />
        )}
      </Link>
    </motion.div>
  )
}

export default function NavBar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...springs.gentle, delay: 0.2 }}
    >
      <nav className={styles.nav}>
        <motion.div whileHover={{ scale: 1.03 }} transition={springs.bouncy}>
          <Link to="/" className={styles.logo}>
            FS <em>—</em>
          </Link>
        </motion.div>

        {/* Desktop links */}
        <div className={styles.links}>
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.path}
              {...link}
              active={location.pathname === link.path}
            />
          ))}
        </div>

        {/* Mobile hamburger */}
        <motion.button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          whileTap={{ scale: 0.92 }}
          transition={springs.snappy}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.open1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open3 : ''}`} />
        </motion.button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={springs.snappy}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springs.snappy, delay: i * 0.05 }}
              >
                <Link
                  to={link.path}
                  className={`${styles.mobileLink} ${location.pathname === link.path ? styles.mobileLinkActive : ''}`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

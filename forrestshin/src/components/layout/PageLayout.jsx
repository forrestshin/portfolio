import { motion } from 'framer-motion'
import NavBar from './NavBar'
import Footer from './Footer'
import { springs } from '../../styles/physics'
import styles from './PageLayout.module.css'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0, transition: { ...springs.gentle, delay: 0.05 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.22, ease: [0.3, 0, 1, 1] } },
}

export default function PageLayout({ children }) {
  return (
    <div className={styles.layout}>
      <NavBar />
      <motion.main
        className={styles.main}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}

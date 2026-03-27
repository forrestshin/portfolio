import { motion } from 'framer-motion'
import PageLayout from '../components/layout/PageLayout'
import SectionWrapper from '../components/layout/SectionWrapper'
import SectionHeader from '../components/ui/SectionHeader'
import ScrollReveal from '../components/physics/ScrollReveal'
import { staggerContainer, scaleRevealVariants } from '../styles/physics'
import styles from './Outside.module.css'

const INTERESTS = [
  { label: 'Climbing', description: 'Bouldering indoors and sport climbing outdoors. Movement as puzzle-solving.' },
  { label: 'Film Photography', description: 'Shooting 35mm and medium format. Slower process, more intentional seeing.' },
  { label: 'Cooking', description: 'Korean home cooking and fermentation. Food as cultural memory.' },
  { label: 'Reading', description: 'Design theory, philosophy of technology, and the occasional novel.' },
  { label: 'Music', description: 'Ambient, jazz, and anything with texture. Learning piano slowly.' },
  { label: 'Travel', description: "Interested in cities — how they're planned, how they feel on foot." },
]

export default function Outside() {
  return (
    <PageLayout>
      <div style={{ background: 'linear-gradient(160deg, #2A3A5C 0%, #3D4F6B 60%, #6B7FA3 100%)', paddingTop: '120px' }}>
        <SectionWrapper variant="dark" noPadding>
          <div style={{ padding: '64px 48px 80px' }}>
            <SectionHeader label="Outside of Work" title="The person behind the portfolio." subtitle="Interests, obsessions, and everything that informs the work." light />
          </div>
        </SectionWrapper>
        <SectionWrapper variant="transition" noPadding />
      </div>

      <SectionWrapper variant="light">
        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {INTERESTS.map((item, i) => (
            <motion.div key={item.label} variants={scaleRevealVariants} custom={i} className={styles.item}>
              <span className={styles.itemLabel}>{item.label}</span>
              <p className={styles.itemDesc}>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>
    </PageLayout>
  )
}

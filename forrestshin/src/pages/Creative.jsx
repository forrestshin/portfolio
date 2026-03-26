import { useState } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '../components/layout/PageLayout'
import SectionWrapper from '../components/layout/SectionWrapper'
import SectionHeader from '../components/ui/SectionHeader'
import ProjectCard from '../components/ui/ProjectCard'
import ScrollReveal from '../components/physics/ScrollReveal'
import MagneticButton from '../components/physics/MagneticButton'
import { staggerContainer, scaleRevealVariants } from '../styles/physics'
import styles from './Creative.module.css'

const PROJECTS = [
  { id: 1, number: 'WORK 01', title: 'Type Specimen', description: 'Interactive typeface exploration for a quarterly editorial publication.', tags: ['Typography', 'Editorial', 'Print'], type: 'creative' },
  { id: 2, number: 'WORK 02', title: 'Brand Identity', description: 'Full visual identity system for an architecture studio in Seoul.', tags: ['Branding', 'Figma', 'Print'], type: 'creative' },
  { id: 3, number: 'WORK 03', title: 'Motion Reel', description: 'Title sequences and motion graphics for a film festival.', tags: ['After Effects', 'Cinema 4D', 'Motion'], type: 'creative' },
  { id: 4, number: 'WORK 04', title: 'Photo Series', description: 'Documentary photography exploring urban density in East Asia.', tags: ['Photography', 'Film', 'Editorial'], type: 'creative' },
  { id: 5, number: 'WORK 05', title: 'Poster Series', description: 'Twelve-piece concert poster series for an experimental music venue.', tags: ['Print', 'Illustration', 'Risograph'], type: 'creative' },
  { id: 6, number: 'WORK 06', title: 'Exhibition Design', description: 'Spatial design and wayfinding for a contemporary art exhibition.', tags: ['Spatial', 'Wayfinding', '3D'], type: 'creative' },
]

export default function Creative() {
  const [selected, setSelected] = useState(null)

  return (
    <PageLayout>
      <div style={{ background: 'linear-gradient(160deg, #3D4F6B 0%, #5C6F8C 50%, #8A96B0 100%)', paddingTop: '120px' }}>
        <SectionWrapper variant="dark" noPadding>
          <div style={{ padding: '64px 48px 80px' }}>
            <SectionHeader label="Creative Works" title={<>Making things <em style={{fontStyle:'italic',color:'var(--mist)'}}>feel</em> right.</>} subtitle="Visual design, editorial, photography, and motion — the expressive half." light />
          </div>
        </SectionWrapper>
        <SectionWrapper variant="transition" noPadding />
      </div>

      <SectionWrapper variant="creative">
        <motion.div className={styles.grid} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          {PROJECTS.map((p, i) => (
            <motion.div key={p.id} variants={scaleRevealVariants} custom={i}>
              <ProjectCard {...p} selected={selected === p.id} onClick={() => setSelected(selected === p.id ? null : p.id)} />
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>
    </PageLayout>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '../components/layout/PageLayout'
import SectionWrapper from '../components/layout/SectionWrapper'
import SectionHeader from '../components/ui/SectionHeader'
import ProjectCard from '../components/ui/ProjectCard'
import ScrollReveal from '../components/physics/ScrollReveal'
import MagneticButton from '../components/physics/MagneticButton'
import { staggerContainer, scaleRevealVariants } from '../styles/physics'
import styles from './Technical.module.css'

const PROJECTS = [
  { id: 1, number: 'PROJECT 01', title: 'Design System', description: 'Component library with 80+ tokens across 6 product surfaces.', tags: ['React', 'TypeScript', 'Figma'], type: 'technical' },
  { id: 2, number: 'PROJECT 02', title: 'Data Visualizer', description: 'Real-time environmental sensor dashboard with WebSocket streaming.', tags: ['D3.js', 'Node.js', 'WebSocket'], type: 'technical' },
  { id: 3, number: 'PROJECT 03', title: 'CLI Toolkit', description: 'Developer productivity toolchain for automated code scaffolding.', tags: ['Python', 'CLI', 'Automation'], type: 'technical' },
  { id: 4, number: 'PROJECT 04', title: 'API Gateway', description: 'Rate-limited GraphQL gateway serving 50k+ requests per day.', tags: ['GraphQL', 'AWS', 'Redis'], type: 'technical' },
  { id: 5, number: 'PROJECT 05', title: '3D Portfolio', description: 'WebGL-based experimental portfolio with Three.js physics.', tags: ['Three.js', 'WebGL', 'GLSL'], type: 'technical' },
  { id: 6, number: 'PROJECT 06', title: 'Auth System', description: 'OAuth2 + JWT authentication system with refresh token rotation.', tags: ['Security', 'Node.js', 'PostgreSQL'], type: 'technical' },
]

export default function Technical() {
  const [selected, setSelected] = useState(null)

  return (
    <PageLayout>
      {/* Dark page header */}
      <div style={{ background: 'var(--grad-hero)', paddingTop: '120px' }}>
        <SectionWrapper variant="dark" noPadding>
          <div style={{ padding: '64px 48px 80px' }}>
            <SectionHeader label="Technical Works" title="Code as craft." subtitle="Engineering projects, systems, and tools — built with precision." light />
          </div>
        </SectionWrapper>
        <SectionWrapper variant="transition" noPadding />
      </div>

      <SectionWrapper variant="default">
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

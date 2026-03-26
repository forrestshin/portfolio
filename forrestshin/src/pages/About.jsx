import { useState } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '../components/layout/PageLayout'
import SectionWrapper from '../components/layout/SectionWrapper'
import SectionHeader from '../components/ui/SectionHeader'
import Hero from '../components/sections/Hero'
import ProjectCard from '../components/ui/ProjectCard'
import ScrollReveal from '../components/physics/ScrollReveal'
import MagneticButton from '../components/physics/MagneticButton'
import { staggerContainer, scaleRevealVariants } from '../styles/physics'
import styles from './About.module.css'

const FEATURED_PROJECTS = [
  {
    id: 1,
    number: 'PROJECT 01',
    title: 'Design System',
    description: 'Component library with 80+ tokens across 6 product surfaces. Built in Figma and React.',
    tags: ['React', 'Figma', 'TypeScript'],
    type: 'technical',
  },
  {
    id: 2,
    number: 'PROJECT 02',
    title: 'Data Visualizer',
    description: 'Real-time dashboard for tracking environmental sensor data. Physics-driven charts.',
    tags: ['D3.js', 'WebSocket', 'Python'],
    type: 'technical',
  },
  {
    id: 3,
    number: 'PROJECT 03',
    title: 'Type Specimen',
    description: 'Interactive type exploration for a quarterly editorial publication.',
    tags: ['Editorial', 'Motion', 'Print'],
    type: 'creative',
  },
]

const SKILLS = [
  { label: 'Design', items: ['Figma', 'Motion Design', 'Typography', 'Systems Design', 'Prototyping'] },
  { label: 'Development', items: ['React', 'TypeScript', 'Node.js', 'Python', 'Three.js'] },
  { label: 'Craft', items: ['Visual Identity', 'Editorial', 'Data Viz', 'Interaction Design', 'Photography'] },
]

export default function About() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <Hero />

      {/* ── Transition strip ── */}
      <SectionWrapper variant="transition" noPadding />

      {/* ── About blurb ── */}
      <SectionWrapper variant="light" id="about">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutLeft}>
            <SectionHeader
              label="01 — About"
              title="The thinking behind the making."
            />
            <ScrollReveal variant="reveal" index={0}>
              <p className={styles.bio}>
                I'm Forrest — a designer and developer based in [City]. I work at the
                intersection of craft and engineering, building interfaces that are
                rigorous in their construction and alive in their feeling.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="reveal" index={1}>
              <p className={styles.bio}>
                My technical work lives in React ecosystems, design systems, and
                data visualization. My creative work spans editorial design,
                typography, and photography. I believe the best digital products
                don't separate these disciplines — they fuse them.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="reveal" index={2}>
              <div className={styles.aboutCtas}>
                <MagneticButton variant="primary" onClick={() => window.location.href = '/contact'}>
                  Let's work together →
                </MagneticButton>
                <MagneticButton variant="secondary" onClick={() => window.location.href = '/resume'}>
                  View résumé
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>

          <div className={styles.aboutRight}>
            {/* Placeholder portrait */}
            <ScrollReveal variant="scale" index={0}>
              <div className={styles.portrait}>
                <div className={styles.portraitInner}>
                  <span className={styles.portraitLabel}>Portrait</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Skills ── */}
      <SectionWrapper variant="azure">
        <SectionHeader
          label="02 — Skills"
          title="What I bring to the table."
          subtitle="A full-stack creative practice — from concept to code."
        />
        <motion.div
          className={styles.skillsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.label}
              className={styles.skillGroup}
              variants={scaleRevealVariants}
              custom={i}
            >
              <span className={styles.skillGroupLabel}>{group.label}</span>
              <ul className={styles.skillList}>
                {group.items.map(item => (
                  <li key={item} className={styles.skillItem}>
                    <span className={styles.skillDot} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* ── Featured work ── */}
      <SectionWrapper variant="default" id="work">
        <SectionHeader
          label="03 — Featured Work"
          title="Selected projects."
          subtitle="A sample across both disciplines. More in each section."
        />
        <motion.div
          className={styles.projectsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {FEATURED_PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              variants={scaleRevealVariants}
              custom={i}
            >
              <ProjectCard
                {...project}
                selected={selectedProject === project.id}
                onClick={() => setSelectedProject(
                  selectedProject === project.id ? null : project.id
                )}
              />
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal variant="reveal" index={0}>
          <div className={styles.allWorkLinks}>
            <MagneticButton variant="secondary" onClick={() => window.location.href = '/technical'}>
              View technical work →
            </MagneticButton>
            <MagneticButton variant="secondary" onClick={() => window.location.href = '/creative'}>
              View creative work →
            </MagneticButton>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageLayout>
  )
}

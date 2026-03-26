import { motion } from 'framer-motion'
import PageLayout from '../components/layout/PageLayout'
import SectionWrapper from '../components/layout/SectionWrapper'
import SectionHeader from '../components/ui/SectionHeader'
import MagneticButton from '../components/physics/MagneticButton'
import ScrollReveal from '../components/physics/ScrollReveal'
import { staggerContainer, revealVariants } from '../styles/physics'
import styles from './Resume.module.css'

const EXPERIENCE = [
  { role: 'Senior Product Designer', company: 'Company Name', period: '2023 — Present', description: 'Led design of core product surfaces. Built and maintained the design system. Worked closely with engineering on component architecture.' },
  { role: 'UX Designer & Frontend Dev', company: 'Company Name', period: '2021 — 2023', description: 'End-to-end design and implementation of new user onboarding. Reduced drop-off by 34%. Introduced motion design language.' },
  { role: 'Freelance Designer', company: 'Independent', period: '2019 — 2021', description: 'Brand identities, editorial design, and web projects for clients across architecture, music, and culture.' },
]

const EDUCATION = [
  { degree: 'B.S. Computer Science', school: 'University Name', period: '2015 — 2019' },
  { degree: 'Certificate, Graphic Design', school: 'Program Name', period: '2018' },
]

export default function Resume() {
  return (
    <PageLayout>
      <div style={{ background: 'var(--grad-hero)', paddingTop: '120px' }}>
        <SectionWrapper variant="dark" noPadding>
          <div style={{ padding: '64px 48px 80px' }}>
            <SectionHeader label="Résumé" title="Experience & Education." light />
          </div>
        </SectionWrapper>
        <SectionWrapper variant="transition" noPadding />
      </div>

      <SectionWrapper variant="light">
        <div className={styles.resumeLayout}>
          <div className={styles.main}>
            <ScrollReveal variant="reveal">
              <div className={styles.block}>
                <span className={styles.blockLabel}>Experience</span>
                <div className={styles.entries}>
                  {EXPERIENCE.map((e, i) => (
                    <ScrollReveal key={e.role} variant="reveal" index={i} className={styles.entry}>
                      <div className={styles.entryHead}>
                        <div>
                          <h3 className={styles.entryRole}>{e.role}</h3>
                          <span className={styles.entryCompany}>{e.company}</span>
                        </div>
                        <span className={styles.entryPeriod}>{e.period}</span>
                      </div>
                      <p className={styles.entryDesc}>{e.description}</p>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="reveal" index={1}>
              <div className={styles.block}>
                <span className={styles.blockLabel}>Education</span>
                <div className={styles.entries}>
                  {EDUCATION.map((e, i) => (
                    <ScrollReveal key={e.degree} variant="reveal" index={i} className={styles.entry}>
                      <div className={styles.entryHead}>
                        <div>
                          <h3 className={styles.entryRole}>{e.degree}</h3>
                          <span className={styles.entryCompany}>{e.school}</span>
                        </div>
                        <span className={styles.entryPeriod}>{e.period}</span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className={styles.sidebar}>
            <ScrollReveal variant="scale" index={0}>
              <div className={styles.downloadCard}>
                <span className={styles.blockLabel}>Download</span>
                <p className={styles.downloadDesc}>Full PDF résumé with all project details and references.</p>
                <MagneticButton variant="primary" onClick={() => alert('Link your PDF here')}>
                  Download PDF →
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>
    </PageLayout>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageLayout from '../components/layout/PageLayout'
import SectionWrapper from '../components/layout/SectionWrapper'
import SectionHeader from '../components/ui/SectionHeader'
import MagneticButton from '../components/physics/MagneticButton'
import ScrollReveal from '../components/physics/ScrollReveal'
import { springs, staggerContainer, revealVariants } from '../styles/physics'
import { useRipple } from '../hooks/usePhysics'
import Ripple from '../components/physics/Ripple'
import styles from './Contact.module.css'

const SOCIAL = [
  { label: 'GitHub',   href: 'https://github.com/forrestshin',   handle: '@forrestshin' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/forrestshin', handle: 'Forrest Shin' },
  { label: 'Email',    href: 'mailto:hello@forrestshin.com',      handle: 'hello@forrestshin.com' },
]

function FormField({ label, type = 'text', name, value, onChange, placeholder, multiline = false }) {
  const [focused, setFocused] = useState(false)
  const filled = value.length > 0

  const inputProps = {
    name,
    value,
    onChange,
    placeholder,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: [
      styles.input,
      focused ? styles.inputFocused : '',
      filled  ? styles.inputFilled  : '',
    ].join(' '),
  }

  return (
    <div className={styles.fieldWrap}>
      <motion.label
        className={styles.fieldLabel}
        animate={focused || filled
          ? { y: -4, fontSize: '9px', color: 'var(--accent-blue)' }
          : { y: 0,  fontSize: '10px', color: 'var(--text-muted)' }
        }
        transition={springs.snappy}
      >
        {label}
      </motion.label>

      {multiline
        ? <textarea rows={5} {...inputProps} className={`${inputProps.className} ${styles.textarea}`} />
        : <input type={type} {...inputProps} />
      }

      {/* Focus underline — physics spring width */}
      <motion.div
        className={styles.focusLine}
        animate={{ scaleX: focused ? 1 : 0, originX: 0 }}
        transition={springs.snappy}
      />
    </div>
  )
}

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const { ripples, triggerRipple } = useRipple()

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    triggerRipple(e)
    // Replace with your actual form submission (Formspree, EmailJS, etc.)
    setTimeout(() => setSubmitted(true), 300)
  }

  return (
    <PageLayout>
      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg,#1E2A4A 0%,#2A3A5C 50%,#3D4F6B 100%)', paddingTop: '120px' }}>
        <SectionWrapper variant="dark" noPadding>
          <div style={{ padding: '64px 48px 80px' }}>
            <SectionHeader
              label="06 — Contact"
              title={<>Let's make something <em style={{ fontStyle:'italic', color:'var(--mist)' }}>together.</em></>}
              subtitle="Open to freelance projects, full-time roles, and interesting conversations."
              light
            />
          </div>
        </SectionWrapper>
        <SectionWrapper variant="transition" noPadding />
      </div>

      <SectionWrapper variant="light">
        <div className={styles.contactGrid}>

          {/* ── Form ── */}
          <div className={styles.formCol}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className={styles.successState}
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={springs.bouncy}
                >
                  <motion.div
                    className={styles.successIcon}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ ...springs.elastic, delay: 0.1 }}
                  >
                    ✓
                  </motion.div>
                  <h3 className={styles.successTitle}>Message sent.</h3>
                  <p className={styles.successDesc}>
                    Thanks for reaching out — I'll get back to you within a couple of days.
                  </p>
                  <MagneticButton variant="secondary" onClick={() => { setForm({ name:'',email:'',subject:'',message:'' }); setSubmitted(false) }}>
                    Send another →
                  </MagneticButton>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className={styles.form}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ position: 'relative', overflow: 'hidden' }}
                >
                  <div className={styles.formRow}>
                    <FormField label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Forrest Shin" />
                    <FormField label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="hello@example.com" />
                  </div>
                  <FormField label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Project inquiry" />
                  <FormField label="Message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about what you're working on…" multiline />

                  <div className={styles.formFooter}>
                    <MagneticButton variant="primary" onClick={handleSubmit}>
                      Send message →
                    </MagneticButton>
                    <span className={styles.formNote}>I typically respond within 48 hours.</span>
                  </div>
                  <Ripple ripples={ripples} color="rgba(30,42,74,0.08)" />
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ── Sidebar ── */}
          <div className={styles.sidebar}>
            <ScrollReveal variant="reveal" index={0}>
              <div className={styles.sideBlock}>
                <span className={styles.sideLabel}>Find me elsewhere</span>
                <div className={styles.socialList}>
                  {SOCIAL.map((s, i) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialItem}
                      whileHover={{ x: 4 }}
                      transition={springs.snappy}
                    >
                      <div>
                        <span className={styles.socialPlatform}>{s.label}</span>
                        <span className={styles.socialHandle}>{s.handle}</span>
                      </div>
                      <span className={styles.socialArrow}>↗</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="reveal" index={1}>
              <div className={styles.sideBlock}>
                <span className={styles.sideLabel}>Availability</span>
                <div className={styles.availBadge}>
                  <span className={styles.availDot} />
                  Available for projects
                </div>
                <p className={styles.availNote}>
                  Currently open to freelance work and select full-time opportunities.
                  Based in [City] — open to remote.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>
    </PageLayout>
  )
}

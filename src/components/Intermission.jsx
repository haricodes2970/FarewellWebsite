import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Intermission() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ padding: '60px 24px', display: 'flex', justifyContent: 'center' }}
    >
      <div style={{
        position: 'relative',
        display: 'inline-block',
        padding: '32px 60px',
        background: 'radial-gradient(ellipse at center, rgba(12,16,28,0.9) 0%, var(--bg) 100%)',
      }}>
        {/* Outer frame */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '2px solid var(--gold)',
          opacity: 0.4,
          pointerEvents: 'none',
        }} />
        {/* Inner frame */}
        <div style={{
          position: 'absolute',
          inset: '6px',
          border: '1px solid var(--gold)',
          opacity: 0.2,
          pointerEvents: 'none',
        }} />

        <div className="flicker" style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          letterSpacing: '0.3em',
          color: 'var(--gold)',
          textAlign: 'center',
          position: 'relative',
        }}>
          — INTERMISSION —
        </div>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: '13px',
          color: 'var(--text-muted)',
          textAlign: 'center',
          marginTop: '10px',
          letterSpacing: '0.1em',
        }}>
          The show continues after a brief pause
        </div>
      </div>
    </section>
  )
}

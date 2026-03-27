import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const counterData = [
  { target: 4,  label: 'Years of Memories' },
  { target: 2,  label: 'Batches Celebrating' },
  { target: 11, label: 'Events in One Night' },
  { target: 1,  label: 'Night to Remember' },
]

function Counter({ target, label, delay }) {
  const numRef = useRef(null)
  const obj    = useRef({ val: 0 })

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: numRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj.current, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          delay,
          snap: { val: 1 },
          onUpdate: () => {
            if (numRef.current) numRef.current.textContent = Math.round(obj.current.val)
          },
        })
      },
    })
    return () => trigger.kill()
  }, [target, delay])

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        ref={numRef}
        style={{
          fontFamily: 'Cinzel, serif',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          color: 'var(--gold-bright)',
          textShadow: '0 0 30px rgba(240,200,110,0.4)',
          display: 'block',
          lineHeight: 1,
          marginBottom: '12px',
        }}
      >
        0
      </div>
      <div style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: 'var(--text-muted)',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function Counters() {
  return (
    <section style={{ padding: '80px 24px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.4em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          opacity: 0.7,
          marginBottom: '12px',
        }}>
          By the Numbers
        </div>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 400,
          color: 'var(--text-primary)',
        }}>
          The Story in Numbers
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '2rem',
      }}>
        {counterData.map((c, i) => (
          <Counter key={c.label} target={c.target} label={c.label} delay={i * 0.2} />
        ))}
      </div>
    </section>
  )
}

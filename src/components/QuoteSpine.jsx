import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const quotes = [
  "Some are here to say goodbye…\nsome are here to say hello.",
  "As one story comes to an end,\nanother quietly begins.",
  "We're not just witnessing this moment…\nwe're part of it.",
  "What they leave behind\nbecomes what we build on.",
  "From one story…\nto another.",
]

function QuoteBlock({ text, index }) {
  const ref = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
      },
    })
  }, [])

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Gold glowing dot */}
      <div
        ref={dotRef}
        className="gold-pulse"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--gold)',
          margin: '0 auto 24px',
          display: 'block',
        }}
      />
      <p style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontStyle: 'italic',
        fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
        color: 'var(--text-primary)',
        whiteSpace: 'pre-line',
        lineHeight: 1.7,
      }}>
        "{text}"
      </p>
    </div>
  )
}

export default function QuoteSpine() {
  return (
    <section style={{
      padding: '80px 24px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Center spine line */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '2px',
        background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)',
        opacity: 0.15,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '450px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '80px',
      }}>
        {quotes.map((q, i) => (
          <QuoteBlock key={i} text={q} index={i} />
        ))}
      </div>
    </section>
  )
}

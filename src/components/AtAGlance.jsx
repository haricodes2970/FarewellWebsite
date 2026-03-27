import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    emoji: '📅',
    title: 'Date',
    details: ['April 11th', 'Doors Open: 6:00 PM', 'Showtime: 7:00 PM'],
  },
  {
    emoji: '🎬',
    title: 'Theme',
    details: ['Movie Launch', 'Hollywood Premiere', '"From One Story to Another"'],
  },
  {
    emoji: '👥',
    title: 'Audience',
    details: ['Seniors: Batch 2026 & 2028', 'Juniors: Batch 2028 & 2030'],
  },
  {
    emoji: '✨',
    title: 'Junior Events TBD',
    details: [
      'Junior-specific events are yet to be planned.',
      'Games, activities and surprises to be decided by the team.',
    ],
  },
]

export default function AtAGlance() {
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children ?? [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.4em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          opacity: 0.7,
          marginBottom: '12px',
        }}>
          The Details
        </div>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 400,
          color: 'var(--text-primary)',
        }}>
          ⭐ At a Glance
        </h2>
      </div>

      {/* Cards grid */}
      <div
        ref={cardsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {cards.map(card => (
          <div
            key={card.title}
            style={{
              background: 'var(--bg-card)',
              borderLeft: '3px solid var(--gold)',
              borderTop: '1px solid var(--border)',
              borderRight: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '24px 20px',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{card.emoji}</div>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '12px',
            }}>
              {card.title}
            </div>
            {card.details.map((d, i) => (
              <div
                key={i}
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '13px',
                  color: 'var(--text-dim)',
                  lineHeight: 1.6,
                  marginBottom: '4px',
                }}
              >
                {d}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

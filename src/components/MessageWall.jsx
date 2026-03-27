import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const messages = [
  { type: 'senior', quote: "Four years felt like four months. I'm not ready, but I'm grateful.", from: "Final Year, CSE" },
  { type: 'senior', quote: "I walked in not knowing anyone. I'm walking out not wanting to leave anyone.", from: "Final Year, AIML" },
  { type: 'senior', quote: "To the juniors — protect the canteen corner table. That's sacred ground.", from: "Final Year, ECE" },
  { type: 'junior', quote: "We just got here and it already feels like home. That's on the seniors who built this culture.", from: "2nd Year, AIML" },
  { type: 'junior', quote: "I hope we can be half as legendary as the batch leaving.", from: "2nd Year, CSE" },
  { type: 'senior', quote: "They told us college flies by. Now I believe them.", from: "Final Year, Mech" },
  { type: 'senior', quote: "The lab at 2 AM hits different when you know it's the last time.", from: "Final Year, AIML" },
  { type: 'junior', quote: "We're inheriting something special. We won't let it fade.", from: "2nd Year, ISE" },
  { type: 'senior', quote: "This isn't goodbye. It's just 'see you on LinkedIn.'", from: "Final Year, CSE" },
  { type: 'junior', quote: "First week here and I already have stories. This place is alive.", from: "2nd Year, ECE" },
]

export default function MessageWall() {
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children ?? [], {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      })
    })
    return () => ctx.revert()
  }, [])

  function handleEnter(e) {
    gsap.to(e.currentTarget, { y: -4, duration: 0.25, ease: 'power2.out' })
  }
  function handleLeave(e) {
    gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <section style={{ padding: '80px 24px', maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.4em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          opacity: 0.7,
          marginBottom: '8px',
        }}>
          Words Left Behind
        </div>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 400,
          color: 'var(--text-primary)',
        }}>
          The Message Wall
        </h2>
      </div>

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {messages.map((msg, i) => {
          const isSenior = msg.type === 'senior'
          const borderColor = isSenior ? 'rgba(194,114,74,0.15)' : 'rgba(91,143,212,0.15)'
          const accentColor = isSenior ? 'var(--warm)' : 'var(--cool)'
          const tagLabel    = isSenior ? 'Outgoing' : 'Incoming'

          return (
            <div
              key={i}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${borderColor}`,
                borderRadius: '12px',
                padding: '24px 20px',
                position: 'relative',
                willChange: 'transform',
                cursor: 'default',
              }}
            >
              {/* Tag */}
              <div style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: accentColor,
                opacity: 0.8,
              }}>
                {tagLabel}
              </div>

              {/* Decorative quote mark */}
              <div style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '24px',
                color: accentColor,
                opacity: 0.15,
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                "
              </div>

              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: '15px',
                color: 'rgba(232,226,212,0.8)',
                lineHeight: 1.7,
                marginBottom: '16px',
              }}>
                {msg.quote}
              </p>

              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '11px',
                color: accentColor,
                opacity: 0.5,
              }}>
                — {msg.from}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

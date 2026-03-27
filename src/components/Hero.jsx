import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import FloatingPhotos from './FloatingPhotos'

const seniorPhotos = [
  '/seniors/img1.jpg',
  '/seniors/img2.jpg',
  '/seniors/img3.jpg',
  '/seniors/img4.jpg',
  '/seniors/img5.jpg',
  '/seniors/img6.jpg',
]

const juniorPhotos = [
  '/juniors/img1.jpg',
  '/juniors/img2.jpg',
  '/juniors/img3.jpg',
  '/juniors/img4.jpg',
  '/juniors/img5.jpg',
  '/juniors/img6.jpg',
]

export default function Hero() {
  const badgeRef    = useRef(null)
  const line1Ref    = useRef(null)
  const line2Ref    = useRef(null)
  const subtitleRef = useRef(null)
  const pillsRef    = useRef(null)

  useEffect(() => {
    const elements = [
      { el: badgeRef.current,    delay: 0.2 },
      { el: line1Ref.current,    delay: 0.4 },
      { el: line2Ref.current,    delay: 0.6 },
      { el: subtitleRef.current, delay: 0.8 },
      { el: pillsRef.current,    delay: 1.0 },
    ]

    // Set initial state
    elements.forEach(({ el }) => {
      gsap.set(el, { opacity: 0, y: 40 })
    })

    // Staggered entrance
    elements.forEach(({ el, delay }) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        delay,
      })
    })
  }, [])

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 24px',
      }}
    >
      {/* Background glows */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50%',
        height: '100%',
        background: 'radial-gradient(ellipse at 20% 30%, rgba(194,114,74,0.1) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%',
        height: '100%',
        background: 'radial-gradient(ellipse at 80% 30%, rgba(91,143,212,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Center vertical divider line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '2px',
        height: '100%',
        background: 'var(--gold)',
        opacity: 0.12,
        pointerEvents: 'none',
      }} />

      {/* Floating polaroid photos */}
      <FloatingPhotos seniorPhotos={seniorPhotos} juniorPhotos={juniorPhotos} />

      {/* Side labels */}
      <div style={{
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '10px',
        letterSpacing: '0.4em',
        color: 'var(--warm)',
        opacity: 0.3,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        Seniors — Class of 2026
      </div>
      <div style={{
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '10px',
        letterSpacing: '0.4em',
        color: 'var(--cool)',
        opacity: 0.3,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        Juniors — Class of 2028
      </div>

      {/* Center content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        maxWidth: '600px',
      }}>
        {/* Badge */}
        <div
          ref={badgeRef}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '12px',
            letterSpacing: '0.5em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            opacity: 0.7,
            marginBottom: '20px',
          }}
        >
          ✦ AI Nexus Club — Jyothy Institute of Technology ✦
        </div>

        {/* Title line 1 */}
        <h1
          ref={line1Ref}
          style={{
            fontFamily: 'Cinzel, serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            color: 'var(--text-primary)',
            textShadow: '0 0 40px rgba(212,168,83,0.2)',
            lineHeight: 1.1,
            marginBottom: '4px',
          }}
        >
          From One Story
        </h1>

        {/* Title line 2 */}
        <h1
          ref={line2Ref}
          style={{
            fontFamily: 'Cinzel, serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            color: 'var(--gold)',
            textShadow: '0 0 40px rgba(212,168,83,0.4)',
            lineHeight: 1.1,
            marginBottom: '28px',
          }}
        >
          To Another
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-dim)',
            maxWidth: '480px',
            margin: '0 auto 36px',
            lineHeight: 1.7,
          }}
        >
          As one batch writes their final lines, another picks up the pen. This is where both stories meet.
        </p>

        {/* Pill badges */}
        <div
          ref={pillsRef}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <span style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            border: '1px solid var(--warm)',
            background: 'var(--warm-glow)',
            color: 'var(--warm)',
            borderRadius: '20px',
            padding: '8px 20px',
          }}>
            Farewell '26
          </span>
          <span style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            border: '1px solid var(--cool)',
            background: 'var(--cool-glow)',
            color: 'var(--cool)',
            borderRadius: '20px',
            padding: '8px 20px',
          }}>
            Welcome '28
          </span>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Theatrical curtain opening that reveals the AI Nexus logo, then the site
export default function CurtainReveal({ onComplete }) {
  const overlayRef = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)
  const logoRef    = useRef(null)

  useEffect(() => {
    // Lock scroll during curtain
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline()

    // t=0 — curtains fully closed
    tl.set([leftRef.current, rightRef.current], { x: '0%' })
    tl.set(logoRef.current, { opacity: 0, scale: 0.7 })

    // t=0.6 — begin opening
    tl.to(leftRef.current,  { x: '-105%', duration: 1.2, ease: 'power3.inOut' }, 0.6)
    tl.to(rightRef.current, { x:  '105%', duration: 1.2, ease: 'power3.inOut' }, 0.6)

    // t=1.0 — logo fades in
    tl.to(logoRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 1.0)

    // t=2.6 — logo begins fading out
    tl.to(logoRef.current, { opacity: 0, scale: 0.85, duration: 0.4, ease: 'power2.in' }, 2.6)

    // t=3.0 — entire overlay fades
    tl.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 3.0)

    // t=3.4 — remove and unlock scroll
    tl.call(() => {
      document.body.style.overflow = ''
      if (overlayRef.current) overlayRef.current.style.display = 'none'
      onComplete()
    }, [], 3.4)

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [onComplete])

  // Curtain fold lines (vertical thin stripes)
  const foldLines = Array.from({ length: 8 }, (_, i) => (
    <div
      key={i}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${(i + 1) * 11}%`,
        width: '1px',
        background: 'rgba(255,255,255,0.04)',
      }}
    />
  ))

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Left curtain — warm maroon tones */}
      <div
        ref={leftRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(to right, #1a0a0a, #2d0a0a, #0a0a1a)',
          overflow: 'hidden',
        }}
      >
        {foldLines}
        {/* Gold trim on inner edge */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          width: '2px',
          background: 'var(--gold)',
          opacity: 0.6,
        }} />
      </div>

      {/* Right curtain — cool navy tones */}
      <div
        ref={rightRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(to left, #0a0a1a, #0a102a, #1a0a0a)',
          overflow: 'hidden',
        }}
      >
        {foldLines}
        {/* Gold trim on inner edge */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: '2px',
          background: 'var(--gold)',
          opacity: 0.6,
        }} />
      </div>

      {/* Center logo */}
      <div
        ref={logoRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
        }}
      >
        {/* Radial gold glow behind logo */}
        <div style={{
          position: 'absolute',
          inset: '-40px',
          background: 'radial-gradient(circle, rgba(212,168,83,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <img
          src="/club_logo.jpg"
          alt="AI Nexus Club"
          style={{ maxWidth: '200px', display: 'block', position: 'relative' }}
          onError={e => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'block'
          }}
        />
        {/* Fallback if logo missing */}
        <div style={{
          display: 'none',
          fontFamily: 'Cinzel, serif',
          fontSize: '1.5rem',
          color: 'var(--gold)',
          letterSpacing: '0.3em',
        }}>
          ✦ AI NEXUS ✦
        </div>
      </div>
    </div>
  )
}

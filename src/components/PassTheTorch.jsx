import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(Draggable, ScrollTrigger)

export default function PassTheTorch() {
  const sectionRef    = useRef(null)
  const trackRef      = useRef(null)
  const fireRef       = useRef(null)
  const fillRef       = useRef(null)
  const resultRef     = useRef(null)
  const confettiRef   = useRef(null)
  const [done, setDone] = useState(false)
  const draggableRef  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0, y: 40, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!trackRef.current || !fireRef.current) return

    const trackEl = trackRef.current
    const fireEl  = fireRef.current

    const [drag] = Draggable.create(fireEl, {
      type: 'x',
      bounds: trackEl,
      edgeResistance: 0.65,
      inertia: false,
      onDrag() {
        // Update fill
        const progress = this.x / (trackEl.offsetWidth - fireEl.offsetWidth)
        if (fillRef.current) {
          fillRef.current.style.width = `${Math.min(progress * 100, 100)}%`
        }
      },
      onDragEnd() {
        const trackWidth = trackEl.offsetWidth - fireEl.offsetWidth
        const progress   = this.x / trackWidth

        if (progress >= 0.75) {
          // Completion!
          gsap.to(fireEl, {
            x: trackWidth,
            duration: 0.4,
            ease: 'bounce.out',
            onComplete: () => triggerCompletion(trackWidth),
          })
        } else {
          // Snap back
          gsap.to(fireEl, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
          if (fillRef.current) {
            gsap.to(fillRef.current, { width: '0%', duration: 0.5, ease: 'elastic.out(1, 0.5)' })
          }
        }
      },
    })

    draggableRef.current = drag
    return () => drag.kill()
  }, [done])

  function triggerCompletion(trackWidth) {
    setDone(true)

    // Fill the track fully
    if (fillRef.current) {
      gsap.to(fillRef.current, {
        width: '100%',
        background: 'linear-gradient(to right, var(--warm), var(--gold), var(--cool))',
        duration: 0.4,
      })
    }

    // Confetti burst
    spawnConfetti()

    // Show result text
    if (resultRef.current) {
      gsap.fromTo(
        resultRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.3 }
      )
    }
  }

  function spawnConfetti() {
    const container = confettiRef.current
    if (!container) return

    const colors = ['#d4a853', '#c2724a', '#5b8fd4', '#f0c86e', '#e8e2d4']

    for (let i = 0; i < 40; i++) {
      const el = document.createElement('div')
      el.style.cssText = `
        position:absolute;
        width:8px;
        height:8px;
        border-radius:2px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        left:${40 + Math.random() * 20}%;
        top:0;
        pointer-events:none;
      `
      container.appendChild(el)

      gsap.to(el, {
        x: (Math.random() - 0.5) * 300,
        y: 100 + Math.random() * 200,
        rotation: Math.random() * 720,
        opacity: 0,
        duration: 1.2 + Math.random() * 0.8,
        ease: 'power2.out',
        onComplete: () => el.remove(),
      })
    }
  }

  return (
    <section ref={sectionRef} style={{ padding: '80px 24px', textAlign: 'center' }}>
      {/* Header */}
      <div style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: '11px',
        letterSpacing: '0.4em',
        color: 'var(--gold)',
        textTransform: 'uppercase',
        opacity: 0.7,
        marginBottom: '8px',
      }}>
        Interactive
      </div>
      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
        fontWeight: 400,
        color: 'var(--text-primary)',
        marginBottom: '8px',
      }}>
        Pass the Torch
      </h2>
      <p style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontStyle: 'italic',
        fontSize: '15px',
        color: 'var(--text-muted)',
        marginBottom: '48px',
      }}>
        Drag the flame from the seniors to the juniors
      </p>

      {/* Track */}
      <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
        {/* Confetti container */}
        <div
          ref={confettiRef}
          style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none', zIndex: 10 }}
        />

        {/* Labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '18px', fontWeight: 700, color: 'var(--warm)' }}>2026</span>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '18px', fontWeight: 700, color: 'var(--cool)' }}>2028</span>
        </div>

        {/* Track bar */}
        <div
          ref={trackRef}
          style={{
            height: '80px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '40px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            touchAction: 'none',
          }}
        >
          {/* Fill bar */}
          <div
            ref={fillRef}
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              height: '2px',
              width: '0%',
              background: 'linear-gradient(to right, var(--warm), transparent)',
              borderRadius: '2px',
              transition: 'none',
              pointerEvents: 'none',
            }}
          />

          {/* Track center line */}
          <div style={{
            position: 'absolute',
            left: '40px',
            right: '40px',
            height: '2px',
            background: 'linear-gradient(to right, var(--warm), transparent)',
            opacity: 0.3,
            pointerEvents: 'none',
          }} />

          {/* Fire emoji draggable */}
          <div
            ref={fireRef}
            style={{
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              cursor: 'grab',
              userSelect: 'none',
              flexShrink: 0,
              marginLeft: '16px',
              touchAction: 'none',
              willChange: 'transform',
            }}
          >
            🔥
          </div>
        </div>

        {/* Hint text */}
        {!done && (
          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            color: 'var(--text-muted)',
            marginTop: '12px',
          }}>
            drag all the way →
          </p>
        )}

        {/* Result */}
        {done && (
          <div
            ref={resultRef}
            style={{ marginTop: '32px', opacity: 0 }}
          >
            <div style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: 'var(--gold)',
              marginBottom: '10px',
            }}>
              The Legacy Continues ✦
            </div>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: '15px',
              color: 'var(--text-dim)',
            }}>
              What one batch built, another will carry forward.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

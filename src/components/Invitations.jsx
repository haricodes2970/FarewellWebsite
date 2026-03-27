import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Invitations() {
  const sectionRef  = useRef(null)
  const leftRef     = useRef(null)
  const rightRef    = useRef(null)
  const infoRef     = useRef(null)
  const letterRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Invitation cards slide in
      gsap.from(leftRef.current, {
        x: -60, opacity: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
      })
      gsap.from(rightRef.current, {
        x: 60, opacity: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: rightRef.current, start: 'top 80%' },
      })
      // Info cards stagger
      gsap.from(infoRef.current?.children ?? [], {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: infoRef.current, start: 'top 80%' },
      })
      // Letter
      gsap.from(letterRef.current, {
        y: 30, opacity: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: letterRef.current, start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const cardStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    overflow: 'hidden',
  }

  const imgPlaceholder = (label, color) => (
    <div style={{
      height: '220px',
      background: `linear-gradient(135deg, ${color}22, ${color}08)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      color,
      fontFamily: 'Cinzel, serif',
      fontSize: '12px',
      letterSpacing: '0.3em',
    }}>
      <div style={{ fontSize: '2rem' }}>🎬</div>
      <div>{label}</div>
      <div style={{ fontFamily: 'Outfit', fontSize: '10px', opacity: 0.6 }}>
        April 11, 2026
      </div>
    </div>
  )

  const InviteImage = ({ src, label, color }) => {
    const imgRef = useRef(null)
    const fbRef  = useRef(null)
    return (
      <div style={{ position: 'relative' }}>
        <img
          ref={imgRef}
          src={src}
          alt={label}
          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
          onError={() => {
            if (imgRef.current) imgRef.current.style.display = 'none'
            if (fbRef.current)  fbRef.current.style.display = 'flex'
          }}
        />
        <div ref={fbRef} style={{
          display: 'none',
          height: '220px',
          background: `linear-gradient(135deg, ${color}22, ${color}08)`,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color,
          fontFamily: 'Cinzel, serif',
          fontSize: '12px',
          letterSpacing: '0.3em',
        }}>
          <div style={{ fontSize: '2rem' }}>🎬</div>
          <div>{label}</div>
          <div style={{ fontFamily: 'Outfit', fontSize: '10px', opacity: 0.6 }}>April 11, 2026</div>
        </div>
      </div>
    )
  }

  return (
    <section ref={sectionRef} style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Section header */}
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
          For the Special Guests
        </div>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 400,
          color: 'var(--text-primary)',
        }}>
          💌 The Invitations
        </h2>
      </div>

      {/* Invitation cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem',
      }}>
        <div ref={leftRef} style={cardStyle}>
          <InviteImage src="/snr_inv.jpg" label="Senior Premiere Night" color="var(--warm)" />
          <div style={{
            padding: '16px',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            textAlign: 'center',
          }}>
            Senior Premiere Night
          </div>
        </div>
        <div ref={rightRef} style={cardStyle}>
          <InviteImage src="/jnr_inv.jpg" label="Junior Premiere Night" color="var(--cool)" />
          <div style={{
            padding: '16px',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            textAlign: 'center',
          }}>
            Junior Premiere Night
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div ref={infoRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem',
      }}>
        {/* Senior info */}
        <div style={{
          background: 'var(--bg-card)',
          border: `1px solid rgba(194,114,74,0.25)`,
          borderRadius: '12px',
          padding: '24px 20px',
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>⭐</div>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--warm)',
            marginBottom: '16px',
            fontWeight: 600,
          }}>
            Senior Premiere Night
          </div>
          {[
            ['Audience', 'Seniors of Batch 2026 & 2028'],
            ['Doors Open', '6:00 PM | Showtime: 7:00 PM'],
            ['Theme', '"From One Story to Another"'],
            ['Story Tell Night', 'A Night of Stories'],
          ].map(([label, val]) => (
            <div key={label} style={{ marginBottom: '8px' }}>
              <span style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '10px',
                color: 'var(--text-muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>{label}:</span>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '14px',
                color: 'var(--text-dim)',
                marginTop: '2px',
              }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Junior info */}
        <div style={{
          background: 'var(--bg-card)',
          border: `1px solid rgba(91,143,212,0.25)`,
          borderRadius: '12px',
          padding: '24px 20px',
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>🎭</div>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--cool)',
            marginBottom: '16px',
            fontWeight: 600,
          }}>
            Junior Premiere Night
          </div>
          {[
            ['Audience', 'Juniors of Batch 2028 & 2030'],
            ['Doors Open', '6:00 PM | Showtime: 7:00 PM'],
            ['Theme', '"The Junior Chapter"'],
            ['Story Tell Night', 'A Night of New Stories'],
          ].map(([label, val]) => (
            <div key={label} style={{ marginBottom: '8px' }}>
              <span style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '10px',
                color: 'var(--text-muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>{label}:</span>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '14px',
                color: 'var(--text-dim)',
                marginTop: '2px',
              }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Invitation letter */}
      <div
        ref={letterRef}
        style={{
          borderLeft: '3px solid var(--gold)',
          paddingLeft: '28px',
          paddingTop: '8px',
          paddingBottom: '8px',
        }}
      >
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
          color: 'var(--text-dim)',
          lineHeight: 1.8,
          marginBottom: '20px',
        }}>
          "To the batch that taught us what it means to belong — your four years here weren't just yours. They shaped the hallways we walk, the culture we inherited, and the standards we now carry. As you step into the world, know that your story doesn't end here. It lives on in every lab session we take, every event we organize, and every tradition you started that we refuse to let die.
          <br /><br />
          And to the newest faces among us — welcome. You've walked into something special. What the seniors built, we now pass to you. Take it, reshape it, make it yours.
          <br /><br />
          This night is where both worlds meet. One last curtain call for some. A grand opening for others.
          <br /><br />
          From one story… to another."
        </p>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          color: 'var(--gold)',
          opacity: 0.7,
        }}>
          — AI Nexus Club<br />
          <span style={{ color: 'var(--text-muted)' }}>
            On behalf of 4th, 6th & 8th Semester students<br />
            Dept. of AI & ML, Jyothy Institute of Technology
          </span>
        </div>
      </div>
    </section>
  )
}

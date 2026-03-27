import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const events = [
  { emoji: '🎟️', title: 'Ticket Counter',         time: '~6:00 PM', desc: '1 Ticket = 2 Polaroid Photos taken at the Polaroid Booth. The classic movie premiere experience starts here.' },
  { emoji: '📸', title: 'Arrival — Photo Booth',   time: '~6:00 PM', desc: 'Welcome to the #Memories Photo Booth — a rustic wooden pallet wall strung with fairy lights and Polaroid-clipped photos.' },
  { emoji: '🎬', title: 'Movie Trailer Screening',  time: '~7:00 PM', desc: 'A specially crafted movie trailer for "From One Story to Another". Recorded clips of seniors sharing tips and juniors sharing heartfelt messages. Cinematic, emotional, unforgettable.' },
  { emoji: '🎞️', title: 'Senior Memory Video',      time: '~7:15 PM', desc: 'A full compilation of all seniors\' memory videos — a montage celebrating the batch\'s journey, milestones, and memorable moments.' },
  { emoji: '👔', title: 'Best Dressed — Juniors',   time: '~7:35 PM', desc: 'Juniors are judged for their outfit of the day. The best dressed junior wins a special award. Bring your best look to the premiere.' },
  { emoji: '🎮', title: 'Movie-Themed Game',        time: '~7:50 PM', desc: 'An interactive movie-themed game for junior students — movie trivia, dialogue guessing, or scene reenactment challenge.' },
  { emoji: '💃', title: 'Dance Performances',       time: '~8:10 PM', desc: 'Batch 2027 performs a high-energy dance to remix songs. Batch 2028 also has a prepared dance performance. Main stage entertainment.' },
  { emoji: '🎤', title: 'Singing Performances',     time: '~8:30 PM', desc: 'Singing acts lined up — soulful numbers and possibly a farewell original. Artists and songs to be confirmed.' },
  { emoji: '🏆', title: 'Senior Awards Ceremony',   time: '~8:50 PM', desc: 'Special awards for seniors including Best Achievers, standout personalities, and recognition categories. A celebration of accomplishments.' },
  { emoji: '🎓', title: 'HOD & Faculty Address',    time: '~9:10 PM', desc: 'HOD addresses the farewell batch with a special message. Ms. Archana Ma\'am welcomes them officially to the ceremony.' },
  { emoji: '🍽️', title: 'Food & Fellowship',         time: '~9:30 PM', desc: 'Food arrangements are in place. Guests enjoy food and freely mingle — a final evening of togetherness, laughter, and goodbyes.' },
]

export default function EventRundown() {
  const sectionRef  = useRef(null)
  const carouselRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Whole carousel slides in from right
      gsap.from(carouselRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
      // Individual cards stagger
      const cards = carouselRef.current?.querySelectorAll('.event-card') ?? []
      gsap.from(cards, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  function handleCardEnter(e) {
    gsap.to(e.currentTarget, {
      y: -6,
      borderTopColor: 'var(--gold-bright)',
      boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  function handleCardLeave(e) {
    gsap.to(e.currentTarget, {
      y: 0,
      borderTopColor: 'var(--gold)',
      boxShadow: 'none',
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  function scrollBy(dir) {
    const container = carouselRef.current
    if (!container) return
    gsap.to(container, {
      scrollLeft: container.scrollLeft + dir * 300,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  return (
    <section ref={sectionRef} style={{ padding: '80px 0', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 24px' }}>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.4em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          opacity: 0.7,
          marginBottom: '8px',
        }}>
          Now Showing
        </div>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 400,
          color: 'var(--text-primary)',
        }}>
          🎬 Event Rundown
        </h2>
      </div>

      {/* Arrow buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
        padding: '0 24px',
        marginBottom: '16px',
      }}>
        {['←', '→'].map((arrow, i) => (
          <button
            key={arrow}
            onClick={() => scrollBy(i === 0 ? -1 : 1)}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--gold)',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {arrow}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        style={{
          display: 'flex',
          gap: '1.25rem',
          padding: '0 2rem 16px',
          overflowX: 'auto',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
      >
        {events.map((ev, i) => (
          <div
            key={i}
            className="event-card"
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
            style={{
              width: '280px',
              flexShrink: 0,
              background: 'var(--bg-card)',
              borderRadius: '14px',
              borderTop: '3px solid var(--gold)',
              border: '1px solid var(--border)',
              borderTopColor: 'var(--gold)',
              padding: '24px 20px',
              position: 'relative',
              cursor: 'default',
              willChange: 'transform',
            }}
          >
            {/* Card number */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '10px',
              color: 'var(--text-muted)',
              letterSpacing: '0.05em',
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>

            <div style={{ fontSize: '28px', marginBottom: '12px' }}>{ev.emoji}</div>
            <div style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--gold)',
              fontVariant: 'small-caps',
              marginBottom: '6px',
            }}>
              {ev.title}
            </div>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '11px',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px',
            }}>
              {ev.time}
            </div>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '14px',
              color: 'var(--text-dim)',
              fontStyle: 'italic',
              lineHeight: 1.6,
            }}>
              {ev.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const events = [
  { emoji: '🎟️', title: 'Ticket Counter',         time: '~6:00 PM', desc: '1 Ticket = 2 Polaroid Photos at the Polaroid Booth. The classic movie premiere experience starts here.' },
  { emoji: '📸', title: 'Arrival — Photo Booth',   time: '~6:00 PM', desc: 'Welcome to the #Memories Photo Booth — rustic wooden pallet wall strung with fairy lights and Polaroid-clipped photos.' },
  { emoji: '🎬', title: 'Movie Trailer Screening',  time: '~7:00 PM', desc: 'A specially crafted movie trailer for "From One Story to Another". Recorded clips of seniors & juniors. Cinematic, emotional, unforgettable.' },
  { emoji: '🎞️', title: 'Senior Memory Video',      time: '~7:15 PM', desc: 'A full compilation of all seniors\' memory videos — a montage celebrating the batch\'s journey, milestones, and memorable moments.' },
  { emoji: '👔', title: 'Best Dressed — Juniors',   time: '~7:35 PM', desc: 'Juniors judged for their outfit of the day. Best dressed junior wins a special award. Bring your best look to the premiere.' },
  { emoji: '🎮', title: 'Movie-Themed Game',        time: '~7:50 PM', desc: 'An interactive movie-themed game for junior students — movie trivia, dialogue guessing, or scene reenactment challenge.' },
  { emoji: '💃', title: 'Dance Performances',       time: '~8:10 PM', desc: 'Batch 2027 performs a high-energy dance to remix songs. Batch 2028 also has a prepared performance. Main stage entertainment.' },
  { emoji: '🎤', title: 'Singing Performances',     time: '~8:30 PM', desc: 'Singing acts lined up — soulful numbers and possibly a farewell original. Artists and songs to be confirmed closer to the date.' },
  { emoji: '🏆', title: 'Senior Awards Ceremony',   time: '~8:50 PM', desc: 'Special awards for seniors — Best Achievers, standout personalities, recognition categories. A celebration of accomplishments.' },
  { emoji: '🎓', title: 'HOD & Faculty Address',    time: '~9:10 PM', desc: 'HOD addresses the farewell batch with a special message. Ms. Archana Ma\'am officially welcomes them to the ceremony.' },
  { emoji: '🍽️', title: 'Food & Fellowship',         time: '~9:30 PM', desc: 'Food arrangements in place. Guests mingle freely — a final evening of togetherness, laughter, and goodbyes.' },
]

// Snake grid placement: [gridRow, gridColumn] — 4 per row, serpentine order
// Row 1 → L to R:  events 1-4  (indices 0-3)
// Row 2 → R to L:  events 5-8  (indices 4-7, placed at cols 4,3,2,1)
// Row 3 → L to R:  events 9-11 (indices 8-10)
const GRID_POS = [
  [1,1],[1,2],[1,3],[1,4],
  [2,4],[2,3],[2,2],[2,1],
  [3,1],[3,2],[3,3],
]

// Build SVG path through all 11 card centers in snake order
function buildPath(centers) {
  let d = `M ${f(centers[0].x)},${f(centers[0].y)}`

  for (let i = 1; i < centers.length; i++) {
    const p = centers[i - 1]
    const c = centers[i]

    if (i === 4) {
      // Right-side turn: row 1 (L→R) to row 2 (R→L) — curve goes right
      const ox = 110
      d += ` C ${f(p.x+ox)},${f(p.y)} ${f(c.x+ox)},${f(c.y)} ${f(c.x)},${f(c.y)}`
    } else if (i === 8) {
      // Left-side turn: row 2 (R→L) to row 3 (L→R) — curve goes left
      const ox = 110
      d += ` C ${f(p.x-ox)},${f(p.y)} ${f(c.x-ox)},${f(c.y)} ${f(c.x)},${f(c.y)}`
    } else {
      // Straight horizontal segment within a row
      d += ` L ${f(c.x)},${f(c.y)}`
    }
  }
  return d
}

function f(n) { return n.toFixed(1) }

export default function EventRundown() {
  const sectionRef = useRef(null)
  const gridRef    = useRef(null)
  const svgRef     = useRef(null)
  const pathRef    = useRef(null)
  const glowRef    = useRef(null)
  const cardRefs   = useRef([])
  const dotRefs    = useRef([])
  const stRefs     = useRef([])

  useLayoutEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const grid = gridRef.current
      const svg  = svgRef.current
      const path = pathRef.current
      const glow = glowRef.current
      if (!grid || !svg || !path || cardRefs.current.some(c => !c)) return

      const gRect = grid.getBoundingClientRect()
      const W = gRect.width
      const H = gRect.height

      // Card centers relative to grid top-left
      const centers = cardRefs.current.map(card => {
        const r = card.getBoundingClientRect()
        return {
          x: r.left - gRect.left + r.width  / 2,
          y: r.top  - gRect.top  + r.height / 2,
        }
      })

      // Size SVG to accommodate side curves (110px each side)
      const pad = 130
      svg.setAttribute('viewBox', `-${pad} 0 ${W + pad * 2} ${H}`)
      svg.style.width  = (W + pad * 2) + 'px'
      svg.style.height = H + 'px'
      svg.style.left   = -pad + 'px'
      svg.style.top    = '0'

      // Set path
      const pathD = buildPath(centers)
      path.setAttribute('d', pathD)
      glow.setAttribute('d', pathD)

      const totalLen = path.getTotalLength()
      gsap.set([path, glow], { strokeDasharray: totalLen, strokeDashoffset: totalLen })

      // Station dot positions
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return
        dot.setAttribute('cx', centers[i].x)
        dot.setAttribute('cy', centers[i].y)
        gsap.set(dot, { opacity: 0, scale: 0, transformOrigin: 'center center' })
      })

      // ── Path drawing tied to section scroll ──
      const stPath = gsap.to([path, glow], {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end:   'bottom 25%',
          scrub: 1.2,
        },
      })
      stRefs.current.push(stPath.scrollTrigger)

      // ── Each card: cold-interface reveal on scroll ──
      cardRefs.current.forEach((card, i) => {
        gsap.set(card, {
          opacity: 0,
          clipPath: 'inset(0 0 100% 0 round 10px)',
          y: 12,
        })

        const st = ScrollTrigger.create({
          trigger: card,
          start:   'top 88%',
          once:    true,
          onEnter: () => {
            // Reveal card
            gsap.to(card, {
              opacity:  1,
              clipPath: 'inset(0 0 0% 0 round 10px)',
              y:        0,
              duration: 0.55,
              ease:     'power3.out',
            })

            // Brief electric glow flash — "cold interface" effect
            gsap.fromTo(card, {
              boxShadow: '0 0 0 1px rgba(91,143,212,0)',
            }, {
              boxShadow: '0 0 24px 3px rgba(91,143,212,0.55)',
              duration:  0.15,
              yoyo:      true,
              repeat:    1,
              ease:      'power2.inOut',
            })

            // Reveal station dot
            if (dotRefs.current[i]) {
              gsap.to(dotRefs.current[i], {
                opacity: 1, scale: 1,
                duration: 0.35, ease: 'back.out(2)',
                delay: 0.2,
              })
            }
          },
        })
        stRefs.current.push(st)
      })
    })

    return () => {
      cancelAnimationFrame(rafId)
      stRefs.current.forEach(st => st?.kill())
      stRefs.current = []
    }
  }, [])

  return (
    <section ref={sectionRef} style={{ padding: '80px 0 100px', position: 'relative' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px', padding: '0 24px' }}>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.4em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          opacity: 0.7,
          marginBottom: '10px',
        }}>
          Now Showing
        </div>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 400,
          color: 'var(--text-primary)',
          marginBottom: '10px',
        }}>
          🎬 Event Rundown
        </h2>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: '14px',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
        }}>
          Follow the path — eleven acts, one unforgettable night
        </p>
      </div>

      {/* ── Roadmap grid ── */}
      <div
        ref={gridRef}
        className="roadmap-grid"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '48px 28px',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '16px 60px 16px',
        }}
      >
        {/* SVG connector path — absolutely overlaid */}
        <svg
          ref={svgRef}
          className="roadmap-svg"
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            overflow: 'visible',
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          {/* Glow layer (blurred duplicate) */}
          <path
            ref={glowRef}
            fill="none"
            stroke="rgba(212,168,83,0.35)"
            strokeWidth="8"
            strokeLinecap="round"
            style={{ filter: 'blur(5px)' }}
          />
          {/* Crisp line on top */}
          <path
            ref={pathRef}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 3px rgba(212,168,83,0.7))' }}
          />
          {/* Station dots — one per event, positioned in useLayoutEffect */}
          {events.map((_, i) => (
            <circle
              key={i}
              ref={el => dotRefs.current[i] = el}
              r="5"
              fill="var(--bg)"
              stroke="var(--gold)"
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0 0 4px rgba(212,168,83,0.8))' }}
            />
          ))}
        </svg>

        {/* Event cards */}
        {events.map((ev, i) => {
          const [row, col] = GRID_POS[i]
          return (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              className="roadmap-card"
              style={{
                gridRow:    row,
                gridColumn: col,
                position:   'relative',
                zIndex:     1,
                background: 'var(--bg-card)',
                border:     '1px solid var(--border)',
                borderTop:  '2px solid var(--gold)',
                borderRadius: '10px',
                padding:    '22px 18px 20px',
                backdropFilter: 'blur(8px)',
                willChange: 'transform, opacity',
              }}
            >
              {/* Number badge — sits on top border */}
              <div style={{
                position:  'absolute',
                top:       '-13px',
                left:      '50%',
                transform: 'translateX(-50%)',
                width:     '26px',
                height:    '26px',
                borderRadius: '50%',
                background: 'var(--gold)',
                color:     'var(--bg)',
                fontFamily: 'Cinzel, serif',
                fontSize:  '10px',
                fontWeight: 700,
                display:   'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(212,168,83,0.5)',
              }}>
                {i + 1}
              </div>

              {/* Emoji */}
              <div style={{ fontSize: '26px', marginBottom: '10px', marginTop: '4px' }}>
                {ev.emoji}
              </div>

              {/* Title */}
              <div style={{
                fontFamily: 'Cinzel, serif',
                fontSize:   '12px',
                fontWeight: 600,
                color:      'var(--gold)',
                fontVariant: 'small-caps',
                letterSpacing: '0.05em',
                marginBottom: '5px',
              }}>
                {ev.title}
              </div>

              {/* Time */}
              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize:   '10px',
                color:      'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '10px',
              }}>
                {ev.time}
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize:   '13px',
                fontStyle:  'italic',
                color:      'var(--text-dim)',
                lineHeight: 1.65,
              }}>
                {ev.desc}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

import { useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'

// Shuffles an array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function rand(min, max) {
  return Math.random() * (max - min) + min
}

// Individual polaroid photo card with GSAP float animation
function Polaroid({ src, caption, rotation, top, side, offset, index }) {
  const cardRef = useRef(null)
  const tweenRef = useRef(null)
  const amplitude = rand(10, 20)
  const duration  = rand(10, 20)
  const delay     = rand(0, 3)

  useEffect(() => {
    if (!cardRef.current) return

    // Continuous Y-axis float animation
    tweenRef.current = gsap.to(cardRef.current, {
      y: amplitude,
      duration,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay,
    })

    return () => tweenRef.current?.kill()
  }, [amplitude, duration, delay])

  function handleMouseEnter() {
    tweenRef.current?.pause()
    gsap.to(cardRef.current, {
      rotation: 0,
      scale: 1.15,
      boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  function handleMouseLeave() {
    gsap.to(cardRef.current, {
      rotation,
      scale: 1,
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => tweenRef.current?.resume(),
    })
  }

  const posStyle = side === 'left'
    ? { left: `${offset}%` }
    : { right: `${offset}%` }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'absolute',
        top: `${top}%`,
        ...posStyle,
        width: '120px',
        background: '#f5f0e8',
        padding: '6px 6px 22px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        transform: `rotate(${rotation}deg)`,
        cursor: 'pointer',
        zIndex: 1,
        willChange: 'transform',
      }}
    >
      <img
        src={src}
        alt={caption}
        style={{ width: '100%', height: '90px', objectFit: 'cover', display: 'block' }}
        onError={e => {
          e.target.style.background = side === 'left'
            ? 'linear-gradient(135deg, rgba(194,114,74,0.3), rgba(194,114,74,0.1))'
            : 'linear-gradient(135deg, rgba(91,143,212,0.3), rgba(91,143,212,0.1))'
          e.target.style.height = '90px'
          e.target.removeAttribute('src')
        }}
      />
      <div style={{
        fontFamily: 'Caveat, cursive',
        fontSize: '11px',
        textAlign: 'center',
        marginTop: '4px',
        color: '#5a4a3a',
      }}>
        {caption}
      </div>
    </div>
  )
}

// Renders floating polaroid photos for seniors (left) and juniors (right)
export default function FloatingPhotos({ seniorPhotos, juniorPhotos }) {
  const seniors = useMemo(() => shuffle(seniorPhotos).slice(0, 5), [seniorPhotos])
  const juniors = useMemo(() => shuffle(juniorPhotos).slice(0, 5), [juniorPhotos])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {seniors.map((src, i) => (
        <Polaroid
          key={`senior-${i}`}
          src={src}
          caption="Class of '26"
          rotation={rand(-8, 8)}
          top={rand(10, 80)}
          side="left"
          offset={rand(2, 20)}
          index={i}
        />
      ))}
      {juniors.map((src, i) => (
        <Polaroid
          key={`junior-${i}`}
          src={src}
          caption="Class of '28"
          rotation={rand(-8, 8)}
          top={rand(10, 80)}
          side="right"
          offset={rand(2, 20)}
          index={i}
        />
      ))}
    </div>
  )
}

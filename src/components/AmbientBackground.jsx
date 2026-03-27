// Fixed full-screen plasma blob background — adds life and color without overwhelming content
const BLOBS = [
  // Gold — top-left region
  {
    anim:  'blobA 28s ease-in-out infinite',
    size:  720,
    top:   '8%',
    left:  '18%',
    color: 'rgba(212,168,83,0.28)',
    blur:  150,
  },
  // Warm orange — bottom-right
  {
    anim:  'blobB 34s ease-in-out infinite',
    size:  600,
    top:   '58%',
    left:  '72%',
    color: 'rgba(194,114,74,0.22)',
    blur:  130,
  },
  // Cool blue — bottom-left
  {
    anim:  'blobC 23s ease-in-out infinite',
    size:  540,
    top:   '75%',
    left:  '12%',
    color: 'rgba(91,143,212,0.22)',
    blur:  120,
  },
  // Gold — top-right (slower, larger)
  {
    anim:  'blobD 42s ease-in-out infinite',
    size:  680,
    top:   '22%',
    left:  '80%',
    color: 'rgba(212,168,83,0.16)',
    blur:  160,
  },
  // Cool blue — center
  {
    anim:  'blobE 31s ease-in-out infinite',
    size:  460,
    top:   '45%',
    left:  '45%',
    color: 'rgba(91,143,212,0.16)',
    blur:  110,
  },
]

export default function AmbientBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width:  b.size + 'px',
            height: b.size + 'px',
            borderRadius: '50%',
            background: b.color,
            filter: `blur(${b.blur}px)`,
            top:  b.top,
            left: b.left,
            transform: 'translate(-50%, -50%)',
            animation: b.anim,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}

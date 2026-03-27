// Fixed vertical red-carpet edge strips — theater frame feel
export default function RedCarpetEdges() {
  return (
    <>
      {/* Left edge */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '7px',
          height: '100%',
          background: 'linear-gradient(to right, var(--red-carpet), transparent)',
          opacity: 0.5,
          zIndex: 99,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      {/* Right edge */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '7px',
          height: '100%',
          background: 'linear-gradient(to left, var(--red-carpet), transparent)',
          opacity: 0.5,
          zIndex: 99,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
    </>
  )
}

export default function Footer() {
  const navLinks = ['Home', 'Invitations', 'Rundown', 'Voices', 'Countdown']

  function scrollTo(id) {
    const map = {
      'Home':        '#hero',
      'Invitations': '#invitations',
      'Rundown':     '#rundown',
      'Voices':      '#voices',
      'Countdown':   '#countdown',
    }
    const el = document.querySelector(map[id])
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '40px 24px',
      textAlign: 'center',
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: 'Cinzel, serif',
        fontSize: '1.1rem',
        letterSpacing: '0.3em',
        color: 'var(--gold)',
        marginBottom: '8px',
      }}>
        ✦ AI NEXUS
      </div>

      <p style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontStyle: 'italic',
        fontSize: '14px',
        color: 'var(--text-muted)',
        marginBottom: '16px',
      }}>
        Connecting Intelligent Minds
      </p>

      <p style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: '12px',
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        marginBottom: '24px',
      }}>
        From One Story to Another — Jyothy Institute of Technology, 2026
      </p>

      {/* Nav links */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
        {navLinks.map(link => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px 0',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            {link}
          </button>
        ))}
      </div>
    </footer>
  )
}

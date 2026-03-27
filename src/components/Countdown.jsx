import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Target: April 11, 2026 at 7:00 PM IST (UTC+5:30)
const TARGET = new Date('2026-04-11T13:30:00.000Z') // 7PM IST = 1:30PM UTC

function getTimeLeft() {
  const diff = TARGET - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true }
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    past:    false,
  }
}

export default function Countdown() {
  const sectionRef = useRef(null)
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.children ?? [], {
        opacity: 0, y: 40, duration: 0.9, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const units = [
    { value: time.days,    label: 'Days' },
    { value: time.hours,   label: 'Hours' },
    { value: time.minutes, label: 'Minutes' },
    { value: time.seconds, label: 'Seconds' },
  ]

  return (
    <section style={{ padding: '80px 24px', textAlign: 'center' }}>
      <div ref={sectionRef}>
        {/* Header */}
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.4em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          opacity: 0.7,
          marginBottom: '12px',
        }}>
          Mark Your Calendar
        </div>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 400,
          color: 'var(--text-primary)',
          marginBottom: '8px',
        }}>
          The Day Approaches
        </h2>
        <p style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '13px',
          color: 'var(--text-muted)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '48px',
        }}>
          April 11, 2026 — Jyothy Institute of Technology
        </p>

        {/* Countdown units */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(1.5rem, 4vw, 3rem)',
          flexWrap: 'wrap',
          marginBottom: '48px',
        }}>
          {units.map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Cinzel, serif',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: 'var(--gold-bright)',
                textShadow: '0 0 30px rgba(240,200,110,0.4)',
                lineHeight: 1,
                minWidth: '80px',
              }}>
                {String(value).padStart(2, '0')}
              </div>
              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--text-muted)',
                marginTop: '10px',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA card */}
        <div style={{
          display: 'inline-block',
          border: '1px solid var(--gold)',
          borderRadius: '12px',
          padding: '28px 40px',
          background: 'var(--bg-card)',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.1rem',
            color: 'var(--gold)',
            marginBottom: '8px',
          }}>
            See You There
          </div>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: '15px',
            color: 'var(--text-dim)',
          }}>
            No registration needed — just show up and be part of the story.
          </p>
        </div>
      </div>
    </section>
  )
}

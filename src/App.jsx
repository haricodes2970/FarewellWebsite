import { useState } from 'react'
import FilmGrain from './components/FilmGrain'
import RedCarpetEdges from './components/RedCarpetEdges'
import AmbientBackground from './components/AmbientBackground'
import CurtainReveal from './components/CurtainReveal'
import Hero from './components/Hero'
import Invitations from './components/Invitations'
import QuoteSpine from './components/QuoteSpine'
import AtAGlance from './components/AtAGlance'
import Counters from './components/Counters'
import Intermission from './components/Intermission'
import EventRundown from './components/EventRundown'
import MessageWall from './components/MessageWall'
import PassTheTorch from './components/PassTheTorch'
import Countdown from './components/Countdown'
import Footer from './components/Footer'
import './index.css'

function App() {
  const [curtainDone, setCurtainDone] = useState(false)

  return (
    <div style={{
      background: 'transparent',   /* body carries var(--bg); plasma blobs show through */
      minHeight: '100vh',
      color: 'var(--text-primary)',
      overflowX: 'hidden',
      position: 'relative',
      zIndex: 1,
    }}>
      {/* z-index 0: plasma blobs */}
      <AmbientBackground />
      {/* z-index 99-100: fixed overlays */}
      <FilmGrain />
      <RedCarpetEdges />
      <CurtainReveal onComplete={() => setCurtainDone(true)} />

      {curtainDone && (
        <>
          <div id="hero"><Hero /></div>
          <div id="invitations"><Invitations /></div>
          <QuoteSpine />
          <AtAGlance />
          <Counters />
          <Intermission />
          <div id="rundown"><EventRundown /></div>
          <div id="voices"><MessageWall /></div>
          <PassTheTorch />
          <div id="countdown"><Countdown /></div>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import './MotionPrimitive.css'

// ── Highlight ─────────────────────────────────────────────────
function Highlight() {
  return (
    <div className="mp-stage mp-highlight">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="mp-hex"
          animate={{ boxShadow: ['0 0 0px #f0a500', '0 0 18px #f0a500', '0 0 0px #f0a500'] }}
          transition={{ duration: 1.4, delay: i * 0.35, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ── Move Token ────────────────────────────────────────────────
function MoveToken() {
  return (
    <div className="mp-stage mp-move-token">
      <div className="mp-point mp-point--a"><span>A</span></div>
      <div className="mp-track" />
      <motion.div
        className="mp-token"
        animate={{ x: [0, 140, 140, 0] }}
        transition={{ duration: 2.4, times: [0, 0.45, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="mp-point mp-point--b"><span>B</span></div>
    </div>
  )
}

// ── Flip Reveal ───────────────────────────────────────────────
function FlipReveal() {
  const [flipped, setFlipped] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setFlipped(f => !f), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mp-stage mp-flip-reveal">
      <div className={`mp-card-3d ${flipped ? 'mp-card-3d--flipped' : ''}`}>
        <div className="mp-card-face mp-card-face--back">
          <span className="mp-card-icon">?</span>
        </div>
        <div className="mp-card-face mp-card-face--front">
          <span className="mp-card-icon">★</span>
        </div>
      </div>
    </div>
  )
}

// ── Fade In Text ──────────────────────────────────────────────
const LINES = ['Roll the dice', 'Collect resources', 'Build & trade']
function FadeInText() {
  const [visible, setVisible] = useState(0)
  useEffect(() => {
    setVisible(0)
    let i = 0
    const id = setInterval(() => {
      i++
      if (i >= LINES.length) { clearInterval(id); setTimeout(() => setVisible(0), 800) }
      else setVisible(i)
    }, 800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mp-stage mp-fade-text">
      {LINES.map((line, i) => (
        <motion.div
          key={line}
          className="mp-text-line"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: i <= visible ? 1 : 0.15, y: i <= visible ? 0 : 6 }}
          transition={{ duration: 0.4 }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  )
}

// ── Count Up ──────────────────────────────────────────────────
function CountUp() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(0)
    let n = 0
    const id = setInterval(() => {
      n++
      setCount(n)
      if (n >= 5) { clearInterval(id); setTimeout(() => setCount(0), 900) }
    }, 400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mp-stage mp-count-up">
      <div className="mp-resource-row">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="mp-resource-card"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: i < count ? 1 : 0, opacity: i < count ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            {['🌲', '🐑', '🌾', '🧱', '⛰️'][i]}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mp-count-number"
        key={count}
        initial={{ scale: 1.4, color: '#f0a500' }}
        animate={{ scale: 1, color: '#e8e8f0' }}
        transition={{ duration: 0.3 }}
      >
        +{count}
      </motion.div>
    </div>
  )
}

// ── Zoom Region ───────────────────────────────────────────────
function ZoomRegion() {
  return (
    <div className="mp-stage mp-zoom-region">
      <div className="mp-map-outer">
        <motion.div
          className="mp-map-inner"
          animate={{ scale: [1, 1.9, 1.9, 1], x: [0, -28, -28, 0], y: [0, -12, -12, 0] }}
          transition={{ duration: 3, times: [0, 0.3, 0.7, 1], repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="mp-mini-hex" style={{ top: '30%', left: '20%' }} />
          <div className="mp-mini-hex" style={{ top: '50%', left: '40%' }} />
          <div className="mp-mini-hex mp-mini-hex--focus" style={{ top: '25%', left: '55%' }} />
          <div className="mp-mini-hex" style={{ top: '60%', left: '65%' }} />
          <div className="mp-mini-hex" style={{ top: '40%', left: '75%' }} />
        </motion.div>
      </div>
      <motion.div
        className="mp-zoom-label"
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 3, times: [0, 0.25, 0.35, 0.7, 0.9], repeat: Infinity }}
      >
        zoom
      </motion.div>
    </div>
  )
}

// ── Pulse Legal ───────────────────────────────────────────────
const LEGAL_SPOTS = [
  { x: 20, y: 20, legal: false },
  { x: 50, y: 15, legal: true },
  { x: 80, y: 25, legal: false },
  { x: 30, y: 50, legal: true },
  { x: 65, y: 50, legal: true },
  { x: 45, y: 75, legal: false },
  { x: 75, y: 70, legal: true },
]
function PulseLegal() {
  return (
    <div className="mp-stage mp-pulse-legal">
      <div className="mp-grid-bg" />
      {LEGAL_SPOTS.map((spot, i) => (
        <motion.div
          key={i}
          className={`mp-spot ${spot.legal ? 'mp-spot--legal' : 'mp-spot--illegal'}`}
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          animate={spot.legal
            ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }
            : { scale: 1, opacity: 0.25 }
          }
          transition={{ duration: 1.1, delay: i * 0.15, repeat: spot.legal ? Infinity : 0, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ── Compare Correct / Wrong ───────────────────────────────────
function CompareCorrectWrong() {
  return (
    <div className="mp-stage mp-compare">
      <motion.div
        className="mp-compare-panel mp-compare-panel--wrong"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="mp-compare-icon">✗</span>
        <span className="mp-compare-label">Too close</span>
        <div className="mp-compare-tokens">
          <div className="mp-dot mp-dot--red" />
          <div className="mp-dot mp-dot--blue" style={{ marginLeft: 8 }} />
        </div>
      </motion.div>
      <motion.div
        className="mp-compare-panel mp-compare-panel--correct"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <span className="mp-compare-icon">✓</span>
        <span className="mp-compare-label">Correct spacing</span>
        <div className="mp-compare-tokens">
          <div className="mp-dot mp-dot--red" />
          <div className="mp-dot mp-dot--blue" style={{ marginLeft: 32 }} />
        </div>
      </motion.div>
    </div>
  )
}

// ── Dispatch ──────────────────────────────────────────────────
const PRIMITIVES = {
  highlight: Highlight,
  move_token: MoveToken,
  flip_reveal: FlipReveal,
  fade_in_text: FadeInText,
  count_up: CountUp,
  zoom_region: ZoomRegion,
  pulse_legal: PulseLegal,
  compare_correct_wrong: CompareCorrectWrong,
}

export default function MotionPrimitive({ primitive, sceneKey }) {
  const Component = PRIMITIVES[primitive]
  if (!Component) return null
  return (
    <div className="motion-primitive-wrapper">
      <Component key={sceneKey} />
      <span className="mp-type-label">{primitive?.replace(/_/g, ' ')}</span>
    </div>
  )
}

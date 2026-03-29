import React from 'react'
import { motion } from 'framer-motion'
import './CompletionScreen.css'

export default function CompletionScreen({ game, onRestart, onExit }) {
  return (
    <motion.div
      className="completion"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="completion__icon">🎲</div>

      <h2 className="completion__title">You're ready to play!</h2>
      <p className="completion__subtitle">
        You've completed the <strong>{game.title}</strong> tutorial.
      </p>

      <div className="completion__stats">
        <div className="completion__stat">
          <span className="completion__stat-value">{game.scenes.length}</span>
          <span className="completion__stat-label">scenes covered</span>
        </div>
        <div className="completion__stat">
          <span className="completion__stat-value">{game.time_estimate}</span>
          <span className="completion__stat-label">play time</span>
        </div>
        <div className="completion__stat">
          <span className="completion__stat-value">{game.player_count}</span>
          <span className="completion__stat-label">players</span>
        </div>
      </div>

      <div className="completion__reminder">
        <p className="completion__reminder-title">Remember the key rule</p>
        <p className="completion__reminder-text">{game.turn_loop}</p>
      </div>

      <div className="completion__actions">
        <button className="completion__btn completion__btn--ghost" onClick={onRestart}>
          ↺ Replay tutorial
        </button>
        <button className="completion__btn completion__btn--primary" onClick={onExit}>
          ← Back to games
        </button>
      </div>
    </motion.div>
  )
}

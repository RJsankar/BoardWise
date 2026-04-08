import React from 'react'
import { motion } from 'framer-motion'
import QuickReferenceCards from './QuickReferenceCards.jsx'
import './RecapScreen.css'

export default function RecapScreen({ game, onStartTutorial, onExit }) {
  const topMistakes = game.beginner_mistakes?.slice(0, 3) ?? []

  return (
    <div className="recap">
      <header className="tutorial-player__header recap__header">
        <div className="tutorial-player__game-meta">
          <span className="tutorial-player__game-title">{game.title}</span>
          <span className="tutorial-player__meta-pill">{game.complexity}</span>
          <span className="tutorial-player__meta-pill">{game.player_count} players</span>
          <span className="tutorial-player__meta-pill">{game.time_estimate}</span>
        </div>
        <button className="tutorial-player__exit" onClick={onExit} aria-label="Back to games">✕</button>
      </header>

      <motion.div
        className="recap__body"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="recap__badge">Quick Recap</div>
        <h2 className="recap__title">{game.title}</h2>
        <p className="recap__subtitle">Everything you need to remember before you play.</p>

        <div className="recap__sections">

          <div className="recap__section">
            <p className="recap__section-label">Goal</p>
            <p className="recap__section-text">{game.player_goal}</p>
          </div>

          <div className="recap__section">
            <p className="recap__section-label">On your turn</p>
            <p className="recap__section-text">{game.turn_loop}</p>
          </div>

          <div className="recap__section">
            <p className="recap__section-label">Key actions</p>
            <ul className="recap__list">
              {game.player_actions?.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>

          <div className="recap__section">
            <p className="recap__section-label">End of game</p>
            <p className="recap__section-text">{game.end_trigger}</p>
            <p className="recap__section-text recap__section-text--muted">{game.scoring}</p>
          </div>

          {topMistakes.length > 0 && (
            <div className="recap__section recap__section--warn">
              <p className="recap__section-label recap__section-label--warn">Watch out for</p>
              <ul className="recap__list">
                {topMistakes.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {game.quick_reference?.length > 0 && (
            <div className="recap__section recap__section--qr">
              <QuickReferenceCards items={game.quick_reference} />
            </div>
          )}
        </div>

        <div className="recap__actions">
          <button className="completion__btn completion__btn--ghost" onClick={onStartTutorial}>
            ▶ Full Tutorial
          </button>
          <button className="completion__btn completion__btn--primary" onClick={onExit}>
            ← Back to games
          </button>
        </div>
      </motion.div>
    </div>
  )
}

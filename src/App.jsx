import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TutorialPlayer from './components/TutorialPlayer.jsx'
import games from './data/index.js'
import './App.css'

const GAME_LIST = Object.values(games)

// Thumbnail images for the landing page cards
const THUMBNAILS = {
  'catan':          '/assets/catan-midgame.png',
  'ticket-to-ride': '/assets/ttr-intro.png',
  'sequence':       '/assets/seq-gameplay.png',
  'monopoly-deal':  '/assets/monopoly-deal-logo.png',
  'uno':            '/assets/uno-logo.png',
}

const COMING_SOON = [
  {
    game_id: 'azul',
    title: 'Azul',
    family: 'tile-placement',
    complexity: 'medium',
    theme: 'Draft colourful tiles from factories and arrange them on your board to score points — but waste nothing.',
    player_count: '2–4',
    time_estimate: '30–45 min',
    image: '/assets/azul-logo.png',
  },
  {
    game_id: 'exploding-kittens',
    title: 'Exploding Kittens',
    family: 'push-your-luck',
    complexity: 'light',
    theme: 'Draw cards until someone pulls an Exploding Kitten — use action cards to dodge, defuse, and survive.',
    player_count: '2–5',
    time_estimate: '15–20 min',
    image: '/assets/exploding-kittens-logo.png',
  },
  {
    game_id: 'taco-cat',
    title: 'Taco Cat Goat Cheese Pizza',
    family: 'reaction',
    complexity: 'light',
    theme: 'Slap the pile when the card matches the word you just said — fastest hands win the deck.',
    player_count: '2–8',
    time_estimate: '10–20 min',
    image: '/assets/taco-cat-logo.png',
  },
]

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
}

const heroStagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}

const cardStagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

const sectionTitle = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

function GameThumb({ src }) {
  if (!src) return null
  return <img src={src} alt="" className="game-card__thumb" />
}

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null)

  if (selectedGame) {
    return (
      <TutorialPlayer
        game={selectedGame}
        onExit={() => setSelectedGame(null)}
      />
    )
  }

  const totalScenes = GAME_LIST.reduce((sum, g) => sum + g.scenes.length, 0)

  return (
    <div className="home">
      {/* ── Hero ── */}
      <motion.header
        className="home__hero"
        variants={heroStagger}
        initial="hidden"
        animate="show"
      >
        <motion.div className="home__hero-badge" variants={fadeUp}>
          Free · No account needed
        </motion.div>
        <motion.h1 className="home__logo" variants={fadeUp}>
          BoardWise
        </motion.h1>
        <motion.p className="home__tagline" variants={fadeUp}>
          Learn any board game in minutes,<br className="home__tagline-br" /> not rulebook-hours.
        </motion.p>
        <motion.div className="home__stats" variants={fadeUp}>
          <div className="home__stat">
            <span className="home__stat-value">{GAME_LIST.length}</span>
            <span className="home__stat-label">Games</span>
          </div>
          <div className="home__stat-divider" />
          <div className="home__stat">
            <span className="home__stat-value">{totalScenes}</span>
            <span className="home__stat-label">Guided scenes</span>
          </div>
          <div className="home__stat-divider" />
          <div className="home__stat">
            <span className="home__stat-value">8</span>
            <span className="home__stat-label">Stages per game</span>
          </div>
        </motion.div>
      </motion.header>

      {/* ── Available Now ── */}
      <section className="home__section">
        <motion.h2
          className="home__section-title"
          variants={sectionTitle}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          <span className="home__section-dot home__section-dot--active" />
          Available Now
        </motion.h2>
        <motion.div
          className="home__grid"
          variants={cardStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {GAME_LIST.map(game => (
            <motion.button
              key={game.game_id}
              className="game-card"
              variants={cardItem}
              whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(240,165,0,0.18)', borderColor: 'var(--color-primary)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedGame(game)}
            >
              <GameThumb src={THUMBNAILS[game.game_id]} />
              <div className="game-card__body">
                <div className="game-card__family">{game.family}</div>
                <h3 className="game-card__title">{game.title}</h3>
                <p className="game-card__theme">{game.theme}</p>
                <div className="game-card__meta">
                  <span>{game.player_count} players</span>
                  <span>{game.time_estimate}</span>
                  <span className={`game-card__complexity game-card__complexity--${game.complexity}`}>
                    {game.complexity}
                  </span>
                </div>
                <div className="game-card__cta">Start Tutorial →</div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* ── Coming Soon ── */}
      <section className="home__section">
        <motion.h2
          className="home__section-title"
          variants={sectionTitle}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          <span className="home__section-dot home__section-dot--soon" />
          Coming Soon
        </motion.h2>
        <motion.div
          className="home__grid"
          variants={cardStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {COMING_SOON.map(game => (
            <motion.div
              key={game.game_id}
              className="game-card game-card--soon"
              variants={cardItem}
            >
              <div className="game-card__soon-badge">Coming Soon</div>
              {game.image && <GameThumb src={game.image} />}
              <div className="game-card__body">
                <div className="game-card__family">{game.family}</div>
                <h3 className="game-card__title">{game.title}</h3>
                <p className="game-card__theme">{game.theme}</p>
                <div className="game-card__meta">
                  <span>{game.player_count} players</span>
                  <span>{game.time_estimate}</span>
                  <span className={`game-card__complexity game-card__complexity--${game.complexity}`}>
                    {game.complexity}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer className="home__footer">
        <p>BoardWise — learn the rules, then play the game.</p>
      </footer>
    </div>
  )
}

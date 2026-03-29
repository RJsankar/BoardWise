import React, { useState } from 'react'
import TutorialPlayer from './components/TutorialPlayer.jsx'
import games from './data/index.js'
import './App.css'

const GAME_LIST = Object.values(games)

const COMING_SOON = [
  {
    game_id: 'azul',
    title: 'Azul',
    family: 'tile-placement',
    complexity: 'medium',
    theme: 'Draft colourful tiles from factories and arrange them on your board to score points — but waste nothing.',
    player_count: '2–4',
    time_estimate: '30–45 min',
  },
  {
    game_id: 'exploding-kittens',
    title: 'Exploding Kittens',
    family: 'push-your-luck',
    complexity: 'light',
    theme: 'Draw cards until someone pulls an Exploding Kitten — use action cards to dodge, defuse, and survive.',
    player_count: '2–5',
    time_estimate: '15–20 min',
  },
  {
    game_id: 'taco-cat',
    title: 'Taco Cat Goat Cheese Pizza',
    family: 'reaction',
    complexity: 'light',
    theme: 'Slap the pile when the card matches the word you just said — fastest hands win the deck.',
    player_count: '2–8',
    time_estimate: '10–20 min',
  },
]

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
      <header className="home__hero">
        <div className="home__hero-badge">Free · No account needed</div>
        <h1 className="home__logo">BoardWise</h1>
        <p className="home__tagline">
          Learn any board game in minutes,<br className="home__tagline-br" /> not rulebook-hours.
        </p>
        <div className="home__stats">
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
        </div>
      </header>

      <section className="home__section">
        <h2 className="home__section-title">
          <span className="home__section-dot home__section-dot--active" />
          Available Now
        </h2>
        <div className="home__grid">
          {GAME_LIST.map(game => (
            <button
              key={game.game_id}
              className="game-card"
              onClick={() => setSelectedGame(game)}
            >
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
            </button>
          ))}
        </div>
      </section>

      <section className="home__section">
        <h2 className="home__section-title">
          <span className="home__section-dot home__section-dot--soon" />
          Coming Soon
        </h2>
        <div className="home__grid">
          {COMING_SOON.map(game => (
            <div key={game.game_id} className="game-card game-card--soon">
              <div className="game-card__soon-badge">Coming Soon</div>
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
          ))}
        </div>
      </section>

      <footer className="home__footer">
        <p>BoardWise — learn the rules, then play the game.</p>
      </footer>
    </div>
  )
}

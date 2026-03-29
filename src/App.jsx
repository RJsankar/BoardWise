import React, { useState } from 'react'
import TutorialPlayer from './components/TutorialPlayer.jsx'
import games from './data/index.js'
import './App.css'

const GAME_LIST = Object.values(games)

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

  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__logo">BoardWise</h1>
        <p className="home__tagline">Learn any board game in minutes, not rulebook-hours.</p>
      </header>

      <section className="home__games">
        <h2 className="home__section-title">Choose a Game</h2>
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
    </div>
  )
}

import React, { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { useMotionPref } from '../context/MotionContext.jsx'
import { useScene } from '../hooks/useScene.js'
import SceneCard from './SceneCard.jsx'
import SceneNav from './SceneNav.jsx'
import StageProgress from './StageProgress.jsx'
import QuickReferenceCards from './QuickReferenceCards.jsx'
import CompletionScreen from './CompletionScreen.jsx'
import './TutorialPlayer.css'

export default function TutorialPlayer({ game, onExit }) {
  const [done, setDone] = useState(false)
  const { reducedMotion, toggle: toggleMotion } = useMotionPref()

  const { scene, index, total, canGoBack, canGoForward, next, back, replay, skip, goTo } =
    useScene(game.scenes)

  const handleNext = () => {
    if (canGoForward) next()
    else setDone(true)
  }

  const handleRestart = () => {
    goTo(0)
    setDone(false)
  }

  if (!game.scenes.length) {
    return (
      <div className="tutorial-player tutorial-player--empty">
        <p>No scenes available for this game yet.</p>
      </div>
    )
  }

  if (done) {
    return (
      <div className="tutorial-player">
        <header className="tutorial-player__header">
          <span className="tutorial-player__game-title">{game.title}</span>
          <button className="tutorial-player__exit" onClick={onExit} aria-label="Exit">✕</button>
        </header>
        <CompletionScreen game={game} onRestart={handleRestart} onExit={onExit} />
      </div>
    )
  }

  const motionReduceValue = reducedMotion ? 'always' : 'never'

  const isQRStage = scene?.lesson_stage === 'quick-reference'

  return (
    <MotionConfig reducedMotion={motionReduceValue}>
    <div className="tutorial-player">
      <header className="tutorial-player__header">
        <div className="tutorial-player__game-meta">
          <span className="tutorial-player__game-title">{game.title}</span>
          <span className="tutorial-player__meta-pill">{game.complexity}</span>
          <span className="tutorial-player__meta-pill">{game.player_count} players</span>
          <span className="tutorial-player__meta-pill">{game.time_estimate}</span>
        </div>
        <div className="tutorial-player__header-actions">
          <button
            className={`tutorial-player__motion-toggle ${reducedMotion ? 'tutorial-player__motion-toggle--off' : ''}`}
            onClick={toggleMotion}
            aria-label={reducedMotion ? 'Enable animations' : 'Reduce motion'}
            title={reducedMotion ? 'Enable animations' : 'Reduce motion'}
          >
            {reducedMotion ? '◎' : '✦'}
          </button>
          <button
            className="tutorial-player__exit"
            onClick={onExit}
            aria-label="Exit tutorial"
          >
            ✕
          </button>
        </div>
      </header>

      <div className="tutorial-player__progress">
        <StageProgress scenes={game.scenes} currentIndex={index} />
      </div>

      <main className="tutorial-player__main">
        <SceneCard key={scene?.scene_id} scene={scene} index={index} total={total} />

        {isQRStage && game.quick_reference?.length > 0 && (
          <div className="tutorial-player__qr">
            <QuickReferenceCards items={game.quick_reference} />
          </div>
        )}
      </main>

      <footer className="tutorial-player__footer">
        <SceneNav
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onBack={back}
          onNext={handleNext}
          onReplay={replay}
          onSkip={skip}
        />
      </footer>
    </div>
    </MotionConfig>
  )
}

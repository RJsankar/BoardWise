import React from 'react'
import './SceneNav.css'

export default function SceneNav({ canGoBack, canGoForward, onBack, onNext, onReplay, onSkip, isLastScene }) {
  return (
    <nav className="scene-nav">
      <button
        className="scene-nav__btn scene-nav__btn--ghost"
        onClick={onBack}
        disabled={!canGoBack}
        aria-label="Previous scene"
      >
        ← Back
      </button>

      <div className="scene-nav__center">
        <button
          className="scene-nav__btn scene-nav__btn--ghost scene-nav__btn--sm"
          onClick={onReplay}
          aria-label="Replay from start of this stage"
        >
          ↺ Replay
        </button>
        <button
          className="scene-nav__btn scene-nav__btn--ghost scene-nav__btn--sm"
          onClick={onSkip}
          disabled={!canGoForward}
          aria-label="Skip to quick reference"
        >
          Skip →→
        </button>
      </div>

      <button
        className="scene-nav__btn scene-nav__btn--primary"
        onClick={onNext}
        aria-label={canGoForward ? 'Next scene' : 'Finish tutorial'}
      >
        {canGoForward ? 'Next →' : '🎲 Finish'}
      </button>
    </nav>
  )
}

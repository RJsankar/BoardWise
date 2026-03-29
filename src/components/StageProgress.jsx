import React from 'react'
import './StageProgress.css'

const STAGES = [
  { key: 'intro',           label: 'Intro' },
  { key: 'objective',       label: 'Goal' },
  { key: 'setup',           label: 'Setup' },
  { key: 'turn-loop',       label: 'Turn' },
  { key: 'core-actions',    label: 'Actions' },
  { key: 'example-round',   label: 'Example' },
  { key: 'endgame',         label: 'Endgame' },
  { key: 'quick-reference', label: 'Ref' },
]

export default function StageProgress({ scenes, currentIndex }) {
  // Which stages exist in this game's scenes
  const activeStages = new Set(scenes.map(s => s.lesson_stage))
  const currentStage = scenes[currentIndex]?.lesson_stage

  // Mark a stage as visited if we've passed the last scene in that stage
  const visitedStages = new Set()
  for (let i = 0; i <= currentIndex; i++) {
    visitedStages.add(scenes[i]?.lesson_stage)
  }

  return (
    <div className="stage-progress" role="list" aria-label="Tutorial stages">
      {STAGES.filter(s => activeStages.has(s.key)).map(stage => {
        const isCurrent = stage.key === currentStage
        const isVisited = visitedStages.has(stage.key) && !isCurrent
        return (
          <div
            key={stage.key}
            className={[
              'stage-progress__item',
              isCurrent ? 'stage-progress__item--active' : '',
              isVisited ? 'stage-progress__item--visited' : '',
            ].join(' ')}
            role="listitem"
            aria-current={isCurrent ? 'step' : undefined}
          >
            <div className="stage-progress__dot" />
            <span className="stage-progress__label">{stage.label}</span>
          </div>
        )
      })}
    </div>
  )
}

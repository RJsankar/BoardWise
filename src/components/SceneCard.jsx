import React from 'react'
import MotionPrimitive from './MotionPrimitive.jsx'
import './SceneCard.css'

const STAGE_LABELS = {
  'intro': 'Intro',
  'objective': 'Objective',
  'setup': 'Setup',
  'turn-loop': 'Turn Loop',
  'core-actions': 'Core Actions',
  'example-round': 'Example Round',
  'endgame': 'Endgame',
  'quick-reference': 'Quick Reference',
}

export default function SceneCard({ scene, index, total }) {
  if (!scene) return null

  return (
    <div className="scene-card" key={scene.scene_id}>
      <div className="scene-card__header">
        <span className="scene-card__stage-badge">
          {STAGE_LABELS[scene.lesson_stage] ?? scene.lesson_stage}
        </span>
        <span className="scene-card__counter">{index + 1} / {total}</span>
      </div>

      <h2 className="scene-card__title">{scene.title}</h2>

      {scene.image ? (
        <div className="scene-card__image-wrap">
          <img
            src={scene.image}
            alt={scene.board_focus ?? scene.title}
            className="scene-card__image"
          />
          {scene.motion_primitive && (
            <span className="scene-card__mp-badge">
              {scene.motion_primitive.replace(/_/g, ' ')}
            </span>
          )}
        </div>
      ) : scene.motion_primitive ? (
        <MotionPrimitive
          primitive={scene.motion_primitive}
          sceneKey={scene.scene_id}
        />
      ) : null}

      <p className="scene-card__narration">{scene.narration_text}</p>

      {scene.board_focus && (
        <div className="scene-card__board-focus">
          <span className="scene-card__label">Board focus</span>
          <span className="scene-card__board-focus-value">{scene.board_focus}</span>
        </div>
      )}

      {scene.components_involved?.length > 0 && (
        <div className="scene-card__components">
          <span className="scene-card__label">Components</span>
          <div className="scene-card__chips">
            {scene.components_involved.map(c => (
              <span key={c} className="chip">{c.replace(/_/g, ' ')}</span>
            ))}
          </div>
        </div>
      )}

      <div className="scene-card__takeaway">
        <span className="scene-card__takeaway-icon">✓</span>
        <span>{scene.user_takeaway}</span>
      </div>

      {scene.optional_quick_check && (
        <div className="scene-card__check-prompt">
          Quick check: can you explain this in one sentence?
        </div>
      )}
    </div>
  )
}

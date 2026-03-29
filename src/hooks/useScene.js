import { useState, useCallback } from 'react'

export function useScene(scenes) {
  const [index, setIndex] = useState(0)

  const total = scenes.length
  const scene = scenes[index] ?? null

  const next = useCallback(
    () => setIndex(i => Math.min(i + 1, total - 1)),
    [total]
  )

  const back = useCallback(
    () => setIndex(i => Math.max(i - 1, 0)),
    []
  )

  // replay: reset to first scene of the current stage
  const replay = useCallback(() => {
    if (!scene) return
    const stageStart = scenes.findIndex(s => s.lesson_stage === scene.lesson_stage)
    setIndex(stageStart !== -1 ? stageStart : index)
  }, [scene, scenes, index])

  // skip: jump to quick-reference, or last scene if none
  const skip = useCallback(() => {
    const qrIndex = scenes.findIndex(s => s.lesson_stage === 'quick-reference')
    setIndex(qrIndex !== -1 ? qrIndex : total - 1)
  }, [scenes, total])

  const goTo = useCallback((i) => setIndex(i), [])

  return {
    scene,
    index,
    total,
    canGoBack: index > 0,
    canGoForward: index < total - 1,
    next,
    back,
    replay,
    skip,
    goTo,
  }
}

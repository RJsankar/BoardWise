import React, { createContext, useContext, useState, useEffect } from 'react'

const MotionContext = createContext({ reducedMotion: false, toggle: () => {} })

export function MotionProvider({ children }) {
  // Respect OS preference as the default
  const osPrefers = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const [reducedMotion, setReducedMotion] = useState(osPrefers)

  // Keep in sync if OS setting changes while app is open
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggle = () => setReducedMotion(v => !v)

  return (
    <MotionContext.Provider value={{ reducedMotion, toggle }}>
      {children}
    </MotionContext.Provider>
  )
}

export function useMotionPref() {
  return useContext(MotionContext)
}

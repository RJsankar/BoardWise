import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './QuickReferenceCards.css'

export default function QuickReferenceCards({ items }) {
  const [openId, setOpenId] = useState(null)

  if (!items?.length) return null

  return (
    <div className="qr-cards">
      <p className="qr-cards__heading">Frequently asked mid-game</p>
      {items.map(item => {
        const isOpen = openId === item.id
        return (
          <div key={item.id} className={`qr-item ${isOpen ? 'qr-item--open' : ''}`}>
            <button
              className="qr-item__question"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <motion.span
                className="qr-item__chevron"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▾
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="qr-item__answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

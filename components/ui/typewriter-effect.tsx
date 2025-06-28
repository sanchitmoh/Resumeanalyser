"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterEffectProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function TypewriterEffect({ text, speed = 100, className = "", onComplete }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      const timer = setTimeout(onComplete, 500)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed, onComplete])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

  useEffect(() => {
    // Reset when text changes
    setDisplayText("")
    setCurrentIndex(0)
  }, [text])

  return (
    <div className={className}>
      <span>{displayText}</span>
      <motion.span animate={{ opacity: showCursor ? 1 : 0 }} className="inline-block w-1 h-full bg-current ml-1">
        |
      </motion.span>
    </div>
  )
}

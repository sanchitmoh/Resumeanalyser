"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSound } from "@/components/providers/sound-provider"

interface SmoothTypewriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
  cursor?: boolean
  sound?: boolean
}

export function SmoothTypewriter({
  text,
  speed = 30, // reduced default from 50
  delay = 0,
  className = "",
  onComplete,
  cursor = true,
  sound = true,
}: SmoothTypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const { playSound } = useSound()

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(
        () => {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)

          // Play typewriter sound with variation
          if (sound && text[currentIndex] !== " ") {
            playSound("typewriter", 0.05 + Math.random() * 0.05) // reduced volume
          }
        },
        delay + speed + Math.random() * 10, // reduced variation from 20 to 10
      )

      return () => clearTimeout(timer)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [currentIndex, text, speed, delay, onComplete, isComplete, sound, playSound])

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.6, // reduced from 0.8
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="inline-block w-0.5 h-[1em] bg-current ml-1"
        />
      )}
    </span>
  )
}

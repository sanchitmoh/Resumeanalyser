"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export function SmoothShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let time = 0

    const animate = () => {
      time += 0.01

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      // Animated colors
      const hue1 = (time * 20) % 360
      const hue2 = (time * 30 + 120) % 360
      const hue3 = (time * 25 + 240) % 360

      gradient.addColorStop(0, `hsla(${hue1}, 70%, 20%, 0.8)`)
      gradient.addColorStop(0.5, `hsla(${hue2}, 60%, 15%, 0.9)`)
      gradient.addColorStop(1, `hsla(${hue3}, 80%, 10%, 1)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add noise texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 10
        data[i] += noise // Red
        data[i + 1] += noise // Green
        data[i + 2] += noise // Blue
      }

      ctx.putImageData(imageData, 0, 0)

      // Add flowing waves
      ctx.globalCompositeOperation = "overlay"

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x <= canvas.width; x += 10) {
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.01 + time * 2 + i * 2) * 50 +
            Math.sin(x * 0.005 + time * 1.5 + i * 1.5) * 30
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        const waveGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        waveGradient.addColorStop(0, `hsla(${(hue1 + i * 60) % 360}, 80%, 50%, 0.1)`)
        waveGradient.addColorStop(1, `hsla(${(hue1 + i * 60) % 360}, 80%, 30%, 0.05)`)

        ctx.fillStyle = waveGradient
        ctx.fill()
      }

      ctx.globalCompositeOperation = "source-over"

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -2 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
    />
  )
}

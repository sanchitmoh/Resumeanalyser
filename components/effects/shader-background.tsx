"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    let animationId: number

    const animate = () => {
      time += 0.01

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2,
      )

      // Animated gradient colors
      const hue1 = (time * 20) % 360
      const hue2 = (time * 30 + 120) % 360
      const hue3 = (time * 25 + 240) % 360

      gradient.addColorStop(0, `hsla(${hue1}, 70%, 20%, 0.8)`)
      gradient.addColorStop(0.5, `hsla(${hue2}, 60%, 15%, 0.6)`)
      gradient.addColorStop(1, `hsla(${hue3}, 50%, 10%, 0.4)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add moving waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x <= canvas.width; x += 10) {
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.01 + time * (2 + i)) * (50 + i * 20) +
            Math.sin(x * 0.005 + time * (1.5 + i * 0.5)) * (30 + i * 10)

          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        const waveGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        waveGradient.addColorStop(0, `hsla(${(hue1 + i * 60) % 360}, 80%, 30%, 0.1)`)
        waveGradient.addColorStop(1, `hsla(${(hue1 + i * 60) % 360}, 80%, 30%, 0.05)`)

        ctx.fillStyle = waveGradient
        ctx.fill()
      }

      // Add floating orbs
      for (let i = 0; i < 5; i++) {
        const x = canvas.width / 2 + Math.sin(time * (0.5 + i * 0.2)) * (canvas.width * 0.3)
        const y = canvas.height / 2 + Math.cos(time * (0.3 + i * 0.15)) * (canvas.height * 0.2)
        const radius = 50 + Math.sin(time * (1 + i * 0.3)) * 20

        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        orbGradient.addColorStop(0, `hsla(${(hue2 + i * 72) % 360}, 90%, 60%, 0.3)`)
        orbGradient.addColorStop(0.7, `hsla(${(hue2 + i * 72) % 360}, 90%, 40%, 0.1)`)
        orbGradient.addColorStop(1, `hsla(${(hue2 + i * 72) % 360}, 90%, 20%, 0)`)

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = orbGradient
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
    />
  )
}

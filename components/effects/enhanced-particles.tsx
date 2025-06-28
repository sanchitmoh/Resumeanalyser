"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
  life: number
  maxLife: number
  trail: { x: number; y: number; opacity: number }[]
}

interface EnhancedParticlesProps {
  count?: number
  className?: string
  interactive?: boolean
  connectionDistance?: number
}

export function EnhancedParticles({
  count = 80,
  className = "",
  interactive = true,
  connectionDistance = 120,
}: EnhancedParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.max(0.5, Math.random() * 2 + 0.5),
      opacity: Math.random() * 0.8 + 0.2,
      hue: Math.random() * 60 + 200, // Blue to purple range
      life: 0,
      maxLife: Math.random() * 200 + 100,
      trail: [],
    }))

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      particlesRef.current.forEach((particle, index) => {
        // Update particle life
        particle.life++
        if (particle.life > particle.maxLife) {
          particle.life = 0
          particle.x = Math.random() * dimensions.width
          particle.y = Math.random() * dimensions.height
          particle.vx = (Math.random() - 0.5) * 0.8
          particle.vy = (Math.random() - 0.5) * 0.8
        }

        // Add to trail
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity })
        if (particle.trail.length > 8) {
          particle.trail.shift()
        }

        // Mouse interaction
        if (interactive) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const force = (100 - distance) / 100
            particle.vx += (dx / distance) * force * 0.01
            particle.vy += (dy / distance) * force * 0.01
          }
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary collision with damping
        if (particle.x <= 0 || particle.x >= dimensions.width) {
          particle.vx *= -0.8
          particle.x = Math.max(0, Math.min(dimensions.width, particle.x))
        }
        if (particle.y <= 0 || particle.y >= dimensions.height) {
          particle.vy *= -0.8
          particle.y = Math.max(0, Math.min(dimensions.height, particle.y))
        }

        // Apply friction
        particle.vx *= 0.999
        particle.vy *= 0.999

        // Pulsing effect
        const pulse = Math.sin(particle.life * 0.05) * 0.3 + 0.7
        const currentSize = Math.max(0.5, particle.size * pulse)
        const currentOpacity = particle.opacity * pulse

        // Draw trail
        particle.trail.forEach((point, trailIndex) => {
          const trailOpacity = point.opacity * (trailIndex / particle.trail.length) * 0.3
          const trailSize = Math.max(0.5, currentSize * (trailIndex / particle.trail.length))

          ctx.beginPath()
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${trailOpacity})`
          ctx.fill()
        })

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2)

        // Create gradient
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, currentSize * 2)
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 70%, ${currentOpacity})`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 50%, 0)`)

        ctx.fillStyle = gradient
        ctx.fill()

        // Draw connections
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3

            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)

            // Create curved line
            const midX = (particle.x + otherParticle.x) / 2
            const midY = (particle.y + otherParticle.y) / 2
            const offset = Math.sin(Date.now() * 0.001 + distance * 0.01) * 10

            ctx.quadraticCurveTo(midX + offset, midY + offset, otherParticle.x, otherParticle.y)

            ctx.strokeStyle = `hsla(${(particle.hue + otherParticle.hue) / 2}, 70%, 60%, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [dimensions, count, interactive, connectionDistance])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ zIndex: -1 }}
    />
  )
}

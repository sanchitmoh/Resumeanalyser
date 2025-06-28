"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useSound } from "@/components/providers/sound-provider"

interface EnhancedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
  href?: string
}

export function EnhancedButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  href,
}: EnhancedButtonProps) {
  const { playSound } = useSound()

  const baseClasses =
    "relative overflow-hidden font-medium transition-all duration-300 transform-gpu will-change-transform"

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white border border-transparent hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm",
    ghost: "text-white hover:bg-white/10 border border-transparent",
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  }

  const handleClick = () => {
    if (!disabled) {
      playSound("click")
      onClick?.()
    }
  }

  const handleHover = () => {
    if (!disabled) {
      playSound("hover")
    }
  }

  const buttonProps = {
    className: `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`,
    onClick: handleClick,
    onMouseEnter: handleHover,
    disabled,
  }

  const content = (
    <>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full"
        animate={{
          translateX: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />
      <span className="relative z-10">{children}</span>
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        {...buttonProps}
        whileHover={{ scale: disabled ? 1 : 1.05, y: disabled ? 0 : -2 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      {...buttonProps}
      whileHover={{ scale: disabled ? 1 : 1.05, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {content}
    </motion.button>
  )
}

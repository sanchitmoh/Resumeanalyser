"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text3D, Float, Sparkles, Environment } from "@react-three/drei"
import { gsap } from "gsap"
import { useRouter } from "next/navigation"
import { SmoothTypewriter } from "@/components/ui/smooth-typewriter"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { SmoothShaderBackground } from "@/components/effects/smooth-shader-background"
import { useSound } from "@/components/providers/sound-provider"

function FloatingResume() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={[-3, 1, 0]}>
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial color="#4f46e5" emissive="#1e1b4b" emissiveIntensity={0.2} />
      </mesh>
      <Text3D font="/fonts/Inter_Bold.json" size={0.2} height={0.05} position={[-3.5, 0.5, 0.1]}>
        RESUME
        <meshStandardMaterial color="#ffffff" emissive="#4f46e5" emissiveIntensity={0.3} />
      </Text3D>
    </Float>
  )
}

function FloatingMagnifyingGlass() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
      <group position={[3, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.8, 0.1, 8, 16]} />
          <meshStandardMaterial color="#10b981" emissive="#065f46" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0.6, -0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.05, 0.05, 1]} />
          <meshStandardMaterial color="#10b981" emissive="#065f46" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  )
}

function SkillIcons() {
  const skills = ["JS", "PY", "AI", "ML"]

  return (
    <>
      {skills.map((skill, index) => (
        <Float key={skill} speed={1 + index * 0.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <Text3D
            font="/fonts/Inter_Bold.json"
            size={0.3}
            height={0.1}
            position={[
              Math.cos((index / skills.length) * Math.PI * 2) * 4,
              Math.sin((index / skills.length) * Math.PI * 2) * 2,
              -2,
            ]}
          >
            {skill}
            <meshStandardMaterial color="#f59e0b" emissive="#92400e" emissiveIntensity={0.3} />
          </Text3D>
        </Float>
      ))}
    </>
  )
}

function FloatingGraphs() {
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1}>
      <group position={[0, -2, 1]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[i * 0.5 - 0.5, Math.random() * 0.5, 0]}>
            <boxGeometry args={[0.3, 0.5 + Math.random() * 1, 0.3]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#581c87" emissiveIntensity={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

export function IntroPage() {
  const router = useRouter()
  const { playSound } = useSound()
  const [currentStep, setCurrentStep] = useState(0)
  const [showSkip, setShowSkip] = useState(false)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)

  const introSteps = [
    "Welcome to the future of career development...",
    "Where AI meets opportunity...",
    "Transform your resume into success...",
    "Ready to unlock your potential?",
  ]

  useEffect(() => {
    // Show skip button after 1 second (reduced from 2)
    const skipTimer = setTimeout(() => setShowSkip(true), 1000)

    // Play ambient sound
    playSound("ambient", 0.1)

    // GSAP timeline for intro sequence (faster animations)
    const tl = gsap.timeline()

    tl.from(".intro-title", {
      duration: 1, // reduced from 2
      y: 100,
      opacity: 0,
      ease: "power3.out",
    })
      .from(
        ".intro-subtitle",
        {
          duration: 0.8, // reduced from 1.5
          y: 50,
          opacity: 0,
          ease: "power2.out",
        },
        "-=0.5", // reduced overlap
      )
      .from(
        ".intro-buttons",
        {
          duration: 0.6, // reduced from 1
          y: 30,
          opacity: 0,
          ease: "power2.out",
        },
        "-=0.3", // reduced overlap
      )

    return () => clearTimeout(skipTimer)
  }, [playSound])

  const handleStepComplete = () => {
    if (currentStep < introSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      playSound("notification", 0.2)
    }
  }

  const handleContinue = () => {
    playSound("success")

    // Faster transition to landing page
    gsap.to(containerRef.current, {
      duration: 0.8, // reduced from 1.5
      opacity: 0,
      scale: 0.9,
      ease: "power2.inOut",
      onComplete: () => router.push("/home"),
    })
  }

  const handleSkip = () => {
    playSound("click")
    router.push("/home")
  }

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      <SmoothShaderBackground />

      {/* Skip Button */}
      {showSkip && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-6 right-6 z-50"
        >
          <EnhancedButton onClick={handleSkip} variant="ghost" size="sm" className="text-white/70 hover:text-white">
            Skip Intro
          </EnhancedButton>
        </motion.div>
      )}

      {/* 3D Scene */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Environment preset="night" />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#4f46e5" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />

          <FloatingResume />
          <FloatingMagnifyingGlass />
          <SkillIcons />
          <FloatingGraphs />

          <Sparkles count={50} scale={10} size={2} speed={0.5} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          className="intro-title max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }} // reduced from 2
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent mb-8">
            AI Resume Analyzer
          </h1>
        </motion.div>

        <motion.div
          className="intro-subtitle max-w-2xl mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }} // reduced duration and delay
        >
          <div className="text-xl md:text-2xl text-white/80 mb-8">
            <SmoothTypewriter
              text={introSteps[currentStep]}
              speed={30} // reduced from 80 for faster typing
              onComplete={handleStepComplete}
              sound={true}
            />
          </div>

          {currentStep === introSteps.length - 1 && (
            <motion.div
              className="intro-buttons flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }} // reduced duration and delay
            >
              <EnhancedButton onClick={handleContinue} variant="primary" size="lg" className="min-w-[200px]">
                Begin Journey
              </EnhancedButton>

              <EnhancedButton
                onClick={() => router.push("/login")}
                variant="secondary"
                size="lg"
                className="min-w-[200px]"
              >
                Sign In
              </EnhancedButton>
            </motion.div>
          )}
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }} // reduced from 2
        >
          <div className="flex space-x-2">
            {introSteps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index <= currentStep ? "bg-white" : "bg-white/30"
                }`}
                animate={{
                  scale: index === currentStep ? 1.5 : 1,
                  opacity: index <= currentStep ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        {currentStep === introSteps.length - 1 && (
          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }} // reduced delay and duration
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-white/60 text-sm"
            >
              ↓ Continue to Experience ↓
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

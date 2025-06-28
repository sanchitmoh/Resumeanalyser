"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/ui/navbar"
import { HeroSection } from "@/components/sections/hero-section"

export function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize smooth scroll
    const initSmoothScroll = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }

    initSmoothScroll()
  }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Simple gradient background without particles */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      <div className="relative z-10">
        <Navbar />
        <HeroSection />

        {/* Features Section */}
        <section className="min-h-screen flex items-center justify-center py-20">
          <div className="text-center max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold gradient-text mb-8"
            >
              Powerful Features
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
            >
              Experience the next generation of resume analysis with AI-powered insights and real-time job matching
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "AI Analysis",
                  description: "Advanced AI algorithms analyze your resume for optimal performance",
                  icon: "🤖",
                },
                {
                  title: "Job Matching",
                  description: "Find the perfect job opportunities that match your skills and experience",
                  icon: "🎯",
                },
                {
                  title: "Real-time Insights",
                  description: "Get instant feedback and suggestions to improve your resume",
                  icon: "⚡",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="min-h-screen flex items-center justify-center py-20">
          <div className="text-center max-w-4xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold gradient-text mb-8"
            >
              Ready to Transform Your Career?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
            >
              Join thousands of professionals who have already discovered the power of AI-driven resume optimization
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Get Started Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 border-2 border-white/20 rounded-full text-white font-bold text-lg hover:border-purple-400 hover:text-purple-400 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  )
}

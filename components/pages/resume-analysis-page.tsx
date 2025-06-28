"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Award,
  Clock,
  Target,
  Lightbulb,
  ArrowLeft,
  Download,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { ParticleBackground } from "@/components/effects/particle-background"
import { CircularProgress } from "@/components/ui/circular-progress"

const analysisData = {
  overallScore: 85,
  sections: [
    {
      name: "Contact Information",
      score: 95,
      status: "excellent",
      feedback: "Complete and professional contact details",
      suggestions: [],
    },
    {
      name: "Professional Summary",
      score: 80,
      status: "good",
      feedback: "Strong summary with room for improvement",
      suggestions: ["Add more specific achievements", "Include relevant keywords for your target role"],
    },
    {
      name: "Work Experience",
      score: 90,
      status: "excellent",
      feedback: "Well-structured with quantified achievements",
      suggestions: ["Consider adding more recent accomplishments"],
    },
    {
      name: "Skills",
      score: 75,
      status: "good",
      feedback: "Good technical skills coverage",
      suggestions: ["Add soft skills", "Include proficiency levels", "Add emerging technologies"],
    },
    {
      name: "Education",
      score: 85,
      status: "good",
      feedback: "Relevant education background",
      suggestions: ["Add relevant coursework or projects"],
    },
  ],
  keywords: {
    found: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"],
    missing: ["TypeScript", "Docker", "AWS", "Kubernetes", "GraphQL"],
    density: 3.2,
  },
  improvements: [
    {
      priority: "high",
      title: "Add Missing Keywords",
      description: "Include TypeScript, Docker, and AWS to match job requirements",
      impact: "+12 points",
    },
    {
      priority: "medium",
      title: "Quantify Achievements",
      description: "Add specific numbers and percentages to your accomplishments",
      impact: "+8 points",
    },
    {
      priority: "low",
      title: "Format Consistency",
      description: "Ensure consistent date formats and bullet point styles",
      impact: "+3 points",
    },
  ],
}

export function ResumeAnalysisPage() {
  const [activeSection, setActiveSection] = useState(0)
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= analysisData.overallScore) {
            clearInterval(interval)
            return analysisData.overallScore
          }
          return prev + 1
        })
      }, 20)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-400"
      case "good":
        return "text-blue-400"
      case "needs-improvement":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return CheckCircle
      case "good":
        return TrendingUp
      case "needs-improvement":
        return AlertTriangle
      default:
        return Clock
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-500/10"
      case "medium":
        return "border-yellow-500 bg-yellow-500/10"
      case "low":
        return "border-green-500 bg-green-500/10"
      default:
        return "border-gray-500 bg-gray-500/10"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleBackground />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6 border-b border-white/10 bg-black/20 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Dashboard
            </Link>
            <div className="w-px h-6 bg-white/20" />
            <h1 className="text-2xl font-bold gradient-text">Resume Analysis</h1>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              Export Report
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Overall Score Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-2">Overall Resume Score</h2>
                <p className="text-gray-400 mb-4">Your resume has been analyzed across multiple criteria</p>
                <div className="flex items-center gap-2 text-green-400">
                  <Award className="w-5 h-5" />
                  <span className="font-semibold">Above Average</span>
                </div>
              </div>

              <div className="flex justify-center">
                <CircularProgress value={animatedScore} size={120} strokeWidth={8} className="text-6xl font-bold" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">ATS Compatibility</span>
                  <span className="text-green-400 font-semibold">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Keyword Match</span>
                  <span className="text-blue-400 font-semibold">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Format Quality</span>
                  <span className="text-purple-400 font-semibold">95%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Section Analysis
            </h3>

            <div className="space-y-4">
              {analysisData.sections.map((section, index) => {
                const StatusIcon = getStatusIcon(section.status)
                return (
                  <motion.div
                    key={section.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      activeSection === index
                        ? "bg-white/10 border-purple-500/50"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                    onClick={() => setActiveSection(index)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <StatusIcon className={`w-5 h-5 ${getStatusColor(section.status)}`} />
                        <span className="font-semibold">{section.name}</span>
                      </div>
                      <span className="text-2xl font-bold">{section.score}%</span>
                    </div>

                    <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${section.score}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      />
                    </div>

                    <p className="text-gray-400 text-sm">{section.feedback}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Detailed Feedback */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Detailed Feedback
            </h3>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">{analysisData.sections[activeSection].name}</h4>
                  <p className="text-gray-400 mb-4">{analysisData.sections[activeSection].feedback}</p>
                </div>

                {analysisData.sections[activeSection].suggestions.length > 0 && (
                  <div>
                    <h5 className="font-semibold mb-3 text-purple-400">Suggestions for Improvement:</h5>
                    <ul className="space-y-2">
                      {analysisData.sections[activeSection].suggestions.map((suggestion, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-gray-300"
                        >
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                          {suggestion}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Keywords Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Keywords Analysis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-400">Found Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {analysisData.keywords.found.map((keyword, index) => (
                  <motion.span
                    key={keyword}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-sm text-green-400"
                  >
                    {keyword}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-red-400">Missing Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {analysisData.keywords.missing.map((keyword, index) => (
                  <motion.span
                    key={keyword}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-sm text-red-400"
                  >
                    {keyword}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Improvement Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Improvement Recommendations
          </h3>

          <div className="space-y-4">
            {analysisData.improvements.map((improvement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`p-4 rounded-lg border ${getPriorityColor(improvement.priority)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs uppercase font-semibold tracking-wide opacity-70">
                        {improvement.priority} priority
                      </span>
                    </div>
                    <h4 className="font-semibold">{improvement.title}</h4>
                  </div>
                  <span className="text-sm font-semibold text-green-400">{improvement.impact}</span>
                </div>
                <p className="text-gray-400 text-sm">{improvement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

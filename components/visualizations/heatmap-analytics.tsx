"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Eye, Clock, MousePointer, TrendingUp, Download, BarChart3, Target } from "lucide-react"

interface HeatmapData {
  section: string
  timeSpent: number // in seconds
  viewRate: number // percentage
  clickRate: number // percentage
  attention: number // 0-100 score
  x: number
  y: number
  width: number
  height: number
}

const heatmapData: HeatmapData[] = [
  {
    section: "Contact Information",
    timeSpent: 12,
    viewRate: 95,
    clickRate: 8,
    attention: 85,
    x: 10,
    y: 10,
    width: 80,
    height: 15,
  },
  {
    section: "Professional Summary",
    timeSpent: 25,
    viewRate: 88,
    clickRate: 15,
    attention: 92,
    x: 10,
    y: 30,
    width: 80,
    height: 20,
  },
  {
    section: "Work Experience",
    timeSpent: 45,
    viewRate: 98,
    clickRate: 35,
    attention: 98,
    x: 10,
    y: 55,
    width: 80,
    height: 30,
  },
  {
    section: "Education",
    timeSpent: 18,
    viewRate: 75,
    clickRate: 12,
    attention: 70,
    x: 10,
    y: 90,
    width: 40,
    height: 15,
  },
  {
    section: "Skills",
    timeSpent: 22,
    viewRate: 82,
    clickRate: 28,
    attention: 88,
    x: 55,
    y: 90,
    width: 35,
    height: 15,
  },
  {
    section: "Projects",
    timeSpent: 30,
    viewRate: 65,
    clickRate: 22,
    attention: 75,
    x: 10,
    y: 110,
    width: 80,
    height: 20,
  },
]

const timeRanges = [
  { label: "24 Hours", value: "24h" },
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
]

const metrics = [
  {
    label: "Total Views",
    value: "1,247",
    change: "+12%",
    icon: Eye,
    color: "text-blue-400",
  },
  {
    label: "Avg. Time",
    value: "2m 34s",
    change: "+8%",
    icon: Clock,
    color: "text-green-400",
  },
  {
    label: "Click Rate",
    value: "18.5%",
    change: "+5%",
    icon: MousePointer,
    color: "text-purple-400",
  },
  {
    label: "Engagement",
    value: "87%",
    change: "+15%",
    icon: TrendingUp,
    color: "text-orange-400",
  },
]

const getHeatmapColor = (attention: number) => {
  if (attention >= 90) return "rgba(239, 68, 68, 0.8)" // red-500
  if (attention >= 80) return "rgba(249, 115, 22, 0.8)" // orange-500
  if (attention >= 70) return "rgba(245, 158, 11, 0.8)" // amber-500
  if (attention >= 60) return "rgba(34, 197, 94, 0.8)" // green-500
  return "rgba(59, 130, 246, 0.8)" // blue-500
}

const getAttentionLevel = (attention: number) => {
  if (attention >= 90) return "Very High"
  if (attention >= 80) return "High"
  if (attention >= 70) return "Medium"
  if (attention >= 60) return "Low"
  return "Very Low"
}

export function HeatmapAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d")
  const [selectedSection, setSelectedSection] = useState<HeatmapData | null>(null)
  const [showEyeTracking, setShowEyeTracking] = useState(false)

  return (
    <div className="w-full space-y-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Resume Analytics</h2>
          <p className="text-gray-400">Track how recruiters interact with your resume</p>
        </div>
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={selectedTimeRange === range.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeRange(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  <Badge variant="outline" className="text-xs text-green-400">
                    {metric.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-sm text-gray-400">{metric.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume Heatmap */}
        <div className="lg:col-span-2">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Resume Heatmap</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={showEyeTracking ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowEyeTracking(!showEyeTracking)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Eye Tracking
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-white rounded-lg p-4 min-h-[500px]">
                {/* Resume Mockup */}
                <div className="relative w-full h-full">
                  <svg width="100%" height="500" className="absolute inset-0">
                    {/* Heatmap Overlays */}
                    {heatmapData.map((section, index) => (
                      <motion.rect
                        key={section.section}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: index * 0.2 }}
                        x={`${section.x}%`}
                        y={section.y}
                        width={`${section.width}%`}
                        height={section.height}
                        fill={getHeatmapColor(section.attention)}
                        rx="4"
                        className="cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setSelectedSection(section)}
                      />
                    ))}

                    {/* Eye Tracking Dots */}
                    {showEyeTracking && (
                      <>
                        {Array.from({ length: 20 }).map((_, i) => (
                          <motion.circle
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.8, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            cx={Math.random() * 80 + 10 + "%"}
                            cy={Math.random() * 120 + 20}
                            r="3"
                            fill="#3b82f6"
                            className="animate-pulse"
                          />
                        ))}
                      </>
                    )}
                  </svg>

                  {/* Resume Content Mockup */}
                  <div className="relative z-10 pointer-events-none text-gray-800 text-sm">
                    <div className="mb-4">
                      <h1 className="text-xl font-bold">John Doe</h1>
                      <p>Senior Frontend Developer</p>
                      <p>john.doe@email.com | (555) 123-4567</p>
                    </div>

                    <div className="mb-4">
                      <h2 className="font-bold mb-2">Professional Summary</h2>
                      <p className="text-xs leading-relaxed">
                        Experienced frontend developer with 5+ years of experience...
                      </p>
                    </div>

                    <div className="mb-4">
                      <h2 className="font-bold mb-2">Work Experience</h2>
                      <div className="space-y-2 text-xs">
                        <div>
                          <h3 className="font-medium">Senior Frontend Developer</h3>
                          <p>TechCorp Inc. | 2022 - Present</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Frontend Developer</h3>
                          <p>StartupXYZ | 2020 - 2022</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h2 className="font-bold mb-2">Education</h2>
                        <p className="text-xs">BS Computer Science</p>
                        <p className="text-xs">UC Berkeley</p>
                      </div>
                      <div>
                        <h2 className="font-bold mb-2">Skills</h2>
                        <p className="text-xs">React, TypeScript, Node.js</p>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-bold mb-2">Projects</h2>
                      <p className="text-xs">E-commerce Platform, Dashboard App</p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <span className="text-gray-600">Attention Level:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-gray-600">Low</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-gray-600">Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span className="text-gray-600">High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-gray-600">Very High</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Details */}
        <div className="space-y-4">
          {/* Section Performance */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Section Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {heatmapData
                .sort((a, b) => b.attention - a.attention)
                .map((section, index) => (
                  <motion.div
                    key={section.section}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedSection?.section === section.section
                        ? "bg-white/10 border border-white/20"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                    onClick={() => setSelectedSection(section)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium text-sm">{section.section}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          section.attention >= 90
                            ? "text-red-400"
                            : section.attention >= 80
                              ? "text-orange-400"
                              : section.attention >= 70
                                ? "text-yellow-400"
                                : "text-green-400"
                        }`}
                      >
                        {getAttentionLevel(section.attention)}
                      </Badge>
                    </div>
                    <Progress value={section.attention} className="h-2 mb-2" />
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
                      <div>
                        <div className="text-white font-medium">{section.timeSpent}s</div>
                        <div>Time</div>
                      </div>
                      <div>
                        <div className="text-white font-medium">{section.viewRate}%</div>
                        <div>Views</div>
                      </div>
                      <div>
                        <div className="text-white font-medium">{section.clickRate}%</div>
                        <div>Clicks</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </CardContent>
          </Card>

          {/* Optimization Tips */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5" />
                Optimization Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  tip: "Move key achievements higher in Work Experience",
                  impact: "High",
                  color: "text-red-400",
                },
                {
                  tip: "Add more quantifiable results to projects",
                  impact: "Medium",
                  color: "text-orange-400",
                },
                {
                  tip: "Consider reorganizing skills section",
                  impact: "Low",
                  color: "text-green-400",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-white text-sm">{item.tip}</p>
                    <Badge variant="outline" className={`text-xs ${item.color}`}>
                      {item.impact}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

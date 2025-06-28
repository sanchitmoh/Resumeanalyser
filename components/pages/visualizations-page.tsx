"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { SkillTree3D } from "@/components/visualizations/skill-tree-3d"
import { NetworkGraph } from "@/components/visualizations/network-graph"
import { TimelineVisualization } from "@/components/visualizations/timeline-visualization"
import { HeatmapAnalytics } from "@/components/visualizations/heatmap-analytics"
import { ParticleBackground } from "@/components/effects/particle-background"
import { TreePine, Network, TimerIcon as Timeline, BarChart3, Sparkles, TrendingUp, Eye, GitBranch } from "lucide-react"

const visualizationTabs = [
  {
    id: "skill-tree",
    label: "3D Skill Tree",
    icon: TreePine,
    description: "Interactive 3D visualization of your skill progression and dependencies",
  },
  {
    id: "network",
    label: "Network Graph",
    icon: Network,
    description: "Explore connections between skills, jobs, and companies",
  },
  {
    id: "timeline",
    label: "Career Timeline",
    icon: Timeline,
    description: "Visual journey of your career progression and milestones",
  },
  {
    id: "heatmap",
    label: "Resume Analytics",
    icon: BarChart3,
    description: "Heat map showing how recruiters interact with your resume",
  },
]

export function VisualizationsPage() {
  const [activeTab, setActiveTab] = useState("skill-tree")

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Interactive Visualizations
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore your career data through immersive, interactive visualizations that reveal insights and patterns
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Skills Tracked", value: "24", icon: Sparkles, color: "from-purple-500 to-pink-500" },
            { label: "Career Events", value: "12", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
            { label: "Connections", value: "156", icon: GitBranch, color: "from-green-500 to-emerald-500" },
            { label: "Analytics Points", value: "1.2k", icon: Eye, color: "from-orange-500 to-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 text-center"
            >
              <div
                className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Visualization Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white/5 backdrop-blur-xl border border-white/10 p-1">
              {visualizationTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400 transition-all duration-200"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Descriptions */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 mb-6"
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const tab = visualizationTabs.find((t) => t.id === activeTab)
                      return tab ? (
                        <>
                          <tab.icon className="w-5 h-5 text-purple-400" />
                          <div>
                            <h3 className="font-semibold text-white">{tab.label}</h3>
                            <p className="text-sm text-gray-400">{tab.description}</p>
                          </div>
                        </>
                      ) : null
                    })()}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Visualization Content */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <TabsContent value="skill-tree" className="mt-0">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <SkillTree3D />
                </motion.div>
              </TabsContent>

              <TabsContent value="network" className="mt-0">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <NetworkGraph />
                </motion.div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-0">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <TimelineVisualization />
                </motion.div>
              </TabsContent>

              <TabsContent value="heatmap" className="mt-0">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <HeatmapAnalytics />
                </motion.div>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text3D, Float } from "@react-three/drei"
import * as d3 from "d3"
import { gsap } from "gsap"
import { TrendingUp, BarChart3, PieChart, Activity, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { ParticleBackground } from "@/components/effects/particle-background"
import type { Mesh } from "three"

// Sample data for analytics
const analyticsData = {
  resumeViews: [
    { date: "2024-01", views: 45, applications: 12 },
    { date: "2024-02", views: 67, applications: 18 },
    { date: "2024-03", views: 89, applications: 25 },
    { date: "2024-04", views: 123, applications: 34 },
    { date: "2024-05", views: 156, applications: 42 },
    { date: "2024-06", views: 198, applications: 56 },
  ],
  skillsDistribution: [
    { skill: "JavaScript", value: 85, category: "Frontend" },
    { skill: "React", value: 80, category: "Frontend" },
    { skill: "Node.js", value: 75, category: "Backend" },
    { skill: "Python", value: 70, category: "Backend" },
    { skill: "SQL", value: 65, category: "Database" },
    { skill: "AWS", value: 60, category: "Cloud" },
    { skill: "Docker", value: 55, category: "DevOps" },
    { skill: "TypeScript", value: 78, category: "Frontend" },
  ],
  jobMatchTrends: [
    { month: "Jan", matches: 23, interviews: 5, offers: 1 },
    { month: "Feb", matches: 34, interviews: 8, offers: 2 },
    { month: "Mar", matches: 45, interviews: 12, offers: 3 },
    { month: "Apr", matches: 56, interviews: 15, offers: 4 },
    { month: "May", matches: 67, interviews: 18, offers: 5 },
    { month: "Jun", matches: 78, interviews: 22, offers: 6 },
  ],
  industryBreakdown: [
    { industry: "Technology", percentage: 45, color: "#8b5cf6" },
    { industry: "Finance", percentage: 25, color: "#3b82f6" },
    { industry: "Healthcare", percentage: 15, color: "#10b981" },
    { industry: "Education", percentage: 10, color: "#f59e0b" },
    { industry: "Other", percentage: 5, color: "#ef4444" },
  ],
}

// 3D Floating Data Visualization
function FloatingDataCube({ position, data }: { position: [number, number, number]; data: any }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, data.value / 50, 1]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.7} />
      </mesh>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.2}
        height={0.05}
        position={[position[0], position[1] + 1, position[2]]}
      >
        {data.skill}
        <meshStandardMaterial color="#ffffff" />
      </Text3D>
    </Float>
  )
}

// D3.js Line Chart Component
function D3LineChart({ data }: { data: any[] }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 40, left: 40 }
    const width = 600 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.date + "-01")) as [Date, Date])
      .range([0, width])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.views, d.applications)) as number])
      .range([height, 0])

    // Line generators
    const viewsLine = d3
      .line<any>()
      .x((d) => xScale(new Date(d.date + "-01")))
      .y((d) => yScale(d.views))
      .curve(d3.curveMonotoneX)

    const applicationsLine = d3
      .line<any>()
      .x((d) => xScale(new Date(d.date + "-01")))
      .y((d) => yScale(d.applications))
      .curve(d3.curveMonotoneX)

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")))
      .selectAll("text")
      .style("fill", "#9CA3AF")

    g.append("g").call(d3.axisLeft(yScale)).selectAll("text").style("fill", "#9CA3AF")

    // Add grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-height)
          .tickFormat(() => ""),
      )
      .selectAll("line")
      .style("stroke", "#374151")
      .style("stroke-dasharray", "3,3")

    // Add lines with animation
    const viewsPath = g
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#8b5cf6")
      .attr("stroke-width", 3)
      .attr("d", viewsLine)

    const applicationsPath = g
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 3)
      .attr("d", applicationsLine)

    // Animate lines
    const totalLength1 = viewsPath.node()?.getTotalLength() || 0
    const totalLength2 = applicationsPath.node()?.getTotalLength() || 0

    viewsPath
      .attr("stroke-dasharray", `${totalLength1} ${totalLength1}`)
      .attr("stroke-dashoffset", totalLength1)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0)

    applicationsPath
      .attr("stroke-dasharray", `${totalLength2} ${totalLength2}`)
      .attr("stroke-dashoffset", totalLength2)
      .transition()
      .duration(2000)
      .delay(500)
      .attr("stroke-dashoffset", 0)

    // Add dots
    g.selectAll(".dot-views")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot-views")
      .attr("cx", (d) => xScale(new Date(d.date + "-01")))
      .attr("cy", (d) => yScale(d.views))
      .attr("r", 0)
      .style("fill", "#8b5cf6")
      .transition()
      .duration(1000)
      .delay((d, i) => i * 200 + 2000)
      .attr("r", 4)

    g.selectAll(".dot-applications")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot-applications")
      .attr("cx", (d) => xScale(new Date(d.date + "-01")))
      .attr("cy", (d) => yScale(d.applications))
      .attr("r", 0)
      .style("fill", "#3b82f6")
      .transition()
      .duration(1000)
      .delay((d, i) => i * 200 + 2500)
      .attr("r", 4)
  }, [data])

  return <svg ref={svgRef} width="600" height="300" className="w-full h-auto" />
}

// D3.js Radial Chart Component
function D3RadialChart({ data }: { data: any[] }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const width = 400
    const height = 400
    const radius = Math.min(width, height) / 2 - 40

    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`)

    // Scales
    const angleScale = d3
      .scaleBand()
      .domain(data.map((d) => d.skill))
      .range([0, 2 * Math.PI])
      .padding(0.1)

    const radiusScale = d3.scaleLinear().domain([0, 100]).range([0, radius])

    // Add radial grid
    const gridLevels = [20, 40, 60, 80, 100]
    gridLevels.forEach((level) => {
      g.append("circle")
        .attr("r", radiusScale(level))
        .style("fill", "none")
        .style("stroke", "#374151")
        .style("stroke-dasharray", "2,2")
    })

    // Add bars
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("path")
      .attr("class", "bar")
      .attr(
        "d",
        d3
          .arc<any>()
          .innerRadius(0)
          .outerRadius(0)
          .startAngle((d) => angleScale(d.skill) || 0)
          .endAngle((d) => (angleScale(d.skill) || 0) + angleScale.bandwidth()),
      )
      .style("fill", (d, i) => d3.schemeCategory10[i])
      .transition()
      .duration(1500)
      .delay((d, i) => i * 100)
      .attr(
        "d",
        d3
          .arc<any>()
          .innerRadius(0)
          .outerRadius((d) => radiusScale(d.value))
          .startAngle((d) => angleScale(d.skill) || 0)
          .endAngle((d) => (angleScale(d.skill) || 0) + angleScale.bandwidth()),
      )

    // Add labels
    g.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("transform", (d) => {
        const angle = (angleScale(d.skill) || 0) + angleScale.bandwidth() / 2
        const r = radiusScale(d.value) + 10
        return `rotate(${(angle * 180) / Math.PI - 90}) translate(${r},0) ${angle > Math.PI ? "rotate(180)" : ""}`
      })
      .style("text-anchor", (d) => {
        const angle = (angleScale(d.skill) || 0) + angleScale.bandwidth() / 2
        return angle > Math.PI ? "end" : "start"
      })
      .style("fill", "#9CA3AF")
      .style("font-size", "12px")
      .text((d) => d.skill)
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .delay(2000)
      .style("opacity", 1)
  }, [data])

  return <svg ref={svgRef} width="400" height="400" className="w-full h-auto" />
}

// GSAP Animated Counter
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    gsap.to(countRef, {
      current: value,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        setCount(Math.floor(countRef.current))
      },
    })
  }, [value, duration])

  return <span>{count}</span>
}

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m")
  const [selectedMetric, setSelectedMetric] = useState("views")

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
            <h1 className="text-2xl font-bold gradient-text">Analytics</h1>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
            >
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              icon: TrendingUp,
              label: "Profile Views",
              value: 1247,
              change: "+23%",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: BarChart3,
              label: "Job Applications",
              value: 89,
              change: "+15%",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: PieChart,
              label: "Interview Invites",
              value: 34,
              change: "+45%",
              color: "from-purple-500 to-pink-500",
            },
            { icon: Activity, label: "Skill Score", value: 85, change: "+8%", color: "from-orange-500 to-red-500" },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.color}`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-semibold">{metric.change}</span>
              </div>
              <div className="text-3xl font-bold mb-1">
                <AnimatedCounter value={metric.value} />
              </div>
              <h3 className="text-gray-400 font-medium">{metric.label}</h3>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* D3.js Line Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Resume Performance</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <span>Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span>Applications</span>
                </div>
              </div>
            </div>
            <D3LineChart data={analyticsData.resumeViews} />
          </motion.div>

          {/* D3.js Radial Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold mb-6">Skills Distribution</h3>
            <div className="flex justify-center">
              <D3RadialChart data={analyticsData.skillsDistribution} />
            </div>
          </motion.div>
        </div>

        {/* 3D Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 mb-8"
        >
          <h3 className="text-xl font-bold mb-6">3D Skills Visualization</h3>
          <div className="h-96 rounded-lg overflow-hidden">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />

              {analyticsData.skillsDistribution.map((skill, index) => (
                <FloatingDataCube
                  key={skill.skill}
                  position={[((index % 4) - 1.5) * 2, Math.floor(index / 4) * 2 - 1, 0]}
                  data={skill}
                />
              ))}
            </Canvas>
          </div>
        </motion.div>

        {/* Industry Breakdown & Job Match Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Industry Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold mb-6">Industry Breakdown</h3>
            <div className="space-y-4">
              {analyticsData.industryBreakdown.map((industry, index) => (
                <motion.div
                  key={industry.industry}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: industry.color }} />
                    <span>{industry.industry}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-white/10 rounded-full h-2">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: industry.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${industry.percentage}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-8">{industry.percentage}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Job Match Trends */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold mb-6">Job Match Trends</h3>
            <div className="space-y-6">
              {analyticsData.jobMatchTrends.slice(-3).map((trend, index) => (
                <motion.div
                  key={trend.month}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{trend.month}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-blue-400">{trend.matches} matches</span>
                      <span className="text-green-400">{trend.interviews} interviews</span>
                      <span className="text-purple-400">{trend.offers} offers</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                        <motion.div
                          className="h-full bg-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(trend.matches / 100) * 100}%` }}
                          transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">Matches</span>
                    </div>

                    <div className="text-center">
                      <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                        <motion.div
                          className="h-full bg-green-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(trend.interviews / 30) * 100}%` }}
                          transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">Interviews</span>
                    </div>

                    <div className="text-center">
                      <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                        <motion.div
                          className="h-full bg-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(trend.offers / 10) * 100}%` }}
                          transition={{ delay: 1.1 + index * 0.1, duration: 0.6 }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">Offers</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

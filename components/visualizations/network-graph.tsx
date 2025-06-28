"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, DollarSign, TrendingUp } from "lucide-react"

interface NetworkNode {
  id: string
  name: string
  type: "skill" | "job" | "company"
  category?: string
  salary?: number
  demand?: number
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface NetworkLink {
  source: string | NetworkNode
  target: string | NetworkNode
  type: "requires" | "leads_to" | "works_at"
  strength: number
}

const networkData: { nodes: NetworkNode[]; links: NetworkLink[] } = {
  nodes: [
    // Skills
    { id: "react", name: "React", type: "skill", category: "Frontend" },
    { id: "javascript", name: "JavaScript", type: "skill", category: "Frontend" },
    { id: "nodejs", name: "Node.js", type: "skill", category: "Backend" },
    { id: "python", name: "Python", type: "skill", category: "Backend" },
    { id: "aws", name: "AWS", type: "skill", category: "Cloud" },
    { id: "docker", name: "Docker", type: "skill", category: "DevOps" },

    // Jobs
    { id: "frontend-dev", name: "Frontend Developer", type: "job", salary: 85000, demand: 85 },
    { id: "fullstack-dev", name: "Fullstack Developer", type: "job", salary: 95000, demand: 90 },
    { id: "backend-dev", name: "Backend Developer", type: "job", salary: 90000, demand: 80 },
    { id: "devops-eng", name: "DevOps Engineer", type: "job", salary: 110000, demand: 95 },

    // Companies
    { id: "google", name: "Google", type: "company" },
    { id: "microsoft", name: "Microsoft", type: "company" },
    { id: "amazon", name: "Amazon", type: "company" },
    { id: "netflix", name: "Netflix", type: "company" },
  ],
  links: [
    // Skill requirements
    { source: "javascript", target: "react", type: "requires", strength: 0.8 },
    { source: "react", target: "frontend-dev", type: "leads_to", strength: 0.9 },
    { source: "javascript", target: "frontend-dev", type: "leads_to", strength: 0.8 },
    { source: "nodejs", target: "backend-dev", type: "leads_to", strength: 0.9 },
    { source: "python", target: "backend-dev", type: "leads_to", strength: 0.7 },
    { source: "react", target: "fullstack-dev", type: "leads_to", strength: 0.8 },
    { source: "nodejs", target: "fullstack-dev", type: "leads_to", strength: 0.8 },
    { source: "aws", target: "devops-eng", type: "leads_to", strength: 0.9 },
    { source: "docker", target: "devops-eng", type: "leads_to", strength: 0.8 },

    // Company connections
    { source: "frontend-dev", target: "google", type: "works_at", strength: 0.6 },
    { source: "fullstack-dev", target: "microsoft", type: "works_at", strength: 0.7 },
    { source: "backend-dev", target: "amazon", type: "works_at", strength: 0.8 },
    { source: "devops-eng", target: "netflix", type: "works_at", strength: 0.9 },
  ],
}

export function NetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const width = 800
    const height = 600

    const simulation = d3
      .forceSimulation(networkData.nodes as d3.SimulationNodeDatum[])
      .force(
        "link",
        d3
          .forceLink(networkData.links)
          .id((d: any) => d.id)
          .distance(100),
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))

    const link = svg
      .append("g")
      .selectAll("line")
      .data(networkData.links)
      .enter()
      .append("line")
      .attr("stroke", (d) => {
        switch (d.type) {
          case "requires":
            return "#ef4444"
          case "leads_to":
            return "#22c55e"
          case "works_at":
            return "#3b82f6"
          default:
            return "#6b7280"
        }
      })
      .attr("stroke-width", (d) => d.strength * 3)
      .attr("stroke-opacity", 0.6)

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(networkData.nodes)
      .enter()
      .append("circle")
      .attr("r", (d) => {
        switch (d.type) {
          case "skill":
            return 8
          case "job":
            return 12
          case "company":
            return 15
          default:
            return 8
        }
      })
      .attr("fill", (d) => {
        switch (d.type) {
          case "skill":
            return "#8b5cf6"
          case "job":
            return "#06b6d4"
          case "company":
            return "#f59e0b"
          default:
            return "#6b7280"
        }
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .call(
        d3
          .drag<SVGCircleElement, NetworkNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
          })
          .on("drag", (event, d) => {
            d.fx = event.x
            d.fy = event.y
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
          }),
      )
      .on("click", (event, d) => {
        setSelectedNode(d)
      })

    const label = svg
      .append("g")
      .selectAll("text")
      .data(networkData.nodes)
      .enter()
      .append("text")
      .text((d) => d.name)
      .attr("font-size", 10)
      .attr("fill", "#fff")
      .attr("text-anchor", "middle")
      .attr("dy", 25)
      .style("pointer-events", "none")

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)

      label.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)
    })
  }, [])

  const getNodeTypeColor = (type: string) => {
    switch (type) {
      case "skill":
        return "bg-purple-500"
      case "job":
        return "bg-cyan-500"
      case "company":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/20 text-white"
          />
        </div>
        <div className="flex gap-2">
          {["all", "skill", "job", "company"].map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(type)}
              className="capitalize"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span>Skills</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
          <span>Jobs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span>Companies</span>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Network Graph */}
        <div className="flex-1 bg-black/20 rounded-xl border border-white/10 overflow-hidden">
          <svg ref={svgRef} width="800" height="600" className="w-full h-full" />
        </div>

        {/* Node Details Panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="w-80"
            >
              <Card className="bg-black/80 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <div className={`w-3 h-3 rounded-full ${getNodeTypeColor(selectedNode.type)}`}></div>
                    {selectedNode.name}
                    <Badge variant="outline" className="ml-auto capitalize">
                      {selectedNode.type}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedNode.type === "job" && (
                    <>
                      <div className="flex items-center gap-2 text-green-400">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium">${selectedNode.salary?.toLocaleString()}/year</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-400">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-medium">{selectedNode.demand}% demand</span>
                      </div>
                    </>
                  )}

                  {selectedNode.category && (
                    <div>
                      <span className="text-gray-400 text-sm">Category: </span>
                      <Badge variant="secondary">{selectedNode.category}</Badge>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Connections:</h4>
                    <div className="space-y-1 text-sm">
                      {networkData.links
                        .filter(
                          (link) =>
                            (typeof link.source === "string" ? link.source : link.source.id) === selectedNode.id ||
                            (typeof link.target === "string" ? link.target : link.target.id) === selectedNode.id,
                        )
                        .map((link, index) => {
                          const isSource =
                            (typeof link.source === "string" ? link.source : link.source.id) === selectedNode.id
                          const connectedNodeId = isSource
                            ? typeof link.target === "string"
                              ? link.target
                              : link.target.id
                            : typeof link.source === "string"
                              ? link.source
                              : link.source.id
                          const connectedNode = networkData.nodes.find((n) => n.id === connectedNodeId)

                          return (
                            <div key={index} className="flex items-center gap-2">
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  link.type === "requires"
                                    ? "bg-red-500/20 text-red-300"
                                    : link.type === "leads_to"
                                      ? "bg-green-500/20 text-green-300"
                                      : "bg-blue-500/20 text-blue-300"
                                }`}
                              >
                                {link.type.replace("_", " ")}
                              </span>
                              <span className="text-gray-300">{connectedNode?.name}</span>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

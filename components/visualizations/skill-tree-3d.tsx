"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Sphere, Line } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import type * as THREE from "three"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, Lock, CheckCircle } from "lucide-react"

interface SkillNode {
  id: string
  name: string
  category: string
  level: number
  maxLevel: number
  position: [number, number, number]
  prerequisites: string[]
  unlocked: boolean
  description: string
  color: string
}

const skillsData: SkillNode[] = [
  {
    id: "html",
    name: "HTML",
    category: "Frontend",
    level: 5,
    maxLevel: 5,
    position: [0, 0, 0],
    prerequisites: [],
    unlocked: true,
    description: "Markup language for web pages",
    color: "#e34c26",
  },
  {
    id: "css",
    name: "CSS",
    category: "Frontend",
    level: 4,
    maxLevel: 5,
    position: [2, 1, 0],
    prerequisites: ["html"],
    unlocked: true,
    description: "Styling language for web pages",
    color: "#1572b6",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Frontend",
    level: 4,
    maxLevel: 5,
    position: [0, 2, 0],
    prerequisites: ["html"],
    unlocked: true,
    description: "Programming language for web development",
    color: "#f7df1e",
  },
  {
    id: "react",
    name: "React",
    category: "Frontend",
    level: 3,
    maxLevel: 5,
    position: [-2, 3, 0],
    prerequisites: ["javascript"],
    unlocked: true,
    description: "JavaScript library for building user interfaces",
    color: "#61dafb",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    level: 3,
    maxLevel: 5,
    position: [2, 3, 0],
    prerequisites: ["javascript"],
    unlocked: true,
    description: "JavaScript runtime for server-side development",
    color: "#339933",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    level: 2,
    maxLevel: 5,
    position: [0, 4, 0],
    prerequisites: ["javascript"],
    unlocked: false,
    description: "Typed superset of JavaScript",
    color: "#3178c6",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    level: 1,
    maxLevel: 5,
    position: [-2, 5, 0],
    prerequisites: ["react", "nodejs"],
    unlocked: false,
    description: "React framework for production",
    color: "#000000",
  },
]

function SkillNodeComponent({
  skill,
  onClick,
  isSelected,
}: {
  skill: SkillNode
  onClick: (skill: SkillNode) => void
  isSelected: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      if (hovered) {
        meshRef.current.scale.setScalar(1.2)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  const getNodeColor = () => {
    if (!skill.unlocked) return "#666666"
    if (isSelected) return "#ffffff"
    return skill.color
  }

  return (
    <group position={skill.position}>
      <Sphere
        ref={meshRef}
        args={[0.3, 16, 16]}
        onClick={() => onClick(skill)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={getNodeColor()}
          emissive={skill.unlocked ? skill.color : "#333333"}
          emissiveIntensity={0.2}
        />
      </Sphere>
      <Text position={[0, -0.6, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
        {skill.name}
      </Text>
      {skill.unlocked && (
        <Text position={[0, 0.6, 0]} fontSize={0.15} color="#4ade80" anchorX="center" anchorY="middle">
          {skill.level}/{skill.maxLevel}
        </Text>
      )}
    </group>
  )
}

function ConnectionLines() {
  return (
    <>
      {skillsData.map((skill) =>
        skill.prerequisites.map((prereqId) => {
          const prereq = skillsData.find((s) => s.id === prereqId)
          if (!prereq) return null

          return (
            <Line
              key={`${prereqId}-${skill.id}`}
              points={[prereq.position, skill.position]}
              color={skill.unlocked ? "#4ade80" : "#666666"}
              lineWidth={2}
            />
          )
        }),
      )}
    </>
  )
}

export function SkillTree3D() {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null)

  return (
    <div className="w-full h-[600px] relative">
      <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ConnectionLines />
        {skillsData.map((skill) => (
          <SkillNodeComponent
            key={skill.id}
            skill={skill}
            onClick={setSelectedSkill}
            isSelected={selectedSkill?.id === skill.id}
          />
        ))}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>

      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-4 right-4 w-80"
          >
            <Card className="bg-black/80 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  {selectedSkill.unlocked ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-500" />
                  )}
                  {selectedSkill.name}
                  <Badge variant="outline" className="ml-auto">
                    {selectedSkill.category}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">{selectedSkill.description}</p>

                {selectedSkill.unlocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">
                        {selectedSkill.level}/{selectedSkill.maxLevel}
                      </span>
                    </div>
                    <Progress value={(selectedSkill.level / selectedSkill.maxLevel) * 100} className="h-2" />
                    <div className="flex gap-1">
                      {Array.from({ length: selectedSkill.maxLevel }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < selectedSkill.level ? "text-yellow-500 fill-yellow-500" : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {selectedSkill.prerequisites.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Prerequisites:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedSkill.prerequisites.map((prereqId) => {
                        const prereq = skillsData.find((s) => s.id === prereqId)
                        return (
                          <Badge key={prereqId} variant="secondary" className="text-xs">
                            {prereq?.name}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

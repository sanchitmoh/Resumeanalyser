"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"
import { Float, Sphere, Box } from "@react-three/drei"

function FloatingCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Box ref={meshRef} position={position} args={[0.5, 0.5, 0.5]}>
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.6} wireframe />
      </Box>
    </Float>
  )
}

function FloatingSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} position={position} args={[0.3, 32, 32]}>
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.4} wireframe />
      </Sphere>
    </Float>
  )
}

export function ThreeScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <FloatingCube position={[-2, 1, 0]} />
      <FloatingCube position={[2, -1, -1]} />
      <FloatingCube position={[0, 2, -2]} />

      <FloatingSphere position={[-1, -2, 1]} />
      <FloatingSphere position={[3, 0, 0]} />
      <FloatingSphere position={[-3, 1, -1]} />
    </>
  )
}

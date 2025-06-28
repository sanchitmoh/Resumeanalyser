import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AnimationProvider } from "@/components/providers/animation-provider"
import { SoundProvider } from "@/components/providers/sound-provider"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { SoundControls } from "@/components/ui/sound-controls"

export const metadata: Metadata = {
  title: "AI Resume Analyzer - Transform Your Career",
  description: "Advanced AI-powered resume analysis and job matching platform with stunning 3D animations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans overflow-x-hidden antialiased">
        <SoundProvider>
          <AnimationProvider>
            <CustomCursor />
            <SoundControls />
            {children}
          </AnimationProvider>
        </SoundProvider>
      </body>
    </html>
  )
}

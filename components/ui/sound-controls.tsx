"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Settings } from "lucide-react"
import { useSound } from "@/components/providers/sound-provider"

export function SoundControls() {
  const { volume, isMuted, setVolume, toggleMute, playSound } = useSound()
  const [isOpen, setIsOpen] = useState(false)

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    playSound("hover", newVolume)
  }

  const handleToggleMute = () => {
    toggleMute()
    playSound("click")
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative">
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen)
            playSound("click")
          }}
          onHoverStart={() => playSound("hover")}
          className="p-3 bg-black/20 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-5 h-5" />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="absolute top-full right-0 mt-2 p-4 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 min-w-[200px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">Sound</span>
                  <motion.button
                    onClick={handleToggleMute}
                    onHoverStart={() => playSound("hover")}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-red-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" />
                    )}
                  </motion.button>
                </div>

                <div className="space-y-2">
                  <label className="text-white/70 text-xs">Volume</label>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      disabled={isMuted}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div
                      className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg pointer-events-none transition-all duration-300"
                      style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                    />
                  </div>
                  <div className="text-white/50 text-xs text-center">
                    {isMuted ? "Muted" : `${Math.round(volume * 100)}%`}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}

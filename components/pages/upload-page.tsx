"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ParticleBackground } from "@/components/effects/particle-background"

interface UploadedFile {
  file: File
  status: "uploading" | "success" | "error"
  progress: number
  id: string
}

export function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const id = Math.random().toString(36).substr(2, 9)
      const newFile: UploadedFile = {
        file,
        status: "uploading",
        progress: 0,
        id,
      }

      setUploadedFiles((prev) => [...prev, newFile])

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) => {
            if (f.id === id) {
              const newProgress = f.progress + Math.random() * 20
              if (newProgress >= 100) {
                clearInterval(interval)
                return { ...f, progress: 100, status: "success" }
              }
              return { ...f, progress: newProgress }
            }
            return f
          }),
        )
      }, 200)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 5,
  })

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6 z-20"
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
      </motion.div>

      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Upload Your Resume</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Upload your resume to get AI-powered analysis and job matching recommendations
            </p>
          </motion.div>

          {/* Upload Zone */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragActive
                  ? "border-purple-400 bg-purple-400/10 scale-105"
                  : "border-white/20 hover:border-purple-400/50 hover:bg-white/5"
              }`}
            >
              <input {...getInputProps()} />

              <motion.div
                animate={{
                  y: isDragActive ? -10 : 0,
                  scale: isDragActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="mb-6"
              >
                <Upload className="w-16 h-16 mx-auto text-purple-400 mb-4" />
              </motion.div>

              <h3 className="text-2xl font-semibold mb-2">
                {isDragActive ? "Drop your files here" : "Drag & drop your resume"}
              </h3>
              <p className="text-gray-400 mb-4">or click to browse files</p>
              <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX files up to 10MB</p>

              {isDragActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl"
                />
              )}
            </div>
          </motion.div>

          {/* Uploaded Files */}
          <AnimatePresence>
            {uploadedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Uploaded Files
                </h3>

                <div className="space-y-4">
                  {uploadedFiles.map((uploadedFile) => (
                    <motion.div
                      key={uploadedFile.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex-shrink-0">
                          {uploadedFile.status === "success" ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : uploadedFile.status === "error" ? (
                            <XCircle className="w-6 h-6 text-red-500" />
                          ) : (
                            <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{uploadedFile.file.name}</p>
                          <p className="text-sm text-gray-400">
                            {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {uploadedFile.status === "uploading" && (
                          <div className="w-32">
                            <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${uploadedFile.progress}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{Math.round(uploadedFile.progress)}%</p>
                          </div>
                        )}

                        <button
                          onClick={() => removeFile(uploadedFile.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {uploadedFiles.some((f) => f.status === "success") && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center"
                  >
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:scale-105"
                    >
                      View Analysis
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        →
                      </motion.div>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

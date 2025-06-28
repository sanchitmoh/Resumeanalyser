"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bookmark,
  MapPin,
  Clock,
  DollarSign,
  Building,
  ArrowLeft,
  ExternalLink,
  Trash2,
  Search,
  Filter,
  Calendar,
  Users,
  Heart,
  BookmarkX,
} from "lucide-react"
import Link from "next/link"
import { ParticleBackground } from "@/components/effects/particle-background"

// This would typically come from a global state management solution
// For now, we'll use localStorage to persist bookmarks
interface BookmarkedJob {
  id: number
  title: string
  company: string
  location: string
  type: string
  salary: string
  match: number
  logo: string
  skills: string[]
  posted: string
  applicants: number
  description: string
  requirements: string[]
  benefits: string[]
  bookmarkedAt: string
}

export function BookmarksPage() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<BookmarkedJob[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "match" | "company">("newest")
  const [selectedJob, setSelectedJob] = useState<number | null>(null)

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedJobs")
    if (savedBookmarks) {
      setBookmarkedJobs(JSON.parse(savedBookmarks))
    }
  }, [])

  // Save bookmarks to localStorage whenever bookmarkedJobs changes
  useEffect(() => {
    localStorage.setItem("bookmarkedJobs", JSON.stringify(bookmarkedJobs))
  }, [bookmarkedJobs])

  const removeBookmark = (jobId: number) => {
    setBookmarkedJobs((prev) => prev.filter((job) => job.id !== jobId))
    if (selectedJob === jobId) {
      setSelectedJob(null)
    }
  }

  const clearAllBookmarks = () => {
    setBookmarkedJobs([])
    setSelectedJob(null)
  }

  const filteredJobs = bookmarkedJobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime()
        case "oldest":
          return new Date(a.bookmarkedAt).getTime() - new Date(b.bookmarkedAt).getTime()
        case "match":
          return b.match - a.match
        case "company":
          return a.company.localeCompare(b.company)
        default:
          return 0
      }
    })

  const getMatchColor = (match: number) => {
    if (match >= 90) return "text-green-400"
    if (match >= 80) return "text-blue-400"
    if (match >= 70) return "text-yellow-400"
    return "text-gray-400"
  }

  const getMatchBg = (match: number) => {
    if (match >= 90) return "bg-green-500/20 border-green-500/30"
    if (match >= 80) return "bg-blue-500/20 border-blue-500/30"
    if (match >= 70) return "bg-yellow-500/20 border-yellow-500/30"
    return "bg-gray-500/20 border-gray-500/30"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link
                href="/job-matching"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Jobs
              </Link>
              <div className="w-px h-6 bg-white/20" />
              <h1 className="text-2xl font-bold gradient-text flex items-center gap-2">
                <Bookmark className="w-6 h-6" />
                Bookmarked Jobs
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} saved
              </span>
              {bookmarkedJobs.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearAllBookmarks}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-all duration-200 text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </motion.button>
              )}
            </div>
          </div>

          {/* Search and Filter */}
          {bookmarkedJobs.length > 0 && (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookmarked jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none transition-all duration-200"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="match">Best Match</option>
                  <option value="company">Company A-Z</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {bookmarkedJobs.length === 0 ? (
          // Empty State
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="mb-8"
            >
              <BookmarkX className="w-24 h-24 text-gray-600 mx-auto" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-400 mb-4">No Bookmarked Jobs Yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start exploring job opportunities and bookmark the ones you're interested in to see them here.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/job-matching"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                <Search className="w-5 h-5" />
                Browse Jobs
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Jobs List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 bg-white/5 backdrop-blur-xl rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedJob === job.id
                        ? "border-purple-500/50 bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                    onClick={() => setSelectedJob(job.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-3xl">{job.logo}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                          <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <span className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {job.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {job.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-full border text-sm font-semibold ${getMatchBg(job.match)}`}>
                          <span className={getMatchColor(job.match)}>{job.match}% match</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            removeBookmark(job.id)
                          }}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-400/20 transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Posted {job.posted}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.applicants} applicants
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        Saved {formatDate(job.bookmarkedAt)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">{job.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-sm text-gray-500">Click to view details</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                      >
                        Apply Now
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredJobs.length === 0 && searchTerm && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No jobs found</h3>
                  <p className="text-gray-500">Try adjusting your search terms</p>
                </motion.div>
              )}
            </div>

            {/* Job Details Sidebar */}
            <div className="lg:col-span-1">
              <AnimatePresence mode="wait">
                {selectedJob ? (
                  <motion.div
                    key={selectedJob}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="sticky top-6 bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
                  >
                    {(() => {
                      const job = filteredJobs.find((j) => j.id === selectedJob)!
                      return (
                        <>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="text-2xl">{job.logo}</div>
                            <div>
                              <h3 className="font-semibold">{job.title}</h3>
                              <p className="text-gray-400 text-sm">{job.company}</p>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold mb-3">Requirements</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3">Benefits</h4>
                              <ul className="space-y-2">
                                {job.benefits.map((benefit, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3">Bookmark Info</h4>
                              <div className="space-y-2 text-sm text-gray-400">
                                <p>Saved on: {formatDate(job.bookmarkedAt)}</p>
                                <p>Match Score: {job.match}%</p>
                              </div>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                            >
                              Apply for this Position
                            </motion.button>
                          </div>
                        </>
                      )
                    })()}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="sticky top-6 bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 text-center"
                  >
                    <div className="text-4xl mb-4">📋</div>
                    <h3 className="font-semibold mb-2">Select a Job</h3>
                    <p className="text-gray-400 text-sm">Click on any bookmarked job to view detailed information.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

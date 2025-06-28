"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Star,
  ArrowLeft,
  Bookmark,
  ExternalLink,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { ParticleBackground } from "@/components/effects/particle-background"

const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    match: 95,
    logo: "🚀",
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    posted: "2 days ago",
    applicants: 45,
    description: "We're looking for a senior frontend developer to join our growing team...",
    requirements: ["5+ years React experience", "TypeScript proficiency", "Team leadership"],
    benefits: ["Health insurance", "401k matching", "Remote work", "Stock options"],
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
    match: 88,
    logo: "⚡",
    skills: ["React", "Node.js", "Python", "AWS"],
    posted: "1 week ago",
    applicants: 23,
    description: "Join our fast-paced startup environment...",
    requirements: ["3+ years full-stack experience", "Cloud platform knowledge"],
    benefits: ["Equity", "Flexible hours", "Learning budget"],
  },
  {
    id: 3,
    title: "React Developer",
    company: "Digital Agency",
    location: "Remote",
    type: "Contract",
    salary: "$80 - $120/hr",
    match: 82,
    logo: "🎨",
    skills: ["React", "JavaScript", "CSS", "Figma"],
    posted: "3 days ago",
    applicants: 67,
    description: "Work on exciting client projects...",
    requirements: ["Strong React skills", "Design collaboration"],
    benefits: ["Remote work", "Flexible schedule", "Project variety"],
  },
  {
    id: 4,
    title: "Frontend Team Lead",
    company: "Enterprise Corp",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$140k - $180k",
    match: 78,
    logo: "🏢",
    skills: ["React", "Vue.js", "Leadership", "Architecture"],
    posted: "5 days ago",
    applicants: 34,
    description: "Lead a team of talented frontend developers...",
    requirements: ["7+ years experience", "Team management", "Technical leadership"],
    benefits: ["Leadership training", "Conference budget", "Mentorship program"],
  },
  {
    id: 5,
    title: "JavaScript Developer",
    company: "Innovation Labs",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$90k - $130k",
    match: 75,
    logo: "🔬",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    posted: "1 week ago",
    applicants: 56,
    description: "Work on cutting-edge web applications...",
    requirements: ["Strong JavaScript fundamentals", "Database experience"],
    benefits: ["Innovation time", "Tech talks", "Open source contributions"],
  },
]

const filters = {
  location: ["Remote", "San Francisco", "New York", "Austin", "Seattle", "Los Angeles"],
  type: ["Full-time", "Part-time", "Contract", "Internship"],
  experience: ["Entry Level", "Mid Level", "Senior Level", "Lead/Principal"],
  salary: ["$50k-$80k", "$80k-$120k", "$120k-$160k", "$160k+"],
}

export function JobMatchingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [showFilters, setShowFilters] = useState(false)
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  // Load saved jobs from localStorage on component mount
  useEffect(() => {
    const bookmarkedJobs = localStorage.getItem("bookmarkedJobs")
    if (bookmarkedJobs) {
      const parsed = JSON.parse(bookmarkedJobs)
      setSavedJobs(parsed.map((job: any) => job.id))
    }
  }, [])

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category]?.includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...(prev[category] || []), value],
    }))
  }

  const toggleSaveJob = (jobId: number) => {
    const job = jobsData.find((j) => j.id === jobId)
    if (!job) return

    const bookmarkedJobs = JSON.parse(localStorage.getItem("bookmarkedJobs") || "[]")

    if (savedJobs.includes(jobId)) {
      // Remove from bookmarks
      const updatedBookmarks = bookmarkedJobs.filter((j: any) => j.id !== jobId)
      localStorage.setItem("bookmarkedJobs", JSON.stringify(updatedBookmarks))
      setSavedJobs((prev) => prev.filter((id) => id !== jobId))
    } else {
      // Add to bookmarks
      const bookmarkedJob = {
        ...job,
        bookmarkedAt: new Date().toISOString(),
      }
      const updatedBookmarks = [...bookmarkedJobs, bookmarkedJob]
      localStorage.setItem("bookmarkedJobs", JSON.stringify(updatedBookmarks))
      setSavedJobs((prev) => [...prev, jobId])
    }
  }

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
                href="/dashboard"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Dashboard
              </Link>
              <div className="w-px h-6 bg-white/20" />
              <h1 className="text-2xl font-bold gradient-text">Job Matching</h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/bookmarks"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200"
              >
                <Bookmark className="w-4 h-4" />
                Bookmarks ({savedJobs.length})
              </Link>
              <span className="text-sm text-gray-400">{jobsData.length} jobs found</span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none transition-all duration-200"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              <Filter className="w-5 h-5" />
              Filters
            </motion.button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {Object.entries(filters).map(([category, options]) => (
                    <div key={category}>
                      <h4 className="font-semibold mb-2 capitalize">{category}</h4>
                      <div className="space-y-2">
                        {options.map((option) => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters[category]?.includes(option) || false}
                              onChange={() => toggleFilter(category, option)}
                              className="rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jobs List */}
          <div className="lg:col-span-2 space-y-4">
            {jobsData.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 bg-white/5 backdrop-blur-xl rounded-xl border cursor-pointer transition-all duration-200 ${
                  selectedJob === job.id ? "border-purple-500/50 bg-white/10" : "border-white/10 hover:border-white/20"
                }`}
                onClick={() => setSelectedJob(job.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{job.logo}</div>
                    <div>
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
                        toggleSaveJob(job.id)
                      }}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        savedJobs.includes(job.id)
                          ? "text-yellow-400 bg-yellow-400/20"
                          : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/20"
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
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
                    {job.posted}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {job.applicants} applicants
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

                <p className="text-gray-400 text-sm line-clamp-2">{job.description}</p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${getMatchColor(job.match)}`} />
                    <span className="text-sm text-gray-400">Strong match for your profile</span>
                  </div>
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
                    const job = jobsData.find((j) => j.id === selectedJob)!
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
                                  <Star className="w-3 h-3 text-yellow-400 mt-1 flex-shrink-0" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Skills Match</h4>
                            <div className="space-y-2">
                              {job.skills.map((skill) => (
                                <div key={skill} className="flex items-center justify-between">
                                  <span className="text-sm">{skill}</span>
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 bg-white/10 rounded-full h-2">
                                      <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                        style={{ width: `${Math.random() * 40 + 60}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-gray-400">
                                      {Math.floor(Math.random() * 40 + 60)}%
                                    </span>
                                  </div>
                                </div>
                              ))}
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
                  <div className="text-4xl mb-4">👋</div>
                  <h3 className="font-semibold mb-2">Select a Job</h3>
                  <p className="text-gray-400 text-sm">
                    Click on any job card to view detailed information and requirements.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

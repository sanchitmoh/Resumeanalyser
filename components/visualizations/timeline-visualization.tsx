"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, TrendingUp, Award, Users, Briefcase, GraduationCap, Star } from "lucide-react"

interface TimelineEvent {
  id: string
  date: string
  title: string
  company: string
  location: string
  type: "job" | "education" | "achievement" | "project"
  description: string
  skills: string[]
  salary?: number
  impact?: string
  duration: string
  achievements: string[]
}

const timelineData: TimelineEvent[] = [
  {
    id: "1",
    date: "2024-01",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "job",
    description: "Leading frontend development team and architecting scalable React applications",
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    salary: 120000,
    impact: "Increased user engagement by 40%",
    duration: "Present",
    achievements: ["Led team of 5 developers", "Reduced load time by 60%", "Implemented design system"],
  },
  {
    id: "2",
    date: "2022-06",
    title: "Frontend Developer",
    company: "StartupXYZ",
    location: "Austin, TX",
    type: "job",
    description: "Developed responsive web applications and improved user experience",
    skills: ["React", "JavaScript", "CSS", "Node.js"],
    salary: 85000,
    impact: "Improved conversion rate by 25%",
    duration: "1.5 years",
    achievements: ["Built 3 major features", "Mentored 2 junior developers", "Optimized performance"],
  },
  {
    id: "3",
    date: "2021-05",
    title: "Computer Science Degree",
    company: "University of California",
    location: "Berkeley, CA",
    type: "education",
    description: "Bachelor's degree in Computer Science with focus on web technologies",
    skills: ["Algorithms", "Data Structures", "Software Engineering"],
    duration: "4 years",
    achievements: ["Graduated Magna Cum Laude", "Dean's List 6 semesters", "CS Club President"],
  },
  {
    id: "4",
    date: "2020-12",
    title: "AWS Certified Developer",
    company: "Amazon Web Services",
    location: "Online",
    type: "achievement",
    description: "Achieved AWS Certified Developer - Associate certification",
    skills: ["AWS", "Cloud Computing", "Lambda", "DynamoDB"],
    duration: "Certification",
    achievements: ["Passed with 850/1000 score", "Specialized in serverless", "Cloud architecture expertise"],
  },
]

const careerMetrics = {
  totalExperience: "3.5 years",
  skillsLearned: 15,
  projectsCompleted: 12,
  salaryGrowth: 85,
  achievements: 8,
}

function TimelineEventCard({ event, index }: { event: TimelineEvent; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const isLeft = index % 2 === 0

  const getIcon = () => {
    switch (event.type) {
      case "job":
        return <Briefcase className="w-5 h-5" />
      case "education":
        return <GraduationCap className="w-5 h-5" />
      case "achievement":
        return <Award className="w-5 h-5" />
      case "project":
        return <Star className="w-5 h-5" />
      default:
        return <Calendar className="w-5 h-5" />
    }
  }

  const getTypeColor = () => {
    switch (event.type) {
      case "job":
        return "from-blue-500 to-cyan-500"
      case "education":
        return "from-green-500 to-emerald-500"
      case "achievement":
        return "from-purple-500 to-pink-500"
      case "project":
        return "from-orange-500 to-red-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Content Card */}
      <div className="flex-1 max-w-md">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                <p className="text-gray-300 font-medium">{event.company}</p>
                <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
              </div>
              <Badge variant="outline" className="capitalize">
                {event.type}
              </Badge>
            </div>

            <p className="text-gray-300 text-sm mb-4">{event.description}</p>

            {/* Skills */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Skills:</h4>
              <div className="flex flex-wrap gap-1">
                {event.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{event.duration}</div>
                <div className="text-xs text-gray-400">Duration</div>
              </div>
              {event.salary && (
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">${(event.salary / 1000).toFixed(0)}k</div>
                  <div className="text-xs text-gray-400">Salary</div>
                </div>
              )}
            </div>

            {/* Impact */}
            {event.impact && (
              <div className="mb-4">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  {event.impact}
                </div>
              </div>
            )}

            {/* Achievements */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Key Achievements:</h4>
              <ul className="space-y-1">
                {event.achievements.map((achievement, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Node */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
          className={`w-12 h-12 rounded-full bg-gradient-to-r ${getTypeColor()} flex items-center justify-center text-white shadow-lg`}
        >
          {getIcon()}
        </motion.div>
        <div className="text-xs text-gray-400 mt-2 text-center whitespace-nowrap">
          {new Date(event.date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 max-w-md"></div>
    </motion.div>
  )
}

export function TimelineVisualization() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / maxScroll) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full space-y-8">
      {/* Career Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Experience", value: careerMetrics.totalExperience, icon: Briefcase },
          { label: "Skills", value: careerMetrics.skillsLearned, icon: Star },
          { label: "Projects", value: careerMetrics.projectsCompleted, icon: Users },
          { label: "Growth", value: `${careerMetrics.salaryGrowth}%`, icon: TrendingUp },
          { label: "Awards", value: careerMetrics.achievements, icon: Award },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-xl rounded-lg p-4 border border-white/10 text-center"
          >
            <metric.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">{metric.value}</div>
            <div className="text-xs text-gray-400">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="sticky top-4 z-10 mb-8">
        <div className="bg-black/80 backdrop-blur-xl rounded-full p-2 border border-white/10">
          <Progress value={scrollProgress} className="h-2" />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Central Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 h-full"></div>

        {/* Timeline Events */}
        <div className="space-y-16">
          {timelineData.map((event, index) => (
            <TimelineEventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

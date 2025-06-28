"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  ArrowLeft,
  Globe,
  Github,
  Linkedin,
} from "lucide-react"
import Link from "next/link"
import { ParticleBackground } from "@/components/effects/particle-background"

interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  id: string
  degree: string
  school: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
}

interface Skill {
  id: string
  name: string
  level: number
  category: string
}

const initialProfile = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "johndoe.dev",
    github: "johndoe",
    linkedin: "johndoe",
    summary:
      "Passionate full-stack developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies.",
  },
  experience: [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description:
        "Lead frontend development for multiple high-traffic applications. Mentored junior developers and implemented best practices.",
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      startDate: "2020-03",
      endDate: "2021-12",
      current: false,
      description:
        "Built and maintained full-stack applications using React, Node.js, and PostgreSQL. Collaborated with design and product teams.",
    },
  ] as Experience[],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2016-08",
      endDate: "2020-05",
      gpa: "3.8",
    },
  ] as Education[],
  skills: [
    { id: "1", name: "JavaScript", level: 90, category: "Frontend" },
    { id: "2", name: "React", level: 85, category: "Frontend" },
    { id: "3", name: "Node.js", level: 80, category: "Backend" },
    { id: "4", name: "Python", level: 75, category: "Backend" },
    { id: "5", name: "AWS", level: 70, category: "Cloud" },
    { id: "6", name: "Docker", level: 65, category: "DevOps" },
  ] as Skill[],
}

export function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<string | null>(null)

  const handleSavePersonalInfo = (data: any) => {
    setProfile((prev) => ({ ...prev, personalInfo: data }))
    setEditingSection(null)
  }

  const handleAddExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setProfile((prev) => ({ ...prev, experience: [...prev.experience, newExp] }))
    setEditingItem(newExp.id)
  }

  const handleSaveExperience = (id: string, data: Experience) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? data : exp)),
    }))
    setEditingItem(null)
  }

  const handleDeleteExperience = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const handleAddEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
    }
    setProfile((prev) => ({ ...prev, education: [...prev.education, newEdu] }))
    setEditingItem(newEdu.id)
  }

  const handleSaveEducation = (id: string, data: Education) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? data : edu)),
    }))
    setEditingItem(null)
  }

  const handleDeleteEducation = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: 50,
      category: "Frontend",
    }
    setProfile((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }))
    setEditingItem(newSkill.id)
  }

  const handleSaveSkill = (id: string, data: Skill) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? data : skill)),
    }))
    setEditingItem(null)
  }

  const handleDeleteSkill = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
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
            <h1 className="text-2xl font-bold gradient-text">Profile</h1>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <User className="w-6 h-6" />
              Personal Information
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditingSection(editingSection === "personal" ? null : "personal")}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              {editingSection === "personal" ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {editingSection === "personal" ? "Cancel" : "Edit"}
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {editingSection === "personal" ? (
              <PersonalInfoForm
                data={profile.personalInfo}
                onSave={handleSavePersonalInfo}
                onCancel={() => setEditingSection(null)}
              />
            ) : (
              <PersonalInfoDisplay data={profile.personalInfo} />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              Experience
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddExperience}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </motion.button>
          </div>

          <div className="space-y-6">
            {profile.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {editingItem === exp.id ? (
                  <ExperienceForm
                    data={exp}
                    onSave={(data) => handleSaveExperience(exp.id, data)}
                    onCancel={() => setEditingItem(null)}
                    onDelete={() => handleDeleteExperience(exp.id)}
                  />
                ) : (
                  <ExperienceDisplay
                    data={exp}
                    onEdit={() => setEditingItem(exp.id)}
                    onDelete={() => handleDeleteExperience(exp.id)}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              Education
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddEducation}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </motion.button>
          </div>

          <div className="space-y-6">
            {profile.education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {editingItem === edu.id ? (
                  <EducationForm
                    data={edu}
                    onSave={(data) => handleSaveEducation(edu.id, data)}
                    onCancel={() => setEditingItem(null)}
                    onDelete={() => handleDeleteEducation(edu.id)}
                  />
                ) : (
                  <EducationDisplay
                    data={edu}
                    onEdit={() => setEditingItem(edu.id)}
                    onDelete={() => handleDeleteEducation(edu.id)}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Award className="w-6 h-6" />
              Skills
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddSkill}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                {editingItem === skill.id ? (
                  <SkillForm
                    data={skill}
                    onSave={(data) => handleSaveSkill(skill.id, data)}
                    onCancel={() => setEditingItem(null)}
                    onDelete={() => handleDeleteSkill(skill.id)}
                  />
                ) : (
                  <SkillDisplay
                    data={skill}
                    onEdit={() => setEditingItem(skill.id)}
                    onDelete={() => handleDeleteSkill(skill.id)}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Personal Info Components
function PersonalInfoDisplay({ data }: { data: any }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-gray-400 text-sm">Name</p>
            <p className="font-semibold">
              {data.firstName} {data.lastName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="font-semibold">{data.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-gray-400 text-sm">Phone</p>
            <p className="font-semibold">{data.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-gray-400 text-sm">Location</p>
            <p className="font-semibold">{data.location}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-gray-400 text-sm">Website</p>
            <p className="font-semibold">{data.website}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Github className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-gray-400 text-sm">GitHub</p>
            <p className="font-semibold">{data.github}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Linkedin className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-gray-400 text-sm">LinkedIn</p>
            <p className="font-semibold">{data.linkedin}</p>
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <p className="text-gray-400 text-sm mb-2">Summary</p>
        <p className="text-gray-300">{data.summary}</p>
      </div>
    </motion.div>
  )
}

function PersonalInfoForm({
  data,
  onSave,
  onCancel,
}: { data: any; onSave: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(data)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">GitHub</label>
          <input
            type="text"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">LinkedIn</label>
          <input
            type="text"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Summary</label>
        <textarea
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none resize-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <Save className="w-4 h-4" />
          Save
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
          Cancel
        </motion.button>
      </div>
    </motion.form>
  )
}

// Experience Components
function ExperienceDisplay({ data, onEdit, onDelete }: { data: Experience; onEdit: () => void; onDelete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white/5 rounded-lg border border-white/10"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{data.title}</h3>
          <p className="text-purple-400 font-medium">{data.company}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {data.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {data.startDate} - {data.current ? "Present" : data.endDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
          >
            <Edit3 className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <p className="text-gray-300 text-sm">{data.description}</p>
    </motion.div>
  )
}

function ExperienceForm({
  data,
  onSave,
  onCancel,
  onDelete,
}: {
  data: Experience
  onSave: (data: Experience) => void
  onCancel: () => void
  onDelete: () => void
}) {
  const [formData, setFormData] = useState(data)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="p-6 bg-white/5 rounded-lg border border-white/10 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Job Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="month"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.current}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  current: e.target.checked,
                  endDate: e.target.checked ? "" : formData.endDate,
                })
              }
              className="rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
            />
            <span className="text-sm">Current Position</span>
          </label>
        </div>

        {!formData.current && (
          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="month"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none resize-none"
          placeholder="Describe your role and achievements..."
        />
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <Save className="w-4 h-4" />
          Save
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
          Cancel
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 ml-auto"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </motion.button>
      </div>
    </motion.form>
  )
}

// Education Components
function EducationDisplay({ data, onEdit, onDelete }: { data: Education; onEdit: () => void; onDelete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white/5 rounded-lg border border-white/10"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{data.degree}</h3>
          <p className="text-purple-400 font-medium">{data.school}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {data.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {data.startDate} - {data.endDate}
            </span>
            {data.gpa && <span>GPA: {data.gpa}</span>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
          >
            <Edit3 className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

function EducationForm({
  data,
  onSave,
  onCancel,
  onDelete,
}: {
  data: Education
  onSave: (data: Education) => void
  onCancel: () => void
  onDelete: () => void
}) {
  const [formData, setFormData] = useState(data)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="p-6 bg-white/5 rounded-lg border border-white/10 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Degree</label>
          <input
            type="text"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">School</label>
          <input
            type="text"
            value={formData.school}
            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">GPA (Optional)</label>
          <input
            type="text"
            value={formData.gpa || ""}
            onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="month"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">End Date</label>
          <input
            type="month"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <Save className="w-4 h-4" />
          Save
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
          Cancel
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 ml-auto"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </motion.button>
      </div>
    </motion.form>
  )
}

// Skill Components
function SkillDisplay({ data, onEdit, onDelete }: { data: Skill; onEdit: () => void; onDelete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-white/5 rounded-lg border border-white/10"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold">{data.name}</h4>
          <p className="text-xs text-gray-400">{data.category}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{data.level}%</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-blue-400 transition-colors duration-200"
          >
            <Edit3 className="w-3 h-3" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
          >
            <Trash2 className="w-3 h-3" />
          </motion.button>
        </div>
      </div>

      <div className="w-full bg-white/10 rounded-full h-2">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${data.level}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

function SkillForm({
  data,
  onSave,
  onCancel,
  onDelete,
}: {
  data: Skill
  onSave: (data: Skill) => void
  onCancel: () => void
  onDelete: () => void
}) {
  const [formData, setFormData] = useState(data)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Skill Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none text-sm"
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
          <option value="Cloud">Cloud</option>
          <option value="DevOps">DevOps</option>
          <option value="Mobile">Mobile</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Proficiency Level: {formData.level}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: Number.parseInt(e.target.value) })}
          className="w-full"
        />
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="flex items-center gap-1 px-3 py-1 bg-green-600 rounded text-xs hover:bg-green-700 transition-colors duration-200"
        >
          <Save className="w-3 h-3" />
          Save
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1 px-3 py-1 bg-gray-600 rounded text-xs hover:bg-gray-700 transition-colors duration-200"
        >
          <X className="w-3 h-3" />
          Cancel
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onDelete}
          className="flex items-center gap-1 px-3 py-1 bg-red-600 rounded text-xs hover:bg-red-700 transition-colors duration-200 ml-auto"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </motion.button>
      </div>
    </motion.form>
  )
}

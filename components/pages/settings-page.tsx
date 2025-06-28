"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  Eye,
  EyeOff,
  ArrowLeft,
  Save,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  MessageSquare,
  Lock,
  Key,
  Database,
  FileText,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { ParticleBackground } from "@/components/effects/particle-background"

interface SettingsState {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    jobMatches: boolean
    resumeViews: boolean
    weeklyReport: boolean
  }
  privacy: {
    profileVisibility: "public" | "private" | "contacts"
    showEmail: boolean
    showPhone: boolean
    allowIndexing: boolean
  }
  appearance: {
    theme: "light" | "dark" | "system"
    animations: boolean
    soundEffects: boolean
    compactMode: boolean
  }
  account: {
    twoFactorEnabled: boolean
    sessionTimeout: number
    downloadData: boolean
    deleteAccount: boolean
  }
}

const initialSettings: SettingsState = {
  notifications: {
    email: true,
    push: true,
    sms: false,
    jobMatches: true,
    resumeViews: true,
    weeklyReport: true,
  },
  privacy: {
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowIndexing: true,
  },
  appearance: {
    theme: "dark",
    animations: true,
    soundEffects: false,
    compactMode: false,
  },
  account: {
    twoFactorEnabled: false,
    sessionTimeout: 30,
    downloadData: false,
    deleteAccount: false,
  },
}

export function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings)
  const [activeSection, setActiveSection] = useState("notifications")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const updateSetting = (section: keyof SettingsState, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
  }

  const sections = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "account", label: "Account", icon: SettingsIcon },
  ]

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
            <h1 className="text-2xl font-bold gradient-text">Settings</h1>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <nav className="space-y-2">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-white"
                        : "hover:bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    {section.label}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Settings Content */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10">
              {activeSection === "notifications" && (
                <NotificationSettings
                  settings={settings.notifications}
                  updateSetting={(key, value) => updateSetting("notifications", key, value)}
                />
              )}

              {activeSection === "privacy" && (
                <PrivacySettings
                  settings={settings.privacy}
                  updateSetting={(key, value) => updateSetting("privacy", key, value)}
                />
              )}

              {activeSection === "appearance" && (
                <AppearanceSettings
                  settings={settings.appearance}
                  updateSetting={(key, value) => updateSetting("appearance", key, value)}
                />
              )}

              {activeSection === "account" && (
                <AccountSettings
                  settings={settings.account}
                  updateSetting={(key, value) => updateSetting("account", key, value)}
                  showDeleteConfirm={showDeleteConfirm}
                  setShowDeleteConfirm={setShowDeleteConfirm}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Notification Settings Component
function NotificationSettings({
  settings,
  updateSetting,
}: {
  settings: any
  updateSetting: (key: string, value: any) => void
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold">Notification Preferences</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Delivery Methods</h3>
          <div className="space-y-4">
            {[
              {
                key: "email",
                label: "Email Notifications",
                icon: Mail,
                description: "Receive notifications via email",
              },
              {
                key: "push",
                label: "Push Notifications",
                icon: Smartphone,
                description: "Browser and mobile push notifications",
              },
              {
                key: "sms",
                label: "SMS Notifications",
                icon: MessageSquare,
                description: "Text message notifications for urgent updates",
              },
            ].map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
                <motion.label whileHover={{ scale: 1.05 }} className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={(e) => updateSetting(item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
                </motion.label>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Notification Types</h3>
          <div className="space-y-4">
            {[
              { key: "jobMatches", label: "Job Matches", description: "New job opportunities that match your profile" },
              { key: "resumeViews", label: "Resume Views", description: "When employers view your resume" },
              {
                key: "weeklyReport",
                label: "Weekly Report",
                description: "Weekly summary of your job search activity",
              },
            ].map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
                <motion.label whileHover={{ scale: 1.05 }} className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={(e) => updateSetting(item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
                </motion.label>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Privacy Settings Component
function PrivacySettings({
  settings,
  updateSetting,
}: {
  settings: any
  updateSetting: (key: string, value: any) => void
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold">Privacy Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Profile Visibility</h3>
          <div className="space-y-3">
            {[
              { value: "public", label: "Public", description: "Anyone can view your profile" },
              { value: "private", label: "Private", description: "Only you can view your profile" },
              { value: "contacts", label: "Contacts Only", description: "Only your connections can view your profile" },
            ].map((option, index) => (
              <motion.label
                key={option.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  settings.profileVisibility === option.value
                    ? "bg-purple-600/20 border-purple-500/50"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <input
                  type="radio"
                  name="profileVisibility"
                  value={option.value}
                  checked={settings.profileVisibility === option.value}
                  onChange={(e) => updateSetting("profileVisibility", e.target.value)}
                  className="text-purple-500 focus:ring-purple-500"
                />
                <div>
                  <p className="font-medium">{option.label}</p>
                  <p className="text-sm text-gray-400">{option.description}</p>
                </div>
              </motion.label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="space-y-4">
            {[
              {
                key: "showEmail",
                label: "Show Email Address",
                description: "Display your email on your public profile",
              },
              {
                key: "showPhone",
                label: "Show Phone Number",
                description: "Display your phone number on your public profile",
              },
              {
                key: "allowIndexing",
                label: "Allow Search Engine Indexing",
                description: "Let search engines index your profile",
              },
            ].map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
                <motion.label whileHover={{ scale: 1.05 }} className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={(e) => updateSetting(item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
                </motion.label>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Appearance Settings Component
function AppearanceSettings({
  settings,
  updateSetting,
}: {
  settings: any
  updateSetting: (key: string, value: any) => void
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center gap-3 mb-6">
        <Palette className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold">Appearance Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Theme</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: "light", label: "Light", icon: Sun, description: "Light theme" },
              { value: "dark", label: "Dark", icon: Moon, description: "Dark theme" },
              { value: "system", label: "System", icon: Monitor, description: "Follow system preference" },
            ].map((theme, index) => (
              <motion.label
                key={theme.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col items-center gap-3 p-6 rounded-lg border cursor-pointer transition-all duration-200 ${
                  settings.theme === theme.value
                    ? "bg-purple-600/20 border-purple-500/50"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <theme.icon className="w-8 h-8" />
                <div className="text-center">
                  <p className="font-medium">{theme.label}</p>
                  <p className="text-sm text-gray-400">{theme.description}</p>
                </div>
                <input
                  type="radio"
                  name="theme"
                  value={theme.value}
                  checked={settings.theme === theme.value}
                  onChange={(e) => updateSetting("theme", e.target.value)}
                  className="text-purple-500 focus:ring-purple-500"
                />
              </motion.label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Interface Options</h3>
          <div className="space-y-4">
            {[
              {
                key: "animations",
                label: "Enable Animations",
                description: "Show smooth transitions and animations",
                icon: Globe,
              },
              {
                key: "soundEffects",
                label: "Sound Effects",
                description: "Play sounds for interactions and notifications",
                icon: settings.soundEffects ? Volume2 : VolumeX,
              },
              {
                key: "compactMode",
                label: "Compact Mode",
                description: "Use a more compact layout to show more content",
                icon: FileText,
              },
            ].map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
                <motion.label whileHover={{ scale: 1.05 }} className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={(e) => updateSetting(item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
                </motion.label>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Account Settings Component
function AccountSettings({
  settings,
  updateSetting,
  showDeleteConfirm,
  setShowDeleteConfirm,
  showPassword,
  setShowPassword,
}: {
  settings: any
  updateSetting: (key: string, value: any) => void
  showDeleteConfirm: boolean
  setShowDeleteConfirm: (show: boolean) => void
  showPassword: boolean
  setShowPassword: (show: boolean) => void
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold">Account Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Security</h3>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                </div>
              </div>
              <motion.label whileHover={{ scale: 1.05 }} className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.twoFactorEnabled}
                  onChange={(e) => updateSetting("twoFactorEnabled", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
              </motion.label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <Key className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium">Change Password</p>
                  <p className="text-sm text-gray-400">Update your account password</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none pr-10"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <Save className="w-4 h-4" />
                Update Password
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium">Session Timeout</p>
                  <p className="text-sm text-gray-400">Automatically log out after inactivity</p>
                </div>
              </div>

              <select
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting("sessionTimeout", Number.parseInt(e.target.value))}
                className="w-full md:w-auto px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={0}>Never</option>
              </select>
            </motion.div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Data Management</h3>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Download Your Data</p>
                    <p className="text-sm text-gray-400">Export all your account data</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Database className="w-4 h-4" />
                  Export Data
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-red-500/10 rounded-lg border border-red-500/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="font-medium text-red-400">Delete Account</p>
                    <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </motion.button>
              </div>

              {showDeleteConfirm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-red-500/20"
                >
                  <p className="text-sm text-red-400 mb-4">
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Type 'DELETE' to confirm"
                      className="flex-1 px-3 py-2 bg-white/10 border border-red-500/30 rounded-lg focus:border-red-400 focus:outline-none"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      Confirm Delete
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

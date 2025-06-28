"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Bookmark,
  FileText,
  Home,
  Settings,
  Target,
  Upload,
  User,
  TrendingUp,
  Clock,
  Star,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarryBackground } from "@/components/effects/starry-background"

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: true, href: "/dashboard" },
  { icon: FileText, label: "Resume Analysis", href: "/resume-analysis" },
  { icon: Target, label: "Job Matching", href: "/job-matching" },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  { icon: Activity, label: "Visualizations", href: "/visualizations" },
  { icon: Upload, label: "Upload Resume", href: "/upload" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <StarryBackground />

      <div className="flex relative z-10">
        {/* Sidebar */}
        <div className="w-64 bg-black/20 backdrop-blur-md border-r border-white/10 min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">AI Resume Analyzer</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  <div
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      item.active
                        ? "bg-purple-600/30 text-white border border-purple-500/50"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Alex!</h1>
              <p className="text-gray-300">Here's your career optimization dashboard</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-black/20 backdrop-blur-md border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Resume Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">87%</div>
                  <p className="text-xs text-green-400">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Job Matches</CardTitle>
                  <Target className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">24</div>
                  <p className="text-xs text-blue-400">+3 new matches</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Bookmarks</CardTitle>
                  <Bookmark className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">12</div>
                  <p className="text-xs text-yellow-400">Saved positions</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Profile Views</CardTitle>
                  <Activity className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">156</div>
                  <p className="text-xs text-purple-400">This week</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <Card className="lg:col-span-2 bg-black/20 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-gray-300">Your latest career optimization actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Resume analysis completed</p>
                      <p className="text-gray-400 text-xs">2 hours ago</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-400/20 text-green-400">
                      +5 points
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">New job matches found</p>
                      <p className="text-gray-400 text-xs">5 hours ago</p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-400/20 text-blue-400">
                      3 matches
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Profile updated</p>
                      <p className="text-gray-400 text-xs">1 day ago</p>
                    </div>
                    <Badge variant="secondary" className="bg-purple-400/20 text-purple-400">
                      Skills
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-black/20 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-gray-300">Optimize your career journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/upload">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New Resume
                    </Button>
                  </Link>

                  <Link href="/job-matching">
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Find Job Matches
                    </Button>
                  </Link>

                  <Link href="/visualizations">
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </Link>

                  <Link href="/profile">
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Update Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="mt-8 bg-black/20 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">AI Recommendations</CardTitle>
                <CardDescription className="text-gray-300">
                  Personalized suggestions to improve your career prospects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-medium">Skill Enhancement</span>
                    </div>
                    <p className="text-gray-300 text-sm">Add "Machine Learning" to boost your profile by 15%</p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-white font-medium">Resume Update</span>
                    </div>
                    <p className="text-gray-300 text-sm">Update your experience section for better ATS compatibility</p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-white font-medium">Market Trend</span>
                    </div>
                    <p className="text-gray-300 text-sm">React developers are in high demand in your area</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

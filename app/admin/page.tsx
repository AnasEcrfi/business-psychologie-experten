"use client"

import * as React from "react"
import { 
  MessageSquare, 
  Calendar, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { getContactSubmissions, getBookings } from "@/lib/store"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = React.useState({
    totalMessages: 0,
    unreadMessages: 0,
    totalBookings: 0,
    pendingBookings: 0,
    todayBookings: 0,
    weekBookings: 0
  })
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    // Load stats on client side only
    const messages = getContactSubmissions()
    const bookings = getBookings()
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const weekFromNow = new Date()
    weekFromNow.setDate(weekFromNow.getDate() + 7)
    
    setStats({
      totalMessages: messages.length,
      unreadMessages: messages.filter(m => m.status === 'new').length,
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      todayBookings: bookings.filter(b => {
        const bookingDate = new Date(b.date)
        return bookingDate.toDateString() === today.toDateString()
      }).length,
      weekBookings: bookings.filter(b => {
        const bookingDate = new Date(b.date)
        return bookingDate >= today && bookingDate <= weekFromNow
      }).length
    })
  }, [])

  const statCards = [
    {
      title: "Total Messages",
      value: stats.totalMessages,
      subValue: `${stats.unreadMessages} unread`,
      icon: MessageSquare,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      href: "/admin/messages"
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      subValue: `${stats.pendingBookings} pending`,
      icon: Calendar,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      href: "/admin/calendar"
    },
    {
      title: "Today's Appointments",
      value: stats.todayBookings,
      subValue: "scheduled",
      icon: Clock,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      href: "/admin/calendar"
    },
    {
      title: "This Week",
      value: stats.weekBookings,
      subValue: "appointments",
      icon: TrendingUp,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      href: "/admin/calendar"
    }
  ]

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link
              key={index}
              href={stat.href}
              className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                  <Icon className={cn("w-6 h-6", stat.color)} />
                </div>
              </div>
              
              <div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className={cn("text-xs mt-1", stat.color)}>{stat.subValue}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/messages"
            className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium">View Messages</span>
          </Link>
          
          <Link
            href="/admin/calendar"
            className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="font-medium">Manage Calendar</span>
          </Link>
          
          <Link
            href="/"
            className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="font-medium">View Website</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Sample activities */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">New booking confirmed</p>
              <p className="text-xs text-muted-foreground">John Doe - Tomorrow at 10:00 AM</p>
            </div>
            <span className="text-xs text-muted-foreground">2 hours ago</span>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">New contact message</p>
              <p className="text-xs text-muted-foreground">Sarah Smith - Inquiry about services</p>
            </div>
            <span className="text-xs text-muted-foreground">5 hours ago</span>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
              <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Appointment reminder</p>
              <p className="text-xs text-muted-foreground">Michael Brown - Today at 3:00 PM</p>
            </div>
            <span className="text-xs text-muted-foreground">This morning</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}
"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { signOut, getCurrentUser } from "@/lib/auth-migration"
import Link from "next/link"
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  LogOut,
  Menu,
  X,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [user, setUser] = React.useState<{ name?: string; email?: string } | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    // Check authentication on client side only
    const checkAuth = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      
      if (!currentUser && pathname !== "/admin/login") {
        router.push("/admin/login")
      }
    }
    checkAuth()
  }, [pathname, router])
  
  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/admin/login")
  }

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/messages",
      label: "Messages",
      icon: MessageSquare,
    },
    {
      href: "/admin/calendar",
      label: "Calendar",
      icon: Calendar,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-zinc-900 shadow-lg"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 transform transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
            <div className="text-2xl font-bold gradient-text">
              BPE Admin
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                        isActive
                          ? "bg-gray-100 dark:bg-zinc-800 text-foreground"
                          : "hover:bg-gray-50 dark:hover:bg-zinc-800/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User Info & Sign Out */}
          <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || ''}</p>
              </div>
            </div>
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
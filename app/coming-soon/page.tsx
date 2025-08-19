"use client"

import * as React from "react"
import { Lock, ArrowRight } from "lucide-react"

export default function ComingSoonPage() {
  const [code, setCode] = React.useState("")
  const [error, setError] = React.useState(false)
  const [isUnlocking, setIsUnlocking] = React.useState(false)
  
  // Admin Code
  const ADMIN_CODE = "BPE2025"
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (code === ADMIN_CODE) {
      setIsUnlocking(true)
      // Set cookie to remember access
      document.cookie = "bpe_access=granted; path=/; max-age=86400" // 24 hours
      
      // Animate and redirect
      setTimeout(() => {
        window.location.href = "/"
      }, 500)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Content */}
      <div className={`relative max-w-2xl w-full text-center transition-all duration-1000 ${isUnlocking ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Logo/Brand */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-900 dark:bg-gray-100 mb-6">
            <span className="text-3xl font-bold text-white dark:text-gray-900">BPE</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4">
            Coming Soon
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Business Psychologie Experten
          </p>
        </div>
        
        {/* Message */}
        <div className="mb-12 space-y-4">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Wir arbeiten an etwas Außergewöhnlichem.
          </p>
          <p className="text-base text-muted-foreground/70">
            Transform Your Business Mind – Demnächst verfügbar.
          </p>
        </div>
        
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="h-1 w-full bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-gradient-to-r from-gray-600 to-gray-900 dark:from-gray-400 dark:to-gray-100 rounded-full animate-pulse" />
          </div>
          <p className="text-sm text-muted-foreground mt-3">80% fertiggestellt</p>
        </div>
        
        {/* Admin Access */}
        <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Admin-Zugang</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Zugangscode eingeben"
                className={`w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800/50 border transition-all ${
                  error 
                    ? 'border-red-500 shake' 
                    : 'border-gray-200 dark:border-zinc-700 focus:border-gray-400 dark:focus:border-zinc-600'
                } focus:outline-none focus:ring-2 focus:ring-gray-400/20 dark:focus:ring-zinc-600/20`}
                required
              />
              
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                aria-label="Zugang freischalten"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            {error && (
              <p className="text-sm text-red-500 animate-fade-in">
                Ungültiger Code
              </p>
            )}
          </form>
        </div>
        
        {/* Contact Info */}
        <div className="mt-12 text-sm text-muted-foreground">
          <p>Bei Fragen: info@businesspsychologie-experten.de</p>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        .shake {
          animation: shake 0.5s;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
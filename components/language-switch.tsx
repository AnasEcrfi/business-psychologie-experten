"use client"

import * as React from "react"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

export function LanguageSwitch({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
      className={cn(
        "px-3 py-2 rounded-xl transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 flex items-center gap-2",
        className
      )}
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">{language.toUpperCase()}</span>
    </button>
  )
}
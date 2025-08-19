"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()
  const router = useRouter()
  
  return (
    <footer className="py-8 sm:py-10 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Mobile Layout */}
        <div className="flex flex-col space-y-6 lg:hidden">
          {/* Logo & Copyright */}
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text mb-3">
              BPE
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              © 2025 Business Psychologie Experten
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              {t.footer.rights}
            </div>
            
            {/* Admin Login Button - Hidden but accessible */}
            <button
              onClick={() => router.push('/admin/login')}
              className="mt-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all opacity-10 hover:opacity-100"
              aria-label="Admin Login"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

          {/* Legal Links */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link
              href="/impressum"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t.footer.imprint}
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link
              href="/datenschutz"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link
              href="/agb"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t.footer.terms}
            </Link>
          </div>

          {/* Made by MP-Agency */}
          <div className="text-center text-xs sm:text-sm text-muted-foreground">
            <div>{t.footer.madeBy}</div>
            <a 
              href="https://www.mpagency.ae" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:text-primary transition-colors inline-block mt-1"
            >
              {t.footer.agency}
            </a>
            <span className="block mt-1">{t.footer.location}</span>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold gradient-text">
              BPE
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 Business Psychologie Experten. {t.footer.rights}.
            </div>
            
            {/* Admin Login Button - Hidden but accessible */}
            <button
              onClick={() => router.push('/admin/login')}
              className="ml-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all opacity-10 hover:opacity-100"
              aria-label="Admin Login"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/impressum"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t.footer.imprint}
            </Link>
            <Link
              href="/datenschutz"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/agb"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t.footer.terms}
            </Link>
          </div>

          {/* Made by MP-Agency */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>{t.footer.madeBy}</span>
            <a 
              href="https://www.mpagency.ae" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:text-primary transition-colors"
            >
              {t.footer.agency}
            </a>
            <span>| {t.footer.location}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
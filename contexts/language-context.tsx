"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, Language, Translations } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('de')

  useEffect(() => {
    // Check stored preference, default to German
    const stored = localStorage.getItem('language') as Language
    if (stored && (stored === 'de' || stored === 'en')) {
      setLanguage(stored)
    } else {
      // Always default to German
      setLanguage('de')
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleSetLanguage, 
        t: translations[language] 
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
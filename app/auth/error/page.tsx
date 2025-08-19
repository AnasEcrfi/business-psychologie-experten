"use client"

import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Authentifizierung fehlgeschlagen</h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Der Bestätigungslink ist ungültig oder abgelaufen. Bitte fordern Sie einen neuen Link an.
          </p>
          
          <div className="space-y-3 w-full">
            <Link 
              href="/admin/login"
              className="block w-full py-3 px-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg text-center font-medium hover:opacity-90 transition-opacity"
            >
              Zur Anmeldung
            </Link>
            
            <Link 
              href="/"
              className="block w-full py-3 px-4 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-lg text-center font-medium hover:opacity-90 transition-opacity"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
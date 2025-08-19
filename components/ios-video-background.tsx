"use client"

import * as React from "react"

interface IOSVideoBackgroundProps {
  src: string
  blurred?: boolean
  className?: string
}

export function IOSVideoBackground({ 
  src, 
  blurred = false,
  className = ""
}: IOSVideoBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Create the video HTML string with all lowercase attributes
  const videoHtml = `
    <video 
      autoplay 
      muted 
      loop 
      playsinline
      preload="metadata"
      class="absolute inset-0 w-full h-full object-cover ${blurred ? 'blur-2xl scale-105' : ''} ${className}"
      style="width: 100%; height: 100%; object-fit: cover;"
    >
      <source src="${src}" type="video/mp4" />
    </video>
  `

  return (
    <>
      {/* Fallback gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900" />
      
      {/* Video using dangerouslySetInnerHTML for iOS compatibility */}
      <div 
        ref={containerRef}
        className="absolute inset-0"
        dangerouslySetInnerHTML={{ __html: videoHtml }}
      />
    </>
  )
}
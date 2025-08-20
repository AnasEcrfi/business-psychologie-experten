"use client"

import * as React from "react"
import { createPortal } from "react-dom"

interface ModalPortalProps {
  children: React.ReactNode
}

export function ModalPortal({ children }: ModalPortalProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return createPortal(children, document.body)
}
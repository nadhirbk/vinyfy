"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useEffect } from "react"

export interface Toast {
  id: string
  message: string
  duration?: number
}

interface ToasterProps {
  toasts: Toast[]
  removeToast: (id: string) => void
}

export function Toaster({ toasts, removeToast }: ToasterProps) {
  return (
    <div className="fixed top-20 right-4 left-4 sm:left-auto z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, removeToast }: { toast: Toast; removeToast: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id)
    }, toast.duration || 3000)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, removeToast])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="pointer-events-auto bg-background border border-border rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 min-w-[240px] sm:min-w-[280px] max-w-[400px] ml-auto"
    >
      <div className="flex-1 text-sm text-foreground">{toast.message}</div>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

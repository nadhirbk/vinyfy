"use client"

import { Toaster } from "@/components/ui/toaster"
import { useToastStore } from "@/lib/toast-store"

export function ToastProvider() {
  const { toasts, removeToast } = useToastStore()

  return <Toaster toasts={toasts} removeToast={removeToast} />
}

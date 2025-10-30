import { create } from "zustand"

export interface Toast {
  id: string
  message: string
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (message: string, duration?: number) => void
  removeToast: (id: string) => void
  showToast: (message: string, duration?: number) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, duration = 3000) => {
    const id = Math.random().toString(36).substring(7)
    set((state) => ({
      toasts: [...state.toasts, { id, message, duration }],
    }))
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  },
  showToast: (message, duration = 3000) => {
    const id = Math.random().toString(36).substring(7)
    set((state) => ({
      toasts: [...state.toasts, { id, message, duration }],
    }))
  },
}))

export const useToast = useToastStore

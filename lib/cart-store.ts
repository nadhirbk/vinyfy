import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Vinyl } from "./vinyl-data"

export interface CartItem extends Vinyl {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (vinyl: Vinyl, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (vinyl, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === vinyl.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === vinyl.id ? { ...item, quantity: item.quantity + quantity } : item,
              ),
            }
          }
          return { items: [...state.items, { ...vinyl, quantity }] }
        })
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }))
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: "vinyfy-cart",
    },
  ),
)

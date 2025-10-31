"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useCartStore } from "@/lib/cart-store"
import { vinyls } from "@/lib/vinyl-data"
import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "./ui/button"

interface CartDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  const cartVinyls = items.map((item) => ({
    ...vinyls.find((v) => v.id === item.id)!,
    quantity: item.quantity,
  }))

  const total = cartVinyls.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed left-1/2 top-0 z-50 w-full max-w-md -translate-x-1/2 mt-12 rounded-lg border border-border bg-background shadow-lg overflow-y-auto max-h-[80vh] sm:absolute sm:right-0 sm:top-full sm:mt-2 sm:w-96 sm:max-w-md sm:-translate-x-0 sm:mt-0 sm:max-h-none"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3">Shopping Cart</h3>

              {cartVinyls.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {cartVinyls.map((vinyl) => (
                      <div
                        key={vinyl.id}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors group"
                      >
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                          <Image
                            src={vinyl.image || "/placeholder.svg"}
                            alt={vinyl.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{vinyl.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{vinyl.artist}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 bg-transparent"
                              onClick={() => updateQuantity(vinyl.id, Math.max(1, vinyl.quantity - 1))}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-xs font-medium w-6 text-center">{vinyl.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 bg-transparent"
                              onClick={() => updateQuantity(vinyl.id, vinyl.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <p className="text-sm font-semibold">${(vinyl.price * vinyl.quantity).toFixed(2)}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeItem(vinyl.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Total</span>
                      <span className="text-lg font-bold">${total.toFixed(2)}</span>
                    </div>
                    <Button className="w-full" onClick={onClose}>
                      Checkout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

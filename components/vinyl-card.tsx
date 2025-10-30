"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { Vinyl } from "@/lib/vinyl-data"
import { Button } from "./ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useFavoritesStore } from "@/lib/favorites-store"
import { useToastStore } from "@/lib/toast-store"

interface VinylCardProps {
  vinyl: Vinyl
  index: number
}

export function VinylCard({ vinyl, index }: VinylCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  const addToast = useToastStore((state) => state.addToast)
  const favorite = isFavorite(vinyl.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(vinyl)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const wasAdded = !favorite
    toggleFavorite(vinyl)

    if (wasAdded) {
      addToast("Added to your favorites!")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/product/${vinyl.id}`} className="group block">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="relative flex h-full flex-col overflow-hidden rounded-lg bg-card"
        >
          <motion.button
            onClick={handleToggleFavorite}
            className="absolute right-2 top-2 z-10 rounded-full bg-background/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-background"
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              initial={false}
              animate={{
                scale: favorite ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`h-3.5 w-3.5 transition-colors ${
                  favorite ? "fill-accent stroke-accent" : "stroke-foreground/60"
                }`}
              />
            </motion.div>
          </motion.button>

          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={vinyl.image || "/placeholder.svg"}
              alt={`${vinyl.title} by ${vinyl.artist}`}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col space-y-2.5 p-3">
            <div className="flex-1 space-y-0.5">
              <h3 className="line-clamp-2 text-sm font-bold text-foreground transition-colors group-hover:text-accent">
                {vinyl.title}
              </h3>
              <p className="truncate text-xs text-muted-foreground">{vinyl.artist}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-base font-bold text-foreground">${vinyl.price}</p>
                <p className="text-[10px] text-muted-foreground">
                  {vinyl.year} • {vinyl.condition}
                </p>
              </div>

              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 rounded-full bg-transparent"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

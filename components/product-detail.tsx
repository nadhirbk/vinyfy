"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "./ui/button"
import { ShoppingCart, Heart, Share2, Disc } from "lucide-react"
import type { Vinyl } from "@/lib/vinyl-data"
import { useState } from "react"
import { useCartStore } from "@/lib/cart-store"
import { useFavoritesStore } from "@/lib/favorites-store"
import { useToast } from "@/lib/toast-store"

interface ProductDetailProps {
  vinyl: Vinyl
}

export function ProductDetail({ vinyl }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)
  const { favorites, toggleFavorite } = useFavoritesStore()
  const isFavorite = favorites.some((fav) => fav.id === vinyl.id)
  const showToast = useToast((state) => state.showToast)

  const handleAddToCart = () => {
    addItem(vinyl, quantity)
  }

  const handleToggleFavorite = () => {
    toggleFavorite(vinyl)
    if (!isFavorite) {
      showToast(`${vinyl.title} added to favorites`)
    } else {
      showToast(`${vinyl.title} removed from favorites`)
    }
  }

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted mx-auto w-[82%]">
                <Image
                  src={vinyl.image || "/placeholder.svg"}
                  alt={vinyl.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase tracking-wider text-primary">{vinyl.genre}</p>
                  <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    {vinyl.title}
                  </h1>
                  <p className="text-xl text-muted-foreground">{vinyl.artist}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-transparent"
                    onClick={handleToggleFavorite}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-accent stroke-accent" : ""}`} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-bold text-foreground">${vinyl.price}</p>
                <p className="text-sm text-muted-foreground">Free shipping on orders over $50</p>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-border bg-card p-6">
              <h3 className="font-bold text-foreground">Product Details</h3>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Release Year</span>
                  <span className="font-medium text-foreground">{vinyl.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condition</span>
                  <span className="font-medium text-foreground">{vinyl.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Genre</span>
                  <span className="font-medium text-foreground">{vinyl.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-medium text-foreground">12" LP Vinyl</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-lg border border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-r-none"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-l-none"
                  >
                    +
                  </Button>
                </div>

                <Button
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              <Button size="lg" variant="outline" className="w-full bg-transparent">
                Buy Now
              </Button>
            </div>

            <div className="space-y-4 rounded-lg bg-muted/50 p-6">
              <div className="flex items-start gap-3">
                <Disc className="mt-1 h-5 w-5 text-primary" />
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground">Authentic Vinyl Experience</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Each record is carefully inspected and graded to ensure the highest quality. We guarantee authentic
                    pressings with detailed condition reports.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

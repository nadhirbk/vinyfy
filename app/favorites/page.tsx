"use client"

import { motion } from "framer-motion"
import { useFavoritesStore } from "@/lib/favorites-store"
import { VinylCard } from "@/components/vinyl-card"
import { Heart } from "lucide-react"

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 space-y-4"
        >
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 fill-accent stroke-accent" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Your Favorites</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            {favorites.length === 0
              ? "You haven't added any favorites yet. Start exploring and save your favorite vinyls!"
              : `You have ${favorites.length} favorite ${favorites.length === 1 ? "vinyl" : "vinyls"}`}
          </p>
        </motion.div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
            {favorites.map((vinyl, index) => (
              <VinylCard key={vinyl.id} vinyl={vinyl} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-border"
          >
            <div className="text-center">
              <Heart className="mx-auto mb-4 h-16 w-16 stroke-muted-foreground" />
              <p className="text-xl font-medium text-muted-foreground">No favorites yet</p>
              <p className="mt-2 text-sm text-muted-foreground">Click the heart icon on any vinyl to add it here</p>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}

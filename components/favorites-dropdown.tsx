"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useFavoritesStore } from "@/lib/favorites-store";
import { vinyls } from "@/lib/vinyl-data";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface FavoritesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FavoritesDropdown({ isOpen, onClose }: FavoritesDropdownProps) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const favoriteVinyls = vinyls.filter((vinyl) =>
    favorites.some((fav) => fav.id === vinyl.id)
  );

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
            className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-md rounded-lg border border-border bg-background shadow-lg z-50"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3">Favorites</h3>

              {favoriteVinyls.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">
                  No favorites yet. Start adding some!
                </p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {favoriteVinyls.map((vinyl) => (
                    <div
                      key={vinyl.id}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors group"
                    >
                      <Link
                        href={`/product/${vinyl.id}`}
                        className="flex items-center gap-3 flex-1"
                        onClick={onClose}
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
                          <p className="text-sm font-medium truncate">
                            {vinyl.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {vinyl.artist}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">${vinyl.price}</p>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                        onClick={() => removeFavorite(vinyl.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {favoriteVinyls.length > 0 && (
                <Link href="/favorites" onClick={onClose}>
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                  >
                    View All Favorites
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

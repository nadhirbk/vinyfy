"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { Button } from "./ui/button"

interface SearchSpotlightProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchSpotlight({ isOpen, onClose }: SearchSpotlightProps) {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-black/25 backdrop-blur-[12px]"
            onClick={onClose}
          />

          {/* Search Container */}
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1], // Smooth ease-out curve
              }}
              className="w-full max-w-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-lg border border-border bg-background shadow-2xl">
                <div className="flex items-center gap-3 p-4">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for vinyls, artists, or genres..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
                    autoFocus
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-t border-border p-4"
                  >
                    <p className="text-sm text-muted-foreground">Search results for "{searchQuery}" will appear here</p>
                  </motion.div>
                )}

                <div className="border-t border-border bg-muted/30 px-4 py-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Press ESC to close</span>
                    <span>Enter to search</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

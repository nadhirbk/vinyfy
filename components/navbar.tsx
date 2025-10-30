"use client";

import type React from "react";

import Link from "next/link";
import { Search, Heart, ShoppingCart } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { SearchSpotlight } from "./search-spotlight";
import { FavoritesDropdown } from "./favorites-dropdown";
import { CartDropdown } from "./cart-dropdown";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useFavoritesStore } from "@/lib/favorites-store";
import { useCartStore } from "@/lib/cart-store";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const items = useCartStore((state) => state.items);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const favoritesRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        favoritesRef.current &&
        !favoritesRef.current.contains(event.target as Node)
      ) {
        setIsFavoritesOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      >
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 md:px-6">
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Vinyfy
            </span>
          </button>

          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
              <Link
                href="/"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground cursor-pointer"
              >
                Shop
              </Link>
              <Link
                href="/collections"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground cursor-pointer"
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground cursor-pointer"
              >
                About
              </Link>
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full cursor-pointer"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              <div ref={favoritesRef} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full cursor-pointer"
                  onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}
                >
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  {favorites.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-0.5 -top-0.5 sm:-right-1 sm:-top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-accent text-[10px] sm:text-xs font-bold text-accent-foreground"
                    >
                      {favorites.length}
                    </motion.span>
                  )}
                </Button>
                <FavoritesDropdown
                  isOpen={isFavoritesOpen}
                  onClose={() => setIsFavoritesOpen(false)}
                />
              </div>

              <div ref={cartRef} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full cursor-pointer"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-0.5 -top-0.5 sm:-right-1 sm:-top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-[10px] sm:text-xs font-bold text-primary-foreground"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </Button>
                <CartDropdown
                  isOpen={isCartOpen}
                  onClose={() => setIsCartOpen(false)}
                />
              </div>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      <SearchSpotlight
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

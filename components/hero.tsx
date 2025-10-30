"use client";

import type React from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search } from "lucide-react";
import { useState, useRef } from "react";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef<HTMLElement>(null);

  // Use the section ref as the scroll target so the vinyl responds
  // as the hero enters/leaves the viewport. We map progress [0..1]
  // to a subtle upward motion (-50px) and a slow rotation (≈12°).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const vinylY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const vinylRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 sm:py-16 md:px-6 md:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-xs sm:text-sm font-medium uppercase tracking-wider text-primary"
              >
                Premium Vinyl Collection
              </motion.p>
              <h1 className="text-balance text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Record & vinyl market
              </h1>
              <p className="text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground md:text-xl">
                Expand your vinyl record collection and find the perfect record
                player with us
              </p>
            </div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              onSubmit={handleSearch}
              className="max-w-xl lg:max-w-none"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="select in the catalog"
                  className="w-full rounded-full border-2 border-foreground bg-background px-6 py-3 sm:py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-foreground flex items-center justify-center hover:bg-foreground/90 transition-colors"
                >
                  <Search className="h-5 w-5 text-background" />
                </button>
              </div>
            </motion.form>
          </motion.div>

          {/* Right side - Vinyl illustration with subtle mount + scroll-driven parallax/rotation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex justify-end items-center"
          >
            <motion.div
              style={{ y: vinylY, rotate: vinylRotate }}
              className="relative w-full aspect-square max-w-[220px] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto lg:mx-0"
            >
              {/* Vinyl record illustration */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Main vinyl disc */}
                <defs>
                  <radialGradient id="vinylGradient" cx="50%" cy="50%" r="50%">
                    <stop
                      offset="0%"
                      stopColor="currentColor"
                      className="text-foreground/10"
                    />
                    <stop
                      offset="50%"
                      stopColor="currentColor"
                      className="text-foreground/30"
                    />
                    <stop
                      offset="100%"
                      stopColor="currentColor"
                      className="text-foreground"
                    />
                  </radialGradient>
                </defs>

                {/* Outer edge */}
                <circle cx="200" cy="200" r="180" fill="url(#vinylGradient)" />

                {/* Grooves */}
                {[...Array(12)].map((_, i) => (
                  <circle
                    key={i}
                    cx="200"
                    cy="200"
                    r={160 - i * 12}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-foreground/20"
                  />
                ))}

                {/* Center label */}
                <circle
                  cx="200"
                  cy="200"
                  r="50"
                  fill="currentColor"
                  className="text-background"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-foreground"
                />

                {/* Center hole */}
                <circle
                  cx="200"
                  cy="200"
                  r="8"
                  fill="currentColor"
                  className="text-foreground"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

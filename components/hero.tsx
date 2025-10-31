"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState, useRef } from "react";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef<HTMLElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden lg:min-h-[calc(100vh-110px)]"
    >
      <div className="container mx-auto flex flex-col items-center px-4 py-12 sm:py-16 md:px-6 md:py-24 lg:items-center lg:py-28 xl:py-32">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-6 flex flex-col items-center text-center lg:items-center lg:text-center lg:max-w-[700px]"
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
            className="w-full max-w-xl lg:max-w-[480px]"
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
      </div>
    </section>
  );
}


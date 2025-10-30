"use client";

import { motion } from "framer-motion";
import { VinylCard } from "./vinyl-card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Vinyl } from "@/lib/vinyl-data";
import { useRef } from "react";

interface VinylCategorySectionProps {
  title: string;
  description?: string;
  vinyls: Vinyl[];
  categoryId: string;
}

export function VinylCategorySection({
  title,
  description,
  vinyls,
  categoryId,
}: VinylCategorySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-sm text-muted-foreground mt-1"
              >
                {description}
              </motion.p>
            )}
          </div>
          <Link
            href={`/category/${categoryId}`}
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            See all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative group">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            aria-label="Scroll left"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Horizontal scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {vinyls.map((vinyl, index) => (
              <motion.div
                key={vinyl.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex-shrink-0 w-[200px] sm:w-[220px]"
              >
                <VinylCard vinyl={vinyl} index={index} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile "See all" link */}
        <Link
          href={`/category/${categoryId}`}
          className="flex sm:hidden items-center justify-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-4"
        >
          See all
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

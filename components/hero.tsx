"use client";

import type React from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import { useRef } from "react";
import { AiBox } from "./ai-box";
import { useState } from "react";
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!inputValue.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const res = await fetch("/api/recommend-vinyls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputValue }),
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      setError("Une erreur est survenue. Réessaie !");
    } finally {
      setLoading(false);
    }
  }

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
              Et si vous trouviez votre prochaine pépite&nbsp;?
            </h1>
            <p className="text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground md:text-xl">
              Exprimez vos goûts, on s'occupe du reste.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-full"
          >
            <AiBox />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

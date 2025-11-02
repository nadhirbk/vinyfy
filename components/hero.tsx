"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ChatInput, ChatInputTextArea, ChatInputSubmit } from "@/components/ui/chat-input";
import { useState } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [inputValue, setInputValue] = useState("");

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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-full"
          >
            <ChatInput>
              <ChatInputTextArea
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Décris tes goûts, artistes, styles..."
              />
              <ChatInputSubmit disabled={inputValue.trim().length === 0} />
            </ChatInput>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

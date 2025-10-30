"use client"

import { motion } from "framer-motion"

const features = [
  {
    title: "Authentic Sound",
    description: "Experience the warmth and depth of analog audio",
  },
  {
    title: "Rare Finds",
    description: "Curated collection of limited edition pressings",
  },
  {
    title: "Collector Grade",
    description: "Premium condition records for serious collectors",
  },
]

export function FeaturedSection() {
  return (
    <section className="border-y border-border bg-muted/30 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-2 text-center"
            >
              <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

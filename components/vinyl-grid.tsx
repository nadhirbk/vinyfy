"use client"

import { vinyls } from "@/lib/vinyl-data"
import { VinylCard } from "./vinyl-card"

export function VinylGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Featured Collection
          </h2>
          <p className="text-pretty text-muted-foreground">
            Handpicked vinyl records from legendary artists and timeless albums
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {vinyls.map((vinyl, index) => (
            <VinylCard key={vinyl.id} vinyl={vinyl} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

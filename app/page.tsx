import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { VinylCategorySection } from "@/components/vinyl-category-section"
import { getVinylsByCategory, categories } from "@/lib/vinyl-data"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        {categories.map((category) => (
          <VinylCategorySection
            key={category.id}
            title={category.name}
            description={category.description}
            vinyls={getVinylsByCategory(category.id as any)}
            categoryId={category.id}
          />
        ))}
      </main>
      <Footer />
    </div>
  )
}

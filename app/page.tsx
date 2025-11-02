import { Hero } from "@/components/hero";
import { VinylCategorySection } from "@/components/vinyl-category-section";
import { getVinylsByCategory, categories } from "@/lib/vinyl-data";

export default function Home() {
  return (
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
  );
}

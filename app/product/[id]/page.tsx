import { notFound } from "next/navigation"
import { vinyls } from "@/lib/vinyl-data"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { ScrollToTop } from "@/components/scroll-to-top"

export function generateStaticParams() {
  return vinyls.map((vinyl) => ({
    id: vinyl.id,
  }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const vinyl = vinyls.find((v) => v.id === params.id)

  if (!vinyl) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <ProductDetail vinyl={vinyl} />
      </main>
      <Footer />
    </div>
  )
}

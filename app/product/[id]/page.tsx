import { notFound } from "next/navigation";
import { vinyls } from "@/lib/vinyl-data";
import { ProductDetail } from "@/components/product-detail";
import { ScrollToTop } from "@/components/scroll-to-top";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const vinyl = vinyls.find((v) => v.id === id);

  if (!vinyl) {
    notFound();
    return null;
  }

  return (
    <>
      <ScrollToTop />
      <main className="flex-1">
        <ProductDetail vinyl={vinyl} />
      </main>
    </>
  );
}

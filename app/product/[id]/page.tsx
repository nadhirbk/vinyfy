import { notFound } from "next/navigation";
import { vinyls } from "@/lib/vinyl-data";
import { ProductDetail } from "@/components/product-detail";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function Page({ params }: { params: { id: string } }) {
  const vinyl = vinyls.find((v) => v.id === params.id);

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

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart, Heart, Share2, Disc } from "lucide-react";
import type { Vinyl } from "@/lib/vinyl-data";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useFavoritesStore } from "@/lib/favorites-store";
import { useToast } from "@/lib/toast-store";

interface ProductDetailProps {
  vinyl: Vinyl;
}

export function ProductDetail({ vinyl }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites.some((fav) => fav.id === vinyl.id);
  const showToast = useToast((state) => state.showToast);

  const handleAddToCart = () => {
    addItem(vinyl, quantity);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(vinyl);
    if (!isFavorite) {
      showToast(`${vinyl.title} added to favorites`);
    } else {
      showToast(`${vinyl.title} removed from favorites`);
    }
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted mx-auto w-[82%]">
                <Image
                  src={vinyl.image || "/placeholder.svg"}
                  alt={vinyl.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase tracking-wider text-primary">
                    {vinyl.genre}
                  </p>
                  <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    {vinyl.title}
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    {vinyl.artist}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-transparent"
                    onClick={handleToggleFavorite}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite ? "fill-accent stroke-accent" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-transparent"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-bold text-foreground">
                  ${vinyl.price}
                </p>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $50
                </p>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-border bg-card p-6">
              <h3 className="font-bold text-foreground">Product Details</h3>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Release Year</span>
                  <span className="font-medium text-foreground">
                    {vinyl.year}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condition</span>
                  <span className="font-medium text-foreground">
                    {vinyl.condition}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Genre</span>
                  <span className="font-medium text-foreground">
                    {vinyl.genre}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-medium text-foreground">
                    12" LP Vinyl
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center rounded-lg border border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-r-none"
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-l-none"
                >
                  +
                </Button>
              </div>
              <Button
                size="lg"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-accent text-accent-foreground font-bold hover:bg-accent/90"
              >
                Buy Now
              </Button>
            </div>

            <div className="space-y-4 rounded-lg bg-muted/50 p-6">
              <div className="flex items-start gap-3">
                <Disc className="mt-1 h-5 w-5 text-primary" />
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground">
                    Authentic Vinyl Experience
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Each record is carefully inspected and graded to ensure the
                    highest quality. We guarantee authentic pressings with
                    detailed condition reports.
                  </p>
                </div>
              </div>
            </div>

            {/* Section Spotify & Tracklist pour Or Noir de Kaaris */}
            {vinyl.title === "Or Noir" && vinyl.artist === "Kaaris" && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row gap-8 items-stretch">
                  <div className="flex-1 space-y-2 min-w-[280px]">
                    <h3 className="font-bold text-foreground text-xl">
                      Écouter l’album
                    </h3>
                    <div className="rounded-lg overflow-hidden">
                      <iframe
                        src="https://open.spotify.com/embed/album/0Zj0SbVg3AQQaCVIS1TDN9?utm_source=generator&theme=0"
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        style={{ borderRadius: "12px" }}
                        title="Spotify Or Noir Kaaris"
                      ></iframe>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 min-w-[200px]">
                    <h3 className="font-bold text-foreground text-xl">
                      Tracklist
                    </h3>
                    <div className="rounded-lg border border-border bg-card p-4 h-[352px] flex flex-col justify-center">
                      <table className="w-full text-sm text-muted-foreground">
                        <thead>
                          <tr>
                            <th className="text-left font-semibold pb-2">
                              Titre
                            </th>
                            <th className="text-right font-semibold pb-2">
                              Durée
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1. Or Noir</td>
                            <td className="text-right">3:44</td>
                          </tr>
                          <tr>
                            <td>2. Zoo</td>
                            <td className="text-right">3:36</td>
                          </tr>
                          <tr>
                            <td>3. Paradis ou enfer</td>
                            <td className="text-right">3:38</td>
                          </tr>
                          <tr>
                            <td>4. Chargé</td>
                            <td className="text-right">3:32</td>
                          </tr>
                          <tr>
                            <td>5. Se-vrak</td>
                            <td className="text-right">3:32</td>
                          </tr>
                          <tr>
                            <td>6. Bizon</td>
                            <td className="text-right">3:36</td>
                          </tr>
                          <tr>
                            <td>7. Tu dois des sous</td>
                            <td className="text-right">3:36</td>
                          </tr>
                          <tr>
                            <td>8. 2 et demi</td>
                            <td className="text-right">3:36</td>
                          </tr>
                          <tr>
                            <td>9. Je bibi</td>
                            <td className="text-right">3:36</td>
                          </tr>
                          <tr>
                            <td>10. Élégance</td>
                            <td className="text-right">3:36</td>
                          </tr>
                          <tr>
                            <td>11. J’suis passé chez So</td>
                            <td className="text-right">3:36</td>
                          </tr>
                          <tr>
                            <td>12. Kalash</td>
                            <td className="text-right">3:36</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-foreground text-xl">
                    À propos de l’album
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Or Noir est le premier album studio de Kaaris, sorti en
                    2013. Véritable référence du rap français, il se distingue
                    par ses productions sombres et son flow percutant. L’album a
                    marqué une génération et contient plusieurs classiques du
                    genre.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

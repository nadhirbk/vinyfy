import { NextResponse } from "next/server";
import { vinyls } from "@/lib/vinyl-data";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // MOCK : Simule une réponse d’API Discogs/Spotify
  // À remplacer par un vrai fetch vers l’API musicale
  const apiRecommendations = [
    {
      title: "Abbey Road",
      artist: "The Beatles",
      cover: "/abbey-road-vinyl-record-cover.jpg",
    },
    {
      title: "Or Noir",
      artist: "Kaaris",
      cover: "/or-noir-kaaris.jpg",
    },
    {
      title: "Random Album",
      artist: "Unknown Artist",
      cover: "/placeholder.svg",
    },
  ];

  // Croise avec la base locale pour générer le lien produit
  const results = apiRecommendations.map((rec) => {
    const local = vinyls.find(
      (v) =>
        v.title.toLowerCase() === rec.title.toLowerCase() &&
        v.artist.toLowerCase() === rec.artist.toLowerCase()
    );
    return {
      ...rec,
      id: local ? local.id : null,
    };
  });

  return NextResponse.json({ results });
}

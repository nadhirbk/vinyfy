import { useState } from "react";
import { Sparkles, Loader2, Send } from "lucide-react";

interface VinylRecommendation {
  id: string;
  title: string;
  artist: string;
  image: string;
}

export function AiVinylPromptInput() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<VinylRecommendation[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    try {
      // Appel API IA (mock pour l’instant)
      // Remplace par un vrai fetch vers /api/recommend-vinyls
      await new Promise((r) => setTimeout(r, 1200));
      setResults([
        {
          id: "1",
          title: "Abbey Road",
          artist: "The Beatles",
          image: "/abbey-road-vinyl-record-cover.jpg",
        },
        {
          id: "9",
          title: "Or Noir",
          artist: "Kaaris",
          image: "/or-noir-kaaris.jpg",
        },
      ]);
    } catch (err) {
      setError("Une erreur est survenue. Réessaie !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl lg:max-w-[480px] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] rounded-lg shadow-lg"
      >
        <div className="flex items-center bg-background rounded-md px-4 py-2">
          <Sparkles className="h-5 w-5 text-indigo-500 mr-2" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Décris tes goûts, artistes, styles..."
            className="flex-1 bg-transparent text-[16px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            className="ml-2 p-2 rounded-md bg-transparent text-indigo-500 hover:text-indigo-700 transition flex items-center justify-center"
            disabled={loading || !prompt.trim()}
            aria-label="Envoyer"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
      {error && (
        <div className="mt-2 text-sm text-red-500 text-center">{error}</div>
      )}
      {results.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((vinyl) => (
            <div
              key={vinyl.id}
              className="bg-card rounded-lg border border-border p-4 flex flex-col items-center shadow"
            >
              <img
                src={vinyl.image}
                alt={vinyl.title}
                className="w-24 h-24 object-cover rounded mb-2"
              />
              <div className="text-base font-bold text-foreground text-center">
                {vinyl.title}
              </div>
              <div className="text-sm text-muted-foreground text-center">
                {vinyl.artist}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

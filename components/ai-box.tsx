import { useState } from "react";
import { ChatInput, ChatInputTextArea, ChatInputSubmit } from "@/components/ui/chat-input";
import Link from "next/link";

interface Suggestion {
  id: string | null;
  title: string;
  artist: string;
  cover: string;
}

export function AiBox() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<{
    text: string;
    suggestions?: Suggestion[];
  } | null>(null);

  async function handleSubmit() {
    if (!inputValue.trim()) return;
    setLoading(true);
    setError("");
    setResponse(null);
    try {
      const res = await fetch("/api/recommend-vinyls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputValue }),
      });
      const data = await res.json();
      setResponse({
        text:
          data.results && data.results.length > 0
            ? `Voici ce que je te recommande en fonction de ta demande :`
            : "Je n’ai pas trouvé de vinyle correspondant, peux-tu préciser tes goûts ?",
        suggestions: data.results,
      });
      setInputValue("");
    } catch (err) {
      setError("Une erreur est survenue. Réessaie !");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <ChatInput className="border-2 border-zinc-500 dark:border-zinc-600 shadow-md">
        <ChatInputTextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Quels styles, artistes ou ambiances recherchez-vous ?"
          rows={3}
          className="min-h-[80px] text-base py-4 overflow-hidden"
        />
        <ChatInputSubmit
          disabled={inputValue.trim().length === 0 || loading}
          onClick={handleSubmit}
        />
      </ChatInput>
      {error && (
        <div className="mt-2 text-sm text-red-500 text-center">{error}</div>
      )}
      {loading && (
        <div className="mt-4 text-center text-muted-foreground">Recherche en cours...</div>
      )}
      {response && (
        <div className="bg-background rounded-lg border border-zinc-500 dark:border-zinc-600 shadow-md p-4">
          <div className="text-sm text-foreground mb-3">{response.text}</div>
          {response.suggestions && response.suggestions.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {response.suggestions.map((vinyl) => (
                <div
                  key={vinyl.title + vinyl.artist}
                  className="bg-card rounded border border-border p-2 flex flex-col items-center"
                >
                  <img
                    src={vinyl.cover}
                    alt={vinyl.title}
                    className="w-16 h-16 object-cover rounded mb-1"
                  />
                  <div className="text-xs font-bold text-center">{vinyl.title}</div>
                  <div className="text-xs text-muted-foreground text-center mb-1">{vinyl.artist}</div>
                  {vinyl.id ? (
                    <Link
                      href={`/product/${vinyl.id}`}
                      className="text-primary underline text-xs font-medium"
                    >
                      Voir la fiche
                    </Link>
                  ) : (
                    <span className="text-[10px] text-muted-foreground">Non dispo sur le site</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { ChatInput, ChatInputTextArea, ChatInputSubmit } from "@/components/ui/chat-input";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestions?: Array<{ id: string | null; title: string; artist: string; cover: string }>;
}

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Bonjour ! Dis-moi ce que tu recherches ou tes goûts musicaux, je te propose des vinyles adaptés à tes envies.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage() {
    if (!inputValue.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: inputValue }]);
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/recommend-vinyls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputValue }),
      });
      const data = await res.json();
      // Simule une réponse IA conversationnelle
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.results && data.results.length > 0
              ? `Voici ce que je te recommande :`
              : "Je n’ai pas trouvé de vinyle correspondant, peux-tu préciser tes goûts ?",
          suggestions: data.results,
        },
      ]);
      setInputValue("");
    } catch (err) {
      setError("Une erreur est survenue. Réessaie !");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <div className="bg-background rounded-lg border border-zinc-500 dark:border-zinc-600 shadow-md p-4 min-h-[220px] flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.content}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {msg.suggestions.map((vinyl) => (
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
          </div>
        ))}
        {loading && (
          <div className="text-center text-muted-foreground text-xs">Recherche en cours...</div>
        )}
        {error && (
          <div className="text-center text-red-500 text-xs">{error}</div>
        )}
      </div>
      <ChatInput className="border-2 border-zinc-500 dark:border-zinc-600">
        <ChatInputTextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Pose ta question ou décris tes goûts..."
        />
        <ChatInputSubmit
          disabled={inputValue.trim().length === 0 || loading}
          onClick={sendMessage}
        />
      </ChatInput>
    </div>
  );
}

"use client";
import { useState, useRef, useEffect } from "react";

export default function DamanAI() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hey! I’m Daman’s AI. Ask me anything about him." },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [providerInfo, setProviderInfo] = useState("Groq"); // dynamic footer text
    const listRef = useRef(null);

    // Fetch provider/model info for the footer
    useEffect(() => {
        let alive = true;
        fetch("/api/daman-ai")
            .then(r => r.json())
            .then(j => {
                if (!alive) return;
                if (j?.hasGroqKey && j?.groqModel) {
                    setProviderInfo(`Groq (${j.groqModel})`);
                } else if (j?.ok) {
                    setProviderInfo("Groq");
                }
            })
            .catch(() => { });
        return () => { alive = false; };
    }, []);

    // Auto-scroll to newest message
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);

    async function sendMessage() {
        const text = input.trim();
        if (!text || loading) return;

        const next = [...messages, { role: "user", content: text }];
        setMessages(next);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/daman-ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: next }),
            });

            // Try to parse JSON even on errors, so we can surface server messages
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                const msg = data?.error || `Request failed (HTTP ${res.status})`;
                throw new Error(msg);
            }

            const answer = data?.answer ?? "Sorry, no answer was returned.";
            setMessages((m) => [...m, { role: "assistant", content: answer }]);
        } catch (e) {
            setMessages((m) => [
                ...m,
                { role: "assistant", content: `Error: ${e?.message || "Unknown error"}` },
            ]);
        } finally {
            setLoading(false);
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    function resetChat() {
        setMessages([
            { role: "assistant", content: "Hey! I’m Daman’s AI. Ask me anything about him." },
        ]);
    }

    return (
        <div className="w-full mx-auto max-w-3xl rounded-2xl border shadow-sm bg-white/90 dark:bg-zinc-900/70 backdrop-blur p-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-2">
                Wanna know more about me?
            </h3>
            <p className="text-center text-sm md:text-base text-zinc-600 dark:text-zinc-300 mb-4">
                Give it a try, and ask Daman’s self-made AI agent below.
            </p>

            <div
                ref={listRef}
                className="h-72 overflow-y-auto pr-1 rounded-xl border bg-white/60 dark:bg-zinc-900/60 p-4 space-y-3 flex flex-col"
                aria-live="polite"
            >
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={
                            m.role === "assistant"
                                ? "self-start max-w-[85%] rounded-2xl px-4 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100"
                                : "self-end max-w-[85%] rounded-2xl px-4 py-3 bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100"
                        }
                    >
                        <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-[15px]">
                            {m.content}
                        </p>
                    </div>
                ))}
                {loading && (
                    <div className="self-start max-w-[85%] rounded-2xl px-4 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
                        <p className="animate-pulse">Thinking…</p>
                    </div>
                )}
            </div>

            <div className="mt-4 flex gap-2">
                <textarea
                    className="flex-1 resize-none h-12 md:h-14 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-950"
                    placeholder="Ask about Daman’s skills, certs, projects, experience…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="px-4 md:px-5 rounded-xl font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white"
                >
                    {loading ? "Sending…" : "Send"}
                </button>
                <button
                    onClick={resetChat}
                    disabled={loading}
                    className="px-3 md:px-4 rounded-xl font-medium border hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    title="Clear conversation"
                >
                    Reset
                </button>
            </div>

            <p className="text-xs text-center mt-3 text-zinc-500">
                Powered by {providerInfo} • Answers use a profile context that Daman control.
            </p>
        </div>
    );
}

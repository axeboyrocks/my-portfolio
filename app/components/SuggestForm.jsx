"use client";
import { useState } from "react";

export default function SuggestForm() {
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error
    const [error, setError] = useState("");

    async function onSubmit(e) {
        e.preventDefault();
        setStatus("sending");
        setError("");

        const form = e.currentTarget;
        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim(),
        };

        try {
            const res = await fetch("/api/suggest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send");
            setStatus("sent");
            form.reset();
        } catch (err) {
            setStatus("error");
            setError(err.message);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-3">
            <input
                type="text"
                name="name"
                placeholder="Your name (optional)"
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-neutral-500"
            />
            <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-neutral-500"
            />
            <textarea
                name="message"
                required
                rows={4}
                placeholder="Your suggestion…"
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-neutral-500"
            />
            <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-lg bg-white text-black text-sm font-semibold py-2 hover:bg-neutral-200 transition disabled:opacity-60"
            >
                {status === "sending" ? "Sending…" : "Send suggestion"}
            </button>

            {status === "sent" && (
                <p className="text-green-400 text-sm">Thanks! Your suggestion was sent.</p>
            )}
            {status === "error" && (
                <p className="text-red-400 text-sm">Failed to send: {error}</p>
            )}
        </form>
    );
}

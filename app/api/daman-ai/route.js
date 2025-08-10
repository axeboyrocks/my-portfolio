import { NextResponse } from "next/server";
import { aboutMe } from "../../data/about";

export const runtime = "nodejs";

// ===== Config =====
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = (process.env.GROQ_MODEL || "llama3-8b-8192").trim();
const MAX_TOKENS = 256;
const TEMP = 0.4;

// Build the system prompt from your profile
function buildSystemPrompt() {
    return (
        "You are Daman's on-page portfolio assistant. Only answer using the facts in the ABOUT ME block. " +
        "If asked about anything outside those facts, say you don't have that info and invite the user to ask about Daman. " +
        "Be concise and friendly.\n\nABOUT ME:\n" + aboutMe
    );
}

// === Groq call ===
async function callGroq(messages) {
    const key = (process.env.GROQ_API_KEY || "").trim();
    if (!key) throw new Error("Groq: Missing GROQ_API_KEY.");

    const groqMessages = [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: "Be helpful and brief." },
        ...messages,
    ];

    const res = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: GROQ_MODEL,
            messages: groqMessages,
            temperature: TEMP,
            max_tokens: MAX_TOKENS,
        }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Groq ${res.status}: ${text}`);
    }

    const data = await res.json();
    const answer =
        data?.choices?.[0]?.message?.content?.trim() ||
        "Sorry, I couldn't generate a reply.";
    return answer;
}

// simple local fallback if cloud call fails
function localAnswer(messages) {
    const q = (messages.at(-1)?.content || "").toLowerCase();

    const name = /name:\s*(.+)/i.exec(aboutMe)?.[1]?.split("\n")[0]?.trim();
    const location = /location:\s*(.+)/i.exec(aboutMe)?.[1]?.split("\n")[0]?.trim();
    const certs = /certs:\s*(.+)/i.exec(aboutMe)?.[1]?.split("\n")[0]?.trim();
    const role = /role:\s*(.+)/i.exec(aboutMe)?.[1]?.split("\n")[0]?.trim();

    if (q.includes("full name") || q.match(/\bname\b/)) return name ? `His full name is ${name}.` : "I don't have his full name.";
    if (q.includes("location") || q.includes("where")) return location ? `Based in ${location}.` : "No location listed.";
    if (q.includes("cert")) return certs ? `Certifications: ${certs}.` : "No certifications listed.";
    if (q.includes("role") || q.includes("job")) return role ? `Role: ${role}.` : "No role listed.";

    const basics = [name && `Name: ${name}`, location && `Location: ${location}`, role && `Role: ${role}`, certs && `Certs: ${certs}`].filter(Boolean);
    return basics.length ? basics.join("\n") : "I can answer questions about Daman based on the profile context.";
}

// === Handlers ===
export async function POST(req) {
    try {
        const { messages } = await req.json();
        if (!Array.isArray(messages)) {
            return NextResponse.json({ error: "messages must be an array" }, { status: 400 });
        }

        try {
            const answer = await callGroq(messages);
            return NextResponse.json({ answer });
        } catch (cloudErr) {
            console.error("Cloud Error:", cloudErr.message);
            // Fallback keeps your site working even if network blocks cloud APIs
            return NextResponse.json({ answer: localAnswer(messages) });
        }
    } catch (err) {
        console.error("Route Error:", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// Health check for footer model text
export async function GET() {
    return NextResponse.json({
        ok: true,
        groqModel: GROQ_MODEL,
        hasGroqKey: !!(process.env.GROQ_API_KEY || "").trim(),
    });
}

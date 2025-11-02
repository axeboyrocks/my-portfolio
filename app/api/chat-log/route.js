import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_BYTES = 50 * 1024; // 50 KB limit per chat log

function extractIp(req) {
    // Try forwarded header first (Vercel/proxies), then socket
    const xff = req.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();
    const socketAddr = req.headers.get("x-real-ip");
    if (socketAddr) return socketAddr;
    try {
        // In Node runtime we can attempt to read from socket via req.socket
        // but Next.js Request doesn't expose socket here; fallback to unknown
        return "unknown";
    } catch (e) {
        return "unknown";
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { messages, includeIP } = body || {};

        if (!Array.isArray(messages)) {
            return NextResponse.json({ ok: false, error: "messages must be an array" }, { status: 400 });
        }

        const payload = JSON.stringify(messages || []);
        if (Buffer.byteLength(payload, "utf8") > MAX_BYTES) {
            return NextResponse.json({ ok: false, error: "Chat log too large" }, { status: 413 });
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY env var." }, { status: 500 });
        }

        const FROM = process.env.RESEND_FROM || "Portfolio Message <onboarding@resend.dev>";
        const TO = process.env.CONTACT_TO_EMAIL || "damanpreet.nov@gmail.com";

        const resend = new Resend(apiKey);

        // Build email content
        const ip = includeIP ? extractIp(req) : "(not included by user)";

        const html = `
          <div>
            <p><strong>Chat log received</strong></p>
            <p><strong>Include IP:</strong> ${includeIP ? "yes" : "no"}</p>
            <p><strong>IP:</strong> ${ip}</p>
            <hr />
            <pre style="white-space:pre-wrap;font-family:monospace;background:#111;color:#fff;padding:12px;border-radius:6px;">${escapeHtml(
                payload
            )}</pre>
          </div>
        `;

        const text = `Include IP: ${includeIP ? "yes" : "no"}\nIP: ${ip}\n\n${payload}`;

        const subject = "AI chat log";

        const result = await resend.emails.send({
            from: FROM,
            to: [TO],
            subject,
            html,
            text,
        });

        if (result?.error) {
            return NextResponse.json({ ok: false, error: result.error.message || "Resend error" }, { status: 502 });
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err) {
        console.error("chat-log send failed:", err);
        return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 });
    }
}

function escapeHtml(s) {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export function GET() {
    return NextResponse.json({ ok: true });
}

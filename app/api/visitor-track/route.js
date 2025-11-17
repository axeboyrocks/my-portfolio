import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// In-memory rate limiting: track last email sent time per IP
// In production, consider moving to Redis/DB for persistence across serverless instances
const ipLastEmailTime = new Map();
const RATE_LIMIT_MS = 60 * 60 * 1000; // 1 hour

function extractIp(req) {
    const xff = req.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();
    const realIp = req.headers.get("x-real-ip");
    if (realIp) return realIp;
    return "unknown";
}

function shouldRateLimit(ip) {
    const now = Date.now();
    const lastTime = ipLastEmailTime.get(ip);
    if (lastTime && now - lastTime < RATE_LIMIT_MS) {
        return true; // Rate limited
    }
    ipLastEmailTime.set(ip, now);
    return false;
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { userAgent, referrer, pageUrl } = body || {};

        const ip = extractIp(req);

        // Rate limit: 1 email per IP per hour
        if (shouldRateLimit(ip)) {
            return NextResponse.json({ ok: true, rateLimited: true }, { status: 200 });
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY env var." }, { status: 500 });
        }

        const FROM = process.env.RESEND_FROM || "Portfolio Message <onboarding@resend.dev>";
        const TO = process.env.CONTACT_TO_EMAIL || "damanpreet.nov@gmail.com";

        const resend = new Resend(apiKey);

        const timestamp = new Date().toISOString();

        const html = `
          <div style="font-family:Arial,sans-serif;color:#333;">
            <h2>A visitor stopped by 👋</h2>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            <p><strong>IP Address:</strong> ${escapeHtml(ip)}</p>
            <p><strong>Page:</strong> ${escapeHtml(pageUrl || "unknown")}</p>
            <p><strong>Referrer:</strong> ${escapeHtml(referrer || "(direct)")}</p>
            <p><strong>User-Agent:</strong></p>
            <pre style="background:#f5f5f5;padding:10px;border-radius:4px;overflow-x:auto;">${escapeHtml(
                userAgent || "unknown"
            )}</pre>
          </div>
        `;

        const text = `A visitor stopped by
Timestamp: ${timestamp}
IP Address: ${ip}
Page: ${pageUrl || "unknown"}
Referrer: ${referrer || "(direct)"}
User-Agent: ${userAgent || "unknown"}`;

        const result = await resend.emails.send({
            from: FROM,
            to: [TO],
            subject: "A visitor stopped by 👋",
            html,
            text,
        });

        if (result?.error) {
            console.error("Resend error:", result.error);
            return NextResponse.json({ ok: false, error: result.error.message || "Resend error" }, { status: 502 });
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err) {
        console.error("visitor-track error:", err);
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

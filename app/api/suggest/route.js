import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs"; // ensure Node (not Edge)

export async function POST(req) {
    try {
        // 1) Validate JSON input
        let body;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json(
                { ok: false, error: "Invalid JSON payload." },
                { status: 400 }
            );
        }

        const { name, email, message, subject } = body || {};
        if (!email || !message) {
            return NextResponse.json(
                { ok: false, error: "Email and message are required." },
                { status: 400 }
            );
        }

        // 2) Load secret (server-side only)
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { ok: false, error: "Missing RESEND_API_KEY env var." },
                { status: 500 }
            );
        }

        // 3) Configure sender/recipient
        // - While testing, keep onboarding@resend.dev and TO = your own Resend account email.
        // - After verifying a domain in Resend, set RESEND_FROM + CONTACT_TO_EMAIL in your env and restart.
        const FROM =
            process.env.RESEND_FROM || "Network Lab Page Portfolio <onboarding@resend.dev>";
        const TO = process.env.CONTACT_TO_EMAIL || "damanpreet.nov@gmail.com";

        const resend = new Resend(apiKey);

        const result = await resend.emails.send({
            from: FROM,
            to: [TO],
            reply_to: email || undefined,
            subject: subject || `Message came from NL page from ${name || "Visitor"}`,
            html: `
        <div>
          <p><strong>Name:</strong> ${name || "Anonymous"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${String(message).replace(/\n/g, "<br/>")}</p>
        </div>
      `,
            text: `From: ${name || "Anonymous"} <${email}>\n\n${message}`,
        });

        // If Resend returns an error object, surface it
        if (result?.error) {
            return NextResponse.json(
                { ok: false, error: result.error.message || "Resend error" },
                { status: 502 }
            );
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err) {
        console.error("Contact send failed:", err);
        return NextResponse.json(
            { ok: false, error: err?.message || "Unknown error" },
            { status: 500 }
        );
    }
}

export function GET() {
    return NextResponse.json(
        { ok: false, error: "Method not allowed" },
        { status: 405 }
    );
}

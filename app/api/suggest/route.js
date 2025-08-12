import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req) {
    try {
        const { name, email, message, subject } = await req.json();

        if (!email || !message) {
            return NextResponse.json(
                { ok: false, error: "Email and message are required." },
                { status: 400 }
            );
        }

        const apiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { ok: false, error: "Missing RESEND_API_KEY env var." },
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);

        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>", // works in sandbox; swap later if you add a custom domain
            to: "your-real-email@example.com",          // <-- put your email here
            reply_to: email,
            subject: subject || "New portfolio message",
            text: `From: ${name || "Anonymous"} <${email}>\n\n${message}`,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}

export function GET() {
    return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}

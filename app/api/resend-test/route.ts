import { NextResponse } from 'next/server';
import { Resend } from 'resend';
export const runtime = 'nodejs';

export async function GET() {
    try {
        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json({ ok: false, error: 'Missing key' }, { status: 500 });
        }
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Use Resend's onboarding sender (works without verifying a domain)
        const result = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['damanpreet.nov@gmail.com'], // change to your inbox
            subject: 'Resend test from localhost',
            html: '<p>Hello from /api/resend-test</p>',
        });

        console.log('Resend test result:', result);
        return NextResponse.json({ ok: true, result });
    } catch (e: any) {
        console.error('Resend test error:', e);
        return NextResponse.json({ ok: false, error: e?.message || 'Unknown' }, { status: 500 });
    }
}

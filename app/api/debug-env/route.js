import { NextResponse } from 'next/server';
export const runtime = 'nodejs'; // Ensure Node.js runtime

export async function GET() {
    return NextResponse.json({
        RESEND_API_KEY_present: !!process.env.RESEND_API_KEY
    });
}

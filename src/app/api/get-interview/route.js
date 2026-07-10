import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/core/db/db';
import { MockInterview } from '@/core/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const mockId = searchParams.get('mockId');

        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, mockId));

        return NextResponse.json(result[0] || null);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

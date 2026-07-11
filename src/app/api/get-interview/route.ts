import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/core/db/db';
import { MockInterview } from '@/core/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const GetInterviewSchema = z.object({
    mockId: z.string().min(1, "mockId is required"),
});

export async function GET(req: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const mockId = searchParams.get('mockId');

        const parseResult = GetInterviewSchema.safeParse({ mockId });
        if (!parseResult.success) {
            return NextResponse.json({ error: parseResult.error.message }, { status: 400 });
        }

        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, parseResult.data.mockId));

        return NextResponse.json(result[0] || null);
    } catch (error: any) {
        console.error("Error fetching interview:", error);
        return NextResponse.json({ error: "Failed to fetch interview" }, { status: 500 });
    }
}

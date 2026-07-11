import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/core/db/db';
import { UserAnswer } from '@/core/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const GetFeedbackSchema = z.object({
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

        const parseResult = GetFeedbackSchema.safeParse({ mockId });
        if (!parseResult.success) {
            return NextResponse.json({ error: parseResult.error.message }, { status: 400 });
        }

        const result = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, parseResult.data.mockId));

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("Error fetching feedback:", error);
        return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
    }
}

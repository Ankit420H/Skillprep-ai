import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/core/db/db';
import { UserAnswer } from '@/core/db/schema';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';

const SaveAnswerSchema = z.object({
    mockIdRef: z.string(),
    question: z.string(),
    correctAns: z.string().optional(),
    userAns: z.string(),
    feedback: z.string(),
    rating: z.string(),
    userEmail: z.string().email(),
});

export async function POST(req: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const body = await req.json();
        const parseResult = SaveAnswerSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json({ error: parseResult.error.message }, { status: 400 });
        }

        const result = await db.insert(UserAnswer).values(parseResult.data).returning();
        return NextResponse.json(result[0]);
    } catch (error: any) {
        console.error("Error saving answer:", error);
        return NextResponse.json({ error: "Failed to save answer" }, { status: 500 });
    }
}

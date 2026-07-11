import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/core/db/db';
import { eq } from 'drizzle-orm';
import { UserAnswer } from '@/core/db/schema';
import { z } from 'zod';

const FetchUserDataSchema = z.object({
    userEmail: z.string().email(),
});

export async function POST(req: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const parseResult = FetchUserDataSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json({ error: parseResult.error.message }, { status: 400 });
        }

        const userAnswers = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.userEmail, parseResult.data.userEmail));

        return NextResponse.json({
            userAnswers: userAnswers.length > 0 ? userAnswers : []
        }, { status: 200 });

    } catch (err: unknown) {
        console.error("Error fetching user data:", err);
        return NextResponse.json({
            error: "Failed to fetch user data",
        }, { status: 500 });
    }
}
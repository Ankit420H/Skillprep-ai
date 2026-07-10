import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/core/db/db';
import { eq } from 'drizzle-orm';
import { UserAnswer } from '@/core/db/schema';

export async function POST(request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { userEmail } = await request.json();

        const userAnswers = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.userEmail, userEmail));

        return NextResponse.json({
            userAnswers: userAnswers.length > 0 ? userAnswers : []
        }, { status: 200 });

    } catch (err) {
        console.error('Fetch error:', err);
        return NextResponse.json({
            message: 'Internal server error',
            error: err.message
        }, { status: 500 });
    }
}
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/core/db/db';
import { MockInterview } from '@/core/db/schema';
import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';

const GetInterviewsSchema = z.object({
    userEmail: z.string().email(),
});

export async function GET(req: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const userEmail = searchParams.get('userEmail');

        const parseResult = GetInterviewsSchema.safeParse({ userEmail });
        if (!parseResult.success) {
            return NextResponse.json({ error: parseResult.error.message }, { status: 400 });
        }

        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, parseResult.data.userEmail))
            .orderBy(desc(MockInterview.id));

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("Error fetching interviews:", error);
        return NextResponse.json({ error: "Failed to fetch interviews" }, { status: 500 });
    }
}

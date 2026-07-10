import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/core/db/db';
import { MockInterview, UserAnswer } from '@/core/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(req) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const mockId = searchParams.get('mockId');

        if (!mockId) {
            return NextResponse.json({ error: "Mock ID is required" }, { status: 400 });
        }

        // First delete associated answers
        await db.delete(UserAnswer).where(eq(UserAnswer.mockIdRef, mockId));

        // Then delete the interview
        await db.delete(MockInterview).where(eq(MockInterview.mockId, mockId));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/core/db/db';
import { MockInterview } from '@/core/db/schema';

export async function POST(req) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const result = await db.insert(MockInterview).values(data).returning();
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error creating interview:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

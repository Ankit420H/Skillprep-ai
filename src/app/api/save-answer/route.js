import { NextResponse } from 'next/server';
import { db } from '@/core/db/db';
import { UserAnswer } from '@/core/db/schema';
import { auth } from '@clerk/nextjs/server';

export async function POST(req) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const data = await req.json();
        const result = await db.insert(UserAnswer).values({
            ...data,
            createdAt: `${String(new Date().getDate()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${new Date().getFullYear()}`,
        });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

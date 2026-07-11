import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/core/db/db';
import { MockInterview } from '@/core/db/schema';
import { z } from 'zod';

const CreateInterviewSchema = z.object({
    jsonMockResp: z.string(),
    jobPosition: z.string().min(2, "Job position is required"),
    jobDesc: z.string().min(10, "Job description is too short"),
    jobExperience: z.string().min(1, "Job experience is required"),
    createdBy: z.string().email(),
    mockId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const parseResult = CreateInterviewSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json({ error: parseResult.error.message }, { status: 400 });
        }

        const data = parseResult.data;
        const result = await db.insert(MockInterview).values(data).returning();
        
        return NextResponse.json(result[0]);
    } catch (error: any) {
        console.error("Error creating interview:", error);
        return NextResponse.json({ error: "Failed to create interview" }, { status: 500 });
    }
}

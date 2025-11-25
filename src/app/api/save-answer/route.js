import { NextResponse } from 'next/server';
import { db } from '@/core/db/db';
import { UserAnswer } from '@/core/db/schema';
import moment from 'moment';

export async function POST(req) {
    try {
        const data = await req.json();
        const result = await db.insert(UserAnswer).values({
            ...data,
            createdAt: moment().format("DD-MM-YYYY"),
        });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

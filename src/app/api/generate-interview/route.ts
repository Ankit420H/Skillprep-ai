import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const models = [
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
    "gemini-pro",
    "gemini-1.5-pro-latest"
];

const config = {
    temperature: 0.7,
    topP: 0.9,
    topK: 32,
    maxOutputTokens: 4096,
    responseMimeType: "text/plain",
};

const GenerateInterviewSchema = z.object({
    prompt: z.string().min(10, "Prompt must be at least 10 characters long"),
});

async function tryModel(genAI: GoogleGenerativeAI, modelId: string, prompt: string, retries = 2) {
    const model = genAI.getGenerativeModel({ model: modelId });
    const session = model.startChat({ generationConfig: config });

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const result = await session.sendMessage(prompt);
            return { ok: true, model: modelId, text: result.response.text() };
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            const isRateLimit = errorMessage.includes('429') || errorMessage.includes('Quota exceeded');

            if (isRateLimit && attempt < retries) {
                const delay = 1000 * Math.pow(2, attempt - 1);
                console.warn(`${modelId} rate limited (attempt ${attempt}/${retries}). Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }

            if (attempt === retries) {
                return { ok: false, model: modelId, error: err };
            }
        }
    }
    return { ok: false, model: modelId, error: new Error("Max retries exceeded") };
}

export async function POST(req: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const parseResult = GenerateInterviewSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json({ error: parseResult.error.message }, { status: 400 });
        }

        const { prompt } = parseResult.data;

        const apiKey = process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API key not configured" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        for (const modelId of models) {
            const result = await tryModel(genAI, modelId, prompt);
            if (result.ok) {
                return NextResponse.json({ model: result.model, text: result.text });
            }
            console.warn(`${modelId} failed:`, result.error instanceof Error ? result.error.message : String(result.error));
        }

        // FALLBACK
        const mockResponse = `[
            {
                "question": "Could you describe a challenging project you worked on and how you handled technical debt?",
                "answer": "I once worked on a legacy system where technical debt was slowing down feature delivery. I initiated a refactoring plan, prioritizing critical modules first."
            }
        ]`;

        return NextResponse.json({
            model: "fallback-mock-data",
            text: mockResponse
        });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

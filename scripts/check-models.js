const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
        console.error("No API Key found in .env.local");
        return;
    }

    console.log("Using API Key:", apiKey.substring(0, 5) + "...");

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        // There isn't a direct listModels method on the client instance in some versions, 
        // but we can try to hit the API or just test a few known ones.
        // Actually, the Node SDK doesn't expose listModels directly on the main class in all versions.
        // Let's try to just run a simple generation on a few common names to see which one works.

        const modelsToTest = [
            "gemini-1.5-flash",
            "gemini-1.5-pro",
            "gemini-1.0-pro",
            "gemini-pro",
            "gemini-2.0-flash-exp"
        ];

        console.log("Testing models...");

        for (const modelName of modelsToTest) {
            console.log(`\nTesting ${modelName}...`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello, are you working?");
                const response = await result.response;
                console.log(`✅ ${modelName} SUCCESS:`, response.text().substring(0, 20));
            } catch (error) {
                console.log(`❌ ${modelName} FAILED:`, error.message.split('\n')[0]);
            }
        }

    } catch (error) {
        console.error("Global Error:", error);
    }
}

listModels();

const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API key found in .env.local");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy model to get client
        // Actually, we need to access the model manager if exposed, or just try to list.
        // The SDK doesn't have a direct 'listModels' on the instance usually, it's often a separate call or on the client.
        // Let's check the SDK documentation or try to use the API directly if SDK doesn't support it easily.
        // Wait, the error message said "Call ListModels".

        // In the Node SDK:
        // import { GoogleGenerativeAI } from "@google/generative-ai";
        // const genAI = new GoogleGenerativeAI(API_KEY);
        // const model = genAI.getGenerativeModel({ model: "MODEL_NAME" });

        // There isn't a direct listModels on genAI instance in some versions.
        // Let's try to just use a simple fetch to the REST API to list models.

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        console.log("Available Models:", JSON.stringify(data, null, 2));

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();

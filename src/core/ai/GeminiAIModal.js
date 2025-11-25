// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "models/gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// const safetySettings=[
//   {
//       category:HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//   },
//   {
//       category:HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//       threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//   },
//   {
//       category:HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//       threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//   },
//   {
//       category:HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//       threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//   }
// ];

// export const chatSession = model.startChat({
//     generationConfig,
//     safetySettings,
//   });

// pages/api/generate-interview.js
// Server-side API route (Next.js pages API). Uses @google/generative-ai SDK.
// Keep your real API key in process.env.GOOGLE_API_KEY (server-only).

const { GoogleGenerativeAI } = require("@google/generative-ai");

const candidateModels = [
  "models/gemini-2.5-flash",
  "models/gemini-2.1-pro",
  "models/gemini-1.5-pro",
  "models/gemini-1.5-flash",
  "models/gemini-1.0-pro"
];

const generationConfig = {
  temperature: 0.9,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1024,
  responseMimeType: "text/plain",
};

async function tryGenerateWithModel(genAI, modelId, prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: modelId });

    // Start a chat session (the SDK provides startChat). We'll send a single prompt message.
    const chatSession = model.startChat({ generationConfig });

    // The SDK's sendMessage API: we send our prompt as a user role message.
    const result = await chatSession.sendMessage(prompt);

    // result.response.text() returns the textual response body.
    const text = await result.response.text();
    return { ok: true, model: modelId, text };
  } catch (err) {
    // Return the error to allow fallback without throwing immediately.
    return { ok: false, model: modelId, error: err };
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing 'prompt' in request body." });
  }

  // Ensure API key is server-side only!
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error("Missing process.env.GOOGLE_API_KEY");
    return res.status(500).json({
      error:
        "Server misconfigured: missing GOOGLE_API_KEY. Add it to your environment (server-side only).",
    });
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Try candidate models in order. Return the first successful generation.
  for (const modelId of candidateModels) {
    const tryResult = await tryGenerateWithModel(genAI, modelId, prompt);

    if (tryResult.ok) {
      return res.status(200).json({
        model: tryResult.model,
        text: tryResult.text,
      });
    } else {
      // Log the failure and continue to next model
      console.warn(
        `Model ${modelId} failed. Error:`,
        tryResult.error && tryResult.error.message
          ? tryResult.error.message
          : tryResult.error
      );
      // If it's a 404 or model-not-found scenario, we continue to next candidate.
      // For other errors we also continue — the loop tries many candidates.
    }
  }

  // If none of the candidates worked:
  return res.status(502).json({
    error:
      "All candidate models failed. Check your API key has access to the Generative Language API and that billing is enabled. See server logs for per-model errors.",
  });
}

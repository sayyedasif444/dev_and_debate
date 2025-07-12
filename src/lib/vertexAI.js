import { VertexAI } from '@google-cloud/vertexai';

const vertexAi = new VertexAI({
  project: process.env.GCP_PROJECT_ID,
  location: 'us-central1',
  // No need to pass credentials — GOOGLE_APPLICATION_CREDENTIALS handles it
});

const modelGemini = vertexAi.getGenerativeModel({
  model: 'gemini-1.5-pro',
  generationConfig: {
    temperature: 0.7,
    topK: 32,
    topP: 1,
    maxOutputTokens: 1024,
  },
});

export { modelGemini };

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { AI_API_KEY } = require('../config/server.config');


async function callGemini(userPrompt) {

    const genAI = new GoogleGenerativeAI(AI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-3.1-flash-lite-preview",
        generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.1,
            maxOutputTokens: 500
        }
    });

    try {
        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        return response.text();

    } catch (error) {
        console.error("Gemini API Error Detail ", error);
        throw error;
    }
}

function parseJSON(raw) {
    const cleaned = raw.replace(/```json|```/g, '').trim();
    try {
        return JSON.parse(cleaned);
    } catch (err) {
        console.error(`Failed to parse  ${raw}`);
        throw new Error('AI returned an unexpected format ');
    }
}

async function analyzeCode({ code, language, problemTitle }) {
    try {
        const userPrompt = `Analyze the code complexity. 
        Respond ONLY with this JSON structure:
        {"timeComplexity": "O(...)", "spaceComplexity": "O(...)"}
        
        Language: ${language}
        Problem: ${problemTitle || 'Generic Analysis'}
        Code: ${code}`;

        const raw = await callGemini(userPrompt);
        return parseJSON(raw);

    } catch (error) {
        console.error("Analysis Error ", error.message);
        return {
            timeComplexity: "Unavailable",
            spaceComplexity: "Unavailable"
        };
    }
}

module.exports = { analyzeCode };
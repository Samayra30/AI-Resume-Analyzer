const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeResume(resumeText) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key is missing.");
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON in the following format.

{
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:
${resumeText}
`,
    });

    const cleanedResponse = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Gemini Service Error:", error);

    throw new Error("Failed to analyze resume using Gemini AI.");
  }
}

module.exports = {
  analyzeResume,
};
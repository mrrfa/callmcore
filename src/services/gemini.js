import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
} else {
    console.warn("VITE_GEMINI_API_KEY is not set in .env");
}

export const getBreathingRecommendation = async (mood, intensity, context) => {
    if (!genAI) {
        console.error("Gemini API not initialized");
        return {
            title: "Calming Breath",
            description: "A simple breathing pattern to help you center yourself. (API Key Missing)",
            timings: { inhale: 4, hold: 4, exhale: 4 },
            instruction: "Breathe gently."
        };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const prompt = `
            Act as an expert breathwork coach. Create a personalized breathing exercise based on the following user state:
            - Mood: "${mood?.label || 'Neutral'}"
            - Intensity: "${intensity?.label || 'Medium'}"
            - Context/Specific Situation: "${context || 'None'}"

            **CRITICAL RULES FOR CHRONIC CONDITIONS:**
            - If Context includes "Asthma", "Tight Breathing", "COPD", or "Panic":
              - **NO BREATH HOLDS** (hold = 0).
              - Focus on slow nasal inhaling and long exhales.
            - If Context includes "Anxiety" or "Panic":
              - Exhale must be longer than Inhale (e.g., 4-0-6 or 4-0-8).

            **SPECIFIC SCENARIOS:**
            - "Presentation Soon" + "Anxiety": Suggest "Box Breathing" or "Physiological Sigh".
            - "Post Workout": Suggest "Coherent Breathing" with long exhales to recover.
            - "Focus": Suggest "Balanced Breathing" (e.g., 4-0-4 or 4-4-4-4).
            
            **OUTPUT FORMAT:**
            Return ONLY a valid JSON object. Do not include markdown formatting like \`\`\`json.
            {
                "title": "Name of the technique",
                "description": "Why this helps to the specific context (max 2 sentences).",
                "timings": {
                    "inhale": number (seconds),
                    "hold": number (seconds),
                    "exhale": number (seconds)
                },
                "instruction": "Short guidance phrase (e.g., 'Inhale confidence, exhale doubt').",
                "warning": "Optional safety note if applicable (e.g., 'Do not hold breath if lightheaded').",
                "sequence_advice": "Optional note on how many rounds to do (e.g., 'Do 3 rounds then return to normal breathing')."
            }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        let jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const start = jsonString.indexOf('{');
        const end = jsonString.lastIndexOf('}');
        if (start !== -1 && end !== -1) {
            jsonString = jsonString.substring(start, end + 1);
        }

        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Error generating breathing recommendation:", error);
        return {
            title: "Box Breathing",
            description: "Focus on the square flow of breath to reset your nervous system.",
            timings: { inhale: 4, hold: 4, exhale: 4 },
            instruction: "Find your rhythm."
        };
    }
};

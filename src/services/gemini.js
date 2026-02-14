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
        return [{
            id: "missing_key",
            title: "Calming Breath",
            description: "A simple breathing pattern to help you center yourself. (API Key Missing)",
            difficulty: "Easy",
            timings: { inhale: 4, hold: 4, exhale: 4 },
            instruction: "Breathe gently."
        }];
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const prompt = `
            Act as an expert breathwork coach. Create 3 DISTINCT personalized breathing exercises based on the following user state:
            - Mood: "${mood?.label || 'Neutral'}"
            - Intensity: "${intensity?.label || 'Medium'}"
            - Context/Specific Situation: "${context || 'None (General Wellness)'}"

            **PERSONALIZATION RULES:**
            - **Option 1: Quick Fix (Short & Effective):** Something easy to do immediately (e.g., Physiological Sigh).
            - **Option 2: Balanced (Medium Duration):** A standard technique for the mood (e.g., Box Breathing).
            - **Option 3: Deep Dive (Longer/Immersive):** A more involved technique (e.g., 4-7-8 or specific pranayama).

            **IMPORTANT:** If 'Context' is 'None' or empty, you **MUST** use the 'Mood' and 'Intensity' values to determine the speed and style of the breathing.
            - High Intensity -> Slower, grounding breaths.
            - Low Intensity -> Gentle, rhythmic breaths.
            - Anxious Mood -> Longer exhales.
            - Low Energy Mood -> Energizing inhales.

            **CRITICAL RULES FOR CHRONIC CONDITIONS (Apply to ALL):**
            - If Context includes "Asthma", "Tight Breathing", "COPD", or "Panic":
              - **NO BREATH HOLDS** (hold = 0).
              - Focus on slow nasal inhaling and long exhales.
            - If Context includes "Anxiety" or "Panic":
              - Exhale must be longer than Inhale (e.g., 4-0-6 or 4-0-8).

            **OUTPUT FORMAT:**
            Return ONLY a valid JSON Array containing 3 objects. Do not include markdown formatting.
            [
                {
                    "id": "option_1",
                    "title": "Name of technique",
                    "description": "Why this specific one? (1 sentence)",
                    "difficulty": "Easy" | "Medium" | "Advanced",
                    "timings": { "inhale": 4, "hold": 4, "exhale": 4 },
                    "instruction": "Guidance phrase",
                    "warning": "Optional safety note",
                    "sequence_advice": "e.g., '10 reps'"
                },
                ... (2 more)
            ]
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
        return [
            {
                id: "fallback_1",
                title: "Box Breathing",
                description: "Classic technique to reset focus and calm nerves.",
                difficulty: "Medium",
                timings: { inhale: 4, hold: 4, exhale: 4 },
                instruction: "Find your square.",
                sequence_advice: "4 rounds"
            },
            {
                id: "fallback_2",
                title: "Physiological Sigh",
                description: "Double inhale, long exhale to quickly offload CO2.",
                difficulty: "Easy",
                timings: { inhale: 2, hold: 0, exhale: 6 },
                instruction: "Double inhale... release.",
                sequence_advice: "5 times"
            },
            {
                id: "fallback_3",
                title: "4-7-8 Relax",
                description: "Deep relaxation technique for sleep or calm.",
                difficulty: "Advanced",
                timings: { inhale: 4, hold: 7, exhale: 8 },
                instruction: "Soothe the system.",
                sequence_advice: "4 cycles"
            }
        ];
    }
};

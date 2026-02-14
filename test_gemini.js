import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Manually load .env because we are running with node, not vite
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const apiKey = envConfig.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("No API key found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testConnection() {
    try {
        console.log("Testing with model: gemini-2.0-flash");
        // Trying a known valid model likely intended or available
        let model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        let result = await model.generateContent("Hello, are you working?");
        console.log("gemini-2.0-flash Success:", result.response.text());

        console.log("Testing with model: gemini-3-flash-preview (from codebase)");
        model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        result = await model.generateContent("Hello, are you working?");
        console.log("gemini-3-flash-preview Success:", result.response.text());

    } catch (error) {
        console.error("Error during test:", error.message);
    }
}

testConnection();

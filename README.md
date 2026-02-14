<p align="center"><img src="./img.png" alt="Project Banner" width="100%"></p>

# Callmcore 🎯

## Basic Details
<<<<<<< Updated upstream
**Team Name:** MIRFA&SHYAMA

**Team Members:**
- Mirfa - MUHAMMED ABDURAHIMAN MEMORIAL ORPHANAGE (MAMO) COLLEGE
- Shyama - MUHAMMED ABDURAHIMAN MEMORIAL ORPHANAGE (MAMO) COLLEGE

**Hosted Project Link:** https://callmcore-s4de.vercel.app/
=======
**Team Name:** [INSERT TEAM NAME]

**Team Members:**
- [Member 1 Name] - [Member 1 College]
- [Member 2 Name] - [Member 2 College]
- [Member 3 Name] - [Member 3 College]

**Hosted Project Link:** [INSERT HOSTED LINK HERE]
>>>>>>> Stashed changes

**Project Description:**
Callmcore is a personalized breathing and mindfulness application that uses AI to generate tailored breathing exercises based on the user's mood, intensity of feeling, and specific context.

**The Problem & Solution:**
- **The Problem:** Generic breathing exercises often fail to address the specific emotional or physical state of the user (e.g., high anxiety vs. post-workout recovery). users may not know which technique is safe or effective for their current situation.
- **The Solution:** Callmcore acts as an intelligent breathwork coach. By analyzing the user's mood, intensity, and context (like "asthma" or "panic attack"), it dynamically generates safe, effective breathing patterns—avoiding breath holds when necessary and optimizing for relaxation or focus as needed.

## Technical Details
**Technologies Used:**
- **Frontend Framework:** React 19, Vite
- **AI Integration:** Google Gemini API (`@google/generative-ai`)
- **Styling & Animations:** Vanilla CSS, Framer Motion
- **Icons:** Lucide React

## Features
- **AI-Powered Recommendations:** Generates unique breathing exercises using Google Gemini based on real-time user input.
- **Context-Aware Safety:** Automatically detects high-risk contexts (e.g., asthma, panic) to modify breathing patterns for safety (e.g., removing breath holds).
- **Mood & Intensity Tracking:** Captures the user's emotional state and its intensity to fine-tune the breathing technique.
- **Interactive UI:** Smooth, animated interface for a calming user experience.

## Implementation

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/callmcore.git

# Navigate to the project directory
cd callmcore

# Install dependencies
npm install
```

### Run
```bash
# Start the development server
npm run dev
```

## Project Documentation

<<<<<<< Updated upstream

=======
### Screenshots
| Landing Page | Mood Selection | Recommendation Screen |
|:---:|:---:|:---:|
| ![Landing Page](path/to/screenshot1.png) | ![Mood Selection](path/to/screenshot2.png) | ![Recommendation](path/to/screenshot3.png) |
*(Add your screenshots in an `img` folder and update paths)*
>>>>>>> Stashed changes

### Diagrams
**System Architecture:**
User Input (Mood/Intensity/Context) -> React Frontend -> Gemini API -> Processed Breathing Pattern -> UI Rendering

**Workflow:**
1. User selects Mood.
2. User selects Intensity.
3. User inputs Context (optional).
4. App sends data to Gemini API.
5. Gemini envisions a safe pattern (considering contraindications like Asthma).
6. App displays the custom breathing exercise.

## Project Demo
<<<<<<< Updated upstream
**Video:** https://drive.google.com/file/d/10xGt_K0mWALazPeeIBxyccxEFCyjGsyo/view?usp=drive_link
=======
**Video:** [INSERT DEMO VIDEO LINK HERE]
>>>>>>> Stashed changes

## AI Tools Used
**Tool:** Cursor
**Purpose:**
- Used for analyzing the codebase to generate this README.
- Assisted in writing boilerplate code for React components.
- Helped debug API integration issues with Gemini.

**Prompts Used:**
1. "Analyze the `src/services/gemini.js` file and explain how the breathing recommendation logic works, specifically regarding safety checks."
2. "Generate a professional README.md following the TinkHerHack template based on the current project structure."
3. "Refactor the `ContextScreen` component to better handle user input state."

---

<<<<<<< Updated upstream
=======
## Team Contributions
- [Member 1]: Frontend development and UI design.
- [Member 2]: AI integration and prompt engineering for Gemini.
- [Member 3]: Project documentation and testing.

---

>>>>>>> Stashed changes
## License
This project is licensed under the MIT License.

<p align="center">Made with ❤️ at TinkerHub</p>

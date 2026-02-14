import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBreathingRecommendation } from '../services/gemini';
import '../App.css';

const Flower = ({ phase, timings }) => {
    const petals = [
        { color: '#D4E2F0', rotate: 0 },   // Soft Blue
        { color: '#F0E6D4', rotate: 60 },  // Soft Cream
        { color: '#E6D4F0', rotate: 120 }, // Soft Purple
        { color: '#D4F0E6', rotate: 180 }, // Soft Green
        { color: '#E2F0D4', rotate: 240 }, // Soft Lime
        { color: '#F0D4D4', rotate: 300 }, // Soft Pink
    ];

    return (
        <div className="flower-container">
            {petals.map((petal, index) => (
                <motion.div
                    key={index}
                    className="petal"
                    style={{
                        backgroundColor: petal.color,
                        rotate: petal.rotate,
                    }}
                    animate={phase}
                    variants={{
                        // BLOOM (Exhale)
                        exhale: {
                            scaleY: 1,
                            scaleX: 1,
                            translateY: -30,
                            rotate: petal.rotate,
                            opacity: 1,
                            transition: { duration: timings.exhale, ease: "easeInOut" }
                        },
                        // CLOSE (Inhale)
                        inhale: {
                            scaleY: 0.6,
                            scaleX: 0.4,
                            translateY: 0,
                            rotate: petal.rotate + 90,
                            opacity: 0.9,
                            transition: { duration: timings.inhale, ease: "easeInOut" }
                        },
                        // HOLD (Closed)
                        hold: {
                            scaleY: 0.6,
                            scaleX: 0.4,
                            translateY: 0,
                            rotate: petal.rotate + 90,
                            opacity: 0.9,
                            transition: { duration: timings.hold, ease: "linear" }
                        }
                    }}
                />
            ))}

        </div>
    );
};

const RecommendationScreen = ({ onReset, mood, intensity, context }) => {
    const [phase, setPhase] = useState('exhale');
    const [instruction, setInstruction] = useState('Preparing...');
    const [options, setOptions] = useState(null); // Array of 3 options
    const [selectedOption, setSelectedOption] = useState(null); // The chosen one
    const [loading, setLoading] = useState(true);

    // Fetch Options (Only once)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setInstruction("Crafting your personalized sessions...");
            try {
                const results = await getBreathingRecommendation(mood, intensity, context);
                // Ensure it's an array (handle potential single object legacy returns just in case)
                setOptions(Array.isArray(results) ? results : [results]);
            } catch (err) {
                console.error("Failed to load recommendations", err);
                setOptions([]);
            }
            setLoading(false);
        };

        fetchData();
    }, [mood, intensity, context]);

    // Breathing Cycle Logic (Only runs when selectedOption is set)
    useEffect(() => {
        if (!selectedOption) return;

        const { inhale, hold, exhale } = selectedOption.timings;
        const totalCycle = (inhale + hold + exhale) * 1000;

        const runCycle = () => {
            setPhase('inhale');
            setInstruction('Inhale (Close)...');

            setTimeout(() => {
                const hasHold = hold > 0;
                if (hasHold) {
                    setPhase('hold');
                    setInstruction('Hold...');
                }

                const nextStepDelay = hasHold ? hold * 1000 : 0;

                setTimeout(() => {
                    setPhase('exhale');
                    setInstruction('Exhale (Bloom)...');
                }, nextStepDelay);

            }, inhale * 1000);
        };

        runCycle();
        const interval = setInterval(runCycle, totalCycle);
        return () => clearInterval(interval);
    }, [selectedOption]);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const handleBackToList = () => {
        setSelectedOption(null);
        setPhase('exhale'); // Reset visual
    };

    return (
        <div className="recommendation-container">
            <h1 className="title recommendations-title">
                {selectedOption ? "BREATHE" : "CHOOSE YOUR FLOW"}
            </h1>
            <h2 className="subtitle recommendations-subtitle">
                {loading ? "Connecting to nature..." :
                    selectedOption ? selectedOption.title : "We found 3 ways to help you."}
            </h2>

            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="loading-state"
                    >
                        <div className="flower-container">
                            <motion.div
                                className="flower-center"
                                style={{
                                    width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', zIndex: 10
                                }}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        </div>
                        <p className="loading-text">Crafting your session...</p>
                    </motion.div>
                ) : !selectedOption ? (
                    /* LIST VIEW */
                    <motion.div
                        key="list"
                        className="recommendation-list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {options?.map((option, index) => (
                            <motion.div
                                key={index}
                                className="recommendation-option-card"
                                onClick={() => handleSelectOption(option)}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="option-header">
                                    <span className="option-difficulty">{option.difficulty || "Medium"}</span>
                                    {option.sequence_advice && <span className="option-duration">{option.sequence_advice}</span>}
                                </div>
                                <h3 className="option-title">{option.title}</h3>
                                <p className="option-desc">{option.description}</p>
                                <div className="option-timings">
                                    <span>In: {option.timings.inhale}s</span>
                                    <span>Hold: {option.timings.hold}s</span>
                                    <span>Out: {option.timings.exhale}s</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    /* ACTIVE BREATHING VIEW */
                    <motion.div
                        key="active"
                        className="recommendation-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="card-content">
                            {/* Warnings */}
                            {selectedOption.warning && (
                                <div className="warning-box">
                                    ⚠️ {selectedOption.warning}
                                </div>
                            )}

                            <div className="breathing-visual">
                                <Flower phase={phase} timings={selectedOption.timings} />
                                <motion.p
                                    key={instruction}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="breathing-instruction"
                                >
                                    {instruction}
                                </motion.p>
                            </div>
                            <p className="card-footer-text">{selectedOption.instruction}</p>

                            <button className="back-to-list-link" onClick={handleBackToList}>
                                Choose a different technique
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!loading && (
                <button className="reset-button" onClick={onReset}>
                    Start Over
                </button>
            )}
        </div>
    );
};

export default RecommendationScreen;

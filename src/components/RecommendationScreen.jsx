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
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setInstruction("Generating your personal breathing guide...");
            const result = await getBreathingRecommendation(mood, intensity, context);
            setData(result);
            setLoading(false);
        };

        fetchData();
    }, [mood, intensity, context]);

    useEffect(() => {
        if (!data) return;

        const { inhale, hold, exhale } = data.timings;
        const totalCycle = (inhale + hold + exhale) * 1000;

        const runCycle = () => {
            // Step 1: Inhale -> Close 
            setPhase('inhale');
            setInstruction('Inhale (Close)...');

            setTimeout(() => {
                // Step 2: Hold -> Stay Closed
                const hasHold = hold > 0;
                if (hasHold) {
                    setPhase('hold');
                    setInstruction('Hold...');
                }

                // Calculate delay for next step
                const nextStepDelay = hasHold ? hold * 1000 : 0;

                setTimeout(() => {
                    // Step 3: Exhale -> Bloom
                    setPhase('exhale');
                    setInstruction('Exhale (Bloom)...');
                }, nextStepDelay);

            }, inhale * 1000);
        };

        // Initial run
        runCycle();

        // Loop
        const interval = setInterval(runCycle, totalCycle);

        return () => clearInterval(interval);
    }, [data]);

    return (
        <div className="recommendation-container">
            <h1 className="title recommendations-title">RECOMMENDATIONS</h1>
            <h2 className="subtitle recommendations-subtitle">
                {loading ? "Connecting to nature..." : "Based on your mood"}
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
                ) : (
                    <motion.div
                        key="content"
                        className="recommendation-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="card-content">
                            <h3 className="card-title">{data.title}</h3>
                            <p className="card-description">{data.description}</p>

                            {/* Warnings / Advice */}
                            {data.warning && (
                                <div className="warning-box">
                                    ⚠️ {data.warning}
                                </div>
                            )}

                            <div className="breathing-visual">
                                <Flower phase={phase} timings={data.timings} />
                                <motion.p
                                    key={instruction}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="breathing-instruction"
                                >
                                    {instruction}
                                </motion.p>
                            </div>
                            <p className="card-footer-text">{data.instruction}</p>
                            {data.sequence_advice && (
                                <p className="sequence-advice">
                                    {data.sequence_advice}
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button className="reset-button" onClick={onReset}>
                Start Over
            </button>
        </div>
    );
};

export default RecommendationScreen;

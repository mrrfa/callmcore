import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const intensities = [
    { id: 1, label: 'Gentle', height: '80px', color: '#B0C4B1', delay: 0 },
    { id: 2, label: 'Steady', height: '120px', color: '#89A894', delay: 0.2 },
    { id: 3, label: 'Intense', height: '160px', color: '#6B8F7F', delay: 0.4 },
    { id: 4, label: 'Overwhelming', height: '200px', color: '#4A6B5D', delay: 0.6 },
];

const IntensitySelector = ({ onSelect, selectedIntensity }) => {
    return (
        <div className="intensity-wrapper">
            {/* Step Indicator */}
            <div className="step-indicator">
                <span className="step-dot active"></span>
                <span className="step-dot active"></span>
                <span className="step-dot"></span>
            </div>

            <motion.div
                className="intensity-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="title-intensity">How intense is it feeling right now?</h1>
                <h2 className="subtitle-intensity">This helps us tune your breathing pattern.</h2>

                <div className="towers-container">
                    {intensities.map((item) => (
                        <div key={item.id} className="tower-wrapper" onClick={() => onSelect(item.id)}>
                            <motion.div
                                className={`breathing-tower ${selectedIntensity === item.id ? 'selected' : ''}`}
                                style={{
                                    height: item.height,
                                    backgroundColor: item.color
                                }}
                                animate={{
                                    scaleY: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: item.delay
                                }}
                                whileHover={{
                                    scale: 1.15,
                                    boxShadow: `0px 0px 25px ${item.color}`, // Stronger glow using item color
                                    y: -5
                                }}
                                whileTap={{ scale: 0.95 }}
                            />
                            <span className={`tower-label ${selectedIntensity === item.id ? 'selected-text' : ''}`}>
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default IntensitySelector;

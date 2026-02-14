import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const ContextScreen = ({ onContinue, onBack }) => {
    const [context, setContext] = useState('');

    const handleContinue = () => {
        onContinue(context);
    };

    const predefinedTags = [
        "Presentation Soon",
        "Panic Attack",
        "Post Workout",
        "Asthma / Tightness",
        "Need Focus",
        "Can't Sleep"
    ];

    return (
        <div className="context-container">
            <h1 className="title">TELL US MORE</h1>
            <h2 className="subtitle">Anything specific happening? (Optional)</h2>

            <div className="tags-container">
                {predefinedTags.map(tag => (
                    <button
                        key={tag}
                        className={`context-tag ${context.includes(tag) ? 'selected' : ''}`}
                        onClick={() => setContext(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <textarea
                className="context-input"
                placeholder="Or type here... (e.g., 'I have a headache', 'Just woke up')"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={4}
            />

            <div className="navigation-buttons">
                <button className="nav-button back" onClick={onBack}>Back</button>
                <button className="nav-button continue" onClick={handleContinue}>
                    Personalize Session
                </button>
            </div>
        </div>
    );
};

export default ContextScreen;

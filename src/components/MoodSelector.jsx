import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const moods = [
  { id: 'excited', label: 'Excited', color: '#F4CCCC', shape: 'circle' },
  { id: 'joyful', label: 'Joyful', color: '#E6B8AF', shape: 'flower' },
  { id: 'grateful', label: 'Grateful', color: '#D5A6BD', shape: 'cloud' },
  { id: 'energized', label: 'Energized', color: '#C27BA0', shape: 'star' }, // Simplified shape names for now
  { id: 'sensitive', label: 'Sensitive', color: '#A2C4C9', shape: 'blob' },
  { id: 'confused', label: 'Confused', color: '#76A5AF', shape: 'hexagon' },
  { id: 'bored', label: 'Bored', color: '#93C47D', shape: 'circle-cut' },
  { id: 'stressed', label: 'Stressed', color: '#8FCE00', shape: 'triangle' }, // Adjusted color
  { id: 'angry', label: 'Angry', color: '#E06666', shape: 'square-rounded' },
  { id: 'insecure', label: 'Insecure', color: '#CC0000', shape: 'circle-off' },
  { id: 'hurt', label: 'Hurt', color: '#B45F06', shape: 'wavy-square' },
  { id: 'guilty', label: 'Guilty', color: '#F9CB9C', shape: 'slice' },
];

const MoodSelector = ({ onSelect }) => {
  return (
    <div className="mood-container">
      <h1 className="title">WHAT'S YOUR MOOD?</h1>
      <div className="mood-grid">
        {moods.map((mood, index) => (
          <motion.div
            key={mood.id}
            className="mood-item"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3 + (index % 3), // Varied duration
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(mood)}
          >
            <motion.div
              className={`mood-shape shape-${mood.shape}`}
              style={{ backgroundColor: mood.color }}
              // Removing continuous heavy glow, adding subtle breathing glow
              animate={{
                filter: [
                  `drop-shadow(0 0 2px ${mood.color}40)`,
                  `drop-shadow(0 0 8px ${mood.color}60)`,
                  `drop-shadow(0 0 2px ${mood.color}40)`
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              // Strong Glow on Click (Tap)
              whileTap={{
                filter: `drop-shadow(0 0 25px ${mood.color})`,
                scale: 1.05,
                transition: { duration: 0.1 }
              }}
            >
              {/* Placeholder for face - can be SVG or simple elements */}
              <div className="face">
                <div className="eye left"></div>
                <div className="eye right"></div>
                <div className="mouth"></div>
              </div>
            </motion.div>
            <span className="mood-label">{mood.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;

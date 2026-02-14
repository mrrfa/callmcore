import { useState } from 'react';
import './App.css';
import MoodSelector from './components/MoodSelector';
import IntensitySelector, { intensities } from './components/IntensitySelector';
import RecommendationScreen from './components/RecommendationScreen';
import ContextScreen from './components/ContextScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('mood');
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedIntensity, setSelectedIntensity] = useState(null);
  const [context, setContext] = useState('');

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setCurrentScreen('intensity');
  };

  const handleIntensitySelect = (intensityId) => {
    const intensity = intensities.find(i => i.id === intensityId);
    setSelectedIntensity(intensity);
    setCurrentScreen('context');
  };

  const handleContextContinue = (userContext) => {
    setContext(userContext);
    setCurrentScreen('recommendation');
  };

  const handleContextBack = () => {
    setCurrentScreen('intensity');
  };

  const handleReset = () => {
    setSelectedMood(null);
    setSelectedIntensity(null);
    setContext('');
    setCurrentScreen('mood');
  };

  return (
    <div className="app-container">
      <header className="brand-header">
        calmcore
      </header>

      {currentScreen === 'mood' && (
        <MoodSelector onSelect={handleMoodSelect} />
      )}
      {currentScreen === 'intensity' && (
        <IntensitySelector
          onSelect={handleIntensitySelect}
          selectedIntensity={selectedIntensity?.id}
        />
      )}
      {currentScreen === 'context' && (
        <ContextScreen
          onContinue={handleContextContinue}
          onBack={handleContextBack}
        />
      )}
      {currentScreen === 'recommendation' && (
        <RecommendationScreen
          onReset={handleReset}
          mood={selectedMood}
          intensity={selectedIntensity}
          context={context}
        />
      )}
    </div>
  );
}

export default App;

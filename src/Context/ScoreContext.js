// ScoreContext.js
import React, { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [usedHint, setUsedHint] = useState(false);

  const increaseScore = () => {
    const scoreIncrease = usedHint ? 50 : 100;
    setScore((prevScore) => prevScore + scoreIncrease);
  };
  const resetScore = () => {
    setScore(0)
  }

  const puzzleHint = () => {
    setUsedHint(true);
  };

  const resetPuzzleHint = () => {
    setUsedHint(false);
  }

  return (
    <ScoreContext.Provider value={{ score, increaseScore, resetScore, puzzleHint, resetPuzzleHint }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};

// HintContext.js
import React, { createContext, useContext } from 'react';

const HintContext = createContext();

export const HintProvider = ({ children }) => {
  const hints = { 1: "See if you can drag something over the logbook", 2: "Do you know that the sum of cube roots of 1 and 12, 9 and 10 are equal?", 3: "Can you decode binary code to text?" }

  return (
    <HintContext.Provider value={{ hints }}>
      {children}
    </HintContext.Provider>
  );
};

export const useHint = () => {
  const context = useContext(HintContext);
  if (!context) {
    throw new Error('useHint must be used within a HintProvider');
  }
  return context;
};

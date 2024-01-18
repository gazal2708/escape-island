import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameDashboard from './Dashboards/GameDashboard/GameDashboard';
import FirstPuzzleDashboard from './Dashboards/FirstPuzzleDashboard/FirstPuzzleDashboard';
import SecondPuzzleDashboard from './Dashboards/SecondPuzzleDashboard/SecondPuzzleDashboard';
import SecondPuzzleMystryBox from './Dashboards/SecondPuzzleDashboard/SecondPuzzleMystryBox';
import ThirdPuzzleDashboard from './Dashboards/ThirdPuzzleDashboard/ThirdPuzzleDashboard';
import { ScoreProvider } from './Context/ScoreContext';
import { HintProvider } from './Context/HintContext';
function App() {
  return (
    <Router>
      <ScoreProvider>
        <HintProvider>
          <Routes>
            <Route path="/" element={<GameDashboard />} />
            <Route path="/puzzle1" element={<FirstPuzzleDashboard puzzleId={1} />} />
            <Route path="/puzzle2" element={<SecondPuzzleDashboard puzzleId={2} />} />
            <Route path="/puzzleBox" element={<SecondPuzzleMystryBox puzzleId={2} />} />
            <Route path="/puzzle3" element={<ThirdPuzzleDashboard puzzleId={3} />} />
          </Routes>
        </HintProvider>
      </ScoreProvider>
    </Router>
  );
}

export default App;

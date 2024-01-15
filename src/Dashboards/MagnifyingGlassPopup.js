// MagnifyingGlassPopup.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useScore } from '../Context/ScoreContext';


const MagnifyingGlassPopup = () => {
  const navigate = useNavigate();
  const { score, increaseScore, resetScore, resetPuzzleHint } = useScore();
  const pathToPuzzle2 = () => {
    navigate('/puzzle2');
    resetPuzzleHint()
    increaseScore()
    console.log(score)
  };

  const handleScoreBoardSubmit = (e) => {
    navigate('/')
    resetScore()
}  
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>VOILA! You opened a clue to your next puzzle:</h3>
        <p>"DIG UNDER THE TALLEST PALM TREE"</p>
        <button className="dialogButton1" onClick={pathToPuzzle2}>Proceed to next level</button>
        <button type="submit" className="pin-submit-button" onClick={handleScoreBoardSubmit}>End Game</button>

      </div>
    </div>
  );
};
export default MagnifyingGlassPopup;

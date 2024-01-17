import React from 'react';
import '../Styles/SecondPuzzleDashboard.css';
import { useNavigate } from 'react-router-dom';
import ScoreCard from './ScoreCard';
import '../Styles/ScoreCard.css';
const SecondPuzzleDashboard = ({ puzzleId }) => {
  const navigate = useNavigate();
  let audioButton = new Audio('/button_click.mp3')

  const pathToMystryBox = () => {
    audioButton.play()
    navigate('/puzzleBox');
  };
  return (
    <div className="puzzle2-dashboard">
      <ScoreCard />
      <div className="translucent-box2">
        <p className='puzzy2'>The suspicious treasure box and Torn Map</p>
        <p className='puzzy2p'>
          As you stand before the towering palm tree, the ground beneath it reveals a hidden treasure box. The once-buried box holds the secrets to the next chapter of your adventure. However, it seems the path is guarded by a challenge — let's find out!</p>
        <div className='center'>
          <button className="dialogButton2" onClick={pathToMystryBox}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SecondPuzzleDashboard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GameDashboard.css';
import ScoreCard from './ScoreCard';
const GameDashboard = () => {
  const navigate = useNavigate();
  const startGame = () => {
    audio.play()
    navigate('/puzzle1');
  };
  let audio = new Audio('/HomePage.mp3')

  return (
    <div className="game-dashboard">
      <ScoreCard />   
      <div className="game-description">

        <h1>Welcome to "Escape the Mysterious Island"</h1>
        <div className="description-text">
          <p>

            You find yourself stranded on a remote, mysterious island, surrounded by lush greenery and the sound of crashing waves. The air is thick with a sense of adventure and a hint of something unknown. As you look around, you spot the wreckage of a ship on the shore, a testament to the perilous journey that brought you here.
          </p>
          <p>
            Legend has it that this island holds secrets untold, and only the cleverest can escape its enigmatic grasp. The dense jungle hides ancient puzzles and challenges, leading to the ultimate path of liberation. Will you uncover the mysteries that bind you to this place and find your way back home?
          </p>
          <p>
          This island is said to be guarded by puzzles, each more cunning than the last. Explore the depths of the jungle, unveil hidden clues, and solve the riddles that stand between you and freedom. The journey will test your wit, observation skills, and determination.
          </p>
        </div>
        <div className="how-you-got-here">
          <h2>How You Got Here:</h2>
          <p>Your journey to this mysterious island began with a tempestuous storm that struck your vessel. Tossed and turned by the furious waves, you were cast ashore, alone and disoriented. As you survey your surroundings, the remnants of your ship serve as a reminder of the powerful forces that brought you to this unfamiliar land.</p>
        </div>
        <div className="ready-to-begin">
          <h2>Are You Ready to Begin?</h2>
          <button className='button' onClick={startGame}>Start Game</button>
          < div >
    </div >
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;

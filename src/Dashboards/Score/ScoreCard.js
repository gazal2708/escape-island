import React from 'react';
import './ScoreCard.css';
import { useScore } from '../../Context/ScoreContext';
const ScoreCard = (props) => {

  const { score } = useScore()
  return (
    <div className="scoreClass">
      <h3 style={{ color: props.textColor === undefined ? "white" : props.textColor }}>Score : {score}</h3>
    </div>
  );
};

export default ScoreCard;

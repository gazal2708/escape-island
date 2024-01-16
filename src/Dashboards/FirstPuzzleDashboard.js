// FirstPuzzleDashboard.js

import React from 'react';
import '../Styles/FirstPuzzleDashboard.css'; 
import DraggableItem from './DraggableItem';
import MagnifyingGlassPopup from './MagnifyingGlassPopup';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useScore } from '../Context/ScoreContext';
import HintPopup from './HintPopup';
import { useHint } from '../Context/HintContext';
import { useDispatch, useSelector } from 'react-redux';
import { setHintPopupStatus } from '../Store/actions';
import ScoreCard from './ScoreCard';
import '../Styles/ScoreCard.css'; 
const FirstPuzzleDashboard = ({puzzleId}) => {
const [isPopupOpen, setPopupOpen] = useState(false);
const logbookRef = useRef(null);
const [logbookRect, setLogbookRect] = useState(null);
const { puzzleHint } = useScore();
const { hints } = useHint();
const currentHint = hints[puzzleId] || '';
const dispatch = useDispatch();
const isHintPopupOpen = useSelector((state) => state.isHintPopupOpen);

const handleOpenHintPopup = (e) => {
  dispatch(setHintPopupStatus(true));
  puzzleHint()
};

const handleCloseHintPopup = (e) => {
  dispatch(setHintPopupStatus(false));
};

useEffect(() => {
    const updateLogbookRect = () => {
      if (logbookRef.current) {
        const rect = logbookRef.current.getBoundingClientRect();
        setLogbookRect({
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
          });
      }
    };
  
    updateLogbookRect();
  
    window.addEventListener('resize', updateLogbookRect);
  
    return () => {
      window.removeEventListener('resize', updateLogbookRect);
    };
// eslint-disable-next-line
  }, [logbookRef.current]);

const handleDrag = (event, itemName) => {
    const { x, y } = event;
    const isOverLogbook =
      x >= logbookRect.left-50 &&
      x <= logbookRect.right-50 &&
      y >= logbookRect.top &&
      y <= logbookRect.bottom;
    if (itemName === "magnifyingGlass" && isOverLogbook) {
       setPopupOpen(true);
    }
  };

  return (
    <div className="puzzle1-dashboard">
      <ScoreCard textColor="black"/>
      <div className="translucent-box">
        <p className='puzzy1'>Unveiling the Hidden Path</p>
        <p className='puzzy1p'>
          As your fingers trace the delicate pages of the logbook, a particular entry catches your eye. The ink appears faded, as if reluctant to reveal its secrets.
        </p>
        <p className='puzzy1p'>
          <strong>Entry 29 - Enigmatic Echoes:</strong> "Within the log's silent whispers, secrets dance in the shadows. Seek clarity where the ink fades; let the magnifying eye unveil what the naked eye denies. For in the cryptic dance, the pathway emerges."
        </p>
        <p className='puzzy1p'>
          The cryptic nature of the message suggests that more lies beneath the surface. A spark of curiosity ignites within you as you ponder the meaning. It's a puzzle, a riddle waiting to be solved.
        </p>
        <div className='center'>
        <button className="open-hint-button" style={{color: 'white'}} onClick={handleOpenHintPopup}>
        Show Hint
        </button>
        </div>
        {isHintPopupOpen && <HintPopup hint={currentHint} onClose={handleCloseHintPopup} />}

      </div>
     <div className="image-container">
        <div ref={logbookRef}>
        <DraggableItem itemName="logbook" onDrag={handleDrag}/>
        </div>

        <DraggableItem itemName="matchbox" onDrag={handleDrag} />
        <DraggableItem itemName="sword" onDrag={handleDrag}/>
        <DraggableItem itemName="magnifyingGlass" onDrag={handleDrag} />
        {/* Popup */}
      {isPopupOpen && <MagnifyingGlassPopup isPopupOpen={isPopupOpen} />}

      </div>
    </div>
  );
};
export default FirstPuzzleDashboard;

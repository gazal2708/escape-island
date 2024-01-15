// FirstPuzzleDashboard.js

import React from 'react';
import '../Styles/FirstPuzzleDashboard.css'; 
import DraggableItem from './DraggableItem';
import { dragItem } from '../Store/actions';
import { connect } from 'react-redux';
import MagnifyingGlassPopup from './MagnifyingGlassPopup';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useScore } from '../Context/ScoreContext';
import HintPopup from './HintPopup';
import { useHint } from '../Context/HintContext';
const FirstPuzzleDashboard = ({puzzleId}) => {
const [isPopupOpen, setPopupOpen] = useState(false);
const logbookRef = useRef(null);
const [logbookRect, setLogbookRect] = useState(null);
const [isHintPopupOpen, setHintPopupOpen] = useState(false);
const { puzzleHint } = useScore();
const { hints } = useHint();
const currentHint = hints[puzzleId] || '';

const handleOpenHintPopup = (e) => {
  setHintPopupOpen(true);
  puzzleHint()
};

const handleCloseHintPopup = (e) => {
  setHintPopupOpen(false);
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
        console.log(logbookRect)
      }
    };
  
    updateLogbookRect();
  
    window.addEventListener('resize', updateLogbookRect);
  
    return () => {
      window.removeEventListener('resize', updateLogbookRect);
    };
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
        <a href="#" onClick={handleOpenHintPopup}>
        Show Hint
        </a>
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
const mapStateToProps = (state) => ({
    isPopupOpen: state.popupOpen,
  });
const mapDispatchToProps = {
    dragItem,
  };
export default connect(mapStateToProps, mapDispatchToProps)(FirstPuzzleDashboard);

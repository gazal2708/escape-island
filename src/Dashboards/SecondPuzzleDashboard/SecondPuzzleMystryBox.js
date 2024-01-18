import React, { useState, useEffect } from 'react';
import './SecondPuzzleDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useScore } from '../../Context/ScoreContext';
import { useHint } from '../../Context/HintContext';
import HintPopup from '../Hint/HintPopup';
import ScoreCard from '../Score/ScoreCard';

const SecondPuzzleMystryBox = ({ puzzleId }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [isMysteryBoxOverlayOpen, setMysteryBoxOverlayOpen] = useState(false);
  const [isLockOverlayOpen, setLockOverlayOpen] = useState(false);
  const [pinInputs, setPinInputs] = useState(['', '', '', '']);
  const [isShaking, setShaking] = useState(false);
  const [isWrongInput, setWrongInput] = useState(false);
  const { score, increaseScore, resetScore, puzzleHint, resetPuzzleHint } = useScore();
  const { hints } = useHint();
  const [isHintPopupOpen, setHintPopupOpen] = useState(false);
  const currentHint = hints[puzzleId] || '';
  const correctPin = '1729';

  let hintSound = new Audio('/hint_click.mp3')
  let popupSound = new Audio('/popup.mp3')
  let audioButtonSound = new Audio('/button_click.mp3')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const overlayTimeoutId = setTimeout(() => {
      setOverlayOpen(true);
    }, 1000);
    return () => clearTimeout(overlayTimeoutId);
  }, [isLoaded]);

  if (isOverlayOpen) {
    popupSound.play()
  }
  const handleOpenHintPopup = (e) => {
    hintSound.play()
    setHintPopupOpen(true);
    puzzleHint()
  };

  const handleCloseHintPopup = (e) => {
    hintSound.play()
    setHintPopupOpen(false);
  };
  const navigate = useNavigate();

  const handlePinChange = (index, value) => {
    const newPinInputs = [...pinInputs];
    newPinInputs[index] = value;
    setPinInputs(newPinInputs);

    if (value !== '' && index < 3) {
      document.getElementById(`pin-input-${index + 1}`).focus();
    }
  };

  const handleScoreBoardSubmit = (e) => {
    audioButtonSound.play()
    navigate('/')
    resetScore()
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    audioButtonSound.play()
    resetPuzzleHint()

    const enteredPin = pinInputs.join('');

    if (enteredPin === correctPin) {
      // Correct PIN logic
      increaseScore();
      console.log("2", score)
      setWrongInput(false);
      navigate('/puzzle3')
      console.log('Correct PIN!');
    } else {
      // Incorrect PIN logic
      console.log('Incorrect PIN! Clearing input.');
      setWrongInput(true);
      setShaking(true);
      // Resetting the input after the shaking animation completes
      setTimeout(() => {
        setShaking(false);
        setPinInputs(['', '', '', '']);
        setWrongInput(true);
      }, 1000);

      // Move focus back to the first input field
      document.getElementById('pin-input-0').focus();
    }
  };
  const handleTreasureBoxClick = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    // Check if the click is within the desired region
    if (isClickWithinLockRegion(x, y)) {
      popupSound.play()
      setWrongInput(false)
      setLockOverlayOpen(true)
    }
    else if (isClickWithinBoxRegion(x, y)) {
      popupSound.play()
      setWrongInput(false)
      setMysteryBoxOverlayOpen(true);
    }
  };

  const isClickWithinBoxRegion = (x, y) => {
    const regionLeft = 531;
    const regionTop = 156;
    const regionRight = 964;
    const regionBottom = 517;
    // Checking if the click coordinates are within the region
    return x >= regionLeft && x <= regionRight && y >= regionTop && y <= regionBottom;
  };

  const isClickWithinLockRegion = (x, y) => {
    const regionLeft = 699;
    const regionTop = 372;
    const regionRight = 818;
    const regionBottom = 486;
    // Checking if the click coordinates are within the region
    return x >= regionLeft && x <= regionRight && y >= regionTop && y <= regionBottom;
  };

  const closeOverlay = () => {
    hintSound.play()
    setOverlayOpen(false);
  };

  const closeMysteryBoxOverlay = () => {
    hintSound.play()
    setMysteryBoxOverlayOpen(false)
    setLoaded(true)
  };

  const closeLockOverlay = () => {
    hintSound.play()
    setLockOverlayOpen(false)
    setLoaded(true)
  };
  return (
    <>
      <ScoreCard />
      {/* Overlay with translucent white box */}
      {isOverlayOpen && (
        <div className="translucent-box3">
          <span className="close-icon" onClick={closeOverlay}>
            &#10006;
          </span>
          <p>
            You did a good digging up work! Well done! But, oh no, the chest box is closed with a quite strong lock on it which can only be opened by entering a four-digit pin. Click on the box to proceed!
          </p>
        </div>
      )}
      {/* Treasure box */}
      {!(isMysteryBoxOverlayOpen && isLockOverlayOpen) && (
        <div
          className="treasure-box"
          onClick={handleTreasureBoxClick}
        >
          <div className={`puzzlebox-dashboard ${isLoaded ? 'loaded' : ''}`}>
          </div>
        </div>
      )}

      {isMysteryBoxOverlayOpen && (
        <div className="translucent-box3">
          <span className="close-icon" onClick={closeMysteryBoxOverlay}>
            &#10006;
          </span>
          <p>
            Oh no! Box is closed. But hey! you can turn it upside down to read a secret message that can help you open it.
            <br />
            <br />
            <i>The message reads: "Imagine where number theory and taxi cabs intersect. Seek a number that connects cubes and the sum of cubes, bringing together mathematics and real-world anecdotes."</i>
            <br />
            <br />
            Try your luck on the pin by clicking the lock on the chest!
          </p>
        </div>
      )}

      {isLockOverlayOpen && (
        <div className="translucent-box3">
          <span className="close-icon" onClick={closeLockOverlay}>
            &#10006;
          </span>
          <p> Enter the 4 digit pin in below text box!</p>
          <div className="pin-input-container">
            <div className={`pin-input-form ${isShaking ? 'shake-animation' : ''}`}>
              {pinInputs.map((value, index) => (
                <input
                  key={index}
                  id={`pin-input-${index}`}
                  type="text"
                  value={value}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  maxLength="1"
                  className={`pin-input ${isWrongInput ? 'wrong-input' : 'right-input'}`}
                />
              ))}
            </div>
            <div className='center'>
              <button className="open-hint-button" style={{ color: 'black' }} onClick={handleOpenHintPopup}>
                Show Hint
              </button>
            </div>
            {isHintPopupOpen && <HintPopup hint={currentHint} onClose={handleCloseHintPopup} />}

            <button type="submit" className="pin-submit-button" onClick={handleSubmit}>Submit</button>
            <button type="submit" className="pin-submit-button" onClick={handleScoreBoardSubmit}>End Game</button>

          </div>
        </div>
      )}
    </>
  );
};

export default SecondPuzzleMystryBox;

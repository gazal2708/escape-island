import React, { useState, useEffect } from 'react';
import './ThirdPuzzleDashboard.css';
import ScoreCard from '../Score/ScoreCard';

import { useNavigate } from 'react-router-dom';
import { useScore } from '../../Context/ScoreContext';
import HintPopup from '../Hint/HintPopup';
import { useDispatch, useSelector } from 'react-redux';
import { setHintPopupStatus, setHint } from '../../Store/actions';

const ThirdPuzzleDashboard = ({ puzzleId }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [isBoatOverlayOpen, setBoatOverlayOpen] = useState(false);
  const [iswallOpen, setWallOpen] = useState(false);
  const [isWrongInput, setWrongInput] = useState(false);
  const [wordInput, setWordInput] = useState('');
  const [isFinalScreen, setFinalScreen] = useState(false)
  const [isScoreBoardOpen, setScoreBoardOpen] = useState(false)
  const { score, increaseScore, resetScore, resetPuzzleHint, puzzleHint } = useScore();
  const dispatch = useDispatch();
  const isHintPopupOpen = useSelector((state) => state.isHintPopupOpen);
  const currentHint = useSelector((state) => state.hint)
  const [isShaking, setShaking] = useState(false);

  let hintSound = new Audio('/hint_click.mp3')
  let popupSound = new Audio('/popup.mp3')
  let audioButtonSound = new Audio('/button_click.mp3')

  const handleOpenHintPopup = (e) => {
    hintSound.play()
    dispatch(setHintPopupStatus(true));
    dispatch(setHint(puzzleId))
    puzzleHint()
  };

  const handleCloseHintPopup = (e) => {
    hintSound.play()
    dispatch(setHintPopupStatus(false));
  };
  const navigate = useNavigate();



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

  const handleCaveExplore = (e) => {
    popupSound.play()
    setWallOpen(true)
    setBoatOverlayOpen(false)
  }

  const handleWordChange = (value) => {
    setWordInput(value);

  }
  const handleBoatClick = (e) => {
    e.preventDefault();
    console.log(e.clientX, e.clientY)
    const x = e.clientX;
    const y = e.clientY;


    if (isClickWithinBoatRegion(x, y)) {
      setLoaded(true)
      popupSound.play()
      setBoatOverlayOpen(true);
    }
  };
  const correctMessage = 'dig under w';

  const handleSubmit = (e) => {
    e.preventDefault();
    audioButtonSound.play()
    if (wordInput === correctMessage) {
      increaseScore();
      console.log("3", score)
      setWallOpen(false)
      setFinalScreen(true)
      resetPuzzleHint()

    }
    else {
      console.log('Incorrect message! Clearing input.');
      setWrongInput(true);
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setWordInput('')
        setWrongInput(true);
      }, 1000);
    }
  }
  const isClickWithinBoatRegion = (x, y) => {
    const regionLeft = 635;
    const regionTop = 387;
    const regionRight = 953;
    const regionBottom = 572;
    return x >= regionLeft && x <= regionRight && y >= regionTop && y <= regionBottom;
  };
  const closeBoatOverlay = () => {
    hintSound.play()
    setBoatOverlayOpen(false)
    setLoaded(true)
  };

  const closeWallOverlay = () => {
    hintSound.play()
    setWallOpen(false)
    setLoaded(true)
  };

  const closeOverlay = () => {
    hintSound.play()
    setOverlayOpen(false);
  };

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    audioButtonSound.play()
    setScoreBoardOpen(true)
    setFinalScreen(false)
  }

  const handleScoreBoardSubmit = (e) => {
    audioButtonSound.play()
    navigate('/')
    resetScore()
  }
  return (
    <>
      {/* Overlay with translucent white box */}
      {isOverlayOpen && (
        <div className="translucent-box3">
          <span className="close-icon" onClick={closeOverlay}>
            &#10006;
          </span>
          <p>
            On entering the correct 4 digit pin, you successfully open the treasure box and you find a strange map, which leds you to a hidden cave, there you see a slight old but working boat tied with a lock, can this be your way to escape this island? Lets find out...
          </p>
          <br />
          <br />
          <i>Click on the boat on the screen to proceed!</i>
        </div>
      )}
      {/* Treasure box */}
      <div
        className="boat"
        onClick={handleBoatClick}
      >
        <div className={`puzzle3-dashboard ${isLoaded ? 'loaded' : ''}`}>
          <ScoreCard textColor="white" />
        </div>
      </div>



      {isBoatOverlayOpen && (
        <div className="translucent-box4">
          <span className="close-icon" onClick={closeBoatOverlay}>
            &#10006;
          </span>
          <p>As you make multiple attempts to open the lock of the boat but fail everytime, suddenly, your eyes catch hold of some carving on the boat which says:</p>
          <br />
          <br />
          <i>The cave walls contain some secrets which can make the passage back to home very easy</i>
          <br />
          <br />
          <p>Also there are some rocks marked with english alphabets, does that mean anything??</p>
          <button type="submit" className="pin-submit-button" onClick={handleCaveExplore}>Explore the Cave Walls</button>
          <button type="submit" className="pin-submit-button" onClick={handleScoreBoardSubmit}>End Game</button>

        </div>
      )}

      {iswallOpen && (
        <div className="translucent-box4">
          <span className="close-icon" onClick={closeWallOverlay}>
            &#10006;
          </span>
          <p>After a lot of walking around inside the cave, you found some manuscript written in binary format, does this lead to the key to your lock? Maybe you need to figure that out!</p>
          <div className='center'>
            <div className='caveWallImage'>
            </div>
          </div>
          <p>Decode the image and write the message below</p>
          <div className={`word-input-form ${isShaking ? 'shake-animation' : ''}`}>
            <input
              type="text"
              value={wordInput}
              onChange={(e) => handleWordChange(e.target.value)}
              className={`pin-input ${isWrongInput ? 'wrong-input' : 'right-input'}`}
              style={{ width: '100%' }}
            />
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
      )}
      {isFinalScreen && (
        <div className="translucent-box4">
          <span className="close-icon" onClick={closeWallOverlay}>
            &#10006;
          </span>
          <h3>Congratulations!!</h3>
          <p>You entered the correct message! </p>
          <p>After digging under the rock labelled a "W" you finally found the key to the boat's lock and successfully escaped the Island!!</p>
          <i>HAVE A SAFE JOURNEY BACK HOME!</i>
          <p>Click below for the game scores</p>
          <button type="submit" className="pin-submit-button" onClick={handleScoreSubmit}>Check Score</button>
          <button type="submit" className="pin-submit-button" onClick={handleScoreBoardSubmit}>End Game</button>
        </div>
      )}
      {isScoreBoardOpen && (
        <div className="translucent-box4">
          <h3>Congratulations!! Your final score is : {score}</h3>

          <button type="submit" className="pin-submit-button" onClick={handleScoreBoardSubmit}>End Game</button>
        </div>
      )}
    </>
  );
};

export default ThirdPuzzleDashboard;

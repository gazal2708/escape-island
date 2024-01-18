// HintPopup.js
import React from 'react';
import './HintPopup.css';
const HintPopup = ({ hint, onClose }) => {
  return (
    <div className="hint-popup">
      <div className="translucent-box-hint">
        <span className="close-icon" onClick={onClose}>
          &#10006;
        </span>
        <p>{hint}</p>
      </div>
    </div>
  );
};

export default HintPopup;

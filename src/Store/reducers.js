// reducers.js
const initialState = {
  // draggedItems: {},
  isHintPopupOpen: false,
  hint: ''
};

const hints = { 1: "See if you can drag something over the logbook", 2: "Do you know that the sum of cube roots of 1 and 12, 9 and 10 are equal?", 3: "Can you decode binary code to text?" }


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'DRAG_ITEM':
    //   return {
    //     ...state,
    //     draggedItems: {
    //       ...state.draggedItems,
    //       [action.payload.itemName]: action.payload.position,
    //     },
    //   };
    case 'SET_HINT_POPUP_STATUS':
      return {
        ...state,
        isHintPopupOpen: action.payload,
      };
    case 'SET_HINT':
      return {
        ...state,
        hint: hints[action.payload],
      }
    default:
      return state;
  }
};

export default rootReducer;

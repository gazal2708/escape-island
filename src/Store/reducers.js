// reducers.js
const initialState = {
  draggedItems: {},
};

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
    default:
      return state;
  }
};

export default rootReducer;

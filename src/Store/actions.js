// actions.js
export const dragItem = (itemName, position) => ({
  type: 'DRAG_ITEM',
  payload: { itemName, position },
});

export const setHintPopupStatus = (status) => ({
  type: 'SET_HINT_POPUP_STATUS',
  payload: status,
});


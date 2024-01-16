// DraggableItem.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { dragItem } from '../Store/actions';
import { useDispatch } from 'react-redux';
const DraggableItem = ({ itemName, onDrag }) => {
  const dispatch = useDispatch();  
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { itemName },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleDrag = (e) => {
    const newPosition = {
        x: e.clientX,
        y: e.clientY,
      };
      dispatch(dragItem(itemName, newPosition));
      onDrag(newPosition, itemName);
  };

  return (
    <div>
        <div
      ref={(node) => drag(node)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        width: '100px',
        height: '100px',
        backgroundImage: `url(${require(`../public/${itemName}.png`)})`,
        backgroundSize: 'cover',
        margin: '0 10px',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        zIndex: 1,
      }}
      onDrag={handleDrag}
    ></div>
    </div>
  );
};

export default DraggableItem;

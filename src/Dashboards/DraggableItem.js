// DraggableItem.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { connect } from 'react-redux';
import { dragItem } from '../Store/actions';

const DraggableItem = ({ itemName, onDrag }) => {

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
      dragItem(itemName, newPosition);
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

const mapStateToProps = (state, ownProps) => ({
    position: state.draggedItems[ownProps.itemName],
  });

const mapDispatchToProps = {
  dragItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableItem);

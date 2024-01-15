// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import store from './Store/store';
import App from './App';
ReactDOM.render(
  <React.StrictMode>
  <DndProvider backend={HTML5Backend}>
      <Provider store={store}> 
        <App />
     </Provider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

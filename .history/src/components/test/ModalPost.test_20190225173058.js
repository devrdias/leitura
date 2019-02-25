import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import reducer from '../../reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import ListPost from '../ListPost';
import ModalPost from '../ModalPost';

const store = createStore(
    reducer
  )

it('renders without crashing', () => {
  const div = document.createElement('div');
  
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter >
        <ModalPost open={true} />
      </MemoryRouter>
    </Provider>
  ,div);
});
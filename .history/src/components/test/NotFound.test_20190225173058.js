import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import reducer from '../../reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import NotFound from '../NotFound';

const store = createStore(
    reducer
  )

it('renders without crashing', () => {
  const div = document.createElement('div');
  
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter >
        <NotFound />
      </MemoryRouter>
    </Provider>
  ,div);
});
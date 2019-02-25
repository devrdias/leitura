import React from 'react';
import ReactDOM from 'react-dom';
import PostDetail from '../PostDetail';
import { MemoryRouter, Route } from 'react-router-dom'
import reducer from '../../reducers'
import { createStore, dispatch } from 'redux'
import { Provider } from 'react-redux';
import { RECEIVE_POSTS } from '../../actions'

const store = createStore(
  reducer
)

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/react/2']}>
        <Route path='/:activeCategory/:postId'>
          <PostDetail />
        </Route>
      </MemoryRouter>
    </Provider>
  ,div);
});
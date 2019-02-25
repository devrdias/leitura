import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import reducer from '../../reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import ListPost from '../ListPost';
import thunk from 'redux-thunk';
import * as api from '../../api'

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)
const mockPromise = (response=[]) => (new Promise((resolve, reject) => {
  resolve(
      {
          json: () => (response)
      })
}))
jest.mock('../../api');

it('renders without crashing', () => {
  const div = document.createElement('div');
  api.fetchAllPostsAPI.mockReturnValue(mockPromise())

  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter >
        <ListPost orderBy={'voteScore'} posts={[]} />
      </MemoryRouter>
    </Provider>
  ,div);
});
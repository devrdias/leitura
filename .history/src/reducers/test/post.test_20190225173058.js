import { RECEIVE_POSTS } from '../../actions'
import reducer from '../../reducers'
import { createStore } from 'redux'

const store = createStore(
  reducer
)

it(RECEIVE_POSTS, () => {
  const stateBefore = store.getState()
  store.dispatch({
    type: RECEIVE_POSTS,
    payload: {
      ['2saisjasjas']: {
        id: '2saisjasjas'
      }
    }
  })
  const stateAfter = store.getState()
  expect(stateAfter).not.toEqual(stateBefore)
})

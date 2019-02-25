import { RECEIVE_COMMENTS } from '../../actions'
import reducer from '../../reducers'
import { createStore } from 'redux'

const store = createStore(
  reducer
)

it(RECEIVE_COMMENTS, () => {
  const stateBefore = store.getState()
  store.dispatch({
    type: RECEIVE_COMMENTS,
    payload: {
        'id': {
            id:'id'
        }
    }
  })
  const stateAfter = store.getState()
  expect(stateAfter).not.toEqual(stateBefore)
})


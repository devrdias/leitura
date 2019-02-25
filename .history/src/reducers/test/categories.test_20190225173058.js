import { RECEIVE_CATEGORIES, SELECT_CATEGORY, selectCategory } from '../../actions'
import reducer from '../../reducers'
import { createStore } from 'redux'

const store = createStore(
  reducer
)

it(RECEIVE_CATEGORIES, () => {
  const stateBefore = store.getState()
  store.dispatch({
    type: RECEIVE_CATEGORIES,
    categories: [
        {
            name: 'react',
            active: false
        },
        {
            name: 'redux',
            active: false
        },
    ]
  })
  const stateAfter = store.getState()
  expect(stateAfter).not.toEqual(stateBefore)
})

it(SELECT_CATEGORY, () => {
    const stateBefore = store.getState()
    store.dispatch(selectCategory('redux'))
    const stateAfter = store.getState()
    expect(stateAfter).not.toEqual(stateBefore)
  })
  

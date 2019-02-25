import { RECEIVE_CATEGORIES, SELECT_CATEGORY } from '../actions'

const reducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            return action.categories.map(
                (c) => (
                    {
                        ...c,
                        active: false
                    }
                ))
        case SELECT_CATEGORY:
            return state.map(
                (c) => {
                    if (c.name === action.activeCategory) {
                        return {
                            ...c,
                            active: true
                        }
                    } else {
                        return {
                            ...c,
                            active: false
                        }
                    }
                })
        default:
            return state
    }
}
export default reducer;
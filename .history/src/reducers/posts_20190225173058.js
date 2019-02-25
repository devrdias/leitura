import { RECEIVE_POSTS } from '../actions'


const reducer = (state={},action) => {
    switch(action.type){
        case RECEIVE_POSTS:
            return {
                    ...state,
                    ...action.payload
                }
        default:
            return state
    }
}
export default reducer;
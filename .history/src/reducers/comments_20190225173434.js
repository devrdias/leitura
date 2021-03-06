import { RECEIVE_COMMENTS } from '../actions';

const reducer = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_COMMENTS:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};
export default reducer;

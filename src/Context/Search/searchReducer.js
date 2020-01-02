export default (state, action) => {
	switch (action.type) {
		case 'SET_SEARCH_NAME':
			return {
				...state,
				searchText: action.payload,
			}

		default:
			return state
	}
}

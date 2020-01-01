export default (state, action) => {
	switch (action.type) {
		case 'GET_TABLE':
			return {
				...state,
				historyTable: action.payload,
			}

		default:
			return state
	}
}

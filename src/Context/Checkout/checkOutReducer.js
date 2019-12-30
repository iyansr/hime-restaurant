export default (state, action) => {
	switch (action.type) {
		case 'SHOW_MODAL':
			return {
				...state,
				modalVisible: action.payload,
			}
		case 'HIDE_MODAL':
			return {
				...state,
				modalVisible: action.payload,
			}

		default:
			break
	}
}

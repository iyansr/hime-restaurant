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
		case 'CHANGE_CHECKOUT_ID':
			return {
				...state,
				checkOutId: action.payload,
			}
		case 'SET_CHECKOUT':
			return {
				...state,
				checkOutItem: action.payload,
			}

		default:
			break
	}
}

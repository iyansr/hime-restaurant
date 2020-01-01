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
		case 'SEND_CHECKOUT':
			return {
				...state,
				loading: false,
			}
		case 'ERROR_CHECKOUT':
			return {
				...state,
				loading: false,
			}
		case 'SET_LOADING':
			return {
				...state,
				loading: true,
			}
		case 'STOP_LOADING':
			return {
				...state,
				loading: false,
			}

		default:
			return state
	}
}

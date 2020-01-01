export default (state, action) => {
	switch (action.type) {
		case 'LOGIN_USER':
			localStorage.setItem('@usertoken', action.payload)
			return {
				...state,
				userToken: action.payload,
				loading: false,
			}
		case 'ERROR_LOGIN':
			return {
				...state,
				userError: action.payload,
				loading: false,
			}
		case 'SET_LOADING':
			return {
				...state,
				loading: true,
			}
		case 'SHOW_MODAL':
			return {
				...state,
				modalVisible: true,
			}
		case 'HIDE_MODAL':
			return {
				...state,
				modalVisible: false,
			}

		default:
			return state
	}
}

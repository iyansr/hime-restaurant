export default (state, action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			return {
				...state,
				cart: [...state.cart, action.payload],
			}
		case 'REMOVE_CART':
			return {
				...state,
				cart: action.payload,
			}
		case 'ADD_QTY':
			return {
				...state,
				cart: action.payload,
			}
		case 'SUBTRACT_QTY':
			return {
				...state,
				cart: action.payload,
			}
		case 'CHANGE_QTY':
			return {
				...state,
				cart: action.payload,
			}
		case 'GET_FOOD':
			return {
				...state,
				foods: action.payload,
				loading: true,
			}
		case 'SET_LOADING':
			return {
				...state,
				loading: false,
			}

		default:
			return state
	}
}

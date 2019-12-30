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
				foods: action.payload.foods,
				totalFood: action.payload.totalData,
				loading: false,
			}
		case 'SET_LOADING':
			return {
				...state,
				loading: true,
			}
		case 'SHOW_FOOD_MODAL':
			return {
				...state,
				foodModalVisible: true,
			}
		case 'HIDE_FOOD_MODAL':
			return {
				...state,
				foodModalVisible: false,
			}
		case 'ADD_FOOD':
			return {
				...state,
				loading: false,
			}
		case 'FORM_FOOD_ERROR':
			return {
				...state,
				errorMessage: action.payload,
				loading: false,
			}

		default:
			return state
	}
}

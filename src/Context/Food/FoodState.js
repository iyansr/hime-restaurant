import React, { useReducer } from 'react'
import FoodContext from './foodContext'
import FoodReducer from './foodReducers'
import { foodData } from '../../Components/Home/dummy'

const FoodState = props => {
	const initialState = {
		foods: foodData,
		cart: [],
	}

	const [state, dispatch] = useReducer(FoodReducer, initialState)

	const addToCart = item => {
		dispatch({
			type: 'ADD_TO_CART',
			payload: item,
		})
	}
	const removeCart = () => {
		dispatch({
			type: 'REMOVE_CART',
			payload: [],
		})
	}

	const addQty = index => {
		const cartItem = state.cart
		cartItem[index].quantity++

		dispatch({
			type: 'ADD_QTY',
			payload: cartItem,
		})
	}

	const subtractQty = index => {
		const cartItem = state.cart

		cartItem[index].quantity--
		if (cartItem[index].quantity === 0) {
			cartItem.splice(index, 1)
		}

		dispatch({
			type: 'SUBTRACT_QTY',
			payload: cartItem,
		})
	}

	return (
		<FoodContext.Provider
			value={{
				foods: state.foods,
				cart: state.cart,
				addToCart,
				removeCart,
				addQty,
				subtractQty,
			}}>
			{props.children}
		</FoodContext.Provider>
	)
}

export default FoodState

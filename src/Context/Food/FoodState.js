import React, { useReducer } from 'react'
import FoodContext from './foodContext'
import FoodReducer from './foodReducers'
import { foodData } from '../../Components/Home/dummy'
import axios from 'axios'

const FoodState = props => {
	const initialState = {
		foods: foodData,
		cart: [],
		loading: true,
	}

	const [state, dispatch] = useReducer(FoodReducer, initialState)

	const getFood = async () => {
		try {
			const response = await axios.get(`http://localhost:9300/api/food?limit=6`)
			dispatch({
				type: 'GET_FOOD',
				payload: response.data.foods,
			})
			setLoading()
		} catch (error) {
			console.log(error)
		}
	}

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

	const changeQty = (index, value) => {
		const cartItem = state.cart

		cartItem[index].quantity = value
		if (cartItem[index].quantity === 0) {
			cartItem.splice(index, 1)
		}
		if (cartItem[index].quantity < 0) {
			cartItem.splice(index, 1)
		}
		dispatch({
			type: 'CHANGE_QTY',
			payload: cartItem,
		})
	}

	const setLoading = () => dispatch({ type: 'SET_LOADING' })

	return (
		<FoodContext.Provider
			value={{
				foods: state.foods,
				cart: state.cart,
				loading: state.loading,
				addToCart,
				removeCart,
				addQty,
				subtractQty,
				changeQty,
				getFood,
			}}>
			{props.children}
		</FoodContext.Provider>
	)
}

export default FoodState

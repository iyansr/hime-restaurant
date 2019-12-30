import React, { useReducer } from 'react'
import FoodContext from './foodContext'
import FoodReducer from './foodReducers'
import { foodData } from '../../Components/Home/dummy'
import axios from 'axios'

const FoodState = props => {
	const initialState = {
		foods: foodData,
		totalFood: 0,
		cart: [],
		loading: false,
		foodModalVisible: false,
		errorMessage: {},
	}

	const [state, dispatch] = useReducer(FoodReducer, initialState)

	const getFood = async page => {
		setLoading()
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_API_URL}/food?limit=6&page=${page || 1}`
			)
			dispatch({
				type: 'GET_FOOD',
				payload: response.data,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const addFood = async formData => {
		setLoading()
		try {
			await axios.post(`${process.env.REACT_APP_BASE_API_URL}/food`, formData)
			dispatch({
				type: 'ADD_FOOD',
			})
			getFood()
			hideFoodModal()
		} catch (error) {
			dispatch({
				type: 'FORM_FOOD_ERROR',
				payload: error.response.data.message,
			})
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
	const showFoodModal = () => {
		dispatch({
			type: 'SHOW_FOOD_MODAL',
		})
	}
	const hideFoodModal = () => {
		dispatch({
			type: 'HIDE_FOOD_MODAL',
		})
	}

	return (
		<FoodContext.Provider
			value={{
				foods: state.foods,
				cart: state.cart,
				loading: state.loading,
				foodModalVisible: state.foodModalVisible,
				errorMessage: state.errorMessage,
				totalFood: state.totalFood,
				addToCart,
				removeCart,
				addQty,
				subtractQty,
				changeQty,
				getFood,
				hideFoodModal,
				showFoodModal,
				addFood,
			}}>
			{props.children}
		</FoodContext.Provider>
	)
}

export default FoodState

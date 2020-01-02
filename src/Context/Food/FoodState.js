import React, { useReducer } from 'react'
import FoodContext from './foodContext'
import FoodReducer from './foodReducers'
import { foodData } from '../../Components/Home/dummy'
import axios from 'axios'

let apiBaseUrl

if (process.env.NODE_ENV !== 'production') {
	apiBaseUrl = process.env.REACT_APP_BASE_API_URL
} else {
	apiBaseUrl = process.env.BASE_API_URL
}

const FoodState = props => {
	const initialState = {
		foods: foodData,
		totalFood: 0,
		cart: [],
		loading: false,
		foodModalVisible: false,
		editModalVisible: false,
		errorMessage: {},
		editImage: '',
		editName: '',
		editPrice: '',
		editCategory: '',
		idFood: '',
		errorSearchFood: false,
	}

	const [state, dispatch] = useReducer(FoodReducer, initialState)

	const getFood = async (
		page = 1,
		category,
		name,
		order,
		priceMin,
		priceMax
	) => {
		setLoading()
		try {
			const response = await axios.get(
				`${apiBaseUrl}/food?limit=6&page=${page}&category=${category ||
					''}&price=${priceMin || 0};${priceMax || 200000}&name=${name ||
					''}&order=${order || 'ASC'}`
			)
			dispatch({
				type: 'GET_FOOD',
				payload: response.data,
			})
		} catch (error) {
			dispatch({
				type: 'ERROR_SEARCH_FOOD',
			})
		}
	}

	const setIdFood = id => {
		dispatch({
			type: 'SET_EDIT_FOOD',
			payload: id,
		})
	}

	const addFood = async formData => {
		setLoading()
		try {
			await axios.post(`${apiBaseUrl}/food`, formData)
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

	const editFood = async (formData, id) => {
		setLoading()
		try {
			await axios.patch(`${apiBaseUrl}/food/${id}`, formData)
			dispatch({
				type: 'EDIT_FOOD',
			})
			getFood()
			hideEditFoodModal()
		} catch (error) {
			dispatch({
				type: 'FORM_FOOD_ERROR',
				payload: error.response.data.message,
			})
		}
	}

	const editModalForm = (name, image, price) => {
		dispatch({
			type: 'EDIT_MODAL_FORM',
			payload: {
				name,
				image,
				price,
			},
		})
	}
	const clearForm = () => {
		dispatch({
			type: 'CLEAR_FORM',
		})
	}
	const setCategory = data => {
		dispatch({
			type: 'SET_CATEGORY',
			payload: data,
		})
	}

	const handleFormEditChange = e => {
		let newForm = {
			...state,
			[e.target.name]: e.target.value,
		}
		dispatch({
			type: 'CHANGE_FORM',
			payload: newForm,
		})
	}

	const deleteFood = async id => {
		setLoading()
		try {
			await axios.delete(`${apiBaseUrl}/food/${id}`)
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
	const showEditFoodModal = () => {
		dispatch({
			type: 'SHOW_EDIT_FOOD_MODAL',
		})
	}
	const hideEditFoodModal = () => {
		dispatch({
			type: 'HIDE_EDIT_FOOD_MODAL',
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
				editModalVisible: state.editModalVisible,
				errorSearchFood: state.errorSearchFood,
				editCategory: state.editCategory,
				editImage: state.editImage,
				editName: state.editName,
				editPrice: state.editPrice,
				idFood: state.idFood,
				addToCart,
				removeCart,
				addQty,
				subtractQty,
				changeQty,
				getFood,
				hideFoodModal,
				showFoodModal,
				addFood,
				showEditFoodModal,
				hideEditFoodModal,
				editFood,
				deleteFood,
				editModalForm,
				handleFormEditChange,
				setCategory,
				clearForm,
				setIdFood,
			}}>
			{props.children}
		</FoodContext.Provider>
	)
}

export default FoodState

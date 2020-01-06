import React, { useReducer } from 'react'
import CheckOutContext from './checkOutContext'
import CheckOutReducer from './checkOutReducer'
import randomstring from 'randomstring'
import Axios from 'axios'

const date = new Date()

let apiBaseUrl

if (process.env.NODE_ENV !== 'production') {
	apiBaseUrl = process.env.BASE_API_URL
} else {
	apiBaseUrl = process.env.REACT_APP_BASE_API_URL
}
const CheckOutState = props => {
	const initialState = {
		modalVisible: false,
		checkOutId:
			'#HM' +
			randomstring.generate({
				length: 5,
				charset: 'alphanumeric',
				capitalization: 'uppercase',
			}) +
			date.getDay() +
			date.getMonth() +
			date.getFullYear() +
			date.getHours() +
			date.getMilliseconds() +
			randomstring.generate({
				length: 5,
				charset: 'alphanumeric',
				capitalization: 'uppercase',
			}),
		checkOutItem: [],
		loading: false,
	}

	const [state, dispatch] = useReducer(CheckOutReducer, initialState)

	const showModal = () => {
		dispatch({
			type: 'SHOW_MODAL',
			payload: true,
		})
	}
	const hideModal = () => {
		dispatch({
			type: 'HIDE_MODAL',
			payload: false,
		})
	}

	const setCheckoutItem = items => {
		let newCheckoutItem = state.checkOutItem

		items.map(item => {
			return (newCheckoutItem = [
				...newCheckoutItem,
				{
					checkout_id: item.id_transaction,
					food_id: item.id,
					price: item.price,
					quantity: item.quantity,
					total: item.quantity * item.price,
				},
			])
		})
		dispatch({
			type: 'SET_CHECKOUT',
			payload: newCheckoutItem,
		})
	}

	const sendCheckout = async formData => {
		try {
			setLoading()
			await Axios.post(`${apiBaseUrl}/checkout`, formData)
			clearCheckout()
			dispatch({ action: 'SEND_CHECKOUT' })
		} catch (error) {
			console.log(error)
			dispatch({ action: 'ERROR_CHECKOUT' })
		}
	}
	const clearCheckout = () => {
		dispatch({
			type: 'CLEAR_CHECKOUT',
		})
	}

	const changeCheckoutId = () => {
		const newCheckoutId =
			'#HM' +
			randomstring.generate({
				length: 5,
				charset: 'alphanumeric',
				capitalization: 'uppercase',
			}) +
			date.getDay() +
			date.getMonth() +
			date.getFullYear() +
			date.getHours() +
			date.getMilliseconds() +
			randomstring.generate({
				length: 5,
				charset: 'alphanumeric',
				capitalization: 'uppercase',
			})
		console.log(newCheckoutId)

		dispatch({
			type: 'CHANGE_CHECKOUT_ID',
			payload: newCheckoutId,
		})
	}

	const setLoading = () => dispatch({ type: 'SET_LOADING' })
	const stopLoading = () => dispatch({ type: 'STOP_LOADING' })

	return (
		<CheckOutContext.Provider
			value={{
				modalVisible: state.modalVisible,
				checkOutId: state.checkOutId,
				checkOutItem: state.checkOutItem,
				loading: state.loading,
				showModal,
				hideModal,
				changeCheckoutId,
				setCheckoutItem,
				setLoading,
				sendCheckout,
				stopLoading,
				clearCheckout,
			}}>
			{props.children}
		</CheckOutContext.Provider>
	)
}

export default CheckOutState

import React, { useReducer } from 'react'
import CheckOutContext from './checkOutContext'
import CheckOutReducer from './checkOutReducer'
import randomstring from 'randomstring'

const date = new Date()

const CheckOutState = props => {
	const initialState = {
		modalVisible: false,
		checkOutId:
			'#HI_FOOD' +
			randomstring.generate({
				length: 8,
				charset: 'numeric',
			}) +
			date.getMilliseconds(),
		checkOutItem: [],
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

	const changeCheckoutId = () => {
		const newCheckoutId =
			'#HI_FOOD' +
			randomstring.generate({
				length: 8,
				charset: 'numeric',
			}) +
			date.getMilliseconds()

		dispatch({
			type: 'CHANGE_CHECKOUT_ID',
			payload: newCheckoutId,
		})
	}

	const setCheckoutItem = items => {
		let newCheckoutItem = state.checkOutItem

		items.map(item => {
			newCheckoutItem = [
				...newCheckoutItem,
				{
					checkout_id: item.id_transaction,
					food_id: item.id,
					price: item.price,
					quantity: item.quantity,
					total: item.quantity * item.price,
				},
			]
		})

		dispatch({
			type: 'SET_CHECKOUT',
			payload: newCheckoutItem,
		})
	}

	return (
		<CheckOutContext.Provider
			value={{
				modalVisible: state.modalVisible,
				checkOutId: state.checkOutId,
				checkOutItem: state.checkOutItem,
				showModal,
				hideModal,
				changeCheckoutId,
				setCheckoutItem,
			}}>
			{props.children}
		</CheckOutContext.Provider>
	)
}

export default CheckOutState

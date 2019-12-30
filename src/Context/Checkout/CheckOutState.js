import React, { useReducer } from 'react'
import CheckOutContext from './checkOutContext'
import CheckOutReducer from './checkOutReducer'

const CheckOutState = props => {
	const initialState = {
		modalVisible: false,
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

	return (
		<CheckOutContext.Provider
			value={{
				modalVisible: state.modalVisible,
				showModal,
				hideModal,
			}}>
			{props.children}
		</CheckOutContext.Provider>
	)
}

export default CheckOutState

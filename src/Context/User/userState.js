import React, { useReducer } from 'react'
import UserReducer from './userReducer'
import UserContext from './userContext'
import Axios from 'axios'

const UserState = props => {
	const initialState = {
		userToken: null,
		userError: {},
		modalVisible: false,
		loading: false,
	}

	const [state, dispatch] = useReducer(UserReducer, initialState)

	const loginUser = async formData => {
		try {
			setLoading()
			const response = await Axios.post(
				`${process.env.REACT_APP_BASE_API_URL}/user/login`,
				formData
			)
			dispatch({
				type: 'LOGIN_USER',
				payload: response.data.token,
			})
			hideModal()
		} catch (error) {
			dispatch({
				type: 'ERROR_LOGIN',
				payload: error.response.data.message,
			})
		}
	}

	const showModal = () => {
		dispatch({
			type: 'SHOW_MODAL',
		})
	}

	const hideModal = () => {
		dispatch({
			type: 'HIDE_MODAL',
		})
	}

	const setLoading = () => dispatch({ type: 'SET_LOADING' })

	return (
		<UserContext.Provider
			value={{
				userToken: state.userToken,
				modalVisible: state.modalVisible,
				loading: state.loading,
				userError: state.userError,
				loginUser,
				showModal,
				hideModal,
				setLoading,
			}}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserState

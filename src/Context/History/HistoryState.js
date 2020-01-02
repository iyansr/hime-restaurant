import React, { useReducer } from 'react'
import HistoryReducer from './historyReducer'
import HistoryContext from './historyContext'
import Axios from 'axios'

let apiBaseUrl = 'https://intense-inlet-23820.herokuapp.com/api'

const HistoryState = props => {
	const initialState = {
		historyTable: [],
	}

	const [state, dispatch] = useReducer(HistoryReducer, initialState)

	const getHistoryTable = async () => {
		try {
			const response = await Axios.get(`${apiBaseUrl}/checkout`)
			dispatch({
				type: 'GET_TABLE',
				payload: response.data,
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<HistoryContext.Provider
			value={{
				historyTable: state.historyTable,
				getHistoryTable,
			}}>
			{props.children}
		</HistoryContext.Provider>
	)
}

export default HistoryState

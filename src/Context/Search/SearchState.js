import React, { useReducer } from 'react'
import SearchReducer from './searchReducer'
import SearchContext from './searchContext'

const SearchState = props => {
	const initialState = {
		searchText: '',
		searchCategory: '',
	}

	const [state, dispatch] = useReducer(SearchReducer, initialState)

	const changeSearch = e => {
		dispatch({
			type: 'SET_SEARCH_NAME',
			payload: e.target.name,
		})
	}

	return (
		<SearchContext.Provider
			value={{
				searchText: state.searchText,
				changeSearch,
			}}>
			{props.children}
		</SearchContext.Provider>
	)
}

export default SearchState

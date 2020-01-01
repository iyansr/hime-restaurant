import React from 'react'
import { Redirect } from 'react-router-dom'

const History = () => {
	if (localStorage.getItem('@usertoken'))
		return (
			<div>
				<h1>Cart</h1>
			</div>
		)
	return <Redirect to='/' />
}

export default History

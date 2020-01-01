import React from 'react'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import HistoryTable from '../History/HistoryTable'

const History = () => {
	if (localStorage.getItem('@usertoken'))
		return (
			<Layout>
				<HistoryTable />
			</Layout>
		)
	return <Redirect to='/' />
}

export default History

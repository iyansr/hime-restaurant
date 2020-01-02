import React from 'react'
import { Redirect } from 'react-router-dom'
import { Layout, Card, Row, Col } from 'antd'
import HistoryTable from '../History/HistoryTable'
import ChartHistory from '../History/ChartHistory'

const History = () => {
	if (localStorage.getItem('@usertoken'))
		return (
			<Layout style={{ background: '#fff' }}>
				<ChartHistory />
				<HistoryTable />
			</Layout>
		)
	return <Redirect to='/' />
}

export default History

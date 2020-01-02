import React, { useContext, useEffect, useState } from 'react'
import { Table, Tag, Layout } from 'antd'
import HistoryContext from '../../Context/History/historyContext'
import convertToRupiah from '../../utils/rupiah'
import moment from 'moment'
import Axios from 'axios'

const HistoryTable = () => {
	const historyContext = useContext(HistoryContext)

	const { historyTable, getHistoryTable } = historyContext

	const [chartData, setChartData] = useState([])
	const dateNow = moment().format('DD MMMM YYYY')
	const [totalIncome, setTotalIncome] = useState(0)

	useEffect(() => {
		getHistoryTable()
		//eslint-disable-next-line
	}, [])

	const getChart = async () => {
		try {
			const response = await Axios.get(
				`${process.env.REACT_APP_BASE_API_URL}/checkout/chart`
			)

			setChartData(response.data)

			setTotalIncome(
				response.data.filter(val => val.createdAt === dateNow)[0].total
			)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getChart()
	}, [])

	const columns = [
		{
			title: 'ID',
			dataIndex: 'checkout_id',
			key: 'checkout_id',
			width: 250,
		},
		{
			title: 'Total (VAT)',
			dataIndex: 'total',
			key: 'total',
			render: text => <span>{convertToRupiah(text)}</span>,
			width: 150,
		},

		{
			title: 'Foods',
			key: 'foods',
			dataIndex: 'foods',
			render: (foods, data) => {
				// const ar
				return (
					<span>
						{foods.map((food, index) => {
							return (
								<Tag color='#c41d7f' key={index} style={{ marginBottom: 10 }}>
									{food + ' ' + data.quantity[index] + 'x'}
								</Tag>
							)
						})}
					</span>
				)
			},
		},
		{
			title: 'Date',
			key: 'createdAt',
			dataIndex: 'createdAt',
			width: 150,
		},
	]

	const data = historyTable.map((his, index) => {
		return {
			key: index,
			...his,
		}
	})

	return (
		<Layout style={{ padding: 50, background: '#fff' }}>
			<Table
				columns={columns}
				dataSource={data}
				bordered
				pagination={{ defaultPageSize: 5 }}
				title={() => <p style={{ fontWeight: 'bold' }}>History</p>}
			/>
		</Layout>
	)
}

export default HistoryTable

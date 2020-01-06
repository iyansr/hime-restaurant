import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Card } from 'antd'
import moment from 'moment'
import Axios from 'axios'
import { BarChart } from 'reaviz'
import convertToRupiah from '../../utils/rupiah'

let apiBaseUrl

if (process.env.NODE_ENV === 'development') {
	apiBaseUrl = process.env.REACT_APP_BASE_API_URL
} else {
	apiBaseUrl = process.env.BASE_API_URL
}

const ChartHistory = () => {
	const dateNow = moment().format('DD MMMM YYYY')

	const [totalIncome, setTotalIncome] = useState(0)
	const [todayIncome, setTodayIncome] = useState(0)
	const [totalOrder, setTotalOrder] = useState(0)
	const [chartData, setChartData] = useState([
		{
			key: moment().format('DD MMMM YYYY'),
			data: 0,
		},
	])

	const getChart = async () => {
		try {
			const response = await Axios.get(`${apiBaseUrl}/checkout/chart`)

			const date = new Date()
			let Dates = []

			for (let i = 0; i < 7; i++) {
				let tempDate = new Date()
				tempDate.setDate(date.getDate() - i)
				let str = tempDate
				Dates.push(moment(str).format('DD MMMM YYYY'))
			}

			console.log(Dates)

			const tempDate = Dates.map((date, index) => {
				return {
					key: date,
					data:
						date === response.data[index].createdAt
							? response.data[index].total
							: 0,
				}
			})

			console.log(tempDate)
			setChartData(tempDate.reverse())

			setTotalIncome(response.data.reduce((a, b) => a + b.total, 0))
			setTodayIncome(
				response.data.filter(val => val.createdAt === dateNow)[0].total
			)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getChart()
		//eslint-disable-next-line
	}, [])

	const getTotalOrder = async () => {
		try {
			const response = await Axios.get(`${apiBaseUrl}/checkout`)

			setTotalOrder(response.data.length)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getTotalOrder()
	}, [])

	return (
		<Layout style={{ padding: 50, background: '#fff' }}>
			<Row>
				<Col span={8}>
					<Card style={{ width: 300, background: '#b7eb8f', borderRadius: 10 }}>
						<h1>Today's Income </h1>
						<p style={{ fontWeight: 'bold', fontSize: 30 }}>
							{convertToRupiah(todayIncome)}
						</p>
					</Card>
				</Col>
				<Col span={8}>
					<Card style={{ width: 300, background: '#ff85c0', borderRadius: 10 }}>
						<h1>Total Order </h1>
						<p style={{ fontWeight: 'bold', fontSize: 30 }}>{totalOrder}</p>
					</Card>
				</Col>
				<Col span={8}>
					<Card style={{ width: 300, background: '#ffbb96', borderRadius: 10 }}>
						<h1>Total Income </h1>
						<p style={{ fontWeight: 'bold', fontSize: 30 }}>
							{convertToRupiah(totalIncome)}
						</p>
					</Card>
				</Col>
			</Row>

			<div style={{ marginTop: 80, minWidth: '100vh' }}>
				<BarChart height={400} width={1300} data={chartData} />
			</div>
		</Layout>
	)
}

export default ChartHistory

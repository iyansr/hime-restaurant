import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { Layout, Row, Col, Card } from 'antd'
import moment from 'moment'
import Axios from 'axios'
import convertToRupiah from '../../utils/rupiah'

let apiBaseUrl = 'https://intense-inlet-23820.herokuapp.com/api'
const ChartHistory = () => {
	const dateNow = moment().format('DD MMMM YYYY')

	const [dates, setDates] = useState([])
	const [responseData, setResponseData] = useState([])
	const [series, setSeries] = useState([])
	const [totalIncome, setTotalIncome] = useState(0)
	const [todayIncome, setTodayIncome] = useState(0)
	const [totalOrder, setTotalOrder] = useState(0)

	const getDates = () => {
		const date = new Date()
		let Dates = []

		for (let i = 0; i < 7; i++) {
			let tempDate = new Date()
			tempDate.setDate(date.getDate() - i)
			let str = tempDate
			Dates.push(moment(str).format('DD MMMM YYYY'))
		}
		setDates(Dates.reverse())
		console.log(Dates)
	}

	useEffect(() => {
		getDates()
		//eslint-disable-next-line
	}, [])

	const getChart = async () => {
		try {
			const response = await Axios.get(`${apiBaseUrl}/checkout/chart`)

			const data = response.data.map(d => d.total)

			setTotalIncome(response.data.reduce((a, b) => a + b.total, 0))
			setTodayIncome(
				response.data.filter(val => val.createdAt === dateNow)[0].total
			)

			setResponseData(data)
			console.log(response.data)

			setSeries(data)
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

			<div className='mixed-chart' style={{ marginTop: 80 }}>
				<Chart
					options={{
						chart: {
							id: 'basic-bar',
						},
						xaxis: {
							categories: dates
								.filter(
									date => !responseData.find(serie => date === serie.createdAt)
								)
								.reverse(),
						},
					}}
					series={[
						{
							name: 'Total',
							data: series,
						},
					]}
					type='line'
					width='100%'
					height='400'
				/>
			</div>
		</Layout>
	)
}

export default ChartHistory

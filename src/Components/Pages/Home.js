import React from 'react'
import { Layout, Row, Col } from 'antd'
import FoodContainer from '../Home/FoodContainer'
import CartContainer from '../Home/CartContainer'

const { Header } = Layout

const Home = () => {
	return (
		<Row>
			<Col span={16}>
				<Header style={{ background: '#fff', paddingLeft: '50%' }}>
					<h1 style={{ fontSize: 20 }}>Food Items</h1>
				</Header>
				<FoodContainer />
			</Col>
			<Col span={8}>
				<CartContainer />
			</Col>
		</Row>
	)
}

export default Home

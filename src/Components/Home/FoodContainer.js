import React from 'react'
import { Layout } from 'antd'
import FoodItem from './FoodItem'

const { Content } = Layout

const FoodContainer = props => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Content style={{ margin: '8px 8px' }}>
				<FoodItem />
				{props.children}
			</Content>
		</Layout>
	)
}

export default FoodContainer

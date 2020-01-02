import React, { useContext } from 'react'
import { Layout } from 'antd'
import FoodItem from './FoodItem'
import foodContext from '../../Context/Food/foodContext'

const { Content } = Layout

const FoodContainer = props => {
	const FoodContext = useContext(foodContext)
	const { totalFood, getFood } = FoodContext
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

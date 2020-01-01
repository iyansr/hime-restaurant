import React, { useContext } from 'react'
import { Layout, Pagination } from 'antd'
import FoodItem from './FoodItem'
import foodContext from '../../Context/Food/foodContext'

const { Content } = Layout

const FoodContainer = () => {
	const FoodContext = useContext(foodContext)
	const { totalFood, getFood } = FoodContext
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Content style={{ margin: '8px 8px' }}>
				<FoodItem />
				<Pagination
					onChange={val => getFood(val)}
					total={totalFood}
					showTotal={total => `Total ${total} items`}
					pageSize={6}
					defaultCurrent={1}
					style={{ float: 'right', marginRight: '26px' }}
				/>
			</Content>
		</Layout>
	)
}

export default FoodContainer

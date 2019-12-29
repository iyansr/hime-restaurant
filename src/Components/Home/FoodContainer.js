import React from 'react'
import { Layout, Pagination } from 'antd'
import FoodItem from './FoodItem'

const { Content } = Layout

const FoodContainer = () => {
	return (
		<Content style={{ margin: '8px 8px' }}>
			<FoodItem />
			<Pagination
				total={85}
				showTotal={total => `Total ${total} items`}
				pageSize={20}
				defaultCurrent={1}
				style={{ float: 'right', marginRight: '26px' }}
			/>
		</Content>
	)
}

export default FoodContainer

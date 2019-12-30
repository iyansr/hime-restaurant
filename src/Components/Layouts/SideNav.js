import React, { useState, useContext } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import FoodContext from '../../Context/Food/foodContext'

const { Sider } = Layout

const SideNav = () => {
	const foodContext = useContext(FoodContext)

	const { showFoodModal } = foodContext

	const [collapsed, setCollapsed] = useState(true)
	const onCollapse = collapsed => {
		console.log(collapsed)
		setCollapsed(collapsed)
	}

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={onCollapse}
			theme='light'>
			<div className='logo' />
			<Menu theme='light' defaultSelectedKeys={['1']} mode='inline'>
				<Menu.Item key='1'>
					<NavLink to='/'>
						<Icon type='shop' />
						<span>Home</span>
					</NavLink>
				</Menu.Item>

				<Menu.Item key='2'>
					<NavLink to='/history'>
						<Icon type='fund' />
						<span>History</span>
					</NavLink>
				</Menu.Item>
				<Menu.Item key='9' onClick={showFoodModal}>
					<Icon type='plus' />
					<span>Add Food</span>
				</Menu.Item>
			</Menu>
		</Sider>
	)
}

export default SideNav

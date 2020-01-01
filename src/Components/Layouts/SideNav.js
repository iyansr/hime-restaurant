import React, { useState, useContext } from 'react'
import { Layout, Menu, Icon, Popconfirm } from 'antd'
import { NavLink } from 'react-router-dom'
import FoodContext from '../../Context/Food/foodContext'
import UserContext from '../../Context/User/userContext'

const { Sider } = Layout

const SideNav = () => {
	const foodContext = useContext(FoodContext)
	const userContext = useContext(UserContext)

	const { showFoodModal } = foodContext
	const { showModal } = userContext

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
			<Menu theme='light' defaultSelectedKeys={['shop']} mode='inline'>
				<Menu.Item key='shop'>
					<NavLink to='/'>
						<Icon type='shop' />
						<span>Home</span>
					</NavLink>
				</Menu.Item>

				{localStorage.getItem('@usertoken') && (
					<Menu.Item key='history'>
						<NavLink to='/history'>
							<Icon type='fund' />
							<span>History</span>
						</NavLink>
					</Menu.Item>
				)}

				{localStorage.getItem('@usertoken') && (
					<Menu.Item key='add_food' onClick={showFoodModal}>
						<Icon type='plus' />
						<span>Add Food</span>
					</Menu.Item>
				)}
				{localStorage.getItem('@usertoken') ? (
					<Menu.Item key='logout'>
						<Popconfirm
							// placement='rightBottom'
							title='Are you sure want to log delete'
							okText='Yes'
							cancelText='No'
							onConfirm={() => {
								localStorage.removeItem('@usertoken')
								window.location.reload(true)
							}}>
							<Icon type='logout' />
							<span>Logout</span>
						</Popconfirm>
					</Menu.Item>
				) : (
					<Menu.Item key='lgin' onClick={showModal}>
						<Icon type='login' />
						<span>Login</span>
					</Menu.Item>
				)}
			</Menu>
		</Sider>
	)
}

export default SideNav

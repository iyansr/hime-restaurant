import React, { useState } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'

const { Sider } = Layout

const SideNav = () => {
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
						<Icon type='desktop' />
						<span>Option 2</span>
					</NavLink>
				</Menu.Item>
				<Menu.Item key='9'>
					<Icon type='file' />
					<span>File</span>
				</Menu.Item>
			</Menu>
		</Sider>
	)
}

export default SideNav

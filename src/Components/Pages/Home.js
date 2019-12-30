import React, { useState } from 'react'
import {
	Layout,
	Row,
	Col,
	Menu,
	Dropdown,
	Button,
	Icon,
	message,
	Radio,
	Input,
} from 'antd'
import FoodContainer from '../Home/FoodContainer'
import CartContainer from '../Home/CartContainer'
import CheckoutModal from '../Layouts/Modal'
import FoodModal from '../Layouts/FoodModal'

const { Header } = Layout
const { Search } = Input

const Home = () => {
	const [value, setValue] = useState(1)
	const [categoryText, setCategoryText] = useState('Select Category')
	const [searchTerm, setSearchTerm] = useState({
		category: '',
		search: '',
		min: '',
		max: '',
	})

	function handleMenuClick(e) {
		message.info('Click on menu item. ' + e.item.props.children[1])
		setCategoryText(e.item.props.children[1])
		setSearchTerm(prev => ({ ...prev, category: e.item.props.children[1] }))
		console.log('click', e)
	}

	const onChange = e => {
		console.log('radio checked', e.target.value)
		setValue(e.target.value)
	}

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key='1'>
				<Icon type='user' />
				Sushi
			</Menu.Item>
			<Menu.Item key='2'>
				<Icon type='user' />
				Ramen
			</Menu.Item>
			<Menu.Item key='3'>
				<Icon type='user' />
				Drink
			</Menu.Item>
		</Menu>
	)

	return (
		<Row>
			<Col span={16}>
				<CheckoutModal />
				<FoodModal />
				<Header style={{ background: '#fff', paddingLeft: '50%' }}>
					<h1 style={{ fontSize: 20 }}>Food Items</h1>
				</Header>
				<div
					style={{
						margin: '8px 8px 10px 20px',
					}}>
					<Dropdown overlay={menu} trigger={['click']}>
						<Button>
							{categoryText} <Icon type='down' />
						</Button>
					</Dropdown>

					<Search
						placeholder='input search text'
						onSearch={value =>
							setSearchTerm(prev => ({ ...prev, search: value }))
						}
						style={{ width: 200, marginLeft: 20 }}
					/>
					<Radio.Group
						onChange={onChange}
						value={value}
						style={{ marginLeft: 20 }}>
						<Radio value={1}>ASC</Radio>
						<Radio value={2}>DESC</Radio>
					</Radio.Group>
				</div>
				<div
					style={{
						margin: '8px 8px 10px 8px',
						display: 'flex',
						flexDirection: 'row',
					}}>
					{searchTerm.category && (
						<Button type='dashed'>
							{searchTerm.category}{' '}
							<Icon type='close' style={{ fontSize: 10 }} />
						</Button>
					)}
					{searchTerm.search && (
						<Button type='dashed' style={{ marginLeft: 8 }}>
							{searchTerm.search} <Icon type='close' style={{ fontSize: 10 }} />
						</Button>
					)}
					{/* {searchTerm.category && (
						<Button type='dashed' style={{ marginLeft: 8 }}>
							{searchTerm.category}
						</Button>
					)} */}
				</div>

				<FoodContainer />
			</Col>
			<Col span={8}>
				<CartContainer />
			</Col>
		</Row>
	)
}

export default Home

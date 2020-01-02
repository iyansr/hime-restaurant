import React, { useState, useContext } from 'react'
import {
	Layout,
	Row,
	Col,
	Menu,
	Dropdown,
	Button,
	Icon,
	Radio,
	Input,
	Pagination,
	Slider,
} from 'antd'
import FoodContainer from '../Home/FoodContainer'
import CartContainer from '../Home/CartContainer'
import FoodContext from '../../Context/Food/foodContext'
import emptyImage from '../../Assets/Images/empty-cart.png'

const { Header } = Layout
const { Search } = Input

const Home = () => {
	const foodContext = useContext(FoodContext)

	const { getFood, totalFood, errorSearchFood } = foodContext

	const [value, setValue] = useState('ASC')
	const [categoryText, setCategoryText] = useState('Select Category')
	const [searchTerm, setSearchTerm] = useState({
		category: '',
		search: '',
		min: '',
		max: '',
		categoryIdx: '',
	})

	function handleMenuClick(e) {
		setCategoryText(e.item.props.children[2])
		setSearchTerm({
			...searchTerm,
			category: e.item.props.children[2],
			categoryIdx: e.item.props.children[0].props.children,
		})
		console.log('click', e.item.props.children[0].props.children)

		getFood(
			1,
			e.item.props.children[0].props.children,
			searchTerm.search,
			'ASC',
			10000,
			100000
		)
	}

	const onChange = e => {
		console.log('radio checked', e.target.value)
		setValue(e.target.value)
		getFood(
			1,
			searchTerm.categoryIdx,
			searchTerm.search,
			e.target.value,
			10000,
			100000
		)
	}

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key='1'>
				<span style={{ display: 'none' }}>
					b2002274-0033-40db-b76d-82a17191b604
				</span>
				<Icon type='user' />
				Sushi
			</Menu.Item>
			<Menu.Item key='2'>
				<span style={{ display: 'none' }}>
					4b081e9b-392a-45da-8494-27576017aad4
				</span>
				<Icon type='user' />
				Ramen
			</Menu.Item>
			<Menu.Item key='3'>
				<span style={{ display: 'none' }}>
					49267808-a055-480f-a82b-aa1036899c42
				</span>
				<Icon type='user' />
				Drink
			</Menu.Item>
			<Menu.Item key='4'>
				<span style={{ display: 'none' }}>
					094548ca-33bf-4c34-8e3b-294929dd792e
				</span>
				<Icon type='user' />
				Other Food
			</Menu.Item>
		</Menu>
	)

	function onAfterChange(val) {
		console.log('onAfterChange: ', val)
		getFood(1, searchTerm.categoryIdx, searchTerm.search, value, 10000, val)
	}

	return (
		<Row style={{ width: '100%' }}>
			<Col span={16}>
				<Header style={{ background: '#fff', paddingLeft: '50%' }}>
					<h1 style={{ fontSize: 20 }}>Food Items</h1>
				</Header>

				<Row
					style={{
						margin: '8px 8px 10px 26px',
					}}>
					<Col span={5}>
						<Dropdown overlay={menu} trigger={['click']}>
							<Button>
								{categoryText} <Icon type='down' />
							</Button>
						</Dropdown>
					</Col>
					<Col span={5}>
						<Search
							placeholder='Susi rolls..'
							onSearch={val => {
								setSearchTerm({ ...searchTerm, search: val })

								getFood(1, searchTerm.categoryIdx, val, value, 10000, 100000)
							}}
							style={{ width: 200 }}
						/>
					</Col>

					<Col span={5}>
						<Slider
							defaultValue={200000}
							min={10000}
							onAfterChange={onAfterChange}
							step={10000}
							max={200000}
							style={{ width: 100, float: 'right' }}
						/>
					</Col>
					<Col span={5}>
						<Radio.Group
							onChange={onChange}
							value={value}
							style={{ marginLeft: 20 }}>
							<Radio value='ASC'>ASC</Radio>
							<Radio value='DESC'>DESC</Radio>
						</Radio.Group>
					</Col>
				</Row>
				<div
					style={{
						margin: '8px 8px 10px 8px',
						display: 'flex',
						flexDirection: 'row',
					}}>
					{searchTerm.category && (
						<Button
							type='dashed'
							style={{ marginLeft: 18 }}
							onClick={() => {
								setCategoryText('Select Category')
								setSearchTerm({
									...searchTerm,
									category: '',
									categoryIdx: '',
								})
								getFood(1, '', searchTerm.search, 'ASC', 10000, 100000)
							}}>
							{searchTerm.category}{' '}
							<Icon type='close' style={{ fontSize: 10 }} />
						</Button>
					)}
					{searchTerm.search && (
						<Button
							type='dashed'
							style={{ marginLeft: 8 }}
							onClick={() => {
								setSearchTerm({
									...searchTerm,
									search: '',
								})
								getFood(1, searchTerm.categoryIdx, '', 'ASC', 10000, 100000)
							}}>
							{searchTerm.search} <Icon type='close' style={{ fontSize: 10 }} />
						</Button>
					)}
				</div>

				{errorSearchFood ? (
					<div
						style={{
							justifyContent: 'center',
							marginLeft: '33%',
							alignContent: 'center',
							display: 'flex',
							flexDirection: 'column',
							marginTop: 50,
						}}>
						<img
							src={emptyImage}
							alt='aa'
							style={{ height: '300px', width: '300px' }}
						/>
						<h1 style={{ marginLeft: '12%' }}>Cannot Find Food</h1>
					</div>
				) : (
					<FoodContainer>
						<Pagination
							onChange={val =>
								getFood(
									val,
									searchTerm.categoryIdx,
									searchTerm.search,
									'ASC',
									10000,
									100000
								)
							}
							total={totalFood}
							showTotal={total => `Total ${total} items`}
							pageSize={6}
							defaultCurrent={1}
							style={{ float: 'right', marginRight: '26px' }}
						/>
					</FoodContainer>
				)}
			</Col>
			<Col span={8}>
				<CartContainer />
			</Col>
		</Row>
	)
}

export default Home

import React, { useContext } from 'react'
import { Layout, Card, Badge, Button, InputNumber, Icon } from 'antd'
import FoodContext from '../../Context/Food/foodContext'
import styles from './style.module.css'
import cartEmpty from '../../Assets/Images/empty-cart.png'
import CartFooter from './CartFooter'
import convertToRupiah from '../../utils/rupiah'

const { Header, Content } = Layout

const CartContainer = () => {
	const foodContext = useContext(FoodContext)

	const { cart, addQty, subtractQty, changeQty } = foodContext

	return (
		<Layout style={{ minHeight: '100vh', overflow: 'auto', height: '100vh' }}>
			<Header style={{ background: '#fff', paddingLeft: '50%' }}>
				<Badge count={cart.length}>
					<div style={{ minWidth: 40 }}>
						<h1>Cart</h1>
					</div>
				</Badge>
			</Header>
			<Content className={styles.cart_container}>
				{cart.length > 0 ? (
					cart.map((d, index) => (
						<div
							key={index}
							style={{
								display: 'flex',
								width: '100%',
								flexDirection: 'row',
							}}>
							<Card
								size='small'
								hoverable
								style={{ width: 80, height: 80, marginBottom: '20px' }}
								cover={
									<img
										alt='example'
										src={d.image}
										width='100%'
										height={80}
										style={{ objectFit: 'cover' }}
									/>
								}></Card>
							<div style={{ marginLeft: 10 }}>
								<h1 style={{ fontWeight: 'bold' }}>{d.name}</h1>
								<div
									style={{
										display: 'flex',
										width: '100%',
										flexDirection: 'row',
										marginTop: 25,
									}}>
									<Button onClick={() => subtractQty(index)}>
										<Icon type='minus' />
									</Button>
									<InputNumber
										min={1}
										max={100000}
										style={{ width: 50 }}
										value={d.quantity}
										onChange={val => changeQty(index, val)}
									/>
									<Button onClick={() => addQty(index)}>
										<Icon type='plus' />
									</Button>
									<h1 style={{ marginLeft: 40, marginTop: 4 }}>
										{convertToRupiah(d.price * d.quantity)}
									</h1>
								</div>
							</div>
						</div>
					))
				) : (
					<div className={styles.cart_image_div}>
						<img src={cartEmpty} alt='aa' width='100%' />
						<h1>Your cart is empty</h1>
					</div>
				)}
			</Content>
			<CartFooter />
		</Layout>
	)
}

export default CartContainer

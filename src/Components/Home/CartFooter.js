import React, { useContext } from 'react'
import { Layout, Button } from 'antd'
import FoodContext from '../../Context/Food/foodContext'
import styles from './style.module.css'
import convertToRupiah from '../../utils/rupiah'

const { Footer } = Layout

const CartFooter = () => {
	const foodContext = useContext(FoodContext)
	const { removeCart, cart } = foodContext
	const total = cart.reduce(
		(prev, next) => prev + next.price * next.quantity,
		0
	)

	return (
		<Footer
			style={{
				background: '#fff',
				margin: '8px 8px',
				padding: 10,
			}}>
			<div className={styles.cart_footer_price}>
				<h1>Total</h1>
				<h1>{convertToRupiah(total)}</h1>
			</div>
			<p>*belum termasuk ppn</p>
			<Button type='primary' style={{ width: '100%', height: 40 }}>
				Checkout
			</Button>
			<Button
				type='danger'
				style={{ width: '100%', marginTop: 10, height: 40 }}
				onClick={removeCart}>
				Clear
			</Button>
		</Footer>
	)
}

export default CartFooter

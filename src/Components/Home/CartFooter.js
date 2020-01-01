import React, { useContext } from 'react'
import { Layout, Button } from 'antd'

import CheckOutContext from '../../Context/Checkout/checkOutContext'
import FoodContext from '../../Context/Food/foodContext'

import styles from './style.module.css'
import convertToRupiah from '../../utils/rupiah'

const { Footer } = Layout

const CartFooter = () => {
	const foodContext = useContext(FoodContext)
	const checkOutContext = useContext(CheckOutContext)

	const { removeCart, cart } = foodContext
	const { showModal, setCheckoutItem } = checkOutContext

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
				<h1>{convertToRupiah(total)}*</h1>
			</div>
			<p>*Not Including VAT</p>
			<Button
				onClick={() => {
					showModal()
					setCheckoutItem(cart)
				}}
				type={cart.length <= 0 ? 'dashed' : 'primary'}
				disabled={cart.length <= 0 ? true : false}
				style={{ width: '100%', height: 40 }}>
				Checkout
			</Button>
			<Button
				type={cart.length <= 0 ? 'dashed' : 'danger'}
				disabled={cart.length <= 0 ? true : false}
				style={{ width: '100%', marginTop: 10, height: 40 }}
				onClick={removeCart}>
				Clear
			</Button>
		</Footer>
	)
}

export default CartFooter

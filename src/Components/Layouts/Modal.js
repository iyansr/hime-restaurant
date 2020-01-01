import React, { useContext } from 'react'
import { Modal, Button } from 'antd'
import CheckOutContext from '../../Context/Checkout/checkOutContext'
import FoodContext from '../../Context/Food/foodContext'
import convertToRupiah from '../../utils/rupiah'

const CheckoutModal = () => {
	const checkOutContext = useContext(CheckOutContext)
	const foodContext = useContext(FoodContext)

	const {
		modalVisible,
		hideModal,
		checkOutItem,
		sendCheckout,
		loading,
		changeCheckoutId,
		stopLoading,
	} = checkOutContext
	const { cart, removeCart } = foodContext

	const total = cart.reduce(
		(prev, next) => prev + next.price * next.quantity,
		0
	)

	const prepareSend = () => {
		const item = JSON.stringify(checkOutItem)
		const formData = new FormData()
		formData.append('check', item)
		console.log(item)
		sendCheckout(formData).then(() => {
			removeCart()
			hideModal()
			changeCheckoutId()
			stopLoading()
		})
	}

	return (
		<div>
			<Modal
				visible={modalVisible}
				title='Checkout'
				// onOk={hideModal}
				onCancel={hideModal}
				footer={[
					<Button key='back' onClick={hideModal}>
						Cancel
					</Button>,
					<Button
						key='submit'
						type='primary'
						loading={loading}
						onClick={prepareSend}>
						Submit
					</Button>,
				]}>
				<div style={{ width: '100%' }}>
					<p>{cart.length > 0 && cart[0].id_transaction}</p>
					<table style={{ width: '100%' }}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Quantity</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							{cart.map(c => (
								<tr key={c.id}>
									<td>{c.name}</td>
									<td>{c.quantity}</td>
									<td>{convertToRupiah(c.price * c.quantity)}</td>
								</tr>
							))}
							<tr>
								<td>
									<hr />
								</td>
								<td>
									<hr />
								</td>
								<td>
									<hr />
								</td>
							</tr>
							<tr>
								<th>Total (10% VAT Included)</th>
								<td></td>
								<td>{convertToRupiah(total + total * (10 / 100))}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</Modal>
		</div>
	)
}

export default CheckoutModal

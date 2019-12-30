import React, { useContext } from 'react'
import { Modal, Button } from 'antd'
import CheckOutContext from '../../Context/Checkout/checkOutContext'

const CheckoutModal = () => {
	const checkOutContext = useContext(CheckOutContext)

	const { modalVisible, hideModal } = checkOutContext
	return (
		<div>
			<Modal
				visible={modalVisible}
				title='Title'
				// onOk={hideModal}
				onCancel={hideModal}
				footer={[
					<Button key='back' onClick={hideModal}>
						Return
					</Button>,
					<Button
						key='submit'
						type='primary'
						// loading={loading}
						onClick={hideModal}>
						Submit
					</Button>,
					<Button
						key='submit'
						type='primary'
						// loading={loading}
						onClick={hideModal}>
						Submit
					</Button>,
				]}>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</div>
	)
}

export default CheckoutModal

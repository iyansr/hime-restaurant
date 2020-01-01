import React, { useState, useContext } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import UserContext from '../../Context/User/userContext'

const LoginModal = () => {
	const userContext = useContext(UserContext)

	const { loginUser, loading, modalVisible, userError, hideModal } = userContext

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async e => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('email', email)
		formData.append('password', password)
		await loginUser(formData)
	}

	return (
		<div>
			<Modal
				visible={modalVisible}
				title='Login'
				onCancel={hideModal}
				footer={[
					<Button key='back' onClick={hideModal}>
						Cancel
					</Button>,
					<Button
						disabled={loading}
						key='submit'
						type='primary'
						loading={loading}
						onClick={handleLogin}>
						Login
					</Button>,
				]}>
				<Form layout='vertical'>
					<Form.Item
						label='Email *'
						validateStatus={userError.email && 'error'}
						help={userError.email && userError.email}>
						<Input
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder='Input youremail'
							type='email'
						/>
					</Form.Item>
					<Form.Item
						label='Password *'
						validateStatus={userError.password && 'error'}
						help={userError.password && userError.password}>
						<Input
							placeholder='Input your password'
							type='password'
							vale={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default LoginModal

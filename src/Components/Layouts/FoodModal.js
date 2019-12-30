import React, { useState, useContext } from 'react'
import { Form, Input, Icon, Select, Button, Modal, Upload, Switch } from 'antd'
import FoodContext from '../../Context/Food/foodContext'

const { Option } = Select

const FoodModal = () => {
	const foodContext = useContext(FoodContext)

	const [fileList, setFileList] = useState([])
	const [name, setName] = useState('')
	const [price, setPrice] = useState(10000)
	const [imageUrl, setImageUrl] = useState('')
	const [category, setCategory] = useState('')
	const [isUrl, setIsUrl] = useState(false)

	const {
		foodModalVisible,
		hideFoodModal,
		loading,
		addFood,
		errorMessage,
	} = foodContext

	const handleUpload = async () => {
		console.log('IMAGE FILE')

		const formData = new FormData()
		formData.append('image', fileList[0])
		formData.append('name', name)
		formData.append('price', price)
		formData.append('category', category)

		for (let pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1])
		}

		addFood(formData)
	}

	const handleSubmit = async () => {
		console.log('IMAGE URL')
		const formData = new FormData()
		formData.append('name', name)
		formData.append('price', price)
		formData.append('category', category)
		formData.append('image', imageUrl)

		for (let pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1])
		}
		addFood(formData)
	}

	const props = {
		onRemove: file => {
			setFileList(prev => {
				const index = prev.indexOf(file)
				const newFileList = prev.slice()
				newFileList.splice(index, 1)
				return newFileList
			})
		},
		beforeUpload: file => {
			setFileList(prev => [...prev, file])
			return false
		},
		fileList,
	}

	const onChange = checked => {
		console.log(`switch to ${checked}`)
		setIsUrl(checked)
	}

	return (
		<div>
			<Modal
				visible={foodModalVisible}
				title='Add Menu'
				// onOk={hideModal}
				onCancel={hideFoodModal}
				footer={[
					<Button key='back' onClick={hideFoodModal}>
						Cancel
					</Button>,
					<Button
						key='submit'
						type='primary'
						loading={loading}
						onClick={!isUrl ? handleSubmit : handleUpload}>
						Submit
					</Button>,
				]}>
				<Form layout='vertical'>
					<Form.Item
						label='Name *'
						validateStatus={errorMessage.name && 'error'}
						help={errorMessage.name && errorMessage.name}>
						<Input
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder='Input Name'
						/>
					</Form.Item>
					<Form.Item
						label='Category *'
						validateStatus={errorMessage.category && 'error'}
						help={errorMessage.category && errorMessage.category}>
						<Select
							placeholder='Select a option and change input text above'
							onChange={e => {
								setCategory(e)
							}}>
							<Option value='b2002274-0033-40db-b76d-82a17191b604'>
								Sushi
							</Option>
							<Option value='4b081e9b-392a-45da-8494-27576017aad4'>
								Ramen
							</Option>
							<Option value='49267808-a055-480f-a82b-aa1036899c42'>
								Drink
							</Option>
							<Option value='094548ca-33bf-4c34-8e3b-294929dd792e'>
								Other Food
							</Option>
						</Select>
					</Form.Item>
					<Form.Item
						label='Price *'
						validateStatus={errorMessage.price && 'error'}
						help={errorMessage.price && errorMessage.price}>
						<Input
							placeholder='Input Price'
							type='number'
							min={10000}
							step={1000}
							vale={price}
							defaultValue={price}
							onChange={e => setPrice(e.target.value)}
						/>
					</Form.Item>
					<Switch defaultChecked={isUrl} onChange={onChange} />
					<Form.Item
						label={!isUrl ? 'Image (Url) *' : 'Image (Upload) *'}
						validateStatus={errorMessage.image && 'error'}
						help={errorMessage.image && errorMessage.image}>
						{!isUrl ? (
							<Input
								placeholder='Url Image'
								value={imageUrl}
								onChange={e => setImageUrl(e.target.value)}
							/>
						) : (
							<>
								<Upload {...props}>
									<Button>
										<Icon type='upload' /> Select File
									</Button>
								</Upload>
							</>
						)}
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default FoodModal

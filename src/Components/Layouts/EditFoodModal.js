import React, { useState, useContext } from 'react'
import {
	Form,
	Input,
	Icon,
	Select,
	Button,
	Modal,
	Upload,
	Switch,
	message,
} from 'antd'
import FoodContext from '../../Context/Food/foodContext'

const { Option } = Select

const EditFoodModal = () => {
	const foodContext = useContext(FoodContext)
	const {
		editModalVisible,
		hideEditFoodModal,
		loading,
		editFood,
		errorMessage,
		editImage,
		editName,
		editPrice,
		editCategory,
		handleFormEditChange,
		setCategory,
		clearForm,
		idFood,
	} = foodContext

	const [fileList, setFileList] = useState([])
	const [isUrl, setIsUrl] = useState(false)

	const isBtnDisabled = !isUrl
		? editName.length > 3 && editImage && editCategory
		: editName.length > 3 && fileList.length > 0 && editCategory

	const handleUpload = async () => {
		console.log('IMAGE FILE')

		const formData = new FormData()
		if (fileList[0]) {
			formData.append('image', fileList[0])
		}
		formData.append('name', editName)
		formData.append('price', editPrice)
		formData.append('category', editCategory)

		for (let pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1])
		}

		editFood(formData, idFood).then(() => {
			setFileList([])
			clearForm()
		})
	}

	const handleSubmit = async () => {
		console.log('IMAGE URL')
		const formData = new FormData()
		formData.append('name', editName)
		formData.append('price', editPrice)
		formData.append('category', editCategory)
		formData.append('image', editImage)

		for (let pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1])
		}
		editFood(formData, idFood).then(() => {
			setFileList([])
			clearForm()
		})
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
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
			if (!isJpgOrPng) {
				message.error('You can only upload JPG/PNG file!')
			}
			const isLt2M = file.size / 1024 / 1024 < 2
			if (!isLt2M) {
				message.error('Image must smaller than 2MB!')
			}
			isJpgOrPng && isLt2M && setFileList(prev => [...prev, file])
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
				visible={editModalVisible}
				title='Edit Menu'
				// onOk={hideModal}
				onCancel={hideEditFoodModal}
				footer={[
					<Button key='back' onClick={hideEditFoodModal}>
						Cancel
					</Button>,
					<Button
						disabled={!isBtnDisabled}
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
							name='editName'
							value={editName}
							onChange={handleFormEditChange}
							placeholder='Input Name'
						/>
					</Form.Item>
					<Form.Item
						label='Category *'
						validateStatus={errorMessage.category && 'error'}
						help={errorMessage.category && errorMessage.category}>
						<Select
							placeholder='Select a option and change input text above'
							value={editCategory}
							defaultValue={editCategory}
							onChange={setCategory}>
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
							name='editPrice'
							placeholder='Input Price'
							type='number'
							min={10000}
							step={1000}
							value={editPrice}
							defaultValue={editPrice}
							onChange={handleFormEditChange}
						/>
					</Form.Item>
					<Switch defaultChecked={isUrl} onChange={onChange} />
					<Form.Item
						label={!isUrl ? 'Image (Url) *' : 'Image (Upload) *'}
						validateStatus={errorMessage.image && 'error'}
						help={errorMessage.image && errorMessage.image}>
						{!isUrl ? (
							<Input
								name='editImage'
								placeholder='Url Image'
								value={editImage}
								onChange={handleFormEditChange}
							/>
						) : (
							<>
								<Upload {...props}>
									<Button disabled={fileList.length > 0 ? true : false}>
										<Icon type='upload' /> Upload
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

export default EditFoodModal

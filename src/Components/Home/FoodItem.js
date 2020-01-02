import React, { useContext, useEffect } from 'react'
import {
	Icon,
	Row,
	Col,
	Card,
	Skeleton,
	message,
	Button,
	Popover,
	Popconfirm,
} from 'antd'
import ContentLoader from 'react-content-loader'
import styles from './style.module.css'
import FoodContext from '../../Context/Food/foodContext'
import convertToRupiah from '../../utils/rupiah'
import CheckoutContext from '../../Context/Checkout/checkOutContext'
import ReactImageFallback from 'react-image-fallback'
import EditFoodModal from '../Layouts/EditFoodModal'

const MyLoader = () => (
	<ContentLoader
		height={200}
		width={240}
		speed={2}
		primaryColor='#f3f3f3'
		secondaryColor='#ecebeb'>
		<rect x='0' y='0' width='240' height='200' />
	</ContentLoader>
)

const FoodItem = () => {
	const foodContext = useContext(FoodContext)
	const checkoutContext = useContext(CheckoutContext)

	const {
		foods,
		cart,
		addToCart,
		getFood,
		loading,
		deleteFood,
		showEditFoodModal,
		editModalForm,
		setIdFood,
		setCategory,
	} = foodContext
	const { checkOutId } = checkoutContext

	useEffect(() => {
		getFood()
		//eslint-disable-next-line
	}, [])

	return (
		<Row style={{ marginLeft: 10 }} gutter={16}>
			<EditFoodModal />
			{foods.map(d => {
				return (
					<React.Fragment key={d.id}>
						<Col span={8}>
							<Card
								size='small'
								hoverable
								style={{ width: 240, marginBottom: '20px' }}
								cover={
									loading ? (
										<MyLoader />
									) : (
										<div className={styles.bg_image}>
											<ReactImageFallback
												initialImage='https://media1.tenor.com/images/556e9ff845b7dd0c62dcdbbb00babb4b/tenor.gif'
												onClick={() =>
													!localStorage.getItem('@usertoken')
														? message.error('You should login ')
														: !cart.filter(c => c.id === d.id).length > 0 &&
														  addToCart({
																id_transaction: checkOutId,
																id: d.id,
																name: d.name,
																image: d.image,
																price: d.price,
																quantity: 1,
														  })
												}
												fallbackImage='https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg'
												alt='example'
												src={d.image}
												width='100%'
												height={200}
												style={{
													objectFit: 'cover',
													opacity:
														cart.filter(c => c.id === d.id).length > 0
															? 0.5
															: 1,
												}}
											/>

											{cart.filter(c => c.id === d.id).length > 0 && (
												<div className={styles.image_overlay}>
													<Icon
														type='check-circle'
														twoToneColor='#eb2f96'
														style={{ fontSize: 40 }}
													/>
												</div>
											)}
										</div>
									)
								}>
								<Skeleton loading={loading} paragraph={{ rows: 1 }} active>
									<h4>{d.name}</h4>
									<h3>{convertToRupiah(d.price)}</h3>
									{localStorage.getItem('@usertoken') && (
										<Popover
											placement='rightBottom'
											trigger='click'
											content={
												<div>
													<Button
														type='primary'
														size='small'
														onClick={() => {
															showEditFoodModal()
														}}>
														Edit
													</Button>

													<Popconfirm
														onConfirm={() => {
															deleteFood(d.id)
															message.success('Succes Delete')
														}}
														title='Are you sure want to delete?'
														okText='Yes'
														cancelText='No'>
														<Button
															type='danger'
															size='small'
															style={{ marginLeft: 5 }}>
															Delete
														</Button>
													</Popconfirm>
												</div>
											}>
											<Button
												onClick={() => {
													editModalForm(d.name, d.image, d.price)
													setCategory(d.Category.id)
													setIdFood(d.id)
												}}
												type='dashed'
												size='small'
												style={{ float: 'right' }}>
												Action
											</Button>
										</Popover>
									)}
								</Skeleton>
							</Card>
						</Col>
					</React.Fragment>
				)
			})}
		</Row>
	)
}

export default FoodItem

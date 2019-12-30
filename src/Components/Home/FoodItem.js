import React, { useContext, useEffect } from 'react'
import { Icon, Row, Col, Card, Skeleton } from 'antd'
import ContentLoader from 'react-content-loader'
import styles from './style.module.css'
import FoodContext from '../../Context/Food/foodContext'
import convertToRupiah from '../../utils/rupiah'

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
	const { foods, cart, addToCart, getFood, loading } = foodContext

	useEffect(() => {
		getFood()
		//eslint-disable-next-line
	}, [])

	return (
		<Row style={{ marginLeft: 10 }} gutter={16}>
			{foods.map(d => (
				<Col span={8} key={d.id}>
					<Card
						size='small'
						hoverable
						style={{ width: 240, marginBottom: '20px' }}
						cover={
							loading ? (
								<MyLoader />
							) : (
								<div className={styles.bg_image}>
									<img
										onClick={() =>
											!cart.filter(c => c.id === d.id).length > 0 &&
											addToCart({ ...d, quantity: 1 })
										}
										alt='example'
										src={d.image}
										width='100%'
										height={200}
										style={{
											objectFit: 'cover',
											opacity:
												cart.filter(c => c.id === d.id).length > 0 ? 0.5 : 1,
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
						</Skeleton>
					</Card>
				</Col>
			))}
		</Row>
	)
}

export default FoodItem

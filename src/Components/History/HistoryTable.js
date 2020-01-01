import React, { useContext, useEffect } from 'react'
import { Table, Tag, Layout } from 'antd'
import HistoryContext from '../../Context/History/historyContext'
import convertToRupiah from '../../utils/rupiah'

const HistoryTable = () => {
	const historyContext = useContext(HistoryContext)

	const { historyTable, getHistoryTable } = historyContext

	useEffect(() => {
		getHistoryTable()
		//eslint-disable-next-line
	}, [])

	const columns = [
		{
			title: 'ID',
			dataIndex: 'checkout_id',
			key: 'checkout_id',
			width: 250,
		},
		{
			title: 'Total (VAT)',
			dataIndex: 'total',
			key: 'total',
			render: text => <span>{convertToRupiah(text)}</span>,
			width: 150,
		},

		{
			title: 'Foods',
			key: 'foods',
			dataIndex: 'foods',
			render: (foods, data) => {
				// const ar
				return (
					<span>
						{foods.map((food, index) => {
							return (
								<Tag color='#c41d7f' key={index} style={{ marginBottom: 10 }}>
									{food + ' ' + data.quantity[index] + 'x'}
								</Tag>
							)
						})}
					</span>
				)
			},
		},
		{
			title: 'Date',
			key: 'createdAt',
			dataIndex: 'createdAt',
			width: 150,
		},
	]

	const data = historyTable.map((his, index) => {
		return {
			key: index,
			...his,
		}
	})

	return (
		<Layout style={{ padding: 50 }}>
			<Table
				columns={columns}
				dataSource={data}
				bordered
				pagination={{ defaultPageSize: 5 }}
				title={() => 'History'}
			/>
		</Layout>
	)
}

export default HistoryTable

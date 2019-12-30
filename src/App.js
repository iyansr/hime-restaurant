import React from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import FoodState from './Context/Food/FoodState'
import CheckOutState from './Context/Checkout/CheckOutState'

import Home from './Components/Pages/Home'
import SideNav from './Components/Layouts/SideNav'
import History from './Components/Pages/History'

const App = () => {
	return (
		<FoodState>
			<CheckOutState>
				<Router>
					<Layout style={{ minHeight: '100vh' }}>
						<SideNav />
						<Switch>
							<Route exact path='/' component={Home} />
							<Route path='/history' component={History} />
						</Switch>
					</Layout>
				</Router>
			</CheckOutState>
		</FoodState>
	)
}

export default App

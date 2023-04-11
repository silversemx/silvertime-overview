import React from 'react';

// Packages
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import Authentication from './components/main/Authentication';
import PrivateRoute from './router/PrivateRoute';
import Services from './components/services/Services';
import Maintenance from './components/maintenance/Maintenance';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Actions
import { user_token_check } from './redux/actions/authActions';
user_token_check (store);

const App = () => {
	return (
		<Provider store= { store }>
			<Router>
				<div className='App'>
					<Header/>
					<Routes>
						<Route path='/auth' element={ <Authentication /> } />

						<Route element={ <PrivateRoute />}>
							<Route path='/' element={ <Navigate to='/services' /> } />
							
							<Route path='/services' element={ <Services /> } />
							
							<Route path='/maintenance' element={ <Maintenance /> } />
						</Route>
					</Routes>
					<Footer/>
				</div>
			</Router>
		</Provider>
	);
}

export default App;

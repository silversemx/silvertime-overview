import React from 'react';

// Packages
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Header from './components/main/Header';
import Services from './components/services/Services';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
	return (
		<Provider store= { store }>
			<Router>
				<div className='App'>
					<Header/>
					<Routes>
						<Route path='/' element={ <Navigate to='/services' /> } />
						<Route path='/services' element={ <Services /> } />
					</Routes>
				</div>
			</Router>
		</Provider>
	);
}

export default App;

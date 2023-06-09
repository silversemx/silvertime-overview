import React from 'react';

// Packages
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import Authentication from './components/main/Authentication';
import PrivateRoute from './router/PrivateRoute';
import Services from './components/services/Services';
import StatusInfo from './components/services/status/StatusInfo';
import { Maintenance } from './components/maintenance/Maintenance';
import MaintenanceInfo from './components/maintenance/MaintenanceInfo';
import InterruptionInfo from './components/interruptions/InterruptionInfo';
import Reports from './components/reports/Reports';

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

							<Route path='/service/:service_id/status/:date' element={ <StatusInfo /> } />
							
							<Route path='/maintenance' element={ <Maintenance /> } />
							<Route path='/maintenance/:maintenance_id/info' element={ <MaintenanceInfo /> } />

							<Route path='/interruption/:interruption_id/info' element={ <InterruptionInfo /> } />
							<Route path='/reports' element={ <Reports /> } />
						</Route>
					</Routes>
					<Footer/>
				</div>
			</Router>
		</Provider>
	);
}

export default App;

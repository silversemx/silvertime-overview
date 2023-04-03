import React from 'react';

// Packages
import { BrowserRouter as Router } from 'react-router-dom';

// Components
import Header from './components/main/Header';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
	return (
		<Provider store= { store }>
			<Router>
				<div className='App'>
					<Header/>
				</div>
			</Router>
		</Provider>
	);
}

export default App;

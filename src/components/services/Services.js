import React from 'react';

// React Bootstrap
import { Container } from 'react-bootstrap';

// Components
import ServiceCard from './ServiceCard';

const Services = () => {
	return (
		<Container className='my-3'>
			<h2>Services</h2>
			<p className='mb-4'>This page is used to display the status of AstraZeneca's services.</p>
			<ServiceCard
				name='Servicio PC'
				type='pc'
				status='operational'
			/>
			<ServiceCard
				name='Servicio Movil'
				type='phone'
				status='warning'
			/>
			<ServiceCard
				name='Servicio Movil'
				type='phone'
				status='down'
			/>
		</Container>
	);
}

export default Services;

import React from 'react';

// React Bootstrap
import { Container } from 'react-bootstrap';

// Components
import ServiceCard from './ServiceCard';

// Utils
import servicesJSON from '../../utils/services.json';

const Services = () => {
	return (
		<Container className='my-3'>
			<h2>Services</h2>
			<p className='mb-4'>This page is used to display the status of AstraZeneca's services.</p>
			{servicesJSON.services.map((service, idx) => (
				<ServiceCard
					key={idx}
					name={service?.name}
					description={service?.description}
					type={service?.type}
					status={service?.status}
					statusInfo={service?.statusInfo}
				/>
			))}
		</Container>
	);
}

export default Services;

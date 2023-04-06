import React, { useState } from 'react';

// React Bootstrap
import { Container } from 'react-bootstrap';

// Packages
import dayjs from 'dayjs';

// Components
import ServiceCard from './ServiceCard';
import StatusModal from './status/StatusModal';
import Range from './Range';

// Utils
import servicesJSON from '../../utils/services.json';

const Services = () => {
	const [showModal, setShowModal] = useState(false);
	const [dateFormat] = useState('DD/MM/YYYY');
	const [selectedRange, setSelectedRange] = useState([ null, dayjs(dayjs(), dateFormat) ]);

	return (
		<Container className='my-3'>
			<StatusModal
				show={showModal}
				onHide={() => setShowModal(false)}
			/>

			<h2>Services</h2>
			<p className='mb-4'>This page is used to display the status of AstraZeneca's services.</p>
			<Range
				dateFormat={dateFormat}
				selectedRange={selectedRange}
				setSelectedRange={setSelectedRange}
			/>
			{servicesJSON.services.map((service, idx) => (
				<ServiceCard
					key={idx}
					name={service?.name}
					description={service?.description}
					type={service?.type}
					status={service?.status}
					statusInfo={service?.statusInfo}
					setShowModal={() => setShowModal(true)}
				/>
			))}
		</Container>
	);
}

export default Services;

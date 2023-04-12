import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// React Bootstrap
import { Container } from 'react-bootstrap';

// Packages
import dayjs from 'dayjs';

// Components
import ServiceCard from './ServiceCard';
import StatusModal from './status/StatusModal';
import Range from './Range';

// Actions
import { get_all_services } from '../../redux/actions/servicesActions';

const Services = () => {
	const dispatch = useDispatch();

	const { all_services } = useSelector(state => state.services);

	const [showModal, setShowModal] = useState(false);
	const [dateFormat] = useState('DD/MM/YYYY');
	const [selectedRange, setSelectedRange] = useState([ dayjs().add(-90, 'd'), dayjs() ]);

	useEffect(() => {
		dispatch(get_all_services());
	}, []);

	const allSystemsStyles = {
		color: 'white',
		// backgroundColor: statusInfo?.status === 'operational' ? '#06c281' : statusInfo?.status === 'warning' ? '#f7d54a' : '#ef4b4c', // maintenance #479be5
		backgroundColor: '#06c281',
		borderRadius: '10px',
		padding: '1rem',
		marginBottom: '2rem',
		fontSize: '20px'
	}

	return (
		<Container className='custom-container'>
			<StatusModal
				show={showModal}
				onHide={() => setShowModal(false)}
			/>

			<h2>Services</h2>
			<p className='mb-4'>This page is used to display the status of AstraZeneca's services.</p>

			<p style={ allSystemsStyles }>All Services Operational</p>
			<hr/>

			<div style={{ textAlign: 'center', marginBlock: '2rem' }}>
				<p>Select a date range to view the status of services.</p>
				<Range
					dateFormat={dateFormat}
					selectedRange={selectedRange}
					setSelectedRange={setSelectedRange}
				/>
			</div>

			{all_services.services.map((service, idx) => (
				<div className='d-flex justify-content-center' key={idx}>
					<ServiceCard
						serviceInfo={service}
						selectedRange={selectedRange}
						setShowModal={() => setShowModal(true)}
					/>
				</div>
			))}
		</Container>
	);
}

export default Services;

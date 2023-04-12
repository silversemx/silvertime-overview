import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// React Bootstrap
import { Card, Container } from 'react-bootstrap';

// Packages
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

// Actions
import { get_all_maintenances } from '../../redux/actions/maintenancesActions';

const Post = (props) => {
	const { maintenance } = props;

	const navigateTo = useNavigate();

	return (
		<Card className='mb-5'>
			<Card.Body>
				<h4
					style={{ cursor: 'pointer' }}
					onClick={() => navigateTo(`/maintenance/${id}/info`)}
				>
					{maintenance?.title}
				</h4>
				{maintenance?.service && 
					<p><b>Service:</b> {maintenance?.service?.name}</p>
				}
				<p className='schedule-text text-muted m-0'>
					From: {maintenance?.start !== null ? new Date(maintenance?.start?.$date).toString('es-MX', { timeZone: 'CST' }) : 'Undefined'}
				</p>
				<p className='schedule-text text-muted'>
					To: {maintenance?.end !== null ? new Date(maintenance?.end?.$date).toString('es-MX', { timeZone: 'CST' }) : 'Undefined'}
				</p>
				<hr/>
				<ReactQuill
					theme='bubble'
					readOnly={true}
					value={JSON.parse(maintenance?.text)}
				/>
				<p className='schedule-text text-muted text-end'>Posted on: {new Date(maintenance?.date?.$date).toString('es-MX', { timeZone: 'CST' })}</p>
			</Card.Body>
		</Card>
	);
}

Post.propTypes = {
	maintenance: PropTypes.object.isRequired
}

const Maintenance = () => {
	const dispatch = useDispatch();

	const { all_maintenances } = useSelector(state => state.maintenances);

	useEffect(() => {
		dispatch(get_all_maintenances());
	}, []);

	return (
		<Container className='custom-container'>
			<h2>Scheduled Maintenance</h2>
			<p className='mb-4'>This page is used to list the scheduled maintenance to be performed on the services.</p>
			{all_maintenances.maintenances.length > 0 
				?	all_maintenances.maintenances.map((maintenance, idx) => (
						<Post
							key={idx}
							maintenance={maintenance}
						/>
					))
				: <p className='text-center'>No Scheduled Maintenance</p>
			}

			<h2>Past Maintenance</h2>
			<p className='mb-4'>This page is used to list the scheduled maintenance to be performed on the services.</p>
			{all_maintenances.past.length > 0 
				?	all_maintenances.past.map((maintenance, idx) => (
						<Post
							key={idx}
							maintenance={maintenance}
						/>
					))
				: <p className='text-center'>No Past Maintenance</p>
			}
		</Container>
	);
}

export default Maintenance;

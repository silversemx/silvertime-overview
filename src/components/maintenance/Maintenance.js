import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// React Bootstrap
import { Card, Col, Container, Row } from 'react-bootstrap';

// Packages
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

// Components
import StatusBadge from '../utils/StatusBadge';

// Actions
import { get_all_maintenances } from '../../redux/actions/maintenancesActions';
import { get_user_info } from '../../redux/actions/authActions';

// Utils
import { getMaintenanceStatusDesc } from '../../utils/getStatusDesc';

export const Post = (props) => {
	const { maintenance } = props;

	const dispatch = useDispatch();

	const navigateTo = useNavigate();

	const { user_info } = useSelector(state => state.auth);

	useEffect(() => {
		if (maintenance?.user?.$oid) {
			dispatch(get_user_info(maintenance?.user?.$oid));
		}
	}, [maintenance]);

	return (
		<Card className='mb-5'>
			<Card.Body>
				<Row>
					<Col lg={11} sm={12}>
						<h4
							style={{ cursor: 'pointer' }}
							onClick={() => navigateTo(`/maintenance/${maintenance?._id?.$oid}/info`)}
						>
							{maintenance?.title}
						</h4>
					</Col>
					<Col lg={1} sm={12}>
						<StatusBadge status={getMaintenanceStatusDesc(maintenance?.status)} />
					</Col>
				</Row>
				{maintenance?.service?.name && 
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
					value={maintenance?.text && JSON.parse(maintenance?.text)}
				/>
				<p className='schedule-text text-muted text-end m-0'>Posted on: {new Date(maintenance?.date?.$date).toString('es-MX', { timeZone: 'CST' })}</p>
				<p className='schedule-text text-muted text-end'>Posted by: {user_info?.first_name + ' ' + user_info?.last_name}</p>
			</Card.Body>
		</Card>
	);
}

Post.propTypes = {
	maintenance: PropTypes.object.isRequired
}

export const Maintenance = () => {
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

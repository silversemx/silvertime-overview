import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// React Bootstrap
import { Card, Col, Row } from 'react-bootstrap';

// Packages
import dayjs from 'dayjs';
import Axios from 'axios';
import PropTypes from 'prop-types';

// Components
import StatusBar from './status/StatusBar';

// Actions
import { save_service_state } from '../../redux/actions/stateActions';

// Utils
import create_query_params from '../../utils/create_query_params';

const Status = (props) => {
	const { status } = props;

	const dotStyles = {
		marginRight: '10px',
		fontSize: '10px',
		color: status === 'operational' ? '#06c281' : status === 'warning' ? '#f7d54a' : '#ef4b4c',
	}

	return (
		<div className='border rounded-pill text-center'>
			<div className='d-flex align-items-center justify-content-center'>
				<i className='bi bi-circle-fill' style={ dotStyles }></i>
				<p className='m-0'>
					{status === 'operational' ? 'Operational' : status === 'warning' ? 'Warning' : 'Down' }
				</p>
			</div>
		</div>
	);
}

Status.propTypes = {}

const ServiceCard = (props) => {
	const { serviceInfo, selectedRange, setShowModal } = props;

	const dispatch = useDispatch();

	const [serviceState, setServiceState] = useState({ data: [] });

	useEffect(() => {
		requestServiceState();
	}, [serviceInfo?._id?.$oid, selectedRange]);

	const requestServiceState = () => {
		const overview_query = {
			service: serviceInfo?._id?.$oid,
			start: dayjs(selectedRange[0]).valueOf(),
			end: dayjs(selectedRange[1]).valueOf()
		}

		let url = process.env.REACT_APP_SERVER_URL + '/api/state/overview?';
		let query = create_query_params(overview_query);
		url += query;

		Axios.get(url)
		.then((res) => {
			setServiceState(res.data)
		}).catch((err) => {
			console.log('Error', err)
		})
	}

	return (
		<Card className='mb-4'>
			<Card.Body>
				<Row>
					<Col lg={10}>
						<h5>
							{serviceInfo?.name}
						</h5>
					</Col>
					{/* <Col lg={2}>
						<Status status={status} />
					</Col> */}
				</Row>
				<Card.Subtitle className='mb-2 text-muted'>{serviceInfo?.description}</Card.Subtitle>
				<div className='d-flex align-items-end'>
					{serviceState?.data.map((state, idx) => (
						<div 
							key={idx}
							onClick={() => {
								dispatch(save_service_state(state));
								setShowModal();
							}}
						>
							<StatusBar serviceState={state} />
						</div>
					))}
				</div>
			</Card.Body>
		</Card>
	);
}

ServiceCard.propTypes = {
	serviceInfo: PropTypes.object.isRequired,
	selectedRange: PropTypes.array.isRequired,
	setShowModal: PropTypes.func.isRequired
}

export default ServiceCard;

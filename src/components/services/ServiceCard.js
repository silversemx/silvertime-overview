import React from 'react';

// React Bootstrap
import { Card, Col, Row } from 'react-bootstrap';

// Packages
import PropTypes from 'prop-types';

// Components
import StatusBar from './status/StatusBar';

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
	const { name, description, type, status, statusInfo } = props;

	return (
		<Card className='mb-4'>
			<Card.Body>
				<Row>
					<Col lg={10}>
						<h5>
							{name} <i className={`bi bi-${type}`}></i>
						</h5>
					</Col>
					<Col lg={2}>
						<Status status={status} />
					</Col>
				</Row>
				<Card.Subtitle className='mb-2 text-muted'>{description}</Card.Subtitle>
				<div className='d-flex align-items-end'>
					{statusInfo.map((info, idx) => (
						<StatusBar
							key={idx}
							statusInfo={info}
						/>
					))}
				</div>
			</Card.Body>
		</Card>
	);
}

ServiceCard.propTypes = {}

export default ServiceCard;

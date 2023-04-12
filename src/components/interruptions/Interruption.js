import React from 'react';
import { useNavigate } from 'react-router-dom';

// React Bootstrap
import { Card, Col, Row } from 'react-bootstrap';

// Packages
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

// Components
import StatusBadge from '../utils/StatusBadge';

// Actions
import { geInterruptionStatusDesc } from '../../utils/getStatusDesc';

const Interruption = (props) => {
	const { interruption } = props;

	const navigateTo = useNavigate();

	return (
		<Card className='mb-5'>
			<Card.Body>
				<Row>
					<Col lg={11} sm={12}>
						<h4
							style={{ cursor: 'pointer' }}
							onClick={() => navigateTo(`/interruption/${interruption?._id?.$oid}/info`)}
						>
							{interruption?.title}
						</h4>
					</Col>
					<Col lg={1} sm={12}>
						<StatusBadge status={geInterruptionStatusDesc(interruption?.status)} />
					</Col>
				</Row>
				{interruption?.service?.name && 
					<p><b>Service:</b> {interruption?.service?.name}</p>
				}
				<p className='schedule-text text-muted m-0'>
					From: {interruption?.start !== null ? new Date(interruption?.start?.$date).toString('es-MX', { timeZone: 'CST' }) : 'Undefined'}
				</p>
				<p className='schedule-text text-muted'>
					To: {interruption?.end !== null ? new Date(interruption?.end?.$date).toString('es-MX', { timeZone: 'CST' }) : 'Undefined'}
				</p>
				<hr/>
				{interruption?.description
					?	<ReactQuill
							theme='bubble'
							readOnly={true}
							value={interruption?.description && JSON.parse(interruption?.description)}
						/>
					:	<p>No description.</p>
				}
				<p className='schedule-text text-muted text-end'>Posted on: {new Date(interruption?.date?.$date).toString('es-MX', { timeZone: 'CST' })}</p>
				{/* TODO: hacer requets a user info para obtener posted by */}
			</Card.Body>
		</Card>
	);
}

Interruption.propTypes = {
	interruption: PropTypes.object.isRequired
}

export default Interruption;
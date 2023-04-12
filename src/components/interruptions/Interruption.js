import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// React Bootstrap
import { Card, Col, Row } from 'react-bootstrap';

// Packages
import dayjs from 'dayjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

// Components
import StatusBadge from '../utils/StatusBadge';

// Actions
import { get_user_info } from '../../redux/actions/authActions';
import { geInterruptionStatusDesc } from '../../utils/getStatusDesc';

const Interruption = (props) => {
	const { interruption } = props;

	const dispatch = useDispatch();

	const navigateTo = useNavigate();

	const { user_info } = useSelector(state => state.auth);

	useEffect(() => {
		if (interruption?.user?.$oid) {
			dispatch(get_user_info(interruption?.user?.$oid));
		}
	}, [interruption]);

	const getDuration = (start, end) => {
		let diff = dayjs(end).diff(dayjs(start), 'second');
		let unit = ' secs.';

		if (diff > 60) {
			diff = dayjs(end).diff(dayjs(start), 'minute');
			unit = ' mins.';

			if (diff > 60) {
				diff = dayjs(end).diff(dayjs(start), 'hours');
				unit = ' hrs.';

				if (diff > 60) {
					diff = dayjs(end).diff(dayjs(start), 'day');
					unit = ' days.';
				}
			}
		}

		let duration = diff + unit;

		return duration;
	}

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
				<Row>
					<Col>
						<p className='schedule-text text-muted m-0'>
							From: {interruption?.start !== null ? new Date(interruption?.start?.$date).toString('es-MX', { timeZone: 'CST' }) : 'Undefined'}
						</p>
						<p className='schedule-text text-muted'>
							To: {interruption?.end !== null ? new Date(interruption?.end?.$date).toString('es-MX', { timeZone: 'CST' }) : 'Undefined'}
						</p>
					</Col>
					<Col>
						<p className='schedule-text text-muted m-0'>
							Duration: &nbsp;
							{interruption?.start !== null && interruption?.end !== null
								?	getDuration(interruption?.start?.$date, interruption?.end?.$date)
								:	'Undefined'
							}
						</p>
					</Col>
				</Row>
				<hr/>
				{interruption?.description
					?	<ReactQuill
							theme='bubble'
							readOnly={true}
							value={interruption?.description && JSON.parse(interruption?.description)}
						/>
					:	<p>No description.</p>
				}
				<p className='schedule-text text-muted text-end m-0'>Posted on: {new Date(interruption?.date?.$date).toString('es-MX', { timeZone: 'CST' })}</p>
				<p className='schedule-text text-muted text-end'>Posted by: {user_info?.first_name + ' ' + user_info?.last_name}</p>
			</Card.Body>
		</Card>
	);
}

Interruption.propTypes = {
	interruption: PropTypes.object.isRequired
}

export default Interruption;
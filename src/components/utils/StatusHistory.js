import React from 'react';

// React Bootstrap
import { Col, Container } from 'react-bootstrap';

// Components
import StatusBadge from './StatusBadge';

// Packages
import PropTypes from 'prop-types';

// Utils
import { getMaintenanceStatusDesc } from '../../utils/getStatusDesc';

const StatusHistory = (props) => {
	const { historyData } = props;

	return (
		<Container>
			<p className='schedule-text text-muted'>
				{new Date(historyData?.date?.$date).toString('es-MX', { timeZone: 'CST' })}
			</p>
			<Container className='d-flex align-items-center justify-content-center fs-4'>
				<Col lg={2}>
					<StatusBadge status={getMaintenanceStatusDesc(historyData?.prev_status)} />
				</Col>
				<Col lg={2}>
					<i className='bi bi-chevron-double-right mx-5'></i>
				</Col>
				<Col lg={2}>
					<StatusBadge status={getMaintenanceStatusDesc(historyData?.current_status)} />
				</Col>
			</Container>
		</Container>
	)
}

StatusHistory.propTypes = {
	historyData: PropTypes.object.isRequired
}

export default StatusHistory;

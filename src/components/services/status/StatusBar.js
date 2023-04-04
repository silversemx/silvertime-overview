import React from 'react';

// React Bootstrap
import { OverlayTrigger, Popover } from 'react-bootstrap';

// Packages
import PropTypes from 'prop-types';

const StatusBar = (props) => {
	const { statusInfo } = props;

	const placement = 'bottom';

	const statusBarStyles = {
		height: statusInfo?.status === 'operational' ? '35px' : statusInfo?.status === 'warning' ? '28px' : '18px',
		width: '6px',
		backgroundColor: statusInfo?.status === 'operational' ? '#06c281' : statusInfo?.status === 'warning' ? '#f7d54a' : '#ef4b4c',
		borderRadius: '5px',
		marginRight: '5px'
	}

	return (
		<OverlayTrigger
			key={placement}
			placement={placement}
			overlay={
				<Popover id='popover-basic'>
					<Popover.Body>
						<p>{statusInfo?.date}</p>
						<p className='mb-0'>{statusInfo?.description}</p>
					</Popover.Body>
				</Popover>
			}
		>
			<div style={ statusBarStyles }></div>
		</OverlayTrigger>
	);
}

StatusBar.propTypes = {}

export default StatusBar;

import React from 'react';

// React Bootstrap
import { OverlayTrigger, Popover } from 'react-bootstrap';

// Packages
import PropTypes from 'prop-types';

const StatusBar = (props) => {
	const { serviceState } = props;

	const statusBarStyles = {
		height: '35px',
		width: '6px',
		backgroundColor: serviceState?.instances.length === 0 && serviceState?.interruptions.length === 0 && serviceState?.maintenance.length === 0 
											?	'#06c281' // green
											:	serviceState?.instances.length !== 0 && serviceState?.interruptions.length === 0 && serviceState?.maintenance.length === 0 
												?	'#f7d54a' // ambar
												:	serviceState?.instances.length === 0 && serviceState?.interruptions.length === 0 && serviceState?.maintenance.length !== 0 
													?	'#479be5' // blue
													:	serviceState?.interruptions.length > 0 ? '#ef4b4c' : 'none', // red
		borderRadius: '5px',
		marginRight: '5px',
		cursor: 'pointer'
	}

	return (
		<OverlayTrigger
			placement='bottom'
			overlay={
				<Popover id='popover-basic'>
					<Popover.Body>
						<p className='schedule-text text-muted'>{new Intl.DateTimeFormat('en-US').format(serviceState?.date?.$date)}</p>
						{serviceState?.instances.length === 0 && serviceState?.interruptions.length === 0 && serviceState?.maintenance.length === 0 
							?	<p>Service available.</p> 
							:	serviceState?.instances.length !== 0 && serviceState?.interruptions.length === 0 && serviceState?.maintenance.length === 0 
								?	<p>Service disruption.</p>
								:	serviceState?.instances.length === 0 && serviceState?.interruptions.length === 0 && serviceState?.maintenance.length !== 0 
									?	<p>Scheduled Maintenance.</p>
									:	serviceState?.interruptions.length > 0 ? <p>Service outage.</p> : null
						}
					</Popover.Body>
				</Popover>
			}
		>
			<div style={ statusBarStyles }></div>
		</OverlayTrigger>
	);
}

StatusBar.propTypes = {
	serviceState: PropTypes.object.isRequired
}

export default StatusBar;

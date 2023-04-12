import React from 'react';

// Packages
import PropTypes from 'prop-types';

// Utils
import setStatusBadgeColor from '../../utils/setStatusBadgeColor';

const StatusBadge = (props) => {
	const { status } = props;

	const { bgColor, textColor } = setStatusBadgeColor(status);

	return (
		<span 
			className='badge rounded-pill' 
			style={{
				backgroundColor: bgColor,
				color: textColor
			}}
		>
			{status}
		</span>
	);
}

StatusBadge.propTypes = {
	status: PropTypes.string.isRequired
}

export default StatusBadge;

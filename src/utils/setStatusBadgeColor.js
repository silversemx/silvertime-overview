const setStatusBadgeColor = (status) => {
	let bgColor = 'black', textColor = 'white';

	switch (status) {
		case 'None':
			bgColor = '#adb5bd'; textColor = 'white';
		break;
		case 'Created':
		case 'Detected':
			bgColor = 'orange'; textColor = 'white';
		break;
		case 'Available':
			bgColor = '#64dd17'; textColor = 'white';
		break;
		case 'Down':
			bgColor = 'black'; textColor = 'white';
		break;
		case 'Maintenance':
			bgColor = '#546e7a'; textColor = 'white';
		break;
		case 'Monitoring':
			bgColor = 'purple'; textColor = 'white';
		break;
		case 'Deprecated':
			bgColor = '#424242'; textColor = 'white';
		break;
		case 'Removed':
			bgColor = '#ad1457'; textColor = 'white';
		break;
		case 'Working':
			bgColor = '#8e24aa'; textColor = 'white';
		break;
		case 'Stopped':
			bgColor = '#dc3545'; textColor = 'white';
		break;
		case 'Ended':
			bgColor = '#283593'; textColor = 'white';
		break;
		case 'Disabled':
			bgColor = '#0dcaf0'; textColor = 'black';
		break;
		case 'Ready':
			bgColor = '#aeea00'; textColor = 'black';
		break;
		case 'Waiting':
			bgColor = '#fbc02d'; textColor = 'black';
		break;
		case 'Progress':
			bgColor = 'blue'; textColor = 'white';
		break;
		case 'Done':
		case 'Solved':
			bgColor = 'green'; textColor = 'white';
		break;
		case 'Incomplete':
			bgColor = '#fb8c00'; textColor = 'white';
		break;
		case 'Failed':
			bgColor = '#e53935'; textColor = 'white';
		break;
		case 'Error':
			bgColor = '#b71c1c'; textColor = 'white';
		break;

		default:
			bgColor = 'black'; textColor = 'white';
		break;
	}

	return { bgColor, textColor }
}

export default setStatusBadgeColor;

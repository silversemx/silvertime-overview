import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// React Bootstrap
import { Container } from 'react-bootstrap';

// Components
import { Post } from './Maintenance';

// Actions
import { get_maintenance_info } from '../../redux/actions/maintenancesActions';

const MaintenanceInfo = () => {
	const { maintenance_id } = useParams();

	const dispatch = useDispatch();

	const { maintenance_info } = useSelector(state => state.maintenances);

	useEffect(() => {
		dispatch(get_maintenance_info(maintenance_id));
	}, [maintenance_id]);

	return (
		<Container className='custom-container'>
			<h2 className='text-center mb-3'>Maintenance Information</h2>
			<Post maintenance={maintenance_info} />
		</Container>
	)
}

export default MaintenanceInfo;

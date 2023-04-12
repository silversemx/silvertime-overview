import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// React Bootstrap
import { Card, Container } from 'react-bootstrap';

// Components
import { Post } from './Maintenance';
import StatusHistory from '../utils/StatusHistory';

// Actions
import { get_maintenance_info, get_maintenance_status_history } from '../../redux/actions/maintenancesActions';

const MaintenanceInfo = () => {
	const { maintenance_id } = useParams();

	const dispatch = useDispatch();

	const { maintenance_info, maintenance_status_history } = useSelector(state => state.maintenances);

	useEffect(() => {
		dispatch(get_maintenance_info(maintenance_id));
		dispatch(get_maintenance_status_history(maintenance_id));
	}, [maintenance_id]);

	return (
		<Container className='custom-container'>
			<h2 className='text-center mb-3'>Maintenance Information</h2>
			<Post maintenance={maintenance_info} />

			<h4 className='text-center mb-3'>Maintenance Status History</h4>
			<Card className='text-center p-2'>
				<Card.Body>
					{maintenance_status_history.map((history, idx) => (
						<div key={idx}>
							<StatusHistory
								historyData={history}
							/>
							{idx !== maintenance_status_history?.length - 1 && <hr />}
						</div>
					))}
				</Card.Body>
			</Card>
		</Container>
	)
}

export default MaintenanceInfo;

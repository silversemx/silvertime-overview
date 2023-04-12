import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// React Bootstrap
import { Card, Container } from 'react-bootstrap';

// Components
import Interruption from '../../interruptions/Interruption';
import { Post } from '../../maintenance/Maintenance';

// Packages
import Axios from 'axios';

// Utils
import create_query_params from '../../../utils/create_query_params';

const StatusInfo = () => {
	const { service_id, date } = useParams();

	const [serviceInfo, setServiceInfo] = useState({});
	const [serviceState, setServiceState] = useState({});

	useEffect(() => {
		requestServiceState();
	}, []);

	const requestServiceState = () => {
		const overview_query = {
			service: service_id,
			start: date,
			end: date
		}

		let url = process.env.REACT_APP_SERVER_URL + '/api/state/overview?';
		let query = create_query_params(overview_query);
		url += query;

		Axios.get(url)
		.then((res) => {
			setServiceInfo(res.data);
			setServiceState(res.data?.data[0])
		}).catch((err) => {
			console.log('Error', err)
		})
	}

	return (
		<Container className='custom-container'>
			<h2>Disruption Information</h2>
			<div>
				<p className='text-end'><strong>Date: </strong>{new Intl.DateTimeFormat('en-US').format(serviceState?.date?.$date)}</p>
				<div className='mb-5'>
					<h5>Interruptions</h5>
					<hr/>
					{serviceState?.interruptions?.length > 0
						?	<Fragment>
								{serviceState?.interruptions.map((int, idx) => (
									<Interruption
										key={idx}
										interruption={int}
									/>
								))}
							</Fragment>
						: <p>No interruptions this day.</p>
					}
				</div>

				<div className='mb-5'>
					<h5>Instances</h5>
					<hr/>
					{serviceState?.instances?.length > 0
						?	<Fragment>
								{serviceState?.instances.map((instance, idx) => (
									<Card key={idx} className='mb-3'>
										<Card.Body>
											<p>{instance?.title}</p>
										</Card.Body>
									</Card>
								))}
							</Fragment>
						: <p>No instances interruptions this day.</p>
					}
				</div>

				<div className='mb-5'>
					<h5>Maintenance</h5>
					<hr/>
					{serviceState?.maintenance?.length > 0
						?	<Fragment>
								{serviceState?.maintenance.map((m, idx) => (
									<Post
										key={idx}
										maintenance={m}
									/>
								))}
							</Fragment>
						:	<p>No maintenance this day.</p>
					}
				</div>
			</div>
		</Container>
	);
}

export default StatusInfo;

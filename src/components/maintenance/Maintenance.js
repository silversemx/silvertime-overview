import React from 'react';

// React Bootstrap
import { Card, Container } from 'react-bootstrap';

const Post = (props) => {
	const { title, schedule, msg, postedOn } = props;

	return (
		<Card className='mb-5'>
			<Card.Body>
				<p className='fs-4 m-0'>{title}</p>
				<p className='schedule-text text-muted m-0'>From: {schedule?.from}</p>
				<p className='schedule-text text-muted'>To: {schedule?.to}</p>
				<hr/>
				<p>{msg}</p>
				<p className='schedule-text text-muted text-end mt-5'>Posted on: {postedOn}</p>
			</Card.Body>
		</Card>
	);
}

const Maintenance = () => {
	return (
		<Container className='my-3'>
			<h2>Scheduled Maintenance</h2>
			<p className='mb-4'>This page is used to list the scheduled maintenance to be performed on the services.</p>
			<Post
				title='Banxico"s Maintenance'
				schedule={{
					from: new Date().toString('es-MX', { timeZone: 'CST' }),
					to: new Date().toString('es-MX', { timeZone: 'CST' })
				}}
				msg='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				postedOn={new Date().toString('es-MX', { timeZone: 'CST' })}
			/>

			<Post
				title='SPEI Maintenance'
				schedule={{
					from: new Date().toString('es-MX', { timeZone: 'CST' }),
					to: new Date().toString('es-MX', { timeZone: 'CST' })
				}}
				msg='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				postedOn={new Date().toString('es-MX', { timeZone: 'CST' })}
			/>
		</Container>
	);
}

export default Maintenance;

import React from 'react';
import { useNavigate } from 'react-router-dom';

// React Bootstrap
import { Card, Container } from 'react-bootstrap';

// Packages
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Utils
import maintenanceJSON from '../../utils/maintenance.json'

const Post = (props) => {
	const { id, title, schedule, msg, postedOn } = props;

	const navigateTo = useNavigate();

	return (
		<Card className='mb-5'>
			<Card.Body>
				<p className='fs-4 m-0'>{title}</p>
				<p className='schedule-text text-muted m-0'>From: {new Date(schedule?.from).toString('es-MX', { timeZone: 'CST' })}</p>
				<p className='schedule-text text-muted'>To: {new Date(schedule?.to).toString('es-MX', { timeZone: 'CST' })}</p>
				<hr/>
				<ReactQuill
					theme='bubble'
					readOnly={true}
					value={msg}
				/>
				<p className='schedule-text text-muted text-end mt-5'>Posted on: {new Date(postedOn).toString('es-MX', { timeZone: 'CST' })}</p>
			</Card.Body>
		</Card>
	);
}

const Maintenance = () => {
	return (
		<Container className='my-3'>
			<h2>Scheduled Maintenance</h2>
			<p className='mb-4'>This page is used to list the scheduled maintenance to be performed on the services.</p>
			{maintenanceJSON.maintenance.map((post, idx) => (
				<Post
					key={idx}
					id={post?.id}
					title={post?.title}
					schedule={post?.schedule}
					msg={post?.msg}
					postedOn={post?.postedOn}
				/>
			))}

			<h2>Past Maintenance</h2>
			<p className='mb-4'>This page is used to list the scheduled maintenance to be performed on the services.</p>
		</Container>
	);
}

export default Maintenance;

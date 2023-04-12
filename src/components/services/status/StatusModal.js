import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

// React Bootstrap
import { Card, Modal } from 'react-bootstrap';

// Packages
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

const StatusModal = (props) => {
	const { show, onHide } = props;

	const { sevice_state } = useSelector(state => state.state);

	return (
		<Modal
			show={show}
			onHide={onHide}
			backdrop='static'
			keyboard={false}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>Disruption Information</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p className='text-end'><strong>Date: </strong>{new Intl.DateTimeFormat('en-US').format(sevice_state?.date?.$date)}</p>
				<div className='mb-5'>
					<h5>Interruptions</h5>
					<hr/>
					{sevice_state?.interruptions?.length > 0
						?	<Fragment>
								{sevice_state?.interruptions.map((int, idx) => (
									<Card key={idx} className='mb-3'>
										<Card.Body>
											<p>{int?.title}</p>
											{int?.description
												?	<ReactQuill
														theme='bubble'
														readOnly={true}
														value={JSON.parse(int?.description)}
													/>
												:	<p>No description.</p>
											}
										</Card.Body>
									</Card>
								))}
							</Fragment>
						: <p>No interruptions this day.</p>
					}
				</div>

				<div className='mb-5'>
					<h5>Instances</h5>
					<hr/>
					{sevice_state?.instances
						?	<Fragment>
								{sevice_state?.instances.map((instance, idx) => (
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
					{sevice_state?.maintenance?.length > 0
						?	<Fragment>
								{sevice_state?.maintenance.map((m, idx) => (
									<Card key={idx} className='mb-3'>
										<Card.Body>
											<p>{m?.title}</p>
											{m?.text
												?	<ReactQuill
														theme='bubble'
														readOnly={true}
														value={JSON.parse(m?.text)}
													/>
												:	<p>No description.</p>
											}
										</Card.Body>
									</Card>
								))}
							</Fragment>
						:	<p>No maintenance this day.</p>
					}
				</div>
			</Modal.Body>
		</Modal>
	);
}

StatusModal.propTypes = {
	show: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired
}

export default StatusModal;

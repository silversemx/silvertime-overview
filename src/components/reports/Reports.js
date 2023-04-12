import React, { useState } from 'react';

// React Bootstrap
import { Button, Col, Container } from 'react-bootstrap';

// Components
import ReportCreateModal from './ReportCreateModal';

const Reports = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<Container className='custom-container'>
			<ReportCreateModal
				show={showModal}
				onHide={() => setShowModal(false)}
			/>

			<Container className='wrapper-container px-0'>
				<Col className='title'>
					<h3 className='text-center'>Reports</h3>
				</Col>
				<Col className='icons-btns'>
					<Container className='d-flex align-items-center justify-content-end px-0'>
						<Button className='btn-submit' size='lg' onClick={() => { setShowModal(true); }}>
							<strong>Create</strong>
						</Button>
					</Container>
				</Col>
			</Container>
		</Container>
	)
}

export default Reports;

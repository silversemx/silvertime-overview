import React from 'react';

// React Bootstrap
import { Button, Modal } from 'react-bootstrap';

const StatusModal = (props) => {
	const { show, onHide } = props;

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
				Information
			</Modal.Body>
		</Modal>
	);
}

StatusModal.propTypes = {}

export default StatusModal;

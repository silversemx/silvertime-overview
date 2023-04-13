import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// React Bootstrap
import { Button, Container, Form, Modal } from 'react-bootstrap';

// Packages
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Components
import SelectButton from '../utils/SelectButton';

// Actions
import { get_all_services, get_all_service_instance } from '../../redux/actions/servicesActions';
import { create_report } from '../../redux/actions/reportsActions';

// Utils
import { geReportPriorityDesc, getExecutionScopeDesc, geReportTypeDesc } from '../../utils/getStatusDesc';

const ReportCreateModal = (props) => {
	const { show, onHide } = props;

	const dispatch = useDispatch();

	const { all_services, service_instances } = useSelector(state => state.services);

	const initialReportState = { priority: '', scope: '', type: '', service: '', instance: '', title: '', text: '', image: null };
	const [report, setReport] = useState(initialReportState);

	useEffect(() => {
		dispatch(get_all_services());
	}, []);

	useEffect(() => {
		dispatch(get_all_service_instance({ service: report.service }));
	}, [report.service]);

	const closeModalRef = useRef(null);
	const quillEditorRef = useRef(null);
	const fileInputRef = useRef(null);

	const closeModal = () => {
		onHide();
		setReport(initialReportState);
	}

	const handleFileInput = () => {
		fileInputRef.current?.files &&
			setReport({ ...report, image: fileInputRef.current.files[0] });
	}

	const onChangeEditor = () => {
		const delta = quillEditorRef?.current?.getEditor()?.getContents();
		setReport({ ...report, text: delta });
	}

	const createReport = () => {
		dispatch(create_report(report, closeModalRef));
	}

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
				<Modal.Title>Create Report</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Fragment>
					<Container className='mb-3 p-0' fluid>
						<p className='mb-2'>Priority</p>
						<SelectButton
							options={[
								{ name: geReportPriorityDesc(1), value: 1 },
								{ name: geReportPriorityDesc(2), value: 2 },
								{ name: geReportPriorityDesc(3), value: 3 },
								{ name: geReportPriorityDesc(4), value: 4 }
							]}
							name='priority'
							value={report.priority}
							onChange={(e) => setReport({ ...report, priority: e !== null ? e.value : '' })}
						/>
					</Container>
					<Container className='mb-3 p-0' fluid>
						<p className='mb-2'>Scope</p>
						<SelectButton
							options={[
								{ name: getExecutionScopeDesc(1), value: 1 },
								{ name: getExecutionScopeDesc(2), value: 2 },
								{ name: getExecutionScopeDesc(3), value: 3 }
							]}
							name='scope'
							value={report.scope}
							onChange={(e) => setReport({ ...report, scope: e !== null ? e.value : '' })}
						/>
					</Container>
					{(report.scope === 2 || report.scope === 3) &&
						<Container className='mb-3 p-0' fluid>
							<p className='mb-2'>Service</p>
							<SelectButton
								options={all_services?.services}
								name='service'
								value={report.service}
								onChange={(e) => setReport({ ...report, service: e !== null ? e.value : '' })}
							/>
						</Container>
					}
					{report.scope === 3 &&
						<Container className='mb-3 p-0' fluid>
							<p className='mb-2'>Instance</p>
							<SelectButton
								options={service_instances?.instances}
								name='service'
								value={report.instance}
								onChange={(e) => setReport({ ...report, instance: e !== null ? e.value : '' })}
							/>
						</Container>
					}
					<Container className='mb-3 p-0' fluid>
						<p className='mb-2'>Type</p>
						<SelectButton
							options={[
								{ name: geReportTypeDesc(1), value: 1 },
								{ name: geReportTypeDesc(2), value: 2 },
								{ name: geReportTypeDesc(3), value: 3 }
							]}
							name='type'
							value={report.type}
							onChange={(e) => setReport({ ...report, type: e !== null ? e.value : '' })}
						/>
					</Container>
					<Container className='mb-3 p-0' fluid>
						<p className='mb-2'>Title</p>
						<Form.Control onChange={(e) => setReport({ ...report, title: e.target.value })} />
					</Container>
					<Container className='mb-3 p-0' fluid>
						<p className='mb-2'>Text</p>
						<ReactQuill
							theme='snow'
							ref={quillEditorRef}
							value={report.text}
							onChange={onChangeEditor}
							readOnly={false}
							preserveWhitespace
							style={{ height: '130px' }}
						/>
					</Container>
					<Container className='mb-3 mt-5 p-0' fluid>
						<Form.Group controlId='formFile' className='mb-3'>
							<Form.Label>Picture</Form.Label>
							<Form.Control type='file' onChange={handleFileInput} ref={fileInputRef} />
						</Form.Group>
					</Container>
				</Fragment>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-secondary' onClick={closeModal} ref={closeModalRef}>Cancel</Button>
				<Button className='btn-submit' onClick={createReport}>Create</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ReportCreateModal;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// React Bootstrap
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

// Packages
import Axios from 'axios';
import { Buffer } from 'buffer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

// Components
import ReportCreateModal from './ReportCreateModal';
import StatusBadge from '../utils/StatusBadge';

// Actions
import { get_all_reports } from '../../redux/actions/reportsActions';

// Utils
import { geReportStatusDesc, geReportPriorityDesc, getExecutionScopeDesc, geReportTypeDesc } from '../../utils/getStatusDesc';

const Report = (props) => {
	const { reportInfo } = props;

	const [reportImage, setreportImage] = useState('');

	useEffect(() => {
		requestImageReport();
	}, [reportInfo?._id?.$oid]);

	const requestImageReport = () => {
		let url = process.env.REACT_APP_SERVER_URL + `/api/state/reports/${reportInfo?._id?.$oid}/image`;

		Axios.get(url,{
			responseType: 'arraybuffer'
		})
		.then((res) => {
			let data = `data:${res.headers['content-type']};base64, ${new Buffer(res.data, 'binary').toString('base64')}`;

			setreportImage(data);
		}).catch((err) => {
			console.log(err)
		});
	}

	return (
		<Card className='mb-5'>
			<Card.Body>
				<Row>
					<Col lg={11} sm={12}>
						<h4
							style={{ cursor: 'pointer' }}
							// onClick={() => navigateTo(`/report/${maintenance?._id?.$oid}/info`)}
						>
							{reportInfo?.title}
						</h4>
					</Col>
					<Col lg={1} sm={12}>
						<StatusBadge status={geReportStatusDesc(reportInfo?.status)} />
					</Col>
				</Row>
				<hr />
				<Row className='text-center'>
					<Col><p className='m-0'>Priority: {geReportPriorityDesc(reportInfo?.priority)}</p></Col>
					<Col><p className='m-0'>Scope: {getExecutionScopeDesc(reportInfo?.scope)}</p></Col>
					<Col><p className='m-0'>Type: {geReportTypeDesc(reportInfo?.report_type)}</p></Col>
				</Row>
				<hr/>
				{reportInfo?.service && 
					<div>
						<p><b>Service:</b> {reportInfo?.service?.name}</p>
						<hr/>
					</div>
				}
				<ReactQuill
					theme='bubble'
					readOnly={true}
					value={reportInfo?.text && JSON.parse(reportInfo?.text)}
				/>
				<div className='report-img'>
					<img src={reportImage} alt='Report Image' />
				</div>
				<p className='schedule-text text-muted text-end m-0'>Posted on: {new Date(reportInfo?.date?.$date).toString('es-MX', { timeZone: 'CST' })}</p>
				<p className='schedule-text text-muted text-end'>Posted by: {reportInfo?.user?.first_name + ' ' + reportInfo?.user?.last_name}</p>
			</Card.Body>
		</Card>
	);
}

Report.propTypes = {
	reportInfo: PropTypes.object.isRequired
}

const Reports = () => {
	const dispatch = useDispatch();

	const { all_reports } = useSelector(state => state.reports);

	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		dispatch(get_all_reports());
	}, []);

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

			<Container  className='mt-5'>
				{all_reports.reports.map((report, idx) => (
					<Report
						key={idx}
						reportInfo={report}
					/>
				))}
			</Container>
		</Container>
	)
}

export default Reports;

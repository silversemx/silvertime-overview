import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// React Bootstrap
import { Card, Container } from 'react-bootstrap';

// Packages
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Components
import Interruption from './Interruption';

// Actions
import { get_interruption_info } from '../../redux/actions/interruptionsActions';

const InterruptionInfo = () => {
	const { interruption_id } = useParams();

	const dispatch = useDispatch();

	const { interruption_info } = useSelector(state => state.interruptions);

	useEffect(() => {
		dispatch(get_interruption_info(interruption_id));
	}, []);

	return (
		<Container className='custom-container'>
			<h2 className='text-center mb-3'>Interruption Information</h2>
			<Interruption interruption={interruption_info} />

			{interruption_info?.solution &&
				<div>
					<h4 className='text-center mb-3'>Solution</h4>
					<Card className='text-success-emphasis bg-success-subtle text-center p-2'>
						<Card.Body>
							<ReactQuill
								theme='bubble'
								readOnly={true}
								value={interruption_info?.solution && JSON.parse(interruption_info?.solution)}
							/>
						</Card.Body>
					</Card>
				</div>
			}
		</Container>
	);
}

export default InterruptionInfo;

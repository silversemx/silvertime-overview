import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// React Bootstrap
import { Container } from 'react-bootstrap';

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
		</Container>
	);
}

export default InterruptionInfo;

import React from 'react';

const Footer = () => {
	return (
		<div className='footer'>
			<div className='container footer-container'>
				<div className='footer-section'>
					<p className='footer-header'>silverse</p>
					<div className='footer-content'>
						<p>Mexico City</p>
						<p>silversemx@gmail.com</p>
						<p><a href='https://www.silverse.mx'>www.silverse.mx</a></p>
					</div>
				</div>
				<div className='footer-section'>
					<p className='footer-header'>Legal</p>
					<div className='footer-content'>
						<p><a href='true'>Cookies Advertisement</a></p>
					</div>
				</div>
				<div className='footer-section'>
					<p className='footer-header'>About</p>
					<div className='footer-content'>
						<a href='https://www.astrazeneca.mx'>
							<img style={{ height: '100px' }} src={process.env.PUBLIC_URL + '/assets/astrazeneca.png'} alt='Astrazeneca' />
						</a>
					</div>
				</div>
			</div>
			<div className='container footer-copyright'>
				<p className='my-0'>&copy; { new Date().getFullYear() } Silverse. All Rights Reserved.</p>
			</div>
		</div>
	);
}

export default Footer;

import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";

// React Bootstrap
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

// Actions
import { auth_token_remove } from '../../redux/actions/authActions';

const Header = () => {
	const dispatch = useDispatch();

	let location = useLocation();

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(auth_token_remove());
	}
	
	return (
		<Navbar className='header' expand='lg'>
			<Container fluid>
				<Navbar.Brand href='/'>
					<img className='d-inline-block align-top me-2' height={'30px'} alt='Silvertime'
						src={process.env.PUBLIC_URL + '/assets/silvertime.png'}
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbarScroll' />
				<Navbar.Collapse id='navbarScroll'>
					<Nav className='w-100 me-auto' navbarScroll>
						<Container className='nav-container' fluid>
							<Nav.Link href='/services' className='header-link' active={location.pathname.includes('/service')}>Services</Nav.Link>
							<Nav.Link href='/maintenance' className='header-link' active={location.pathname.includes('/maintenance')}>Maintenance</Nav.Link>
							<Nav.Link href='/reports' className='header-link' active={location.pathname.includes('/reports')}>Reports</Nav.Link>
						</Container>
					</Nav>
					<Nav>
						<NavDropdown 
							title={<Fragment><i className='bi bi-person-circle fs-5 me-2'></i>Account</Fragment>}
							id='userDropdown' 
							align='end'
							active
						>
							<NavDropdown.Item>
								<i className='bi bi-person-circle me-2'></i>Account
							</NavDropdown.Item>
							<NavDropdown.Item href={process.env.REACT_APP_LOGIN + '/apps'}>
								<i className='bi bi-grid me-2'></i>Return to menu
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={(e) => handleLogout(e)}>
								<i className='bi bi-box-arrow-right me-2'></i>Log Out
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;

import React, { Fragment } from 'react';

// React Bootstrap
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
	return (
		<Navbar className='header' expand='lg'>
			<Container fluid>
				<Navbar.Brand href='/'>
					<img className='d-inline-block align-top me-2' height={'30px'} alt='Silvertime'
						src={process.env.PUBLIC_URL + '/assets/silvertime.png'}
					/>
					Silverse
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbarScroll' />
				<Navbar.Collapse id='navbarScroll'>
					<Nav className='w-100 me-auto' navbarScroll>
						<Container className='nav-container' fluid>
							<Nav.Link className='header-link'>Services</Nav.Link>
							<Nav.Link className='header-link'>Maintenance</Nav.Link>
							<Nav.Link className='header-link'>Incidents</Nav.Link>
							<Nav.Link className='header-link'>Reports</Nav.Link>
						</Container>
					</Nav>
					<Nav>
						<NavDropdown 
							title={<Fragment><i className='bi bi-person-circle fs-5 me-2'></i>Your Account</Fragment>}
							id='userDropdown' 
							align='end'
							active
						>
							<NavDropdown.Item>
								<i className='bi bi-person-circle me-2'></i>Account
							</NavDropdown.Item>
							<NavDropdown.Item>
								<i className='bi bi-grid me-2'></i>Return to menu
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item>
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

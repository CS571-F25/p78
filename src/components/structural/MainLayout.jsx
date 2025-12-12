import React from 'react';
import { Link, Outlet } from 'react-router';
import { Nav, Navbar, Container } from 'react-bootstrap';


function MainLayout(props) {
	return (
		<div>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand as={Link} to="/">Recipe App</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/">Home</Nav.Link>
						<Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
						<Nav.Link as={Link} to="/about">About</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			 <div className="p-3">
				<Outlet /></div>
		</div>
	);
}

export default MainLayout;

import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => (
  <Navbar variant="dark" expand="lg" className="bg-black mb-4">
    <Container>
      <Navbar.Brand href="#" className="text-danger fw-bold fs-4">CineScope</Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;

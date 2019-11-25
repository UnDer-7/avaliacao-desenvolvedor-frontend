import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/">Surittec</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/cliente/new">Novo Cliente</Nav.Link>
        <Nav.Link href="#pricing">Sair</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-primary">Search</Button>
      </Form>
    </Navbar>
  );
};

export default NavBar;

import React from 'react';
import { Link } from "react-router-dom";
import {Container,Col} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Menu(){
    return(
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Col>
                        <Navbar.Brand as={Link} to='/'>Bill Splitter</Navbar.Brand>
                    </Col>
                    <Col>
                        <Nav className="me-auto">
                            
                        </Nav>
                    </Col>
                </Container>
            </Navbar>
        </>
    )
}
export default Menu;
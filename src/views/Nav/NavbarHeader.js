import React from 'react'
import './style.scss'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink } from "react-router-dom";

class NavbarHeader extends React.Component {
    render() {
        return (
            <>
                <Navbar variant="dark">
                    <Container>
                        <Nav className="me-auto">
                            <NavLink className='nav-link' exact to="/">Home</NavLink>
                            <NavLink className='nav-link' to="/todo">Todo</NavLink>
                            <NavLink className='nav-link' to="/users">User</NavLink>
                            <NavLink className='nav-link' to="/jobs">Job</NavLink>
                        </Nav>
                    </Container>
                </Navbar></>
        )
    }
}
export default NavbarHeader
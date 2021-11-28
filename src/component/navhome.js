import { Navbar, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

const NavHome = () => {

    return (
        <Navbar bg="success" variant="light" style={{ marginBottom: '20px' }}>
            <Container>
                <Navbar.Brand >
                    <Link to={'/Login'} style={{ textDecoration: 'none', color: 'white' }}>
                        <img
                            alt=""
                            src="/favicon.ico"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Majoo Teknologi Indonesia
                    </Link>
                </Navbar.Brand>
                {
                    localStorage.getItem('token') == null ? (
                        <Form className="d-flex">
                            <Link to={'/Login'} >
                                <Button style={{ borderRadius: '20px', boxShadow: 'inherit' }} variant="light">Login</Button>
                            </Link>
                        </Form>
                    ) : ('')
                }
            </Container>
        </Navbar>
    )
}

export default NavHome;
import { Navbar, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

const NavbarNav = ({ add }) => {
    const [logout, setLogout] = useState(false);
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem('token');
        setLogout(true);
    }

    return (
        <Navbar bg="success" variant="light" style={{ marginBottom: '20px', position: 'sticky', top: 0 }}>
            {
                localStorage.getItem('token') == null ? navigate("../") : ''
            }
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

                <Form className="d-flex">
                    <Link to={"/"} style={{marginTop:'5px', textDecoration:'none', color:'white', marginRight:'30px', fontWeight:'bold'}}>
                        Go To Store
                    </Link>
                    {
                        !add ? <Link to={'/Admin/TambahProduk'} style={{ color: 'white', marginRight: '30px', marginTop: '5px', textDecoration: 'none', fontWeight: 'bolder' }} > Tambah Produk</Link> : ''
                    }
                    <Button onClick={() => Logout()} style={{ borderRadius: '20px', boxShadow: 'inherit' }} variant="light">Logout</Button>
                </Form>
            </Container>
        </Navbar>
    )
}

export default NavbarNav;
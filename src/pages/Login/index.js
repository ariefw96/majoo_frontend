import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Modal } from 'react-bootstrap'
import { loginUser } from '../../api'
import Loading from '../../component/loading'

const Login = () => {
    const navigate = useNavigate();
    const [renderModal, setRenderModal] = useState(false);
    const [spinner, setSpinner] = useState (false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    console.log("Username : " + username);
    console.log("Password : " + password);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token != null) {
            navigate('../Admin', { replace: true });
        }
    }, []);

    const submitLogin = async () => {
        setSpinner(true);
        console.log("Click Login!");
        const result = await loginUser({
            username,
            password
        });
        console.log("Res", result);
        if (result != 'err') {
            setSpinner(false);
            console.log("Berhasil login", result);
            localStorage.setItem('token', result.token);
            navigate('../Admin', { replace: true });
        } else {
            setSpinner(false);
            alert('Username atau password tidak dikenali');
            console.log("gagal Login");
        }
    }

    const renderLupaPass = () => {
        return (
            <Modal show={renderModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Cie Lupa Password</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Coba diinget-inget lagi passwordnya.. hehe</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => setRenderModal(false)} variant="primary">Tutup</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <Container fluid style={{ height: '100vh' }} className="bg-success" >
            <Form className="col-md-3" style={{ margin: 'auto', paddingTop: '30vh' }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{textShadow:"0 0 5px white", fontWeight:'bold'}}>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{textShadow:"0 0 5px white", fontWeight:'bold'}}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <div onClick={() => setRenderModal(true)} style={{marginBottom:'10px', textDecoration:'underline'}}>Lupa password ? Klik disini</div>
                </Form.Group>
                <Button variant="primary" onClick={() => submitLogin()} >
                    Login
                </Button>
            </Form>
            {/* </div> */}
            {
                renderLupaPass()
            }
            <Loading show={spinner} />
        </Container>
    )
}

export default Login;
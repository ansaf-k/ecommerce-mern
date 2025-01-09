import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthUserMutation } from '../slice/userSlice';
import { toast } from 'react-toastify';

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authUser] = useAuthUserMutation();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventdefault();
        try {
            await authUser({ email, password }).unwrap();
            toast.success("Logged in successfully");
            setEmail('');
            setPassword('');
            navigate("/")
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <Container>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer? <Link to={"/register"}>Register</Link>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginScreen;
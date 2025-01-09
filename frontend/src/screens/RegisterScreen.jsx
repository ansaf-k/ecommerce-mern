import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from "react-toastify";
import Loader from "../components/Loader";

import { useRegisterUserMutation } from "../slice/userSlice";

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ registerUser, { isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await registerUser({ name, email, password }).unwrap();
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate("/login");
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <Container>
            <h1>Register</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button disabled={isLoading} type="submit" variant="primary">
                    Register
                </Button>

                {isLoading && <Loader />}
            </Form>

            <Row className="py-3">
                <Col>
                    Already have an account? <Link to={"/login"}>Login</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterScreen;
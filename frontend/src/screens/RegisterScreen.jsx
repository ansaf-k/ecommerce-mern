import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from 'react-bootstrap';
import { toast } from "react-toastify";
import Loader from "../components/Loader";

import { useRegisterUserMutation } from "../slice/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slice/authSlice";
import FormContainer from "../components/FormContainer";

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await registerUser({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                navigate("/");
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };

    const { search } = useLocation();  // for redirection to shippingPage
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect])

    return (
        <FormContainer>
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
                    Already have an account? {" "}
                    <Link to={`/login/?redirect=${redirect}`}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slice/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slice/authSlice';
import Loader from '../components/Loader';

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth)
    const [login, { isLoading }] = useLoginMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials(res));
            navigate("/")
        } catch (error) {
            toast.error(error?.data?.message);
        }
    };

    const { search } = useLocation();
    console.log(search);
    const sp = new URLSearchParams(search);
    console.log(sp);
    const redirect = sp.get("redirect") || '/';
    console.log(redirect);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect])

    return (
        <FormContainer>
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
            {isLoading && <Loader />}

            <Row className="py-3">
                <Col>
                    New Customer? <Link to={`/register/?redirect=${redirect}`}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default LoginScreen;
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckOutStep';
import Message from '../components/Message';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrdersMutation, useOrderToPaidMutation } from '../slice/orderApiSlice';
import Loader from '../components/Loader';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { clearCartItem } from '../slice/cartSlice';


const PlaceOrderScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart)

    const [createOrder, { error, isLoading }] = useCreateOrdersMutation();
    const [orderToPaid] = useOrderToPaidMutation()

    const placeOrderHandler = async () => {
        var options = {
            key: "rzp_test_HZlSHqpedcWyNI", // Enter the Key ID generated from the Dashboard
            key_secret: "2pf1puJi6Uif1vA2rz9F0xDK",
            amount: parseInt(cart.totalPrice * 100), // Amount is in paise
            currency: "INR",
            name: "Acme Corp",              //your business name
            description: "Test Transaction",            //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
                const paymentId = response.razorpay_payment_id;

                try {
                    const res = await createOrder({
                        cartItems: cart.cartItems,
                        shippingAddress: cart.shippingAddress,
                        paymentMethod: cart.paymentMethod,
                        paymentResult: paymentId,
                        itemsPrice: cart.itemsPrice,
                        taxPrice: cart.taxPrice,
                        totalPrice: cart.totalPrice,
                        shippingPrice: cart.shippingPrice,
                    }).unwrap();
                    dispatch(clearCartItem());
                    await orderToPaid(res._id);
                    navigate(`/order/${res._id}`)
                }
                catch (error) {
                    toast.error(error?.data?.message)
                }
            },
        };
        const pay = new window.Razorpay(options);
        pay.open();
    };

    useEffect(() => {
        if (!cart.shippingAddress) {
            navigate('/shipping')
        }
        else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [navigate, cart.shippingAddress, cart.paymentMethod]);

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                                {cart.shippingAddress.postalCode},{" "}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={`http://localhost:5000${item?.image}`}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant="danger">{error?.data?.message}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                                {isLoading && <Loader />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
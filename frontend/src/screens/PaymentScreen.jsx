import { Button, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckOutStep";
import { paymentHandler } from "../slice/cartSlice";

const PaymentScreen = () => {

  const { shippingAddress } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(paymentHandler(paymentMethod))
    navigate("/placeorder")
  }


  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/cart")
    }
  }, [navigate, shippingAddress])

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              className="my-2"
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};


export default PaymentScreen;
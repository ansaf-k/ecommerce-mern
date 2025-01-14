import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useGetProductQuery } from '../slice/productApiSlice';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import Message from '../components/Message';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slice/cartSlice';
import { useState } from 'react';

const ProductScreen = () => {

  const [qty, setQty] = useState('1');
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(productId);
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  }

  return (
    <>
      {isLoading ? (<Loader />) : error ? (
        <Message variant="danger">{error.data.message || error.error}</Message>
      ) : (
        <>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <Row>
            <Col md={5}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                  <Card.Title>
                    <Rating value={product.rating} />
                  </Card.Title>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock)
                            .keys()
                            .map((x) => {
                              return (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              );
                            })
                          ]}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
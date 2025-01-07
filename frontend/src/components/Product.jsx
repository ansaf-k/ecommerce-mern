import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import Rating from "./Rating";

const Product = ({ product }) => {
  
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Title>
          <Rating value={product.rating}/>
        </Card.Title>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired
}

export default Product
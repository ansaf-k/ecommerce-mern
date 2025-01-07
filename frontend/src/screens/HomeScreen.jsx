import { Col, Row } from "react-bootstrap"
import products from "../../products.js"
import Product from "../components/Product.jsx"
import { useGetProductQuery } from "../slice/productSLice.js"

const HomeScreen = () => {
  const { data: productss } = useGetProductQuery();

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product, i) => {
          return (
            <Col sm={12} md={6} lg={4} key={i}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  )
}

export default HomeScreen
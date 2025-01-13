import { Col, Row } from "react-bootstrap"
// import products from "../../products.js"
import Product from "../components/Product.jsx"
import { useGetProductsQuery } from "../slice/productApiSlice.js"
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const HomeScreen = () => {
  const { data: products ,isLoading, error} = useGetProductsQuery();
  console.log(products);

  return (
    <>
      {isLoading ? (<Loader />) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products?.map((product, i) => {
              return (
                <Col sm={12} md={6} lg={4} key={i}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
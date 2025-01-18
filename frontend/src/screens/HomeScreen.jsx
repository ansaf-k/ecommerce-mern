import { Col, Row } from "react-bootstrap"
// import products from "../../products.js"
import Product from "../components/Product.jsx"
import { useGetProductsQuery } from "../slice/productApiSlice.js"
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate.jsx";

const HomeScreen = () => {

  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber, keyword });

  return (
    <>
      {isLoading ? (<Loader />) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data?.products?.map((product, i) => {
              return (
                <Col sm={12} md={6} lg={4} key={i}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </>
  )
}

export default HomeScreen
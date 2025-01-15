import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useCreateProductMutation, useGetProductsQuery } from "../../slice/productApiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductListScreen = () => {

  const { data: products, isLoading, error } = useGetProductsQuery();

  const [createProduct] = useCreateProductMutation();

  const createProductHandler = async () => {
    try {
      await createProduct({});
      toast.success("Product  Created");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  const deleteHandler = () => {

  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button onClick={createProductHandler} className="btn-sm m-3">
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button as={Link} to={`/admin/product/${product._id}`} variant="light" className="btn-sm mx-2">
                      <FaEdit />
                    </Button>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* PAGINATE PLACEHOLDER */}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from "../slice/userApiSlice";
import { Logout } from "../slice/authSlice";
import { toast } from "react-toastify";
import { resetCart } from "../slice/cartSlice";

const Header = () => {

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(Logout()); //removes localstorage data
      dispatch(resetCart()); //removes cart data from redux store
      navigate('/login');
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">ProShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <Nav.Link as={Link} to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Nav.Link>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser /> Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
import { Container } from "react-bootstrap";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Footer from "./components/Footer";
import CartScreen from "./screens/CartScreen";
import { ToastContainer } from "react-toastify";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ShippingScreen from "./screens/ShipppingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PrivetRoutes from "./components/PrivateRoutes";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminRoutes from "./components/AdminRoutes";
import UserList from "./screens/admin/UserListScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />

            {/* private routes */}
            <Route path="" element={<PrivetRoutes />}>
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </Route>

            {/* admin routes */}
            <Route path="" element={<AdminRoutes />}>
              <Route path="/admin/orderlist" element={<OrderListScreen />} />
              <Route path="/admin/productlist" element={<ProductListScreen />} />
              <Route path="/admin/userlist" element={<UserList />} />
              <Route path="/admin/product/:id" element={<ProductEditScreen />} />
            </Route>

          </Routes>
        </Container>
        <ToastContainer />
      </main>
      <Footer />
    </>
  )
}

export default App
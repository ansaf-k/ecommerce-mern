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

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
          </Routes>
        </Container>
        <ToastContainer />
      </main>
      <Footer />
    </>
  )
}

export default App
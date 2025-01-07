import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>ProShop &copy; {date}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NewsHomePage from "./News/NewsHomePage";

function HomePage() {
  return (
    <div className="container py-5 text-center">
      <Row className="g-4 mb-5">
        {/* CARD 1 */}
        <Col xs={12} sm={12} lg={3}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body
              as={Link}
              to="/Team"
              className="bg-dark text-light text-decoration-none rounded-4"
            >
              <h2>Classifica Piloti</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* CARD 2 */}
        <Col xs={12} sm={12} lg={6}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body
              as={Link}
              to="/Card2"
              className="bg-dark text-light text-decoration-none rounded-4"
            >
              <h2>Classifica Fanta</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* CARD 3 */}
        <Col xs={12} sm={12} lg={3}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body
              as={Link}
              to="/Card3"
              className="bg-dark text-light text-decoration-none rounded-4"
            >
              <h2>Classifica Costruttori</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* SEZIONE NOTIZIE */}
      <NewsHomePage />
    </div>
  );
}

export default HomePage;

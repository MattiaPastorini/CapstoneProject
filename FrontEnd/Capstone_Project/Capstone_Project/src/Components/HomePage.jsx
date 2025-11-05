import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NewsHomePage from "./News/NewsHomePage";

function HomePage() {
  return (
    <div className="container py-5 text-center">
      <Row className="g-4 mb-5">
        {/* Card Classifica Piloti*/}
        <Col xs={12} sm={12} lg={3}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body
              as={Link}
              to="/CPiloti"
              className="bg-dark text-light text-decoration-none rounded-4"
            >
              <h2>Classifica Piloti</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* Card Classifica Fanta */}
        <Col xs={12} sm={12} lg={6}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body
              as={Link}
              to="/CFanta"
              className="bg-dark text-light text-decoration-none rounded-4"
            >
              <h2>Classifica Fanta</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* Card Classifica Costruttori */}
        <Col xs={12} sm={12} lg={3}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body
              as={Link}
              to="/CCostruttori"
              className="bg-dark text-light text-decoration-none rounded-4"
            >
              <h2>Classifica Costruttori</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Ultime 6 notizie */}
      <NewsHomePage />
    </div>
  );
}

export default HomePage;

import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Classifica() {
  return (
    <>
      <div className="container py-5 text-center">
        <Row className="g-4 mb-5">
          <Col xs={12} sm={12} lg={6}>
            <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
              <Card.Body
                as={Link}
                to="/CFanta"
                className="bg-dark text-light text-decoration-none rounded-4"
              >
                <h2>Classifica Piloti</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
              <Card.Body
                as={Link}
                to="/CFanta"
                className="bg-dark text-light text-decoration-none rounded-4"
              >
                <h2>Classifica Costruttori</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Classifica;

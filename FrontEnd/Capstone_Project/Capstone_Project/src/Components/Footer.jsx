import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

function Footer() {
  return (
    <footer
      className="bg-dark text-light pb-3 pt-4 mt-3"
      style={{ borderTop: "1px solid #444" }}
    >
      <Container>
        <Row className="text-center text-md-start">
          {/* Colonna 1: Link principali */}
          <Col xs={12} md={4} className="mb-3">
            <h5 className="mb-2 text-center">Link utili</h5>
            <Nav className="flex-column text-center">
              <Nav.Link
                as={Link}
                to="/"
                className="text-secondary link-light p-0 mb-1"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/regolamento"
                className="text-secondary link-light p-0 mb-1"
              >
                Regolamento
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/Notizie"
                className="text-secondary link-light p-0 mb-1"
              >
                Notizie
              </Nav.Link>
            </Nav>
          </Col>

          {/* Colonna 2: Altro */}
          <Col xs={12} md={4} className="mb-3">
            <h5 className="mb-2 text-center">Sezioni</h5>
            <Nav className="flex-column text-center">
              <Nav.Link
                as={Link}
                to="/team"
                className="text-secondary link-light p-0 mb-1"
              >
                Team
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/ClassificaPiloti"
                className="text-secondary link-light p-0 mb-1"
              >
                Classifica Piloti
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/ClassificaCostruttori"
                className="text-secondary link-light p-0 mb-1"
              >
                Classifica Costruttori
              </Nav.Link>
            </Nav>
          </Col>

          {/* Colonna 3: Contatti */}
          <Col xs={12} md={4} className="mb-3">
            <h5 className="mb-2 text-center">Contatti</h5>
            <p className="mb-1 text-light text-center">
              <a
                href="#"
                className="text-decoration-none text-secondary link-light"
              >
                pandafunclub@bamboo.com
              </a>
            </p>
            <p className="mb-0 text-center">
              <a
                href="https://www.instagram.com/matti862/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-secondary link-light"
              >
                @matti862
              </a>
            </p>
          </Col>
        </Row>

        {/* Riga copyright */}
        <Row className="mt-4">
          <Col className="text-center">
            <small>&copy; 2025 Mattia Pastorini</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

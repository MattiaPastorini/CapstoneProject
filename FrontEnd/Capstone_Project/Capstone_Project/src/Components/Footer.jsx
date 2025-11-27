import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

function Footer() {
  return (
    <footer className="bg-dark text-light pb-3 pt-4 mt-4">
      <Container>
        <Row className="text-center text-md-start">
          {/* Colonna 1: Link principali */}
          <Col xs={12} md={4} className="mb-3">
            <h5 className="mb-2 text-center">
              <i className="bi bi-link me-1"></i>Link utili
            </h5>
            <Nav className="flex-column text-center">
              <Nav.Link
                as={Link}
                to="/"
                className="text-secondary link-light p-0 mb-1"
              >
                <i className="bi bi-house me-1"></i>Home
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/news"
                className="text-secondary link-light p-0 mb-1"
              >
                <i className="bi bi-newspaper me-1"></i>Notizie
              </Nav.Link>
            </Nav>
          </Col>

          {/* Colonna 2: Altro */}
          <Col xs={12} md={4} className="mb-3">
            <h5 className="mb-2 text-center">
              <i className="bi bi-controller me-1"></i>Fanta
            </h5>
            <Nav className="flex-column text-center">
              <Nav.Link
                as={Link}
                to="/team"
                className="text-secondary link-light p-0 mb-1"
              >
                <i className="bi bi-people me-1"></i>Team
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/classifiche"
                className="text-secondary link-light p-0 mb-1"
              >
                <i className="bi bi-trophy me-1"></i>Classifica
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/regolamento"
                className="text-secondary link-light p-0 mb-1"
              >
                <i className="bi bi-file-earmark-text me-1"></i>Regolamento
              </Nav.Link>
            </Nav>
          </Col>

          {/* Colonna 3: Contatti */}
          <Col xs={12} md={4} className="mb-3">
            <h5 className="mb-2 text-center">
              <i className="bi bi-journal me-1"></i>Contatti
            </h5>
            <p className="mb-1 text-light text-center">
              <span className="text-decoration-none text-secondary mb-0">
                <i className="bi bi-envelope me-2"></i>mattia.862002@gmail.com
              </span>
            </p>
            <p className="mb-0 text-center">
              <a
                href="https://www.instagram.com/matti862/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-secondary link-light"
              >
                <i className="bi bi-instagram me-2"></i>@matti862
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

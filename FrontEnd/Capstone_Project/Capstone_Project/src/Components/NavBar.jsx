import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  // Verifica login
  const isLoggedIn = !!localStorage.getItem("userId");
  const navigate = useNavigate(); // Funzione Logout

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login"); // Oppure window.location.href = "/login";
  };

  return (
    <>
      {/* NAVBAR SUPERIORE */}{" "}
      <Navbar
        bg="dark"
        variant="dark"
        style={{ height: "60px" }}
        className="sticky-top"
      >
        <Container fluid className="px-3">
          {/* Logo */}
          <Navbar.Brand as={Link} to="/">
            <img
              style={{ width: "48px" }}
              src="./src/Components/PNG/LogoF1.png"
              alt="logo f1"
            />
          </Navbar.Brand>

          <div className="d-none d-lg-flex flex-grow-1 align-items-center">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/team"
                className="text-secondary link-light"
              >
                <i className="bi bi-people me-1"></i>Team
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/classifiche"
                className="text-secondary link-light"
              >
                <i className="bi bi-trophy me-1"></i>Classifica
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/news"
                className="text-secondary link-light"
              >
                <i className="bi bi-newspaper me-1"></i>
                Notizie
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/regolamento"
                className="text-secondary link-light"
              >
                <i className="bi bi-file-earmark-text me-1"></i>
                Regolamento
              </Nav.Link>
            </Nav>
            {/* Tasto Logout o Omino desktop */}
            {isLoggedIn ? (
              <Nav.Link
                onClick={handleLogout}
                className="text-secondary link-light"
                style={{ cursor: "pointer" }}
              >
                <i
                  className="bi bi-box-arrow-right"
                  style={{ fontSize: "1.7em" }}
                ></i>
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className="text-secondary link-light"
              >
                <i
                  className="bi bi-person-fill"
                  style={{ fontSize: "1.7em" }}
                ></i>
              </Nav.Link>
            )}
          </div>
          {/* Profilo mobile/tablet */}
          <div className="d-flex d-lg-none align-items-center ms-auto">
            {isLoggedIn ? (
              <Nav.Link
                onClick={handleLogout}
                className="text-secondary link-light"
                style={{ cursor: "pointer" }}
              >
                <i
                  className="bi bi-box-arrow-right"
                  style={{ fontSize: "1.8em" }}
                ></i>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
                <i
                  className="bi bi-person-fill"
                  style={{ fontSize: "1.8em" }}
                ></i>
              </Nav.Link>
            )}
          </div>
        </Container>{" "}
      </Navbar>
      {/* Navbar inferiore per mobile/tablet */}{" "}
      <Navbar fixed="bottom" bg="dark" variant="dark" className="d-lg-none ">
        <Nav className="w-100 justify-content-around">
          <Nav.Link
            as={Link}
            to="/team"
            className="text-secondary link-light d-flex flex-column align-items-center"
          >
            <i className="bi bi-people"></i>Team
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/classifiche"
            className="text-secondary link-light d-flex flex-column align-items-center"
          >
            <i className="bi bi-people"></i>Classifica
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/news"
            className="text-secondary link-light d-flex flex-column align-items-center"
          >
            <i className="bi bi-newspaper"></i>
            <span style={{ fontSize: "0.85em" }}>Notizie</span>
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/regolamento"
            className="text-secondary link-light d-flex flex-column align-items-center"
          >
            <i className="bi bi-file-earmark-text"></i>
            <span style={{ fontSize: "0.85em" }}>Regolamento</span>
          </Nav.Link>
        </Nav>{" "}
      </Navbar>{" "}
    </>
  );
}

export default NavBar;

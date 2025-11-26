import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

function NavBar() {
  // Verifica login
  const isLoggedIn = !!localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  // Stato notifiche e messaggio
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  });

  // --- ACCETTA INVITO ---
  function accettaInvito(codiceInvito, userId, invitoId) {
    fetch("http://localhost:3002/api/lega/partecipazione", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ codiceInvito, userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("Hai accettato l'invito!");
          // Aggiorna le notifiche (così la notifica scompare dall'elenco)
          fetch(`http://localhost:3002/api/notifiche/${userId}`, {
            headers: authHeaders(),
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => setNotifications(data));
          // PATCH: Aggiorna lo stato della lega/team dopo invito accettato
          // Soluzione robusta: Forza il refresh della pagina, così tutte le componenti si aggiornano
          // -- oppure richiama manualmente fetchLeague/fetchClassifica se hai sollevato stato/props context
          setTimeout(() => {
            window.location.reload(); // ricarica tutto (semplice e sicuro, aggiorna tutto)
          }, 500); // leggero delay per avere feedback messaggio
        } else {
          setMessage(data.message || "Errore nell'accettazione.");
        }
        setTimeout(() => setMessage(""), 3000);
      });
  }

  // --- FETCH NOTIFICHE ALL'AVVIO LOGIN ---
  useEffect(() => {
    if (isLoggedIn) {
      const userId = localStorage.getItem("userId");
      fetch(`http://localhost:3002/api/notifiche/${userId}`, {
        headers: authHeaders(),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setNotifications(data))
        .catch(() => setNotifications([]));
    }
  }, [isLoggedIn]);

  return (
    <>
      {/* FEEDBACK INVITI - appare al centro alto e sparisce dopo 3 sec */}
      {message && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-2"
          style={{ zIndex: 3000 }}
        >
          <div className="alert alert-success py-2 px-4">{message}</div>
        </div>
      )}
      <Navbar
        bg="dark"
        variant="dark"
        style={{ height: "60px" }}
        className="sticky-top"
      >
        <Container fluid className="px-3">
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
                <i className="bi bi-newspaper me-1"></i>Notizie
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/regolamento"
                className="text-secondary link-light"
              >
                <i className="bi bi-file-earmark-text me-1"></i>Regolamento
              </Nav.Link>
            </Nav>
            <Nav>
              {/* Notifiche Inviti */}
              {isLoggedIn && (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as={Nav.Link}
                    className="text-secondary link-light"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <i
                      className="bi bi-bell-fill"
                      style={{ fontSize: "1.2em" }}
                    ></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ minWidth: "260px" }}>
                    {notifications && notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <Dropdown.Item
                          key={notif.id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <div>
                            {notif.message}
                            <br />
                            <span style={{ fontSize: "0.8em", color: "#ccc" }}>
                              (Lega ID: {notif.legaId})
                            </span>
                          </div>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() =>
                              accettaInvito(
                                notif.codiceInvito,
                                localStorage.getItem("userId"),
                                notif.id
                              )
                            }
                          >
                            Accetta
                          </Button>
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.ItemText className="text-muted">
                        Nessuna notifica
                      </Dropdown.ItemText>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
            {/* Logout e Profilo */}
            {isLoggedIn ? (
              <Nav.Link
                onClick={() => {
                  localStorage.removeItem("userId");
                  navigate("/login");
                }}
                className="text-secondary link-light"
                style={{ cursor: "pointer" }}
              >
                <div className="d-none d-lg-flex flex-grow-1 align-items-center">
                  <i
                    className="bi bi-box-arrow-right"
                    style={{ fontSize: "1.7em" }}
                  ></i>
                  <span className="ms-2">{username}</span>
                </div>
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
                onClick={() => {
                  localStorage.removeItem("userId");
                  navigate("/login");
                }}
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
        </Container>
      </Navbar>
      {/* Navbar inferiore per mobile/tablet */}
      <Navbar fixed="bottom" bg="dark" variant="dark" className="d-lg-none">
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
        </Nav>
      </Navbar>
    </>
  );
}

export default NavBar;

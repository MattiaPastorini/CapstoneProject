import { Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NewsHomePage from "./News/NewsHomePage";
import { useEffect, useState } from "react";
import {
  calcolaPuntiSquadra,
  classificaPilotiFanta,
} from "../Punti/FantaPunti";

function HomePage() {
  const classificaPiloti = [
    { nome: "Lando Norris", team: "McLaren", punti: 390 },
    { nome: "Oscar Piastri", team: "McLaren", punti: 366 },
    { nome: "Max Verstappen", team: "Red Bull", punti: 341 },
    { nome: "George Russell", team: "Mercedes", punti: 276 },
    { nome: "Charles Leclerc", team: "Ferrari", punti: 214 },
  ];

  const classificaCostruttori = [
    { nome: "McLaren", punti: 756 },
    { nome: "Mercedes", punti: 398 },
    { nome: "Red Bull", punti: 366 },
    { nome: "Ferrari", punti: 362 },
    { nome: "Williams", punti: 111 },
  ];

  // Classifica Lega
  const [classificaLega, setClassificaLega] = useState([]);
  const [legaEsistente, setLegaEsistente] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    fetch(`http://localhost:3002/api/lega/utente/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
    }).then(async (res) => {
      if (res.status === 404) {
        setLegaEsistente(false);
        return null;
      }
      if (!res.ok) {
        setLegaEsistente(false);
        return null;
      }
      const lega = await res.json();
      if (lega && lega.id) {
        setLegaEsistente(true);
        fetch(`http://localhost:3002/api/lega/classifica/${lega.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          credentials: "include",
        })
          .then((res) => (res.ok ? res.json() : []))
          .then(setClassificaLega);
      }
    });
  }, []);

  return (
    <div className="container py-5 text-center">
      <Row className="g-4 mb-5">
        {/* Card Classifica Piloti*/}
        <Col xs={12} sm={12} lg={4}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body
              as={Link}
              to="/classifiche"
              className="bg-dark text-light text-decoration-none rounded-4"
            >
              <h2>Classifica Piloti</h2>
              <table className="table table-dark table-sm mb-0">
                <thead>
                  <tr>
                    <th>Pos</th>
                    <th>Pilota</th>
                    <th>Punti</th>
                  </tr>
                </thead>
                <tbody>
                  {classificaPiloti.map((p, i) => (
                    <tr key={p.nome}>
                      <td>{i + 1}</td>
                      <td>{p.nome}</td>
                      <td>{p.punti}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>

        {/* Card Classifica Fanta */}
        <Col xs={12} sm={12} lg={4}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body
              className="bg-dark text-light text-decoration-none rounded-4 d-flex flex-column  align-items-center"
              style={{ minHeight: 350 }}
            >
              <h2>Classifica Fanta</h2>
              {legaEsistente ? (
                classificaLega.length > 0 ? (
                  <table
                    className="table table-dark table-sm mb-0"
                    style={{ maxWidth: "330px" }}
                  >
                    <thead>
                      <tr>
                        <th>Pos</th>
                        <th>Giocatore</th>
                        <th>Squadra</th>
                        <th>Punti</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...classificaLega]
                        .sort(
                          (a, b) =>
                            calcolaPuntiSquadra(
                              b.piloti,
                              classificaPilotiFanta
                            ) -
                            calcolaPuntiSquadra(a.piloti, classificaPilotiFanta)
                        )
                        .slice(0, 5)
                        .map((entry, i) => (
                          <tr key={entry.nome + entry.squadra}>
                            <td>{i + 1}</td>
                            <td>{entry.nome}</td>
                            <td>{entry.squadra}</td>
                            <td>
                              {Array.isArray(entry.piloti)
                                ? calcolaPuntiSquadra(
                                    entry.piloti,
                                    classificaPilotiFanta
                                  )
                                : "—"}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-muted mt-3">
                    Nessuna squadra in classifica
                  </div>
                )
              ) : (
                <button
                  className="btn btn-danger mt-4"
                  onClick={() => navigate("/team")}
                  style={{ fontSize: 18, fontWeight: "bold" }}
                >
                  Crea/Entra in una lega
                </button>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Card Classifica Costruttori */}
        <Col xs={12} sm={12} lg={4}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body
              as={Link}
              to="/classifiche"
              className="bg-dark text-light text-decoration-none rounded-4"
            >
              <h2>Classifica Costruttori</h2>
              <table className="table table-dark table-sm mb-0">
                <thead>
                  <tr>
                    <th>Pos</th>
                    <th>Team</th>
                    <th>Punti</th>
                  </tr>
                </thead>
                <tbody>
                  {classificaCostruttori.map((team, i) => (
                    <tr key={team.nome}>
                      <td>{i + 1}</td>
                      <td>{team.nome}</td>
                      <td>{team.punti}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

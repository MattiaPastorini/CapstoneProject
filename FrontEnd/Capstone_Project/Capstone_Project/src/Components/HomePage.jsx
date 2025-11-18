import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NewsHomePage from "./News/NewsHomePage";

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
              as={Link}
              to="/team"
              className="bg-dark text-light text-decoration-none rounded-4"
            >
              <h2>Classifica Fanta</h2>
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

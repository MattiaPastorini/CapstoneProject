import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Classifica() {
  const classificaCostruttori = {
    classifica: "costruttori",
    data: "dopo GP Brasile 2025",
    scuderie: [
      { nome: "McLaren", punti: 756 },
      { nome: "Mercedes", punti: 398 },
      { nome: "Red Bull", punti: 366 },
      { nome: "Ferrari", punti: 362 },
      { nome: "Williams", punti: 111 },
      { nome: "Aston Martin", punti: 72 },
      { nome: "Racing Bulls", punti: 72 },
      { nome: "Haas", punti: 62 },
      { nome: "Kick Sauber", punti: 60 },
      { nome: "Alpine", punti: 21 },
    ],
  };

  const classificaPiloti = {
    classifica: "piloti",
    data: "dopo GP Brasile 2025",
    piloti: [
      { nome: "Lando Norris", team: "McLaren", punti: 390 },
      { nome: "Oscar Piastri", team: "McLaren", punti: 366 },
      { nome: "Max Verstappen", team: "Red Bull", punti: 341 },
      { nome: "George Russell", team: "Mercedes", punti: 276 },
      { nome: "Charles Leclerc", team: "Ferrari", punti: 214 },
      { nome: "Lewis Hamilton", team: "Ferrari", punti: 148 },
      { nome: "Andrea Kimi Antonelli", team: "Mercedes", punti: 122 },
      { nome: "Alexander Albon", team: "Williams", punti: 73 },
      { nome: "Nico Hulkenberg", team: "Sauber", punti: 43 },
      { nome: "Isack Hadjar", team: "Racing Bulls", punti: 43 },
      { nome: "Fernando Alonso", team: "Aston Martin", punti: 40 },
      { nome: "Oliver Bearman", team: "Haas", punti: 40 },
      { nome: "Carlos Sainz", team: "Williams", punti: 38 },
      { nome: "Liam Lawson", team: "Racing Bulls", punti: 36 },
      { nome: "Lance Stroll", team: "Aston Martin", punti: 32 },
      { nome: "Esteban Ocon", team: "Haas", punti: 30 },
      { nome: "Yuki Tsunoda", team: "Red Bull", punti: 28 },
      { nome: "Pierre Gasly", team: "Alpine", punti: 22 },
      { nome: "Gabriel Bortoleto", team: "Sauber", punti: 19 },
      { nome: "Franco Colapinto", team: "Alpine", punti: 0 },
    ],
  };

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
                <h6 style={{ color: "#aaa" }}>{classificaPiloti.data}</h6>
                <table className="table table-dark table-striped my-3">
                  <thead>
                    <tr>
                      <th>Pos</th>
                      <th>Pilota</th>
                      <th>Team</th>
                      <th>Punti</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classificaPiloti.piloti.map((pilota, idx) => (
                      <tr key={pilota.nome}>
                        <td>{idx + 1}</td>
                        <td>{pilota.nome}</td>
                        <td>{pilota.team}</td>
                        <td>{pilota.punti}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                <h6 style={{ color: "#aaa" }}>{classificaCostruttori.data}</h6>
                <table className="table table-dark table-striped my-3">
                  <thead>
                    <tr>
                      <th>Pos</th>
                      <th>Scuderia</th>
                      <th>Punti</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classificaCostruttori.scuderie.map((team, idx) => (
                      <tr key={team.nome}>
                        <td>{idx + 1}</td>
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
      </div>
    </>
  );
}
export default Classifica;

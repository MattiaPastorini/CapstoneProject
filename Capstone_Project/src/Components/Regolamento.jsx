import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { Card, Row, Col } from "react-bootstrap";

// Import delle immagini dei piloti
import MaxV from "./PNG/MaxV.png";
import Tsunoda from "./PNG/Tsunoda.png";
import Leclerc from "./PNG/Leclerc.png";
import Hamilton from "./PNG/Hamilton.png";
import Norris from "./PNG/Norris.png";
import Piastri from "./PNG/Piastri.png";
import Russell from "./PNG/Russell.png";
import Antonelli from "./PNG/Antonelli.png";
import Lawson from "./PNG/Lawson.png";
import Hadjar from "./PNG/Hadjar.png";
import Sainz from "./PNG/Sainz.png";
import Albon from "./PNG/Albon.png";
import Hulkenberg from "./PNG/Hulkenberg.png";
import Bortoleto from "./PNG/Bortoleto.png";
import Alonso from "./PNG/Alonso.png";
import Stroll from "./PNG/Stroll.png";
import Gasly from "./PNG/Gasly.png";
import Colapinto from "./PNG/Colapinto.png";
import Bearman from "./PNG/Bearman.png";
import Ocon from "./PNG/Ocon.png";

function Regolamento() {
  return (
    <div className="container py-4 text-center">
      <h1 className=" text-light mb-4">REGOLAMENTO</h1>
      <Row className="g-4 mb-4 d-flex justify-content-between">
        {/* CARD 1 */}
        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
              <h2>Manche</h2>
              <p>
                Il calendario di Formula 1 verrà diviso in 4 Manche, ognuna con
                6 gare.
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* CARD 2 */}
        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
              <h2>Creazione Team</h2>
              <p>
                Ogni team sarà composto da tre piloti (uno per ogni fascia).
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* CARD 3 */}
        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
              <h2>Regola Principale</h2>
              <p>
                Un pilota non può essere scelto per due GP nella stessa manche.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* BONUS/MALUS */}
      <Row className="g-4 mb-5">
        <h2 className=" text-light">BONUS/MALUS</h2>
        {/* CARD 4 */}
        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
              <h2>Bonus classifiche di fascia</h2>
              <ul className=" list-unstyled">
                <li>🏆Pilota vince PL: +1 pt</li>
                <li>⚡Pole Position: +3 pt</li>
                <li>⚡Pole Position in Shootout: +1 pt</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        {/* CARD 5 */}
        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
              <h2>Bonus Classifica generale</h2>
              <ul className=" list-unstyled">
                <li>🏆Pilota 3° fascia, entra in Q2: +1 pt</li>
                <li>🏆Pilota 3° fascia, entra in Q3: +2 pt</li>
                <li>🏆Pilota 2° fascia, entra in Q3: +1 pt</li>
                <li>⚡Pole-man pilota 1° fascia: +1 pt</li>
                <li>⚡Pole-man pilota 2° fascia: +2 pt</li>
                <li>⚡Pole-man pilota 3° fascia: +3 pt</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        {/* CARD 6 */}
        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
              <h2>Bonus Gara/Gara Sprint</h2>
              <ul className=" list-unstyled">
                <li>🥇1° posto (per ogni fascia): +10 pt</li>
                <li>🥈2° posto (per ogni fascia): +7 pt</li>
                <li>🥈3° posto (per ogni fascia): +5 pt</li>
                <li>🥈4° posto (per ogni fascia): +3 pt</li>
                <li>🥈5° posto (per ogni fascia): +1 pt</li>
                <li>
                  🏆MVP F1.com/Miglior sorpasso (fra tutti i piloti): +1 pt
                </li>
                <li>🥇1° posto in Sprint (per ogni fascia): +1 pt</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        {/* CARD 7 */}
        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
              <h2>Malus Prove/Qualifiche</h2>
              <ul className=" list-unstyled">
                <li>❌Pilota 1° fascia esce in Q1: -2 pt</li>
                <li>❌Pilota 1° fascia esce in Q2: -1 pt</li>
                <li>❌Pilota 2° fascia esce in Q1: -1 pt</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* FASCE PILOTI */}
      <Row className="g-4 mb-5">
        <h2 className=" text-light mt-3">FASCE PILOTI</h2>
        {/* CARD 4 */}
        <Col xs={12} sm={12} lg={12}>
          <Card className="h-100 shadow-sm rounded-4 bg-dark text-light">
            <Card.Body className="p-3">
              <h4 className="text-center mb-3">1° Fascia</h4>
              <div className="d-flex flex-wrap justify-content-center">
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={MaxV}
                    alt="Max Verstappen"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Max Verstappen <br /> Red Bull
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Tsunoda}
                    alt="Yuki Tsunoda"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Yuki Tsunoda <br /> Red Bull
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Leclerc}
                    alt="Charles Leclerc"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Charles Leclerc <br /> Ferrari
                  </p>
                </div>

                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Hamilton}
                    alt="Lewis Hamilton"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Lewis Hamilton <br /> Ferrari
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Norris}
                    alt="Lando Norris"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Lando Norris <br /> McLaren
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Piastri}
                    alt="Oscar Piastri"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Oscar Piastri <br /> McLaren
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Russell}
                    alt="George Russell"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    George Russell <br /> Mercedes
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Antonelli}
                    alt="Andrea Kimi Antonelli"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Kimi Antonelli <br /> Mercedes
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* CARD 5 */}
        <Col xs={12} sm={12} lg={12}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
              <h4>2° Fascia</h4>
              <div className="d-flex flex-wrap justify-content-center">
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Lawson}
                    alt="Liam Lawson"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Liam Lawson <br /> Alpha Tauri
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Hadjar}
                    alt="Isack Hadjar "
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Isack Hadjar <br /> Alpha Tauri
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Sainz}
                    alt="Carlos Sainz"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Carlos Sainz <br /> Williams
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Albon}
                    alt="Alexander Albon"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Alexander Albon <br /> Williams
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Hulkenberg}
                    alt="Nico Hulkenberg"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Nico Hulkenberg <br /> Audi
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Bortoleto}
                    alt="Gabriel Bortoleto"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Gabriel Bortoleto <br /> Audi
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* CARD 6 */}
        <Col xs={12} sm={12} lg={12}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
              <h4>3° Fascia</h4>
              <div className="d-flex flex-wrap justify-content-center">
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Alonso}
                    alt="Fernando Alonso"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Fernando Alonso <br /> Aston Martin
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Stroll}
                    alt="Lance Stroll"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Lance Stroll <br /> Aston Martin
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Gasly}
                    alt="Pierre Gasly"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Pierre Gasly <br /> Alpine
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Colapinto}
                    alt="Franco Colapinto"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Franco Colapinto <br /> Alpine
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Bearman}
                    alt="Oliver Bearman "
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Oliver Bearman <br /> Haas
                  </p>
                </div>
                <div className="mx-2 mb-3 text-center">
                  <img
                    src={Ocon}
                    alt="Esteban Ocon"
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                  <p className="mb-0 mt-1">
                    Esteban Ocon <br /> Haas
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Regolamento;

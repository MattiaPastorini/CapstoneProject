import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const fascePiloti = [
  {
    fascia: "PRIMA FASCIA",
    piloti: [
      { id: 1, nome: "Max Verstappen" },
      { id: 2, nome: "Yuki Tsunoda" },
      { id: 3, nome: "Charles Leclerc" },
      { id: 4, nome: "Lewis Hamilton" },
      { id: 5, nome: "Lando Norris" },
      { id: 6, nome: "Oscar Piastri" },
      { id: 7, nome: "George Russell" },
      { id: 8, nome: "Kimi Antonelli" },
    ],
  },
  {
    fascia: "SECONDA FASCIA",
    piloti: [
      { id: 9, nome: "Liam Lawson" },
      { id: 10, nome: "Isack Hadjar" },
      { id: 11, nome: "Carlos Sainz" },
      { id: 12, nome: "Alexander Albon" },
      { id: 13, nome: "Nico Hulkenberg" },
      { id: 14, nome: "Gabriel Bortoleto" },
    ],
  },
  {
    fascia: "TERZA FASCIA",
    piloti: [
      { id: 15, nome: "Fernando Alonso" },
      { id: 16, nome: "Lance Stroll" },
      { id: 17, nome: "Pierre Gasly" },
      { id: 18, nome: "Franco Colapinto" },
      { id: 19, nome: "Oliver Bearman" },
      { id: 20, nome: "Esteban Ocon" },
    ],
  },
];

const getLoggedUserId = () => localStorage.getItem("userId");

function Team() {
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showLeagueForm, setShowLeagueForm] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [leagueName, setLeagueName] = useState("");
  const [message, setMessage] = useState("");

  const [pilotiSelezionati, setPilotiSelezionati] = useState([
    null,
    null,
    null,
  ]);

  const [createdTeam, setCreatedTeam] = useState(null);
  const [createdLeague, setCreatedLeague] = useState(null);

  const [legaCreataId, setLegaCreataId] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteUsername, setInviteUsername] = useState("");

  useEffect(() => {
    const userId = getLoggedUserId();

    // Recupera squadra (mappa piloti -> pilotiSelezionati)
    fetch(`http://localhost:3002/api/team/utente/${userId}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCreatedTeam({
            name: data[0].name,
            pilotiSelezionati: data[0].piloti, // <-- qui mappo corretto
          });
        }
      });

    // Recupera lega
    fetch(`http://localhost:3002/api/lega/utente/${userId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.name) {
          setCreatedLeague({
            name: data.name,
            id: data.id,
            codiceInvito: data.codiceInvito,
          });
          setLegaCreataId(data.id);
        }
      });
  }, []);

  const onPilotaFasciaToggle = (fasciaIdx, pilotaId) => {
    setPilotiSelezionati((prev) => {
      const nuovi = [...prev];
      nuovi[fasciaIdx] = pilotaId;
      return nuovi;
    });
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    const loggedUserId = Number(getLoggedUserId());
    if (pilotiSelezionati.some((x) => x === null)) {
      setMessage("Devi scegliere un pilota per ogni fascia!");
      return;
    }
    const res = await fetch("http://localhost:3002/api/team/creazione", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: teamName,
        presidentId: loggedUserId,
        piloti: pilotiSelezionati,
        legaId: legaCreataId,
      }),
    });
    if (res.ok) {
      const created = await res.json();
      setMessage("Squadra creata: " + created.name);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setCreatedTeam({
        name: created.name,
        pilotiSelezionati: [...pilotiSelezionati],
      });
    } else {
      setMessage(
        "Errore nella creazione della squadra: devi prima essere in una lega"
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    setTeamName("");
    setPilotiSelezionati([null, null, null]);
    setShowTeamForm(false);
  };

  const handleCreateLeague = async (e) => {
    e.preventDefault();
    const loggedUserId = getLoggedUserId();
    const res = await fetch("http://localhost:3002/api/lega/creazione", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: leagueName,
        presidentId: loggedUserId,
      }),
    });
    if (res.ok) {
      const createdLeagueApi = await res.json();
      setLegaCreataId(createdLeagueApi.id);
      setMessage(
        "Lega creata: " +
          createdLeagueApi.name +
          " | Codice invito: " +
          createdLeagueApi.codiceInvito
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setShowInviteForm(true);
      setCreatedLeague({
        name: createdLeagueApi.name,
        id: createdLeagueApi.id,
        codiceInvito: createdLeagueApi.codiceInvito,
      });
    } else {
      setMessage("Errore nella creazione della lega");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setCreatedLeague(null);
      setLegaCreataId(null);
      setShowInviteForm(false);
    }
    setLeagueName("");
    setShowLeagueForm(false);
  };

  const handleInvitePlayer = async (e) => {
    e.preventDefault();
    if (!legaCreataId) {
      setMessage("Crea prima una lega!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    const res = await fetch("http://localhost:3002/api/lega/invito", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        legaId: legaCreataId,
        username: inviteUsername,
        email: inviteEmail,
      }),
    });
    if (res.ok) {
      setMessage("Giocatore invitato!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setMessage("Errore nell'invito");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    setInviteEmail("");
    setInviteUsername("");
    setShowInviteForm(false);
  };

  const handleDeleteTeam = async () => {
    const loggedUserId = Number(getLoggedUserId());
    if (isNaN(loggedUserId)) {
      setMessage("ID utente non valido");
      return;
    }
    const res = await fetch(
      `http://localhost:3002/api/team/elimina/${createdTeam.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.ok) {
      setMessage("Squadra eliminata");
      setCreatedTeam(null);
    } else {
      setMessage("Errore nell'eliminazione della squadra");
    }
  };

  const handleDeleteLeague = async () => {
    const loggedUserId = Number(getLoggedUserId());
    if (isNaN(loggedUserId)) {
      setMessage("ID utente non valido");
      return;
    }
    const res = await fetch(
      `http://localhost:3002/api/lega/elimina/${createdLeague.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.ok) {
      setMessage("Lega eliminata");
      setCreatedLeague(null);
      setLegaCreataId(null);
    } else {
      setMessage("Errore nell'eliminazione della lega");
    }
  };

  return (
    <>
      <div className="container py-5 text-center">
        <Row className="g-4 mb-5">
          {/* ----------- CARD SQUADRA -------------- */}
          <Col xs={12} sm={12} lg={5}>
            <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
              <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <h2>Il mio team</h2>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-team">Crea Team</Tooltip>}
                  >
                    <Button
                      variant="link"
                      onClick={() => setShowTeamForm((val) => !val)}
                      disabled={!!createdTeam}
                    >
                      <i className="bi bi-plus-lg text-light fs-3"></i>
                    </Button>
                  </OverlayTrigger>
                </div>
                {/* Form creazione squadra */}
                {showTeamForm && (
                  <Form onSubmit={handleCreateTeam} className="mt-3">
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Nome squadra"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                      />
                      <Button
                        type="submit"
                        variant="danger"
                        disabled={!teamName}
                      >
                        Crea
                      </Button>
                    </InputGroup>
                    {/* Selezione piloti (un radio per fascia) */}
                    <div className="mb-3 d-flex flex-column">
                      <p>
                        <b>Scegli un pilota per ogni fascia:</b>
                      </p>
                      {fascePiloti.map((fasciaObj, fasciaIdx) => (
                        <div
                          key={fasciaObj.fascia}
                          style={{ marginBottom: "8px" }}
                        >
                          <h6
                            style={{
                              fontWeight: "bold",
                              marginBottom: "5px",
                              color: "#ff2f2fff",
                            }}
                          >
                            {fasciaObj.fascia}
                          </h6>
                          <div className="d-flex flex-wrap justify-content-center">
                            {fasciaObj.piloti.map((pilota) => (
                              <Form.Check
                                key={pilota.id}
                                type="radio"
                                name={`fascia-${fasciaIdx}`}
                                label={pilota.nome}
                                checked={
                                  pilotiSelezionati[fasciaIdx] === pilota.id
                                }
                                onChange={() =>
                                  onPilotaFasciaToggle(fasciaIdx, pilota.id)
                                }
                                style={{ minWidth: "170px" }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Form>
                )}
                {/* Visualizzazione squadra creata */}
                {createdTeam && (
                  <div className="mt-3">
                    <h5 style={{ fontWeight: "bold", color: "#d40202ff" }}>
                      {createdTeam.name}
                    </h5>
                    <h6
                      className="mt-2"
                      style={{ color: "#ffffffff", fontWeight: "bold" }}
                    >
                      Piloti scelti:
                    </h6>
                    {Array.isArray(createdTeam.pilotiSelezionati) &&
                      createdTeam.pilotiSelezionati.map((id, idx) => {
                        const pilota = fascePiloti[idx].piloti.find(
                          (p) => p.id === id
                        );
                        return (
                          <div
                            key={id}
                            style={{ fontSize: "1em", marginBottom: "4px" }}
                          >
                            <span style={{ fontWeight: "bold" }}>
                              {fascePiloti[idx].fascia}:
                            </span>{" "}
                            {pilota ? pilota.nome : "Non selezionato"}
                          </div>
                        );
                      })}
                    <Button
                      onSubmit={handleDeleteTeam}
                      variant="outline-danger"
                      className="mt-3"
                      onClick={() => {
                        setCreatedTeam(null);
                        setTeamName("");
                        setPilotiSelezionati([null, null, null]);
                        setShowTeamForm(false);
                      }}
                    >
                      Elimina squadra
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          {/* ----------- CARD LEGA -------------- */}
          <Col xs={12} sm={12} lg={7}>
            <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
              <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <h2>La mia lega</h2>
                  {/* Bottone per mostrare/nascondere il form lega */}
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-league">Crea Lega</Tooltip>}
                  >
                    <Button
                      variant="link"
                      onClick={() => setShowLeagueForm((val) => !val)}
                      disabled={!!createdLeague}
                    >
                      <i className="bi bi-plus-lg text-light fs-3"></i>
                    </Button>
                  </OverlayTrigger>
                  {/* Bottone invito giocatori */}
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-invita">Invita Giocatori</Tooltip>
                    }
                  >
                    <Button
                      variant="link"
                      onClick={() => setShowInviteForm((val) => !val)}
                      disabled={!createdLeague}
                    >
                      <i className="bi bi-person-fill-add text-light fs-4"></i>
                    </Button>
                  </OverlayTrigger>
                </div>
                {/* Form creazione lega */}
                {showLeagueForm && (
                  <Form onSubmit={handleCreateLeague} className="mt-3">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Nome lega"
                        value={leagueName}
                        onChange={(e) => setLeagueName(e.target.value)}
                        required
                      />
                      <Button
                        type="submit"
                        variant="danger"
                        disabled={!leagueName}
                      >
                        Crea
                      </Button>
                    </InputGroup>
                  </Form>
                )}
                {/* Visualizzazione lega creata */}
                {createdLeague && (
                  <div className="mt-3">
                    <h5 style={{ fontWeight: "bold", color: "#d40202ff" }}>
                      {createdLeague.name}
                    </h5>
                    {createdLeague.codiceInvito && (
                      <div style={{ margin: "10px 0" }}>
                        <span>
                          Codice invito: <b>{createdLeague.codiceInvito}</b>
                        </span>
                      </div>
                    )}
                    <Button
                      onSubmit={handleDeleteLeague}
                      variant="outline-danger"
                      className="mt-3"
                      onClick={() => {
                        setCreatedLeague(null);
                        setLeagueName("");
                        setLegaCreataId(null);
                        setShowLeagueForm(false);
                        setShowInviteForm(false);
                      }}
                    >
                      Elimina/Esci dalla lega
                    </Button>
                  </div>
                )}
                {/* Form invito giocatore (solo se hai una lega) */}
                {showInviteForm && createdLeague && (
                  <Form onSubmit={handleInvitePlayer} className="mt-3">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Username giocatore"
                        value={inviteUsername}
                        onChange={(e) => setInviteUsername(e.target.value)}
                        required
                      />
                      <Form.Control
                        type="email"
                        placeholder="Email giocatore"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                      />
                      <Button type="submit" variant="primary">
                        Invita
                      </Button>
                    </InputGroup>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Messaggi di feedback */}
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </>
  );
}

export default Team;

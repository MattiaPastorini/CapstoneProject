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
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Classifica piloti reale
const classificaPiloti = {
  piloti: [
    { nome: "Lando Norris", punti: 390 },
    { nome: "Oscar Piastri", punti: 366 },
    { nome: "Max Verstappen", punti: 366 },
    { nome: "George Russell", punti: 294 },
    { nome: "Charles Leclerc", punti: 226 },
    { nome: "Lewis Hamilton", punti: 152 },
    { nome: "Andrea Kimi Antonelli", punti: 137 },
    { nome: "Alexander Albon", punti: 73 },
    { nome: "Nico Hulkenberg", punti: 49 },
    { nome: "Isack Hadjar", punti: 51 },
    { nome: "Fernando Alonso", punti: 40 },
    { nome: "Oliver Bearman", punti: 41 },
    { nome: "Carlos Sainz", punti: 48 },
    { nome: "Liam Lawson", punti: 36 },
    { nome: "Lance Stroll", punti: 32 },
    { nome: "Esteban Ocon", punti: 32 },
    { nome: "Yuki Tsunoda", punti: 28 },
    { nome: "Pierre Gasly", punti: 22 },
    { nome: "Gabriel Bortoleto", punti: 19 },
    { nome: "Franco Colapinto", punti: 0 },
  ],
};
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
function calcolaPuntiSquadra(pilotiSelezionati, classificaPiloti) {
  if (!pilotiSelezionati || !Array.isArray(pilotiSelezionati)) return 0;
  if (!classificaPiloti || !classificaPiloti.piloti) return 0;
  return pilotiSelezionati.reduce((tot, pilotaId) => {
    if (pilotaId == null) return tot;
    const pilotaObj = fascePiloti
      .flatMap((f) => f.piloti)
      .find((p) => p.id === pilotaId);
    if (!pilotaObj) return tot;
    const pilotaClassifica = classificaPiloti.piloti.find(
      (p) => p.nome === pilotaObj.nome
    );
    return tot + (pilotaClassifica ? pilotaClassifica.punti : 0);
  }, 0);
}
const getLoggedUserId = () => localStorage.getItem("userId");
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
});

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
  const [classificaLega, setClassificaLega] = useState([]);
  const [bonusMalus, setBonusMalus] = useState({});

  const fetchClassifica = () => {
    if (createdLeague && createdLeague.id) {
      fetch(`http://localhost:3002/api/lega/classifica/${createdLeague.id}`, {
        headers: authHeaders(),
        credentials: "include",
      })
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => {
          setClassificaLega(data);
          if (Array.isArray(data)) {
            const bm = data.reduce((acc, t) => {
              acc[t.teamId] = t.bonusMalus ?? 0;
              return acc;
            }, {});
            setBonusMalus(bm);
          }
        });
    }
  };

  const handleUpdateBonusMalus = (teamId, bonus) => {
    const team = classificaLega.find((t) => t.teamId === teamId);
    const puntiPiloti = calcolaPuntiSquadra(team.piloti, classificaPiloti);
    const puntiTotali = puntiPiloti + bonus;
    fetch(`http://localhost:3002/api/team/${teamId}/totale`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ puntiTotali, bonusMalus: bonus }),
    })
      .then((res) => res.json())
      .then(() => {
        setBonusMalus((prev) => ({ ...prev, [teamId]: bonus }));
        fetchClassifica();
      });
  };

  useEffect(() => {
    const userId = getLoggedUserId();
    if (!userId) return;
    fetch(`http://localhost:3002/api/team/utente/${userId}`, {
      headers: authHeaders(),
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCreatedTeam(data[0]);
        }
      });
    fetch(`http://localhost:3002/api/lega/utente/${userId}`, {
      headers: authHeaders(),
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.name) {
          setCreatedLeague(data);
          setLegaCreataId(data.id);
        }
      });
  }, []);

  useEffect(() => {
    let timer;
    fetchClassifica();
    timer = setInterval(fetchClassifica, 15000);
    return () => clearInterval(timer);
  }, [createdLeague?.id]);

  const onPilotaFasciaToggle = (fasciaIdx, pilotaId) => {
    setPilotiSelezionati((prev) => {
      const nuovi = [...prev];
      nuovi[fasciaIdx] = pilotaId;
      return nuovi;
    });
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    const loggedUserId = Number(getLoggedUserId());
    fetch("http://localhost:3002/api/team/creazione", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        name: teamName,
        presidentId: loggedUserId,
        piloti: pilotiSelezionati,
        legaId: legaCreataId,
      }),
    })
      .then((res) => res.json())
      .then((_data) => {
        setShowTeamForm(false);
        setTeamName("");
        setPilotiSelezionati([null, null, null]);
        fetchClassifica();
        fetch(`http://localhost:3002/api/team/utente/${loggedUserId}`, {
          headers: authHeaders(),
          credentials: "include",
        })
          .then((res) => res.json())
          .then((teams) => {
            if (Array.isArray(teams) && teams.length > 0) {
              setCreatedTeam(teams[0]);
            }
          });
      })
      .catch((error) => setMessage("Errore creazione team", error));
  };

  const handleCreateLeague = (e) => {
    e.preventDefault();
    const loggedUserId = getLoggedUserId();
    fetch("http://localhost:3002/api/lega/creazione", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        name: leagueName,
        presidentId: loggedUserId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedLeague(data);
        setLegaCreataId(data.id);
      })
      .catch((error) => setMessage("Errore creazione lega", error));
  };

  const handleInvitePlayer = async (e) => {
    e.preventDefault();
    if (!legaCreataId) {
      setMessage("Crea prima una lega!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    const res = await fetch("http://localhost:3002/api/lega/invito", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        legaId: legaCreataId,
        username: inviteUsername,
        email: inviteEmail,
      }),
    });
    if (res.ok) {
      setMessage("Giocatore invitato!");
    } else {
      setMessage("Errore nell'invito");
    }
    setTimeout(() => setMessage(""), 3000);
    setInviteEmail("");
    setInviteUsername("");
    setShowInviteForm(false);
  };

  const handleDeleteTeam = () => {
    if (!createdTeam || !createdTeam.id) {
      setMessage("Errore: squadra non trovata o già eliminata.");
      return;
    }
    fetch(`http://localhost:3002/api/team/elimina/${createdTeam.id}`, {
      method: "DELETE",
      headers: authHeaders(),
    }).then((res) => {
      if (res.ok) {
        setCreatedTeam(null);
        setTeamName("");
        setPilotiSelezionati([null, null, null]);
        setShowTeamForm(false);
        setMessage("Team eliminato!");
      } else {
        setMessage("Errore nell'eliminazione del team.");
      }
    });
  };

  const handleDeleteLeague = () => {
    if (!createdLeague || !createdLeague.id) {
      setMessage("Errore: lega non trovata o già eliminata.");
      return;
    }
    fetch(`http://localhost:3002/api/lega/elimina/${createdLeague.id}`, {
      method: "DELETE",
      headers: authHeaders(),
    }).then((res) => {
      if (res.ok) {
        setCreatedLeague(null);
        setLeagueName("");
        setLegaCreataId(null);
        setShowLeagueForm(false);
        setShowInviteForm(false);
        setMessage("Lega eliminata!");
      } else if (res.status === 500) {
        setMessage(
          "Errore lato server nell'eliminazione della lega. Verifica che la lega non abbia team ancora associati."
        );
      } else {
        setMessage("Errore nell'eliminazione della lega.");
      }
    });
  };

  return (
    <div className="container py-5 text-center">
      <Row className="g-4 mb-5">
        {/* CARD LEGA */}
        <Col xs={12} sm={12} lg={7}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body className="bg-dark text-light rounded-4">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <h2>La mia lega</h2>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Crea Lega</Tooltip>}
                >
                  <Button
                    variant="link"
                    onClick={() => setShowLeagueForm((v) => !v)}
                    disabled={!!createdLeague}
                  >
                    <i className="bi bi-plus-lg text-light fs-3"></i>
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Invita Giocatori</Tooltip>}
                >
                  <Button
                    variant="link"
                    onClick={() => setShowInviteForm((v) => !v)}
                    disabled={!createdLeague}
                  >
                    <i className="bi bi-person-fill-add text-light fs-4"></i>
                  </Button>
                </OverlayTrigger>
              </div>
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
                </div>
              )}
              {createdLeague && classificaLega.length > 0 && (
                <div className="mt-4">
                  <h4 style={{ color: "#fff", fontWeight: "bold" }}>
                    Classifica Lega
                  </h4>
                  <table
                    className="table table-dark table-striped my-3 mx-auto"
                    style={{
                      fontSize: "0.93em",
                      maxWidth: "100%",
                      tableLayout: "fixed",
                    }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "35px" }}>Pos</th>
                        <th style={{ width: "90px" }}>Nome</th>
                        <th
                          className="d-none d-md-table-cell"
                          style={{ width: "90px" }}
                        >
                          Squadra
                        </th>
                        <th
                          className="d-none d-md-table-cell"
                          style={{ width: "60px" }}
                        >
                          Punti
                        </th>
                        <th
                          className="d-none d-md-table-cell"
                          style={{ width: "75px" }}
                        >
                          Bonus
                        </th>
                        <th style={{ width: "85px" }}>Totale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...classificaLega]
                        .sort(
                          (a, b) =>
                            (typeof b.puntiTotali === "number"
                              ? b.puntiTotali
                              : calcolaPuntiSquadra(
                                  b.piloti,
                                  classificaPiloti
                                ) + (bonusMalus[b.teamId] ?? 0)) -
                            (typeof a.puntiTotali === "number"
                              ? a.puntiTotali
                              : calcolaPuntiSquadra(
                                  a.piloti,
                                  classificaPiloti
                                ) + (bonusMalus[a.teamId] ?? 0))
                        )
                        .map((entry, idx) => (
                          <tr key={entry.teamId || entry.nome + entry.squadra}>
                            <td>{idx + 1}</td>
                            <td className="text-nowrap">{entry.nome}</td>
                            <td className="text-nowrap d-none d-md-table-cell">
                              {entry.squadra}
                            </td>
                            <td
                              className="d-none d-md-table-cell"
                              style={{ fontWeight: "bold", color: "#ffd200" }}
                            >
                              {Array.isArray(entry.piloti)
                                ? calcolaPuntiSquadra(
                                    entry.piloti,
                                    classificaPiloti
                                  )
                                : "—"}
                            </td>
                            <td className="d-none d-md-table-cell">
                              <input
                                type="number"
                                value={
                                  bonusMalus[entry.teamId] ??
                                  entry.bonusMalus ??
                                  0
                                }
                                onChange={(e) =>
                                  handleUpdateBonusMalus(
                                    entry.teamId,
                                    Number(e.target.value)
                                  )
                                }
                                style={{
                                  width: 50,
                                  textAlign: "center",
                                  fontSize: "0.95em",
                                  padding: "2px 5px",
                                }}
                              />
                            </td>
                            <td
                              style={{ fontWeight: "bold", color: "#00ff80" }}
                            >
                              {typeof entry.puntiTotali === "number"
                                ? entry.puntiTotali
                                : calcolaPuntiSquadra(
                                    entry.piloti,
                                    classificaPiloti
                                  ) + (bonusMalus[entry.teamId] ?? 0)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
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
                    <Button type="submit" variant="outline-danger">
                      Invita
                    </Button>
                  </InputGroup>
                </Form>
              )}
              {createdLeague && (
                <div className="d-flex justify-content-center mt-4">
                  <Button
                    variant="outline-danger"
                    size="lg"
                    onClick={handleDeleteLeague}
                  >
                    Elimina/Esci dalla lega
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* CARD TEAM */}
        <Col xs={12} sm={12} lg={5}>
          <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
            <Card.Body className="bg-dark text-light rounded-4">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <h2>Il mio team</h2>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Crea Team</Tooltip>}
                >
                  <Button
                    variant="link"
                    onClick={() => setShowTeamForm((v) => !v)}
                    disabled={!!createdTeam}
                  >
                    <i className="bi bi-plus-lg text-light fs-3"></i>
                  </Button>
                </OverlayTrigger>
              </div>
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
                    <Button type="submit" variant="danger" disabled={!teamName}>
                      Crea
                    </Button>
                  </InputGroup>
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
                  {Array.isArray(createdTeam.piloti) &&
                    createdTeam.piloti.map((id, idx) => {
                      const pilota = fascePiloti[idx].piloti.find(
                        (p) => p.id === id
                      );
                      return (
                        <div
                          key={id}
                          style={{ fontSize: "1.2em", marginBottom: "4px" }}
                        >
                          <span
                            style={{
                              fontWeight: "bold",
                              fontSize: "1.2em",
                            }}
                          >
                            {fascePiloti[idx].fascia}: <br />
                          </span>
                          {pilota ? pilota.nome : "Non selezionato"}
                        </div>
                      );
                    })}
                  <div
                    className="mt-3"
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3em",
                      color: "#ffd200",
                    }}
                  >
                    Punti squadra:{" "}
                    {calcolaPuntiSquadra(createdTeam.piloti, classificaPiloti)}
                  </div>
                  <Button
                    variant="outline-danger"
                    className="mt-3"
                    onClick={handleDeleteTeam}
                  >
                    Elimina squadra
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* PATCH: Card squadre altri partecipanti della lega */}
      {createdLeague && classificaLega.length > 1 && (
        <div className="mt-5">
          <h3 style={{ fontWeight: "bold", color: "#fffffdff" }}>
            Squadre degli altri partecipanti
          </h3>
          <Row className="justify-content-center mt-4 g-4">
            {classificaLega
              .filter(
                (entry) => String(entry.teamId) !== String(createdTeam?.id)
              )
              .map((entry) => (
                <Col xs={12} md={6} lg={4} key={entry.teamId || entry.nome}>
                  <Card className="shadow-sm rounded-4 bg-dark text-light mb-3">
                    <Card.Body>
                      <h5
                        className="mb-2"
                        style={{ color: "#d40202ff", fontWeight: "bold" }}
                      >
                        {entry.squadra || "Squadra senza nome"}
                      </h5>
                      <p
                        className="mb-1"
                        style={{ fontWeight: "bold", color: "#fff" }}
                      >
                        Presidente:{" "}
                        <span style={{ color: "#ffd200" }}>{entry.nome}</span>
                      </p>
                      <div className="mb-2">
                        <b>Piloti scelti:</b>
                        {Array.isArray(entry.piloti) &&
                        entry.piloti.length > 0 ? (
                          <>
                            {entry.piloti.map((id, idx) => {
                              const pilota = fascePiloti[idx]?.piloti.find(
                                (p) => p.id === id
                              );
                              return (
                                <div
                                  key={id}
                                  style={{
                                    fontSize: "0.98em",
                                    marginBottom: 3,
                                  }}
                                >
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      color: "#ff2f2fff",
                                    }}
                                  >
                                    {fascePiloti[idx]?.fascia}:
                                  </span>{" "}
                                  {pilota ? pilota.nome : "Non selezionato"}
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <div>Nessun pilota selezionato</div>
                        )}
                      </div>
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "#ffd200",
                          marginTop: "5px",
                        }}
                      >
                        Punti squadra:{" "}
                        {calcolaPuntiSquadra(entry.piloti, classificaPiloti)}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      )}

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default Team;

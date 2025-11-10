import { useState } from "react";
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

// Lista piloti di esempio (puoi caricarla da API)
const pilotiDisponibili = [
  { id: 1, nome: "Leclerc" },
  { id: 2, nome: "Hamilton" },
  { id: 3, nome: "Verstappen" },
  { id: 4, nome: "Norris" },
  { id: 5, nome: "Sainz" },
  { id: 6, nome: "Alonso" },
  // ... aggiungi altri
];

// Esempio per prendere l'id utente loggato (da localStorage)
const getLoggedUserId = () => localStorage.getItem("userId");

function Team() {
  // Stato gestione UI e campi di input
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showLeagueForm, setShowLeagueForm] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [leagueName, setLeagueName] = useState("");
  const [message, setMessage] = useState("");

  // Stato per la selezione di massimo 3 piloti
  const [pilotiSelezionati, setPilotiSelezionati] = useState([]);

  // Stato id lega creata, utile per invitare dopo creazione
  const [legaCreataId, setLegaCreataId] = useState(null);

  // Stato campi invito giocatori
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteUsername, setInviteUsername] = useState("");

  // Gestione selezione/deselezione piloti (massimo 3)
  const onPilotaToggle = (id) => {
    setPilotiSelezionati((prev) => {
      if (prev.includes(id)) return prev.filter((pid) => pid !== id);
      if (prev.length < 3) return [...prev, id];
      return prev;
    });
  };

  // Crea squadra (invia anche i 3 piloti selezionati)
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    const loggedUserId = getLoggedUserId();
    // Puoi validare lato frontend che siano esattamente 3!
    if (pilotiSelezionati.length !== 3) {
      setMessage("Seleziona esattamente 3 piloti.");
      return;
    }
    // Prepara la chiamata
    const res = await fetch("http://localhost:3002/api/team/creazione", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: teamName,
        presidentId: loggedUserId,
        // Backend: aggiungi supporto per lista piloti se serve!
        piloti: pilotiSelezionati,
      }),
    });
    if (res.ok) {
      const createdTeam = await res.json();
      setMessage("Squadra creata: " + createdTeam.name);
    } else {
      setMessage("Errore nella creazione della squadra");
    }
    setTeamName("");
    setPilotiSelezionati([]);
    setShowTeamForm(false);
  };

  // Crea lega, salva l'id restutito per poter invitare dopo
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
      const createdLeague = await res.json();
      setLegaCreataId(createdLeague.id); // ID della lega appena creata
      setMessage(
        "Lega creata: " +
          createdLeague.name +
          " | Codice invito: " +
          createdLeague.codiceInvito
      );
      setShowInviteForm(true); // mostra form invito dopo creazione
    } else {
      setMessage("Errore nella creazione della lega");
      setLegaCreataId(null);
      setShowInviteForm(false);
    }
    setLeagueName("");
    setShowLeagueForm(false);
  };

  // Invita giocatore nella lega creata
  const handleInvitePlayer = async (e) => {
    e.preventDefault();
    if (!legaCreataId) {
      setMessage("Crea prima una lega!");
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
    if (res.ok) setMessage("Giocatore invitato!");
    else setMessage("Errore nell'invito");
    setInviteEmail("");
    setInviteUsername("");
    setShowInviteForm(false);
  };

  return (
    <>
      <div className="container py-5 text-center">
        <Row className="g-4 mb-5">
          {/* Colonna TEAM */}
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
                      onClick={() => setShowTeamForm((prev) => !prev)}
                    >
                      <i className="bi bi-plus-lg text-light fs-3"></i>
                    </Button>
                  </OverlayTrigger>
                </div>
                {/* Form per creare la squadra con scelta piloti */}
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
                      <Button type="submit" variant="success">
                        Crea
                      </Button>
                    </InputGroup>
                    {/* Selezione piloti (fino a 3) */}
                    <div className="mb-3">
                      <p>Scegli 3 piloti:</p>
                      {pilotiDisponibili.map((pilota) => (
                        <Form.Check
                          key={pilota.id}
                          type="checkbox"
                          inline
                          label={pilota.nome}
                          checked={pilotiSelezionati.includes(pilota.id)}
                          onChange={() => onPilotaToggle(pilota.id)}
                          disabled={
                            !pilotiSelezionati.includes(pilota.id) &&
                            pilotiSelezionati.length >= 3
                          }
                        />
                      ))}
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Colonna LEGA */}
          <Col xs={12} sm={12} lg={7}>
            <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
              <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <h2>Classifica Lega</h2>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-league">Crea Lega</Tooltip>}
                  >
                    <Button
                      variant="link"
                      onClick={() => setShowLeagueForm((prev) => !prev)}
                    >
                      <i className="bi bi-plus-lg text-light fs-3"></i>
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-invita">Invita Giocatori</Tooltip>
                    }
                  >
                    {/* Bottone per mostrare il form invito (solo se la lega è stata creata) */}
                    <Button
                      variant="link"
                      onClick={() => setShowInviteForm((prev) => !prev)}
                      disabled={!legaCreataId}
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
                      <Button type="submit" variant="warning">
                        Crea
                      </Button>
                    </InputGroup>
                  </Form>
                )}
                {/* Form invito giocatori, appare solo se showInviteForm è true e la lega è stata creata */}
                {showInviteForm && legaCreataId && (
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
        {/* Mostra messaggio di feedback sotto */}
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </>
  );
}
export default Team;

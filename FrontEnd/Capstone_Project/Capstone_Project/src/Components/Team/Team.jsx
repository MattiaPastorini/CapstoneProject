// import { useState, useEffect } from "react";
// import {
//   Card,
//   Row,
//   Col,
//   OverlayTrigger,
//   Tooltip,
//   Button,
//   Form,
//   InputGroup,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const fascePiloti = [
//   {
//     fascia: "PRIMA FASCIA",
//     piloti: [
//       { id: 1, nome: "Max Verstappen" },
//       { id: 2, nome: "Yuki Tsunoda" },
//       { id: 3, nome: "Charles Leclerc" },
//       { id: 4, nome: "Lewis Hamilton" },
//       { id: 5, nome: "Lando Norris" },
//       { id: 6, nome: "Oscar Piastri" },
//       { id: 7, nome: "George Russell" },
//       { id: 8, nome: "Kimi Antonelli" },
//     ],
//   },
//   {
//     fascia: "SECONDA FASCIA",
//     piloti: [
//       { id: 9, nome: "Liam Lawson" },
//       { id: 10, nome: "Isack Hadjar" },
//       { id: 11, nome: "Carlos Sainz" },
//       { id: 12, nome: "Alexander Albon" },
//       { id: 13, nome: "Nico Hulkenberg" },
//       { id: 14, nome: "Gabriel Bortoleto" },
//     ],
//   },
//   {
//     fascia: "TERZA FASCIA",
//     piloti: [
//       { id: 15, nome: "Fernando Alonso" },
//       { id: 16, nome: "Lance Stroll" },
//       { id: 17, nome: "Pierre Gasly" },
//       { id: 18, nome: "Franco Colapinto" },
//       { id: 19, nome: "Oliver Bearman" },
//       { id: 20, nome: "Esteban Ocon" },
//     ],
//   },
// ];

// const getLoggedUserId = () => localStorage.getItem("userId");

// const authHeaders = () => ({
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
// });

// function Team() {
//   const [showTeamForm, setShowTeamForm] = useState(false);
//   const [showLeagueForm, setShowLeagueForm] = useState(false);
//   const [showInviteForm, setShowInviteForm] = useState(false);

//   const [teamName, setTeamName] = useState("");
//   const [leagueName, setLeagueName] = useState("");
//   const [message, setMessage] = useState("");

//   const [pilotiSelezionati, setPilotiSelezionati] = useState([
//     null,
//     null,
//     null,
//   ]);

//   const [createdTeam, setCreatedTeam] = useState(null);
//   const [createdLeague, setCreatedLeague] = useState(null);
//   const [legaCreataId, setLegaCreataId] = useState(null);
//   const [inviteEmail, setInviteEmail] = useState("");
//   const [inviteUsername, setInviteUsername] = useState("");

//   useEffect(() => {
//     const userId = getLoggedUserId();

//     // Recupera squadra
//     fetch(`http://localhost:3002/api/team/utente/${userId}`, {
//       headers: authHeaders(),
//       credentials: "include",
//     })
//       .then((res) => (res.ok ? res.json() : []))
//       .then((data) => {
//         if (Array.isArray(data) && data.length > 0) {
//           setCreatedTeam({
//             name: data[0].name,
//             pilotiSelezionati: data[0].piloti,
//           });
//         }
//       });

//     // Recupera lega
//     fetch(`http://localhost:3002/api/lega/utente/${userId}`, {
//       headers: authHeaders(),
//       credentials: "include",
//     })
//       .then((res) => (res.ok ? res.json() : null))
//       .then((data) => {
//         if (data && data.name) {
//           setCreatedLeague({
//             name: data.name,
//             id: data.id,
//             codiceInvito: data.codiceInvito,
//           });
//           setLegaCreataId(data.id);
//         }
//       });
//   }, [createdLeague]);

//   const onPilotaFasciaToggle = (fasciaIdx, pilotaId) => {
//     setPilotiSelezionati((prev) => {
//       const nuovi = [...prev];
//       nuovi[fasciaIdx] = pilotaId;
//       return nuovi;
//     });
//   };

//   const handleCreateTeam = (e) => {
//     e.preventDefault();
//     const loggedUserId = Number(getLoggedUserId());
//     fetch("http://localhost:3002/api/team/creazione", {
//       method: "POST",
//       headers: authHeaders(),
//       body: JSON.stringify({
//         name: teamName,
//         presidentId: loggedUserId,
//         piloti: pilotiSelezionati,
//         legaId: legaCreataId,
//       }),
//     })
//       .then((res) => {
//         if (res.ok) {
//           console.log("Team creato");
//           return res.json();
//         } else {
//           throw new Error("Fetch non riuscita");
//         }
//       })
//       .then((data) => {
//         setCreatedTeam(data.id);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleCreateLeague = (e) => {
//     e.preventDefault();
//     const loggedUserId = getLoggedUserId();
//     fetch("http://localhost:3002/api/lega/creazione", {
//       method: "POST",
//       headers: authHeaders(),
//       body: JSON.stringify({
//         name: leagueName,
//         presidentId: loggedUserId,
//       }),
//     })
//       .then((res) => {
//         if (res.ok) {
//           console.log("Lega creata");
//           return res.json();
//         } else {
//           throw new Error("Fetch non riuscita");
//         }
//       })
//       .then((data) => {
//         setCreatedLeague(data.id);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleInvitePlayer = async (e) => {
//     e.preventDefault();
//     if (!legaCreataId) {
//       setMessage("Crea prima una lega!");
//       setTimeout(() => {
//         setMessage("");
//       }, 3000);
//       return;
//     }
//     const res = await fetch("http://localhost:3002/api/lega/invito", {
//       method: "POST",
//       headers: authHeaders(),
//       body: JSON.stringify({
//         legaId: legaCreataId,
//         username: inviteUsername,
//         email: inviteEmail,
//       }),
//     });
//     if (res.ok) {
//       setMessage("Giocatore invitato!");
//       setTimeout(() => {
//         setMessage("");
//       }, 3000);
//     } else {
//       setMessage("Errore nell'invito");
//       setTimeout(() => {
//         setMessage("");
//       }, 3000);
//     }
//     setInviteEmail("");
//     setInviteUsername("");
//     setShowInviteForm(false);
//   };

//   const handleDeleteTeam = () => {
//     fetch(`http://localhost:3002/api/team/elimina/${createdTeam.id}`, {
//       method: "DELETE",
//       headers: authHeaders(),
//     }).then((res) => {
//       if (res.ok) {
//         setCreatedTeam(null);
//         setTeamName("");
//         setPilotiSelezionati([null, null, null]);
//         setShowTeamForm(false);
//         console.log("Team eliminato");
//       } else {
//         throw new Error("Impossibile eliminare!");
//       }
//     });
//   };

//   const handleDeleteLeague = () => {
//     fetch(`http://localhost:3002/api/lega/elimina/${createdLeague.id}`, {
//       method: "DELETE",
//       headers: authHeaders(),
//     })
//       .then((res) => {
//         if (res.ok) {
//           setCreatedLeague(null);
//           setLeagueName("");
//           setLegaCreataId(null);
//           setShowLeagueForm(false);
//           setShowInviteForm(false);
//           console.log("Lega eliminata");
//         } else {
//           throw new Error("Impossibile eliminare!");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <>
//       <div className="container py-5 text-center">
//         <Row className="g-4 mb-5">
//           {/* ----------- CARD LEGA -------------- */}
//           <Col xs={12} sm={12} lg={7}>
//             <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
//               <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
//                 <div className="d-flex justify-content-center align-items-center gap-2">
//                   <h2>La mia lega</h2>
//                   {/* Bottone per mostrare/nascondere il form lega */}
//                   <OverlayTrigger
//                     placement="top"
//                     overlay={<Tooltip id="tooltip-league">Crea Lega</Tooltip>}
//                   >
//                     <Button
//                       variant="link"
//                       onClick={() => setShowLeagueForm((val) => !val)}
//                       disabled={!!createdLeague}
//                     >
//                       <i className="bi bi-plus-lg text-light fs-3"></i>
//                     </Button>
//                   </OverlayTrigger>
//                   {/* Bottone invito giocatori */}
//                   <OverlayTrigger
//                     placement="top"
//                     overlay={
//                       <Tooltip id="tooltip-invita">Invita Giocatori</Tooltip>
//                     }
//                   >
//                     <Button
//                       variant="link"
//                       onClick={() => setShowInviteForm((val) => !val)}
//                       disabled={!createdLeague}
//                     >
//                       <i className="bi bi-person-fill-add text-light fs-4"></i>
//                     </Button>
//                   </OverlayTrigger>
//                 </div>
//                 {/* Form creazione lega */}
//                 {showLeagueForm && (
//                   <Form onSubmit={handleCreateLeague} className="mt-3">
//                     <InputGroup>
//                       <Form.Control
//                         type="text"
//                         placeholder="Nome lega"
//                         value={leagueName}
//                         onChange={(e) => setLeagueName(e.target.value)}
//                         required
//                       />
//                       <Button
//                         type="submit"
//                         variant="danger"
//                         disabled={!leagueName}
//                       >
//                         Crea
//                       </Button>
//                     </InputGroup>
//                   </Form>
//                 )}
//                 {/* Visualizzazione lega creata */}
//                 {createdLeague && (
//                   <div className="mt-3">
//                     <h5 style={{ fontWeight: "bold", color: "#d40202ff" }}>
//                       {createdLeague.name}
//                     </h5>
//                     {createdLeague.codiceInvito && (
//                       <div style={{ margin: "10px 0" }}>
//                         <span>
//                           Codice invito: <b>{createdLeague.codiceInvito}</b>
//                         </span>
//                       </div>
//                     )}
//                     <Button
//                       variant="outline-danger"
//                       className="mt-3"
//                       onClick={() => {
//                         handleDeleteLeague();
//                       }}
//                     >
//                       Elimina/Esci dalla lega
//                     </Button>
//                   </div>
//                 )}
//                 {/* Form invito giocatore (solo se hai una lega) */}
//                 {showInviteForm && createdLeague && (
//                   <Form onSubmit={handleInvitePlayer} className="mt-3">
//                     <InputGroup>
//                       <Form.Control
//                         type="text"
//                         placeholder="Username giocatore"
//                         value={inviteUsername}
//                         onChange={(e) => setInviteUsername(e.target.value)}
//                         required
//                       />
//                       <Form.Control
//                         type="email"
//                         placeholder="Email giocatore"
//                         value={inviteEmail}
//                         onChange={(e) => setInviteEmail(e.target.value)}
//                       />
//                       <Button type="submit" variant="primary">
//                         Invita
//                       </Button>
//                     </InputGroup>
//                   </Form>
//                 )}
//               </Card.Body>
//             </Card>
//           </Col>
//           {/* ----------- CARD SQUADRA -------------- */}
//           <Col xs={12} sm={12} lg={5}>
//             <Card className="h-100 shadow-sm d-flex justify-content-center rounded-4 bg-transparent">
//               <Card.Body className="bg-dark text-light text-decoration-none rounded-4">
//                 <div className="d-flex justify-content-center align-items-center gap-2">
//                   <h2>Il mio team</h2>
//                   <OverlayTrigger
//                     placement="top"
//                     overlay={<Tooltip id="tooltip-team">Crea Team</Tooltip>}
//                   >
//                     <Button
//                       variant="link"
//                       onClick={() => setShowTeamForm((val) => !val)}
//                       disabled={!!createdTeam}
//                     >
//                       <i className="bi bi-plus-lg text-light fs-3"></i>
//                     </Button>
//                   </OverlayTrigger>
//                 </div>
//                 {/* Form creazione squadra */}
//                 {showTeamForm && (
//                   <Form onSubmit={handleCreateTeam} className="mt-3">
//                     <InputGroup className="mb-3">
//                       <Form.Control
//                         type="text"
//                         placeholder="Nome squadra"
//                         value={teamName}
//                         onChange={(e) => setTeamName(e.target.value)}
//                         required
//                       />
//                       <Button
//                         type="submit"
//                         variant="danger"
//                         disabled={!teamName}
//                       >
//                         Crea
//                       </Button>
//                     </InputGroup>
//                     {/* Selezione piloti (un radio per fascia) */}
//                     <div className="mb-3 d-flex flex-column">
//                       <p>
//                         <b>Scegli un pilota per ogni fascia:</b>
//                       </p>
//                       {fascePiloti.map((fasciaObj, fasciaIdx) => (
//                         <div
//                           key={fasciaObj.fascia}
//                           style={{ marginBottom: "8px" }}
//                         >
//                           <h6
//                             style={{
//                               fontWeight: "bold",
//                               marginBottom: "5px",
//                               color: "#ff2f2fff",
//                             }}
//                           >
//                             {fasciaObj.fascia}
//                           </h6>
//                           <div className="d-flex flex-wrap justify-content-center">
//                             {fasciaObj.piloti.map((pilota) => (
//                               <Form.Check
//                                 key={pilota.id}
//                                 type="radio"
//                                 name={`fascia-${fasciaIdx}`}
//                                 label={pilota.nome}
//                                 checked={
//                                   pilotiSelezionati[fasciaIdx] === pilota.id
//                                 }
//                                 onChange={() =>
//                                   onPilotaFasciaToggle(fasciaIdx, pilota.id)
//                                 }
//                                 style={{ minWidth: "170px" }}
//                               />
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </Form>
//                 )}
//                 {/* Visualizzazione squadra creata */}
//                 {createdTeam && (
//                   <div className="mt-3">
//                     <h5 style={{ fontWeight: "bold", color: "#d40202ff" }}>
//                       {createdTeam.name}
//                     </h5>
//                     <h6
//                       className="mt-2"
//                       style={{ color: "#ffffffff", fontWeight: "bold" }}
//                     >
//                       Piloti scelti:
//                     </h6>
//                     {Array.isArray(createdTeam.pilotiSelezionati) &&
//                       createdTeam.pilotiSelezionati.map((id, idx) => {
//                         const pilota = fascePiloti[idx].piloti.find(
//                           (p) => p.id === id
//                         );
//                         return (
//                           <div
//                             key={id}
//                             style={{ fontSize: "1em", marginBottom: "4px" }}
//                           >
//                             <span style={{ fontWeight: "bold" }}>
//                               {fascePiloti[idx].fascia}:
//                             </span>{" "}
//                             {pilota ? pilota.nome : "Non selezionato"}
//                           </div>
//                         );
//                       })}
//                     <Button
//                       variant="outline-danger"
//                       className="mt-3"
//                       onClick={() => {
//                         handleDeleteTeam();
//                       }}
//                     >
//                       Elimina squadra
//                     </Button>
//                   </div>
//                 )}
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//         {/* Messaggi di feedback */}
//         {message && <div className="alert alert-info mt-3">{message}</div>}
//       </div>
//     </>
//   );
// }

// export default Team;
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

// Array fasce piloti statico
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
  const [editPunti, setEditPunti] = useState("");
  const [editingTeamId, setEditingTeamId] = useState(null);

  // Fetch team/lega/classifica all'avvio
  useEffect(() => {
    const userId = getLoggedUserId();
    if (!userId) return;
    // Squadra
    fetch(`http://localhost:3002/api/team/utente/${userId}`, {
      headers: authHeaders(),
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          console.log("Debug: createdTeam ricevuto dal backend:", data[0]);

          setCreatedTeam(data[0]);
        }
      });
    // Lega
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

  // Classifica lega (autoaggiornamento ogni 15s)
  useEffect(() => {
    let timer;
    function fetchClassifica() {
      if (createdLeague && createdLeague.id) {
        fetch(`http://localhost:3002/api/lega/classifica/${createdLeague.id}`, {
          headers: authHeaders(),
          credentials: "include",
        })
          .then((res) => (res.ok ? res.json() : []))
          .then(setClassificaLega);
      }
    }
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

  // CREAZIONE TEAM
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
      .then((data) => {
        setCreatedTeam(data);
      })
      .catch((error) => setMessage("Errore creazione team", error));
  };

  // CREAZIONE LEGA
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

  // INVITO GIOCATORE
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

  // ELIMINA TEAM
  // const handleDeleteTeam = () => {
  //   fetch(`http://localhost:3002/api/team/elimina/${createdTeam.id}`, {
  //     method: "DELETE",
  //     headers: authHeaders(),
  //   }).then((res) => {
  //     if (res.ok) {
  //       setCreatedTeam(null);
  //       setTeamName("");
  //       setPilotiSelezionati([null, null, null]);
  //       setShowTeamForm(false);
  //       setMessage("Team eliminato!");
  //     }
  //   });
  // };
  const handleDeleteTeam = () => {
    // Check robusto su team/id
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

  // ELIMINA LEGA
  // const handleDeleteLeague = () => {
  //   fetch(`http://localhost:3002/api/lega/elimina/${createdLeague.id}`, {
  //     method: "DELETE",
  //     headers: authHeaders(),
  //   }).then((res) => {
  //     if (res.ok) {
  //       setCreatedLeague(null);
  //       setLeagueName("");
  //       setLegaCreataId(null);
  //       setShowLeagueForm(false);
  //       setShowInviteForm(false);
  //       setMessage("Lega eliminata!");
  //     }
  //   });
  // };
  const handleDeleteLeague = () => {
    // Check robusto su lega/id
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

  // -- AGGIORNA PUNTI TEAM dalla classifica --
  const handleEditPunti = (teamId) => {
    setEditingTeamId(teamId);
    setEditPunti("");
  };

  const handleSavePunti = (teamId) => {
    if (!editPunti || isNaN(editPunti)) {
      setMessage("Inserisci un numero valido.");
      return;
    }
    fetch(`http://localhost:3002/api/team/${teamId}/punti`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ punti: parseInt(editPunti) }),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingTeamId(null);
        setEditPunti("");
        setMessage("Punti aggiornati!");
      })
      .catch((error) => setMessage("Errore aggiornamento punti", error));
  };

  // --- RENDER ---
  return (
    <div className="container py-5 text-center">
      <Row className="g-4 mb-5">
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
                    variant="outline-danger"
                    className="mt-3"
                    onClick={handleDeleteLeague}
                  >
                    Elimina/Esci dalla lega
                  </Button>
                </div>
              )}
              {/* MOSTRA CLASSIFICA LEGA F1 */}
              {createdLeague && classificaLega.length > 0 && (
                <div className="mt-4">
                  <h4 style={{ color: "#fff", fontWeight: "bold" }}>
                    Classifica Lega
                  </h4>
                  <table
                    className="table table-dark table-striped my-3 mx-auto"
                    style={{ maxWidth: 500 }}
                  >
                    <thead>
                      <tr>
                        <th>Pos</th>
                        <th>Nome</th>
                        <th>Squadra</th>
                        <th>Punti</th>
                        <th>Azione</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...classificaLega]
                        .sort((a, b) => b.punti - a.punti)
                        .map((entry, idx) => (
                          <tr key={entry.nome + entry.squadra}>
                            <td>{idx + 1}</td>
                            <td>{entry.nome}</td>
                            <td>{entry.squadra}</td>
                            <td>
                              {editingTeamId === entry.teamId ? (
                                <Form.Control
                                  type="number"
                                  value={editPunti}
                                  min={0}
                                  style={{ width: 80, display: "inline-block" }}
                                  onChange={(e) => setEditPunti(e.target.value)}
                                />
                              ) : (
                                entry.punti
                              )}
                            </td>
                            <td>
                              {editingTeamId === entry.teamId ? (
                                <Button
                                  size="sm"
                                  onClick={() => handleSavePunti(entry.teamId)}
                                >
                                  Salva
                                </Button>
                              ) : (
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleEditPunti(entry.teamId)}
                                >
                                  Modifica
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Form invito giocatore */}
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
            </Card.Body>
          </Card>
        </Col>
        {/* ----------- CARD TEAM -------------- */}
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
                  {/* Selezione piloti */}
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
                  {Array.isArray(createdTeam.piloti) &&
                    createdTeam.piloti.map((id, idx) => {
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
      {/* Messaggi di feedback */}
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default Team;

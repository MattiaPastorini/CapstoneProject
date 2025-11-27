export const fascePiloti = [
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

export const classificaPilotiFanta = {
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

// Funzione per il calcolo punti squadra
export function calcolaPuntiSquadra(pilotiSelezionati, classificaPiloti) {
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

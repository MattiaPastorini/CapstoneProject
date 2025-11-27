# CapstoneProject

FantaF1
Il progetto consiste in un'applicazione di fanta Formula 1, simile ad una applicazione Fantacalcio, che permette agli utenti di creare e gestire le proprie squadre di piloti e di competere con i propri amici in campionati virtuali. L'obiettivo è offrire un'esperienza interattiva e coinvolgente per gli appassionati di F1, con aggiornamenti in tempo reale e classifiche dinamiche.

## Descrizione

L'applicazione è composta da un backend REST sviluppato con Spring Boot e un frontend single-page application sviluppato con React e Vite.
Gli utenti possono registrarsi, autenticarsi tramite JWT, creare leghe private, comporre la propria squadra selezionando 3 piloti di F1 e sfidare altri giocatori all'interno della stessa lega.

## Clonazione del progetto

git clone https://github.com/MattiaPastorini/CapstoneProject.git
cd CapstoneProject

## Tecnologie utilizzate

**Backend**

- Maven
- Java 21
- Spring Boot 3.5 (Web, Data JPA, Security, Validation, Mail, DevTools)
- PostgreSQL come database relazionale
- JPA/Hibernate per la persistenza
- JWT (jjwt) per autenticazione e autorizzazione
  **Frontend**
- npm (Vite)
- React (con Vite)
- React DOM
- React Router DOM
- React-Bootstrap e Bootstrap 5 (+ Bootstrap Icons)

## Funzionalità principali

- Registrazione e login utente tramite email e password sicure e token JWT.
- Creazione e gestione di leghe Fanta F1.
- Creazione di squadre associando 3 piloti ad ogni utente.
- Inviti a partecipare alle leghe tramite email/username/codice.
- Classifica delle leghe basata sui punti accumulati dai piloti/squadre e dai bonus/malus specificati nel regolamento.
- Interfaccia responsive realizzata con React-Bootstrap per poter usare l'applicazione su tutti i dispositivi.

## Requisiti

- Java 21+
- Maven
- Node.js 18+ e npm
- PostgreSQL in esecuzione in locale
- File `env.properties` configurato nella root del backend

## Configurazione backend

Il backend utilizza un file `env.properties` importato da `application.properties`:

spring.config.import=file:env.properties

Nel file `env.properties` (non versionato su Git) vanno definiti:

PG_DB_NAME=...
PG_USERNAME=...
PG_PASSWORD=...

JWT_SECRET=...

In `application.properties` sono configurate le variabili:

server.port=3002

spring.datasource.url=jdbc:postgresql://localhost:5432/${PG_DB_NAME}
spring.datasource.username=${PG_USERNAME}
spring.datasource.password=${PG_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

jwt.secret=${JWT_SECRET}

## Avvio backend

1. Posizionati nella cartella del backend:

cd backend

2. Verifica che PostgreSQL sia attivo e che il database indicato in `PG_DB_NAME` esista.
3. Esegui l'applicazione Spring Boot:

mvn spring-boot:run

4. Il backend sarà disponibile su:

http://localhost:3002

## Avvio frontend

1. Posizionati nella cartella del frontend (creata con Vite):

- cd frontend

2. Installa le dipendenze:

- npm install

3.  Avvia il server di sviluppo Vite:

- npm run dev

4. Il frontend sarà disponibile di default su:

- http://localhost:5173

## Utilizzo

- Apri il browser su `http://localhost:5173`.
- Registra un nuovo utente.
- Effettua il login: il frontend memorizza il token JWT e protegge le route riservate.
- Crea una nuova lega Fanta F1.
- Crea la tua squadra selezionando i piloti disponibili.
- Invita altri utenti a partecipare alla lega.
- Divertiti.

## Documentazione API

### Endpoint autenticazione

POST /api/auth/register

- Descrizione: registra un nuovo utente.
- Body richiesta (JSON):
  {
  "username": "Mario",
  "email": "mario@example.com",
  "password": "password123"
  }
- Risposte:
  - 200 OK -> { "message": "ok" }
  - 200 OK -> { "message": "Email in uso" }

POST /api/auth/login

- Descrizione: effettua il login di un utente.
- Body richiesta (JSON):
  {
  "email": "mario@example.com",
  "password": "password123"
  }
- Risposte:
  - 200 OK -> { "id": 1, "username": "Mario", "accessToken": "jwt-token-qui" }
  - 200 OK -> { "message": "Credenziali errate" }

### Endpoint squadre

POST /api/team/creazione

- Descrizione: crea una nuova squadra all’interno di una lega.

GET /api/team/utente/{userId}

- Descrizione: restituisce tutte le squadre di cui l’utente è presidente.

PUT /api/team/{teamId}/punti

- Descrizione: aggiorna i punti di una singola squadra.

PUT /api/team/{teamId}/totale

- Descrizione: aggiorna punti totali e bonus/malus di una squadra.

### Endpoint leghe

POST /api/lega/creazione

- Descrizione: crea una nuova lega Fanta.

GET /api/lega/classifica/{legaId}

- Descrizione: restituisce la classifica della lega con i dati delle squadre.

POST /api/lega/invito

- Descrizione: invia un invito a entrare in una lega (per email o username).

POST /api/lega/partecipazione

- Descrizione: un utente entra in lega tramite codice invito.

### Altri endpoint

GET /api/lega/utente/{userId}
– restituisce la lega a cui partecipa l’utente.
GET /api/team/utente/{userId}/lega/{legaId}
– restituisce la squadra di un utente in una certa lega.
DELETE /api/team/elimina/{id}
– elimina una squadra.
DELETE /api/lega/elimina/{id}
– elimina una lega.
GET /api/notifiche/{userId}
– restituisce gli inviti a leghe non accettati.
DELETE /api/lega/uscita/{legaId}/utente/{userId}
– un utente esce da una lega.
DELETE /api/lega/elimina/{legaId}/presidente/{userId}
– il presidente elimina definitivamente la lega.

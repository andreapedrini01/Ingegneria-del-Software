# Ingegneria-del-Software

Progetto di Ingegneria del Software, Università degli studi di Trento

## Descrizione

Questo progetto è un'applicazione web per la gestione della raccolta dei rifiuti, sviluppata utilizzando MongoDB, Vue.js, Express.js e Node.js. L'applicazione consente la gestione dei centri di raccolta, la creazione e la gestione di eventi di raccolta, e la gestione degli utenti e dei gruppi coinvolti nel processo.

## Installazione

1. Clonare il repository:
    ```sh
    git clone <url_del_repository>
    ```
2. Navigare nella directory del progetto:
    ```sh
    cd project_directory
    ```
3. Installare le dipendenze:
    ```sh
    npm install
    ```
4. Creare un file `.env` basato su `.env.example` e configurare le variabili di ambiente necessarie.
5. Avviare il server:
    ```sh
    npm run dev
    ```
6. Navigare nella directory del progetto Vue:
    ```sh
    cd vue-project
    ```
7. Installare le dipendenze:
    ```sh
    npm install
    ```
8. Avviare l'applicazione Vue:
    ```sh
    npm run dev
    ```
## Struttura dei File e delle Directory

### File Principali

- **.env**: File delle variabili di ambiente.
- **.env.example**: Esempio di configurazione delle variabili di ambiente.
- **.gitignore**: File per ignorare specifici file e directory nel repository git.
- **jest.config.js**: Configurazione per Jest, il framework di testing.
- **package.json**: Gestione delle dipendenze e degli script del progetto.
- **package-lock.json**: Blocca le versioni esatte delle dipendenze.
- **README.md**: Documentazione del progetto.
- **server.js**: File principale per avviare il server Express.

### Directory e File dell'App

- **app/**: Contiene i file principali dell'applicazione.
    - **app.js**: Configurazione principale dell'applicazione.
    - **authentication.js**: Logica di autenticazione.
    - **authentication.test.js**: Test per l'autenticazione.
    - **calendars.js**: Gestione dei calendari.
    - **crm.js**: Gestione dei centri di raccolta.
    - **events.js**: Gestione degli eventi.
    - **groups.js**: Gestione dei gruppi.
    - **tokenChecker.js**: Middleware per la verifica dei token.
    - **users.js**: Gestione degli utenti.
    - **users.test.js**: Test per la gestione degli utenti.
    - **models/**: Contiene i modelli Mongoose.
        - **calendar.js**: Modello per i calendari.
        - **centroRaccolta.js**: Modello per i centri di raccolta.
        - **event.js**: Modello per gli eventi.
        - **gruppo.js**: Modello per i gruppi.
        - **registeredUser.js**: Modello per gli utenti registrati.
        - **superUser.js**: Modello per gli amministratori.
        - **token.js**: Modello per i token.
        - **verifiedUser.js**: Modello per gli utenti verificati.
### Altri file e directory
- **config.js**: Configurazione generale dell'applicazione.
- **node_modules/**: Dir
- **static/**: Contiene file statici.
- **swagger.yaml**: Definizione delle API con Swagger.
- **utils/**: Funzioni di utilità.
- **vue-project/**: Progetto front-end sviluppato con Vue.js.


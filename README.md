# SpazzaTN ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vue.js&logoColor=%234FC08D)

Progetto di Ingegneria del Software, Università degli studi di Trento

Benvenuti nel repository del progetto di Ingegneria del Software. Questa applicazione è stata sviluppata per facilitare la gestione dei rifiuti dei cittadini nella città di Trento.

## Descrizione dell'Applicazione

Questo progetto è un'applicazione web per la gestione della raccolta dei rifiuti, sviluppata utilizzando MongoDB, Vue.js, Express.js e Node.js. L'applicazione consente la gestione dei centri di raccolta, la creazione e la gestione di eventi di raccolta, e la gestione degli utenti e dei gruppi coinvolti nel processo.

## Link sito e video

**Sito web:** [SpazzaTN.com](https://ingegneria-del-software-fsjj.onrender.com)<br>
**Video:** [Video Loom](https://www.loom.com/share/efcfa6131f81475c9adbbf5673803680?sid=9bb22c2e-a683-46e1-8e0f-d4b9f115126c)<br>
Nel caso in cui il link al video non funzionasse puoi visualizzare un video dimostrativo dell'applicazione cliccando [qui](./Deliverable%20Four/video_tutorial.mp4).

## Funzionalità

### Visualizzazione dei Centri di Raccolta

- **Mappa Interattiva:** Gli utenti possono visualizzare i centri di raccolta rifiuti su una mappa interattiva, navigando facilmente tra i vari punti di raccolta disponibili in città.

### Accesso e Registrazione

- **Registrazione:** Gli utenti possono registrarsi per accedere a funzionalità aggiuntive.
- **Accesso:** Gli utenti registrati possono effettuare il login per accedere alle funzioni avanzate.
- **Recupero Password:** Gli utenti possono recuperare la password fornendo l'email con cui sono registrati.
- **Password Salvate:** Ogni utente registrato ha una password hashata nel database per aumentare il livello di sicurezza. Per provare il recupero password è necessaria una mail attiva da parte dell'utente e **NON** può essere utilizzata la mail d'esempio fornita nel Deliverable 4.

### Gestione dei Gruppi

- **Visualizzazione dei Gruppi:** Gli utenti registrati possono visualizzare i gruppi a cui sono iscritti.
- **Condivisione tra inquilini:** I gruppi permettono a più utenti dello stesso nucleo abitativo di condividere il monitoraggio della raccolta dei rifiuti, facilitando una gestione organizzata tra gli inquilini.

### Calendario

- **Accesso al Calendario:** Gli utenti possono accedere ad un calendario (funzionalità non completamente implementata) che dovrebbe mostrare gli eventi di raccolta.
  - **Nota:** Al momento, il calendario non mostra correttamente gli eventi di raccolta a cui l'utente è iscritto.

## Come Utilizzare l'Applicazione

1. **Esplora la Mappa:**
   - Apri l'applicazione e visualizza i centri di raccolta sulla mappa interattiva.

2. **Registrazione e Accesso:**
   - Clicca sul pulsante "Registrati" per creare un nuovo account.
   - Una volta registrato, utilizza il pulsante "Accedi" per effettuare il login.
   - Non ricordi la password? Utilizza il pulsante "Password Dimenticata" dopo aver cliccato "Accedi" e segui le istruzione nella mail inviata.

3. **Gestisci i Tuoi Gruppi:**
   - Dopo aver effettuato l'accesso, puoi visualizzare i gruppi a cui sei iscritto e gestire la raccolta dei rifiuti con i tuoi inquilini.

4. **Visualizza il Calendario:**
   - Accedi al calendario per vedere gli eventi di raccolta (tenendo presente che questa funzionalità non è ancora completamente operativa).

## Tecnologie Utilizzate

- **Frontend:** Vue^3.4.27
- **Mappa:** Leaflet API
- **Backend:** Javascript
- **Database:** Mongoose^8.4.0

## Installazione

1. Clonare il repository:

    ```sh
    git clone https://github.com/andreapedrini01/Ingegneria-del-Software.git
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

9. Seguire il link fornito dall'avvio di Vue.

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

## Contributi

Siamo aperti ai contributi! Se vuoi contribuire al progetto, sentiti libero di fare fork del repository, apportare le tue modifiche e creare una pull request.

## Licenza

Questo progetto è sotto licenza GNU Affero General Public License v3.0 or later.

---

Per qualsiasi domanda o informazione, non esitare a contattarci.

**Buona gestione dei rifiuti!**

![Unitrento logo](.\utils\marchio_unitrento_colore_it_250.jpg)

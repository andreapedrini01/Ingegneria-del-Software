<!-- Pagina in cui l'utente registrato vedrà il suo gruppo (una finestra con nome gruppo e nomi partecipanti)-->
<template>
  <div class="body">
  <div class="header">
      <h1>Pagina utente</h1>
      <div class="Button-Home">
      <button @click="goHome">Home</button>
      </div>
  </div>
  <div class="gruppi-window">
    <h1 style="color: white;">Gruppi</h1>
    <div v-for="gruppo in this.gruppi" :key="gruppo.id">
      <h2>{{ gruppo.nome }} <button @click="gestisci(gruppo)">Gestisci</button></h2>
    </div>
    <div v-if="this.gruppi.length === 0">
      <p>Nessun gruppo trovato.</p>
    </div>
    <button type="newGroup" @click="showNewGroup = true">Crea nuovo gruppo</button>
    <NewGroup v-if="showNewGroup" />
    </div>
  <button type="back" @click="goBack">Torna indietro</button>
  </div>
</template>

<script>
import NewGroup from './NewGroup.vue';
export default {
    name: 'Gruppi',
    components: {
        NewGroup,
    },
  data() {
    return {
      gruppi: [
      ],
      showNewGroup: false,
      token:'',
      email:'',
      clientUrl: import.meta.env.VITE_CLIENT_URL
    };
  },
  mounted(){
    this.token = localStorage.getItem('token');
    if (!this.token) {
        this.$router.push('/login');
    }
    this.email = localStorage.getItem('email');
    this.fetchGruppi();
  },
  methods: {
    async fetchGruppi() {
      try {
        const response = await fetch(this.clientUrl +'/api/v1/groups/getgroups', {
          method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`, // Passa il token JWT nell'intestazione
            },
            body: JSON.stringify({
              token: this.token,
            }),
        });

        if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        //console.log(data);
        this.gruppi = data;
      } catch (error) {
        console.error('Errore durante il recupero dei gruppi:', error);
      }
    },
    goBack() {
        this.$router.push('/UserProfile');
    },
    createNewGroup() {
        //show.NewGroup;
    },
    gestisci(gruppo) {
      //Salva l'id del gruppo in localstorage
      localStorage.removeItem('idGruppo');
      localStorage.setItem('idGruppo', gruppo._id);
      //console.log('idGruppo:', gruppo._id);
      // Mostra la finestra di gestione del gruppo con l'id specificato
      this.$router.push(`/gestisciGruppo`);
    },
    goHome() {
        this.$router.push('/');
    }
  },
};
</script>

<style scoped>
  .gruppi-window {
    background-color: #333;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
    margin: 0 auto; /* Centra orizzontalmente */
    display: block; /* Assicurati che l'elemento sia un blocco per applicare il margine e la larghezza */
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    color: #fff;
    display: block;
  }
  
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  button {
    background-color: #00ff00;
    color: #000;
    padding: 10px 20px;
    border: 2px solid #000;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #00cc00;
  }

  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
    background-color: #111;
    color: #fff;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 99%;
    display: flex;
    justify-content: center;
    background-color: #222;
    color: #ffffff;
    padding: 20px;
    box-sizing: border-box;
  }

  .header .Button-Home {
    color: #000000;
    position: absolute;
    right: 20px;
  }
</style>
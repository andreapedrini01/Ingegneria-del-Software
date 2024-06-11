<!-- Componente che permette di modificare i dati del gruppo, ricevendo l'id del gruppo da Gruppi.vue -->
<template>
    <div class="body">
        <div class="header">
            <h1>Pagina utente</h1>
            <div class="Button-Home">
            <button @click="goHome">Home</button>
            </div>
        </div>
        <div class="Window-Gestione">
            <h1 style="color: white;">Gestisci gruppo</h1>
            <h2>Nome gruppo: {{ this.gruppo.nome }}</h2>
            <ul>
                <li v-for="partecipante in this.gruppo.participants" :key="partecipante">
                    {{ partecipante }} <button @click="rimuoviPartecipante">Rimuovi</button>
                </li>
            </ul>
            <button type="addUser" @click="showNewUser = true">Aggiungi partecipante</button>
            <AddUser v-if="showNewUser" />
        </div>
        <button type="back" @click="goBack">Torna indietro</button>
    </div>
</template>

<script>
import AddUser from './AddUser.vue';
export default {
    name: 'GestisciGruppo',
    components: {
        AddUser,
    },
    data() {
        return {
            gruppo: {
                nome: '',
                participants: [],
            },
            token: '',
            idGruppo: '',
            clientUrl: import.meta.env.VITE_CLIENT_URL,
            showNewUser: false,
        };
    },
    mounted(){
        this.token = localStorage.getItem('token');
        if (!this.token) {
            this.$router.push('/login');
        }
        this.email = localStorage.getItem('email');
        this.idGruppo = localStorage.getItem('idGruppo');
        this.fetchGruppobyId();
    },
    methods: {
        goBack() {
            this.$router.push('/Gruppi');
        },
        async fetchGruppobyId() {
            try {
                const response = await fetch(this.clientUrl +'/api/v1/groups/getgroup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`, // Passa il token JWT nell'intestazione
                    },
                    body: JSON.stringify({
                        token: this.token,
                        groupId: this.idGruppo,
                    }),
                });
                const data = await response.json();
                this.gruppo = data;
                console.log(data);
            } catch (error) {
                console.error('Errore:', error);
            }
        },
        async aggiungiPartecipante() {
            //Aggiungi un partecipante al gruppo
            try{
                const response = await fetch(this.clientUrl +'/api/v1/groups/addparticipant', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`, // Passa il token JWT nell'intestazione
                    },
                    body: JSON.stringify({
                        token: this.token,
                        groupId: this.idGruppo,
                        participant: 'nuovo_partecipante',
                    }),
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Errore:', error);
            }
        },
        async rimuoviPartecipante() {
            //Rimuovi un partecipante dal gruppo
            try{
                const response = await fetch(this.clientUrl +'/api/v1/groups/removeparticipant', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`, // Passa il token JWT nell'intestazione
                    },
                    body: JSON.stringify({
                        token: this.token,
                        groupId: this.idGruppo,
                        participant: this.partecipante,
                    }),
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Errore:', error);
            }
        },
        handleAddUser(){
            this.$router.push('/AddUser');
        },
        goHome() {
            this.$router.push('/UserProfile');
        },
    }
}
</script>

<style scoped>
  .Window-Gestione {
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
<!-- Pagina in cui l'utente registrato vedrà il suo gruppo (una finestra con nome gruppo e nomi partecipanti)-->
<template>
  <div class="gruppi-window">
    <h1>Gruppi</h1>
    <div v-for="gruppo in gruppi" :key="gruppo.id">
        <h2>{{ gruppo.nome }} <button @click="gestisci(gruppo.id)">Gestisci</button></h2>
      <ul>
        <li v-for="partecipante in gruppo.partecipanti" :key="partecipante.id">
          {{ partecipante.nome }}
        </li>
      </ul>
    </div>
    <div v-if="gruppi.length === 0">
      <p>Nessun gruppo trovato.</p>
      <button type="newGroup" @click="showNewGroup = true">Crea nuovo gruppo</button>
    </div>
    <NewGroup v-if="showNewGroup" />
    </div>
  <button type="back" @click="goBack">Go back</button>
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
        {
          id: 1,
          nome: 'Gruppo 1',
          partecipanti: [
            { id: 1, nome: 'Mario Rossi' },
            { id: 2, nome: 'Luigi Verdi' },
          ],
        },
        {
          id: 2,
          nome: 'Gruppo 2',
          partecipanti: [
            { id: 3, nome: 'Paolo Bianchi' },
            { id: 4, nome: 'Giovanni Neri' },
          ],
        },
      ],
      showNewGroup: false,
      token:'',
      email:''
    };
  },
  mounted(){
    this.token = localStorage.getItem('token');
    if (!this.token) {
        this.$router.push('/login');
    }
    this.email = localStorage.getItem('email');
  },
  methods: {
    goBack() {
        this.$router.push('/UserProfile');
    },
    createNewGroup() {
        //show.NewGroup;
    },
    gestisci(id) {
        // Mostra la finestra di gestione del gruppo con l'id specificato
        this.$router.push(`/gestisci-gruppo/${id}`);
    }
  },
};
</script>

<style scoped>
  .gruppi-window {
    background-color: #333;
    padding: 20px;
    border-radius: 5px;
    width: 100%; /* Riduci la larghezza al 50% del contenitore padre */
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
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #00cc00;
  }
</style>
<!-- Componente che permette di modificare i dati del gruppo, ricevendo l'id del gruppo da Gruppi.vue -->
<template>
    <div>
        <h1>Gestisci gruppo</h1>
        <h2>Nome gruppo: {{ this.gruppo.nome }}</h2>
        <ul>
            <li v-for="partecipante in this.gruppo.participants" :key="partecipante">
                {{ partecipante }}
            </li>
        </ul>
        <button type="back" @click="goBack">Go back</button>
    </div>
</template>

<script>
export default {
    name: 'GestisciGruppo',
    data() {
        return {
            gruppo: {
                nome: '',
                participants: [],
            },
            token: '',
            idGruppo: '',
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
                const response = await fetch('http://localhost:8080/api/v1/groups/getgroup', {
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
                const response = await fetch('http://localhost:8080/api/v1/groups/addparticipant', {
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
                const response = await fetch('http://localhost:8080/api/v1/groups/removeparticipant', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`, // Passa il token JWT nell'intestazione
                    },
                    body: JSON.stringify({
                        token: this.token,
                        groupId: this.idGruppo,
                        participant: 'partecipante_da_rimuovere',
                    }),
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Errore:', error);
            }
        },
    },
};
</script>

<style scoped>
</style>
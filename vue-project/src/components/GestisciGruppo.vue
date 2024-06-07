<!-- Componente che permette di modificare i dati del gruppo, ricevendo l'id del gruppo da Gruppi.vue -->
<template>
    <div>
        <h1>Gestisci gruppo</h1>
        <h2>{{ idGruppo }}</h2>
        <ul>
            <li v-for="partecipante in gruppo.partecipanti" :key="partecipante.id">
                {{ partecipante.nome }}
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
                id: 1,
                nome: 'Gruppo 1',
                partecipanti: [
                    { id: 1, nome: 'Mario Rossi' },
                    { id: 2, nome: 'Luigi Verdi' },
                ],
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
    //this.fetchGruppi();
  },
    methods: {
        goBack() {
            this.$router.push('/Gruppi');
        },
    },
};
</script>

<style scoped>
</style>
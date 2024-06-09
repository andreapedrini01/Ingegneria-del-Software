<!-- Form dove inserire i dati del nuovo gruppo -->
<template>
    <div class="new-group-window">
      <h1>Nuovo gruppo</h1>
      <div class="form-group">
        <label for="nome">Nome del gruppo</label>
        <input type="text" id="nome" v-model="nome" />
      </div>
      <div class="form-group" v-for="(partecipante, index) in partecipanti" :key="index">
        <label :for="'partecipante' + index">Partecipante</label>
        <input :id="'partecipante' + index" v-model="partecipanti[index]" />
      </div>
      <button type="button" @click="addPartecipante">Aggiungi partecipante</button>
      <button type="submit" @click="submitForm">Crea gruppo</button>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      nome: '',
      partecipanti: ['']
    };
  },
  mounted(){
    this.token = localStorage.getItem('token');
    if (!this.token) {
        this.$router.push('/login');
    }
    this.email = localStorage.getItem('email');
    //this.submitForm();
  },
  methods: {
    addPartecipante() {
      this.partecipanti.push('');
    },
    async submitForm() {
      // Simuliamo la creazione del gruppo
      alert('Gruppo creato!');
      console.log(this.nome, this.partecipanti);
      try{
        const response = await fetch('http://localhost:8080/api/v1/groups/setgroup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`, // Passa il token JWT nell'intestazione
          },
          body: JSON.stringify({
            token: this.token,
            nome: this.nome,
            invitati: Array.isArray(this.partecipanti) ? this.partecipanti : [this.partecipanti],
          }),
        });

        if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        this.$router.push('/Gruppi');
      } catch (error) {
        console.error('Errore:', error);
      }
    },
    goBack() {
      this.$router.push('/Gruppi');
    }
  }
};
</script>

<style scoped>
.new-group-window {
  background-color: #2222;
  padding: 20px;
  border-radius: 5px;
  width: 50%;
  margin: 0 auto;
  display: block;
}

.form-group {
  margin-bottom: 15px;

}

label {
    color: #fff;
    display: block;
}

input[type="text"], input[type="password"] {
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
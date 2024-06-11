<!-- Form dove inserire i dati del nuovo gruppo -->
<template>
    <div class="new-group-window">
      <h1 >Nuovo partecipante</h1>
      <div class="form-group">
        <label for="partecipante">Partecipante</label>
        <input id="partecipante" v-model="partecipante" />
      </div>
      <button type="submit" @click="submitForm">Invia</button>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      nome: '',
      partecipante: '',
      clientUrl: import.meta.env.VITE_CLIENT_URL,
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
    async submitForm() {
      // usa /addparticipant
        try {
            const response = await fetch(this.clientUrl +'/api/v1/groups/addparticipant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`, // Passa il token JWT nell'intestazione
            },
            body: JSON.stringify({
                token: this.token,
                nome: this.nome,
                partecipanti: this.partecipanti,
            }),
            });
            const data = await response.json();
            if (data.error) {
            alert(data.error);
            } else {
            alert('Partecipante aggiunto con successo!');
            //this.$router.push('/Gruppi');
            }
        } catch (error) {
            alert('Errore durante l\'aggiunta del partecipante.');
        }
    },
    goBack() {
      this.$router.push('/Gruppi');
    },
  }
};
</script>

<style scoped>
.new-group-window {
  background-color: #2222;
  padding: 20px;
  border-radius: 5px;
  width: 75%;
  margin: 0 auto;
  display: block;;
  border: 5px solid #333;
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
    border: 2px solid #000;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #00cc00;
}
</style>
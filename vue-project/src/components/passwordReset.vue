<template>
    <div class="requestWindow">
        <h1>Reset Password</h1>
        <form action="/api/v1/authentications" method="post" name="resetPassword" id="resetPassword">
            <label for="password">Nuova Password:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <button type="button" @click="rstPwd">Invia</button>
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      clientUrl: import.meta.env.VITE_CLIENT_URL
    }
  },
    methods: {
        rstPwd() {
            //console.log('started resetPassword');
            var urlParams = new URLSearchParams(window.location.search);
            var password = document.getElementById("password").value;
            var token = urlParams.get('token');
            var userId = urlParams.get('id');
            //console.log('userId: ' + userId);
            //console.log('token: ' + token);
            try{
                fetch(this.clientUrl +'/api/v1/authentications/passwordReset', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify( { userId: userId, token: token, password: password } ),
                })
                .then((resp) => resp.json())
            } catch (error) {
                console.error(error);
                return;
            }
        }
    }
}
</script>

<style scoped>
.requestWindow {
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
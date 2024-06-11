<template>
    <div class="body">
        <div class="header">
            <h1>Password dimenticata</h1>
            <div class="Button-Home">
            <button @click="goHome">Home</button>
            </div>
        </div>
        <div class="requestWindow">
            <h1>Reset password</h1>
            <form action="/api/v1/authentications/requestPasswordReset" method="post" name="requestPasswordReset" id="requestPasswordReset">
                <label for="email">Inserire email profilo:</label>
                <input type="email" id="email" name="email" v-model="email" required>
                <br>
                <button type="button" @click="sendEmail" :disabled="isButtonDisabled">Invia</button>
            </form>
            <br><button type="back" @click="goBack">Torna indietro</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            clientUrl: import.meta.env.VITE_CLIENT_URL,
            isButtonDisabled: false,
        };
    },
    methods: {
        async sendEmail() {
            alert('Form submitted ' + this.email);
            //console.log('started requestPasswordReset' + this.email)
            this.isButtonDisabled = true;
            try {
                const response = await fetch(this.clientUrl + '/api/v1/authentications/requestPasswordReset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.email,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // If you expect a JSON response, you can parse it
                const data = await response.json();
                //console.log(data);
            } catch (error) {
                console.error('An error occurred while submitting the form:', error);
            }finally {
                setTimeout(() => {
                this.isButtonDisabled = false;
                }, 60000); // Disabilita il pulsante per 60 secondi
            }
        },
        goBack() {
            this.$router.push('/login');
        },
        goHome() {
            this.$router.push('/');
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
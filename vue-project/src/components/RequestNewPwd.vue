<template>
    <div class="requestWindow">
        <h1>Reset Password</h1>
        <form action="/api/v1/authentications/requestPasswordReset" method="post" name="requestPasswordReset" id="requestPasswordReset">
            <label for="email">Inserire email profilo:</label>
            <input type="email" id="email" name="email" v-model="email" required>
            <br>
            <button type="button" @click="sendEmail">Invia</button>
        </form>
        <br><button type="back" @click="goBack">Go back</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
        };
    },
    methods: {
        async sendEmail() {
            alert('Form submitted ' + this.email);
            console.log('started requestPasswordReset' + this.email)
            try {
                const response = await fetch('http://localhost:8080/api/v1/authentications/requestPasswordReset', {
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
                console.log(data);
            } catch (error) {
                console.error('An error occurred while submitting the form:', error);
            }
        },
        goBack() {
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
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #00cc00;
  }
</style>
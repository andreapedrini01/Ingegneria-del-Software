<template>
  <div class="container">
    <div class="header"></div>
      <h1>Calendario</h1>
    <div id="calendar"></div>
    <button type="back" @click="goBack">Go back</button>
  </div>
  
</template>

<script>
import { onMounted, ref } from 'vue';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Importa il plugin dayGrid

export default {
  name: 'Calendar',
  methods: {
    goBack() {
      this.$router.push('/UserProfile');
    }
  },
  setup() {
    const calendarEl = ref(null);

    onMounted(() => {
      calendarEl.value = document.getElementById('calendar');
      
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login');
      }

      const calendar = new Calendar(calendarEl.value, {
        plugins: [ dayGridPlugin ], // Registra il plugin dayGrid
        initialView: 'dayGridMonth',
        events: function(fetchInfo, successCallback, failureCallback) {
          fetch('/api/v1/users/get-events', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
        }
      });
      calendar.render();
    });

    return { calendarEl };
  }
}
</script>
  
<style scoped>
body {
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
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #222;
    color: #ffffff;
    padding: 20px;
    box-sizing: border-box;
  }

  .container {
    width: 100vw; /* Larghezza al 100% dello schermo */
    padding: 0; /* Rimuovi il padding per far coincidere il bordo con il bordo dello schermo */
    box-sizing: border-box; /* Mantieni il box-sizing */
  }

  .menu {
    text-align: center;
    margin-top: 20px;
  }

  .menu a {
    color: #00ff00;
    text-decoration: none;
    margin: 0 10px;
  }

  .section {
    text-align: center;
    margin-top: 50px;
  }

  .button {
    background-color: #00ff00;
    color: #000;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    margin-left: 20px;
    display: inline-block;
  }

  .button:hover {
    background-color: #00cc00;
  }

  .header .login-area {
    position: absolute;
    right: 20px;
  }

  #calendar {
    box-sizing: border-box;
    width: 75%;
    margin: 20px auto;
  }
</style>
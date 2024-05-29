<template>
  <div class="user-profile">
    <h2>User Profile</h2>
    <div>
      <p>Welcome!</p>
      <!-- Add user profile information here -->
    </div>
    <button class="gruppi-button" type="Gruppi" @click="goToGruppi">Gestisci gruppi</button>
  </div>
  <div>
    <button class="logout-button" type="logout"  @click="logout">Logout</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    username: {
      type: String,
      required: true
    }
  },
  methods: {
    goToGruppi() {
      this.$router.push('/Gruppi');
    },
    logout() {
      // Add logout logic here
      alert('Logged out!');
      this.$router.push('/');
      // You can emit an event or call a method in the parent component to handle logout
    }
  }
});
</script>

<style scoped>
.user-profile {
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
}

button {
  background-color: #ff0000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.gruppi-button {
  background-color: #00ff00; /* Cambia questo colore come preferisci */
  color: #000000; /* Cambia questo colore come preferisci */
}

button:hover {
  background-color: #cc0000;
}
</style>

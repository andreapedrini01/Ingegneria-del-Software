<template>
  <div class="user-profile">
    <h2>User Profile</h2>
    <div>
      <p>Welcome, {{ username }}!</p>
      <!-- Add user profile information here -->
    </div>
    <button @click="logout">Logout</button>
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
    logout() {
      // Add logout logic here
      alert('Logged out!');
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

button:hover {
  background-color: #cc0000;
}
</style>

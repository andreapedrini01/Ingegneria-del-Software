<template>
  <div class="register-window">
    <h2>Register</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      // Add your registration logic here
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      console.log('User data:', userData);
      // You can emit an event or call a method in the parent component to handle registration
    }
  }
});
</script>

<style scoped>
.register-window {
  background-color: #333;
  padding: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  color: #fff;
  display: block;
}

input[type="text"],
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

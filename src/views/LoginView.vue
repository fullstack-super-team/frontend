<script setup>
import { reactive } from 'vue'
import axios from "axios";
import Input from "@/components/Input.vue";
import store from '@/stores/mainStore';
import { useRouter } from 'vue-router';
const router = useRouter();

const formValues = reactive({
  email: "",
  password: "",
});

const errorMessages = reactive({
  email: null,
  password: null,
});

const validateForm = () => {
  errorMessages.email = !formValues.email ? "Email is required" :
      !validateEmail(formValues.email) ? "Please enter a valid email address: example@domain.com" : null;

  errorMessages.password = !formValues.password ? "Password is required" :
      formValues.password.length < 8 ? "Password must be at least 8 characters" : null;

  return !errorMessages.email && !errorMessages.password;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function login() {
  if (!validateForm()) {
    return;
  }
  try {
    const response = await axios.post("http://localhost:8080/auth/login", formValues);
    const { token } = response.data        
    await store.dispatch("user/login", token);
    router.push("/")
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <main>
    <img src="@/assets/QBlogo.png" alt="Quizzebassen logo" class="logo">
    <p>Login to the quiz application</p>
    <form @submit.prevent="login">
      <Input label="Email" placeholder="Email" v-model="formValues.email" :error-message="errorMessages.email"/>
      <Input label="Password" placeholder="Password" v-model="formValues.password" type="password" :error-message="errorMessages.password"/>
      <button type="submit">Login</button>
    </form>
    <p>Not already a user? <router-link to="/register"> Register here</router-link></p>
  </main>
</template>

<style scoped>

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #3EA8F2;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 450px;
}

input {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  width: 100%;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;
  font-size: medium;
}

button:hover {
  background-color: #555;
}

.logo {
  width: 20%;
  height: auto;
  margin-bottom: 1rem;
}

</style>
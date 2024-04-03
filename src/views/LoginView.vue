<script setup>
import { reactive } from 'vue'
import axios from "axios";
import Input from "@/components/Input.vue";
import store from '@/stores/mainStore';
import Button from "@/components/Button.vue";
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
    <img src="@/assets/QBLoginLogo.png" alt="Quizzebassen logo" class="logo">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <Input label="Email" placeholder="Email" v-model="formValues.email" :error-message="errorMessages.email"/>
      <Input label="Password" placeholder="Password" v-model="formValues.password" type="password" :error-message="errorMessages.password"/>
      <Button type="submit">Login</Button>
    </form>
    <p>Not already a user? <router-link to="/register"> Register here</router-link></p>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  //background-color: #E1EFFD;
  background-color: #BCDEFB;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 450px;
  padding: 2rem;
}

input {
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
}

button {
  font-size: medium;
}

button:hover {
  background-color: #555;
}

.logo {
  width: 20%;
  height: auto;
  min-width: 150px;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  main {
    padding: 1rem;
  }
}

</style>
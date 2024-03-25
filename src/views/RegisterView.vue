<script setup>
import { reactive } from 'vue'
import axios from "axios";
import Input from "@/components/Input.vue";
import store from '@/stores/mainStore';
import { useRouter } from 'vue-router';
const router = useRouter();

const formValues = reactive({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
});

const errorMessages = reactive({
  firstName: null,
  lastName: null,
  username: null,
  email: null,
  password: null,
});

const validateForm = () => {
  errorMessages.firstName = !formValues.firstName ? "First name is required" : null;

  errorMessages.lastName = !formValues.lastName ? "Last name is required" : null;

  errorMessages.username = !formValues.username ? "Username is required" : null;

  errorMessages.email = !formValues.email ? "Email is required" :
    !validateEmail(formValues.email) ? "Please enter a valid email address: example@domain.com" : null;

  errorMessages.password = !formValues.password ? "Password is required" :
      formValues.password.length < 8 ? "Password must be at least 8 characters" : null;

  return !errorMessages.firstName && !errorMessages.lastName && !errorMessages.username && !errorMessages.email && !errorMessages.password;
}
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function register() {
  if (!validateForm()) {
    return;
  }
  try {
    const response = await axios.post("http://localhost:8080/auth/register", formValues);
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
    <h1>Register</h1>
    <p>Register to use the quiz application</p>
    <form @submit.prevent="register">
      <Input label="First name" placeholder="First name" v-model="formValues.firstName" :error-message="errorMessages.firstName"/>
      <Input label="Last name" placeholder="Last name" v-model="formValues.lastName" :error-message="errorMessages.lastName"/>
      <Input label="Username" placeholder="Username" v-model="formValues.username" :error-message="errorMessages.username"/>
      <Input label="Email" placeholder="Email" v-model="formValues.email" :error-message="errorMessages.email"/>
      <Input label="Password" placeholder="Password" type="password" v-model="formValues.password" :error-message="errorMessages.password"/>
      <button type="submit">Register</button>
    </form>
    <p>Already have a an account?<router-link to="/login"> Login here</router-link></p>
  </main>
</template>

<style scoped>

main {
  display: flex;
  flex-direction: column;
  align-items: center;
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

</style>@/stores/userModule
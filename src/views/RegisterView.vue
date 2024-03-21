<script setup>
import { reactive } from 'vue'
import axios from "axios";
import Input from "@/components/Input.vue";
import store from '@/stores/mainStore';
import { useRouter } from 'vue-router';
const router = useRouter();

const formValues = reactive({
  name: "",
  username: "",
  password: "",
});

async function register() {
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
    <p>Register to use the calculator</p>
    <form @submit.prevent="register">
      <Input label="Name" placeholder="Name" v-model="formValues.name" />
      <Input label="Username" placeholder="Username" v-model="formValues.username" />
      <Input label="Password" placeholder="Password" type="password" v-model="formValues.password" />
      <button type="submit">Register</button>
    </form>
  </main>
</template>

<style scoped>

main {
  display: flex;
  flex-direction: column;
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
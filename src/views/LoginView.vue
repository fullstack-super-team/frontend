<script setup>
import { ref, reactive } from 'vue';
import MainStore from '@/stores/mainStore';
import Input from "@/components/Input.vue";
import store from '@/stores/mainStore';
import Button from "@/components/Button.vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const formValues = reactive({
  email: "",
  password: "",
});

const submitError = ref(null);

async function login() {
  const error = await store.dispatch("user/login", formValues);
  if (error) {
    console.error(error);
    submitError.value = error;
    return;
  }
  router.push("/")
}
</script>

<template>
  <main>
    <img src="@/assets/QBLoginLogo.png" alt="Quizzebassen logo" class="logo">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <Input label="Email" placeholder="Email" v-model="formValues.email"/>
      <Input label="Password" placeholder="Password" v-model="formValues.password" type="password"/>
      <Button type="submit">Login</Button>
      <span style="color:red;">{{ submitError }}</span>
    </form>
    <p>Not already a user? <router-link to="/register"> Register here</router-link></p>
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
  padding: 2rem;
}

button {
  margin-top: 1rem;
  font-size: medium;
}

.logo {
  width: 22%;
  height: auto;
  min-width: 150px;
  margin-bottom: 1rem;
  margin-top: 3rem;
}

@media (max-width: 768px) {
  main {
    padding: 1rem;
  }
}

</style>
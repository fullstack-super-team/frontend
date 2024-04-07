<script setup>
/**
 * Script setup for the login view component.
 * Composes the login form's reactive state, handles the login process,
 * and navigates the user based on successful authentication.
 */
import { ref, reactive } from 'vue';
import Input from "@/components/Input.vue";
import store from '@/stores/mainStore';
import Button from "@/components/Button.vue";
import { useRouter } from 'vue-router';
const router = useRouter();

/**
 * The reactive state for the login form containing the user's credentials.
 *
 * @type {Object}
 */
const formValues = reactive({
  email: "",
  password: "",
});

/**
 * A ref to hold any error messages that may arise during form submission.
 *
 * @type {Ref<null|string>}
 */
const submitError = ref(null);

/**
 * Handle the form submission and perform user login.
 * Dispatches a login action to the store, checks for errors, and navigates
 * to the root route on successful login.
 */
async function login() {
  submitError.value = null;
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
      <span v-if="submitError" style="color:red;">{{ submitError }}</span>
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

span {
  color: red;
  margin-top: 5px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}

@media (max-width: 768px) {
  main {
    padding: 1rem;
  }
}
</style>
<script setup>
import { reactive } from 'vue'
import MainStore from '@/stores/mainStore'
import Input from "@/components/Input.vue";
import store from '@/stores/mainStore';
import Button from "@/components/Button.vue";
import { useRouter } from 'vue-router';

/**
 * Script setup for user registration.
 * Defines the reactive state for form values and validation errors.
 */

/**
 * Used to access and dispatch state.
 *
 * @type {Router}
 */
const router = useRouter();

/**
 * Reactive state for the registration form containing the user's details.
 *
 * @type {UnwrapNestedRefs<{firstName: string, lastName: string, password: string, email: string, username: string}>}
 */
const formValues = reactive({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
});

/**
 * Reactive state for the registration form containing the error messages.
 *
 * @type {UnwrapNestedRefs<{firstName: null, lastName: null, formSubmission: null, password: null, email: null,
 * username: null}>}
 */
const errorMessages = reactive({
  firstName: null,
  lastName: null,
  username: null,
  email: null,
  password: null,
  formSubmission: null,
});

/**
 * Validates the registration form.
 *
 * @returns {boolean} - True if the form is valid, false otherwise.
 */
const validateForm = () => {
  errorMessages.firstName = !formValues.firstName ? "First name is required" : null;

  errorMessages.lastName = !formValues.lastName ? "Last name is required" : null;

  errorMessages.username = !formValues.username ? "Username is required" : null;

  errorMessages.email = !formValues.email ? "Email is required" :
    !validateEmail(formValues.email) ? "Please enter a valid email address: example@domain.com" : null;

  errorMessages.password = !formValues.password ? "Password is required" :
      formValues.password.length < 8 ? "Password must be at least 8 characters" : null;

  return !errorMessages.firstName && !errorMessages.lastName && !errorMessages.username && !errorMessages.email &&
      !errorMessages.password;
}

/**
 * Validates an email address.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Registers a new user.
 *
 * @returns {Promise<void>}
 */
async function register() {
  if (!validateForm()) {
    return;
  }
  const error = await store.dispatch("user/register", formValues);
  if (error) {
    console.log(error);
    errorMessages.formSubmission = error;
    return;
  }
  router.push("/")
}
</script>

<template>
  <main>
    <img src="@/assets/QBLoginLogo.png" alt="Quizzebassen logo" class="logo">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <Input label="First name" placeholder="First name" v-model="formValues.firstName"
             :error-message="errorMessages.firstName"/>
      <Input label="Last name" placeholder="Last name" v-model="formValues.lastName"
             :error-message="errorMessages.lastName"/>
      <Input label="Username" placeholder="Username" v-model="formValues.username"
             :error-message="errorMessages.username"/>
      <Input label="Email" placeholder="Email" v-model="formValues.email"
             :error-message="errorMessages.email"/>
      <Input label="Password" placeholder="Password" type="password" v-model="formValues.password"
             :error-message="errorMessages.password"/>
      <Button type="submit">Register</Button>
      <span style="color:red;">{{ errorMessages.formSubmission }}</span>
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

.logo {
  width: 25%;
  height: auto;
  min-width: 150px;
  margin-bottom: 1rem;
  margin-top: 3rem;
}

button {
  margin-top: 1rem;
  font-size: medium;
}
</style>@/stores/userModule
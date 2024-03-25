<script setup>
import { RouterLink, useRouter } from "vue-router";
import store from "@/stores/mainStore";

const router = useRouter();


async function logout() {
  await store.dispatch("user/logout");
  // Redirect to login page
  router.push("/login");
}
</script>

<template>
  <nav class="nav">
    <img src="@/assets/quizzebazzen.webp" alt="Quiz Bear Logo" class="logo" />
    <div class="links">
      <RouterLink v-if="store.state.user.isLoggedIn" to="/">Dashboard</RouterLink>
      <RouterLink v-if="store.state.user.isLoggedIn" to="/create-quiz">Create quiz</RouterLink>
      <RouterLink v-if="!store.state.user.isLoggedIn" to="/login">Login</RouterLink>
      <RouterLink v-if="!store.state.user.isLoggedIn" to="/register">Register</RouterLink>
      <span v-if="store.state.user.isLoggedIn">Logged in as: {{ store.state.user.name }}</span>
      <button v-if="store.state.user.isLoggedIn" @click="logout()">Log Out</button>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  width: 100%;
  display: flex;
  padding: 20px;
  padding-left: 20px;
  justify-content: space-between;
}

.logo {
  height: 50px; /* Adjust based on your navbar size */
  width: auto;
  /* Add more styling for the logo if needed */
}

.links {
  display: flex;
  gap: 20px;
}
</style>@/stores/userModule
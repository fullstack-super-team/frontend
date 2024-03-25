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
    <p>LOGO</p>
    <div class="links">
      <RouterLink v-if="store.state.user.isLoggedIn" to="/">Dashboard</RouterLink>
      <RouterLink v-if="!store.state.user.isLoggedIn" to="/login">Login</RouterLink>
      <RouterLink v-if="!store.state.user.isLoggedIn" to="/register">Register</RouterLink>      
      <span v-if="store.state.user.isLoggedIn">Logget inn som: {{ store.state.user.name }}</span>      
      <button v-if="store.state.user.isLoggedIn" @click="logout()">Logg ut</button>
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

.links {
  display: flex;
  gap: 20px;
}
</style>@/stores/userModule
<script setup>
import { RouterLink, useRouter } from "vue-router";
import store from "@/stores/mainStore";
import {ref} from "vue";

const router = useRouter();

const navOpen = ref(false);
const isMobileMenu = ref(window.innerWidth < 768);

const updateMenu = () => {
  isMobileMenu.value = window.innerWidth < 768;
  if (!isMobileMenu.value) {
    navOpen.value = false;
  }
};
window.addEventListener("resize", updateMenu);
const toggleNav = () => {
  navOpen.value = !navOpen.value;
  console.log(navOpen.value);
};

async function logout() {
  await store.dispatch("user/logout");
  // Redirect to login page
  router.push("/login");
}
</script>

<template>
  <nav :class="{ 'nav': isMobileMenu }">
    <div v-if="isMobileMenu" class="mobileView">
      <RouterLink to="/">
        <img src="@/assets/quizze.png" alt="Quiz Bear Logo" class="logo" />
      </RouterLink>
      <button @click="toggleNav()" class="hamburger-btn"></button>
    </div>
      <div v-show="!isMobileMenu || navOpen" class="links">
        <RouterLink v-if="store.state.user.isLoggedIn & !navOpen" to="/">
          <img src="@/assets/quizze.png" alt="Quiz Bear Logo" class="logo" />
        </RouterLink>
        <input type="text" v-model="searchInput" placeholder="Search quizzes" class="search"/>
        <RouterLink v-if="store.state.user.isLoggedIn" to="/create-quiz" class="nav-item">
          <img src="@/assets/addIcon.png" alt="Add Icon" class="nav-icon"/>
          <div class="nav-text">
            CREATE<br>QUIZ
          </div>
        </RouterLink>
        <RouterLink v-if="store.state.user.isLoggedIn" to="/profile" class ="nav-item">
          <img src="@/assets/profileIcon.png" alt="Profile Icon" class="nav-icon"/>
          <div class="nav-text">
            PROFILE
          </div>
        </RouterLink>
        <RouterLink v-if="!store.state.user.isLoggedIn" to="/login">Login</RouterLink>
        <RouterLink v-if="!store.state.user.isLoggedIn" to="/register">Register</RouterLink>
        <!--
        <span v-if="store.state.user.isLoggedIn">Logged in as: {{ store.state.user.name }}</span>
        <button v-if="store.state.user.isLoggedIn" @click="logout()">Log Out</button>
        -->
      </div>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  justify-content: space-between;
}

.mobileView {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  height: 60px; /* Adjust based on your navbar size */
  width: auto;
  /* Add more styling for the logo if needed */
}

.links {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
}
.nav-icon {
  height: 60px;
  width: auto;
  margin-right: 5px;
}
.nav-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-weight: bold;
}
a {
  text-decoration:none;
}

.nav-item {
  display: flex;
  align-items: center;
  position: relative; /* Needed to position the pseudo-element */
  padding-bottom: 5px; /* Space for the bar */
}
/* Hover effect */
.nav-item:hover::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%; /* Full width of the nav-item */
  height: 2px; /* Thickness of the bar */
  background-color: #BCDEFB; /* Color of the bar */
  border-radius: 10px; /* Rounded corners */
  transition: background-color 0.3s ease; /* Smooth transition for the color */
}
.search {
  flex-grow: 1;
  display: flex;
  height: 60px;
  justify-content: center;
  padding: 10px 45px;
  background: url(src/assets/searchIcon.png) no-repeat 15px center;
  background-size: 15px 15px;
  border-radius: 15px;
  border: solid black;
}

.hamburger-btn {
  display: none;
  background: url(@/assets/hamburgerIcon.png) no-repeat center;
  background-size: cover;
  height: 30px;
  width: 30px;
  border: none;
}

@media (max-width: 768px) {
  .links {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    width: 100%;
  }
  .nav-item, .search {
    width: 100%;
  }

  .hamburger-btn {
    display: block;
    margin-left: auto;
  }

  .nav {
    flex-direction: column;
    align-items: center;
  }

  .search {
    margin: 20px 0;
  }
}

</style>@/stores/userModule


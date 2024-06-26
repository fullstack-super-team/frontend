<script setup>
import { RouterLink, useRouter } from "vue-router";
import store from "@/stores/mainStore";
import {ref} from "vue";

/**
 * A navigation bar component that displays the logo, search bar, and navigation links.
 */

const router = useRouter();
const search = ref("");

const navOpen = ref(false);
const isMobileMenu = ref(window.innerWidth < 768);

/**
 * Updates the menu based on the window width.
 */
const updateMenu = () => {
  isMobileMenu.value = window.innerWidth < 768;
  if (!isMobileMenu.value) {
    navOpen.value = false;
  }
};

/**
 * Adds an event listener to update the menu when the window is resized.
 */
window.addEventListener("resize", updateMenu);

/**
 * Toggles the navigation menu on mobile devices.
 */
const toggleNav = () => {
  navOpen.value = !navOpen.value;
  console.log(navOpen.value);
};

/**
 * Searches for a quiz based on the search input.
 * @param {Event} event - The event object.
 */
async function searchForQuiz(event) {
  event.preventDefault();
  router.push({ path: "/search", query: { title: search.value } });
}
</script>

<template>
  <nav :class="{ 'nav': isMobileMenu }">
    <div v-if="isMobileMenu" class="mobileView">
      <RouterLink to="/">
        <img src="@/assets/QBLoginLogo.png" alt="Quiz Bear Logo" class="logo" />
      </RouterLink>
      <button @click="toggleNav()" class="hamburger-btn"></button>
    </div>
      <div v-show="!isMobileMenu || navOpen" class="links">
        <RouterLink v-if="store.state.user.isLoggedIn & !navOpen" to="/">
          <img src="@/assets/QBLoginLogo.png" alt="Quiz Bear Logo" class="logo" />
        </RouterLink>
        <form @submit="searchForQuiz" style="flex-grow: 1;">
          <input id="search" type="text" v-model="search" placeholder="Search quizzes" class="search"/>
        </form>
        <RouterLink v-if="store.state.user.isLoggedIn" to="/create-quiz" class="nav-item">
          <img src="@/assets/addQuizz.png" alt="Add Icon" class="nav-icon"/>
          <div class="nav-text">
            CREATE QUIZ
          </div>
        </RouterLink>
        <RouterLink v-if="store.state.user.isLoggedIn" to="/profile" class ="nav-item">
          <img src="@/assets/QBRoundLogo.png" alt="Profile Icon" class="nav-icon"/>
          <div class="nav-text">
            PROFILE
          </div>
        </RouterLink>
        <RouterLink v-if="!store.state.user.isLoggedIn" to="/login">Login</RouterLink>
        <RouterLink v-if="!store.state.user.isLoggedIn" to="/register">Register</RouterLink>
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
  background-color: #BCDEFB;
}

.mobileView {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  height: 60px;
  width: auto;
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
  font-family: "Monserrat", sans-serif;
  text-decoration:none;
}

.nav-text:hover {
  text-decoration: underline;
}

.nav-item {
  display: flex;
  align-items: center;
  position: relative;
  padding-bottom: 5px;
}

.nav-item:hover::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #BCDEFB;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.search {
  width: 100%;
  display: flex;
  height: 60px;
  justify-content: center;
  padding: 10px 45px;
  background: url(@/assets/searchIcon.png) no-repeat 15px center;
  background-size: 15px 15px;
  border-radius: 15px;
  border: #08589CFF;
  background-color: #ffffff;
}

.hamburger-btn {
  display: none;
  background: url(@/assets/hamburgerIcon.png) no-repeat center;
  background-size: cover;
  height: 60px;
  width: 60px;
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


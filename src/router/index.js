import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import store from "@/stores/mainStore";
import RegisterView from "@/views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "DashboardView",
      component: DashboardView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView
    },
  ]
})

// Define the global beforeEach guard
router.beforeEach((to, from, next) => {
  // Here, implement the logic to check if the user is logged in
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Assume `isUserLoggedIn` is a function you've defined to check login status
    if (!store.state.user.isLoggedIn) {
      // If the user is not logged in, redirect to the login page
      next('/login');
    } else {
      // If the user is logged in, proceed to the route
      next();
    }
  } else {
    // If the route does not require authentication, always proceed
    next();
  }
});

export default router;
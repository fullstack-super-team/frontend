import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import store from "@/stores/mainStore";
import RegisterView from "@/views/RegisterView.vue";
import CreateQuizView from "@/views/CreateQuizView.vue";
import FeedbackView from "@/views/FeedbackView.vue";
import GameModeView from "@/views/GameModeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SearchView from "@/views/SearchView.vue";
import QuizView from "@/views/QuizView.vue";
import HighscoreView from "@/views/HighscoreView.vue";
import EditQuizView from "@/views/EditQuizView.vue";

/**
 * Create a new router instance.
 *
 * @type {Router}
 */
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
    {
      path: "/create-quiz",
      name: "CreateQuiz",
      component: CreateQuizView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/quiz/:id/edit",
      name: "EditQuiz",
      component: EditQuizView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/feedback",
      name: "Feedback",
      component: FeedbackView
    },
    {
      path: "/quiz/:id/play",
      name: "GameMode",
      component: GameModeView
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/search",
      name: "Search",
      component: SearchView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/quiz/:id",
      name: "Quiz",
      component: QuizView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/quiz/:id/high-score",
      name: "HighScore",
      component: HighscoreView
    }
  ]
})

/**
 * Global navigation guard.
 *
 * Checks if the target route requires authentication (indicated by the `requiresAuth` meta field).
 * If the route requires authentication, check if the user is logged in (by checking `store.state.user.isLoggedIn`).
 * If not logged in, redirect to the login page. Otherwise, proceed to the route.
 *
 *
 * Ensures that only authenticated users can access certain routes,
 * while unauthenticated can access routes that do not require authentication.
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
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

/**
 * Exports the router.
 */
export default router;
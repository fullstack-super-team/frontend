<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import mainStore from '@/stores/mainStore.js';
import { useRouter } from 'vue-router';
import QuizForm from '@/components/QuizForm.vue';

/**
 * Script setup for the Quiz Edit View.
 * Handles the logic for fetching and saving a quiz.
 * Leverages the Vue Router for routing and the Vuex store for state management.
 */

const router = useRouter();
const quizId = router.currentRoute.value.params.id;

/**
 * Fetches the quiz with the specified ID from the store.
 */
mainStore.dispatch('quiz/fetchQuizById', quizId);

/**
 * Saves the updated quiz details to the store and navigates to the quiz detail page,
 * when a user submits the quiz form with updated data.
 * It ensures that a title is present before dispatching the update action.
 * Throws an error if the quiz update action fails.
 *
 * @async
 * @function saveQuiz
 * @param {Object} quiz - The quiz object containing updated information.
 * @param {string} quiz.title - The title of the quiz. It must be non-empty.
 * @param {Object} [quiz.details] - Optional additional details about the quiz.
 */
async function saveQuiz(quiz) {  
  if (!quiz.title) {
    return;
  }
  await mainStore.dispatch('quiz/updateQuiz', {
    id: quizId,
    quiz
  });  
  router.push(`/quiz/${mainStore.state.quiz.quiz.id}`);
};
</script>

<template>
  <MainLayout>    
    <QuizForm form-title="Edit Quiz" @submit="saveQuiz" :initial-values="mainStore.state.quiz.quiz" />
  </MainLayout>
</template>

<style scoped>
.upperBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.is-invalid {
  border-color: red;
}

.validation-error {
  color: red;
  font-size: 0.9em;
}

.dropdownMenus {
  margin-bottom: 20px;
}
</style>

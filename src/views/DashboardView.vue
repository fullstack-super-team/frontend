<script setup>
/**
 * Setup script for the Dashboard View where quizzes are displayed.
 * This script handles the importing of the main layout, quiz card components,
 * and the main store module. It also dispatches an action to fetch quizzes
 * when the component is initialized.
 */

import MainLayout from '@/layouts/MainLayout.vue';
import QuizCard from "@/components/QuizCard.vue";
import mainStore from '@/stores/mainStore';

/**
 * Requesting the list of quizzes from the store as the component loads.
 */
mainStore.dispatch('quiz/fetchQuizzes');
mainStore.dispatch('quiz/fetchRecentQuizzes');
</script>

<template>
  <MainLayout>
    <h1>Dashboard</h1>
    <hr>
    <h2>Recent</h2>
    <div class="quiz-preview-container">
      <QuizCard v-for="(quiz, index) in mainStore.state.quiz.recentQuizzes" :key="index" :quiz="quiz" />
      <span v-if="mainStore.state.quiz.recentQuizzes.length === 0">No recent quizzes yet</span>
    </div>
    <hr class="second-dash">
    <h2>My Quizzes</h2>
    <div class="quiz-preview-container">
      <QuizCard v-for="(quiz, index) in mainStore.state.quiz.quizzes" :key="index" :quiz="quiz" />
      <span v-if="mainStore.state.quiz.quizzes.length === 0">No quizzes yet. Create one!</span>
    </div>
  </MainLayout>
</template>


<style scoped>
.quiz-preview-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  justify-content: flex-start;
}

h2 {
  margin-top: 20px;
}

hr {
  border: none;
  height: 2px;
  background-color: #08589CFF;
}

.second-dash {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .quiz-preview-container {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
}
</style>
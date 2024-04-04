<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import QuizCard from "@/components/QuizCard.vue";
import mainStore from '@/stores/mainStore';

mainStore.dispatch('quiz/fetchQuizzes');
</script>

<template>
  <MainLayout>
    <h1>Dashboard</h1>
    <hr>
    <h2>Recent</h2>
    <div class="quiz-preview-container">
      <!-- Use QuizCard component for each quiz -->
      <QuizCard v-for="(quiz, index) in mainStore.state.quiz.quizzes" :key="index" :quiz="quiz" />
      <span v-if="mainStore.state.quiz.quizzes.length === 0">No recent quizzes yet</span>
    </div>
    <hr>
    <h2>My Quizzes</h2>
    <div class="quiz-preview-container">
      <!-- Repeat usage of QuizCard component for each quiz -->
      <QuizCard v-for="(quiz, index) in mainStore.state.quiz.quizzes" :key="index" :quiz="quiz" />
      <span v-if="mainStore.state.quiz.quizzes.length === 0">No quizzes yet. Create one!</span>
    </div>
  </MainLayout>
</template>


<style scoped>
.quiz-preview-container {
  display: flex;
  flex-wrap: wrap; /* Allows cards to wrap to the next line if the container is too narrow */
  justify-content: space-around; /* Spreads the cards evenly with space around them */
  gap: 20px; /* Provides space between cards */
}

.quiz-card {
  flex: 0 1 calc(33.333% - 20px); /* Allows cards to grow and shrink, with 3 cards per row */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Adds a shadow for depth, optional */
  padding: 20px;
  text-align: center; /* Centers the content inside each card */
}

/* Mobile styles */
@media (max-width: 768px) { /* Adjust this breakpoint as needed */
  .quiz-preview-container {
    flex-direction: column;
    align-items: stretch; /* Centers the cards vertically */
    gap: 10px; /* Adjusts gap for mobile, can be reduced or removed */
  }

  .quiz-card {
    flex: 0 0 auto; /* Allows the card to grow to fit the container width */
    width: 100%; /* Ensures card takes up 100% of the container width */
    padding: 10px; /* Adjust padding for mobile, can be reduced for more space */
    box-shadow: none; /* Optional: adjust or remove styles not needed on mobile */
  }
}

</style>
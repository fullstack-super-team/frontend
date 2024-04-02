<script setup>
import mainStore from "@/stores/mainStore";
import MainLayout from "@/layouts/MainLayout.vue";
import AnswerCard from "@/components/AnswerButton.vue";

mainStore.dispatch('game/loadQuizById', 1);

</script>

<template>
  <MainLayout>
    <h2 class="question-text">{{ mainStore.state.game.currentQuestion.text }}</h2>
    <div class="answer-container">
      <AnswerCard v-if="mainStore.state.game.currentQuestion.type==='TEXT'" v-for="(answer, index) in mainStore.state.game.currentQuestion.answers" :key="index" :answer="answer" />
    </div>
  </MainLayout>

</template>

<style scoped>
.question-text {
  font-size: 24px;
  color: #333;
  text-align: center;
}

.answer-container {
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns with 50% width each */
  justify-content: space-around; /* Spreads the cards evenly with space around them */
  gap: 5px; /* Provides space between cards */
}

/* Mobile styles */
@media (max-width: 768px) {
  .answer-container {
    grid-template-columns: 1fr; /* Single column layout */
  }
}

</style>
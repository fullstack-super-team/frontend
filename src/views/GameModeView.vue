<script setup>

import MainLayout from "@/layouts/MainLayout.vue";
import {ref} from "vue";
import AnswerCard from "@/components/AnswerCard.vue";

const question = ref({
  text: 'What is the capital of France?',
  points: 10,
  type: 'TEXT',
  answers: [
    { text: 'Paris', isCorrect: true },
    { text: 'London', isCorrect: false },
    { text: 'Berlin', isCorrect: false },

  ]
});

</script>

<template>
  <MainLayout>
    <h2 class="question-text">{{ question.text }}</h2>
    <div class="answer-container">
      <AnswerCard v-for="(answer, index) in question.answers" :key="index" :answer="answer" />
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
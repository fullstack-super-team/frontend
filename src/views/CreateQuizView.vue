<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import mainStore from '@/stores/mainStore.js';
import { useRouter } from 'vue-router';
import QuizForm from '@/components/QuizForm.vue';

/**
 * Script setup for creating a new quiz.
 * Uses the Composition API to handle the quiz creation.
 * Imports necessary components and the store sets up router for navigation,
 * and defines the function to create a new quiz and navigate to its detail page.
 */

const router = useRouter();

/**
 * Creates a new quiz and redirects to the quiz detail page.
 * Throws an error if the quiz creation fails.
 *
 * @param {Object} quiz - An object containing the details of the new quiz, such as the title.
 */
async function createQuiz(quiz) {  
  if (!quiz.title) {
    return;
  }
  console.log(quiz)
  await mainStore.dispatch('quiz/createQuiz', quiz);  
  router.push(`/quiz/${mainStore.state.quiz.quiz.id}`);
};
</script>

<template>
  <MainLayout>
    <QuizForm form-title="Create Quiz" submit-form-text="Create" @submit="createQuiz" />
  </MainLayout>
</template>

<style scoped>
</style>

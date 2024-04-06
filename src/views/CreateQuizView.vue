<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import mainStore from '@/stores/mainStore.js';
import { useRouter } from 'vue-router';
import QuizForm from '@/components/QuizForm.vue';

const router = useRouter();

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

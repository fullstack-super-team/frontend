<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useRoute } from 'vue-router';
import mainStore from "@/stores/mainStore";
import QuizCard from '@/components/QuizCard.vue';
import { watch } from 'vue';

const route = useRoute();
const { title } = route.query;

watch(() => route.query.title, (title) => {
  mainStore.dispatch('quiz/searchForQuiz', title);
});
mainStore.dispatch('quiz/searchForQuiz', title);

</script>

<template>
  <MainLayout>
    <QuizCard v-for="quiz in mainStore.state.quiz.searchedQuizzes" :key="quiz.id" :quiz="quiz" />
    <div v-if="mainStore.state.quiz.searchedQuizzes.length === 0">
      <span>No Quizzes found...</span>
    </div>
  </MainLayout>
</template>

<style scoped>
</style>
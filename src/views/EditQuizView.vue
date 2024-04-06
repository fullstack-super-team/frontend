<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import mainStore from '@/stores/mainStore.js';
import { useRouter } from 'vue-router';
import QuizForm from '@/components/QuizForm.vue';

const router = useRouter();
const quizId = router.currentRoute.value.params.id;

mainStore.dispatch('quiz/fetchQuizById', quizId);

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
  /* Add your error styling here */
}

.validation-error {
  color: red;
  /* Style for the validation message */
  font-size: 0.9em;
}

.dropdownMenus {
  margin-bottom: 20px;
  /* Additional style for spacing */
}

/* Additional styles for .dropdownMenus and other classes can be added here */
</style>

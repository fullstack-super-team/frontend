<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useRoute } from 'vue-router';
import mainStore from "@/stores/mainStore";
import QuizCard from '@/components/QuizCard.vue';
import { watch } from 'vue';
import { Category, getCategories } from "@/utils/category.js";
import { DifficultyLevel, getDifficultyLevels } from "@/utils/difficultyLevel.js";

const route = useRoute();
const { title } = route.query;

const quiz = {
  category: Category.GENERAL,
  difficultyLevel: DifficultyLevel.EASY,
};

watch(() => route.query.title, (title) => {
  mainStore.dispatch('quiz/searchForQuiz', title);
});
mainStore.dispatch('quiz/searchForQuiz', title);

</script>

<template>
  <MainLayout>
    <h1>Search Results for: '{{ route.query.title }}'</h1>
    <div class="dropdownMenus">
      <h3>Filter:</h3>
      <div class="dropdown-category">
        <h3 class="label"> Category</h3>
        <select v-model="quiz.category" class="dropdown">
          <option v-for="category in getCategories()" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
      </div>

      <div class="dropdown-difficulty">
        <h3 class="label">Difficulty</h3>
        <select v-model="quiz.difficultyLevel" class="dropdown">
          <option v-for="difficultyLevel in getDifficultyLevels()" :key="difficultyLevel.value"
                  :value="difficultyLevel.value">
            {{ difficultyLevel.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="container">
      <QuizCard v-for="quiz in mainStore.state.quiz.searchedQuizzes" :key="quiz.id" :quiz="quiz" />
    </div>
    <div v-if="mainStore.state.quiz.searchedQuizzes.length === 0">
      <span class="Message">No Quizzes found...</span>
    </div>
  </MainLayout>
</template>

<style scoped>
.container {
  display: grid;
  grid-column: 3;
  gap: 20px;
}

.dropdownMenus {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
}

.Message {
  color: red;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}

@media (max-width: 768px) {
  .dropdownMenus {
    flex-direction: row;
    align-items: flex-start;
    gap: 5px;
  }

  .dropdownMenus h3 {
    margin: 0;
    font-size: 1em;
    margin-right: auto;
  }

  .dropdownMenus .label {
    width: 100%;
  }

  .dropdownMenus select.dropdown {
    width: 100%;
    margin-bottom: 15px;
  }
}
</style>
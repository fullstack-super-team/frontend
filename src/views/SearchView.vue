<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useRoute } from 'vue-router';
import mainStore from "@/stores/mainStore";
import QuizCard from '@/components/QuizCard.vue';
import {computed, reactive, watch} from 'vue';
import { Category, getCategories } from "@/utils/category.js";
import { DifficultyLevel, getDifficultyLevels } from "@/utils/difficultyLevel.js";

/**
 * Script setup for the Search View.
 * Handles the search logic and UI state changes.
 */

/**
 * Route object used to access the route query.
 */
const route = useRoute();

/**
 * Title derived from the route query.
 *
 * @type {string}
 */
const { title } = route.query;

/**
 * Reactive state for the quiz search filters.
 *
 * @type {UnwrapNestedRefs<{difficultyLevel: string, category: string}>}
 */
const quiz = reactive({
  category: "",
  difficultyLevel: "",
});

/**
 * Watches the route query for changes and dispatches a search for quizzes based on the title.
 *
 * @param {string} title - The title of the quiz to search for.
 */
watch(() => route.query.title, (title) => {
  mainStore.dispatch('quiz/searchForQuiz', title);
});

/**
 * Initial Dispatch for Quiz Search
 *
 * @param {string} title - The title of the quiz to search for.
 */
mainStore.dispatch('quiz/searchForQuiz', title);

/**
 * Computed property that filters quizzes based on category and difficulty level.
 *
 * @returns {Array<Object>} - The filtered list of quizzes.
 */
const searchedQuizzes = computed(() => {
  let quizzes = mainStore.state.quiz.searchedQuizzes;
  if (quiz.category) {
    quizzes = quizzes.filter(searchedQuiz =>
        Category[searchedQuiz.category] === quiz.category
    );
  }
  if (quiz.difficultyLevel) {
    quizzes = quizzes.filter(searchedQuiz =>
        DifficultyLevel[searchedQuiz.difficultyLevel] === quiz.difficultyLevel
    );
  }
  return quizzes;
});
</script>

<template>
  <MainLayout>
    <h1>Search Results for: '{{ route.query.title }}'</h1>
    <div class="dropdownMenus">
      <h3>Filter:</h3>
      <div class="dropdown-category">
        <select v-model="quiz.category" class="dropdown">
          <option value="" selected>Select a category</option>
          <option v-for="category in getCategories()" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
      </div>
      <div class="dropdown-difficulty">
        <select v-model="quiz.difficultyLevel" class="dropdown" @change="">
          <option value="" selected>Select difficulty</option>
          <option v-for="difficultyLevel in getDifficultyLevels()"
                  :key="difficultyLevel.value"
                  :value="difficultyLevel.value">
            {{ difficultyLevel.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="quizCardContainer">
      <QuizCard v-for="quiz in searchedQuizzes" :key="quiz.id" :quiz="quiz" />
    </div>
    <div v-if="searchedQuizzes.length === 0">
      <span class="Message">No Quizzes found...</span>
    </div>
  </MainLayout>
</template>

<style scoped>
.quizCardContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
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
  font-size: 25px;
}

.dropdown .default-option {
  color: grey;
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

  .quizCardContainer {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
}
</style>
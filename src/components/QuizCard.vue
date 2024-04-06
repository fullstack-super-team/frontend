<script setup>
/**
 * A Vue component script for displaying a quiz with a randomly selected color theme.
 * The component expects a `quiz` object as a prop, which should contain details
 * about the quiz such as id, title, category, questions, and the number of questions.
 */

// Imports from vue-router and vue for routing and reactive references.
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

/**
 * An array of colors used for the quiz cards.
 * @type {string[]}
 */
const colors = ['#ff914d', '#1792ea', '#78d64f', '#8c52ff']

/**
 * A reactive reference to a randomly chosen color from the `colors` array.
 * @type {Ref<string>}
 */
const randomColor = ref(colors[Math.floor(Math.random() * colors.length)]);

/**
 * Defines the props expected by the component.
 * The `quiz` prop is required and has a default structure if not provided.
 */
defineProps({
  quiz: {
    type: Object,
    required: true,
    default: () => ({
      id: 2,
      title: '',
      category: '',
      questions: '',
      numberOfQuestions: 0
    })
  }
});
</script>


<template>
  <RouterLink :to="`/quiz/${quiz.id}`" class="quiz-card quiz-card-holder" :style="{ backgroundColor: randomColor}">
    <h3>{{ quiz.title }}</h3>
    <p class="category">{{ quiz.category }}</p>
    <p class="questions-count">{{ quiz.questions.length }} Questions</p>
  </RouterLink>
</template>


<style scoped>
.quiz-card {
  border: 2px solid #08589CFF;
  border-radius: 8px;
  text-decoration: none;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  max-width: 33%;
}

.quiz-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

h3 {
  margin: 0;
  color: white;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}

.category {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.76);
  margin: 10px 0 5px;
}

.questions-count {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.76);
}

@media (max-width: 768px) {
  .quiz-card {
    padding: 10px;
    flex: 80%;
    max-width: 100%;
  }

  h3 {
    font-size: 20px;
  }

  .category {
    font-size: 16px;
  }

  .questions-count {
    font-size: 14px;
  }
}
</style>

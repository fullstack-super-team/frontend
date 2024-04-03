<script setup>
defineProps({
  quiz: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      category: '',
      questions: '',
      numberOfQuestions: 0
    })
  }
});
</script>


<template>
  <div class="quiz-card">
    <h3>{{ quiz.title }}</h3>
    <p class="category">{{ quiz.category }}</p>
    <p class="questions-count">{{ quiz.questions.length }} Questions</p>
  </div>
</template>


<style scoped>
.quiz-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.quiz-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

h3 {
  margin: 0;
  color: #333;
  font-size: 24px;
}

.category {
  font-size: 18px;
  color: #666;
  margin: 10px 0 5px;
}

.questions-count {
  font-size: 16px;
  color: #444;
}

@media (max-width: 768px) {
  .quiz-card {
    padding: 10px;
    flex: 80%;
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

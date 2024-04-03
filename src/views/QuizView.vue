<script setup>
import { computed} from "vue";
import Button from "@/components/Button.vue";
import MainStore from "@/stores/mainStore.js";
import MainLayout from "@/layouts/MainLayout.vue";
import router from "@/router/index.js";

MainStore.dispatch('quiz/fetchQuizById', 1);

console.log(MainStore.state.quiz.quiz.author.id, MainStore.state.user.id);

const isAuthor = computed(() => {
  return MainStore.state.quiz.quiz.author.id === MainStore.state.user.id;
});

const startQuiz = () => {
  router.push(`/quiz/${MainStore.state.quiz.quiz.id}/play`);
  console.log('Starting quiz');
}

//TODO: listen sortert på dato
</script>

<template>
  <MainLayout>
    <div class="quizView-container">
      <header class="quizView-header">
        <h1 class="quizView-title">{{MainStore.state.quiz.quiz.title}}</h1>
        <Button v-if="isAuthor" class="edit-button">Edit</Button>
      </header>
      <div class="quizView-content">
        <div class="quizView-meta">
          <p><strong>By: </strong>{{MainStore.state.quiz.quiz.author.firstName}} {{MainStore.state.quiz.quiz.author.lastName}}</p>
          <p><strong>Last edited: </strong>{{MainStore.state.quiz.quiz.updatedAt}} </p>
          <p><strong>Description: </strong>{{MainStore.state.quiz.quiz.description}}</p>
          <p><strong>Category: </strong>{{MainStore.state.quiz.quiz.category}}</p>
        </div>
        <div class="quizView-statistics">
          <h3>Recent attempts</h3>
          <ul>
            <li v-for="(scores, index) in MainStore.state.quiz.quiz.scores" :key="index">
              <p>{{ scores.score }}/{{ scores.total }} - {{ scores.date }}</p>
            </li>
          </ul>
        </div>
      </div>
      <Button class="start-quiz-button" @click="startQuiz">Start</Button>
    </div>
  </MainLayout>
</template>

<style scoped>
.quizView-container {
  padding: 20px;
  max-width: 80%;
  margin: auto;
  position: relative;
}

.quizView-title {
  text-align: center;
  flex-grow: 1;
}

.quizView-statistics {
  margin-top: 20px;
}

.quizView-attempts ul {
  list-style-type: none;
  padding: 0;
}

.quizView-statistics li {
  margin-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.quizView-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.quizView-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.start-quiz-button {
  margin-top: 20px;
  padding: 15px 30px;
  font-size: 30px;
  width: 60%;
}

.start-quiz-button {
  padding: 15px 30px;
  position: sticky;
  bottom: 20px;
  left: 10px;
  right: 10px;
  width: calc(100% - 20px);
  transform: none;

}

@media (max-width: 768px) {
  .quizView-content {
    flex-direction: column;
  }
  .start-quiz-button {
    left: 10px;
    right: 10px;
    width: calc(100% - 20px);
    transform: none;
  }
}
</style>
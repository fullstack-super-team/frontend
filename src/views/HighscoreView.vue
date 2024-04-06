<script setup>
import mainStore from "@/stores/mainStore.js";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import {formatDate} from "../utils/dateFormatter.js";

const url = useRoute();
const highScores = mainStore.state.game.highScoreList;
const quizId = url.params.id;
const quizTitle = mainStore.state.quiz.quiz.title;
const numberOfQuestions = mainStore.state.game.quiz.questions.length;

const correctAnswers = mainStore.state.game.answers.filter(answer => answer.pointsGiven > 0)
const numberOfCorrectAnswers = correctAnswers.length;


function backToQuizPage() {
  router.push(`/quiz/${quizId}`);
}

</script>

<template>
  <div class="score-header">
    <h1 class="title">{{ quizTitle }}</h1>
    <Button class="finish-btn" @click="backToQuizPage">Finish</Button>
  </div>
  <div class="score-container">
    <div class="result">
      <h2>YOU GOT</h2>
      <h1>{{numberOfCorrectAnswers}} / {{numberOfQuestions}}</h1>
      <h2>CORRECT ANSWERS</h2>
      <h2>POINTS: {{mainStore.state.game.currentPoints}}</h2>
    </div>
    <div class="high-score">
      <h2 class="high-score-title">HIGH SCORE</h2>
      <ul class="numbered-list">
        <li v-for="score in highScores" :key="score.id">
          {{ score.user.username }} - {{ score.points }}/{{ mainStore.state.game.totalPoints }} {{ formatDate(score.date) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
body {
  padding: 20px;
}

.score-header {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 20px;
}

.title {
  margin-right: auto;
}

.high-score {
  text-align: center;
  background-color: #0f3f6b;
  border-radius: 30px;
  padding: 20px;
  margin: 20px 0;
  width: 50%;
  box-sizing: border-box;
}

.high-score-title {
  color: #ffffff;
}

.finish-btn {
  margin-left: auto;
  margin-right: 0;
}

.score-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  position: relative;
}

.result {
  text-align: center;
}

.numbered-list {
  list-style-type: none;
  padding: 0;
  counter-reset: list-item;
}

.numbered-list li {
  counter-increment: list-item;
  padding-left: 1em;
  color: white;
  padding-bottom: 5px;
}

.numbered-list li,
.numbered-list li::before {
  color: white;
}

.numbered-list li::before {
  content: counter(list-item) ". ";
  margin-right: 0.5em;
}

.numbered-list li {
  padding-left: 1em;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  margin: 5px 0;
}

@media (max-width: 768px) {
  .score-container {
    flex-direction: column;
    gap: 30px;
  }

  .high-score {
    width: 80%;
  }
}

</style>
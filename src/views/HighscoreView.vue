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
  <Button class="finish-btn" @click="backToQuizPage">Finish</Button>
  <h1 class="title">{{ quizTitle }}</h1>
  <div class="score-container">
    <div class="result">
      <h2>YOU GOT</h2>
      <h1>{{numberOfCorrectAnswers}} / {{numberOfQuestions}}</h1>
      <h2>CORRECT ANSWERS</h2>
    </div>
    <div class="high-score">
      <h2>HIGH SCORE</h2>
      <ul>
        <li v-for="score in highScores" :key="score.id">{{ score.user.username }} - {{score.points}}/{{ mainStore.state.game.totalPoints}} {{formatDate(score.date)}}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.finish-btn {
  margin: 20px auto;
  display: block;
}

.title {
  text-align: center;
}

.score-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  position: relative; /* Add position relative to the container */
}

.score-container::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  border-left: 2px solid black; /* This creates the line */
  transform: translateX(-50%); /* This ensures the line is exactly in the middle */
}


.result {
  text-align: center;

}

</style>
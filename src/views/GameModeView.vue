<script setup>
import mainStore from "@/stores/mainStore";
import AnswerButton from "@/components/AnswerButton.vue";
import Slider from "@/components/Slider.vue";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";

mainStore.dispatch('game/loadQuizById', 1);

function backToQuizPage() {
  router.push('/');
}
function selectAnswer() {

}
function newQuestion() {
  mainStore.dispatch('game/nextQuestion');
}
</script>
<template>
  <div class="finish-btn">
    <Button class="quit-btn" @click="backToQuizPage">Quit</Button>
    <Button class="next-btn" @click="newQuestion">Next</Button>
  </div>
  <h2 class="question-text">{{ mainStore.state.game.currentQuestion.text }}</h2>
  <p class = "current-question-number"> {{ mainStore.state.game.quiz.currentQuestionNumber +1}} / {{ mainStore.state.game.quiz.questions.length}}</p>
  <img src="https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=qNeCdQEGR07rW2FnwvIuuMaVmy0HkHPxdpYeJxLi3UE%3D" alt="Question Image" class="question-image"/>
  <div class="answer-btn" v-if="mainStore.state.game.currentQuestion.type==='TEXT'">
    <AnswerButton v-for="(answer, index) in mainStore.state.game.currentQuestion.answers" :key="index" :answer="answer" @click="selectAnswer"/>
  </div>
  <div v-if="mainStore.state.game.currentQuestion.type==='SLIDE'">
    <Slider class="answer-slider"  :answer="mainStore.state.game.currentQuestion.answer"/>
    <Button class="submit-btn">Submit</Button>
  </div>
</template>
<style scoped>

.question-image {
  max-width: 500px;
  margin: 20px auto;
  display: block;
}

.finish-btn {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.next-btn,
.quit-btn {
  margin: 20px auto;
  display: block;

}

.question-text {
  font-size: 24px;
  color: #333;
  text-align: center;
}
.submit-btn {
  margin: 20px auto;
  display: block;
}

.answer-btn {
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns with 50% width each */
  justify-content: space-around; /* Spreads the cards evenly with space around them */
  gap: 5px; /* Provides space between cards */
}

.answer-slider {
  display: flex;
  justify-content: center;
}

.current-question-number {
  font-size: 18px;
  color: #666;
  text-align: right;
}



/* Mobile styles */
@media (max-width: 768px) {
  .answer-btn {
    grid-template-columns: 1fr; /* Single column layout */
  }
}

</style>
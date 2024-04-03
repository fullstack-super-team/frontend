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


</script>
<template>
  <div class="top-buttons">
    <Button class="quit-btn" @click="backToQuizPage">Quit</Button>
    <Button class="next-btn">Next</Button>
  </div>
  <h2 class="question-text">{{ mainStore.state.game.currentQuestion.text }}</h2>
  <p class = "current-question"> {{ mainStore.state.game.currentQuestion.questionNumber}} / X</p>
  <div class="answer-btn" v-if="mainStore.state.game.currentQuestion.type==='TEXT'">
    <AnswerButton v-for="(answer, index) in mainStore.state.game.currentQuestion.answers" :key="index" :answer="answer"/>
  </div>
  <div v-if="mainStore.state.game.currentQuestion.type==='SLIDE'">
    <Slider class="answer-slider"  :answer="mainStore.state.game.currentQuestion.answer"/>
    <Button class="submit-btn">Submit</Button>
  </div>
</template>
<style scoped>


.top-buttons {
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

.current-question {
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
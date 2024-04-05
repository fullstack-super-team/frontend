<script setup>
import mainStore from "@/stores/mainStore";
import AnswerButton from "@/components/AnswerButton.vue";
import Slider from "@/components/Slider.vue";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";
import { useRoute } from "vue-router";
import {computed, ref} from "vue";

const url = useRoute();
const quizId = url.params.id;


let isAnswerSelected = ref(false);
let correctAnswer = ref("");
let selectedAnswerText = ref("");
let selectedSliderValue = ref(0);

const currentQuestionText = computed(() => mainStore.state.game.currentQuestion.text);
const questionCountInfo = computed(() => `${mainStore.state.game.quiz.currentQuestionNumber + 1} / ${mainStore.state.game.quiz.questions.length}`);
const questionType = computed(() => mainStore.state.game.currentQuestion.type);
const currentQuestionNumber = computed(() => mainStore.state.game.quiz.currentQuestionNumber)
const score = computed(() => mainStore.state.game.currentPoints);


mainStore.dispatch('game/loadQuizById', quizId);

function backToQuizPage() {
  router.push(`/quiz/${quizId}`);
}

async function selectAnswer(answer) {
  console.log(answer);
  await mainStore.dispatch('game/submitAnswer', answer);
  correctAnswer.value = mainStore.state.game.answers[currentQuestionNumber.value].correctAnswer;
  selectedAnswerText.value = answer;
  isAnswerSelected.value = true;
}

async function nextQuestion() {
  isAnswerSelected.value = false;
  correctAnswer.value = "";
  if (currentQuestionNumber.value === mainStore.state.game.quiz.questions.length - 1) {
    await mainStore.dispatch('game/finishQuiz');
    await router.push(`/quiz/${quizId}/high-score`);
  } else {
    await mainStore.dispatch('game/nextQuestion');
  }
}

const answerColors = computed(() => {
  return mainStore.state.game.currentQuestion.answers.map((answer) => {
    if (!isAnswerSelected.value) {
      return '';
    }
    return answer.text === correctAnswer.value ? '#78D64F' : '#FF3131';
  });
});

const answersOpacity = computed(() => {
  return mainStore.state.game.currentQuestion.answers.map((answer) => {
    if (!isAnswerSelected.value) {
      return 1; // No answer selected yet, full opacity
    }
    if (answer.text === correctAnswer.value || answer.text === selectedAnswerText.value) {
      return 1;
    }
    return 0.5;
  });
});

const isCorrectAnswer = computed(() => {
  return mainStore.state.game.currentQuestion.answers.map((answer) => {
    if (!isAnswerSelected.value) {
      return null;
    }
    return answer.text === correctAnswer.value;
  });
});

const updateValue = (value) => {
  selectedSliderValue.value = value;
}

</script>
<template>
  <div class="finish-btn">
    <Button class="quit-btn" @click="backToQuizPage">Quit</Button>
    <Button class="next-btn" @click="nextQuestion" v-if="isAnswerSelected">Next</Button>
  </div>
  <h2 class="question-text">{{ currentQuestionText }}</h2>
  <p class="current-question-number"> {{ questionCountInfo }}</p>
  <p class="current-question-number">Score: {{ score }}</p>
  <img src="https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=qNeCdQEGR07rW2FnwvIuuMaVmy0HkHPxdpYeJxLi3UE%3D" alt="Question Image" class="question-image"/>
  <p v-if="isAnswerSelected && correctAnswer.toString() === selectedAnswerText.toString()" >Correct Answer!</p>
  <p v-if="isAnswerSelected && correctAnswer.toString() !== selectedAnswerText.toString()">Incorrect Answer</p>

  <div class="answer-btn" v-if="questionType==='TEXT' || questionType==='TRUE_OR_FALSE'">
    <AnswerButton v-for="(answer, index) in mainStore.state.game.currentQuestion.answers"
                  v-bind:style="{ backgroundColor: answerColors[index], opacity: answersOpacity[index] }"
                  :is-correct="isCorrectAnswer[index]"
                  :is-answer-selected="isAnswerSelected"
                  :key="index"
                  :answer-text="answer.text"
                  :disabled="isAnswerSelected"
                  @click="selectAnswer(answer.text)"/>
  </div>
  <div v-if="questionType==='SLIDE'">
    <Slider class="answer-slider"
            :answer="mainStore.state.game.currentQuestion.answer"
            @update-value="updateValue"
            v-if="!isAnswerSelected"/>
    <Button class="submit-btn" @click="selectAnswer(selectedSliderValue)" v-if="!isAnswerSelected">Submit</Button>
    <div class="answer-buttons-container">
      <AnswerButton
          v-if="isAnswerSelected && correctAnswer.toString() !== selectedSliderValue.toString()"
          :style="{ backgroundColor: '#FF3131'}"
          :answer-text="selectedSliderValue.toString()"
          :is-correct="false"
          :is-answer-selected="isAnswerSelected"
      />
      <AnswerButton
          v-if="isAnswerSelected"
          :style="{ backgroundColor: '#78D64F'}"
          :answer-text="correctAnswer.toString()"
          :is-correct="true"
          :is-answer-selected="isAnswerSelected"
      />
    </div>
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

.answer-buttons-container {
  display: flex;
  justify-content: center; /* Centers the buttons horizontally */
  gap: 10px; /* Adjusts the space between the buttons */
}
@media (max-width: 768px) {
  .answer-btn {
    grid-template-columns: 1fr;
  }
}

</style>
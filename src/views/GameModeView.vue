<script setup>
import mainStore from "@/stores/mainStore";
import AnswerButton from "@/components/AnswerButton.vue";
import Slider from "@/components/Slider.vue";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";
import { useRoute } from "vue-router";
import {computed, ref} from "vue";
import { QuestionType } from "@/utils/questionType";

const url = useRoute();
const quizId = url.params.id;
mainStore.dispatch('game/loadQuizById', quizId);

let isAnswerSelected = ref(false);
let correctAnswer = ref("");
let selectedAnswerText = ref("");
let selectedSliderValue = ref(null);

const currentQuestionText = computed(() => mainStore.state.game.currentQuestion.text);
const questionCountInfo = computed(() => `${mainStore.state.game.quiz.currentQuestionNumber + 1} / ${mainStore.state.game.quiz.questions.length}`);
const questionType = computed(() => mainStore.state.game.currentQuestion.type);
const currentQuestionNumber = computed(() => mainStore.state.game.quiz.currentQuestionNumber)
const score = computed(() => mainStore.state.game.currentPoints);

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
  const cardColorOptions = ['#FF914D', '#1792EA', '#78D64F', '#8C52FF'];
  const trueOrFalseColors = ['#1792EA','#FF914D'];
  return mainStore.state.game.currentQuestion.answers.map((answer, index) => {
    if (!isAnswerSelected.value && questionType.value === 'TRUE_OR_FALSE') {
      return trueOrFalseColors[index] || '';
    } else if (!isAnswerSelected.value) {
      return cardColorOptions[index] || '';
    }
    return answer.text === correctAnswer.value ? '#78D64F' : '#FF3131';
  });
});

const answersOpacity = computed(() => {
  return mainStore.state.game.currentQuestion.answers.map((answer) => {
    if (!isAnswerSelected.value) {
      return 1;
    }
    if (answer.text === correctAnswer.value || answer.text === selectedAnswerText.value) {
      return 1;
    }
    return 0.5;
  });
});

const isCorrectSliderAnswer = computed(() => {
  if (!isAnswerSelected.value) {
    return null;
  }
  return correctAnswer.value.toString() === selectedSliderValue.value.toString()
});

const isCorrectAnswer = computed(() => {
  return mainStore.state.game.currentQuestion.answers.map((answer) => {
    if (!isAnswerSelected.value) {
      return null;
    }
    return answer.text === correctAnswer.value;
  });
});

const sliderValueIsSelected = computed(() => {
  return selectedSliderValue.value !== null;
});

</script>
<template>
  <div class="finish-btn">
    <Button class="quit-btn" @click="backToQuizPage">Quit</Button>
    <h2 class="question-text">{{ currentQuestionText }}</h2>
    <Button class="next-btn" @click="nextQuestion" :disabled="!isAnswerSelected" v-bind:style="{opacity: isAnswerSelected ? 1 : 0.5, cursor: isAnswerSelected ? 'pointer' : 'default'}">Next</Button>
  </div>
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
                  :is-true-or-false-question="questionType==='TRUE_OR_FALSE'"
                  @click="selectAnswer(answer.text)"/>
  </div>
  <div v-if="questionType===QuestionType.SLIDE">
    <div class="answer-slider">
      <span>{{ selectedSliderValue }}</span>
      <Slider
          id="slider"
        :min="mainStore.state.game.currentQuestion.answer.min"
        :max="mainStore.state.game.currentQuestion.answer.max"
        :step-size="mainStore.state.game.currentQuestion.answer.stepSize"
        :is-correct="isCorrectSliderAnswer"
        :is-answer-selected="isAnswerSelected"
        v-model="selectedSliderValue"
      />
      <Button class="submit-btn" @click="selectAnswer(selectedSliderValue)" v-if="!isAnswerSelected" :disabled="!sliderValueIsSelected" v-bind:style="{opacity: sliderValueIsSelected ? 1 : 0.5, cursor: sliderValueIsSelected ? 'pointer' : 'default'}">Submit</Button>
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
}

.next-btn,
.quit-btn {
  margin: 20px;
  display: block;

}

.question-text {
  margin-top: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
  flex-grow: 1;
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
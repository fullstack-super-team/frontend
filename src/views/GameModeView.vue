<script setup>
import mainStore from "@/stores/mainStore";
import AnswerButton from "@/components/AnswerButton.vue";
import Slider from "@/components/Slider.vue";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";
import { useRoute } from "vue-router";
import {computed, ref} from "vue";
import { QuestionType } from "@/utils/questionType";

/**
 * Sets up the quiz game page, handling the quiz logic and UI state changes.
 * Uses mainStore to fetch and submit quiz data and control game flow.
 */

/**
 * Fetches the quiz ID from the URL and loads the quiz data.
 */
const url = useRoute();
const quizId = url.params.id;
mainStore.dispatch('game/loadQuizById', quizId);

/**
 * Reactive state for the game logic and UI state.
 */
let isAnswerSelected = ref(false);
let correctAnswers = ref("");
let selectedAnswerText = ref("");
let selectedSliderValue = ref(null);

/**
 * Computes various properties for quiz states.
 */
const currentQuestionText = computed(() => mainStore.state.game.currentQuestion.text);
const questionCountInfo = computed(() => `${mainStore.state.game.quiz.currentQuestionNumber + 1}
 / ${mainStore.state.game.quiz.questions.length}`);
const questionType = computed(() => mainStore.state.game.currentQuestion.type);
const currentQuestionNumber = computed(() => mainStore.state.game.quiz.currentQuestionNumber)
const score = computed(() => mainStore.state.game.currentPoints);

/**
 * Navigates back to the quiz overview page.
 */
function backToQuizPage() {
  router.push(`/quiz/${quizId}`);
}

/**
 * Handles answer selection, updates game state, and manages selected answer states.
 *
 * @param {string|number} answer - The selected answer.
 */
async function selectAnswer(answer) {
  console.log(answer);
  await mainStore.dispatch('game/submitAnswer', answer);
  correctAnswers.value = mainStore.state.game.answers[currentQuestionNumber.value].correctAnswers;
  selectedAnswerText.value = answer;
  isAnswerSelected.value = true;
}

/**
 * Navigates to the next question or finishes the quiz based on progress.
 */
async function nextQuestion() {
  isAnswerSelected.value = false;
  correctAnswers.value = "";
  if (currentQuestionNumber.value === mainStore.state.game.quiz.questions.length - 1) {
    await mainStore.dispatch('game/finishQuiz');
    await router.push(`/quiz/${quizId}/high-score`);
  } else {
    await mainStore.dispatch('game/nextQuestion');
  }
}

/**
 * Computes the colors for answer buttons based on the selected answer and correctness.
 *
 * @returns {Array<string>} - An array of colors for each answer button.
 */
const answerColors = computed(() => {
  const cardColorOptions = ['#FF914D', '#1792EA', '#78D64F', '#8C52FF'];
  const trueOrFalseColors = ['#1792EA','#FF914D'];
  return mainStore.state.game.currentQuestion.answers.map((answer, index) => {
    if (!isAnswerSelected.value && questionType.value === 'TRUE_OR_FALSE') {
      return trueOrFalseColors[index] || '';
    } else if (!isAnswerSelected.value) {
      return cardColorOptions[index] || '';
    }
    return correctAnswers.value.includes(answer.text) ? '#78D64F' : '#FF3131';
  });
});

/**
 * Computes the opacity for answer buttons based on the selected answer and correctness.
 *
 * @returns {Array<number>} - An array of opacities for each answer button.
 */
const answersOpacity = computed(() => {
  return mainStore.state.game.currentQuestion.answers.map((answer) => {
    if (!isAnswerSelected.value) {
      return 1;
    }
    if (answer.text === selectedAnswerText.value) {
      return 1;
    }
    return 0.5;
  });
});

/**
 * Computes whether the selected slider value is correct.
 *
 * @returns {boolean} - Whether the selected slider value is correct.
 */
const isCorrectSliderAnswer = computed(() => {
  if (!isAnswerSelected.value) {
    return null;
  }
  return correctAnswers.value.toString() === selectedSliderValue.value.toString()
});

/**
 * Computes whether the selected answer button is correct.
 *
 * @returns {Array<boolean>} - An array of booleans indicating whether each answer is correct.
 */
const isCorrectAnswer = computed(() => {
  return mainStore.state.game.currentQuestion.answers.map((answer) => {
    if (!isAnswerSelected.value) {
      return null;
    }
    return correctAnswers.value.includes(answer.text);    
  });
});

/**
 * Computes whether a slider value is selected.
 *
 * @returns {boolean} - Whether a slider value is selected.
 */
const sliderValueIsSelected = computed(() => {
  return selectedSliderValue.value !== null;
});
</script>

<template>
  <div class="finish-btn">
    <Button class="quit-btn" @click="backToQuizPage">Quit</Button>
    <h2 class="question-text">{{ currentQuestionText }}</h2>
    <Button class="next-btn" @click="nextQuestion" :disabled="!isAnswerSelected"
            v-bind:style="{opacity: isAnswerSelected ? 1 : 0.5, cursor: isAnswerSelected ? 'pointer' : 'default'}">
      Next
    </Button>
  </div>
    <p class="current-question-number"> {{ questionCountInfo }}</p>
    <p class="current-question-number">Score: {{ score }}</p>
  <div class="answer-feedback">
  <p v-if="isAnswerSelected && correctAnswers.toString() === selectedAnswerText.toString()">Correct Answer!</p>
  <p v-if="isAnswerSelected && correctAnswers.toString() !== selectedAnswerText.toString()">Incorrect Answer</p>
  </div>
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
      <p class="current-slider-answer">Current answer: {{ selectedSliderValue }}</p>
      <Slider
          id="slider"
        :min="mainStore.state.game.currentQuestion.answer.min"
        :max="mainStore.state.game.currentQuestion.answer.max"
        :step-size="mainStore.state.game.currentQuestion.answer.stepSize"
        :is-correct="isCorrectSliderAnswer"
        :is-answer-selected="isAnswerSelected"
        v-model="selectedSliderValue"
      />
      <Button class="submit-btn" @click="selectAnswer(selectedSliderValue)" v-if="!isAnswerSelected"
              :disabled="!sliderValueIsSelected" v-bind:style="{opacity: sliderValueIsSelected ? 1 : 0.5,
               cursor: sliderValueIsSelected ? 'pointer' : 'default'}">
        Submit
      </Button>
    </div>
  </div>
</template>

<style scoped>
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-around;
  padding: 20px;
  gap: 16px;
}

.answer-slider {
  text-align: center;
}

.current-question-number {
  font-size: 18px;
  color: #0f3f6b;
  text-align: right;
  padding-right: 4rem;
}

.answer-feedback {
  text-align: center;
  font-size: 40px;
  min-height: 50px;
  margin-top: 50px;
  }

@media (max-width: 768px) {
  .answer-btn {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 10px;
  }

  .finish-btn {
  }

  .current-question-number {
    padding-right: 20px;
  }
}
</style>
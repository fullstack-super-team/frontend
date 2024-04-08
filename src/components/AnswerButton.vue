<script setup>

/**
 * A button component that displays an answer text and an icon indicating if the answer is correct or incorrect.
 */

/**
 * Defines the props accepted by this component.
 *
 * @property {string} answerText - The text of the answer.
 * @property {boolean} isCorrect - Indicates if the answer is correct.
 * @property {boolean} isAnswerSelected - Indicates if the answer has been selected.
 * @property {boolean} isTrueOrFalseQuestion - Indicates if the question is a true or false question.
 */
defineProps({
  answerText: {
    type: String,
    required: true
  },
  isCorrect: Boolean,
  isAnswerSelected: Boolean,
  isTrueOrFalseQuestion: Boolean
})

</script>
<template>
  <button class="answer-card">
    {{ answerText }}
    <img class="icon" v-if="isCorrect && isAnswerSelected" src="@/assets/correct.png" alt="Correct Answer" />
    <img class="icon" v-if="!isCorrect && isAnswerSelected" src="@/assets/wrong.png" alt="Incorrect Answer" />
    <img class="icon" v-if="isTrueOrFalseQuestion && !isAnswerSelected && answerText === 'True'" src="@/assets/thumbsUp.png" alt="Thumbs Up" />
    <img class="icon" v-if="isTrueOrFalseQuestion && !isAnswerSelected && answerText === 'False'" src="@/assets/thumbsDown.png" alt="Thumbs Down" />
  </button>
</template>

<style scoped>
.answer-card {
  color: white;
  text-align: center;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  height: 100px;
  padding-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;

}

.answer-card:disabled {
  cursor: default;
}

.icon {
  height: 100px;
  width: auto;
  justify-self: end;
}
</style>
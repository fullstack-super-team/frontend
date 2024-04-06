<script setup>

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
  grid-template-columns: auto 1fr; /* First column auto-sized to content, second column takes the rest */
  align-items: center; /* Aligns items vertically in the center */
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
  height: 100px; /* Adjusts the width of the icon */
  width: auto; /* Keeps the aspect ratio of the icon */
  justify-self: end; /* Aligns the icon to the end of the grid column */
}
</style>
<script setup>

defineProps({
  answerText: {
    type: String,
    required: true
  },
  isCorrect: Boolean,
  isAnswerSelected: Boolean
})

</script>

<template>
  <button class="answer-card">
    {{ answerText }}
    <img class="icon" v-if="isCorrect && isAnswerSelected" src="@/assets/correct.png" alt="Correct Answer" />
    <img class="icon" v-if="!isCorrect && isAnswerSelected" src="@/assets/wrong.png" alt="Incorrect Answer" />
  </button>
</template>

<style scoped>
.answer-card {
  padding: 20px;
  text-align: center;
  color: black;
  display: grid;
  grid-template-columns: auto 1fr; /* First column auto-sized to content, second column takes the rest */
  align-items: center; /* Aligns items vertically in the center */
  gap: 10px; /* Adds some space between the text and the icon */
}

.answer-card:disabled {
  cursor: default;
}

.icon {
  width: 30px; /* Adjusts the width of the icon */
  height: auto; /* Keeps the aspect ratio of the icon */
  justify-self: end; /* Aligns the icon to the end of the grid column */
}
</style>
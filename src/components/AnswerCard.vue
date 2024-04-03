<script setup>
import { ref } from 'vue';

// Define props using defineProps
const props = defineProps({
  initialAnswer: {
    type: String,
    default: '',
  },
});

const answer = ref(props.initialAnswer);
const isCorrect = ref(false);

// Optional: Emit events on changes if you need to communicate with the parent component
// const emit = defineEmits(['update']);
// watch([answer, isCorrect], () => {
//   emit('update', { answer: answer.value, isCorrect: isCorrect.value });
// });
</script>

<template>
  <div class="answer-card">
    <input type="text" v-model="answer" placeholder="Enter answer here..." />
    <input type="checkbox" v-model="isCorrect" />
  </div>
</template>

<style scoped>
.answer-card {
  display: flex;
  align-items: center;
  gap: 10px;
}

.answer-card input[type="text"] {
  flex-grow: 1;
}
</style>

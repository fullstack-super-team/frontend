<script setup>
import { defineProps } from 'vue';

defineProps({
  answer: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <button class="answer-card">
    {{ answer.text }}
  </button>
</template>

<style scoped>
.answer-card {
  padding: 20px;
  text-align: center; /* Centers the content inside each card */
}

</style>
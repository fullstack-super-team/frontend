<script setup>
import { ref, watch } from 'vue';

const minValue = ref(0);
const maxValue = ref(100);
const correctAnswer = ref(50);
const stepSize = ref(1);

watch([minValue, maxValue, stepSize], () => {
  // Adjust correctAnswer if it falls outside of the new range
  if (correctAnswer.value < minValue.value) {
    correctAnswer.value = minValue.value;
  } else if (correctAnswer.value > maxValue.value) {
    correctAnswer.value = maxValue.value;
  }
  // Adjust step size to ensure it's valid
  if (stepSize.value <= 0) {
    stepSize.value = 1;
  }
});
</script>

<template>
  <div class="slider-container">
    <div class="inputs">
      <label>
        Min Value:
        <input type="number" v-model.number="minValue" />
      </label>
      <label>
        Max Value:
        <input type="number" v-model.number="maxValue" />
      </label>
      <label>
        Step Size:
        <input type="number" v-model.number="stepSize" min="1" />
      </label>
      <label>
        Correct Answer:
        <input type="number" v-model.number="correctAnswer" :min="minValue" :max="maxValue" />
      </label>
    </div>
    <div class="slider">
      <input type="range" v-model.number="correctAnswer" :min="minValue" :max="maxValue" :step="stepSize" />
      <p>Correct answer: {{ correctAnswer }}</p>
    </div>
  </div>
</template>

<style scoped>
.inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.inputs label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.slider-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

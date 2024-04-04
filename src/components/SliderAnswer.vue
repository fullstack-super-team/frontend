<script setup>
const props = defineProps({
  answer: {
    type: Object,
    required: true,
    default: () => ({
      min: 0,
      max: 5,
      stepSize: 1,
      correctValue: 3
    }),
  },
});

</script>

<template>
  <div class="slider-container">
    <div class="inputs">
      <label>
        Min Value:
        <input type="number" v-model.number="props.answer.min" />
      </label>
      <label>
        Max Value:
        <input type="number" v-model.number="props.answer.max" />
      </label>
      <label>
        Step Size:
        <input type="number" v-model.number="props.answer.stepSize" min="1" />
      </label>
      <label>
        Correct Answer:
        <input type="number" v-model.number="props.answer.correctValue" :min="props.answer.min" :max="props.answer.max" />
      </label>
    </div>
    <div class="slider">
      <input type="range" v-model.number="props.answer.correctValue" :min="props.answer.min" :max="props.answer.max" :step="props.answer.stepSize" />
      <p>Correct answer: {{ props.answer.correctValue }}</p>
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

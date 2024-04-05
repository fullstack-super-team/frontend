<script setup>
import Input from "@/components/Input.vue";

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

.inputs input {
  font-size: 1rem;
  color: #333;
  background-color: #f0f7ff;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 2px 4px 6px 0px rgba(0, 0, 0, 0.2);
}

.slider-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 768px) {
  .inputs {
    justify-content: flex-start;
  }
}
</style>

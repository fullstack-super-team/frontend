<script setup>
import { defineProps } from 'vue';
import Slider from "@/components/Slider.vue";

/**
 * A component that represents a slider with customizable properties.
 * It allows the user to set minimum value, maximum value, step size, and correct answer value.
 */

/**
 * Defines the props accepted by this component.
 *
 * @property {string} id - A unique identifier for the slider.
 * @property {Object} answer - The answer object containing the min, max, stepSize, and correctValue.
 * @property {number} answer.min - The minimum value allowed. This prop is required.
 * @property {number} answer.max - The maximum value allowed. This prop is required.
 * @property {number} answer.stepSize - The increment between each step within the range. This prop is required.
 * @property {number} answer.correctValue - The correct value within the range. This prop is required.
 */
const props = defineProps({
  id: String,
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

/**
 * Updates the correct value of the answer object.
 *
 * @param {number} newValue - The new correct value.
 */
function updateCorrectValue(newValue) {
  props.answer.correctValue = Number(newValue);
}
</script>

<template>
  <div class="slider-container">
    <div class="inputs">
      <label :for="id + '_min'">
        Min Value:
        <input :id="id + '_min'" type="number" v-model.number="props.answer.min" />
      </label>
      <label :for="id + '_max'">
        Max Value:
        <input :id="id + '_max'" type="number" v-model.number="props.answer.max" />
      </label>
      <label :for="id + '_stepSize'">
        Step Size:
        <input :id="id + '_stepSize'" type="number" v-model.number="props.answer.stepSize" min="1" />
      </label>
      <label :for="id + '_correctValue'">
        Correct Answer:
        <input :id="id + '_correctValue'" type="number" v-model.number="props.answer.correctValue" :min="props.answer.min" :max="props.answer.max" />
      </label>
    </div>
    <Slider
        :id="id+'_preview'"
        :min="props.answer.min"
        :max="props.answer.max"
        :stepSize="props.answer.stepSize"
        :modelValue="props.answer.correctValue"
        :is-correct="null"
        @update:modelValue="updateCorrectValue"
    />
    <p>Correct answer: {{ props.answer.correctValue }}</p>
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

<script setup>
import Input from "@/components/Input.vue";
import {watchEffect} from "vue";

/**
 * Defines a model component with configurable properties for range specifications.
 * This component allows the user to select a value within a specified range using a slider.
 * that represents the current value within the range. The component is designed to emit an event
 * when there's an update to the model value.
 */

/**
 * Defines the model for the component.
 */
defineModel();

/**
 * Defines the props accepted by this component.
 *
 * @property {number} min - The minimum value allowed. This prop is required.
 * @property {number} max - The maximum value allowed. This prop is required.
 * @property {number} stepSize - The increment between each step within the range. This prop is required.
 * @property {number} modelValue - The current value of the model. This prop is required.
 * @property {boolean} isAnswerSelected - Indicates if an answer has been selected.
 * @property {boolean} isCorrect - Indicates if the selected answer is correct.
 */
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  stepSize: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  },
  isAnswerSelected: {
    type: Boolean,
  },
  isCorrect: {
    type: Boolean,
  }
})

/**
 * Defines the events that this component can emit.
 *
 * @event update:modelValue - Emitted when the `modelValue` prop should be updated.
 */
const emit = defineEmits(['update:modelValue']);

/**
 * Watches for changes in the `isCorrect` prop and updates the slider thumb color accordingly.
 */
watchEffect(() => {watchEffect(() => {
  let color;
  if (props.isCorrect === true) {
    color = '#78D64F';
  } else if (props.isCorrect === false) {
    color = '#FF3131'
  } else {
    color = '#8C52FF';
  }
  document.documentElement.style.setProperty('--slider-thumb-color', color);
})})
</script>

<template>  
  <div class="slider">
    <label>{{ min }}</label>
    <input
        :id="id"
           :disabled="isAnswerSelected"
           :style="{backgroundColor: isCorrect === true && isAnswerSelected ? '#78D64F' :
                    isCorrect === false && isAnswerSelected ? '#FF3131' :
                    '#8C52FF'}"
           :min="min"
           :max="max"
           :step="stepSize"
           type="range"
           :value="modelValue"
           @input="emit('update:modelValue', $event.target.value)"/>
    <label>{{ max }}</label>
  </div>
</template>


<style scoped>
.slider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.slider input[type=range] {
  flex-grow: 1;
  margin: 0 10px;
  cursor: pointer;
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background-color: #ddd;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.slider input[type=range]:hover {
  opacity: 1;
}

:root {
  --slider-thumb-color: #8C52FF;
}

.slider input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background-color: var(--slider-thumb-color);
  border: solid;
  border-color: #0f3f6b;
  border-width: 2px;
  cursor: pointer;
  border-radius: 20%;
  box-shadow: 0px 0px 2px #000;
}

.slider input[type=range]::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: var(--slider-thumb-color);
  cursor: pointer;
  border-radius: 20%;
  box-shadow: 0px 0px 2px #000;
}

.slider input[type=range]:focus {
  box-shadow: 0 0 5px #007bff;
}
</style>

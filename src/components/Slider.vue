<script setup>

import {ref, watch} from "vue";

let props = defineProps({
  answer: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['updateValue']);
let currentValue = ref(props.answer.min);
console.log(props.answer.min);
emit('updateValue', props.answer.min);



watch(currentValue, (newValue) => {
  emit('updateValue', newValue);
});


</script>

<template>
  <div class="slide-container">
    <p>Current Value: {{ currentValue }}</p>
    <div class="slider">
      <label :for="'slider-' + answer.min">{{ answer.min }}</label>
      <input type="range" :id="'slider-' + answer.min" :min="answer.min" :max="answer.max" :step="answer.step" v-model="currentValue"/>
      <label :for="'slider-' + answer.max">{{ answer.max }}</label>
    </div>
  </div>
</template>


<style scoped>
.slider {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.slider input[type=range] {
  flex-grow: 1; /* Allow the range input to grow and fill the space */
  margin: 0 10px; /* Add some space between the labels and the slider */
}


</style>

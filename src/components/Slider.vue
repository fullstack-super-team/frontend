<script setup>
import Input from "@/components/Input.vue";

defineModel();
defineProps({
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
  }
})
const emit = defineEmits(['update:modelValue']);
</script>

<template>  
  <div class="slider">
    <label :for="'slider-' + min">{{ min }}</label>
    <input id="slider" :min="min" :max="max" :step="stepSize" type="range" :value="modelValue" @input="emit('update:modelValue', $event.target.value)"/>
    <label :for="'slider-' + max">{{ max }}</label>
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

.slider input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background-color: #57c42b;
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
  background: #007bff;
  cursor: pointer;
  border-radius: 20%;
  box-shadow: 0px 0px 2px #000;
}

.slider input[type=range]:focus {
  box-shadow: 0 0 5px #007bff;
}
</style>

<script setup>
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
}

.slider input[type=range] {
  flex-grow: 1; /* Allow the range input to grow and fill the space */
  margin: 0 10px; /* Add some space between the labels and the slider */
}


</style>

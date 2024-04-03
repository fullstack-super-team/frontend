<script setup>

defineProps({
  answer: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="slider">
    <label :for="'slider-' + answer.min">{{ answer.min }}</label>
    <input type="range" :id="'slider-' + answer.min" :min="answer.min" :max="answer.max" :step="answer.step"/>
    <label :for="'slider-' + answer.max">{{ answer.max }}</label>
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

<script setup>
import { defineEmits } from 'vue';

// Define the events this component can emit
const emit = defineEmits(['click']);

defineProps({
  type: {
    type: String,
    default: 'button'
  }
})

// Handler function for the click event
function clickHandler() {
  emit('click'); // Emits the click event to the parent
}
</script>

<template>
  <button class="btnClass" @click="clickHandler" :type="type">
    <slot></slot> <!-- This allows for custom button text -->
  </button>
</template>

<style scoped>
.btnClass {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #08589C;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}

.btnClass:hover {
  background-color: #0B68C1;
}
</style>

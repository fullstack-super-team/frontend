<script setup>
import { defineEmits } from 'vue';

// Define the events this component can emit
const emit = defineEmits(['click']);

// Handler function for the click event
function clickHandler() {
  emit('click'); // Emits the click event to the parent
}
</script>

<template>
  <button class="btnClass" @click="clickHandler">
    <slot></slot> <!-- This allows for custom button text -->
  </button>
</template>

<style scoped>
.btnClass {
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>

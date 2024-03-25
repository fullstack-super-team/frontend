<script setup>
import { ref } from 'vue';

const modelValue = ref('');
defineProps({
  label: String,
  placeholder: String,
  modelValue: String,
  required: {
    type: Boolean,
    default: false,
  }
});

// To make the v-model work, we emit an update event for the parent component
const updateValue = (value) => {
  modelValue.value = value;
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="textArea-wrapper">
    <label :for="label">{{ label }}</label>
    <textarea :id="label" class="textarea" :placeholder="placeholder" :required="required" @input="updateValue($event.target.value)" :value="modelValue"></textarea>
  </div>
</template>


<style scoped>
.textArea-wrapper {
  display: flex;
  flex-direction: column; /* Stacks children (label and textarea) vertically */
  gap: 5px; /* Optional: Adds space between the label and the textarea */
}

.textarea {
  width: 100%; /* Adjusts the textarea to take the full width of its container */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical; /* Allows the user to resize the textarea vertically */
}
</style>
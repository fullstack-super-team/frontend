<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: String,
  placeholder: String,
  modelValue: String,
  charLimit: Number,
  required: Boolean
});

const emit = defineEmits(['update:modelValue']);

const remainingChars = computed(() => props.charLimit - props.modelValue.length);

const updateValue = (value) => {
  if (!props.charLimit || value.length <= props.charLimit) {
    emit('update:modelValue', value);
  }
};
</script>



<template>
  <div class="textArea-wrapper">
    <label :for="label">{{ label }}</label>
    <textarea :id="label" class="textarea" :placeholder="placeholder" @input="updateValue($event.target.value)" :value="modelValue" :required="required"></textarea>
    <!-- Display remaining characters -->
    <div v-if="charLimit" class="char-countdown">
      {{ remainingChars }} characters left
    </div>
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

.char-countdown {
  margin-top: 5px;
  font-size: 0.9em;
  color: #666;
}
</style>
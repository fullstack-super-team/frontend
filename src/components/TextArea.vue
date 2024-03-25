<script setup>
import { ref, computed, defineProps, emit } from 'vue';

// Note: You don't need to initialize modelValue with ref('') here
// since it's being passed as a prop and managed externally.
const props = defineProps({
  label: String,
  placeholder: String,
  modelValue: String,
  charLimit: Number,
  required: {
    type: Boolean,
    default: false,
  }
});

const remainingChars = computed(() => props.charLimit - props.modelValue.length);

// Consolidated updateValue method
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
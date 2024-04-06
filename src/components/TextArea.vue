<script setup>
import { computed } from 'vue';

/**
 * A component which displays a text area with a character limit and a character countdown.
 */

/**
 * Defines the model for the component.
 */
defineModel();

/**
 * Defines the props accepted by this component.
 *
 * @property {string} id - The unique identifier for the text area.
 * @property {string} label - The label for the text area.
 * @property {string} placeholder - The placeholder text for the text area.
 * @property {string} modelValue - The model value for the text area.
 * @property {number} charLimit - The character limit for the text area.
 * @property {number} startHeight - The starting height of the text area.
 * @property {boolean} required - Whether the text area is required.
 */
const props = defineProps({
  id: String,
  label: String,
  placeholder: String,
  modelValue: String,
  charLimit: Number,
  startHeight: {
    type: Number,
    default: 100
  },
  required: Boolean
});

/**
 * Emits the update:modelValue event when the text area value changes.
 */
const emit = defineEmits(['update:modelValue']);

/**
 * Computes the number of remaining characters based on the character limit and current value.
 */
const remainingChars = computed(() => {
  return props.charLimit - (props.modelValue?.length || 0);
});

/**
 * Updates the model value based on the input event.
 *
 * @param {Event} event - The input event.
 */
const updateValue = (event) => {
  const { value } = event.target;
  if (!props.charLimit || value.length <= props.charLimit) {
    emit('update:modelValue', value);
  } else if (value.length > props.charLimit) {
    // This will trim the value to the charLimit and set it back to the textarea
    const trimmedValue = value.slice(0, props.charLimit);
    emit('update:modelValue', trimmedValue);
  }
};
</script>

<template>
  <div class="textArea-wrapper">
    <label :for="id">{{ label }}</label>
    <div class="textarea-container">
      <textarea
          ref="textareaRef"
          :id="id"
          class="textarea"
          :placeholder="placeholder"
          @input="updateValue"
          :value="modelValue"
          :required="required"
          :style="{ height: `${startHeight}px` }"
      ></textarea>
      <div v-if="charLimit" class="char-countdown">
        {{ remainingChars }} characters left
      </div>
    </div>
  </div>
</template>

<style scoped>
.textArea-wrapper {
  display: flex;
  flex-direction: column;
}

.textarea-container {
  position: relative;
}

.textarea {
  width: 100%;
  padding: 10px;
  padding-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  position: relative;
}

.char-countdown {
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: #666;
  font-size: 0.9em;
  pointer-events: none;
  display: block;
}

.is-empty {
  display: none;
}
</style>

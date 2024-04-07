<script setup>

/**
 * A simple input component that allows users to input text.
 */

/**
 * Defines the model
 */
const model = defineModel();

/**
 * Defines the props accepted by this component.
 *
 * @property {string} id - The unique identifier for the input element.
 * @property {string} label - The label for the input element.
 * @property {string} placeholder - The placeholder text for the input element.
 * @property {string} modelValue - The model value for the input element.
 * @property {string} type - The type of the input element.
 * @property {string} errorMessage - The error message to display.
 * @property {boolean} disabled - Whether the input element is disabled.
 */
defineProps({
  id: String,
  label: String,
  placeholder: String,
  modelValue: String,
  type: String,
  errorMessage: String,
  disabled: Boolean
});

/**
 * Emits the update:modelValue event when the input value changes.
 */
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="input-wrapper">
    <label :for="id">{{ label }}</label>
    <input :id="id" class="input" :placeholder="placeholder" :type="type" :value="modelValue" @input="emit('update:modelValue', $event.target.value)" :disabled="disabled" />
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<style>
.input-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 5px;
}

.input {
  background-color: #f0f7ff;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

label {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  color: #08589CFF;
}

.error-message {
  color: red;
  margin-top: 5px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}
</style>
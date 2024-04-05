@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

<script setup>
const model = defineModel();
defineProps({
  label: String,
  placeholder: String,
  modelValue: String,
  type: String,
  errorMessage: String,
  disabled: Boolean
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input :id="label" class="input" :placeholder="placeholder" :type="type" :value="modelValue" @input="emit('update:modelValue', $event.target.value)" :disabled="disabled" />
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<style>
.input-wrapper {
  display: flex;
  flex-direction: column;
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
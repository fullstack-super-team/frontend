<script setup>
const model = defineModel();
defineProps({
  label: String,
  placeholder: String,
  modelValue: String,
  type: String,
  errorMessage: String
})

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input :id="label" class="input" :placeholder="placeholder" :type="type" :v-model="model" @input="emit('update:modelValue', $event.target.value)" />
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
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

.error-message {
  color: red;
  margin-top: 5px;
}
</style>
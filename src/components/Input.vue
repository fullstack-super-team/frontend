<script setup>
const model = defineModel();
defineProps({
  label: String,
  placeholder: String,
  modelValue: String,
  type: String,
  required: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input :id="label" class="input" :placeholder="placeholder" :type="type" v-model="model" :required="required" />
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
</style>
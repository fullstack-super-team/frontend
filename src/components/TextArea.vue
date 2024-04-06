<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

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

const emit = defineEmits(['update:modelValue']);

const remainingChars = computed(() => {
  return props.charLimit - (props.modelValue?.length || 0);
});

const textareaRef = ref(null);

const updateValue = (event) => {
  const { value } = event.target;
  if (!props.charLimit || value.length <= props.charLimit) {
    emit('update:modelValue', value);
  } else if (value.length > props.charLimit) {
    // This will trim the value to the charLimit and set it back to the textarea
    const trimmedValue = value.slice(0, props.charLimit);
    emit('update:modelValue', trimmedValue);
    if (textareaRef.value) {
      textareaRef.value.value = trimmedValue;
    }
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
  padding-bottom: 30px; /* Increase padding to make room for the countdown */
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
  pointer-events: none; /* Allows the text in the textarea to be selected as if the countdown isn't there */
  display: block; /* Ensure it's always displayed */
}

.is-empty {
  display: none;
}
</style>

<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';
import Button from './Button.vue';

const emit = defineEmits(['delete-answer', 'update-answer']);

const props = defineProps({
  answer: {
    text: String,
    isCorrect: Boolean
  }, 
  deletable: Boolean,
  readonly: Boolean // Add this prop to handle readonly state
});

const localAnswer = ref({ ...props.answer });

const emitUpdate = () => {
  emit('update-answer', localAnswer.value);
};

// Only allow deletion if the card is deletable
const deleteThisCard = () => {
  if (props.deletable) {
    emit('delete-answer');
  }
};
</script>

<template>
  <div class="answer-card">
    <input
        type="text"
        v-model="localAnswer.text"
        @change="emitUpdate"
        :disabled="props.readonly"
        placeholder="Enter answer here..."
    />    
    <input type="checkbox" v-model="localAnswer.isCorrect" @change="emitUpdate" />
    <button v-if="props.deletable" @click="deleteThisCard">Delete</button>
  </div>
</template>


<style scoped>
.answer-card {
  display: flex;
  align-items: center;
  gap: 10px;
}

.answer-card input[type="text"] {
  flex-grow: 1;
}

/* Style for your delete button (optional) */
button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>

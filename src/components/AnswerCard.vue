<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import Button from './Button.vue';
import deleteIcon from '@/assets/delete.png'
import Input from './Input.vue';

/**
 * A component that represents an answer card.
 * It allows the user to input an answer and mark it as correct or incorrect.
 * The card can be deleted if the deletable prop is set to true.
 * The card is readonly if the readonly prop is set to true.
 */

/**
 * Emits events for deleting an answer or updating an answer.
 */
const emit = defineEmits(['delete-answer', 'update-answer']);

/**
 * Defines the props accepted by this component.
 *
 * @property {string} identifier - A unique identifier for the answer card.
 * @property {Object} answer - The answer object containing the answer text and whether it is correct.
 * @property {boolean} deletable - Indicates if the answer card can be deleted.
 * @property {boolean} readonly - Indicates if the answer card is readonly.
 */
const props = defineProps({
  identifier: String,
  answer: {
    text: String,
    isCorrect: Boolean
  }, 
  deletable: Boolean,
  readonly: Boolean
});

/**
 * Local state for the answer card.
 */
const localAnswer = ref({ ...props.answer });

/**
 * Emits an update event with the current answer value.
 */
const emitUpdate = () => {
  emit('update-answer', localAnswer.value);
};

/**
 * Deletes the answer card if it is deletable.
 */
const deleteThisCard = () => {
  if (props.deletable) {
    emit('delete-answer');
  }
};
</script>

<template>
  <div class="answer-card">
    <Input
        :id="`${identifier}:answer`"
        type="text"
        v-model="localAnswer.text"
        @update:model-value="emitUpdate"
        :disabled="props.readonly"
        placeholder="Enter answer here..."
    />    
    <input :id="`${identifier}:isCorrect`" type="checkbox" v-model="localAnswer.isCorrect" @change="emitUpdate" />

    <button v-if="props.deletable" @click="deleteThisCard" type="button" class="answer-card-btn">
      <img :src="deleteIcon" alt="Delete Answer" class="delete-icon" />
    </button>
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
  font-size: medium;
  line-height: 1.8;
}

.answer-card input[type="checkbox"] {
  transform: scale(1.5);
  margin: 10px;
  cursor: pointer;
}

.answer-card-btn{
  background-color: transparent;
  border: solid;
  border-color: transparent;
  border-radius: 5px;
  cursor: pointer;
  padding: 0;
}

.answer-card-btn:hover {
  background-color: #81c5f8;
  border: solid;
  border-color: #0B68C1;
}

.delete-icon {
  width: 40px;
  height: auto;
}

button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>

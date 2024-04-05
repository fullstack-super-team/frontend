<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';
import Button from './Button.vue';
import deleteIcon from '@/assets/delete.png'

const emit = defineEmits(['delete-answer', 'update-answer']);

const props = defineProps({
  answer: {
    text: String,
    isCorrect: Boolean
  }, 
  deletable: Boolean,
  readonly: Boolean
});

const localAnswer = ref({ ...props.answer });

const emitUpdate = () => {
  emit('update-answer', localAnswer.value);
};

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
  transform: scale(1.5); /* Adjust scale value as needed */
  margin: 10px; /* You might need to adjust margins to align the checkbox */
  cursor: pointer; /* To indicate it's clickable */
}

.answer-card-btn{
  background-color: transparent; /* Example: red background for visibility */
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
  width: 40px; /* Adjust the size as needed for the image */
  height: auto;
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

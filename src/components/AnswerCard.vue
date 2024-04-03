<script setup>
import { ref, defineEmits, defineProps } from 'vue';

const props = defineProps({
  initialAnswer: String,
  index: Number,
  deletable: Boolean,
  readonly: Boolean // Add this prop to handle readonly state
});

const answer = ref(props.initialAnswer);
const isCorrect = ref(false);
const emit = defineEmits(['delete', 'update']);

// Only allow deletion if the card is deletable
const deleteThisCard = () => {
  if (props.deletable) {
    emit('delete', props.index);
  }
};
</script>

<template>
  <div class="answer-card">
    <input
        type="text"
        v-model="answer"
        :disabled="props.readonly"
        placeholder="Enter answer here..."
    />
    <!-- Remove the :disabled binding here so the checkbox is always interactive -->
    <input type="checkbox" v-model="isCorrect" />
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

<script setup>
import { ref } from 'vue';
import TextArea from "@/components/TextArea.vue";
import Slider from "@/components/SliderAnswer.vue";
import AnswerCard from "@/components/AnswerCard.vue";
import Button from "@/components/Button.vue";

// Reactive states
const selectedType = ref('text');
const quizQuestion = ref('');
const textAnswers = ref([{ text: '', isCorrect: false }]);
const tfAnswers = ref([{ text: 'True', isCorrect: true }, { text: 'False', isCorrect: false }]);
const points = ref(100)
const emitDelete = defineEmits(['deleteQuestion', 'typeChanged']);

// Functions to manage text answers
const addTextAnswer = () => {
  if (textAnswers.value.length < 4) {
    textAnswers.value.push({ text: '', isCorrect: false });
  }
};

const updateTextAnswer = (index, event) => {
  textAnswers.value[index] = event;
};

const deleteTextAnswer = (index) => {
  textAnswers.value.splice(index, 1);
};

// Function to manage 'True or False' answers
// Since 'True or False' answers are fixed, there is no need for add or delete functions

// Emit an event when the question type changes
const typeChanged = () => {
  emit('typeChanged', selectedType.value);
};

const deleteQuestion = () => {
  emitDelete('deleteQuestion');
};
</script>


<template>
  <div class="create-question">
    <!-- Delete Button at the top right corner -->
    <Button @click="deleteQuestion" class="delete-question-btn">Delete Question</Button>

    <label for="question-type">Question Type:</label>
    <select id="question-type" v-model="selectedType" @change="typeChanged">
      <option value="text">Text</option>
      <option value="true_false">True or False</option>
      <option value="slide">Slide</option>
    </select>

    <p>Points: </p>
    <input type="radio" v-model="points" :value="100">
    <label for="100">100</label>
    <input type="radio" v-model="points" :value="200">
    <label for="100">200</label>
    <input type="radio" v-model="points" :value="300">
    <label for="100">300</label>


    <TextArea v-model:model-value="quizQuestion" label="Question:" placeholder="Write your question here.." :charLimit="200" required/>

    <!-- Slider Question Type -->
    <Slider v-if="selectedType === 'slide'" />


    <!-- Text Question Type -->
    <div v-if="selectedType === 'text'" class="answers-container">
      <AnswerCard
          v-for="(answer, index) in textAnswers"
          :key="index"
          :index="index"
          :initialAnswer="answer.text"
          :deletable="true"
          :readonly="false"
      @update="updateTextAnswer(index, $event)"
      @delete="deleteTextAnswer(index)"
      />
      <Button @click="addTextAnswer" :disabled="textAnswers.length >= 4">Add answer</Button>
    </div>

    <!-- True or False Question Type -->
    <div v-if="selectedType === 'true_false'" class="answers-container">
      <AnswerCard
          v-for="(answer, index) in tfAnswers"
          :key="index"
          :index="index"
          :initialAnswer="answer.text"
          :deletable="false"
          :readonly="true"
      @update="updateTextAnswer(index, $event)"
      />
    </div>
  </div>
</template>


<style scoped>
/* Your styles remain unchanged */
.create-question {
  margin: 20px 0;
  border-style: solid;
  border-width: medium;
  border-radius: 10px;
  padding: 10px;
  position: relative; /* Ensure the parent is positioned to anchor the absolute child */
}

.delete-question-btn {
  position: absolute;
  right: 10px; /* Adjust these values as needed */
  top: 10px;
  background-color: #f44336; /* Example: red background for visibility */
  color: white; /* Text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.create-question select, .create-question button {
  margin-left: 10px;
  margin-bottom: 20px;
}

.answers-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
}

.answer-card {
  flex-basis: calc(50% - 20px);
}
</style>

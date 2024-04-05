<script setup>
import TextArea from "@/components/TextArea.vue";
import Slider from "@/components/SliderAnswer.vue";
import AnswerCard from "@/components/AnswerCard.vue";
import Button from "@/components/Button.vue";
import deleteIcon from "@/assets/delete.png"
import { QuestionType, getQuestionTypes } from "@/utils/questionType";
import { ref } from "vue";
import Input from "@/components/Input.vue";

const emit = defineEmits([
  'delete-question', 
  'update-question'
]);

const props = defineProps({
  question: {
    type: Object,
    required: true,
    default: () => ({
      text: '',
      type: QuestionType.TEXT,
      answers: [{
        identifier: Date.now(),
        text: '',
        isCorrect: false,
      }],
    })
  }
});

const localQuestion = ref({
  ...props.question,
  points: props.question.points || 100
});

const emitUpdate = () => {
  emit('update-question', localQuestion.value);
};

const changeQuestionType = (event) => {  
  console.log('Question type changed:', event.target.value);
  switch (event.target.value) {
    case QuestionType.SLIDE:
      delete localQuestion.value.answers;
      localQuestion.value.answer = {
        min: 0,
        max: 5,
        stepSize: 1,
        correctValue: 3
      };
      break;
    case QuestionType.TEXT:
      delete localQuestion.value.answer;
      localQuestion.value.answers = [{
        identifier: Date.now(),
        text: '',
        isCorrect: false,
      }];
      break;
    case QuestionType.TRUE_OR_FALSE:
      delete localQuestion.value.answer;
      localQuestion.value.answers = [
        { identifier: 0, text: 'True', isCorrect: false },
        { identifier: 1, text: 'False', isCorrect: false }
      ];
      break;
  }
  emitUpdate();
};

// Functions to manage text answers
const addTextAnswer = () => {
  if (localQuestion.value.answers.length < 4) {
    localQuestion.value.answers.push({ 
      identifier: Date.now(),
      text: '', 
      isCorrect: false 
    });
  }
  emitUpdate();
};

const updateAnswer = (updatedAnswer, index) => {
  localQuestion.value.answers[index] = updatedAnswer;
  emitUpdate();
};

const deleteAnswer = (answerIdentifier) => {
  const index = localQuestion.value.answers.findIndex((answer) => answer.identifier === answerIdentifier);
  if (index === -1) return;
  localQuestion.value.answers.splice(index, 1);
  emitUpdate();
};

const deleteQuestion = () => {
  emit('delete-question');
};
</script>


<template>
  <div class="create-question">
    <!-- Delete Button at the top right corner -->
    <button @click="deleteQuestion" class="delete-question-btn">
      <img :src="deleteIcon" alt="Delete Question" class="delete-icon" />
    </button>'


    <label for="question-type">Question Type</label>
    <select id="question-type" v-model="localQuestion.type" @change="changeQuestionType">
      <option v-for="(questionType) in getQuestionTypes()" :value="questionType.value">{{ questionType.label }}</option>
    </select>

    <p>Points: </p>
    <div class="point-buttons-box">
      <input type="radio" id="points100" v-model="localQuestion.points" @change="emitUpdate" :value="100">
      <label for="points100">100</label>
      <input type="radio" id="points200" v-model="localQuestion.points" @change="emitUpdate" :value="200">
      <label for="points200">200</label>
      <input type="radio" id="points300" v-model="localQuestion.points" @change="emitUpdate" :value="300">
      <label for="points300">300</label>
    </div>

    <TextArea v-model="localQuestion.text" label="Question:" placeholder="Write your question here.." :charLimit="200" @update="emitUpdate" required/>

    <!-- Slider Question Type -->
    <Slider v-if="localQuestion.type === QuestionType.SLIDE" :answer="localQuestion.answer" />


    <!-- Text Question Type -->
    <div v-if="localQuestion.type === QuestionType.TEXT" class="answers-container">
      <AnswerCard
        v-if="localQuestion.type === QuestionType.TEXT"
        v-for="(answer, index) in localQuestion.answers"
        :key="answer.identifier"
        :answer="answer"
        :deletable="true"
        :readonly="false"
        @update-answer="updateAnswer($event, index)"
        @delete-answer="deleteAnswer(answer.identifier)"
      />
    </div>
    <Button v-if="localQuestion.type === QuestionType.TEXT" @click="addTextAnswer" :disabled="localQuestion.answers.length >= 4">Add answer</Button>

    <!-- True or False Question Type -->
      <div v-if="localQuestion.type === QuestionType.TRUE_OR_FALSE" class="answers-container">
        <AnswerCard
        v-if="localQuestion.type === QuestionType.TRUE_OR_FALSE"
        v-for="(answer, index) in localQuestion.answers"
        :key="answer.identifier"
        :answer="answer"
        :deletable="false"
        :readonly="true"
        @update-answer="updateAnswer($event, index)"
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
  background-color: transparent; /* Example: red background for visibility */
  color: white; /* Text color */
  border: solid;
  border-color: transparent;
  border-radius: 5px;
  cursor: pointer;
  padding: 0; /* Adjust as needed */
  width: auto; /* Adjust as needed */
  height: auto; /* Adjust as needed */
}

.delete-question-btn:hover {
  background-color: #81c5f8;
  border: solid;
  border-color: #0B68C1;
}

.delete-icon {
  width: 40px; /* Adjust the size as needed for the image */
  height: auto;
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

.point-buttons-box {
  display: flex;
  width: fit-content;
  border-radius: 80px;
  overflow: hidden;
}

.point-buttons-box input{
  display: flex;
}

/* Hides the default radio button appearance */
.point-buttons-box input[type="radio"] {
  display: none;
}

/* Styles for the labels which will look like buttons */
.point-buttons-box label {
  padding: 10px 15px;
  border: 2px solid #08589C; /* Adds a border with the same color as the background */
  background-color: #08589C;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  transition: background-color 0.3s ease; /* Smooth background color transition */
}

/* Change background color when hovering over the label */
.point-buttons-box label:hover {
  background-color: #0B68C1;
}

/* Changes the label appearance when the associated radio button is checked */
.point-buttons-box input[type="radio"]:checked + label {
  background-color: #4CAF50; /* Different background to indicate selection */
  color: white; /* You can change the text color if you like */
  border-color: #4CAF50; /* Optional: Change the border color if checked */
}


.answer-card {
  flex-basis: calc(50% - 20px);
}
</style>

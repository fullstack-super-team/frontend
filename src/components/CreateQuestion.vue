<script setup>
import TextArea from "@/components/TextArea.vue";
import SliderAnswer from "@/components/SliderAnswer.vue";
import AnswerCard from "@/components/AnswerCard.vue";
import Button from "@/components/Button.vue";
import deleteIcon from "@/assets/delete.png"
import { QuestionType, getQuestionTypes } from "@/utils/questionType";
import { ref } from "vue";
import Input from "@/components/Input.vue";

/**
 * A component that represents a question card.
 * It allows the user to input a question, select a question type, and add answers.
 * The card can be deleted if the deletable prop is set to true.
 */


/**
 * Emits events for deleting a question or updating a question.
 */
const emit = defineEmits([
  'delete-question', 
  'update-question'
]);

/**
 * Defines the props accepted by this component.
 *
 * @property {string} identifier - A unique identifier for the question card.
 * @property {Object} question - The question object containing the question text, type, points, and answers.
 */
const props = defineProps({
  identifier: String,
  question: {
    type: Object,
    required: true,
    default: () => ({
      text: '',
      type: QuestionType.TEXT,
      points: 100,
      answers: [{
        identifier: Date.now(),
        text: '',
        isCorrect: false,
      }],
    })
  },
  questionErrors: {
    type: Object,
    default: () => ({
      text: '',
      answers: [],
    })
  }
});

/**
 * Local state for the question card.
 */
const localQuestion = ref({
  ...props.question,
});

/**
 * Emits an update event with the current question value.
 */
const emitUpdate = () => {  
  emit('update-question', localQuestion.value);
};

/**
 * Changes the question type based on the selected value.
 *
 * @param {Event} event - The change event.
 */
const changeQuestionType = (event) => {    
  switch (event.target.value) {
    case QuestionType.SLIDE:
      delete localQuestion.value.answers;
      localQuestion.value.answer = {
        identifier: `${props.identifier}-a}`, 
        min: 0,
        max: 5,
        stepSize: 1,
        correctValue: 3
      };
      break;
    case QuestionType.TEXT:
      delete localQuestion.value.answer;
      localQuestion.value.answers = [{
        identifier: `${props.identifier}-a${Date.now()}`,
        text: '',
        isCorrect: false,
      }];
      break;
    case QuestionType.TRUE_OR_FALSE:
      delete localQuestion.value.answer;
      localQuestion.value.answers = [
        { identifier: `${props.identifier}-a0}`, text: 'True', isCorrect: false },
        { identifier: `${props.identifier}-a1}`, text: 'False', isCorrect: false }
      ];
      break;
  }
  emitUpdate();
};

/**
 * Adds a text answer to the question.
 */
const addTextAnswer = () => {
  if (localQuestion.value.answers.length >= 4) {
    return;
  }
  const answerIdentifier = `${props.identifier}-a${Date.now()}`;
  props.questionErrors.answers.push({ identifier: `${answerIdentifier}`, text: '' });
  localQuestion.value.answers.push({ 
    identifier: `${answerIdentifier}`,
    text: '', 
    isCorrect: false 
  });
  emitUpdate();
};

/**
 * Updates an answer in the question.
 *
 * @param {Object} updatedAnswer - The updated answer object.
 * @param {string} identifier - The identifier of the answer to update.
 */
const updateAnswer = (updatedAnswer, identifier) => {
  const index = localQuestion.value.answers.findIndex((answer) => answer.identifier === identifier);
  localQuestion.value.answers.splice(index, 1, updatedAnswer); 
  emitUpdate();
};

/**
 * Deletes an answer from the question.
 *
 * @param {string} identifier - The identifier of the answer to delete.
 */
const deleteAnswer = (identifier) => {  
  const index = localQuestion.value.answers.findIndex((answer) => answer.identifier === identifier);
  localQuestion.value.answers.splice(index, 1);
  const errorIndex = props.questionErrors.answers.findIndex((answerError) => answerError.identifier === identifier);
  props.questionErrors.answers.splice(errorIndex, 1);
  emitUpdate();
};

/**
 * Deletes the question card.
 */
const deleteQuestion = () => {
  emit('delete-question');
};
</script>

<template>
  <div class="create-question">
    <button type=""button @click="deleteQuestion" class="delete-question-btn">
      <img :src="deleteIcon" alt="Delete Question" class="delete-icon" />
    </button>

    <label :for="`${identifier}:type`">Question Type</label>
    <select :id="`${identifier}:type`" v-model="localQuestion.type" @change="changeQuestionType">
      <option v-for="(questionType) in getQuestionTypes()" :value="questionType.value">{{ questionType.label }}</option>
    </select>

    <p>Points</p>
    <div class="point-buttons-box">
      <input type="radio" :id="`${identifier}:points100`" v-model="localQuestion.points" @change="emitUpdate" :value="100">
      <label :for="`${identifier}:points100`">100</label>
      <input type="radio" :id="`${identifier}:points200`" v-model="localQuestion.points" @change="emitUpdate" :value="200">
      <label :for="`${identifier}:points200`">200</label>
      <input type="radio" :id="`${identifier}:points300`" v-model="localQuestion.points" @change="emitUpdate" :value="300">
      <label :for="`${identifier}:points300`">300</label>
    </div>

    <TextArea :id="`${identifier}:text`" v-model="localQuestion.text" label="Question" placeholder="Write your question here.." :charLimit="200" :startHeight="100" @update:model-value="emitUpdate" :error-message="questionErrors.text" />

    <h3>Answers</h3>    
    <SliderAnswer :id="`${identifier}:slider`" v-if="localQuestion.type === QuestionType.SLIDE" :answer="localQuestion.answer" />

    <div v-if="localQuestion.type === QuestionType.TEXT" class="answers-container">
      <AnswerCard
        v-if="localQuestion.type === QuestionType.TEXT"
        v-for="(answer) in localQuestion.answers"
        :key="`${answer.identifier}`"
        :identifier="`${answer.identifier}`"
        :answer="answer"
        :answer-errors="questionErrors.answers.find(answerError => answerError.identifier === answer.identifier)"
        :deletable="true"
        :readonly="false"
        @update-answer="updateAnswer($event, answer.identifier)"
        @delete-answer="deleteAnswer(`${answer.identifier}`)"
      />
    </div>
    <Button v-if="localQuestion.type === QuestionType.TEXT" @click="addTextAnswer" :disabled="localQuestion.answers?.length >= 4">Add answer</Button>
      <div v-if="localQuestion.type === QuestionType.TRUE_OR_FALSE" class="answers-container">
        <AnswerCard
        v-if="localQuestion.type === QuestionType.TRUE_OR_FALSE"
        v-for="(answer) in localQuestion.answers"
        :key="`${answer.identifier}`"
        :identifier="`${answer.identifier}`"
        :answer="answer"
        :deletable="false"
        :readonly="true"
        @update-answer="updateAnswer($event, answer.identifier)"
       />
      </div>
  </div>
</template>


<style scoped>

.create-question {
  margin: 20px 0;
  border-style: solid;
  border-width: medium;
  border-radius: 10px;
  padding: 10px;
  position: relative;
}

.delete-question-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: transparent;
  color: white;
  border: solid;
  border-color: transparent;
  border-radius: 5px;
  cursor: pointer;
  padding: 0;
  width: auto;
  height: auto;
}

.delete-question-btn:hover {
  background-color: #81c5f8;
  border: solid;
  border-color: #0B68C1;
}

.delete-icon {
  width: 40px;
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

.point-buttons-box input[type="radio"] {
  display: none;
}

.point-buttons-box label {
  padding: 10px 15px;
  border: 2px solid #08589C;
  background-color: #08589C;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.point-buttons-box label:hover {
  background-color: #0B68C1;
}

.point-buttons-box input[type="radio"]:checked + label {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

button:disabled {
  opacity: 50%;
}

.answer-card {
  flex-basis: calc(50% - 20px);
}

.point-buttons-box {
  margin-bottom: 10px;
}
</style>

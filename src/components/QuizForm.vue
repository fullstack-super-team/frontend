<script setup>
import { ref, reactive } from 'vue';
import { Category, getCategories } from '@/utils/category';
import { DifficultyLevel, getDifficultyLevels } from '@/utils/difficultyLevel';
import { QuestionType } from '@/utils/questionType';
import Button from './Button.vue';
import Input from './Input.vue';
import TextArea from './TextArea.vue';
import CreateQuestion from './CreateQuestion.vue';

const emit = defineEmits(['submit'])

const props = defineProps({
  formTitle: {
    type: String,
    required: true,
  },
  submitFormText: {
    type: String,
    default: 'Save',
  },
  initialValues: {
    type: Object,
    default: () => ({}),
  },
  onSubmit: {
    type: Function,
    required: true,
  },
})

const defaultValues = {
  title: "",
  description: "",
  category: Category.GENERAL,
  difficultyLevel: DifficultyLevel.EASY,
  questions: [],
};

const mergedValues = { ...defaultValues, ...props.initialValues };
const quiz = reactive(mergedValues);

let questionIdentifier = 0;
for (const question of quiz.questions) {  
  let answerIdentifier = 0;
  question.identifier = `q${questionIdentifier}`;
  if (question.type === QuestionType.TEXT || question.type === QuestionType.TRUE_OR_FALSE) {
    for (const answer of question.answers) {
      answer.identifier = `${question.identifier}-a${answerIdentifier}`;
      answerIdentifier++;
    }    
  } else if (question.type === QuestionType.SLIDE) {
    question.answer.identifier = `${question.identifier}-a${answerIdentifier}`;
    answerIdentifier++;
  }  
  questionIdentifier++;  
}

const formSubmitted = ref(false);

const addQuestion = () => {
  const identifier = `q${Date.now()}`;  
  quiz.questions.push({
    identifier: identifier,
    text: "",
    points: 100,
    type: QuestionType.TEXT,
    answers: [
      {
        identifier: `${identifier}-a${Date.now()}`,
        text: '',
        isCorrect: false,
      }
    ],
  });
};

function updateQuestion(updatedQuestion, identifier) {    
  const index = quiz.questions.findIndex((question) => question.identifier === identifier);    
  quiz.questions[index] = updatedQuestion;
}

const deleteQuestion = (identifier) => {  
  const index = quiz.questions.findIndex((question) => question.identifier === identifier);
  quiz.questions.splice(index, 1);
};

function emitSubmit() {
  emit('submit', quiz)
}
</script>

<template>
  <form novalidate @submit.prevent="emitSubmit">
    <div class="upperBar">  
      <h1>{{ formTitle }}</h1>      
      <Button type="submit">{{ submitFormText }}</Button>
    </div>
    <Input id="quizTitle" label="Quiz title: *" placeholder="Enter your quiz title here" v-model="quiz.title"
      :class="{ 'is-invalid': formSubmitted && !quiz.title }" />
    <p v-if="formSubmitted && !quiz.title" class="validation-error">Quiz title is required.</p>    

    <div class="dropdownMenus">
      <h2>Select a Category</h2>
      <select id="quizCategory" v-model="quiz.category">
        <option v-for="category in getCategories()" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>

      <h2>Select a difficulty</h2>
      <select id="quizDifficultyLevel"v-model="quiz.difficultyLevel">
        <option v-for="difficultyLevel in getDifficultyLevels()" :key="difficultyLevel.value"
          :value="difficultyLevel.value">
          {{ difficultyLevel.label }}
        </option>
      </select>
    </div>

    <TextArea id="quizDescription" v-model="quiz.description" label="Description" placeholder="Enter quiz description here..."
      :charLimit="200" />

    <h2>Questions</h2>
    <CreateQuestion v-for="(question) in quiz.questions" :key="question.identifier" :identifier="question.identifier" :question="question"
      @update-question="updateQuestion($event, question.identifier)" @delete-question="deleteQuestion(question.identifier)" />
    <div class="lowerBar">
      <Button @click="addQuestion">Add Question</Button>
      <Button type="submit" v-if="quiz.questions.length > 0">{{ submitFormText }}</Button>
    </div>
  </form>
</template>

<style scoped>
.upperBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lowerBar {
  display: flex;
  justify-content: space-between;
}

.is-invalid {
  border-color: red;
  /* Add your error styling here */
}

.validation-error {
  color: red;
  /* Style for the validation message */
  font-size: 0.9em;
}

.dropdownMenus {
  margin-bottom: 20px;
  /* Additional style for spacing */
}

</style>
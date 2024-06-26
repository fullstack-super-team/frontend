<script setup>
import { ref, reactive } from 'vue';
import { Category, getCategories } from '@/utils/category';
import { DifficultyLevel, getDifficultyLevels } from '@/utils/difficultyLevel';
import { QuestionType } from '@/utils/questionType';
import Button from './Button.vue';
import Input from './Input.vue';
import TextArea from './TextArea.vue';
import CreateQuestion from './CreateQuestion.vue';

/**
 * A Vue component script for creating a quiz form.
 * The component allows users to create a quiz by providing a title, description, category, difficulty level,
 * and a list of questions with answers.
 */

/**
 * Emits an event when the form is submitted.
 */
const emit = defineEmits(['submit'])

/**
 * Defines the props expected by the component.
 *
 * @property {string} formTitle - The title of the form. This prop is required.
 * @property {string} submitFormText - The text displayed on the submit button. Defaults to 'Save'.
 * @property {Object} initialValues - The initial values for the form fields. Defaults to an empty object.
 * @property {Function} onSubmit - The function to call when the form is submitted. This prop is required.
 */
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

/**
 * The default values for the quiz form.
 *
 * @type {{difficultyLevel: number, questions: *[], description: string, title: string, category: string, randomize: boolean}}
 */
const defaultValues = {
  title: "",  
  description: "",
  randomize: false,
  category: Category.GENERAL,
  difficultyLevel: DifficultyLevel.EASY,
  questions: [],
};

/**
 * Merges the default values with the initial values provided as props.
 */
const mergedValues = { ...defaultValues, ...props.initialValues };

/**
 * A reactive object that contains the quiz form data.
 */
const quiz = reactive(mergedValues);

/**
 * A reactive object that contains the form errors.
 */
const formErrors = reactive({
  title:  '',
  questions: []
});


function formIsValid() {
  let isValid = true;
  if (!quiz.title) {
    formErrors.title = 'Quiz title is required.';
    isValid = false;   
  } else {
    formErrors.title = '';
  }

  for (const question of quiz.questions) {    
    const index = quiz.questions.findIndex((q) => q.identifier === question.identifier);  
    const questionError = formErrors.questions[index];
    if (!question.text) {
      questionError.text = 'Question text is required.';    
      isValid = false;        
    } else {
      questionError.text = '';
    }

    // Check answers for question
    if (question.type === QuestionType.TEXT || question.type === QuestionType.TRUE_OR_FALSE) {
      for (const answer of question.answers) {
        const answerIndex = question.answers.findIndex((a) => a.identifier === answer.identifier);        
        const answerError = questionError.answers[answerIndex];
        console.log({answerIndex}, {answerError});
        
        if (!answer.text) {
          answerError.text = 'Answer text is required.';    
          isValid = false;
        } else {
          answerError.text = '';
        }
        
        // Find index of answer
        questionError.answers[answerIndex] = answerError;
      }
    }
       
    formErrors.questions[index] = questionError;    
  }    
  console.log(formErrors)
  return isValid;
}

/**
 * The unique identifier for questions.
 */
let questionIdentifier = 0;

/**
 * Assigns unique identifiers to questions and answers.
 */
for (const question of quiz.questions) {  
  let answerIdentifier = 0;
  question.identifier = `q${questionIdentifier}`;
  const questionError = { identifier: question.identifier, text: '', answers: [] };
  if (question.type === QuestionType.TEXT || question.type === QuestionType.TRUE_OR_FALSE) {    
    for (const answer of question.answers) {
      questionError.answers.push({ identifier: `${question.identifier}-a${answerIdentifier}`, text: '' });
      answer.identifier = `${question.identifier}-a${answerIdentifier}`;
      answerIdentifier++;
    }    
  } else if (question.type === QuestionType.SLIDE) {
    question.answer.identifier = `${question.identifier}-a${answerIdentifier}`;
    answerIdentifier++;
  }  
  questionIdentifier++;  
  formErrors.questions.push(questionError);
}

/**
 * Adds a new question to the quiz.
 */
const addQuestion = () => {
  const identifier = `q${Date.now()}`;  
  const answerIdentifier = `${identifier}-a${Date.now()}`;
  formErrors.questions.push({ 
    identifier, 
    text: '', 
    answers: [
      { identifier: answerIdentifier, text: '' }
    ]
  });
  quiz.questions.push({
    identifier: identifier,
    text: "",
    points: 100,
    type: QuestionType.TEXT,
    answers: [
      {
        identifier: `${answerIdentifier}`,
        text: '',
        isCorrect: false,
      }
    ],
  });  
};

/**
 * Updates a question in the quiz.
 *
 * @param {Object} updatedQuestion - The updated question object.
 * @param {string} identifier - The unique identifier of the question.
 */
function updateQuestion(updatedQuestion, identifier) {    
  const index = quiz.questions.findIndex((question) => question.identifier === identifier);    
  quiz.questions[index] = updatedQuestion;
}

/**
 * Deletes a question from the quiz.
 *
 * @param {string} identifier - The unique identifier of the question.
 */
const deleteQuestion = (identifier) => {  
  const index = quiz.questions.findIndex((question) => question.identifier === identifier);
  quiz.questions.splice(index, 1);
  const formErrorIndex = formErrors.questions.findIndex((questionError) => questionError.identifier === identifier);
  formErrors.questions.splice(formErrorIndex, 1);
};

/**
 * Emits the submit event.
 */
function emitSubmit() {
  console.log("Submitting form")
  if (!formIsValid()) {
    return;
  }
  emit('submit', quiz)
}
</script>

<template>
  <form novalidate @submit.prevent="emitSubmit">
    <div class="upperBar">  
      <h1>{{ formTitle }}</h1>      
      <Button type="submit">{{ submitFormText }}</Button>
    </div>
    <Input id="quizTitle" label="Quiz title" placeholder="Enter your quiz title here" v-model="quiz.title" :error-message="formErrors.title" />    
    
    <div class="dropdownMenus">
      <p>Select a Category</p>
      <select id="quizCategory" v-model="quiz.category">
        <option v-for="category in getCategories()" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>
      
      <p>Select a difficulty</p>
      <select id="quizDifficultyLevel"v-model="quiz.difficultyLevel">
        <option v-for="difficultyLevel in getDifficultyLevels()" :key="difficultyLevel.value"
        :value="difficultyLevel.value">
        {{ difficultyLevel.label }}
      </option>
    </select>
  </div>
  
  <TextArea id="quizDescription" v-model="quiz.description" label="Description" placeholder="Enter quiz description here..."
  :charLimit="200" />

  <input id="randomize" type="checkbox" v-model="quiz.randomize" class="randomize-checkbox"/>
  <label for="randomize" class="randomize-label">Randomize question and answer order</label>
  
    <h2>Questions</h2>
    <CreateQuestion v-for="(question) in quiz.questions" :key="question.identifier" :identifier="question.identifier" :question="question"
      @update-question="updateQuestion($event, question.identifier)" @delete-question="deleteQuestion(question.identifier)" :question-errors="formErrors.questions.find(questionError => questionError.identifier === question.identifier)" />
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

.randomize-checkbox, .randomize-label {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
}

.randomize-checkbox {
  transform: scale(1.5);
  cursor: pointer;
}

.is-invalid {
  border-color: red;
}

.validation-error {
  color: red;
  font-size: 0.9em;
}

.dropdownMenus {
  margin-bottom: 20px;
}

select {
  margin-bottom: auto;
}

p {
  margin-top: 20px;
  margin-bottom: -10px;
}

h2 {
  margin-bottom: 10px;
}

</style>
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
  questions: [
    {
      identifier: Date.now(),
      text: "",
      points: 100,
      type: QuestionType.TEXT,
      answers: [
        {              
          text: "",
          isCorrect: false,
        }
      ],
    }
  ],
};

const mergedValues = { ...defaultValues, ...props.initialValues };
const quiz = reactive(mergedValues);

for (const question of quiz.questions) {
  console.log(question)
}
console.log(quiz)

const formSubmitted = ref(false);

const addQuestion = () => {
  quiz.questions.push({
    identifier: Date.now(),
    text: "",
    points: 100,
    type: QuestionType.TEXT,
    answers: [
      {
        identifier: Date.now(),
        text: '',
        isCorrect: false,
      }
    ],
  });
};

function updateQuestion(updatedQuestion, index) {    
  quiz.questions[index] = updatedQuestion;
}

const deleteQuestion = (questionIdentifier) => {
  const index = quiz.questions.findIndex((question) => question.identifier === questionIdentifier);
  if (index === -1) return;
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
      <Button type="submit">Save</Button>
    </div>
    <Input label="Quiz title: *" placeholder="Enter your quiz title here" v-model="quiz.title"
      :class="{ 'is-invalid': formSubmitted && !quiz.title }" />
    <p v-if="formSubmitted && !quiz.title" class="validation-error">Quiz title is required.</p>    

    <div class="dropdownMenus">
      <h2>Select a Category</h2>
      <select v-model="quiz.category">
        <option v-for="category in getCategories()" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>

      <h2>Select a difficulty</h2>
      <select v-model="quiz.difficultyLevel">
        <option v-for="difficultyLevel in getDifficultyLevels()" :key="difficultyLevel.value"
          :value="difficultyLevel.value">
          {{ difficultyLevel.label }}
        </option>
      </select>
    </div>

    <TextArea v-model="quiz.description" label="Description" placeholder="Enter quiz description here..."
      :charLimit="200" />

    <h2>Questions: {{ quiz.questions.length }}</h2>
    <Button @click="addQuestion">Add Question</Button>
    <CreateQuestion v-for="(question, index) in quiz.questions" :key="question.identifier" :question="question"
      @update-question="updateQuestion($event, index)" @delete-question="deleteQuestion(question.identifier)" />
  </form>
</template>

<style scoped>
.upperBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
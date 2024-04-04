<script setup>
import { ref, reactive } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import mainStore from '@/stores/mainStore.js';
import Input from "@/components/Input.vue";
import TextArea from "@/components/TextArea.vue";
import Button from "@/components/Button.vue";
import CreateQuestion from '@/components/CreateQuestion.vue';
import { Category, getCategories } from "@/utils/category.js";
import { QuestionType } from "@/utils/questionType.js";
import { DifficultyLevel, getDifficultyLevels } from "@/utils/difficultyLevel.js";
import { useRouter } from 'vue-router';

const router = useRouter();

// Reactive state
const quiz = reactive({
  title: '',
  description: '',
  category: Category.GENERAL,
  difficultyLevel: DifficultyLevel.EASY,
  questions: [],
});


const formSubmitted = ref(false);

// Methods
const addQuestion = () => {
  quiz.questions.push({
    identifier: Date.now(),
    text: "",
    points: 100,
    type: QuestionType.TEXT,
    answers: [
      {
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

const saveQuiz = async () => {
  formSubmitted.value = true; // Indicate that a submit attempt has been made
  if (!quiz.title) {
    return;
  }
  await mainStore.dispatch('quiz/createQuiz', quiz);  
  router.push(`/quiz/${mainStore.state.quiz.quiz.id}`);
};
</script>

<template>
  <MainLayout>
    <div class="upperBar">
      <h1>Create Quiz</h1>
      <Button @click="saveQuiz">Create</Button>
    </div>
    <Input label="Quiz title*" placeholder="Enter your quiz title here" v-model="quiz.title"
      :class="{ 'is-invalid': formSubmitted && !quiz.title }" />
    <p v-if="formSubmitted && !quiz.title" class="validation-error">Quiz title is required.</p>

    <div class="dropdownMenus">
      <h2>Select a category</h2>
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
      :charLimit="200" required />

    <h2>Questions:</h2>
    <!--<Button @click="addQuestion">Add Question</Button>-->
    <CreateQuestion v-for="(question, index) in quiz.questions" :key="question.identifier" :question="question"
      @update-question="updateQuestion($event, index)" @delete-question="deleteQuestion(question.identifier)" />
    <div class="lowerBar">
      <Button @click="addQuestion">Add Question</Button>
      <Button @click="saveQuiz" v-if="quiz.questions.length > 0">Create</Button>
    </div>


  </MainLayout>
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

/* Additional styles for .dropdownMenus and other classes can be added here */
</style>

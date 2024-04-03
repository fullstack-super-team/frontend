<script>
import { ref, defineComponent } from "vue";
import MainLayout from '@/layouts/MainLayout.vue';
import Input from "@/components/Input.vue";
import TextArea from "@/components/TextArea.vue";
import Button from "@/components/Button.vue";
import CreateQuestion from '@/components/CreateQuestion.vue';
import { Category, getCategories } from "@/utils/category.js";
import { DifficultyLevel, getDifficultyLevels } from "@/utils/difficultyLevel.js";

export default defineComponent({
  components: { CreateQuestion, TextArea, Input, MainLayout, Button },
  setup() {
    const quizTitle = ref('');
    const quizDescription = ref('');
    const selectedCategory = ref(Category.GENERAL);
    const selectedDifficulty = ref(DifficultyLevel.EASY);
    const questions = ref([{}]);
    const formSubmitted = ref(false);

    const addQuestion = () => {
      questions.value.push({});
    };

    const deleteQuestion = (index) => {
      questions.value.splice(index, 1);
    };

    const saveQuiz = () => {
      formSubmitted.value = true; // Indicate that a submit attempt has been made
      if (quizTitle.value) {
        // Proceed with the saving process
        console.log("Saving quiz:", quizTitle.value);
        // Add here the API call or method to save the quiz data
      }
    };

    return {
      quizTitle,
      quizDescription,
      selectedCategory,
      selectedDifficulty,
      questions,
      formSubmitted,
      addQuestion,
      deleteQuestion,
      saveQuiz,
      getCategories,
      getDifficultyLevels,
    };
  },
});
</script>

<template>
  <main-layout>
    <div class="upperBar">
      <h1>Create Quiz</h1>
      <Button @click="saveQuiz">Save</Button>
    </div>
    <Input label="Quiz title: *"
           placeholder="Enter your quiz title here"
           v-model="quizTitle"
           :class="{ 'is-invalid': formSubmitted && !quizTitle }" />
    <p v-if="formSubmitted && !quizTitle" class="validation-error">Quiz title is required.</p>

    <div class="dropdownMenus">
      <h2>Select a Category</h2>
      <select v-model="selectedCategory">
        <option disabled value="">Please select a category</option>
        <option v-for="category in getCategories()" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>

      <h2>Select a difficulty</h2>
      <select v-model="selectedDifficulty">
        <option disabled value="">Please select your difficulty</option>
        <option v-for="difficultyLevel in getDifficultyLevels()" :key="difficultyLevel.value" :value="difficultyLevel.value">
          {{ difficultyLevel.label }}
        </option>
      </select>
    </div>

    <TextArea v-model:modelValue="quizDescription"
              label="Description"
              placeholder="Enter quiz description here..."
              :charLimit="200"
              required />

    <h2>Questions:</h2>
    <Button @click="addQuestion">Add Question</Button>
    <div v-for="(question, index) in questions" :key="index">
      <CreateQuestion @deleteQuestion="() => deleteQuestion(index)" />
    </div>
  </main-layout>
</template>

<style scoped>
.upperBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.is-invalid {
  border-color: red; /* Add your error styling here */
}

.validation-error {
  color: red; /* Style for the validation message */
  font-size: 0.9em;
}

.dropdownMenus {
  margin-bottom: 20px; /* Additional style for spacing */
}

/* You might want to add additional styles for .dropdownMenus and other classes */
</style>

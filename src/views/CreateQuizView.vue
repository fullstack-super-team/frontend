<script>
import { ref, defineComponent } from "vue";
import MainLayout from '@/layouts/MainLayout.vue';
import Input from "@/components/Input.vue";
import TextArea from "@/components/TextArea.vue";
import Button from "@/components/Button.vue";
import CreateQuestion from "@/components/CreateQuestion.vue";
import {Category, getCategories} from "@/utils/category.js";
import {DifficultyLevel, getDifficultyLevels} from "@/utils/difficultyLevel.js";

export default defineComponent({
  methods: {getDifficultyLevels, getCategories},
  components: {CreateQuestion, TextArea, Input, MainLayout, Button },
  setup() {
    const quizDescription = ref('');
    const selectedCategory = ref(Category.GENERAL);
    const selectedDiffeculty = ref(DifficultyLevel.EASY);



    // Define handleClick method
    const handleClick = () => {
      console.log("Save button clicked");
      // Implement your save logic here
    };

    return { quizDescription, selectedCategory: selectedCategory, selectedDiffeculty: selectedDiffeculty, handleClick }; // Return handleClick here
  }
});
</script>


<template>
  <main-layout>
    <div class="upperBar">
    <h1>Create Quiz</h1>
    <Button @click="handleClick">Save</Button> <!--Legg inn "Save quiz" funksjon kall-->
    </div>
    <Input label="Quiz title:" placeholder="Enter your quiz title here"/>
    <p>Author: Billington</p>
<!--    <Input label="Author: " placeholder="Enter your name here"/>-->

    <div class="dropdownMenus">
      <h2>Select a Category</h2>
      <select v-model="selectedCategory">
        <option disabled value="">Please select a category</option>
        <option v-for="category in getCategories()" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>
      <h2>Select a difficulty</h2>
      <select v-model="selectedDiffeculty">
        <option disabled value="">Please select your difficulty</option>
        <option v-for="difficultyLevel in getDifficultyLevels()" :key="difficultyLevel.value" :value="difficultyLevel.value">
          {{ difficultyLevel.label }}
        </option>
      </select>
    </div>

    <TextArea v-model:modelValue="quizDescription" label="Description" placeholder="Enter quiz description here..." :charLimit="200" required/>

    <p>[] Randomization checkbox</p>

    <CreateQuestion />
  </main-layout>
</template>

<style scoped>
.upperBar {
  display: flex; /* Use flexbox to layout children */
  justify-content: space-between; /* Space between title and button */
  align-items: center; /* Align items vertically */
}
</style>

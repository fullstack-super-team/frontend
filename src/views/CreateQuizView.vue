<script>
import { ref, defineComponent } from "vue";
import MainLayout from '@/layouts/MainLayout.vue';
import Input from "@/components/Input.vue";
import TextArea from "@/components/TextArea.vue";

export default defineComponent({
  components: { TextArea, Input, MainLayout },
  setup() {
    const quizDescription = ref('');
    const selectedOption = ref('');
    const options = ref([
      { text: 'Option 1', value: '1' },
      // Add more options as needed
    ]);

    return { quizDescription, selectedOption, options };
  }
});
</script>



<template>
  <main-layout>
    <h1>Create Quiz</h1>
    <Input label="Quiz title:" placeholder="Enter your quiz title here"/>
    <Input label="Author: " placeholder="Enter your name here"/>

    <div class="dropdownMenus">
      <h2>Select a Category</h2>
      <select v-model="selectedOption">
        <option disabled value="">Please select a category</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <h2>Select a difficulty</h2>
      <select v-model="selectedOption">
        <option disabled value="">Please select your difficulty</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>

    <TextArea v-model:modelValue="quizDescription" label="Description" placeholder="Enter quiz description here..." :charLimit="200" required/>

  </main-layout>
</template>

<style scoped>

</style>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import TextArea from "@/components/TextArea.vue";
import button from "@/components/Button.vue";

async function submitFeedback() {
  try {
    console.log(feedbackDescription);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <MainLayout>
    <div class="feedback">
      <h1>Feedback</h1>
      <p>Help us improve by providing your feedback below.</p>
      <TextArea v-model:modelValue="feedbackDescription" placeholder="Enter your feedback here..." :charLimit="200" required/>
      <form @submit.prevent="submitFeedback">
        <button type="submit">Submit</button>
      </form>
    </div>
  </MainLayout>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: normal;
  padding: 20px;
}

input[type="submit"]:hover {
  background-color: #318aad;
}

@media (max-width: 768px) {
  .wrapper {
    align-items: stretch;
    padding: 10px;
  }
}

</style>
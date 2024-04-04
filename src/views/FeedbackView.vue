<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import MainLayout from "@/layouts/MainLayout.vue";
import TextArea from "@/components/TextArea.vue";
import Button from "@/components/Button.vue";

const store = useStore();
const feedbackDescription = ref('');
const submissionStatus = ref(''); // Define the submissionStatus reactive variable

const user = computed(() => store.state.user);

async function submitFeedback() {
  const endpoint = 'http://localhost:8080/feedback';

  submissionStatus.value = ''; // Clear previous status

  try {
    const payload = {
      comment: feedbackDescription.value
    };
    const token = store.state.user.token;
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.post(endpoint, payload, headers);
    console.log(response.data);
    feedbackDescription.value = '';
    submissionStatus.value = 'Thank you for your feedback!'; // Set a success message
  } catch (error) {
    console.error(error);
    submissionStatus.value = 'An error occurred while submitting your feedback. Please try again.'; // Set an error message
  }
}
</script>


<template>
  <MainLayout>
    <div class="feedback">
      <h1>Feedback</h1>
      <p>Help us improve by providing your feedback below.</p>
      <form @submit.prevent="submitFeedback" class="feedback-form">
        <TextArea v-model:modelValue="feedbackDescription" placeholder="Enter your feedback here..." :charLimit="200" required/>
        <Button type="submit">Submit</Button>
        <p v-if="submissionStatus" class="submission-status">{{ submissionStatus }}</p>
      </form>
    </div>
  </MainLayout>
</template>

<style scoped>
.feedback {
  display: flex;
  flex-direction: column;
  align-items: normal;
  padding: 20px;
}

p {
  color: #08589CFF;
}

@media (max-width: 768px) {
  .feedback {
    align-items: stretch;
    padding: 10px;
  }
}

</style>
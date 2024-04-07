<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import MainLayout from "@/layouts/MainLayout.vue";
import TextArea from "@/components/TextArea.vue";
import Button from "@/components/Button.vue";

/**
 * Script setup for the feedback submission component.
 * Uses Vue's Composition API for reactive state management and Axios for HTTP requests.
 * The script includes state for the feedback description and submission status,
 * and computed property for the current user.
 */

const store = useStore();
const feedbackDescription = ref('');
const submissionStatus = ref('');


/**
 * Computed property for the current user.
 *
 * @returns {Object} The current user object.
 */
const user = computed(() => store.state.user);

/**
 * Submits feedback to a designated endpoint.
 * Validates the feedback description before sending an HTTP POST request.
 * It updates the submission status to provide user feedback on the operation.
 * The function uses Axios for making the HTTP request, including the authorization token in the request headers.
 *
 * @async
 * @function submitFeedback
 * @returns {Promise<void>} A promise that resolves when the feedback submission process is complete.
 * @throws {Error} Throws an error if the HTTP request fails.
 */
async function submitFeedback() {
  if (!feedbackDescription.value.trim()) {
    submissionStatus.value = 'Please enter your feedback before submitting.';
    return;
  }
  const endpoint = 'http://localhost:8080/feedback';

  submissionStatus.value = '';

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
    submissionStatus.value = 'Thank you for your feedback!';
  } catch (error) {
    console.error(error);
    submissionStatus.value = 'An error occurred while submitting your feedback. Please try again.';
  }
}
</script>

<template>
  <MainLayout>
    <div class="feedback">
      <h1>Feedback</h1>
      <p>Help us improve by providing your feedback below.</p>
      <form @submit.prevent="submitFeedback" class="feedback-form">
        <TextArea v-model:modelValue="feedbackDescription" placeholder="Enter your feedback here..."
                  :charLimit="500" :start-height ="150"/>
        <Button type="submit">Submit</Button>
        <p v-if="submissionStatus" class="{ 'error-text': submissionStatus.startsWith('Please') }">
          {{ submissionStatus }}
        </p>
      </form>
    </div>
  </MainLayout>
</template>

<style scoped>
.feedback {
  display: flex;
  flex-direction: column;
  align-items: normal;
  gap: 16px;
  padding: 20px;
}

p {
  color: #08589CFF;
}

Button {
  margin-top: 20px;
}


@media (max-width: 768px) {
  .feedback {
    align-items: stretch;
    padding: 10px;
  }
}
</style>
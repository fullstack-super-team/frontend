<script setup>
import { ref, computed } from "vue";
import axios from "axios"; // Import axios for HTTP requests
import { useStore } from "vuex";
import MainLayout from "@/layouts/MainLayout.vue";
import TextArea from "@/components/TextArea.vue";
import Button from "@/components/Button.vue";
import mainStore  from "@/stores/mainStore.js";

const store = useStore();
const feedbackDescription = ref('');

const user = computed(() => store.state.user)

async function submitFeedback() {
  const endpoint = 'http://localhost:8080/feedback';

  try {
    const payload = {
      comment: feedbackDescription.value
    };
    const token = store.state.user.token;
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const response = await axios.post(endpoint, payload, headers);
    console.log(response.data)
    feedbackDescription.value = '';
  } catch (error) {
    // Log the error to the console
    console.error(error);
    // Handle the error (e.g., show an error message to the user)
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
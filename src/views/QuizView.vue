<script setup>
/**
 * Script setup for the Quiz Detail View.
 * Handles state initialization, data fetching on mount, and defines computed properties for the quiz details.
 * Also provides methods for navigation like starting a quiz.
 */
import { computed} from "vue";
import { onMounted, ref } from "vue";
import Button from "@/components/Button.vue";
import mainStore from "@/stores/mainStore.js";
import MainLayout from "@/layouts/MainLayout.vue";
import router from "@/router/index.js";
import { useRoute } from "vue-router";
import { formatDate, formatDateWithTime} from "@/utils/dateFormatter.js";

/**
 * The quiz object that will be filled with the quiz data once it's fetched.
 * @type {Ref<Object|null>}
 */
const quiz = ref(null);

onMounted(async () => {
  mainStore.dispatch('quiz/fetchQuizzes', quizId);
  quiz.value = mainStore.state.quiz.quiz;
});

/**
 * Checks if the quiz has questions.
 * @type {ComputedRef<Boolean>}
 */
const hasQuestions = computed(() => {
  return mainStore.state.quiz.quiz.questions.length > 0;
})

/**
 * Retrieves the current route details.
 * @type {RouteLocationNormalizedLoaded}
 */
const currentUrl = useRoute();

/**
 * Unique identifier of the quiz extracted from the current route.
 * @type {string}
 */
const quizId = currentUrl.params.id;

mainStore.dispatch('quiz/fetchQuizById', quizId);
//mainStore.dispatch('quiz/fetchPersonalScores', quizId);

/**
 * Checks if the current user is the author of the quiz.
 * @type {ComputedRef<Boolean>}
 */
const isAuthor = computed(() => {
  return mainStore.state.quiz.quiz.author.id === mainStore.state.user.id;
});

/**
 * Get the most recent attempts at the quiz by the user.
 * @type {ComputedRef<Array>}
 */
const recentAttempts = computed(() => {
  return mainStore.state.quiz.quiz.personalScores;
});

/**
 * Returns the total points available in the quiz game.
 * @type {ComputedRef<Number>}
 */
const totalPoints = computed(() => {
  return mainStore.state.quiz.quiz.totalPoints;
})

/**
 * Formats the last updated timestamp of the quiz.
 * @type {ComputedRef<String>}
 */
const formattedDate = computed(() => {
  return formatDate(mainStore.state.quiz.quiz.updatedAt);
});

/**
 * Method to start the quiz, navigating the user to the quiz playing route.
 */
const startQuiz = () => {
  router.push(`/quiz/${mainStore.state.quiz.quiz.id}/play`);
  console.log('Starting quiz');
}
</script>

<template>
  <MainLayout>
    <div class="quizView-container" v-if="quiz">
      <header class="quizView-header">
        <h1 class="quizView-title">{{mainStore.state.quiz.quiz.title}}</h1>
        <RouterLink v-if="isAuthor" :to="`/quiz/${quizId}/edit`" custom v-slot="{ navigate }">
          <Button type="button" @click="navigate">
            Edit
          </Button>
        </RouterLink>
        <Button class="delete-button">Delete</Button>
      </header>
      <div class="quizView-content">
        <div class="quizView-meta">
          <p><strong>By: </strong>{{mainStore.state.quiz.quiz.author.firstName}} {{mainStore.state.quiz.quiz.author.lastName}}</p>
          <p><strong>Last edited: </strong>{{ formattedDate }} </p>
          <p><strong>Description: </strong>{{mainStore.state.quiz.quiz.description}}</p>
          <p><strong>Category: </strong>{{mainStore.state.quiz.quiz.category}}</p>
          <p class="questions-count"><strong>Questions:</strong> {{ mainStore.state.quiz.quiz.questions.length }}</p>
        </div>
        <div class="quizView-statistics">
          <h3><strong>Recent attempts</strong></h3>
          <ul v-if="recentAttempts?.length > 0">
            <li v-for="(scores, index) in recentAttempts" :key="index">
              <p class="scores-text">{{ "Score: " + scores.points }}/{{totalPoints}} - {{ formatDateWithTime(scores.date) }}</p>
            </li>
          </ul>
          <span v-else class="no-recent-attempts">No recent attempts yet...</span>
        </div>
      </div>
      <Button class="start-quiz-button" @click="startQuiz" :disabled="!hasQuestions">Start</Button>
    </div>
  </MainLayout>
</template>

<style scoped>
.quizView-container {
  padding: 20px;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 40px);
}

.quizView-content {
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.quizView-meta, .quizView-statistics {
  flex-basis: calc(50% - 10px);
  max-width: calc(50% - 10px);
  box-sizing: border-box;
}

.quizView-title {
  text-align: center;
  margin-bottom: 20px;
}

.quizView-statistics {
  flex: 1;
  order: 2;
  background-color: #0f3f6b;
  border-radius: 5px;
  padding: 20px;
  margin: 20px 0;
  width: 100%;
}


.quizView-statistics h3 {
  text-align: left;
}

.quizView-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.quizView-statistics li {
  margin-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.start-quiz-button {
  font-size: 30px;
  margin-top: auto;
  bottom: 20px;
  position: sticky;
  left: 0;
  right: 0;
  background-color: #57c42b;
  height: 6rem;
}

.start-quiz-button:hover {
  background-color: #78D64F;
}

.start-quiz-button:disabled {
  opacity: 50%;
}

.no-recent-attempts {
  color: white;
}

h3 {
  margin-bottom: 10px;
}

h3, .scores-text {
  color: white;
}

.quizView-meta {
  margin: 20px 0;
}

.delete-button {
  background-color: red;
}

.delete-button:hover {
  background-color: #ff3838;
}

@media (max-width: 768px) {
  .quizView-content {
    flex-direction: column;
  }

  .quizView-meta, .quizView-statistics {
    flex-basis: auto;
    max-width: 100%;
  }

  .quizView-header {
    flex-direction: column;
    align-items: center;
  }

  .quizView-title {
    text-align: left;
  }

  .edit-button {
    order: -1;
    align-self: flex-end;
    margin-bottom: 10px;
  }

  .quizView-meta, .quizView-statistics, .quizView-statistics h3 {
    align-items: center;
  }

  .start-quiz-button {
    position: sticky;
    left: 10px;
    right: 10px;
    bottom: 20px;
  }
}
</style>
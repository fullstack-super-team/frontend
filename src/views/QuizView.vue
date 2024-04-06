<script setup>
import { computed} from "vue";
import { onMounted, ref } from "vue";
import Button from "@/components/Button.vue";
import mainStore from "@/stores/mainStore.js";
import MainLayout from "@/layouts/MainLayout.vue";
import router from "@/router/index.js";
import { useRoute } from "vue-router";
import { formatDate} from "@/utils/dateFormatter.js";


const quiz = ref(null);

onMounted(async () => {
  mainStore.dispatch('quiz/fetchQuizzes', quizId);
  quiz.value = mainStore.state.quiz.quiz;
});

const currentUrl = useRoute();

const quizId = currentUrl.params.id;

mainStore.dispatch('quiz/fetchQuizById', quizId);
mainStore.dispatch('quiz/fetchPersonalScores', quizId);

const isAuthor = computed(() => {
  return mainStore.state.quiz.quiz.author.id === mainStore.state.user.id;
});

const recentAttempts = computed(() => {
  return mainStore.state.quiz.quiz.personalScores;
});

const totalPoints = computed(() => {
  return mainStore.state.game.totalPoints;
})
const formattedDate = computed(() => {
  return formatDate(mainStore.state.quiz.quiz.updatedAt);
});

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
        <RouterLink :to="`/quiz/${quizId}/edit`">
          Edit
        </RouterLink>
      </header>
      <div class="quizView-content">
        <div class="quizView-meta">
          <p><strong>By: </strong>{{mainStore.state.quiz.quiz.author.firstName}} {{mainStore.state.quiz.quiz.author.lastName}}</p>
          <p><strong>Last edited: </strong>{{ formattedDate }} </p>
          <p><strong>Description: </strong>{{mainStore.state.quiz.quiz.description}}</p>
          <p><strong>Category: </strong>{{mainStore.state.quiz.quiz.category}}</p>
          <p class="questions-count">{{ mainStore.state.quiz.quiz.questions.length }} <strong>Questions</strong></p>
        </div>
        <div class="quizView-statistics">
          <h3><strong>Recent attempts</strong></h3>
          <ul>
            <li v-for="(scores, index) in recentAttempts" :key="index">
              <p class="scores-text">{{ "Score: " + scores.points }}/{{totalPoints}} - {{ formatDate(scores.date) }}</p>
            </li>
          </ul>
        </div>
      </div>
      <Button class="start-quiz-button" @click="startQuiz">Start</Button>
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

h3 {
  margin-bottom: 10px;
}

h3, .scores-text {
  color: white;
}

.quizView-meta {
    margin: 20px 0;
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
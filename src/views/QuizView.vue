<script setup>
import { computed} from "vue";
import { onMounted, ref } from "vue";
import Button from "@/components/Button.vue";
import MainStore from "@/stores/mainStore.js";
import MainLayout from "@/layouts/MainLayout.vue";
import router from "@/router/index.js";
import { useRoute } from "vue-router";
import { formatDate} from "@/utils/dateFormatter.js";

const quiz = ref(null);

onMounted(async () => {
  MainStore.dispatch('quiz/fetchQuizzes', quizId);
  quiz.value = MainStore.state.quiz.quiz;
});

const currentUrl = useRoute();

const quizId = currentUrl.params.id;

MainStore.dispatch('quiz/fetchQuizById', quizId);

const isAuthor = computed(() => {
  return MainStore.state.quiz.quiz.author.id === MainStore.state.user.id;
});

const startQuiz = () => {
  router.push(`/quiz/${MainStore.state.quiz.quiz.id}/play`);
  console.log('Starting quiz');
}

const formattedDate = computed(() => {
  return formatDate(MainStore.state.quiz.quiz.updatedAt);
});
</script>

<template>
  <MainLayout>
    <div class="quizView-container" v-if="quiz">
      <header class="quizView-header">
        <h1 class="quizView-title">{{MainStore.state.quiz.quiz.title}}</h1>
        <RouterLink :to="`/quiz/${quizId}/edit`">
          Edit
        </RouterLink>
      </header>
      <div class="quizView-content">
        <div class="quizView-meta">
          <p><strong>By: </strong>{{MainStore.state.quiz.quiz.author.firstName}} {{MainStore.state.quiz.quiz.author.lastName}}</p>
          <p><strong>Last edited: </strong>{{ formattedDate }} </p>
          <p><strong>Description: </strong>{{MainStore.state.quiz.quiz.description}}</p>
          <p><strong>Category: </strong>{{MainStore.state.quiz.quiz.category}}</p>
        </div>
        <div class="quizView-statistics">
          <h3><Strong>Recent attempts</Strong></h3>
          <ul>
            <li v-for="(scores, index) in MainStore.state.quiz.quiz.scores" :key="index">
              <p class="scores-text">{{ "Score: " + scores.score }}/{{ scores.total }} - {{ scores.date }}</p>
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
import axios from "axios";

const gameModule = {
  namespaced: true,
  state() {
    return {
      quiz: {
        id: 1,
        questions: [],
        currentQuestionNumber: 0,
      },
      answers: [],
      currentQuestion: {
        id: 1,
        text: "",
        type: "",
        answers: [],
      },
      scores: []
    }
  },
  mutations: {
    setQuiz(state, payload) {
      state.quiz = payload;
    },
    setCurrentQuestion(state, payload) {
      state.currentQuestion = payload;
    },
    setCurrentQuestionNumber(state, payload) {
      state.quiz.currentQuestionNumber = payload;
    },
    addAnswer(state, payload) {
      state.answers.push(payload);
    },
    setAnswers(state, payload) {
      state.answers = payload;
    },
    setScores(state, payload) {
      state.scores = payload;
    }
  },
  actions: {
    async loadQuizById({ commit }, payload) {
      const token = localStorage.getItem("token");
      try {
        const quizId = payload;
        if (!quizId) {
          throw new Error("No quiz ID provided");
        }
        const response = await axios.get(`http://localhost:8080/quizzes/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        commit("setQuiz", response.data);
        commit("setCurrentQuestion", response.data.questions[0]);
        commit("setCurrentQuestionNumber", 0);
        commit("setScores", []);
        commit("setAnswers", []);
      } catch (error) {
        console.error('Failed to get user info:', error);        
      }
    },
    async startQuiz({ commit }) {
      commit("setCurrentQuestion", 1);
    },
    async nextQuestion({ commit, state }) {
      commit("setCurrentQuestionNumber", state.quiz.currentQuestionNumber + 1);
      commit("setCurrentQuestion", state.quiz.questions[state.quiz.currentQuestionNumber]);
    },
    async submitAnswer({ commit, state }, payload) {
      try {
        const answer = payload;
        console.log(answer)
        if (!answer) {
          throw new Error("No answer provided");
        }
        const token = localStorage.getItem("token");
        console.log(state.quiz)
        const response = await axios.post(`http://localhost:8080/quizzes/${state.quiz.id}/questions/${state.currentQuestion.id}/submit-answer`, {
          answer,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        commit("addAnswer", response.data);
      } catch (error) {
        console.error('Failed to submit answer:', error);        
      }
    },
    async finishQuiz({ commit, state }, payload) {
      try {
        const points = payload;
        if (!points) {
          throw new Error("No score provided");
        }
        const token = localStorage.getItem("token");
        const submitScoreResponse = await axios.post(`http://localhost:8080/quizzes/${state.quiz.id}/scores`, {
          points
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (submitScoreResponse.status !== 201) {
          throw new Error("Failed to submit score");
        }
        const scoresResponse = await axios.get(`http://localhost:8080/quizzes/${state.quiz.id}/scores`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        commit("setScores", scoresResponse.data);
      } catch (error) {
        console.error('Failed to finish quiz:', error);        
      }
    }
  },
}

export default gameModule;
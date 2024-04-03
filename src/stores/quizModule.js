import axios from "axios";

const quizModule = {
  namespaced: true,
  state() {
    return {
      quizzes: [],
      quiz: {}
    }
  },
  mutations: {
    setQuizzes(state, payload) {
      state.quizzes = payload;
    },
    setQuiz(state, payload) {
      state.quiz = payload;
    }
  },
  actions: {
    async fetchQuizzes({ commit }, payload) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:8080/quizzes/my`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        commit("setQuizzes", response.data);        
      } catch (error) {
        console.error('Failed to get quizzes:', error);        
      }
    },
    async loadQuizById({ commit }, payload) {
      try {        
        const quizId = payload;
        if (!quizId) {
          throw new Error("No quiz ID provided");
        }
        if (state.quizzes.some(quiz => quiz.id === payload)) {
          commit("setQuiz", state.quizzes.find(quiz => quiz.id === payload));
          return;
        }
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/quizzes/${quizId}/questions`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        commit("setQuiz", response.data);        
      } catch (error) {
        console.error('Failed to get user info:', error);        
      }
    },
    async searchForQuiz({ commit }, payload) {
      // TODO: Implement search functionality
    }
  },
}

export default quizModule;